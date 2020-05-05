import React from 'react'
import '../styles/PlayersContainer.css'
import Player from '../components/Player'
import { connect } from 'react-redux'
import SearchBar from '../components/SearchBar'

const PlayersContainer = props => {

    const filterRankingPlayers = () => {
        const franchisePlayerIds = props.draftFranchisePlayers.map(fPlayer => fPlayer.player_id)
        let newArray = props.rankingPlayers.filter(rankingPlayer => !franchisePlayerIds.includes(rankingPlayer.player_id))

        return newArray.sort((playerA, playerB) => playerB.value - playerA.value)
    }

    const withFilters = rankingPlayers => {
        let filteredByPosition = rankingPlayers.filter(rPlayer => props.checkboxes[rPlayer.player.position])
        let filteredByTier = [...filteredByPosition].filter(rPlayer => props.checkboxes[`Tier ${rPlayer.tier}`])
        let filteredByAll = [...filteredByTier].filter(rPlayer => rPlayer.player.name.toLowerCase().includes(props.searchBar.toLowerCase()))
        return filteredByAll
    }

    return(
        <div className="players-container">
            <h2>Nomination Queue</h2>
            <div className='search-bar-locator'>
                <SearchBar/>
            </div>
            <div className='ranking-players-locator'>
                {withFilters(filterRankingPlayers()).map(rPlayer => (
                    <Player 
                        key={rPlayer.id} 
                        player={rPlayer.player}
                        rPlayer={rPlayer}
                        inNominationQueue={true}
                        activeDraft={props.activeDraft}
                    />
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers,
        searchBar: state.rankingsInfo.searchBarValue,
        checkboxes: state.filterStatus
    }
}

export default connect(mapStateToProps)(PlayersContainer)