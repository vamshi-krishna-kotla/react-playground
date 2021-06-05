import React, { Component } from 'react';

import './Notification.scss';

export class NotificationComponent extends Component {
	state = {
		display: true,
		timeout: null
	};

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setState({
			timeout: setTimeout(() => {
				this.closeNotification();
			}, 3000)
		});
	}

	componentWillUnmount() {
		/**
		 * remove any timeouts previously set
		 * as this component is set to mount based on parent's state change
		 * 
		 * if there are any previous timeouts set then they might be
		 * executed after the previous instance of that component is unmounted
		 * which causes an error
		 * 
		 * hence taking off any async operation of an instance before unmounting
		 * that instance
		 */
		if (this.state.timeout) {
			clearInterval(this.state.timeout);
		}
	}

	/**
	 * close the notification
	 */
	closeNotification = () => {
		this.setState({
			display: false
		});
	}

	render() {
		return (
			<div className={["notification", !this.state.display ? 'removed' : ''].join(' ')}>
				<span
					className="statement"
					style={{
						fontSize: (this.props.fontSize || '1.5') + 'rem'
					}}
				>
					{this.props.statement}
				</span>
				<span className="close" onClick={this.closeNotification}>&#x2716;</span>
			</div>
		);
	}
}