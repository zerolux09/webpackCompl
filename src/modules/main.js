/* eslint-disable no-throw-literal */
/* eslint-disable no-unused-vars */
/* eslint-disable new-cap */
/* eslint-disable no-undef */
/* eslint-disable no-invalid-this */

import jQuery from 'jQuery';
// VanillaTilt();

// import 'jQuery';

jQuery();

// vanilla
const VanillaTilt = (function() {
  'use strict';
  class e {
    constructor(e, t = {}) {
      if (!(e instanceof Node)) {
throw 'Can\'t initialize VanillaTilt because ' + e + ' is not a Node.';
}
      (this.width = null),
        (this.height = null),
        (this.left = null),
        (this.top = null),
        (this.transitionTimeout = null),
        (this.updateCall = null),
        (this.updateBind = this.update.bind(this)),
        (this.resetBind = this.reset.bind(this)),
        (this.element = e),
        (this.settings = this.extendSettings(t)),
        (this.elementListener = this.getElementListener()),
        (this.reverse = this.settings.reverse ? -1 : 1),
        (this.glare = this.isSettingTrue(this.settings.glare)),
        (this.glarePrerender = this.isSettingTrue(
          this.settings['glare-prerender'],
        )),
        (this.gyroscope = this.isSettingTrue(this.settings.gyroscope)),
        this.glare && this.prepareGlare(),
        this.addEventListeners();
    }
    isSettingTrue(e) {
      return '' === e || !0 === e || 1 === e;
    }
    getElementListener() {
      if (!this.settings || !this.settings['mouse-event-element']) {
return this.element;
}
      if ('string' == typeof this.settings['mouse-event-element']) {
        const e = document.querySelector(this.settings['mouse-event-element']);
        if (e) return e;
      }
      return this.settings['mouse-event-element'] instanceof Node ?
        this.settings['mouse-event-element'] :
        void 0;
    }
    addEventListeners() {
      (this.onMouseEnterBind = this.onMouseEnter.bind(this)),
        (this.onMouseMoveBind = this.onMouseMove.bind(this)),
        (this.onMouseLeaveBind = this.onMouseLeave.bind(this)),
        (this.onWindowResizeBind = this.onWindowResize.bind(this)),
        (this.onDeviceOrientationBind = this.onDeviceOrientation.bind(this)),
        this.elementListener.addEventListener(
          'mouseenter',
          this.onMouseEnterBind,
        ),
        this.elementListener.addEventListener(
          'mousemove',
          this.onMouseMoveBind,
        ),
        this.elementListener.addEventListener(
          'mouseleave',
          this.onMouseLeaveBind,
        ),
        this.glare &&
          window.addEventListener('resize', this.onWindowResizeBind),
        this.gyroscope &&
          window.addEventListener(
            'deviceorientation',
            this.onDeviceOrientationBind,
          );
    }
    removeEventListeners() {
      this.elementListener.removeEventListener(
        'mouseenter',
        this.onMouseEnterBind,
      ),
        this.elementListener.removeEventListener(
          'mousemove',
          this.onMouseMoveBind,
        ),
        this.elementListener.removeEventListener(
          'mouseleave',
          this.onMouseLeaveBind,
        ),
        this.gyroscope &&
          window.removeEventListener(
            'deviceorientation',
            this.onDeviceOrientationBind,
          ),
        this.glare &&
          window.removeEventListener('resize', this.onWindowResizeBind);
    }
    destroy() {
      clearTimeout(this.transitionTimeout),
        null !== this.updateCall && cancelAnimationFrame(this.updateCall),
        this.reset(),
        this.removeEventListeners(),
        (this.element.vanillaTilt = null),
        delete this.element.vanillaTilt,
        (this.element = null);
    }
    onDeviceOrientation(e) {
      if (null === e.gamma || null === e.beta) return;
      this.updateElementPosition();
      const t =
          this.settings.gyroscopeMaxAngleX - this.settings.gyroscopeMinAngleX;
        const i = this.settings.gyroscopeMaxAngleY - this.settings.gyroscopeMinAngleY;
        const s = t / this.width;
        const n = i / this.height;
        const l = (e.gamma - this.settings.gyroscopeMinAngleX) / s;
        const a = (e.beta - this.settings.gyroscopeMinAngleY) / n;
      null !== this.updateCall && cancelAnimationFrame(this.updateCall),
        (this.event = {clientX: l + this.left, clientY: a + this.top}),
        (this.updateCall = requestAnimationFrame(this.updateBind));
    }
    onMouseEnter() {
      this.updateElementPosition(),
        (this.element.style.willChange = 'transform'),
        this.setTransition();
    }
    onMouseMove(e) {
      null !== this.updateCall && cancelAnimationFrame(this.updateCall),
        (this.event = e),
        (this.updateCall = requestAnimationFrame(this.updateBind));
    }
    onMouseLeave() {
      this.setTransition(),
        this.settings.reset && requestAnimationFrame(this.resetBind);
    }
    reset() {
      (this.event = {
        pageX: this.left + this.width / 2,
        pageY: this.top + this.height / 2,
      }),
        this.element &&
          this.element.style &&
          (this.element.style.transform =
            `perspective(${this.settings.perspective}px) ` +
            'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'),
        this.glare &&
          ((this.glareElement.style.transform =
            'rotate(180deg) translate(-50%, -50%)'),
          (this.glareElement.style.opacity = '0'));
    }
    getValues() {
      let e = (this.event.clientX - this.left) / this.width;
        let t = (this.event.clientY - this.top) / this.height;
      return (
        (e = Math.min(Math.max(e, 0), 1)),
        (t = Math.min(Math.max(t, 0), 1)),
        {
          tiltX: (
            this.reverse *
            (this.settings.max / 2 - e * this.settings.max)
          ).toFixed(2),
          tiltY: (
            this.reverse *
            (t * this.settings.max - this.settings.max / 2)
          ).toFixed(2),
          percentageX: 100 * e,
          percentageY: 100 * t,
          angle:
            Math.atan2(
              this.event.clientX - (this.left + this.width / 2),
              -(this.event.clientY - (this.top + this.height / 2)),
            ) *
            (180 / Math.PI),
        }
      );
    }
    updateElementPosition() {
      const e = this.element.getBoundingClientRect();
      (this.width = this.element.offsetWidth),
        (this.height = this.element.offsetHeight),
        (this.left = e.left),
        (this.top = e.top);
    }
    update() {
      const e = this.getValues();
      (this.element.style.transform =
        'perspective(' +
        this.settings.perspective +
        'px) rotateX(' +
        ('x' === this.settings.axis ? 0 : e.tiltY) +
        'deg) rotateY(' +
        ('y' === this.settings.axis ? 0 : e.tiltX) +
        'deg) scale3d(' +
        this.settings.scale +
        ', ' +
        this.settings.scale +
        ', ' +
        this.settings.scale +
        ')'),
        this.glare &&
          ((this.glareElement.style.transform = `rotate(${e.angle}deg) translate(-50%, -50%)`),
          (this.glareElement.style.opacity = `${
            (e.percentageY * this.settings['max-glare']) / 100
          }`)),
        this.element.dispatchEvent(
          new CustomEvent('tiltChange', {detail: e}),
        ),
        (this.updateCall = null);
    }
    prepareGlare() {
      if (!this.glarePrerender) {
        const e = document.createElement('div');
        e.classList.add('js-tilt-glare');
        const t = document.createElement('div');
        t.classList.add('js-tilt-glare-inner'),
          e.appendChild(t),
          this.element.appendChild(e);
      }
      (this.glareElementWrapper = this.element.querySelector('.js-tilt-glare')),
        (this.glareElement = this.element.querySelector(
          '.js-tilt-glare-inner',
        )),
        this.glarePrerender ||
          (Object.assign(this.glareElementWrapper.style, {
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'overflow': 'hidden',
            'pointer-events': 'none',
          }),
          Object.assign(this.glareElement.style, {
            'position': 'absolute',
            'top': '50%',
            'left': '50%',
            'pointer-events': 'none',
            'background-image':
              'linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
            'width': `${2 * this.element.offsetWidth}px`,
            'height': `${2 * this.element.offsetWidth}px`,
            'transform': 'rotate(180deg) translate(-50%, -50%)',
            'transform-origin': '0% 0%',
            'opacity': '0',
          }));
    }
    updateGlareSize() {
      Object.assign(this.glareElement.style, {
        width: `${2 * this.element.offsetWidth}`,
        height: `${2 * this.element.offsetWidth}`,
      });
    }
    onWindowResize() {
      this.updateGlareSize();
    }
    setTransition() {
      clearTimeout(this.transitionTimeout),
        (this.element.style.transition =
          this.settings.speed + 'ms ' + this.settings.easing),
        this.glare &&
          (this.glareElement.style.transition = `opacity ${this.settings.speed}ms ${this.settings.easing}`),
        (this.transitionTimeout = setTimeout(() => {
          (this.element.style.transition = ''),
            this.glare && (this.glareElement.style.transition = '');
        }, this.settings.speed));
    }
    extendSettings(e) {
      const t = {
          'reverse': !1,
          'max': 35,
          'perspective': 1e3,
          'easing': 'cubic-bezier(.03,.98,.52,.99)',
          'scale': 1,
          'speed': 300,
          'transition': !0,
          'axis': null,
          'glare': !1,
          'max-glare': 1,
          'glare-prerender': !1,
          'mouse-event-element': null,
          'reset': !0,
          'gyroscope': !0,
          'gyroscopeMinAngleX': -45,
          'gyroscopeMaxAngleX': 45,
          'gyroscopeMinAngleY': -45,
          'gyroscopeMaxAngleY': 45,
        };
        const i = {};
      for (const s in t) {
if (s in e) i[s] = e[s];
        else if (this.element.hasAttribute('data-tilt-' + s)) {
          const e = this.element.getAttribute('data-tilt-' + s);
          try {
            i[s] = JSON.parse(e);
          } catch (t) {
            i[s] = e;
          }
        } else i[s] = t[s];
}
      return i;
    }
    static init(t, i) {
      t instanceof Node && (t = [t]),
        t instanceof NodeList && (t = [].slice.call(t)),
        t instanceof Array &&
          t.forEach((t) => {
            'vanillaTilt' in t || (t.vanillaTilt = new e(t, i));
          });
    }
  }
  return (
    'undefined' != typeof document &&
      ((window.VanillaTilt = e),
      e.init(document.querySelectorAll('[data-tilt]'))),
    e
  );
})();

    (function($) {
    // USE STRICT
    'use strict'

    // --------------------------------------------------
    // Vanilla.js tilt setup
    // --------------------------------------------------

    VanillaTilt.init(document.querySelectorAll('.project-img'), {
        max: 5,
        speed: 2000,
        scale: '1',
    })

    // --------------------------------------------------
    // AOS.js begin
    // --------------------------------------------------
    // AOS.init({
    //     once: true,
    // })
})(jQuery)


