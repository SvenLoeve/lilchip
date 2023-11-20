import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import Login from "./pages/Login/Login";
import ChipScan from "./pages/ChipScan/ChipScan";

function App() {
  return (
    <DefaultLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chip-scan" element={<ChipScan />} />
        </Routes>
      </BrowserRouter>
    </DefaultLayout>
  );
}

export default App;
