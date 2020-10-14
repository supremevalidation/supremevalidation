import Swal from 'sweetalert2'

(function ($) {
    "use strict";

    var submitButton = $('.ajax-submit');
    var formInput = $('form input, form textarea');

    formInput.on('keyup', function (e) {
        validFormElement($(this))
    })

    submitButton.on('click', function (e) {
        e.preventDefault()

        var currentForm = $(this).closest('form');
        var formData = getFormData(currentForm);
        var isValid = validForm(formData, currentForm);
        var requestSettings = {
            data: formData,
            url: currentForm.attr('action'),
            method: currentForm.attr('method')
        }

        if (isValid) {
            sendForm(requestSettings, currentForm)
        }
    })

    function sendForm(requestSettings, form) {
        $.ajax({
            method: requestSettings.method,
            url: requestSettings.url,
            dataType: 'JSON',
            cache: false,
            data: requestSettings.data,
            scriptCharset: 'utf-8',
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8'
        }).done(function (data) {
            if (data.Result) {
                form.trigger('reset');
            }

            Swal.fire({
                icon: data.Result ? 'success' : 'error',
                text: data.Message,
                showConfirmButton: false,
                timer: 3000
            })
        })
    }

    function validForm(data, form) {
        var result = true;

        $.each(data, function (itemName) {
            var item = form.find('[name=' + itemName + ']')
            result = !validFormElement(item) ? false : result
        });

        return result
    }

    function validFormElement(formElement) {
        var currentValue = formElement.val();
        var errorLabel = formElement.parent().find('label');

        var customValidationName = formElement.attr('customValidation');
        var hasCustomValidation = customValidationName !== undefined;
        var isCustomValid = hasCustomValidation ? CUSTOM_VALIDATION[customValidationName](currentValue) : true;

        if (currentValue === '' || !isCustomValid) {
            formElement.addClass('error');
            errorLabel.removeClass('d-none');

            return false;
        } else {
            formElement.removeClass('error');
            errorLabel.addClass('d-none');

            return true;
        }
    }

    function getFormData(form) {
        return $(form).serializeArray().reduce(function (acc, v) {
            acc[v.name] = v.value;
            return acc;
        }, {});
    }






    $('.popup-link').magnificPopup({
        type: 'image'
    });

})(jQuery);	