export const calculateValuations = (rosterConfig, franchises, nominatedPlayer, rankingPlayers) => {
    console.log('inside calculateValuations', nominatedPlayer)
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
    const reducerFunction = (total, playerObj) => total + 1/(rankingPlayers.find(player => player.player_id === playerObj.player_id).tier + 0.0001)
    const playersAtPosition = filterByPosition(franchise.franchise_players, rPlayer.player.position)
    // console.log('inside franchiseNeedFactor', playersAtPosition, rankingPlayers)
    const startersScore = (playersAtPosition.length > 0) ? playersAtPosition.reduce(reducerFunction, 0) : 0

    // starters score represents the number of players at a position and their relative tier.
    // if a franchise has the perfect ratio of players (full starting lineup all tier 1),
    // their score will be almost perfectly equal to the number of starting spots.
    // the lower the score, the more likely they are to bid on a player. If the score is higher,
    // it means they already have a very strong group of players at that position and are more likely
    // to spend elsewhere.
    
    const currentPositionGrade = startingSpots - startersScore + 1
    // console.log("starters score:", franchise.name, startersScore)
    const demandFactor = (1.1 - (1 / 1 + Math.pow(2.7, (-1 * currentPositionGrade - 1)))) * 10
    console.log("demand factor:", franchise.name, demandFactor)
    return demandFactor
}

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

