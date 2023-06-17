import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import InputForm from "./pages/InputForm";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="min-h-screen h-full w-full min-w-screen flex flex-col align-center">
      <NavBar />
      <Routes>
        <Route path="" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/input-form/:mode/:id?" element={<InputForm />} />
      </Routes>
    </div>
  );
}

export default App;
