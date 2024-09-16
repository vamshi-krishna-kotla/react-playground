import React, { useRef, useState } from "react";

import { NotificationComponent } from '../notification/Notification.jsx';
import { debounce } from '../../../helpers/helper.js';

import styles from './StickyNotes.module.scss';
import ToolTip from "../tool-tip/ToolTip.jsx";

export default function StickyNotes() {
    // initialise state with required params
    const [state, setState] = useState({
        showNotification: false,
        notificationStatement: '',
        notificationType: 'default',
        noteTitle: '',
        selectedType: 'text',
        showToolTip: false
    });

    // reference for fixed button to toggle tooltip
    const newNoteBtnRef = useRef();

    /**
     * method to toggle tooltip for new note creation
     * @param {Object} event Event object to stop propagation
     */
    function toggleToolTip(event) {
        event?.stopPropagation();
        
        setState(state => ({
            ...state,
            showToolTip: !state.showToolTip,
            showNotification: false
        }));
    }

    /**
     * method to update the title for new note creation
     * @param {Object} event Event object to stop propagation
     */
    function updateNoteTitle(event) {
        event?.stopPropagation();

        setState(state => ({
            ...state,
            noteTitle: (event?.target?.value || ''),
            showNotification: false
        }));
    }

    /**
     * method to validate new note details and add note
     * @param {Object} event Event object to stop propagation
     */
    function addNewNote(event) {
        event?.stopPropagation();

        if (!state.noteTitle) {
            // alert the user of no title
            showError('Invalid title!');
            return;
        }

        if (state.selectedType === 'text') {
            // prepare a text note
            console.log(state);
        } else if (state.selectedType === 'image') {
            // prepare an image note
            console.log(state);
        } else {
            // alert the user of invalid type
            showError('Invalid type!');
        }
    }

    /**
     * method to update selected note type
     * @param {Object} event Event object to stop propagation
     */
    function setSelectedType(event, type) {
        event?.stopPropagation();

        setState(state => ({
            ...state,
            selectedType: type,
            showNotification: false
        }));
    }

    /**
     * method to show error when validation fails
     * @param {Object} event Event object to stop propagation
     */
    function showError(statement) {
        setState((state) => ({
            ...state,
            notificationType: 'error',
            showNotification: true,
            notificationStatement: statement
        }));
    }

    /**
     * callback to remove Notification component when closed
     * this is required as new notifications are expected to be generated
     * for every error, should work even when no changes are made
     * and validation is triggered
     */
    function removeNotification() {
        setState((state) => ({
            ...state,
            showNotification: false
        }));
    }

    return (
        <>
        <div className={styles["sticky-notes-container"]}>
            {/* button to add new notes */}
            <button className={styles["trigger-new-notes-button"] + " button"} ref={newNoteBtnRef} onClick={toggleToolTip}>
                <i className="fa-solid fa-file"></i>
                <i className={styles["merge-icon"] + " fa fa-circle-plus"}></i>
            </button>
            {/* form to accept type and title for the notes */}
            <ToolTip target={newNoteBtnRef.current} show={state.showToolTip} topOffset={-200} leftOffset={-250}>
                <div className={styles["new-note-input-container"]}>
                    <div className={styles["new-note-title"]}>
                        <input
                            id={styles["new-note-title-input"]}
                            type="text"
                            placeholder="Enter note title"
                            onChange={debounce(updateNoteTitle, 200)}
                        />
                    </div>
                    <div className={styles["new-note-type-selection"]}>
                        <button
                            className={styles["selection-option"] + " button " + (state.selectedType === "text" ? styles["selected"] : "")}
                            onClick={(event) => setSelectedType(event, 'text')}
                        >
                            <i className="fa fa-file-text"></i>
                        </button>
                        <button
                            className={styles["selection-option"] + " button " + (state.selectedType === "image" ? styles["selected"] : "")}
                            onClick={(event) => setSelectedType(event, 'image')}
                        >
                            <i className="fa fa-file-image"></i>
                        </button>
                    </div>
                    <button className={styles["create-new-note-button"] + " button"} onClick={addNewNote}>Add</button>
                    {/* notification to show errors */}
                    {
                        state.showNotification ?
                        <NotificationComponent
                            type={state.notificationType}
                            statement={state.notificationStatement}
                            fontSize='1'
                            onClose={removeNotification}
                        />
                        : null
                    }
                </div>
            </ToolTip>
            {/* list of notes displayed with drag and drop facility */}
        </div>
        </>
    );
}
