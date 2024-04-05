import React, { useState } from 'react';
import axios from 'axios';
import "./styles/App.css";
import MyButton from "./components/UI/MyButton/MyButton";
import MyInput from "./components/UI/MyInput/MyInput";

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };
  
    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            console.error('No files selected.');
            return;
        }
  
        try {
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('images', selectedFiles[i]);
            }
  
            const response = await axios.post('myapi', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <MyInput onChange={handleFileChange}/>
            <input type="file" onChange={handleFileChange} multiple accept="image/jpeg, image/png"/>
            <MyButton onClick={handleUpload} children={"Отправить"}/>
        </div>
    )
}

export default App;
