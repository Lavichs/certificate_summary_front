import React, {useContext} from 'react';
import {AUTHORIZATION_ROUTE, ANALYTICS_ROUTE, ADMIN_ROUTE, HOME_ROUTE} from '../consts';
import {Link, useNavigate} from 'react-router-dom';
import {AuthContext} from "../context";

const NavBar = () => {
    const {isOperator, setIsOperator} = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className='nav-item'>
                            <Link className='nav-link' to={HOME_ROUTE}>Главная</Link>
                        </li>
                        {
                            isOperator && <>
                                <li className='nav-item'>
                                    <Link className='nav-link' to={ANALYTICS_ROUTE}>Аналитика</Link>
                                </li>
                                <li className='nav-item'>
                                    <Link className='nav-link' to={ADMIN_ROUTE}>Админка</Link>
                                </li>
                            </>
                        }

                    </ul>
                    <div className="d-flex">
                        {isOperator
                            ?
                            <button className='btn btn-danger' onClick={() => {
                                setIsOperator(false);
                                navigate(HOME_ROUTE)
                            }}>Выйти</button>
                            :
                            <button className='btn btn-outline-success' onClick={() => {
                                navigate(AUTHORIZATION_ROUTE)
                            }}>Войти</button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;