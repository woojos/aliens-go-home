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

            const playerProfile = Auth0.getProfile();
            const currentPlayer = {
                id: playerProfile.sub,
                maxScore: 0,
                name: playerProfile.name,
                picture: playerProfile.picture,
            };

            this.props.loggedIn(currentPlayer);

            const socket = io('http://localhost:3001', {
                query: `token=${Auth0.getAccessToken()}`,
            });

            let emitted = false;

            socket.on('players', (players) => {
                this.props.leaderboardLoaded(players);

                if (emitted) return;
                socket.emit('new-max-score', {
                    id: playerProfile.sub,
                    maxScore: 120,
                    name: playerProfile.name,
                    picture: playerProfile.picture,
                });
                emitted = true;
                setTimeout(() => {
                    socket.emit('new-max-score', {
                        id: playerProfile.sub,
                        maxScore: 222,
                        name: playerProfile.name,
                        picture: playerProfile.picture,
                    });
                }, 5000);
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
