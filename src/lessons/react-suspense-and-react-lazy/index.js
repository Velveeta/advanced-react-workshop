import { Button } from 'react-bootstrap';
import React, { lazy, Suspense, useCallback, useState } from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';
import LoadingSpinner from '../../components/loading-spinner';
import NavigationFooter from '../../components/navigation/footer';

import Exercise from './exercise';
import _import from './fake-import';
import LoremIpsum from './lorem-ipsum';
import Tips from './tips';

// _import artificially delays the resolution of this "import"
// so we can see the Suspense fallback
const LazyLoremIpsum = lazy(() => _import(LoremIpsum));

const ReactSuspenseAndReactLazyLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/code-splitting.html', 'React Code-Splitting');
  useRegisterNavLink('https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import#Dynamic_Imports', 'ES Dynamic Imports');

  const [showLazyContent, setShowLazyContent] = useState(false);
  const onClick = useCallback(() => {
    setShowLazyContent(true);
  }, []);

  return (
    <Lesson tips={<Tips />}>
      <h1>React.Suspense and React.lazy</h1>
      <div className="mt-4 text-justify">
        If you've used Webpack in the past (or any other bundler that allows for this feature), you may already be familiar with the concept of code-splitting and lazy-loading segments of your application on demand. Without this feature, it means you have to bundle your entire application up, and depending on its size, this can result in multiple megabytes of data being pushed to your client before the initial page can even render, which makes for a negative experience on the part of your users.
      </div>
      <div className="mt-4 text-justify">
        Code-splitting with React is pretty simple, and relies on an upcoming feature of the Javascript language itself: dynamic imports. You're probably already familiar with the standard import syntax:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

// do stuff with React`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        The dynamic import syntax is similar, but returns a Promise that resolves with the module contents once they're loaded, like so:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import('react').then(React => {
  // do stuff with React
});`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        <Highlight>React.lazy</Highlight> is a convenience function that wraps a dynamic import call in a component layer, so that the pending component can be embedded into your view like any other one. When the promise is resolved, the component will render as normal, without you having to babysit the Promise chain yourself. Its signature looks like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React from 'react';

const MyLazyComponent = React.lazy(() => import('./my-lazy-component'));

const MyLazyView = () => {
  <div>
    <div>Hello World!</div>
    <MyLazyComponent />
  </div>
};

export MyLazyView;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        <Highlight>React.lazy</Highlight> currently relies on your component definition being the <Highlight>default</Highlight> export from its loaded module, so if you're trying to reference a named export, you'll need to create an additional module wrapper that re-exports that named export as its own default export, and then lazy-load <i>that</i> module instead. <Highlight>React.lazy</Highlight> relies on React's new <Highlight>Suspense</Highlight> component. When React encounters a lazy-loaded component, it starts searching through its ancestors to find the closest <Highlight>Suspense</Highlight> component in the component tree. If it can't find any, it will throw an error, and if it <i>does</i> find one, it will use that <Highlight>Suspense</Highlight> component's <Highlight>fallback</Highlight> prop to render its subtree, until that lazy component has resolved and can be rendered.
      </div>
      <div className="mt-4 text-justify">
        The <Highlight>Suspense</Highlight> component allows you to specify anything you want as a fallback, from a spinner of some kind to some placeholder text, null, or whatever else you might want. You can embed as many <Highlight>Suspense</Highlight> components into your application as you wish, which means you can wrap a root-level one around your entire application as a catch-all, and then lower-level ones for different regions of your application UI. Be advised that if you rely on just a root-level <Highlight>Suspense</Highlight> wrapper, <i>any</i> unexpected lazy-loaded components found in the component tree will cause the entire application to be replaced by the fallback content. For more isolated fallback content, you would want to wrap those individual lazy components in their own <Highlight>Suspense</Highlight> layers, and only <i>those</i> subtrees within the application will be replaced with that fallback content.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React, { lazy, Suspense } from 'react';
import LoadingSpinner from './loading-spinner';

const MyLazyComponent = lazy(() => import('./my-lazy-component'));

const MyApp = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <SomeComponent />
    <Suspense fallback={<LoadingSpinner />}>
      <MyLazyComponent />
    </Suspense>
    <SomeOtherLazyView />
  </Suspense>
);

export MyApp;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        In the above example, when <Highlight>MyLazyComponent</Highlight> is mounted, <Highlight>SomeComponent</Highlight> would continue to be displayed while a <Highlight>LoadingSpinner</Highlight> was displayed in place of the <Highlight>MyLazyComponent</Highlight> component until it finished loading, but once <Highlight>SomeOtherLazyView</Highlight> is mounted, the root-level <Highlight>Suspense</Highlight> component would catch it and cause the entire application to disappear in favor of a <Highlight>LoadingSpinner</Highlight>. The <Highlight>Suspense</Highlight> component can wrap any number of components, and any that are being lazy-loaded will fall under the same fallback view. If we wanted to change the above view so that both <Highlight>MyLazyComponent</Highlight> and <Highlight>SomeOtherLazyView</Highlight> could be loaded lazily, with a single spinner, without wiping out the rest of the application to do it, we would simply need to move a single line:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`import React, { lazy, Suspense } from 'react';
import LoadingSpinner from './loading-spinner';

const MyLazyComponent = lazy(() => import('./my-lazy-component'));

const MyApp = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <SomeComponent />
    <Suspense fallback={<LoadingSpinner />}>
      <MyLazyComponent />
      <SomeOtherLazyView />
    </Suspense>
  </Suspense>
);

export MyApp;`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Now the <Highlight>Suspense</Highlight> component will wait for <strong>both</strong> of those lazy-loaded components to resolve, and display the fallback <Highlight>LoadingSpinner</Highlight> in their place until both are available. In the meantime, the <Highlight>SomeComponent</Highlight> component will be rendered as normal, along with anything else in the application tree.
      </div>
      {showLazyContent
        ? (
          <div className="mt-4 text-justify">
            <Suspense fallback={<LoadingSpinner />}>
              <LazyLoremIpsum />
            </Suspense>
          </div>
        ) : (
          <div className="mt-4 text-center">
            <React.Fragment>
              <Button onClick={onClick} variant="primary">Show Lazy Content</Button>
              &nbsp;
            </React.Fragment>
          </div>
        )
      }
      <div className="mt-4 text-justify">
        Now that we've covered the new <Highlight>React.Suspense</Highlight> and <Highlight>React.lazy</Highlight> offerings, let's use them to lazy-load some components in this lesson's exercise. Open the project's <FilePath>src/lessons/react-suspense-and-react-lazy/exercise.js</FilePath> file to get started assembling some lazy-loaded component views.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="react-suspense-and-react-lazy" />
    </Lesson>
  );
};

export default ReactSuspenseAndReactLazyLesson;
