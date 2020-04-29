import { combineReducers } from 'redux'
// import {playersReducer} from './playersReducer'
import {rankingPlayersReducer} from './rankingPlayersReducer'
import {draftsReducer} from './draftsReducer'
import {franchisesReducer} from './franchisesReducer'
import {draftActionsReducer} from './draftActionsReducer'
import {rankingsReducer} from './rankingsReducer'
import {filterReducer} from './filterReducer'

const rootReducer = combineReducers({
    // players: playersReducer,
    drafts: draftsReducer,
    franchises: franchisesReducer,
    rankingPlayersInfo: rankingPlayersReducer,
    nominationData: draftActionsReducer,
    rankingsInfo: rankingsReducer,
    filterStatus: filterReducer
})

export default rootReducer