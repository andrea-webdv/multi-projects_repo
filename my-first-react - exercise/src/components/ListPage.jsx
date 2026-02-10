import ListFetcher from "./listFetcher";
import "./../styles/list.css"
import React, { useRef } from "react";
import { useContext, useEffect} from "react";
import { ProgressContext } from "./ProgresContext";

const url = '/list.json';

function ListPage () {
    const list = ListFetcher({url});
    const done = useRef(false);

     console.log("compilation check:", done);
     
    
    const jsx = [];
    
    let context = useContext(ProgressContext);
    
 
    for(const argument in list) {
        let lessons = list[argument]

        jsx.push(LessonItems(argument, lessons));
    }

    // Register the total data when the component mounts
    done.current = true;
    useEffect(()=>{
        if(done) {
            context.registerProgress("total", jsx.length);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [done]);


    return(
        <dl>
           {jsx}
           <span className="progress"></span>
        </dl>
    )
}


function LessonItems(title, lessons){
    let index = 0;
    let context = useContext(ProgressContext);

    return(
        <div className="chapter">
            <dt key={title}>{title}</dt>
            {
            lessons.map(lesson => {
                let key =  `${title}_${index}`;
                 
                index += 1;

                // VERSIONE CON LOCALSTORAGE
                let backup= localStorage.getItem(key); //leggere il valore e rendere booleano true or falsein base a === "true"
                let backupBoolean = backup === "true" ? true : false;

                return(
                    <dd key={key}>
                        <label className="lesson" htmlFor={key}>
                        <input 
                            name={key}
                            type="checkbox"
                            className="progresschecker"
                            checked= {backupBoolean}
                            onChange={ (e)=>{
                                // VERSIONE CON LOCALSTORAGE
                                localStorage.setItem(key, e.target.checked);
                                context.registerProgress("data");
                            }}
                        />
                            {lesson}
                        </label>
                    </dd>
                );
                }) 
            }
        </div>
    )
}


export default (ListPage)