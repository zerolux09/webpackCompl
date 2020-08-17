// --------------------------------------------------
// Animation on before page href
// --------------------------------------------------
$('.load-marmoset').on('click', function(e) {
    e.preventDefault()
        setTimeout(function(url) {
        window.location = url
    }, 50, this.href)
    HideLoad()
})