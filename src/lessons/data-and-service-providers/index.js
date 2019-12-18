import { Button } from 'react-bootstrap';
import React, { useCallback, useState } from 'react';

import { useRegisterNavLink } from '../../components/navigation/hooks';
import CodeBlock from '../../components/code-block';
import ExerciseSandbox from '../../components/exercise-sandbox';
import ExternalLink from '../../components/external-link';
import FilePath from '../../components/file-path';
import Highlight from '../../components/highlight';
import Lesson from '../../components/lesson';
import LoadingSpinner from '../../components/loading-spinner';
import NavigationFooter from '../../components/navigation/footer';

import Exercise from './exercise';
import LocalStorage from './local-storage';
import SessionStorage from './session-storage';
import Tips from './tips';

import './index.css';

const myApi = {
  async getUserData() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          email: 'testuser@company.com',
          name: {
            first: 'Test',
            last: 'Name',
          },
          phone: '(800) 555-1212',
          username: 'TestUser',
        });
      }, 2000);
    });
  },
};

const { Consumer: UserDataConsumer, Provider } = React.createContext();

const UserDataProvider = class extends React.Component {
  state = {
    user: null,
  };

  componentDidMount() {
    if (!this.state.user) {
      this._requestUserData();
    }
  }

_requestUserData = async () => {
    this.setState({ user: null });
    this.setState({ user: await myApi.getUserData() });
  };

  render() {
    const value = {
      requestUserData: this._requestUserData,
      user: this.state.user,
    };

    return <Provider value={value}>{this.props.children}</Provider>;
  }
};

const UserDetails = () => (
  <fieldset>
    <legend>User Data</legend>
    <UserDataConsumer>
      {({ user }) => (
        user
          ? (
            <React.Fragment>
              <div>Username: {user.username}</div>
              <div>Name: {user.name.first} {user.name.last}</div>
              <div>Email: {user.email}</div>
              <div>Phone: {user.phone}</div>
            </React.Fragment>
          ) : (
            <LoadingSpinner />
          )
      )}
    </UserDataConsumer>
  </fieldset>
);

const WebStorageTextInput = class extends React.Component {
  state = {
    storageEngine: 'localStorage',
  };

  _onChange = e => {
    this.setState({ storageEngine: e.target.value });
  };

  render() {
    const Component = (this.state.storageEngine === 'localStorage' ? LocalStorage : SessionStorage);

    return (
      <div>
        <div>
          <select onChange={this._onChange} value={this.state.storageEngine}>
            <option value="localStorage">localStorage</option>
            <option value="sessionStorage">sessionStorage</option>
          </select>
        </div>
        <div style={{ marginTop: '10px' }}>
          <Component item="testValue">
            {({ remove, set, value }) => (
              <div className="clearable-input">
                <input type="text" onChange={e => set(e.target.value)} value={value || ''} />
                <div className="remove" onClick={remove}>&times;</div>
              </div>
            )}
          </Component>
        </div>
      </div>
    );
  }
};

