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


const router = createBrowserRouter([
  { path: '/', element: <HomeTeam/>},
  { path: "/signup", element: <Signinform/>},
  { path: "/login", element: <Loginform/>},
  {path: '/MyProfile', element: <MyProfile/>},
  {path: '/forgot-password', element: <Passwordreset/>},
  {path: `/resetpassword/:email`, element: <ResetPassword/>},
  {path: '/help', element: <HelpHome/>},
  {path: '/members', element: <MemberPage/>},
  {path: '/addmember', element: <AddMemberPage/>},
  {path: '/conversations', element: <ConersationsMainPage/>}
]);


function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
