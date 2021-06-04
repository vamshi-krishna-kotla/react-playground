import React from 'react';

import './Child2.scss';

export function Child2(props) {
	return(
		<div id="child2" className={props.className}>
			<h1>Child2</h1>
			<div className="inputArea">
				<input type="text" onInput={(event) => {props.editParentState(event.target.value)}} />
				<span className="arrow">&#8656;</span>
			</div>
		</div>
	);
}