/* eslint-disable no-undef */
import jQuery from 'jQuery';
import {TweenMax} from 'gsap';
jQuery();
// --------------------------------------------------
// Custom Cursor
// --------------------------------------------------
// CustomCursor();

(function($) {
               // USE STRICT
               ('use strict');

               function CustomCursor() {
                 const cursor = $('.cursor');
                 const follower = $('.cursor-follower');

                 let posX = 0;
                 let posY = 0;

                 let mouseX = 0;
                 let mouseY = 0;

                 TweenMax.to({}, 0.016, {
                   repeat: -1,
                   onRepeat: function() {
                     posX += (mouseX - posX) / 10;
                     posY += (mouseY - posY) / 10;

                     TweenMax.set(follower, {
                       css: {
                         left: posX - 12,
                         top: posY - 12,
                       },
                     });

                     TweenMax.set(cursor, {
                       css: {
                         left: mouseX,
                         top: mouseY,
                       },
                     });
                   },
                 });

                 $(document).on('mousemove', function(e) {
                   mouseX = e.pageX;
                   mouseY = e.pageY;
                 });

                 $('.link').on('mouseenter', function() {
                   cursor.addClass('active');
                   follower.addClass('active');
                 });
                 $('.link').on('mouseleave', function() {
                   cursor.removeClass('active');
                   follower.removeClass('active');
                 });

                 $('.empty-cursor').on('mouseenter', function() {
                   follower.addClass('empty');
                   cursor.addClass('empty');
                 });
                 $('.empty-cursor').on('mouseleave', function() {
                   follower.removeClass('empty');
                   cursor.removeClass('empty');
                 });
               }
            })(jQuery);

