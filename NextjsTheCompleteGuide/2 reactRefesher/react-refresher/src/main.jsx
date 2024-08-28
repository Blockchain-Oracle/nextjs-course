import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";

// import NewPost from "./components/NewPost";
import NotFound from "./components/NotFound.jsx";

// Define a loader function
const postListLoader = async () => {
  const response = await fetch("http://localhost:5000/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  return response.json();
};

const fetchPosts = async ({ request }) => {
  const formData = await request.formData();
  const postdata = Object.fromEntries(formData.entries());
  const response = await fetch("http://localhost:5000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postdata),
  });
  console.log("using fetchPosts method");
  const data = await response.json();
  console.log(data);
  return data;
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App posts={await postListLoader()} />,
    loader: postListLoader,
    action: async ({ request }) => {
      await fetchPosts({ request });
      redirect("/");
      return null;
    },
  },
  // {
  //   path: "/new-post",
  //   element: <NewPost createPost={addPostAction} />,
  // },
  {
    path: "*",
    element: <NotFound />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
