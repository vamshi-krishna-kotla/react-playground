/**
 * component that acts like a scribble board to draw, add notes and add images
 */

import React, { useRef, useEffect, useState } from 'react';

// instantiate new socket for communicating with server for realtime drawing
import { io } from 'socket.io-client';
const connectionSocket = io();

import Toolbar from './components/toolbar/Toolbar.jsx';

import styles from './Skribble.module.scss';

export default function Skribble() {
    const eraserModeRef = useRef(false);
    const pencilColorRef = useRef('#000');
    const pencilThicknessRef = useRef(5);
    const eraserThicknessRef = useRef(10);
    const [cursorStyle, setCursorStyle] = useState('');

    const canvasRef = useRef();
    const clearCanvasButtonRef = useRef();

    // initialize local variables used for scribbling
    let context = null;
    let isDrawing = false;
    let lastX, lastY;

    // once component is loaded resize the canvas and attach event handlers
    useEffect(() => {
        // set the canvas dimensions
        canvasRef.current.width = window.innerWidth * 0.9;
        canvasRef.current.height = window.innerHeight * 0.6;

        // fetch the canvas 2D context and set the drawing parameters
        context = canvasRef.current.getContext('2d');
        context.lineJoin = "round";
        context.lineCap = "round";

        // mousedown event handler to start drawing
        canvasRef.current.onmousedown = (event) => {
            isDrawing = true;
            context.lineWidth = eraserModeRef.current ? eraserThicknessRef.current : pencilThicknessRef.current;
            context.strokeStyle = eraserModeRef.current ? '#FFF' : pencilColorRef.current;
            [lastX, lastY] = [event.offsetX, event.offsetY];
        };

        // mousemove event to draw as per the mouse movement
        canvasRef.current.onmousemove = (event) => {
            if (isDrawing) {
                context.beginPath();
                context.moveTo(lastX, lastY);
                context.lineTo(event.offsetX, event.offsetY);
                context.stroke();

                /*
                    emit to server socket while drawing
                    (userId, lineWidth, strokeStyle, fromX, fromY, toX, toY)
                */
                connectionSocket.emit('draw', {
                    lineWidth: context.lineWidth,
                    strokeStyle: context.strokeStyle,
                    fromX: lastX,
                    fromY: lastY,
                    toX: event.offsetX,
                    toY: event.offsetY
                });

                // set last moved point for current cursor
                [lastX, lastY] = [event.offsetX, event.offsetY];
            }
        };

        // mouseup handler to stop drawing
        canvasRef.current.onmouseup = () => {
            isDrawing = false;
        };

        // mouseout handler to stop drawing
        canvasRef.current.onmouseout = () => {
            isDrawing = false;
        };

        // clear canvas button handler
        clearCanvasButtonRef.current.onclick = (event) => {
            event.stopPropagation();

            context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            // emit clear event to server
            connectionSocket.emit('clearCanvas');
        };

        /*
            read from server socket, draw/clear when data is recevied from server socket
            do not draw if the recevied message is from same user as it is already being drawn/cleared
        */
        connectionSocket.on('draw', (data) => {
            if (data.userId !== connectionSocket.id) {
                context.lineWidth = data.lineWidth;
                context.strokeStyle = data.strokeStyle;
                context.beginPath();
                context.moveTo(data.fromX, data.fromY);
                context.lineTo(data.toX, data.toY);
                context.stroke();
            }
        });
        connectionSocket.on('clearCanvas', (data) => {
            if (data.userId !== connectionSocket.id) {
                context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            }
        });
    }, []);

    return (
        <div className={styles["skribble-main-container"]}>
            <div className={styles["clear-canvas-button-container"]}>
                <button className={styles["clear-canvas-button"] + " button"} ref={clearCanvasButtonRef}>
                    <i className="fa-solid fa-broom"></i>
                </button>
            </div>
            <Toolbar
                eraserModeRef={eraserModeRef}
                pencilColorRef={pencilColorRef}
                pencilThicknessRef={pencilThicknessRef}
                eraserThicknessRef={eraserThicknessRef}
                setCursorStyle={setCursorStyle}
                canvasRef={canvasRef}
            />
            <div className={styles["canvas-container"]}>
                <canvas id={styles["skribble-canvas"]} ref={canvasRef} style={{ cursor: cursorStyle }}></canvas>
            </div>
        </div>
    );
}
