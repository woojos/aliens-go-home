import {calculateAngle} from '../utils/formulas';
import createFlyingObjects from "./createFlyingObjects";
import moveBalls from "./moveBalls";
import checkCollisions from "./checkCollisions";

function moveObjects(state, action) {

    if (!state.gameState.started) return state;

    let cannonBalls = moveBalls(state.gameState.cannonBalls);

    const mousePosition = action.mousePosition || {x:0, y:0};

    const newState = createFlyingObjects(state);

    const now = (new Date()).getTime();

    let flyingObjects = newState.gameState.flyingObjects.filter(object => (
        (now - object.createdAt) < 4000
    ));

    const lostLife = newState.gameState.flyingObjects.length > flyingObjects.length;
    let lives = state.gameState.lives;
    if (lostLife) { lives--; }
    let kills = newState.gameState.kills;

    const started = lives > 0;

    if (!started) {
        flyingObjects = [];
        cannonBalls = [];
        lives = 3;
        kills = 0;
    }


    const objectDestroyed = checkCollisions(cannonBalls, flyingObjects);
    const cannonBallsDestroyed = objectDestroyed.map(object => (object.cannonBallId));
    const flyingObjectsDestroyed = objectDestroyed.map(object => (object.flyingObjectId));

    cannonBalls = cannonBalls.filter(cannonBall => (cannonBallsDestroyed.indexOf(cannonBall.id)));
    flyingObjects = flyingObjects.filter(flyingObject => (flyingObjectsDestroyed.indexOf(flyingObject.id)));

    const {x, y} = mousePosition;
    const angle = calculateAngle(0, 0, x, y);

    return {
        ...newState,
        gameState: {
            ...newState.gameState,
            flyingObjects,
            cannonBalls,
            kills: kills + flyingObjectsDestroyed.length,
            lives,
            started,
        },
        angle,
    }
}

export default moveObjects;