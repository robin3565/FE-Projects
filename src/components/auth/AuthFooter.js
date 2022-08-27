import React from 'react'
import styled from 'styled-components'

const AuthFooter = () => {
  return (
    <AuthFooterStyle>
      footer
    </AuthFooterStyle>
  )
}

export default AuthFooter

const AuthFooterStyle = styled.footer`
    text-align: center;
    border: 1px solid #dbdbdb;
    width: 100%;
    margin-top: 120px;
    height: 80px;
`