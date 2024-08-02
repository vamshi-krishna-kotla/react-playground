import React from 'react';
import KanbanBoard from './kanban-board/index.jsx';

import Main from './edit-parent-state-with-functions/index.jsx';

import Shop from './shop/Shop.jsx';

// global styles
import '../common/styles/_common.scss';

/**
 * @todo
 * 
 * try to implement the useEffect hook with a recursion
 * like a task executed on an interval
 * 
 * watch it getting called multiple times
 * 
 * then check it with clean up function to clear previous
 * intervals and start new ones
 */

export default class App extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				{/* <Main /> */}
				{/* <KanbanBoard /> */}
				<Shop />
			</div>
		);
	};
}
