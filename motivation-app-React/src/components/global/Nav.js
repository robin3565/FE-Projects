import React, { useContext } from 'react'
import styled from 'styled-components'
import { stateContext } from '../../utils/stateContext';
import TodayClock from '../TodayClock'

export default function Nav(props) {
    const { setQuery } = useContext(stateContext);

    return (
        <NavBar>
            <TodayClock>{props.Children}</TodayClock>
            <div
                className='nav__btn-group'>
                <img
                    src={`assets/london.png`}
                    alt='london-btn'
                    name="london"
                    onClick={(e) => setQuery(e.target.name)} />
                <img
                    src={`assets/france.png`}
                    alt='france-btn'
                    name="france"
                    onClick={(e) => setQuery(e.target.name)} />
                <img
                    src={`assets/korea.png`}
                    alt='korea-btn'
                    name="korea"
                    onClick={(e) => setQuery(e.target.name)} />
            </div>
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

    .nav__btn-group {
        margin-right: 3em;
    }

    img {
        cursor: pointer;
        width:35px;
        height:35px;
    }
`