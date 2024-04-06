import React from 'react';
import cl from './Loader.module.css';

const Loader = (active) => {
    return (
        <div 
            style={{display:"flex", alignItems:"center", justifyContent:"center"}}
        >
            <div className={[cl.loader, active.active ? cl.active : "notActive"].join(" ")}/>
        </div>
    );
};

export default Loader;