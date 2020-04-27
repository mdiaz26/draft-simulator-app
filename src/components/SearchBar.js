import React from 'react'
import { connect } from 'react-redux'

class SearchBar extends React.Component {

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
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        searchBar: state.rankingsInfo.searchBarValue
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSearchBar: event => dispatch({type: 'UPDATE_SEARCH_BAR', content: event.target.value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)