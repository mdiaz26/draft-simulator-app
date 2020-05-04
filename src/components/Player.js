import React from 'react'
import '../styles/Player.css'
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

const filterFranchises = (franchises) => {
    return franchises.filter(franchise => franchise.franchise_players.length < 19)
}

const Player = props => {
    return(
        <React.Fragment>
            <div className="player-tile">
                {props.isNominated &&
                <React.Fragment>
                    <h2>{props.player.name}</h2> 
                    <h2>{props.player.pro_team} - {props.player.position}</h2> 
                </React.Fragment>
                }
                
                {props.inNominationQueue && 
                    <React.Fragment>
                        <strong>{props.player.name}</strong> 
                        ({props.player.pro_team} - {props.player.position})
                        <span>Value: ${props.rPlayer.value} Tier: {props.rPlayer.tier}</span>
                        <button disabled={!props.activeDraft} onClick={() => {
                            props.nominatePlayer(
                                props.currentDraft.roster_config, 
                                props.rPlayer, 
                                filterFranchises(props.franchises),
                                props.rankingPlayers
                            )
                        }}>
                            Nominate
                        </button>
                    </React.Fragment>
                }
            </div>
                {props.onEditPage && 
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
                        <td className='value-buttons'>
                            {props.rPlayer.tier}
                            <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '+ tier'))}>+</button>
                            <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '- tier'))}>-</button>
                        </td>
                        <td className='tier-buttons'>
                            ${props.rPlayer.value}
                            <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '+ value'))}>+</button>
                            <button className="ranking-btn" onClick={() => props.changeRankingInfo(newPlayerObj(props.rPlayer, '- value'))}>-</button>
                        </td>
                    </tr>
            }
        </React.Fragment>
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