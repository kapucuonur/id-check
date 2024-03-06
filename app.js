function validateIdentityNumber() {
    const identityNumber = document.getElementById("identity_number").value;
    const resultParagraph = document.getElementById("result");
    
    if (validateTRIdentityNumber(identityNumber)) {
        resultParagraph.textContent = "Valid TR Identity Number.";
        resultParagraph.classList.remove("invalid");
        resultParagraph.classList.add("valid");
    } else {
        resultParagraph.textContent = "Invalid TR Identity Number.";
        resultParagraph.classList.remove("valid");
        resultParagraph.classList.add("invalid");
    }
}

function validateTRIdentityNumber(trIdentityNumber) {
    if (!trIdentityNumber.match(/^\d{11}$/)) {
        return false;
    }

    if (trIdentityNumber.startsWith('0')) {
        return false;
    }

    let sumOddDigits = 0;
    let sumEvenDigits = 0;
    for (let i = 0; i < 9; i++) {
        const digit = parseInt(trIdentityNumber.charAt(i));
        if (i % 2 == 0) {
            sumOddDigits += digit;
        } else {
            sumEvenDigits += digit;
        }
    }

    const tenthDigit = (sumOddDigits * 7 - sumEvenDigits) % 10;
    const sumFirst10Digits = Array.from(trIdentityNumber.slice(0, 10)).reduce((acc, digit) => acc + parseInt(digit), 0);
    const eleventhDigit = sumFirst10Digits % 10;

    return parseInt(trIdentityNumber.charAt(9)) === tenthDigit && parseInt(trIdentityNumber.charAt(10)) === eleventhDigit;
}
