import React from 'react';
import cl from "./Header.module.css"

const Header = () => {

    return (
        <header className={cl.header}>
                <div className={cl.header__links}>
                    <a href="/">Znolpa IT</a>
                    <a href="/"><span>Image stithcing</span></a>
                </div>
                <div className={cl.header__line}></div>
        </header>
    );
};

export default Header;