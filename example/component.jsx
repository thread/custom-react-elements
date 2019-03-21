import React from 'react';

export const BasicComponent = () => {
  return <div>Hello world from React!</div>;
};

export const ComponentWithProps = props => {
  return (
    <div>
      <h1>
        Got <code>name</code> : {props.name}
      </h1>

      <p>
        JSON of the <code>demoObject</code> prop
      </p>
      <pre>
        <code>{JSON.stringify(props.demoObject, null, 4)}</code>
      </pre>
    </div>
  );
};
