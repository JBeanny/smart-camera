interface IImagePreview {
  photo: any;
  width: string;
  height: string;
}

export const ImagePreview = ({ photo, width, height }: IImagePreview) => {
  return (
    <div>
      {photo && (
        <img
          src={photo}
          alt="Captured"
          className={`w-${width} h-${height} border-2 border-white rounded-lg object-contain`}
        />
      )}
    </div>
  );
};
