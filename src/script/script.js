import 'jquery';
import 'bootstrap';

(function ($) {
    "use strict";

    const getAllFormElements = form => ({
        input: form.find('.supreme-validate-element input:not([type=radio]):not([type=checkbox])'),
        select: form.find('.select-container select'),
        check: form.find('.checkbox-list input'),
        radio: form.find('.radio-list input'),
        textarea: form.find('.supreme-validate-element textarea')
    })

    $.fn.supremeValidation = function () {
        const form = $(this);
        const button = form.find('button[type=submit]');

        button.on('click', function (e) {
            e.preventDefault()

            console.log(
                getAllFormElements(form)
            )
        });

        form.on('submit', function (e) {
            e.preventDefault()
        });
    }

    $('#contact-form').supremeValidation()

})(jQuery);