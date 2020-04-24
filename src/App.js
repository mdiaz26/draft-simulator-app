import React from 'react';
import { fetchRankingPlayers, fetchRankings, fetchFranchises, fetchDrafts } from './JSONAPIAdapter'
import DraftLobbyContainer from './containers/DraftLobbyContainer'
import PreDraftScreen from './containers/PreDraftScreen'
import RankingsContainer from './containers/RankingsContainer'
import DraftsContainer from './containers/DraftsContainer'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
import {Switch, Route} from 'react-router-dom'

class App extends React.Component {

  componentDidMount(){
    this.props.fetchDrafts()
    this.props.fetchFranchises()
    this.props.fetchRankingPlayers()
    this.props.fetchRankings()
  }

  render(){
    return (
      <div className="App">
          <Navbar/>
          <Switch>
            <Route path="/draft/:id" render={(routerProps) => 
                <DraftLobbyContainer
                  {...routerProps}
                />
              }/>
            <Route path="/draft" render={() => 
              <PreDraftScreen/>
            }/>
            <Route path="/rankings" render={() => 
              <RankingsContainer/>
            }/>
            <Route path="/drafts" render={() => 
              <DraftsContainer/>
            }/>
            <Route path="/" render={() => 
              <PreDraftScreen/>
            }/>
          </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    populatePlayers: () => dispatch({type: 'POPULATE_PLAYERS'}),
    updateQueue: (newQueue) => dispatch({type: 'UPDATE_QUEUE', payload: newQueue}),
    fetchFranchises: () => dispatch(fetchFranchises()),
    fetchRankingPlayers: () => dispatch(fetchRankingPlayers()),
    fetchRankings: () => dispatch(fetchRankings()),
    fetchDrafts: () => dispatch(fetchDrafts())
  }
}

export default connect(null, mapDispatchToProps)(App);
