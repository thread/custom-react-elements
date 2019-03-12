import React from 'react';
import ReactDOM from 'react-dom';

const attributeNameToPropertyName = attributeName =>
  attributeName
    .replace(/^(x|data)[-_:]/i, '')
    .replace(/[-_:](.)/g, function(x, chr) {
      return chr.toUpperCase();
    });

const parseAttributeValue = (
  value,
  { disableBooleanTransforms = false } = {}
) => {
  if (disableBooleanTransforms) return value;
  return value === 'true' ? true : value === 'false' ? false : value;
};

const getProps = (el, options = {}) => {
  const props = {};

  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];
    var name = attributeNameToPropertyName(attribute.name);
    props[name] = parseAttributeValue(attribute.value, options);
  }

  props.container = el;

  return props;
};

const getChildren = el => {
  const fragment = document.createDocumentFragment();
  while (el.childNodes.length) {
    fragment.appendChild(el.childNodes[0]);
  }
  return fragment;
};

const getRenderRoot = (element, useShadowDom) =>
  useShadowDom ? element.shadowRoot : element;

const CustomReactElements = {
  define(name, ReactComponent, options = {}) {
    const { useShadowDom = false, disableBooleanTransforms = false } = options;

    const createAndRender = (parent, props) => {
      const elem = React.createElement(ReactComponent, props);
      return ReactDOM.render(elem, getRenderRoot(parent, useShadowDom));
    };

    class NewComponent extends HTMLElement {
      constructor() {
        const self = super();

        if (useShadowDom) self.attachShadow({ mode: 'open' });

        const observer = new MutationObserver(() => {
          const props = getProps(self, {
            disableBooleanTransforms,
          });

          props.children = this.childrenFragment;
          createAndRender(self, props);
        });

        observer.observe(self, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
        });
      }

      connectedCallback() {
        const props = getProps(this, {
          disableBooleanTransforms,
        });

        this.childrenFragment = props.children = getChildren(this);

        createAndRender(this, props);
      }

      disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(getRenderRoot(this, useShadowDom));
      }
    }

    customElements.define(name, NewComponent);
  },
};

export default CustomReactElements;
