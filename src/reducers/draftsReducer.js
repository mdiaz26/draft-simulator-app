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
        case 'ADD_FRANCHISES':
            console.log('inside add_franchises',action.franchises)
            const newDrafts = state.drafts.map(draft => {
                if (draft.id === action.franchises[0].draft_id) {
                    return {
                        ...draft,
                        franchises: action.franchises
                    }
                } else {
                    return draft
                }
            })
        return {
                ...state,
                drafts: newDrafts
            }
        default:
            return state
    }
}