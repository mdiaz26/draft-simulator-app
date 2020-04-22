import { calculateValuations } from '../draftLogic'

export const draftReducer = (state = {nominatedPlayer: '', valuations: []}, action) => {
switch (action.type) {
    case 'NOMINATE_PLAYER':
        console.log(`${action.player.name} has been nominated`)
        return {nominatedPlayer: action.player, valuations: calculateValuations(action.franchises, action.player)}
    default:
        return state
}
}