import { useContext, useEffect, useRef, useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { ProgressContext } from './ProgresContext';

export default function ProgressBar(){
    // the state inside the context will trigger the re-render of this component
    // so here we could use a var for the percentage value
    /*const [percentage, setPercentage] = useState(0) */
    let percentage = useRef(0)

    const context = useContext(ProgressContext);
    console.log("from ProgresssBar, progress obj: ", context.progress);
    
    let done = context.progress.done
    let total = context.progress.total


    useEffect(()=>{
        if(total) { 
            let progress;
            done ? progress = done / total * 100 : progress = 0;
            percentage.current = Math.round(progress);
            };
     console.log("percentage: ", percentage);
     }, [done])
    
     

    return(
        <div>
            <CircularProgressbar value={percentage} text={`${percentage}%`}/>
            <span>progress: {done} / {total}</span>
        </div>
    )
}