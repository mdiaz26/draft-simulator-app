import React from 'react'
import '../styles/DraftLobby.css'
import { connect } from 'react-redux'
import PlayersContainer from './PlayersContainer'
import DraftContainer from './DraftContainer'
import SingleTeamContainer from './SingleTeamContainer'
import FranchisesContainer from './FranchisesContainer'
import { fetchDraft, fetchFranchisePlayers } from '../JSONAPIAdapter'

class DraftLobbyContainer extends React.Component {

    state = {
        activeDraft: false
    }

    componentDidMount(){
        this.props.fetchDraft(this.props.match.params.id)
        this.props.fetchFranchisePlayers(this.props.match.params.id)
    }

    toggleActiveDraft = () => {
        this.setState(prevState => ({activeDraft: !prevState.activeDraft}))
    }

    startDraft = () => {
        //kick off logic that nominates a player and starts bidding
        this.props.populateDraftFranchises(this.draftFranchises())
        this.props.assignNominator(this.draftFranchises()[0])
        this.toggleActiveDraft()
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
        return(
            <div className="draft-lobby">
                {this.state.activeDraft ? 
                    <button className="control-button" onClick={() => this.toggleActiveDraft()}>Pause Draft</button>
                    :
                    <button className="control-button" onClick={this.startDraft}>Start/Resume Draft</button>
                }
                {this.props.currentDraft === '' ? 
                    <div>loading...</div>
                    :
                    <React.Fragment>
                        Draft Lobby: {this.draftName()}
                        <button className="control-button" >Simulate Remainder</button>
                        <div className='draft-container-locator'>
                        <DraftContainer 
                            nominatedPlayer={this.props.nominatedPlayer} 
                            draftId={this.props.match.params.id}
                            activeDraft={this.state.activeDraft}
                        />
                        </div>
                        <div className='franchises-container-locator'>
                            <FranchisesContainer draftId={this.props.match.params.id}/>
                        </div>
                        <div className='single-team-container-locator'>
                            <SingleTeamContainer/>
                        </div>
                        <div className='players-container-locator'>
                            <PlayersContainer
                                rankingPlayers={this.props.rankingPlayers} 
                                activeDraft={this.state.activeDraft}
                            />
                        </div>
                    </React.Fragment>
                }
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
    populateDraftFranchises: franchises => dispatch({type: 'POPULATE_DRAFT_FRANCHISES', franchises}),
    assignNominator: (franchise) => dispatch({type: 'ASSIGN_NOMINATOR', franchise})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftLobbyContainer)