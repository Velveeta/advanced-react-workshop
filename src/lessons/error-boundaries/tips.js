import React from 'react';

import Highlight from '../../components/highlight';

const ErrorBoundariesTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        It's good to have a single, generic <Highlight>ErrorBoundary</Highlight> type of component in your projects, for catching errors in an abstract way (and ideally reporting them to some external service so you can be notified of errors that are trapped out in the wild). However, don't feel like you need to limit yourself to one single type of <Highlight>ErrorBoundary</Highlight> component.
      </div>
      <div className="mt-3 text-justify">
        If you conceptualize your project as a series of functional slices, each of which may have its own quirks, and each of which may have its own custom ways of gracefully degrading (or recovering) in the case of errors, you can always have a singular root-level <Highlight>ErrorBoundary</Highlight> component that does nothing more than report the error, and more custom <Highlight>RetryErrorBoundary</Highlight> or <Highlight>PlaceholderErrorBoundary</Highlight> types of components that provide some mechanism of recovery or relaying an error state to the user, while also re-throwing the error to the parent <Highlight>ErrorBoundary</Highlight> for logging to that external service.
      </div>
      <div className="mt-3 text-justify">
        Just like <Highlight>try/catch</Highlight> statements are often very contextually diverse, based on the snippet(s) of code they're surrounding, you may have a diverse array of <Highlight>ErrorBoundary</Highlight> components in your toolbox, for handling different types of application error states. Just try to always make sure that those errors are logged in some way, so you don't lose that data.
      </div>
    </div>
  </React.Fragment>
);

export default ErrorBoundariesTips;
