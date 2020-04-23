import React from 'react'
import { connect } from 'react-redux'

class SingleTeamContainer extends React.Component {
    render() {
        return (
            <div>
                {this.props.franchiseFocus.name}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises.franchises,
        franchiseFocus: state.nominationData.franchiseFocus,
    }
}

export default connect(mapStateToProps)(SingleTeamContainer)