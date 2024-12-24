/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import HomeBanner from "../ui/HomeBanner";
import CommonDrawer from "../ui/components/CommonDrawer";
import SalonMainBody from "../ui/SalonMainBody";
import Header from "../ui/Header";
import { BASE_URL } from "../ui/constants/api-urls";
import { useParams } from "react-router-dom";
import Footer from "../ui/Footer";
import Loading from "../ui/Loading";
// import PromotionCampainSection from "../ui/components/PromotionCampainSection";
// import NotFound from "./NotFound";

const Salon = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [salonData, setSalonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);



  const CompanyName = salonData?.data[0]?.title || "";
  const contactEmail = salonData?.data[0]?.contactEmail || "N/A";
  const contactName = salonData?.data[0]?.contactName || "N/A";
  const contactPhone = salonData?.data[0]?.contactPhone || "N/A";
  // const companyImageUrl = salonData?.data[0]?.companyImageUrl || "N/A";
  const companyAddress = salonData?.data[0]?.companyAddress || "";
  const companyId = salonData?.data[0]?.id || "";








  const socialMediaLinkRltn = salonData?.data[0]?.socialMediaLinkRltn || "";




  const serviceCatalogues
    = salonData?.data[0]?.serviceCatalogues
    || "N/A";


  const { id } = useParams();
  useEffect(() => {
    const endpoint =
      `${BASE_URL}/companies/store/test/ref/${id}`;
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setSalonData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div
      style={{
        width: "100%",
        height: "100vh"
      }}
    >
     <Loading />
    </div>;
  }


  const getInvoicePromotionalData = (value: any) => {
    if (value && value?.length > 0) {
      const fbData = value?.find(
        (item: any) =>
          item?.socialMediaLink.title?.toLowerCase() === "facebook"
      );
      const instaData = value?.find(
        (item: any) =>
          item?.socialMediaLink.title?.toLowerCase() === "instagram"
      );
      return {
        category: instaData?.promotionObj?.category,
        item: instaData?.promotionObj?.item,
        fbHandle: fbData?.url,
        fbPostLink: fbData?.promotionLinks,
        instaHandle: instaData?.url,
        instaPostLink: instaData?.promotionLinks,
      };
    } else {
      return "";
    }
  };
  const promotionData = socialMediaLinkRltn && getInvoicePromotionalData(socialMediaLinkRltn);

  return (
    <div>
      <Header
        contactPhone={contactPhone}
        contactEmail={contactEmail}
        contactName={contactName}
        CompanyName={CompanyName}

      />
      <HomeBanner CompanyName={CompanyName} companyAddress={companyAddress}
        promotionData={promotionData}
      />

      <CommonDrawer
        companyId={companyId}
      />
      {
        serviceCatalogues && serviceCatalogues?.length > 0 &&
        <SalonMainBody serviceCatalogues={serviceCatalogues} />
      }
      <Footer
      contactPhone={contactPhone}
      contactEmail={contactEmail}
      contactName={contactName}
      companyAddress={companyAddress}
      CompanyName={CompanyName}
      socialMediaLinkRltn={socialMediaLinkRltn}
      // companyImageUrl={companyImageUrl}

      />
    </div>
  );
};

export default Salon;
