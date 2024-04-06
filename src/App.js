import React, { useState, useRef  } from 'react';
import axios from 'axios';
import "./styles/App.css";
import MyButton from "./components/UI/MyButton/MyButton";
import MyInput from "./components/UI/MyInput/MyInput";
import Header from "./components/UI/Header/Header";

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const fileInputRef = useRef();

    const handleFileChange = (event) => {
        const files = event.target.files;
        setSelectedFiles(files);
    };

    const handleUploadClick = (event) => {
        event.preventDefault();
        fileInputRef.current.click();
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
  
            const response = await axios.post('http://localhost:8080/upload', formData, {
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
            <Header/>
            <MyButton onClick={handleUploadClick} children={"Загрузить файлы"}/>
            <MyInput ref={fileInputRef} onChange={handleFileChange}/>
            <MyButton onClick={handleUpload} children={"Отправить файлы"}/>
        </div>
    )
}

export default App;
