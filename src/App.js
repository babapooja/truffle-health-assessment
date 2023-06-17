import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import InputForm from "./pages/InputForm";
import Login from "./pages/Login";
import Register from "./pages/Register";

import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  var currentUser = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <div className="min-h-screen h-full w-full min-w-screen flex flex-col align-center">
      <Routes>
        <Route
          path=""
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/details/:id"
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />
        <Route
          path="/input-form/:mode/:id?"
          element={
            <ProtectedRoute>
              <InputForm />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
