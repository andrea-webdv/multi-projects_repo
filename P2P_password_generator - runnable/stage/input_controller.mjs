
const choosed_section = document.querySelector('#choosed');
const options_section = document.querySelector('#options');
const result_section = document.querySelector('#result');
const input_portion = document.getElementById('inputs');
const output_portion = document.getElementById('outputs');
const run_button = document.getElementById('run');
const runBar = document.getElementById('runBar')

const increase_length = document.getElementById('+8');
const decrease_length = document.getElementById('-8');
const length_input = document.getElementById('length');

const pass = document.getElementById("passcode");
const name_el = document.getElementById('word');
const view = document.querySelector('#view');
const header = document.querySelector('header');
const tutorial = document.querySelector('#tutorial');
const result_string = document.querySelector('#resultTitle');

const view_wrapper = document.getElementsByClassName('vieWrapper')


console.log("LOADED SCRIPT input_controller.js");

/* -- CAMBIARE LAYOUT TRAMITE MEDIA QUERY , SIA ALL-APERTURA CHE A RESIZE WINDOW -- */
function LayoutEditor() {
    let query = matchMedia('(width >= 855px) and (orientation: landscape)');//1280px
    if (query.matches && input_portion.lastElementChild === choosed_section) {
        
        input_portion.replaceChild(options_section, choosed_section);
        output_portion.insertBefore(choosed_section, output_portion.firstElementChild);
        result_section.removeChild(result_section.firstElementChild);
        options_section.append(run_button);
        if (result_section.firstElementChild !== result_string) {
            result_section.replaceChild( result_string, result_section.firstElementChild)
        }
    } 
    else if (!query.matches && input_portion.lastElementChild !== choosed_section) {
        
        input_portion.replaceChild(choosed_section, options_section);
        output_portion.insertBefore(options_section ,output_portion.firstElementChild);
        options_section.removeChild(run_button);
        result_section.insertBefore(run_button, result_section.firstElementChild);
        
        let second_wrapper = view_wrapper[0].cloneNode(true);
        second_wrapper.replaceChild(result_string, second_wrapper.firstElementChild); 
        result_section.insertBefore(second_wrapper, result_section.lastElementChild);
        console.log(view_wrapper);
        
    }
}
LayoutEditor(); 

window.addEventListener('resize', () => { 
    LayoutEditor()
});

/*-- VERIFICARE LA LUNGHEZZA DELL'INPUT --*/
name_el.addEventListener('input', (e) => {
    name_el.classList.toggle('wrongData', e.target.value.length < 5);
    name_el.classList.toggle('rightData', e.target.value.length >= 5); 
});

/*-- ALTERNARE TIPO CON bottone --*/
view.addEventListener('mousedown', () => { name_el.setAttribute("type", "text"); pass.setAttribute("type", "text"); })
view.addEventListener('mouseup', () => { name_el.setAttribute("type", "password"); pass.setAttribute("type", "password"); })
view.addEventListener('touchstart', () => { name_el.setAttribute("type", "text"); pass.setAttribute("type", "text"); })
view.addEventListener('touchend', () => { name_el.setAttribute("type", "password"); pass.setAttribute("type", "password"); })

/* -- ESEGUIRE IL CLICK SULLA LABEL RACCOLTA NEI BOTTONI -- */
const labeledButtons = document.querySelectorAll('.clickLabel');
const labels = document.querySelectorAll('label');
const innputs = document.querySelectorAll('input');

labeledButtons.forEach((button) => {
    let label = button.firstElementChild;

    button.addEventListener('click', (e) => {
        label.click();
        //e.stopImmediatePropagation();
    })
})

labels.forEach((label)=> {
    label.addEventListener('click',(ev)=>{
        // console.log('revelated clik: ', label.for);
        //ev.preventDefault();
        ev.stopPropagation(); //LAST-EDIT
    })
})

/* -- RIMPIAZZARE IL <p> PLACEHOLDER CON L-EFFETTIVO <input file> -- */
const picture_placeholder = document.querySelector("#placeholder");
const picture_input = document.querySelector("#image");

picture_input.addEventListener('change', (event) => { /* non con evento al click,, ma con change sull'input */
    let present = event.target.files[0];
    if (present) {
        setTimeout((  ) => { 
            let fileName = present.name;
            picture_placeholder.innerText = fileName;
         },500)
    } else {
        picture_placeholder.innerText = 'Pick an jpg image'
    }
});



/* --- SPOSTARE FOCUS ALLA PRESSIONE DI INVIO SU INPUT DI TESTO --- 
const inputs = document.querySelectorAll('input');
const inputsArray = Array.from(inputs);

document.addEventListener('keydown', (e) => { if (e.key !== 'Tab'){
    e.preventDefault();
    e.stopImmediatePropagation();

    inputs.forEach(( input ) => { 
        if (input === document.activeElement){
            let index = inputs.indexOf(index);
            inputs[index].blur();
            inputs[index+1].focus();
        }
     })
}})
*/

/* -- REGOLA IL VALORE DELL-INPUT LENGTH AL CLICK SUI BOTTONI/LABEL -- */

increase_length.addEventListener('click', () => { length_input.value = Number(length_input.value) + 8; length_input.blur() });
decrease_length.addEventListener('click', () => { length_input.value = Number(length_input.value) - 8; length_input.blur() });

/* -- SIMULAZIONE TEMPO DI ELABORAZIONE CON PLACEHOLDER -- */
function runningSim(returning = false, runned = [], stop = false) {
    pass.setAttribute("type", "text");
    if(stop){
        clearInterval(re_runner);
        clearInterval(runner);
        return};

    return new Promise((res, rej) => {
        if (returning && runned.length === 0) {
            return res("done");
        }

        if (returning) {
            let re_runner = setInterval(() => {

                let still = runned;
                pass.value = `RUNNING${runned.map(dot => dot)}<`;
                if (still.length === 0) {
                    clearInterval(re_runner); res(runningSim(false, still));//importante, la ricorsivita innescata nel res al posto che nel return

                };
                if (still.length !== 0) {
                    clearInterval(re_runner); res(runningSim(true, still));

                };
                still.pop();

            }, 200)
        } else {
            let runner = setInterval(() => {
                console.log('going');

                pass.value = `RUNNING${runned.map(dot => dot)}>`;

                runned.push('.');
                if (runned.length > 8) { clearInterval(runner); res(runningSim(true, runned)); };
            }, 200);
        }
    })
}

export {runningSim}