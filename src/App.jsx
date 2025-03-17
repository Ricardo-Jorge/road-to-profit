import "./App.css";

// Hooks
import { useAuth } from "./hooks/useAuth";

// React Router
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home/Home";
import FormAluguel from "./pages/Form/FormAluguel";
import FormFinanciamento from "./pages/Form/FormFinanciamento";
import FormQuitado from "./pages/Form/FormQuitado";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

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
      </BrowserRouter>
    </div>
  );
}

export default App;
