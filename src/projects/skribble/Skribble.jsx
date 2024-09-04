/**
 * component that acts like a scribble board to draw, add notes and add images
 */

import React, { useRef, useEffect } from 'react';

import Toolbar from './components/toolbar/Toolbar.jsx';

import styles from './Skribble.module.scss';

export default function Skribble() {
    const eraserModeRef = useRef(false);
    const pencilColorRef = useRef('#000');
    const pencilThicknessRef = useRef(5);
    const eraserThicknessRef = useRef(10);
    const cursorStyleRef = useRef({});

    const canvasRef = useRef();

    // initialize local variables used for scribbling
    let context = null;
    let isDrawing = false;
    let lastX, lastY;

    // set cursor UI for within the canvs
    // const width = eraseMode ? eraserThickness.current : pencilThickness.current, widthHalf = width / 2;
    // const cursorColor = eraseMode ? 'fill="%23000000" opacity="0.3"' : `fill="${encodeURIComponent(pencilColor.current)}"`;
    // const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" ${cursorColor} height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" ${cursorColor} /></svg>') ${widthHalf} ${widthHalf}, auto`;

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
    }, []);

    return (
        <div className={styles["skribble-main-container"]}>
            <Toolbar
                eraserModeRef={eraserModeRef}
                pencilColorRef={pencilColorRef}
                pencilThicknessRef={pencilThicknessRef}
                eraserThicknessRef={eraserThicknessRef}
                cursorStyleRef={cursorStyleRef}
            />
            <div className={styles["canvas-container"]}>
                <canvas id={styles["skribble-canvas"]} ref={canvasRef} style={cursorStyleRef.current}></canvas>
            </div>
        </div>
    );
}
