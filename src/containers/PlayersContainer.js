import React from 'react'
import Player from '../components/Player'
import { connect } from 'react-redux'

const PlayersContainer = props => {
    const filterRankingPlayers = () => {
        const franchisePlayerIds = props.franchisePlayers.map(fPlayer => fPlayer.playerid)
        const newArray = props.rankingPlayers.filter(rankingPlayer => !franchisePlayerIds.includes(rankingPlayer.player.id))
        return newArray
    }

    return(
        <div>
            <h2>Nomination Queue</h2>
            {/* {filterRankingPlayers().map(rPlayer => (
                <Player 
                    key={rPlayer.id} 
                    player={rPlayer.player}
                    rPlayer={rPlayer}
                    franchises={props.franchises}
                    nominatePlayer={props.nominatePlayer}
                    inNominationQueue={true}
                    activeDraft={props.activeDraft}
                />
            ))} */}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        nominatePlayer: (playerObj, franchises) => dispatch({type: 'NOMINATE_PLAYER', rPlayer: playerObj, franchises: franchises})
    }
}

export default connect(null, mapDispatchToProps)(PlayersContainer)