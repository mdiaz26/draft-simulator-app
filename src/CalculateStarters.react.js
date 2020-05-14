// import React from 'react'

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

module.exports = calculateStartingPositionSpots