import React, { useState } from 'react';
import "./styles/App.css";
import MyButton from "./components/UI/MyButton/MyButton";
import Header from "./components/UI/Header/Header";
import ImageUploader from './components/UI/ImageUploader/ImageUploader';
import ResultDisplay from './components/UI/ResultDisplay/ResultDisplay';

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [resultImage, setResultImage] = useState();

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
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('image', selectedFiles[i]);
        }

        fetch('http://localhost:8080/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.blob())
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                console.log(imageUrl)
                const imageElement = document.createElement('img');
                imageElement.src = imageUrl;
                setResultImage(imageElement);
            })
            .catch(error => console.error('Ошибка:', error));
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
            <ResultDisplay resultImage={resultImage}/>
        </div>
    )
}

export default App;
