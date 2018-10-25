import React from 'react';
import CustomReactElements from '../src/index';
import { insertCustomElementIntoDom } from './utils';

/* eslint-disable react/prop-types */

describe('Rendering basic components', () => {
  it('renders them into the page', () => {
    const selector = 'react-example-component-1';
    const ExampleComponent = () => <p>hello world</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector);
    const elem = document.querySelector(selector);

    expect(elem.shadowRoot.innerHTML).toEqual('<div><p>hello world</p></div>');
  });

  it('passes props through', () => {
    const selector = 'react-example-component-2';
    const ExampleComponent = props => <p>hello {props.name}</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      name: 'Jack',
    });

    const elem = document.querySelector(selector);

    expect(elem.shadowRoot.innerHTML).toEqual('<div><p>hello Jack</p></div>');
  });

  fit('reacts as all the props change', done => {
    const selector = 'react-example-component-3';
    const ExampleComponent = props => <p>hello {props.name}</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      name: 'Jack',
    });

    let elem = document.querySelector(selector);

    expect(elem.shadowRoot.innerHTML).toEqual('<p>hello Jack</p>');

    elem.setAttribute('name', 'Joe');

    setImmediate(() => {
      expect(elem.shadowRoot.innerHTML).toEqual('<p>hello Joe</p>');
      done();
    });
  });
});
