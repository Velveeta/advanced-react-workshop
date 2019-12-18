import React from 'react';

import CodeBlock from '../../components/code-block';
import ExternalLink from '../../components/external-link';
import Highlight from '../../components/highlight';

const HigherOrderComponentsTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        Building a higher-order component allows you to centralize the implementation of some kind of reusable business logic, whether it's establishing common event listeners and signaling their use to downstream components, subscribing to external services, or anything else you might have need of on a regular basis.
      </div>
      <div className="mt-3 text-justify">
        The general recipe for a higher-order component is a function that receives your Component function/class and returns a new Component function/class that renders your own, along with some extra work that it performs <i>for</i> your component.
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`const withRenderTimeout = (Component, timeout) => {
  const TimeoutComponent = class extends React.Component {
    state = {
      show: true,
    };

    componentDidMount() {
      setTimeout(() => {
        this.setState({ show: false });
      }, timeout);
    }

    render() {
      if (!this.state.show) {
        return null;
      }

      return <Component {...this.props} />;
    }
  };

  return TimeoutComponent;
};

export default withRenderTimeout;`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        It's good practice to also forward any props you're receiving through to the target Component by simply spreading <Highlight>this.props</Highlight> out onto the target Component. In the context of this exercise, you'll want to make sure you're not only receiving the Component in your HOC function, but also some kind of parameter for the field <Highlight>mappings</Highlight>. The translation from context fields to outgoing prop fields should be easy to do with a standard <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce">reduce</ExternalLink> operation against the <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys">object's keys</ExternalLink>.
      </div>
      <div className="mt-3 text-justify">
        Also remember that a Context object's Consumer component should be passed a function as its <Highlight>children</Highlight> prop, which will receive the current context value as its input parameter. You can parse through that, and pull the appropriate context values based on your HOC's <Highlight>mappings</Highlight> parameter, storing them in a computed set of props to pass to the target component when it's rendered.
      </div>
    </div>
  </React.Fragment>
);

export default HigherOrderComponentsTips;
