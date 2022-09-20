import React from 'react'
import { MdImage } from "react-icons/md";
import Resizer from "react-image-file-resizer";
import styled from 'styled-components';
import { usePostState } from '../../../context/postContext';
import ModalNav from './utils/ModalNav';

const FirstModal = () => {
    const { postState, postDispatch } = usePostState();

    const resizeFile = (file) =>
        new Promise((resolve) => {
            Resizer.imageFileResizer(
                file,
                700,
                700,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const onFileChange = async (e) => {
        try {
            const file = e.target.files[0];
            const img = await resizeFile(file);
            postDispatch({ 
                type: "ON_POST_FILE", 
                uploadPage: postState.uploadPage + 1, 
                imageUrl: img })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <FirstModalStyle>
            <form
                className='plus-modal-form'>
                <ModalNav
                    content={"새 게시물 만들기"}/>

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
    )
}

export default FirstModal

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