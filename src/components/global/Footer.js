import React, { useContext } from 'react'
import styled from 'styled-components'
import { stateContext } from '../../utils/stateContext';

const Footer = () => {
  const { ver, setVer } = useContext(stateContext);

  return (
    <FooterBar>
      <label
        className='switch-button'>
        <input
          type="checkbox"
          onClick={() => setVer(prop => !prop)} />
        <span
          className='onoff-switch'></span>
        <p
          className='footer__btn-name'>
          {ver ? "Eng ver." : "Kor ver."}
        </p>
      </label>
    </FooterBar>
  )
}

export default Footer

const FooterBar = styled.div`
    position: fixed;
    display: flex;
    justify-content: space-between;
    flex-direction: row-reverse;
    align-items: center;
    bottom: 0;
    width: 100%;
    height: 35px;
    padding: 30px;
    z-index: 1;

    .switch-button {
      position: relative;
      display: inline-block;
      width: 55px;
      height: 30px;
      margin-right: 4em;
    }

    .footer__btn-name {
      font-size: 0.6em;
      text-align: center;
    }
`