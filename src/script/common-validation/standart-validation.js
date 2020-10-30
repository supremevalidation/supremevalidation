import { CustomValidation } from '../custom-validation'

const isElementFull = item => {
    return item.val() === '' || item.val() === null
}

export default function standartValidate(collection) {
    return (
        collection.filter(item => {
            const hasCustomValidation = $(item).parent().attr('custom-validation') !== undefined;
            const customValidationName = $(item).parent().attr('custom-validation');

            if (hasCustomValidation) {
                if (!CustomValidation[customValidationName]($(item).val())) {
                    return item;
                }
            } else {
                if (isElementFull($(item))) {
                    return item;
                }
            }
        })
    )
}