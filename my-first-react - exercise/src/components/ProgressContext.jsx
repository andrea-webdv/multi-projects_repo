import { createContext, useContext, useMemo, useState } from "react";

// This is the initial context setup. It provides the default parameters of context obj.
const ProgressContext = createContext({
  progress: {},
  registerProgress: () => {},
});

// the context use localStorage to keep track of the progress data, this will simulate the support of a database.



function ProgressKeeper({ children }) {

    const [progress, setProgress] = useState({total:0, done:0})

    function registerProgress(operation, data) {
        switch (operation) {
            case "total":
                console.log("updating total value at: ", data);
                
                setProgress((last) => {
                let newState = { total: data, done: last.done };
                return newState;
                });

            break;
            case "done":
                setProgress((last) => {
                    let newState = {
                      total: last.total,
                      done: localStorage.length, // this could be readed from the database, in case of futer dev 
                    };
                    return newState;
                });
            break;
        default:
        return;
        }
    }

    const contextValue = useMemo(() => {
        return{progress, registerProgress}
        },[progress])

 return (
    <ProgressContext.Provider value={contextValue}>
      {children}
    </ProgressContext.Provider>
  );
}

export const ProgressConsumer = () => { 
    const consumer = useContext(ProgressContext);
    return consumer
}

export default ProgressKeeper;