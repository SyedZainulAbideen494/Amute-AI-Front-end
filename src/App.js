import "./index.css";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Link,
  Params,
} from "react-router-dom";
import HomeTeam from "./home/homeTeam";
import Signinform from "./auth/signinform";
import Loginform from "./auth/loginform";
import Website from "./website/website";

const router = createBrowserRouter([
  { path: "/dashboard", element: <HomeTeam /> },
  { path: '/', element: <Website/>},
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
