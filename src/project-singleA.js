(function($) {
    // USE STRICT
    'use strict'




    // --------------------------------------------------
    // Animation on about/project-single
    // --------------------------------------------------

    const wind = $(window)

    wind.on('scroll', function() {
        const bodyScroll = wind.scrollTop()

        if (bodyScroll > 100) {
            TweenMax.to('.about', 2, {
                autoAlpha: 0,
                scale: 1.1,
            })
            TweenMax.to('.main-title', 2, {
                autoAlpha: 0,
                y: -250,
                scale: 1,
            })
        } else {
            TweenMax.to('.about', 1, {
                autoAlpha: 1,
                scale: 1,
            })
            TweenMax.to('.main-title', 1, {
                autoAlpha: 1,
                y: 0,
                scale: 1,
            })
        }
    })