import React from 'react';

import './Child1.scss';

export function Child1(props) {
	return(
		<div id="child1" className={props.className}>
			<h1>Child1</h1>
			<div className="inputArea">
				<input type="text" onInput={(event) => {props.modifyParentState(event.target.value)}} />
				<span className="arrow">&#8656;</span>
			</div>
		</div>
	);
}