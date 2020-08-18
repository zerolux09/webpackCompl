/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-invalid-this */
// --------------------------------------------------
// Animation on before page href
// --------------------------------------------------
import jQuery from 'jquery'
jQuery();

(function($) {
$('.load-marmoset').on('click', function(e) {
    e.preventDefault()
        setTimeout(function(url) {
        window.location = url
    }, 50, this.href)
    HideLoad()
})
})(jQuery)
