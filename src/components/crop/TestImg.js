import React from 'react'
import { useState } from 'react';
import CropEasy from './CropEasy';

const TestImg = () => {
    const [photoURL, setFileUrl] = useState('');
    const [openCrop, setOpenCrop] = useState(false);

    const handleChange = (e) => {
        const reader = new FileReader();
        // 받은 파일 중 첫 번째 파일만 가져온다.
        reader.readAsDataURL(e.target.files[0]);
        reader.onloadend = (finishedEvent) => {
            setFileUrl(finishedEvent.target.result);
        }
        setOpenCrop(true);
    }

    return (
        <div>
            {
                !openCrop ? (
                    <input
                        type="file"
                        onChange={handleChange} />
                ) : (
                    <CropEasy photoURL={photoURL} />
                )
            }

        </div>
    )
}

export default TestImg
