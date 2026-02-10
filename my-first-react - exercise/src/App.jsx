import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import { ErrorBoundary } from "./components/React_ErrorBoundary";
import SwitchPage from "./pages/SwitchPage";
import About from "./pages/About";
import ProgressKeeper from "./components/ProgressContext";


function App() {

  return (
    <ErrorBoundary>
       <div className="App">
          <header className="App-header">
            <ProgressKeeper>
            <BrowserRouter>
              <Routes>

                <Route path="/" element={<SwitchPage/>}>
                </Route>

                <Route path="/course" element={<SwitchPage/>}>
                </Route>

                <Route path="/about" element={<About/>}>
                </Route>

              </Routes>
            </BrowserRouter>
            </ProgressKeeper>
          </header>
        </div>
    </ErrorBoundary>
  );
}

export default App;