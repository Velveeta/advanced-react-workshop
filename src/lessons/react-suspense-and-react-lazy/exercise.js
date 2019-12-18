import React from 'react';

// import _import from './fake-import';
import UserProfile from './user-profile';

/**
 * Use this module to practice writing some lazy-loaded components and using the new
 * Suspense component to provide a fallback while they load. A fake import function
 * has been provided for you (called _import), which will allow you to simulate a
 * component loading slowly. By default, it provides a 3-second timeout on the
 * component, but this can be customized by passing a second argument with a different
 * timeout value. The function signature is:
 *
 * const MyActualComponent = () => <div>Hello World!</div>;
 * const MyLazyComponent = React.lazy(() => _import(MyActualComponent));
 * // or with a custom timeout value
 * const MyLazyComponent = React.lazy(() => _import(MyActualComponent, 10000));
 *
 * You can try having multiple lazy-loaded components isolated in their own subtrees
 * and having their own Suspense wrappers, then seeing what happens when you try to
 * rearrange the way those components are nested, moving them from one Suspense
 * wrapper to another, splitting them out into their own Suspense wrappers, etc.
 *
 * A UserProfile component has also been provided as part of this exercise. If you
 * look at the ./lazy-components/user-profile.js file, you will see that it has 2
 * subcomponents of its own, the UserAvatar and UserProfileData components. Do some
 * playing around and see what happens if you add additional lazy and Suspense
 * wrappers to any of the components in that tree, or if you change the timeout
 * to make some components load faster or slower than others.
 **/

const Exercise = () => (
  <UserProfile name="Foo Bar" email="sdf@fds.com" phone="512-555-1212" address="123 Main St." />
);

export default Exercise;

/*********************************************************************
 *         Don't look below here unless you want the answer!         *
 * Try your best, but if you get stuck, you have this to reflect on! *
 *********************************************************************/






























/**
 * // First, we'll want to import something to use as a fallback view
 * import LoadingSpinner from '../../components/loading-spinner';
 *
 * import _import from './fake-import';
 * import UserProfile from './user-profile';
 *
 * // Then we'll create a lazy version of this component with _import
 * const LazyUserProfile = React.lazy(() => _import(UserProfile));
 *
 * // Finally add a Suspense wrapper around our LazyUserProfile, with a fallback
 * const Exercise = () => (
 *   <React.Suspense fallback={<LoadingSpinner />}>
 *     <LazyUserProfile
 *       name="Foo Bar"
 *       email="sdf@fds.com"
 *       phone="512-555-1212"
 *       address="123 Main St."
 *     />
 *   </React.Suspense>
 * );
 **/
