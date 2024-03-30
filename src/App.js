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
import Summary from "./home/summary";
import CompanyCreate from "./company/createCompany";
import TeamPage from "./team/Main Team Page/TeamPage";
import ProfilePicUpload from "./My Profile/EditMyProfile";
import TaskPage from "./Task/Taskpage";
import ManagerTeam from "./team/Manage Team/ManageTeam";

const router = createBrowserRouter([
  { path: "/dashboard", element: <HomeTeam /> },
  { path: '/', element: <Website/>},
  { path: "/signup", element: <Signinform/>},
  { path: "/login", element: <Loginform/>},
  { path: '/summary', element: <Summary/>},
  { path: '/team', element: <TeamPage/>},
  { path: '/task', element: <TaskPage/>},
  { path: '/team/:id', element: <ManagerTeam/>},
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
