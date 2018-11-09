import { connect } from 'react-redux';
import App from '../App'

const MapStateToProps = state => ({
    message: state.message,
});

const Game = connect(
    MapStateToProps,
)(App);

export default Game;