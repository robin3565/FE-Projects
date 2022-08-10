import React, { useContext, useState } from 'react'
import styled from 'styled-components'
import { stateContext } from '../../utils/stateContext';
import '../../styles/BookMarkModal.css'

function BookMarkModal({ setIsOpen }) {
    const { info, setInfo } = useContext(stateContext)
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");

    const closeBookmark = () => {
        setIsOpen(false);
    }

    const createBookMark = (e) => {
        e.preventDefault();
        setInfo([{ name: name, url: url, type: true, imgUrl: info.length }, ...info]);
        localStorage.setItem(name, JSON.stringify([{ name: name, url: url, type: true, imgUrl: info.length }]));
        alert("저장 완료 :D")
        closeBookmark();
    }

    return (
        <Presentation role="presentation">
            <WrapperModal>
                <Modal className='modal'>
                    <ModalClose onClick={closeBookmark}>X</ModalClose>
                    <ModalContent>
                        <p>바로가기 추가</p>
                        <div>
                            <p>이름</p>
                            <InfoInput
                                maxlength='6'
                                type="text"
                                name={name}
                                onChange={
                                    (e) => setName(e.target.value)
                                } />
                        </div>
                        <div>
                            <p>URL</p>
                            <InfoInput
                                type="text"
                                placeholder="https://"
                                name={url}
                                onChange={
                                    (e) => setUrl(e.target.value)
                                } />
                        </div>
                        <div className='modal__buttons'>
                            <input
                                className="btn"
                                value="완료"
                                type="submit"
                                onClick={createBookMark} />
                            <button className="btn" onClick={closeBookmark}>취소</button>
                        </div>
                    </ModalContent>
                </Modal>
            </WrapperModal>
        </Presentation>
    )
}
const Presentation = styled.div`
    z-index: 1200;
    position: absolute;
`
const WrapperModal = styled.div`
    display: flex;
    justify-content: center;
    position: fixed;
    inset: 0px;
    background-color: rgb(0 0 0 / 30%);
    -webkit-tap-highlight-color: transparent;
`
const Modal = styled.div`
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
`
const ModalContent = styled.div`
    padding: 20px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    justify-items: center;
`
const ModalClose = styled.span`
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    z-index: 1000;
    color: black;
    background-color: #e9ecef;
    padding: 10px 17px;
    border-radius: 20em;
`
const InfoInput = styled.input`
    width: 90%;
    border-radius: 20px;
    align-items: center;
    background-color: #f8f9fa;
    border: 1px solid #bbb;
    padding: 7px 12px;
    margin: 0 10px;
`

export default BookMarkModal
