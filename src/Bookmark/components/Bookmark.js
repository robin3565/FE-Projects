import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import '../../styles/Bookmark.css'
import BookMarkModal from '../modal/BookMarkModal';
import BookmarkBasic from './BookmarkBasic';
import BookmarkCustom from './BookmarkCustom';
import BookMarkUpdate from '../modal/BookMarkUpdate'
import { stateContext } from '../../utils/stateContext';
import getData from '../utils/getData';

const Bookmark = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [props, setProps] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const { info, setInfo } = useContext(stateContext);
    const value = getData();
    useEffect(() => {
        getData();
    }, [info])

    const UpdateClick = (item) => {
        setProps(item);
        isUpdate == false ? setIsUpdate(true) : setIsUpdate(false);
    }

    return (
        <>
            <BookMarkBanner>
                {value && value.length > 0 ? value.map(item => (
                    <BookmarksWrap className='bookmark__item' key={item[0].name}>
                        <BookMarkUpdateBtn onClick={() => UpdateClick(item)} className='bookmark__update' src='assets/more_vert_24dp.png' />
                        <BookmarkList>
                            <BookmarkCustom url={item[0].url} imgUrl={item[0].imgUrl} />
                        </BookmarkList>
                        <div>
                            <BookMarkString>{item[0].name}</BookMarkString>
                        </div>
                    </BookmarksWrap>
                )) : null}
                {/*  */}
                <BookmarksWrap className='bookmark__item' key={info.name}>
                    <BookmarkBasicList>
                        <BookmarkBasic isOpen={isOpen} setIsOpen={setIsOpen} />
                    </BookmarkBasicList>
                    <div>
                        <BookMarkString>바로가기 추가</BookMarkString>
                    </div>
                </BookmarksWrap>
            </BookMarkBanner>
            {
                isOpen && <BookMarkModal setIsOpen={setIsOpen} />
            }
            {
                isUpdate && <BookMarkUpdate setIsUpdate={setIsUpdate} props={props} />
            }
        </>
    )
}

export default Bookmark

const BookMarkUpdateBtn = styled.img`
    display: inline;
    margin: 0 0 0 auto;
    padding: 3px 0 0 0;
    width: 25px;
    height: 25px;
    cursor: pointer;
`

const BookMarkBanner = styled.div`
    display: flex;
    width:50%;
    margin: 0 auto;
    justify-content: center;
    justify-items: center;
    padding: 30px;
`

const BookmarksWrap = styled.div`
    display: flex;
    flex-direction: column;
    justify-items: center;
    border-radius: 10px;
    margin: 0 3px;
    padding: 0;
    height: 150px;
    width: 150px;

`

const BookmarkList = styled.div`
    list-style: none;
    cursor: pointer;
    border-radius: 50px;
    background: #fff;
    padding: 20px;
    margin: auto;
    width: 25px;
    height: 25px;
`

const BookmarkBasicList = styled.div`
    list-style: none;
    cursor: pointer;
    border-radius: 50px;
    background: #fff;
    padding: 20px;
    margin: 31px auto;
    margin-bottom: 2px;
    width: 25px;
    height: 25px;
`

const BookMarkString = styled.p`
    margin: 15px;
    text-align: center;
`