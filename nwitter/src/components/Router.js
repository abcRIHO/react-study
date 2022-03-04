import React from 'react';
import { Route, Routes, Navigate }from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn, userObj }) => {

    return (   
        <> 
            {/* * Navigation이 존재하려면 로그인 상태 */}
            { isLoggedIn && <Navigation />}
            <Routes>
                <Route>
                    {isLoggedIn ? 
                    <>  
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/" element={<Home userObj={userObj} />} />
                        <Route path="/" element={<Navigate replace to="/"/>} />
                    </>
                    :  
                    <>
                        <Route path="/" element={<Auth />} />
                    </>} 
                </Route>
            </Routes>
        </>
    )
}

export default AppRouter;