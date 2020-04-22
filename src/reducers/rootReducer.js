import { combineReducers } from 'redux'
import {playersReducer} from './playersReducer'
import {franchisesReducer} from './franchisesReducer'
import {draftReducer} from './draftReducer'

const rootReducer = combineReducers({
    players: playersReducer,
    franchises: franchisesReducer,
    nominationData: draftReducer
})

export default rootReducer