import React from 'react'
import { connect } from 'react-redux'
import { fetchFranchise } from '../JSONAPIAdapter'

const Franchise = props => {
    return (
        <li onClick={() => props.franchiseFocus(props.franchise)}>
            <span><strong>{props.franchise.name}</strong> Budget: ${props.budget} MaxBid: ${props.maxBid} id: {props.franchise.id}
            </span>
        </li>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        franchiseFocus: franchise => dispatch(fetchFranchise(franchise.id))
    }
}

export default connect(null, mapDispatchToProps)(Franchise)