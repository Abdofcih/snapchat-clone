import React, { useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import "./Chats.css";
import { Avatar } from "@material-ui/core";

const Chats = () => {
  const [posts, setPosts] = useState([]);
  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "posts"));
    let postsArr = [];
    querySnapshot.forEach((doc, index, arr) => {
      // doc.data() is never undefined for query doc snapshots
      postsArr.push({ id: doc.id, data: doc.data() });
    });

    setPosts(postsArr);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    console.log(posts);
  }, [posts]);
  return (
    <div className="chats">
      <div className="chats__header">
        <Avatar className="chats__avatar" />
        <div className="chats__search">
          <SearchIcon />
          <input type="text" placeholder="Friends" />
        </div>
        <ChatBubbleIcon className="chats__chatIcon" />
      </div>
      <div className="chats__posts">
        {posts &&
          posts.map(
            ({ id, data: { username, postImage, read, userPicture } }) => {
              return (
                <article key={id}>
                  <p>{username} </p>
                  <img src={postImage} alt="" />
                </article>
              );
            }
          )}
      </div>
    </div>
  );
};

export default Chats;
