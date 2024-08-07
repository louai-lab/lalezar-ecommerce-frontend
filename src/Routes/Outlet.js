import { Outlet } from "react-router-dom";
import Footer from "../Layouts/Footer/Footer";
import Navbar from "../Layouts/Navbar/Navbar";

const Layout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <main
        style={{
          flex: 1,
        }}
      >
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
