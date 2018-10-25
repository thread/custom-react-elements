import React from 'react';
import ReactDOM from 'react-dom';

function attributeNameToPropertyName(attributeName) {
  return attributeName
    .replace(/^(x|data)[-_:]/i, '')
    .replace(/[-_:](.)/g, function(x, chr) {
      return chr.toUpperCase();
    });
}

function getProps(el) {
  const props = {};

  for (var i = 0; i < el.attributes.length; i++) {
    var attribute = el.attributes[i];
    var name = attributeNameToPropertyName(attribute.name);
    // props[name] = parseAttributeValue(attribute.value, {
    //   noBooleanTransforms: noBooleanTransforms,
    // });
    props[name] = attribute.value;
  }

  props.container = el;

  return props;
}

const CustomReactElements = {
  define(name, component) {
    class NewComponent extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        const props = getProps(this);
        ReactDOM.render(React.createElement(component, props), shadowRoot);

        const observer = new MutationObserver(() => {
          console.log('mutation observer got triggered!');
          ReactDOM.unmountComponentAtNode(shadowRoot);
          const props = getProps(this);
          console.log('got new props', props);
          // props.children = utils.getChildren(self);
          ReactDOM.render(React.createElement(component, props), shadowRoot);
        });

        observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true,
          attributes: true,
        });
      }
    }

    customElements.define(name, NewComponent);
  },
};

export default CustomReactElements;
