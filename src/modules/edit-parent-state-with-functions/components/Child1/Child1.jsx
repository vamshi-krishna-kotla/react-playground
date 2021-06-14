import React, { Component } from 'react';

import './Child1.scss';

import { NotificationComponent } from '../Notification/Notification.jsx';

export class Child1 extends Component {
	state = {
		useButton: false,
		inputText: '',
		notify: false
	};

	shouldComponentUpdate(nextProps, nextState) {
		if((nextState.useButton == this.state.useButton) && (nextState.notify == this.state.notify))
			return false

		return true;
	}

	onTextInput = (event) => {
		this.setState({
			inputText: event.target.value
		});

		if(!this.state.useButton) {
			this.props.modifyParentState(event.target.value);
		}
	};

	toggleButtonUsage = () => {
		this.setState((prevState) => {
			return {
				useButton: !prevState.useButton,
				notify: false
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
					this.state.notify ?
					<NotificationComponent fontSize="1" statement={
						this.state.useButton ? "Click to edit parent state" : "Type to edit parent state"
					}/>
					: null
				}
				<h2 className="title">Child1</h2>
				<div className="inputArea">
					<input
						type="text"
						onInput={this.onTextInput}
						placeholder="Type here to edit parent state"
					/>
					<span className="arrow">&#8656;</span>
				</div>
				<div className="btnContainer">
					<button className={["toggleUsage", (this.state.useButton ? 'presentButton' : 'presentEdit')].join(" ")} onClick={this.toggleButtonUsage}>
						Switch State Edit
					</button>
					<button
						className="editParent"
						style={{
							visibility: this.state.useButton ? 'visible' : 'hidden'
						}}
						onClick={() => this.props.modifyParentState(this.state.inputText)}
					>Edit Parent state</button>
				</div>
			</div>
		);
	}
}
