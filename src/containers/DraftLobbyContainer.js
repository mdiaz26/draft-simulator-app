import React from 'react'
import { connect } from 'react-redux'
import PlayersContainer from './PlayersContainer'
import DraftContainer from './DraftContainer'
import SingleTeamContainer from './SingleTeamContainer'
import FranchisesContainer from './FranchisesContainer'
import { fetchDraft, fetchFranchisePlayers } from '../JSONAPIAdapter'
// import { startBidding } from '../draftLogic'

class DraftLobbyContainer extends React.Component {

    state = {
        activeDraft: false
    }

    componentDidMount(){
        this.props.fetchDraft(this.props.match.params.id)
        this.props.fetchFranchisePlayers(this.props.match.params.id)
        this.props.populateDraftFranchises(this.draftFranchises())
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

    draftName = () => {
        const draft = this.props.currentDraft
        return draft ? draft.name : null
    }

    render(){
        const draftFranchises = this.draftFranchises()
        return(
            <div>
                Draft Lobby: {this.draftName()}
                <button onClick={this.startDraft}>Draft!</button>
                <button onClick={this.toggleActiveDraft}>Toggle Active Draft</button>
                <button>Simulate Remainder</button>
                <DraftContainer 
                    nominatedPlayer={this.props.nominatedPlayer} 
                    franchises={draftFranchises}
                    activeDraft={this.state.activeDraft}
                />
                <FranchisesContainer draftId={this.props.match.params.id}/>
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
        franchiseFocus: state.nominationData.franchiseFocus,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers,
        currentDraft: state.nominationData.currentDraft
    }
}

const mapDispatchToProps = dispatch => {
    return {
    populatePlayers: () => dispatch({type: 'POPULATE_PLAYERS'}),
    fetchDraft: (draftId) => dispatch(fetchDraft(draftId)),
    fetchFranchisePlayers: (draftId) => dispatch(fetchFranchisePlayers(draftId)),
    populateDraftFranchises: franchises => dispatch({type: 'POPULATE_DRAFT_FRANCHISES', franchises})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftLobbyContainer)