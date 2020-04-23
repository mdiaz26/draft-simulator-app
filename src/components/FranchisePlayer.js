import React from 'react'

const FranchisePlayer = props => {
    return (
        <div>
            {props.position} - {props.player.name}
        </div>
    )
}

export default FranchisePlayer