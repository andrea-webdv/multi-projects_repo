import React from "react";

    class ErrorBoundary extends React.Component {
        #fallbackDOM;
        constructor(props){
            super(props);
            this.state = {hasError: false};
        }

        static getDerivedSateFromError(e) {
            return {hasError: true};
        }

        componentDidCatch(e, eInfo) {
            /* Qui è possibile anche loggare l'errore a un servizio di reportistica degli errori */

            console.error("Errore catturato dall'Error Boundary: ", e, "Dettagli: ", eInfo);
        }

        SetFallback(jsxDOM){
            this.#fallbackDOM = jsxDOM;
        }

        render(){
            if (this.state.hasError) {
                return (
                    <div className="fallback">
                        <h4 style={{fontSize: "900", color: "red", outline: "3px dashed red"}}>
                            Something gone wrong, check
                        </h4>
                        {this.props.fallbackUI}
                    </div> 
                )
            };

            return this.props.children;
        }
    }

export  {ErrorBoundary}

/***ISTRUZIONI
 * Le error boundary devon essere importate ed inserite nella struttura jsx resa da app.jsx 
 * in modo simile ai contesti, raccolgono gli elementi (od i componenti) a rischio di errore.
 * ESEMPIO:
 * 
 * function App() {
 *   return (
 *     <ErrorBoundary>
 *       {unstableComponent}
 *     </ErrorBoundary>
 *   );
 * }
  */ 