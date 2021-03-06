import React from 'react';
import { Route, Routes, Navigate }from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';
import Navigation from './Navigation';
import Profile from 'routes/Profile';

const AppRouter = ({ refreshUser, isLoggedIn, userObj }) => {

    return (   
        <> 
            {/* * Navigation이 존재하려면 로그인 상태 */}
            { isLoggedIn && <Navigation userObj={userObj} />}
            <div
            style={{
              maxWidth: 890,
              width: "100%",
              margin: "0 auto",
              marginTop: 80,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Routes>
                <Route>
                    {isLoggedIn ? 
                    <>  
                        <Route path="/profile" element={<Profile 
                            userObj={userObj} refreshUser={refreshUser}/>} />
                        <Route path="/" element={<Home userObj={userObj} />} />
                        <Route path="/" element={<Navigate replace to="/"/>} />
                    </>
                    :  
                    <>
                        <Route path="/" element={<Auth />} />
                    </>} 
                </Route>
            </Routes>
            </div>
        </>
    )
}

export default AppRouter;