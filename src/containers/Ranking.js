import React from 'react'
import { connect } from 'react-redux'
import Player from '../components/Player'
import SearchBar from '../components/SearchBar'
import { fetchRanking } from  '../JSONAPIAdapter'

class Ranking extends React.Component {

    componentDidMount(){
        this.props.fetchRanking(this.props.match.params.id)
    }

    saveRankings = () => {
        // PATCH request
        // body of the request is the current state of ranking
        // so when someone clicks the + or  - button, it changes the state. When they hit save, it sends the patch
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
                    {this.props.ranking.ranking_players.map(rPlayer =>
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
            ranking: state.rankingsInfo.currentRanking
        }
    }

    const mapDispatchToProps = dispatch => {
        return {
            fetchRanking: (rankingId) => dispatch(fetchRanking(rankingId))
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(Ranking)