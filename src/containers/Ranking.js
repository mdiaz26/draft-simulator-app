import React from 'react'
import { connect } from 'react-redux'
import Player from '../components/Player'
import SearchBar from '../components/SearchBar'
import { fetchRankingPlayers, fetchRanking, saveRankingsPlayer } from  '../JSONAPIAdapter'

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
        return rankingPlayers.filter(rPlayer => rPlayer.player.name.toLowerCase().includes(this.props.searchBar.toLowerCase()))
    }

    render(){
        return (
            <div>
            {this.props.rankingPlayers !== [] && this.props.ranking !=='' ? 
                <div>
                    <button onClick={() => console.log(this.props)}>See Props</button>
                    <button onClick={this.saveRankings}>Save Rankings</button>
                    <h2>{this.props.ranking.name}</h2>
                    <SearchBar/>
                    {this.withFilters(this.props.rankingPlayers).map(rPlayer =>
                        <Player 
                            key={rPlayer.id} 
                            player={rPlayer.player} 
                            rPlayer={rPlayer} 
                            onEditPage={true}
                        />)}
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
            searchBar: state.rankingsInfo.searchBarValue
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