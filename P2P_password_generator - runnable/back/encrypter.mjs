/*
 * Copyright © 2025 [Il tuo Nome/Nome Entità]. Tutti i diritti riservati.
 * Questo codice e il suo sviluppo sono proprietà intellettuale di [Il tuo Nome/Nome Entità].
 */

let salt;



/* -- COMBINAZIONE DI DATI -- */
function combiner(saltCode, imageCode) {
    let fullLength = saltCode.length + imageCode.length // +keyCode
    let combinedCode = new Uint8Array(fullLength);

    for (let index = 0; index < fullLength; index++) {
        if (index > imageCode.length || index > saltCode.length) { return combinedCode };
        if (index <= imageCode.length) { combinedCode.set(imageCode[index]) }
        if (index <= saltCode.length) { combinedCode.set(saltCode[index]) }
        // same for keyCode
    }

    return combinedCode
}

function grain(length) {
/*     used if inporting word too
    let weight = 0; 
    for (let index = 0; index < word.length; index++) {
        let n = word.charCodeAt(index);
        weight = weight + n;
    };
 */
    const material = 'grj,3I}ly~lvcx?YA(Cn;?JKk[ik(-p4I8S:+v~nOCRQ+>%YE[djtb9:[lYIxSAE1L*%WvYvizm])/Oeuq3|hAf,r7{hGvx~]~RWeFW{sPkLoHdOcYXhr?fw|5k2l - XW; LV1JMbWa.y > [6X![b%%<W/1ByOL=_-)I,1iwxQZkiHRyùeO9Qt]0 | b3]pPRr5vO | l(4UyU%K)RxJwz?G&(O8zEuA1JS[y?u8&~+V/X65}XFUa7d^:byUF`je;£LQ~r4X+OOs}>pq[5wLZ./aU9FP+SKo!V_<ED%2(ZD(Ph,et#|lI7l$_RV$[R(x#@L&b_Cx.mg;#{M/zj >.Qr(3k~fkgHU4yoA7} <z55zwf$9Z3KWNAIT2,)g5/Iz7+B{RL.iBIGP1QU%PM$Or:uH?,S{$*oe%;9D:?L = Uf / 53G3sxq0}}% XO;](f4^nVY-#^qzHcZ9Zn|Sd?.2(aH9uBV.8H6g|-VW.#@79 ^ 3kNN @KqF=zqR ? eX~be1v!D$a=WSiz5Hj|BI{h6GdQ9z$z+Jjr%A) 9lFI >| 8R)SI_ZcYYLT @A; { cMi &} -ByZB ^ dV[p2 < _pMd~!Re > !xbZzy(Oy\]rRpT < aLq93!@6; H[g?aw|>v>p_uZR]n?|8guUY(l_+yCU9.{79RFB<hJJRy<FXA5}C_,?9TnO0+}AG<v&nB{zk7^5%RV}B2G%J$rX2>iSLvaY41f%cgwbt#^+Fk~yj]>8c#]9%Xd7L&_S\=S:p&h7d~a)-/o1{e)|h]Z42LP.z!H%';
    let portion = material.slice(Math.round(length / 5), Math.round(length / 4));

    return portion
}

async function generator(imageData, length) { //word, limited
    console.log("generation on the road");
    
    //const usedKey= key + key + key
    //const keyData = new TextEncoder().encode(usedKey);
 
    //--- GENERAZIONE E LETTURA DEL SALE ---\\
    let salt = grain(imageData.length); //usedkey
    const saltData = new TextEncoder().encode(salt); 

    //--- UNIT8ARRAY COMBINATO ---\\\
    const combinedData = combiner(saltData, imageData) //,keyData

    //--- GENERAZIONE CON CRYPTO ---\\
    let generation = await crypto.subtle.digest('SHA-384', combinedData);

    const result = new Uint8Array(generation);
        //console.log("digested and converted in unit8: ", result);

    // let output = encoder(result,limited) shipped to front
        
    if(result.length > length){ //replaced output with result
        result.slice(0,length - 1);
    }
        
    return ( result) //output )
}


export {generator}