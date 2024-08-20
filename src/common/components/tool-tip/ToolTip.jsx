/**
 * custom tooltip component which renders the children at bottom right of given target element
 * 
 * @description
 * children: React/HTML which is expected to be rendered inside the tooltip
 * target: HTMLElement based on which the tooltip is to be displayed
 * offset: numeric value to provide a distance from the target element
 * defaultStyles: style object that has CSS from parent if any overrides are required
 * className: string to add a custom class name if required
 * show: flag to show or remove the tooltip
 */

import React from "react";

import './ToolTip.scss';

export default function ToolTip({children, target, offset, defaultStyles, className, show}) {
    let styleBlock = {}, inputClassName = '';

    // if the target element is available then compute the position where tooltip should be displayed
    if (target) {
        const { x, y } = target.getBoundingClientRect();

        const inputOffset = offset || 20;
        const inputDefaultStyles = defaultStyles || {};

        inputClassName = className;
        styleBlock = Object.assign({ top: y + inputOffset, left: x + inputOffset }, inputDefaultStyles);
    }

    return (
        <>
        {
            // render the tooltip only if the target element is available and 'show' flag is triggered
            (target && show) ?
            <div className={inputClassName + ' custom-tooltip-container'} style={styleBlock}>
                {children}
            </div>
            : null
        }
        </>
    );
}
