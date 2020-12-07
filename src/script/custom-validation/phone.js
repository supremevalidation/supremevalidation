export default function trPhoneValidate(phone) {
    phone = phone.split(" ").join("").split("+90").join("");

    return phone.length === 10
};