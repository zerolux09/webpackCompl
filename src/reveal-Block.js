import jQuery from 'jQuery';
import TweenMax from 'gsap';
import TimelineMax from 'gsap';

jQuery();
console.log(TweenMax);
console.log(TimelineMax);


// --------------------------------------------------
// Animation on Reveal Block
// --------------------------------------------------
(function($) {
console.log(RevealLoad);
    function RevealLoad() {
    const loadTL = new TimelineMax()
    const block1 = $('.block_first')
    const block2 = $('.block_second')

    loadTL
        .to(block1, 0.5, {
            height: '0',
            delay: '0'
        })
        .to(block2, 0.5, {
            height: '0',
            delay: '-0.5'
        })

    loadTL.play()
}

console.log(HideLoad);
function HideLoad() {
    const HideTL = new TimelineMax()
    const block1 = $('.block_first')
    const block2 = $('.block_second')

    HideTL
        .to(block1, 0.5, {
            height: '50%'
        })
        .to(block2, 0.5, {
            height: '50%',
            delay: '-0.5'
        })


    HideTL.play()
}
})(jQuery)
