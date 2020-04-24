import React from 'react'
import Franchise from '../components/Franchise'
import { calculateBudget, maxBid } from '../draftLogic'
import { connect } from 'react-redux'

class FranchisesContainer extends React.Component {
    
    draftFranchises = () => {
        const franchises = this.props.franchises.filter(franchise => franchise.draft_id === parseInt(this.props.draftId))
        return franchises
    }

    render() {
        return (
            <div>
                <h3>Nomination Order</h3>
                    <ol>
                        {console.log("draft franchises:",this.draftFranchises())}
                        {console.log(this.props.draftFranchisePlayers)}
                        {this.draftFranchises().map(franchise => 
                            <Franchise 
                                key={franchise.id} 
                                franchise={franchise} 
                                budget={calculateBudget(franchise.budget, franchise.franchise_players)}
                                maxBid={maxBid(this.props.currentDraft.roster_config, franchise)}
                            />)}
                    </ol>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises.franchises,
        currentDraft: state.nominationData.currentDraft,
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers
    }
}

export default connect(mapStateToProps)(FranchisesContainer)