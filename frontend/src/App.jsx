import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

import Feed from "./pages/Feed"
import ViewRequests from "./pages/ViewRequests";
import FriendList from "./pages/FriendList";
// import ProfilePage from "./pages/ProfilePage"
    
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/feed" element={<Feed/>}/>
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/viewrequest" element={<ViewRequests />} />
          <Route path="/friendlist" element={<FriendList />} />
          {/* <Route path="/profile" element={<ProfilePage />} /> */}

      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
