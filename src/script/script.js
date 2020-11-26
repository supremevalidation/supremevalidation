import { ElementValidation } from './element-validation'

(function ($) {

    const LISTENERS = {
        CLICK: 'click',
        SUBMIT: 'submit',
        KEY_UP: 'keyup',
        CHANGE: 'change'
    }

    const ELEMENT_TYPES = {
        INPUT: 'input',
        SELECT: 'select',
        CHECKBOX: 'checkbox',
        RADIO: 'radio',
        TEXTAREA: 'textarea',
        VALIDATE_ELEMENT_CLASS: '.supreme-validate-element'
    }

    const getAllFormElements = form => ({
        [ELEMENT_TYPES.INPUT]: form.find(`${ELEMENT_TYPES.VALIDATE_ELEMENT_CLASS} input:not([type=radio]):not([type=checkbox])`).toArray(),
        [ELEMENT_TYPES.SELECT]: form.find('.select-container select').toArray(),
        [ELEMENT_TYPES.CHECKBOX]: form.find('.checkbox-list input').toArray(),
        [ELEMENT_TYPES.RADIO]: form.find('.radio-list input').toArray(),
        [ELEMENT_TYPES.TEXTAREA]: form.find(`${ELEMENT_TYPES.VALIDATE_ELEMENT_CLASS} textarea`).toArray()
    })

    const setErrorElement = formCollection => {
        formCollection.forEach(item => {
            $(item).closest(ELEMENT_TYPES.VALIDATE_ELEMENT_CLASS).removeClass('success').addClass('error')
        })
    }

    const setSuccessElement = formCollection => {
        formCollection.forEach(item => {
            $(item).closest(ELEMENT_TYPES.VALIDATE_ELEMENT_CLASS).removeClass('error').addClass('success')
        })
    }

    const isValidForm = formCollection => {
        const types = Object.keys(formCollection).filter(item => formCollection[item].length > 0 && item);

        const elements = types.map(typeItem => {
            const validateElement = ElementValidation[typeItem](formCollection[typeItem])

            setErrorElement(validateElement.errorElements)
            setSuccessElement(validateElement.successElements)

            return validateElement
        })

        const isValid = elements.filter(item => !item.valid && item).length === 0

        return isValid
    }

    const elementChangeControl = e => {
        const element = e.target;
        const attribute = element.getAttribute('type');
        const hasCheckOrRadio = attribute === 'checkbox' || attribute === 'radio';
        const type = hasCheckOrRadio ? attribute : element.nodeName.toLowerCase();
        const validateElement = ElementValidation[type]([element]);

        setErrorElement(validateElement.errorElements)
        setSuccessElement(validateElement.successElements)
    }

    const setChangeListenerElements = formCollection => {
        const types = Object.keys(formCollection).filter(item => formCollection[item].length > 0 && item);

        types.forEach(typeItem => {
            const collection = formCollection[typeItem];

            collection.forEach(collectionItem => {
                const attribute = collectionItem.getAttribute('type');
                const type = collectionItem.nodeName;
                const hasChangeListener = type === 'SELECT' || attribute === 'checkbox' || attribute === 'radio';
                const listener = hasChangeListener ? LISTENERS.CHANGE : LISTENERS.KEY_UP;

                $(collectionItem).on(listener, elementChangeControl)
            })
        })
    }

    $.fn.supremeValidation = function (settings) {
        const form = $(this);
        const button = form.find('button[type=submit]');
        const formCollection = getAllFormElements(form);

        button.on(LISTENERS.CLICK, function (e) {
            e.preventDefault()
            const isValid = isValidForm(formCollection);

            if (isValid) {
                settings.onSuccess(isValid)
            } else {
                settings.onError(isValid)
            }
        });

        form.on(LISTENERS.SUBMIT, function (e) {
            e.preventDefault()
            const isValid = isValidForm(formCollection);

            if (isValid) {
                settings.onSuccess(isValid)
            } else {
                settings.onError(isValid)
            }
        });

        setChangeListenerElements(formCollection)
    }

})(jQuery);