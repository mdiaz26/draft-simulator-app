import React from 'react'
import { connect } from 'react-redux'

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
        franchiseFocus: franchise => dispatch({type: 'CHANGE_FOCUS', franchise})
    }
}

export default connect(null, mapDispatchToProps)(Franchise)