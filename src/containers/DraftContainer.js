import React from 'react'
import { connect } from 'react-redux'
import Bids from '../components/Bids'
import Player from '../components/Player'
import BidOptions from '../components/BidOptions'
import JSONAPIAdapter from '../JSONAPIAdapter'

const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')

class Draft extends React.Component {
    
    state = {
        bidderIndex: 0,
        biddingTrigger: "",
        bids: []
    }

    setStateToDefault = () => {
        this.setState({
            biddingTrigger: "",
            bids: []
        })
        this.props.nominatePlayer(this.props.currentDraft.draft_config, '', this.props.draftFranchises)
    }

    mostRecentBid = () => {
        if (this.state.bids.length > 0) {
            return this.state.bids[this.state.bids.length - 1]
        } else {
            return {franchiseId: 0, bidAmount: 1}
        }
    }

    findYourFranchise = () => {
        const draftFranchises = this.props.franchises.filter(franchise => franchise.draft_id === parseInt(this.props.draftId))
        const yourFranchise = draftFranchises.find(franchise => franchise.name === "Your Team")
        return yourFranchise
    }

    // I think this belongs IN DRAFTCONTAINER
    filterFranchisesByBid = () => {
        if (this.state.bids.length > 0) {
            return this.props.valuations.filter(valueObj => valueObj.valuation > this.mostRecentBid().bidAmount)
        } else {
            return this.props.valuations
        }
    }

    // I think this belongs IN DRAFTCONTAINER
    startBidding = () => {
        // console.log(this.props.valuations)
        const biddingTrigger = setInterval(() => this.teamBids(), 200)
        this.setState({biddingTrigger})
        console.log(`${this.props.nominatingFranchise.name} has nominated ${this.props.nominatedPlayer} for $1`)
        const nominatorIndex = this.props.draftFranchises.findIndex(franchise => franchise.id === this.props.nominatingFranchise.id)
        this.setState({bidderIndex: nominatorIndex})
    }

    // I think this belongs in DRAFTLOGIC
    // But I can't move it because it's using methods that are in DRAFTCONTAINER and DRAFTCONTAINER'S state
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
            if (valueObj.franchiseId !== this.mostRecentBid().franchiseId && valueObj.valuation > this.mostRecentBid().bidAmount) {
                console.log(`${franchise.name} has bid $${this.mostRecentBid().bidAmount + 1}`)
                this.setState(prevState => (
                    {bids: prevState.bids.concat(
                        {franchiseId: franchise.id, bidAmount: this.mostRecentBid().bidAmount + 1})
                    }
                ))
                bidders.length === 1 && this.declareWinner()
            } else if (valueObj.franchiseId === this.mostRecentBid().franchiseId && bidders.length === 1) {
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
            franchise.id === this.mostRecentBid().franchiseId))
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
            franchise_id: this.mostRecentBid().franchiseId,
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
            <div>
                <button onClick={this.startBidding}>Start Bidding</button>
                <button onClick={this.stopBidding}>Stop Bidding</button>
                {this.props.nominatedPlayer !== '' ? 
                    <Player
                    player={this.props.nominatedPlayer.player}
                    rPlayer={this.props.nominatedPlayer}
                    inNominationQueue={false}
                    /> :
                    `${this.props.nominatingFranchise.name} nominates next`
                }
                {yourFranchise && 
                    <BidOptions franchise={yourFranchise}/>
                    }
                <Bids/>
                <p>Current Bid is ${this.mostRecentBid().bidAmount}</p>
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
        currentDraft: state.nominationData.currentDraft
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFranchisePlayer: (playerObj) => dispatch({type: 'ADD_FRANCHISE_PLAYER', playerObj}),
        nominatePlayer: (rosterConfig, playerObj, franchises) => dispatch({type: 'NOMINATE_PLAYER', rosterConfig, rPlayer: playerObj, franchises: franchises}),
        updateNominatingFranchise: (index) => dispatch({type: 'UPDATE_NOMINATING_FRANCHISE', index})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft)