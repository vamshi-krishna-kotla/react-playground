/**
 * component that acts like a scribble board to draw, add notes and add images
 */

import React, { useState, useRef, useEffect } from 'react';

import ToolTip from '../../common/components/tool-tip/ToolTip.jsx';

import styles from './Skribble.module.scss';
import { EraserOptions, PencilOptions } from './components/Options.jsx';

export default function Skribble() {
    // initialize all required state variables
    const [showPencilOptionsFlag, setShowPencilOptionsFlag] = useState(false);
    const [showEraserOptionsFlag, setShowEraserOptionsFlag] = useState(false);

    // instantiate state variable for UI update and reference for mouse event handlers
    const [eraseMode, setEraseMode] = useState(false);
    const eraserModeRef = useRef(false);

    const pencilColor = useRef('#000');
    const pencilThickness = useRef(5);
    const eraserThickness = useRef(10);

    // initialize references to persist between renders
    const pencilOptionsRef = useRef();
    const eraserOptionsRef = useRef();

    const canvasRef = useRef();

    // initialize local variables used for scribbling
    let context = null;
    let isDrawing = false;
    let lastX, lastY;

    // set cursor UI for within the canvs
    const width = eraseMode ? eraserThickness.current : pencilThickness.current, widthHalf = width / 2;
    const cursorColor = eraseMode ? 'fill="%23000000" opacity="0.3"' : `fill="${encodeURIComponent(pencilColor.current)}"`;
    const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" ${cursorColor} height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" ${cursorColor} /></svg>') ${widthHalf} ${widthHalf}, auto`;

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
            context.lineWidth = eraserModeRef.current ? eraserThickness.current : pencilThickness.current;
            context.strokeStyle = eraserModeRef.current ? '#FFF' : pencilColor.current;
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

    /**
     * method to toggle display of pencil options
     */
    function togglePencilOptions() {
        setShowPencilOptionsFlag(val => !val);
    }

    /**
     * method to toggle display of eraser options
     */
    function toggleEraserOptions() {
        setShowEraserOptionsFlag(val => !val);
    }

    /**
     * method to trigger eraser mode which draws "white" color
     * @param {Object} event Event object to stop propagation
     */
    function triggerEraserMode(event) {
        event?.stopPropagation();

        if (eraseMode) return;

        setEraseMode(() => {
            eraserModeRef.current = true;
            return true;
        });
    }

    /**
     * method to trigger pencil mode which draws based on solected color
     * @param {Object} event Event object to stop propagation
     */
    function triggerPencilMode(event) {
        event?.stopPropagation();

        if (!eraseMode) return;

        setEraseMode(() => {
            eraserModeRef.current = false;
            return false;
        });
    }

    return (
        <div className={styles["skribble-main-container"]}>
            <div className={styles["tools-container"]}>
                <div
                    className={`${styles["tool"]} button ${(!eraseMode) ? styles["active"] : ""}`}
                    onClick={triggerPencilMode}
                >
                    <i className="fa fa-pencil" style={{color: eraseMode ? '#000' : pencilColor.current}}></i>
                    <i className={styles["info-icon"] + " fa fa-gear"} ref={pencilOptionsRef} onClick={togglePencilOptions}></i>
                </div>
                <div
                    className={`${styles["tool"]} button ${(eraseMode) ? styles["active"] : ""}`}
                    onClick={triggerEraserMode}
                >
                    <i className="fa fa-eraser"></i>
                    <i className={styles["info-icon"] + " fa fa-gear"} ref={eraserOptionsRef} onClick={toggleEraserOptions}></i>
                </div>
                <div className={styles["tool"] + ' button'}>
                    <i className="fa-solid fa-file-circle-plus"></i>
                </div>
                <div className={styles["tool"] + ' button'}>
                    <i className="fa-solid fa-file-image"></i>
                    <i className={styles["merge-icon"]+ " fa fa-circle-arrow-up"}></i>
                </div>
                <div className={styles["tool"] + ' button'}>
                    <i className="fa fa-download"></i>
                </div>
                <div className={styles["tool"] + ' button'}>
                    <i className="fa fa-undo"></i>
                </div>
                <div className={styles["tool"] + ' button'}>
                    <i className="fa fa-redo"></i>
                </div>
            </div>
            <div className={styles["canvas-container"]}>
                <canvas id={styles["skribble-canvas"]} ref={canvasRef} style={{ cursor }}></canvas>
            </div>
            <ToolTip target={pencilOptionsRef.current} className={styles["tooltip-container"]} show={showPencilOptionsFlag}>
                <PencilOptions colorRef={pencilColor} thicknessRef={pencilThickness}/>
                <i className={styles["close-options"] + " fa-solid fa-close button"} onClick={togglePencilOptions}></i>
            </ToolTip>
            <ToolTip target={eraserOptionsRef.current} className={styles["tooltip-container"]} show={showEraserOptionsFlag}>
                <EraserOptions thicknessRef={eraserThickness}/>
                <i className={styles["close-options"] + " fa-solid fa-close button"} onClick={toggleEraserOptions}></i>
            </ToolTip>
        </div>
    );
}
