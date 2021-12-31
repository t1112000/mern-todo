import { Router } from "../utils/path";
import Auth from "../views/Auth";
import Dashboard from "../views/Dashboard";
import Landing from "../components/layout/Landing";
import ProtectedRoute from "../components/routing/ProtectedRoute";
import About from "../views/About";

const index = [
  {
    exact: true,
    path: Router.landing,
    element: <Landing />,
  },
  {
    path: Router.login,
    element: <Auth authRoute={Router.login} />,
  },
  {
    path: Router.register,
    element: <Auth authRoute={Router.register} />,
  },
  {
    path: Router.dashboard,
    element: <ProtectedRoute element={Dashboard} />,
  },
  {
    path: Router.about,
    element: <ProtectedRoute element={About} />,
  },
];

export default index;
