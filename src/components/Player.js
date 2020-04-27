import React from 'react'
import { connect } from 'react-redux'

const Player = props => {
    return(
        <div>
            <strong>{props.player.name}</strong> 
            ({props.player.pro_team} - {props.player.position})
            Value: ${props.rPlayer.value}
            {props.inNominationQueue && 
                <button disabled={!props.activeDraft} onClick={() => {
                    props.nominatePlayer(
                        props.currentDraft.roster_config, 
                        props.rPlayer, 
                        props.franchises
                    )
                    props.resetBids()
                }}>
                    Nominate
                </button>
            }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        currentDraft: state.nominationData.currentDraft,
        franchises: state.nominationData.draftFranchises,
        valuations: state.nominationData.valuations
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nominatePlayer: (rosterConfig, playerObj, franchises) => dispatch({type: 'NOMINATE_PLAYER', rosterConfig, rPlayer: playerObj, franchises: franchises}),
        resetBids: () => dispatch({type: 'RESET_BIDS'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)