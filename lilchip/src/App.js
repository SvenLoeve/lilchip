import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import DefaultLayout from "./components/layouts/DefaultLayout";
import Login from "./components/login/Login";
import ChipScan from "./components/chipScan/ChipScan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chip-scan" element={<ChipScan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
