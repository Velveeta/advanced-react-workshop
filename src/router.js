import { BrowserRouter, Route } from 'react-router-dom';
import React, { lazy, Suspense } from 'react';

import Page from './components/page';

const DataAndServiceProvidersLesson = lazy(() => import('./lessons/data-and-service-providers'));
const ErrorBoundariesLesson = lazy(() => import('./lessons/error-boundaries'));
const HigherOrderComponentsLesson = lazy(() => import('./lessons/higher-order-components'));
const Home = lazy(() => import('./home'));
const ReactHooksLesson = lazy(() => import('./lessons/react-hooks'));
const ReactRefsLesson = lazy(() => import('./lessons/react-refs'));
const ReactSuspenseAndReactLazyLesson = lazy(() => import('./lessons/react-suspense-and-react-lazy'));
const RenderCallbacksLesson = lazy(() => import('./lessons/render-callbacks'));

const Router = () => (
  <BrowserRouter>
    <Page>
      <Suspense fallback={null}>
        <Route exact path="/" component={Home} />
        <Route path="/data-and-service-providers" component={DataAndServiceProvidersLesson} />
        <Route path="/error-boundaries" component={ErrorBoundariesLesson} />
        <Route path="/higher-order-components" component={HigherOrderComponentsLesson} />
        <Route path="/react-hooks" component={ReactHooksLesson} />
        <Route path="/react-refs" component={ReactRefsLesson} />
        <Route path="/react-suspense-and-react-lazy" component={ReactSuspenseAndReactLazyLesson} />
        <Route path="/render-callbacks" component={RenderCallbacksLesson} />
      </Suspense>
    </Page>
  </BrowserRouter>
);

export default Router;

// import { BrowserRouter, Route } from "react-router-dom";
// import React, { lazy, Suspense } from 'react';

// import LoadingSpinner from './components/loading-spinner';

// const DataAndServiceProvidersLesson = lazy(() => import('./lessons/data-and-service-providers'));
// const ErrorBoundariesLesson = lazy(() => import('./lessons/error-boundaries'));
// const HigherOrderComponentsLesson = lazy(() => import('./lessons/higher-order-components'));
// const Page = lazy(() => import('./components/page'));
// const ReactHooksLesson = lazy(() => import('./lessons/react-hooks'));
// const ReactRefsLesson = lazy(() => import('./lessons/react-refs'));
// const ReactSuspenseAndReactLazyLesson = lazy(() => import('./lessons/react-suspense-and-react-lazy'));
// const RenderCallbacksLesson = lazy(() => import('./lessons/render-callbacks'));

// const Home = lazy(() => import('./home'));

// const Router = () => (
//   <BrowserRouter>
//     <Page>
//       <Suspense fallback={<LoadingSpinner />}>
//         <Route exact path="/" component={Home} />
//         <Route path="/data-and-service-providers" component={DataAndServiceProvidersLesson} />
//         <Route path="/error-boundaries" component={ErrorBoundariesLesson} />
//         <Route path="/higher-order-components" component={HigherOrderComponentsLesson} />
//         <Route path="/react-hooks" component={ReactHooksLesson} />
//         <Route path="/react-refs" component={ReactRefsLesson} />
//         <Route path="/react-suspense-and-react-lazy" component={ReactSuspenseAndReactLazyLesson} />
//         <Route path="/render-callbacks" component={RenderCallbacksLesson} />
//       </Suspense>
//     </Page>
//   </BrowserRouter>
// );

// export default Router;
