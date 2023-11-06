import "./App.css";
import Login from "./components/Login/Login";
import DefaultLayout from "./layouts/DefaultLayout";

function App() {
  return (
    <div>
      <DefaultLayout>
        <Login />
      </DefaultLayout>
    </div>
  );
}

export default App;
