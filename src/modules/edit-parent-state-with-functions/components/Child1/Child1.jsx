import React, { Component } from 'react';

import './Child1.scss';

import { NotificationComponent } from '../../../../common/components/notification/Notification.jsx';

/**
 * A Child Component that is capable of editing the Parent Component's state
 * 
 * Features:
 * - edit via dynamic input
 * - edit via button click
 */
export class Child1 extends Component {
	/**
	 * declare the initial state
	 */
	state = {
		inputText: '',
		notify: false,
		useButton: false
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
		 * do not re-render the component if the toggling 
		 * state params are not changed
		 */
		if(
			(nextState.useButton == this.state.useButton) &&
			(nextState.notify == this.state.notify)
		)
			return false

		return true;
	}

	/**
	 * 
	 * @param {Object} event : JS event object on the input field
	 * 
	 * executed on input in the text box
	 */
	onTextInput = (event) => {
		this.setState({
			inputText: event.target.value
		});

		if(!this.state.useButton) {
			this.props.modifyParentState(event.target.value);
		}
	};

	/**
	 * toggle the state editing feature based on the previous state
	 * 
	 * passing in a call back to execute setState consecutively
	 * this mechanism is basically used to toggle the "notify"
	 * param of the state
	 */
	toggleButtonUsage = () => {
		this.setState((prevState) => {
			return {
				notify: false,
				useButton: !prevState.useButton
			}
		},() => {
			this.setState({
				notify: true
			})
		})
	};

	render() {
		return(
			<div id="child1" className={this.props.className}>
				{
					/**
					 * display the notification on notify trigger
					 */
					this.state.notify ?
					<NotificationComponent fontSize="1" statement={
						this.state.useButton ? "Click to edit parent state" : "Type to edit parent state"
					}/>
					: null
				}
				<h2 className="title">Child1</h2>
				<div className="inputArea">
					<input
						onInput={this.onTextInput}
						placeholder="Type here to edit parent state"
						type="text"
					/>
					<span className="arrow">&#8656;</span>
				</div>
				<div className="btnContainer">
					<button className={["toggleUsage", (this.state.useButton ? 'presentButton' : 'presentEdit')].join(" ")} onClick={this.toggleButtonUsage}>
						Switch State Edit
					</button>
					<button
						className="editParent"
						onClick={() => this.props.modifyParentState(this.state.inputText)}
						/**
						 * sending in few default styles via the styles object
						 */
						style={{
							visibility: this.state.useButton ? 'visible' : 'hidden'
						}}
					>Edit Parent state</button>
				</div>
			</div>
		);
	}
}
