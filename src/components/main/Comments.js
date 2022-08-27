import styled from 'styled-components'
import CommentsItem from './CommentsItem'

const Comments = () => {
  return (
    <CommentsStyle>
        <CommentsItem/>
    </CommentsStyle>
  )
}

export default Comments

const CommentsStyle = styled.ul`
  background-color: white;

`