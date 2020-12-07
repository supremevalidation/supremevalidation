export default function checkValidate(collection) {

    const unCheckedElements = [];
    const checkedElements = [];

    collection.forEach((item) => {
        const minCheck = $(item).closest(".supreme-validate-element").attr("min-check");
        const container = $(item).closest(".checkbox-list");
        const subCollection = $(container).find("input").toArray();
        const selectedSubCollection = subCollection.filter((item) => item.checked && item);
        const isValid = selectedSubCollection.length >= minCheck;

        if (!isValid) {
            unCheckedElements.push(item);
        } else {
            checkedElements.push(item);
        }
    });

    return {
        valid: unCheckedElements.length === 0,
        errorElements: unCheckedElements,
        successElements: checkedElements
    };
}