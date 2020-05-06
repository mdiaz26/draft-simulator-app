import React from 'react'
import { connect } from  'react-redux'

class Bids extends React.Component {
    
    state = {
        showHistory: 'bid'
    }

    render(){
        return (
            <div>
                <div className='history-options'>
                    <h3 onClick={() => this.setState({showHistory: 'draft'})}>
                        Draft History
                    </h3>
                    <h3 onClick={() => this.setState({showHistory: 'bid'})}>
                        Bid History
                    </h3>
                </div>
                {this.state.showHistory === 'draft' &&
                    <ul>
                        {this.props.draftFranchisePlayers.map(player => (
                            <li key={player.id}>{player.franchise.name} has won {player.player.name} with a bid of ${player.salary}</li>
                        ))
                        }
                    </ul>
                }
                {this.state.showHistory === 'bid' &&
                    <ul>
                        {this.props.bids.map((bidData, idx) => {
                            if (bidData.initialBid) {
                                return <li key={idx}>{bidData.franchise.name} has nominated {bidData.player.name} for ${bidData.bidAmount}</li>
                            } else if (bidData.winningBid) {
                                return <li key={idx}>{bidData.franchise.name} has won with a bid of ${bidData.bidAmount}</li>
                            } else {
                                return <li key={idx}>{bidData.franchise.name} has bid ${bidData.bidAmount}</li>
                            }
                        }
                            )}
                    </ul>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        bids: state.nominationData.bids,
        nominatingFranchise: state.nominationData.nominatingFranchise,
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers,
        nominatedPlayer: state.nominationData.nominatedPlayer
    }
}

export default connect(mapStateToProps)(Bids)