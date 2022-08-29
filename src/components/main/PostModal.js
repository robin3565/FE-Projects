import styled from 'styled-components'
import { MdImage } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { usePostState } from '../context/postContext';
import { useAuthState } from '../context/authContext';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';

const PostModal = () => {
    const { postState, postDispatch, uploadImg, onToggle } = usePostState();
    const { state } = useAuthState();

    const onClose = () => {
        onToggle();
    }


    return (
        <ModalStyle>
            <div
                className='second-form'>
                <form>
                    <div
                        className="uploading-nav">
                        <p>새 게시물 만들기</p>
                        <IoCloseOutline
                            className="btn-cancle"
                            onClick={onClose} />
                        {postState.uploadPage === 2 &&
                            <input
                                className='btn-submit'
                                value='공유하기'
                                type="submit" />
                        }
                    </div>

                    <div
                        className="uploading-img-wrapper">
                        <div
                            className="uploading-img">
                            <img
                                className="uploaded-img"/>
                        </div>
                        <div
                            className="uploading-content-wrapper">
                            <div
                                className='uploading-user-info'>
                                <FaUserCircle
                                    className='post-user-null post-user-img' />
                                <span>UserName</span>
                            </div>
                            <div
                                className='uploading-content'>
                                <textarea />
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </ModalStyle>
    )
}

export default PostModal

const ModalStyle = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .uploading-nav {
        border-bottom: 1px solid gray;
        width: 100%;
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }

    .uploading-nav p {
        flex-grow: 1;
        padding: 15px;
        font-size: 1.1em;
        font-weight: 600;
    }

    .uploading-nav .btn-cancle {
        color: #262626;
        width: 26px;
        height: 26px;
        cursor: pointer;
        margin-right: 10px;
    }

    form {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;        
    }

    .second-form {
        width: 1000px;
        height: 700px;
        background-color: white;
        border-radius: 10px;
    }
    
    .btn-submit {
        margin-right: 10px;
        padding: 6px 10px;
        color:#0095f6;
        background-color: transparent;
        border: none;
        font-weight: 600;
        font-size: 0.9em;
        cursor: pointer;
    }

    .uploading-img-wrapper {
        width: 100%;
        height: 650px;
        display: flex;
    }

    .uploading-img {
        width: 699px;
        height: 648px;
    }

    .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0 0 0 10px;
    }

    .uploading-content-wrapper {
        width: 299px;
        height: 100%;
        border-left: 1px solid gray;
        display: flex;
        flex-direction: column;
    }
    
    .uploading-user-info {
        display: flex;
        align-items: center;
        margin: 20px 10px;
    }

    .post-user-img {
        border: 1px solid #dbdbdb;
        border-radius: 10em;
        height: 30px;
        width: 30px;
        margin: 0 10px;
        cursor: pointer;
    }
    
    .post-user-null {
        color: #DDDDDD;
    }

    textarea {
        min-height: 168px;
        width: 85%;
        border: none;
        outline: none;
        padding: 0 19px;
        resize: none;
        font: 15px 'Roboto';
    }
`