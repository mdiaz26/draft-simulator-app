import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import JSONAPIAdapter from '../JSONAPIAdapter'

const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
const franchiseNames = [
    'Your Team',
    'Oakland', 
    'Great Kills', 
    'Virginia', 
    'Flushing', 
    'Yonkers', 
    'Capital Region',
    'New England',
    'Mars',
    'LIC'
]

class PreDraftScreen extends React.Component {

    state = {
        draftObj: {},
        redirect: ''
    }


    initiateDraft = () => {
            //create a new instance of Draft
            this.createNewDraft()
            //create ten new instances of Franchise
            .then(draftObj => {
                this.shuffleFranchises(franchiseNames).map((franchise, idx) => this.createFranchise(franchise, draftObj.id, idx))
                return draftObj
            })
            //redirect to that draft's page
            .then(draftObj => this.setState({redirect: `/draft/${draftObj.id}`}))
    }

    createNewDraft = () => {
        const body = {
            name: new Date(),
            roster_config_id: 1
        }
        return adapter.post('drafts', body)
        .then(draftObj => {
            this.props.addDraft(draftObj)
            this.setState({draftObj})
            return draftObj
        })
    }

    createFranchise = (franchiseName, draftId, idx) => {
        const body = {
            name: franchiseName,
            budget: 300,
            draft_id: draftId,
            draft_position: idx + 1,
            is_nominating: false
        }
        adapter.post('franchises', body)
        .then(franchiseObj => this.props.addFranchise(franchiseObj))
    }

    shuffleFranchises = (franchises) => {
        let n = franchises.length
        let t
        let i
        while (n) {
            i = Math.floor(Math.random() * n--)
            t = franchises[n]
            franchises[n] = franchises[i]
            franchises[i] = t
        }
        return franchises
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return(
            <div>
                Draft Settings
                <button onClick={this.initiateDraft}>Start Draft</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDraft: (draft) => dispatch({type: 'ADD_DRAFT', draft}),
        addFranchise: (franchise) => dispatch({type: 'ADD_FRANCHISE', franchise})
    }
}

export default connect(null, mapDispatchToProps)(PreDraftScreen)