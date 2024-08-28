import React, { useState } from "react";
import Post from "./Post";
import styles from "./PostList.module.css";
import NewPost from "./NewPost";
import Modal from "./Modal";

export default function PostList({ isOpen, setShowAddPost, posts: posta }) {
  const [posts, setPosts] = useState([]);
  const createPost = () => {
    handleClose();
  };

  console.log(posta, "posta");
  console.log(posts, "posts");

  React.useEffect(() => {
    setPosts(posta);
  }, [posta]);

  const handleClose = () => {
    setShowAddPost(false);
  };

  let modalContent;
  if (isOpen) {
    modalContent = (
      <Modal handleClose={handleClose}>
        <NewPost createPost={createPost} />
      </Modal>
    );
  }
  return (
    <>
      {modalContent}
      <ul className={styles.list}>
        {posts?.length === 0 ? (
          <p>No posts found</p>
        ) : (
          posts?.map((post, index) => (
            <Post key={index} title={post.title} content={post.content} />
          ))
        )}
      </ul>
    </>
  );
}
