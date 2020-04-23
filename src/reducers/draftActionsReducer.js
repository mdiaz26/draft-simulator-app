import { calculateValuations } from '../draftLogic'

export const draftActionsReducer = (state = {franchiseFocus: '', nominatedPlayer: '', valuations: []}, action) => {
    switch (action.type) {
        case 'NOMINATE_PLAYER':
            console.log(`${action.rPlayer.player.name} has been nominated`)
            return {...state,
                nominatedPlayer: action.rPlayer, 
                valuations: calculateValuations(action.franchises, action.rPlayer)
            }
        case 'CHANGE_FOCUS':
            return {...state,
                franchiseFocus: action.franchise
            }
        default:
            return state
    }
}