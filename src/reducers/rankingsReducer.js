
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
        case 'CHANGE_VALUE':
            return {
                ...state,
                currentRanking: {
                    ...state.currentRanking, 
                    ranking_players: state.currentRanking.ranking_players.map(rPlayer => {
                        if (rPlayer.id === action.rPlayer.id) {
                            return action.rPlayer
                        } else {
                            return rPlayer
                        }
                    })
                }
            }
        default:
            return state
    }
}