const DataAndServiceProvidersLesson = () => {
  useRegisterNavLink('https://reactjs.org/docs/context.html', 'React Context');
  useRegisterNavLink('https://www.apollographql.com/docs/react/v2.5/essentials/queries/#the-query-component', 'Apollo Query Component')

  const [showAdditionalUserDetails, setShowAdditionalUserDetails] = useState(false);
  const addAdditionalUserDetails = useCallback(() => {
    setShowAdditionalUserDetails(true);
  }, [setShowAdditionalUserDetails]);

  return (
    <Lesson tips={<Tips />}>
      <h1>Data and Service Providers</h1>
      <div className="mt-4 text-justify">
        React component wrappers provide a great solution for taking what would traditionally be imperative code that one might author for consuming an API of some sort, and turning it into a declarative construct that can easily be embedded into your React views. This lesson will expand on that concept, using a combination of techniques, to demonstrate a few different use cases where having an embeddable component can help make your views more readable, while reimagining traditional API calls.
      </div>
      <div className="mt-4 text-justify">
        Imagine a custom API you might invoke to provide your component(s) with some data that needs to be fetched from the server, localStorage, or any other location. You could easily consume that API module directly, within any component that needed that data, using <Highlight>componentDidMount</Highlight> and <Highlight>componentDidUpdate</Highlight> and passing props to API calls, or you could encapsulate that logic within a declarative component wrapper, such as a React context Provider, store the response when it completes, and embed a context Consumer wrapper anywhere you needed that data. In this way, you could ensure that the data was only ever requested once for any number of consumers, rather than every single time a component was unmounted and remounted.
      </div>
      <div className="mt-4 text-justify">
        This type of setup would also leave the Component acting as a bridge to the underlying API, so that as modifications were made over time, you would only need to modify that bridge, rather than every single Component that needed API data, had its own imperative code for consuming that API, and would need to be edited one by one, no matter where those components lived in the application. It would also prevent the situation where some of your data-driven components were pulling fresh/updated data as they mounted, while other previously-mounted components were stuck with stale and out-of-sync data. Since all components would be pulling from a single source of truth, they would either all be stale at the same time, or all be populated by fresh data, depending on your caching strategy.
      </div>
      <div className="mt-4 text-justify">
        Here's a quick example demonstrating what it might look like to have a <Highlight>UserDataProvider</Highlight> type of component, which would be responsible for sourcing and providing that data to its children by way of a context Consumer:
      </div>
      <div className="mt-4 text-justify">
        <UserDataProvider>
          <div>
            {!showAdditionalUserDetails && (
              <Button onClick={addAdditionalUserDetails}>Add Another User Details Block</Button>
            )}
            <UserDetails />
          </div>
          {showAdditionalUserDetails && (
            <div>
              <UserDataConsumer>
                {({ requestUserData }) => (
                  <Button onClick={requestUserData}>Re-request User Data</Button>
                )}
              </UserDataConsumer>
              <UserDetails />
            </div>
          )}
        </UserDataProvider>
      </div>
      <div className="mt-4 text-justify">
        Other examples of how you might wrap a traditionally-imperative API in a declarative component wrapper might include using various types of <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API">Web Storage APIs</ExternalLink>, such as <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage">localStorage</ExternalLink> or <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage">sessionStorage</ExternalLink>, so that you can use those storage engines to track stateful changes, like those within managed form elements, and persist that data across page loads, like this:
      </div>
      <div className="mt-4 text-justify">
        <CodeBlock>{`const WebStorageTextInput = class extends React.Component {
  state = {
    storageEngine = 'localStorage',
  };

  _onChange = e => {
    this.setState({ storageEngine: e.target.value });
  };

  render() {
    const Component = (this.state.storageEngine === 'localStorage' ? LocalStorage : SessionStorage);

    return (
      <div>
        <div>
          <select onChange={this._onChange}>
            <option value="localStorage">localStorage</option>
            <option value="sessionStorage">sessionStorage</option>
          </select>
        </div>
        <div>
          <Component item="testValue">
            {({ remove, set, value }) => (
              <div className="clearable-input">
                <input type="text" onChange={e => set(e.target.value)} value={value || ''} />
                <div className="remove" onClick={remove}>&times;</div>
              </div>
            )}
          </Component>
        </div>
      </div>
    );
  }
};`}</CodeBlock>
      </div>
      <div className="mt-4 text-justify">
        <WebStorageTextInput />
      </div>
      <div className="mt-4 text-justify">
        Now that you've seen just how easy it can be to wrap some kind of service provider as a declarative Component within the React ecosystem, it's time to try implementing your own service provider, which will supply some theme support to your application. When you're ready, open the project's <FilePath>src/lessons/data-and-service-providers/exercise.js</FilePath> file to start building a ThemeProvider component that can be used to allow your users to change their color theme within the page.
      </div>
      <div className="mt-4 text-justify">
        <ExerciseSandbox>
          <Exercise />
        </ExerciseSandbox>
      </div>
      <NavigationFooter lesson="data-and-service-providers" />
    </Lesson>
  );
};

export default DataAndServiceProvidersLesson;
