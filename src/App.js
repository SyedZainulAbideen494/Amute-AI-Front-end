import "./index.css";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Params,
} from "react-router-dom";
import Home from "./home/home";
import Signinform from "./auth/signinform";
import Loginform from "./auth/loginform";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signinform/>},
  { path: "/login", element: <Loginform/>},
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
