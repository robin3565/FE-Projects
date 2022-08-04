import React from 'react'
import styled from 'styled-components'

const BookmarkCustom = (props) => {
  return (
    <BookmarkCustomItem href={props.url}>
      <PlusImg src={`/assets/con${props.imgUrl}.png`} />
    </BookmarkCustomItem>
  )
}

export default BookmarkCustom

const BookmarkCustomItem = styled.a`
    width: 55px;
    height: 55px;
    box-sizing: border-box;
    display:block;
    border-radius: 50%;
    position: relative;
    padding: 0;
    margin: -15px 0px 0px -15px;
`

const PlusImg = styled.img`
    width: 30px;
    height: 30px;
    position: absolute;
    margin: 0 auto;
    margin: 12.5px 0px 0px 12.5px;
`