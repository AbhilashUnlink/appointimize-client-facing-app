/* eslint-disable @typescript-eslint/no-explicit-any */

const PromotionCampainSection = ({ category = "", item }: any) => {
    return (
        <div
            className={
                category === "MEMBERSHIP"
                    ? "membership-banner banner-adv"
                    : "pakage-banner banner-adv"
            }
        >
            <div className="category-heading">{category}</div>
            <div className="category-name text-sm sm:text-base md:text-2xl py-2 leading-loose">
                {item?.title && item?.title}
            </div>


            <div className="category-price gross-price">
                {
                    item?.grossPrice && <>
                        &#x20b9; {Math.round(item?.grossPrice)}/-</>
                }

            </div>
            <div className="category-price text-2xl sm:text-base md:text-3xl">
                {
                    item?.netPrice &&
                    <>
                        &#x20b9; {Math.round(item?.netPrice)}/- Only
                    </>
                }
            </div>
            <div className="category-percentage">
                {
                    item?.discount && <>
                        {item?.discount}%<span>Off</span>
                    </>
                }
            </div>
        </div>
    );
};

export default PromotionCampainSection;
