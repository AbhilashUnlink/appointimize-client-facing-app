// import React from "react";

const InstagramButton = () => {
  const handleClick = () => {

  };

  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram Logo"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
        onClick={handleClick}
      />
    </div>
  );
};

export default InstagramButton;
