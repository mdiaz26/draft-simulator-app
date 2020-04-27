import React from 'react'
import { connect } from 'react-redux'

class SearchBar extends React.Component {

    // uniqueFilter = (total, object, idx, array) => {
    //     if (idx === 0) {
    //         return total + 1
    //     }
    //     else if (object.tier !== array[idx - 1].tier) {
    //         return total + 1
    //     } else if (object.tier === array[idx -1].tier) {
    //         return total
    //     }
    // }

    // getFilterOptions = () => {
    //     const sortedRankings = this.props.rankingPlayers.sort((playerA, playerB) => playerA.tier - playerB.tier)
    //     const numberOfTiers = sortedRankings.reduce(this.uniqueFilter, 0)
    //     const tiersArray = Array.from(Array(numberOfTiers), (e, i) => i+ 1)
    //     const filterOptions = ['QB', 'RB', 'WR', 'TE', 'DEF', 'K'].concat(tiersArray)
    //     return filterOptions
    // }

    filterChoices = ['QB', 'RB', 'WR', 'TE', 'DST', 'K', 'Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6', 'Tier 7', 'Tier 8', 'Tier 9', 'Tier 10']

    handleCheckboxChange = event => {
        switch (event.target.name) {
            case "QB":
                return 'CHECK_QB'
            case "RB":
                return 'CHECK_RB'
            case "WR":
                return 'CHECK_WR'
            case "TE":
                return 'CHECK_TE'
            case "DST":
                return 'CHECK_DST'
            case "K":
                return 'CHECK_K'
            case "Tier 1":
                return 'CHECK_TIER_1'
            case "Tier 2":
                return 'CHECK_TIER_2'
            case "Tier 3":
                return 'CHECK_TIER_3'
            case "Tier 4":
                return 'CHECK_TIER_4'
            case "Tier 5":
                return 'CHECK_TIER_5'
            case "Tier 6":
                return 'CHECK_TIER_6'
            case "Tier 7":
                return 'CHECK_TIER_7'
            case "Tier 8":
                return 'CHECK_TIER_8'
            case "Tier 9":
                return 'CHECK_TIER_9'
            case "Tier 10":
                return 'CHECK_TIER_10'
            default:
                console.log('failure')
        }
    }

    render() {
        return (
            <div>
                <form>
                    <input 
                        type="text" 
                        value={this.props.searchBar} 
                        onChange={event => this.props.updateSearchBar(event)}
                        placeholder="search player"
                    />
                    {this.filterChoices.map((checkboxElement, idx) => (
                        <label key={idx}>{checkboxElement}
                            <input
                                name={checkboxElement}
                                type="checkbox"
                                checked={this.props.filterStatus[checkboxElement]}
                                onChange={event => this.props.updateFilterBoxes(this.handleCheckboxChange(event))}
                            />
                        </label>
                    ))}
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchBar: state.rankingsInfo.searchBarValue,
        rankingPlayers: state.rankingPlayersInfo.rankingPlayers,
        filterStatus: state.filterStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSearchBar: event => dispatch({type: 'UPDATE_SEARCH_BAR', content: event.target.value}),
        updateFilterBoxes: (type) => dispatch({type})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)