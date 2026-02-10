import { Link } from "react-router-dom";

export default function About() {
    return(
        <>
                          <h2>Wellcome and thanks for yor visit!</h2>
                  <div className="about">
                    <p>
                      To create this page, I started with this template offered by Rect called 'my first App'; you've surely noticed the similarity.
                      <hr/>
                      Little by little, studying this framework, I developed the page: <br/>
                      Adding components and pages that functioned as use cases for the features and hooks.
                    </p>
                    <p className="test">Always aiming to compile the most compact code i know to write at now.</p>
                    <br/>
                    <pre>If you are interested in seeing my results in writing code yourself, feel free to download the folder.
                      Some parts of the code are questionable, but as I said above, they are potentially parts
                      written to implement certain hooks or patterns typical of React programming.
                    </pre>
                  </div>
                  <Link to="/"
            className="App-link"
          >
          Home
        </Link>
        </>
    )
}