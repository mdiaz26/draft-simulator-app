import React from 'react'
import '../styles/PreDraft.css'
import { Redirect } from "react-router-dom"
import { connect } from 'react-redux'
import JSONAPIAdapter from '../JSONAPIAdapter'

const adapter = new JSONAPIAdapter('https://draft-simulator-api.herokuapp.com/api/v1/')
const neutralOpponents = [
    {id: 0, name: 'User', team_name: 'Your Team', penalties: 0, strategy: 5},
    {id: 0, name: 'Jack', team_name: 'Team 1', penalties: 0, strategy: 5},
    {id: 0, name: 'Angie', team_name: 'Team 2', penalties: 0, strategy: 5},
    {id: 0, name: 'Carlos', team_name: 'Team 3', penalties: 0, strategy: 5},
    {id: 0, name: 'Manuela', team_name: 'Team 4', penalties: 0, strategy: 5},
    {id: 0, name: 'Jamaal', team_name: 'Team 5', penalties: 0, strategy: 5},
    {id: 0, name: 'Lilly', team_name: 'Team 6', penalties: 0, strategy: 5},
    {id: 0, name: 'Franz', team_name: 'Team 7', penalties: 0, strategy: 5},
    {id: 0, name: 'Christine', team_name: 'Team 8', penalties: 0, strategy: 5},
    {id: 0, name: 'Jin', team_name: 'Team 9', penalties: 0, strategy: 5},
    {id: 0, name: 'Francesca', team_name: 'Team 10', penalties: 0, strategy: 5},
    {id: 0, name: 'Lauren', team_name: 'Team 11', penalties: 0, strategy: 5},
]

class PreDraftScreen extends React.Component {

    state = {
        draftObj: {},
        draftSettings: false,
        budget: 300,
        numberOfTeams: 10,
        opponents: neutralOpponents,
    }


    initiateDraft = async () => {
            //create a new instance of Draft
            let draftObj = await this.createNewDraft()
            //use custom route to create ten new instances of Franchise

            const body = this.shuffleFranchises(this.state.opponents).map((opponentInfo, idx) => {
                return {
                        name: opponentInfo.team_name,
                        budget: this.state.budget - opponentInfo.penalties,
                        opponent_id: opponentInfo.id,
                        draft_id: draftObj.id,
                        draft_position: idx + 1,
                        is_nominating: idx === 0 ? true : false
                }
            })
            //redirect to that draft's page
            const franchises = await this.createFranchises(body)
            this.props.addFranchises(franchises)
            this.props.redirectTo(`/draft/${draftObj.id}`)

            // OR just loop through all the franchises and make one call to DB for each
            // let test = await this.shuffleFranchises(franchiseNames).map(async (franchise, idx) => {
            //     console.log('inside initiate draft, before redirecting', franchise)
            //     let newFranchise = await this.createFranchise(franchise, draftObj.id, idx)
            //     await this.props.addFranchise(newFranchise)
            // })
            // //redirect to that draft's page
            // console.log('redirecting', test)
            // this.props.redirectTo(`/draft/${draftObj.id}`)

    }

    createNewDraft = async () => {
        const body = {
            name: new Date().toLocaleDateString("en-US"),
            roster_config_id: 1
        }
        let draftObj = await adapter.post('drafts', body)
        this.props.addDraft(draftObj)
        this.setState({draftObj})
        return draftObj
    }

    // createFranchise = async (franchiseName, draftId, idx) => {
    //     const body = {
    //         name: franchiseName,
    //         budget: 300,
    //         draft_id: draftId,
    //         draft_position: idx + 1,
    //         is_nominating: idx === 0 ? true : false
    //     }
    //     return adapter.post('franchises', body)
    // }

    createFranchises = async (body) => {
        let response = await fetch('https://draft-simulator-api.herokuapp.com/api/v1/draft_franchises', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({franchises: body})
        })
        console.log(body)
        return response.json()
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

    handleSubmit = () => {
        this.setState()
    }

    handleChange = (event) => {
        this.setState({})
    }

    render(){
        if (this.props.redirect) {
            return <Redirect to={this.props.redirect}/>
        }
        let teams = this.state.opponents.slice(0, this.state.numberOfTeams - 1)
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
                <button onClick={() => this.setState({draftSettings: !this.state.draftSettings})}>Edit Draft Settings</button>
                {this.state.draftSettings && 
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Starting Budget: 
                            <input type="text" value={this.state.startingBudget} onChange={this.handleChange}></input>
                        </label>
                        <label>
                            Number of Teams:
                            <select 
                                className='drop-down' 
                                value={this.state.numberOfTeams} 
                                onChange={event => this.setState({numberOfTeams: event.target.value})}
                            >
                                <option value='8'>8</option>
                                <option value='10'>10</option>
                                <option value='12'>12</option>
                            </select>
                        </label>
                        {teams.map(team => (
                            <div>{team.name}</div>
                            // <select
                            //     className='drop-down'
                            //     value={team.name}
                            // >

                            // </select>
                        ))}
                        /* Generate drop downs equal to number of teams selected */
                        <input type="submit" value="Submit" />
                    </form>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        redirect: state.redirect
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addDraft: (draft) => dispatch({type: 'ADD_DRAFT', draft}),
        // addFranchise: (franchise) => dispatch({type: 'ADD_FRANCHISE', franchise}),
        addFranchises: (franchises) => dispatch({type: 'ADD_FRANCHISES', franchises}),
        redirectTo: (endpoint => dispatch({type: 'REDIRECT', endpoint}))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreDraftScreen)