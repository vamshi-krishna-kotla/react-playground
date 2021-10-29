import React from 'react';
import { hydrate, render } from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import App from './App.jsx';

let root = document.getElementById('root');

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
root.children[0] ? hydrate(<BrowserRouter><App /></BrowserRouter>, root) : render(<BrowserRouter><App /></BrowserRouter>, root);
