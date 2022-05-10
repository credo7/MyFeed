import Suggestion from './Suggestion';

interface SuggestionData {
  photoURL: string;
  username: string;
  bio: string;
}

const Suggestions = () => {
  const dummySuggestions: SuggestionData[] = [
    {
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-8f507.appspot.com/o/oUs7CgD4i7PJA8pkNrmyvcPJKuH3%2Fprofile.png?alt=media&token=2447033b-0516-4ff3-855d-f06a4e1142a4',
      username: 'lacity',
      bio: '👉 Love Los Angeles? Follow⬆️  🏰 Beautiful places beloved city! Tag or dm to be featured📸',
    },
    {
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-8f507.appspot.com/o/zXg1SAXRuqZEdSlK7yDWJLwm7Ff1%2Fprofile.png?alt=media&token=bbbb6ed0-a149-443f-80ff-2994c2dff4d7',
      username: 'itmemes',
      bio: "Memes about programming and other very high quality stuff. Why are u still reading? Go follow right here, it's free=)",
    },
    {
      photoURL:
        'https://firebasestorage.googleapis.com/v0/b/instagram-clone-8f507.appspot.com/o/cjf2Edn48Fhk14roCM8ZeJ52V5h1%2Fprofile.png?alt=media&token=41a69475-94b3-40cf-9f6a-cf055f918982',
      username: 'cars',
      bio: 'Send us your picture of modelcar and we will share it on our page only 1:18 and 1:12 scale',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="flex flex-row justify-between items-center pl-4">
        <p className=" text-gray-500 font-medium my-3 text-sm">
          Suggestions For You
        </p>
        <p className=" font-medium text-gray-800 text-sm">See all</p>
      </div>
      <div className="flex flex-col space-y-2">
        {dummySuggestions.map((suggestion, index) => {
          return (
            <Suggestion
              key={index}
              username={suggestion.username}
              userImg={suggestion.photoURL}
              bio={suggestion.bio}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Suggestions;
