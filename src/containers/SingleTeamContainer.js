import React from 'react'
import '../styles/FranchiseFocus.css'
import { connect } from 'react-redux'
import FranchisePlayer from '../components/FranchisePlayer'

class SingleTeamContainer extends React.Component {

    objectKeysToArray = () => {
        // create an array of just empty roster objects:
        const keys = Object.keys(this.props.currentDraft.roster_config)
        let rosterConfig = this.props.currentDraft.roster_config
        let i = 2
        let newArray = []
        // while (i < keys.length - 2) {
        while (i < keys.length - 2) {
            if (!rosterConfig[keys[i]] || rosterConfig[keys[i]] === 0) {
                i++
            } else if (rosterConfig[keys[i]] === 1) {
                newArray.push(this.keyToObject(keys[i], '', '', false))
                i++
            } else if (rosterConfig[keys[i]] > 1) {
                newArray.push(this.keyToObject(keys[i], '', '', false))
                rosterConfig[keys[i]] = rosterConfig[keys[i]] - 1
            }
        }
        console.log(newArray)
        return newArray
    }

    keyToObject = (key, playerName, playerSal, filled) => {
        const transformedKey = key.toUpperCase().replace(/_/, '/').replace('SUPERFLEX', 'S/F')
        return {rosterPosition: transformedKey, playerName, playerSal, filled}
    }

    populateRosterObject = franchisePlayers => {
        let rosterObj = this.objectKeysToArray()
        let rosterCopy = [...rosterObj]
        let playersIndex = 0
        let rosterIndex = 0
        // let rosterCheckpoint = 0
        
        while (playersIndex < franchisePlayers.length) {
            // if we're going to look at a slot that's already been filled, we'll
            // go back to the beginning for safety
            // if (rosterObj[rosterIndex].filled) {rosterIndex = rosterCheckpoint}
            if (rosterObj[rosterIndex].filled) {rosterIndex++}
            
            if (
                !rosterObj[rosterIndex].filled
                &&
                franchisePlayers[playersIndex].position === 'QB' 
                && 
                (rosterObj[rosterIndex] === 'QB' || rosterObj[rosterIndex] === 'S/F')
            ) {
                rosterObj[rosterIndex] = this.keyToObject(
                    rosterObj[rosterIndex].position,
                    franchisePlayers[playersIndex].player.name,
                    franchisePlayers[playersIndex].salary,
                    true
                )
                rosterIndex++
                // rosterCheckpoint++
            } else if (
                !rosterObj[rosterIndex].filled
                &&
                franchisePlayers[playersIndex].position === 'RB' 
                && 
                (rosterObj[rosterIndex] === 'RB' || rosterObj[rosterIndex] === 'RB/WR')
            ) {
                rosterObj[rosterIndex] = this.keyToObject(
                    rosterObj[rosterIndex].position,
                    franchisePlayers[playersIndex].player.name,
                    franchisePlayers[playersIndex].salary,
                    true
                )
                rosterIndex++
                // rosterCheckpoint++
            } else if (
                !rosterObj[rosterIndex].filled
                &&
                franchisePlayers[playersIndex].position === 'WR' 
                && 
                (rosterObj[rosterIndex] === 'WR' || rosterObj[rosterIndex] === 'RB/WR' || rosterObj[rosterCopy] === 'WR/TE')
            ) {
                rosterObj[rosterIndex] = this.keyToObject(
                    rosterObj[rosterIndex].position,
                    franchisePlayers[playersIndex].player.name,
                    franchisePlayers[playersIndex].salary,
                    true
                )
                rosterIndex++
                // rosterCheckpoint++
            } else if (
                !rosterObj[rosterIndex].filled
                &&
                franchisePlayers[playersIndex].position === 'TE' 
                && 
                (rosterObj[rosterIndex] === 'TE' || rosterObj[rosterCopy] === 'WR/TE')
            ) {
                rosterObj[rosterIndex] = this.keyToObject(
                    rosterObj[rosterIndex].position,
                    franchisePlayers[playersIndex].player.name,
                    franchisePlayers[playersIndex].salary,
                    true
                )
                rosterIndex++
                // rosterCheckpoint++
            } else if (
                !rosterObj[rosterIndex].filled
                &&
                franchisePlayers[playersIndex].position === 'DST' 
                && 
                rosterObj[rosterIndex] === 'DST'
            ) {
                rosterObj[rosterIndex] = this.keyToObject(
                    rosterObj[rosterIndex].position,
                    franchisePlayers[playersIndex].player.name,
                    franchisePlayers[playersIndex].salary,
                    true
                )
                rosterIndex++
                // rosterCheckpoint++
            } else if (
                !rosterObj[rosterIndex].filled
                &&
                franchisePlayers[playersIndex].position === 'K' 
                && 
                rosterObj[rosterIndex] === 'K'
            ) {
                rosterObj[rosterIndex] = this.keyToObject(
                    rosterObj[rosterIndex].position,
                    franchisePlayers[playersIndex].player.name,
                    franchisePlayers[playersIndex].salary,
                    true
                )
                rosterIndex++
                // rosterCheckpoint++
            } else {
                rosterObj[rosterIndex] = this.keyToObject(
                    rosterObj[rosterIndex].position,
                    franchisePlayers[playersIndex].player.name,
                    franchisePlayers[playersIndex].salary,
                    true
                )
                rosterIndex++
                // rosterCheckpoint++
            }
        playersIndex++
        rosterIndex = 0
        }
    }

    franchisePlayers = () => {
        return this.props.franchiseFocus.franchise_players
        // NEXT STEPS:
        // create an array of objects. It should look like this:
        // [{rosterPosition: 'QB', playerName: "", playerSal: ""}, {rosterPosition: 'RB', playerName: "David Johnson", playerSal: "65"}]
        // Iterate through the array. 
        // On each key, iterate through the array of players and see if any match the position (map within map)
        // if player.position === keys[index], return {keys[index]: player}


    }

    // rosterArray = () => {
    //     const keys = Object.keys(this.props.currentDraft.roster_config)
    //     const fPlayers = this.props.franchiseFocus.franchise_players
    //     fPlayers.map(player => )

    render() {
        return (
            <div className='single-team-container'>
                {this.props.franchiseFocus !== "" ? 
                    <React.Fragment>
                        <h2>{this.props.franchiseFocus.name}</h2>
                        <button onClick={this.objectKeysToArray}>test roster array</button>
                        <ol>
                            {this.props.franchiseFocus.franchise_players.map((fPlayer, idx) => (
                                <li key={idx}>
                                    <FranchisePlayer player={fPlayer.player} fPlayer={fPlayer}/>
                                </li>
                            ))}
                        </ol>
                    </React.Fragment>
                : 
                <div>loading...</div>}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        franchises: state.franchises.franchises,
        draftFranchises: state.nominationData.draftFranchises,
        franchiseFocus: state.nominationData.franchiseFocus,
        currentDraft: state.nominationData.currentDraft
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeFocus: franchise => dispatch({type: 'CHANGE_FOCUS', franchise})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTeamContainer)