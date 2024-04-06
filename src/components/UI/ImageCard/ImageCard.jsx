import React from 'react';
import cl from "./ImageCard.module.css"

function ImageCard({children, ...props}) {

    return (
        <div {...props} className={cl.imageCard}>
            {children}
        </div>
    );
}

export default ImageCard;