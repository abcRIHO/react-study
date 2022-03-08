import React, { useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useNavigate } from 'react-router-dom';
import { updateProfile } from 'firebase/auth';

const Profile = ({ refreshUser, userObj }) => {
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const navigate = useNavigate();

    const onLogOutClick = () => {
        authService.signOut()
        navigate('/');
    };

    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        setNewDisplayName(value);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName) {
           // await updateProfile(userObj, { displayName: newDisplayName });
           await updateProfile(authService.currentUser, { displayName: newDisplayName});
           refreshUser();
        }
        
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder='Display Name' value={newDisplayName} />
                <input type="submit" value="Update Profile" /> 
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
}

export default Profile;