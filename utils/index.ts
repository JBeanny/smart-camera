import {
  takePhoto,
  toggleCamera,
  downloadPhoto,
  discardPhoto,
  changeLensMode,
} from "./CameraActions";

import { sendPhotoToTelegram } from "./TelegramUpload";

const camera = {
  takePhoto,
  toggleCamera,
  downloadPhoto,
  discardPhoto,
  changeLensMode,
};

export { camera, sendPhotoToTelegram };
