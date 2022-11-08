import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Main;
