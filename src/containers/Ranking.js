import React from 'react'
import '../styles/Ranking.css'
import { connect } from 'react-redux'
import RankingPlayer from '../components/RankingPlayer'
import SearchBar from '../components/SearchBar'
import { fetchRankingPlayers, fetchRanking, saveRankingsPlayer } from  '../JSONAPIAdapter'
// import 'bootstrap/dist/css/bootstrap.css'
// import Table from 'react-bootstrap/Table'

class Ranking extends React.Component {

    componentDidMount(){
        this.props.fetchRankingPlayers(this.props.match.params.id)
        this.props.fetchRanking(this.props.match.params.id)
    }

    saveRankings = () => {
        this.props.editedRankingPlayers.map(rPlayer => (
            saveRankingsPlayer(rPlayer)
        ))
        this.props.orderRankingPlayers()
    }

    orderRankingPlayers = rankingPlayers => {
        return rankingPlayers.sort((playerA, playerB) => playerB.value - playerA.value)
    }

    withFilters = rankingPlayers => {
        let filteredByPosition = rankingPlayers.filter(rPlayer => this.props.checkboxes[rPlayer.player.position])
        let filteredByTier = [...filteredByPosition].filter(rPlayer => this.props.checkboxes[`Tier ${rPlayer.tier}`])
        let filteredByAll = [...filteredByTier].filter(rPlayer => rPlayer.player.name.toLowerCase().includes(this.props.searchBar.toLowerCase()))
        return filteredByAll
    }

    render(){
        return (
            <div>
            {this.props.rankingPlayers !== [] && this.props.ranking !=='' ? 
                <div className='rankings-display'>
                    <h1>{this.props.ranking.name}</h1>
                    <button className='save-button' onClick={this.saveRankings}>Save Rankings</button>
                    <SearchBar/>
                    <table className='ranking-page-players-container'>
                        <thead>
                            <tr className='rankings-header'>
                                <th>Player</th>
                                <th>Position</th>
                                <th>Team</th>
                                <th>Ranking</th>
                                <th>Tier</th>
                                <th>Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.withFilters(this.props.rankingPlayers).map((rPlayer, idx) =>
                                <RankingPlayer 
                                    key={rPlayer.id}
                                    player={rPlayer.player} 
                                    rPlayer={rPlayer} 
                                    index={idx}
                                    onEditPage={true}
                                />
                            )}
                        </tbody>
                    </table>
                </div>
                :
                <div>loading...</div>
            }
            </div>
        )
    }
}

    const mapStateToProps = state => {
        return {
            ranking: state.rankingsInfo.currentRanking,
            rankingPlayers: state.rankingPlayersInfo.rankingPlayers,
            editedRankingPlayers: state.rankingPlayersInfo.updatedPlayers,
            searchBar: state.rankingsInfo.searchBarValue,
            checkboxes: state.filterStatus
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            fetchRankingPlayers: (rankingId) => dispatch(fetchRankingPlayers(rankingId)),
            fetchRanking: (rankingId) => dispatch(fetchRanking(rankingId)),
            orderRankingPlayers: () => dispatch({type: 'ORDER_RANKING_PLAYERS'})
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Ranking)