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
            const base64String = response.data;
            const byteCharacters = atob(base64String);
            let byteArray = new Uint8Array(byteCharacters.length);
            for (var i = 0; i < byteCharacters.length; i++) {
                byteArray[i] = byteCharacters.charCodeAt(i);
            }
            const blob = new Blob([byteArray], { type: 'image/png' });
            var imageUrl = URL.createObjectURL(blob);
            var img = document.createElement('img');
            img.src = imageUrl;
            document.body.appendChild(img)

            // const base64String = btoa(
            //     new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            // );
            // Создаем URL для изображения
            //const imageUrl = URL.createObjectURL(response.data.blob());
            // const imageUrl = `data:${response.headers['content-type']};base64,${base64String}`
              
            // // Создаем элемент изображения и отображаем его на странице
            // const imageElement = document.createElement('img');
            // imageElement.src = imageUrl;
            // document.body.appendChild(imageElement);
            console.log(response)
            console.log(response.data?.blob())
            console.log(response.request)
            

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
            <MyButton onClick={handleUpload} children={"СКЛЕИТЬ"}/>
        </div>
    )
}

export default App;
