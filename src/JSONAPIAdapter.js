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

    async getOne(endpoint, id){
      const response = await fetch(`${this.baseURL}${endpoint}/${id}`)
      const result = await response.json()
      return result
  }

  async post(endpoint, body){
      let response = await fetch(`${this.baseURL}${endpoint}`, {
          method: 'POST',
          headers: this.headers,
          body: JSON.stringify(body)
      })
      return response.json()
  }

  async update(endpoint, id, body){
      let response = await fetch(`${this.baseURL}${endpoint}/${id}`, {
          method: 'PATCH',
          headers: this.headers,
          body: JSON.stringify(body)
      })
      return response.json()
  }

  async delete(endpoint, id){
      let response = await fetch(`${this.baseURL}${endpoint}/${id}`, {
          method: 'DELETE',
          headers: this.headers
      })
      return response.json()
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

  export const fetchRankings = () => {
    console.log("fetching rankings")
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    return (dispatch) => {
      dispatch({ type: 'START_POPULATING_RANKINGS_REQUEST'})
      adapter.getAll('rankings')
      .then(rankings => dispatch({
        type: 'POPULATE_RANKINGS', rankings
      }))
    }
  }

  export const fetchDrafts = () => {
    console.log("fetching drafts")
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    return (dispatch) => {
      dispatch({ type: 'START_POPULATING_DRAFTS_REQUEST'})
      adapter.getAll('drafts')
      .then(drafts => dispatch({
        type: 'POPULATE_DRAFTS', drafts
      }))
    }
  }

  export const fetchFranchises = () => {
    console.log("fetching franchises")
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    return (dispatch) => {
      dispatch({ type: 'START_POPULATING_FRANCHISES_REQUEST'})
      adapter.getAll('franchises')
      .then(franchises => dispatch({
        type: 'POPULATE_FRANCHISES', franchises
      }))
    }
  }

export default JSONAPIAdapter