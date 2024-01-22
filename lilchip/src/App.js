import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import DefaultLayout from "./components/DefaultLayout/DefaultLayout";
import NavBar from "./components/NavBar/NavBar";

import Login from "./pages/Login/Login";
import ChipScan from "./pages/ChipScan/ChipScan";
import ClientList from "./pages/ClientList/ClientList";
import ClientPage from "./pages/ClientPage/ClientPage";
import AddClient from "./pages/AddClient/AddClient";

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
      path: "/add-client",
      element: (
        <DefaultLayout>
          <NavBar />
          <AddClient />
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

//this is a test 2.0
