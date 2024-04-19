interface IIconButton {
  icon: React.ReactNode;
  onClick: () => void;
  className?: string;
}

export const IconButton = ({ icon, onClick, className }: IIconButton) => {
  return (
    <button
      onClick={onClick}
      className={`bg-white text-gray active:scale-110 rounded-full w-[40px] h-[40px] flex justify-center items-center ${className}`}>
      {icon}
    </button>
  );
};
