export const filterReducer = (state = {
    QB: true, 
    RB: true,
    WR: true,
    TE: true,
    DST: true,
    K: true,
    'Tier 1': true,
    'Tier 2': true,
    'Tier 3': true,
    'Tier 4': true,
    'Tier 5': true,
    'Tier 6': true,
    'Tier 7': true,
    'Tier 8': true,
    'Tier 9': true,
    'Tier 10': true
    }, action) => {

    switch (action.type) {
        case 'CHECK_QB':
        return {
            ...state,
            QB: !state.QB
        }
        case 'CHECK_RB':
        return {
            ...state,
            RB: !state.RB
        }
        case 'CHECK_WR':
        return {
            ...state,
            WR: !state.WR
        }
        case 'CHECK_TE':
        return {
            ...state,
            TE: !state.TE
        }
        case 'CHECK_DST':
        return {
            ...state,
            DST: !state.DST
        }
        case 'CHECK_K':
        return {
            ...state,
            K: !state.K
        }
        case 'CHECK_TIER_1':
        return {
            ...state,
            'Tier 1': !state['Tier 1']
        }
        case 'CHECK_TIER_2':
        return {
            ...state,
            'Tier 2': !state['Tier 2']
        }
        case 'CHECK_TIER_3':
        return {
            ...state,
            'Tier 3': !state['Tier 3']
        }
        case 'CHECK_TIER_4':
        return {
            ...state,
            'Tier 4': !state['Tier 4']
        }
        case 'CHECK_TIER_5':
        return {
            ...state,
            'Tier 5': !state['Tier 5']
        }
        case 'CHECK_TIER_6':
        return {
            ...state,
            'Tier 6': !state['Tier 6']
        }
        case 'CHECK_TIER_7':
        return {
            ...state,
            'Tier 7': !state['Tier 7']
        }
        case 'CHECK_TIER_8':
        return {
            ...state,
            'Tier 8': !state['Tier 8']
        }
        case 'CHECK_TIER_9':
        return {
            ...state,
            'Tier 9': !state['Tier 9']
        }
        case 'CHECK_TIER_10':
        return {
            ...state,
            'Tier 10': !state['Tier 10']
        }
        case 'RESET_FILTERS':
            return {
                QB: true, 
                RB: true,
                WR: true,
                TE: true,
                DST: true,
                K: true,
                'Tier 1': true,
                'Tier 2': true,
                'Tier 3': true,
                'Tier 4': true,
                'Tier 5': true,
                'Tier 6': true,
                'Tier 7': true,
                'Tier 8': true,
                'Tier 9': true,
                'Tier 10': true
                }
        default:
            return state
    }
}