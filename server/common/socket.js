/**
 * function to add socket logic to communicate realtime without HTTP requests
 * used for skribble project for drawing replication over multiple clients
 * 
 * @param {Socket} io Server socket through which data is emitted to other clients
 */
module.exports = (io) => {
    io.on('connection', (socket) => {
        // draw event on mousemove
        socket.on('draw', (data) => {
            io.emit('draw', { ...data, userId: socket.id });
        });

        // clear canvas event
        socket.on('clearCanvas', () => {
            io.emit('clearCanvas', { userId: socket.id });
        });
    });
};
