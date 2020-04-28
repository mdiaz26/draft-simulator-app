import React from 'react'

const FranchisePlayer = props => {
    return (
        <div>
            {props.player.position} - {props.player.name} - ${props.fPlayer.salary}
        </div>
    )
}

export default FranchisePlayer