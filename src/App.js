import React from "react";
import "./App.css";
import WebcamCapture from "./Components/WebcamCapture";
import Preview from "./Components/Preview";
import Chats from "./Components/Chats";
import Button from "@material-ui/core/Button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { isMobile } from "react-device-detect";
// {isMobile && <div> This content is available only on mobile</div>}
function App() {
  return (
    <div className="App">
      <Router>
        <div className="app__body">
          <Routes>
            <Route path="chats" element={<Chats />} />
            <Route path="preview" element={<Preview />} />
            <Route exact path="/" element={<WebcamCapture />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
