import React, { useEffect, useState } from "react";
import "./Preview.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { resetCameraImage, selectCameraImage } from "../features/cameraSlice";

import CloseIcon from "@material-ui/icons/Close";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CreateIcon from "@material-ui/icons/Create";
import NoteIcon from "@material-ui/icons/Note";
import MusicNoteIcon from "@material-ui/icons/MusicNote";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import CropIcon from "@material-ui/icons/Crop";
import TimerIcon from "@material-ui/icons/Timer";
import SendIcon from "@material-ui/icons/Send";

import { v4 as uuid } from "uuid";

import { ref, getDownloadURL, uploadString } from "firebase/storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { storage, db } from "../firebase";
import { selectUser } from "../features/appSlice";

const Preview = () => {
  const src = useSelector(selectCameraImage);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!src) navigate("/");
  }, [src, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };
  const sendPost = () => {
    if (loading) {
      // do not run any athing
      return;
    }

    setLoading(true);
    const id = uuid();
    // Create a reference to 'posts/id'
    const imageRef = ref(storage, `posts/${id}`);
    // Data URL string
    uploadString(imageRef, src, "data_url").then(snapshot => {
      getDownloadURL(snapshot.ref).then(URL => {
        console.log("URL : ", URL);

        setDoc(
          doc(db, "posts", id),
          {
            username: user.username,
            postImage: URL,
            read: false,

            userPicture: user.profilePic,
            timestamp: serverTimestamp()
          },
          { merge: true }
        );
        navigate("/chats");
      });
    });
  };
  return (
    <div className="preview">
      <div className="preview__toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
      </div>
      <CloseIcon className="preview__close" onClick={closePreview} />
      <img src={src} />
      <div className="preview__footer" onClick={sendPost}>
        {loading ? (
          <h2>Wait ....</h2>
        ) : (
          <>
            <h2>Send Now</h2>
            <SendIcon className="preview__sendIcon" fontSize="small" />
          </>
        )}
      </div>
    </div>
  );
};

export default Preview;
