import React from 'react'
import '../styles/DraftLobby.css'
import { connect } from 'react-redux'
import PlayersContainer from './PlayersContainer'
import DraftContainer from './DraftContainer'
import SingleTeamContainer from './SingleTeamContainer'
import FranchisesContainer from './FranchisesContainer'
import { fetchDraft, fetchFranchisePlayers } from '../JSONAPIAdapter'
import JSONAPIAdapter from '../JSONAPIAdapter'
import { totalRosterSpots, calculateValuations, maxBid } from  '../draftLogic'

class DraftLobbyContainer extends React.Component {

    state = {
        activeDraft: false
    }

    componentDidMount(){
        this.props.fetchDraft(this.props.match.params.id)
        this.props.fetchFranchisePlayers(this.props.match.params.id)
        this.props.redirectTo('')
    }

    toggleActiveDraft = () => {
        this.setState(prevState => ({activeDraft: !prevState.activeDraft}))
    }

    startDraft = () => {
        this.toggleActiveDraft()
    }

    draftName = () => {
        const draft = this.props.currentDraft
        return draft ? draft.id : null
    }

    filterRankingPlayers = () => {
        const franchisePlayerIds = this.props.draftFranchisePlayers.map(fPlayer => fPlayer.player_id)
        let newArray = this.props.rankingPlayers.filter(rankingPlayer => !franchisePlayerIds.includes(rankingPlayer.player_id))

        return newArray.sort((playerA, playerB) => playerB.value - playerA.value)
    }

    simulateRemainder = async () => {
        console.log('simulating')
        const availablePlayers = this.filterRankingPlayers()
        const maxPlayersDrafted = totalRosterSpots(this.props.currentDraft.roster_config) * 10
        const ownedPlayers = this.props.draftFranchisePlayers.length
        let i = 0

        while (i < maxPlayersDrafted - ownedPlayers) {
            // nominate the next highest-valued player
            const nominatedPlayer = availablePlayers[i]
            // calculate each team's valuation
            const valuations = calculateValuations(
                this.props.currentDraft.roster_config, 
                this.props.draftFranchises,
                nominatedPlayer,
                this.props.rankingPlayers
            )
            // sort the teams in order of valuation
            let sortedByPlayerLength = valuations.sort(
                (valueObjA, valueObjB) => {
                    if (
                        valueObjB.franchise.franchise_players.length 
                        > 
                        valueObjA.franchise.franchise_players.length
                    ) {
                        return -1
                    }
                    else if (
                        valueObjB.franchise.franchise_players.length 
                        <
                        valueObjA.franchise.franchise_players.length
                    ) {
                        return 1
                    }
                    return 0
                })

            let sortedByBidAmount = sortedByPlayerLength.sort(
                (valueObjA, valueObjB) => {
                    if (valueObjB.valuation > valueObjA.valuation) {
                    return 1
                } 
                else if (valueObjA.valuation > valueObjB.valuation) {
                    return -1
                }
                return 0
            })

            console.log("sorted valuations",sortedByBidAmount)

            if (sortedByBidAmount[0].valuation <= 1) {
                let winningBid = sortedByBidAmount[0].valuation
                winningBid === 0 && winningBid++
                maxBid(this.props.currentDraft.roster_config, sortedByBidAmount[0].franchise) > 1 && winningBid++
                await this.postFranchisePlayer(nominatedPlayer, sortedByBidAmount[0], winningBid)
            } else {
                // create a franchise_player assigned to the team with the highest valuation with a salary of
                // the second-highest valuation + 1
                const winningBid = sortedByBidAmount[1].valuation + 1
                await this.postFranchisePlayer(nominatedPlayer, sortedByBidAmount[0], winningBid)
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
        return adapter.post('franchise_players', body)
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
                {this.props.currentDraft === '' ? 
                    <div>loading...</div>
                    :
                    <React.Fragment>
                        <h1 className="draft-title">Draft Lobby: Draft {this.draftName()}</h1>
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
    addFranchisePlayer: (playerObj) => dispatch({type: 'ADD_FRANCHISE_PLAYER', playerObj}),
    redirectTo: (endpoint => dispatch({type: 'REDIRECT', endpoint}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftLobbyContainer)