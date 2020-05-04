import React from 'react'
import '../styles/PreDraft.css'
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


    initiateDraft = async () => {
            //create a new instance of Draft
            let draftObj = await this.createNewDraft()
            //create ten new instances of Franchise
            let test = await this.shuffleFranchises(franchiseNames).map(async (franchise, idx) => {
                console.log('inside initiate draft, before redirecting', franchise)
                let newFranchise = await this.createFranchise(franchise, draftObj.id, idx)
                await this.props.addFranchise(newFranchise)
            })
            //redirect to that draft's page
            console.log('redirecting', test)
            this.setState({redirect: `/draft/${draftObj.id}`})
    }

    createNewDraft = async () => {
        const body = {
            name: new Date(),
            roster_config_id: 1
        }
        let draftObj = await adapter.post('drafts', body)
        this.props.addDraft(draftObj)
        this.setState({draftObj})
        return draftObj
    }

    createFranchise = async (franchiseName, draftId, idx) => {
        const body = {
            name: franchiseName,
            budget: 300,
            draft_id: draftId,
            draft_position: idx + 1,
            is_nominating: idx === 0 ? true : false
        }
        return adapter.post('franchises', body)
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
            <div className='pre-draft-container'>
                <h1>14 Million Futures</h1>
                <p>
                    As fantasy football evolves, it is becoming more difficult to mock draft.
                    Leagues have unique rules, rosters, keepers and players that make standard simulators
                    feel inadequate. These subtleties are magnified in an auction draft, where strategies diverge 
                    even futher from the norms. Today, 14 Million Futures is a tool that will allow a user to 
                    practice an auction draft with 9 automated opponents, or completely simulate a draft starting from 
                    any point. It is my hope that updates will allow for more customization including league size, roster 
                    configuration, budgets, keepers, and opponent tendencies.
                </p>
                <h3>Ready to start drafting?</h3>
                <button onClick={this.initiateDraft}>Let's do it!</button>
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