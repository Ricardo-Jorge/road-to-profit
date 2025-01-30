import "./App.css";
import Form from "./components/Form";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Calculadora de Custos (Uber):</h1>

        <Form />

        <br />
      </div>
    </>
  );
}

export default App;
