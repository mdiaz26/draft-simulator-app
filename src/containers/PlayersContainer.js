import React from 'react'
import Player from '../components/Player'
import { connect } from 'react-redux'
// import styled from 'styled-components'
// import { Droppable } from 'react-beautiful-dnd'

// const Container = styled.div`
//     margin: 8px;
//     border: 1px solid black;
//     border-radius: 2px;
// `
// const Title = styled.h3`
// padding: 8px
// `
// const Queue = styled.div`
// padding: 8px
// `

const PlayersContainer = props => {
    return(
        <div>
            <h2>Nomination Queue</h2>
            {console.log(props)}
            {props.rankingPlayers.map(rPlayer => (
                <Player 
                    key={rPlayer.id} 
                    player={rPlayer.player}
                    rPlayer={rPlayer} 
                    nominatePlayer={props.nominatePlayer}
                />
            ))}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        nominatePlayer: (playerObj, franchises) => dispatch({type: 'NOMINATE_PLAYER', rPlayer: playerObj, franchises: franchises})
    }
}

export default connect(null, mapDispatchToProps)(PlayersContainer)