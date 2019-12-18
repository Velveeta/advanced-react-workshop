import React from 'react';

// eslint-disable-next-line no-unused-vars
import AuthorizationFailure from './authorization-failure';
// eslint-disable-next-line no-unused-vars
import InvalidJson from './invalid-json';
import WorkingComponent from './working-component';

/**
 * Use this module to practice writing your own ErrorBoundary component that will be
 * responsible for limiting the extent to which an erroneous subcomponent can take down
 * your application. 2 custom error types have been provided in the './error-types'
 * folder: AuthorizationFailureError and InvalidJsonError. 2 Components have also been
 * provided: AuthorizationFailure and InvalidJson. When you're ready, you'll need to
 * add each of these Components to the Exercise view, which will cause the entire view
 * to crash. Implement an ErrorBoundary component to wrap around each of these components,
 * to try to prevent those thrown errors from bringing down the rest of the application.
 * If you want to start exploring some of the erroneous views, and digging deeper into
 * the error types that are being thrown, you might just find a handy way of dealing
 * with these errors as they spring up in the application. As always, if you get stuck,
 * check the lesson tips, and there's a solution provided in the comments down at the
 * bottom of this module.
 **/

const ErrorBoundary = ({ children }) => <React.Fragment>{children}</React.Fragment>;

// The style below is to suppress create-react-app's error overlay for this exercise
const Exercise = () => (
  <React.Fragment>
    <style>{`iframe { display: none }`}</style>
    <div>
      <ErrorBoundary>
        <WorkingComponent />
      </ErrorBoundary>
    </div>
  </React.Fragment>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/





























/**
 * const ErrorBoundary = class extends React.Component {
 *   state = {
 *     error: null,
 *   };
 *
 *   componentDidCatch(error) {
 *     if (error.handler) {
 *       const logger = (data) => {
 *         console.log('Error: ', error, data);
 *         // Or, if using Sentry, maybe something like this:
 *         // Sentry.captureException(error, { extra: data });
 *       };
 *
 *       error.handler(logger);
 *     }
 *
 *     this.setState({ error });
 *   };
 *
 *   render() {
 *     if (this.state.error) {
 *       if (this.state.error.render) {
 *         return <React.Fragment>{this.state.error.render()}</React.Fragment>;
 *       }
 *
 *       return null;
 *     }
 *
 *     return <React.Fragment>{this.props.children}</React.Fragment>;
 *   }
 * };
 *
 * const Exercise = () => (
 *   <React.Fragment>
 *     <style>{`iframe { display: none }`}</style>
 *     <div>
 *       <ErrorBoundary>
 *         <AuthorizationFailure />
 *       </ErrorBoundary>
 *     </div>
 *     <div>
 *       <ErrorBoundary>
 *         <InvalidJson />
 *       </ErrorBoundary>
 *     </div>
 *     <div>
 *       <ErrorBoundary>
 *         <WorkingComponent />
 *       </ErrorBoundary>
 *     </div>
 *   </React.Fragment>
 * );
 **/
