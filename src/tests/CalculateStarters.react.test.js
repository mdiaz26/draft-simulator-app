// import calculateStartingPositionSpots from '../CalculateStarters.react'

const calculateStartingPositionSpots = require('../CalculateStarters.react')
const rosterConfig = {qb: 1, rb: 2, wr: 2, superflex: 1}


test('Determines the correct number of starting spots', ()=> {
    expect(calculateStartingPositionSpots(rosterConfig, 'qb')).toBe(2)
})