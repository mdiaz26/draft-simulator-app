import { calculateValuations } from '../draftLogic'

export const draftActionsReducer = (state = {nominatedPlayer: '', valuations: []}, action) => {
    switch (action.type) {
        case 'NOMINATE_PLAYER':
            console.log(`${action.rPlayer.player.name} has been nominated`)
            return {nominatedPlayer: action.rPlayer, valuations: calculateValuations(action.franchises, action.rPlayer)}
        default:
            return state
    }
}