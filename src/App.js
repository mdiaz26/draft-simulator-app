import React from 'react';
import { fetchRankingPlayers, fetchRankings, fetchFranchises, fetchDrafts } from './JSONAPIAdapter'
import DraftLobbyContainer from './containers/DraftLobbyContainer'
import PreDraftScreen from './containers/PreDraftScreen'
import RankingsContainer from './containers/RankingsContainer'
import DraftsContainer from './containers/DraftsContainer'
import Navbar from './components/Navbar'
import { connect } from 'react-redux'
import {Switch, Route} from 'react-router-dom'
// import { DragDropContext } from 'react-beautiful-dnd'

class App extends React.Component {

  componentDidMount(){
    // this.props.populatePlayers()
    
    this.props.fetchDrafts()
    this.props.fetchFranchises()
    this.props.fetchRankingPlayers()
    this.props.fetchRankings()
  }



  // onDragEnd = result => {
  //   const { destination, source, draggableId } = result

  //   if (!destination) {
  //     return
  //   }

  //   if (
  //     destination.droppableId === source.droppableId &&
  //     destination.index === source.index
  //   ) {
  //     return
  //   }

  //   const queue = this.props.players
  //   // identify the player to add him back later
  //   const droppedPlayer = queue.find(player => player.id.toString() === draggableId)
  //   // create a new array that has been re-ordered
  //   const filteredQueue = queue.filter(player => player.id.toString() !== draggableId)
  //   filteredQueue.splice(destination.index, 0, droppedPlayer)
  //   // run the reducer with our new queue as an argument to set state
  //   this.props.updateQueue(filteredQueue)
  // }

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
