import React from 'react'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import JSONAPIAdapter from '../JSONAPIAdapter'

const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
const franchiseNames = [
    'Oakland', 
    'Great Kills', 
    'Virginia', 
    'Flushing', 
    'Yonkers', 
    'Capital Region',
    'New England',
    'Mars',
    'LIC',
    'Your Team'
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
                franchiseNames.map(franchise => this.createFranchise(franchise, draftObj.id))
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

    createFranchise = (franchiseName, draftId) => {
        const body = {
            name: franchiseName,
            budget: 300,
            draft_id: draftId
        }
        adapter.post('franchises', body)
        .then(franchiseObj => this.props.addFranchise(franchiseObj))
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect}/>
        }
        return(
            <div>
                {/* <button onClick={() => console.log(this.state)}>See State</button> */}
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