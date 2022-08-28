import styled from 'styled-components'
import { MdImage } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { usePostState } from '../context/postContext';
import { useAuthState } from '../context/authContext';
import { useState } from 'react';

const Modal = () => {
    const { postState, postDispatch, uploadImg } = usePostState();
    const { state } = useAuthState();
    const [fileUrl, setFileUrl] = useState("");


    const onToggle = () => {
        postDispatch({ type: "LOADING", loading: !postState.loading, uploadPage: 1 })
    }

    const onClose = () => {
        setFileUrl(null);
        onToggle();
    }

    const handleImg = async (e) => {
        e.preventDefault();
        try {
            uploadImg(fileUrl, state);
            onClose();
        } catch (err) { console.log(err) };
    }

    const onFileChange = (e) => {
        const reader = new FileReader();
        // 받은 파일 중 첫 번째 파일만 가져온다.
        reader.readAsDataURL(e.target.files[0]);
        postDispatch({ type: "POSTING_PAGE", uploadPage: postState.uploadPage + 1 })
        reader.onloadend = (finishedEvent) => {
            setFileUrl(finishedEvent.target.result);
        }
    }

    return (
        <ModalStyle>
            <div
                className="uploading-modal">

                <form
                    onSubmit={handleImg}>
                    <div
                        className="uploading-nav">
                        <p>새 게시물 만들기</p>
                        <IoCloseOutline
                            className="btn-cancle"
                            onClick={onClose} />
                        {postState.uploadPage === 2 &&
                            <input
                                type="submit" />
                        }
                    </div>

                    <div
                        className="uploading-container">
                        <div
                            className="uploading-file">
                            {
                                fileUrl && (<img
                                    className="uploaded-img"
                                    src={fileUrl} />)
                            }
                            <MdImage
                                className="uploading-btn" />
                            <p
                                className="uploading-sub">
                                사진과 동영상을 여기에 끌어다 놓으세요.
                            </p>
                            <input
                                className="btn-file"
                                type="file"
                                onChange={onFileChange} />
                        </div>
                        <div
                            className="uploading-content">
                            <textarea />
                        </div>
                    </div>
                </form>
            </div>
        </ModalStyle>
    )
}

export default Modal

const ModalStyle = styled.div`
        background-color: rgba(0, 0, 0, 0.4);
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 1;
        display: flex;
        justify-content: center;
        align-items: center;

    .uploading-modal {
        width: 1000px;
        height: 700px;
        background-color: white;
        border-radius: 10px;
    }

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

    .uploading-container {
        width: 100%;
        height: 100%;
        padding-bottom: 90px;
        display: flex;
    }

    .uploading-file {
        text-align: center;
        margin: auto;
        width: 70%;
    }

    .uploaded-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0 0 10px 10px;
    }

    .uploading-btn {
        width: 100px;
        height: 100px;
    }

    .uploading-sub {
        font-size: 1.4em;
        font-weight: 200;
        margin-bottom: 10px;
    }

    .uploading-content {
        width: 30%;
        height: 100%;
        border-left: 1px solid gray;
    }
    textarea {
        width: 100%;
    }
`