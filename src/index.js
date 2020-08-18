import './scss/index.scss';
import './module';
import 'gsap';
import $ from 'jquery';
import 'bootstrap';
import aboutBg from './img/portfolio/promo.jpg';

import ImageOne from './img/portfolio/1.jpg';
import ImageTwo from './img/portfolio/2.jpg';
import ImageThree from './img/portfolio/3.jpg';
import ImageFour from './img/portfolio/4.jpg';
import ImageFive from './img/portfolio/5.jpg';


  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
    global.jQuery = $;
    global.$ = $;
   // Add the Image to our existing div.
   const myBg = new Image();
   const Image1 = new Image();
   const Image2 = new Image();
   const Image3 = new Image();
   const Image4 = new Image();
   const Image5 = new Image();

   myBg.src = aboutBg;
   Image1.src = ImageOne;
   Image2.src = ImageTwo;
   Image3.src = ImageThree;
   Image4.src = ImageFour;
   Image5.src = ImageFive;

   element.appendChild(myBg);
   element.appendChild(Image1);
   element.appendChild(Image2);
   element.appendChild(Image3);
   element.appendChild(Image4);
   element.appendChild(Image5);

    return element;
  }

   document.body.appendChild(component());
