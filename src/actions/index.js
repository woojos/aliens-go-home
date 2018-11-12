export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const FIRE_CANNON = 'FIRE_CANNON';
export const START_GAME = 'START_GAME';


export const moveObjects = mousePosition => ({
    type: MOVE_OBJECTS,
    mousePosition
});

export const fireCannon = () => ({
    type: FIRE_CANNON
});

export const startGame = () => ({
   type: START_GAME
});