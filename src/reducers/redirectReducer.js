// import {players} from '../db/players'

export const redirectReducer = (state = '', action) => {
    switch (action.type) {
        case 'REDIRECT':
            return action.endpoint
        default:
            return state
    }
}