import { Link, useLocation } from 'react-router'
import Clock from '../components/clock';
import ListPage from "./ListPage";
import FetchFacts from "../components/catFact";
import Home from "./Home";
import question from '../icons/questioning_logo.png';



export default function SwitchPage(){    
  let content;

  //THIS IS A VERSION IN WICH I USE CONDITIONAL RENDERING: 
  // BY ASSIGN DIFFERENT VALUES TO A VARIABLE AND THEN RENDER IT
  
  let location = useLocation()


    

   // console.log("address: ", location.pathname);
  
    switch (location.pathname) {
    case "/":
      let time = Clock()
      content = (
        <>
          <Home/>
          <FetchFacts time={time.runtime}/>
          <br></br>
          <div id="clockScreen">
            {time.display}
          </div>
        </>
      );

      break;
    case "/course":
      content = (
        <>
        
          <h3>FOLLOW THE PATH</h3>
          <ListPage />
            <Link to="/"
              className="App-link"
            >
            Home
          </Link>
        </>
      );
      break;

    default:
      <>
        <img src={question} className="question-logo" alt="404!" />
        <h2 style={
          {color:'rgb(238, 210, 31)',
          fontFamily: '"Comic Sans", "Gill Sans", "Gill Sans MT", Calibri',
          alignSelf: 'center'
          }}>
            404 YOU'VE COME TO THE WRONG PLACE
        </h2>
        <br/>
          <Link to="/"
            className="App-link"
          >
          Home
        </Link>
      </>
      break;
  }

  return content
}