import { calculateValuations } from '../draftLogic'

export const draftActionsReducer = (state = {
    currentDraft: '', 
    franchiseFocus: '', 
    nominatedPlayer: '',
    nominatingFranchise: '',
    valuations: [],
    draftFranchisePlayers: [],
    draftFranchises: [],
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
        case 'START_POPULATING_DRAFT_FRANCHISE_PLAYERS':
            return {...state,
                draftFranchisePlayers: [],
                requesting: true
            }
        case 'POPULATE_DRAFT_FRANCHISE_PLAYERS':
            return {...state,
                draftFranchisePlayers: action.players,
                requesting: false
            }
        case 'ASSIGN_NOMINATOR':
        return {
                ...state,
                nominatingFranchise: action.franchise.name
            }
        case 'NOMINATE_PLAYER':
            console.log(`${state.nominatingFranchise.name} has nominated ${action.rPlayer.player.name} `)
            // also this should be a trigger to start bidding
            return {...state,
                nominatedPlayer: action.rPlayer, 
                valuations: calculateValuations(action.rosterConfig, action.franchises, action.rPlayer)
            }
        case 'CHANGE_FOCUS':
            return {...state,
                franchiseFocus: action.franchise
            }
        case 'ADD_FRANCHISE_PLAYER':
            return {
                ...state,
                draftFranchisePlayers: [...state.draftFranchisePlayers, action.playerObj]
            }
        case 'POPULATE_DRAFT_FRANCHISES':
            return {
                ...state,
                draftFranchises: action.franchises
            }
        default:
            return state
    }
}