import React from 'react'
import styled from 'styled-components'
import Cropper from 'react-easy-crop'
import { useState } from 'react';
import { usePostState } from '../../../context/postContext';
import ModalNav from './utils/ModalNav';
import getCroppedImg from '../Modal/utils/cropImage'
import { IoCloseOutline } from "react-icons/io5";
import { IoIosArrowRoundBack } from "react-icons/io";


const SecondModal = () => {
    const [fileUrl, setFileUrl] = useState('')
    const { postState, postDispatch } = usePostState();
    const [crop, setCrop] = useState({
        x: 0,
        y: 0
    });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const onClose = () => {
        postDispatch({ type: "CLOSE_MODAL" });
        document.body.style.overflow = "unset";
    }

    const onPrev = () => {
        postDispatch({
            type: "CHANGE_ORDER",
            uploadPage: 1
        });
    }

    const cropImage = async () => {
        try {
            const { file, url } = await getCroppedImg(postState.imageUrl, croppedAreaPixels)
            postDispatch({
                type: 'CROP_POSTED',
                imageUrl: file,
                showImg: url,
                uploadPage: 3
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <SecondModalStyle>
            <div
                className="plus-modal__nav">
                {postState.uploadPage === 2 &&
                    <IoIosArrowRoundBack
                        className="plus-modal__btn plus-modal__btn-left"
                        onClick={onPrev} />
                }
                <p>자르기</p>
                <button
                    className='plus-modal__btn-submit'
                    onClick={cropImage}>
                    다음
                </button>
                <IoCloseOutline
                    className="plus-modal__btn plus-modal__btn-right"
                    onClick={onClose} />
            </div>
            <div
                className='modal__crop-wrapper'>
                <Cropper
                    image={postState.imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onZoomChange={setZoom}
                    onCropChange={setCrop}
                    onCropComplete={cropComplete}
                />
            </div>
        </SecondModalStyle>
    )
}

export default SecondModal

const SecondModalStyle = styled.div`
    width: 700px;
    height: 700px;
    background-color: white;
    border-radius: 10px;

    .modal__crop-wrapper {
        height: 646px;
        width: auto;
        position: relative;
    }

    
`