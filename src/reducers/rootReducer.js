import { combineReducers } from 'redux'
import {playersReducer} from './playersReducer'
import {rankingPlayersReducer} from './rankingPlayersReducer'
import {franchisesReducer} from './franchisesReducer'
import {draftReducer} from './draftReducer'

const rootReducer = combineReducers({
    players: playersReducer,
    franchises: franchisesReducer,
    rankingPlayers: rankingPlayersReducer,
    nominationData: draftReducer
})

export default rootReducer