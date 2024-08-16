import React, { Component } from 'react';

import styles from './Quotes.module.scss';

export default class QuotesComp extends Component {
	/**
	 * declare the initial state
	 */
	state = { visibility: true };

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
		let quoteOutput;
		let newReq = new XMLHttpRequest();
		newReq.onload = () => {
			quoteOutput = JSON.parse(newReq.response);
			this.setState({
				quote: quoteOutput.quote,
				author: quoteOutput.author,
				visibility: true
			});
		};
		this.setState({ visibility: false }, () => {
			newReq.open('GET', 'https://dummyjson.com/quotes/random');
			newReq.send();
		});
	}

	render() {
		return (
			<div id={styles["quote-generator"]}>
				<h1>Random Quotes</h1>
				<button
					className={styles["new-quote-btn"] + ' button'}
					onClick={this.generateNewQuote}
					disabled={this.state.visibility ? false : 'disabled'}
				>
					Fetch Quote
				</button>
				<div className={styles["quote-container"]} style={{ opacity: (this.state.visibility ? 1 : 0) }}>
					<h2>{ this.state.quote ? this.state.quote : '' }</h2>
					<h3>{ this.state.author ? '- ' + this.state.author : '' }</h3>
				</div>
			</div>
		);
	};
}