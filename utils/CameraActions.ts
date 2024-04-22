import {
  IToggleCamera,
  IDiscardPhoto,
  ITakePhoto,
  IChangeLensMode,
} from "../interfaces/actions";
import { sendPhotoToTelegram } from "./TelegramUpload";

const takePhoto = ({
  videoRef,
  canvasRef,
  setPhoto,
  setBlob,
  setVideoDimensions,
}: ITakePhoto): any | void => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  // Ensure video is loaded and has valid dimensions
  if (video?.videoWidth > 0 && video?.videoHeight > 0) {
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

    // convert to blob in order to send to telegram
    setBlob(dataURLToBlob(dataURL));

    // Update video dimensions to match captured photo dimensions
    setVideoDimensions({
      width: canvasWidth,
      height: canvasHeight,
    });
  }
};

// convert data url to blob
const dataURLToBlob = (dataURL: any) => {
  const parts = dataURL.split(";base64,");
  const contentType = parts[0].split(":")[1];
  const raw = window.atob(parts[1]);
  const rawLength = raw.length;
  const uInt8Array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }
  return new Blob([uInt8Array], { type: contentType });
};

const downloadPhoto = ({ photo }: { photo: any }) => {
  const link: HTMLAnchorElement | any = document.createElement("a");

  if (link) {
    link.href = photo;
    sendPhotoToTelegram(photo);
    link.download = "photo.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

const toggleCamera = ({
  videoStream,
  setFacingMode,
  facingMode,
  setLensMode,
}: IToggleCamera) => {
  if (videoStream == null) return;

  // Stop current video stream
  videoStream.getTracks().forEach((track) => track.stop());

  setLensMode("x0.5");

  // Toggle facing mode
  setFacingMode(facingMode === "user" ? "environment" : "user");
};

const discardPhoto = ({ setPhoto, setVideoDimensions }: IDiscardPhoto) => {
  setPhoto(null);
  setVideoDimensions({
    width: "auto",
    height: "auto",
  });
};

const changeLensMode = ({ lensMode, setLensMode }: IChangeLensMode) => {
  let newLensMode = "none"; // Default to x1 lens mode
  switch (lensMode) {
    case "x0.5":
      newLensMode = "none";
      break;
    case "x1":
      newLensMode = "x2";
      break;
    default:
      newLensMode = "none";
      break;
  }
  setLensMode(newLensMode);
};

export { takePhoto, toggleCamera, downloadPhoto, discardPhoto, changeLensMode };
