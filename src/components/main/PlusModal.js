import styled from 'styled-components'
import { MdImage } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { usePostState } from '../../context/postContext';
import { useAuthState } from '../../context/authContext';
import { useEffect, useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const PlusModal = () => {
    const { postState, postDispatch, uploadImg, updateContent } = usePostState();
    const { state } = useAuthState();
    const [content, setContent] = useState(postState.content ? postState.content : "");
    const postId = useParams();
    const navigate = useNavigate();

    console.log(state)

    const onClose = () => {
        postDispatch({ type: "CLOSE_MODAL"});
        document.body.style.overflow = "unset";
    }

    const handleImg = (e) => {
        e.preventDefault();
        if(postState.type === "POSTED") {
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

    const onFileChange = (e) => {
        const reader = new FileReader();
        // 받은 파일 중 첫 번째 파일만 가져온다.
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (finishedEvent) => {
            postDispatch({ type: "POSTED_2", uploadPage: postState.uploadPage + 1, imageUrl: finishedEvent.target.result})
        }
    }

    return (
        <ModalStyle>
             {postState.isModal && postState.uploadPage === 1 ? (
                <FirstModalStyle>
                    <form
                        className='plus-modal-form'>
                        <div
                            className="plus-modal__nav">
                            <p>새 게시물 만들기</p>
                            <IoCloseOutline
                                className="plus-modal__btn-cancle"
                                onClick={onClose} />
                        </div>

                        <div
                            className="plus-modal__file">
                            <div
                                className='file__inner'>
                                <MdImage
                                    className="file__img" />
                                <p
                                    className="file__title">
                                    사진과 동영상을 여기에 끌어다 놓으세요.
                                </p>
                                <label
                                    className="file__input--button"
                                    htmlFor="input-file">
                                    컴퓨터에서 선택
                                </label>
                                <input
                                    style={{ display: 'none' }}
                                    id="input-file"
                                    type="file"
                                    onChange={onFileChange} />
                            </div>
                        </div>
                    </form>
                </FirstModalStyle>
            ): null}
            {postState.isModal && postState.uploadPage > 1 ? (
                <SecondModalStyle>
                    <div
                        className='plus-modal-next-form'>
                        <form
                            className='plus-modal-form'
                            onSubmit={handleImg}>
                            <div
                                className="plus-modal__nav">
                                <p>새 게시물 만들기</p>
                                <IoCloseOutline
                                    className="plus-modal__btn-cancle"
                                    onClick={onClose} />
                                {postState.uploadPage === 2 &&
                                    <input
                                        className='plus-modal__btn-submit'
                                        value='공유하기'
                                        type="submit" />
                                }
                            </div>

                            <div
                                className="form__upload">
                                <div
                                    className="form__upload--img">
                                    <img
                                        className="uploaded-img"
                                        src={postState.imageUrl} />
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
                </SecondModalStyle>
            ) : null}
        </ModalStyle>
    )
}

export default PlusModal

const ModalStyle = styled.div`
    background-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;

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
        padding: 15px;g
        font-size: 1.1em;
        font-weight: 600;
    }

    .plus-modal__btn-cancle {
        color: #262626;
        width: 26px;
        height: 26px;
        cursor: pointer;
        margin-right: 10px;
    }

    
    .plus-modal-form {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;        
    }
`

const SecondModalStyle = styled.div`

    .plus-modal-next-form {
        width: 1000px;
        height: 700px;
        background-color: white;
        border-radius: 10px;
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

const FirstModalStyle = styled.div`
    width: 700px;
    height: 700px;
    background-color: white;
    border-radius: 10px;

    .plus-modal__file {
        width: 100%;
        height: 650px;
        text-align: center;
    }

    .file__inner {
        width: 100%;
        margin-top: 200px;
    }

    
    .file__img {
        width: 100px;
        height: 100px;
    }
    
    .file__title {
        font-size: 1.4em;
        font-weight: 200;
        margin-bottom: 20px;
    }
    
    .file__input--button{
        padding: 6px 25px;
        background-color:#0095f6;
        border-radius: 4px;
        color: white;
        cursor: pointer;
      }
`