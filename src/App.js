import React from 'react';
import { fetchRankingPlayers } from './JSONAPIAdapter'
import PlayersContainer from './containers/PlayersContainer'
import DraftLobby from './containers/DraftLobby'
import { connect } from 'react-redux'
// import { DragDropContext } from 'react-beautiful-dnd'

class App extends React.Component {

  componentDidMount(){
    this.props.populatePlayers()
    this.props.populateFranchises()
    
    this.props.fetchRankingPlayers()
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
        My football app
          <PlayersContainer id="playersContainer" players={this.props.players} rankingPlayers={this.props.rankingPlayers}/>
          <DraftLobby/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      players: state.players,
      rankingPlayers: state.rankingPlayersInfo.rankingPlayers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    populatePlayers: () => dispatch({type: 'POPULATE_PLAYERS'}),
    populateFranchises: () => dispatch({type: 'POPULATE_FRANCHISES'}),
    updateQueue: (newQueue) => dispatch({type: 'UPDATE_QUEUE', payload: newQueue}),
    fetchRankingPlayers: () => dispatch(fetchRankingPlayers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
