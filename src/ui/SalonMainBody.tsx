/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import CategoryCard from './components/CategoryCard';
import ItemCard from './components/ItemCard';
import { useSelector } from 'react-redux';
import useSound from 'use-sound';
import popsound from "../assets/sound/pop.mp3"
import { Link } from 'react-router-dom';
import MobilecategoryView from './MobilecategoryView';
// import { IoClose, IoSearchOutline } from 'react-icons/io5';

// type Employee = {
//   id: any;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phoneNumber: string;
// };


const SalonMainBody = ({ serviceCatalogues }: any) => {

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  // const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  // console.log(selectedEmployee, "selectedEmployee");


  const allItems: any = Array.isArray(serviceCatalogues) ? serviceCatalogues?.map((c: any) => c.svcCtlgItems).flat() : [];

  const [filteredItems, setFilteredItems] = useState<any>(allItems);

  const { searchText } = useSelector((store: any) => store.products)


  const [debouncedSearchText, setDebouncedSearchText] = useState(searchText);

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    const timer = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 1000);

    setDebounceTimer(timer);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    if (debouncedSearchText !== "") {
      const newItems = allItems?.filter((item: any) =>
        item.title?.toLowerCase()?.includes(debouncedSearchText.toLowerCase())
      );
      setFilteredItems(newItems);
      setSelectedCategoryId("");
    } else {
      setFilteredItems(allItems); // Optionally reset filtered items when searchText is empty
    }
  }, [debouncedSearchText]);

  const [playOn] = useSound(popsound, {
    volume: 0.25,
  });

  const handleCategoryClick = (categoryId: string) => {
    playOn()
    setSelectedCategoryId(categoryId);

    if (categoryId) {
      const selectedCategory = serviceCatalogues?.find((category: any) => category.id === categoryId);
      setFilteredItems(selectedCategory ? selectedCategory.svcCtlgItems : []);
    } else {
      setFilteredItems(allItems); // Show all items
    }
  };

  // const handleEmployeeSelect = (employee: Employee) => {
  //   setSelectedEmployee(employee);
  // };


  return (
    <>

      <div id="items-div-id"
        className='flex justify-start pl-3 md:pl-0 md:justify-center'
      >
        <p className='font-bold text-3xl md:text-4xl lg:text:5xl mt-2 mb-2'>
          CHOOSE A CATEGEORY
        </p>
      </div>
      
     
      <MobilecategoryView 
      categories={serviceCatalogues} 
      onClick={handleCategoryClick} 
      selectedCategoryId={selectedCategoryId}  />
    
      <div className="flex flex-col md:flex-row">
        {/* Left side: Categories List */}

        <div className="hidden md:block md:w-1/4 p-4 bg-gray-100">
          <h3 className={`font-extrabold text-2xl font-size-2xl flex items-center justify-start px-2 py-4  gap-3 transition-colors`}>CATEGORIES LIST</h3>
          <hr className='mb-4' />
          <div className="space-y-4">


            <div
              onClick={() => handleCategoryClick("")}
              className={`rounded cursor-pointer flex items-center justify-start px-4 py-3  hover:text-blue-500  hover:bg-blue-100 gap-1 transition-colors
                    ${!selectedCategoryId ? "bg-blue-200 text-gray-900" : ""}
                    `}
            >
              <Link to={"#items-div-id"}>
                <h3 className="text-lg font-medium text-center">ALL ITEMS</h3>
              </Link>
            </div>
            {serviceCatalogues && serviceCatalogues?.length > 0 && serviceCatalogues?.map((category: any) => (
              <CategoryCard
                key={category.id}
                category={category}
                onClick={handleCategoryClick}
                isSelected={selectedCategoryId === category.id}
              />
            ))}
          </div>
        </div>

        {/* Right side: Items List */}
        <div className="md:w-3/4 p-4 bg-gray-50">
          <h1 className="text-2xl font-bold mb-6 uppercase">
            {selectedCategoryId
              ? serviceCatalogues.find((cat: any) => cat.id === selectedCategoryId)?.title
              : 'All Items'}
          </h1>

          {/* Display Items */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.length === 0 ? (
              <>
                <p>No items available.</p>
                <button onClick={() => setFilteredItems(allItems)}>
                  Show All
                </button>
              </>
            ) : (
              filteredItems?.map((item: any) => (
                <ItemCard key={item.id} item={item}
                // onEmployeeSelect={handleEmployeeSelect}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalonMainBody;


//     {
//       "svcCtlgItemsId": "f2b37893-1f40-481c-ac1f-b56b3a151f1a",
//       "employeeBookedId": "9ca94691-173f-42ad-ab40-a5f8866b1529",
//       "price": "2000.00",
//       "empSvcBkgDuration": 150,
//       "empSvcBkgStartTime": "10:08:51",
//       "empSvcBkgEndTime": "12:38:51"
//     }


// const payload = {
//   "clientId": "594d58cd-d9dc-46a2-a836-8766114e5f43",
//   "companyId": "bbca0e12-2360-4518-a802-23d94b5d2c69",
//   "appointmentDate": [
//     "2024-12-05"
//   ],
//   "startTime": "10:08:51",
//   "endTimeExpected": "12:38:51",
//   "endTime": "12:38:51",
//   "totalDuration": 150,
//   "priceExpected": "2000.00",
//   "priceFull": "2000.00",
//   "priceFinal": "2000.00",
//   "status": "pending",
//   "appointmentComments": [
//     {
//       "content": ""
//     }
//   ],
//   "svcBooked": [
//     {
//       "svcCtlgItemsId": "f2b37893-1f40-481c-ac1f-b56b3a151f1a",
//       "employeeBookedId": "9ca94691-173f-42ad-ab40-a5f8866b1529",
//       "price": "2000.00",
//       "empSvcBkgDuration": 150,
//       "empSvcBkgStartTime": "10:08:51",
//       "empSvcBkgEndTime": "12:38:51"
//     }
//   ],
//   "appointmentStatus": [
//     {
//       "status": "pending"
//     }
//   ]
// }
