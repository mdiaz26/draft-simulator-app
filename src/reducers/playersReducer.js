import {players} from '../db/players'

export const playersReducer = (state = [], action) => {
    switch (action.type) {
        case 'POPULATE_PLAYERS':
            return state.concat(players)
        case 'UPDATE_QUEUE':
            return action.payload
        default:
            return state
    }
}