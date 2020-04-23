import React from 'react'
import { connect } from 'react-redux'
import Ranking from '../components/Ranking'

class RankingsContainer extends React.Component {
    render(){
        return (
            <div>
                <h1>Rankings Container</h1>
                {this.props.rankings.map(ranking => 
                    <Ranking 
                        key={ranking.id} 
                        ranking={ranking}
                        players={this.props.rankingPlayers.filter(player => player.ranking_id === ranking.id)}/>)}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        rankings: state.rankingsInfo.rankings,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers
    }
}

export default connect(mapStateToProps)(RankingsContainer)