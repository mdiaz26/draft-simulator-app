import React from 'react'
import '../styles/FranchisesContainer.css'
import { connect } from 'react-redux'

const Franchise = props => {
    return (
        <div className={`franchise-${props.idx}`} onClick={() => props.franchiseFocus(props.franchise)}>
            <h3 >{props.franchise.name}</h3> 
            <p>Remaining Budget/Max Bid</p>
            <p>${props.budget}/${props.maxBid}</p>
        </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        franchiseFocus: franchise => dispatch({type: 'CHANGE_FOCUS', franchise})
    }
}

export default connect(null, mapDispatchToProps)(Franchise)