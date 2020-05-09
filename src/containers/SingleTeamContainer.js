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
        while (i < keys.length - 2) {
            if (!rosterConfig[keys[i]] || rosterConfig[keys[i]] === 0 || keys[i] === 'bench') {
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
        // let rosterCopy = [...rosterObj]
        let playersIndex = 0
        let rosterIndex
        // let rosterCheckpoint = 0
        
        while (playersIndex < franchisePlayers.length) {
            rosterIndex = 0
            let stopper = playersIndex + 1
            // we'll try a double loop just to get it working.
            // loop through each player and for each player loop through the array until
            //there's an open spot that matches their position
            // if (rosterObj[rosterIndex].filled) {rosterIndex = rosterCheckpoint}
            if (rosterObj[rosterIndex].filled) {rosterIndex++}

            if (franchisePlayers[playersIndex].player.position === 'QB') {
                console.log(rosterObj, rosterIndex, rosterObj[rosterIndex])
                while (playersIndex < stopper) {
                    if (rosterIndex > rosterObj.length - 1) {
                        this.addToBench(rosterObj, franchisePlayers[playersIndex])
                        playersIndex++
                    } else if (!rosterObj[rosterIndex].filled &&
                        (rosterObj[rosterIndex].rosterPosition === 'QB' || rosterObj[rosterIndex].rosterPosition === 'S/F')) {
                            rosterObj[rosterIndex] = this.keyToObject(
                                rosterObj[rosterIndex].rosterPosition,
                                franchisePlayers[playersIndex].player.name,
                                franchisePlayers[playersIndex].salary,
                                true
                            )
                            playersIndex++
                    }
                    rosterIndex++
                }
            } else if (franchisePlayers[playersIndex].player.position === 'RB') {
                console.log(rosterObj, rosterIndex, rosterObj[rosterIndex])
                while (playersIndex < stopper) {
                    if (rosterIndex > rosterObj.length - 1) {
                        this.addToBench(rosterObj, franchisePlayers[playersIndex])
                        playersIndex++
                    } else if (!rosterObj[rosterIndex].filled &&
                        (rosterObj[rosterIndex].rosterPosition === 'RB' || rosterObj[rosterIndex].rosterPosition === 'RB/WR')){
                            rosterObj[rosterIndex] = this.keyToObject(
                                rosterObj[rosterIndex].rosterPosition,
                                franchisePlayers[playersIndex].player.name,
                                franchisePlayers[playersIndex].salary,
                                true
                            )
                            playersIndex++
                        }
                    rosterIndex++
                }
            } else if (franchisePlayers[playersIndex].player.position === 'WR') {  
                console.log(rosterObj, rosterIndex, rosterObj[rosterIndex])
                while (playersIndex < stopper) {
                    if (rosterIndex > rosterObj.length - 1) {
                        this.addToBench(rosterObj, franchisePlayers[playersIndex])
                        playersIndex++
                    } else if (!rosterObj[rosterIndex].filled &&
                        (rosterObj[rosterIndex].rosterPosition === 'WR' || rosterObj[rosterIndex].rosterPosition === 'RB/WR' || rosterObj[rosterIndex].rosterPosition === 'WR/TE')){
                        rosterObj[rosterIndex] = this.keyToObject(
                            rosterObj[rosterIndex].rosterPosition,
                            franchisePlayers[playersIndex].player.name,
                            franchisePlayers[playersIndex].salary,
                            true
                        )
                        playersIndex++
                    }
                    rosterIndex++
                }
            } else if (franchisePlayers[playersIndex].player.position === 'TE') {
                console.log(rosterObj, rosterIndex, rosterObj[rosterIndex])
                while (playersIndex < stopper) {
                    if (rosterIndex > rosterObj.length - 1) {
                        this.addToBench(rosterObj, franchisePlayers[playersIndex])
                        playersIndex++
                    } else if (!rosterObj[rosterIndex].filled &&
                        (rosterObj[rosterIndex].rosterPosition === 'TE' || rosterObj[rosterIndex].rosterPosition === 'WR/TE')){
                        rosterObj[rosterIndex] = this.keyToObject(
                            rosterObj[rosterIndex].rosterPosition,
                            franchisePlayers[playersIndex].player.name,
                            franchisePlayers[playersIndex].salary,
                            true
                        )
                    playersIndex++
                    }
                rosterIndex++
                }
            } else if (franchisePlayers[playersIndex].player.position === 'DST') {
                console.log(rosterObj, rosterIndex, rosterObj[rosterIndex])
                while (playersIndex < stopper) {
                    if (rosterIndex > rosterObj.length - 1) {
                        this.addToBench(rosterObj, franchisePlayers[playersIndex])
                        playersIndex++
                    } else if (!rosterObj[rosterIndex].filled && rosterObj[rosterIndex].rosterPosition === 'DEF') {
                        rosterObj[rosterIndex] = this.keyToObject(
                            rosterObj[rosterIndex].rosterPosition,
                            franchisePlayers[playersIndex].player.name,
                            franchisePlayers[playersIndex].salary,
                            true
                        )
                    playersIndex++
                    }
                rosterIndex++
                }
            } else if (franchisePlayers[playersIndex].player.position === 'K') {
                console.log(rosterObj, rosterIndex, rosterObj[rosterIndex])
                while (playersIndex < stopper) {
                    if (rosterIndex > rosterObj.length - 1) {
                        this.addToBench(rosterObj, franchisePlayers[playersIndex])
                        playersIndex++
                    } else if (!rosterObj[rosterIndex].filled && rosterObj[rosterIndex].rosterPosition === 'K') {
                        rosterObj[rosterIndex] = this.keyToObject(
                            rosterObj[rosterIndex].rosterPosition,
                            franchisePlayers[playersIndex].player.name,
                            franchisePlayers[playersIndex].salary,
                            true
                        )
                    playersIndex++
                    }
                rosterIndex++
                }
            } 
        }
        console.log(rosterObj)
        return rosterObj
    }

    addToBench = (rosterArray, player) => {
        let benchPlayerObj = this.keyToObject('BENCH', player.player.name, player.salary, true)
        rosterArray.push(benchPlayerObj)
    }


    render() {
        return (
            <div className='single-team-container'>
                {this.props.franchiseFocus !== "" ? 
                    <React.Fragment>
                        <h2>{this.props.franchiseFocus.name}</h2>
                        {/* <button onClick={() => this.populateRosterObject(this.props.franchiseFocus.franchise_players)}>test roster array</button> */}
                        <ol>
                            {this.populateRosterObject(this.props.franchiseFocus.franchise_players).map((rosterLine, idx) => (
                                <li key={idx}>
                                    <FranchisePlayer rosterLine={rosterLine}/>
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