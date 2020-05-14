import { calculateStartingPositionSpots, franchiseNeedFactor } from '../draftLogic'

// const calculateStartingPositionSpots = require('../draftLogic')
const rosterConfig = {qb: 1, rb: 2, wr: 3, te: 1, rb_wr: 1, wr_te: 1, superflex: 1, flex: 0, dst: 1, k: 1}


test('Determines the correct number of QBs', ()=> {
    expect(calculateStartingPositionSpots(rosterConfig, 'qb')).toBe(2)
})

test('Determines the correct number of RBs', ()=> {
    expect(calculateStartingPositionSpots(rosterConfig, 'rb')).toBe(3)
})

test('Determines the correct number of WRs', ()=> {
    expect(calculateStartingPositionSpots(rosterConfig, 'wr')).toBe(5)
})

test('Determines the correct number of TEs', ()=> {
    expect(calculateStartingPositionSpots(rosterConfig, 'te')).toBe(2)
})

test('Determines the correct number of DSTs', ()=> {
    expect(calculateStartingPositionSpots(rosterConfig, 'def')).toBe(1)
})

// const franchiseNeedFactor = require('../draftLogic')
const franchise = {id: 1, name: 'Harlem', franchise_players: []}
const rPlayer = {id: 1, player_id: 1, ranking_id: 1, value: 74, tier: 1, player: {name: 'Ezekiel Elliott', position: 'RB'}}

test('An empty roster does not reduce valuation', ()=> {
    expect(rPlayer.value * franchiseNeedFactor(rosterConfig, franchise, rPlayer)).toBeGreaterThanOrEqual(59)
})