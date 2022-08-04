import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { verContext } from '../utils/verContext'
import "./EngverBtn.css"


const EngverBtn = () => {
    const { ver, setVer } = useContext(verContext);
    const changeEngVer = () => {
        ver == false ? setVer(true) : setVer(false);
    }

    return (
        <>
            <Button className='switch-button'>
                <input type="checkbox" onClick={changeEngVer}/>
                <span className='onoff-switch'></span>
            </Button>
        </>
    )
}

export default EngverBtn

const Button = styled.label`
    margin-left: 3em;
`
