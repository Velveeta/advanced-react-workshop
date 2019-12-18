import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import ExternalLink from '../../components/external-link';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';
import NavigationFooter from '../../components/navigation/footer';

import Exercise from './exercise';
import Tips from './tips';

const HigherOrderComponentsLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/higher-order-components.html', 'Higher Order Components');
  useRegisterNavLink('https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html', 'Mixins Considered Harmful');

  return (
    <Lesson tips={<Tips />}>
      <h1>Higher-order Components</h1>
      <div className="mt-4 text-justify">
        Composition is a very powerful paradigm used extensively within React applications, and allows us to keep components discrete and cohesive, ideally without tightly-coupling them to other dependencies (outside of needing to extend from React.Component or React.PureComponent in the case of class-based components). As you author more and more components in your applications, you may start to find yourself implementing very similar functionality over and over in different component contexts. Rather than duplicating that code across your application, if you can find a way to abstract it, it makes a great candidate for exporting into a higher-order component.
      </div>
      <div className="mt-4 text-justify">
        Higher-order components are components that contain some kind of commonly-used code behavior, transformation, subscription, or anything else that components may find themselves in need of. It then performs those operations on behalf of the components that need it, passing the results down as props. Target components then won't need to implement those features themselves, and won't need to rely on tight coupling in the form of subclassing to obtain those features. HOC's are functions that receive a Component as a parameter, and return a new Component with those features applied. They typically look something like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

const makeHoverable = Component => {
  const HoverableComponent = class extends React.Component {
    state = {
      isHovered: false,
    };

    _onMouseEnter = () => {
      this.setState({ isHovered: true });
    };

    _onMouseLeave = () => {
      this.setState({ isHovered: false });
    };

    render() {
      return <Component {...this.props} isHovered={this.state.isHovered} />
    }
  };

  return HoverableComponent;
};
export default makeHoverable;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Now any Components that need to know their hover state at any given time can simply be run through the above HOC function, and check their <Highlight>isHovered</Highlight> prop:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

import makeHoverable from './make-hoverable';

const MyComponent = ({ children, isHovered }) => (
  <div className={isHovered ? 'hovered' : 'not-hovered'}>{children}</div>
);

export default makeHoverable(MyComponent);`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        If you're a Redux user, you may recognize this pattern. The <Highlight>connect</Highlight> function from <ExternalLink href="https://www.npmjs.com/package/react-redux">react-redux</ExternalLink> is actually an HOC itself. It's a multi-stage HOC that takes input parameters for <Highlight>mapStateToProps</Highlight>, <Highlight>mapDispatchToProps</Highlight>, <Highlight>mergeProps</Highlight>, and <Highlight>options</Highlight>, and returns another function that <i>then</i> takes the target Component as a parameter, and returns the new Component reference. It's more complex than the code below, but the gist of it basically looks like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';
import StoreContext from './context';

const connect = (mapStateToProps, mapDispatchToProps, mergeProps, options) => Component => {
  const ConnectedComponent = class extends React.Component {
    static displayName = \`Connected($\{Component.displayName})\`;
    static contextType = StoreContext;

    constructor(...args) {
      super(...args);

      this.state = this._update();
    }

    componentDidMount() {
      this._unsubscribe = this.context.store.subscribe(() => {
        this.setState(this._update());
      });
    }

    componentWillUnmount() {
      this._unsubscribe();
    }

    _update() {
      const state = this.context.store.getState();
      const updatedState = (typeof mapStateToProps === 'function' ? mapStateToProps(state, this.props) : {});
      const updatedActions = (
        typeof mapDispatchToProps === 'function'
        ? mapDispatchToProps(state, this.props)
        : (mapDispatchToProps || {})
      );

      return { ...updatedState, ...updatedActions };
    }

    render() {
      return <Component {...this.state} {...this.props} />;
    }
  };

  return ConnectedComponent;
};

export default connect;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Doesn't seem nearly so magical once you see how simple it is under the hood, right? This technique can make for very powerful component applications, while allowing you to keep your components themselves fairly simple in nature, and outsource the complexity of these kinds of reusable features to a single HOC, which can be tested individually, and used anywhere you have the need.
      </div>
      <div className="mt-4 text-justify">
        Now that you've seen a couple of examples of what HOC's are capable of doing for your components, it's time to practice writing one of your own. In this exercise, you'll be authoring a higher-order component that can be used to pull data from a Context object. It should receive both the Context object itself, as well as an object hash which is keyed by the names of the props to <strong>look up</strong> in that Context object, with each value being the name of the prop <strong>to pass</strong> that Context value as. Here's an example signature to demonstrate what that means:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import DataContext from './data/context';
import withContext from './hocs/context';

const MyComponent = ({ children, dataValue1, dataValue2 }) => (
  <div data-value-1={dataValue1} data-value-2={dataValue2}>{children}</div>
);

// DataContext will provide something like { val1: true, val2: false }
// These values will be mapped as props dataValue1 and dataValue2, respectively
const MyWrappedComponent = withContext(DataContext, {
  val1: 'dataValue1',
  val2: 'dataValue2',
})(MyComponent);

// Alternatively, you could have an HOC like 'withUserDataContext' that would
// automatically use something like a 'UserDataContext' object, so that you would
// only need to provide the key mapping
const MyWrappedUserComponent = withUserDataContext({
  val1: 'dataValue1',
  val2: 'dataValue2',
})(MyUserComponent);
`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        When you're ready, open the project's <FilePath>src/lessons/higher-order-components/exercise.js</FilePath> file to start implementing your own Context-based higher-order Component, so that your actual view components don't need to have any knowledge of where their data is sourced, they simply need to render the props they're given, no matter the source of those props.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="higher-order-components" />
    </Lesson>
  );
};

export default HigherOrderComponentsLesson;
