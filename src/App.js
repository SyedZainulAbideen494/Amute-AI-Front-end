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
import HostEventPage from "./Host Event/HostEventPage";
import EventDetails from "./Host Event/eventDetails";
import QRScanner from "./Host Event/camera";

const router = createBrowserRouter([
  { path: "/dashboard", element: <HomeTeam /> },
  { path: '/', element: <Website/>},
  { path: "/signup", element: <Signinform/>},
  { path: "/login", element: <Loginform/>},
  { path: '/host/new/event', element: <HostEventPage/> },
  { path: '/event/host/admin/:id', element: <EventDetails/> },
  {path: '/camera', element: <QRScanner/>}
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
