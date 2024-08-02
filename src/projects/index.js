import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

const container = document.getElementById('root');
const application = <BrowserRouter><App /></BrowserRouter>;
let root;

/**
 * @note
 * BrowserRouter should be the top most component wrapper
 * Even above the App.jsx
 * 
 * This works hand-in-hand with StaticRouter, used for server-side rendering
 * 
 * StaticRouter is the top most wrapper component from server-side
 * from which the routes are configured for rendering
 * 
 * This helps in server-side rendering the routes within the client app
 * 
 * - StaticRouter passes the request URL path while rendering the HTML
 * - BrowserRouter picks up that route from client side and renders the client side routed component
 */

container.children[0] ? (function (){
    // hydrate the app as it is server-side rendered
    root = hydrateRoot(container, application);
})() : (function (){
    // render the app as it is client side rendered
    root = createRoot(container);
    root.render(application);
})();
