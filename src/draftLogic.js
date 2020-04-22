// export const maxPositionSpots = position => {draft.rosterConfig[position]}

// const remainingPositionSpots = (position, playersAtPosition) => {
//     maxPositionSpots(position) - playersAtPosition.length
// }

export const calculateValuations = (franchises, nominatedPlayer) => {
    let valuations = franchises.map(franchise => {
        return {franchiseId: franchise.id, valuation: randomFactor(nominatedPlayer)}
    })
    return valuations
    // this.setState({valuations: valuations}, () => console.log(this.state))
}

export const randomFactor = (nominatedPlayer) => {
    return Math.ceil(nominatedPlayer.value + (
        ((Math.floor(Math.random() * 34)) + 
        (Math.floor(Math.random() * 34)) - 
        34 )/ 
        100 ) * 
        nominatedPlayer.value)
}  


// const valuations = franchises.map(franchise => {
// 	randomFactor =  ( ((Math.floor(Math.random() * 21)) + (Math.floor(Math.random() * 21)) -20 )/ 100 ) * nominatedPlayer.value  // see Speaker Notes 1
// 	playersAtPosition = franchise.franchisePlayers.filter(fPlayer => fPlayer.player.position === nominatedPlayer.player.position)
// 	demandFactor = 1 - ( Math.sqrt(
// abs((1/maxPositionSpots - 1/remainingPositionSpots(nominatedPlayer.player.position, playersAtPosition))))
// highestBid = (nominatedPlayer.value + randomFactor) * demandFactor
// return {franchise.id: highestBid}
