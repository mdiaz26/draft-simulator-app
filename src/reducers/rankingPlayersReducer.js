
export const rankingPlayersReducer = (state = {rankingPlayers: [], requesting: false, updatedPlayers: []}, action) => {
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
        case 'ORDER_RANKING_PLAYERS':
            return {
                ...state,
                rankingPlayers: [...state.rankingPlayers].sort((playerA, playerB) => playerB.value - playerA.value)
            }
        case 'CHANGE_VALUE':
            let newArray = state.rankingPlayers.map(rPlayer => {
                if (rPlayer.id === action.rPlayer.id) {
                    return action.rPlayer
                } else {
                    return rPlayer
                }
            })
            let updatedArray = [...state.updatedPlayers]
            const playerIndex = state.updatedPlayers.findIndex(player => player.id === action.rPlayer.id)
            if (playerIndex >= 0) {
                updatedArray.splice(playerIndex, 1)
            } 
                updatedArray.push(action.rPlayer)
        return {
                ...state,
                rankingPlayers: newArray,
                // rankingPlayers: newArray.sort((playerA, playerB) => playerB.value - playerA.value),
                updatedPlayers: updatedArray
            }
        default:
            return state
    }
}