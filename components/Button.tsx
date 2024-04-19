interface IButton {
  onClick: (args: any) => void | any;
  disable?: boolean;
  text: string;
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
      className={`p-4 rounded-lg ${className}`}>
      {text}
    </button>
  );
};
