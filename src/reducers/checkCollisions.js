import {gameHeight} from "../utils/constants";
import {checkCollision} from "../utils/formulas";


const checkCollisions = (cannonBalls, flyingObjects) => {

    const objectDestroyed = [];

    flyingObjects.forEach(flyingObject => {

        const currentLifeTime = (new Date()).getTime() - flyingObject.createdAt;

        const calculatedPosition = {
            x: flyingObject.position.x,
            y: flyingObject.position.y + ((currentLifeTime / 4000) * gameHeight),
        };

        const flyingObjectRect = {
            x1: calculatedPosition.x - 40,
            y1: calculatedPosition.y - 10,
            x2: calculatedPosition.x + 40,
            y2: calculatedPosition.y + 10,
        };

        cannonBalls.forEach(cannonBall => {

            const cannonBallRect = {
                x1: cannonBall.position.x - 8,
                y1: cannonBall.position.y - 8,
                x2: cannonBall.position.x + 8,
                y2: cannonBall.position.y + 8,
            };

            if (checkCollision(flyingObjectRect, cannonBallRect)) {
                objectDestroyed.push({
                    cannonBallId: cannonBall.id,
                    flyingObjectId: flyingObject.id,
                });
            }

        });

    });

    return objectDestroyed;

};

export default checkCollisions;