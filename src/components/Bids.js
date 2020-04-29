import React from 'react'
import { connect } from  'react-redux'

class Bids extends React.Component {
    
    state = {
        showDraftHistory: false
    }

    render(){
        return (
            <div>
                <h3 onClick={() => this.setState(prevState => ({showDraftHistory: !prevState.showDraftHistory}))}>
                    {this.state.showDraftHistory ? 
                    'Hide Draft History'
                    :
                    'Show Draft History'
                    }
                    </h3>
                {this.state.showDraftHistory &&
                    <ul>
                        {this.props.draftFranchisePlayers.map(player => (
                            <li key={player.id}>{player.franchise.name} has won {player.player.name} with a bid of ${player.salary}</li>
                        ))
                        }
                    </ul>
            }
                    {this.props.nominatingFranchise && 
                        <p>{this.props.nominatingFranchise.name} nominates next</p>
                    }
                <ul>
                    {this.props.bids.map((bidData, idx) => {
                        console.log(this.props.bids)
                        if (bidData.initialBid) {
                        return <li key={idx}>{bidData.franchise.name} has nominated {this.props.nominatedPlayer.player.name} for ${bidData.bidAmount}</li>
                        } else {
                            return <li key={idx}>{bidData.franchise.name} has bid ${bidData.bidAmount}</li>
                        }
                    }
                        )}
                </ul>
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