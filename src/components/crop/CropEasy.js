import React from 'react'
import { useState } from 'react'
import Cropper from 'react-easy-crop'

const CropEasy = ({photoURL}) => {
    const [crop, setCrop] = useState({
        x:0,
        y:0
    });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

  return (
    <>
        <div>
            <Cropper
                image={photoURL}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onZoomChange={setZoom}
                onCropChange={setCrop}
                onCropComplete={cropComplete}
            />
        </div>
    </>
  )
}

export default CropEasy
