import 'jquery';
import 'bootstrap';

(function ($) {
    "use strict";

    const inputValidate = collection => {

    }

    const selectValidate = collection => {

    }

    const checkValidate = collection => {

    }

    const radioValidate = collection => {

    }

    const textareaValidate = collection => {

    }

    const ELEMENT_TYPES = {
        INPUT: 'input',
        SELECT: 'select',
        CHECK: 'check',
        RADIO: 'radio',
        TEXTAREA: 'textarea'
    }

    const ELEMENT_VALIDATE_FUNCTION = {
        [ELEMENT_TYPES.INPUT]: inputValidate,
        [ELEMENT_TYPES.SELECT]: selectValidate,
        [ELEMENT_TYPES.CHECK]: checkValidate,
        [ELEMENT_TYPES.RADIO]: radioValidate,
        [ELEMENT_TYPES.TEXTAREA]: textareaValidate
    }

    const getAllFormElements = form => ({
        [ELEMENT_TYPES.INPUT]: form.find('.supreme-validate-element input:not([type=radio]):not([type=checkbox])'),
        [ELEMENT_TYPES.SELECT]: form.find('.select-container select'),
        [ELEMENT_TYPES.CHECK]: form.find('.checkbox-list input'),
        [ELEMENT_TYPES.RADIO]: form.find('.radio-list input'),
        [ELEMENT_TYPES.TEXTAREA]: form.find('.supreme-validate-element textarea')
    })

    const isValidForm = formCollection => {
        const types = Object.keys(formCollection);


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