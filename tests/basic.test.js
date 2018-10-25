import React from 'react';
import CustomReactElements from '../src/index';
import { insertCustomElementIntoDom } from './utils';

describe('Rendering basic components', () => {
  it('renders them into the page', () => {
    const selector = 'react-example-component';
    const ExampleComponent = () => <p>hello world</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector);
    const elem = document.querySelector(selector);

    expect(elem.shadowRoot.innerHTML).toEqual('<div><p>hello world</p></div>');
  });
});
