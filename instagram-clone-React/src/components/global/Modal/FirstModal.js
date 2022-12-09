import { MdImage } from "react-icons/md";
import Resizer from "react-image-file-resizer";
import styled from 'styled-components';
import { usePostState } from '../../../context/postContext';
import { IoCloseOutline } from "react-icons/io5";

// 1: 이미지 업로드 모달창
const FirstModal = () => {
    const { postState, postDispatch, onClose } = usePostState();

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
                imageUrl: img
            })
        } catch (err) {
            throw new Error(err)
        }
    }

    return (
        <FirstModalStyle>
            <form
                className='plus-modal-form'>
                <div
                    className="plus-modal__nav">
                    <p>새 게시물 만들기</p>
                    <IoCloseOutline
                        className="plus-modal__btn plus-modal__btn-right"
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
        margin-right: 10px;
    }
`
