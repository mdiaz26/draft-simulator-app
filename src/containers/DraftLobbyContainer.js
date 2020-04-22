import React from 'react'
import { connect } from 'react-redux'
import PlayersContainer from './PlayersContainer'
import DraftContainer from './DraftContainer'
import SingleTeamContainer from './SingleTeamContainer'
import FranchisesContainer from './FranchisesContainer'
// import { startBidding } from '../draftLogic'

class DraftLobbyContainer extends React.Component {

    render(){
        return(
            <div>
                Draft Lobby
                <button>Start Draft</button>
                <button>Simulate Remainder</button>
                <DraftContainer nominatedPlayer={this.props.nominatedPlayer} franchises={this.props.franchises}/>
                <FranchisesContainer/>
                <SingleTeamContainer/>
                <PlayersContainer id="playersContainer" rankingPlayers={this.props.rankingPlayers}/>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises,
        nominatedPlayer: state.nominationData.nominatedPlayer,
        valuations: state.nominationData.valuations,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers
    }
}

export default connect(mapStateToProps)(DraftLobbyContainer)