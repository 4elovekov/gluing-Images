import React from 'react';
import cl from './MyLink.module.css';

const MyLink = ({children, href, download}) => {
    return (
        <a href={href} download={download} className={cl.MyLink}>
            {children}
        </a>
    );
};

export default MyLink;