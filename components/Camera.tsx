"use client";

import { useState, useEffect, useRef } from "react";
import { ImagePreview, Button } from "../components";
import { camera } from "@/utils";

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
          resizeMode: 1,
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

  return (
    <div className="flex justify-center items-center flex-col gap-4 w-[80%] m-auto">
      <h1 className="text-center">{cameraOpen}</h1>
      <video
        ref={videoRef}
        autoPlay
        className={`w-${videoDimensions.width} h-${videoDimensions.height} border-2 border-white rounded-lg object-cover`}></video>

      <div className="w-full flex flex-col justify-between gap-4">
        <Button
          onClick={() =>
            camera.toggleCamera({ videoStream, setFacingMode, facingMode })
          }
          className="bg-white text-gray"
          text="Rotate Camera"
        />
        <Button
          onClick={() =>
            camera.takePhoto({
              videoRef,
              canvasRef,
              setPhoto,
              setVideoDimensions,
            })
          }
          className="bg-white text-gray"
          text="Take Photo 📸"
        />
        {photo && (
          <>
            <Button
              onClick={() => {
                camera.downloadPhoto({ photo });
              }}
              disable={!photo}
              className="bg-green text-white"
              text="Download Photo"
            />
            <Button
              onClick={() =>
                camera.discardPhoto({ setPhoto, setVideoDimensions })
              }
              disable={!photo}
              className="bg-red text-white"
              text="Discard"
            />
          </>
        )}
      </div>

      {/* image preview */}
      <ImagePreview
        photo={photo}
        width={videoDimensions.width}
        height={videoDimensions.height}
      />

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};
