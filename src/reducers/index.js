import {LEADERBOARD_LOADED, LOGGED_IN, MOVE_OBJECTS, SHOOT, START_GAME} from '../actions';
import moveObjects from './moveObjects';
import shoot from './shoot';
import startGame from './startGame';

const initialGameState = {
    started: false,
    kills: 0,
    lives: 3,
    flyingObjects: [],
    lastObjectCreatedAt: new Date(),
    currentPlayer: null,
    players: null,
    cannonBalls: [],
};


const initialState = {
    angle: 45,
    amo:5,
    gameState: initialGameState,
};

function reducer(state = initialState, action) {

    switch (action.type) {
        case MOVE_OBJECTS:
            return moveObjects(state, action);
        case SHOOT:
            return shoot(state, action);
        case START_GAME:
            return startGame(state, initialGameState);
        case LOGGED_IN:
            return {
                ...state,
                currentPlayer:action.player
            };
        case LEADERBOARD_LOADED:
            return {
                ...state,
                players:action.players
            };
        default:
            return state;
    }
}

export default reducer;