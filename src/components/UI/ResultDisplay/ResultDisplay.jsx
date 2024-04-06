import React from 'react';
import cl from "./ResultDisplay.module.css"
import ImageCard from '../ImageCard/ImageCard';
import MyLink from '../MyLink/MyLink';
import Loader from '../Loader/Loader';

const ResultDisplay = ({isLoading, setIsLoading, resultImageUrl}) => {
    const res = resultImageUrl ? setIsLoading(false) : null;
    console.debug(res)
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
                    : <Loader active={isLoading}/>
                    // <img 
                    //     src="./images/file.png" 
                    //     alt="Upload file"
                    //     style={{width:"80px", display:"none"}}
                    // />
                }
            />
            <div className={cl.resultDisplay__buttons}>
                <MyLink href={resultImageUrl} download={"result.jpg"}>
                    Скачать
                </MyLink>
                <MyLink href={"/"}>
                    Загрузить заново
                </MyLink>
            </div>
        </div>
    );
};

export default ResultDisplay;