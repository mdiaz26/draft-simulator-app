import React from 'react'
import Franchise from '../components/Franchise'

class FranchisesContainer extends React.Component {
    
    calculateBudget = (startingBudget, playersArray) => {
        const sumFunction = (total, playerObj) => total + playerObj.salary
        const totalSalaries = playersArray.reduce(sumFunction, 0)
        return startingBudget - totalSalaries
    }
    
    render() {
        return (
            <div>
                <h3>Nomination Order</h3>
                    <ol>
                        {this.props.franchises.map(franchise => 
                            <Franchise 
                                key={franchise.id} 
                                franchise={franchise} 
                                budget={this.calculateBudget(franchise.budget, franchise.franchise_players)}
                            />)}
                    </ol>
            </div>
        )
    }
}

export default FranchisesContainer