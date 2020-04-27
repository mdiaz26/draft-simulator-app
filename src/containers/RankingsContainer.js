import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

class RankingsContainer extends React.Component {
    state = {
        redirect: ''
    }

    redirectToRanking = (event) => {
        this.setState({
            redirect: `/rankings/${event.target.id}`
        })
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return (
            <div>
                <h1>Rankings Container</h1>
                {this.props.rankings.map(ranking => (
                    <h3 key={ranking.id} id={ranking.id} onClick={this.redirectToRanking}>{ranking.name}</h3>
                ))}
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