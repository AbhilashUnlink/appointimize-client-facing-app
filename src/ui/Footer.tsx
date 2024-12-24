/* eslint-disable @typescript-eslint/no-explicit-any */
// import React from "react";
import { Link } from "react-router-dom";
import { CiHeadphones, CiPhone, CiVoicemail, CiLocationOn, CiFacebook, CiInstagram } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { Fab } from "@mui/material";
import ScrollToTopButton from "./ScrollToTopButton";

const Footer = ({contactPhone, contactEmail, contactName, companyAddress, CompanyName,socialMediaLinkRltn}:any) => {
  const city = companyAddress ? companyAddress?.city : "";
  const region = companyAddress ? companyAddress?.region : "";
  const state = companyAddress ? companyAddress?.state : "";
  const street = companyAddress ? companyAddress?.street : "";
   const facebook = socialMediaLinkRltn[0].url;
   const instagram = socialMediaLinkRltn[1].url;
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
        <Link to={"/"}>
          <span style={{ fontSize: "10px" }}>
            Powered By
          </span>
            <img src={"https://www.appointimize.com/assets/Appointimize-new-logo-BA_jJeCQ.png"} alt="logo" className="w-44" />
        </Link>
        </div>
        <div className="footer-social-media">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <Link to={facebook} target="_blank" rel="noopener noreferrer">
              <CiFacebook /> <span>Facebook</span>
            </Link>
            <Link to={instagram} target="_blank" rel="noopener noreferrer">
              <CiInstagram /> <span>Instagram</span>
            </Link>
          </div>
        </div>
        <div className="footer-contact">
          <h4>Contact Us</h4>
                  <p><CiHeadphones />{contactName}</p>
          <p className="contact-phone"><CiPhone /> {contactPhone}</p>
                  <p><CiVoicemail /> {contactEmail}</p>
                  <p><CiLocationOn/>{street}, {city}, {state}, {region}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {CompanyName}. All Rights Reserved.</p>
      </div>
      <Fab size="medium" className="whats-app-floating" color="secondary" aria-label="add">
      <FaWhatsapp/>
</Fab>
<ScrollToTopButton />
    </footer>
  );
};

export default Footer;
