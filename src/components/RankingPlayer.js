import React from 'react'
import '../styles/Ranking.css'
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
        <tr className='ranking-players-container'>
            <td className='player-info'>
                {props.player.name}
            </td>
            <td>
                {props.player.position}
            </td>
            <td>
                {props.player.pro_team}
            </td>
            <td>
                {props.index + 1}
            </td>
            <td>
                {props.rPlayer.tier}
                <span className='tier-buttons'>
                    <button className="ranking-btn increase" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '+ tier'))}><div className= 'arrow up'></div></button>
                    <button className="ranking-btn decrease" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '- tier'))}><div className= 'arrow down'></div></button>
                </span>
            </td>
            <td>
                ${props.rPlayer.value}
                <span className='value-buttons'>
                    <button className="ranking-btn increase" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '+ value'))}><div className= 'arrow up'></div></button>
                    <button className="ranking-btn decrease" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '- value'))}><div className= 'arrow down'></div></button>
                </span>
            </td>
        </tr>
    )
}

const mapStateToProps = state => {
    return {
        currentDraft: state.nominationData.currentDraft,
        franchises: state.nominationData.draftFranchises,
        valuations: state.nominationData.valuations,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers
    }
}

const mapDispatchToProps = dispatch => {
    return {
        nominatePlayer: (rosterConfig, playerObj, franchises, rankingPlayers) => dispatch({type: 'NOMINATE_PLAYER', rosterConfig, rPlayer: playerObj, franchises: franchises, rankingPlayers: rankingPlayers}),
        resetBids: () => dispatch({type: 'RESET_BIDS'}),
        changeRankingInfo: (rPlayer) => dispatch({type: 'CHANGE_VALUE', rPlayer})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Player)