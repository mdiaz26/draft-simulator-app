import React from 'react'
import { connect } from 'react-redux'
import Player from '../components/Player'
import SearchBar from '../components/SearchBar'
import { fetchRanking, saveRankingsPlayer } from  '../JSONAPIAdapter'

class Ranking extends React.Component {

    componentDidMount(){
        this.props.fetchRanking(this.props.match.params.id)
    }

    saveRankings = () => {
        this.props.editedRankingPlayers.map(rPlayer => (
            saveRankingsPlayer(rPlayer)
        ))
    }

    orderRankingPlayers = rankingPlayers => {
        return rankingPlayers.sort((playerA, playerB) => playerB.value - playerA.value)
    }

    render(){
        return (
            <div>
            {this.props.ranking !== '' ? 
                <div>
                    <button onClick={() => console.log(this.props)}>See Props</button>
                    <button onClick={this.saveRankings}>Save Rankings</button>
                    <h2>{this.props.ranking.name}</h2>
                    <SearchBar/>
                    {this.orderRankingPlayers(this.props.ranking.ranking_players).map(rPlayer =>
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
            editedRankingPlayers: state.rankingPlayersInfo.updatedPlayers
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            fetchRanking: (rankingId) => dispatch(fetchRanking(rankingId))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Ranking)