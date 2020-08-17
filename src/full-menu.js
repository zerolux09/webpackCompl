// --------------------------------------------------
// Animation on full menu
// --------------------------------------------------

TweenMax.to('.menu', 1, {
    opacity: 0,
})

const t1 = new TimelineMax({
    paused: true
})
t1.to('.bg_block_first', 0.5, {
    height: '50%'
})
t1.to('.bg_block_second', 0.5, {
    height: '50%',
    delay: '-0.5'
})
t1.to('.one', 0.3, {
    y: 9,
    autoAlpha: 0,
    delay: '-1',
    ease: Expo.easeInOut
})
t1.to('.two', 0.3, {
    ease: Expo.easeInOut,
    delay: '-1'
})
t1.to('.tre', 0.3, {
    y: -9,
    autoAlpha: 0,
    ease: Expo.easeInOut,
    delay: '-1'
})

t1.to('.menu', 1, {
    autoAlpha: 1,
    ease: Expo.easeOut,
    delay: '-0.3'
})

t1.from('.menu ul li', 0.3, {
    scale: '1.4',
    opacity: 0,
    ease: Power4.easeInOut,
    delay: '0.8'
}, '-0.01')

t1.reverse()
$(document).on('click', '.toggle-btn', function() {
    t1.reversed(!t1.reversed()) // toggles the orientation
})
$(document).on('click', '.menu-link', function() {
    t1.reversed(!t1.reversed()) // sets the orientation to reversed
})


//   Multi-menu
$('.multi-start').on('mouseenter', function() {
    $(this).addClass('hide')
    $('.multimenu').addClass('active')
})

$('.multimenu').on('mouseleave', function() {
    $('.multimenu').removeClass('active')
    $('.menu-link').removeClass('hide')
})


$('.multi-leave').on('mouseenter', function() {
    $('.multimenu').removeClass('active')
    $('.menu-link').removeClass('hide')
})