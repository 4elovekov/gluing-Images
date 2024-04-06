import React, { useState } from 'react';
import axios from 'axios';
import "./styles/App.css";
import MyButton from "./components/UI/MyButton/MyButton";
//import MyInput from "./components/UI/MyInput/MyInput";
import Header from "./components/UI/Header/Header";
import ImageUploader from './components/UI/ImageUploader/ImageUploader';

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedUrls, setSelectedUrls] = useState([]);

    const handleFileChange = (event) => {
        let files = Array.from(event.target.files);
        files = files?.slice(0, 2)
        console.log(files)
        setSelectedFiles(files)
        const urls = files.map(file => URL.createObjectURL(file));
        setSelectedUrls(urls);
    };

    const handleUpload = async () => {
        if (selectedFiles.length === 0) {
            console.error('No files selected.');
            return;
        }
    
        try {
            const formData = new FormData();
            for (let i = 0; i < selectedFiles.length; i++) {
                formData.append('image', selectedFiles[i]);
            }
            console.log(formData)
            for (const entry of formData.entries()) {
                console.log(entry[1]);
            }
  
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("response", response)
            console.log("response.data", response.data)
            console.log("response.data.entries()", response.data.entries())
            console.log("response.data.entries", response.data.entries)
            console.log("response.data.entries()[0]", response.data.entries()[0])
            console.log("response.data.entries()[1]", response.data.entries()[1])
            // Создаем URL для изображения
            const imageUrl = URL.createObjectURL(response.data.blob());
              
            // Создаем элемент изображения и отображаем его на странице
            const imageElement = document.createElement('img');
            imageElement.src = imageUrl;
            document.body.appendChild(imageElement);
            

            // console.log('Response:', response.data);
            // const imageUrl = response.data.imageUrl;
            // const imageElement = document.createElement('img');
            // imageElement.src = imageUrl;
            // document.body.appendChild(imageElement);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="App">
            <Header/>
            <ImageUploader
                images={selectedUrls}
                setImages={setSelectedUrls}
                handleChange={handleFileChange}
            />
            <MyButton onClick={handleUpload} children={"Отправить файлы"}/>
        </div>
    )
}

export default App;
