import 'jquery';
import 'bootstrap';

import { ElementValidation } from './element-validation'

(function ($) {
    "use strict";

    const LISTENERS = {
        CLICK: 'click',
        SUBMIT: 'submit',
        KEY_UP: 'keyup',
        CHANGE: 'change'
    }

    const ELEMENT_TYPES = {
        INPUT: 'input',
        SELECT: 'select',
        CHECK: 'check',
        RADIO: 'radio',
        TEXTAREA: 'textarea',
        VALIDATE_ELEMENT_CLASS: '.supreme-validate-element'
    }

    const getAllFormElements = form => ({
        [ELEMENT_TYPES.INPUT]: form.find(`${ELEMENT_TYPES.VALIDATE_ELEMENT_CLASS} input:not([type=radio]):not([type=checkbox])`).toArray(),
        [ELEMENT_TYPES.SELECT]: form.find('.select-container select').toArray(),
        [ELEMENT_TYPES.CHECK]: form.find('.checkbox-list').toArray(),
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

    $.fn.supremeValidation = function () {
        const form = $(this);
        const button = form.find('button[type=submit]');
        const input = form.find('input:not([type=radio]):not([type=checkbox])')
        const checkbox = form.find('.checkbox-list input')
        const radio = form.find('.checkbox-list input')

        button.on(LISTENERS.CLICK, function (e) {
            e.preventDefault()

            const formCollection = getAllFormElements(form);
            const isValid = isValidForm(formCollection);

            console.log(isValid)
        });

        input.on(LISTENERS.KEY_UP, function () {
            console.log('key up!')
        });

        checkbox.on(LISTENERS.CHANGE, function () {
            console.log('change!')
        });

        form.on(LISTENERS.SUBMIT, function (e) {
            e.preventDefault()
        });
    }

    $('#contact-form').supremeValidation()

})(jQuery);