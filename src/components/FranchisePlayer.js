import React from 'react'

const FranchisePlayer = props => {
    return (
        <div>
            {props.rosterLine.rosterPosition} - {props.rosterLine.playerName} - ${props.rosterLine.playerSal}
        </div>
    )
}

export default FranchisePlayer