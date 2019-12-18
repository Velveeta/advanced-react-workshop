import React from 'react';

import { Provider } from './context';

/**
 * Use this module to practice writing a higher-order component that can do some common
 * and reusable piece of work on behalf of other components in your application that
 * have need of it, so that you don't have to reimplement those behaviors in more and
 * more components all over the place within your application. Remember that a higher-
 * order component should receive (at a minimum) a Component class of some kind, and
 * should return a new Component class that renders that with some extra behavior or
 * data applied to it. Don't forget that consumers of your Component are probably going
 * to assume they're dealing with the raw Component itself, so when they pass props in,
 * they're probably going to expect to see them on the target Component instances, which
 * means you'll need to remember to output those incoming props as well.
 *
 * You don't need to do anything to the Person component except enhance it with the HOC
 * function you write for this exercise. Its prop names should be considered fixed, so
 * you just need to figure out how to map them from the fixture data field names, and
 * write the HOC function itself. The HOC function has been stubbed out for you, but
 * needs to have its implementation modified by you to make it work as expected.
 **/

const withContext = Component => Component;

const Person = ({ firstName, lastName, renderPerson, streetAddress }) => {
  if (!renderPerson) {
    return null;
  }

  return (
    <div>
      <div>Name: {firstName} {lastName}</div>
      <div>Street Address: {streetAddress}</div>
    </div>
  );
};

const ContextualPerson = withContext(Person);

const Exercise = () => (
  <Provider>
    <ContextualPerson renderPerson={true} />
  </Provider>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * // First, you'll need to import the Context Consumer for use in the HOC
 *
 * import { Consumer, Provider } from './context';
 *
 * // Now we can implement the HOC itself, adding a 'mappings' parameter to the function
 * // signature, and returning a new Component, which will receive some arbitrary set of
 * // props. When it renders, it would wrap its output in a Context Consumer and pass it
 * // a 'children' function, which receives the current context value. With that, we can
 * // iterate over the keys in the context object and map our fields from the proper keys
 * // in the context object to the proper prop names in the outgoing 'ctxProps' object.
 * // Then we render the original Component with those 'ctxProps' spread out as outgoing
 * // props to that Component, and then add a spread of the incoming 'props' object to
 * // that prop set as well, so that we can receive the 'renderPerson' prop being passed.
 *
 * const withContext = (Component, mappings) => {
 *   const ContextualComponent = props => {
 *     return (
 *       <Consumer>
 *         {context => {
 *           const ctxProps = Object.keys(mappings).reduce((acc, key) => {
 *             acc[mappings[key]] = context[key];
 *             return acc;
 *           }, {});
 *
 *           return <Component {...ctxProps} {...props} />;
 *         }}
 *       </Consumer>
 *     );
 *   };
 *
 *   return ContextualComponent;
 * };
 *
 * // Now we just have to amend the call to the HOC to add our field mappings, and done!
 *
 * const ContextualPerson = withContext(Person, {
 *   firstName: 'firstName',
 *   lastName: 'lastName',
 *   address: 'streetAddress',
 * });
 **/
