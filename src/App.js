import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./App.css";
import WebcamCapture from "./Components/WebcamCapture";
import Preview from "./Components/Preview";
import Chats from "./Components/Chats";
import ChatView from "./Components/ChatView";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { selectUser, login, logout } from "./features/appSlice";
import Login from "./Components/Login";
import { auth } from "./firebase";
import SnapLogo from "./Components/SnapLogo";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        dispatch(
          login({
            username: authUser.user.displayName,
            profilePic: authUser.user.photoURL,
            id: authUser.user.uid
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <SnapLogo />
            <div className="app__body">
              <div className="app__bodyBackground">
                <Routes>
                  <Route path="chats/view" element={<ChatView />} />
                  <Route path="chats" element={<Chats />} />
                  <Route path="preview" element={<Preview />} />
                  <Route exact path="/" element={<WebcamCapture />} />
                </Routes>
              </div>
            </div>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
