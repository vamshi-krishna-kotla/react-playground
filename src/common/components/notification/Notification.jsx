import React, { Component } from 'react';

import './Notification.scss';

/**
 * Notification Component bsasically used to display a notification
 * at the top right corner of the calling element (component)
 */
class Notification extends Component {
	/**
	 * declare the initial state
	 */
	state = {
		display: true,
		timeout: null
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
	 * default React method executed when component is mounted on the DOM
	 * 
	 * set the timeout for auto-closing the notification
	 * 
	 */
	componentDidMount() {
		this.setState({
			timeout: setTimeout(() => {
				this.closeNotification();
			}, 3000)
		});
	}

	/**
	 * React method executed just before when the component
	 * is being unmounted from the DOM
	 * 
	 */
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
		// execute any callback if provided for closing event
		if (this.props.onClose) {
			this.props.onClose();
		}
		this.setState({
			display: false
		});
	}

	render() {
		return (
			<div className={["notification", this.props.type ? this.props.type : 'default', !this.state.display ? 'removed' : ''].join(' ')}>
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

/**
 * Notification component is used as a common child component
 * 
 * Memoising this component to avoid unnecessary re-renders
 * which may be triggered when the parent component is re-rendered
 */
export const NotificationComponent = React.memo(Notification);
