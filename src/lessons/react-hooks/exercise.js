import React, { useMemo, useRef } from 'react';

import fixture from './fixture';
import Tooltip from './tooltip';

import './exercise.css';

/**
 * Use this module to practice implementing custom hooks for use in your own application.
 * In this scenario, we want to have multiple 'active' areas that have little Tooltip-style
 * elements appear to their upper-right. A lot of the foundation of this exercise has been
 * provided for you already, but the bulk of the hook programming itself is left entirely
 * up to you to implement.
 *
 * A 'Tooltip' component is already written, which relies on a generic positionable 'Layer'
 * component that simply takes coordinates and an 'open' prop, and renders the provided
 * content wherever it's told to render, and only when it's told to render it. A set of
 * fixture data has also been provided, which stores information about which cells of this
 * demo are active (denoted by the 'isActive' property). The scaffolding for the demo has
 * been provided in the form of 2 Components: DemoCells and DemoCell, as well as a utility
 * function to calculate X/Y offsets for the Tooltip based on the incoming mouse event. A
 * ref has also been applied to each cell, in order to be used in the useTooltipCounter
 * hook you'll be writing, because you'll need to have access to the DOM nodes themselves
 * in order to set up your event listeners.
 *
 * The 'useTooltipCounter' hook function has been given a set of default outputs, but these
 * are incorrect. Remember that 'open' should be true when an active element is entered,
 * and false when it's exited, x and y coordinates can be obtained by way of the utility
 * function provided (getXYOffsetForTooltip), and 'count' should be a global-level counter
 * variable, which is shared among all instances of these DemoCell components, and which
 * should increment every single time a Tooltip is shown, starting with the number 1 (as
 * opposed to a 0).
 *
 * This is a difficult challenge, so it's entirely possible (and expected) that you may get
 * stuck in at least one spot during the implementation process. Try to break it down into
 * logical steps that need to be fulfilled, and walk through them one at a time, adding a
 * piece to your solution each step of the way. If you get stuck, make sure to read the
 * Tips provided in the lesson, and if you get *really* stuck, a solution has been provided
 * for you far down in this file.
 **/

// Uncomment this function when you're ready to use it
// const getXYOffsetForTooltip = e => ({
//   xOffset: e.pageX + 10,
//   yOffset: e.pageY - 10,
// });

const useTooltipCounter = ref => ({
  count: 0,
  open: false,
  x: 0,
  y: 0,
});

const DemoCell = ({ children, className, isActive }) => {
  const ref = useRef();
  const { count, open, x, y } = useTooltipCounter(ref, isActive);
  const content = useMemo(() => <div>{count}</div>, [count]);

  return (
    <div className={className} ref={ref}>
      <Tooltip content={content} open={open} x={x} y={y}>
        {children}
      </Tooltip>
    </div>
  );
};

const DemoCells = () => (
  <div>
    {fixture.map((row, outerIndex) => (
      <div className="d-flex justify-content-between" key={`row_${outerIndex}`}>
        {row.map((cell, innerIndex) => (
          <DemoCell className={cell.className} isActive={cell.isActive} key={`cell_${innerIndex}`}>
            {cell.content}
          </DemoCell>
        ))}
      </div>
    ))}
  </div>
);

