export const franchisesReducer = (state = {franchises: [], requesting: false}, action) => {
    switch (action.type) {
        case 'START_POPULATING_FRANCHISES_REQUEST':
            return {
                ...state,
                franchises: [...state.franchises],
                requesting: true
            }
        case 'POPULATE_FRANCHISES':
            return {
                ...state,
                franchises: action.franchises,
                requesting: false
            }
        case 'ADD_FRANCHISE':
            return {
                ...state,
                franchises: [...state.franchises, action.franchise],
                requesting: false
            }
        // case 'ADD_FRANCHISE_PLAYER':
        //     const newFranchises = state.franchises.map(franchise => {
        //         if (franchise.id === action.playerObj.franchise_id) {
        //             return {...franchise, franchise_players: [...franchise.franchise_players, action.playerObj]}
        //         } else {
        //             return franchise
        //         }
        //     })
        //     return {
        //         ...state,
        //         franchises: newFranchises
        //     }
        default:
            return state
    }
}