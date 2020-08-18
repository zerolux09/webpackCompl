import './scss/index.scss';
import './module';
import 'gsap';
import $ from 'jquery';
import 'bootstrap';
import Logo from './img/logo.png';

import Image from './img/portfolio/1.png';
import ImageTwo from './img/portfolio/2.png';
import ImageThree from './img/portfolio/3.png';
import ImageFour from './img/portfolio/4.png';
import ImageFive from './img/portfolio/5.png';


  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
    global.jQuery = $;
    global.$ = $;
   // Add the Image to our existing div.
   const myLogo = new Image();
   const Image1 = new Image();
   const Image2 = new Image();
   const Image3 = new Image();
   const Image4 = new Image();
   const Image5 = new Image();

   myLogo.src = Logo;
   Image1.src = Image;
   Image2.src = ImageTwo;
   Image3.src = ImageThree;
   Image4.src = ImageFour;
   Image5.src = ImageFive;

   element.appendChild(myLogo);
   element.appendChild(Image1);
   element.appendChild(Image2);
   element.appendChild(Image3);
   element.appendChild(Image4);
   element.appendChild(Image5);

    return element;
  }

   document.body.appendChild(component());
