import React from 'react'
import styled from 'styled-components'
import EngverBtn from '../../EngVerBtn/components/EngverBtn'

const Footer = () => {
  return (
    <FooterBar>
        <EngverBtn/>
    </FooterBar>
  )
}

export default Footer


const FooterBar = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    bottom: 0;
    width: 100%;
    height: 35px;
    padding: 30px;
    z-index: 1;
    flex-direction: row-reverse;
`