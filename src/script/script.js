import 'jquery';
import 'bootstrap';

(function ($) {
    "use strict";

    function validateInput(collection) {
        
    }

    $.fn.supremeValidation = function () {
        const form = $(this);
        const button = form.find('button[type=submit]');

        const inputCollection = form.find('.supreme-validate-element input:not([type=radio]):not([type=checkbox])');
        const selectCollection = form.find('.select-container select');
        const checkboxCollection = form.find('.checkbox-list input');
        const radioCollection = form.find('.radio-list input');
        const textareaCollection = form.find('.supreme-validate-element textarea');

        button.on('click', function (e) {
            e.preventDefault()
            
            console.log(inputCollection)
            console.log(selectCollection)
            console.log(checkboxCollection)
            console.log(radioCollection)
            console.log(textareaCollection)
        });

        form.on('submit', function (e) {
            e.preventDefault()
        });
    }

    $('#contact-form').supremeValidation()

})(jQuery);