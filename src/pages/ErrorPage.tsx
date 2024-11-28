import { useRouteError } from "react-router-dom";
import errorImg from "/img/errorImg.png";

const ErrorPage = () => {
  const error = useRouteError();
  console.log({ error });
  return (
    <>
      <img src={errorImg} alt="" />
      <h2>Page Not Found</h2>
    </>
  );
};
export default ErrorPage;
