(function($) {
// USE STRICT
'use strict'

// Start Preloaded
$(window).on('load', function() {
    function preLoader() {
        setTimeout(function() {
            $('#preloader-wapper .loader-middle').addClass('loaded')
            setTimeout(function() {
                $('#preloader-wapper').addClass('loaded')
                setTimeout(function() {
                    $('#preloader-wapper').remove()
                    }, 400)
                }, 600)
            }, 1000)
        }
        preLoader()
})
})(jQuery)