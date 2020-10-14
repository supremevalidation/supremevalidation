import 'jquery';
import 'bootstrap';

(function ($) {
    "use strict";

    function getAllFormElements(form) {
        
    }

    $.fn.supremeValidation = function () {
        const form = $(this);
        const button = form.find('button[type=submit]');

        button.on('click', function (e) {
            e.preventDefault()
            getAllFormElements(form)
        });

        form.on('submit', function (e) {
            e.preventDefault()
        });
    }

    $('#contact-form').supremeValidation()

})(jQuery);