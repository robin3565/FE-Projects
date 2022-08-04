import React from 'react'
import styled from 'styled-components'

const BookmarkBasic = (props) => {
    const PlusClick = () => {
        props.isOpen == false ? props.setIsOpen(true) : props.setIsOpen(false);
    }
    return (
        <BookmarkBasicItem onClick={PlusClick}>
            <PlusImg src='/assets/add_24dp.png' />
        </BookmarkBasicItem>
    )
}

export default BookmarkBasic

const BookmarkBasicItem = styled.a`
    width: 55px;
    height: 55px;
    box-sizing: border-box;
    border-radius: 50%;
    display:block;
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