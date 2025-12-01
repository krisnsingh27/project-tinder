import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
// import Logout from "./pages/Logout";
// import Feed from "./pages/Feed"

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* <Route path="/feed" element={<Feed/>}/> */}
        <Route path="/" element={<Signup />} />
        <Route path="/login" element={<Login />} />
         {/* <Route path="/logout" element={<Logout />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
