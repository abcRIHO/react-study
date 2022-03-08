import AppRouter from "./Router";
import { useEffect, useState } from "react";
import { authService } from "../fbase";
import { getAuth, onAuthStateChanged, updateProfile } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false); // 아직 초기화 X
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => { // 사용자의 로그인 상태 변화 관찰
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => { // callback 필요
      if (user) {
        setIsLoggedIn(true);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
      // init가 false라면 router를 숨김
    })
  }, []);

  const refreshUser = () => {
    // firebase의 정보로 react.js를 업데이트
    // user를 새로고침하는 함수
    const user = authService.currentUser;

    console.log(authService.currentUser.displayName);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => updateProfile(user, { displayName: user.displayName}),
    });
  }

  return (
    <div>
     {init ? <AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj} /> : 
     "Initializing..."}
    </div>
  );
}

export default App;
