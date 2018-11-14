import React, { Component } from 'react';
import Canvas from './components/Canvas';
import PropTypes from 'prop-types';
import {getCanvasPosition} from "./utils/formulas";
import * as Auth0 from "auth0-web";
import io from 'socket.io-client';

Auth0.configure({
    domain: 'woojos.eu.auth0.com',
    clientID: 'wbgT9A0V26jXk2z0obbDi04fuhgaF6RS',
    redirectUri: 'http://localhost:3000/',
    responseType: 'token id_token',
    scope: 'openid profile manage:points',
    //audience: 'https://aliens-go-home.digituz.com.br',
    audience: 'http://localhost:3000/',
});

class App extends Component {

    constructor(props) {
        super(props);
        this.shoot = this.shoot.bind(this);
    }

    shoot() {
        this.props.shoot(this.canvasMousePosition);
    }

    componentDidMount() {

        const self = this;

        Auth0.handleAuthCallback();

        Auth0.subscribe((auth) => {

            if (!auth) return;

            self.playerProfile = Auth0.getProfile();
            self.currentPlayer = {
                id: self.playerProfile.sub,
                maxScore: 0,
                name: self.playerProfile.name,
                picture: self.playerProfile.picture,
            };

            this.props.loggedIn(self.currentPlayer);

            self.socket = io('http://localhost:3001', {
                query: `token=${Auth0.getAccessToken()}`,
            });

            self.socket.on('players', (players) => {
                this.props.leaderboardLoaded(players);

                players.forEach(player => {
                    if (player.id === self.currentPlayer.id) {
                        self.currentPlayer.maxScore = player.maxScore;
                    }
                })

            });

        });

        setInterval(() => {
          self.props.moveObjects(self.canvasMousePosition);
        }, 10);

        window.onresize = () => {
            const cnv = document.getElementById('aliens-go-home-canvas');
            cnv.style.width = `${window.innerWidth}px`;
            cnv.style.height = `${window.innerHeight}px`;
        };
        window.onresize();

    }

    componentWillReceiveProps(newProps) {

        if (!newProps.gameState.started && this.props.gameState.started) {
            if (this.props.gameState.kills > this.currentPlayer.maxScore) {
                this.socket.emit('new-max-score', {
                    ...this.currentPlayer,
                    maxScore: this.props.gameState.kills,
                });
            }
        }

    }

    trackMouse(event) {
        this.canvasMousePosition = getCanvasPosition(event);
    }

    render() {
        return (
            <Canvas
                angle={this.props.angle}
                currentPlayer={this.props.currentPlayer}
                players={this.props.players}
                trackMouse={event => (this.trackMouse(event))}
                gameState={this.props.gameState}
                startGame={this.props.startGame}
                shoot={this.shoot}
            />
        );
    }

}

App.propTypes = {
    angle: PropTypes.number.isRequired,
    shoot: PropTypes.func.isRequired,
    moveObjects: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
                position: PropTypes.shape({
                    x: PropTypes.number.isRequired,
                    y: PropTypes.number.isRequired,
                }).isRequired,
                id: PropTypes.number.isRequired,
            })).isRequired
    }).isRequired,
    currentPlayer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }),
    leaderboardLoaded: PropTypes.func.isRequired,
    loggedIn: PropTypes.func.isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    })),
};

App.defaultProps = {
    currentPlayer: null,
    players: null,
};

export default App;
