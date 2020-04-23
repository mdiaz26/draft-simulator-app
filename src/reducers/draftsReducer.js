export const draftsReducer = (state = {drafts: [], requesting: false}, action) => {
    switch (action.type) {
        case 'START_POPULATING_DRAFTS_REQUEST':
            return {
                ...state,
                drafts: [...state.drafts],
                requesting: true
            }
        case 'POPULATE_DRAFTS':
            return {
                ...state,
                drafts: action.drafts,
                requesting: false
            }
        case 'ADD_DRAFT':
            return {
                ...state,
                drafts: [...state.drafts, action.draft],
                requesting: false
            }
        default:
            return state
    }
}