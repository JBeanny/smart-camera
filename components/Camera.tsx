"use client";

import { useState, useEffect, useRef } from "react";
import {
  Button,
  CustomDialog,
  Loading,
  IconButton,
  ClipLoading,
} from "../components";
import { camera } from "@/utils";
import { PiCameraRotate } from "react-icons/pi";
import { SlCamera } from "react-icons/sl";
import { Flip, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Camera = () => {
  const [photo, setPhoto] = useState(null);
  const [blob, setBlob] = useState<Blob>(new Blob());
  const [videoStream, setVideoStream] = useState<MediaStream | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [facingMode, setFacingMode] = useState<string>("user");
  const [lensMode, setLensMode] = useState<string>("none");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSendingPhoto, setIsSendingPhoto] = useState<boolean>(false);
  const [videoDimensions, setVideoDimensions] = useState<object | any>({
    width: "auto",
    height: "auto",
  });
  const [cameraOpen, setCameraOpen] = useState<string>(
    "Camera is not accessible. Please enable or wait 😕"
  );
  const videoRef = useRef<HTMLVideoElement | any>(null);
  const canvasRef = useRef<HTMLCanvasElement | any>(null);

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
          setCameraOpen("");
          setIsLoading(false);
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
    <div className="flex items-center flex-col gap-4 w-[80%] m-auto">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="dark"
        transition={Flip}
      />

      {cameraOpen === "" ? (
        ""
      ) : (
        <h1 className="text-center text-white">{cameraOpen}</h1>
      )}

      <ClipLoading loading={isSendingPhoto} />

      <Loading loading={isLoading} />

      <div className="flex flex-col gap-4 justify-between items-center">
        <video
          ref={videoRef}
          autoPlay
          className={`w-${videoDimensions.width} h-${
            videoDimensions.height
          } rounded-lg object-cover ${
            isLoading ? "scale-0" : "scale-100 duration-300 ease-linear"
          }`}></video>

        <div className="w-full flex flex-col justify-center items-center gap-4 fixed bottom-[20px]">
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
              onClick={() =>
                camera.changeLensMode({ lensMode: "x1", setLensMode })
              }
              className={`bg-white text-gray p-2 rounded-full w-[40px] h-[40px] text-sm active:scale-110 ${
                lensMode === "x2"
                  ? "ring-[1px] ring-offset-2 ring-offset-zinc ring-white"
                  : ""
              }`}
              text="1"
            />
          </div>

          <div className="flex justify-center items-end">
            <IconButton
              icon={<SlCamera className="text-3xl" />}
              onClick={() => {
                camera.takePhoto({
                  videoRef,
                  canvasRef,
                  setPhoto,
                  setBlob,
                  setVideoDimensions,
                });
                setIsDialogOpen(true);
              }}
              className="w-[80px] h-[80px] ring-[1px] ring-offset-2 ring-offset-zinc ring-white bg-white"
            />

            <IconButton
              icon={<PiCameraRotate className="text-2xl" />}
              onClick={() =>
                camera.toggleCamera({
                  videoStream,
                  setFacingMode,
                  facingMode,
                  setLensMode,
                })
              }
              className="absolute right-[30px] ring-[1px] ring-offset-2 ring-offset-zinc ring-white bg-white"
            />
          </div>
        </div>
      </div>

      {/* image preview */}
      <CustomDialog
        isOpen={isDialogOpen}
        setIsOpen={setIsDialogOpen}
        photo={photo}
        blob={blob}
        width={videoDimensions.width}
        height={videoDimensions.height}
        setPhoto={setPhoto}
        setVideoDimensions={setVideoDimensions}
        setIsLoading={setIsSendingPhoto}
      />

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
    </div>
  );
};
