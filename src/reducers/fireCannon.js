function fireCannon(state, action) {

    const amo =  state.amo > 0 ? state.amo-1 : 0;

    return {
        ...state,
        amo
    }
}

export default fireCannon;