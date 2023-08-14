import React, { useState } from 'react';
import { CloseOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom'
import {
    Link
} from 'react-router-dom';

function LogIn({ onLogin }) {
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [inpval, setInpval] = useState({
        email: "",
        password: ""
    })
    const history = useNavigate();
    console.log(inpval);

    const getdata = (e) => {
        const { value, name } = e.target;
        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })

    }
    const login = (e) => {
        e.preventDefault();
        onLogin()
        const getuserdata = localStorage.getItem("user");
        console.log(getuserdata);

        const { email, password } = inpval;
        if (email === "") {
            setError('Введите ваш email!');
        } else if (!email.includes("@")) {
            setError('Email некорректный!');
        } else if (password === "") {
            setError('')
            setError2('Придумайте и введите пароль');
        } else if (password.length < 5) {
            setError('В пароле должно быть не менее 5 символов');
        } else {
            setError2('')
            if (getuserdata && getuserdata.length) {
                const userdata = JSON.parse(getuserdata);
                const userlogin = userdata.filter((el, k) => {
                    return el.email === email && el.password === password
                });

                if (userlogin.length === 0) {
                    alert("Пользователь не найден")
                } else {
                    console.log("Пользователь залогинился");
                    localStorage.setItem("user_login", JSON.stringify(userlogin))
                    history("/profile")
                }
            }

        }
    }

    return (
        <section className="login">
            <div className="login-block">
                <div className="login-block__header">
                    <Link to="/" className="login-block__close close__button">
                        <CloseOutlined />
                    </Link>
                </div>
                <form className="login-form">
                    <p className="login-form__point">
                        <span className="login-form__span">Email:</span>
                        <input className="login-form__input" onChange={getdata} placeholder="Введите email" type="email" id="email" name="email" />
                    </p>
                    {error && <h3 className="block-questions__error">{error}</h3>}
                    <p className="login-form__point">
                        <span className="login-form__span">Пароль:</span>
                        <input className="login-form__input" onChange={getdata} placeholder="Введите пароль" type="password" id="password" name="password" />
                    </p>
                    {error2 && <h3 className="block-questions__error">{error2}</h3>}
                    <button className="login-form__button login-form__btn-log" onClick={login} >
                        <span className="header-menu__login-arrow login-arrow"><ArrowRightOutlined /></span>
                        Войти
                    </button>
                </form>
                <Link to="/register">
                    <button className="login-form__button login-form__btn-reg" >
                        Регистрация
                    </button>
                </Link>
            </div>
        </section>
    )
}
export default LogIn;
