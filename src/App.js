import React, { useEffect, useRef, useState } from 'react';
import "./styles/App.css";
import MyButton from "./components/UI/MyButton/MyButton";
import Header from "./components/UI/Header/Header";
import ImageUploader from './components/UI/ImageUploader/ImageUploader';
import ResultDisplay from './components/UI/ResultDisplay/ResultDisplay';
import { dragHandler } from './handlers/dragHandler';

function App() {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [selectedUrls, setSelectedUrls] = useState([]);
    const [resultImageUrl, setResultImageUrl] = useState();
    const [isLoading, setIsLoading] = useState(false)
    const app = useRef();

    useEffect(() => {
        dragHandler(app.current, handleFileDrop)
    }, [])

    const handleFileDrop = (event) => {
        let files = Array.from(event.dataTransfer.files);
        files = files?.slice(0, 2)
        setSelectedFiles(files)
        const urls = files.map(file => URL.createObjectURL(file));
        setSelectedUrls(urls);
    };

    const handleFileChange = (event) => {
        let files = Array.from(event.target.files);
        files = files?.slice(0, 2)
        setSelectedFiles(files)
        const urls = files.map(file => URL.createObjectURL(file));
        setSelectedUrls(urls);
    };

    const handleUpload = async () => {
        setIsLoading(true)
        if (selectedFiles.length === 0) {
            console.error('No files selected.');
            return;
        }
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('image', selectedFiles[i]);
        }

        fetch('https://19d4-88-205-170-194.ngrok-free.app/upload', {
            method: 'POST',
            body: formData,
        })
            .then(response => response.blob())
            .then(blob => {
                const imageUrl = URL.createObjectURL(blob);
                setResultImageUrl(imageUrl);
                setIsLoading(false)
            })
            .catch(error => console.error('Ошибка:', error));
    };

    return (
        <div ref={app} className="App">
            <Header/>
            <ImageUploader
                images={selectedUrls}
                setImages={setSelectedUrls}
                handleChange={handleFileChange}
            />
            <MyButton onClick={handleUpload} children={"Склеить"}/>
            <ResultDisplay 
                isLoading={isLoading} 
                setIsLoading={setIsLoading} 
                resultImageUrl={resultImageUrl}
            />
        </div>
    )
}

export default App;