const Exercise = () => (
  <DemoCells />
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * // We're going to need a lot more base hook functions pulled in for this exercise.
 * // In my own endeavor to solve the problem, I ended up using 6 out of the 10 default
 * // hook functions provided by React. Make sure you edit your imports to include them.
 *
 * import React, {
 *   useCallback,
 *   useContext,
 *   useLayoutEffect,
 *   useMemo,
 *   useRef,
 *   useState,
 * } from 'react';
 *
 * // If we use local state within the useTooltipCounter hook in order to track the
 * // counter we want displaying in a shared fashion across our active instances, each
 * // counter will only hold state for its own individual component instance. This isn't
 * // what the instructions called for. It called for a shared counter amongst all of the
 * // component instances. That means we're going to need to use Context to store its value.
 *
 * const CounterContext = React.createContext();
 * const { Provider } = CounterContext;
 *
 * // Using the useCallback and useMemo hooks will ensure that we're passing consistent
 * // function and object references down to our consumers, to avoid unnecessary rerenders.
 * const CounterProvider = ({ children }) => {
 *   const [count, setCount] = useState(0);
 *   const increment = useCallback(() => {
 *     setCount(count + 1);
 *   }, [count, setCount]);
 *   const value = useMemo(() => ({
 *     count,
 *     increment,
 *   }), [count, increment]);
 *
 *   return <Provider value={value}>{children}</Provider>;
 * };
 *
 * // Here's the core of our code exercise. Remember that we only want this to be wired
 * // up for 'active' components (denoted by the 'isActive' property), but also remember
 * // that hooks must always fire the same number of times and in the same orders as they
 * // originally fire. That means we can't conditionally apply a hook itself, because the
 * // value of that condition could change at some point. We must always apply the hooks
 * // themselves, and make sure that the contents of them are property gated by conditions
 * // to limit what happens when those conditions are false. In this case, that means we
 * // have to expand the function signature of our useTooltipCounter hook itself, to also
 * // accept an 'isActive' flag in addition to the element 'ref'. Internally, we also need
 * // to pull our current count value and increment function from context, and declare 3
 * // individual pieces of state to store the 'open', 'x', and 'y' values for our Tooltip.
 * // In the future, we could improve this code by possibly moving those up into a shared
 * // Context instance as well, since there's no reason each component instance needs to
 * // individually store 'open', 'x', and 'y' for a shared Tooltip display.
 * const useTooltipCounter = (ref, isActive) => {
 *   const { count, increment } = useContext(CounterContext);
 *   const [open, setOpen] = useState(false);
 *   const [x, setX] = useState(0);
 *   const [y, setY] = useState(0);
 *
 *   // We use the 'useLayoutEffect' hook here because we need this to fire after all of
 *   // our DOM changes have been flushed, since we need access to 'ref.current' to bind
 *   // up our event listeners. We gate the internal code of this callback, to check for
 *   // the 'isActive' value and only actually perform the contents of this callback if
 *   // the current instance 'isActive'.
 *   useLayoutEffect(() => {
 *     if (isActive) {
 *       // Create event listeners for 'onMouseMove', 'onMouseEnter', and 'onMouseLeave',
 *       // because we need to set 'open' to true 'onMouseEnter', false on 'onMouseLeave',
 *       // and between those 2 points, we need the X/Y coordinates to track the mouse as
 *       // it moves around. Use the 'getXYOffsetForTooltip' utility function to pull the
 *       // appropriate offset values from the event objects whenever the events are fired.
 *       const onMouseMove = e => {
 *         const { xOffset, yOffset } = getXYOffsetForTooltip(e);
 *         setX(xOffset);
 *         setY(yOffset);
 *       };
 *       // For 'onMouseEnter' specifically, we also want to 'increment' the 'count' value
 *       // in our global Context object, to track the number of times the Tooltip has been
 *       // rendered. We also want to use this opportunity to wire up our 'mousemove' handler.
 *       const onMouseEnter = e => {
 *         increment();
 *         const { xOffset, yOffset } = getXYOffsetForTooltip(e);
 *         setX(xOffset);
 *         setY(yOffset);
 *         setOpen(true);
 *         ref.current.addEventListener('mousemove', onMouseMove);
 *       };
 *       // When onMouseLeave fires, we want to make sure to unbind the onMouseMove handler,
 *       // since we don't care about tracking the mouse when the Tooltip isn't being shown.
 *       const onMouseLeave = e => {
 *         setOpen(false);
 *         setX(0);
 *         setY(0);
 *         ref.current.removeEventListener('mousemove', onMouseMove);
 *       };
 *
 *       // Here, we go ahead and wire up our 'onMouseEnter' and 'onMouseLeave' handlers.
 *       ref.current.addEventListener('mouseenter', onMouseEnter);
 *       ref.current.addEventListener('mouseleave', onMouseLeave);
 *
 *       // We return a cleanup function, which will remove the event listeners for all 3 of
 *       // these event types, to avoid memory leaks. We include the 'onMouseMove' handler
 *       // here, despite the fact that it's cleaned up during 'onMouseLeave', because it's
 *       // possible that this component could be unmounted before 'onMouseLeave' is fired.
 *       return () => {
 *         ref.current.removeEventListener('mouseenter', onMouseEnter);
 *         ref.current.removeEventListener('mouseleave', onMouseLeave);
 *         ref.current.removeEventListener('mousemove', onMouseMove);
 *       };
 *     }
 *     // The following line is only included because of the eslint settings for this project.
 *     // The react-hooks/exhaustive-deps rule is a good rule to have in place, to make sure
 *     // that your useCallback, useEffect, useLayoutEffect, useMemo, useEtc calls are set up
 *     // to reconstruct themselves if any external dependencies they're using might change.
 *     // In this specific instance, I only care about whether the 'increment' parameter has
 *     // changed (if I don't include that dependency, the 'increment' function, no matter how
 *     // many times it's called, will always be adding 1 to the initial valud of 'counter',
 *     // and the counter will never appear to update), it's the only dependency I want to add
 *     // to this list, even though internally, we're also making use of 'isActive' 'setOpen',
 *     // 'setX', 'setY', and 'ref'.
 *     // eslint-disable-next-line react-hooks/exhaustive-deps
 *   }, [increment]);
 *
 *   // Here, we return all of these values for destructuring at the consumer level.
 *   return {
 *     count,
 *     open,
 *     x,
 *     y,
 *   };
 * };
 *
 * // The final step is to make sure to wrap the Exercise contents themselves in our Context
 * // Provider, the 'CounterProvider', to make use of that global counter in our Components.
 * const Exercise = () => (
 *   <CounterProvider>
 *     <DemoCells />
 *   </CounterProvider>
 * );
 **/
