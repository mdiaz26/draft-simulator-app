import React from 'react'
import { connect } from 'react-redux'
import { fetchFranchise } from '../JSONAPIAdapter'

const Franchise = props => {
    return (
        <div onClick={() => props.franchiseFocus(props.franchise)}>
            Name: {props.franchise.name}
            id: {props.franchise.id}
            draft_id: {props.franchise.draft_id}
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        franchiseFocus: franchise => dispatch(fetchFranchise(franchise.id))
    }
}

export default connect(null, mapDispatchToProps)(Franchise)