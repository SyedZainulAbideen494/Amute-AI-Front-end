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
import MyProfile from "./My Profile/myProfile";
import QRScanner from "./QR Code Scanner/qrscanner";
import Passwordreset from "./passwordreset/password-reset";
import ResetPassword from "./passwordreset/password-reset-page";
import HelpHome from "./Help/helpMainPage";
import MemberPage from "./members/Memberpage";
import AddMember from "./add member/add_member";
import AddMemberPage from "./add member/add_memberpage";
import ConversationsPage from "./conversations/conversationsTeam";
import Conversations from "./home/conversations";
import ConersationsMainPage from "./conversations/conversationsPage";
import Statements from "./statements/statements";
import AddBuilding from "./add buildings/add-building";


const router = createBrowserRouter([
  { path: '/', element: <HomeTeam/>},
  {path: '/members', element: <MemberPage/>},
  {path: '/add-members', element: <AddMemberPage/>},
  {path: '/conversations', element: <ConersationsMainPage/>},
  {path: '/statements', element: <Statements/>},
  {path: '/building/add', element: <AddBuilding/>}
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
