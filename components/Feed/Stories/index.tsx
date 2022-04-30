import { Key, useEffect, useState } from "react";
import faker from "@faker-js/faker";
import Story from "./Story";

const Stories = () => {
  const [suggestions, setSuggestions] = useState([] as any);

  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-4 px-5 py-2 sm:py-4 bg-white overflow-x-scroll 
    scrollbar-hide border-y sm:border-x border-gray-200 rounded-sm">
      {suggestions.map(
        (profile: { id: Key; avatar: string; username: string }) => (
          <Story
            key={profile.id}
            img={profile.avatar}
            username={profile.username}
          />
        )
      )}
    </div>
  );
};

export default Stories;
