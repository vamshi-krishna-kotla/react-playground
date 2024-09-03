/**
 * this file exports 2 similar components to work for Pencil and Eraser options
 */

import React, { useState } from "react";

import { debounce } from "../../../helpers/helper";

import styles from '../Skribble.module.scss';

/**
 * component to render Pencil options for drawing
 * @param {Object} props the following props are required to render the pencil options component
 * - colorRef: reference to the picked color to update it without re-rendering parent component
 * - thickenssRef: reference to the pencil thickenss to update it without re-rendering parent component
 * @returns React template
 */
function PencilOptionsComponent({colorRef, thicknessRef}) {
    const [pencilThickness, setPencilThickness] = useState(thicknessRef.current);
    const [pencilColor, setPencilColor] = useState(colorRef.current);

    const maxThickness = 70;

    /**
     * method to update the thickness of the pencil
     * 
     * @param {Event} event object that hold value of thickness and to stop click propagation
     */
    function updatePencilThickness(event) {
        event.stopPropagation();

        setPencilThickness(() => {
            thicknessRef.current = (event?.target?.value || 5);

            return thicknessRef.current;
        });
    }

    /**
     * method to update the color of the pencil
     * 
     * @param {Event} event object that hold value of thickness and to stop click propagation
     */
    function updatePencilColor(event) {
        event.stopPropagation();

        setPencilColor(() => {
            colorRef.current = (event?.target?.value || '#000');

            return colorRef.current;
        });
    }

    return (
        <div className={styles["pencil-options-container"]}>
            <div className={styles["thickness-selection"]}>
                <label htmlFor={styles["eraser-thickness"]}>Thickness: </label>
                <input
                    type="range"
                    defaultValue={thicknessRef.current}
                    min="1"
                    max={maxThickness}
                    step="1"
                    name="pencil-thickness"
                    id={styles["pencil-thickness"]}
                    onChange={debounce(updatePencilThickness, 0)}
                />
            </div>
            <div className={styles["color-selection"]}>
                <label htmlFor={styles["pencil-color"]}>Color: </label>
                <input
                    type="color"
                    id={styles["pencil-color"]}
                    name="color"
                    defaultValue={colorRef.current}
                    onChange={debounce(updatePencilColor, 0)}
                />
            </div>
            <div className={styles["preview-container"]}>
                <span style={{
                    transform: `scale(calc(${pencilThickness}/${maxThickness}))`,
                    backgroundColor: pencilColor,
                    borderRadius: '50%',
                    width: maxThickness,
                    height: maxThickness,
                    display: 'block'
                }}></span>
            </div>
        </div>
    );
};

/**
 * component to render Eraser options for drawing
 * @param {Object} props the following props are required to render the eraser options component
 * - thickenssRef: reference to the eraser thickenss to update it without re-rendering parent component
 * @returns React template
 */
function EraserOptionsComponent({thicknessRef}) {
    const [eraserThickness, setEraserThickness] = useState(thicknessRef.current);

    const maxThickness = 100;

    /**
     * method to update the thickness of the eraser
     * 
     * @param {Event} event object that hold value of thickness and to stop click propagation
     */
    function updateEraserThickness(event) {
        event.stopPropagation();

        setEraserThickness(() => {
            thicknessRef.current = (event?.target?.value || 5);

            return thicknessRef.current;
        });
    }

    return (
        <div className={styles["eraser-options-container"]}>
            <div className={styles["thickness-selection"]}>
                <label htmlFor={styles["eraser-thickness"]}>Thickness: </label>
                <input
                    type="range"
                    defaultValue={thicknessRef.current}
                    min="5"
                    max={maxThickness}
                    step="1"
                    name="eraser-thickness"
                    id={styles["eraser-thickness"]}
                    onChange={debounce(updateEraserThickness, 0)}
                />
            </div>
            <div className={styles["preview-container"]}>
                <span style={{
                    transform: `scale(calc(${eraserThickness}/${maxThickness}))`,
                    border: '1px solid black',
                    borderRadius: '50%',
                    width: maxThickness,
                    height: maxThickness,
                    display: 'block'
                }}></span>
            </div>
        </div>
    );
};

export const PencilOptions = React.memo(PencilOptionsComponent);
export const EraserOptions = React.memo(EraserOptionsComponent);