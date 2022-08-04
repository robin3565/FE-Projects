import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import './Bookmark.css'
import BookMarkModal from '../modal/BookMarkModal';
import { verContext } from '../../EngVerBtn/utils/verContext';
import BookmarkBasic from './BookmarkBasic';
import BookmarkCustom from './BookmarkCustom';

const Bookmark = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { info } = useContext(verContext);
    return (
        <>
            <BookMarkBanner>
                {info.map(item =>
                    <BookmarksWrap key={item.name}>
                        <BookmarkList className='bookmark__item'>
                            {item.type == false ?
                                <BookmarkBasic isOpen={isOpen} setIsOpen={setIsOpen} />
                                :
                                <BookmarkCustom url={item.url} imgUrl={item.imgUrl} />
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
const BookMarkString = styled.p`
    margin: 0 25px;
    text-align: center;
`