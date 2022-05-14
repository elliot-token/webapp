import { Route, Routes as LibraryRoutes } from "react-router-dom";
import Home from "../pages/Home/Home";
import Signup from "../pages/Signup";

const Routes = () => {
  return (
    <LibraryRoutes>
      <Route path="/" element={<Home />} />
      <Route path="signup" element={<Signup />} />
    </LibraryRoutes>
  );
};

export default Routes;
