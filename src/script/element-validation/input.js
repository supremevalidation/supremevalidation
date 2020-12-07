import { CommonValidation } from "../common-validation";

export default function inputValidate(collection) {
    const elements = CommonValidation.standart(collection);

    return ({
        valid: elements.errorElements.length === 0,
        errorElements: elements.errorElements,
        successElements: elements.successElements
    })
}