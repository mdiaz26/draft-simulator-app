import React from 'react'

const Player = props => {
    return(
        <div>
            <strong>{props.player.name}</strong> 
            ({props.player.pro_team} - {props.player.position})
            Value: ${props.rPlayer.value}
            {props.inNominationQueue && 
                <button disabled={!props.activeDraft} onClick={() => props.nominatePlayer(props.rPlayer, props.franchises)}>
                    Nominate
                </button>
            }
        </div>
    )
}

export default Player