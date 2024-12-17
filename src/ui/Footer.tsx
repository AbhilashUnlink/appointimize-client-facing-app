// import React from "react";
import { Link } from "react-router-dom";
import Container from "./Container";
// import { payment } from "../assets";
// import FooterTop from "./FooterTop";

const Footer = () => {
  return (
    <div className="mt-10">
      {/* <FooterTop /> */}
      <Container className="flex flex-col md:flex-row items-center gap-4 justify-between">
        <p>@2024 Unlink Technologies Pvt. Ltd. All rights reserved.</p>
        {/* <img src={payment} alt="payment-img" className="object-cover" /> */}
        <Link to={"/"}>
          <span style={{ fontSize: "10px" }}>
            Powered By
          </span>
          <img src={"https://www.appointimize.com/assets/Appointimize-new-logo-BA_jJeCQ.png"} alt="logo" className="w-44" />
        </Link>
      </Container>
    </div>
  );
};

export default Footer;
