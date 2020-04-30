import { calculateValuations } from '../draftLogic'

export const draftActionsReducer = (state = {
    currentDraft: '', 
    franchiseFocus: '', 
    nominatedPlayer: '',
    nominatingFranchise: {},
    biddingTrigger: '',
    bids: [],
    bidWinners: [],
    valuations: [],
    draftFranchisePlayers: [],
    draftFranchises: [],
    requesting: false,
    yourTurn: false,
    userHasPassed: false
}, action) => {
    switch (action.type) {
        case 'START_POPULATING_DRAFT_REQUEST':
            return {...state,
                currentDraft: '',
                requesting: true
            }
        case 'ADD_DRAFT':
            return {...state,
                currentDraft: action.draft,
                requesting: false
            }
        case 'ASSIGN_DRAFT':
            const sortedFranchises = action.draft.franchises.sort((franA, franB) => franA.draft_position - franB.draft_position)
            const nominatingFranchise = action.draft.franchises.find(franchise => franchise.is_nominating)
            const yourTeam = action.draft.franchises.find(franchise => franchise.name === "Your Team")
            console.log("assigning draft")
            return {...state,
                currentDraft: action.draft,
                draftFranchises: sortedFranchises,
                nominatingFranchise: nominatingFranchise,
                franchiseFocus: yourTeam,
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
        case 'NOMINATE_PLAYER':
            let valuations
        if (action.rPlayer !== '') {
                valuations = calculateValuations(action.rosterConfig, action.franchises, action.rPlayer, action.rankingPlayers)
                console.log('valuations:', valuations)
            } else {
                valuations = []
            }
            // also this should be a trigger to start bidding
            return {...state,
                nominatedPlayer: action.rPlayer, 
                valuations: valuations,
                bids: [{franchise: state.nominatingFranchise, player: action.rPlayer.player, bidAmount: 1, initialBid: true}],
                userHasPassed: false
            }
        case 'UPDATE_NOMINATING_FRANCHISE':
            return {
                ...state,
                nominatingFranchise: action.franchise
            }
        case 'UPDATE_BIDS':
            return {
                ...state,
                bids: [...state.bids, action.bidData]
            }
        case 'RESET_BIDS':
            return {
                ...state,
                bids: []
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
        case 'USER_HAS_PASSED':
            return {
                ...state,
                userHasPassed: true,
                yourTurn: false
            }
        case 'YOUR_TURN':
            return {
                ...state,
                yourTurn: true
            }
        case 'NOT_YOUR_TURN':
            return {
                ...state,
                yourTurn: false
            }
        default:
            return state
    }
}