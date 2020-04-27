import React from 'react'
import { connect } from 'react-redux'
import Player from '../components/Player'
import SearchBar from '../components/SearchBar'
import { fetchRanking } from  '../JSONAPIAdapter'

class Ranking extends React.Component {

    componentDidMount(){
        this.props.fetchRanking(this.props.match.params.id)
    }

    render(){
        return (
            <div>
            {this.props.ranking !== '' ? 
                <div>
                    <button onClick={() => console.log(this.props)}>See Props</button>
                    <h2>{this.props.ranking.name}</h2>
                    <SearchBar/>
                    {this.props.ranking.ranking_players.map(rPlayer =>
                        <Player key={rPlayer.id} player={rPlayer.player} rPlayer={rPlayer} inNominationQueue={false}/>)}
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