import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login/Login";
import Contacts from "./components/Contacts/Contacts";

function App() {
  return (
    <div className="App">
      <header className="App-header">CUTE LOGIN FORM</header>
      <Login></Login>
      <Contacts></Contacts>
    </div>
  );
}

export default App;
