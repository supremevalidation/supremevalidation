import CreditCard from "./credit-card";
import Date from "./date";
import Mail from "./mail";
import Phone from "./phone";
import SpeacialCharacter from "./special-character";
import TCID from "./tc";
import Url from "./url";

export const CustomValidation = {
    card: CreditCard,
    date: Date,
    mail: Mail,
    specialCharacter: SpeacialCharacter,
    tc: TCID,
    phone: Phone,
    url: Url
}