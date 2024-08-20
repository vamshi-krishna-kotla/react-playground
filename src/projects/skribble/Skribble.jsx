/**
 * component that acts like a scribble board to draw, add notes and add images
 */

import React, { useState, useRef } from 'react';

import { debounce } from '../../helpers/helper.js';

import ToolTip from '../../common/components/tool-tip/ToolTip.jsx';

import styles from './Skribble.module.scss';

export default function Skribble() {
    // initialize all required state variables
    const [showPencilOptionsFlag, setShowPencilOptionsFlag] = useState(false);
    const [showEraserOptionsFlag, setShowEraserOptionsFlag] = useState(false);
    const [eraserThickness, setEraserThickness] = useState(5);
    const [pencilThickness, setPencilThickness] = useState(5);
    const [pencilColor, setPencilColor] = useState('#000');

    // initialize references to persist between renders
    const pencilOptionsRef = useRef();
    const eraserOptionsRef = useRef();

    /**
     * method to toggle display of pencil options
     * 
     * @param {Event} event object to stop click propagation
     */
    function togglePencilOptions(event) {
        event.stopPropagation();

        setShowPencilOptionsFlag(val => !val);
    }

    /**
     * method to toggle display of eraser options
     * 
     * @param {Event} event object to stop click propagation
     */
    function toggleEraserOptions(event) {
        event.stopPropagation();

        setShowEraserOptionsFlag(val => !val);
    }

    /**
     * method to update the thickness of the pencil
     * 
     * @param {Event} event object that hold value of thickness and to stop click propagation
     */
    function updatePencilThickness(event) {
        event.stopPropagation();

        setPencilThickness(event?.target?.value || 5);
    }

    /**
     * method to update the color of the pencil
     * 
     * @param {Event} event object that hold value of thickness and to stop click propagation
     */
    function updatePencilColor(event) {
        event.stopPropagation();

        setPencilColor(event?.target?.value || '#000');
    }

    /**
     * method to update the thickness of the eraser
     * 
     * @param {Event} event object that hold value of thickness and to stop click propagation
     */
    function updateEraserThickness(event) {
        event.stopPropagation();

        setEraserThickness(event?.target?.value || 5);
    }

    return (
        <div className={styles["skribble-main-container"]}>
            <div className={styles["tools-container"]}>
                <div className={styles["tool"] + ' button'}>
                    <i className="fa fa-pencil" style={{color: pencilColor}}></i>
                    <i className={styles["info-icon"] + " fa fa-gear"} ref={pencilOptionsRef} onClick={togglePencilOptions}></i>
                </div>
                <div className={styles["tool"] + ' button'}>
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
                <canvas id={styles["skribble-canvas"]}></canvas>
            </div>
            <ToolTip target={pencilOptionsRef.current} className={styles["tooltip-container"]} show={showPencilOptionsFlag}>
                <div className={styles["pencil-options-container"]}>
                    <div className="thickness-selection">
                        <label htmlFor={styles["eraser-thickness"]}>Thickness: </label>
                        <input
                            type="range"
                            defaultValue={pencilThickness}
                            min="1"
                            max="10"
                            step="0.5"
                            name="pencil-thickness"
                            id={styles["pencil-thickness"]}
                            onChange={debounce(updatePencilThickness, 500)}
                        />
                        <span>({pencilThickness}px)</span>
                    </div>
                    <div className="color-selection">
                        <label htmlFor={styles["pencil-color"]}>Color: </label>
                        <input
                            type="color"
                            id={styles["pencil-color"]}
                            name="color"
                            defaultValue={pencilColor}
                            onChange={debounce(updatePencilColor, 500)}
                        />
                    </div>
                </div>
                <i className={styles["close-options"] + " fa-solid fa-close button"} onClick={togglePencilOptions}></i>
            </ToolTip>
            <ToolTip target={eraserOptionsRef.current} className={styles["tooltip-container"]} show={showEraserOptionsFlag}>
                <div className={styles["eraser-options-container"]}>
                    <label htmlFor={styles["eraser-thickness"]}>Thickness:</label>
                    <input
                        type="range"
                        defaultValue={eraserThickness}
                        min="1"
                        max="20"
                        step="1"
                        name="eraser-thickness"
                        id={styles["eraser-thickness"]}
                        onChange={debounce(updateEraserThickness, 500)}
                    />
                    <span>({eraserThickness}px)</span>
                </div>
                <i className={styles["close-options"] + " fa-solid fa-close button"} onClick={toggleEraserOptions}></i>
            </ToolTip>
        </div>
    );
}
