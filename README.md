# custom-react-elements

A library to render React components in a Custom Element. Please note that this library supports V1 of the custom elements spec only.

## Why?

At Thread we are migrating from a server side rendered website to a single page client side application. This library enables us to migrate incrementally by first rendering React on the server via custom elements.

_PS: if you like this, you might like [`elm-web-components`](https://github.com/thread/elm-web-components)._

## Prior Art

We previously used [`ReactiveElements`](https://github.com/PixelsCommander/ReactiveElements/), but that project's goal is to very strictly adhere to the web component spec (for example, by supporting [`<slot>`s](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)). Our goal is to use custom elements as a thin wrapper to help us migrate, so `custom-react-elements` does not attempt to support the entire web component spectrum. A lot of credit for the code within this repository must go to the authors and contributors of `ReactiveElements`.

## Install

```
yarn add @teamthread/custom-react-elements
npm install @teamthread/custom-react-elements
```

## Example

You can find a full example in the `example` folder of this repository if you'd like to dive further into the library.

```jsx
import React from 'react';
import CustomReactElements from '@teamthread/custom-react-elements';

const MyComponent = () => <p>Hello, world!</p>;

CustomReactElements.define('my-component', MyComponent);
```

You can then use this element in an HTML file:

```html
<my-component></my-component>
```

## Attributes

You can pass attributes into a custom element that make it through to React as a prop. Any attributes with hyphens will be camelCased:

```html
<my-component name="Jack"></my-component>
<!-- React will see this.props.name === "Jack" -->
```

You can also pass the literal strings `"true"` or `"false"` and they will be converted to booleans in React land.

```html
<my-component logged-in="true"></my-component>
<!-- React will see this.props.loggedIn === true -->
<!-- note this is the boolean `true`, NOT a string! -->
```

If you wish to disable this feature, you can pass an option when you define the component:

```js
CustomReactElements.define('my-component', MyComponent, {
  disableBooleanTransforms: true,
});
```

Now, the strings `"true"` and `"false"` will be passed through as is.

Additionally, you can pass JSON arrays or objects. These _have to be surrounded with an extra pair of braces_:

```html
<my-component names='{["alice", "bob"]}'></my-component>
<!-- React will see this.props.names = ["alice", "bob"] -->
```

```html
<my-component person='{{"name": "alice"}}'></my-component>
<!-- React will see this.props.person = { name: 'alice' } -->
```

## `container` and `children` properties

When a React component is mounted from a custom element, it is given two additional props:

- `props.children` : this is a `DocumentFragment` of the children within a component:
  ```html
  <my-component><p>foo</p></my-component>
  ```
- `props.container` : this is an `HTMLElement` containing the wrapper element.

In our experience you should try to avoid using these; we like to use custom elements with no children and let React do the rest.

## Updating on attribute changes

A custom element that has an attribute changed will cause React to update. So if you have some other code that's swapping out attributes, React will act accordingly. Again, we recommend avoiding this if possible and having all logic within React whenever possible.

## Shadow DOM

By default, the custom elements created by this library will _not_ use the [ShadowDOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM). You can configure this when defining the component:

```js
CustomReactElements.define('my-component', MyComponent, {
  useShadowDom: true,
});
```

## Polyfilling for old browsers

Old browsers that don't support the v1 custom elements spec (IE11, for example), can have support provided from the excellent [`document-register-element`](https://github.com/WebReflection/document-register-element) polyfill. The best way to do this is to include these scripts in your HTML files:

```
<script>this.customElements||document.write('<script src="//unpkg.com/document-register-element"><\x2fscript>');</script>
<script src="//unpkg.com/built-in-element"></script>
```

## Contributing

We'd welcome any contributions to this library! Please feel free to open an issue if you find any bugs, or would like thoughts on any ideas for improvements that you have.

To run the repository locally, you should:

- clone this repository (or fork it first if you're planning to contribute)
- run `yarn install` to ensure you've got all dependencies set up
- You can run `yarn run dev-test` to run the tests locally via Karma. `yarn run lint` will run ESLint.
- Running `yarn run example` will run a small demo project that you can play with in the browser.

For any new features, we ask that you provide at least one test that covers the functionality. If you're unsure or need any help, please ask :)
