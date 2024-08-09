import React from 'react';

import ReactImage from '../../../../images/logo192.png';

import './Parent.scss';

import { Child1 } from '../Child1/Child1.jsx';
import { Child2 } from '../Child2/Child2.jsx';
import { NotificationComponent } from '../../../../common/components/notification/Notification.jsx';
import { debounce } from '../../../../helpers/helper.js';

/**
 * Parent Component holding two children components
 * which enables the children to edit the current state
 * via functions passed down as Props
 */
export class Parent extends React.Component {
	/**
	 * declare the initial state
	 */
	state = {
		notify: false
	};

	/**
	 * 
	 * @param {Object} props : any given props from parent component
	 * 
	 * calling in the React component to bind the props
	 */
	constructor(props) {
		super(props);
		this.state.text = '';
	}

	/**
	 * 
	 * @param {String} value : passed from within the calling components/functions
	 * this value will be set to display on the DOM
	 */
	modifyState = debounce((value) => {
		/**
		 * we need to remove the notification component and remount it
		 * 
		 * using callback inside of setState to execute
		 * next setState synchronously
		 */
		this.setState({
			text: value,
			notify: false
		}, () => {
			this.setState({
				notify: true
			})
		});
	}, 500);

	render() {
		return(
			<div id="parent">
				{this.state.notify ? <NotificationComponent statement="Parent state updated"/> : null}
				<div className="parentInfo">
					<div className="imageArea">
						<img className="reactImage" src={ReactImage} alt="React Logo" />
					</div>
					<div className="infoTextArea">
						<h3>This is the parent component where the text is saved</h3>
						<h4>Enter text in the input boxes below to change the parent state</h4>
						<h4>The following are child components</h4>
					</div>
				</div>
				<h2 className="stateTextArea">
					{this.state.text}
				</h2>
				<div className="childrenComponents">
					<Child1 className="childComp" modifyParentState={this.modifyState} />
					<Child2 className="childComp" editParentState={this.modifyState}/>
				</div>
			</div>
		);
	}
}