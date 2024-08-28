import styles from "./post.module.css";

export default function Post({ author, title, content }) {
  return (
    <li className={styles.post}>
      <h2>{title}</h2>
      <p>{content}</p>
      <p>{author}</p>
    </li>
  );
}
