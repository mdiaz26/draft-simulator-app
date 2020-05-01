import React from 'react'
import '../styles/FranchisesContainer.css'
import Franchise from '../components/Franchise'
import { calculateBudget, maxBid } from '../draftLogic'
import { connect } from 'react-redux'

class FranchisesContainer extends React.Component {

    render() {
        return (
            <div className='franchises-container'>
                {this.props.draftFranchises.map((franchise, idx) => 
                    <Franchise 
                        key={franchise.id} 
                        idx={idx}
                        franchise={franchise} 
                        budget={calculateBudget(franchise.budget, franchise.franchise_players)}
                        maxBid={maxBid(this.props.currentDraft.roster_config, franchise)}
                    />
                )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises.franchises,
        draftFranchises: state.nominationData.draftFranchises,
        currentDraft: state.nominationData.currentDraft,
        draftFranchisePlayers: state.nominationData.draftFranchisePlayers
    }
}

export default connect(mapStateToProps)(FranchisesContainer)