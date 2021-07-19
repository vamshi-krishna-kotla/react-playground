import React from 'react';
import { hydrate, render } from 'react-dom';

import App from './App.jsx';

let root = document.getElementById('root');
root.children[0] ? hydrate(<App />, root) : render(<App />, root);
