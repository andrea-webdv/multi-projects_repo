import logo from '../icons/logo.svg';
import '../styles/home.css'
import { Link } from 'react-router-dom';

export default function Home () {
    return(
        <>
        <img src={logo} className="App-logo" alt="logo" />
          <div>
            <p>
              It's time to learn <code>React</code>
            </p>
            <span id="progress" >
            </span>
            <p className="test">PS: Hello World!</p>
          </div>
          
          <div style={{ display: "flex", gap: "3rem" }} id="navbar">
            <Link to="/about"
              className="App-link"
            >
              About this page!
            </Link>
            <Link to="/course"
              className="App-link"
            >
              Check the progresses!
            </Link>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read the documentation!
            </a>
          </div>
        </>
    )
}

 