/* eslint-disable @typescript-eslint/no-explicit-any */
import { homeBanner } from "../assets";
import PromotionCampainSection from "./components/PromotionCampainSection";
import Container from "./Container";
import "../ui/components/social-style.css"

const HomeBanner = ({ CompanyName, companyAddress, promotionData }: { CompanyName: string, companyAddress: any, promotionData: any }) => {

  const city = companyAddress ? companyAddress?.city : "";
  const region = companyAddress ? companyAddress?.region : "";
  const state = companyAddress ? companyAddress?.state : "";
  const street = companyAddress ? companyAddress?.street : "";


  return (
    <Container className="pt-5 flex-col relative py-5 overflow-hidden  gap-5  lg:flex lg:flex-row">
      <div className="relative w-full lg:w-3/4">
        <img
          src={homeBanner}
          alt="homeBanner"
          className="w-full h-full object-cover rounded-md homeBannerImg"
        />
        <div className="caption-bg">
          <h4>
            {CompanyName}
          </h4>
          <p>{street}, {city}, {state}, {region}</p>
        </div>
        <div className="w-full h-full absolute top-0 left-0 bg-black/10" />
      </div>

      <div className="w-full mt-5 lg:mt-0 lg:w-1/4 ">
        <PromotionCampainSection
          category={promotionData?.category}
          item={promotionData?.item}
        />
      </div>

    </Container>
  );
};

export default HomeBanner;
