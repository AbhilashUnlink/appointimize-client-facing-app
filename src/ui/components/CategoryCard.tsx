import { Link } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
const CategoryCard: React.FC<{ category: any; onClick: (categoryId: string) => void; isSelected: boolean }> = ({ category, onClick, isSelected }) => {
    return (
        <div
            onClick={() => onClick(category.id)}
            className={`rounded cursor-pointer flex items-center justify-start px-4 py-3  hover:text-blue-500  hover:bg-blue-100 gap-1 transition-colors
        ${isSelected ? "bg-blue-200 text-gray-900" : ""}
        `}
        >
            <Link to={"#items-div-id"}>
                <h3 className="text-lg font-medium text-center uppercase">{category.title}</h3>
            </Link>
        </div>
    );
};

export default CategoryCard;