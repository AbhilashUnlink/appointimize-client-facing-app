
import { Link } from "react-router-dom";
import "../responsive.css";
 


const MobilecategoryView = ({ categories, onClick, selectedCategoryId }:any) => (
    <div className="mobile-categories-view block md:hidden p-4 bg-gray-50 overflow-x-scroll no-scrollbar smooth-scroll">
    <div className="flex gap-4  ">
          <div
                      onClick={() => onClick("")}
                      className={`category-circle flex-shrink-0 flex flex-col items-center justify-center bg-white border border-gray-300 shadow-sm 
                        ${!selectedCategoryId ? "highlighted-category" : ""} transition`}
                    >
                      <Link to={"#items-div-id"}>
                        <h3 className="text-sm font-normal text-center">All Items</h3>
                      </Link>
                    </div>
        {categories.map((category:any) => (
            <div
                key={category.id}
                onClick={() => onClick(category.id)}
                className={`category-circle flex-shrink-0 flex flex-col items-center justify-center bg-white border border-gray-300 shadow-sm 
                ${selectedCategoryId === category.id ? "highlighted-category" : ""} transition`}
            >
                <h3 className="text-sm font-normal text-center">{category.title}</h3>
            </div>
        ))}
    </div>
</div>
);

export default MobilecategoryView