import React, {useState} from 'react';
import NavBar from "./components/NavBar";
import {Route, Routes} from 'react-router-dom';
import {publicRoutes} from "./router/routes";
import {AuthContext} from './context';


const App = () => {
    const [isOperator, setIsOperator] = useState(false)

    return (
        <>
            <AuthContext.Provider value={{isOperator, setIsOperator}}>
                <NavBar/>
                <Routes>
                    {publicRoutes.map(({path, Component}, index) =>
                        <Route key={index} path={path} element={<Component/>}/>
                    )}
                </Routes>
            </AuthContext.Provider>
        </>
    );
}

export default App;
