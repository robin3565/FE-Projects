import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { setItem, removeData } from '../utils/functions';
import { stateContext } from '../utils/stateContext';

const BookMarkUpdate = ({ setIsUpdate, props }) => {
    const { info, setInfo } = useContext(stateContext)
    const [name, setName] = useState(props[0].name);
    const [url, setUrl] = useState(props[0].url);
    const originalName = props[0].name;
    const originalUrl = props[0].url;

    const removeBookMark = () => {
        setInfo(info.filter(item => item.name !== name));
        removeData(name);
        setIsUpdate(false);
    }

    const updateInfo = () => {
        setInfo([...info,
        {
            name: name,
            url: url,
            type: true,
            imgUrl: info.length
        }]);
        setItem(name, JSON.stringify([
            { 
                name: name, 
                url: url, 
                type: true, 
                imgUrl: info.length 
            }]));
        alert("수정 완료 :D");
        setIsUpdate(false);
    }

    const updateBookMark = (e) => {
        e.preventDefault();
        if (originalUrl === url && originalName === name) setIsUpdate(false);
        else if (originalName !== name) {
            removeData(originalName);
            updateInfo();
        }
        else {
            updateInfo();
        }
    }

    return (
        <BookMarkModalStyle>
            <div className='modal__wrapper'>
                <div className='modal'>
                    <span 
                        className='modal__close'
                        onClick={() => setIsUpdate(false)}>X</span>
                    <div
                        className='modal__content'>
                        <p>바로가기 수정</p>
                        <div>
                            <p>이름</p>
                            <input
                                className='modal__input'
                                maxlength='6'
                                type="text"
                                name={originalName}
                                value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div>
                            <p>URL</p>
                            <input
                                className='modal__input'
                                type="text"
                                name={originalUrl}
                                value={url}
                                onChange={(e) => setUrl(e.target.value)} />
                        </div>
                        <div className='modal__buttons'>
                            <input
                                className="btn"
                                value="수정"
                                type="submit"
                                onClick={updateBookMark} />
                            <button className="btn" onClick={removeBookMark}>삭제</button>
                        </div>
                    </div>
                </div>
            </div>
        </BookMarkModalStyle>
    )
}
const BookMarkModalStyle = styled.div`
    z-index: 1200;
    position: absolute;

    .modal__wrapper{
        display: flex;
        justify-content: center;
        position: fixed;
        inset: 0px;
        background-color: rgb(0 0 0 / 30%);
        -webkit-tap-highlight-color: transparent;
    }

    .modal {
        position: relative;
        top: 300px;
        width: 500px;
        height: 350px;
        box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
            0px 5px 8px 0px rgba(0, 0, 0, 0.14), 0px 1px 14px 0px rgba(0, 0, 0, 0.12);
        background: #fff;
        overflow: hidden;
        border-radius: 8px;
        transition: all 400ms ease-in-out 2s;
        animation: fadeIn 400ms;
    }

    .modal__close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
        z-index: 1000;
        color: black;
        background-color: #e9ecef;
        padding: 10px 17px;
        border-radius: 20em;
    }

    .modal__content{
        padding: 20px;
        color: black;
        display: flex;
        flex-direction: column;
        justify-content: center;
        justify-items: center;
    }

    .modal__input{
        width: 90%;
        border-radius: 20px;
        align-items: center;
        background-color: #f8f9fa;
        border: 1px solid #bbb;
        padding: 7px 12px;
        margin: 0 10px;
    }
`

export default BookMarkUpdate