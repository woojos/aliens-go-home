import { connect } from 'react-redux';
import App from '../App'
import {leaderboardLoaded, loggedIn, moveObjects, shoot, startGame} from "../actions";

const mapStateToProps = state => ({
    angle: state.angle,
    gameState: state.gameState,
    currentPlayer: state.currentPlayer,
    players: state.players,
});

const mapDispatchToProps = dispatch => ({

    moveObjects: (mousePosition) => {
        dispatch(moveObjects(mousePosition));
    },
    shoot: (mousePosition) => {
        dispatch(shoot(mousePosition))
    },
    startGame: () => {
        dispatch(startGame())
    },
    leaderboardLoaded: (players) => {
        dispatch(leaderboardLoaded(players))
    },
    loggedIn: (player) => {
        dispatch(loggedIn(player))
    },

});

const Game = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default Game;