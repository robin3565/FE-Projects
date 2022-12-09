import React, { useContext } from 'react'
import styled from 'styled-components'
import { stateContext } from '../utils/stateContext'
import motivations from '../utils/motivations.json'
import { getEngVer } from '../utils/functions'

export default function Motivation() {
    const { ver , num } = useContext(stateContext)
    const [todayMotivation_, todayName_] = getEngVer(motivations, ver, num)

    return (
        <MotivationStyle>
            <h2>{todayMotivation_}</h2>
            <p>{todayName_}</p>
        </MotivationStyle>
    )
}

const MotivationStyle = styled.div`
    text-align: center;
    flex-direction: column;
    display: flex;
    justify-content: center;
    justify-items: center;
    padding-top: 20em;
`