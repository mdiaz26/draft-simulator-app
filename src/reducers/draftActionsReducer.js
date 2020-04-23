import { calculateValuations } from '../draftLogic'

export const draftActionsReducer = (state = {
    currentDraft: '', 
    franchiseFocus: '', 
    nominatedPlayer: '', 
    valuations: [],
    requesting: false
}, action) => {
    switch (action.type) {
        case 'START_POPULATING_DRAFT_REQUEST':
            return {...state,
                currentDraft: '',
                requesting: true
            }
        case 'ASSIGN_DRAFT':
            return {...state,
                currentDraft: action.draft,
                requesting: false
            }
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