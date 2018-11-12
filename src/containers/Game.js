import { connect } from 'react-redux';
import App from '../App'
import {fireCannon, moveObjects, startGame} from "../actions";

const mapStateToProps = state => ({
    angle: state.angle,
    gameState: state.gameState,
});

const mapDispatchToProps = dispatch => ({
    moveObjects: (mousePosition) => {
        dispatch(moveObjects(mousePosition));
    },
    fireCannon: () => {
        dispatch(fireCannon())
    },
    startGame: () => {
        dispatch(startGame())
    }
});

const Game = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App);

export default Game;