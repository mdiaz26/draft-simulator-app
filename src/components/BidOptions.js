import React from 'react'
import { connect } from 'react-redux'
import { calculateBudget, maxBid } from '../draftLogic'

const BidOptions = props => {
    return (
        <div>
            Budget Remaining: {calculateBudget(props.franchise.budget, props.franchise.franchise_players)}
            Max Bid: {maxBid(props.currentDraft.roster_config, props.franchise)}
            <button>Bid</button>
            <button>Pass</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentDraft: state.nominationData.currentDraft
    }
}

export default connect(mapStateToProps)(BidOptions)