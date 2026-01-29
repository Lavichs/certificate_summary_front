import React, {useContext} from 'react';
import UserService from "../api/UserService";
import {AuthContext} from "../context";

const AuthPage = () => {
    const {isOperator, setIsOperator} = useContext(AuthContext)

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            await UserService.login({
                "login": event.target.login.value,
                "password": event.target.password.value
            })
            setIsOperator(true)
        } catch (e) {
            // console.log(e.response.status)
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{minHeight: '80vh'}}>
            <form className="border border-primary rounded-3 p-5" onSubmit={handleSubmit}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Логин</span>
                    <input id="login" type="text" name="login" className="form-control" placeholder="Логин"
                           required/>
                    <div className="invalid-feedback">
                        Это обязательное поле
                    </div>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">Пароль</span>
                    <input id="password" type="password" name="password" className="form-control" placeholder="Пароль"
                           required/>
                    <div className="invalid-feedback">
                        Это обязательное поле
                    </div>
                </div>
                <div className="form-group d-flex justify-content-end">
                    <button type="submit" className="btn btn-success w-50">Войти</button>
                </div>
            </form>
        </div>
    );
};

export default AuthPage;