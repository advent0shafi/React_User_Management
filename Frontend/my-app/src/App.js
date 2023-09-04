import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./compontents/login/Login";
import Home from "./compontents/home/Home";
import Register from "./compontents/register/Register";
import Profile from "./compontents/profile/Profile";
import Admin from "./compontents/admin/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
