import { Outlet } from "react-router-dom";
import Header from "./common/Header";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="mt-56">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
