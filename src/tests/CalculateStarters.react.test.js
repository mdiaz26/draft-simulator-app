// import calculateStartingPositionSpots from '../CalculateStarters.react'

// const calculateStartingPositionSpots = require('../CalculateStarters.react')
const calculateStartingPositionSpots = require('../draftLogic')
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