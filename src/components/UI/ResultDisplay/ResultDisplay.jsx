import React from 'react';
import cl from "./ResultDisplay.module.css"
import ImageCard from '../ImageCard/ImageCard';
import MyButton from '../MyButton/MyButton';

const ResultDisplay = ({resultImageUrl}) => {
    return (
        <div className={cl.resultDisplay}>
            <h1>Результат</h1>
            <ImageCard 
                className={cl.resultDisplay__imageCard}
                children={
                    resultImageUrl
                    ? <img
                        src={resultImageUrl}
                        alt="Upload file"
                    />
                    : <img 
                        src="./images/file.png" 
                        alt="Upload file"
                    />
                }
            />
            <div className={cl.resultDisplay__buttons}>
                <MyButton>
                    Скачать
                </MyButton>
                <MyButton>
                    Загрузить заново
                </MyButton>
            </div>
        </div>
    );
};

export default ResultDisplay;