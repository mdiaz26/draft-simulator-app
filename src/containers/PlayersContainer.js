import React from 'react'
import Player from '../components/Player'
import { connect } from 'react-redux'

const PlayersContainer = props => {
    
    return(
        <div>
            <h2>Nomination Queue</h2>
            {props.rankingPlayers.map(rPlayer => (
                <Player 
                    key={rPlayer.id} 
                    player={rPlayer.player}
                    rPlayer={rPlayer} 
                    nominatePlayer={props.nominatePlayer}
                    inNominationQueue={true}
                />
            ))}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        nominatePlayer: (playerObj, franchises) => dispatch({type: 'NOMINATE_PLAYER', rPlayer: playerObj, franchises: franchises})
    }
}

export default connect(null, mapDispatchToProps)(PlayersContainer)