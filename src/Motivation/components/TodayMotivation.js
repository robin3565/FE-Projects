import React, { useContext, useMemo } from 'react'
import styled from 'styled-components'
import { verContext } from '../../EngVerBtn/utils/verContext';
import motivations from '../utils/motivations.json'
import getEngVer from '../utils/getEngVer'

export default function TodayMotivation() {
    const { ver , num } = useContext(verContext)
    const [todayMotivation_, todayName_] = getEngVer(motivations, ver, num)

    return (
        <Motivation>
            <h2>{todayMotivation_}</h2>
            <p>{todayName_}</p>
        </Motivation>
    )
}

const Motivation = styled.div`
    text-align: center;
    flex-direction: column;
    display: flex;
    justify-content: center;
    justify-items: center;
    padding-top: 20em;
`