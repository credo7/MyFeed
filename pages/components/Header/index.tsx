import { IoLogoInstagram } from "react-icons/io";
import { BiSearch } from "react-icons/bi";
import {
  AiFillHome,
  AiOutlineMenu,
  AiOutlinePlusCircle,
  AiOutlineHeart,
} from "react-icons/ai";
import { HiOutlinePaperAirplane, HiOutlineUserGroup } from "react-icons/Hi";

const Header = () => {
  return (
    <>
      <div className="shadow-sm flex flex-row px-4 justify-between items-center py-4 max-w-6xl lg:mx-auto">
        <div className="cursor-pointer lg:hidden mr-4">
          <IoLogoInstagram className="h-10 w-10" />
        </div>
        <div className="relative hidden lg:inline-grid flex-shrink-0">
          <img className="h-auto w-24" src="instTextLogo.svg" />
        </div>
        {/* Middle: search Input */}
        <div className="relative max-w-xs">
          <div className="absolute inset-y-0 pl-3 flex items-center">
            <BiSearch className="w-5 h-5 text-gray-500" />
          </div>

          <input
            className="block w-full pl-10 bg-gray-50 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md"
            type="text"
            placeholder="Search"
          />
        </div>
        {/* End : Buttons */}
        <div className="flex flex-row items-center justify-end space-x-4">
          <AiFillHome className="navbtn" />
          <AiOutlineMenu className="h-6 w-6 md:hidden cursor-pointer text-gray-700" />
          <div className="relative">
            <HiOutlinePaperAirplane className="navbtn rotate-45 relative bottom-1 left-1" />
            <div className="hidden md:flex absolute -top-1.5 left-[16px] text-xs w-4 h-4 bg-red-500 rounded-full items-center justify-center animate-pulse text-white">3</div>
          </div>
          <AiOutlinePlusCircle className="navbtn" />
          <HiOutlineUserGroup className="navbtn" />
          <AiOutlineHeart className="navbtn" />
          <img className="h-10 rounded-full" src="https://i.pravatar.cc/40" />
        </div>
      </div>
    </>
  );
};

export default Header;
