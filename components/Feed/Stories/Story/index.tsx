import { IStory } from "../../../../compiler/types";
import { alertSoon } from "../../../../functions";

const Story = ({ username, imageURL, profileImg }: IStory) => {
  return (
    <div onClick={alertSoon}>
      <img
        className="h-[64px] w-[64px] rounded-[20px] p-[1.5px] object-cover 
      cursor-pointer border-2 border-red-500 hover:scale-110 transition 
      transform duration-200 ease-out"
        src={imageURL}
      />
      <p className="mt-[4px] text-xs w-16 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
