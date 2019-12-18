import React from 'react';

import CodeBlock from '../../components/code-block';
import Highlight from '../../components/highlight';

const ReactRefTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        Remember that React refs may change if a component (or a subcomponent portion of a view) is unmounted and remounted, so if you have internal state changes that conditionally render portions of your view, and those portions are bound to elements you need refs for, you may need to account for a changing ref from time to time in your <Highlight>componentDidUpdate</Highlight> function.
      </div>
      <div className="mt-3 text-justify">
        <Highlight>React.createRef</Highlight> will create a React ref for use within both class- and function-based components, but <Highlight>React.forwardRef</Highlight> only works with function-based components. Also remember that when trying to reference a React ref from inside of a complex Component that one has been passed to, there's no mechanism for doing that (e.g. you can't reference <Highlight>this.refs</Highlight> inside the target Component class). All you can do in that situation is to use a custom prop named something other than <Highlight>ref</Highlight>, such as <Highlight>innerRef</Highlight>, and then reference that custom prop. If you need to make use of some kind of stateful class-based element, <i>and</i> also provide a method to forward an external ref to an underlying portion of that component, <i>without</i> exposing a custom prop name like <Highlight>innerRef</Highlight>), you'll need to wrap it in a function-based component which is also using <Highlight>React.forwardRef</Highlight>, and then forward that incoming ref parameter through as a custom prop name on the target class-based Component, e.g. something like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`import React from 'react';

const MyComponent = class extends React.Component {
  state = {
    value: '',
  };

  _onChange = e => {
    const { value } = e.target;

    this.setState({ value });
  };

  render() {
    return (
      <div>
        <input ref={this.props.innerRef} type="text" value={this.state.value} />
      </div>
    );
  }
};

const MyComponentWrapper = React.forwardRef((props, ref) => (
  <MyComponent {...props} innerRef={ref} />
));

export default MyComponentWrapper;`}</CodeBlock>
      </div>
    </div>
  </React.Fragment>
);

export default ReactRefTips;
