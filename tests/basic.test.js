/* global jasmine */

import React from 'react';
import CustomReactElements from '../src/index';
import { insertCustomElementIntoDom, randomSelectorName } from './utils';

describe('Rendering basic components', () => {
  it('renders them into the page', () => {
    const selector = randomSelectorName();
    const ExampleComponent = () => <p>hello world</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector);
    const elem = document.querySelector(selector);

    expect(elem.innerHTML).toEqual('<p>hello world</p>');
  });

  it('does not use the shadow root by default', () => {
    const selector = randomSelectorName();
    const ExampleComponent = () => <p>hello world</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector);
    const elem = document.querySelector(selector);

    expect(elem.shadowRoot).toEqual(null);
  });

  it('passes props through', () => {
    const selector = randomSelectorName();
    const ExampleComponent = props => <p>hello {props.name}</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      name: 'Jack',
    });

    const elem = document.querySelector(selector);

    expect(elem.innerHTML).toEqual('<p>hello Jack</p>');
  });

  it('converts props to camelCase in React', done => {
    const selector = randomSelectorName();
    const ExampleComponent = props => {
      expect(Object.keys(props)).toEqual([
        'shouldCamelCaseThis',
        'shouldnotcamelcasethis',
        'container',
        'children',
      ]);

      done();
      return null;
    };

    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      'should-camel-case-this': 'Jack',
      shouldnotcamelcasethis: 'Jack',
    });
  });

  describe('boolean attributes', () => {
    it('parses the string literal true into a boolean', () => {
      const selector = randomSelectorName();
      const ExampleComponent = props =>
        props.isLoggedIn === true ? 'Yes!' : 'No!';

      CustomReactElements.define(selector, ExampleComponent);
      insertCustomElementIntoDom(selector, {
        'is-logged-in': 'true',
      });

      const elem = document.querySelector(selector);

      expect(elem.innerHTML).toEqual('Yes!');
    });

    it('parses the string literal false into a boolean', () => {
      const selector = randomSelectorName();
      const ExampleComponent = props =>
        props.isLoggedIn === false ? 'Yes!' : 'No!';

      CustomReactElements.define(selector, ExampleComponent);
      insertCustomElementIntoDom(selector, {
        'is-logged-in': 'false',
      });

      const elem = document.querySelector(selector);

      expect(elem.innerHTML).toEqual('Yes!');
    });

    it('lets you disable boolean transforms', () => {
      const selector = randomSelectorName();
      const ExampleComponent = props =>
        props.isLoggedIn === false ? 'Yes!' : 'No!';

      CustomReactElements.define(selector, ExampleComponent, {
        disableBooleanTransforms: true,
      });

      insertCustomElementIntoDom(selector, {
        'is-logged-in': 'false',
      });

      const elem = document.querySelector(selector);

      expect(elem.innerHTML).toEqual('No!');
    });
  });

  const getHtmlStringFromFragment = fragment =>
    [].map.call(fragment.childNodes, x => x.outerHTML).join('');

  it('passes the children in as a fragment to React', done => {
    const selector = randomSelectorName();
    const ExampleComponent = props => {
      const htmlContent = getHtmlStringFromFragment(props.children);
      expect(htmlContent).toEqual('<p>this was the children</p>');
      done();
      return null;
    };
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(
      selector,
      {
        name: 'Jack',
      },
      '<p>this was the children</p>'
    );
  });

  it('passes the container as a prop to React', done => {
    const selector = randomSelectorName();
    const ExampleComponent = props => {
      expect(props.container).toEqual(jasmine.any(HTMLElement));
      done();
      return null;
    };
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      name: 'Jack',
    });
  });

  it('reacts as all the props change', done => {
    const selector = randomSelectorName();
    const ExampleComponent = props => <p>hello {props.name}</p>;
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      name: 'Jack',
    });

    let elem = document.querySelector(selector);

    expect(elem.innerHTML).toEqual('<p>hello Jack</p>');

    elem.setAttribute('name', 'Joe');

    setImmediate(() => {
      expect(elem.innerHTML).toEqual('<p>hello Joe</p>');
      done();
    });
  });

  it('parses JSON arrays', done => {
    const rawJsonAttribute = '{["Jack"]}';
    const selector = randomSelectorName();
    const ExampleComponent = props => {
      expect(props.names).toEqual(['Jack']);
      done();
      return null;
    };
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      names: rawJsonAttribute,
    });
  });

  it('parses JSON arrays over multiple lines', done => {
    const rawJsonAttribute = `{[
      "Jack"
    ]}`;
    const selector = randomSelectorName();
    const ExampleComponent = props => {
      expect(props.names).toEqual(['Jack']);
      done();
      return null;
    };
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      names: rawJsonAttribute,
    });
  });

  it('parses JSON objects', done => {
    const rawJsonAttribute = '{{"name": "Jack"}}';
    const selector = randomSelectorName();
    const ExampleComponent = props => {
      expect(props.person).toEqual({
        name: 'Jack',
      });
      done();
      return null;
    };
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      person: rawJsonAttribute,
    });
  });

  it('parses JSON objects over multiple lines', done => {
    const rawJsonAttribute = `{{
      "name": "Jack",
          "favouriteNumber": 26

    }}`;
    const selector = randomSelectorName();
    const ExampleComponent = props => {
      expect(props.person).toEqual({
        name: 'Jack',
        favouriteNumber: 26,
      });
      done();
      return null;
    };
    CustomReactElements.define(selector, ExampleComponent);
    insertCustomElementIntoDom(selector, {
      person: rawJsonAttribute,
    });
  });
});
