/*
--------------------------------
Ajax Contact Form
--------------------------------
+ https://github.com/mehedidb/Ajax_Contact_Form
+ A Simple Ajax Contact Form developed in PHP with HTML5 Form validation.
+ Has a fallback in jQuery for browsers that do not support HTML5 form validation.
+ version 1.0.1
+ Copyright 2016 Mehedi Hasan Nahid
+ Licensed under the MIT license
+ https://github.com/mehedidb/Ajax_Contact_Form
*/

(function ($, window, document, undefined) {
    'use strict';

    var $form = $('#contact-form');

    $form.submit(function (e) {
        // remove the error class
        $('.form-group').removeClass('has-error');
        $('.help-block').remove();

        // get the form data
        var formData = {
            'name' : $('input[name="fname"]').val(),
            'email' : $('input[name="femail"]').val(),
            'subject' : $('input[name="fsubject"]').val(),
            'message' : $('textarea[name="fmessage"]').val()
        };

        // process the form
        $.ajax({
            type : 'POST',
            url  : 'process.php',
            data : formData,
            dataType : 'json',
            encode : true
        }).done(function (data) {
            // handle errors
            if (!data.success) {
                if (data.errors.name) {
                    $('#name-field').addClass('has-error');
                    $('#name-field').find('.col-md-6').append('<span class="help-block">' + data.errors.name + '</span>');
                }
                if (data.errors.email) {
                    $('#email-field').addClass('has-error');
                    $('#email-field').find('.col-md-6').append('<span class="help-block">' + data.errors.email + '</span>');
                }
				 if (data.errors.subject) {
                    $('#subject-field').addClass('has-error');
                    $('#subject-field').find('.col-md-12').append('<span class="help-block">' + data.errors.subject + '</span>');
                }
                if (data.errors.message) {
                    $('#message-field').addClass('has-error');
                    $('#message-field').find('.col-md-12').append('<span class="help-block">' + data.errors.message + '</span>');
                }
            } else {
                // display success message
                $form.html('<div class="alert alert-success">' + data.message + '</div>');
            }
        }).fail(function (data) {
            // for debug
            console.log(data)
        });

        e.preventDefault();
    });
}(jQuery, window, document));
