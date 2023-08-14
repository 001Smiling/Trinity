import React, { useState, useEffect } from 'react';
import logo from '../../Image/logo.png'
import {
    useNavigate, Link
} from 'react-router-dom';

function Nav() {
    const history = useNavigate();
    const userlogout = () => {
        localStorage.removeItem("user_login")
        history("/");
        window.location.reload();
    }
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('user_login');
        if (isLoggedIn) {
            setLoggedIn(true);
        }
    }, []);
    return (
        <>
            <div className="header-container__up">
                <nav className='header-nav'>
                    {loggedIn ? (<>
                        <div className="header-nav__logo-block">
                            <div className="header-nav__logo1">
                                <Link to="/"><img src={logo} className="header-nav__logo" alt="logo" /></Link>
                            </div>
                            <Link to="/" className="header-nav__profile">Личный кабинет</Link>
                            <Link to="/list" className="header-nav__profile">Автопарк</Link>
                        </div>
                        <div className="header-nav__regandlog-block">
                            <div onClick={userlogout} className="header-nav__regandlog">Выход</div>
                        </div>
                    </>
                    ) : (<>
                        <div className="header-nav__logo-block ">
                            <div className="header-nav__logo1">
                                <Link to="/"><img src={logo} className="header-nav__logo header-nav" alt="logo" /></Link>
                            </div>
                            <Link to="/profile" className="header-nav__profile">Личный кабинет</Link>
                            <Link to="/list" className="header-nav__profile">Автопарк</Link>
                        </div>
                        <div className="header-nav__regandlog-block">
                            <Link to="/register" className="header-nav__regandlog">Регистрация</Link>
                            <Link to="/login" className="header-nav__regandlog">Вход</Link>
                        </div>
                    </>
                    )}
                </nav>
            </div>
        </>
    );
}

export default Nav;