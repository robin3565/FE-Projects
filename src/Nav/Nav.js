import React, { Children, useContext } from 'react'
import styled from 'styled-components'
import TodayClock from '../Clock/components/TodayClock'
import { verContext } from '../EngVerBtn/utils/verContext';

export default function Nav(props) {
    const {setQuery} = useContext(verContext);
    const seletBG = (e) => {
        setQuery(e.target.name);
    }
    return (
        <NavBar>
            <TodayClock>{props.Children}</TodayClock>
            <BGBtnWrapper>
                <BGBtn src={`/assets/london.png`} name="london" onClick={seletBG}/>
                <BGBtn src={`/assets/france.png`} name="france" onClick={seletBG}/>
                <BGBtn src={`/assets/korea.png`} name="korea" onClick={seletBG}/>
            </BGBtnWrapper>
        </NavBar>
    )
}

const NavBar = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    top: 0;
    width: 100%;
    height: 35px;
    padding: 30px;
    z-index: 1;
`

const BGBtnWrapper = styled.div`
    margin-right: 3em;
`
const BGBtn = styled.img`
    width:40px;
    height:40px;
`