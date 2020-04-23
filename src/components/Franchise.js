import React from 'react'

const Franchise = props => {
    return (
        <div>
            Name: {props.franchise.name}
            id: {props.franchise.id}
            draft_id: {props.franchise.draft_id}
        </div>
    )
}

export default Franchise