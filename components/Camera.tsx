"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "../components";
import { camera } from "@/utils";
import { CustomDialog } from "./Dialog";
import { PiCameraRotate } from "react-icons/pi";

export const Camera = () => {
  const [photo, setPhoto] = useState(null);
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState("user");
  const [lensMode, setLensMode] = useState<string>("x2");
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
          zoom: {
            ideal: getLensMode(),
          },
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

  const getLensMode = () => {
    return lensMode === "x0.5" ? 0.5 : lensMode === "x2" ? 2 : 1;
  };

  return (
    <div className="flex mt-10 items-center flex-col gap-4 w-[80%] m-auto h-screen">
      <div className="flex justify-end items-end w-full">
        <button
          onClick={() =>
            camera.toggleCamera({ videoStream, setFacingMode, facingMode })
          }
          className="bg-white text-gray active:scale-110 rounded-full w-[40px] h-[40px] flex justify-center items-center">
          <PiCameraRotate className="text-2xl" />
        </button>
      </div>

      <h1 className="text-center text-white">{cameraOpen}</h1>
      <video
        ref={videoRef}
        autoPlay
        className={`w-${videoDimensions.width} h-${videoDimensions.height} rounded-lg object-cover`}></video>

      <div className="flex gap-4 justify-center items-center">
        <Button
          onClick={() =>
            camera.changeLensMode({ lensMode: "x0.5", setLensMode })
          }
          className={`bg-white text-gray p-2 rounded-full w-[40px] h-[40px] text-sm active:scale-110 ${
            lensMode === "none"
              ? "ring-[1px] ring-offset-2 ring-offset-zinc ring-white"
              : ""
          }`}
          text="0.5"
        />
        <Button
          onClick={() => camera.changeLensMode({ lensMode: "x1", setLensMode })}
          className={`bg-white text-gray p-2 rounded-full w-[40px] h-[40px] text-sm active:scale-110 ${
            lensMode === "x2"
              ? "ring-[1px] ring-offset-2 ring-offset-zinc ring-white"
              : ""
          }`}
          text="1"
        />
      </div>

      <div className="w-full flex flex-col justify-between gap-4">
        <Button
          onClick={() =>
            camera.takePhoto({
              videoRef,
              canvasRef,
              setPhoto,
              setVideoDimensions,
            })
          }
          className="bg-white text-gray active:scale-110 rounded-lg"
          text="Take Photo 📸"
        />
      </div>

      {/* image preview */}
      {photo && (
        <CustomDialog
          photo={photo}
          width={videoDimensions.width}
          height={videoDimensions.height}
          setPhoto={setPhoto}
          setVideoDimensions={setVideoDimensions}
        />
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};
