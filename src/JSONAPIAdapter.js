class JSONAPIAdapter {
    constructor(baseURL){
        this.baseURL = baseURL
        this.headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    async getAll(endpoint){
        const response = await fetch(`${this.baseURL}${endpoint}`)
        const result = response.json()
        return result
    }

}

export const fetchRankingPlayers = () => {
    console.log("fetching ranking players")
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    return (dispatch) => {
      dispatch({ type: 'START_POPULATING_PLAYERS_REQUEST'})
      adapter.getAll('ranking_players')
      .then(ranking_players => dispatch({
        type: 'POPULATE_RANKING_PLAYERS', ranking_players
      }))
    }
  }

export default JSONAPIAdapter