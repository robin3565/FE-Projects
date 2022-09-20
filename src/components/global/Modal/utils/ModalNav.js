import React from 'react'
import { usePostState } from '../../../../context/postContext';
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";
import styled from 'styled-components';

const ModalNav = ({ content }) => {
    const { postState, postDispatch } = usePostState();

    const onClose = () => {
        postDispatch({ type: "CLOSE_MODAL" });
        document.body.style.overflow = "unset";
    }

    const onNext = () => {
        postDispatch({
            type: "CHANGE_ORDER",
            uploadPage: 3
        });
    }

    const onPrev = () => {
        postDispatch({
            type: "CHANGE_ORDER",
            uploadPage: 1
        });
    }

    return (
        <ModalNavStyle>
            <div
                className="plus-modal__nav">
                {postState.uploadPage === 2 &&
                    <IoIosArrowRoundBack
                        className="plus-modal__btn plus-modal__btn-left"
                        onClick={onPrev}/>
                }
                <p>{content}</p>
                <IoCloseOutline
                    className="plus-modal__btn plus-modal__btn-right"
                    onClick={onClose} />
                {postState.uploadPage === 2 &&
                    <button
                        className='plus-modal__btn-submit'
                        onClick={onNext}>
                        다음
                    </button>
                }
                {postState.uploadPage === 3 &&
                    <input
                        className='plus-modal__btn-submit'
                        value='공유하기'
                        type="submit" />
                }
            </div>
        </ModalNavStyle>
    )
}

export default ModalNav

const ModalNavStyle = styled.div`

    .plus-modal__nav {
        border-bottom: 1px solid gray;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    
    .plus-modal__nav p {
        flex-grow: 1;
        padding: 15px;
        font-size: 1.1em;
        font-weight: 600;
    }

    .plus-modal__btn {
        color: #262626;
        width: 26px;
        height: 26px;
        cursor: pointer;
    }

    .plus-modal__btn-left {
        margin-left: 10px;
    }

    .plus-modal__btn-right {
        margin-right: 10px;
    }
    
    .plus-modal__btn-submit {
        margin-right: 10px;
        padding: 6px 10px;
        color:#0095f6;
        background-color: transparent;
        border: none;
        font-weight: 600;
        font-size: 0.9em;
        cursor: pointer;
    }

`
