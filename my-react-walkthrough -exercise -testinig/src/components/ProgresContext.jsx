import { createContext, useMemo, useState } from "react";


// This is the initial context setup. It provides default values for progress and functions.
export const ProgressContext = createContext({
    progress: {},
    registerStatus: () => {},
    registerProgress: () => {}
});

// verisione del provider con scrittura su localStorage (modifiche apportate anche la ProgressBar.jsx e ListPage.jsx)
function ProgressKeeper({children}){  
    // dubbio: meglio conservare i dati nel context con useState o useRef?
    const [progress, setProgress] = useState({ total:0, done:0});
    /*const progress = useRef({ total:0, done:0}); */ 

    function registerProgress (operation, data) {
        let totalLength = localStorage.length
        let doneCount = 0;

        if (operation === "total") {
           setProgress((last) => {
            let newState = {total:data, done: last.done};
            return newState
        }) 

        };
        if (operation === "data") {
            for (let index = 0; index < totalLength; index++) {
                let key = localStorage.key(index);
                let data = localStorage.getItem(key);
                if (data) {
                    doneCount += 1;
                }
            }
            setProgress((last) => {
            let newState = {total:last.total, done: doneCount};
            return newState
        }) 
        };
    };


    //memo of the context
    const contextValue = useMemo(()=>{return{
        progress: progress.current, 
        registerProgress: registerProgress
    }},[progress]); 
    

    return (        
        <ProgressContext.Provider value={contextValue}>
            {children}
        </ProgressContext.Provider> 

    )
}
export default ProgressKeeper 