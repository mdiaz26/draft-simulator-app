import React from 'react'
import { connect } from 'react-redux'
import { calculateBudget, maxBid } from '../draftLogic'

const BidOptions = props => {
    
    const userBids = () => {
        // console.log('roster config:', props.currentDraft.roster_config, 'franchise', props.franchise)
        if (maxBid(props.currentDraft.roster_config, props.franchise) > props.mostRecentBid.bidAmount) {
            props.updateBids({franchise: props.franchise, bidAmount: props.mostRecentBid.bidAmount + 1})
            props.resumeBidding()
        } else {
            console.log('you do not have enough to bid')
        }
    }

    const userPasses = () => {
        props.userHasPassed()
        props.resumeBidding()
    }
    
    return (
        <div>
            Budget Remaining: ${calculateBudget(props.franchise.budget, props.franchise.franchise_players)}
            Max Bid: ${maxBid(props.currentDraft.roster_config, props.franchise)}
            <button onClick={userBids}>Bid</button>
            <button 
                // disabled={props.userHasPassed} 
                onClick={userPasses}>Pass</button>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        currentDraft: state.nominationData.currentDraft,
        bids: state.nominationData.bids,
        userHasPassed: state.nominationData.userHasPassed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBids: bidData => dispatch({type: 'UPDATE_BIDS', bidData}),
        userHasPassed: () => dispatch({type: 'USER_HAS_PASSED'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BidOptions)