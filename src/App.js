import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import InputForm from "./pages/InputForm";

function App() {
  return (
    <div className="min-h-screen h-full w-full min-w-screen flex flex-col align-center pt-7 ">
      <h2 className="mb-5 text-3xl font-semibold text-center">Truffle Health Assessment</h2>
      <Router>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/input-form/:mode/:id?" element={<InputForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
