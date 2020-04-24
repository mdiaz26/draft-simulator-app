import React from 'react'
import { connect } from 'react-redux'

const Player = props => {
    return(
        <div>
            <strong>{props.player.name}</strong> 
            ({props.player.pro_team} - {props.player.position})
            Value: ${props.rPlayer.value}
            {props.inNominationQueue && 
                <button disabled={!props.activeDraft} onClick={() => 
                    props.nominatePlayer(
                        props.currentDraft.roster_config, 
                        props.rPlayer, 
                        props.franchises
                    )
                }>
                    Nominate
                </button>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentDraft: state.nominationData.currentDraft
    }
}

export default connect(mapStateToProps)(Player)