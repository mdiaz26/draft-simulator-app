import React from 'react'

const BidOptions = props => {
    return (
        <div>
            Budget Remaining: {props.budget}
            Max Bid: {props.budget - props.openRosterSpots}
            <button>Bid</button>
            <button>Pass</button>
        </div>
    )
}

export default BidOptions