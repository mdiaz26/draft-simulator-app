import React from 'react'
// import styled from 'styled-components'
// import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

// const Container = styled.div`
//     border: 1px solid black;
//     border-radius: 2px;
//     padding: 8px;
//     margin-botton: 8px;
//     background-color: white;
// `

const Player = props => {
    return(
        <div>
            <strong>{props.player.name}</strong> 
            ({props.player.pro_team} - {props.player.position})
            Value: ${props.rPlayer.value}
            <button onClick={() => props.nominatePlayer(props.rPlayer, props.franchises)}>Nominate</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises
    }
}

export default connect(mapStateToProps)(Player)