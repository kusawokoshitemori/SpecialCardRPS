interface TextProps {
  text: string;
  handleClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MiniButton = ({ text, handleClick }: TextProps) => {
  return (
    <button
      className="bg-cyan-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-cyan-600 focus:outline-none transition duration-300"
      onClick={handleClick}
    >
      {text}
    </button>
  );
};
export default MiniButton;
