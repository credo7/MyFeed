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
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import { useAuth } from "../Context/AuthContext";
import { FaRegUserCircle } from "react-icons/fa";
import { useRef, useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { storage } from "../../firebase";
import { updateProfile } from "firebase/auth";

const Header = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const { currentUser } = useAuth();
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const filePickerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedFile, setSelectedFile] = useState(null as any);
  const [loading, setLoading] = useState(false);

  const addImageToProfile = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result as any);
      }
    };
  };

  const uploadPicture = async () => {
    if (loading) return;

    setLoading(true);
    const imageRef = ref(storage, `${currentUser.uid}/profile.png`);
    imageRef.bucket.replace("appspot.com", "firebaseapp.com");
    await uploadString(imageRef, selectedFile, "data_url")
      .then(async (snapshot) => {
        const downloadImageURL = await getDownloadURL(imageRef);
        updateProfile(currentUser, { image: downloadImageURL } as any);
      })
      .catch((e) => console.log(e));
    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

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
        <div className="flex flex-row items-center justify-end space-x-2 sm:space-x-3 md:space-x-6 relative">
          <AiFillHome className="navbtn" />
          {/* <AiOutlineMenu className="h-6 w-6 sm:hidden cursor-pointer text-gray-700" /> */}
          <div className="relative">
            <HiOutlinePaperAirplane className="navbtn rotate-45 relative bottom-1 left-1" />
            <div className="hidden md:flex absolute -top-1.5 left-[16px] text-xs w-4 h-4 bg-red-500 rounded-full items-center justify-center animate-pulse text-white">
              3
            </div>
          </div>
          <BsPatchPlus
            onClick={() => setOpen(true)}
            className="navbtn w-6 h-6"
          />
          <TiCompass className="navbtn h-8 w-8 rotate-180" />
          <AiOutlineHeart className="navbtn w-8 h-8" />
          <div onClick={() => setOpenProfileModal(!openProfileModal)}>
            {currentUser.photoURL ? (
              <img
                className="h-9 w-9 rounded-full object-cover"
                src={currentUser.photoURL}
              />
            ) : (
              <FaRegUserCircle className="h-7 w-7" />
            )}
          </div>
          {openProfileModal ? (
            <div className="absolute top-[76px] right-0 bg-white border-[1px] border-gray-200 rounded-sm flex flex-col items-center justify-center min-h-[280px] min-w-[210px]">
              {/* <p className="mt-4 mb-6">username</p> */}
              {currentUser.photoURL ? (
                <img
                  onClick={() => filePickerRef.current.click()}
                  className="h-28 w-28 object-cover rounded-full cursor-pointer mt-[12px]"
                  src={currentUser.photoURL}
                />
              ) : (
                <FaRegUserCircle
                  onClick={() => filePickerRef.current.click()}
                  className="h-28 w-28 cursor-pointer"
                />
              )}
              <input
                ref={filePickerRef}
                type="file"
                className="absolute"
                hidden
                onChange={addImageToProfile}
              />
              {selectedFile ? (
                <button
                  className="mt-5 mb-1 bg-blue-400 h-[28px] w-[112px] text-white text-lg rounded-sm font-light"
                  onClick={uploadPicture}
                >
                  {loading ? "Loading..." : "Upload"}
                </button>
              ) : (
                <button
                  className="text-sm text-gray-400 mt-5 mb-1 h-[28px] w-[112px]"
                  onClick={() => filePickerRef.current.click()}
                >
                  Click to change
                </button>
              )}
              {/* <p>Full name</p> */}
              {/* <p>Bio</p> */}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
