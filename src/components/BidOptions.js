import React from 'react'
import '../styles/DraftContainer.css'
import { connect } from 'react-redux'
import { calculateBudget, maxBid } from '../draftLogic'

const BidOptions = props => {
    
    const userBids = () => {
        if (maxBid(props.currentDraft.roster_config, props.franchise) > props.mostRecentBid.bidAmount) {
            props.updateBids({franchise: props.franchise, bidAmount: props.mostRecentBid.bidAmount + 1})
            props.notYourTurn()
            props.resumeBidding(500)
        } else {
            alert('you do not have enough to bid')
        }
    }

    const userPasses = () => {
        props.userHasPassed()
        props.resumeBidding(200)
    }
    
    return (
        <div className='bid-options'>
            {props.franchise && 
                <React.Fragment>
                    <p>Budget: ${calculateBudget(props.franchise.budget, props.franchise.franchise_players)}</p>
                    <p>Max Bid: ${maxBid(props.currentDraft.roster_config, props.franchise)}</p>
                </React.Fragment>
            }
            <button 
                disabled={props.bids.length < 1} 
                className={props.bids.length > 0 ? 'bid btn' : 'btn'} 
                onClick={userBids}
            >Bid</button>
            <button 
                disabled={props.bids.length < 1} 
                className={props.bids.length > 0 ? 'pass btn' : 'btn'} 
                onClick={userPasses}
            >Pass</button>
            
        </div>
    )
}


const mapStateToProps = state => {
    return {
        currentDraft: state.nominationData.currentDraft,
        bids: state.nominationData.bids,
        userHasPassed: state.nominationData.userHasPassed,
        yourTurn: state.nominationData.yourTurn
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateBids: bidData => dispatch({type: 'UPDATE_BIDS', bidData}),
        userHasPassed: () => dispatch({type: 'USER_HAS_PASSED'}),
        notYourTurn: () => dispatch({type: 'NOT_YOUR_TURN'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BidOptions)