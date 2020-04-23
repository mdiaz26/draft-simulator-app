import React from 'react'
import { connect } from 'react-redux'
import PlayersContainer from './PlayersContainer'
import DraftContainer from './DraftContainer'
import SingleTeamContainer from './SingleTeamContainer'
import FranchisesContainer from './FranchisesContainer'
import JSONAPIAdapter from '../JSONAPIAdapter'
// import { startBidding } from '../draftLogic'

const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')


class DraftLobbyContainer extends React.Component {

    state = {
        activeDraft: false
    }

    toggleActiveDraft = () => {
        this.setState(prevState => ({activeDraft: !prevState.activeDraft}))
    }

    startDraft = () => {
        //kick off logic that nominates a player and starts bidding
    }

    shuffleFranchises = (franchises) => {
        let n = franchises.length
        let t
        let i
        while (n) {
            i = Math.floor(Math.random() * n--)
            t = franchises[n]
            franchises[n] = franchises[i]
            franchises[i] = t
        }
        return franchises
        // this.setState({franchises})
    }

    draftFranchises = () => {
        const draftId = this.props.match.params.id
        const franchises = this.props.franchises.filter(franchise => franchise.draft_id === parseInt(draftId))
        return franchises
    }

    render(){
        const draftFranchises = this.draftFranchises()
        return(
            <div>
                <button onClick={() => console.log(this.state)}>See State</button>
                <button onClick={() => console.log(this.props)}>See Props</button>
                Draft Lobby
                <button onClick={this.startDraft}>Draft!</button>
                <button onClick={this.toggleActiveDraft}>Toggle Active Draft</button>
                <button>Simulate Remainder</button>
                <DraftContainer 
                    nominatedPlayer={this.props.nominatedPlayer} 
                    franchises={draftFranchises}
                    activeDraft={this.state.activeDraft}
                />
                <FranchisesContainer franchises={draftFranchises}/>
                <SingleTeamContainer/>
                <PlayersContainer 
                    franchises={draftFranchises}
                    rankingPlayers={this.props.rankingPlayers} 
                    activeDraft={this.state.activeDraft}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises.franchises,
        nominatedPlayer: state.nominationData.nominatedPlayer,
        valuations: state.nominationData.valuations,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers,
        drafts: state.drafts.drafts
    }
}

export default connect(mapStateToProps)(DraftLobbyContainer)