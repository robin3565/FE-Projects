import React from 'react'
import styled from 'styled-components'

const CommentsItem = () => {
  return (
    <CommentsItemStyle>
      <span>userName</span>
      <span>Comments</span>
    </CommentsItemStyle>
  )
}

export default CommentsItem

const CommentsItemStyle = styled.li`
  span {
    margin-right: 10px;
  }
`