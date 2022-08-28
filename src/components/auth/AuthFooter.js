import React from 'react'
import styled from 'styled-components'

const AuthFooter = () => {
  return (
    <AuthFooterStyle>
      © 2022 Instagram from Meta
    </AuthFooterStyle>
  )
}

export default AuthFooter

const AuthFooterStyle = styled.footer`
    text-align: center;
    color: gray;
    width: 100%;
    margin-top: 120px;
    height: 80px;
`