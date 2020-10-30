export default function checkValidate(collection) {
    const minCheck = $(collection).closest('.supreme-validate-element').attr('min-check')
    const checkedElements = collection.filter(item => $(item).prop('checked') && item)
    const unCheckedElements = collection.filter(item => !$(item).prop('checked') && item)

    return {
        valid: checkedElements.length >= minCheck,
        elements: unCheckedElements
    }
}