import React from 'react';

import CodeBlock from '../../components/code-block';
import Highlight from '../../components/highlight';

const ReactHooksTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        The React Hooks API allows you to take low-level, out-of-the-box hook functions that React provides, and compose them into higher-level hook functions for your own use. A simple example might look like this, if you ever needed to be aware of the window dimensions any time a resize operation was performed.
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`import React, { useCallback, useEffect, useState } from 'react';

const useWindowDimensions = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const [width, setWidth] = useState(window.innerWidth);

  const onResize = useCallback(() => {
    const { innerHeight, innerWidth } = window;

    setHeight(innerHeight);
    setWidth(innerWidth);
  });

  useEffect(() => {
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    }
  }, []);

  return { height, width };
};

export default useWindowDimensions;

/**
 * Example Usage:
 *
 * const MyComponent = () => {
 *   const { height, width } = useWindowDimensions();
 *   const style = {
 *     height: \`$\{height / 2}px\`,
 *     width: \`$\{width / 2}px\`,
 *   };
 * };
 **/`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        Now, any component that needs to know the window dimensions at any time can simply destructure them out of the return of this custom hook function. You could then compose this into yet another custom hook, if you wanted to be informed of which of a given set of Component layouts you wanted to use, based on window dimensions. Imagine something like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`import React from 'react';

import useWindowDimensions from './hooks/use-window-dimensions';

const useLayoutComponent = layoutMap => {
  const { height, width } = useWindowDimensions();

  if (width >= 1024) {
    return layoutMap.desktop;
  }

  if (width >= 768) {
    return layoutMap.tablet;
  }

  return layoutMap.mobile;
};

export default useLayoutComponent;

/**
 * Example Usage:
 *
 * const MyComponent = props => {
 *   const Component = useLayoutComponent({
 *     desktop: DesktopLayout,
 *     mobile: MobileLayout,
 *     tablet: TabletLayout,
 *   });
 *
 *   return <Component {...props} />;
 * };
 **/`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        Now, not only are we tracking window resize events when <Highlight>MyComponent</Highlight> mounts (and cleaning up that listener when it unmounts), but any time those dimensions change, we're also automatically evaluating them against a list of predefined width breakpoints, and potentially swapping out the entire Component implementation based on the current window width, so that we have a Component view that best works for the size of the window we're currently rendering within. This could be made even more generic, to take an input width as part of its parameter list, and could then return the same kind of output, but be consumed by either a <Highlight>useMediaQueryComponent</Highlight> or <Highlight>useElementQueryComponent</Highlight> custom hook, each of which would pipe their own width value into it, based on either the window in general, or the containing element that this component was rendering into.
      </div>
      <div className="mt-3 text-justify">
        This exercise has a lot of various aspects to keep in mind as you try to work your way through it. First will be for you to use the passed <Highlight>ref</Highlight> to set up some <Highlight>mouseenter</Highlight> and <Highlight>mouseleave</Highlight> event listeners via the native <Highlight>addEventListener</Highlight> and <Highlight>removeEventListener</Highlight> functions. Using those, you can determine when to toggle your <Highlight>open</Highlight> state between true and false, and you'll want to track that via some state parameter inside of your hook. You'll also need a way to track the mouse in realtime as it navigates through these boxes, which means you'll probably want to set up a <Highlight>mousemove</Highlight> listener as well, but that really only needs to be active once a box has been entered, and can be deactivated when a box is exited, so think about how to use your existing hook data to determine when to attach and remove that event listener. Don't forget to clean up after yourself also, in case this Component unmounts. You don't want to create a memory leak by leaving event listeners bound after their elements have been removed from the DOM.
      </div>
      <div className="mt-3 text-justify">
        Once you have the basic event infrastructure in place, and can track the X/Y coordinates in real time, you'll want to persist that coordinate info via state parameters inside of your hook as well. Don't forget that we really only ever need to do this when a cell <Highlight>isActive</Highlight>, so did you find a way to get that data from your Component view into your hook function? You can't conditionally invoke hook functions or else React will complain, so once you've established how to perform this <Highlight>effect</Highlight>ful code against a <Highlight>layout</Highlight> element, you'll want to make sure the hook(s) always fire, but surround the internals with a check for the <Highlight>isActive</Highlight> value.
      </div>
      <div className="mt-3 text-justify">
        If you've made it this far, and are having issues with the counter parameter being tracked on a per-cell (vs shared) basis, so that each cell is only tracking the count of its own mouseovers, you probably used the <Highlight>useState</Highlight> hook to track that value. Doing it this way will isolate that stateful value to a particular instance of a React component, but what we want is a shared counter among all of these instances. That means you'll want to <Highlight>use</Highlight> something like <Highlight>Context</Highlight> instead. If you create a new React Context object, you can use its Provider to store a stateful value, and pass an <Highlight>increment</Highlight> type of function down to its consumers, to be invoked any time one of these cells is entered. Don't forget to wrap that Provider around the root node so that all of its Consumers can make use of it!
      </div>
    </div>
  </React.Fragment>
);

export default ReactHooksTips;
