/* eslint-disable @typescript-eslint/no-explicit-any */

const PromotionCampainSection = ({ category, item }: any) => {
    return (
        <div
            className={
                category === "MEMBERSHIP"
                    ? "membership-banner banner-adv"
                    : "pakage-banner banner-adv"
            }
        >
            <div className="category-heading">{category}</div>
            <div className="category-name">{item?.title}</div>
            <div className="category-price gross-price">
                &#x20b9; {Math.round(item?.grossPrice)}/-
            </div>
            <div className="category-price">
                &#x20b9; {Math.round(item?.netPrice)}/- Only
            </div>
            <div className="category-percentage">
                {item.discount}%<span>Off</span>
            </div>
        </div>
    );
};

export default PromotionCampainSection;
