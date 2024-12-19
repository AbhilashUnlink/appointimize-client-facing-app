/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, setDrawer } from "../../lib/slice/cartSlice";
import { Drawer_Type } from "../constants/drawer-constants";
import toast from "react-hot-toast";
import useSound from "use-sound";
import popsound from "../../assets/sound/pop.mp3"
import { BsCart2 } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";

const ItemCard = ({ item
    // , onEmployeeSelect
}: any) => {
    const dispatch = useDispatch();
    const { items } = useSelector((store: any) => store.cart)
    // const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
    // const [selectedEmployee, setSelectedEmployee] = useState<any>('');

    // const handleEmployeeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //     const employeeId = e.target.value;
    //     setSelectedEmployeeId(employeeId);

    //     // Find employee by ID
    //     const employee = item.employeeRelation.find((rel: any) => rel.employee.id === employeeId)?.employee;
    //     if (employee) {
    //         onEmployeeSelect(employee);
    //         setSelectedEmployee(employee)
    //     }
    // };

    const [playOn] = useSound(popsound, {
        volume: 0.25,
    });


    return (
        <div className="service-item relative bg-white  rounded-lg shadow-lg p-6 mb-6 w-full max-w-md mx-auto transform transition-all duration-300 ease-in-out hover:scale-102 hover:shadow-2xl">
            {/* Title and Price Section */}
            <div className="w-full mb-4">
                <h3 className="text-xl font-medium text-gray-900">{item.title}</h3>
                <div className="flex flex-row w-full justify-between mt-1">
                    <div>

                        <div className="relative">
                            <p className="text-xl font-medium text-gray-800"><span className="text-xs text-gray-500 absolute top-1">₹</span>
                                <span className="absolute left-3">
                                    {item.price}
                                </span>
                            </p>
                        </div>
                        <div className="absolute top-24">
                            <p className="text-sm text-gray-600 ">Duration: {item.duration} mins</p>
                        </div>
                    </div>
                    <div>
                        {
                            items?.find((i: any) => i.id === item.id) ?
                                <button
                                    onClick={() => {
                                        dispatch(setDrawer({ open: true, type: Drawer_Type.Cart }));
                                        playOn()

                                    }}
                                    className="cart-btn checkout w-full  bg-green-600 rounded-sm shadow-lg transform transition-all duration-200 ease-in-out hover:bg-green-700 hover:scale-102 focus:outline-none focus:ring-2 focus:ring-green-500 active:scale-98 flex items-center justify-center gap-2"
                                >
                                    <IoBagCheckOutline className="text-lg transition-transform duration-200 ease-in-out transform hover:rotate-12" />


                                </button> :
                                < button
                                    onClick={() => {
                                        // dispatch(addItemToCart({ ...item, selectedEmployee }))
                                        dispatch(addItemToCart({ ...item }))
                                        toast.success('Added To Cart!')
                                        playOn()
                                    }}
                                    className="cart-btn  rounded-sm shadow-lg transform transition-all duration-200 ease-in-out  hover:scale-102 focus:outline-none focus:ring-2  active:scale-98 flex items-center justify-center gap-2"
                                >
                                    <BsCart2 className="text-lg transition-transform duration-200 ease-in-out transform hover:rotate-12" />
                                    <span className="transition-opacity duration-200 ease-in-out hover:opacity-80"></span>
                                </button>
                        }
                    </div>
                </div>
            </div>

            {/* Employee Selection Section */}
            {/* <div className="mb-6">
                <label htmlFor="employee" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                    <FaUserTie className="text-gray-500" /> Choose a Specialist
                </label>
                <select
                    id="employee"
                    value={selectedEmployeeId}
                    onChange={handleEmployeeChange}
                    className="w-full p-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all hover:border-blue-500"
                >
                    <option value="">Any Specialist</option>
                    {item?.employeeRelation?.map((rel: any) => (
                        <option key={rel.employee.id} value={rel.employee.id}>
                            {rel.employee.firstName} {rel.employee.lastName} ({rel.employee.phoneNumber})
                        </option>
                    ))}
                </select>
            </div> */}

            {/* Add to Cart Button */}


        </div >
    );
};

export default ItemCard;
