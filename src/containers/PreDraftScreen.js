import React from 'react'
import { connect } from 'react-redux'
import PlayersContainer from './PlayersContainer'
import DraftContainer from './DraftContainer'
import SingleTeamContainer from './SingleTeamContainer'
import FranchisesContainer from './FranchisesContainer'
import JSONAPIAdapter from '../JSONAPIAdapter'
// import { startBidding } from '../draftLogic'

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

var franchisesArray = []

class PreDraftScreen extends React.Component {

    state = {
        activeDraft: false,
        draftObj: {},
        franchises: [],
        redirect: ''
    }


    initiateDraft = () => {
        if (!this.state.draftObj.id) {
            //create a new instance of Draft
            this.createNewDraft()
            //redirect to that draft's page
            .then(draftObj => this.setState({redirect: `/draft/${draftObj.id}`}))
            //create ten new instances of Franchise
            // .then(draftObj => franchiseNames.map(franchise => this.createFranchise(franchise, draftObj.id)))

            // this.setState({activeDraft: true})
        }

        //kick off logic that nominates a player and starts bidding
    }

    createNewDraft = () => {
        const body = {
            name: Date.now(),
            roster_config_id: 1
        }
        return adapter.post('drafts', body)
        .then(draftObj => {
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
        .then(franchiseObj => franchisesArray.push(franchiseObj))
        .then(() => this.shuffleFranchises(franchisesArray))
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
        this.setState({franchises})
    }

    render(){
        return(
            <div>
                <button onClick={() => console.log(this.state)}>See State</button>
                Draft Lobby
                <button onClick={this.initiateDraft}>Start Draft</button>
                <button>Simulate Remainder</button>
                <DraftContainer 
                    nominatedPlayer={this.props.nominatedPlayer} 
                    franchises={this.state.franchises}
                    activeDraft={this.state.activeDraft}
                />
                <FranchisesContainer franchises={this.state.franchises}/>
                <SingleTeamContainer/>
                <PlayersContainer 
                    franchises={this.state.franchises}
                    rankingPlayers={this.props.rankingPlayers} 
                    activeDraft={this.state.activeDraft}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        // franchises: state.franchises.franchises,
        nominatedPlayer: state.nominationData.nominatedPlayer,
        valuations: state.nominationData.valuations,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers
    }
}

export default connect(mapStateToProps)(PreDraftScreen)