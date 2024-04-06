import React, { useRef } from 'react';
import cl from "./ImageUploader.module.css"
import MyInput from '../MyInput/MyInput';
//import MyButton from '../MyButton/MyButton';

function ImageUploader({images, setImages, handleChange}) {
    const fileInputRef = useRef();

    const handleUploadClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

  return (
    <div className={cl.imageUploader}>
        <MyInput ref={fileInputRef} onChange={handleChange}/>
        <img 
            style={{height: "50px", cursor:"pointer"}}
            onClick={handleUploadClick} 
            src="./images/file.png"
            alt="Upload file"
        />
        <img 
            style={{height: "50px", cursor:"pointer"}}
            onClick={handleUploadClick} 
            src="./images/file.png"
            alt="Upload file"
        />
        <div className={cl.imageUploader__images}>
            {images.map((image, index) => (
                <div className={cl.imageUploader__block}>
                    <img 
                        className={cl.imageUploader__image}
                        key={index} 
                        src={image} 
                        alt="Preview" 
                    />
                </div>
            ))}
        </div>
    </div>
  );
}

export default ImageUploader;