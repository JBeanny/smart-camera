"use client";

import { useState, useEffect, useRef } from "react";

export const Camera = () => {
  const [photo, setPhoto] = useState(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState("user");
  const [videoDimensions, setVideoDimensions] = useState({
    width: "auto",
    height: "auto",
  });
  const [cameraOpen, setCameraOpen] = useState(
    "Camera is not accessible. Please enable or wait 😕"
  );
  const videoRef = useRef<HTMLVideoElement | any>();
  const canvasRef = useRef<HTMLCanvasElement | any>();

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const constraints = {
        video: {
          facingMode: facingMode,
        },
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          if (videoRef.current === undefined) return;

          videoRef.current.srcObject = stream;
          setVideoStream(stream);
          setCameraOpen("Enjoy taking photos 😊");
        })
        .catch(function (err) {
          console.log("An error occurred: " + err);
        });
    }
  }, [facingMode]);

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    // Ensure video is loaded and has valid dimensions
    if (video.videoWidth > 0 && video.videoHeight > 0) {
      const videoWidth = video.videoWidth;
      const videoHeight = video.videoHeight;

      // Calculate the aspect ratio of the video
      const aspectRatio = videoWidth / videoHeight;

      // Calculate the width and height of the canvas based on the aspect ratio
      let canvasWidth = videoWidth;
      let canvasHeight = videoHeight;

      if (videoWidth > videoHeight) {
        canvasHeight = canvasWidth / aspectRatio;
      } else {
        canvasWidth = canvasHeight * aspectRatio;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      const context = canvas.getContext("2d");
      context.drawImage(video, 0, 0, canvasWidth, canvasHeight);
      const dataURL = canvas.toDataURL("image/png");
      setPhoto(dataURL);

      // Update video dimensions to match captured photo dimensions
      setVideoDimensions({
        width: canvasWidth,
        height: canvasHeight,
      });
    }
  };

  const downloadPhoto = () => {
    const link: HTMLAnchorElement | any = document.createElement("a");

    if (link) {
      link.href = photo;
      link.download = "photo.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const toggleCamera = () => {
    if (videoStream == null) return;

    // Stop current video stream
    videoStream.getTracks().forEach((track) => track.stop());

    // Toggle facing mode
    setFacingMode(facingMode === "user" ? "environment" : "user");
  };

  const discardPhoto = () => {
    setPhoto(null);
    setVideoDimensions({
      width: "auto",
      height: "auto",
    });
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4 w-[80%] m-auto">
      <h1 className="text-center">{cameraOpen}</h1>
      <video
        ref={videoRef}
        autoPlay
        className={`w-${videoDimensions.width} h-${videoDimensions.height}border-2 border-white rounded-lg object-cover`}
      ></video>

      <div className="w-full flex flex-col justify-between gap-4">
        <button
          onClick={toggleCamera}
          className="bg-white text-gray p-4 rounded-lg"
        >
          Rotate Camera
        </button>
        <button
          onClick={takePhoto}
          className="bg-white text-gray p-4 rounded-lg"
        >
          Take Photo 📸
        </button>
        {photo && (
          <>
            <button
              onClick={downloadPhoto}
              disabled={!photo}
              className="bg-green text-white p-4 rounded-lg"
            >
              Download Photo
            </button>
            <button
              onClick={discardPhoto}
              disabled={!photo}
              className="bg-red text-white p-4 rounded-lg"
            >
              Discard
            </button>
          </>
        )}
      </div>

      {/* image preview */}
      {photo && (
        <img
          src={photo}
          alt="Captured"
          className={`w-${videoDimensions.width} h-${videoDimensions.height} border-2 border-white rounded-lg object-contain`}
        />
      )}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};
