import React, { useState } from 'react';
import { Route, Routes }from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

const AppRouter = ({ isLoggedIn }) => {

return (   
    <Routes>
        <Route>
            {isLoggedIn ? 
            <>  
                <Route path="/" element={<Home />} />
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