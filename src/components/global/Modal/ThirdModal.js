import React from 'react'
import styled from 'styled-components'
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { usePostState } from '../../../context/postContext';
import { useAuthState } from '../../../context/authContext';
import { useNavigate, useParams } from 'react-router-dom';
import { IoCloseOutline } from "react-icons/io5";

const ThirdModal = () => {
    const { postState, postDispatch, uploadImg, updateContent } = usePostState();
    const { state } = useAuthState();
    const [content, setContent] = useState(postState.content ? postState.content : "");
    
    const postId = useParams();
    const navigate = useNavigate();

    const onClose = () => {
        postDispatch({ type: "CLOSE_MODAL" });
        document.body.style.overflow = "unset";
    }

    const handleSubmitImg = (e) => {
        e.preventDefault();
        if (postState.type === "POSTED") {
            uploadImg(postState.imageUrl, state, content)
                .then(() => onClose());
        } else if (postState.type = "UPDATE_POSTED") {
            updateContent(content, postId.postId)
                .then(() => {
                    onClose();
                    navigate((-1));
                });
        }
    }

    return (
        <ThirdModalStyle>
            <div
                className='plus-modal-next-form'>
                <form
                    className='plus-modal-form'
                    onSubmit={handleSubmitImg}>
                    <div
                        className="plus-modal__nav">
                        <p>새 게시물 만들기</p>
                        <IoCloseOutline
                            className="plus-modal__btn plus-modal__btn-right"
                            onClick={onClose} />
                        <input
                            className='plus-modal__btn-submit'
                            value='공유하기'
                            type="submit" />
                    </div>

                    <div
                        className="form__upload">
                        <div
                            className="form__upload--img">
                            <img
                                className="uploaded-img"
                                src={postState.showImg} />
                        </div>
                        <div
                            className="form__upload--content">
                            <div
                                className='upload__user'>
                                {
                                    state.photoUrl ? (
                                        <img
                                            src={state.photoUrl}
                                            className='upload__user--null upload__user--img' />
                                    ) : (
                                        <FaUserCircle
                                            className='upload__user--null upload__user--img' />
                                    )
                                }
                                <span>{state.id}</span>
                            </div>
                            <div
                                className='upload__content'>
                                <textarea
                                    type="submit"
                                    placeholder="문구 입력..."
                                    value={content}
                                    onChange={e => setContent(e.target.value)} />
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </ThirdModalStyle>
    )
}

export default ThirdModal

const ThirdModalStyle = styled.div`

    .plus-modal-next-form {
        width: 1000px;
        height: 700px;
        background-color: white;
        border-radius: 10px;
    }

    .form__upload {
        width: 100%;
        height: 650px;
        display: flex;
    }

    .form__upload--img {
        width: 699px;
        height: 648px;
    }

    .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0 0 0 10px;
    }

    .form__upload--content {
        width: 299px;
        height: 100%;
        border-left: 1px solid gray;
        display: flex;
        flex-direction: column;
    }
    
    .upload__user {
        display: flex;
        align-items: center;
        margin: 20px 10px;
    }

    .upload__user--img {
        border: 1px solid #dbdbdb;
        border-radius: 10em;
        height: 30px;
        width: 30px;
        margin: 0 10px;
        cursor: pointer;
    }
    
    .upload__user--null {
        color: #DDDDDD;
    }

    .upload__content {
        padding: 0 19px;
    }

    textarea {
        min-height: 200px;
        width: 85%;
        border: none;
        outline: none;
        resize: none;
        font: 15px 'Roboto';
    }
    
`


