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

    componentWillUnmount(){
        clearInterval(this.state.biddingTrigger)
    }

    setStateToDefault = () => {
        this.setState({
            biddingTrigger: ""
        })
    }

    mostRecentBid = () => {
        if (this.props.bids.length > 0) {
            // return this.props.bids[this.props.bids.length - 1]
            return this.props.bids[0]
        } else {
            return {franchise: this.props.nominatingFranchise, bidAmount: 1}
        }
    }

    findYourFranchise = () => {
        const yourFranchise = this.props.draftFranchises.find(franchise => franchise.name === "Your Team")
        return yourFranchise
    }

    // remove the user from the valuations array so that they can bid for themselves
    removeUser = valuations => {
        let yourFranchise = this.findYourFranchise()
        return valuations.filter(valueObj => valueObj.franchiseId !== yourFranchise.id)
    }

    // shorten the valuations array to only teams that are willing to spend more than the most recent bid
    filterFranchisesByBid = () => {
        let yourFranchise = this.findYourFranchise()
            return this.props.valuations.filter(valueObj => {
                if (valueObj.valuation > this.mostRecentBid().bidAmount || valueObj.franchiseId === yourFranchise.id) {
                    return true
                }
                return false
            })
    }

    //check to see if the user wants to bid
    askForInput = () => {
        clearInterval(this.state.biddingTrigger)
        this.props.yourTurn()
        // setTimeout()
    }

    startBidding = () => {
        let interval
        this.props.userHasPassed ? interval = 200 : interval = 500
        const biddingTrigger = setInterval(() => this.teamBids(), interval)
        this.setState({biddingTrigger})
        const nominatorIndex = this.props.draftFranchises.findIndex(franchise => franchise.id === this.props.nominatingFranchise.id)
        this.setState({bidderIndex: nominatorIndex})
    }

    resumeBidding = (intervalAmout) => {
        clearInterval(this.state.biddingTrigger)
        const biddingTrigger = setInterval(() => this.teamBids(), intervalAmout)
        this.setState({biddingTrigger})
    }

    teamBids = () => {
        // This creates a new array each time it is run. The array will shrink as mostRecentBid().bidAmount increases.
        let bidders = this.filterFranchisesByBid()
        this.nextBidder()
        let valueObj = bidders[this.state.bidderIndex]
        let franchise = this.props.draftFranchises.find(franchise => franchise.id === valueObj.franchiseId)

        console.log("bidders:", bidders)
        if (franchise.id === this.findYourFranchise().id && !this.props.userHasPassed) {
            console.log("inside first conditional")
            // it's the user's turn to bid, if they haven't passed already
            // if the user is the only bidder left and they were the most recent bid, they win.
            // otherwise, they will be prompted to bid.
            // if they bid, the function will run again and declare them the winner.
            // if they pass, the function will run again
            bidders.length === 1 && this.mostRecentBid().franchise.id === this.findYourFranchise().id 
                ? 
                this.declareWinner() 
                : 
                this.askForInput()
            } else if (bidders.length === 1 && this.props.userHasPassed) {
                this.declareWinner()
            }

        else if (bidders.length > 1) {
            // the franchise will bid if their valuation is higher than the current bid
            if (
                valueObj.franchiseId !== this.mostRecentBid().franchise.id && 
                franchise.franchise_players.length < totalRosterSpots(this.props.currentDraft.roster_config) &&
                valueObj.valuation > this.mostRecentBid().bidAmount &&
                valueObj.franchiseId !== this.findYourFranchise().id
                ) {
                    this.props.updateBids({franchise, bidAmount: this.mostRecentBid().bidAmount + 1})
                    console.log("inside second conditional")
                    if (bidders.length === 2){
                        this.props.userHasPassed ? this.declareWinner() : this.askForInput()
                    } 

            } else if (valueObj.franchiseId === this.mostRecentBid().franchise.id && bidders.length === 2) {
                console.log("inside third conditional")
                this.props.userHasPassed ? this.declareWinner() : this.askForInput()
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
        const winningFranchise = this.props.draftFranchises.find(franchise => (
            franchise.id === this.mostRecentBid().franchise.id))
        this.props.updateBids({franchise: winningFranchise, bidAmount: this.mostRecentBid().bidAmount, winningBid: true})
        this.postFranchisePlayer()
        this.stopBidding()
        this.newNominator()
        this.setStateToDefault()
    }

    newNominator = () => {
        const nominatorIndex = this.props.draftFranchises.findIndex(franchise => franchise.is_nominating)
        // const increasedIndex = nominatorIndex + 1
        console.log('inside newNominator', nominatorIndex, this.eligibleFranchises())
        // debugger
        if (nominatorIndex >= this.eligibleFranchises().length - 1) {
            this.patchNominatingFranchise(this.props.nominatingFranchise, this.eligibleFranchises()[0])
        } else {
            this.patchNominatingFranchise(this.props.nominatingFranchise, this.eligibleFranchises()[nominatorIndex + 1])
        }
    }

    eligibleFranchises = () => {
        return this.props.draftFranchises.filter(franchise => franchise.franchise_players.length < totalRosterSpots(this.props.currentDraft.roster_config))
    }

    patchNominatingFranchise = async (origNom, newNom) => {
        // console.log("inside patch",origNom, newNom)
        const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
        await Promise.all([
            adapter.update('franchises', origNom.id, {is_nominating: false}),
            adapter.update('franchises', newNom.id, {is_nominating: true})
        ])
        this.props.updateNominatingFranchise(newNom)
    }

    // POST for FranchisePlayer
    postFranchisePlayer = () => {
        const body = {
            player_id: this.props.nominatedPlayer.player_id,
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
        return (
            <div className='draft-container'>
                {this.props.nominatedPlayer !== '' ? 
                    <div className='auction-information'>
                        <div className='nominated-player-locator'>
                            <Player
                            player={this.props.nominatedPlayer.player}
                            rPlayer={this.props.nominatedPlayer}
                            isNominated={true}
                            /> 
                            <div className='current-bid-locator'>
                                <h2>High Bid: ${this.mostRecentBid().bidAmount}</h2>
                            </div>
                        </div>
                        {this.props.yourTurnBoolean && <h3 className='bid-prompt'>YOUR TURN</h3>}
                        <div className='bid-buttons'>
                            <button className='start-bidding-btn' disabled={this.props.nominatedPlayer === ''} onClick={this.startBidding}>Go!</button>
                            <button className='stop-bidding-btn' onClick={this.stopBidding}>Pause</button>
                        </div>
                    </div>
                    :
                    <div className='auction-information'>
                        <h1 className='pending-message'>Nomination Pending</h1>
                    </div>
                }
                {this.findYourFranchise() && 
                    <div className='bid-options-locator'>
                        <BidOptions 
                            franchise={this.findYourFranchise()} 
                            mostRecentBid={this.mostRecentBid()}
                            resumeBidding={this.resumeBidding}/>
                    </div>
                }
                <div className='bids-history-locator'>
                    <Bids/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // franchises: state.franchises.franchises,
        draftFranchises: state.nominationData.draftFranchises,
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers,
        nominatedPlayer: state.nominationData.nominatedPlayer,
        nominatingFranchise: state.nominationData.nominatingFranchise,
        valuations: state.nominationData.valuations,
        bids: state.nominationData.bids,
        currentDraft: state.nominationData.currentDraft,
        yourTurnBoolean: state.nominationData.yourTurn,
        userHasPassed: state.nominationData.userHasPassed
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addFranchisePlayer: (playerObj) => dispatch({type: 'ADD_FRANCHISE_PLAYER', playerObj}),
        updateNominatingFranchise: (franchise) => dispatch({type: 'UPDATE_NOMINATING_FRANCHISE', franchise}),
        updateBids: bidData => dispatch({type: 'UPDATE_BIDS', bidData}),
        yourTurn: () => dispatch({type: 'YOUR_TURN'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Draft)