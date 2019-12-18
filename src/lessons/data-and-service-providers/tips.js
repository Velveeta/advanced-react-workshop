import React from 'react';

import CodeBlock from '../../components/code-block';
import ExternalLink from '../../components/external-link';
import Highlight from '../../components/highlight';

const DataAndServiceProvidersTips = () => (
  <React.Fragment>
    <div className="m-1">
      <div className="text-justify">
        To complete the first half of this exercise, it will be useful for you to employ an <ExternalLink href="https://addyosmani.com/resources/essentialjsdesignpatterns/book/#observerpatternjavascript">observer pattern</ExternalLink>, which can allow you to pass a callback function of your own to your service. Any time the toggle function is called to change that value, your service can then loop through its list of subscribed callbacks and execute them one by one. You may also want to consider passing the new value as a parameter to that callback, so it can have easy access to the updated value. A generic recipe for a pattern like this might look something like:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`const mySubscribableService = {
  subscriptions: [],
  currentValue: null,

  alertSubscribers() {
    this.subscriptions.forEach(callback => {
      callback(this.currentValue);
    });
  },

  changeValue(newValue) {
    this.currentValue = newValue;
    this.alertSubscribers();
  },

  subscribe(callback) {
    this.subscriptions.push(callback);
  }
};`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        Don't forget that you'll also want to provide some kind of mechanism for cleaning up after yourself, so you don't accrue more and more subscriptions over time with no way to prune them, and leak memory over the life of your application.
      </div>
      <div className="mt-3 text-justify">
        If you're wanting to implement this sort of scenario using a React <Highlight>Context</Highlight> pair, you should almost be able to directly migrate your service singleton into a <Highlight>ServiceProvider</Highlight> component, using local state to store the current value, and passing that value and an updater function as the current Provider's <Highlight>value</Highlight> prop.
      </div>
      <div className="mt-3 text-justify">
        Remember that React Context Providers are nestable, and any time a <Highlight>Consumer</Highlight> is embedded into the component tree, it will pull its value from its closest ancester <Highlight>Provider</Highlight>, which means that lower-down Providers in the component tree can override values from higher-up, and can even receive their own default values by wrapping themselves in a <Highlight>Consumer</Highlight> wrapper. If you want to default a <Highlight>Provider</Highlight> to a certain value, all you need to do is pass a prop to it, like you would any other component, and interpret that prop within the <Highlight>Provider</Highlight> component, to use as a default for its own internal state value(s). To inherit a value from an ancestor <Highlight>Provider</Highlight>, and assign it as a default to a nested <Highlight>Provider</Highlight>, you might do something like this:
      </div>
      <div className="mt-3 text-justify">
        <CodeBlock>{`<MyConsumer>
  {context => (
    <MyProvider someValue={context.someValue}>
      <SomeOtherNestedContextAwareComponent />
    </MyProvider>
  )}
</MyConsumer>`}</CodeBlock>
      </div>
      <div className="mt-3 text-justify">
        Within <Highlight>MyProvider</Highlight>, you would simply use <Highlight>this.props.someValue</Highlight> to initialize your internal value, before letting it manage itself from that point onward.
      </div>
    </div>
  </React.Fragment>
);

export default DataAndServiceProvidersTips;
