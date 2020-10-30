export default function radioValidate(collection) {
    const checkedElements = collection.filter(item => $(item).prop('checked') && item)
    const unCheckedElements = collection.filter(item => !$(item).prop('checked') && item)

    return {
        valid: checkedElements.length > 0,
        elements: unCheckedElements
    }
}