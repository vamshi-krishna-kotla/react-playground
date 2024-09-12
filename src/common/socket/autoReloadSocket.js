import { io } from 'socket.io-client';

// instantiate client socket
const autoReloadSocket = io();

/**
 * add event listener to reload the page
 * whenever there is a trigger from the server
 */
autoReloadSocket.on('reload', () => {
    window.location.reload();
});
