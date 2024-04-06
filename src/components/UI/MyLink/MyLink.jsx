import React from "react";
import cl from "./MyLink.module.css";

const MyLink = ({children, ...props}) => {
    return (
        <a 
            //href="#"  
            className={cl.MyButton}
            {...props}
        >
            {children}
        </a>
    );
};

export default MyLink;
