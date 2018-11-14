export const MOVE_OBJECTS = 'MOVE_OBJECTS';
export const SHOOT = 'SHOOT';
export const START_GAME = 'START_GAME';
export const LEADERBOARD_LOADED = 'LEADERBOARD_LOADED';
export const LOGGED_IN = 'LOGGED_IN';


export const moveObjects = mousePosition => ({
    type: MOVE_OBJECTS,
    mousePosition
});

export const shoot = mousePosition => ({
    type: SHOOT,
    mousePosition,
});

export const startGame = () => ({
   type: START_GAME
});

export const leaderboardLoaded = players => ({
    type: LEADERBOARD_LOADED,
    players,
});

export const loggedIn = player => ({
    type: LOGGED_IN,
    player,
});
