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
    userHasPassed: false,
    maxBidView: false
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
            console.log("assigning draft", action.draft)
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
            const newDraftFranchises = state.draftFranchises.map(franchise => {
                if (franchise.id === action.franchise.id) {
                    return {...franchise, is_nominating: true}
                } else {
                    return {...franchise, is_nominating: false}
                }
            })
            return {
                ...state,
                draftFranchises: newDraftFranchises,
                nominatingFranchise: action.franchise,
                nominatedPlayer: ''
            }
        case 'UPDATE_BIDS':
            const updatedBids = [action.bidData].concat([...state.bids])
            return {
                ...state,
                bids: updatedBids
                // bids: [...state.bids, action.bidData]
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
            const updatedFranchises = state.draftFranchises.map(franchise => {
                if (franchise.id === action.playerObj.franchise_id) {
                    return {...franchise, franchise_players: [...franchise.franchise_players, action.playerObj]}
                } else {
                    return franchise
                }
            })
            let newFranchiseFocus = state.franchiseFocus
            if (action.playerObj.franchise_id === state.franchiseFocus.id) {
                newFranchiseFocus.franchise_players = [...newFranchiseFocus.franchise_players, action.playerObj]
            }
            console.log('new franchise focus:', newFranchiseFocus)
            return {
                ...state,
                franchiseFocus: newFranchiseFocus,
                draftFranchises: updatedFranchises,
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
        case 'TOGGLE_BUDGET_VIEW':
            return {
                ...state,
                maxBidView: !state.maxBidView
            }
        default:
            return state
    }
}