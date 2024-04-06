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
                formData.append('images', selectedFiles[i]);
            }
  
            const response = await axios.post('http://localhost:8080/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });


            if (!response.ok) {
                throw new Error('Ошибка при получении изображения');
            }
            // Получаем заголовок Content-Type
            const contentType = response.headers.get('Content-Type');
            // Если тип содержимого не является изображением JPEG, выбрасываем ошибку
            if (!contentType || !contentType.includes('image/jpeg')) {
                throw new Error('Неподдерживаемый тип изображения');
            }
          
            // Преобразуем ответ в Blob (двоичные данные)
            console.log('Response:', response.data);
            response.blob();
            console.log('Response:', response.data);
            
            // Создаем URL для изображения
            const imageUrl2 = URL.createObjectURL(response.blob());
              
            // Создаем элемент изображения и отображаем его на странице
            const imageElement2 = document.createElement('img');
            imageElement2.src = imageUrl2;
            document.body.appendChild(imageElement2);
            

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
