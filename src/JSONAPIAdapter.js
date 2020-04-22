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

export default JSONAPIAdapter