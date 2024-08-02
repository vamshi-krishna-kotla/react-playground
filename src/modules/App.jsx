import React from 'react';
import { Routes, Route } from 'react-router-dom';

import KanbanBoard from './kanban-board/index.jsx';
import Main from './edit-parent-state-with-functions/index.jsx';
import Shop from './shop/Shop.jsx';

// global styles
import '../common/styles/_common.scss';
import NavBar from '../common/components/navbar/NavBar.jsx';

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
	routes = [
		{ titleHTML: 'Home', location: '/modules', element: <h1>Home page</h1>, showInNavBar: true },
		{ titleHTML: 'State Edit', location: '/modules/state-edit', element: <Main />, showInNavBar: true },
		{ titleHTML: 'Shop', location: '/modules/shop', element: <Shop />, showInNavBar: true },
		{ titleHTML: 'Kanban Board', location: '/modules/kanban-board', element: <KanbanBoard />, showInNavBar: true },
	];

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="App">
				<NavBar links={this.routes} />
				<Routes>
					{
						this.routes.map((route, index) => {
							return (
								<Route
									key={'route_' + route.titleHTML + '_' + index}
									path={route.location}
									exact
									element={route.element}
								></Route>
							);
						})
					}
				</Routes>
			</div>
		);
	};
}
