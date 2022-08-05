import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import './Bookmark.css'
import BookMarkModal from '../modal/BookMarkModal';
import { verContext } from '../../EngVerBtn/utils/verContext';
import BookmarkBasic from './BookmarkBasic';
import BookmarkCustom from './BookmarkCustom';

const Bookmark = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { info } = useContext(verContext);
    let data = JSON.parse(localStorage.getItem('data'));
    data && data.length > 0 && data.pop();

    return (
        <>
            <BookMarkBanner>
                {data && data.length > 0 ? data.map(item => (
                    <BookmarksWrap key={item.name}>
                    <BookmarkList className='bookmark__item'>
                        <BookmarkCustom url={item.url} imgUrl={item.imgUrl} />
                    </BookmarkList>
                    <div>
                        <BookMarkString>{item.name}</BookMarkString>
                    </div>
                </BookmarksWrap>
                )) : null}
                {/*  */}
                <BookmarksWrap key={info.name}>
                    <BookmarkList className='bookmark__item'>
                        <BookmarkBasic isOpen={isOpen} setIsOpen={setIsOpen} />
                    </BookmarkList>
                    <div>
                        <BookMarkString>바로가기 추가</BookMarkString>
                    </div>
                </BookmarksWrap>
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
const BookMarkString = styled.p`
    margin: 0 25px;
    text-align: center;
`