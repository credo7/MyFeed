const Story = ({ img, username }: any) => {
  return (
    <div>
      <img
        className=" h-15 w-15 rounded-full p-[1.5px] object-cover 
      cursor-pointer border-2 border-red-500 hover:scale-110 transition 
      transform duration-200 ease-out"
        src={img}
      />
      <p className="mt-[4px] text-xs font-light w-16 truncate text-center">{username}</p>
    </div>
  );
};

export default Story;
