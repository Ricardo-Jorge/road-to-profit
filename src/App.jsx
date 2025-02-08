import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import FormAluguel from "./pages/Form/FormAluguel";
import FormFinanciamento from "./pages/Form/FormFinanciamento";
import Navbar from "./components/Navbar";
import FormQuitado from "./pages/Form/FormQuitado";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/alugado" element={<FormAluguel />} />
          </Routes>
          <Routes>
            <Route path="/financiado" element={<FormFinanciamento />} />
          </Routes>
          <Routes>
            <Route path="/proprio" element={<FormQuitado />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
