import React from 'react'
import Player from './Player'
import SearchBar from './SearchBar'

const Ranking = props => {
    return (
        <div>
            <h2>{props.ranking.name}</h2>
            <SearchBar/>
            {props.players.map(rPlayer =>
                <Player key={rPlayer.id} player={rPlayer.player} rPlayer={rPlayer} inNominationQueue={false}/>)}
        </div>
    )
}

export default Ranking