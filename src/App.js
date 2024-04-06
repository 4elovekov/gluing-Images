import React, { useState } from 'react';
//import axios from 'axios';
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
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('image', selectedFiles[i]);
        }

        // fetch('http://localhost:8080/upload', {
        //     method: 'POST',
        //     body: formData,
        //     headers: {
        //         'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'
        //     }
        //   })
        //   .then(response => response.blob())
        //   .then(blob => {
        //     const imageUrl = URL.createObjectURL(blob);
        //     console.log(imageUrl)
        //     const imageElement = document.createElement('img');
        //     imageElement.src = imageUrl;
        //     document.body.appendChild(imageElement);
        //   })
        //   .catch(error => console.error('Ошибка:', error));
    
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
                }, responseType: "image/jpeg"
            });
            const res = response.blob
            let imageUrl = URL.createObjectURL(response.blob);
            console.log(imageUrl)
            imageUrl = URL.createObjectURL(response.blob);
            console.log(imageUrl)
            imageUrl = URL.createObjectURL(res);
            console.log(imageUrl)
            // Делайте что-то с imageUrl, например, присвойте его src свойству изображения.
            // console.log(response)
            // console.log(response.data)
            // const blobb = new Blob([response.data], {
            //     type: "image/jpeg",
            // });
            // console.log(blobb)
            // try {
            //     const url = URL.createObjectURL(blobb);
            //     console.log("{image: url}", {image: url})
            //     console.log("url", url)
            // } catch {

            // }
            // const base64String = response.data;
            // console.log("base64String", base64String)
            // const byteCharacters = atob(base64String);
            // console.log("byteCharacters", byteCharacters)
            // let byteArray = new Uint8Array(byteCharacters.length);
            // console.log("byteArray", byteArray)
            // for (var i = 0; i < byteCharacters.length; i++) {
            //     byteArray[i] = byteCharacters.charCodeAt(i);
            // }
            // const blob = new Blob([byteArray], { type: 'image/png' });
            // try {
            //     const imageUrl = URL.createObjectURL(blob);
            //     const img = document.createElement('img');
            //     img.src = imageUrl;
            //     document.body.appendChild(img)
            // } catch {

            // }

            // const base64String2 = btoa(
            //     new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
            // );
            // //Создаем URL для изображения
            // const imageUrl2 = URL.createObjectURL(response.data.blob());
            // const imageUr3 = `data:${response.headers['content-type']};base64,${base64String2}`
            // console.log("imageUrl2", imageUrl2)
            // console.log("imageUr3", imageUr3)
            // // Создаем элемент изображения и отображаем его на странице
            // // const imageElement = document.createElement('img');
            // // imageElement.src = imageUrl;
            // // document.body.appendChild(imageElement);

            // console.log(response)
            // console.log(response.data?.blob())
            // console.log(response.request)
            

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
