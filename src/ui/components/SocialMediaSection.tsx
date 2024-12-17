/* eslint-disable @typescript-eslint/no-explicit-any */
// SocialMediaSection.js
// import { Box, Divider, Typography } from "@mui/material";
import "./style.css";
// import InstagramButton from "./social-media-buttons/InstagramButton";
// import FacebookButton from "./social-media-buttons/FacbookButton";
import PromotionCampainSection from "./PromotionCampainSection";
// import InstagramReel from "./social-media-buttons/InstagramReelEmbed";


// const socialMediaData = [
//     { IconComponent: InstagramButton, link: "instaHandle" },
//     { IconComponent: FacebookButton, link: "fbHandle" },
// ];

// const SocialMediaIcon = ({ IconComponent, link }: any) => {
//     return (
//         <Box className="social-icon-container" onClick={() => {
//             link && window.open(link)
//         }}>
//             <IconComponent />
//         </Box>
//     );
// };

const SocialMediaSection = ({ promotionData }: any) => {

  


    return (
        <>
            <PromotionCampainSection
                category={promotionData?.category}
                item={promotionData?.item}
            />

            {/* <Divider sx={{ marginTop: 1, marginBottom: 4 }} />


            <Typography variant="h4" className="text-heading mb-4">
                FOLLOW US ON SOCIAL MEDIA
            </Typography>

            {socialMediaData?.map((data, index) => (

                <SocialMediaIcon
                    key={index}
                    IconComponent={data.IconComponent}
                    link={promotionData[data.link]}
                />
            ))}
            <Divider sx={{ marginTop: 1, marginBottom: 4 }} />

            <InstagramReel url={promotionData.instaPostLink} /> */}
        </>
    );
};

export default SocialMediaSection;
