
import { runningSim } from "./input_controller.mjs";
import { output } from "./textEditor.mjs"; //right path?

const errorModal = document.querySelector('#error');
const introModal = document.querySelector('#intro');
const closeModal = document.querySelectorAll('.closeModal');
const tutorial = document.querySelector('#tutorial');

const body = document.querySelector('body');

const runButton = document.querySelector('#run');
const inputs = document.querySelector('#inputs');

const picture = document.querySelector("#image");
const nameEl = document.getElementById('word');
let preview = document.querySelector('#preview');
const choosed = document.querySelector('#choosed');
const monitor = document.querySelector('#monitor');
let desiredLength = document.querySelector('#length');
let limited = document.getElementById('limited')

const pass = document.getElementById("passcode");
const copyButton = document.getElementById("copy");


console.log("LOADED SCRIPT app.js");


/* -- VISUALIZZAZIONE MODALE INTRO E CHIUSURA MODALI -- */
function showMyModal (modal){
    modal.classList.add('openDialog');
    body.classList.add('openDialog');
    modal.showModal();

   /*  setTimeout(() => {
        modal.classList.remove('openDialog');
        body.classList.remove('openDialog');
    }, 1500); */
}
function hideMyModal(modal) {
    modal.classList.add('closeDialog');
    body.classList.add('closeDialog');
    modal.close();

    setTimeout(() => {
        modal.classList.remove('closeDialog');
        body.classList.remove('closeDiaolg');
    }, 1500);
}

let visitcheck = localStorage.getItem("visited") || false;
if(!visitcheck){
    
    showMyModal(introModal);
    localStorage.setItem("visited", "true")
}

document.addEventListener('keydown',(e)=>{
 if(!introModal.hasAttribute('hidden') && e.key === 'Escape'){
     hideMyModal(introModal);
 }
    if (!errorModal.hasAttribute('hidden') && e.key === 'Escape') {
        hideMyModal(errorModal);
}
})

tutorial.addEventListener('click', () => showMyModal(introModal))
closeModal.forEach((button)=> {
    button.addEventListener('click', (e) => {e.preventDefault(); 
        let dialog = e.target.closest('dialog');
        hideMyModal(dialog)})
})


/*-- CARICAMENTO IMMAGINE --*/
let imageData = new Uint8Array; 
let placeholder = monitor.lastElementChild;

function refreshMonitor(content){
    if(content === null){
        preview.removeAttribute("scr");
        preview.style.display = "none";
        placeholder.style.display = "block";
    } else {
        preview.style.display = "inline-block";
        console.dir(placeholder);
        
        placeholder.style.display = "none"; 
        preview.src = content;
    }
}

picture.addEventListener('change', (event)=>{
    const choosed = event.target.files[0];
    console.log("IMAGE INPUT INSERED: ", choosed);
    
    monitor.classList.remove("wrongData", "rightData");

    if (choosed.type !== "image/jpeg" && choosed.type !== "image/png"){
        preview.classList.toggle("wrongData");
        refreshMonitor(null);
        showMyModal(errorModal);
        return
    }

    if(choosed) {
        preview.classList.toggle("rightData");

        const bufferReader = new FileReader(); 
        const urlReader = new FileReader();

        bufferReader.readAsArrayBuffer(choosed)
        bufferReader.onload = function(e){
            let FullImageData = new Uint8Array(e.target.result); 
            let accumulator = 0;
            for (let index = 0; index < FullImageData.length; index++) {
                if ((index % 2) === 0) {

                imageData.set(FullImageData[index], accumulator);
                accumulator += FullImageData[index].length}
            }
            console.log("image complete data: ", FullImageData );
            console.log("image halved data: ", imageData);
            FullImageData = null;
        }  
        bufferReader.onerror = function (e){
            console.error(e.target.result);
            showMyModal(errorModal);
            monitor.classList.toggle("wrongData");
        }

        urlReader.readAsDataURL(choosed)
        urlReader.onload = function(load){
            refreshMonitor(load.target.result)
            monitor.classList.toggle("rightData");
        }
        urlReader.onerror = function (e){
            console.error(e.target.result);
            showMyModal(errorModal);
            monitor.classList.toggle("wrongData");

        }

    } else {
        refreshMonitor(null);
        monitor.classList.remove("wrongData", "rightData");
        preview.classList.remove("wrongData", "rightData");
    }
});


/* -- comunicazione con il server -- */
async function receiver (word, buffer, length) {//spostare nel back, nome running
    try{
        let deadline = new Promise(
            (res,rej)=>{
                setTimeout(() => { 
                    // console.error("call timeout: the server encription takes too much time to answer"); 
                    rej(new Error("call timeout: the server encription takes too much time to answer") ) 
                }, 2000);
            }
        )

        let inputObj = {
            // wordInput : word,
            imageInput : buffer,
            lengthOpt : length,
            //limitedOpt : limited.checked
        };
        let inputJs = JSON.stringify(inputObj);

        let call = fetch('/run',{
            method: "POST",
            body: inputJs
        }).then((response) => {
                console.log("data received from fetch: ");    
            let received = response.arrayBuffer();
            return received 
            }).then(( data ) => { 
            let generated = new Uint8Array(data);
            return generated;
        })
        let crypted = Promise.race([
            call,
            //pw(word, buffer, length, limited.checked),  replace with a fetch to server endpoint
            deadline
        ])
        return crypted;
    } catch (error) {
        console.log("error on receiver: ",error); return null
    }
};
 

/*-- AVVIO CRIPTAZIONE E RESA OUTPUT--*/
function run() {
    pass.setAttribute('type', 'password');
    
    let inseredName = nameEl.value;
    let buffer = imageData;
    let length= desiredLength.value;
    
    if (inseredName.length < 5) {
        nameEl.classList.toggle('wrongData');
        showMyModal(errorModal);
        return
    };
    
    if (!buffer) { 
        showMyModal(errorModal); return 
    };
    
    pass.value = "";

    // runningSim(); REINSERT

    // - async encapsulator 
    try {
        receiver(inseredName, buffer, length).then(async (received)=>{

        if (!received) { 
            pass.classList.add("wrongData"); 
            pass.value = "-ERROR-";
            console.log(received)
            return new Error("error on receiver return")
        };
        // runningSim(undefined,undefined,true) REINSERT
            console.log("check for PW params: ", received, inseredName, limited.checked, length);
        
        
        let pw = await output(received, inseredName, limited.checked).then(( data ) => {
             console.log("Output function return: ", data);
            
             let string = data;
            if (data.length > length) { //replaced output with result
                string = data.slice(0, length - 1);
            }

            console.log("response elaborated: ");

            //pass.classList.remove("wrongData");
            pass.classList.add("rightData");
            setTimeout(() => { pass.value = string; }, 600)
            
        })
    });
    } catch (error) {
        
    }
    
    
 return
};


/* -- STOP THE FORM SUBMIT EVENT ON ENTER -- */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        e.stopImmediatePropagation();
        if( preview.hasAttribute('src') && nameEl.value == true ){
            run()
        }else {
            errorModal.showModal();
        }

    }
})

runButton.addEventListener('click', ()=> {
    run();
})
copyButton.addEventListener('click', (e)=> {
    e.stopImmediatePropagation();
    if(pass.value){
        console.log('copying password');
        
        navigator.clipboard.writeText(pass.value);
        console.log('passsword copied');
        
        pass.value = 'password copied'
        pass.setAttribute('type','text');
    }
})
