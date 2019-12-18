import React from 'react';

import Highlight from '../../components/highlight';

const ReactSuspenseAndReactLazyTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        When using dynamic imports to load components, the import function itself will return a Promise that will eventually resolve with its module contents, complete with any <Highlight>default</Highlight> and/or named exports. The <Highlight>React.lazy</Highlight> HOC only knows that it receives a Promise that will eventually resolve with a <Highlight>default</Highlight> property that will be the target component for that lazy-loaded module.
      </div>
      <div className="mt-3 text-justify">
        The component returned from <Highlight>React.lazy</Highlight> can be embedded right into your view like any other component, without you needing to babysit the Promise state yourself. Nesting a lazy component underneath a <Highlight>React.Suspense</Highlight> component will allow you to specify what fallback UI to render during its loading phase. Placing <Highlight>React.Suspense</Highlight> components throughout your application can help minimize the impact that a fallback view has on the overall UI.
      </div>
    </div>
  </React.Fragment>
);

export default ReactSuspenseAndReactLazyTips;
