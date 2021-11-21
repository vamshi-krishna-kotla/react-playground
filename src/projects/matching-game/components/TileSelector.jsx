import React from "react";

export default function TileSelector (props) {
	const dropdown = (
		<div className='tileSelectorContent' >
			<div className='number'>4</div>
			<div className='number'>16</div>
			<div className='number'>36</div>
		</div>
	);

	return (
		<div className='tileSelector'>
			<div>Number of Tiles</div>
			{props.numTiles}
			<div className='tileSelectorDropdown'>
				{dropdown}
			</div>
		</div>
	);
}
