import React, { useState } from 'react'
import { CloseOutlined } from "@ant-design/icons";
import {
    Link,
    useNavigate
} from 'react-router-dom';

function RegistrationForm() {
    const history = useNavigate();
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [error3, setError3] = useState('');
    const [error4, setError4] = useState('');
    const [inpval, setInpval] = useState({
        name: "",
        email: "",
        password: "",
        repassword: ""
    })

    const [data] = useState([]);
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

    const reg = (e) => {
        e.preventDefault();

        const { name, email, password, repassword } = inpval;
        if (name === "") {
            setError('Введите ваше имя!');
        }
        else if (email === "") {
            setError('')
            setError2('Введите ваш email!');
        } else if (!email.includes("@")) {
            setError2('Email некорректный!');
        }
        else if (password === "") {
            setError2('')
            setError3('Придумайте и введите пароль');
        } else if (password.length < 5) {
            setError3('В пароле должно быть не менее 5 символов');
        }
        else if (repassword === "") {
            setError3('')
            setError4('Повторите пароль!');
        } else if (repassword !== password) {
            setError4('Пароли не совпадают!');
        }
        else {
            setError4('')
            history("/login")
            console.log("data added succesfully");
            localStorage.setItem("user", JSON.stringify([...data, inpval]));
        }

    }

    return (
        <section className="registration">
            <div className="registration-block">
                <div className="registration-block__header">
                    <Link to="/" className="registration-block__close close__button">
                        <CloseOutlined />
                    </Link>
                </div>
                <form className="registration-form">
                    <p className="registration-form__point">
                        <span className="registration-form__span">Имя:</span>
                        <input className="registration-form__input" onChange={getdata} placeholder="Введите ваше имя" type="username" id="username" name="name" />
                    </p>
                    {error && <h3 className="block-questions__error">{error}</h3>}
                    <p className="registration-form__point">
                        <span className="registration-form__span">Email:</span>
                        <input className="registration-form__input" onChange={getdata} placeholder="Введите ваш email" type="email" id="email" name="email" />
                    </p>
                    {error2 && <h3 className="block-questions__error">{error2}</h3>}
                    <p className="registration-form__point">
                        <span className="registration-form__span">Пароль:</span>
                        <input className="registration-form__input" onChange={getdata} placeholder="Пароль" type="password" id="password" name="password" />
                    </p>
                    {error3 && <h3 className="block-questions__error">{error3}</h3>}
                    <p className="registration-form__point">
                        <span className="registration-form__span">Повторите пароль:</span>
                        <input className="registration-form__input" onChange={getdata} placeholder="Повторите пароль" type="password" id="password2" name="repassword" />
                    </p>
                    {error4 && <h3 className="block-questions__error">{error4}</h3>}
                    <button className="registration-form__button" onClick={reg}>Зарегистрироваться</button>
                </form>
            </div>
        </section>
    )
}
export default RegistrationForm;