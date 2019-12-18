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

const ReactHooksLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/hooks-reference.html', 'Hooks Reference');
  useRegisterNavLink('https://reactjs.org/docs/hooks-faq.html', 'Hooks FAQ');

  return (
    <Lesson tips={<Tips />}>
      <h1>React Hooks</h1>
      <div className="mt-4 text-justify">
        React's new Hooks API allows us to finally start consolidating aspects of different types of component development into a singular implementation strategy for the components themselves. Previously, we had to decide whether we needed certain lifecycle functions to drive various stateful aspects of our components, or whether we needed local state, or (prior to v16.3) whether we needed access to some value from context, or anything else, to decide whether we were going to implement a class-based or a functional component. With the new Hooks API, we can literally implement everything as a functional component, which allows us to get one step closer to pure functional development.
      </div>
      <div className="mt-4 text-justify">
        The only constraints on the new Hooks API are that hooks must be evaluated during the render cycle (for asynchronous operations, there's a <Highlight>useEffect</Highlight> hook that allows for those asynchronous side-effects to execute without throwing an error), the same number of hooks must be evaluated, and in the same order, <i>per</i> render cycle (meaning you cannot have hooks conditionally fire, or in a non-deterministic order, they must all fire the same on each cyle), and that the hook function names must start with the literal string <Highlight>use</Highlight>, as in <Highlight>useDatabase</Highlight>, <Highlight>useLocalStorage</Highlight>, <Highlight>useApollo</Highlight>, or any other variation you can come up with. In the future, this constraint will hopefully go away, but for now, a prescribed naming convention is a small price to pay for the power that the Hooks API can provide to your components.
      </div>
      <div className="mt-4 text-justify">
        So what exactly are hooks? They're functions that are invoked during the render cycle of your component, in order to provide some kind of external service to them, whether that service is providing some kind of stateful getter/setter to be used for rendering and updating stateful data, or providing Redux-like reducer plumbing for a component's various behavioral aspects and data needs, or providing some kind of asynchronous operation that reads in a synchronous fashion, which makes reasoning about the internal workings of your component fairly brainless to comprehend.
      </div>
      <div className="mt-4 text-justify">
        Let's start with some of the basic functions provided by default from React itself. At the time of this writing, out of the box, React provides built-in functions for: <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#usestate">useState</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#useeffect">useEffect</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#usecontext">useContext</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#usereducer">useReducer</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#usecallback">useCallback</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#usememo">useMemo</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#useref">useRef</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#useimperativehandle">useImperativeHandle</ExternalLink>, <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#uselayouteffect">useLayoutEffect</ExternalLink>, and <ExternalLink href="https://reactjs.org/docs/hooks-reference.html#usedebugvalue">useDebugValue</ExternalLink>, and here's a brief description of each one:
      </div>
      <div className="mt-4 text-justify">
        <ul>
          <li>useState - Provides a getter value and setter function. Any updates to the stateful value will cause a rerender of the component.</li>
          <li>useEffect - Allows for its callback argument to be executed after the render phase has completed, for anything providing asynchronous behavior or any side-effects. If cleanup is needed, you can return a cleanup function to be executed any time it's reevaluated.</li>
          <li>useContext - Simplifies pulling values from a React v16.3+ Context object.</li>
          <li>useReducer - Provides a mini-implementation of what a Redux reducer might look like, for use within the current component tree. Provide it a reducer function and optional initial state, and receive back a state object and dispatch function for use in your view and any subcomponents to which you may wish to pass values and/or callbacks.</li>
          <li>useCallback - Allows you to create a memoized callback, which is reevaluated whenever any specified dependencies are updated. Useful for creating event listeners within your component, while maintaining consistent function references from one render cycle to the next.</li>
          <li>useMemo - Allows you to calculate a potentially-expensive operation once, unless any specified dependencies are updated. The output of this hook is the result of the passed callback, which is evaluated immediately.</li>
          <li>useRef - Generates a standard React ref object for use on any complex Components or host-components within the current view. Can also be used in the same way class member variables might have been used previously (e.g. tracking a <Highlight>_timeoutId</Highlight> value without wanting to trigger a render cycle).</li>
          <li>useImperativeHandle - Allows you to expose a custom API on the returned <Highlight>ref.current</Highlight> instance. Should be used in conjunction with <Highlight>React.forwardRef</Highlight> on the exported component.</li>
          <li>useLayoutEffect - Similar to <Highlight>useEffect</Highlight>, but primarily used for reading values from the DOM after any existing mutations have been reconciled and flushed. It's advised to start by using <Highlight>useEffect</Highlight>, and only using <Highlight>useLayoutEffect</Highlight> if that fails. Similar to <Highlight>useEffect</Highlight>, if cleanup is desired, it can be handled via a returned callback.</li>
          <li>useDebugValue - Allows you to add a label to an entry in the component tree in React DevTools, to signal to the developer what the current state of some value is.</li>
        </ul>
      </div>
      <div className="mt-4 text-justify">
        So, armed with this initial set of default functions, what can you do? Basically, anything you can think of. Want to read and write to some Context provider?
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`/* context.js */
import React, { createContext, useMemo, useState } from 'react';

const Context = createContext();

const MyContextProvider = ({ children }) => {
  const [someArrayValue, setSomeArrayValue] = useState();

  const value = useMemo(() => {
    add: someValue => {
      setSomeArrayValue(someArrayValue.concat(someValue));
    },

    remove: someValue => {
      setSomeArrayValue(someArrayValue.filter(val => val !== someValue));
    },

    someArrayValue,
  }, [someArrayValue, setSomeArrayValue]);

  return (
    <Provider value={value}>{children}</Provider>
  );
};

export {
  Context,
  MyContextualComponent as Provider,
};

/* index.js */
import { Provider } from './context';
import React from 'react';

import App from './app';

const Application = () => (
  <Provider>
    <App />
  </Provider>
);

export default Application;

/* downstream-consumer.js */
import React, { useContext } from 'react';

import { Context } from './context';
import SomeOtherComponent from './some-other-component';

const DownstreamConsumer = () => {
  const { add, remove, someArrayValue } = useContext(Context);

  return (
    <React.Fragment>
      <div>
        <button type="button" onClick={() => add(\`Value #$\{someArrayValue.length}\`)}>+</button>
      </div>
      <div>
        <SomeOtherComponent value={someArrayValue} />
      </div>
      <div>
        <button type="button" onClick={() => remove(someArrayValue[someArrayValue.length - 1])}>-</button>
      </div>
    </React.Fragment>
  );
};

export default DownstreamConsumer;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Need to bind a resize listener to the window and be updated with height and width values whenever it changes?
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React, { useCallback, useEffect, useMemo, useState } from 'react';

const useWindowResize = callback => {
  useEffect(() => {
    let raf = null;
    let { innerHeight: height, innerWidth: width } = window;

    const resize = () => {
      ({ innerHeight: height, innerWidth: width } = window);

      if (!raf) {
        raf = window.requestAnimationFrame(() => {
          raf = null;
          callback({ height, width });
        });
      }
    };

    window.addEventListener('resize', resize);

    callback({ height, width });

    return () => {
      window.removeEventListener('resize', resize);

      if (raf) {
        window.cancelAnimationFrame(raf);
      }
    }
  }, [callback]);
};

const ResizableComponent = ({ children }) => {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);

  const callback = useCallback(({ height: newHeight, width: newWidth }) => {
    if (newHeight !== height) {
      setHeight(newHeight);
    }
    if (newWidth !== width) {
      setWidth(newWidth);
    }
  }, [height, setHeight, setWidth, width]);

  useWindowResize(callback, [callback]);

  const style = useMemo(() => ({
    height: \`$\{height}px\`,
    width: \`$\{width}px\`,
  }), [height, width]);

  return (
    <div style={style}>
      <div>Container size is {width}x{height} pixels.</div>
      {children}
    </div>
  );
};

export default ResizableComponent;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Using the <Highlight>useWindowResize</Highlight> custom hook function allows you to pass a callback to that hook, which will establish a resize event listener on the window, and when triggered, record the height/width values and queue up an animation frame if one doesn't already exist. When that frame is fired, the last height/width values recorded will be passed to the callback in as object properties. In this instance, we use that to create a <Highlight>ResizableComponent</Highlight> that tracks the window height/width as internal state values, and uses the <Highlight>useCallback</Highlight> hook to create a memoized version of its callback for passing, which will receive the updated height/width values and update its own internal state with them. Finally, we use the <Highlight>useMemo</Highlight> hook to create a memoized style object to pass to the <Highlight>div</Highlight> wrapper we're rendering around the component's <Highlight>children</Highlight>. When this component mounts, the window resize handler will be automatically bound, and will fire your callback once at mount time, and via an animation frame any time the window is resized, causing your component to automatically adjust its own height and width to match. When the component unmounts, the resize handler will be automatically unbound via its returned callback, and any pending animation frame will be canceled.
      </div>
      <div className="mt-4 text-justify">
        Note that in none of these examples did we have to use class-based components for anything state- or lifecycle-related. Hooks store and retrieve all of their information for us within the context of a functional component. This is part of the reason the same number must always be executed, and in the same order, as the previous render cycle. Internally, React slots values into and reads values from predefined storage locations based on the order in which they were originally invoked. Because we're able to use functional components for all of these cases, they can also be paired with both the <Highlight>React.memo</Highlight> and <Highlight>React.forwardRef</Highlight> functions, to provide prop-level memoization and deeply-targeted component and element refs to your consumers.
      </div>
      <div className="mt-4 text-justify">
        Now that you've seen some examples of just how powerful and flexible the new Hooks API can be for your own component development, let's try an exercise. In this exercise, you'll be making use of some built-in React hook functions to build your own reusable hook (<Highlight>useTooltipCounter</Highlight>) that can be applied to any given component you want to apply it to. This hook should do the work described below, and return an object that can be destructured into values for <Highlight>count</Highlight>, <Highlight>open</Highlight>, <Highlight>x</Highlight>, and <Highlight>y</Highlight>. It should use these values to render a Tooltip-style popup that will follow the mouse location, but only when the mouse enters the region that the target element occupies, and it should disappear whenever the mouse leaves that region. The <Highlight>count</Highlight> value should be a shared counter which will update to reflect the number of times it's become visible, period. E.g. mousing over any targetable region for the first time should make a <Highlight>1</Highlight> appear in the Tooltip-style popup. Exiting and reentering the same region should make a <Highlight>2</Highlight> pop up. Exiting and entering a wholly-separate targetable region should display a <Highlight>3</Highlight>, and so forth. Try to figure out how to break these actions down into basic units of functionality, and compose a custom hook from those units to perform this job and make it super simple to apply this behavior to any given component on the page.
      </div>
      <div className="mt-4 text-justify">
        React allows you to easily attach event listeners to your components by means of its <Highlight>on*</Highlight> props, but that's too easy. In this situation, you should explicitly break the rule about touching the DOM directly, and when this custom hook is invoked on a component, it should set up an individual event listener via <Highlight>window.addEventListener</Highlight> and clean it up with <Highlight>window.removeEventListener</Highlight>, which means you'll also need access to some kind of element refs that will give you a handle to the targetable element. When you're ready, open the project's <FilePath>src/lessons/react-hooks/exercise.js</FilePath> file to start trying to implement your custom hook function, and apply it to the items in the provided list of elements.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="react-hooks" />
    </Lesson>
  );
};

export default ReactHooksLesson;
