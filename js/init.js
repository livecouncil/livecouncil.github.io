/*
	Alpha by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

    skel.init({
        reset: 'full',
        breakpoints: {
            global: {
                range: '*',
                href: 'css/style.css',
                containers: '60em',
                grid: {
                    gutters: ['2em', 0]
                }
            },
            wide: {
                range: '-1680',
                href: 'css/style-wide.css'
            },
            normal: {
                range: '-1280',
                href: 'css/style-normal.css',
                viewport: {
                    scalable: false
                }
            },
            narrow: {
                range: '-980',
                href: 'css/style-narrow.css',
                containers: '90%'
            },
            narrower: {
                range: '-840',
                href: 'css/style-narrower.css',
                containers: '90%!'
            },
            mobile: {
                range: '-736',
                href: 'css/style-mobile.css',
                containers: '100%!'
            },
            mobilep: {
                range: '-480',
                href: 'css/style-mobilep.css'
            }
        },
        plugins: {
            layers: {

                // Config.
                config: {
                    mode: function () {
                        return (skel.vars.isMobile ? 'transform' : 'position');
                    }
                },

                // Navigation Panel.
                navPanel: {
                    animation: 'pushX',
                    breakpoints: 'narrower',
                    clickToHide: true,
                    height: '100%',
                    hidden: true,
                    html: '<div data-action="navList" data-args="nav"></div>',
                    orientation: 'vertical',
                    position: 'top-left',
                    side: 'left',
                    width: 250
                },

                // Navigation Button.
                navButton: {
                    breakpoints: 'narrower',
                    height: '4em',
                    html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span>',
                    position: 'top-left',
                    side: 'top',
                    width: '6em'
                }

            }
        }
    });

    $(function () {

        var $window = $(window),
            $body = $('body'),
            $header = $('#header'),
            $banner = $('#banner');

        // Forms (IE<10).
        var $form = $('form');
        if ($form.length > 0) {

            $form.find('.form-button-submit')
                .on('click', function () {
                    $(this).parents('form').submit();
                    return false;
                });

            if (skel.vars.IEVersion < 10) {
                $.fn.n33_formerize = function () {
                    var _fakes = new Array(),
                        _form = $(this);
                    _form.find('input[type=text],textarea').each(function () {
                        var e = $(this);
                        if (e.val() == '' || e.val() == e.attr('placeholder')) {
                            e.addClass('formerize-placeholder');
                            e.val(e.attr('placeholder'));
                        }
                    }).blur(function () {
                        var e = $(this);
                        if (e.attr('name').match(/_fakeformerizefield$/)) return;
                        if (e.val() == '') {
                            e.addClass('formerize-placeholder');
                            e.val(e.attr('placeholder'));
                        }
                    }).focus(function () {
                        var e = $(this);
                        if (e.attr('name').match(/_fakeformerizefield$/)) return;
                        if (e.val() == e.attr('placeholder')) {
                            e.removeClass('formerize-placeholder');
                            e.val('');
                        }
                    });
                    _form.find('input[type=password]').each(function () {
                        var e = $(this);
                        var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text'));
                        if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield');
                        if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield');
                        x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e);
                        if (e.val() == '') e.hide();
                        else x.hide();
                        e.blur(function (event) {
                            event.preventDefault();
                            var e = $(this);
                            var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
                            if (e.val() == '') {
                                e.hide();
                                x.show();
                            }
                        });
                        x.focus(function (event) {
                            event.preventDefault();
                            var x = $(this);
                            var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']');
                            x.hide();
                            e.show().focus();
                        });
                        x.keypress(function (event) {
                            event.preventDefault();
                            x.val('');
                        });
                    });
                    _form.submit(function () {
                        $(this).find('input[type=text],input[type=password],textarea').each(function (event) {
                            var e = $(this);
                            if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', '');
                            if (e.val() == e.attr('placeholder')) {
                                e.removeClass('formerize-placeholder');
                                e.val('');
                            }
                        });
                    }).bind("reset", function (event) {
                        event.preventDefault();
                        $(this).find('select').val($('option:first').val());
                        $(this).find('input,textarea').each(function () {
                            var e = $(this);
                            var x;
                            e.removeClass('formerize-placeholder');
                            switch (this.type) {
                            case 'submit':
                            case 'reset':
                                break;
                            case 'password':
                                e.val(e.attr('defaultValue'));
                                x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]');
                                if (e.val() == '') {
                                    e.hide();
                                    x.show();
                                } else {
                                    e.show();
                                    x.hide();
                                }
                                break;
                            case 'checkbox':
                            case 'radio':
                                e.attr('checked', e.attr('defaultValue'));
                                break;
                            case 'text':
                            case 'textarea':
                                e.val(e.attr('defaultValue'));
                                if (e.val() == '') {
                                    e.addClass('formerize-placeholder');
                                    e.val(e.attr('placeholder'));
                                }
                                break;
                            default:
                                e.val(e.attr('defaultValue'));
                                break;
                            }
                        });
                        window.setTimeout(function () {
                            for (x in _fakes) _fakes[x].trigger('formerize_sync');
                        }, 10);
                    });
                    return _form;
                };
                $form.n33_formerize();
            }

        }

        // Dropdowns.
        $('#nav > ul').dropotron({
            alignment: 'right'
        });

        // Header.
        // If the header is using "alt" styling and #banner is present, use scrollwatch
        // to revert it back to normal styling once the user scrolls past the banner.
        // Note: This is disabled on mobile devices.
        if (!skel.vars.isMobile && $header.hasClass('alt') && $banner.length > 0) {

            $window.on('load', function () {

                $banner.scrollwatch({
                    delay: 0,
                    range: 0.5,
                    anchor: 'top',
                    on: function () {
                        $header.addClass('alt reveal');
                    },
                    off: function () {
                        $header.removeClass('alt');
                    }
                });

            });

        }

    });


    $(function () { //shorthand document.ready function
        $('#emailBetaSignUp').on('submit', function (e) { //use on if jQuery 1.7+
            console.log("entered");
            e.preventDefault(); //prevent form from submitting
            var data = $("#emailBetaSignUp :input").serializeArray();
            console.log("data" + data); //use the console for debugging, F12 in Chrome, not alerts

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            $.ajax({
                url: "http://nodejs-lcemail.rhcloud.com/emailSignup",

                // The name of the callback parameter, as specified by the YQL service
                jsonp: "callback",
                jsonpCallback: "emailSignUpBetaFn",
                method: "POST",
                method: 'post',

                // Tell jQuery we're expecting JSONP
                dataType: "jsonp",

                // Tell YQL what we want and that we want JSON
                data: data,

                // Work with the response
                success: function (response) {
                    console.log(response); // server response
                    toastr["success"]("Thank you for signing up!")
                }
            });



        });
    });





    $(function () { //shorthand document.ready function
        $('#contactUs').on('submit', function (e) { //use on if jQuery 1.7+
            console.log("entered");
            e.preventDefault(); //prevent form from submitting
            var data = $("#emailBetaSignUp :input").serializeArray();
            console.log("data" + data); //use the console for debugging, F12 in Chrome, not alerts

            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
            $.ajax({
                url: "http://nodejs-lcemail.rhcloud.com/contactUs",

                // The name of the callback parameter, as specified by the YQL service
                jsonp: "callback",
                jsonpCallback: "emailSignUpBetaFn",
                method: "POST",
                method: 'post',

                // Tell jQuery we're expecting JSONP
                dataType: "jsonp",

                // Tell YQL what we want and that we want JSON
                data: data,

                // Work with the response
                success: function (response) {
                    console.log(response); // server response
                    toastr["success"]("Thank you for signing up!")
                }
            });



        });
    });
    

    
    
    
    
    



})(jQuery);
$(window).load(function () {
    $(".flexslider").flexslider({
        animation: "slide",
        slideshowSpeed: 3000
    });



});

function emailSignUpBetaFn(response) {
    $("#emailBetaSignUp #emailAddr").val("");
}
$(document).ready(function () {
    //tl.pg.init({ /* optional preferences go here */ });
    
    
    $('.secTour').each(function (i, element) {

    var elementWatcher = scrollMonitor.create(element, -300);

    elementWatcher.enterViewport(function () {
        
         $(element).find("h2").toggleClass('shTour animated slideInUp');
        console.log($(element).find("h2"));
       
    });
    elementWatcher.exitViewport(function () {
        
         $(element).find("h2").toggleClass('shTour animated slideInUp');
    });
})
    
    
//footer anchor
$( "#footer a" ).on( "click", function( event ) {
    event.preventDefault();
    comingSoon();
});
//end footer anchor
    
});


function comingSoon()
{
    toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-bottom-center",
                "preventDuplicates": true,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
    toastr.info('Coming soon!.')
}

