import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService } from "../fbase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false); // 아직 초기화 X
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => { // 사용자의 로그인 상태 변화 관찰
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => { // callback 필요
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      // init가 false라면 router를 숨김
    })
  }, [])

  return (
    <div>
     {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : 
     "Initializing..."}
      <footer> &copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
