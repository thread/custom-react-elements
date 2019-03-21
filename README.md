# custom-react-elements

A library to render React components in a Custom Element.

## Why ?

At Thread we are migrating from a server side rendered website to a single page client side application. This library enables us to migrate incrementally by first rendering React on the server via custom elements.

## Prior Art

We previously used [`ReactiveElements`](https://github.com/PixelsCommander/ReactiveElements/), but that project's goal is to very strictly adhere to the web component spec (for example, by supporting [`<slot>`s](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_templates_and_slots)). Our goal is to use custom elements as a thin wrapper to help us migrate, so `custom-react-elements` does not attempt to support the entire web component spectrum.

## Example

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

You can pass attributes into a custom element that make it through to React as a prop. Any attributes with hyphens will be camelcased:

```html
<my-component name="Jack"></my-component>
<!-- React will see this.props.name === "Jack" -->
```

You can also pass the literal strings `"true"` or `"false"` and they will be converted to booleans in React land. Read on if you'd like to disable this feature.

```html
<my-component logged-in="true"></my-component>
<!-- React will see this.props.loggedIn === true -->
<!-- note this is the boolean `true`, NOT a string! -->
```

Additionally, you can pass JSON arrays or objects. These _have to be surrounded with an extra pair of braces_:

```html
<my-component names='{["alice", "bob"]}'></my-component>
<!-- React will see this.props.names = ["alice", "bob"] -->
```

```html
<my-component person='{{"name": "alice"}}'></my-component>
<!-- React will see this.props.person = { name: 'alice' } -->
```
