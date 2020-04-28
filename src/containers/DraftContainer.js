import React from 'react'
import '../styles/DraftContainer.css'
import { connect } from 'react-redux'
import Bids from '../components/Bids'
import Player from '../components/Player'
import BidOptions from '../components/BidOptions'
import JSONAPIAdapter from '../JSONAPIAdapter'
import { totalRosterSpots } from  '../draftLogic'

const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')

class Draft extends React.Component {
    
    state = {
        bidderIndex: 0,
        biddingTrigger: "",
    }

    setStateToDefault = () => {
        this.setState({
            biddingTrigger: ""
        })
        this.props.nominatePlayer(this.props.currentDraft.draft_config, '', this.props.draftFranchises)
        // this.props.resetBids()
    }

    mostRecentBid = () => {
        if (this.props.bids.length > 0) {
            return this.props.bids[this.props.bids.length - 1]
        } else {
            return {franchise: this.props.nominatingFranchise, bidAmount: 1}
        }
    }

    findYourFranchise = () => {
        const draftFranchises = this.props.franchises.filter(franchise => franchise.draft_id === parseInt(this.props.draftId))
        const yourFranchise = draftFranchises.find(franchise => franchise.name === "Your Team")
        return yourFranchise
    }

    filterFranchisesByBid = () => {
        if (this.props.bids.length > 0) {
            return this.props.valuations.filter(valueObj => valueObj.valuation > this.mostRecentBid().bidAmount)
        } else {
            return this.props.valuations
        }
    }

    startBidding = () => {
        const biddingTrigger = setInterval(() => this.teamBids(), 200)
        this.setState({biddingTrigger})
        const nominatorIndex = this.props.draftFranchises.findIndex(franchise => franchise.id === this.props.nominatingFranchise.id)
        this.setState({bidderIndex: nominatorIndex})
    }

    teamBids = () => {
        // This creates a new array each time it is run. The array will shrink as mostRecentBid().bidAmount increases.
        let bidders = this.filterFranchisesByBid()
        this.nextBidder()
        if (bidders.length === 0) {
            // multiple teams are tied valuating the player at the current bid.
            // Whoever last bid is the winner
            this.declareWinner()
        } else if (bidders.length > 0) {
            let valueObj = bidders[this.state.bidderIndex]
            let franchise = this.props.franchises.find(franchise => franchise.id === valueObj.franchiseId)
            // the franchise will bid if their valuation is higher than the current bid
            if (
                valueObj.franchiseId !== this.mostRecentBid().franchise.id && 
                franchise.franchise_players.length < totalRosterSpots(this.props.currentDraft.roster_config) &&
                valueObj.valuation > this.mostRecentBid().bidAmount
                ) {
                    // console.log(`${franchise.name} has bid $${this.mostRecentBid().bidAmount + 1}`)
                    this.props.updateBids({franchise, bidAmount: this.mostRecentBid().bidAmount + 1})
                    
                    bidders.length === 1 && this.declareWinner()
            } else if (valueObj.franchiseId === this.mostRecentBid().franchise.id && bidders.length === 1) {
                this.declareWinner()
            }
        }
    }

    nextBidder = () => {
        if (this.state.bidderIndex >= this.filterFranchisesByBid().length - 1) {
            // the pool of interested parties has shrunk and we can't increase the index
            this.setState({bidderIndex: 0})
        } else {
            this.setState(prevState => ({bidderIndex: prevState.bidderIndex + 1}))
        }
    }

    declareWinner = () => {
        const winningFranchise = this.props.franchises.find(franchise => (
            franchise.id === this.mostRecentBid().franchise.id))
        console.log(`${winningFranchise.name} has won with a bid of $${this.mostRecentBid().bidAmount}`)
        this.postFranchisePlayer()
        this.stopBidding()
        this.newNominatorIndex()
        this.setStateToDefault()
    }

    newNominatorIndex = () => {
        const nominatorIndex = this.props.draftFranchises.findIndex(franchise => franchise.id === this.props.nominatingFranchise.id)
        if (nominatorIndex >= this.props.draftFranchises.length - 1) {
            this.props.updateNominatingFranchise(0)
        } else {
            this.props.updateNominatingFranchise(nominatorIndex + 1)
        }
    }

    // POST for FranchisePlayer
    postFranchisePlayer = () => {
        const body = {
            player_id: this.props.nominatedPlayer.id,
            franchise_id: this.mostRecentBid().franchise.id,
            salary: this.mostRecentBid().bidAmount
        }
        adapter.post('franchise_players', body)
        .then(this.props.addFranchisePlayer)
    }

    stopBidding = () => {
        clearInterval(this.state.biddingTrigger)
        this.setState({biddingTrigger: ""})
    }
    
    render() {
        const yourFranchise = this.findYourFranchise()
        return (
            <div className='draft-container'>
                <button disabled={this.props.nominatedPlayer === ''} onClick={this.startBidding}>Start Bidding</button>
                <button onClick={this.stopBidding}>Stop Bidding</button>
                {this.props.nominatedPlayer !== '' ? 
                    <Player
                    player={this.props.nominatedPlayer.player}
                    rPlayer={this.props.nominatedPlayer}
                    inNominationQueue={false}
                    /> :
                    'Nomination Pending'
                }
                {yourFranchise && 
                    <BidOptions franchise={yourFranchise}/>
                    }
                <Bids/>
                <button onClick={() => console.log(this.props.draftFranchisePlayers)}>show franchise_players</button>
                {/* <p>Current Bid is ${this.mostRecentBid().bidAmount}</p> */}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises.franchises,
        draftFranchises: state.nominationData.draftFranchises,
        nominatedPlayer: state.nominationData.nominatedPlayer,
        nominatingFranchise: state.nominationData.nominatingFranchise,
        valuations: state.nominationData.valuations,
        bids: state.nominationData.bids,
        currentDraft: state.nominationData.currentDraft,
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFranchisePlayer: (playerObj) => dispatch({type: 'ADD_FRANCHISE_PLAYER', playerObj}),
        nominatePlayer: (rosterConfig, playerObj, franchises) => dispatch({type: 'NOMINATE_PLAYER', rosterConfig, rPlayer: playerObj, franchises: franchises}),
        updateNominatingFranchise: (index) => dispatch({type: 'UPDATE_NOMINATING_FRANCHISE', index}),
        updateBids: bidData => dispatch({type: 'UPDATE_BIDS', bidData}),
        resetBids: () => dispatch({type: 'RESET_BIDS'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft)