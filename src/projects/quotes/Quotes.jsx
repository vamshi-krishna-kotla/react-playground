import React, { Component } from 'react';

import styles from './Quotes.module.scss';

export default class QuotesComp extends Component {
	/**
	 * declare the initial state
	 */
	state = {};

	/**
	 * 
	 * @param {Object} props : any given props from parent component
	 * 
	 * calling in the React component to bind the props
	 */
	constructor(props) {
		super(props);
	};

	generateNewQuote = () => {
		let newReq = new XMLHttpRequest();
		newReq.onload = () => {
			this.setState({
				quoteOutput: JSON.parse(newReq.response).content
			});
		};
		newReq.open('GET', 'https://api.quotable.io/random');
		newReq.send();
	}

	render() {
		return (
			<div id={styles["quote-generator"]}>
				<h1>Quote for the day</h1>
				<p>Hit the button below to get a random quote</p>
				<button onClick={this.generateNewQuote}>New Quote</button>
				<div>
					<h2>{this.state.quoteOutput}</h2>
				</div>
			</div>
		);
	};
}