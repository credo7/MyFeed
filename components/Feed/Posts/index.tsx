import Post from "./Post";

const Posts = () => {
  const posts = [
    {
      id: 1,
      username: "Credo",
      userImg: "https://i.pravatar.cc",
      caption: "Monkey!",
    },
    {
      id: 2,
      username: "Credo",
      userImg: "https://i.pravatar.cc",
      caption: "Monkey!",
    },
    {
      id: 3,
      username: "Credo",
      userImg: "https://i.pravatar.cc",
      caption: "Monkey!",
    },
    {
      id: 4,
      username: "Credo",
      userImg: "https://i.pravatar.cc",
      caption: "Monkey!",
    },
  ];
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
