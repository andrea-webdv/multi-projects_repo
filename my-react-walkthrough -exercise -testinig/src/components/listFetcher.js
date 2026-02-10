import { useEffect, useState } from "react";
import axios from "axios";


 function ListFetcher ({url}) {
    const [list, setList] = useState({});
    /* //alternativa con fetch
    useEffect(() => {
            fetch(url)
                .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
                }).then(res => {
                    setList(res);
                })
                .catch(e => {
                    console.error("Errore durante il caricamento del file JSON:", e);
                })
            ;
    },[]); */

    useEffect(
        ()=> {
            axios.get(url)
                .then( res => {
                    let listData = res.data;
                    return listData
                })
                .then(data => {
                    setList(data);
                })
        },[url]
    )
    // console.log("resulting list: ", list);


    return(list)
}




export default (ListFetcher)