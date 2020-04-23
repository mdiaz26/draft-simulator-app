
export const rankingsReducer = (state = {rankings: [], requesting: false}, action) => {
    switch (action.type) {
        case 'START_POPULATING_RANKINGS_REQUEST':
            return {
                ...state,
                rankings: [...state.rankings],
                requesting: true
            }
        case 'POPULATE_RANKINGS':
        return {
                ...state,
                rankings: action.rankings,
                requesting: false
            }
        default:
            return state
    }
}