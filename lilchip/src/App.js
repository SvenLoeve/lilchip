import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import NavBar from "./components/NavBar/NavBar";

import Login from "./pages/Login/Login";
import ChipScan from "./pages/ChipScan/ChipScan";
import ClientList from "./pages/ClientList/ClientList";
import ClientPage from "./pages/ClientPage/ClientPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <DefaultLayout>
          <Login />
        </DefaultLayout>
      ),
    },
    {
      path: "/chip-scan",
      element: (
        <DefaultLayout>
          <NavBar />
          <ChipScan />
        </DefaultLayout>
      ),
    },
    {
      path: "/client-list",
      element: (
        <DefaultLayout>
          <NavBar />
          <ClientList />
        </DefaultLayout>
      ),
    },
    {
      path: "/client-page/:clientId",
      element: (
        <DefaultLayout>
          <NavBar />
          <ClientPage />
        </DefaultLayout>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
