// import CustomReactElements from '../src/index';

import React from 'react';
import App from './component';
import ReactDOM from 'react-dom';

class WordCount extends HTMLElement {
  constructor() {
    super();
    console.log('constrcutor called');
  }

  connectedCallback() {
    let shadowRoot = this.attachShadow({ mode: 'open' });
    const x = document.createElement('div');
    ReactDOM.render(<App />, x);
    shadowRoot.appendChild(x);
  }
}

console.log('got here', WordCount);

customElements.define('react-example-component', WordCount);
