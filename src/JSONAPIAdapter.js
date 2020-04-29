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

export const fetchRankingPlayers = (rankingId) => {
  console.log("fetching ranking players")
  return (dispatch) => {
    dispatch({ type: 'START_POPULATING_PLAYERS_REQUEST'})
    fetch(`http://localhost:3000/api/v1/rankings/${rankingId}/ranking_players`)
    .then(response => response.json())
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

  export const fetchRanking = (rankingId) => {
    console.log("fetching ranking")
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    return (dispatch) => {
      dispatch({ type: 'START_FETCHING_RANKING_REQUEST'})
      adapter.getOne('rankings', rankingId)
      .then(ranking => dispatch({
        type: 'FETCH_RANKING', ranking
      }))
    }
  }

  export const saveRankingsPlayer = (rPlayer) => {
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    adapter.update('ranking_players', rPlayer.id, rPlayer)
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

  export const fetchFranchise = (franchiseId) => {
    console.log("fetching franchise")
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    return (dispatch) => {
      dispatch({type: 'START_POPULATING_FRANCHISES_REQUEST'})
      adapter.getOne('franchises', franchiseId)
      .then(franchise => dispatch({
        type: 'CHANGE_FOCUS', franchise
      }))
    }
  }

  export const fetchDraft = (draftId) => {
    console.log("fetching draft")
    const adapter = new JSONAPIAdapter('http://localhost:3000/api/v1/')
    return (dispatch) => {
      dispatch({ type: 'START_POPULATING_DRAFT_REQUEST'})
      adapter.getOne('drafts', draftId)
      .then(draft => dispatch({
        type: 'ASSIGN_DRAFT', draft
      }))
    }
  }

  export const fetchFranchisePlayers = (draftId) => {
    console.log("fetching players")
    return (dispatch) => {
      dispatch({ type: 'START_POPULATING_DRAFT_FRANCHISE_PLAYERS'})
      fetch(`http://localhost:3000/api/v1/drafts/${draftId}/franchise_players`)
      .then(response => response.json())
      .then(players => dispatch({
        type: 'POPULATE_DRAFT_FRANCHISE_PLAYERS', players
      }))
    }
  }

export default JSONAPIAdapter