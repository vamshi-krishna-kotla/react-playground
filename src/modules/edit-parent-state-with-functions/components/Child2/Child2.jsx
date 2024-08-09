import React, { Component } from 'react';

import './Child2.scss';

import { NotificationComponent } from '../../../../common/components/notification/Notification.jsx';

/**
 * A Child Component that is capable of editing the Parent Component's state
 * 
 * Features:
 * - edit parent state
 * - edit current state
 * - toggle between editing target
 */
export class Child2 extends Component {
	/**
	 * declare the initial state
	 */
	state = {
		notify: false,
		inputText: '',
		childStateText: 'this is the child state text',
		toggleEditParentState: true
	};

	/**
	 * 
	 * @param {Object} props : any given props from parent component
	 * 
	 * calling in the React component to bind the props
	 */
	constructor(props) {
		super(props);
	}

	/**
	 * 
	 * default React method to decide the re-rednering of a component
	 * 
	 * @param {Object} nextProps : new Props (if any) passed from parent
	 * @param {Object} nextState : new state or the updated state available 
	 * when setState is called
	 * 
	 * @returns {Boolean} signal to call the render method or not
	 * 
	 * restrict re-rendering of the component when the parent is re-rendered
	 * and if there is no change in the current state attributes of the component
	 * 
	 * useful when consecutive setState() calls are made updating various
	 * params in the state
	 * 
	 */
	shouldComponentUpdate(nextProps, nextState) {
		/**
		 * do not re-render the component if there is no change in notify trigger
		 * and if the current state is not updated
		 * 
		 */
		if(
			(nextState.notify === this.state.notify) &&
			(nextState.childStateText === this.state.childStateText)
		)
			return false;

		return true;
	}

	/**
	 * 
	 * @param {Object} event : JS event object on the input field
	 * 
	 * executed on input in the text box
	 */
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

	/**
	 * toggle the state editing feature based on the previous state
	 * 
	 * passing in a call back to execute setState consecutively
	 * this mechanism is basically used to toggle the "notify"
	 * param of the state
	 */
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
					/**
					 * display the notification on notify trigger
					 */
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