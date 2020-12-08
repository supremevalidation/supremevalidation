import checkControl from "./check";
import inputControl from "./input";
import radioControl from "./radio";
import selectControl from "./select";
import textareaControl from "./textarea";

export const ElementValidation = {
    checkbox: checkControl,
    input: inputControl,
    radio: radioControl,
    select: selectControl,
    textarea: textareaControl
};