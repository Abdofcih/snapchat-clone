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

const Preview = () => {
  const src = useSelector(selectCameraImage);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgUrl, setImgUrl] = useState(null);

  useEffect(() => {
    if (!src) navigate("/");
  }, [src, navigate]);

  const closePreview = () => {
    dispatch(resetCameraImage());
    navigate("/");
  };
  const sendPost = () => {
    const id = uuid();
    // Create a reference to 'mountains.jpg'
    const imageRef = ref(storage, `posts/${id}`);
    // Data URL string
    uploadString(imageRef, src, "data_url").then(snapshot => {
      getDownloadURL(snapshot.ref).then(URL => {
        console.log("URL : ", URL);

        setDoc(
          doc(db, "posts", id),
          {
            username: "username",
            postImage: URL,
            read: false,
            // profilePic
            timestamp: serverTimestamp()
          },
          { merge: true }
        );
        navigate("/");
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
        <h2>Send Now</h2>
        <SendIcon className="preview__sendIcon" fontSize="small" />
      </div>
    </div>
  );
};

export default Preview;
