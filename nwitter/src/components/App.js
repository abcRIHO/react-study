import AppRouter from "./Router";
import { useState } from "react";
import { authService } from "../fbase";

function App() {
  console.log(authService.currentUser);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>

      <AppRouter isLoggedIn={isLoggedIn} />
      <footer> &copy; Nwitter {new Date().getFullYear()}</footer>
    </div>
  );
}

export default App;
