import React from 'react'
import getMotivationByTime from '../utils/getMotivationByTime'
import motivations from '../utils/motivations.json'

export default function TodayMotivation() {
    const todayMotivation_ = getMotivationByTime(motivations[Math.floor(Math.random() * 7)], new Date())
    return (
        <div>
            <h1>{todayMotivation_}</h1>
        </div>
    )
}
