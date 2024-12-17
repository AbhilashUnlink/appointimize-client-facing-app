import React from "react";

const FacebookButton = () => {
  const handleClick = () => {
  };

  return (
    <div>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
        alt="Facebook Logo"
        style={{ width: "50px", height: "50px", cursor: "pointer" }}
        onClick={handleClick}
      />
    </div>
  );
};

export default FacebookButton;
