
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
                rankingPlayers: action.ranking_players.sort((playerA, playerB) => playerB.value - playerA.value),
                requesting: false
            }
        case 'CHANGE_VALUE':
            let newArray = state.rankingPlayers.map(rPlayer => {
                if (rPlayer.id === action.rPlayer.id) {
                    return action.rPlayer
                } else {
                    return rPlayer
                }
            })
        return {
                ...state,
                rankingPlayers: newArray.sort((playerA, playerB) => playerB.value - playerA.value)
            }
        default:
            return state
    }
}