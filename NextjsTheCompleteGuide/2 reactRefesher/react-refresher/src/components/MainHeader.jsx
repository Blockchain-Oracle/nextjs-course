import React from "react";
import styles from "./MainHeader.module.css";

export default function MainHeader({ setShowAddPost }) {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>React Poster</h1>
      <button className={styles.addPost} onClick={() => setShowAddPost(true)}>
        <i className="fas fa-plus"></i>
        Add Post
      </button>
    </div>
  );
}
