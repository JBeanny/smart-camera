interface IButton {
  onClick: (args: any) => void | any;
  disable?: boolean;
  text: string | any;
  className: string;
}

export const Button = ({
  onClick,
  disable = false,
  text,
  className,
}: IButton) => {
  return (
    <button
      onClick={onClick}
      disabled={disable}
      className={`p-4 flex justify-center items-center ${className}`}>
      {text}
    </button>
  );
};
