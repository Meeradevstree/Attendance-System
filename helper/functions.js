const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const PNF = require('google-libphonenumber').PhoneNumberFormat;

exports.randomSixDigit = () => {
    return Math.floor(100000 + Math.random() * 900000)
};

exports.replaceNullToBlankString = async (obj) => {
    await Object.keys(obj).forEach(key => {
        if (obj[key] == null) {
            obj[key] = "";
        }
    });
    return obj;
};

exports.formatNumber = async (phone_number, countryCode) => {
    try {
        if (phone_number.substr(0, 1) !== '+') {
            let number = await phoneUtil.parseAndKeepRawInput(phone_number, countryCode);
            phone_number = (phoneUtil.format(number, PNF.E164));
            return phone_number
        } else {
            let number = await phoneUtil.parseAndKeepRawInput(phone_number, countryCode);
            phone_number = (phoneUtil.format(number, PNF.E164));
            return phone_number
        }
    } catch (error) {
        // return false if number is invalid Format
        return false;
    }
}

exports.encryptStringCrypt = async (string_value) => {
    let encryptedString = cryptr.encrypt(string_value);
    return encryptedString;
};

exports.CryptrdecryptStringCrypt = async (string_value) => {
    let decryptedString = cryptr.decrypt(string_value);
    return decryptedString;
};


exports.matchPassword = async (password, encryptedPassword) => {
    let decryptedString = cryptr.decrypt(encryptedPassword);
    return decryptedString === password;
};