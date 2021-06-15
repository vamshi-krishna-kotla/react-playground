import React from 'react';
import { hydrate } from 'react-dom';

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
hydrate(<App />, document.getElementById('root'));
