export const franchisesReducer = (state = {franchises: [], requesting: false}, action) => {
    switch (action.type) {
        case 'START_POPULATING_FRANCHISES_REQUEST':
            return {
                ...state,
                franchises: [...state.franchises],
                requesting: true
            }
        case 'POPULATE_FRANCHISES':
            return {
                ...state,
                franchises: action.franchises,
                requesting: false
            }
        case 'ADD_FRANCHISE':
            return {
                ...state,
                franchises: [...state.franchises, action.franchise],
                requesting: false
            }
        default:
            return state
    }
}