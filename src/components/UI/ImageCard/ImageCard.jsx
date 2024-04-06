import React from 'react';
import cl from "./ImageCard.module.css"

function ImageCard({children, ...props}) {

    return (
        <div className={[cl.imageCard, props.className].join(" ")}>
            {children}
        </div>
    );
}

export default ImageCard;