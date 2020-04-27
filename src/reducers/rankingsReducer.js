
export const rankingsReducer = (state = {rankings: [], requesting: false, currentRanking: ''}, action) => {
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
        case 'START_FETCHING_RANKING_REQUEST':
            return {
                ...state,
                ranking: state.ranking,
                requesting: true
            }
        case 'FETCH_RANKING':
            return {
                ...state,
                currentRanking: action.ranking,
                requesting: false
            }
        default:
            return state
    }
}