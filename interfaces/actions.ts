export interface ITakePhoto {
  videoRef: any;
  canvasRef: any;
  setPhoto: (args: any) => void;
  setVideoDimensions: (args: any) => void | any;
}

export interface IToggleCamera {
  videoStream: MediaStream | null;
  setVideoStream: (args: any) => void;
  setFacingMode: (args: string) => void;
  facingMode: string;
  setLensMode: (args: string) => void;
}

export interface IDiscardPhoto {
  setPhoto: (args: string | any) => void;
  setVideoDimensions: (args: any) => void;
}

export interface IChangeLensMode {
  lensMode: string;
  setLensMode: (args: string) => void;
}
