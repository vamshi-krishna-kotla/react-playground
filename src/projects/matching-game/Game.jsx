import React, { Component } from "react";

import OptionsPanel from './components/OptionsPanel.jsx';
import Board from './components/Board.jsx';

import { createTiles } from './misc/utils';

export default class Game extends Component {
	state = {
		numTiles: 36,
		playing: false,
		previousTileIndex: null,
		tiles: [],
		toBeCleared: null
	};

	constructor(props) {
		super(props);
	}

	startGame = (numTiles) => {
		this.setState(() => ({
			playing: true,
			previousTileIndex: null,
			toBeCleared: null,
			tiles: createTiles(numTiles)
		}));
	}

	render() {
		return (
			<div id="matching-game">
				<OptionsPanel
					numTiles={this.state.numTiles}
					playing={this.state.playing}
				/>
				<Board
					numTiles={this.state.numTiles}
					tiles={this.state.tiles}
				/>
			</div>
		);
	};
}