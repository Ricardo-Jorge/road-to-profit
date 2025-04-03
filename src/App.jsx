import "./App.css";

// Hooks
import { useAuth } from "./hooks/useAuth";

// React Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home/Home";
import FormAluguel from "./pages/Form/FormAluguel";
import FormFinanciamento from "./pages/Form/FormFinanciamento";
import FormQuitado from "./pages/Form/FormQuitado";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Profile/EditProfile";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/register"
              element={!auth ? <Register /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!auth ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/profile"
              element={auth ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/edit-profile"
              element={auth ? <EditProfile /> : <Navigate to="/login" />}
            />
            <Route
              path="/alugado"
              element={auth ? <FormAluguel /> : <Navigate to="/login" />}
            />
            <Route
              path="/financiado"
              element={auth ? <FormFinanciamento /> : <Navigate to="/login" />}
            />
            <Route
              path="/quitado"
              element={auth ? <FormQuitado /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
