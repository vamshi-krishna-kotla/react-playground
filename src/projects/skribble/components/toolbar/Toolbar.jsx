import React, { useEffect, useRef, useState } from "react";

import ToolTip from '../../../../common/components/tool-tip/ToolTip.jsx';

import { EraserOptions, PencilOptions } from '../options/Options.jsx';

import styles from './Toolbar.module.scss';

function ToolbarComponent({ eraserModeRef, pencilColorRef, pencilThicknessRef, eraserThicknessRef, setCursorStyle }) {
    // initialize all required state variables
    const [showPencilOptionsFlag, setShowPencilOptionsFlag] = useState(false);
    const [showEraserOptionsFlag, setShowEraserOptionsFlag] = useState(false);

    // instantiate state variable for UI update and reference for mouse event handlers
    const [eraseMode, setEraseMode] = useState(false);

    // initialize references to persist between renders
    const pencilOptionsRef = useRef();
    const eraserOptionsRef = useRef();

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

    /**
     * run this callback for every re-render and correspondingly update the parent component
     * with the new cursor style generated from the newly selected styles
     */
    useEffect(() => {
        // update the canvas cursor only when both options tolltips are closed
        if (!(showPencilOptionsFlag || showEraserOptionsFlag)) {
            // set cursor UI for within the canvas
            const width = eraseMode ? eraserThicknessRef.current : pencilThicknessRef.current, widthHalf = width / 2;
            const cursorColor = eraseMode ? 'fill="%23000000" opacity="0.3"' : `fill="${encodeURIComponent(pencilColorRef.current)}"`;
            setCursorStyle(`url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" ${cursorColor} height="${width}" viewBox="0 0 ${width} ${width}" width="${width}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" ${cursorColor} /></svg>') ${widthHalf} ${widthHalf}, auto`);
        }
    });

    return (
        <>
        <div className={styles["toolbar-container"]}>
            <div
                className={`${styles["tool"]} button ${(!eraseMode) ? styles["active"] : ""}`}
                onClick={triggerPencilMode}
            >
                <i className="fa fa-pencil" style={{color: eraseMode ? '#000' : pencilColorRef.current}}></i>
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
        </div>

        <ToolTip target={pencilOptionsRef.current} className={styles["tooltip-container"]} show={showPencilOptionsFlag}>
            <PencilOptions colorRef={pencilColorRef} thicknessRef={pencilThicknessRef}/>
            <i className={styles["close-options"] + " fa-solid fa-close button"} onClick={togglePencilOptions}></i>
        </ToolTip>
        <ToolTip target={eraserOptionsRef.current} className={styles["tooltip-container"]} show={showEraserOptionsFlag}>
            <EraserOptions thicknessRef={eraserThicknessRef}/>
            <i className={styles["close-options"] + " fa-solid fa-close button"} onClick={toggleEraserOptions}></i>
        </ToolTip>
        </>
    );
}

export default React.memo(ToolbarComponent);
