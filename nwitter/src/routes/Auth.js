import { authService, firebaseIntance } from 'fbase';
import { getAuth, GithubAuthProvider, signInWithPopup,
    GoogleAuthProvider, signInWithEmailAndPassword, 
    createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState(false);

    const onChange = (event) => { // 무슨 일이 일어났는지
        const {target: {name, value}} = event;
        

        if (name === "email") {
            setEmail(value)
        } 
        else if (name === "password") {
             setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault(); // 기본 행위 실행 X
        try {
            let data;
            if (newAccount) { // 두 상황 모두 로그인 O 
                // 새 계정 생성
                // createUserWithEmailAndPassword
                const auth = getAuth();
                data = await createUserWithEmailAndPassword(
                    auth, email, password
                )        
                // data = await authService.createUserWithEmailAndPassword (
                //     email, password
                // );
            } else {
                // 로그인
                const auth = getAuth();
                data = await signInWithEmailAndPassword (
                    auth, email, password
                );
            } 
            console.log(data);

        } catch(error) {
            setError(error.message);
            console.log(error.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);
    // newAccount의 이전 값을 가져와서 그 값의 반대되는값을 리턴

    const onSocialClick = async (event) => {
        const {target : {name}} = event;
        let provider;

        if (name === 'google') {
            provider = new GoogleAuthProvider();
        } else if (name === 'github') {
            provider = new GithubAuthProvider();
        }
        const data = await signInWithPopup(authService, provider);
        console.log(data);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder='Email' 
                    required value={email} onChange={onChange} />
                <input name="password" type="password" placeholder='Password' 
                    required value={password} onChange={onChange}/>
                <input type="submit" value={newAccount ? 'create new account' : 'Log in'} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create new account"} </span>
            <div>
                <button onClick={onSocialClick} name="google">Google로 시작하기</button>
                <button onClick={onSocialClick} name="github">Github로 시작하기</button>
            </div>


        </div>
    )
}

export default Auth;