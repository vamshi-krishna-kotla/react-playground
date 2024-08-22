import React from 'react';
import AnalogClock from './analog-clock/Clock.jsx';
import Quotes from './quotes/Quotes.jsx';
import SpeechText from './speech-text/SpeechText.jsx';
import Skribble from './skribble/Skribble.jsx';

/**
 * links and respective fields to be displayed on the /projects part of the application
 * 
 * each link has the following fields
 * titleHTML: HTML text to be displayed in the generic nav bar
 * location: the route at which the element needs to be displayed
 * element: the React element which needs to be displayed
 * showInNavBar: flag to enable or disable showing this option in nav bar (used for parameterized routes)
 * description: descriptive text displayed in home page on route card
 * 
 * @note
 * place all the new routes here
 * if the routes are parameterized and not expected to be shown in nav bar then use the showInNavBar appropriately
 */
export default [
    {
        titleHTML: 'Quotes',
        location: '/projects/quotes',
        element: <Quotes />,
        showInNavBar: true,
        description: 'API calls'
    },
    {
        titleHTML: 'Clock',
        location: '/projects/clock',
        element: <AnalogClock />,
        showInNavBar: true,
        description: 'Repeated rerenders'
    },
    {
        titleHTML: 'Speech &#8652; Text',
        location: '/projects/speech-text',
        element: <SpeechText />,
        showInNavBar: true,
        description: 'Speech API'
    },
    {
        titleHTML: '',
        location: '/projects/speech-text/:route',
        element: <SpeechText />,
        showInNavBar: false
    },
    {
        titleHTML: 'Skribble',
        location: '/projects/skribble',
        element: <Skribble />,
        showInNavBar: true,
        description: 'Canvas API and Sockets'
    },
];
