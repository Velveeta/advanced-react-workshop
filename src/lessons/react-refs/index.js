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

const ReactRefsLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/refs-and-the-dom.html', 'Refs and the DOM');
  useRegisterNavLink('https://reactjs.org/docs/forwarding-refs.html', 'Forwarding Refs');

  return (
    <Lesson tips={<Tips />}>
      <h1>React Refs</h1>
      <div className="mt-4 text-justify">
        With as much as React handles for you with regards to DOM manipulation, there are still times that you need to get a handle to specific elements within your application, for use in calculating offsets, dimensions, setting focus, or any number of other things that may arise as needs related to certain components or elements on the page. When faced with these situations, your first instinct might be to resort to native DOM functions with something like the following:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const MyComponent = class extends React.Component {
  componentDidMount() {
    document.getElementById('username').setFocus();
  }

  render() {
    return (
      <div>
        <div>
          Username: <input defaultValue="" id="username" name="username" type="text" />
        </div>
        <div>
          Password: <input defaultValue="" id="password" name="password" type="text" />
        </div>
      </div>
    );
  }
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        After that, you might read about a ReactDOM method that was made for this sort of thing, and would return the root host-element node being exported by the component. That would look like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const MyComponent = class extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this).querySelector('#username').setFocus();
  }

  render() {
    return (
      <div>
        <div>
          Username: <input defaultValue="" id="username" name="username" type="text" />
        </div>
        <div>
          Password: <input defaultValue="" id="password" name="password" type="text" />
        </div>
      </div>
    );
  }
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        I implore you not to do either one of these things. As much as possible, you should be allowing React to manage your DOM for you. A lot of people that make the transition to React from a more imperative-style library like jQuery or Backbone are used to having to micromanage elements on the page. React allows you to just get out of the way and let it do all of that for you, while you just focus on managing your application's state. In addition, <ExternalLink href="https://reactjs.org/docs/react-dom.html#finddomnode">findDOMNode has been deprecated in StrictMode</ExternalLink>, so you should probably not use it in general.
      </div>
      <div className="mt-4 text-justify">
        That being said, there are obviously times that you need to touch elements, and that's what React refs are for. Rather than querying the DOM to get a handle to an element, whenever React mounts or updates the location of a given element, it will automatically populate the reference for you, for use within your component.
      </div>
      <div className="mt-4 text-justify">
        It's important to also recognize the difference between component types at this point. React allows for 2 major types of components: Components and components. That is to say that uppercase component references (e.g. <Highlight>UserProfile</Highlight> and <Highlight>DisplayGrid</Highlight>) are treated as complex UI modules that are composed of other complex UI modules or host components. Host components are your lowercase components, which represent elements on the host platform (e.g. <Highlight>div</Highlight>, <Highlight>span</Highlight>, etc). When assigning React refs to different component types, complex Components will return a reference to the component instance, whereas host-level components will return a reference to the DOM node represented <i>by</i> that component instance.
      </div>
      <div className="mt-4 text-justify">
        When accessing Component instances, you may be tempted to treat them as public interfaces to methods that are available for use within those Components. This is also not a good idea. When working within React applications, all communication with Components should be done by passing props down from parents to children. Any upwards communication should be done by invoking callbacks that are passed down from parents to children. Resist the urge to invoke methods on Component instances directly. The exception to this is if you're returning a custom API to your component via the <Highlight>useImperativeHandle</Highlight> hook, in which case you can specify a consistent external API for your component ref, even if the internal implementation of the component itself changes. The majority of the time, you'll want to deal with host-system element references.
      </div>
      <div className="mt-4 text-justify">
        Because elements may be mounted and unmounted at random times as state changes throughout your component's lifecycle, you'll want to be able to work with whatever the current reference is at any given time. Using the <Highlight>React.createRef</Highlight> function, you can access the <Highlight>ref.current</Highlight> property to make sure you're always working with the most recent item. If you're setting event listeners on a DOM node specifically, you'll want to make sure you perform possible cleanup whenever <Highlight>componentDidUpdate</Highlight> fires, which is one reason it's not advised to do direct DOM event bindings on your element references. For these situations, if you just use standard React event listeners, the library will perform that cleanup and re-binding for you in the event the node ever changes.
      </div>
      <div className="mt-4 text-justify">
        React supports another method of assigning component references. In its early days, you were able to assign a simple string as a <Highlight>ref</Highlight> prop to your component, and it would be available via <Highlight>this.refs.name</Highlight> (with name being the string you assigned, e.g. <Highlight>this.refs.username</Highlight>), but that's, since been deprecated in favor of functional refs, which receive the DOM element or component reference as an input parameter, allowing you to do things like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const MyComponent = class extends React.Component {
  componentDidMount() {
    this._someFieldname.value = 'I am a default value!';
  }

  _ref = node => {
    this._someFieldname = node;
  };

  render() {
    return (
      <div>
        <input defaultValue="" name="some_fieldname" ref={this._ref} type="text" />
      </div>
    );
  }
}`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        This functional method of ref assignment is still valid, and a new <Highlight>React.createRef</Highlight> function was added so that you could just attach a ref you create once, and always be able to access its <Highlight>current</Highlight> value, without having to use a callback function to sync that to some class member whenever it changes.
      </div>
      <div className="mt-4 text-justify">
        React also supplies a <Highlight>forwardRef</Highlight> function, which can be used to inject a ref into the implementation details of a more complex component. If you are a consumer of a component, you may need to get access to some detail of an element that's been specifically-exposed by that component, for the purposes of evaluating its location on the page, or current value, or any other detail. Provided that the author has exposed an inner element for you to latch onto, you can simply pass a <Highlight>ref</Highlight> prop as normal. <strong>As</strong> a component author, this can make your components more flexible for external consumers, and you can easily provide this functionality by way of the <Highlight>React.forwardRef</Highlight> function. This function only works for functional components, not class-based ones, but you can receive a <Highlight>ref</Highlight> value from your consumers, which you can then proxy through to the underlying element of your choice.
      </div>
      <div className="mt-4 text-justify">
        One example might be a stylized <Highlight>Dropdown</Highlight> component, which itself is based on an underlying <Highlight>select</Highlight> element, which is hidden from view in favor of a prettier UI you've built on top of it. If you want to allow your consumers to have access to the underlying <Highlight>select</Highlight> element itself, you can do so with <Highlight>React.forwardRef</Highlight>, and your functional component will receive the incoming ref as a second parameter, alongside the incoming <Highlight>props</Highlight>. That ref value can then be applied to your underlying select. Such a component might look something like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const CustomDropdown = React.forwardRef((props, ref) => (
  <React.Fragment>
    <div className="custom-select">
      <div className="clickable-window">{props.value}</div>
      <CustomDropdownList options={props.options} />
    </div>
    {/* This select is hidden in the UI, but receives the incoming ref */}
    <select onChange={props.onChange} ref={ref} value={props.value}>
      {props.options.map(option => (
        <option key={option.value} value={option.value}>{option.display}</option>
      ))}
    </select>
  </React.Fragment>
));`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        By providing this type of service as an author, you'll be making your components that much more robust to your consumers, because while you can never account for various things they may want to do with those component references, you're giving them a handle to those references so that they can do anything they deem necessary for the own use of your component.
      </div>
      <div className="mt-4 text-justify">
        In this exercise, you'll be given a generic <Highlight>Layer</Highlight> component. This component will accept props for its x, y, and z coordinates in the DOM, and will absolutely position itself to render at those specified coordinates. You'll need to author a new Tooltip component that exposes a reference to its underlying children, such that when those children are moused over, the Tooptip appears directly over them for 3 seconds, and then automatically closes itself. Open the project's <FilePath>src/lessons/react-refs/exercise.js</FilePath> file to start learning how to implement a component like this, by forwarding an incoming <Highlight>ref</Highlight> to its underlying children, for use in the parent component.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="react-refs" />
    </Lesson>
  );
};

export default ReactRefsLesson;
