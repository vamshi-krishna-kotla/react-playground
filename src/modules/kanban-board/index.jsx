import React, { Component } from 'react';
import HeaderColorSelection from './components/HeaderColorSelection.jsx';

import './kanban-board.scss';

export default class KanbanBoard extends Component {
	state = {
		colors: ['pink', 'blue', 'green', 'red']
	};

	constructor() {
		super();
	}

	render() {
		return (
			<div id="kanban-board">
				<header className="toolbar-container">
					<HeaderColorSelection colors={this.state.colors}/>

					<div className="action-button-container">
						<div className='add-ticket-trigger-button'>Add New Ticket</div>
					</div>
				</header>
			</div>
		);
	}
}