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
        this.toggleActiveDraft()
    }

    draftName = () => {
        const draft = this.props.currentDraft
        return draft ? draft.name : null
    }

    render(){
        return(
            <div className="draft-lobby">
                {/* <div className="navbar-locator">
                    <Navbar/>
                </div> */}
                {this.state.activeDraft ? 
                    <button className="activate-button" onClick={() => this.toggleActiveDraft()}>Pause Draft</button>
                    :
                    <button className="activate-button" onClick={this.startDraft}>Start/Resume Draft</button>
                }
                {this.props.currentDraft === '' || this.props.draftFranchises.length < 9 ? 
                    <div>loading...</div>
                    :
                    <React.Fragment>
                        <h1 className="draft-title">Draft Lobby: {this.draftName()}</h1>
                        <button className="simulate-button" >Simulate Remainder</button>
                        <div className='draft-container-locator'>
                            <DraftContainer />
                        </div>
                        <div className='franchises-container-locator'>
                            <FranchisesContainer />
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
        draftFranchises: state.nominationData.draftFranchises,
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
    fetchFranchisePlayers: (draftId) => dispatch(fetchFranchisePlayers(draftId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftLobbyContainer)