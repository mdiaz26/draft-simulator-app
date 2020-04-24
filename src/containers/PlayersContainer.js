import React from 'react'
import Player from '../components/Player'
import { connect } from 'react-redux'

const PlayersContainer = props => {
    const filterRankingPlayers = () => {
        const franchisePlayerIds = props.draftFranchisePlayers.map(fPlayer => fPlayer.player_id)
        const newArray = props.rankingPlayers.filter(rankingPlayer => !franchisePlayerIds.includes(rankingPlayer.player_id))
        return newArray
    }

    return(
        <div>
            <h2>Nomination Queue</h2>
            {/* {filterRankingPlayers()} */}
            {filterRankingPlayers().map(rPlayer => (
                <Player 
                    key={rPlayer.id} 
                    player={rPlayer.player}
                    rPlayer={rPlayer}
                    franchises={props.franchises}
                    nominatePlayer={props.nominatePlayer}
                    inNominationQueue={true}
                    activeDraft={props.activeDraft}
                />
            ))}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nominatePlayer: (rosterConfig, playerObj, franchises) => dispatch({type: 'NOMINATE_PLAYER', rosterConfig, rPlayer: playerObj, franchises: franchises})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayersContainer)