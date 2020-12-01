import { ajax } from 'jquery';
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

    const globalSettings = {
        onSuccess: function () { },
        onError: function () { },
        buttonDisabled: false,
        keyUpOption: false,
        focusOutOption: false
    };

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

    const isValidForm = (formCollection, showInterface = true) => {
        const types = Object.keys(formCollection).filter(item => formCollection[item].length > 0 && item);

        const elements = types.map(typeItem => {
            const validateElement = ElementValidation[typeItem](formCollection[typeItem])

            if (showInterface) {
                setErrorElement(validateElement.errorElements)
                setSuccessElement(validateElement.successElements)
            }

            return validateElement
        })

        const isValid = elements.filter(item => !item.valid && item).length === 0

        return isValid
    }

    const elementChangeControl = e => {
        const element = e.target;
        const form = $(element.closest('form'));
        const button = $(form.find('button'));
        const attribute = element.getAttribute('type');
        const hasCheckOrRadio = attribute === 'checkbox' || attribute === 'radio';
        const type = hasCheckOrRadio ? attribute : element.nodeName.toLowerCase();
        const validateElement = ElementValidation[type]([element]);

        if (globalSettings.keyUpOption) {
            setErrorElement(validateElement.errorElements)
            setSuccessElement(validateElement.successElements)
        }

        buttonDisabledControl(form, button)
    }

    const buttonDisabledControl = (form, button) => {
        const formCollection = getAllFormElements(form);
        const isValid = isValidForm(formCollection, false);

        if (globalSettings.buttonDisabled) {
            if (isValid) {
                button.removeAttr('disabled');
            } else {
                button.attr('disabled', true);
            }
        }
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

        Object.assign(globalSettings, settings)

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

        setChangeListenerElements(formCollection);

        buttonDisabledControl(form, button);
    }

    $('.supreme-validate').supremeValidation({
        onSuccess: function () {
            console.log('success!');
        },
        onError: function () {
            console.log('error!');
        },
        buttonDisabled: false,
        keyUpOption: false
    });

})(jQuery);