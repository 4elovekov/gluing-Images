import React from 'react';
import cl from "./ImageContainer.module.css";

const ImageContainer = ({width="100px", images, ...props}) => {
    return (
        <div className={cl.imagesContainer}>
            <img alt="Preview" src={images[0]}/>
            {console.log(images[0])}
            {/* {images.map((image, index) => 
                <img 
                    key={index} 
                    src={image} 
                    alt="Preview" 
                    style={{ width: width, height: '100px', marginRight: '10px' }} 
                />
            )} */}
        </div>
    );
};

export default ImageContainer;