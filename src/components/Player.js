import React from 'react'
import '../styles/Player.css'
import '../styles/Ranking.css'
import { connect } from 'react-redux'

const filterFranchises = (franchises) => {
    return franchises.filter(franchise => franchise.franchise_players.length < 19)
}

const Player = props => {
    return(
        <React.Fragment>
            <div className="player-tile">
                {props.isNominated &&
                <div className='nominated-player'>
                    <h2>{props.player.name}</h2> 
                    <h2>{props.player.pro_team} - {props.player.position}</h2>
                    <h3>Your valuation: ${props.rPlayer.value}</h3>
                </div>
                }
                
                {props.inNominationQueue && 
                    <div className='queued-player'>
                        <strong>{props.player.name}</strong> 
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
                            <div>
                                ({props.player.pro_team} - {props.player.position})
                                <span>Value: ${props.rPlayer.value} Tier: {props.rPlayer.tier}</span>
                            </div>
                    </div>
                }
            </div>
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