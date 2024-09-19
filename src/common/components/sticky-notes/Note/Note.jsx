import React, { useEffect, useRef, useState } from "react";

import styles from './Note.module.scss';
import { debounce } from "../../../../helpers/helper";

export default React.memo(({ note: { title, type, imageURL }, onDelete }) => {
    // flag to toggle between minimized and maximized view
    const [isMinimised, setIsMinimised] = useState(false);
    // state value to hold text inside a text note
    const [textVal, setTextVal] = useState('');

    // reference for current sticky note
    const stickyNoteRef = useRef();

    /**
     * method to toggle between minimize and maximize views
     * 
     * @param {Object} event Event object to stop propagation
     */
    function resizeNote(event) {
        event.stopPropagation();

        setIsMinimised(isMinimised => !isMinimised);
    }

    /**
     * method to update the text value for a text note
     * 
     * @param {Event} event Event object that holds the updated input value
     */
    function updateTextVal(event) {
        setTextVal(event?.target?.value || '');
    }

    /**
     * method to remove a sticky note
     * triggers parental remove method
     * 
     * @param {Event} event Event object to stop propagation
     */
    function removeNote(event) {
        event.stopPropagation();

        onDelete();
    }

    useEffect(() => {
        // attach drop event listener to reposition the current note on the screen
        stickyNoteRef.current.ondragend = (event) => {
            stickyNoteRef.current.style.left = event.clientX + 'px';
            stickyNoteRef.current.style.top = event.clientY + 'px';
        };
    }, []);

    return (
        <div
            draggable
            className={styles["sticky-note"] + " " + (isMinimised ? styles["minimized"] : "")}
            ref={stickyNoteRef}
        >
            <div className={styles["title-container"]}>
                <span className={styles["title"]}>{title}</span>
                <div className={styles["action-buttons-container"]}>
                    <button className={styles["resize-button"]}>
                        <i
                            className={"fa " + (isMinimised ? "fa-maximize" : "fa-minimize")}
                            onClick={resizeNote}
                        ></i>
                    </button>
                    <button className={styles["delete-button"]}>
                        <i
                            className="fa fa-remove"
                            onClick={removeNote}
                        ></i>
                    </button>
                </div>
            </div>
            {
                !isMinimised
                ?
                    (type === 'text')
                    ?
                    <textarea
                        name=""
                        defaultValue={textVal}
                        className={styles["note-content"]}
                        placeholder="Text Note"
                        onChange={debounce(updateTextVal, 500)}
                    ></textarea>
                    :
                    <img src={imageURL} alt={title + '_image'} className={styles["note-content"]} />
                : null
            }
        </div>
    );
});