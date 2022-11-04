import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";

import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";

import "./Chats.css";
import { Avatar } from "@material-ui/core";
import Chat from "./Chat";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, selectSelectedImage } from "../features/appSlice";
import { useNavigate } from "react-router-dom";
import { resetCameraImage } from "../features/cameraSlice";

const Chats = () => {
  const [posts, setPosts] = useState(null);
  const user = useSelector(selectUser);
  const selectedImage = useSelector(selectSelectedImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "posts"), orderBy("timestamp", "desc"))
    );
    let postsArr = [];
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      postsArr.push({ id: doc.id, data: doc.data() });
    });
    setPosts(postsArr);
  };

  useEffect(() => {
    fetchData();
  }, [selectedImage]);

  const takeSnap = () => {
    dispatch(resetCameraImage);
    navigate("/");
  };
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar
          src={user.profilePic}
          className="chats__avatar"
          onClick={() => auth.signOut()}
        />
        <div className="chats__search">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts &&
          posts.map(
            ({
              id,
              data: { username, postImage, read, userPicture, timestamp }
            }) => {
              return (
                <Chat
                  key={id}
                  id={id}
                  username={username}
                  postImage={postImage}
                  read={read}
                  userPicture={userPicture}
                  timestamp={timestamp}
                />
              );
            }
          )}
      </div>
      <RadioButtonUnchecked
        className="chats__takePicIcon"
        onClick={takeSnap}
        fontSize="large"
      />
    </div>
  );
};

export default Chats;
