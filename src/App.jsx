import React from 'react';
import NavBar from "./components/NavBar";
import {Route, Routes} from 'react-router-dom';
import List from "./components/List";
import {publicRoutes} from "./router/routes";


const App = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                {publicRoutes.map(({path, Component}, index) =>
                    <Route key={index} path={path} element={<Component/>}/>
                )}
            </Routes>
        </>
    );
}

export default App;
