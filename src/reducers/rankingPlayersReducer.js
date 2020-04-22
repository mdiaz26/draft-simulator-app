
export const rankingPlayersReducer = (state = {rankingPlayers: [], requesting: false}, action) => {
    switch (action.type) {
        case 'START_POPULATING_PLAYERS_REQUEST':
            return {
                ...state,
                rankingPlayers: [...state.rankingPlayers],
                requesting: true
            }
        case 'POPULATE_RANKING_PLAYERS':
        return {
                ...state,
                rankingPlayers: action.ranking_players,
                requesting: false
            }
        default:
            return state
    }
}