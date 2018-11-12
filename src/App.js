import React, { Component } from 'react';
import Canvas from './components/Canvas';
import PropTypes from 'prop-types';
import {getCanvasPosition} from "./utils/formulas";

class App extends Component {

    componentDidMount() {

        const self = this;
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
                trackMouse={event => (this.trackMouse(event))}
                fireCannon={this.props.fireCannon}
                gameState={this.props.gameState}
                startGame={this.props.startGame}
            />
        );
    }

}

App.propTypes = {
    angle: PropTypes.number.isRequired,
    moveObjects: PropTypes.func.isRequired,
    fireCannon: PropTypes.func.isRequired,
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
};

export default App;
