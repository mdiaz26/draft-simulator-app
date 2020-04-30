import React from 'react'
import '../styles/DraftLobby.css'
import { connect } from 'react-redux'
import PlayersContainer from './PlayersContainer'
import DraftContainer from './DraftContainer'
import SingleTeamContainer from './SingleTeamContainer'
import FranchisesContainer from './FranchisesContainer'
import { fetchDraft, fetchFranchisePlayers } from '../JSONAPIAdapter'
import JSONAPIAdapter from '../JSONAPIAdapter'
import { totalRosterSpots, calculateValuations } from  '../draftLogic'

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

    filterRankingPlayers = () => {
        const franchisePlayerIds = this.props.draftFranchisePlayers.map(fPlayer => fPlayer.player_id)
        let newArray = this.props.rankingPlayers.filter(rankingPlayer => !franchisePlayerIds.includes(rankingPlayer.player_id))

        return newArray.sort((playerA, playerB) => playerB.value - playerA.value)
    }

    simulateRemainder = () => {
        console.log('simulating')
        const maxPlayersDrafted = totalRosterSpots(this.props.currentDraft.roster_config) * 10
        console.log('draftFranchisePlayers:', this.props.draftFranchisePlayers.length, maxPlayersDrafted)
        const availablePlayers = this.filterRankingPlayers()
        const ownedPlayers = this.props.draftFranchisePlayers.length
        let i = 0
        // while draft_franchise_players.length < maxRosterSpots * 10
        while (i <= maxPlayersDrafted - ownedPlayers) {
            // nominate the next highest-valued player
            const nominatedPlayer = availablePlayers[i]
            // calculate each team's valuation
            const valuations = calculateValuations(
                this.props.currentDraft.roster_config, 
                this.props.draftFranchises,
                nominatedPlayer,
                this.props.rankingPlayers
            )
            console.log(valuations)
            // find the teams with the two highest valuations
            let sortedValuations = valuations.sort((valueObjA, valueObjB) => valueObjB.valuation - valueObjA.valuation)
            sortedValuations.splice(2)
            console.log(sortedValuations)
            if (sortedValuations[0].valuation === sortedValuations[1].valuation) {
                // if two teams are tied, assign the player to the team with the lower ID
                // once the sim is over, put a message on the screen
                const winningBid = sortedValuations[1].valuation
                const winningFranchise = sortedValuations.sort((valA, valB) => valA.franchiseId - valB.franchiseId)[0]
                this.postFranchisePlayer(nominatedPlayer, winningFranchise, winningBid)
            } else {
                // create a franchise_player assigned to the team with the highest valuation with a salary of
                // the second-highest valuation + 1
                const winningBid = sortedValuations[1].valuation + 1
                this.postFranchisePlayer(nominatedPlayer, sortedValuations[0], winningBid)
            }
            i++
        }
    }

        // POST for FranchisePlayer
    postFranchisePlayer = (rPlayer, winningFranchise, salary) => {
        const body = {
            player_id: rPlayer.player_id,
            franchise_id: winningFranchise.franchiseId,
            salary
        }
        const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
        adapter.post('franchise_players', body)
        .then(this.props.addFranchisePlayer)
    }

    render(){
        return(
            <div className="draft-lobby">
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
                        <button className="simulate-button" onClick={this.simulateRemainder}>Simulate Remainder</button>
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
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers,
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
    addFranchisePlayer: (playerObj) => dispatch({type: 'ADD_FRANCHISE_PLAYER', playerObj})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftLobbyContainer)