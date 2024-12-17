// CallUsButton.js
import React from "react";
import { Button, Typography, Box } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import PropTypes from "prop-types";

const CallUsButton = ({ phoneNumber }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
      <Button
        variant="contained"
        color="primary"
        href={`tel:${phoneNumber}`}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          padding: "10px 20px",
          borderRadius: "50px",
          fontSize: "16px",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
          },
        }}
      >
        <PhoneIcon style={{ fontSize: "15px" }} />
        <Typography style={{ fontWeight: "800" }}>CALL US TO BOOK AN APPOINTMENT</Typography>
      </Button>
    </Box>
  );
};

CallUsButton.propTypes = {
  phoneNumber: PropTypes.string.isRequired,
};

export default CallUsButton;
