import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import useLocalStorage from "./localstorage/useLocalStorage";
import Backend from "./api";
import jwt from "jsonwebtoken";
import './App.css';
import Routes from "./Routes/Routes";
import UserContext from "./auth/UserContext";

export const TOKEN_STORAGE_ID = "user-token";

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUser() {
    async function getCurrentUser(){
      if(token){
        try{
          let { username } = jwt.decode(token);
          Backend.token = token;
          let currentUser = await Backend.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          setCurrentUser(null);
        }
      }
      setInfoLoaded(false);
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  async function login(loginData){
    try {
      let token = await Backend.login(loginData);
      setToken(token);
      return { success: true};
    } catch (err) {
      console.error("login failed", err);
      return { success: false, err};
    }
  }

  async function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  async function singup(singupData){
    try {
      let token = await Backend.singup(singupData);
      setToken(token);
      return { success: true };
    } catch (err) {
      console.error("singup failed", err);
      return { success: false, err}
    }
  }

  
  return (
    <BrowserRouter>
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
    <div className="app">
    <Routes login={login} singup={singup} />
    </div>
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
