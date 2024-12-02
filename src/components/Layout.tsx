import { Outlet, useNavigate } from "react-router-dom";
import Header from "./common/Header";
import { useEffect } from "react";

const Layout = () => {
  const navigate = useNavigate();

  const isLogin = !!localStorage.getItem("user");

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin, navigate]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
