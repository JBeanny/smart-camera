"use client";

import { useState, useEffect, useRef } from "react";
import { ImagePreview, Button } from "../components";
import { camera } from "@/utils";

export const Camera = () => {
  const [photo, setPhoto] = useState(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState("user");
  const [lensMode, setLensMode] = useState<string>("none");
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
          resizeMode: lensMode,
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
  }, [facingMode, lensMode]);

  const changeLensMode = (lens: string) => {
    let newLensMode = "none"; // Default to x1 lens mode
    switch (lens) {
      case "x0.5":
        newLensMode = "x0.5";
        break;
      case "x2":
        newLensMode = "x2";
        break;
      case "none":
        newLensMode = "none"; // Cycle back to x1 lens mode
        break;
      default:
        newLensMode = "none";
        break;
    }
    setLensMode(newLensMode);
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4 w-[80%] m-auto">
      <h1 className="text-center text-white">{cameraOpen}</h1>
      <video
        ref={videoRef}
        autoPlay
        className={`w-${videoDimensions.width} h-${videoDimensions.height} border-2 border-white rounded-lg object-cover`}></video>

      <div className="flex gap-4 justify-center items-center">
        <button
          onClick={() => changeLensMode("x0.5")}
          className="bg-white text-gray p-2 rounded-full w-[40px] h-[40px] text-sm active:scale-110">
          0.5
        </button>
        <button
          onClick={() => changeLensMode("none")}
          className="bg-white text-gray p-2 rounded-full w-[40px] h-[40px] text-sm active:scale-110">
          1
        </button>
        <button
          onClick={() => changeLensMode("x2")}
          className="bg-white text-gray p-2 rounded-full w-[40px] h-[40px] text-sm active:scale-110">
          2
        </button>
      </div>

      <div className="w-full flex flex-col justify-between gap-4">
        <Button
          onClick={() =>
            camera.toggleCamera({ videoStream, setFacingMode, facingMode })
          }
          className="bg-white text-gray active:scale-110"
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
          className="bg-white text-gray active:scale-110"
          text="Take Photo 📸"
        />
        {photo && (
          <>
            <Button
              onClick={() => {
                camera.downloadPhoto({ photo });
              }}
              disable={!photo}
              className="bg-green text-white active:scale-110"
              text="Download Photo"
            />
            <Button
              onClick={() =>
                camera.discardPhoto({ setPhoto, setVideoDimensions })
              }
              disable={!photo}
              className="bg-red text-white active:scale-110"
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
