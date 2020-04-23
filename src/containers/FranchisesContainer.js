import React from 'react'
import Franchise from '../components/Franchise'

class FranchisesContainer extends React.Component {
    render() {
        return (
            <div>
                A row of clickable franchises.
                {this.props.franchises.map(franchise => 
                    <Franchise key={franchise.id} franchise={franchise}/>)}
            </div>
        )
    }
}

export default FranchisesContainer