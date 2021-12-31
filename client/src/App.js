import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";
import AuthContextProvider from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <PostContextProvider>
          <Routes>
            {routes.map((item, index) => (
              <Route
                key={index}
                exact={item.exact || false}
                path={item.path}
                element={item.element}
              />
            ))}
          </Routes>
        </PostContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
