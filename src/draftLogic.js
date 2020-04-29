export const calculateValuations = (rosterConfig, franchises, nominatedPlayer, rankingPlayers) => {
    let valuations = franchises.map(franchise => {
        return {franchiseId: 
            franchise.id, 
            valuation: Math.floor(
                bidLimiter(rosterConfig, franchise, 
                    randomFactor(nominatedPlayer) * franchiseNeedFactor(rosterConfig, franchise, nominatedPlayer, rankingPlayers)
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
const franchiseNeedFactor = (rosterConfig, franchise, rPlayer, rankingPlayers) => {
    const startingSpots = calculateStartingPositionSpots(rosterConfig, rosterConfig[rPlayer.player.position.toLowerCase()])
    // const franchisePlayersAtPosition = franchise.franchise_players.filter(fPlayer => fPlayer.player.position === rPlayer.player.position)
    // const remainingPositionSpots = maxPositionSpots - franchisePlayersAtPosition.length
    const reducerFunction = (total, playerObj) => total + 1/(rankingPlayers.find(player => player.id === playerObj.id).tier + 0.0001)
    const startersScore = filterByPosition(franchise.franchise_players, rPlayer.player.position).reduce(reducerFunction, 0)

    // current position grade ranges from 0 - 1. 0 occurs if they have no players at the position.
    // 1 occurs with the best possible outcome. Three tier 1 RBs, two tier 1 QBs, etc.
    // To calculate this, we'll count how many starters they have at the position and factor in their tier.
    // Subtract current score (num of players * 1/tier) from best score (number of starting spots)
    
    const currentPositionGrade = startingSpots - startersScore + 1
    console.log("starters score:", franchise.name, startersScore)
    // SIGMOID FUNCTION VERSION BELOW //
    const demandFactor = (1.1 - (1 / 1 + Math.pow(2.7, (-1 * currentPositionGrade - 1)))) * 10
    // const demandFactor = (1.1 - (1 / 1 + Math.pow(2.7, (-1 * remainingPositionSpots - 1)))) * 10
    console.log("demand factor:", franchise.name, demandFactor)
    return demandFactor
}

const calculateStartingPositionSpots = (rosterConfig, position) => {
    switch (position) {
        case 'qb':
            const startingQBs =  rosterConfig['qb'] + rosterConfig['superflex']
            return startingQBs
            // return startingQBs +  benchAllocation(rosterConfig, startingQBs)
        case 'rb':
            const startingRBs = rosterConfig['rb'] + rosterConfig['rb_wr']
            return startingRBs
        case 'wr':
            const startingWRs = rosterConfig['wr'] + rosterConfig['rb_wr'] + rosterConfig['wr_te']
            return startingWRs
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

const filterByPosition = (franchisePlayersArray, position) => {
    return franchisePlayersArray.filter(fPlayer => fPlayer.player.position === position)
}

// const benchAllocation = (rosterConfig, numOfStartersAtPosition) => {
//     const totalRosterSpots = this.totalRosterSpots(rosterConfig)
//     const startingSpots = totalRosterSpots - rosterConfig.bench
//     return Math.ceil(rosterConfig.bench * (numOfStartersAtPosition / startingSpots))
// }