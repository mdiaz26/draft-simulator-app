export const calculateValuations = (rosterConfig, franchises, nominatedPlayer) => {
    let valuations = franchises.map(franchise => {
        return {franchiseId: 
            franchise.id, 
            valuation: Math.floor(
                bidLimiter(rosterConfig, franchise, 
                    randomFactor(nominatedPlayer) * franchiseNeedFactor(rosterConfig, franchise, nominatedPlayer)
                )
            )
        }
    })
    return valuations
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
    console.log("franchise:",franchise.name, "max bid:", peak)
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
    console.log("inside draft logic:",playersArray)
    const totalSalaries = playersArray.reduce(sumFunction, 0)
    return startingBudget - totalSalaries
}

export const totalRosterSpots = rosterConfig => {
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

// This function takes into account the players a franchise already has on their roster
const franchiseNeedFactor = (rosterConfig, franchise, rPlayer) => {
    const maxPositionSpots = calculateMaxPositionSpots(rosterConfig, rosterConfig[rPlayer.player.position.toLowerCase()])
    const franchisePlayersAtPosition = franchise.franchise_players.filter(fPlayer => fPlayer.player.position === rPlayer.player.position)
    const remainingPositionSpots = maxPositionSpots - franchisePlayersAtPosition.length
    
    // NORMAL PARABOLA VERSION BELOW //
    // const demandFactor = ((-0.2 * Math.pow(remainingPositionSpots, 2)) + 2 * remainingPositionSpots)/5
    
    // SIGMOID FUNCTION VERSION BELOW //
    const demandFactor = (1.1 - (1 / 1 + Math.pow(2.7, (-1 * remainingPositionSpots - 1)))) * 10
    console.log("demand factor:", demandFactor)
    return demandFactor
}

const calculateMaxPositionSpots = (rosterConfig, position) => {
    switch (position) {
        case 'qb':
            const startingQBs =  rosterConfig['qb'] + rosterConfig['superflex']
            return startingQBs +  benchAllocation(rosterConfig, startingQBs)
        case 'rb':
            const startingRBs = rosterConfig['rb'] + rosterConfig['rb_wr']
            return startingRBs + benchAllocation(rosterConfig, startingRBs)
        case 'wr':
            const startingWRs = rosterConfig['wr'] + rosterConfig['rb_wr'] + rosterConfig['wr_te']
            return startingWRs + benchAllocation(rosterConfig, startingWRs)
        case 'te':
            const startingTEs = rosterConfig['te'] + rosterConfig['wr_te']
            return startingTEs
        case 'def':
            return 1
        case 'k':
            return 1
        default:
            return 4
    }
}

const benchAllocation = (rosterConfig, numOfStartersAtPosition) => {
    const totalRosterSpots = this.totalRosterSpots(rosterConfig)
    const startingSpots = totalRosterSpots - rosterConfig.bench
    return Math.ceil(rosterConfig.bench * (numOfStartersAtPosition / startingSpots))
}