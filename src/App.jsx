import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FormAluguel from "./pages/Form/FormAluguel";
import FormFinanciamento from "./pages/Form/FormFinanciamento";
import Navbar from "./components/Navbar";
import FormQuitado from "./pages/Form/FormQuitado";
import Register from "./pages/Auth/Register";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users/register" element={<Register />} />
            <Route path="/alugado" element={<FormAluguel />} />
            <Route path="/financiado" element={<FormFinanciamento />} />
            <Route path="/proprio" element={<FormQuitado />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
