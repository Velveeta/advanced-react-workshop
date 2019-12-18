import React from 'react';

import CodeBlock from '../../components/code-block';
import Highlight from '../../components/highlight';

const RenderCallbacksTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        Render callbacks allow you to package up some kind of feature set that you may want to use in multiple places around your application, and have it applied to your component views, while also allowing the consumers to have huge flexibility in rendering exactly what they want in those views. In other words, consuming that component for its behavioral aspects doesn't mean you also have to render some preconceived view that might have been written for that component.
      </div>
      <div className="mt-3 text-justify">
        Some examples of things that might make good candidates for using render callbacks are any kind of precomputed values that don't directly pertain to what you're wanting to render, but help inform how they render, such as calculating container or window dimensions, some kind of <Highlight>isLoading</Highlight> state, or anything else that your view doesn't need to concern itself with computing directly, but that would be helpful in rendering itself.
      </div>
      <div className="mt-3 text-justify">
        Render callbacks and higher-order components are similar in nature, in that they both involve prepackaging some functional or behavioral aspects into a reusable component that can be used by your views at runtime, without having to build that logic into your components themselves. The main difference is that higher-order components rely on a precomposed component relationship (e.g. you pass a specific component to the HOC function, and get back a new component that will only ever render the original component), and render callbacks allow you to specify those component views in an ad-hoc fashion, even buried in the middle of some other component view. The rendered child view can be changed every single time the component is used, because it's done inline at the point of consumption. Additionally, the HOC pattern has the potential for prop name collisions, as the props of the HOC are predefined and passed as props to the child component, which may or may not already have a prop with the same name. Render callbacks predefine their props as well, but pass them as parameters to the render callback function, allowing you to hand them to your target component as withever prop name you wish.
      </div>
      <div className="mt-3 text-justify">
        All that needs to be done to make use of render callbacks is to decide which prop will be invoked as a function to return your view. Then, during the render cycle, invoke it and pass it whatever data points are expected.
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`import React from 'react';

const MyRenderCallbackComponent = ({ children }) => children();

export default MyRenderCallbackComponent;

/**
 * Example Usage:
 *
 * <MyRenderCallbackComponent>
 *   {() => (
 *     <div>Hello World!</div>
 *   )}
 * </MyRenderCallbackComponent>
 **/`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        That's literally the bare minimum to implementing a render callback function, though they're much more helpful when you pass additional data from the parent to the child through that callback layer, which might be height/width data, callback handlers, some service instance, or anything else your child view can make use of when rendering itself.
      </div>
    </div>
  </React.Fragment>
);

export default RenderCallbacksTips;
