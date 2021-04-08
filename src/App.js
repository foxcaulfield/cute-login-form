import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import Contacts from "./components/Contacts/Contacts";
import { BrowserRouter, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* <header className="App-header">CUTE LOGIN FORM</header> */}
        <Route path={"/login"} render={() => <Login />} />
        <Route path={"/contacts"} render={() => <Contacts />} />
      </div>
    </BrowserRouter>
  );
}

export default App;
