import React from 'react'
import styled from 'styled-components'

const Story = () => {
    return (
        <StoryStyles>
            <div />
            <div />
            <div />
            <div />
            <div />
        </StoryStyles>
    )
}

export default Story

const StoryStyles = styled.div`
  height: 12vh;
  background-color: white;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 30px;

  div {
      border: 1px solid #dbdbdb;
      width: 65px;
      height: 65px;
      border-radius: 6em;
    }
`
