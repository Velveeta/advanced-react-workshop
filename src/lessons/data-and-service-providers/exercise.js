import { Button } from 'react-bootstrap';
import React from 'react';

import './exercise.css';

/**
 * Use this module to practice writing a declarative service-type module. In this
 * case, you'll be writing a ThemedComponent component that allows a global 'theme'
 * to be propagated down to components throughout the application in order to
 * be informed of what the current application theme is, as well as be alerted to
 * any time that theme value is changed. Try writing it the first time using an
 * actual service singleton that will store the current theme value, as well as
 * provide a function to toggle that value. The 'theme' value should default to
 * 'dark', and allow for its value to be toggled between 'dark' and 'light',
 * alerting any ThemedComponents to re-render themselves when the value is changed.
 * Include a few different ThemedComponent wrappers in your view, to make sure
 * they all update whenever the theme is changed.
 *
 * You shouldn't need to change any of the Exercise component's code for this first
 * scenario. You just need to implement a 'themeService' singleton of some kind,
 * and then reimplement 'ToggleThemeButton' and 'ThemedComponent' to use that.
 * Don't forget that ThemedComponents will need some way of being notified whenever
 * the theme is changed, so that they can re-render themselves accordingly.
 *
 * If you finish early, try refactoring your implementation to get rid of the
 * service singleton in favor of using the React context API, and see if you can
 * figure out how to make nestable layers of ThemeProviders that can default to the
 * value of their surrounding context, but then allow for managing their component
 * subtree independently of any parent ThemeProvider value changes.
 **/

const ToggleThemeButton = () => <Button>Toggle Theme</Button>;

const ThemedComponent = ({ children }) => <React.Fragment>{children}</React.Fragment>;

const Exercise = () => (
  <div className="grouping">
    <div>
      <ToggleThemeButton />
    </div>
    <ThemedComponent style={{ padding: '10px' }}>
      <div>Hello World!</div>
    </ThemedComponent>
    <div className="grouping">
      <ThemedComponent style={{ padding: '10px' }}>
        <div>Hello Again World!</div>
      </ThemedComponent>
    </div>
  </div>
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/





























/**
 * const themeService = {
 *   _subscribers: [],
 *   theme: 'dark',
 *
 *   _alertSubscribers() {
 *     this._subscribers.forEach(callback => {
 *       callback(this.theme);
 *     });
 *   },
 *
 *   subscribe(callback) {
 *     this._subscribers.push(callback);
 *
 *     return () => {
 *       this._subscribers = this._subscribers.filter(callbackFn => callbackFn !== callback);
 *     };
 *   },
 *
 *   toggleTheme() {
 *     this.theme = (this.theme === 'dark' ? 'light' : 'dark');
 *     this._alertSubscribers();
 *   },
 * };
 *
 * const ToggleThemeButton = class extends React.Component {
 *   _toggleTheme = () => {
 *     themeService.toggleTheme();
 *   }
 *
 *   render() {
 *     return <Button onClick={this._toggleTheme}>Toggle Theme</Button>;
 *   }
 * };
 *
 * const ThemedComponent = class extends React.Component {
 *   state = {
 *     theme: themeService.theme,
 *   };
 *
 *   componentDidMount() {
 *     this._unsubscribe = themeService.subscribe(theme => {
 *       this.setState({ theme });
 *     });
 *   }
 *
 *   componentWillUnmount() {
 *     this._unsubscribe();
 *   }
 *
 *   render() {
 *     const { children, className, style } = this.props;
 *     const { theme } = this.state;
 *
 *     return (
 *       <div className={`${theme}${className ? ` ${className}` : ''}`} style={style}>
 *         {children}
 *       </div>
 *     );
 *   }
 * };
 *
 * const Exercise = () => (
 *   <div className="grouping">
 *     <div>
 *       <ToggleThemeButton />
 *     </div>
 *     <ThemedComponent style={{ padding: '10px' }}>
 *       <div>Hello World!</div>
 *     </ThemedComponent>
 *     <div className="grouping">
 *       <ThemedComponent style={{ padding: '10px' }}>
 *         <div>Hello Again World!</div>
 *       </ThemedComponent>
 *     </div>
 *   </div>
 * );
 **/

/*********************************************************************
 *      Don't look below here unless you want the other answer!      *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * const { Consumer, Provider } = React.createContext();
 *
 * const ThemeProvider = class extends React.Component {
 *   state = {
 *     theme: this.props.theme || 'dark',
 *   };
 *
 *   componentDidUpdate(prevProps) {
 *     const { theme } = this.props;
 *
 *     if (theme !== prevProps.theme) {
 *       this.setState({ theme });
 *     }
 *   };
 *
 *   _toggleTheme = () => {
 *     this.setState({ theme: this.state.theme === 'dark' ? 'light' : 'dark' });
 *   };
 *
 *   render() {
 *     const value = {
 *       theme: this.state.theme,
 *       toggleTheme: this._toggleTheme,
 *     };
 *
 *     return (
 *       <Provider value={value}>
 *         {this.props.children}
 *       </Provider>
 *     );
 *   }
 * };
 *
 * const ThemedComponent = ({ children, className, style }) => (
 *   <Consumer>
 *     {({ theme }) => (
 *       <div className={`${theme}${className ? ` ${className}` : ''}`} style={style}>
 *         {children}
 *       </div>
 *     )}
 *   </Consumer>
 * );
 *
 * const Exercise = () => (
 *   <ThemeProvider>
 *     <div className="grouping">
 *       <div>
 *         <Consumer>
 *           {({ toggleTheme }) => (
 *             <Button onClick={toggleTheme}>Toggle Theme</Button>
 *           )}
 *         </Consumer>
 *       </div>
 *       <ThemedComponent style={{ padding: '10px' }}>
 *         <div>Hello World!</div>
 *       </ThemedComponent>
 *       <div className="grouping">
 *         <Consumer>
 *           {({ theme }) => (
 *             <ThemeProvider theme={theme}>
 *               <div>
 *                 <Consumer>
 *                   {({ toggleTheme }) => (
 *                     <Button onClick={toggleTheme}>Toggle Theme</Button>
 *                   )}
 *                 </Consumer>
 *               </div>
 *               <ThemedComponent style={{ padding: '10px' }}>
 *                 <div>Hello Again World!</div>
 *               </ThemedComponent>
 *             </ThemeProvider>
 *           )}
 *         </Consumer>
 *       </div>
 *     </div>
 *   </ThemeProvider>
 * );
 **/
