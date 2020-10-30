import { CommonValidation } from '../common-validation'

export default function inputValidate(collection) {
    const elements = CommonValidation.standart(collection)

    return {
        valid: elements.length === 0,
        elements: elements
    }
}