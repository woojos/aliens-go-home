import React from 'react';
import Sky from './Sky'
import Ground from './Ground'
import CannonBase from './CannonBase'
import CannonPipe from "./CannonPipe";
import PropTypes from 'prop-types';
import CannonBall from "./CannonBall";
import CurrentScore from "./CurrentScore";
import FlyingObject from "./FlyingObject";
import Heart from "./Heart";
import StartGame from "./StartGame";
import Title from "./Title";
import {gameHeight} from "../utils/constants";
import {signIn} from "auth0-web";
import Leaderboard from "./Leaderboard";

const Canvas = (props) => {

    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];

    const lives = [];
    for (let i = 0; i < props.gameState.lives; i++) {
        const hartPosition = {
            x: -180 -  (i * 70),
            y: 35
        };
        lives.push(<Heart position={hartPosition} key={i}/>);
    }


    return (
        <svg
            id="aliens-go-home-canvas"
            preserveAspectRatio="xMaxYMax none"
            onMouseMove={props.trackMouse}
            onClick={props.shoot}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>

            <Sky/>
            <Ground/>

            {props.gameState.cannonBalls.map(cannonBall => (
                <CannonBall position={cannonBall.position} key={cannonBall.id} />
            ))};

            <CannonPipe rotation={props.angle}/>
            <CannonBase/>
            <CurrentScore score={props.gameState.kills}/>

            {props.gameState.flyingObjects.map(flyingObject => (
                <FlyingObject position={flyingObject.position} key={flyingObject.id}/>
            ))}

            {lives}

            {!props.gameState.started &&
            <g>
                <StartGame onClick={props.startGame}/>
                <Title/>
                <Leaderboard currentPlayer={props.currentPlayer} authenticate={signIn} leaderboard={props.players} />
            </g>
            }
            
        </svg>
    )

};

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    trackMouse: PropTypes.func.isRequired,
    shoot: PropTypes.func.isRequired,
    startGame: PropTypes.func.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }).isRequired,
            id: PropTypes.number.isRequired,
        })).isRequired,
    }).isRequired,
    currentPlayer: PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    }),
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired,
    })),
};

Canvas.defaultProps = {
    currentPlayer: null,
    players: null,
};

export default Canvas;
