import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import './Bookmark.css'
import BookMarkModal from '../modal/BookMarkModal';
import { verContext } from '../../EngVerBtn/utils/verContext';

const Bookmark = () => {
    const { info } = useContext(verContext);
    const [isOpen, setIsOpen] = useState(false);

    const PlusClick = () => {
        isOpen == false ? setIsOpen(true) : setIsOpen(false);
    }

    return (
        <>
            <BookMarkBanner>
                {info.map(item =>
                    <BookmarksWrap key={item.name}>
                        <BookmarkList className='bookmark__item'>
                            {item.type == false ?
                                <BookmarkBasicItem onClick={PlusClick}>
                                    <PlusImg src='/assets/add_24dp.png' />
                                </BookmarkBasicItem>
                                :
                                <BookmarkCustomItem href={item.url}>
                                    <PlusImg src={`/assets/con${item.imgUrl}.png`} />
                                </BookmarkCustomItem>
                            }
                        </BookmarkList>
                        <div>
                            <BookMarkString>{item.name}</BookMarkString>
                        </div>
                    </BookmarksWrap>
                )}
            </BookMarkBanner>
            {
                isOpen && <BookMarkModal setIsOpen={setIsOpen} />
            }
        </>
    )
}

export default Bookmark

const BookMarkBanner = styled.div`
    display: flex;
    justify-content: center;
    justify-items: center;
`

const BookmarksWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
`

const BookmarkList = styled.div`
   list-style: none;
   cursor: pointer;
   border-radius: 50px;
    background: #fff;
    margin: 70px 40px 20px 40px;
    padding: 20px;
    width: 25px;
    height: 25px;
`

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
const BookMarkString = styled.p`
    margin: 0 25px;
    text-align: center;
`