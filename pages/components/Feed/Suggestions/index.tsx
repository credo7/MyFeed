import Suggestion from "./Suggestion";

const Suggestions = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center pl-4">
        <p className=" text-gray-500 font-medium my-3 text-sm">
          Suggestions For You
        </p>
        <p className=" font-medium text-gray-800 text-sm">See all</p>
      </div>
      <div className="flex flex-col space-y-2">
        <Suggestion
          username="Fuck_Me"
          userImg="https://i.pravatar.cc"
          caption="I'm lucky"
        />
        <Suggestion
          username="Fuck_Me"
          userImg="https://i.pravatar.cc"
          caption="I'm lucky"
        />
        <Suggestion
          username="Fuck_Me"
          userImg="https://i.pravatar.cc"
          caption="I'm lucky"
        />
        <Suggestion
          username="Fuck_Me"
          userImg="https://i.pravatar.cc"
          caption="I'm lucky"
        />
        <Suggestion
          username="Fuck_Me"
          userImg="https://i.pravatar.cc"
          caption="I'm lucky"
        />
      </div>
    </div>
  );
};

export default Suggestions;
