const jquery = require('jquery');
import 'jquery';
import 'bootstrap';
import {TimelineMax} from 'gsap';
import main from './main';
import preloder from './preloder';
import fullMenu from './full-menu';
import pageHref from './page-href';
import projectsingleA from './project-singleA';
import revealBlock from './reveal-Block';
import magnetichover from './magnetic-hover';
// import owlcarousel from './owl-carousel';
// import customcursor from './custom-Cursor';

console.log(main);
console.log(preloder);
console.log(fullMenu);
console.log(pageHref);
console.log(projectsingleA);
console.log(revealBlock);
console.log(magnetichover);
// console.log(customcursor);
// console.log(owlcarousel);
// plugin();
// console.log(jquery);
jquery();
const tl = new TimelineMax();

tl.from(('.logo__u'), 2, {
  y: -30,
})
    .from(
        ('.logo__r'),
        2,
        {
          rotation: 18,
          transformOrigin: '100% 50%',
        },
        '-=1.5',
    )
    .from(
        ('.logo__i'),
        2,
        {
          y: '100%',
        },
        '-=1.5',
    )
    .from(
        ('.logo__t-top'),
        2,
        {
          x: '100%',
        },
        '-=1.5',
    )
    .from(
        ('.logo__t-bottom'),
        2,
        {
          y: '-100%',
        },
        '-=1.5',
    )
    .from(
        ('.logo__y'),
        2,
        {
          y: '100%',
        },
        '-=2',
    );
