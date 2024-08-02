import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

/**
 * @note
 * render() and hydrate() are deprecated in React 18
 * instead 'createRoot()' and 'hydrateRoot()' are used respectively
 * therefore render() calls below are referred to as usage of createRoot()
 * and hydrate() calls as of hydrateRoot() respectively
 */

/**
 * render() method of ReactDOM puts the Component
 * to the target element on the DOM
 * 
 * 
 * hydrate() method of ReactDOM checks if the Component template HTML
 * is already present (example as in SSR), then sets up the required
 * listeners based on the Component and children scripts
 * 
 * hydrate() behaves same as render() if there is no SSR, i.e.,
 * if there is no template HTML of the Component already present
 */
const container = document.getElementById('root');
const application = <BrowserRouter><App /></BrowserRouter>;
let root;

/**
 * if there are children to the root element, it indicates that
 * the HTML has been server-side rendered (production mode)
 * and "hydrate" needs to be called
 * 
 * if there are no children, it means the app is running in development mode
 * and hence "render" needs to be called
 * 
 * 
 * Note: this is basically to avoid an error, occuring when calling
 * "hydrate" in development mode where there is no content in the
 * root element
 * 
 * Adding in BrowserRouter for routing (visit projects/index.js for more info)
 */
// this format is deprecated in React 18
// root.children[0] ? hydrate(application, root) : render(application, root);

container.children[0] ? (function (){
    // hydrate the app as it is server-side rendered
    root = hydrateRoot(container, application);
})() : (function (){
    // render the app as it is client side rendered
    root = createRoot(container);
    root.render(application);
})();
