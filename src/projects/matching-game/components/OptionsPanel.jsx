import React from "react";

import TileSelector from './TileSelector.jsx';
import Button from './Button.jsx';

export default function OptionsPanel (props) {
	return (
		<div className="options-panel">
			<TileSelector
				numTiles={props.numTiles}
			/>
			<Button
				playing={props.playing}
			/>
		</div>
	);
}
