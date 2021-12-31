import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "react-bootstrap/Spinner";
import { Router } from "../../utils/path";
import NavbarMenu from "../layout/NavbarMenu";

const ProtectedRoute = ({ element: Element }, ...rest) => {
  const {
    authState: { authLoading, isAuthenticated },
  } = useContext(AuthContext);

  if (authLoading)
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  else if (isAuthenticated)
    return (
      <>
        <NavbarMenu />
        <Element {...rest} />
      </>
    );
  else return <Navigate to={Router.login} />;
};

export default ProtectedRoute;
