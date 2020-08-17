/* eslint-disable no-const-assign */
/* eslint-disable no-new-wrappers */
/* eslint-disable no-sparse-arrays */
/* eslint-disable no-unexpected-multiline */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable no-useless-escape */
/* eslint-disable getter-return */
/* eslint-disable no-empty */
/* eslint-disable no-tabs */
/* eslint-disable prefer-spread */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-undef */
/* eslint-disable new-cap */
/* eslint-disable no-throw-literal */
/* eslint-disable no-var */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
(function(a, b, c, d) {
  function e(b, c) {
    (this.settings = null),
      (this.options = a.extend({}, e.Defaults, c)),
      (this.$element = a(b)),
      (this._handlers = {}),
      (this._plugins = {}),
      (this._supress = {}),
      (this._current = null),
      (this._speed = null),
      (this._coordinates = []),
      (this._breakpoint = null),
      (this._width = null),
      (this._items = []),
      (this._clones = []),
      (this._mergers = []),
      (this._widths = []),
      (this._invalidated = {}),
      (this._pipe = []),
      (this._drag = {
        time: null,
        target: null,
        pointer: null,
        stage: {start: null, current: null},
        direction: null,
      }),
      (this._states = {
        current: {},
        tags: {
          initializing: ['busy'],
          animating: ['busy'],
          dragging: ['interacting'],
        },
      }),
      a.each(
        ['onResize', 'onThrottledResize'],
        a.proxy(function(b, c) {
          this._handlers[c] = a.proxy(this[c], this);
        }, this),
      ),
      a.each(
        e.Plugins,
        a.proxy(function(a, b) {
          this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] = new b(this);
        }, this),
      ),
      a.each(
        e.Workers,
        a.proxy(function(b, c) {
          this._pipe.push({filter: c.filter, run: a.proxy(c.run, this)});
        }, this),
      ),
      this.setup(),
      this.initialize();
  }
  (e.Defaults = {
    items: 3,
    loop: !1,
    center: !1,
    rewind: !1,
    checkVisibility: !0,
    mouseDrag: !0,
    touchDrag: !0,
    pullDrag: !0,
    freeDrag: !1,
    margin: 0,
    stagePadding: 0,
    merge: !1,
    mergeFit: !0,
    autoWidth: !1,
    startPosition: 0,
    rtl: !1,
    smartSpeed: 250,
    fluidSpeed: !1,
    dragEndSpeed: !1,
    responsive: {},
    responsiveRefreshRate: 200,
    responsiveBaseElement: b,
    fallbackEasing: 'swing',
    slideTransition: '',
    info: !1,
    nestedItemSelector: !1,
    itemElement: 'div',
    stageElement: 'div',
    refreshClass: 'owl-refresh',
    loadedClass: 'owl-loaded',
    loadingClass: 'owl-loading',
    rtlClass: 'owl-rtl',
    responsiveClass: 'owl-responsive',
    dragClass: 'owl-drag',
    itemClass: 'owl-item',
    stageClass: 'owl-stage',
    stageOuterClass: 'owl-stage-outer',
    grabClass: 'owl-grab',
  }),
    (e.Width = {Default: 'default', Inner: 'inner', Outer: 'outer'}),
    (e.Type = {Event: 'event', State: 'state'}),
    (e.Plugins = {}),
    (e.Workers = [
      {
        filter: ['width', 'settings'],
        run: function() {
          this._width = this.$element.width();
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function(a) {
          a.current = this._items && this._items[this.relative(this._current)];
        },
      },
      {
        filter: ['items', 'settings'],
        run: function() {
          this.$stage.children('.cloned').remove();
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function(a) {
          const b = this.settings.margin || '';
            const c = !this.settings.autoWidth;
            const d = this.settings.rtl;
            const e = {
              'width': 'auto',
              'margin-left': d ? b : '',
              'margin-right': d ? '' : b,
            };
          !c && this.$stage.children().css(e), (a.css = e);
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function(a) {
          const b =
              (this.width() / this.settings.items).toFixed(3) -
              this.settings.margin;
            let c = null;
            let d = this._items.length;
            const e = !this.settings.autoWidth;
            const f = [];
          for (a.items = {merge: !1, width: b}; d--; ) {
(c = this._mergers[d]),
              (c =
                (this.settings.mergeFit && Math.min(c, this.settings.items)) ||
                c),
              (a.items.merge = c > 1 || a.items.merge),
              (f[d] = e ? b * c : this._items[d].width());
}
          this._widths = f;
        },
      },
      {
        filter: ['items', 'settings'],
        run: function() {
          const b = [];
            const c = this._items;
            const d = this.settings;
            const e = Math.max(2 * d.items, 4);
            const f = 2 * Math.ceil(c.length / 2);
            let g = d.loop && c.length ? (d.rewind ? e : Math.max(e, f)) : 0;
            let h = '';
            let i = '';
          for (g /= 2; g > 0; ) {
b.push(this.normalize(b.length / 2, !0)),
              (h += c[b[b.length - 1]][0].outerHTML),
              b.push(this.normalize(c.length - 1 - (b.length - 1) / 2, !0)),
              (i = c[b[b.length - 1]][0].outerHTML + i),
              (g -= 1);
}
          (this._clones = b),
            a(h).addClass('cloned').appendTo(this.$stage),
            a(i).addClass('cloned').prependTo(this.$stage);
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function() {
          for (
            var a = this.settings.rtl ? 1 : -1,
              b = this._clones.length + this._items.length,
              c = -1,
              d = 0,
              e = 0,
              f = [];
            ++c < b;

          ) {
(d = f[c - 1] || 0),
              (e = this._widths[this.relative(c)] + this.settings.margin),
              f.push(d + e * a);
}
          this._coordinates = f;
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function() {
          const a = this.settings.stagePadding;
            const b = this._coordinates;
            const c = {
              'width': Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
              'padding-left': a || '',
              'padding-right': a || '',
            };
          this.$stage.css(c);
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function(a) {
          let b = this._coordinates.length;
            const c = !this.settings.autoWidth;
            const d = this.$stage.children();
          if (c && a.items.merge) {
for (; b--; ) {
(a.css.width = this._widths[this.relative(b)]),
                d.eq(b).css(a.css);
}
} else c && ((a.css.width = a.items.width), d.css(a.css));
        },
      },
      {
        filter: ['items'],
        run: function() {
          this._coordinates.length < 1 && this.$stage.removeAttr('style');
        },
      },
      {
        filter: ['width', 'items', 'settings'],
        run: function(a) {
          (a.current = a.current ? this.$stage.children().index(a.current) : 0),
            (a.current = Math.max(
              this.minimum(),
              Math.min(this.maximum(), a.current),
            )),
            this.reset(a.current);
        },
      },
      {
        filter: ['position'],
        run: function() {
          this.animate(this.coordinates(this._current));
        },
      },
      {
        filter: ['width', 'position', 'items', 'settings'],
        run: function() {
          let a;
            let b;
            let c;
            let d;
            const e = this.settings.rtl ? 1 : -1;
            const f = 2 * this.settings.stagePadding;
            const g = this.coordinates(this.current()) + f;
            const h = g + this.width() * e;
            const i = [];
          for (c = 0, d = this._coordinates.length; c < d; c++) {
(a = this._coordinates[c - 1] || 0),
              (b = Math.abs(this._coordinates[c]) + f * e),
              ((this.op(a, '<=', g) && this.op(a, '>', h)) ||
                (this.op(b, '<', g) && this.op(b, '>', h))) &&
                i.push(c);
}
          this.$stage.children('.active').removeClass('active'),
            this.$stage
              .children(':eq(' + i.join('), :eq(') + ')')
              .addClass('active'),
            this.$stage.children('.center').removeClass('center'),
            this.settings.center &&
              this.$stage.children().eq(this.current()).addClass('center');
        },
      },
    ]),
    (e.prototype.initializeStage = function() {
      (this.$stage = this.$element.find('.' + this.settings.stageClass)),
        this.$stage.length ||
          (this.$element.addClass(this.options.loadingClass),
          (this.$stage = a('<' + this.settings.stageElement + '>', {
            class: this.settings.stageClass,
          }).wrap(a('<div/>', {class: this.settings.stageOuterClass}))),
          this.$element.append(this.$stage.parent()));
    }),
    (e.prototype.initializeItems = function() {
      const b = this.$element.find('.owl-item');
      if (b.length) {
return (
          (this._items = b.get().map(function(b) {
            return a(b);
          })),
          (this._mergers = this._items.map(function() {
            return 1;
          })),
          void this.refresh()
        );
}
      this.replace(this.$element.children().not(this.$stage.parent())),
        this.isVisible() ? this.refresh() : this.invalidate('width'),
        this.$element
          .removeClass(this.options.loadingClass)
          .addClass(this.options.loadedClass);
    }),
    (e.prototype.initialize = function() {
      if (
        (this.enter('initializing'),
        this.trigger('initialize'),
        this.$element.toggleClass(this.settings.rtlClass, this.settings.rtl),
        this.settings.autoWidth && !this.is('pre-loading'))
      ) {
        let a; let b; let c;
        (a = this.$element.find('img')),
          (b = this.settings.nestedItemSelector ?
            '.' + this.settings.nestedItemSelector :
            d),
          (c = this.$element.children(b).width()),
          a.length && c <= 0 && this.preloadAutoWidthImages(a);
      }
      this.initializeStage(),
        this.initializeItems(),
        this.registerEventHandlers(),
        this.leave('initializing'),
        this.trigger('initialized');
    }),
    (e.prototype.isVisible = function() {
      return !this.settings.checkVisibility || this.$element.is(':visible');
    }),
    (e.prototype.setup = function() {
      const b = this.viewport();
        const c = this.options.responsive;
        let d = -1;
        let e = null;
      c ?
        (a.each(c, function(a) {
            a <= b && a > d && (d = Number(a));
          }),
          (e = a.extend({}, this.options, c[d])),
          'function' == typeof e.stagePadding &&
            (e.stagePadding = e.stagePadding()),
          delete e.responsive,
          e.responsiveClass &&
            this.$element.attr(
              'class',
              this.$element
                .attr('class')
                .replace(
                  new RegExp(
                    '(' + this.options.responsiveClass + '-)\\S+\\s',
                    'g',
                  ),
                  '$1' + d,
                ),
            )) :
        (e = a.extend({}, this.options)),
        this.trigger('change', {property: {name: 'settings', value: e}}),
        (this._breakpoint = d),
        (this.settings = e),
        this.invalidate('settings'),
        this.trigger('changed', {
          property: {name: 'settings', value: this.settings},
        });
    }),
    (e.prototype.optionsLogic = function() {
      this.settings.autoWidth &&
        ((this.settings.stagePadding = !1), (this.settings.merge = !1));
    }),
    (e.prototype.prepare = function(b) {
      const c = this.trigger('prepare', {content: b});
      return (
        c.data ||
          (c.data = a('<' + this.settings.itemElement + '/>')
            .addClass(this.options.itemClass)
            .append(b)),
        this.trigger('prepared', {content: c.data}),
        c.data
      );
    }),
    (e.prototype.update = function() {
      for (
        let b = 0,
          c = this._pipe.length,
          d = a.proxy(function(a) {
            return this[a];
          }, this._invalidated),
          e = {};
        b < c;

      ) {
(this._invalidated.all || a.grep(this._pipe[b].filter, d).length > 0) &&
          this._pipe[b].run(e),
          b++;
}
      (this._invalidated = {}), !this.is('valid') && this.enter('valid');
    }),
    (e.prototype.width = function(a) {
      switch ((a = a || e.Width.Default)) {
        case e.Width.Inner:
        case e.Width.Outer:
          return this._width;
        default:
          return (
            this._width - 2 * this.settings.stagePadding + this.settings.margin
          );
      }
    }),
    (e.prototype.refresh = function() {
      this.enter('refreshing'),
        this.trigger('refresh'),
        this.setup(),
        this.optionsLogic(),
        this.$element.addClass(this.options.refreshClass),
        this.update(),
        this.$element.removeClass(this.options.refreshClass),
        this.leave('refreshing'),
        this.trigger('refreshed');
    }),
    (e.prototype.onThrottledResize = function() {
      b.clearTimeout(this.resizeTimer),
        (this.resizeTimer = b.setTimeout(
          this._handlers.onResize,
          this.settings.responsiveRefreshRate,
        ));
    }),
    (e.prototype.onResize = function() {
      return (
        !!this._items.length &&
        this._width !== this.$element.width() &&
        !!this.isVisible() &&
        (this.enter('resizing'),
        this.trigger('resize').isDefaultPrevented() ?
          (this.leave('resizing'), !1) :
          (this.invalidate('width'),
            this.refresh(),
            this.leave('resizing'),
            void this.trigger('resized')))
      );
    }),
    (e.prototype.registerEventHandlers = function() {
      a.support.transition &&
        this.$stage.on(
          a.support.transition.end + '.owl.core',
          a.proxy(this.onTransitionEnd, this),
        ),
        !1 !== this.settings.responsive &&
          this.on(b, 'resize', this._handlers.onThrottledResize),
        this.settings.mouseDrag &&
          (this.$element.addClass(this.options.dragClass),
          this.$stage.on('mousedown.owl.core', a.proxy(this.onDragStart, this)),
          this.$stage.on(
            'dragstart.owl.core selectstart.owl.core',
            function() {
              return !1;
            },
          )),
        this.settings.touchDrag &&
          (this.$stage.on(
            'touchstart.owl.core',
            a.proxy(this.onDragStart, this),
          ),
          this.$stage.on(
            'touchcancel.owl.core',
            a.proxy(this.onDragEnd, this),
          ));
    }),
    (e.prototype.onDragStart = function(b) {
      let d = null;
      3 !== b.which &&
        (a.support.transform ?
          ((d = this.$stage
              .css('transform')
              .replace(/.*\(|\)| /g, '')
              .split(',')),
            (d = {
              x: d[16 === d.length ? 12 : 4],
              y: d[16 === d.length ? 13 : 5],
            })) :
          ((d = this.$stage.position()),
            (d = {
              x: this.settings.rtl ?
                d.left +
                  this.$stage.width() -
                  this.width() +
                  this.settings.margin :
                d.left,
              y: d.top,
            })),
        this.is('animating') &&
          (a.support.transform ? this.animate(d.x) : this.$stage.stop(),
          this.invalidate('position')),
        this.$element.toggleClass(
          this.options.grabClass,
          'mousedown' === b.type,
        ),
        this.speed(0),
        (this._drag.time = new Date().getTime()),
        (this._drag.target = a(b.target)),
        (this._drag.stage.start = d),
        (this._drag.stage.current = d),
        (this._drag.pointer = this.pointer(b)),
        a(c).on(
          'mouseup.owl.core touchend.owl.core',
          a.proxy(this.onDragEnd, this),
        ),
        a(c).one(
          'mousemove.owl.core touchmove.owl.core',
          a.proxy(function(b) {
            const d = this.difference(this._drag.pointer, this.pointer(b));
            a(c).on(
              'mousemove.owl.core touchmove.owl.core',
              a.proxy(this.onDragMove, this),
            ),
              (Math.abs(d.x) < Math.abs(d.y) && this.is('valid')) ||
                (b.preventDefault(),
                this.enter('dragging'),
                this.trigger('drag'));
          }, this),
        ));
    }),
    (e.prototype.onDragMove = function(a) {
      let b = null;
        let c = null;
        let d = null;
        const e = this.difference(this._drag.pointer, this.pointer(a));
        const f = this.difference(this._drag.stage.start, e);
      this.is('dragging') &&
        (a.preventDefault(),
        this.settings.loop ?
          ((b = this.coordinates(this.minimum())),
            (c = this.coordinates(this.maximum() + 1) - b),
            (f.x = ((((f.x - b) % c) + c) % c) + b)) :
          ((b = this.settings.rtl ?
              this.coordinates(this.maximum()) :
              this.coordinates(this.minimum())),
            (c = this.settings.rtl ?
              this.coordinates(this.minimum()) :
              this.coordinates(this.maximum())),
            (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
            (f.x = Math.max(Math.min(f.x, b + d), c + d))),
        (this._drag.stage.current = f),
        this.animate(f.x));
    }),
    (e.prototype.onDragEnd = function(b) {
      const d = this.difference(this._drag.pointer, this.pointer(b));
        const e = this._drag.stage.current;
        const f = (d.x > 0) ^ this.settings.rtl ? 'left' : 'right';
      a(c).off('.owl.core'),
        this.$element.removeClass(this.options.grabClass),
        ((0 !== d.x && this.is('dragging')) || !this.is('valid')) &&
          (this.speed(this.settings.dragEndSpeed || this.settings.smartSpeed),
          this.current(this.closest(e.x, 0 !== d.x ? f : this._drag.direction)),
          this.invalidate('position'),
          this.update(),
          (this._drag.direction = f),
          (Math.abs(d.x) > 3 || new Date().getTime() - this._drag.time > 300) &&
            this._drag.target.one('click.owl.core', function() {
              return !1;
            })),
        this.is('dragging') &&
          (this.leave('dragging'), this.trigger('dragged'));
    }),
    (e.prototype.closest = function(b, c) {
      let e = -1;
        const f = 30;
        const g = this.width();
        const h = this.coordinates();
      return (
        this.settings.freeDrag ||
          a.each(
            h,
            a.proxy(function(a, i) {
              return (
                'left' === c && b > i - f && b < i + f ?
                  (e = a) :
                  'right' === c && b > i - g - f && b < i - g + f ?
                  (e = a + 1) :
                  this.op(b, '<', i) &&
                    this.op(b, '>', h[a + 1] !== d ? h[a + 1] : i - g) &&
                    (e = 'left' === c ? a + 1 : a),
                -1 === e
              );
            }, this),
          ),
        this.settings.loop ||
          (this.op(b, '>', h[this.minimum()]) ?
            (e = b = this.minimum()) :
            this.op(b, '<', h[this.maximum()]) && (e = b = this.maximum())),
        e
      );
    }),
    (e.prototype.animate = function(b) {
      const c = this.speed() > 0;
      this.is('animating') && this.onTransitionEnd(),
        c && (this.enter('animating'), this.trigger('translate')),
        a.support.transform3d && a.support.transition ?
          this.$stage.css({
              transform: 'translate3d(' + b + 'px,0px,0px)',
              transition:
                this.speed() / 1e3 +
                's' +
                (this.settings.slideTransition ?
                  ' ' + this.settings.slideTransition :
                  ''),
            }) :
          c ?
          this.$stage.animate(
              {left: b + 'px'},
              this.speed(),
              this.settings.fallbackEasing,
              a.proxy(this.onTransitionEnd, this),
            ) :
          this.$stage.css({left: b + 'px'});
    }),
    (e.prototype.is = function(a) {
      return this._states.current[a] && this._states.current[a] > 0;
    }),
    (e.prototype.current = function(a) {
      if (a === d) return this._current;
      if (0 === this._items.length) return d;
      if (((a = this.normalize(a)), this._current !== a)) {
        const b = this.trigger('change', {
          property: {name: 'position', value: a},
        });
        b.data !== d && (a = this.normalize(b.data)),
          (this._current = a),
          this.invalidate('position'),
          this.trigger('changed', {
            property: {name: 'position', value: this._current},
          });
      }
      return this._current;
    }),
    (e.prototype.invalidate = function(b) {
      return (
        'string' === a.type(b) &&
          ((this._invalidated[b] = !0),
          this.is('valid') && this.leave('valid')),
        a.map(this._invalidated, function(a, b) {
          return b;
        })
      );
    }),
    (e.prototype.reset = function(a) {
      (a = this.normalize(a)) !== d &&
        ((this._speed = 0),
        (this._current = a),
        this.suppress(['translate', 'translated']),
        this.animate(this.coordinates(a)),
        this.release(['translate', 'translated']));
    }),
    (e.prototype.normalize = function(a, b) {
      const c = this._items.length;
        const e = b ? 0 : this._clones.length;
      return (
        !this.isNumeric(a) || c < 1 ?
          (a = d) :
          (a < 0 || a >= c + e) &&
            (a = ((((a - e / 2) % c) + c) % c) + e / 2),
        a
      );
    }),
    (e.prototype.relative = function(a) {
      return (a -= this._clones.length / 2), this.normalize(a, !0);
    }),
    (e.prototype.maximum = function(a) {
      let b;
        let c;
        let d;
        const e = this.settings;
        let f = this._coordinates.length;
      if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
      else if (e.autoWidth || e.merge) {
        if ((b = this._items.length)) {
for (
            c = this._items[--b].width(), d = this.$element.width();
            b-- && !((c += this._items[b].width() + this.settings.margin) > d);

          );
}
        f = b + 1;
      } else {
f = e.center ? this._items.length - 1 : this._items.length - e.items;
}
      return a && (f -= this._clones.length / 2), Math.max(f, 0);
    }),
    (e.prototype.minimum = function(a) {
      return a ? 0 : this._clones.length / 2;
    }),
    (e.prototype.items = function(a) {
      return a === d ?
        this._items.slice() :
        ((a = this.normalize(a, !0)), this._items[a]);
    }),
    (e.prototype.mergers = function(a) {
      return a === d ?
        this._mergers.slice() :
        ((a = this.normalize(a, !0)), this._mergers[a]);
    }),
    (e.prototype.clones = function(b) {
      const c = this._clones.length / 2;
        const e = c + this._items.length;
        const f = function(a) {
          return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
        };
      return b === d ?
        a.map(this._clones, function(a, b) {
            return f(b);
          }) :
        a.map(this._clones, function(a, c) {
            return a === b ? f(c) : null;
          });
    }),
    (e.prototype.speed = function(a) {
      return a !== d && (this._speed = a), this._speed;
    }),
    (e.prototype.coordinates = function(b) {
      let c;
        let e = 1;
        let f = b - 1;
      return b === d ?
        a.map(
            this._coordinates,
            a.proxy(function(a, b) {
              return this.coordinates(b);
            }, this),
          ) :
        (this.settings.center ?
            (this.settings.rtl && ((e = -1), (f = b + 1)),
              (c = this._coordinates[b]),
              (c += ((this.width() - c + (this._coordinates[f] || 0)) / 2) * e)) :
            (c = this._coordinates[f] || 0),
          (c = Math.ceil(c)));
    }),
    (e.prototype.duration = function(a, b, c) {
      return 0 === c ?
        0 :
        Math.min(Math.max(Math.abs(b - a), 1), 6) *
            Math.abs(c || this.settings.smartSpeed);
    }),
    (e.prototype.to = function(a, b) {
      let c = this.current();
        let d = null;
        let e = a - this.relative(c);
        const f = (e > 0) - (e < 0);
        const g = this._items.length;
        const h = this.minimum();
        let i = this.maximum();
      this.settings.loop ?
        (!this.settings.rewind && Math.abs(e) > g / 2 && (e += -1 * f * g),
          (a = c + e),
          (d = ((((a - h) % g) + g) % g) + h) !== a &&
            d - e <= i &&
            d - e > 0 &&
            ((c = d - e), (a = d), this.reset(c))) :
        this.settings.rewind ?
        ((i += 1), (a = ((a % i) + i) % i)) :
        (a = Math.max(h, Math.min(i, a))),
        this.speed(this.duration(c, a, b)),
        this.current(a),
        this.isVisible() && this.update();
    }),
    (e.prototype.next = function(a) {
      (a = a || !1), this.to(this.relative(this.current()) + 1, a);
    }),
    (e.prototype.prev = function(a) {
      (a = a || !1), this.to(this.relative(this.current()) - 1, a);
    }),
    (e.prototype.onTransitionEnd = function(a) {
      if (
        a !== d &&
        (a.stopPropagation(),
        (a.target || a.srcElement || a.originalTarget) !== this.$stage.get(0))
      ) {
return !1;
}
      this.leave('animating'), this.trigger('translated');
    }),
    (e.prototype.viewport = function() {
      let d;
      return (
        this.options.responsiveBaseElement !== b ?
          (d = a(this.options.responsiveBaseElement).width()) :
          b.innerWidth ?
          (d = b.innerWidth) :
          c.documentElement && c.documentElement.clientWidth ?
          (d = c.documentElement.clientWidth) :
          console.warn('Can not detect viewport width.'),
        d
      );
    }),
    (e.prototype.replace = function(b) {
      this.$stage.empty(),
        (this._items = []),
        b && (b = b instanceof jQuery ? b : a(b)),
        this.settings.nestedItemSelector &&
          (b = b.find('.' + this.settings.nestedItemSelector)),
        b
          .filter(function() {
            return 1 === this.nodeType;
          })
          .each(
            a.proxy(function(a, b) {
              (b = this.prepare(b)),
                this.$stage.append(b),
                this._items.push(b),
                this._mergers.push(
                  1 *
                    b
                      .find('[data-merge]')
                      .addBack('[data-merge]')
                      .attr('data-merge') || 1,
                );
            }, this),
          ),
        this.reset(
          this.isNumeric(this.settings.startPosition) ?
            this.settings.startPosition :
            0,
        ),
        this.invalidate('items');
    }),
    (e.prototype.add = function(b, c) {
      const e = this.relative(this._current);
      (c = c === d ? this._items.length : this.normalize(c, !0)),
        (b = b instanceof jQuery ? b : a(b)),
        this.trigger('add', {content: b, position: c}),
        (b = this.prepare(b)),
        0 === this._items.length || c === this._items.length ?
          (0 === this._items.length && this.$stage.append(b),
            0 !== this._items.length && this._items[c - 1].after(b),
            this._items.push(b),
            this._mergers.push(
              1 *
                b
                  .find('[data-merge]')
                  .addBack('[data-merge]')
                  .attr('data-merge') || 1,
            )) :
          (this._items[c].before(b),
            this._items.splice(c, 0, b),
            this._mergers.splice(
              c,
              0,
              1 *
                b
                  .find('[data-merge]')
                  .addBack('[data-merge]')
                  .attr('data-merge') || 1,
            )),
        this._items[e] && this.reset(this._items[e].index()),
        this.invalidate('items'),
        this.trigger('added', {content: b, position: c});
    }),
    (e.prototype.remove = function(a) {
      (a = this.normalize(a, !0)) !== d &&
        (this.trigger('remove', {content: this._items[a], position: a}),
        this._items[a].remove(),
        this._items.splice(a, 1),
        this._mergers.splice(a, 1),
        this.invalidate('items'),
        this.trigger('removed', {content: null, position: a}));
    }),
    (e.prototype.preloadAutoWidthImages = function(b) {
      b.each(
        a.proxy(function(b, c) {
          this.enter('pre-loading'),
            (c = a(c)),
            a(new Image())
              .one(
                'load',
                a.proxy(function(a) {
                  c.attr('src', a.target.src),
                    c.css('opacity', 1),
                    this.leave('pre-loading'),
                    !this.is('pre-loading') &&
                      !this.is('initializing') &&
                      this.refresh();
                }, this),
              )
              .attr(
                'src',
                c.attr('src') ||
                  c.attr('data-src') ||
                  c.attr('data-src-retina'),
              );
        }, this),
      );
    }),
    (e.prototype.destroy = function() {
      this.$element.off('.owl.core'),
        this.$stage.off('.owl.core'),
        a(c).off('.owl.core'),
        !1 !== this.settings.responsive &&
          (b.clearTimeout(this.resizeTimer),
          this.off(b, 'resize', this._handlers.onThrottledResize));
      for (const d in this._plugins) this._plugins[d].destroy();
      this.$stage.children('.cloned').remove(),
        this.$stage.unwrap(),
        this.$stage.children().contents().unwrap(),
        this.$stage.children().unwrap(),
        this.$stage.remove(),
        this.$element
          .removeClass(this.options.refreshClass)
          .removeClass(this.options.loadingClass)
          .removeClass(this.options.loadedClass)
          .removeClass(this.options.rtlClass)
          .removeClass(this.options.dragClass)
          .removeClass(this.options.grabClass)
          .attr(
            'class',
            this.$element
              .attr('class')
              .replace(
                new RegExp(this.options.responsiveClass + '-\\S+\\s', 'g'),
                '',
              ),
          )
          .removeData('owl.carousel');
    }),
    (e.prototype.op = function(a, b, c) {
      const d = this.settings.rtl;
      switch (b) {
        case '<':
          return d ? a > c : a < c;
        case '>':
          return d ? a < c : a > c;
        case '>=':
          return d ? a <= c : a >= c;
        case '<=':
          return d ? a >= c : a <= c;
      }
    }),
    (e.prototype.on = function(a, b, c, d) {
      a.addEventListener ?
        a.addEventListener(b, c, d) :
        a.attachEvent && a.attachEvent('on' + b, c);
    }),
    (e.prototype.off = function(a, b, c, d) {
      a.removeEventListener ?
        a.removeEventListener(b, c, d) :
        a.detachEvent && a.detachEvent('on' + b, c);
    }),
    (e.prototype.trigger = function(b, c, d, f, g) {
      const h = {item: {count: this._items.length, index: this.current()}};
        const i = a.camelCase(
          a
            .grep(['on', b, d], function(a) {
              return a;
            })
            .join('-')
            .toLowerCase(),
        );
        const j = a.Event(
          [b, 'owl', d || 'carousel'].join('.').toLowerCase(),
          a.extend({relatedTarget: this}, h, c),
        );
      return (
        this._supress[b] ||
          (a.each(this._plugins, function(a, b) {
            b.onTrigger && b.onTrigger(j);
          }),
          this.register({type: e.Type.Event, name: b}),
          this.$element.trigger(j),
          this.settings &&
            'function' == typeof this.settings[i] &&
            this.settings[i].call(this, j)),
        j
      );
    }),
    (e.prototype.enter = function(b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function(a, b) {
          this._states.current[b] === d && (this._states.current[b] = 0),
            this._states.current[b]++;
        }, this),
      );
    }),
    (e.prototype.leave = function(b) {
      a.each(
        [b].concat(this._states.tags[b] || []),
        a.proxy(function(a, b) {
          this._states.current[b]--;
        }, this),
      );
    }),
    (e.prototype.register = function(b) {
      if (b.type === e.Type.Event) {
        if (
          (a.event.special[b.name] || (a.event.special[b.name] = {}),
          !a.event.special[b.name].owl)
        ) {
          const c = a.event.special[b.name]._default;
          (a.event.special[b.name]._default = function(a) {
            return !c ||
              !c.apply ||
              (a.namespace && -1 !== a.namespace.indexOf('owl')) ?
              a.namespace && a.namespace.indexOf('owl') > -1 :
              c.apply(this, arguments);
          }),
            (a.event.special[b.name].owl = !0);
        }
      } else {
b.type === e.Type.State &&
          (this._states.tags[b.name] ?
            (this._states.tags[b.name] = this._states.tags[b.name].concat(
                b.tags,
              )) :
            (this._states.tags[b.name] = b.tags),
          (this._states.tags[b.name] = a.grep(
            this._states.tags[b.name],
            a.proxy(function(c, d) {
              return a.inArray(c, this._states.tags[b.name]) === d;
            }, this),
          )));
}
    }),
    (e.prototype.suppress = function(b) {
      a.each(
        b,
        a.proxy(function(a, b) {
          this._supress[b] = !0;
        }, this),
      );
    }),
    (e.prototype.release = function(b) {
      a.each(
        b,
        a.proxy(function(a, b) {
          delete this._supress[b];
        }, this),
      );
    }),
    (e.prototype.pointer = function(a) {
      const c = {x: null, y: null};
      return (
        (a = a.originalEvent || a || b.event),
        (a =
          a.touches && a.touches.length ?
            a.touches[0] :
            a.changedTouches && a.changedTouches.length ?
            a.changedTouches[0] :
            a),
        a.pageX ?
          ((c.x = a.pageX), (c.y = a.pageY)) :
          ((c.x = a.clientX), (c.y = a.clientY)),
        c
      );
    }),
    (e.prototype.isNumeric = function(a) {
      return !isNaN(parseFloat(a));
    }),
    (e.prototype.difference = function(a, b) {
      return {x: a.x - b.x, y: a.y - b.y};
    }),
    (a.fn.owlCarousel = function(b) {
      const c = Array.prototype.slice.call(arguments, 1);
      return this.each(function() {
        const d = a(this);
          let f = d.data('owl.carousel');
        f ||
          ((f = new e(this, 'object' == typeof b && b)),
          d.data('owl.carousel', f),
          a.each(
            [
              'next',
              'prev',
              'to',
              'destroy',
              'refresh',
              'replace',
              'add',
              'remove',
            ],
            function(b, c) {
              f.register({type: e.Type.Event, name: c}),
                f.$element.on(
                  c + '.owl.carousel.core',
                  a.proxy(function(a) {
                    a.namespace &&
                      a.relatedTarget !== this &&
                      (this.suppress([c]),
                      f[c].apply(this, [].slice.call(arguments, 1)),
                      this.release([c]));
                  }, f),
                );
            },
          )),
          'string' == typeof b && '_' !== b.charAt(0) && f[b].apply(f, c);
      });
    }),
    (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._interval = null),
        (this._visible = null),
        (this._handlers = {
          'initialized.owl.carousel': a.proxy(function(a) {
            a.namespace && this._core.settings.autoRefresh && this.watch();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = {autoRefresh: !0, autoRefreshInterval: 500}),
      (e.prototype.watch = function() {
        this._interval ||
          ((this._visible = this._core.isVisible()),
          (this._interval = b.setInterval(
            a.proxy(this.refresh, this),
            this._core.settings.autoRefreshInterval,
          )));
      }),
      (e.prototype.refresh = function() {
        this._core.isVisible() !== this._visible &&
          ((this._visible = !this._visible),
          this._core.$element.toggleClass('owl-hidden', !this._visible),
          this._visible &&
            this._core.invalidate('width') &&
            this._core.refresh());
      }),
      (e.prototype.destroy = function() {
        let a; let c;
        b.clearInterval(this._interval);
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (c in Object.getOwnPropertyNames(this)) {
		'function' != typeof this[c] && (this[c] = null);
		}
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._loaded = []),
        (this._handlers = {
          'initialized.owl.carousel change.owl.carousel resized.owl.carousel': a.proxy(
            function(b) {
              if (
                b.namespace &&
                this._core.settings &&
                this._core.settings.lazyLoad &&
                ((b.property && 'position' == b.property.name) ||
                  'initialized' == b.type)
              ) {
                const c = this._core.settings;
                  let e = (c.center && Math.ceil(c.items / 2)) || c.items;
                  let f = (c.center && -1 * e) || 0;
                  let g =
                    (b.property && b.property.value !== d ?
                      b.property.value :
                      this._core.current()) + f;
                  const h = this._core.clones().length;
                  const i = a.proxy(function(a, b) {
                    this.load(b);
                  }, this);
                for (
                  c.lazyLoadEager > 0 &&
                  ((e += c.lazyLoadEager),
                  c.loop && ((g -= c.lazyLoadEager), e++));
                  f++ < e;

                ) {
this.load(h / 2 + this._core.relative(g)),
                    h && a.each(this._core.clones(this._core.relative(g)), i),
                    g++;
}
              }
            },
            this,
          ),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers);
    };
    (e.Defaults = {lazyLoad: !1, lazyLoadEager: 0}),
      (e.prototype.load = function(c) {
        const d = this._core.$stage.children().eq(c);
          const e = d && d.find('.owl-lazy');
        !e ||
          a.inArray(d.get(0), this._loaded) > -1 ||
          (e.each(
            a.proxy(function(c, d) {
              let e;
                const f = a(d);
                const g =
                  (b.devicePixelRatio > 1 && f.attr('data-src-retina')) ||
                  f.attr('data-src') ||
                  f.attr('data-srcset');
              this._core.trigger('load', {element: f, url: g}, 'lazy'),
                f.is('img') ?
                  f
                      .one(
                        'load.owl.lazy',
                        a.proxy(function() {
                          f.css('opacity', 1),
                            this._core.trigger(
                              'loaded',
                              {element: f, url: g},
                              'lazy',
                            );
                        }, this),
                      )
                      .attr('src', g) :
                  f.is('source') ?
                  f
                      .one(
                        'load.owl.lazy',
                        a.proxy(function() {
                          this._core.trigger(
                            'loaded',
                            {element: f, url: g},
                            'lazy',
                          );
                        }, this),
                      )
                      .attr('srcset', g) :
                  ((e = new Image()),
                    (e.onload = a.proxy(function() {
                      f.css({
                        'background-image': 'url("' + g + '")',
                        'opacity': '1',
                      }),
                        this._core.trigger(
                          'loaded',
                          {element: f, url: g},
                          'lazy',
                        );
                    }, this)),
                    (e.src = g));
            }, this),
          ),
          this._loaded.push(d.get(0)));
      }),
      (e.prototype.destroy = function() {
        let a; let b;
        for (a in this.handlers) this._core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) {
'function' != typeof this[b] && (this[b] = null);
}
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(c) {
      (this._core = c),
        (this._previousHeight = null),
        (this._handlers = {
          'initialized.owl.carousel refreshed.owl.carousel': a.proxy(function(
            a,
          ) {
            a.namespace && this._core.settings.autoHeight && this.update();
          },
          this),
          'changed.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              'position' === a.property.name &&
              this.update();
          }, this),
          'loaded.owl.lazy': a.proxy(function(a) {
            a.namespace &&
              this._core.settings.autoHeight &&
              a.element.closest('.' + this._core.settings.itemClass).index() ===
                this._core.current() &&
              this.update();
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        (this._intervalId = null);
      const d = this;
      a(b).on('load', function() {
        d._core.settings.autoHeight && d.update();
      }),
        a(b).resize(function() {
          d._core.settings.autoHeight &&
            (null != d._intervalId && clearTimeout(d._intervalId),
            (d._intervalId = setTimeout(function() {
              d.update();
            }, 250)));
        });
    };
    (e.Defaults = {autoHeight: !1, autoHeightClass: 'owl-height'}),
      (e.prototype.update = function() {
        const b = this._core._current;
          const c = b + this._core.settings.items;
          const d = this._core.settings.lazyLoad;
          const e = this._core.$stage.children().toArray().slice(b, c);
          const f = [];
          let g = 0;
        a.each(e, function(b, c) {
          f.push(a(c).height());
        }),
          (g = Math.max.apply(null, f)),
          g <= 1 && d && this._previousHeight && (g = this._previousHeight),
          (this._previousHeight = g),
          this._core.$stage
            .parent()
            .height(g)
            .addClass(this._core.settings.autoHeightClass);
      }),
      (e.prototype.destroy = function() {
        let a; let b;
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) {
'function' != typeof this[b] && (this[b] = null);
}
      }),
      (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._videos = {}),
        (this._playing = null),
        (this._handlers = {
          'initialized.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this._core.register({
                type: 'state',
                name: 'playing',
                tags: ['interacting'],
              });
          }, this),
          'resize.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this._core.settings.video &&
              this.isInFullScreen() &&
              a.preventDefault();
          }, this),
          'refreshed.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this._core.is('resizing') &&
              this._core.$stage.find('.cloned .owl-video-frame').remove();
          }, this),
          'changed.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              'position' === a.property.name &&
              this._playing &&
              this.stop();
          }, this),
          'prepared.owl.carousel': a.proxy(function(b) {
            if (b.namespace) {
              const c = a(b.content).find('.owl-video');
              c.length &&
                (c.css('display', 'none'), this.fetch(c, a(b.content)));
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this._core.$element.on(this._handlers),
        this._core.$element.on(
          'click.owl.video',
          '.owl-video-play-icon',
          a.proxy(function(a) {
            this.play(a);
          }, this),
        );
    };
    (e.Defaults = {video: !1, videoHeight: !1, videoWidth: !1}),
      (e.prototype.fetch = function(a, b) {
        let c = (function() {
            return a.attr('data-vimeo-id') ?
              'vimeo' :
              a.attr('data-vzaar-id') ?
              'vzaar' :
              'youtube';
          })();
          let d =
            a.attr('data-vimeo-id') ||
            a.attr('data-youtube-id') ||
            a.attr('data-vzaar-id');
          const e = a.attr('data-width') || this._core.settings.videoWidth;
          const f = a.attr('data-height') || this._core.settings.videoHeight;
          const g = a.attr('href');
        if (!g) throw new Error('Missing video URL.');
        if (
          ((d = g.match(
            /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/,
          )),
          d[3].indexOf('youtu') > -1)
        ) {
c = 'youtube';
} else if (d[3].indexOf('vimeo') > -1) c = 'vimeo';
        else {
          if (!(d[3].indexOf('vzaar') > -1)) {
throw new Error('Video URL not supported.');
}
          c = 'vzaar';
        }
        (d = d[6]),
          (this._videos[g] = {type: c, id: d, width: e, height: f}),
          b.attr('data-video', g),
          this.thumbnail(a, this._videos[g]);
      }),
      (e.prototype.thumbnail = function(b, c) {
        let d;
          let e;
          let f;
          const g =
            c.width && c.height ?
              'width:' + c.width + 'px;height:' + c.height + 'px;' :
              '';
          const h = b.find('img');
          let i = 'src';
          let j = '';
          const k = this._core.settings;
          const l = function(c) {
            (e = '<div class="owl-video-play-icon"></div>'),
              (d = k.lazyLoad ?
                a('<div/>', {class: 'owl-video-tn ' + j, srcType: c}) :
                a('<div/>', {
                    class: 'owl-video-tn',
                    style: 'opacity:1;background-image:url(' + c + ')',
                  })),
              b.after(d),
              b.after(e);
          };
        if (
          (b.wrap(a('<div/>', {class: 'owl-video-wrapper', style: g})),
          this._core.settings.lazyLoad && ((i = 'data-src'), (j = 'owl-lazy')),
          h.length)
        ) {
return l(h.attr(i)), h.remove(), !1;
}
        'youtube' === c.type ?
          ((f = '//img.youtube.com/vi/' + c.id + '/hqdefault.jpg'), l(f)) :
          'vimeo' === c.type ?
          a.ajax({
              type: 'GET',
              url: '//vimeo.com/api/v2/video/' + c.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success: function(a) {
                (f = a[0].thumbnail_large), l(f);
              },
            }) :
          'vzaar' === c.type &&
            a.ajax({
              type: 'GET',
              url: '//vzaar.com/api/videos/' + c.id + '.json',
              jsonp: 'callback',
              dataType: 'jsonp',
              success: function(a) {
                (f = a.framegrab_url), l(f);
              },
            });
      }),
      (e.prototype.stop = function() {
        this._core.trigger('stop', null, 'video'),
          this._playing.find('.owl-video-frame').remove(),
          this._playing.removeClass('owl-video-playing'),
          (this._playing = null),
          this._core.leave('playing'),
          this._core.trigger('stopped', null, 'video');
      }),
      (e.prototype.play = function(b) {
        let c;
          const d = a(b.target);
          let e = d.closest('.' + this._core.settings.itemClass);
          const f = this._videos[e.attr('data-video')];
          const g = f.width || '100%';
          const h = f.height || this._core.$stage.height();
        this._playing ||
          (this._core.enter('playing'),
          this._core.trigger('play', null, 'video'),
          (e = this._core.items(this._core.relative(e.index()))),
          this._core.reset(e.index()),
          (c = a(
            '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>',
          )),
          c.attr('height', h),
          c.attr('width', g),
          'youtube' === f.type ?
            c.attr(
                'src',
                '//www.youtube.com/embed/' +
                  f.id +
                  '?autoplay=1&rel=0&v=' +
                  f.id,
              ) :
            'vimeo' === f.type ?
            c.attr('src', '//player.vimeo.com/video/' + f.id + '?autoplay=1') :
            'vzaar' === f.type &&
              c.attr(
                'src',
                '//view.vzaar.com/' + f.id + '/player?autoplay=true',
              ),
          a(c)
            .wrap('<div class="owl-video-frame" />')
            .insertAfter(e.find('.owl-video')),
          (this._playing = e.addClass('owl-video-playing')));
      }),
      (e.prototype.isInFullScreen = function() {
        const b =
          c.fullscreenElement ||
          c.mozFullScreenElement ||
          c.webkitFullscreenElement;
        return b && a(b).parent().hasClass('owl-video-frame');
      }),
      (e.prototype.destroy = function() {
        let a; let b;
        this._core.$element.off('click.owl.video');
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) {
'function' != typeof this[b] && (this[b] = null);
}
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Video = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this.core = b),
        (this.core.options = a.extend({}, e.Defaults, this.core.options)),
        (this.swapping = !0),
        (this.previous = d),
        (this.next = d),
        (this.handlers = {
          'change.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              'position' == a.property.name &&
              ((this.previous = this.core.current()),
              (this.next = a.property.value));
          }, this),
          'drag.owl.carousel dragged.owl.carousel translated.owl.carousel': a.proxy(
            function(a) {
              a.namespace && (this.swapping = 'translated' == a.type);
            },
            this,
          ),
          'translate.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this.swapping &&
              (this.core.options.animateOut || this.core.options.animateIn) &&
              this.swap();
          }, this),
        }),
        this.core.$element.on(this.handlers);
    };
    (e.Defaults = {animateOut: !1, animateIn: !1}),
      (e.prototype.swap = function() {
        if (
          1 === this.core.settings.items &&
          a.support.animation &&
          a.support.transition
        ) {
          this.core.speed(0);
          let b;
            const c = a.proxy(this.clear, this);
            const d = this.core.$stage.children().eq(this.previous);
            const e = this.core.$stage.children().eq(this.next);
            const f = this.core.settings.animateIn;
            const g = this.core.settings.animateOut;
          this.core.current() !== this.previous &&
            (g &&
              ((b =
                this.core.coordinates(this.previous) -
                this.core.coordinates(this.next)),
              d
                .one(a.support.animation.end, c)
                .css({left: b + 'px'})
                .addClass('animated owl-animated-out')
                .addClass(g)),
            f &&
              e
                .one(a.support.animation.end, c)
                .addClass('animated owl-animated-in')
                .addClass(f));
        }
      }),
      (e.prototype.clear = function(b) {
        a(b.target)
          .css({left: ''})
          .removeClass('animated owl-animated-out owl-animated-in')
          .removeClass(this.core.settings.animateIn)
          .removeClass(this.core.settings.animateOut),
          this.core.onTransitionEnd();
      }),
      (e.prototype.destroy = function() {
        let a; let b;
        for (a in this.handlers) this.core.$element.off(a, this.handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) {
'function' != typeof this[b] && (this[b] = null);
}
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    var e = function(b) {
      (this._core = b),
        (this._call = null),
        (this._time = 0),
        (this._timeout = 0),
        (this._paused = !0),
        (this._handlers = {
          'changed.owl.carousel': a.proxy(function(a) {
            a.namespace && 'settings' === a.property.name ?
              this._core.settings.autoplay ?
                this.play() :
                this.stop() :
              a.namespace &&
                'position' === a.property.name &&
                this._paused &&
                (this._time = 0);
          }, this),
          'initialized.owl.carousel': a.proxy(function(a) {
            a.namespace && this._core.settings.autoplay && this.play();
          }, this),
          'play.owl.autoplay': a.proxy(function(a, b, c) {
            a.namespace && this.play(b, c);
          }, this),
          'stop.owl.autoplay': a.proxy(function(a) {
            a.namespace && this.stop();
          }, this),
          'mouseover.owl.autoplay': a.proxy(function() {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.pause();
          }, this),
          'mouseleave.owl.autoplay': a.proxy(function() {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.play();
          }, this),
          'touchstart.owl.core': a.proxy(function() {
            this._core.settings.autoplayHoverPause &&
              this._core.is('rotating') &&
              this.pause();
          }, this),
          'touchend.owl.core': a.proxy(function() {
            this._core.settings.autoplayHoverPause && this.play();
          }, this),
        }),
        this._core.$element.on(this._handlers),
        (this._core.options = a.extend({}, e.Defaults, this._core.options));
    };
    (e.Defaults = {
      autoplay: !1,
      autoplayTimeout: 5e3,
      autoplayHoverPause: !1,
      autoplaySpeed: !1,
    }),
      (e.prototype._next = function(d) {
        (this._call = b.setTimeout(
          a.proxy(this._next, this, d),
          this._timeout * (Math.round(this.read() / this._timeout) + 1) -
            this.read(),
        )),
          this._core.is('interacting') ||
            c.hidden ||
            this._core.next(d || this._core.settings.autoplaySpeed);
      }),
      (e.prototype.read = function() {
        return new Date().getTime() - this._time;
      }),
      (e.prototype.play = function(c, d) {
        let e;
        this._core.is('rotating') || this._core.enter('rotating'),
          (c = c || this._core.settings.autoplayTimeout),
          (e = Math.min(this._time % (this._timeout || c), c)),
          this._paused ?
            ((this._time = this.read()), (this._paused = !1)) :
            b.clearTimeout(this._call),
          (this._time += (this.read() % c) - e),
          (this._timeout = c),
          (this._call = b.setTimeout(a.proxy(this._next, this, d), c - e));
      }),
      (e.prototype.stop = function() {
        this._core.is('rotating') &&
          ((this._time = 0),
          (this._paused = !0),
          b.clearTimeout(this._call),
          this._core.leave('rotating'));
      }),
      (e.prototype.pause = function() {
        this._core.is('rotating') &&
          !this._paused &&
          ((this._time = this.read()),
          (this._paused = !0),
          b.clearTimeout(this._call));
      }),
      (e.prototype.destroy = function() {
        let a; let b;
        this.stop();
        for (a in this._handlers) this._core.$element.off(a, this._handlers[a]);
        for (b in Object.getOwnPropertyNames(this)) {
'function' != typeof this[b] && (this[b] = null);
}
      }),
      (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    'use strict';
    var e = function(b) {
      (this._core = b),
        (this._initialized = !1),
        (this._pages = []),
        (this._controls = {}),
        (this._templates = []),
        (this.$element = this._core.$element),
        (this._overrides = {
          next: this._core.next,
          prev: this._core.prev,
          to: this._core.to,
        }),
        (this._handlers = {
          'prepared.owl.carousel': a.proxy(function(b) {
            b.namespace &&
              this._core.settings.dotsData &&
              this._templates.push(
                '<div class="' +
                  this._core.settings.dotClass +
                  '">' +
                  a(b.content)
                    .find('[data-dot]')
                    .addBack('[data-dot]')
                    .attr('data-dot') +
                  '</div>',
              );
          }, this),
          'added.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 0, this._templates.pop());
          }, this),
          'remove.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this._core.settings.dotsData &&
              this._templates.splice(a.position, 1);
          }, this),
          'changed.owl.carousel': a.proxy(function(a) {
            a.namespace && 'position' == a.property.name && this.draw();
          }, this),
          'initialized.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              !this._initialized &&
              (this._core.trigger('initialize', null, 'navigation'),
              this.initialize(),
              this.update(),
              this.draw(),
              (this._initialized = !0),
              this._core.trigger('initialized', null, 'navigation'));
          }, this),
          'refreshed.owl.carousel': a.proxy(function(a) {
            a.namespace &&
              this._initialized &&
              (this._core.trigger('refresh', null, 'navigation'),
              this.update(),
              this.draw(),
              this._core.trigger('refreshed', null, 'navigation'));
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers);
    };
    (e.Defaults = {
      nav: !1,
      navText: [
        '<span aria-label="Previous">&#x2039;</span>',
        '<span aria-label="Next">&#x203a;</span>',
      ],
      navSpeed: !1,
      navElement: 'button type="button" role="presentation"',
      navContainer: !1,
      navContainerClass: 'owl-nav',
      navClass: ['owl-prev', 'owl-next'],
      slideBy: 1,
      dotClass: 'owl-dot',
      dotsClass: 'owl-dots',
      dots: !0,
      dotsEach: !1,
      dotsData: !1,
      dotsSpeed: !1,
      dotsContainer: !1,
    }),
      (e.prototype.initialize = function() {
        let b;
          const c = this._core.settings;
        (this._controls.$relative = (c.navContainer ?
          a(c.navContainer) :
          a('<div>').addClass(c.navContainerClass).appendTo(this.$element)
        ).addClass('disabled')),
          (this._controls.$previous = a('<' + c.navElement + '>')
            .addClass(c.navClass[0])
            .html(c.navText[0])
            .prependTo(this._controls.$relative)
            .on(
              'click',
              a.proxy(function(a) {
                this.prev(c.navSpeed);
              }, this),
            )),
          (this._controls.$next = a('<' + c.navElement + '>')
            .addClass(c.navClass[1])
            .html(c.navText[1])
            .appendTo(this._controls.$relative)
            .on(
              'click',
              a.proxy(function(a) {
                this.next(c.navSpeed);
              }, this),
            )),
          c.dotsData ||
            (this._templates = [
              a('<button role="button">')
                .addClass(c.dotClass)
                .append(a('<span>'))
                .prop('outerHTML'),
            ]),
          (this._controls.$absolute = (c.dotsContainer ?
            a(c.dotsContainer) :
            a('<div>').addClass(c.dotsClass).appendTo(this.$element)
          ).addClass('disabled')),
          this._controls.$absolute.on(
            'click',
            'button',
            a.proxy(function(b) {
              const d = a(b.target).parent().is(this._controls.$absolute) ?
                a(b.target).index() :
                a(b.target).parent().index();
              b.preventDefault(), this.to(d, c.dotsSpeed);
            }, this),
          );
        for (b in this._overrides) this._core[b] = a.proxy(this[b], this);
      }),
      (e.prototype.destroy = function() {
        let a; let b; let c; let d; let e;
        e = this._core.settings;
        for (a in this._handlers) this.$element.off(a, this._handlers[a]);
        for (b in this._controls) {
'$relative' === b && e.navContainer ?
            this._controls[b].html('') :
            this._controls[b].remove();
}
        for (d in this.overides) this._core[d] = this._overrides[d];
        for (c in Object.getOwnPropertyNames(this)) {
'function' != typeof this[c] && (this[c] = null);
}
      }),
      (e.prototype.update = function() {
        let a;
          let b;
          let c;
          const d = this._core.clones().length / 2;
          const e = d + this._core.items().length;
          const f = this._core.maximum(!0);
          const g = this._core.settings;
          const h = g.center || g.autoWidth || g.dotsData ? 1 : g.dotsEach || g.items;
        if (
          ('page' !== g.slideBy && (g.slideBy = Math.min(g.slideBy, g.items)),
          g.dots || 'page' == g.slideBy)
        ) {
for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
            if (b >= h || 0 === b) {
              if (
                (this._pages.push({
                  start: Math.min(f, a - d),
                  end: a - d + h - 1,
                }),
                Math.min(f, a - d) === f)
              ) {
break;
}
              (b = 0), ++c;
            }
            b += this._core.mergers(this._core.relative(a));
          }
}
      }),
      (e.prototype.draw = function() {
        let b;
          const c = this._core.settings;
          const d = this._core.items().length <= c.items;
          const e = this._core.relative(this._core.current());
          const f = c.loop || c.rewind;
        this._controls.$relative.toggleClass('disabled', !c.nav || d),
          c.nav &&
            (this._controls.$previous.toggleClass(
              'disabled',
              !f && e <= this._core.minimum(!0),
            ),
            this._controls.$next.toggleClass(
              'disabled',
              !f && e >= this._core.maximum(!0),
            )),
          this._controls.$absolute.toggleClass('disabled', !c.dots || d),
          c.dots &&
            ((b =
              this._pages.length - this._controls.$absolute.children().length),
            c.dotsData && 0 !== b ?
              this._controls.$absolute.html(this._templates.join('')) :
              b > 0 ?
              this._controls.$absolute.append(
                  new Array(b + 1).join(this._templates[0]),
                ) :
              b < 0 && this._controls.$absolute.children().slice(b).remove(),
            this._controls.$absolute.find('.active').removeClass('active'),
            this._controls.$absolute
              .children()
              .eq(a.inArray(this.current(), this._pages))
              .addClass('active'));
      }),
      (e.prototype.onTrigger = function(b) {
        const c = this._core.settings;
        b.page = {
          index: a.inArray(this.current(), this._pages),
          count: this._pages.length,
          size:
            c &&
            (c.center || c.autoWidth || c.dotsData ? 1 : c.dotsEach || c.items),
        };
      }),
      (e.prototype.current = function() {
        const b = this._core.relative(this._core.current());
        return a
          .grep(
            this._pages,
            a.proxy(function(a, c) {
              return a.start <= b && a.end >= b;
            }, this),
          )
          .pop();
      }),
      (e.prototype.getPosition = function(b) {
        let c;
          let d;
          const e = this._core.settings;
        return (
          'page' == e.slideBy ?
            ((c = a.inArray(this.current(), this._pages)),
              (d = this._pages.length),
              b ? ++c : --c,
              (c = this._pages[((c % d) + d) % d].start)) :
            ((c = this._core.relative(this._core.current())),
              (d = this._core.items().length),
              b ? (c += e.slideBy) : (c -= e.slideBy)),
          c
        );
      }),
      (e.prototype.next = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!0), b);
      }),
      (e.prototype.prev = function(b) {
        a.proxy(this._overrides.to, this._core)(this.getPosition(!1), b);
      }),
      (e.prototype.to = function(b, c, d) {
        let e;
        !d && this._pages.length ?
          ((e = this._pages.length),
            a.proxy(this._overrides.to, this._core)(
              this._pages[((b % e) + e) % e].start,
              c,
            )) :
          a.proxy(this._overrides.to, this._core)(b, c);
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    'use strict';
    var e = function(c) {
      (this._core = c),
        (this._hashes = {}),
        (this.$element = this._core.$element),
        (this._handlers = {
          'initialized.owl.carousel': a.proxy(function(c) {
            c.namespace &&
              'URLHash' === this._core.settings.startPosition &&
              a(b).trigger('hashchange.owl.navigation');
          }, this),
          'prepared.owl.carousel': a.proxy(function(b) {
            if (b.namespace) {
              const c = a(b.content)
                .find('[data-hash]')
                .addBack('[data-hash]')
                .attr('data-hash');
              if (!c) return;
              this._hashes[c] = b.content;
            }
          }, this),
          'changed.owl.carousel': a.proxy(function(c) {
            if (c.namespace && 'position' === c.property.name) {
              const d = this._core.items(
                  this._core.relative(this._core.current()),
                );
                const e = a
                  .map(this._hashes, function(a, b) {
                    return a === d ? b : null;
                  })
                  .join();
              if (!e || b.location.hash.slice(1) === e) return;
              b.location.hash = e;
            }
          }, this),
        }),
        (this._core.options = a.extend({}, e.Defaults, this._core.options)),
        this.$element.on(this._handlers),
        a(b).on(
          'hashchange.owl.navigation',
          a.proxy(function(a) {
            const c = b.location.hash.substring(1);
              const e = this._core.$stage.children();
              const f = this._hashes[c] && e.index(this._hashes[c]);
            f !== d &&
              f !== this._core.current() &&
              this._core.to(this._core.relative(f), !1, !0);
          }, this),
        );
    };
    (e.Defaults = {URLhashListener: !1}),
      (e.prototype.destroy = function() {
        let c; let d;
        a(b).off('hashchange.owl.navigation');
        for (c in this._handlers) this._core.$element.off(c, this._handlers[c]);
        for (d in Object.getOwnPropertyNames(this)) {
'function' != typeof this[d] && (this[d] = null);
}
      }),
      (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
  })(window.Zepto || window.jQuery, window, document),
  (function(a, b, c, d) {
    function e(b, c) {
      let e = !1;
        const f = b.charAt(0).toUpperCase() + b.slice(1);
      return (
        a.each((b + ' ' + h.join(f + ' ') + f).split(' '), function(a, b) {
          if (g[b] !== d) return (e = !c || b), !1;
        }),
        e
      );
    }
    function f(a) {
      return e(a, !0);
    }
    var g = a('<support>').get(0).style;
      var h = 'Webkit Moz O ms'.split(' ');
      const i = {
        transition: {
          end: {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd',
            transition: 'transitionend',
          },
        },
        animation: {
          end: {
            WebkitAnimation: 'webkitAnimationEnd',
            MozAnimation: 'animationend',
            OAnimation: 'oAnimationEnd',
            animation: 'animationend',
          },
        },
      };
      const j = {
        csstransforms: function() {
          return !!e('transform');
        },
        csstransforms3d: function() {
          return !!e('perspective');
        },
        csstransitions: function() {
          return !!e('transition');
        },
        cssanimations: function() {
          return !!e('animation');
        },
      };
    j.csstransitions() &&
      ((a.support.transition = new String(f('transition'))),
      (a.support.transition.end = i.transition.end[a.support.transition])),
      j.cssanimations() &&
        ((a.support.animation = new String(f('animation'))),
        (a.support.animation.end = i.animation.end[a.support.animation])),
      j.csstransforms() &&
        ((a.support.transform = new String(f('transform'))),
        (a.support.transform3d = j.csstransforms3d()));
  })(window.Zepto || window.jQuery, window, document);

// smoothscroll
// (function(){var e,t={frameRate:20,animationTime:900,stepSize:80,pulseAlgorithm:!0,pulseScale:4,pulseNormalize:1,accelerationDelta:50,accelerationMax:3,keyboardSupport:!0,arrowScroll:50,touchpadSupport:!1,fixedBackground:!0,excluded:""},a=t,r=!1,o=!1,n={x:0,y:0},i=!1,l=document.documentElement,c=[120,120,120],u={left:37,up:38,right:39,down:40,spacebar:32,pageup:33,pagedown:34,end:35,home:36};a=t;function s(){a.keyboardSupport&&S("keydown",w)}function d(){if(document.body){var t=document.body,n=document.documentElement,c=window.innerHeight,u=t.scrollHeight;if(l=document.compatMode.indexOf("CSS")>=0?n:t,e=t,s(),i=!0,top!=self)o=!0;else if(u>c&&(t.offsetHeight<=c||n.offsetHeight<=c)){var d=!1;if(n.style.height="auto",setTimeout(function(){d||n.scrollHeight==document.height||(d=!0,setTimeout(function(){n.style.height=document.height+"px",d=!1},500))},10),l.offsetHeight<=c){var f=document.createElement("div");f.style.clear="both",t.appendChild(f)}}a.fixedBackground||r||(t.style.backgroundAttachment="scroll",n.style.backgroundAttachment="scroll")}}var f=[],h=!1,m=+new Date;function p(e,t,r,o){var i,l;if(o||(o=1e3),l=r,i=(i=t)>0?1:-1,l=l>0?1:-1,(n.x!==i||n.y!==l)&&(n.x=i,n.y=l,f=[],m=0),1!=a.accelerationMax){var c=+new Date-m;if(c<a.accelerationDelta){var u=(1+30/c)/2;u>1&&(u=Math.min(u,a.accelerationMax),t*=u,r*=u)}m=+new Date}if(f.push({x:t,y:r,lastX:t<0?.99:-.99,lastY:r<0?.99:-.99,start:+new Date}),!h){var s=e===document.body,d=function(n){for(var i=+new Date,l=0,c=0,u=0;u<f.length;u++){var m=f[u],p=i-m.start,w=p>=a.animationTime,g=w?1:p/a.animationTime;a.pulseAlgorithm&&(g=C(g));var v=m.x*g-m.lastX>>0,b=m.y*g-m.lastY>>0;l+=v,c+=b,m.lastX+=v,m.lastY+=b,w&&(f.splice(u,1),u--)}s?window.scrollBy(l,c):(l&&(e.scrollLeft+=l),c&&(e.scrollTop+=c)),t||r||(f=[]),f.length?M(d,e,o/a.frameRate+1):h=!1};M(d,e,0),h=!0}}function w(t){var r=t.target,o=t.ctrlKey||t.altKey||t.metaKey||t.shiftKey&&t.keyCode!==u.spacebar;if(/input|textarea|select|embed/i.test(r.nodeName)||r.isContentEditable||t.defaultPrevented||o)return!0;if(D(r,"button")&&t.keyCode===u.spacebar)return!0;var n=0,i=0,l=x(e),c=l.clientHeight;switch(l==document.body&&(c=window.innerHeight),t.keyCode){case u.up:i=-a.arrowScroll;break;case u.down:i=a.arrowScroll;break;case u.spacebar:i=-(t.shiftKey?1:-1)*c*.9;break;case u.pageup:i=.9*-c;break;case u.pagedown:i=.9*c;break;case u.home:i=-l.scrollTop;break;case u.end:var s=l.scrollHeight-l.scrollTop-c;i=s>0?s+10:0;break;case u.left:n=-a.arrowScroll;break;case u.right:n=a.arrowScroll;break;default:return!0}p(l,n,i),t.preventDefault()}var g={};setInterval(function(){g={}},1e4);var v,b,y=(v=0,function(e){return e.uniqueID||(e.uniqueID=v++)});function k(e,t){for(var a=e.length;a--;)g[y(e[a])]=t;return t}function x(e){var t=[],a=l.scrollHeight;do{var r=g[y(e)];if(r)return k(t,r);if(t.push(e),a===e.scrollHeight){if(!o||l.clientHeight+10<a)return k(t,document.body)}else if(e.clientHeight+10<e.scrollHeight&&(overflow=getComputedStyle(e,"").getPropertyValue("overflow-y"),"scroll"===overflow||"auto"===overflow))return k(t,e)}while(e=e.parentNode)}function S(e,t,a){window.addEventListener(e,t,a||!1)}function D(e,t){return(e.nodeName||"").toLowerCase()===t.toLowerCase()}function H(e,t){return Math.floor(e/t)==e/t}var M=window.requestAnimationFrame||window.webkitRequestAnimationFrame||function(e,t,a){window.setTimeout(e,a||1e3/60)};function T(e){var t,r;return(e*=a.pulseScale)<1?t=e-(1-Math.exp(-e)):(e-=1,t=(r=Math.exp(-1))+(1-Math.exp(-e))*(1-r)),t*a.pulseNormalize}function C(e){return e>=1?1:e<=0?0:(1==a.pulseNormalize&&(a.pulseNormalize/=T(1)),T(e))}var A=!!/chrome/i.test(window.navigator.userAgent)||/safari/i.test(window.navigator.userAgent),z=null;"onwheel"in document.createElement("div")?z="wheel":"onmousewheel"in document.createElement("div")&&(z="mousewheel"),z&&A&&(S(z,function(t){i||d();var r=t.target,o=x(r);if(!o||t.defaultPrevented||D(e,"embed")||D(r,"embed")&&/\.pdf/i.test(r.src))return!0;var n=t.wheelDeltaX||0,l=t.wheelDeltaY||0;if(n||l||(l=t.wheelDelta||0),!a.touchpadSupport&&function(e){if(e)return e=Math.abs(e),c.push(e),c.shift(),clearTimeout(b),!(H(c[0],120)&&H(c[1],120)&&H(c[2],120))}(l))return!0;Math.abs(n)>1.2&&(n*=a.stepSize/120),Math.abs(l)>1.2&&(l*=a.stepSize/120),p(o,-n,-l),t.preventDefault()}),S("mousedown",function(t){e=t.target}),S("load",d))})();


// --------------------------------------------------
// owl carousel setup
// --------------------------------------------------
    testiSlider()

    function testiSlider() {
        const aboutSlide = $('.testimonial .owl-carousel')
        aboutSlide.owlCarousel({
            loop: true,
            margin: 30,
            mouseDrag: true,
            autoplay: true,
            center: false,
            dots: false,
            dragEndSpeed: 700,
            smartSpeed: 2000,
            responsiveClass: true,
            autoplayHoverPause: true,
            autoplayTimeout: 2000,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                },
                600: {
                    items: 1,
                    margin: 0,
                },
                1000: {
                    items: 1,
                    margin: 0,
                }
            }
        })
    }

    singleSlider()

    function singleSlider() {
        const singleSlide = $('.project-slide .owl-carousel')
        singleSlide.owlCarousel({
            loop: true,
            margin: 30,
            mouseDrag: true,
            autoplay: true,
            center: false,
            dots: true,
            dragEndSpeed: 700,
            smartSpeed: 2000,
            responsiveClass: true,
            autoplayHoverPause: true,
            autoplayTimeout: 2000,
            responsive: {
                0: {
                    items: 1,
                    margin: 0,
                },
                600: {
                    items: 2,
                    margin: 0,
                },
                1000: {
                    items: 3,
                    margin: 30,
                }
            }
        })
    }