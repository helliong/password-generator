const ps = {
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+~`|}{[]:;?><,./-=",
}

const passwordLenght = document.querySelector('.pass-lenght input');
const passwordDetails = document.querySelector('.pass-lenght .details span');
const passwordIndicator = document.querySelector('.pass-indicator');
const passwordInput = document.querySelector('.input-box input');
const copyButton = document.querySelector('.input-box span');


const randomInteger = (min, max) => Math.floor(min + Math.random() * (max + 1 - min));


const shuffleString = str => str.split('').sort(function () { return 0.5 - Math.random() }).join('');


const updatePasswordIndicator = length => {
    passwordDetails.textContent = length;
    passwordIndicator.classList.remove('strong', 'medium')
    if (length >= 18) passwordIndicator.classList.add('strong');
    else if (length >= 12) passwordIndicator.classList.add('medium');
}

const copyPassword = () => {
    navigator.clipboard.writeText(passwordInput.value);
    copyButton.textContent = "check";
    copyButton.style.color = 'red';
    setTimeout(function () {
        copyButton.textContent = "copy_all";
        copyButton.style.color = '#707070';
    }, 1000)
}

const restorePasswordOptions = () => {
    if (localStorage.getItem('passwordOption')) {
        const passwordOption = JSON.parse(localStorage.getItem('passwordOption'));
        uppercase.checked = passwordOption['uppercase'];
        numbers.checked = passwordOption['numbers'];
        symbols.checked = passwordOption['symbols'];
        passwordLenght.value = passwordOption.lenght;
    }
}

const savePasswordOptions = () => {
    const passwordOption = {};
    passwordOption['lenght'] = +passwordLenght.value;
    passwordOption['uppercase'] = uppercase.checked;
    passwordOption['numbers'] = numbers.checked;
    passwordOption['symbols'] = symbols.checked;
    localStorage.setItem('passwordOption', JSON.stringify(passwordOption));
}

const generatePassword = () => {
    savePasswordOptions();
    const length = +passwordLenght.value;
    // console.log(length);
    updatePasswordIndicator(length);

    let passString = shuffleString(ps.lowercase);

    if (uppercase.checked) passString = shuffleString(passString + ps.uppercase);
    if (numbers.checked) passString = shuffleString(passString + ps.numbers);
    if (symbols.checked) passString = shuffleString(passString + ps.symbols);

    console.log(passString)
    let randomPassword = '';

    for (let i = 0; i < length; i++) {
        passString = shuffleString(passString);
        let random = randomInteger(0, passString.length - 1);
        randomPassword += passString[random];
    }

    passwordInput.value = randomPassword;
}

restorePasswordOptions();

passwordLenght.oninput = generatePassword;
document.querySelector('.generate-btn').onclick = generatePassword;
generatePassword();

copyButton.onclick = copyPassword;

