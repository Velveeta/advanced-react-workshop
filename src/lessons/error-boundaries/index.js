import React from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';
import NavigationFooter from '../../components/navigation/footer';

import Exercise from './exercise';
import Tips from './tips';

const ReactErrorBoundariesLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/error-boundaries.html', 'Error Boundaries');
  useRegisterNavLink('https://reactjs.org/docs/react-component.html#componentdidcatch', 'componentDidCatch');

  return (
    <Lesson tips={<Tips />}>
      <h1>Error Boundaries</h1>
      <div className="mt-4 text-justify">
        Unforeseen errors can cause an entire application to completely unmount in the middle of a user session, leaving them with no other recourse than to refresh their page, probably lose their work, and cross their fingers that it won't happen again. This is not good from a user-experience perspective, or for the reputation of your product in general, especially when the error is something non-mission-critical, from which your application could have easily recovered.
      </div>
      <div className="mt-4 text-justify">
        For this reason, React introduced the concept of error boundaries a while back. Error boundaries allow your component to act as a try/catch wrapper around portions of your component tree. You can use them as sparingly or as frequently as you desire, to ensure that one portion of your application doesn't bring down any other unrelated portions of the component tree. There's no special component type for this, all you have to do is add a <Highlight>componentDidCatch</Highlight> function to your component, and give it some (ideally) graceful way of recovering, such as the following:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const ErrorBoundary = class extends React.Component {
  state = {
    error: null,
  };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <SomethingWentWrong />;
    }

    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        In the above example, anything in the descendant component tree that happened to throw an actual error during the render cycle would simply cause the whole component tree to be replaced with this friendly <Highlight>SomethingWentWrong</Highlight> output. The rest of the application would continue functioning as normal.
      </div>
      <div className="mt-4 text-justify">
        When trying to determine how best to gracefully recover from a crash scenario, you need to try to take into account what might have caused the crash in the first place. Some detective work may be involved. Hopefully you're using something like Sentry or LogRocket for error reporting, and if so, that can be built right in to your component itself, or you can create a special dedicated ErrorBoundary component to wrap sections of your component tree, and house that logic in one place.
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`componentDidCatch(error, info) {
  Sentry.captureException(error, { extra: info });
  this.setState({ error });
}`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        Also, don't think you have to limit your use cases to anything so pedestrian as a glorified try/catch block. What if we could use custom error objects to relay information to our ErrorBoundary, and maybe even have custom handlers on them that allowed us the chance to recover?
      </div>
      <div className="mt-4 text-justify">
        Time for an exercise! In this lesson, we've explored the fairly simple way you can set up error boundaries around segments of your application, to prevent an error somewhere in a component tree from taking the entire application down. In this exercise, you'll implement your own ErrorBoundary component, and get some practice with custom error types. Whenever you're ready, open the project's <FilePath>src/lessons/error-boundaries/exercise.js</FilePath> file, and follow the instructions in the comments to start writing your own error boundaries.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="error-boundaries" />
    </Lesson>
  );
};

export default ReactErrorBoundariesLesson;
