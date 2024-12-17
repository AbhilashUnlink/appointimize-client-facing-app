/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FiShoppingBag
  // , FiStar, FiUser 
} from "react-icons/fi";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setDrawer } from "../lib/slice/cartSlice";
import { Drawer_Type } from "./constants/drawer-constants";
import { setSearchText } from "../lib/slice/productsSlice";
import useSound from "use-sound";
import popsound from "../assets/sound/pop.mp3";
import { CiHeadphones, CiPhone, CiVoicemail } from "react-icons/ci";


const Header = ({ contactPhone, contactEmail, contactName }: any) => {
  const { searchText } = useSelector((store: any) => store.products)
  const { cartCount } = useSelector((store: any) => store.cart)
  const dispatch = useDispatch();
  const [playOn] = useSound(popsound, {
    volume: 0.25,
  });
  return (
    <div className="sticky w-full bg-whiteText top-0 z-50">
      <div className="top-header">
        <span className="contact-phone"><CiPhone /> {contactPhone}</span>
        <span><CiVoicemail /> {contactEmail}</span>
        <span><CiHeadphones />{contactName}</span>

      </div>
      <div className="max-w-screen-xl mx-auto h-20 flex items-center justify-between px-4 lg:px-0">
        {/* Logo */}
        <Link to={"/"}>
          <span style={{ fontSize: "10px" }}>
            Powered By
          </span>
          {/* {
            companyImageUrl ?
              <img className="w-44" src={companyImageUrl} alt={"logo"} />
              : */}
            <img src={"https://www.appointimize.com/assets/Appointimize-new-logo-BA_jJeCQ.png"} alt="logo" className="w-44" />
        </Link>
        {/* SearchBar */}

        <Link className="hidden md:inline-flex max-w-3xl w-full relative" to={"#items-div-id"}>
          <input
            type="text"
            onChange={(e) => dispatch(setSearchText(e.target.value))}
            value={searchText}
            placeholder="Search products..."
            className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
          />
          {searchText ? (
            <IoClose
              onClick={() => dispatch(setSearchText(""))}
              className="absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
            />
          ) : (
            <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
          )}
        </Link>



        {/* Menubar */}
        <div className="flex items-center gap-x-6 text-2xl">
          {/* <Link to={"/profile"}>

            <FiUser className="hover:text-skyText duration-200 cursor-pointer" />
          </Link>
          <Link to={"/favorite"} className="relative block">
            <FiStar className="hover:text-skyText duration-200 cursor-pointer" />

          </Link> */}
          <div className="relative block">
            <FiShoppingBag
              onClick={() => {
                dispatch(setDrawer({ open: true, type: Drawer_Type.Cart }));
                playOn();
              }}
              className="hover:text-skyText duration-200 cursor-pointer" />
            <span className="inline-flex items-center justify-center bg-redText text-whiteText absolute -top-1 -right-2 text-[9px] rounded-full w-4 h-4">
              {cartCount}
            </span>
          </div>
        </div>
      </div>

      <Link className="inline-flex max-w-3xl w-full relative m-2 md:hidden" to={"#items-div-id"}>
        <input
          type="text"
          onChange={(e) => dispatch(setSearchText(e.target.value))}
          value={searchText}
          placeholder="Search products..."
          className="w-full flex-1 rounded-full text-gray-900 text-lg placeholder:text-base placeholder:tracking-wide shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:font-normal focus:ring-1 focus:ring-darkText sm:text-sm px-4 py-2"
        />
        {searchText ? (
          <IoClose
            onClick={() => dispatch(setSearchText(""))}
            className="absolute top-2.5 right-4 text-xl hover:text-red-500 cursor-pointer duration-200"
          />
        ) : (
          <IoSearchOutline className="absolute top-2.5 right-4 text-xl" />
        )}
      </Link>
    </div>
  );
};

export default Header;
