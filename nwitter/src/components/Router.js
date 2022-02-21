import React, { useState } from 'react';
import { Route, Routes, Router, Navigate }from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ isLoggedIn }) => {

return (   
        <Routes>
            {/* Navigation이 존재하려면 로그인 상태 */}
            <Route>
                {isLoggedIn ? 
                <>  <Route path="/" element={<Navigation />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/" element={<Navigate replace to="/"/>} />
                </>
                :  
                <>
                    <Route path="/" element={<Auth />} />
                </>} 
            </Route>
        </Routes>
    )
}

export default AppRouter;