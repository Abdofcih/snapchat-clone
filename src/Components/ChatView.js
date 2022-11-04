import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectSelectedImage } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import "./chatView.css";
const ChatView = () => {
  const navigate = useNavigate();
  const selectedImage = useSelector(selectSelectedImage);

  useEffect(() => {
    if (!selectedImage) exit();
  }, [selectedImage]);
  const exit = () => {
    navigate("/chats");
  };
  return (
    <div className="chatView">
      <div className="chatView__timer">
        <CountdownCircleTimer
          isPlaying
          duration={7}
          strokeWidth={6}
          size={50}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
        >
          {({ remainingTime }) => {
            if (remainingTime == 0) exit();
            return remainingTime;
          }}
        </CountdownCircleTimer>
      </div>
      <img src={selectedImage} alt="" className="view__image" onClick={exit} />
    </div>
  );
};

export default ChatView;
