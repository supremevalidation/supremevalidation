import 'jquery';
import 'bootstrap';

import { ElementValidation } from './element-validation'

(function ($) {
    "use strict";

    const ELEMENT_TYPES = {
        INPUT: 'input',
        SELECT: 'select',
        CHECK: 'check',
        RADIO: 'radio',
        TEXTAREA: 'textarea'
    }

    const getAllFormElements = form => ({
        [ELEMENT_TYPES.INPUT]: form.find('.supreme-validate-element input:not([type=radio]):not([type=checkbox])').toArray(),
        [ELEMENT_TYPES.SELECT]: form.find('.select-container select').toArray(),
        [ELEMENT_TYPES.CHECK]: form.find('.checkbox-list input').toArray(),
        [ELEMENT_TYPES.RADIO]: form.find('.radio-list input').toArray(),
        [ELEMENT_TYPES.TEXTAREA]: form.find('.supreme-validate-element textarea').toArray()
    })

    const isValidForm = formCollection => {
        const types = Object.keys(formCollection);

        console.log('formCollection: ', formCollection)

        types.forEach(typeItem => {
            const validateElement = ElementValidation[typeItem](formCollection[typeItem])
            setErrorElement(validateElement)
        })
    }

    const setErrorElement = formCollection => {
        if (!formCollection.valid) {
            formCollection.elements.forEach(item => {
                $(item).closest('.supreme-validate-element').addClass('error')
            })
        }
    }

    $.fn.supremeValidation = function () {
        const form = $(this);
        const button = form.find('button[type=submit]');

        button.on('click', function (e) {
            e.preventDefault()

            const formCollection = getAllFormElements(form);

            console.log(isValidForm(formCollection))
        });

        form.on('submit', function (e) {
            e.preventDefault()
        });
    }

    $('#contact-form').supremeValidation()

})(jQuery);