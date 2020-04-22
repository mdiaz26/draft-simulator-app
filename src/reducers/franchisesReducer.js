import {franchises} from '../db/franchises'

export const franchisesReducer = (state = [], action) => {
    switch (action.type) {
        case 'POPULATE_FRANCHISES':
            return state.concat(franchises)
        default:
            return state
    }
}