import React from "react";
import cl from "./MyInput.module.css";

function MyInput(props) {

    return (
        <input 
            className={cl.MyInput} 
            type="file"
            multiple
            accept="image/jpeg, image/png"
            placeholder="Выберите файлы формата JPG или PNG"
            {...props}
        />
    )
}

export default MyInput;
