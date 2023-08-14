import Nav from '../Elements/Nav/Nav';
import React, { useState, useEffect } from 'react';

function StartPages() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [logindata, setLoginData] = useState([]);
    const Userdata = () => {
        const getuser = localStorage.getItem("user_login");
        if (getuser && getuser.length) {
            const user = JSON.parse(getuser);

            setLoginData(user);
        }
    }

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('user_login');
        if (isLoggedIn) {
            setLoggedIn(true);
        };
        Userdata();
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                <Nav />
                <div>
                    {loggedIn ? (
                        <div className="header-container__middle">
                            <p className="header-container__welcome">Добро пожаловать {logindata[0].name}!</p>
                        </div>
                    ) : (
                        <div className="header-container__middle">
                            <p className="header-container__welcome">Добро пожаловать!</p>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default StartPages;