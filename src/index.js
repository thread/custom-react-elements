import React from 'react';
import ReactDOM from 'react-dom';

const CustomReactElements = {
  define(name, component) {
    class NewComponent extends HTMLElement {
      constructor() {
        super();
      }

      connectedCallback() {
        let shadowRoot = this.attachShadow({ mode: 'open' });
        const x = document.createElement('div');
        ReactDOM.render(React.createElement(component), x);
        shadowRoot.appendChild(x);
      }
    }

    customElements.define(name, NewComponent);
  },
};

export default CustomReactElements;
