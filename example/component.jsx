import React, { useState, useEffect } from 'react';

export const BasicComponent = () => {
  return <div>Hello world from React!</div>;
};

export class OldStyleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState(p => {
        return {
          count: p.count + 1,
        };
      });
    }, 1000);
  }

  render() {
    return <div>Count: {this.state.count}</div>;
  }
}

export const ComponentWithProps = props => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const x = setInterval(() => {
      setCounter(c => c + 1);
    }, 1000);

    return () => {
      window.clearInterval(x);
    };
  });

  return (
    <div>
      <h1>
        Got <code>name</code> : {props.name}
      </h1>

      <h5>Counter: {counter}</h5>

      <p>
        JSON of the <code>demoObject</code> prop
      </p>
      <pre>
        <code>{JSON.stringify(props.demoObject, null, 4)}</code>
      </pre>
    </div>
  );
};
