import React from 'react'
import { connect } from 'react-redux'

class Draft extends React.Component {
    
    state = {
        currentBid: 1,
        bidderIndex: 0,
        bidLeaderId: "",
        biddingTrigger: ""
    }

    setStateToDefault = () => {
        this.setState({
            currentBid: 1,
            bidderIndex: 0,
            bidLeaderId: "",
            biddingTrigger: ""
        })
    }

    // I think this belongs IN DRAFTCONTAINER
    filterFranchisesByBid = () => {
        return this.props.valuations.filter(valueObj => valueObj.valuation > this.state.currentBid)
    }

    // I think this belongs IN DRAFTCONTAINER
    startBidding = () => {
        console.log(this.props.valuations)
        const biddingTrigger = setInterval(() => this.teamBids(), 400)
        this.setState({biddingTrigger})
    }

    // I think this belongs in DRAFTLOGIC
    // But I can't move it because it's using methods that are in DRAFTCONTAINER and DRAFTCONTAINER'S state
    teamBids = () => {
        // This creates a new array each time it is run. The array will shrink as currentBid increases.
        let bidders = this.filterFranchisesByBid()
        // debugger
        if (bidders.length === 0) {
            // multiple teams are tied valuating the player at the current bid.
            // Whoever last bid is the winner
            this.declareWinner()
        } else if (bidders.length > 0) {
            let valueObj = bidders[this.state.bidderIndex]
            let franchise = this.props.franchises.find(franchise => franchise.id === valueObj.franchiseId)
            // the franchise will bid if their valuation is higher than the current bid
            if (valueObj.franchiseId !== this.state.bidLeaderId && valueObj.valuation > this.state.currentBid) {
                console.log(`${franchise.name} has bid $${this.state.currentBid + 1}`)
                this.setState(prevState => ({currentBid: prevState.currentBid + 1, bidLeaderId: franchise.id}))
                bidders.length === 1 && this.declareWinner()
            } else if (valueObj.franchiseId === this.state.bidLeaderId && bidders.length === 1) {
                this.declareWinner()
            }

        if (this.state.bidderIndex >= this.filterFranchisesByBid().length - 1) {
            // the pool of interested parties has shrunk and we can't increase the index
            this.setState({bidderIndex: 0})
        } else {
            this.setState(prevState => ({bidderIndex: prevState.bidderIndex + 1}))
        }
    }
}

        declareWinner = () => {
            const winningFranchise = this.props.franchises.find(franchise => (
                franchise.id === this.state.bidLeaderId))
            console.log(`${winningFranchise.name} has won with a bid of $${this.state.currentBid}`)
            this.stopBidding()
            this.setStateToDefault()
        }

        stopBidding = () => {
            clearInterval(this.state.biddingTrigger)
            this.setState({biddingTrigger: ""})
        }
    
    render() {
        return (
            <div>
                <button onClick={this.startBidding}>Start Bidding</button>
                <button onClick={this.stopBidding}>Stop Bidding</button>
                <p>Current Bid is ${this.state.currentBid}</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        valuations: state.nominationData.valuations
    }
}

export default connect(mapStateToProps)(Draft)