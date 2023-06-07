import Main from "../Layout/Main";
import Blogs from "../Pages/Blogs";
import Experience from "../Pages/Experience";
import Homepage from "../Pages/Homepage/Homepage";
import Projects from "../Pages/Projects";
import SingleProject from "../Pages/SingleProject";
const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Homepage></Homepage>,
      },
      {
        path: "/experience",
        element: <Experience></Experience>,
      },
      {
        path: "/projects",
        element: <Projects></Projects>,
      },
      {
        path: "/project/:id",
        element: <SingleProject></SingleProject>,
      },
      {
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
    ],
  },
]);

export default router;
