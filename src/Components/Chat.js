import React from "react";
import StopRoundedIcon from "@material-ui/icons/StopRounded";

import { Avatar } from "@material-ui/core";
import "./Chat.css";

import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
//import ReactTimeAgo from "react-time-ago"; Error
import FormatData from "../utils/FormatData";
import { useDispatch } from "react-redux";
import { selectImage } from "../features/appSlice";
import { useNavigate } from "react-router-dom";

const Chat = ({ id, username, postImage, read, userPicture, timestamp }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(username, timestamp);

  const open = () => {
    dispatch(selectImage(postImage));
    if (!read) {
      setDoc(doc(db, "posts", id), { read: true }, { merge: true });
      // merge true so no overwrite others
    }
    navigate("/chats/view");
  };
  return (
    <article className="chat" onClick={open}>
      <Avatar src={userPicture} className="chat__avatar" />
      <div className="chat__info">
        <h4>{username}</h4>
        <p>
          Tap to view -{" "}
          {timestamp && FormatData(new Date(timestamp.toDate()).toUTCString())}
        </p>
      </div>
      {!read && <StopRoundedIcon className="chat__readIcon" />}
    </article>
  );
};

export default Chat;
