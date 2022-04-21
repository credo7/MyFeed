import { TiCompass } from "react-icons/ti";
import { BiSearch } from "react-icons/bi";
import {
  AiFillHome,
  // AiOutlineMenu,
  // AiOutlinePlusCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { HiOutlinePaperAirplane, HiOutlineUserGroup } from "react-icons/Hi";
import { BsPatchPlus } from "react-icons/bs";
import { getSession, useSession } from "next-auth/react";

const Header = () => {
  return (
    <>
      <div
        className="min-h-[60px] flex flex-row px-4 justify-between 
      items-center py-[10px] max-w-[970px] lg:mx-auto"
      >
        {/* <div className="cursor-pointer lg:hidden mr-4">
          <IoLogoInstagram className="h-10 w-10" />
        </div> */}
        <div className="relative inline-grid flex-shrink-0">
          <img
            className="h-[29px] w-auto relative top-1"
            src="instTextLogo.svg"
          />
        </div>
        {/* Middle: search Input */}
        <div className="hidden sm:block sm:relative max-w-xs">
          <div className="absolute inset-y-0 pl-3 flex items-center">
            <BiSearch className="w-5 h-5 text-gray-300" />
          </div>

          <input
            className="block w-full pl-10 bg-gray-50 placeholder-gray-300 sm:text-sm border-none rounded-md focus:ring-0"
            type="text"
            placeholder="Search"
          />
        </div>
        {/* End : Buttons */}
        <div className="flex flex-row items-center justify-end space-x-2 sm:space-x-3 md:space-x-6">
          <AiFillHome className="navbtn" />
          {/* <AiOutlineMenu className="h-6 w-6 sm:hidden cursor-pointer text-gray-700" /> */}
          <div className="relative">
            <HiOutlinePaperAirplane className="navbtn rotate-45 relative bottom-1 left-1" />
            <div className="hidden md:flex absolute -top-1.5 left-[16px] text-xs w-4 h-4 bg-red-500 rounded-full items-center justify-center animate-pulse text-white">
              3
            </div>
          </div>
          <BsPatchPlus className="navbtn w-6 h-6" />
          <TiCompass className="navbtn h-8 w-8 rotate-180" />
          <AiOutlineHeart className="navbtn w-8 h-8" />
          <img className="h-8 rounded-full" src="https://i.pravatar.cc/40" />
        </div>
      </div>
    </>
  );
};

export default Header;