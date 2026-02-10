function decoder(arr8, limited) {
    let result = "";

    for (let index = 0; index < 16; index++) {

        let number = arr8[index];

        function checker(n) {
            if (n < 33) {
                n += 33;
                return checker(n)
            } else if (n >= 58 && n < 61) {
                n = n - 10;
                return checker(n)
            } else if (n >= 61 && n < 65) {
                n += 10;
                return checker(n)
            }
            else if (n > 122) {
                n = n - 100;
                return checker(n)
            }
            return String.fromCharCode(n)
        }

        let allowed = [64, 46, 43, 36, 45, 33]
        function checker_limited(n) {
            if (n < 48) {
                n += 48;
                return checker(n)
            } else if (n >= 58 && n < 61) {
                n = n - 10;
                return checker(n)
            } else if (n >= 61 && n < 65) {
                n += 10;
                return checker(n)
            }
            else if (n >= 91 && n <= 96) {
                let reduced = n - 91;
                n = allowed[reduced];
                return checker(n)
            }
            else if (n > 122) {
                n = n - 100;
                return checker(n)
            }
            return String.fromCharCode(n)
        }


        if (limited) { result += checker_limited(number) }
        else { result += checker(number) };
    }

    return result
}

function mixer(word) {
    let mixed = '';
    for (let index = 0; index < (word.length * 2); index++) {
        if (index === 0 ){
            mixed += word[index]
        }else

        if (index % 2 === 0) { 
            let l = Math.round(mixed.length / 2); mixed += word[l]
        } else { 
            let r = Math.round(word.length - mixed.length / 2 -1); mixed += word[r]
        }
    };
    return mixed
}

async function output(received, word, limited) {
    let mixedWord = mixer(word);

    const encoder = new TextEncoder();

    let unit_arr = encoder.encode(mixedWord);

    let combined = new Uint8Array(received.length + unit_arr.length);
    combined.set(unit_arr); combined.set(received, unit_arr.length);

    let hashed = await crypto.subtle.digest('SHA-256', combined.buffer).then(
        result => {
                let  a8bResult = new Uint8Array(result);

                let output = decoder(a8bResult, limited); 
                return output
                //let outcome = String.fromCharCode(... new Uint8Array(result)); return btoa(outcome)
            }
    )

    return hashed
}

export { output }