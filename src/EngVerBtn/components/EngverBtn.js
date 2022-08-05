import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { stateContext } from '../../utils/stateContext';
import '../../styles/EngverBtn.css'


const EngverBtn = () => {
    const { ver, setVer } = useContext(stateContext);
    const changeEngVer = () => {
        ver == false ? setVer(true) : setVer(false);
    }

    return (
        <Button className='switch-button'>
            <input type="checkbox" onClick={changeEngVer} />
            <span className='onoff-switch'></span>
            <ExplainVersion>{ver == true ? "Eng ver." : "Kor ver."}</ExplainVersion>
        </Button>
    )
}

export default EngverBtn

const Button = styled.label`
    position: relative;
    display: inline-block;
    width: 55px;
    height: 30px;
    margin-right: 4em;
`

const ExplainVersion = styled.p`
    font-size: 0.6em;
    text-align: center;
`
