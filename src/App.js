import logo from './logo.svg';
import './App.css';

function getYear() {                              // императивный
  let date = new Date();
  let year = date.getFullYear()
  return (<p>{year}</p>)
}


export const App = () => {                   // декларативный
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
        <p>
          Year  {getYear()}
        </p>
      </header>
    </div>
  );
}



