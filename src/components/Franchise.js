import React from 'react'
import { connect } from 'react-redux'

const Franchise = props => {
    return (
        <li onClick={() => props.franchiseFocus(props.franchise)}>
            <span><strong>{props.franchise.name}</strong> 
            {/* Budget: ${props.budget} MaxBid: ${props.maxBid} id: {props.franchise.id} */}
            <p>${props.budget}/${props.maxBid}/id{props.franchise.id} </p>
            </span>
        </li>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        franchiseFocus: franchise => dispatch({type: 'CHANGE_FOCUS', franchise})
    }
}

export default connect(null, mapDispatchToProps)(Franchise)