import React from 'react';
import { hydrate, render } from 'react-dom';

import App from './App.jsx';

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
let root = document.getElementById('root');

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
 */
root.children[0] ? hydrate(<App />, root) :	render(<App />, root);
