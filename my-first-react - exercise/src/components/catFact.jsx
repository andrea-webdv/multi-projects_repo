import axios from "axios";
import { useEffect, useMemo, useState } from "react";

function FetchFacts({time}) {
    let [catFact, setCatFact] = useState("catFacts here!");
    
    //pattern to check if the actua value of the prop is changed
    let run = useMemo(()=>{ console.log("PROP: ",time);
     return time},[time])
    useEffect(()=>{
        console.log("running? ", run);
        
   
        axios.get("https://catfact.ninja/fact?max_length=64")
            .then(res =>{
                setCatFact(res.data.fact);
            });    
    
    },[run]);


    return(
        <div id="catbox">
            <p id="catfact">{catFact}</p>
        </div>
    ) 
}

export default (FetchFacts)