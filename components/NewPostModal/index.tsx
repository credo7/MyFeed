import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { GrFormClose } from 'react-icons/gr';
import { useRecoilState } from 'recoil';
import { uid } from 'uid';

import { modalState } from '../../atoms/modalAtom';
import { db, storage } from '../../firebase';
import { useAuth } from '../Context/AuthContext';

const Modal = () => {
  const [open, setOpen] = useRecoilState(modalState);
  const filePickerRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const captionRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [selectedFile, setSelectedFile] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const { currentUser, updateUserSecondaryInfo } = useAuth();

  const addImageToPost = (e: { target: { files: Blob[]; }; }) => {
    const reader = new FileReader();
    if (e.target?.files && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFile(readerEvent.target?.result);
      }
    };
  };

  const uploadPost = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    await updateUserSecondaryInfo();

    const userDocs = await getDocs(
      query(collection(db, 'users'), where('uid', '==', currentUser.uid)),
    );

    const user = await userDocs?.docs[0]?.data();

    const docRef = await addDoc(collection(db, 'posts'), {
      uid: uid(),
      user_uid: currentUser.uid,
      username: user.username,
      caption: captionRef.current.value,
      profileImg: user.photoURL,
      timeStamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    imageRef.bucket.replace('appspot.com', 'firebaseapp.com');

    await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(doc(db, 'posts', docRef.id), {
        imageURL: downloadURL,
      });
    });

    setOpen(false);
    setLoading(false);
    setSelectedFile(null);
  };

  useEffect(() => {
    open && (document.body.style.overflow = 'hidden');
    !open && (document.body.style.overflow = 'unset');
  }, [open]);

  return (
    <>
      {open && (
        <div className=" w-full vh_for_iphones fixed bg-[#030303c7] top-0 z-50 scrollbar-hide">
          <div className="w-full vh_for_iphones flex items-center justify-center">
            <div className="flex flex-col w-[90%] md:w-[50%] h-[80%] min-h-[400px] sm:min-h-[680px] bg-white border-[1px] border-gray-300 rounded-[32px] min-w-[250px] relative">
              <div className="min-h-[50px] flex h-14 justify-center items-center w-full border-b-[1px]">
                <p>Create new post</p>
              </div>
              <div className="flex flex-col h-full justify-center items-center pb-6">
                <div className="flex justify-center items-center h-[60%] w-full min-h-[80px] py-4">
                  {selectedFile ? (
                    <div className="flex items-center justify-center h-[300px] md:h-[400px] overflow-hidden">
                      <img
                        onClick={() => setSelectedFile(null)}
                        src={selectedFile}
                        alt="uploaded_img"
                      />
                    </div>
                  ) : (
                    <AiOutlineCloudUpload
                      onClick={() => filePickerRef.current.click()}
                      className="w-[50%] h-[80%] text-gray-300"
                    />
                  )}
                </div>

                <p className="py-4 text-xl">Drag photos here</p>
                <div className="flex flex-col space-y-4 mb-8">
                  <button
                    onClick={() => filePickerRef.current.click()}
                    className=" bg-gray-800 text-white p-2 px-4 rounded-[32px]"
                  >
                    Select from Computer
                  </button>
                  <div className="absolute">
                    <input
                      ref={filePickerRef}
                      onChange={addImageToPost as any}
                      type="file"
                      hidden
                    />
                  </div>
                  <form
                    className="flex flex-col space-y-4"
                    onSubmit={uploadPost as any}
                  >
                    <input
                      ref={captionRef}
                      placeholder="Please enter a caption"
                      className=" py-1 px-4 outline-none text-[16px] border-[1px] rounded-[32px] text-gray-500 w-[192px] font-light"
                    />
                    <button
                      hidden={!selectedFile}
                      className=" bg-blue-400 p-2 px-4 rounded-[32px] text-white my-4"
                    >
                      {loading ? 'Uploading...' : 'Upload post'}
                    </button>
                  </form>
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
