import { Fragment, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import { GrFormClose } from "react-icons/gr";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { Dialog, Transition } from "@headlessui/react";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadString } from "firebase/storage";

const Modal = ({ currentUser }: any) => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const captionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedFile, setSelectedFile] = useState(null as any);
  const [loading, setLoading] = useState(false);

  const addImageToPost = (e: any) => {
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

  const uploadPost = async () => {
    if (loading) return;

    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      username: currentUser.email,
      caption: captionRef.current.value,
      profileImg: currentUser.image,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    imageRef.bucket.replace("appspot.com", "firebaseapp.com");

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        await updateDoc(doc(db, "posts", docRef.id), { image: downloadURL });
      }
    );

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    open && (document.body.style.overflow = "hidden");
    !open && (document.body.style.overflow = "unset");
  }, [open]);

  return (
    <>
      {open && (
        <div className=" w-full h-screen fixed bg-[#030303c7] top-0 z-50 scrollbar-hide">
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col w-[50%] h-[80%] min-h-[400px] bg-white border-[1px] border-gray-300 rounded-lg min-w-[250px] relative">
              <div className="min-h-[50px] flex h-14 justify-center items-center w-full border-b-[1px]">
                <p>Create new post</p>
              </div>
              <div className="flex flex-col h-full justify-center items-center pb-6">
                <div className="flex justify-center items-center h-[60%] w-full min-h-[80px] py-4">
                  {selectedFile ? (
                    <img
                      className="max-h-full max-w-full h-full w-auto"
                      onClick={() => setSelectedFile(null)}
                      src={selectedFile}
                      alt="uploaded_img"
                    />
                  ) : (
                    <AiOutlineCloudUpload
                      onClick={() => filePickerRef.current.click()}
                      className="w-[50%] h-[80%] text-gray-300"
                    />
                  )}
                </div>

                <p className="pb-6 text-xl">Drag photos and videos here</p>
                <div className="flex flex-col space-y-4 mb-8">
                  <button
                    onClick={() => filePickerRef.current.click()}
                    className=" bg-gray-300 p-2 px-4 rounded-lg text-gray-800"
                  >
                    Select from Computer
                  </button>
                  <div className="absolute">
                    <input
                      ref={filePickerRef}
                      onChange={addImageToPost}
                      type="file"
                      hidden
                    />
                  </div>
                  <input
                    ref={captionRef}
                    placeholder="Please enter a caption"
                    className=" py-1 px-4 outline-none border-[1px] rounded-md text-gray-500 w-[192px] font-light"
                  />
                  <button
                    onClick={uploadPost}
                    hidden={!selectedFile}
                    className=" bg-blue-400 p-2 px-4 rounded-lg text-white my-4"
                  >
                    {loading ? "Uploading..." : "Upload post"}
                  </button>
                </div>
              </div>
              <GrFormClose
                onClick={() => {
                  setOpen(false);
                }}
                className="absolute h-6 w-6 text-gray-800 top-[14px] right-3"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
