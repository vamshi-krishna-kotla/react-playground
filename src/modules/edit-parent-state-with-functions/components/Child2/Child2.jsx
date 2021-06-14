import React, { Component } from 'react';

import './Child2.scss';

import { NotificationComponent } from '../Notification/Notification.jsx';

export class Child2 extends Component {
	state = {
		notify: false,
		inputText: '',
		childStateText: 'this is the child state text',
		toggleEditParentState: true
	};

	constructor(props) {
		super(props);
	}

	onTextInput = (event) => {
		this.setState((prevState) => {
			let newState = {};
			newState.inputText = event.target.value;
			if(!prevState.toggleEditParentState) {
				newState.childStateText = event.target.value;
			}
			return newState;
		});

		this.state.toggleEditParentState ? this.props.editParentState(event.target.value) : null;
	}

	toggleEdit = () => {
		this.setState((prevState) => {
			return {
				inputText: '',
				toggleEditParentState: !prevState.toggleEditParentState,
				notify: false
			}
		}, () => {
			this.setState({
				notify: true
			})
		});
	}

	render() {
		return(
			<div id="child2" className={this.props.className}>
				{
					this.state.notify ?
					<NotificationComponent fontSize="1" statement={
						this.state.toggleEditParentState ? "Editing Parent state" : "Editing Child state"
					}/>
					: null
				}
				<h2 className="title">Child2</h2>
				<div className="inputArea">
					<input
						type="text"
						onInput={this.onTextInput}
						placeholder={
							this.state.toggleEditParentState
							? 'Type to edit parent state'
							: 'Type to edit child state'
						}
					/>
					<span className="arrow">&#8656;</span>
				</div>
				<div className="btnContainer">
					<button className="toggleUsage" onClick={this.toggleEdit}>
						{this.state.toggleEditParentState ? 'Edit Child state' : 'Edit Parent state'}
					</button>
				</div>
				<p className="currentStateArea">
					{ this.state.childStateText	}
				</p>
			</div>
		);
	}
}