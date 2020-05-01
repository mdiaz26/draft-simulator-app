import React from 'react'
import '../styles/FranchisesContainer.css'
import { connect } from 'react-redux'

const Franchise = props => {
    return (
        <div className={`franchise-${props.idx}`} onClick={() => props.franchiseFocus(props.franchise)}>
            <h3 >{props.franchise.name}</h3> 
            {props.maxBidView ? <p>${props.maxBid}</p> : <p>${props.budget}</p>}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        maxBidView: state.nominationData.maxBidView
    }
}

const mapDispatchToProps = dispatch => {
    return {
        franchiseFocus: franchise => dispatch({type: 'CHANGE_FOCUS', franchise})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Franchise)