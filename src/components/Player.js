import React from 'react'
import { connect } from 'react-redux'



const Player = props => {
    return(
        <div>
            <strong>{props.player.name}</strong> 
            ({props.player.pro_team} - {props.player.position})
            Value: ${props.rPlayer.value}
            {props.inNominationQueue && 
                <button onClick={() => props.nominatePlayer(props.rPlayer, props.franchises)}>
                    Nominate
                </button>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises
    }
}

export default connect(mapStateToProps)(Player)