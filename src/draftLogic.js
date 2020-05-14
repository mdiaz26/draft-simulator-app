export const calculateValuations = (rosterConfig, franchises, nominatedPlayer, rankingPlayers) => {
    let valuations = franchises.map(franchise => {
        return {
            franchiseId: franchise.id,
            franchise: franchise,
            valuation: Math.floor(
                bidLimiter(rosterConfig, franchise, 
                    Math.ceil(randomFactor(nominatedPlayer) * 
                    // 1)
                    franchiseNeedFactor(rosterConfig, franchise, nominatedPlayer, rankingPlayers))
                )
            )
        }
    })
    return valuations
}

export const randomFactor = (nominatedPlayer) => {
    return nominatedPlayer.value + 
        Math.floor(Math.random() * 31) -15
        // + 
        // (Math.floor(Math.random() * 34)) +
        // (Math.floor(Math.random() * 34)) - 
        // 66 )/ 
        // 100 ) * 
        // nominatedPlayer.value
}
// export const randomFactor = (nominatedPlayer) => {
//     return nominatedPlayer.value + (
//         ((Math.floor(Math.random() * 34)) + 
//         (Math.floor(Math.random() * 34)) +
//         (Math.floor(Math.random() * 34)) - 
//         66 )/ 
//         100 ) * 
//         nominatedPlayer.value
// }

const bidLimiter = (rosterConfig, franchise, valuation) => {
    const peak = maxBid(rosterConfig, franchise)
    const adjustedValue = adjustedVal(rosterConfig, valuation, franchise)
    if (franchise.franchise_players.length >= totalRosterSpots(rosterConfig)) {
        console.log("franchise players:", franchise.name, franchise.franchise_players)
        return 0
    } else if (peak < adjustedValue) {
        return peak
    } else {
        return adjustedValue
    }
}

const adjustedVal = (rosterConfig, valuation, franchise) => {
    const percentageOfRemainingBudget = valuation / maxBid(rosterConfig, franchise)
    if (valuation < 1) {
        return 1
    }else if (percentageOfRemainingBudget > 0.35) {
        return valuation * (1 - (percentageOfRemainingBudget - 0.15))
    }
    return valuation
}

export const maxBid = (rosterConfig, franchise) => {
    const budgetRemaining = calculateBudget(franchise.budget, franchise.franchise_players)
    const availableRosterSpots = totalRosterSpots(rosterConfig) - franchise.franchise_players.length
    return budgetRemaining - (availableRosterSpots - 1)
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
export const franchiseNeedFactor = (rosterConfig, franchise, rPlayer, rankingPlayers) => {
    const startingSpots = calculateStartingPositionSpots(rosterConfig, rosterConfig[rPlayer.player.position.toLowerCase()])
    const playersAtPosition = filterByPosition(franchise.franchise_players, rPlayer.player.position)
    const reducerFunction = (total, playerObj) => total + 1/(rankingPlayers.find(player => player.player_id === playerObj.player_id).tier)
    const startersScore = (playersAtPosition.length > 0) ? playersAtPosition.reduce(reducerFunction, 0) : 0

    // starters score represents the number of players at a position and their relative tier.
    // if a franchise has the perfect ratio of players (full starting lineup all tier 1),
    // their score will be almost perfectly equal to the number of starting spots.
    // the lower the score, the more likely they are to bid on a player. If the score is higher,
    // it means they already have a very strong group of players at that position and are more likely
    // to spend elsewhere.
    
    const currentPositionGrade = startingSpots - startersScore + 1

    // const demandFactor = (1.1 - (1 /( 1 + Math.pow(2.7, (-1 * currentPositionGrade - 1))))) * 10
    const demandFactor = (1 /( 1 + Math.pow(2.7, (-1 * currentPositionGrade + 1))))
    return demandFactor
}

////////TIER SCARCITY??
// I'm thinking if their value is more than $10 more than the next best available player at their position,
// increase all valuations by 15%.
// Last year

const calculateStartingPositionSpots = (rosterConfig, position) => {
    switch (position) {
        case 'qb':
            const startingQBs =  rosterConfig['qb'] + rosterConfig['superflex']
            return startingQBs
        case 'rb':
            const startingRBs = rosterConfig['rb'] + rosterConfig['rb_wr']
            return startingRBs
        case 'wr':
            const startingWRs = rosterConfig['wr'] + rosterConfig['rb_wr'] + rosterConfig['wr_te']
            return startingWRs
        case 'te':
            const startingTEs = rosterConfig['te'] + rosterConfig['wr_te'] + rosterConfig['flex']
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

export default calculateStartingPositionSpots