import React, { useState, useContext, useEffect } from 'react'
import styled from 'styled-components'
import { stateContext } from '../utils/stateContext';
import { getData } from '../utils/functions';
import BookMarkModal from './BookMarkModal';
import BookMarkUpdate from './BookMarkUpdate';

const Bookmark = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [props, setProps] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const { info } = useContext(stateContext);
    const value = getData();

    useEffect(() => {
        getData();
    }, [info])

    const updateClick = (item) => {
        setProps(item);
        setIsUpdate(prop => !prop)
    }

    return (
        <>
            <BookmarkStyle
                className='bookmark'>
                {/* bookmark가 1개 이상인 경우 */}
                {value && value.length > 0 ? value.map(item => (
                    <div
                        className='bookmark__wrapper'
                        key={item[0].name}>
                        <img
                            onClick={() => updateClick(item)}
                            className='bookmark__update-btn'
                            alt='update-btn'
                            src='assets/more_vert_24dp.png' />
                        <div
                            className='bookmark__inner bookmark__inner-custom'>
                            <a
                                className='bookmark__custom'
                                href={item[0].url}>
                                <img
                                    className='bookmark__custom-img'
                                    src={`assets/con${item[0].imgUrl}.png`} />
                            </a>
                        </div>
                        <div>
                            <p className='bookmark__title'>
                                {item[0].name}
                            </p>
                        </div>
                    </div>
                )) : null}

                {/* bookmark가 1개인 경우 */}
                <div
                    className='bookmark__wrapper'>
                    <div
                        className='bookmark__inner bookmark__inner-basic'>
                        <div
                            className='bookmark__basic'
                            onClick={() => setIsOpen(props => !props)}>
                            <img
                                className='bookmark__basic-img'
                                src='assets/add_24dp.png' />
                        </div>
                    </div>
                    <div>
                        <p className='bookmark__title'>
                            바로가기 추가
                        </p>
                    </div>
                </div>
            </BookmarkStyle>
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

const BookmarkStyle = styled.div`
    display: flex;
    width:40%;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 700px;
    justify-content: center;
    justify-items: center;
    padding: 30px;
    
    .bookmark__wrapper {
        display: flex;
        flex-direction: column;
        justify-items: center;
        flex-shrink: 0;
        border-radius: 10px;
        margin: 0 3px;
        padding: 0;
        height: 150px;
        width: 150px;
    }

    .bookmark__wrapper:hover {
        transition: .2s ease-in;
        background-color: rgba(255, 255, 255, 0.5);
    }
    
    .bookmark__wrapper:hover .bookmark__update-btn{
        visibility: visible;
    }
    
    
    .bookmark__update-btn {
        visibility:hidden;
        display: inline;
        margin: 0 0 0 auto;
        padding: 3px 0 0 0;
        width: 25px;
        height: 25px;
        cursor: pointer;
    }

    .bookmark__inner {
        list-style: none;
        cursor: pointer;
        border-radius: 50px;
        background: #fff;
        width: 25px;
        height: 25px;
    }

    .bookmark__inner-custom {
        padding: 20px;
        margin: auto;
    }

    .bookmark__inner-basic {
        padding: 20px;
        margin: 31px auto;
        margin-bottom: 2px;
    }

    .bookmark__basic {
        width: 55px;
        height: 55px;
        box-sizing: border-box;
        border-radius: 50%;
        display:block;
        position: relative;
        padding: 0;
        margin: -15px 0px 0px -15px;
    }

    .bookmark__basic-img {
        width: 30px;
        height: 30px;
        position: absolute;
        margin: 0 auto;
        margin: 12.5px 0px 0px 12.5px;
    }

    .bookmark__custom {
        width: 55px;
        height: 55px;
        box-sizing: border-box;
        display: block;
        border-radius: 50%;
        position: relative;
        padding: 0;
        margin: -15px 0px 0px -15px;
    }

    .bookmark__custom-img {
        width: 30px;
        height: 30px;
        position: absolute;
        margin: 0 auto;
        margin: 12.5px 0px 0px 12.5px;
    }

    .bookmark__title {
        margin: 15px;
        text-align: center;
    }
`