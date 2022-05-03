import MiniProfile from "./MiniProfile";
import Posts from "./Posts";
import Stories from "./Stories";
import Suggestions from "./Suggestions";

const Feed = () => {
  return (
    <main
      className=" overflow-hidden grid grid-cols-1 md:grid-cols-2 md:max-w-3xl 
    xl:grid-cols-3 xl:max-w-[938px] mx-auto sm:pt-[32px]"
    >
      <section className=" w-full col-span-2 max-w-[614px] mx-auto min-h-[150px]">
        <Stories />
        <Posts />
      </section>
      <section className="hidden xl:inline-grid md:col-span-1 ml-4">
        <div className="fixed w-[293px]">
          <MiniProfile />
          <Suggestions />
        </div>
      </section>
    </main>
  );
};

export default Feed;
