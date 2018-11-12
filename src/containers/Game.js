import { connect } from 'react-redux';
import App from '../App'
import {moveObjects} from "../actions";

const MapStateToProps = state => ({
    angle: state.angle,
});

const mapDispatchToProps = dispatch => ({
    moveObjects: (mousePosition) => {
        dispatch(moveObjects(mousePosition));
    }
});

const Game = connect(
    MapStateToProps,
    mapDispatchToProps,
)(App);

export default Game;