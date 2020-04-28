import React from 'react'
import '../styles/Player.css'
import { connect } from 'react-redux'

const newPlayerObj = (playerObj, actionType) => {
    switch (actionType) {
        case '+ value':
            return {
                ...playerObj,
                value: playerObj.value + 1
            }
        case '- value':
            if (playerObj.value === 0) {
                return playerObj
            }
            return {
                ...playerObj,
                value: playerObj.value - 1
            }
        case '+ tier':
            return {
                ...playerObj,
                tier: playerObj.tier + 1
            }
        case '- tier':
            if (playerObj.tier === 1) {
                return playerObj
            }
            return {
                ...playerObj,
                tier: playerObj.tier - 1
            }
        default:
            return playerObj
    }
}

const Player = props => {
    return(
        <div className="player-tile">
            <strong>{props.player.name}</strong> 
            ({props.player.pro_team} - {props.player.position})
            
            {props.inNominationQueue && 
                <React.Fragment>
                    <p>Value: ${props.rPlayer.value} Tier: {props.rPlayer.tier}</p>
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
                </React.Fragment>
            }
            {props.onEditPage && 
                <div className="ranking-options">
                        Value: ${props.rPlayer.value}
                        <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '+ value'))}>+</button>
                        <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '- value'))}>-</button>
                        Tier: {props.rPlayer.tier}
                        <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '+ tier'))}>+</button>
                        <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '- tier'))}>-</button>
                </div>
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
        resetBids: () => dispatch({type: 'RESET_BIDS'}),
        changeRankingInfo: (rPlayer) => dispatch({type: 'CHANGE_VALUE', rPlayer})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)