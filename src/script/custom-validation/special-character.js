export default function specialCharacterValidate(text) {
    const re = /[!@#$%^&*(),.?":{}|<>]/g;

    return re.test(text);
}