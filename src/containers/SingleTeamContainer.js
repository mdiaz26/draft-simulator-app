import React from 'react'
import { connect } from 'react-redux'
import FranchisePlayer from '../components/FranchisePlayer'

class SingleTeamContainer extends React.Component {

    objectKeysToArray = () => {
        const keys = Object.keys(this.props.currentDraft.roster_config)
        return keys
    }

    franchisePlayers = () => {
        return this.props.franchiseFocus.franchise_players
        // NEXT STEPS:
        // create an array of objects. It should look like this:
        // [{QB: ""}, {RB: David Johnson}, {RB: ""}...]
        // Iterate through the array of keys. 
        // On each key, iterate through the array of players and see if any match the position (map within map)
        // if player.position === keys[index], return {keys[index]: player}
    }

    // rosterArray = () => {
    //     const keys = Object.keys(this.props.currentDraft.roster_config)
    //     const fPlayers = this.props.franchiseFocus.franchise_players
    //     fPlayers.map(player => )

    render() {
        return (
            <div>
                {this.props.franchiseFocus !== "" ? this.franchisePlayers().map((fPlayer, idx) => (
                    <FranchisePlayer key={idx} player={fPlayer.player} fPlayer={fPlayer}/>
                )) : 
                <div>loading...</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises.franchises,
        franchiseFocus: state.nominationData.franchiseFocus,
        currentDraft: state.nominationData.currentDraft
    }
}

export default connect(mapStateToProps)(SingleTeamContainer)