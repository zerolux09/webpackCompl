import './scss/index.scss';
import './module';
import 'gsap';
import $ from 'jquery';
import 'bootstrap';
import Logo from './logo.png';


  function component() {
    const element = document.createElement('div');

    // Lodash, now imported by this script
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    // element.classList.add('hello');
    global.jQuery = $;
    global.$ = $;
   // Add the image to our existing div.
   const myLogo = new Image();
   myLogo.src = Logo;

   element.appendChild(myLogo);

    return element;
  }

   document.body.appendChild(component());
