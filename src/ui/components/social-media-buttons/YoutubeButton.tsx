
const YouTubeButton = () => {
  const handleClick = () => {};

  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
        alt="YouTube Logo"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
        onClick={handleClick}
      />
    </div>
  );
};

export default YouTubeButton;
