import { useRouter } from 'next/router';

import { useAuth } from '../../Context/AuthContext';

const MiniProfile = () => {
  const { logout, currentUser, userSecondaryInfo } = useAuth();
  const router = useRouter();

  const goToProfilePage = () => {
    router.push(`${process.env.BASE_PATH}/${userSecondaryInfo?.username}`);
  };

  return (
    <div className="w-293px max-h-[56px] flex flex-row items-center space-x-2 justify-between pl-4 mt-5">
      <div className="flex flex-row space-x-4 justify-center items-center">
        <img
          onClick={goToProfilePage}
          src={userSecondaryInfo?.photoURL}
          className="w-14 h-14 rounded-full object-cover cursor-pointer"
        />
        <div className="flex flex-col">
          <p
            onClick={goToProfilePage}
            className="font-medium text-sm cursor-pointer"
          >
            {userSecondaryInfo?.username}
          </p>
          <span className="text-gray-500 text-xs truncate max-w-[130px]">
            {userSecondaryInfo?.bio || 'Welcome to instagram'}
          </span>
        </div>
      </div>

      <button onClick={logout} className="text-blue-500 text-xs font-medium">
        Sign out
      </button>
    </div>
  );
};

export default MiniProfile;
