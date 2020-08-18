import './scss/index.scss';
import './module';
import 'gsap';
import $ from 'jquery';
import 'bootstrap';
import Logo from './img/logo.png';
import image1 from './img/portfolio/1.png';
import image2 from './img/portfolio/2.png';
import image3 from './img/portfolio/3.png';
import image4 from './img/portfolio/4.png';
import image5 from './img/portfolio/5.png';


  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
    global.jQuery = $;
    global.$ = $;
   // Add the image to our existing div.
   const myLogo = new Image();
   const image1 = new Image();
   const image2 = new Image();
   const image3 = new Image();
   const image4 = new Image();
   const image5 = new Image();

   myLogo.src = Logo;
   image1.src = image1;
   image2.src = image2;
   image3.src = image3;
   image4.src = image4;
   image5.src = image5;

   element.appendChild(myLogo);
   element.appendChild(image1);
   element.appendChild(image2);
   element.appendChild(image3);
   element.appendChild(image4);
   element.appendChild(image5);

    return element;
  }

   document.body.appendChild(component());
