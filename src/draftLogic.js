export const calculateValuations = (rosterConfig, franchises, nominatedPlayer) => {
    let valuations = franchises.map(franchise => {
        return {franchiseId: 
            franchise.id, 
            valuation: bidLimiter(rosterConfig, franchise, randomFactor(nominatedPlayer))}
    })
    // WRITE LOGIC THAT PREVENTS A TEAM FROM BIDDING IF THE PRICE EXCEEDS THEIR MAX BID
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

const bidLimiter = (rosterConfig, franchise, valuation) => {
        const peak = maxBid(rosterConfig, franchise)
    if (peak < valuation) {
        return peak
    } else {
        return valuation
    }
}

export const maxBid = (rosterConfig, franchise) => {
    const budgetRemaining = calculateBudget(franchise.budget, franchise.franchise_players)
    const availableRosterSpots = totalRosterSpots(rosterConfig) - franchise.franchise_players.length
    return budgetRemaining - availableRosterSpots
}

export const calculateBudget = (startingBudget, playersArray) => {
    const sumFunction = (total, playerObj) => total + playerObj.salary
    const totalSalaries = playersArray.reduce(sumFunction, 0)
    return startingBudget - totalSalaries
}

const totalRosterSpots = rosterConfig => {
    return rosterConfig.qb +
    rosterConfig.rb +
    rosterConfig.wr +
    rosterConfig.te +
    rosterConfig.k +
    rosterConfig.def +
    rosterConfig.rb_wr +
    rosterConfig.wr_te +
    rosterConfig.superflex +
    rosterConfig.bench
}





// export const maxPositionSpots = position => {draft.rosterConfig[position]}

// const remainingPositionSpots = (position, playersAtPosition) => {
//     maxPositionSpots(position) - playersAtPosition.length
// }


// 	playersAtPosition = franchise.franchisePlayers.filter(fPlayer => fPlayer.player.position === nominatedPlayer.player.position)
// 	demandFactor = 1 - ( Math.sqrt(
// abs((1/maxPositionSpots - 1/remainingPositionSpots(nominatedPlayer.player.position, playersAtPosition))))
// highestBid = (nominatedPlayer.value + randomFactor) * demandFactor
// return {franchise.id: highestBid}
