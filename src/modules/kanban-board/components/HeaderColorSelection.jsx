import React from 'react';

import './HeaderColorSelection.scss';

export default function HeaderColorSelection(props) {
	return (
		<div className="header-color-selection-bar">
			{
				props.colors.map(color => {
					return <div key={color} className={"color " + color}></div>;
				})
			}
		</div>
	);
}