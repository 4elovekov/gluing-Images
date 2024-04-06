import React, { useRef } from 'react';
import cl from "./ImageUploader.module.css"
import MyInput from '../MyInput/MyInput';
import ImageCard from '../ImageCard/ImageCard';

function ImageUploader({images, setImages, handleChange}) {
    const fileInputRef = useRef();

    const handleUploadClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
    };

    return (
    <div className={cl.imageUploader}>
        <MyInput ref={fileInputRef} onChange={handleChange}/>
        {images[0]
        ? 
        <div className={cl.imageUploader__images}>
            {images.map((image, index) => (
                <div key={index} className={cl.imageUploader__block}>
                    <img 
                        className={cl.imageUploader__image}
                        key={index} 
                        src={image} 
                        alt="Preview" 
                        onClick={handleUploadClick}
                    />
                </div>
            ))}
        </div>
        :   
        <div className={cl.imageUploader__images}>
            <ImageCard key="image1"
                children={<img style={{height: "120px", cursor:"pointer"}} onClick={handleUploadClick} src="./images/file.png" alt="Upload file"/>}
            />
            <ImageCard key="image2"
                children={<img style={{height: "120px", cursor:"pointer"}} onClick={handleUploadClick} src="./images/file.png" alt="Upload file"/>}
            />
        </div>
        }
    </div>
    
    );
}

export default ImageUploader;