import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

const Container = styled.div`
    border: 1px solid black;
    border-radius: 2px;
    padding: 8px;
    margin-botton: 8px;
    background-color: white;
`

const Player = props => {
    return(
        <Draggable draggableId={props.player.id.toString()} index={props.index}>
            {provided => (
                <Container
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <strong>{props.player.name}</strong> 
                    ({props.player.nfl_team} - {props.player.position})
                    Value: ${props.player.value}
                    <button onClick={() => props.nominatePlayer(props.player, props.franchises)}>Nominate</button>
                </Container>
            )}
        </Draggable>
    )
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises
    }
}

export default connect(mapStateToProps)(Player)