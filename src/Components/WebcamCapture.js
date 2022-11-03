import React, { useRef, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setCameraImage,
  resetCameraImage,
  selectCameraImage
} from "../features/cameraSlice";
import "./WebcamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUnchecked from "@material-ui/icons/RadioButtonUnchecked";
import { useNavigate } from "react-router-dom";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user"
};

const WebcamCapture = () => {
  const webcamRef = useRef(null);
  const navigate = useNavigate();
  const src = useSelector(selectCameraImage);
  const dispatch = useDispatch();
  const onCaptur = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    dispatch(setCameraImage(imageSrc));
    navigate("/preview");
  }, [webcamRef]);
  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <RadioButtonUnchecked
        className="webcamCapture__button"
        onClick={onCaptur}
        fontSize="large"
      />
    </div>
  );
};

export default WebcamCapture;
