import React from "react";
import cl from "./MyInput.module.css";

const MyInput = React.forwardRef((props, ref) => {
    return (
        <input 
            ref={ref} 
            type="file"
            multiple
            accept="image/jpeg, image/png"
            placeholder="Выберите файлы формата JPG или PNG"
            className={cl.MyInput} 
            {...props}
        />
    );
});

export default MyInput;
