import { useState } from "react";

import "./App.css";

import PostList from "./components/PostList";
import MainHeader from "./components/MainHeader";

function App({ posts }) {
  const [showAddPost, setShowAddPost] = useState(false);
  return (
    <>
      <div>
        <MainHeader setShowAddPost={setShowAddPost} />
        <PostList
          isOpen={showAddPost}
          setShowAddPost={setShowAddPost}
          posts={posts}
        />
      </div>
    </>
  );
}
export default App;
