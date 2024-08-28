import React from "react";
import styles from "./NewPost.module.css";
import { Form } from "react-router-dom";

export default function NewPost({ createPost }) {
  const handleSubmit = () => {
    createPost();
  };

  return (
    <Form className={styles.form} method="post" onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Title"
        name="title"
      />
      <textarea
        className={styles.input}
        type="textarea"
        placeholder="Content"
        name="content"
        cols="35"
        rows="5"
      />
      <button className={styles.button} type="submit">
        Submit
      </button>
    </Form>
  );
}
