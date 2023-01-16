import logo from './logo.svg';
import './App.css';
import RegisterComponent from "./component/register";

function Header({ name }) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
          React Lesson : {name}
      </header>
    </div>
  );
}

function App() {
  return (
    <RegisterComponent />
  );
}

export default App;
