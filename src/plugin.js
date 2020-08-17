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

// aOS
!(function(e, t) {
  'object' == typeof exports && 'object' == typeof module ?
    (module.exports = t()) :
    'function' == typeof define && define.amd ?
    define([], t) :
    'object' == typeof exports ?
    (exports.AOS = t()) :
    (e.AOS = t());
})(this, function() {
  return (function(e) {
    function t(o) {
      if (n[o]) return n[o].exports;
      const i = (n[o] = {exports: {}, id: o, loaded: !1});
      return e[o].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
    }
    var n = {};
    return (t.m = e), (t.c = n), (t.p = 'dist/'), t(0);
  })([
    function(e, t, n) {
      'use strict';
      function o(e) {
        return e && e.__esModule ? e : {default: e};
      }
      const i =
          Object.assign ||
          function(e) {
            for (let t = 1; t < arguments.length; t++) {
              const n = arguments[t];
              for (const o in n) {
Object.prototype.hasOwnProperty.call(n, o) && (e[o] = n[o]);
}
            }
            return e;
          };
        const r = n(1);
        const a = (o(r), n(6));
        const u = o(a);
        const c = n(7);
        const f = o(c);
        const s = n(8);
        const d = o(s);
        const l = n(9);
        const p = o(l);
        const m = n(10);
        const b = o(m);
        const v = n(11);
        const y = o(v);
        const g = n(14);
        const h = o(g);
        let w = [];
        let k = !1;
        const x = document.all && !window.atob;
        let j = {
          offset: 120,
          delay: 0,
          easing: 'ease',
          duration: 400,
          disable: !1,
          once: !1,
          startEvent: 'DOMContentLoaded',
          throttleDelay: 99,
          debounceDelay: 50,
          disableMutationObserver: !1,
        };
        const O = function() {
          const e =
            arguments.length > 0 && void 0 !== arguments[0] && arguments[0];
          if ((e && (k = !0), k)) {
return (w = (0, y.default)(w, j)), (0, b.default)(w, j.once), w;
}
        };
        const _ = function() {
          (w = (0, h.default)()), O();
        };
        const S = function() {
          w.forEach(function(e, t) {
            e.node.removeAttribute('data-aos'),
              e.node.removeAttribute('data-aos-easing'),
              e.node.removeAttribute('data-aos-duration'),
              e.node.removeAttribute('data-aos-delay');
          });
        };
        const z = function(e) {
          return (
            e === !0 ||
            ('mobile' === e && p.default.mobile()) ||
            ('phone' === e && p.default.phone()) ||
            ('tablet' === e && p.default.tablet()) ||
            ('function' == typeof e && e() === !0)
          );
        };
        const A = function(e) {
          return (
            (j = i(j, e)),
            (w = (0, h.default)()),
            z(j.disable) || x ?
              S() :
              (document
                  .querySelector('body')
                  .setAttribute('data-aos-easing', j.easing),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-duration', j.duration),
                document
                  .querySelector('body')
                  .setAttribute('data-aos-delay', j.delay),
                'DOMContentLoaded' === j.startEvent &&
                ['complete', 'interactive'].indexOf(document.readyState) > -1 ?
                  O(!0) :
                  'load' === j.startEvent ?
                  window.addEventListener(j.startEvent, function() {
                      O(!0);
                    }) :
                  document.addEventListener(j.startEvent, function() {
                      O(!0);
                    }),
                window.addEventListener(
                  'resize',
                  (0, f.default)(O, j.debounceDelay, !0),
                ),
                window.addEventListener(
                  'orientationchange',
                  (0, f.default)(O, j.debounceDelay, !0),
                ),
                window.addEventListener(
                  'scroll',
                  (0, u.default)(function() {
                    (0, b.default)(w, j.once);
                  }, j.throttleDelay),
                ),
                j.disableMutationObserver || (0, d.default)('[data-aos]', _),
                w)
          );
        };
      e.exports = {init: A, refresh: O, refreshHard: _};
    },
    function(e, t) {},,, , ,


    function(e, t) {
      (function(t) {
        'use strict';
        function n(e, t, n) {
          function o(t) {
            const n = b;
              const o = v;
            return (b = v = void 0), (k = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (k = e), (h = setTimeout(s, t)), _ ? o(e) : g;
          }
          function a(e) {
            const n = e - w;
              const o = e - k;
              const i = t - n;
            return S ? j(i, y - o) : i;
          }
          function c(e) {
            const n = e - w;
              const o = e - k;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function s() {
            const e = O();
            return c(e) ? d(e) : void (h = setTimeout(s, a(e)));
          }
          function d(e) {
            return (h = void 0), z && b ? o(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (k = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(O());
          }
          function m() {
            const e = O();
              const n = c(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(s, t)), o(w);
            }
            return void 0 === h && (h = setTimeout(s, t)), g;
          }
          let b;
            let v;
            let y;
            let g;
            let h;
            let w;
            var k = 0;
            var _ = !1;
            var S = !1;
            var z = !0;
          if ('function' != typeof e) throw new TypeError(f);
          return (
            (t = u(t) || 0),
            i(n) &&
              ((_ = !!n.leading),
              (S = 'maxWait' in n),
              (y = S ? x(u(n.maxWait) || 0, t) : y),
              (z = 'trailing' in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e, t, o) {
          let r = !0;
            let a = !0;
          if ('function' != typeof e) throw new TypeError(f);
          return (
            i(o) &&
              ((r = 'leading' in o ? !!o.leading : r),
              (a = 'trailing' in o ? !!o.trailing : a)),
            n(e, t, {leading: r, maxWait: t, trailing: a})
          );
        }
        function i(e) {
          const t = 'undefined' == typeof e ? 'undefined' : c(e);
          return !!e && ('object' == t || 'function' == t);
        }
        function r(e) {
          return (
            !!e && 'object' == ('undefined' == typeof e ? 'undefined' : c(e))
          );
        }
        function a(e) {
          return (
            'symbol' == ('undefined' == typeof e ? 'undefined' : c(e)) ||
            (r(e) && k.call(e) == d)
          );
        }
        function u(e) {
          if ('number' == typeof e) return e;
          if (a(e)) return s;
          if (i(e)) {
            const t = 'function' == typeof e.valueOf ? e.valueOf() : e;
            e = i(t) ? t + '' : t;
          }
          if ('string' != typeof e) return 0 === e ? e : +e;
          e = e.replace(l, '');
          const n = m.test(e);
          return n || b.test(e) ? v(e.slice(2), n ? 2 : 8) : p.test(e) ? s : +e;
        }
        var c =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ?
              function(e) {
                  return typeof e;
                } :
              function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype ?
                    'symbol' :
                    typeof e;
                };
          var f = 'Expected a function';
          var s = NaN;
          var d = '[object Symbol]';
          var l = /^\s+|\s+$/g;
          var p = /^[-+]0x[0-9a-f]+$/i;
          var m = /^0b[01]+$/i;
          var b = /^0o[0-7]+$/i;
          var v = parseInt;
          const y =
            'object' == ('undefined' == typeof t ? 'undefined' : c(t)) &&
            t &&
            t.Object === Object &&
            t;
          const g =
            'object' == ('undefined' == typeof self ? 'undefined' : c(self)) &&
            self &&
            self.Object === Object &&
            self;
          const h = y || g || Function('return this')();
          const w = Object.prototype;
          var k = w.toString;
          var x = Math.max;
          var j = Math.min;
          var O = function() {
            return h.Date.now();
          };
        e.exports = o;
      }.call(
        t,
        (function() {
          return this;
        })(),
      ));
    },
    function(e, t) {
      (function(t) {
        'use strict';
        function n(e, t, n) {
          function i(t) {
            const n = b;
              const o = v;
            return (b = v = void 0), (O = t), (g = e.apply(o, n));
          }
          function r(e) {
            return (O = e), (h = setTimeout(s, t)), _ ? i(e) : g;
          }
          function u(e) {
            const n = e - w;
              const o = e - O;
              const i = t - n;
            return S ? x(i, y - o) : i;
          }
          function f(e) {
            const n = e - w;
              const o = e - O;
            return void 0 === w || n >= t || n < 0 || (S && o >= y);
          }
          function s() {
            const e = j();
            return f(e) ? d(e) : void (h = setTimeout(s, u(e)));
          }
          function d(e) {
            return (h = void 0), z && b ? i(e) : ((b = v = void 0), g);
          }
          function l() {
            void 0 !== h && clearTimeout(h), (O = 0), (b = w = v = h = void 0);
          }
          function p() {
            return void 0 === h ? g : d(j());
          }
          function m() {
            const e = j();
              const n = f(e);
            if (((b = arguments), (v = this), (w = e), n)) {
              if (void 0 === h) return r(w);
              if (S) return (h = setTimeout(s, t)), i(w);
            }
            return void 0 === h && (h = setTimeout(s, t)), g;
          }
          let b;
            let v;
            let y;
            let g;
            let h;
            let w;
            var O = 0;
            var _ = !1;
            var S = !1;
            var z = !0;
          if ('function' != typeof e) throw new TypeError(c);
          return (
            (t = a(t) || 0),
            o(n) &&
              ((_ = !!n.leading),
              (S = 'maxWait' in n),
              (y = S ? k(a(n.maxWait) || 0, t) : y),
              (z = 'trailing' in n ? !!n.trailing : z)),
            (m.cancel = l),
            (m.flush = p),
            m
          );
        }
        function o(e) {
          const t = 'undefined' == typeof e ? 'undefined' : u(e);
          return !!e && ('object' == t || 'function' == t);
        }
        function i(e) {
          return (
            !!e && 'object' == ('undefined' == typeof e ? 'undefined' : u(e))
          );
        }
        function r(e) {
          return (
            'symbol' == ('undefined' == typeof e ? 'undefined' : u(e)) ||
            (i(e) && w.call(e) == s)
          );
        }
        function a(e) {
          if ('number' == typeof e) return e;
          if (r(e)) return f;
          if (o(e)) {
            const t = 'function' == typeof e.valueOf ? e.valueOf() : e;
            e = o(t) ? t + '' : t;
          }
          if ('string' != typeof e) return 0 === e ? e : +e;
          e = e.replace(d, '');
          const n = p.test(e);
          return n || m.test(e) ? b(e.slice(2), n ? 2 : 8) : l.test(e) ? f : +e;
        }
        var u =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ?
              function(e) {
                  return typeof e;
                } :
              function(e) {
                  return e &&
                    'function' == typeof Symbol &&
                    e.constructor === Symbol &&
                    e !== Symbol.prototype ?
                    'symbol' :
                    typeof e;
                };
          var c = 'Expected a function';
          var f = NaN;
          var s = '[object Symbol]';
          var d = /^\s+|\s+$/g;
          var l = /^[-+]0x[0-9a-f]+$/i;
          var p = /^0b[01]+$/i;
          var m = /^0o[0-7]+$/i;
          var b = parseInt;
          const v =
            'object' == ('undefined' == typeof t ? 'undefined' : u(t)) &&
            t &&
            t.Object === Object &&
            t;
          const y =
            'object' == ('undefined' == typeof self ? 'undefined' : u(self)) &&
            self &&
            self.Object === Object &&
            self;
          const g = v || y || Function('return this')();
          const h = Object.prototype;
          var w = h.toString;
          var k = Math.max;
          var x = Math.min;
          var j = function() {
            return g.Date.now();
          };
        e.exports = n;
      }.call(
        t,
        (function() {
          return this;
        })(),
      ));
    },
    function(e, t) {
      'use strict';
      function n(e, t) {
        const n = new r(o);
        (a = t),
          n.observe(i.documentElement, {
            childList: !0,
            subtree: !0,
            removedNodes: !0,
          });
      }
      function o(e) {
        e &&
          e.forEach(function(e) {
            const t = Array.prototype.slice.call(e.addedNodes);
              const n = Array.prototype.slice.call(e.removedNodes);
              const o = t.concat(n).filter(function(e) {
                return e.hasAttribute && e.hasAttribute('data-aos');
              }).length;
            o && a();
          });
      }
      Object.defineProperty(t, '__esModule', {value: !0});
      var i = window.document;
        var r =
          window.MutationObserver ||
          window.WebKitMutationObserver ||
          window.MozMutationObserver;
        var a = function() {};
      t.default = n;
    },
    function(e, t) {
      'use strict';
      function n(e, t) {
        if (!(e instanceof t)) {
throw new TypeError('Cannot call a class as a function');
}
      }
      function o() {
        return navigator.userAgent || navigator.vendor || window.opera || '';
      }
      Object.defineProperty(t, '__esModule', {value: !0});
      const i = (function() {
          function e(e, t) {
            for (let n = 0; n < t.length; n++) {
              const o = t[n];
              (o.enumerable = o.enumerable || !1),
                (o.configurable = !0),
                'value' in o && (o.writable = !0),
                Object.defineProperty(e, o.key, o);
            }
          }
          return function(t, n, o) {
            return n && e(t.prototype, n), o && e(t, o), t;
          };
        })();
        const r = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i;
        const a = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
        const u = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i;
        const c = /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i;
        const f = (function() {
          function e() {
            n(this, e);
          }
          return (
            i(e, [
              {
                key: 'phone',
                value: function() {
                  const e = o();
                  return !(!r.test(e) && !a.test(e.substr(0, 4)));
                },
              },
              {
                key: 'mobile',
                value: function() {
                  const e = o();
                  return !(!u.test(e) && !c.test(e.substr(0, 4)));
                },
              },
              {
                key: 'tablet',
                value: function() {
                  return this.mobile() && !this.phone();
                },
              },
            ]),
            e
          );
        })();
      t.default = new f();
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', {value: !0});
      const n = function(e, t, n) {
          const o = e.node.getAttribute('data-aos-once');
          t > e.position ?
            e.node.classList.add('aos-animate') :
            'undefined' != typeof o &&
              ('false' === o || (!n && 'true' !== o)) &&
              e.node.classList.remove('aos-animate');
        };
        const o = function(e, t) {
          const o = window.pageYOffset;
            const i = window.innerHeight;
          e.forEach(function(e, r) {
            n(e, i + o, t);
          });
        };
      t.default = o;
    },
    function(e, t, n) {
      'use strict';
      function o(e) {
        return e && e.__esModule ? e : {default: e};
      }
      Object.defineProperty(t, '__esModule', {value: !0});
      const i = n(12);
        const r = o(i);
        const a = function(e, t) {
          return (
            e.forEach(function(e, n) {
              e.node.classList.add('aos-init'),
                (e.position = (0, r.default)(e.node, t.offset));
            }),
            e
          );
        };
      t.default = a;
    },
    function(e, t, n) {
      'use strict';
      function o(e) {
        return e && e.__esModule ? e : {default: e};
      }
      Object.defineProperty(t, '__esModule', {value: !0});
      const i = n(13);
        const r = o(i);
        const a = function(e, t) {
          let n = 0;
            let o = 0;
            const i = window.innerHeight;
            const a = {
              offset: e.getAttribute('data-aos-offset'),
              anchor: e.getAttribute('data-aos-anchor'),
              anchorPlacement: e.getAttribute('data-aos-anchor-placement'),
            };
          switch (
            (a.offset && !isNaN(a.offset) && (o = parseInt(a.offset)),
            a.anchor &&
              document.querySelectorAll(a.anchor) &&
              (e = document.querySelectorAll(a.anchor)[0]),
            (n = (0, r.default)(e).top),
            a.anchorPlacement)
          ) {
            case 'top-bottom':
              break;
            case 'center-bottom':
              n += e.offsetHeight / 2;
              break;
            case 'bottom-bottom':
              n += e.offsetHeight;
              break;
            case 'top-center':
              n += i / 2;
              break;
            case 'bottom-center':
              n += i / 2 + e.offsetHeight;
              break;
            case 'center-center':
              n += i / 2 + e.offsetHeight / 2;
              break;
            case 'top-top':
              n += i;
              break;
            case 'bottom-top':
              n += e.offsetHeight + i;
              break;
            case 'center-top':
              n += e.offsetHeight / 2 + i;
          }
          return a.anchorPlacement || a.offset || isNaN(t) || (o = t), n + o;
        };
      t.default = a;
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', {value: !0});
      const n = function(e) {
        for (
          var t = 0, n = 0;
          e && !isNaN(e.offsetLeft) && !isNaN(e.offsetTop);

        ) {
(t += e.offsetLeft - ('BODY' != e.tagName ? e.scrollLeft : 0)),
            (n += e.offsetTop - ('BODY' != e.tagName ? e.scrollTop : 0)),
            (e = e.offsetParent);
}
        return {top: n, left: t};
      };
      t.default = n;
    },
    function(e, t) {
      'use strict';
      Object.defineProperty(t, '__esModule', {value: !0});
      const n = function(e) {
        return (
          (e = e || document.querySelectorAll('[data-aos]')),
          Array.prototype.map.call(e, function(e) {
            return {node: e};
          })
        );
      };
      t.default = n;
    },
  ]);
});

// swiper js
!(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module ?
    (module.exports = t()) :
    'function' == typeof define && define.amd ?
    define(t) :
    (e.Swiper = t());
})(this, function() {
  'use strict';
  const e =
      'undefined' == typeof document ?
        {
            body: {},
            addEventListener: function() {},
            removeEventListener: function() {},
            activeElement: {blur: function() {}, nodeName: ''},
            querySelector: function() {
              return null;
            },
            querySelectorAll: function() {
              return [];
            },
            getElementById: function() {
              return null;
            },
            createEvent: function() {
              return {initEvent: function() {}};
            },
            createElement: function() {
              return {
                children: [],
                childNodes: [],
                style: {},
                setAttribute: function() {},
                getElementsByTagName: function() {
                  return [];
                },
              };
            },
            location: {hash: ''},
          } :
        document;
    const t =
      'undefined' == typeof window ?
        {
            document: e,
            navigator: {userAgent: ''},
            location: {},
            history: {},
            CustomEvent: function() {
              return this;
            },
            addEventListener: function() {},
            removeEventListener: function() {},
            getComputedStyle: function() {
              return {
                getPropertyValue: function() {
                  return '';
                },
              };
            },
            Image: function() {},
            Date: function() {},
            screen: {},
            setTimeout: function() {},
            clearTimeout: function() {},
          } :
        window;
    const a = function(e) {
      for (let t = 0; t < e.length; t += 1) this[t] = e[t];
      return (this.length = e.length), this;
    };
  function i(i, s) {
    const r = [];
      let n = 0;
    if (i && !s && i instanceof a) return i;
    if (i) {
if ('string' == typeof i) {
        let o;
          let l;
          const d = i.trim();
        if (d.indexOf('<') >= 0 && d.indexOf('>') >= 0) {
          let p = 'div';
          for (
            0 === d.indexOf('<li') && (p = 'ul'),
              0 === d.indexOf('<tr') && (p = 'tbody'),
              (0 !== d.indexOf('<td') && 0 !== d.indexOf('<th')) || (p = 'tr'),
              0 === d.indexOf('<tbody') && (p = 'table'),
              0 === d.indexOf('<option') && (p = 'select'),
              (l = e.createElement(p)).innerHTML = d,
              n = 0;
            n < l.childNodes.length;
            n += 1
          ) {
r.push(l.childNodes[n]);
}
        } else {
for (
            o =
              s || '#' !== i[0] || i.match(/[ .<>:~]/) ?
                (s || e).querySelectorAll(i.trim()) :
                [e.getElementById(i.trim().split('#')[1])],
              n = 0;
            n < o.length;
            n += 1
          ) {
o[n] && r.push(o[n]);
}
}
      } else if (i.nodeType || i === t || i === e) r.push(i);
      else if (i.length > 0 && i[0].nodeType) {
for (n = 0; n < i.length; n += 1) r.push(i[n]);
}
}
    return new a(r);
  }
  function s(e) {
    for (var t = [], a = 0; a < e.length; a += 1) {
-1 === t.indexOf(e[a]) && t.push(e[a]);
}
    return t;
  }
  (i.fn = a.prototype), (i.Class = a), (i.Dom7 = a);
  const r = {
    addClass: function(e) {
      if (void 0 === e) return this;
      for (let t = e.split(' '), a = 0; a < t.length; a += 1) {
for (let i = 0; i < this.length; i += 1) {
void 0 !== this[i].classList && this[i].classList.add(t[a]);
}
}
      return this;
    },
    removeClass: function(e) {
      for (let t = e.split(' '), a = 0; a < t.length; a += 1) {
for (let i = 0; i < this.length; i += 1) {
void 0 !== this[i].classList && this[i].classList.remove(t[a]);
}
}
      return this;
    },
    hasClass: function(e) {
      return !!this[0] && this[0].classList.contains(e);
    },
    toggleClass: function(e) {
      for (let t = e.split(' '), a = 0; a < t.length; a += 1) {
for (let i = 0; i < this.length; i += 1) {
void 0 !== this[i].classList && this[i].classList.toggle(t[a]);
}
}
      return this;
    },
    attr: function(e, t) {
      const a = arguments;
      if (1 === arguments.length && 'string' == typeof e) {
return this[0] ? this[0].getAttribute(e) : void 0;
}
      for (let i = 0; i < this.length; i += 1) {
if (2 === a.length) this[i].setAttribute(e, t);
        else {
for (const s in e) (this[i][s] = e[s]), this[i].setAttribute(s, e[s]);
}
}
      return this;
    },
    removeAttr: function(e) {
      for (let t = 0; t < this.length; t += 1) this[t].removeAttribute(e);
      return this;
    },
    data: function(e, t) {
      let a;
      if (void 0 !== t) {
        for (let i = 0; i < this.length; i += 1) {
(a = this[i]).dom7ElementDataStorage ||
            (a.dom7ElementDataStorage = {}),
            (a.dom7ElementDataStorage[e] = t);
}
        return this;
      }
      if ((a = this[0])) {
        if (a.dom7ElementDataStorage && e in a.dom7ElementDataStorage) {
return a.dom7ElementDataStorage[e];
}
        const s = a.getAttribute('data-' + e);
        return s || void 0;
      }
    },
    transform: function(e) {
      for (let t = 0; t < this.length; t += 1) {
        const a = this[t].style;
        (a.webkitTransform = e), (a.transform = e);
      }
      return this;
    },
    transition: function(e) {
      'string' != typeof e && (e += 'ms');
      for (let t = 0; t < this.length; t += 1) {
        const a = this[t].style;
        (a.webkitTransitionDuration = e), (a.transitionDuration = e);
      }
      return this;
    },
    on: function() {
      for (var e, t = [], a = arguments.length; a--; ) t[a] = arguments[a];
      let s = t[0];
        let r = t[1];
        let n = t[2];
        let o = t[3];
      function l(e) {
        const t = e.target;
        if (t) {
          const a = e.target.dom7EventData || [];
          if ((a.indexOf(e) < 0 && a.unshift(e), i(t).is(r))) n.apply(t, a);
          else {
for (let s = i(t).parents(), o = 0; o < s.length; o += 1) {
i(s[o]).is(r) && n.apply(s[o], a);
}
}
        }
      }
      function d(e) {
        const t = (e && e.target && e.target.dom7EventData) || [];
        t.indexOf(e) < 0 && t.unshift(e), n.apply(this, t);
      }
      'function' == typeof t[1] &&
        ((s = (e = t)[0]), (n = e[1]), (o = e[2]), (r = void 0)),
        o || (o = !1);
      for (var p, c = s.split(' '), u = 0; u < this.length; u += 1) {
        const h = this[u];
        if (r) {
for (p = 0; p < c.length; p += 1) {
            const v = c[p];
            h.dom7LiveListeners || (h.dom7LiveListeners = {}),
              h.dom7LiveListeners[v] || (h.dom7LiveListeners[v] = []),
              h.dom7LiveListeners[v].push({listener: n, proxyListener: l}),
              h.addEventListener(v, l, o);
          }
} else {
for (p = 0; p < c.length; p += 1) {
            const f = c[p];
            h.dom7Listeners || (h.dom7Listeners = {}),
              h.dom7Listeners[f] || (h.dom7Listeners[f] = []),
              h.dom7Listeners[f].push({listener: n, proxyListener: d}),
              h.addEventListener(f, d, o);
          }
}
      }
      return this;
    },
    off: function() {
      for (var e, t = [], a = arguments.length; a--; ) t[a] = arguments[a];
      let i = t[0];
        let s = t[1];
        let r = t[2];
        let n = t[3];
      'function' == typeof t[1] &&
        ((i = (e = t)[0]), (r = e[1]), (n = e[2]), (s = void 0)),
        n || (n = !1);
      for (let o = i.split(' '), l = 0; l < o.length; l += 1) {
for (let d = o[l], p = 0; p < this.length; p += 1) {
          const c = this[p];
            let u = void 0;
          !s && c.dom7Listeners ?
            (u = c.dom7Listeners[d]) :
            s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]);
          for (let h = u.length - 1; h >= 0; h -= 1) {
            const v = u[h];
            r && v.listener === r ?
              (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1)) :
              r ||
                (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1));
          }
        }
}
      return this;
    },
    trigger: function() {
      for (var a = [], i = arguments.length; i--; ) a[i] = arguments[i];
      for (let s = a[0].split(' '), r = a[1], n = 0; n < s.length; n += 1) {
for (let o = s[n], l = 0; l < this.length; l += 1) {
          const d = this[l];
            let p = void 0;
          try {
            p = new t.CustomEvent(o, {
              detail: r,
              bubbles: !0,
              cancelable: !0,
            });
          } catch (t) {
            (p = e.createEvent('Event')).initEvent(o, !0, !0), (p.detail = r);
          }
          (d.dom7EventData = a.filter(function(e, t) {
            return t > 0;
          })),
            d.dispatchEvent(p),
            (d.dom7EventData = []),
            delete d.dom7EventData;
        }
}
      return this;
    },
    transitionEnd: function(e) {
      let t;
        const a = ['webkitTransitionEnd', 'transitionend'];
        const i = this;
      function s(r) {
        if (r.target === this) {
for (e.call(this, r), t = 0; t < a.length; t += 1) i.off(a[t], s);
}
      }
      if (e) for (t = 0; t < a.length; t += 1) i.on(a[t], s);
      return this;
    },
    outerWidth: function(e) {
      if (this.length > 0) {
        if (e) {
          const t = this.styles();
          return (
            this[0].offsetWidth +
            parseFloat(t.getPropertyValue('margin-right')) +
            parseFloat(t.getPropertyValue('margin-left'))
          );
        }
        return this[0].offsetWidth;
      }
      return null;
    },
    outerHeight: function(e) {
      if (this.length > 0) {
        if (e) {
          const t = this.styles();
          return (
            this[0].offsetHeight +
            parseFloat(t.getPropertyValue('margin-top')) +
            parseFloat(t.getPropertyValue('margin-bottom'))
          );
        }
        return this[0].offsetHeight;
      }
      return null;
    },
    offset: function() {
      if (this.length > 0) {
        const a = this[0];
          const i = a.getBoundingClientRect();
          const s = e.body;
          const r = a.clientTop || s.clientTop || 0;
          const n = a.clientLeft || s.clientLeft || 0;
          const o = a === t ? t.scrollY : a.scrollTop;
          const l = a === t ? t.scrollX : a.scrollLeft;
        return {top: i.top + o - r, left: i.left + l - n};
      }
      return null;
    },
    css: function(e, a) {
      let i;
      if (1 === arguments.length) {
        if ('string' != typeof e) {
          for (i = 0; i < this.length; i += 1) {
for (const s in e) this[i].style[s] = e[s];
}
          return this;
        }
        if (this[0]) {
return t.getComputedStyle(this[0], null).getPropertyValue(e);
}
      }
      if (2 === arguments.length && 'string' == typeof e) {
        for (i = 0; i < this.length; i += 1) this[i].style[e] = a;
        return this;
      }
      return this;
    },
    each: function(e) {
      if (!e) return this;
      for (let t = 0; t < this.length; t += 1) {
if (!1 === e.call(this[t], t, this[t])) return this;
}
      return this;
    },
    html: function(e) {
      if (void 0 === e) return this[0] ? this[0].innerHTML : void 0;
      for (let t = 0; t < this.length; t += 1) this[t].innerHTML = e;
      return this;
    },
    text: function(e) {
      if (void 0 === e) return this[0] ? this[0].textContent.trim() : null;
      for (let t = 0; t < this.length; t += 1) this[t].textContent = e;
      return this;
    },
    is: function(s) {
      let r;
        let n;
        const o = this[0];
      if (!o || void 0 === s) return !1;
      if ('string' == typeof s) {
        if (o.matches) return o.matches(s);
        if (o.webkitMatchesSelector) return o.webkitMatchesSelector(s);
        if (o.msMatchesSelector) return o.msMatchesSelector(s);
        for (r = i(s), n = 0; n < r.length; n += 1) if (r[n] === o) return !0;
        return !1;
      }
      if (s === e) return o === e;
      if (s === t) return o === t;
      if (s.nodeType || s instanceof a) {
        for (r = s.nodeType ? [s] : s, n = 0; n < r.length; n += 1) {
if (r[n] === o) return !0;
}
        return !1;
      }
      return !1;
    },
    index: function() {
      let e;
        let t = this[0];
      if (t) {
        for (e = 0; null !== (t = t.previousSibling); ) {
1 === t.nodeType && (e += 1);
}
        return e;
      }
    },
    eq: function(e) {
      if (void 0 === e) return this;
      let t;
        const i = this.length;
      return new a(
        e > i - 1 ? [] : e < 0 ? ((t = i + e) < 0 ? [] : [this[t]]) : [this[e]],
      );
    },
    append: function() {
      for (var t, i = [], s = arguments.length; s--; ) i[s] = arguments[s];
      for (let r = 0; r < i.length; r += 1) {
        t = i[r];
        for (let n = 0; n < this.length; n += 1) {
if ('string' == typeof t) {
            const o = e.createElement('div');
            for (o.innerHTML = t; o.firstChild; ) {
this[n].appendChild(o.firstChild);
}
          } else if (t instanceof a) {
for (let l = 0; l < t.length; l += 1) this[n].appendChild(t[l]);
} else this[n].appendChild(t);
}
      }
      return this;
    },
    prepend: function(t) {
      let i;
        let s;
        const r = this;
      for (i = 0; i < this.length; i += 1) {
if ('string' == typeof t) {
          const n = e.createElement('div');
          for (n.innerHTML = t, s = n.childNodes.length - 1; s >= 0; s -= 1) {
r[i].insertBefore(n.childNodes[s], r[i].childNodes[0]);
}
        } else if (t instanceof a) {
for (s = 0; s < t.length; s += 1) {
r[i].insertBefore(t[s], r[i].childNodes[0]);
}
} else r[i].insertBefore(t, r[i].childNodes[0]);
}
      return this;
    },
    next: function(e) {
      return this.length > 0 ?
        e ?
          this[0].nextElementSibling && i(this[0].nextElementSibling).is(e) ?
            new a([this[0].nextElementSibling]) :
            new a([]) :
          this[0].nextElementSibling ?
          new a([this[0].nextElementSibling]) :
          new a([]) :
        new a([]);
    },
    nextAll: function(e) {
      const t = [];
        let s = this[0];
      if (!s) return new a([]);
      for (; s.nextElementSibling; ) {
        const r = s.nextElementSibling;
        e ? i(r).is(e) && t.push(r) : t.push(r), (s = r);
      }
      return new a(t);
    },
    prev: function(e) {
      if (this.length > 0) {
        const t = this[0];
        return e ?
          t.previousElementSibling && i(t.previousElementSibling).is(e) ?
            new a([t.previousElementSibling]) :
            new a([]) :
          t.previousElementSibling ?
          new a([t.previousElementSibling]) :
          new a([]);
      }
      return new a([]);
    },
    prevAll: function(e) {
      const t = [];
        let s = this[0];
      if (!s) return new a([]);
      for (; s.previousElementSibling; ) {
        const r = s.previousElementSibling;
        e ? i(r).is(e) && t.push(r) : t.push(r), (s = r);
      }
      return new a(t);
    },
    parent: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1) {
null !== this[a].parentNode &&
          (e ?
            i(this[a].parentNode).is(e) && t.push(this[a].parentNode) :
            t.push(this[a].parentNode));
}
      return i(s(t));
    },
    parents: function(e) {
      for (var t = [], a = 0; a < this.length; a += 1) {
for (let r = this[a].parentNode; r; ) {
e ? i(r).is(e) && t.push(r) : t.push(r), (r = r.parentNode);
}
}
      return i(s(t));
    },
    closest: function(e) {
      let t = this;
      return void 0 === e ?
        new a([]) :
        (t.is(e) || (t = t.parents(e).eq(0)), t);
    },
    find: function(e) {
      for (var t = [], i = 0; i < this.length; i += 1) {
for (let s = this[i].querySelectorAll(e), r = 0; r < s.length; r += 1) {
t.push(s[r]);
}
}
      return new a(t);
    },
    children: function(e) {
      for (var t = [], r = 0; r < this.length; r += 1) {
for (let n = this[r].childNodes, o = 0; o < n.length; o += 1) {
e ?
            1 === n[o].nodeType && i(n[o]).is(e) && t.push(n[o]) :
            1 === n[o].nodeType && t.push(n[o]);
}
}
      return new a(s(t));
    },
    remove: function() {
      for (let e = 0; e < this.length; e += 1) {
this[e].parentNode && this[e].parentNode.removeChild(this[e]);
}
      return this;
    },
    add: function() {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      let a; let s;
      for (a = 0; a < e.length; a += 1) {
        const r = i(e[a]);
        for (s = 0; s < r.length; s += 1) {
(this[this.length] = r[s]), (this.length += 1);
}
      }
      return this;
    },
    styles: function() {
      return this[0] ? t.getComputedStyle(this[0], null) : {};
    },
  };
  Object.keys(r).forEach(function(e) {
    i.fn[e] = r[e];
  });
  let n;
    let o;
    let l;
    var d = {
      deleteProps: function(e) {
        const t = e;
        Object.keys(t).forEach(function(e) {
          try {
            t[e] = null;
          } catch (e) {}
          try {
            delete t[e];
          } catch (e) {}
        });
      },
      nextTick: function(e, t) {
        return void 0 === t && (t = 0), setTimeout(e, t);
      },
      now: function() {
        return Date.now();
      },
      getTranslate: function(e, a) {
        let i; let s; let r;
        void 0 === a && (a = 'x');
        const n = t.getComputedStyle(e, null);
        return (
          t.WebKitCSSMatrix ?
            ((s = n.transform || n.webkitTransform).split(',').length > 6 &&
                (s = s
                  .split(', ')
                  .map(function(e) {
                    return e.replace(',', '.');
                  })
                  .join(', ')),
              (r = new t.WebKitCSSMatrix('none' === s ? '' : s))) :
            (i = (r =
                n.MozTransform ||
                n.OTransform ||
                n.MsTransform ||
                n.msTransform ||
                n.transform ||
                n
                  .getPropertyValue('transform')
                  .replace('translate(', 'matrix(1, 0, 0, 1,'))
                .toString()
                .split(',')),
          'x' === a &&
            (s = t.WebKitCSSMatrix ?
              r.m41 :
              16 === i.length ?
              parseFloat(i[12]) :
              parseFloat(i[4])),
          'y' === a &&
            (s = t.WebKitCSSMatrix ?
              r.m42 :
              16 === i.length ?
              parseFloat(i[13]) :
              parseFloat(i[5])),
          s || 0
        );
      },
      parseUrlQuery: function(e) {
        let a;
          let i;
          let s;
          let r;
          const n = {};
          let o = e || t.location.href;
        if ('string' == typeof o && o.length) {
for (
            r = (i = (o = o.indexOf('?') > -1 ? o.replace(/\S*\?/, '') : '')
              .split('&')
              .filter(function(e) {
                return '' !== e;
              })).length,
              a = 0;
            a < r;
            a += 1
          ) {
(s = i[a].replace(/#\S+/g, '').split('=')),
              (n[decodeURIComponent(s[0])] =
                void 0 === s[1] ? void 0 : decodeURIComponent(s[1]) || '');
}
}
        return n;
      },
      isObject: function(e) {
        return (
          'object' == typeof e &&
          null !== e &&
          e.constructor &&
          e.constructor === Object
        );
      },
      extend: function() {
        for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
        for (var a = Object(e[0]), i = 1; i < e.length; i += 1) {
          const s = e[i];
          if (void 0 !== s && null !== s) {
for (
              let r = Object.keys(Object(s)), n = 0, o = r.length;
              n < o;
              n += 1
            ) {
              const l = r[n];
                const p = Object.getOwnPropertyDescriptor(s, l);
              void 0 !== p &&
                p.enumerable &&
                (d.isObject(a[l]) && d.isObject(s[l]) ?
                  d.extend(a[l], s[l]) :
                  !d.isObject(a[l]) && d.isObject(s[l]) ?
                  ((a[l] = {}), d.extend(a[l], s[l])) :
                  (a[l] = s[l]));
            }
}
        }
        return a;
      },
    };
    const p =
      ((l = e.createElement('div')),
      {
        touch:
          (t.Modernizr && !0 === t.Modernizr.touch) ||
          !!(
            'ontouchstart' in t ||
            (t.DocumentTouch && e instanceof t.DocumentTouch)
          ),
        pointerEvents: !(!t.navigator.pointerEnabled && !t.PointerEvent),
        prefixedPointerEvents: !!t.navigator.msPointerEnabled,
        transition:
          ((o = l.style),
          'transition' in o || 'webkitTransition' in o || 'MozTransition' in o),
        transforms3d:
          (t.Modernizr && !0 === t.Modernizr.csstransforms3d) ||
          ((n = l.style),
          'webkitPerspective' in n ||
            'MozPerspective' in n ||
            'OPerspective' in n ||
            'MsPerspective' in n ||
            'perspective' in n),
        flexbox: (function() {
          for (
            let e = l.style,
              t = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(
                ' ',
              ),
              a = 0;
            a < t.length;
            a += 1
          ) {
if (t[a] in e) return !0;
}
          return !1;
        })(),
        observer: 'MutationObserver' in t || 'WebkitMutationObserver' in t,
        passiveListener: (function() {
          let e = !1;
          try {
            const a = Object.defineProperty({}, 'passive', {
              get: function() {
                e = !0;
              },
            });
            t.addEventListener('testPassiveListener', null, a);
          } catch (e) {}
          return e;
        })(),
        gestures: 'ongesturestart' in t,
      });
    const c = function(e) {
      void 0 === e && (e = {});
      const t = this;
      (t.params = e),
        (t.eventsListeners = {}),
        t.params &&
          t.params.on &&
          Object.keys(t.params.on).forEach(function(e) {
            t.on(e, t.params.on[e]);
          });
    };
    const u = {components: {configurable: !0}};
  (c.prototype.on = function(e, t, a) {
    const i = this;
    if ('function' != typeof t) return i;
    const s = a ? 'unshift' : 'push';
    return (
      e.split(' ').forEach(function(e) {
        i.eventsListeners[e] || (i.eventsListeners[e] = []),
          i.eventsListeners[e][s](t);
      }),
      i
    );
  }),
    (c.prototype.once = function(e, t, a) {
      const i = this;
      if ('function' != typeof t) return i;
      return i.on(
        e,
        function a() {
          for (var s = [], r = arguments.length; r--; ) s[r] = arguments[r];
          t.apply(i, s), i.off(e, a);
        },
        a,
      );
    }),
    (c.prototype.off = function(e, t) {
      const a = this;
      return a.eventsListeners ?
        (e.split(' ').forEach(function(e) {
            void 0 === t ?
              (a.eventsListeners[e] = []) :
              a.eventsListeners[e].forEach(function(i, s) {
                  i === t && a.eventsListeners[e].splice(s, 1);
                });
          }),
          a) :
        a;
    }),
    (c.prototype.emit = function() {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      let a;
        let i;
        let s;
        const r = this;
      return r.eventsListeners ?
        ('string' == typeof e[0] || Array.isArray(e[0]) ?
            ((a = e[0]), (i = e.slice(1, e.length)), (s = r)) :
            ((a = e[0].events), (i = e[0].data), (s = e[0].context || r)),
          (Array.isArray(a) ? a : a.split(' ')).forEach(function(e) {
            if (r.eventsListeners && r.eventsListeners[e]) {
              const t = [];
              r.eventsListeners[e].forEach(function(e) {
                t.push(e);
              }),
                t.forEach(function(e) {
                  e.apply(s, i);
                });
            }
          }),
          r) :
        r;
    }),
    (c.prototype.useModulesParams = function(e) {
      const t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function(a) {
          const i = t.modules[a];
          i.params && d.extend(e, i.params);
        });
    }),
    (c.prototype.useModules = function(e) {
      void 0 === e && (e = {});
      const t = this;
      t.modules &&
        Object.keys(t.modules).forEach(function(a) {
          const i = t.modules[a];
            const s = e[a] || {};
          i.instance &&
            Object.keys(i.instance).forEach(function(e) {
              const a = i.instance[e];
              t[e] = 'function' == typeof a ? a.bind(t) : a;
            }),
            i.on &&
              t.on &&
              Object.keys(i.on).forEach(function(e) {
                t.on(e, i.on[e]);
              }),
            i.create && i.create.bind(t)(s);
        });
    }),
    (u.components.set = function(e) {
      this.use && this.use(e);
    }),
    (c.installModule = function(e) {
      for (var t = [], a = arguments.length - 1; a-- > 0; ) {
t[a] = arguments[a + 1];
}
      const i = this;
      i.prototype.modules || (i.prototype.modules = {});
      const s = e.name || Object.keys(i.prototype.modules).length + '_' + d.now();
      return (
        (i.prototype.modules[s] = e),
        e.proto &&
          Object.keys(e.proto).forEach(function(t) {
            i.prototype[t] = e.proto[t];
          }),
        e.static &&
          Object.keys(e.static).forEach(function(t) {
            i[t] = e.static[t];
          }),
        e.install && e.install.apply(i, t),
        i
      );
    }),
    (c.use = function(e) {
      for (var t = [], a = arguments.length - 1; a-- > 0; ) {
t[a] = arguments[a + 1];
}
      const i = this;
      return Array.isArray(e) ?
        (e.forEach(function(e) {
            return i.installModule(e);
          }),
          i) :
        i.installModule.apply(i, [e].concat(t));
    }),
    Object.defineProperties(c, u);
  const h = {
    updateSize: function() {
      let e;
        let t;
        const a = this;
        const i = a.$el;
      (e = void 0 !== a.params.width ? a.params.width : i[0].clientWidth),
        (t = void 0 !== a.params.height ? a.params.height : i[0].clientHeight),
        (0 === e && a.isHorizontal()) ||
          (0 === t && a.isVertical()) ||
          ((e =
            e -
            parseInt(i.css('padding-left'), 10) -
            parseInt(i.css('padding-right'), 10)),
          (t =
            t -
            parseInt(i.css('padding-top'), 10) -
            parseInt(i.css('padding-bottom'), 10)),
          d.extend(a, {width: e, height: t, size: a.isHorizontal() ? e : t}));
    },
    updateSlides: function() {
      const e = this;
        const a = e.params;
        const i = e.$wrapperEl;
        const s = e.size;
        const r = e.rtlTranslate;
        const n = e.wrongRTL;
        const o = i.children('.' + e.params.slideClass);
        const l = e.virtual && a.virtual.enabled ? e.virtual.slides.length : o.length;
        let c = [];
        const u = [];
        const h = [];
        let v = a.slidesOffsetBefore;
      'function' == typeof v && (v = a.slidesOffsetBefore.call(e));
      let f = a.slidesOffsetAfter;
      'function' == typeof f && (f = a.slidesOffsetAfter.call(e));
      const m = l;
        const g = e.snapGrid.length;
        const b = e.snapGrid.length;
        let w = a.spaceBetween;
        let y = -v;
        let x = 0;
        let E = 0;
      if (void 0 !== s) {
        let T; let S;
        'string' == typeof w &&
          w.indexOf('%') >= 0 &&
          (w = (parseFloat(w.replace('%', '')) / 100) * s),
          (e.virtualSize = -w),
          r ?
            o.css({marginLeft: '', marginTop: ''}) :
            o.css({marginRight: '', marginBottom: ''}),
          a.slidesPerColumn > 1 &&
            ((T =
              Math.floor(l / a.slidesPerColumn) === l / e.params.slidesPerColumn ?
                l :
                Math.ceil(l / a.slidesPerColumn) * a.slidesPerColumn),
            'auto' !== a.slidesPerView &&
              'row' === a.slidesPerColumnFill &&
              (T = Math.max(T, a.slidesPerView * a.slidesPerColumn)));
        for (
          var C,
            M = a.slidesPerColumn,
            z = T / M,
            k = z - (a.slidesPerColumn * z - l),
            P = 0;
          P < l;
          P += 1
        ) {
          S = 0;
          const $ = o.eq(P);
          if (a.slidesPerColumn > 1) {
            let L = void 0;
              let I = void 0;
              let D = void 0;
            'column' === a.slidesPerColumnFill ?
              ((D = P - (I = Math.floor(P / M)) * M),
                (I > k || (I === k && D === M - 1)) &&
                  (D += 1) >= M &&
                  ((D = 0), (I += 1)),
                (L = I + (D * T) / M),
                $.css({
                  '-webkit-box-ordinal-group': L,
                  '-moz-box-ordinal-group': L,
                  '-ms-flex-order': L,
                  '-webkit-order': L,
                  'order': L,
                })) :
              (I = P - (D = Math.floor(P / z)) * z),
              $.css(
                'margin-' + (e.isHorizontal() ? 'top' : 'left'),
                0 !== D && a.spaceBetween && a.spaceBetween + 'px',
              )
                .attr('data-swiper-column', I)
                .attr('data-swiper-row', D);
          }
          if ('none' !== $.css('display')) {
            if ('auto' === a.slidesPerView) {
              const O = t.getComputedStyle($[0], null);
                const A = $[0].style.transform;
              A && ($[0].style.transform = 'none'),
                (S = e.isHorizontal() ?
                  $[0].getBoundingClientRect().width +
                    parseFloat(O.getPropertyValue('margin-left')) +
                    parseFloat(O.getPropertyValue('margin-right')) :
                  $[0].getBoundingClientRect().height +
                    parseFloat(O.getPropertyValue('margin-top')) +
                    parseFloat(O.getPropertyValue('margin-bottom'))),
                A && ($[0].style.transform = A),
                a.roundLengths && (S = Math.floor(S));
            } else {
(S = (s - (a.slidesPerView - 1) * w) / a.slidesPerView),
                a.roundLengths && (S = Math.floor(S)),
                o[P] &&
                  (e.isHorizontal() ?
                    (o[P].style.width = S + 'px') :
                    (o[P].style.height = S + 'px'));
}
            o[P] && (o[P].swiperSlideSize = S),
              h.push(S),
              a.centeredSlides ?
                ((y = y + S / 2 + x / 2 + w),
                  0 === x && 0 !== P && (y = y - s / 2 - w),
                  0 === P && (y = y - s / 2 - w),
                  Math.abs(y) < 0.001 && (y = 0),
                  E % a.slidesPerGroup == 0 && c.push(y),
                  u.push(y)) :
                (E % a.slidesPerGroup == 0 && c.push(y),
                  u.push(y),
                  (y = y + S + w)),
              (e.virtualSize += S + w),
              (x = S),
              (E += 1);
          }
        }
        if (
          ((e.virtualSize = Math.max(e.virtualSize, s) + f),
          r &&
            n &&
            ('slide' === a.effect || 'coverflow' === a.effect) &&
            i.css({width: e.virtualSize + a.spaceBetween + 'px'}),
          (p.flexbox && !a.setWrapperSize) ||
            (e.isHorizontal() ?
              i.css({width: e.virtualSize + a.spaceBetween + 'px'}) :
              i.css({height: e.virtualSize + a.spaceBetween + 'px'})),
          a.slidesPerColumn > 1 &&
            ((e.virtualSize = (S + a.spaceBetween) * T),
            (e.virtualSize =
              Math.ceil(e.virtualSize / a.slidesPerColumn) - a.spaceBetween),
            e.isHorizontal() ?
              i.css({width: e.virtualSize + a.spaceBetween + 'px'}) :
              i.css({height: e.virtualSize + a.spaceBetween + 'px'}),
            a.centeredSlides))
        ) {
          C = [];
          for (let G = 0; G < c.length; G += 1) {
c[G] < e.virtualSize + c[0] && C.push(c[G]);
}
          c = C;
        }
        if (!a.centeredSlides) {
          C = [];
          for (let H = 0; H < c.length; H += 1) {
c[H] <= e.virtualSize - s && C.push(c[H]);
}
          (c = C),
            Math.floor(e.virtualSize - s) - Math.floor(c[c.length - 1]) > 1 &&
              c.push(e.virtualSize - s);
        }
        0 === c.length && (c = [0]),
          0 !== a.spaceBetween &&
            (e.isHorizontal() ?
              r ?
                o.css({marginLeft: w + 'px'}) :
                o.css({marginRight: w + 'px'}) :
              o.css({marginBottom: w + 'px'})),
          d.extend(e, {
            slides: o,
            snapGrid: c,
            slidesGrid: u,
            slidesSizesGrid: h,
          }),
          l !== m && e.emit('slidesLengthChange'),
          c.length !== g &&
            (e.params.watchOverflow && e.checkOverflow(),
            e.emit('snapGridLengthChange')),
          u.length !== b && e.emit('slidesGridLengthChange'),
          (a.watchSlidesProgress || a.watchSlidesVisibility) &&
            e.updateSlidesOffset();
      }
    },
    updateAutoHeight: function(e) {
      let t;
        const a = this;
        const i = [];
        let s = 0;
      if (
        ('number' == typeof e ?
          a.setTransition(e) :
          !0 === e && a.setTransition(a.params.speed),
        'auto' !== a.params.slidesPerView && a.params.slidesPerView > 1)
      ) {
for (t = 0; t < Math.ceil(a.params.slidesPerView); t += 1) {
          const r = a.activeIndex + t;
          if (r > a.slides.length) break;
          i.push(a.slides.eq(r)[0]);
        }
} else i.push(a.slides.eq(a.activeIndex)[0]);
      for (t = 0; t < i.length; t += 1) {
if (void 0 !== i[t]) {
          const n = i[t].offsetHeight;
          s = n > s ? n : s;
        }
}
      s && a.$wrapperEl.css('height', s + 'px');
    },
    updateSlidesOffset: function() {
      for (let e = this.slides, t = 0; t < e.length; t += 1) {
e[t].swiperSlideOffset = this.isHorizontal() ?
          e[t].offsetLeft :
          e[t].offsetTop;
}
    },
    updateSlidesProgress: function(e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this;
        const a = t.params;
        const i = t.slides;
        const s = t.rtlTranslate;
      if (0 !== i.length) {
        void 0 === i[0].swiperSlideOffset && t.updateSlidesOffset();
        let r = -e;
        s && (r = e), i.removeClass(a.slideVisibleClass);
        for (let n = 0; n < i.length; n += 1) {
          const o = i[n];
            const l =
              (r +
                (a.centeredSlides ? t.minTranslate() : 0) -
                o.swiperSlideOffset) /
              (o.swiperSlideSize + a.spaceBetween);
          if (a.watchSlidesVisibility) {
            const d = -(r - o.swiperSlideOffset);
              const p = d + t.slidesSizesGrid[n];
            ((d >= 0 && d < t.size) ||
              (p > 0 && p <= t.size) ||
              (d <= 0 && p >= t.size)) &&
              i.eq(n).addClass(a.slideVisibleClass);
          }
          o.progress = s ? -l : l;
        }
      }
    },
    updateProgress: function(e) {
      void 0 === e && (e = (this && this.translate) || 0);
      const t = this;
        const a = t.params;
        const i = t.maxTranslate() - t.minTranslate();
        let s = t.progress;
        let r = t.isBeginning;
        let n = t.isEnd;
        const o = r;
        const l = n;
      0 === i ?
        ((s = 0), (r = !0), (n = !0)) :
        ((r = (s = (e - t.minTranslate()) / i) <= 0), (n = s >= 1)),
        d.extend(t, {progress: s, isBeginning: r, isEnd: n}),
        (a.watchSlidesProgress || a.watchSlidesVisibility) &&
          t.updateSlidesProgress(e),
        r && !o && t.emit('reachBeginning toEdge'),
        n && !l && t.emit('reachEnd toEdge'),
        ((o && !r) || (l && !n)) && t.emit('fromEdge'),
        t.emit('progress', s);
    },
    updateSlidesClasses: function() {
      let e;
        const t = this;
        const a = t.slides;
        const i = t.params;
        const s = t.$wrapperEl;
        const r = t.activeIndex;
        const n = t.realIndex;
        const o = t.virtual && i.virtual.enabled;
      a.removeClass(
        i.slideActiveClass +
          ' ' +
          i.slideNextClass +
          ' ' +
          i.slidePrevClass +
          ' ' +
          i.slideDuplicateActiveClass +
          ' ' +
          i.slideDuplicateNextClass +
          ' ' +
          i.slideDuplicatePrevClass,
      ),
        (e = o ?
          t.$wrapperEl.find(
              '.' + i.slideClass + '[data-swiper-slide-index="' + r + '"]',
            ) :
          a.eq(r)).addClass(i.slideActiveClass),
        i.loop &&
          (e.hasClass(i.slideDuplicateClass) ?
            s
                .children(
                  '.' +
                    i.slideClass +
                    ':not(.' +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    n +
                    '"]',
                )
                .addClass(i.slideDuplicateActiveClass) :
            s
                .children(
                  '.' +
                    i.slideClass +
                    '.' +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    n +
                    '"]',
                )
                .addClass(i.slideDuplicateActiveClass));
      let l = e
        .nextAll('.' + i.slideClass)
        .eq(0)
        .addClass(i.slideNextClass);
      i.loop && 0 === l.length && (l = a.eq(0)).addClass(i.slideNextClass);
      let d = e
        .prevAll('.' + i.slideClass)
        .eq(0)
        .addClass(i.slidePrevClass);
      i.loop && 0 === d.length && (d = a.eq(-1)).addClass(i.slidePrevClass),
        i.loop &&
          (l.hasClass(i.slideDuplicateClass) ?
            s
                .children(
                  '.' +
                    i.slideClass +
                    ':not(.' +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    l.attr('data-swiper-slide-index') +
                    '"]',
                )
                .addClass(i.slideDuplicateNextClass) :
            s
                .children(
                  '.' +
                    i.slideClass +
                    '.' +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    l.attr('data-swiper-slide-index') +
                    '"]',
                )
                .addClass(i.slideDuplicateNextClass),
          d.hasClass(i.slideDuplicateClass) ?
            s
                .children(
                  '.' +
                    i.slideClass +
                    ':not(.' +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    d.attr('data-swiper-slide-index') +
                    '"]',
                )
                .addClass(i.slideDuplicatePrevClass) :
            s
                .children(
                  '.' +
                    i.slideClass +
                    '.' +
                    i.slideDuplicateClass +
                    '[data-swiper-slide-index="' +
                    d.attr('data-swiper-slide-index') +
                    '"]',
                )
                .addClass(i.slideDuplicatePrevClass));
    },
    updateActiveIndex: function(e) {
      let t;
        const a = this;
        const i = a.rtlTranslate ? a.translate : -a.translate;
        const s = a.slidesGrid;
        const r = a.snapGrid;
        const n = a.params;
        const o = a.activeIndex;
        const l = a.realIndex;
        const p = a.snapIndex;
        let c = e;
      if (void 0 === c) {
        for (let u = 0; u < s.length; u += 1) {
void 0 !== s[u + 1] ?
            i >= s[u] && i < s[u + 1] - (s[u + 1] - s[u]) / 2 ?
              (c = u) :
              i >= s[u] && i < s[u + 1] && (c = u + 1) :
            i >= s[u] && (c = u);
}
        n.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (
        ((t =
          r.indexOf(i) >= 0 ?
            r.indexOf(i) :
            Math.floor(c / n.slidesPerGroup)) >= r.length &&
          (t = r.length - 1),
        c !== o)
      ) {
        const h = parseInt(
          a.slides.eq(c).attr('data-swiper-slide-index') || c,
          10,
        );
        d.extend(a, {
          snapIndex: t,
          realIndex: h,
          previousIndex: o,
          activeIndex: c,
        }),
          a.emit('activeIndexChange'),
          a.emit('snapIndexChange'),
          l !== h && a.emit('realIndexChange'),
          a.emit('slideChange');
      } else t !== p && ((a.snapIndex = t), a.emit('snapIndexChange'));
    },
    updateClickedSlide: function(e) {
      const t = this;
        const a = t.params;
        const s = i(e.target).closest('.' + a.slideClass)[0];
        let r = !1;
      if (s) {
for (let n = 0; n < t.slides.length; n += 1) {
t.slides[n] === s && (r = !0);
}
}
      if (!s || !r) {
return (t.clickedSlide = void 0), void (t.clickedIndex = void 0);
}
      (t.clickedSlide = s),
        t.virtual && t.params.virtual.enabled ?
          (t.clickedIndex = parseInt(
              i(s).attr('data-swiper-slide-index'),
              10,
            )) :
          (t.clickedIndex = i(s).index()),
        a.slideToClickedSlide &&
          void 0 !== t.clickedIndex &&
          t.clickedIndex !== t.activeIndex &&
          t.slideToClickedSlide();
    },
  };
  const v = {
    getTranslate: function(e) {
      void 0 === e && (e = this.isHorizontal() ? 'x' : 'y');
      const t = this.params;
        const a = this.rtlTranslate;
        const i = this.translate;
        const s = this.$wrapperEl;
      if (t.virtualTranslate) return a ? -i : i;
      let r = d.getTranslate(s[0], e);
      return a && (r = -r), r || 0;
    },
    setTranslate: function(e, t) {
      const a = this;
        const i = a.rtlTranslate;
        const s = a.params;
        const r = a.$wrapperEl;
        const n = a.progress;
        let o = 0;
        let l = 0;
      a.isHorizontal() ? (o = i ? -e : e) : (l = e),
        s.roundLengths && ((o = Math.floor(o)), (l = Math.floor(l))),
        s.virtualTranslate ||
          (p.transforms3d ?
            r.transform('translate3d(' + o + 'px, ' + l + 'px, 0px)') :
            r.transform('translate(' + o + 'px, ' + l + 'px)')),
        (a.translate = a.isHorizontal() ? o : l);
      const d = a.maxTranslate() - a.minTranslate();
      (0 === d ? 0 : (e - a.minTranslate()) / d) !== n && a.updateProgress(e),
        a.emit('setTranslate', a.translate, t);
    },
    minTranslate: function() {
      return -this.snapGrid[0];
    },
    maxTranslate: function() {
      return -this.snapGrid[this.snapGrid.length - 1];
    },
  };
  const f = {
    setTransition: function(e, t) {
      this.$wrapperEl.transition(e), this.emit('setTransition', e, t);
    },
    transitionStart: function(e, t) {
      void 0 === e && (e = !0);
      const a = this;
        const i = a.activeIndex;
        const s = a.params;
        const r = a.previousIndex;
      s.autoHeight && a.updateAutoHeight();
      let n = t;
      if (
        (n || (n = i > r ? 'next' : i < r ? 'prev' : 'reset'),
        a.emit('transitionStart'),
        e && i !== r)
      ) {
        if ('reset' === n) return void a.emit('slideResetTransitionStart');
        a.emit('slideChangeTransitionStart'),
          'next' === n ?
            a.emit('slideNextTransitionStart') :
            a.emit('slidePrevTransitionStart');
      }
    },
    transitionEnd: function(e, t) {
      void 0 === e && (e = !0);
      const a = this;
        const i = a.activeIndex;
        const s = a.previousIndex;
      (a.animating = !1), a.setTransition(0);
      let r = t;
      if (
        (r || (r = i > s ? 'next' : i < s ? 'prev' : 'reset'),
        a.emit('transitionEnd'),
        e && i !== s)
      ) {
        if ('reset' === r) return void a.emit('slideResetTransitionEnd');
        a.emit('slideChangeTransitionEnd'),
          'next' === r ?
            a.emit('slideNextTransitionEnd') :
            a.emit('slidePrevTransitionEnd');
      }
    },
  };
  const m = {
    slideTo: function(e, t, a, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === a && (a = !0);
      const s = this;
        let r = e;
      r < 0 && (r = 0);
      const n = s.params;
        const o = s.snapGrid;
        const l = s.slidesGrid;
        const d = s.previousIndex;
        const c = s.activeIndex;
        const u = s.rtlTranslate;
      if (s.animating && n.preventIntercationOnTransition) return !1;
      let h = Math.floor(r / n.slidesPerGroup);
      h >= o.length && (h = o.length - 1),
        (c || n.initialSlide || 0) === (d || 0) &&
          a &&
          s.emit('beforeSlideChangeStart');
      let v;
        const f = -o[h];
      if ((s.updateProgress(f), n.normalizeSlideIndex)) {
for (let m = 0; m < l.length; m += 1) {
-Math.floor(100 * f) >= Math.floor(100 * l[m]) && (r = m);
}
}
      if (s.initialized && r !== c) {
        if (!s.allowSlideNext && f < s.translate && f < s.minTranslate()) {
return !1;
}
        if (
          !s.allowSlidePrev &&
          f > s.translate &&
          f > s.maxTranslate() &&
          (c || 0) !== r
        ) {
return !1;
}
      }
      return (
        (v = r > c ? 'next' : r < c ? 'prev' : 'reset'),
        (u && -f === s.translate) || (!u && f === s.translate) ?
          (s.updateActiveIndex(r),
            n.autoHeight && s.updateAutoHeight(),
            s.updateSlidesClasses(),
            'slide' !== n.effect && s.setTranslate(f),
            'reset' !== v && (s.transitionStart(a, v), s.transitionEnd(a, v)),
            !1) :
          (0 !== t && p.transition ?
              (s.setTransition(t),
                s.setTranslate(f),
                s.updateActiveIndex(r),
                s.updateSlidesClasses(),
                s.emit('beforeTransitionStart', t, i),
                s.transitionStart(a, v),
                s.animating ||
                  ((s.animating = !0),
                  s.onSlideToWrapperTransitionEnd ||
                    (s.onSlideToWrapperTransitionEnd = function(e) {
                      s &&
                        !s.destroyed &&
                        e.target === this &&
                        (s.$wrapperEl[0].removeEventListener(
                          'transitionend',
                          s.onSlideToWrapperTransitionEnd,
                        ),
                        s.$wrapperEl[0].removeEventListener(
                          'webkitTransitionEnd',
                          s.onSlideToWrapperTransitionEnd,
                        ),
                        s.transitionEnd(a, v));
                    }),
                  s.$wrapperEl[0].addEventListener(
                    'transitionend',
                    s.onSlideToWrapperTransitionEnd,
                  ),
                  s.$wrapperEl[0].addEventListener(
                    'webkitTransitionEnd',
                    s.onSlideToWrapperTransitionEnd,
                  ))) :
              (s.setTransition(0),
                s.setTranslate(f),
                s.updateActiveIndex(r),
                s.updateSlidesClasses(),
                s.emit('beforeTransitionStart', t, i),
                s.transitionStart(a, v),
                s.transitionEnd(a, v)),
            !0)
      );
    },
    slideToLoop: function(e, t, a, i) {
      void 0 === e && (e = 0),
        void 0 === t && (t = this.params.speed),
        void 0 === a && (a = !0);
      let s = e;
      return (
        this.params.loop && (s += this.loopedSlides), this.slideTo(s, t, a, i)
      );
    },
    slideNext: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this;
        const s = i.params;
        const r = i.animating;
      return s.loop ?
        !r &&
            (i.loopFix(),
            (i._clientLeft = i.$wrapperEl[0].clientLeft),
            i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a)) :
        i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a);
    },
    slidePrev: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this;
        const s = i.params;
        const r = i.animating;
        const n = i.snapGrid;
        const o = i.slidesGrid;
        const l = i.rtlTranslate;
      if (s.loop) {
        if (r) return !1;
        i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
      }
      let d;
        const p = l ? i.translate : -i.translate;
        const c = (n[n.indexOf(p)], n[n.indexOf(p) - 1]);
      return (
        c && (d = o.indexOf(c)) < 0 && (d = i.activeIndex - 1),
        i.slideTo(d, e, t, a)
      );
    },
    slideReset: function(e, t, a) {
      return (
        void 0 === e && (e = this.params.speed),
        void 0 === t && (t = !0),
        this.slideTo(this.activeIndex, e, t, a)
      );
    },
    slideToClosest: function(e, t, a) {
      void 0 === e && (e = this.params.speed), void 0 === t && (t = !0);
      const i = this;
        let s = i.activeIndex;
        const r = Math.floor(s / i.params.slidesPerGroup);
      if (r < i.snapGrid.length - 1) {
        const n = i.rtlTranslate ? i.translate : -i.translate;
          const o = i.snapGrid[r];
        n - o > (i.snapGrid[r + 1] - o) / 2 && (s = i.params.slidesPerGroup);
      }
      return i.slideTo(s, e, t, a);
    },
    slideToClickedSlide: function() {
      let e;
        const t = this;
        const a = t.params;
        const s = t.$wrapperEl;
        const r =
          'auto' === a.slidesPerView ?
            t.slidesPerViewDynamic() :
            a.slidesPerView;
        let n = t.clickedIndex;
      if (a.loop) {
        if (t.animating) return;
        (e = parseInt(i(t.clickedSlide).attr('data-swiper-slide-index'), 10)),
          a.centeredSlides ?
            n < t.loopedSlides - r / 2 ||
              n > t.slides.length - t.loopedSlides + r / 2 ?
              (t.loopFix(),
                (n = s
                  .children(
                    '.' +
                      a.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]:not(.' +
                      a.slideDuplicateClass +
                      ')',
                  )
                  .eq(0)
                  .index()),
                d.nextTick(function() {
                  t.slideTo(n);
                })) :
              t.slideTo(n) :
            n > t.slides.length - r ?
            (t.loopFix(),
              (n = s
                .children(
                  '.' +
                    a.slideClass +
                    '[data-swiper-slide-index="' +
                    e +
                    '"]:not(.' +
                    a.slideDuplicateClass +
                    ')',
                )
                .eq(0)
                .index()),
              d.nextTick(function() {
                t.slideTo(n);
              })) :
            t.slideTo(n);
      } else t.slideTo(n);
    },
  };
  const g = {
    loopCreate: function() {
      const t = this;
        const a = t.params;
        const s = t.$wrapperEl;
      s.children('.' + a.slideClass + '.' + a.slideDuplicateClass).remove();
      let r = s.children('.' + a.slideClass);
      if (a.loopFillGroupWithBlank) {
        const n = a.slidesPerGroup - (r.length % a.slidesPerGroup);
        if (n !== a.slidesPerGroup) {
          for (let o = 0; o < n; o += 1) {
            const l = i(e.createElement('div')).addClass(
              a.slideClass + ' ' + a.slideBlankClass,
            );
            s.append(l);
          }
          r = s.children('.' + a.slideClass);
        }
      }
      'auto' !== a.slidesPerView ||
        a.loopedSlides ||
        (a.loopedSlides = r.length),
        (t.loopedSlides = parseInt(a.loopedSlides || a.slidesPerView, 10)),
        (t.loopedSlides += a.loopAdditionalSlides),
        t.loopedSlides > r.length && (t.loopedSlides = r.length);
      const d = [];
        const p = [];
      r.each(function(e, a) {
        const s = i(a);
        e < t.loopedSlides && p.push(a),
          e < r.length && e >= r.length - t.loopedSlides && d.push(a),
          s.attr('data-swiper-slide-index', e);
      });
      for (let c = 0; c < p.length; c += 1) {
s.append(i(p[c].cloneNode(!0)).addClass(a.slideDuplicateClass));
}
      for (let u = d.length - 1; u >= 0; u -= 1) {
s.prepend(i(d[u].cloneNode(!0)).addClass(a.slideDuplicateClass));
}
    },
    loopFix: function() {
      let e;
        const t = this;
        const a = t.params;
        const i = t.activeIndex;
        const s = t.slides;
        const r = t.loopedSlides;
        const n = t.allowSlidePrev;
        const o = t.allowSlideNext;
        const l = t.snapGrid;
        const d = t.rtlTranslate;
      (t.allowSlidePrev = !0), (t.allowSlideNext = !0);
      const p = -l[i] - t.getTranslate();
      i < r ?
        ((e = s.length - 3 * r + i),
          (e += r),
          t.slideTo(e, 0, !1, !0) &&
            0 !== p &&
            t.setTranslate((d ? -t.translate : t.translate) - p)) :
        (('auto' === a.slidesPerView && i >= 2 * r) ||
            i > s.length - 2 * a.slidesPerView) &&
          ((e = -s.length + i + r),
          (e += r),
          t.slideTo(e, 0, !1, !0) &&
            0 !== p &&
            t.setTranslate((d ? -t.translate : t.translate) - p));
      (t.allowSlidePrev = n), (t.allowSlideNext = o);
    },
    loopDestroy: function() {
      const e = this.$wrapperEl;
        const t = this.params;
        const a = this.slides;
      e.children('.' + t.slideClass + '.' + t.slideDuplicateClass).remove(),
        a.removeAttr('data-swiper-slide-index');
    },
  };
  const b = {
    setGrabCursor: function(e) {
      if (
        !(
          p.touch ||
          !this.params.simulateTouch ||
          (this.params.watchOverflow && this.isLocked)
        )
      ) {
        const t = this.el;
        (t.style.cursor = 'move'),
          (t.style.cursor = e ? '-webkit-grabbing' : '-webkit-grab'),
          (t.style.cursor = e ? '-moz-grabbin' : '-moz-grab'),
          (t.style.cursor = e ? 'grabbing' : 'grab');
      }
    },
    unsetGrabCursor: function() {
      p.touch ||
        (this.params.watchOverflow && this.isLocked) ||
        (this.el.style.cursor = '');
    },
  };
  const w = {
      appendSlide: function(e) {
        const t = this;
          const a = t.$wrapperEl;
          const i = t.params;
        if ((i.loop && t.loopDestroy(), 'object' == typeof e && 'length' in e)) {
for (let s = 0; s < e.length; s += 1) e[s] && a.append(e[s]);
} else a.append(e);
        i.loop && t.loopCreate(), (i.observer && p.observer) || t.update();
      },
      prependSlide: function(e) {
        const t = this;
          const a = t.params;
          const i = t.$wrapperEl;
          const s = t.activeIndex;
        a.loop && t.loopDestroy();
        let r = s + 1;
        if ('object' == typeof e && 'length' in e) {
          for (let n = 0; n < e.length; n += 1) e[n] && i.prepend(e[n]);
          r = s + e.length;
        } else i.prepend(e);
        a.loop && t.loopCreate(),
          (a.observer && p.observer) || t.update(),
          t.slideTo(r, 0, !1);
      },
      removeSlide: function(e) {
        const t = this;
          const a = t.params;
          const i = t.$wrapperEl;
          const s = t.activeIndex;
        a.loop &&
          (t.loopDestroy(), (t.slides = i.children('.' + a.slideClass)));
        let r;
          let n = s;
        if ('object' == typeof e && 'length' in e) {
          for (let o = 0; o < e.length; o += 1) {
(r = e[o]),
              t.slides[r] && t.slides.eq(r).remove(),
              r < n && (n -= 1);
}
          n = Math.max(n, 0);
        } else {
(r = e),
            t.slides[r] && t.slides.eq(r).remove(),
            r < n && (n -= 1),
            (n = Math.max(n, 0));
}
        a.loop && t.loopCreate(),
          (a.observer && p.observer) || t.update(),
          a.loop ? t.slideTo(n + t.loopedSlides, 0, !1) : t.slideTo(n, 0, !1);
      },
      removeAllSlides: function() {
        for (var e = [], t = 0; t < this.slides.length; t += 1) e.push(t);
        this.removeSlide(e);
      },
    };
    const y = (function() {
      const a = t.navigator.userAgent;
        const i = {
          ios: !1,
          android: !1,
          androidChrome: !1,
          desktop: !1,
          windows: !1,
          iphone: !1,
          ipod: !1,
          ipad: !1,
          cordova: t.cordova || t.phonegap,
          phonegap: t.cordova || t.phonegap,
        };
        const s = a.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);
        const r = a.match(/(Android);?[\s\/]+([\d.]+)?/);
        const n = a.match(/(iPad).*OS\s([\d_]+)/);
        const o = a.match(/(iPod)(.*OS\s([\d_]+))?/);
        const l = !n && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
      if (
        (s && ((i.os = 'windows'), (i.osVersion = s[2]), (i.windows = !0)),
        r &&
          !s &&
          ((i.os = 'android'),
          (i.osVersion = r[2]),
          (i.android = !0),
          (i.androidChrome = a.toLowerCase().indexOf('chrome') >= 0)),
        (n || l || o) && ((i.os = 'ios'), (i.ios = !0)),
        l && !o && ((i.osVersion = l[2].replace(/_/g, '.')), (i.iphone = !0)),
        n && ((i.osVersion = n[2].replace(/_/g, '.')), (i.ipad = !0)),
        o &&
          ((i.osVersion = o[3] ? o[3].replace(/_/g, '.') : null),
          (i.iphone = !0)),
        i.ios &&
          i.osVersion &&
          a.indexOf('Version/') >= 0 &&
          '10' === i.osVersion.split('.')[0] &&
          (i.osVersion = a.toLowerCase().split('version/')[1].split(' ')[0]),
        (i.desktop = !(i.os || i.android || i.webView)),
        (i.webView = (l || n || o) && a.match(/.*AppleWebKit(?!.*Safari)/i)),
        i.os && 'ios' === i.os)
      ) {
        const d = i.osVersion.split('.');
          const p = e.querySelector('meta[name="viewport"]');
        i.minimalUi =
          !i.webView &&
          (o || l) &&
          (1 * d[0] == 7 ? 1 * d[1] >= 1 : 1 * d[0] > 7) &&
          p &&
          p.getAttribute('content').indexOf('minimal-ui') >= 0;
      }
      return (i.pixelRatio = t.devicePixelRatio || 1), i;
    })();
  function x() {
    const e = this;
      const t = e.params;
      const a = e.el;
    if (!a || 0 !== a.offsetWidth) {
      t.breakpoints && e.setBreakpoint();
      const i = e.allowSlideNext;
        const s = e.allowSlidePrev;
        const r = e.snapGrid;
      if (
        ((e.allowSlideNext = !0),
        (e.allowSlidePrev = !0),
        e.updateSize(),
        e.updateSlides(),
        t.freeMode)
      ) {
        const n = Math.min(
          Math.max(e.translate, e.maxTranslate()),
          e.minTranslate(),
        );
        e.setTranslate(n),
          e.updateActiveIndex(),
          e.updateSlidesClasses(),
          t.autoHeight && e.updateAutoHeight();
      } else {
e.updateSlidesClasses(),
          ('auto' === t.slidesPerView || t.slidesPerView > 1) &&
          e.isEnd &&
          !e.params.centeredSlides ?
            e.slideTo(e.slides.length - 1, 0, !1, !0) :
            e.slideTo(e.activeIndex, 0, !1, !0);
}
      (e.allowSlidePrev = s),
        (e.allowSlideNext = i),
        e.params.watchOverflow && r !== e.snapGrid && e.checkOverflow();
    }
  }
  const E = {
    attachEvents: function() {
      const a = this;
        const s = a.params;
        const r = a.touchEvents;
        const n = a.el;
        const o = a.wrapperEl;
      (a.onTouchStart = function(a) {
        const s = this;
          const r = s.touchEventsData;
          const n = s.params;
          const o = s.touches;
        if (!s.animating || !n.preventIntercationOnTransition) {
          let l = a;
          if (
            (l.originalEvent && (l = l.originalEvent),
            (r.isTouchEvent = 'touchstart' === l.type),
            (r.isTouchEvent || !('which' in l) || 3 !== l.which) &&
              (!r.isTouched || !r.isMoved))
          ) {
if (
              n.noSwiping &&
              i(l.target).closest(
                n.noSwipingSelector ?
                  n.noSwipingSelector :
                  '.' + n.noSwipingClass,
              )[0]
            ) {
s.allowClick = !0;
} else if (!n.swipeHandler || i(l).closest(n.swipeHandler)[0]) {
              (o.currentX =
                'touchstart' === l.type ? l.targetTouches[0].pageX : l.pageX),
                (o.currentY =
                  'touchstart' === l.type ? l.targetTouches[0].pageY : l.pageY);
              const p = o.currentX;
                const c = o.currentY;
              if (
                !(
                  y.ios &&
                  !y.cordova &&
                  n.iOSEdgeSwipeDetection &&
                  p <= n.iOSEdgeSwipeThreshold &&
                  p >= t.screen.width - n.iOSEdgeSwipeThreshold
                )
              ) {
                if (
                  (d.extend(r, {
                    isTouched: !0,
                    isMoved: !1,
                    allowTouchCallbacks: !0,
                    isScrolling: void 0,
                    startMoving: void 0,
                  }),
                  (o.startX = p),
                  (o.startY = c),
                  (r.touchStartTime = d.now()),
                  (s.allowClick = !0),
                  s.updateSize(),
                  (s.swipeDirection = void 0),
                  n.threshold > 0 && (r.allowThresholdMove = !1),
                  'touchstart' !== l.type)
                ) {
                  let u = !0;
                  i(l.target).is(r.formElements) && (u = !1),
                    e.activeElement &&
                      i(e.activeElement).is(r.formElements) &&
                      e.activeElement !== l.target &&
                      e.activeElement.blur(),
                    u && s.allowTouchMove && l.preventDefault();
                }
                s.emit('touchStart', l);
              }
            }
}
        }
      }.bind(a)),
        (a.onTouchMove = function(t) {
          const a = this;
            const s = a.touchEventsData;
            const r = a.params;
            const n = a.touches;
            const o = a.rtlTranslate;
            let l = t;
          if ((l.originalEvent && (l = l.originalEvent), s.isTouched)) {
            if (!s.isTouchEvent || 'mousemove' !== l.type) {
              const p =
                  'touchmove' === l.type ? l.targetTouches[0].pageX : l.pageX;
                const c = 'touchmove' === l.type ? l.targetTouches[0].pageY : l.pageY;
              if (l.preventedByNestedSwiper) {
return (n.startX = p), void (n.startY = c);
}
              if (!a.allowTouchMove) {
return (
                  (a.allowClick = !1),
                  void (
                    s.isTouched &&
                    (d.extend(n, {
                      startX: p,
                      startY: c,
                      currentX: p,
                      currentY: c,
                    }),
                    (s.touchStartTime = d.now()))
                  )
                );
}
              if (s.isTouchEvent && r.touchReleaseOnEdges && !r.loop) {
if (a.isVertical()) {
                  if (
                    (c < n.startY && a.translate <= a.maxTranslate()) ||
                    (c > n.startY && a.translate >= a.minTranslate())
                  ) {
return (s.isTouched = !1), void (s.isMoved = !1);
}
                } else if (
                  (p < n.startX && a.translate <= a.maxTranslate()) ||
                  (p > n.startX && a.translate >= a.minTranslate())
                ) {
return;
}
}
              if (
                s.isTouchEvent &&
                e.activeElement &&
                l.target === e.activeElement &&
                i(l.target).is(s.formElements)
              ) {
return (s.isMoved = !0), void (a.allowClick = !1);
}
              if (
                (s.allowTouchCallbacks && a.emit('touchMove', l),
                !(l.targetTouches && l.targetTouches.length > 1))
              ) {
                (n.currentX = p), (n.currentY = c);
                let u;
                  const h = n.currentX - n.startX;
                  const v = n.currentY - n.startY;
                if (
                  (void 0 === s.isScrolling &&
                    ((a.isHorizontal() && n.currentY === n.startY) ||
                    (a.isVertical() && n.currentX === n.startX) ?
                      (s.isScrolling = !1) :
                      h * h + v * v >= 25 &&
                        ((u =
                          (180 * Math.atan2(Math.abs(v), Math.abs(h))) /
                          Math.PI),
                        (s.isScrolling = a.isHorizontal() ?
                          u > r.touchAngle :
                          90 - u > r.touchAngle))),
                  s.isScrolling && a.emit('touchMoveOpposite', l),
                  'undefined' == typeof startMoving &&
                    ((n.currentX === n.startX && n.currentY === n.startY) ||
                      (s.startMoving = !0)),
                  s.isScrolling)
                ) {
s.isTouched = !1;
} else if (s.startMoving) {
                  (a.allowClick = !1),
                    l.preventDefault(),
                    r.touchMoveStopPropagation &&
                      !r.nested &&
                      l.stopPropagation(),
                    s.isMoved ||
                      (r.loop && a.loopFix(),
                      (s.startTranslate = a.getTranslate()),
                      a.setTransition(0),
                      a.animating &&
                        a.$wrapperEl.trigger(
                          'webkitTransitionEnd transitionend',
                        ),
                      (s.allowMomentumBounce = !1),
                      !r.grabCursor ||
                        (!0 !== a.allowSlideNext && !0 !== a.allowSlidePrev) ||
                        a.setGrabCursor(!0),
                      a.emit('sliderFirstMove', l)),
                    a.emit('sliderMove', l),
                    (s.isMoved = !0);
                  let f = a.isHorizontal() ? h : v;
                  (n.diff = f),
                    (f *= r.touchRatio),
                    o && (f = -f),
                    (a.swipeDirection = f > 0 ? 'prev' : 'next'),
                    (s.currentTranslate = f + s.startTranslate);
                  let m = !0;
                    let g = r.resistanceRatio;
                  if (
                    (r.touchReleaseOnEdges && (g = 0),
                    f > 0 && s.currentTranslate > a.minTranslate() ?
                      ((m = !1),
                        r.resistance &&
                          (s.currentTranslate =
                            a.minTranslate() -
                            1 +
                            Math.pow(
                              -a.minTranslate() + s.startTranslate + f,
                              g,
                            ))) :
                      f < 0 &&
                        s.currentTranslate < a.maxTranslate() &&
                        ((m = !1),
                        r.resistance &&
                          (s.currentTranslate =
                            a.maxTranslate() +
                            1 -
                            Math.pow(
                              a.maxTranslate() - s.startTranslate - f,
                              g,
                            ))),
                    m && (l.preventedByNestedSwiper = !0),
                    !a.allowSlideNext &&
                      'next' === a.swipeDirection &&
                      s.currentTranslate < s.startTranslate &&
                      (s.currentTranslate = s.startTranslate),
                    !a.allowSlidePrev &&
                      'prev' === a.swipeDirection &&
                      s.currentTranslate > s.startTranslate &&
                      (s.currentTranslate = s.startTranslate),
                    r.threshold > 0)
                  ) {
                    if (!(Math.abs(f) > r.threshold || s.allowThresholdMove)) {
return void (s.currentTranslate = s.startTranslate);
}
                    if (!s.allowThresholdMove) {
return (
                        (s.allowThresholdMove = !0),
                        (n.startX = n.currentX),
                        (n.startY = n.currentY),
                        (s.currentTranslate = s.startTranslate),
                        void (n.diff = a.isHorizontal() ?
                          n.currentX - n.startX :
                          n.currentY - n.startY)
                      );
}
                  }
                  r.followFinger &&
                    ((r.freeMode ||
                      r.watchSlidesProgress ||
                      r.watchSlidesVisibility) &&
                      (a.updateActiveIndex(), a.updateSlidesClasses()),
                    r.freeMode &&
                      (0 === s.velocities.length &&
                        s.velocities.push({
                          position: n[a.isHorizontal() ? 'startX' : 'startY'],
                          time: s.touchStartTime,
                        }),
                      s.velocities.push({
                        position: n[a.isHorizontal() ? 'currentX' : 'currentY'],
                        time: d.now(),
                      })),
                    a.updateProgress(s.currentTranslate),
                    a.setTranslate(s.currentTranslate));
                }
              }
            }
          } else {
s.startMoving && s.isScrolling && a.emit('touchMoveOpposite', l);
}
        }.bind(a)),
        (a.onTouchEnd = function(e) {
          const t = this;
            const a = t.touchEventsData;
            const i = t.params;
            const s = t.touches;
            const r = t.rtlTranslate;
            const n = t.$wrapperEl;
            const o = t.slidesGrid;
            const l = t.snapGrid;
            let p = e;
          if (
            (p.originalEvent && (p = p.originalEvent),
            a.allowTouchCallbacks && t.emit('touchEnd', p),
            (a.allowTouchCallbacks = !1),
            !a.isTouched)
          ) {
return (
              a.isMoved && i.grabCursor && t.setGrabCursor(!1),
              (a.isMoved = !1),
              void (a.startMoving = !1)
            );
}
          i.grabCursor &&
            a.isMoved &&
            a.isTouched &&
            (!0 === t.allowSlideNext || !0 === t.allowSlidePrev) &&
            t.setGrabCursor(!1);
          let c;
            const u = d.now();
            const h = u - a.touchStartTime;
          if (
            (t.allowClick &&
              (t.updateClickedSlide(p),
              t.emit('tap', p),
              h < 300 &&
                u - a.lastClickTime > 300 &&
                (a.clickTimeout && clearTimeout(a.clickTimeout),
                (a.clickTimeout = d.nextTick(function() {
                  t && !t.destroyed && t.emit('click', p);
                }, 300))),
              h < 300 &&
                u - a.lastClickTime < 300 &&
                (a.clickTimeout && clearTimeout(a.clickTimeout),
                t.emit('doubleTap', p))),
            (a.lastClickTime = d.now()),
            d.nextTick(function() {
              t.destroyed || (t.allowClick = !0);
            }),
            !a.isTouched ||
              !a.isMoved ||
              !t.swipeDirection ||
              0 === s.diff ||
              a.currentTranslate === a.startTranslate)
          ) {
return (
              (a.isTouched = !1), (a.isMoved = !1), void (a.startMoving = !1)
            );
}
          if (
            ((a.isTouched = !1),
            (a.isMoved = !1),
            (a.startMoving = !1),
            (c = i.followFinger ?
              r ?
                t.translate :
                -t.translate :
              -a.currentTranslate),
            i.freeMode)
          ) {
            if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (c > -t.maxTranslate()) {
return void (t.slides.length < l.length ?
                t.slideTo(l.length - 1) :
                t.slideTo(t.slides.length - 1));
}
            if (i.freeModeMomentum) {
              if (a.velocities.length > 1) {
                const v = a.velocities.pop();
                  const f = a.velocities.pop();
                  const m = v.position - f.position;
                  const g = v.time - f.time;
                (t.velocity = m / g),
                  (t.velocity /= 2),
                  Math.abs(t.velocity) < i.freeModeMinimumVelocity &&
                    (t.velocity = 0),
                  (g > 150 || d.now() - v.time > 300) && (t.velocity = 0);
              } else t.velocity = 0;
              (t.velocity *= i.freeModeMomentumVelocityRatio),
                (a.velocities.length = 0);
              let b = 1e3 * i.freeModeMomentumRatio;
                const w = t.velocity * b;
                let y = t.translate + w;
              r && (y = -y);
              let x;
                let E;
                let T = !1;
                const S = 20 * Math.abs(t.velocity) * i.freeModeMomentumBounceRatio;
              if (y < t.maxTranslate()) {
i.freeModeMomentumBounce ?
                  (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                    (x = t.maxTranslate()),
                    (T = !0),
                    (a.allowMomentumBounce = !0)) :
                  (y = t.maxTranslate()),
                  i.loop && i.centeredSlides && (E = !0);
} else if (y > t.minTranslate()) {
i.freeModeMomentumBounce ?
                  (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                    (x = t.minTranslate()),
                    (T = !0),
                    (a.allowMomentumBounce = !0)) :
                  (y = t.minTranslate()),
                  i.loop && i.centeredSlides && (E = !0);
} else if (i.freeModeSticky) {
                for (var C, M = 0; M < l.length; M += 1) {
if (l[M] > -y) {
                    C = M;
                    break;
                  }
}
                y = -(y =
                  Math.abs(l[C] - y) < Math.abs(l[C - 1] - y) ||
                  'next' === t.swipeDirection ?
                    l[C] :
                    l[C - 1]);
              }
              if (
                (E &&
                  t.once('transitionEnd', function() {
                    t.loopFix();
                  }),
                0 !== t.velocity)
              ) {
b = r ?
                  Math.abs((-y - t.translate) / t.velocity) :
                  Math.abs((y - t.translate) / t.velocity);
} else if (i.freeModeSticky) return void t.slideToClosest();
              i.freeModeMomentumBounce && T ?
                (t.updateProgress(x),
                  t.setTransition(b),
                  t.setTranslate(y),
                  t.transitionStart(!0, t.swipeDirection),
                  (t.animating = !0),
                  n.transitionEnd(function() {
                    t &&
                      !t.destroyed &&
                      a.allowMomentumBounce &&
                      (t.emit('momentumBounce'),
                      t.setTransition(i.speed),
                      t.setTranslate(x),
                      n.transitionEnd(function() {
                        t && !t.destroyed && t.transitionEnd();
                      }));
                  })) :
                t.velocity ?
                (t.updateProgress(y),
                  t.setTransition(b),
                  t.setTranslate(y),
                  t.transitionStart(!0, t.swipeDirection),
                  t.animating ||
                    ((t.animating = !0),
                    n.transitionEnd(function() {
                      t && !t.destroyed && t.transitionEnd();
                    }))) :
                t.updateProgress(y),
                t.updateActiveIndex(),
                t.updateSlidesClasses();
            } else if (i.freeModeSticky) return void t.slideToClosest();
            (!i.freeModeMomentum || h >= i.longSwipesMs) &&
              (t.updateProgress(),
              t.updateActiveIndex(),
              t.updateSlidesClasses());
          } else {
            for (
              var z = 0, k = t.slidesSizesGrid[0], P = 0;
              P < o.length;
              P += i.slidesPerGroup
            ) {
void 0 !== o[P + i.slidesPerGroup] ?
                c >= o[P] &&
                  c < o[P + i.slidesPerGroup] &&
                  ((z = P), (k = o[P + i.slidesPerGroup] - o[P])) :
                c >= o[P] &&
                  ((z = P), (k = o[o.length - 1] - o[o.length - 2]));
}
            const $ = (c - o[z]) / k;
            if (h > i.longSwipesMs) {
              if (!i.longSwipes) return void t.slideTo(t.activeIndex);
              'next' === t.swipeDirection &&
                ($ >= i.longSwipesRatio ?
                  t.slideTo(z + i.slidesPerGroup) :
                  t.slideTo(z)),
                'prev' === t.swipeDirection &&
                  ($ > 1 - i.longSwipesRatio ?
                    t.slideTo(z + i.slidesPerGroup) :
                    t.slideTo(z));
            } else {
              if (!i.shortSwipes) return void t.slideTo(t.activeIndex);
              'next' === t.swipeDirection && t.slideTo(z + i.slidesPerGroup),
                'prev' === t.swipeDirection && t.slideTo(z);
            }
          }
        }.bind(a)),
        (a.onClick = function(e) {
          this.allowClick ||
            (this.params.preventClicks && e.preventDefault(),
            this.params.preventClicksPropagation &&
              this.animating &&
              (e.stopPropagation(), e.stopImmediatePropagation()));
        }.bind(a));
      const l = 'container' === s.touchEventsTarget ? n : o;
        const c = !!s.nested;
      if (p.touch || (!p.pointerEvents && !p.prefixedPointerEvents)) {
        if (p.touch) {
          const u = !(
            'touchstart' !== r.start ||
            !p.passiveListener ||
            !s.passiveListeners
          ) && {passive: !0, capture: !1};
          l.addEventListener(r.start, a.onTouchStart, u),
            l.addEventListener(
              r.move,
              a.onTouchMove,
              p.passiveListener ? {passive: !1, capture: c} : c,
            ),
            l.addEventListener(r.end, a.onTouchEnd, u);
        }
        ((s.simulateTouch && !y.ios && !y.android) ||
          (s.simulateTouch && !p.touch && y.ios)) &&
          (l.addEventListener('mousedown', a.onTouchStart, !1),
          e.addEventListener('mousemove', a.onTouchMove, c),
          e.addEventListener('mouseup', a.onTouchEnd, !1));
      } else {
l.addEventListener(r.start, a.onTouchStart, !1),
          e.addEventListener(r.move, a.onTouchMove, c),
          e.addEventListener(r.end, a.onTouchEnd, !1);
}
      (s.preventClicks || s.preventClicksPropagation) &&
        l.addEventListener('click', a.onClick, !0),
        a.on('resize observerUpdate', x, !0);
    },
    detachEvents: function() {
      const t = this;
        const a = t.params;
        const i = t.touchEvents;
        const s = t.el;
        const r = t.wrapperEl;
        const n = 'container' === a.touchEventsTarget ? s : r;
        const o = !!a.nested;
      if (p.touch || (!p.pointerEvents && !p.prefixedPointerEvents)) {
        if (p.touch) {
          const l = !(
            'onTouchStart' !== i.start ||
            !p.passiveListener ||
            !a.passiveListeners
          ) && {passive: !0, capture: !1};
          n.removeEventListener(i.start, t.onTouchStart, l),
            n.removeEventListener(i.move, t.onTouchMove, o),
            n.removeEventListener(i.end, t.onTouchEnd, l);
        }
        ((a.simulateTouch && !y.ios && !y.android) ||
          (a.simulateTouch && !p.touch && y.ios)) &&
          (n.removeEventListener('mousedown', t.onTouchStart, !1),
          e.removeEventListener('mousemove', t.onTouchMove, o),
          e.removeEventListener('mouseup', t.onTouchEnd, !1));
      } else {
n.removeEventListener(i.start, t.onTouchStart, !1),
          e.removeEventListener(i.move, t.onTouchMove, o),
          e.removeEventListener(i.end, t.onTouchEnd, !1);
}
      (a.preventClicks || a.preventClicksPropagation) &&
        n.removeEventListener('click', t.onClick, !0),
        t.off('resize observerUpdate', x);
    },
  };
  const T = {
      setBreakpoint: function() {
        const e = this;
          const t = e.activeIndex;
          const a = e.initialized;
          let i = e.loopedSlides;
        void 0 === i && (i = 0);
        const s = e.params;
          const r = s.breakpoints;
        if (r && (!r || 0 !== Object.keys(r).length)) {
          const n = e.getBreakpoint(r);
          if (n && e.currentBreakpoint !== n) {
            const o = n in r ? r[n] : e.originalParams;
              const l = s.loop && o.slidesPerView !== s.slidesPerView;
            d.extend(e.params, o),
              d.extend(e, {
                allowTouchMove: e.params.allowTouchMove,
                allowSlideNext: e.params.allowSlideNext,
                allowSlidePrev: e.params.allowSlidePrev,
              }),
              (e.currentBreakpoint = n),
              l &&
                a &&
                (e.loopDestroy(),
                e.loopCreate(),
                e.updateSlides(),
                e.slideTo(t - i + e.loopedSlides, 0, !1)),
              e.emit('breakpoint', o);
          }
        }
      },
      getBreakpoint: function(e) {
        if (e) {
          let a = !1;
            const i = [];
          Object.keys(e).forEach(function(e) {
            i.push(e);
          }),
            i.sort(function(e, t) {
              return parseInt(e, 10) - parseInt(t, 10);
            });
          for (let s = 0; s < i.length; s += 1) {
            const r = i[s];
            r >= t.innerWidth && !a && (a = r);
          }
          return a || 'max';
        }
      },
    };
    const S = (function() {
      return {
        isIE:
          !!t.navigator.userAgent.match(/Trident/g) ||
          !!t.navigator.userAgent.match(/MSIE/g),
        isSafari:
          ((e = t.navigator.userAgent.toLowerCase()),
          e.indexOf('safari') >= 0 &&
            e.indexOf('chrome') < 0 &&
            e.indexOf('android') < 0),
        isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
          t.navigator.userAgent,
        ),
      };
    })();
  const C = {
      init: !0,
      direction: 'horizontal',
      touchEventsTarget: 'container',
      initialSlide: 0,
      speed: 300,
      preventIntercationOnTransition: !1,
      iOSEdgeSwipeDetection: !1,
      iOSEdgeSwipeThreshold: 20,
      freeMode: !1,
      freeModeMomentum: !0,
      freeModeMomentumRatio: 1,
      freeModeMomentumBounce: !0,
      freeModeMomentumBounceRatio: 1,
      freeModeMomentumVelocityRatio: 1,
      freeModeSticky: !1,
      freeModeMinimumVelocity: 0.02,
      autoHeight: !1,
      setWrapperSize: !1,
      virtualTranslate: !1,
      effect: 'slide',
      breakpoints: void 0,
      spaceBetween: 0,
      slidesPerView: 1,
      slidesPerColumn: 1,
      slidesPerColumnFill: 'column',
      slidesPerGroup: 1,
      centeredSlides: !1,
      slidesOffsetBefore: 0,
      slidesOffsetAfter: 0,
      normalizeSlideIndex: !0,
      watchOverflow: !1,
      roundLengths: !1,
      touchRatio: 1,
      touchAngle: 45,
      simulateTouch: !0,
      shortSwipes: !0,
      longSwipes: !0,
      longSwipesRatio: 0.5,
      longSwipesMs: 300,
      followFinger: !0,
      allowTouchMove: !0,
      threshold: 0,
      touchMoveStopPropagation: !0,
      touchReleaseOnEdges: !1,
      uniqueNavElements: !0,
      resistance: !0,
      resistanceRatio: 0.85,
      watchSlidesProgress: !1,
      watchSlidesVisibility: !1,
      grabCursor: !1,
      preventClicks: !0,
      preventClicksPropagation: !0,
      slideToClickedSlide: !1,
      preloadImages: !0,
      updateOnImagesReady: !0,
      loop: !1,
      loopAdditionalSlides: 0,
      loopedSlides: null,
      loopFillGroupWithBlank: !1,
      allowSlidePrev: !0,
      allowSlideNext: !0,
      swipeHandler: null,
      noSwiping: !0,
      noSwipingClass: 'swiper-no-swiping',
      noSwipingSelector: null,
      passiveListeners: !0,
      containerModifierClass: 'swiper-container-',
      slideClass: 'swiper-slide',
      slideBlankClass: 'swiper-slide-invisible-blank',
      slideActiveClass: 'swiper-slide-active',
      slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
      slideVisibleClass: 'swiper-slide-visible',
      slideDuplicateClass: 'swiper-slide-duplicate',
      slideNextClass: 'swiper-slide-next',
      slideDuplicateNextClass: 'swiper-slide-duplicate-next',
      slidePrevClass: 'swiper-slide-prev',
      slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
      wrapperClass: 'swiper-wrapper',
      runCallbacksOnInit: !0,
    };
    const M = {
      update: h,
      translate: v,
      transition: f,
      slide: m,
      loop: g,
      grabCursor: b,
      manipulation: w,
      events: E,
      breakpoints: T,
      checkOverflow: {
        checkOverflow: function() {
          const e = this;
            const t = e.isLocked;
          (e.isLocked = 1 === e.snapGrid.length),
            (e.allowSlideNext = !e.isLocked),
            (e.allowSlidePrev = !e.isLocked),
            t !== e.isLocked && e.emit(e.isLocked ? 'lock' : 'unlock'),
            t && t !== e.isLocked && ((e.isEnd = !1), e.navigation.update());
        },
      },
      classes: {
        addClasses: function() {
          const e = this.classNames;
            const t = this.params;
            const a = this.rtl;
            const i = this.$el;
            const s = [];
          s.push(t.direction),
            t.freeMode && s.push('free-mode'),
            p.flexbox || s.push('no-flexbox'),
            t.autoHeight && s.push('autoheight'),
            a && s.push('rtl'),
            t.slidesPerColumn > 1 && s.push('multirow'),
            y.android && s.push('android'),
            y.ios && s.push('ios'),
            S.isIE &&
              (p.pointerEvents || p.prefixedPointerEvents) &&
              s.push('wp8-' + t.direction),
            s.forEach(function(a) {
              e.push(t.containerModifierClass + a);
            }),
            i.addClass(e.join(' '));
        },
        removeClasses: function() {
          const e = this.$el;
            const t = this.classNames;
          e.removeClass(t.join(' '));
        },
      },
      images: {
        loadImage: function(e, a, i, s, r, n) {
          let o;
          function l() {
            n && n();
          }
          e.complete && r ?
            l() :
            a ?
            (((o = new t.Image()).onload = l),
              (o.onerror = l),
              s && (o.sizes = s),
              i && (o.srcset = i),
              a && (o.src = a)) :
            l();
        },
        preloadImages: function() {
          const e = this;
          function t() {
            void 0 !== e &&
              null !== e &&
              e &&
              !e.destroyed &&
              (void 0 !== e.imagesLoaded && (e.imagesLoaded += 1),
              e.imagesLoaded === e.imagesToLoad.length &&
                (e.params.updateOnImagesReady && e.update(),
                e.emit('imagesReady')));
          }
          e.imagesToLoad = e.$el.find('img');
          for (let a = 0; a < e.imagesToLoad.length; a += 1) {
            const i = e.imagesToLoad[a];
            e.loadImage(
              i,
              i.currentSrc || i.getAttribute('src'),
              i.srcset || i.getAttribute('srcset'),
              i.sizes || i.getAttribute('sizes'),
              !0,
              t,
            );
          }
        },
      },
    };
    const z = {};
    const k = (function(e) {
      function t() {
        for (var a, s, r, n = [], o = arguments.length; o--; ) {
n[o] = arguments[o];
}
        1 === n.length && n[0].constructor && n[0].constructor === Object ?
          (r = n[0]) :
          ((s = (a = n)[0]), (r = a[1])),
          r || (r = {}),
          (r = d.extend({}, r)),
          s && !r.el && (r.el = s),
          e.call(this, r),
          Object.keys(M).forEach(function(e) {
            Object.keys(M[e]).forEach(function(a) {
              t.prototype[a] || (t.prototype[a] = M[e][a]);
            });
          });
        const l = this;
        void 0 === l.modules && (l.modules = {}),
          Object.keys(l.modules).forEach(function(e) {
            const t = l.modules[e];
            if (t.params) {
              const a = Object.keys(t.params)[0];
                const i = t.params[a];
              if ('object' != typeof i) return;
              if (!(a in r && 'enabled' in i)) return;
              !0 === r[a] && (r[a] = {enabled: !0}),
                'object' != typeof r[a] ||
                  'enabled' in r[a] ||
                  (r[a].enabled = !0),
                r[a] || (r[a] = {enabled: !1});
            }
          });
        const c = d.extend({}, C);
        l.useModulesParams(c),
          (l.params = d.extend({}, c, z, r)),
          (l.originalParams = d.extend({}, l.params)),
          (l.passedParams = d.extend({}, r)),
          (l.$ = i);
        const u = i(l.params.el);
        if ((s = u[0])) {
          if (u.length > 1) {
            const h = [];
            return (
              u.each(function(e, a) {
                const i = d.extend({}, r, {el: a});
                h.push(new t(i));
              }),
              h
            );
          }
          (s.swiper = l), u.data('swiper', l);
          let v;
            let f;
            const m = u.children('.' + l.params.wrapperClass);
          return (
            d.extend(l, {
              $el: u,
              el: s,
              $wrapperEl: m,
              wrapperEl: m[0],
              classNames: [],
              slides: i(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: function() {
                return 'horizontal' === l.params.direction;
              },
              isVertical: function() {
                return 'vertical' === l.params.direction;
              },
              rtl:
                'rtl' === s.dir.toLowerCase() || 'rtl' === u.css('direction'),
              rtlTranslate:
                'horizontal' === l.params.direction &&
                ('rtl' === s.dir.toLowerCase() || 'rtl' === u.css('direction')),
              wrongRTL: '-webkit-box' === m.css('display'),
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: l.params.allowSlideNext,
              allowSlidePrev: l.params.allowSlidePrev,
              touchEvents:
                ((v = ['touchstart', 'touchmove', 'touchend']),
                (f = ['mousedown', 'mousemove', 'mouseup']),
                p.pointerEvents ?
                  (f = ['pointerdown', 'pointermove', 'pointerup']) :
                  p.prefixedPointerEvents &&
                    (f = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp']),
                (l.touchEventsTouch = {start: v[0], move: v[1], end: v[2]}),
                (l.touchEventsDesktop = {start: f[0], move: f[1], end: f[2]}),
                p.touch || !l.params.simulateTouch ?
                  l.touchEventsTouch :
                  l.touchEventsDesktop),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                formElements: 'input, select, option, textarea, button, video',
                lastClickTime: d.now(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: l.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            l.useModules(),
            l.params.init && l.init(),
            l
          );
        }
      }
      e && (t.__proto__ = e),
        (t.prototype = Object.create(e && e.prototype)),
        (t.prototype.constructor = t);
      const a = {
        extendedDefaults: {configurable: !0},
        defaults: {configurable: !0},
        Class: {configurable: !0},
        $: {configurable: !0},
      };
      return (
        (t.prototype.slidesPerViewDynamic = function() {
          const e = this;
            const t = e.params;
            const a = e.slides;
            const i = e.slidesGrid;
            const s = e.size;
            const r = e.activeIndex;
            let n = 1;
          if (t.centeredSlides) {
            for (
              var o, l = a[r].swiperSlideSize, d = r + 1;
              d < a.length;
              d += 1
            ) {
a[d] &&
                !o &&
                ((n += 1), (l += a[d].swiperSlideSize) > s && (o = !0));
}
            for (let p = r - 1; p >= 0; p -= 1) {
a[p] &&
                !o &&
                ((n += 1), (l += a[p].swiperSlideSize) > s && (o = !0));
}
          } else {
for (let c = r + 1; c < a.length; c += 1) {
i[c] - i[r] < s && (n += 1);
}
}
          return n;
        }),
        (t.prototype.update = function() {
          const e = this;
          if (e && !e.destroyed) {
            const t = e.snapGrid;
              const a = e.params;
            a.breakpoints && e.setBreakpoint(),
              e.updateSize(),
              e.updateSlides(),
              e.updateProgress(),
              e.updateSlidesClasses(),
              e.params.freeMode ?
                (i(), e.params.autoHeight && e.updateAutoHeight()) :
                (('auto' === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides ?
                    e.slideTo(e.slides.length - 1, 0, !1, !0) :
                    e.slideTo(e.activeIndex, 0, !1, !0)) || i(),
              a.watchOverflow && t !== e.snapGrid && e.checkOverflow(),
              e.emit('update');
          }
          function i() {
            const t = e.rtlTranslate ? -1 * e.translate : e.translate;
              const a = Math.min(Math.max(t, e.maxTranslate()), e.minTranslate());
            e.setTranslate(a), e.updateActiveIndex(), e.updateSlidesClasses();
          }
        }),
        (t.prototype.init = function() {
          const e = this;
          e.initialized ||
            (e.emit('beforeInit'),
            e.params.breakpoints && e.setBreakpoint(),
            e.addClasses(),
            e.params.loop && e.loopCreate(),
            e.updateSize(),
            e.updateSlides(),
            e.params.watchOverflow && e.checkOverflow(),
            e.params.grabCursor && e.setGrabCursor(),
            e.params.preloadImages && e.preloadImages(),
            e.params.loop ?
              e.slideTo(
                  e.params.initialSlide + e.loopedSlides,
                  0,
                  e.params.runCallbacksOnInit,
                ) :
              e.slideTo(
                  e.params.initialSlide,
                  0,
                  e.params.runCallbacksOnInit,
                ),
            e.attachEvents(),
            (e.initialized = !0),
            e.emit('init'));
        }),
        (t.prototype.destroy = function(e, t) {
          void 0 === e && (e = !0), void 0 === t && (t = !0);
          const a = this;
            const i = a.params;
            const s = a.$el;
            const r = a.$wrapperEl;
            const n = a.slides;
          return void 0 === a.params || a.destroyed ?
            null :
            (a.emit('beforeDestroy'),
              (a.initialized = !1),
              a.detachEvents(),
              i.loop && a.loopDestroy(),
              t &&
                (a.removeClasses(),
                s.removeAttr('style'),
                r.removeAttr('style'),
                n &&
                  n.length &&
                  n
                    .removeClass(
                      [
                        i.slideVisibleClass,
                        i.slideActiveClass,
                        i.slideNextClass,
                        i.slidePrevClass,
                      ].join(' '),
                    )
                    .removeAttr('style')
                    .removeAttr('data-swiper-slide-index')
                    .removeAttr('data-swiper-column')
                    .removeAttr('data-swiper-row')),
              a.emit('destroy'),
              Object.keys(a.eventsListeners).forEach(function(e) {
                a.off(e);
              }),
              !1 !== e &&
                ((a.$el[0].swiper = null),
                a.$el.data('swiper', null),
                d.deleteProps(a)),
              (a.destroyed = !0),
              null);
        }),
        (t.extendDefaults = function(e) {
          d.extend(z, e);
        }),
        (a.extendedDefaults.get = function() {
          return z;
        }),
        (a.defaults.get = function() {
          return C;
        }),
        (a.Class.get = function() {
          return e;
        }),
        (a.$.get = function() {
          return i;
        }),
        Object.defineProperties(t, a),
        t
      );
    })(c);
    const P = {name: 'device', proto: {device: y}, static: {device: y}};
    const $ = {name: 'support', proto: {support: p}, static: {support: p}};
    const L = {name: 'browser', proto: {browser: S}, static: {browser: S}};
    const I = {
      name: 'resize',
      create: function() {
        const e = this;
        d.extend(e, {
          resize: {
            resizeHandler: function() {
              e &&
                !e.destroyed &&
                e.initialized &&
                (e.emit('beforeResize'), e.emit('resize'));
            },
            orientationChangeHandler: function() {
              e && !e.destroyed && e.initialized && e.emit('orientationchange');
            },
          },
        });
      },
      on: {
        init: function() {
          t.addEventListener('resize', this.resize.resizeHandler),
            t.addEventListener(
              'orientationchange',
              this.resize.orientationChangeHandler,
            );
        },
        destroy: function() {
          t.removeEventListener('resize', this.resize.resizeHandler),
            t.removeEventListener(
              'orientationchange',
              this.resize.orientationChangeHandler,
            );
        },
      },
    };
    var D = {
      func: t.MutationObserver || t.WebkitMutationObserver,
      attach: function(e, t) {
        void 0 === t && (t = {});
        const a = this;
          const i = new (0, D.func)(function(e) {
            e.forEach(function(e) {
              a.emit('observerUpdate', e);
            });
          });
        i.observe(e, {
          attributes: void 0 === t.attributes || t.attributes,
          childList: void 0 === t.childList || t.childList,
          characterData: void 0 === t.characterData || t.characterData,
        }),
          a.observer.observers.push(i);
      },
      init: function() {
        const e = this;
        if (p.observer && e.params.observer) {
          if (e.params.observeParents) {
for (let t = e.$el.parents(), a = 0; a < t.length; a += 1) {
e.observer.attach(t[a]);
}
}
          e.observer.attach(e.$el[0], {childList: !1}),
            e.observer.attach(e.$wrapperEl[0], {attributes: !1});
        }
      },
      destroy: function() {
        this.observer.observers.forEach(function(e) {
          e.disconnect();
        }),
          (this.observer.observers = []);
      },
    };
    const O = {
      name: 'observer',
      params: {observer: !1, observeParents: !1},
      create: function() {
        d.extend(this, {
          observer: {
            init: D.init.bind(this),
            attach: D.attach.bind(this),
            destroy: D.destroy.bind(this),
            observers: [],
          },
        });
      },
      on: {
        init: function() {
          this.observer.init();
        },
        destroy: function() {
          this.observer.destroy();
        },
      },
    };
    const A = {
      update: function(e) {
        const t = this;
          const a = t.params;
          const i = a.slidesPerView;
          const s = a.slidesPerGroup;
          const r = a.centeredSlides;
          const n = t.virtual;
          const o = n.from;
          const l = n.to;
          const p = n.slides;
          const c = n.slidesGrid;
          const u = n.renderSlide;
          const h = n.offset;
        t.updateActiveIndex();
        let v;
          let f;
          let m;
          const g = t.activeIndex || 0;
        (v = t.rtlTranslate ? 'right' : t.isHorizontal() ? 'left' : 'top'),
          r ?
            ((f = Math.floor(i / 2) + s), (m = Math.floor(i / 2) + s)) :
            ((f = i + (s - 1)), (m = s));
        const b = Math.max((g || 0) - m, 0);
          const w = Math.min((g || 0) + f, p.length - 1);
          const y = (t.slidesGrid[b] || 0) - (t.slidesGrid[0] || 0);
        function x() {
          t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.lazy && t.params.lazy.enabled && t.lazy.load();
        }
        if (
          (d.extend(t.virtual, {
            from: b,
            to: w,
            offset: y,
            slidesGrid: t.slidesGrid,
          }),
          o === b && l === w && !e)
        ) {
return (
            t.slidesGrid !== c && y !== h && t.slides.css(v, y + 'px'),
            void t.updateProgress()
          );
}
        if (t.params.virtual.renderExternal) {
return (
            t.params.virtual.renderExternal.call(t, {
              offset: y,
              from: b,
              to: w,
              slides: (function() {
                for (var e = [], t = b; t <= w; t += 1) e.push(p[t]);
                return e;
              })(),
            }),
            void x()
          );
}
        const E = [];
          const T = [];
        if (e) t.$wrapperEl.find('.' + t.params.slideClass).remove();
        else {
for (let S = o; S <= l; S += 1) {
(S < b || S > w) &&
              t.$wrapperEl
                .find(
                  '.' +
                    t.params.slideClass +
                    '[data-swiper-slide-index="' +
                    S +
                    '"]',
                )
                .remove();
}
}
        for (let C = 0; C < p.length; C += 1) {
C >= b &&
            C <= w &&
            (void 0 === l || e ?
              T.push(C) :
              (C > l && T.push(C), C < o && E.push(C)));
}
        T.forEach(function(e) {
          t.$wrapperEl.append(u(p[e], e));
        }),
          E.sort(function(e, t) {
            return e < t;
          }).forEach(function(e) {
            t.$wrapperEl.prepend(u(p[e], e));
          }),
          t.$wrapperEl.children('.swiper-slide').css(v, y + 'px'),
          x();
      },
      renderSlide: function(e, t) {
        const a = this;
          const s = a.params.virtual;
        if (s.cache && a.virtual.cache[t]) return a.virtual.cache[t];
        const r = s.renderSlide ?
          i(s.renderSlide.call(a, e, t)) :
          i(
              '<div class="' +
                a.params.slideClass +
                '" data-swiper-slide-index="' +
                t +
                '">' +
                e +
                '</div>',
            );
        return (
          r.attr('data-swiper-slide-index') ||
            r.attr('data-swiper-slide-index', t),
          s.cache && (a.virtual.cache[t] = r),
          r
        );
      },
      appendSlide: function(e) {
        this.virtual.slides.push(e), this.virtual.update(!0);
      },
      prependSlide: function(e) {
        const t = this;
        if ((t.virtual.slides.unshift(e), t.params.virtual.cache)) {
          const a = t.virtual.cache;
            const i = {};
          Object.keys(a).forEach(function(e) {
            i[e + 1] = a[e];
          }),
            (t.virtual.cache = i);
        }
        t.virtual.update(!0), t.slideNext(0);
      },
    };
    const G = {
      name: 'virtual',
      params: {
        virtual: {
          enabled: !1,
          slides: [],
          cache: !0,
          renderSlide: null,
          renderExternal: null,
        },
      },
      create: function() {
        const e = this;
        d.extend(e, {
          virtual: {
            update: A.update.bind(e),
            appendSlide: A.appendSlide.bind(e),
            prependSlide: A.prependSlide.bind(e),
            renderSlide: A.renderSlide.bind(e),
            slides: e.params.virtual.slides,
            cache: {},
          },
        });
      },
      on: {
        beforeInit: function() {
          const e = this;
          if (e.params.virtual.enabled) {
            e.classNames.push(e.params.containerModifierClass + 'virtual');
            const t = {watchSlidesProgress: !0};
            d.extend(e.params, t),
              d.extend(e.originalParams, t),
              e.virtual.update();
          }
        },
        setTranslate: function() {
          this.params.virtual.enabled && this.virtual.update();
        },
      },
    };
    const H = {
      handle: function(a) {
        const i = this;
          const s = i.rtlTranslate;
          let r = a;
        r.originalEvent && (r = r.originalEvent);
        const n = r.keyCode || r.charCode;
        if (
          !i.allowSlideNext &&
          ((i.isHorizontal() && 39 === n) || (i.isVertical() && 40 === n))
        ) {
return !1;
}
        if (
          !i.allowSlidePrev &&
          ((i.isHorizontal() && 37 === n) || (i.isVertical() && 38 === n))
        ) {
return !1;
}
        if (
          !(
            r.shiftKey ||
            r.altKey ||
            r.ctrlKey ||
            r.metaKey ||
            (e.activeElement &&
              e.activeElement.nodeName &&
              ('input' === e.activeElement.nodeName.toLowerCase() ||
                'textarea' === e.activeElement.nodeName.toLowerCase()))
          )
        ) {
          if (
            i.params.keyboard.onlyInViewport &&
            (37 === n || 39 === n || 38 === n || 40 === n)
          ) {
            let o = !1;
            if (
              i.$el.parents('.' + i.params.slideClass).length > 0 &&
              0 === i.$el.parents('.' + i.params.slideActiveClass).length
            ) {
return;
}
            const l = t.innerWidth;
              const d = t.innerHeight;
              const p = i.$el.offset();
            s && (p.left -= i.$el[0].scrollLeft);
            for (
              let c = [
                  [p.left, p.top],
                  [p.left + i.width, p.top],
                  [p.left, p.top + i.height],
                  [p.left + i.width, p.top + i.height],
                ],
                u = 0;
              u < c.length;
              u += 1
            ) {
              const h = c[u];
              h[0] >= 0 && h[0] <= l && h[1] >= 0 && h[1] <= d && (o = !0);
            }
            if (!o) return;
          }
          i.isHorizontal() ?
            ((37 !== n && 39 !== n) ||
                (r.preventDefault ? r.preventDefault() : (r.returnValue = !1)),
              ((39 === n && !s) || (37 === n && s)) && i.slideNext(),
              ((37 === n && !s) || (39 === n && s)) && i.slidePrev()) :
            ((38 !== n && 40 !== n) ||
                (r.preventDefault ? r.preventDefault() : (r.returnValue = !1)),
              40 === n && i.slideNext(),
              38 === n && i.slidePrev()),
            i.emit('keyPress', n);
        }
      },
      enable: function() {
        this.keyboard.enabled ||
          (i(e).on('keydown', this.keyboard.handle),
          (this.keyboard.enabled = !0));
      },
      disable: function() {
        this.keyboard.enabled &&
          (i(e).off('keydown', this.keyboard.handle),
          (this.keyboard.enabled = !1));
      },
    };
    const N = {
      name: 'keyboard',
      params: {keyboard: {enabled: !1, onlyInViewport: !0}},
      create: function() {
        d.extend(this, {
          keyboard: {
            enabled: !1,
            enable: H.enable.bind(this),
            disable: H.disable.bind(this),
            handle: H.handle.bind(this),
          },
        });
      },
      on: {
        init: function() {
          this.params.keyboard.enabled && this.keyboard.enable();
        },
        destroy: function() {
          this.keyboard.enabled && this.keyboard.disable();
        },
      },
    };
  var B = {
      lastScrollTime: d.now(),
      event:
        t.navigator.userAgent.indexOf('firefox') > -1 ?
          'DOMMouseScroll' :
          (function() {
              const t = 'onwheel';
                let a = t in e;
              if (!a) {
                const i = e.createElement('div');
                i.setAttribute(t, 'return;'), (a = 'function' == typeof i[t]);
              }
              return (
                !a &&
                  e.implementation &&
                  e.implementation.hasFeature &&
                  !0 !== e.implementation.hasFeature('', '') &&
                  (a = e.implementation.hasFeature('Events.wheel', '3.0')),
                a
              );
            })() ?
          'wheel' :
          'mousewheel',
      normalize: function(e) {
        let t = 0;
          let a = 0;
          let i = 0;
          let s = 0;
        return (
          'detail' in e && (a = e.detail),
          'wheelDelta' in e && (a = -e.wheelDelta / 120),
          'wheelDeltaY' in e && (a = -e.wheelDeltaY / 120),
          'wheelDeltaX' in e && (t = -e.wheelDeltaX / 120),
          'axis' in e && e.axis === e.HORIZONTAL_AXIS && ((t = a), (a = 0)),
          (i = 10 * t),
          (s = 10 * a),
          'deltaY' in e && (s = e.deltaY),
          'deltaX' in e && (i = e.deltaX),
          (i || s) &&
            e.deltaMode &&
            (1 === e.deltaMode ?
              ((i *= 40), (s *= 40)) :
              ((i *= 800), (s *= 800))),
          i && !t && (t = i < 1 ? -1 : 1),
          s && !a && (a = s < 1 ? -1 : 1),
          {spinX: t, spinY: a, pixelX: i, pixelY: s}
        );
      },
      handleMouseEnter: function() {
        this.mouseEntered = !0;
      },
      handleMouseLeave: function() {
        this.mouseEntered = !1;
      },
      handle: function(e) {
        let a = e;
          const i = this;
          const s = i.params.mousewheel;
        if (!i.mouseEntered && !s.releaseOnEdges) return !0;
        a.originalEvent && (a = a.originalEvent);
        let r = 0;
          const n = i.rtlTranslate ? -1 : 1;
          const o = B.normalize(a);
        if (s.forceToAxis) {
if (i.isHorizontal()) {
            if (!(Math.abs(o.pixelX) > Math.abs(o.pixelY))) return !0;
            r = o.pixelX * n;
          } else {
            if (!(Math.abs(o.pixelY) > Math.abs(o.pixelX))) return !0;
            r = o.pixelY;
          }
} else {
r =
            Math.abs(o.pixelX) > Math.abs(o.pixelY) ? -o.pixelX * n : -o.pixelY;
}
        if (0 === r) return !0;
        if ((s.invert && (r = -r), i.params.freeMode)) {
          i.params.loop && i.loopFix();
          let l = i.getTranslate() + r * s.sensitivity;
            const p = i.isBeginning;
            const c = i.isEnd;
          if (
            (l >= i.minTranslate() && (l = i.minTranslate()),
            l <= i.maxTranslate() && (l = i.maxTranslate()),
            i.setTransition(0),
            i.setTranslate(l),
            i.updateProgress(),
            i.updateActiveIndex(),
            i.updateSlidesClasses(),
            ((!p && i.isBeginning) || (!c && i.isEnd)) &&
              i.updateSlidesClasses(),
            i.params.freeModeSticky &&
              (clearTimeout(i.mousewheel.timeout),
              (i.mousewheel.timeout = d.nextTick(function() {
                i.slideToClosest();
              }, 300))),
            i.emit('scroll', a),
            i.params.autoplay &&
              i.params.autoplayDisableOnInteraction &&
              i.stopAutoplay(),
            l === i.minTranslate() || l === i.maxTranslate())
          ) {
return !0;
}
        } else {
          if (d.now() - i.mousewheel.lastScrollTime > 60) {
if (r < 0) {
if ((i.isEnd && !i.params.loop) || i.animating) {
                if (s.releaseOnEdges) return !0;
              } else i.slideNext(), i.emit('scroll', a);
} else if ((i.isBeginning && !i.params.loop) || i.animating) {
              if (s.releaseOnEdges) return !0;
            } else i.slidePrev(), i.emit('scroll', a);
}
          i.mousewheel.lastScrollTime = new t.Date().getTime();
        }
        return a.preventDefault ? a.preventDefault() : (a.returnValue = !1), !1;
      },
      enable: function() {
        const e = this;
        if (!B.event) return !1;
        if (e.mousewheel.enabled) return !1;
        let t = e.$el;
        return (
          'container' !== e.params.mousewheel.eventsTarged &&
            (t = i(e.params.mousewheel.eventsTarged)),
          t.on('mouseenter', e.mousewheel.handleMouseEnter),
          t.on('mouseleave', e.mousewheel.handleMouseLeave),
          t.on(B.event, e.mousewheel.handle),
          (e.mousewheel.enabled = !0),
          !0
        );
      },
      disable: function() {
        const e = this;
        if (!B.event) return !1;
        if (!e.mousewheel.enabled) return !1;
        let t = e.$el;
        return (
          'container' !== e.params.mousewheel.eventsTarged &&
            (t = i(e.params.mousewheel.eventsTarged)),
          t.off(B.event, e.mousewheel.handle),
          (e.mousewheel.enabled = !1),
          !0
        );
      },
    };
    const X = {
      update: function() {
        const e = this;
          const t = e.params.navigation;
        if (!e.params.loop) {
          const a = e.navigation;
            const i = a.$nextEl;
            const s = a.$prevEl;
          s &&
            s.length > 0 &&
            (e.isBeginning ?
              s.addClass(t.disabledClass) :
              s.removeClass(t.disabledClass),
            s[
              e.params.watchOverflow && e.isLocked ? 'addClass' : 'removeClass'
            ](t.lockClass)),
            i &&
              i.length > 0 &&
              (e.isEnd ?
                i.addClass(t.disabledClass) :
                i.removeClass(t.disabledClass),
              i[
                e.params.watchOverflow && e.isLocked ?
                  'addClass' :
                  'removeClass'
              ](t.lockClass));
        }
      },
      init: function() {
        let e;
          let t;
          const a = this;
          const s = a.params.navigation;
        (s.nextEl || s.prevEl) &&
          (s.nextEl &&
            ((e = i(s.nextEl)),
            a.params.uniqueNavElements &&
              'string' == typeof s.nextEl &&
              e.length > 1 &&
              1 === a.$el.find(s.nextEl).length &&
              (e = a.$el.find(s.nextEl))),
          s.prevEl &&
            ((t = i(s.prevEl)),
            a.params.uniqueNavElements &&
              'string' == typeof s.prevEl &&
              t.length > 1 &&
              1 === a.$el.find(s.prevEl).length &&
              (t = a.$el.find(s.prevEl))),
          e &&
            e.length > 0 &&
            e.on('click', function(e) {
              e.preventDefault(), (a.isEnd && !a.params.loop) || a.slideNext();
            }),
          t &&
            t.length > 0 &&
            t.on('click', function(e) {
              e.preventDefault(),
                (a.isBeginning && !a.params.loop) || a.slidePrev();
            }),
          d.extend(a.navigation, {
            $nextEl: e,
            nextEl: e && e[0],
            $prevEl: t,
            prevEl: t && t[0],
          }));
      },
      destroy: function() {
        const e = this.navigation;
          const t = e.$nextEl;
          const a = e.$prevEl;
        t &&
          t.length &&
          (t.off('click'), t.removeClass(this.params.navigation.disabledClass)),
          a &&
            a.length &&
            (a.off('click'),
            a.removeClass(this.params.navigation.disabledClass));
      },
    };
    const Y = {
      update: function() {
        const e = this;
          const t = e.rtl;
          const a = e.params.pagination;
        if (
          a.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          let s;
            const r =
              e.virtual && e.params.virtual.enabled ?
                e.virtual.slides.length :
                e.slides.length;
            const n = e.pagination.$el;
            const o = e.params.loop ?
              Math.ceil((r - 2 * e.loopedSlides) / e.params.slidesPerGroup) :
              e.snapGrid.length;
          if (
            (e.params.loop ?
              ((s = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup,
                )) >
                  r - 1 - 2 * e.loopedSlides && (s -= r - 2 * e.loopedSlides),
                s > o - 1 && (s -= o),
                s < 0 && 'bullets' !== e.params.paginationType && (s = o + s)) :
              (s = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            'bullets' === a.type &&
              e.pagination.bullets &&
              e.pagination.bullets.length > 0)
          ) {
            let l;
              let d;
              let p;
              const c = e.pagination.bullets;
            if (
              (a.dynamicBullets &&
                ((e.pagination.bulletSize = c
                  .eq(0)
                  [e.isHorizontal() ? 'outerWidth' : 'outerHeight'](!0)),
                n.css(
                  e.isHorizontal() ? 'width' : 'height',
                  e.pagination.bulletSize * (a.dynamicMainBullets + 4) + 'px',
                ),
                a.dynamicMainBullets > 1 &&
                  void 0 !== e.previousIndex &&
                  ((e.pagination.dynamicBulletIndex += s - e.previousIndex),
                  e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1 ?
                    (e.pagination.dynamicBulletIndex =
                        a.dynamicMainBullets - 1) :
                    e.pagination.dynamicBulletIndex < 0 &&
                      (e.pagination.dynamicBulletIndex = 0)),
                (l = s - e.pagination.dynamicBulletIndex),
                (p =
                  ((d = l + (Math.min(c.length, a.dynamicMainBullets) - 1)) +
                    l) /
                  2)),
              c.removeClass(
                a.bulletActiveClass +
                  ' ' +
                  a.bulletActiveClass +
                  '-next ' +
                  a.bulletActiveClass +
                  '-next-next ' +
                  a.bulletActiveClass +
                  '-prev ' +
                  a.bulletActiveClass +
                  '-prev-prev ' +
                  a.bulletActiveClass +
                  '-main',
              ),
              n.length > 1)
            ) {
c.each(function(e, t) {
                const r = i(t);
                  const n = r.index();
                n === s && r.addClass(a.bulletActiveClass),
                  a.dynamicBullets &&
                    (n >= l &&
                      n <= d &&
                      r.addClass(a.bulletActiveClass + '-main'),
                    n === l &&
                      r
                        .prev()
                        .addClass(a.bulletActiveClass + '-prev')
                        .prev()
                        .addClass(a.bulletActiveClass + '-prev-prev'),
                    n === d &&
                      r
                        .next()
                        .addClass(a.bulletActiveClass + '-next')
                        .next()
                        .addClass(a.bulletActiveClass + '-next-next'));
              });
} else if (
              (c.eq(s).addClass(a.bulletActiveClass), a.dynamicBullets)
            ) {
              for (var u = c.eq(l), h = c.eq(d), v = l; v <= d; v += 1) {
c.eq(v).addClass(a.bulletActiveClass + '-main');
}
              u
                .prev()
                .addClass(a.bulletActiveClass + '-prev')
                .prev()
                .addClass(a.bulletActiveClass + '-prev-prev'),
                h
                  .next()
                  .addClass(a.bulletActiveClass + '-next')
                  .next()
                  .addClass(a.bulletActiveClass + '-next-next');
            }
            if (a.dynamicBullets) {
              const f = Math.min(c.length, a.dynamicMainBullets + 4);
                const m =
                  (e.pagination.bulletSize * f - e.pagination.bulletSize) / 2 -
                  p * e.pagination.bulletSize;
                const g = t ? 'right' : 'left';
              c.css(e.isHorizontal() ? g : 'top', m + 'px');
            }
          }
          if (
            ('fraction' === a.type &&
              (n.find('.' + a.currentClass).text(s + 1),
              n.find('.' + a.totalClass).text(o)),
            'progressbar' === a.type)
          ) {
            let b;
            b = a.progressbarOpposite ?
              e.isHorizontal() ?
                'vertical' :
                'horizontal' :
              e.isHorizontal() ?
              'horizontal' :
              'vertical';
            const w = (s + 1) / o;
              let y = 1;
              let x = 1;
            'horizontal' === b ? (y = w) : (x = w),
              n
                .find('.' + a.progressbarFillClass)
                .transform(
                  'translate3d(0,0,0) scaleX(' + y + ') scaleY(' + x + ')',
                )
                .transition(e.params.speed);
          }
          'custom' === a.type && a.renderCustom ?
            (n.html(a.renderCustom(e, s + 1, o)),
              e.emit('paginationRender', e, n[0])) :
            e.emit('paginationUpdate', e, n[0]),
            n[
              e.params.watchOverflow && e.isLocked ? 'addClass' : 'removeClass'
            ](a.lockClass);
        }
      },
      render: function() {
        const e = this;
          const t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          const a =
              e.virtual && e.params.virtual.enabled ?
                e.virtual.slides.length :
                e.slides.length;
            const i = e.pagination.$el;
            let s = '';
          if ('bullets' === t.type) {
            for (
              let r = e.params.loop ?
                  Math.ceil(
                      (a - 2 * e.loopedSlides) / e.params.slidesPerGroup,
                    ) :
                  e.snapGrid.length,
                n = 0;
              n < r;
              n += 1
            ) {
t.renderBullet ?
                (s += t.renderBullet.call(e, n, t.bulletClass)) :
                (s +=
                    '<' +
                    t.bulletElement +
                    ' class="' +
                    t.bulletClass +
                    '"></' +
                    t.bulletElement +
                    '>');
}
            i.html(s), (e.pagination.bullets = i.find('.' + t.bulletClass));
          }
          'fraction' === t.type &&
            ((s = t.renderFraction ?
              t.renderFraction.call(e, t.currentClass, t.totalClass) :
              '<span class="' +
                t.currentClass +
                '"></span> / <span class="' +
                t.totalClass +
                '"></span>'),
            i.html(s)),
            'progressbar' === t.type &&
              ((s = t.renderProgressbar ?
                t.renderProgressbar.call(e, t.progressbarFillClass) :
                '<span class="' + t.progressbarFillClass + '"></span>'),
              i.html(s)),
            'custom' !== t.type &&
              e.emit('paginationRender', e.pagination.$el[0]);
        }
      },
      init: function() {
        const e = this;
          const t = e.params.pagination;
        if (t.el) {
          let a = i(t.el);
          0 !== a.length &&
            (e.params.uniqueNavElements &&
              'string' == typeof t.el &&
              a.length > 1 &&
              1 === e.$el.find(t.el).length &&
              (a = e.$el.find(t.el)),
            'bullets' === t.type && t.clickable && a.addClass(t.clickableClass),
            a.addClass(t.modifierClass + t.type),
            'bullets' === t.type &&
              t.dynamicBullets &&
              (a.addClass('' + t.modifierClass + t.type + '-dynamic'),
              (e.pagination.dynamicBulletIndex = 0),
              t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            'progressbar' === t.type &&
              t.progressbarOpposite &&
              a.addClass(t.progressbarOppositeClass),
            t.clickable &&
              a.on('click', '.' + t.bulletClass, function(t) {
                t.preventDefault();
                let a = i(this).index() * e.params.slidesPerGroup;
                e.params.loop && (a += e.loopedSlides), e.slideTo(a);
              }),
            d.extend(e.pagination, {$el: a, el: a[0]}));
        }
      },
      destroy: function() {
        const e = this;
          const t = e.params.pagination;
        if (
          t.el &&
          e.pagination.el &&
          e.pagination.$el &&
          0 !== e.pagination.$el.length
        ) {
          const a = e.pagination.$el;
          a.removeClass(t.hiddenClass),
            a.removeClass(t.modifierClass + t.type),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && a.off('click', '.' + t.bulletClass);
        }
      },
    };
    const V = {
      setTranslate: function() {
        const e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          const t = e.scrollbar;
            const a = e.rtlTranslate;
            const i = e.progress;
            const s = t.dragSize;
            const r = t.trackSize;
            const n = t.$dragEl;
            const o = t.$el;
            const l = e.params.scrollbar;
            let d = s;
            let c = (r - s) * i;
          a ?
            (c = -c) > 0 ?
              ((d = s - c), (c = 0)) :
              -c + s > r && (d = r + c) :
            c < 0 ?
            ((d = s + c), (c = 0)) :
            c + s > r && (d = r - c),
            e.isHorizontal() ?
              (p.transforms3d ?
                  n.transform('translate3d(' + c + 'px, 0, 0)') :
                  n.transform('translateX(' + c + 'px)'),
                (n[0].style.width = d + 'px')) :
              (p.transforms3d ?
                  n.transform('translate3d(0px, ' + c + 'px, 0)') :
                  n.transform('translateY(' + c + 'px)'),
                (n[0].style.height = d + 'px')),
            l.hide &&
              (clearTimeout(e.scrollbar.timeout),
              (o[0].style.opacity = 1),
              (e.scrollbar.timeout = setTimeout(function() {
                (o[0].style.opacity = 0), o.transition(400);
              }, 1e3)));
        }
      },
      setTransition: function(e) {
        this.params.scrollbar.el &&
          this.scrollbar.el &&
          this.scrollbar.$dragEl.transition(e);
      },
      updateSize: function() {
        const e = this;
        if (e.params.scrollbar.el && e.scrollbar.el) {
          const t = e.scrollbar;
            const a = t.$dragEl;
            const i = t.$el;
          (a[0].style.width = ''), (a[0].style.height = '');
          let s;
            const r = e.isHorizontal() ? i[0].offsetWidth : i[0].offsetHeight;
            const n = e.size / e.virtualSize;
            const o = n * (r / e.size);
          (s =
            'auto' === e.params.scrollbar.dragSize ?
              r * n :
              parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal() ?
              (a[0].style.width = s + 'px') :
              (a[0].style.height = s + 'px'),
            (i[0].style.display = n >= 1 ? 'none' : ''),
            e.params.scrollbarHide && (i[0].style.opacity = 0),
            d.extend(t, {
              trackSize: r,
              divider: n,
              moveDivider: o,
              dragSize: s,
            }),
            t.$el[
              e.params.watchOverflow && e.isLocked ? 'addClass' : 'removeClass'
            ](e.params.scrollbar.lockClass);
        }
      },
      setDragPosition: function(e) {
        let t;
          const a = this;
          const i = a.scrollbar;
          const s = a.rtlTranslate;
          const r = i.$el;
          const n = i.dragSize;
          const o = i.trackSize;
        (t =
          ((a.isHorizontal() ?
            'touchstart' === e.type || 'touchmove' === e.type ?
              e.targetTouches[0].pageX :
              e.pageX || e.clientX :
            'touchstart' === e.type || 'touchmove' === e.type ?
            e.targetTouches[0].pageY :
            e.pageY || e.clientY) -
            r.offset()[a.isHorizontal() ? 'left' : 'top'] -
            n / 2) /
          (o - n)),
          (t = Math.max(Math.min(t, 1), 0)),
          s && (t = 1 - t);
        const l = a.minTranslate() + (a.maxTranslate() - a.minTranslate()) * t;
        a.updateProgress(l),
          a.setTranslate(l),
          a.updateActiveIndex(),
          a.updateSlidesClasses();
      },
      onDragStart: function(e) {
        const t = this;
          const a = t.params.scrollbar;
          const i = t.scrollbar;
          const s = t.$wrapperEl;
          const r = i.$el;
          const n = i.$dragEl;
        (t.scrollbar.isTouched = !0),
          e.preventDefault(),
          e.stopPropagation(),
          s.transition(100),
          n.transition(100),
          i.setDragPosition(e),
          clearTimeout(t.scrollbar.dragTimeout),
          r.transition(0),
          a.hide && r.css('opacity', 1),
          t.emit('scrollbarDragStart', e);
      },
      onDragMove: function(e) {
        const t = this.scrollbar;
          const a = this.$wrapperEl;
          const i = t.$el;
          const s = t.$dragEl;
        this.scrollbar.isTouched &&
          (e.preventDefault ? e.preventDefault() : (e.returnValue = !1),
          t.setDragPosition(e),
          a.transition(0),
          i.transition(0),
          s.transition(0),
          this.emit('scrollbarDragMove', e));
      },
      onDragEnd: function(e) {
        const t = this;
          const a = t.params.scrollbar;
          const i = t.scrollbar.$el;
        t.scrollbar.isTouched &&
          ((t.scrollbar.isTouched = !1),
          a.hide &&
            (clearTimeout(t.scrollbar.dragTimeout),
            (t.scrollbar.dragTimeout = d.nextTick(function() {
              i.css('opacity', 0), i.transition(400);
            }, 1e3))),
          t.emit('scrollbarDragEnd', e),
          a.snapOnRelease && t.slideToClosest());
      },
      enableDraggable: function() {
        const t = this;
        if (t.params.scrollbar.el) {
          const a = t.scrollbar;
            const i = t.touchEvents;
            const s = t.touchEventsDesktop;
            const r = t.params;
            const n = a.$el[0];
            const o = !(!p.passiveListener || !r.passiveListener) && {
              passive: !1,
              capture: !1,
            };
            const l = !(!p.passiveListener || !r.passiveListener) && {
              passive: !0,
              capture: !1,
            };
          p.touch || (!p.pointerEvents && !p.prefixedPointerEvents) ?
            (p.touch &&
                (n.addEventListener(i.start, t.scrollbar.onDragStart, o),
                n.addEventListener(i.move, t.scrollbar.onDragMove, o),
                n.addEventListener(i.end, t.scrollbar.onDragEnd, l)),
              ((r.simulateTouch && !y.ios && !y.android) ||
                (r.simulateTouch && !p.touch && y.ios)) &&
                (n.addEventListener('mousedown', t.scrollbar.onDragStart, o),
                e.addEventListener('mousemove', t.scrollbar.onDragMove, o),
                e.addEventListener('mouseup', t.scrollbar.onDragEnd, l))) :
            (n.addEventListener(s.start, t.scrollbar.onDragStart, o),
              e.addEventListener(s.move, t.scrollbar.onDragMove, o),
              e.addEventListener(s.end, t.scrollbar.onDragEnd, l));
        }
      },
      disableDraggable: function() {
        const t = this;
        if (t.params.scrollbar.el) {
          const a = t.scrollbar;
            const i = t.touchEvents;
            const s = t.touchEventsDesktop;
            const r = t.params;
            const n = a.$el[0];
            const o = !(!p.passiveListener || !r.passiveListener) && {
              passive: !1,
              capture: !1,
            };
            const l = !(!p.passiveListener || !r.passiveListener) && {
              passive: !0,
              capture: !1,
            };
          p.touch || (!p.pointerEvents && !p.prefixedPointerEvents) ?
            (p.touch &&
                (n.removeEventListener(i.start, t.scrollbar.onDragStart, o),
                n.removeEventListener(i.move, t.scrollbar.onDragMove, o),
                n.removeEventListener(i.end, t.scrollbar.onDragEnd, l)),
              ((r.simulateTouch && !y.ios && !y.android) ||
                (r.simulateTouch && !p.touch && y.ios)) &&
                (n.removeEventListener('mousedown', t.scrollbar.onDragStart, o),
                e.removeEventListener('mousemove', t.scrollbar.onDragMove, o),
                e.removeEventListener('mouseup', t.scrollbar.onDragEnd, l))) :
            (n.removeEventListener(s.start, t.scrollbar.onDragStart, o),
              e.removeEventListener(s.move, t.scrollbar.onDragMove, o),
              e.removeEventListener(s.end, t.scrollbar.onDragEnd, l));
        }
      },
      init: function() {
        const e = this;
        if (e.params.scrollbar.el) {
          const t = e.scrollbar;
            const a = e.$el;
            const s = e.params.scrollbar;
            let r = i(s.el);
          e.params.uniqueNavElements &&
            'string' == typeof s.el &&
            r.length > 1 &&
            1 === a.find(s.el).length &&
            (r = a.find(s.el));
          let n = r.find('.' + e.params.scrollbar.dragClass);
          0 === n.length &&
            ((n = i(
              '<div class="' + e.params.scrollbar.dragClass + '"></div>',
            )),
            r.append(n)),
            d.extend(t, {$el: r, el: r[0], $dragEl: n, dragEl: n[0]}),
            s.draggable && t.enableDraggable();
        }
      },
      destroy: function() {
        this.scrollbar.disableDraggable();
      },
    };
    const R = {
      setTransform: function(e, t) {
        const a = this.rtl;
          const s = i(e);
          const r = a ? -1 : 1;
          const n = s.attr('data-swiper-parallax') || '0';
          let o = s.attr('data-swiper-parallax-x');
          let l = s.attr('data-swiper-parallax-y');
          const d = s.attr('data-swiper-parallax-scale');
          const p = s.attr('data-swiper-parallax-opacity');
        if (
          (o || l ?
            ((o = o || '0'), (l = l || '0')) :
            this.isHorizontal() ?
            ((o = n), (l = '0')) :
            ((l = n), (o = '0')),
          (o =
            o.indexOf('%') >= 0 ?
              parseInt(o, 10) * t * r + '%' :
              o * t * r + 'px'),
          (l = l.indexOf('%') >= 0 ? parseInt(l, 10) * t + '%' : l * t + 'px'),
          void 0 !== p && null !== p)
        ) {
          const c = p - (p - 1) * (1 - Math.abs(t));
          s[0].style.opacity = c;
        }
        if (void 0 === d || null === d) {
s.transform('translate3d(' + o + ', ' + l + ', 0px)');
} else {
          const u = d - (d - 1) * (1 - Math.abs(t));
          s.transform(
            'translate3d(' + o + ', ' + l + ', 0px) scale(' + u + ')',
          );
        }
      },
      setTranslate: function() {
        const e = this;
          const t = e.$el;
          const a = e.slides;
          const s = e.progress;
          const r = e.snapGrid;
        t
          .children(
            '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]',
          )
          .each(function(t, a) {
            e.parallax.setTransform(a, s);
          }),
          a.each(function(t, a) {
            let n = a.progress;
            e.params.slidesPerGroup > 1 &&
              'auto' !== e.params.slidesPerView &&
              (n += Math.ceil(t / 2) - s * (r.length - 1)),
              (n = Math.min(Math.max(n, -1), 1)),
              i(a)
                .find(
                  '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]',
                )
                .each(function(t, a) {
                  e.parallax.setTransform(a, n);
                });
          });
      },
      setTransition: function(e) {
        void 0 === e && (e = this.params.speed);
        this.$el
          .find(
            '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]',
          )
          .each(function(t, a) {
            const s = i(a);
              let r = parseInt(s.attr('data-swiper-parallax-duration'), 10) || e;
            0 === e && (r = 0), s.transition(r);
          });
      },
    };
    var F = {
      getDistanceBetweenTouches: function(e) {
        if (e.targetTouches.length < 2) return 1;
        const t = e.targetTouches[0].pageX;
          const a = e.targetTouches[0].pageY;
          const i = e.targetTouches[1].pageX;
          const s = e.targetTouches[1].pageY;
        return Math.sqrt(Math.pow(i - t, 2) + Math.pow(s - a, 2));
      },
      onGestureStart: function(e) {
        const t = this;
          const a = t.params.zoom;
          const s = t.zoom;
          const r = s.gesture;
        if (
          ((s.fakeGestureTouched = !1), (s.fakeGestureMoved = !1), !p.gestures)
        ) {
          if (
            'touchstart' !== e.type ||
            ('touchstart' === e.type && e.targetTouches.length < 2)
          ) {
return;
}
          (s.fakeGestureTouched = !0),
            (r.scaleStart = F.getDistanceBetweenTouches(e));
        }
        (r.$slideEl && r.$slideEl.length) ||
        ((r.$slideEl = i(e.target).closest('.swiper-slide')),
        0 === r.$slideEl.length && (r.$slideEl = t.slides.eq(t.activeIndex)),
        (r.$imageEl = r.$slideEl.find('img, svg, canvas')),
        (r.$imageWrapEl = r.$imageEl.parent('.' + a.containerClass)),
        (r.maxRatio = r.$imageWrapEl.attr('data-swiper-zoom') || a.maxRatio),
        0 !== r.$imageWrapEl.length) ?
          (r.$imageEl.transition(0), (t.zoom.isScaling = !0)) :
          (r.$imageEl = void 0);
      },
      onGestureChange: function(e) {
        const t = this.params.zoom;
          const a = this.zoom;
          const i = a.gesture;
        if (!p.gestures) {
          if (
            'touchmove' !== e.type ||
            ('touchmove' === e.type && e.targetTouches.length < 2)
          ) {
return;
}
          (a.fakeGestureMoved = !0),
            (i.scaleMove = F.getDistanceBetweenTouches(e));
        }
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          (p.gestures ?
            (this.zoom.scale = e.scale * a.currentScale) :
            (a.scale = (i.scaleMove / i.scaleStart) * a.currentScale),
          a.scale > i.maxRatio &&
            (a.scale =
              i.maxRatio - 1 + Math.pow(a.scale - i.maxRatio + 1, 0.5)),
          a.scale < t.minRatio &&
            (a.scale =
              t.minRatio + 1 - Math.pow(t.minRatio - a.scale + 1, 0.5)),
          i.$imageEl.transform('translate3d(0,0,0) scale(' + a.scale + ')'));
      },
      onGestureEnd: function(e) {
        const t = this.params.zoom;
          const a = this.zoom;
          const i = a.gesture;
        if (!p.gestures) {
          if (!a.fakeGestureTouched || !a.fakeGestureMoved) return;
          if (
            'touchend' !== e.type ||
            ('touchend' === e.type && e.changedTouches.length < 2 && !y.android)
          ) {
return;
}
          (a.fakeGestureTouched = !1), (a.fakeGestureMoved = !1);
        }
        i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((a.scale = Math.max(Math.min(a.scale, i.maxRatio), t.minRatio)),
          i.$imageEl
            .transition(this.params.speed)
            .transform('translate3d(0,0,0) scale(' + a.scale + ')'),
          (a.currentScale = a.scale),
          (a.isScaling = !1),
          1 === a.scale && (i.$slideEl = void 0));
      },
      onTouchStart: function(e) {
        const t = this.zoom;
          const a = t.gesture;
          const i = t.image;
        a.$imageEl &&
          0 !== a.$imageEl.length &&
          (i.isTouched ||
            (y.android && e.preventDefault(),
            (i.isTouched = !0),
            (i.touchesStart.x =
              'touchstart' === e.type ? e.targetTouches[0].pageX : e.pageX),
            (i.touchesStart.y =
              'touchstart' === e.type ? e.targetTouches[0].pageY : e.pageY)));
      },
      onTouchMove: function(e) {
        const t = this;
          const a = t.zoom;
          const i = a.gesture;
          const s = a.image;
          const r = a.velocity;
        if (
          i.$imageEl &&
          0 !== i.$imageEl.length &&
          ((t.allowClick = !1), s.isTouched && i.$slideEl)
        ) {
          s.isMoved ||
            ((s.width = i.$imageEl[0].offsetWidth),
            (s.height = i.$imageEl[0].offsetHeight),
            (s.startX = d.getTranslate(i.$imageWrapEl[0], 'x') || 0),
            (s.startY = d.getTranslate(i.$imageWrapEl[0], 'y') || 0),
            (i.slideWidth = i.$slideEl[0].offsetWidth),
            (i.slideHeight = i.$slideEl[0].offsetHeight),
            i.$imageWrapEl.transition(0),
            t.rtl && ((s.startX = -s.startX), (s.startY = -s.startY)));
          const n = s.width * a.scale;
            const o = s.height * a.scale;
          if (!(n < i.slideWidth && o < i.slideHeight)) {
            if (
              ((s.minX = Math.min(i.slideWidth / 2 - n / 2, 0)),
              (s.maxX = -s.minX),
              (s.minY = Math.min(i.slideHeight / 2 - o / 2, 0)),
              (s.maxY = -s.minY),
              (s.touchesCurrent.x =
                'touchmove' === e.type ? e.targetTouches[0].pageX : e.pageX),
              (s.touchesCurrent.y =
                'touchmove' === e.type ? e.targetTouches[0].pageY : e.pageY),
              !s.isMoved && !a.isScaling)
            ) {
              if (
                t.isHorizontal() &&
                ((Math.floor(s.minX) === Math.floor(s.startX) &&
                  s.touchesCurrent.x < s.touchesStart.x) ||
                  (Math.floor(s.maxX) === Math.floor(s.startX) &&
                    s.touchesCurrent.x > s.touchesStart.x))
              ) {
return void (s.isTouched = !1);
}
              if (
                !t.isHorizontal() &&
                ((Math.floor(s.minY) === Math.floor(s.startY) &&
                  s.touchesCurrent.y < s.touchesStart.y) ||
                  (Math.floor(s.maxY) === Math.floor(s.startY) &&
                    s.touchesCurrent.y > s.touchesStart.y))
              ) {
return void (s.isTouched = !1);
}
            }
            e.preventDefault(),
              e.stopPropagation(),
              (s.isMoved = !0),
              (s.currentX = s.touchesCurrent.x - s.touchesStart.x + s.startX),
              (s.currentY = s.touchesCurrent.y - s.touchesStart.y + s.startY),
              s.currentX < s.minX &&
                (s.currentX =
                  s.minX + 1 - Math.pow(s.minX - s.currentX + 1, 0.8)),
              s.currentX > s.maxX &&
                (s.currentX =
                  s.maxX - 1 + Math.pow(s.currentX - s.maxX + 1, 0.8)),
              s.currentY < s.minY &&
                (s.currentY =
                  s.minY + 1 - Math.pow(s.minY - s.currentY + 1, 0.8)),
              s.currentY > s.maxY &&
                (s.currentY =
                  s.maxY - 1 + Math.pow(s.currentY - s.maxY + 1, 0.8)),
              r.prevPositionX || (r.prevPositionX = s.touchesCurrent.x),
              r.prevPositionY || (r.prevPositionY = s.touchesCurrent.y),
              r.prevTime || (r.prevTime = Date.now()),
              (r.x =
                (s.touchesCurrent.x - r.prevPositionX) /
                (Date.now() - r.prevTime) /
                2),
              (r.y =
                (s.touchesCurrent.y - r.prevPositionY) /
                (Date.now() - r.prevTime) /
                2),
              Math.abs(s.touchesCurrent.x - r.prevPositionX) < 2 && (r.x = 0),
              Math.abs(s.touchesCurrent.y - r.prevPositionY) < 2 && (r.y = 0),
              (r.prevPositionX = s.touchesCurrent.x),
              (r.prevPositionY = s.touchesCurrent.y),
              (r.prevTime = Date.now()),
              i.$imageWrapEl.transform(
                'translate3d(' + s.currentX + 'px, ' + s.currentY + 'px,0)',
              );
          }
        }
      },
      onTouchEnd: function() {
        const e = this.zoom;
          const t = e.gesture;
          const a = e.image;
          const i = e.velocity;
        if (t.$imageEl && 0 !== t.$imageEl.length) {
          if (!a.isTouched || !a.isMoved) {
return (a.isTouched = !1), void (a.isMoved = !1);
}
          (a.isTouched = !1), (a.isMoved = !1);
          let s = 300;
            let r = 300;
            const n = i.x * s;
            const o = a.currentX + n;
            const l = i.y * r;
            const d = a.currentY + l;
          0 !== i.x && (s = Math.abs((o - a.currentX) / i.x)),
            0 !== i.y && (r = Math.abs((d - a.currentY) / i.y));
          const p = Math.max(s, r);
          (a.currentX = o), (a.currentY = d);
          const c = a.width * e.scale;
            const u = a.height * e.scale;
          (a.minX = Math.min(t.slideWidth / 2 - c / 2, 0)),
            (a.maxX = -a.minX),
            (a.minY = Math.min(t.slideHeight / 2 - u / 2, 0)),
            (a.maxY = -a.minY),
            (a.currentX = Math.max(Math.min(a.currentX, a.maxX), a.minX)),
            (a.currentY = Math.max(Math.min(a.currentY, a.maxY), a.minY)),
            t.$imageWrapEl
              .transition(p)
              .transform(
                'translate3d(' + a.currentX + 'px, ' + a.currentY + 'px,0)',
              );
        }
      },
      onTransitionEnd: function() {
        const e = this.zoom;
          const t = e.gesture;
        t.$slideEl &&
          this.previousIndex !== this.activeIndex &&
          (t.$imageEl.transform('translate3d(0,0,0) scale(1)'),
          t.$imageWrapEl.transform('translate3d(0,0,0)'),
          (t.$slideEl = void 0),
          (t.$imageEl = void 0),
          (t.$imageWrapEl = void 0),
          (e.scale = 1),
          (e.currentScale = 1));
      },
      toggle: function(e) {
        const t = this.zoom;
        t.scale && 1 !== t.scale ? t.out() : t.in(e);
      },
      in: function(e) {
        let t;
          let a;
          let s;
          let r;
          let n;
          let o;
          let l;
          let d;
          let p;
          let c;
          let u;
          let h;
          let v;
          let f;
          let m;
          let g;
          const b = this;
          const w = b.zoom;
          const y = b.params.zoom;
          const x = w.gesture;
          const E = w.image;
        (x.$slideEl ||
          ((x.$slideEl = b.clickedSlide ?
            i(b.clickedSlide) :
            b.slides.eq(b.activeIndex)),
          (x.$imageEl = x.$slideEl.find('img, svg, canvas')),
          (x.$imageWrapEl = x.$imageEl.parent('.' + y.containerClass))),
        x.$imageEl && 0 !== x.$imageEl.length) &&
          (x.$slideEl.addClass('' + y.zoomedSlideClass),
          void 0 === E.touchesStart.x && e ?
            ((t =
                'touchend' === e.type ? e.changedTouches[0].pageX : e.pageX),
              (a = 'touchend' === e.type ? e.changedTouches[0].pageY : e.pageY)) :
            ((t = E.touchesStart.x), (a = E.touchesStart.y)),
          (w.scale = x.$imageWrapEl.attr('data-swiper-zoom') || y.maxRatio),
          (w.currentScale =
            x.$imageWrapEl.attr('data-swiper-zoom') || y.maxRatio),
          e ?
            ((m = x.$slideEl[0].offsetWidth),
              (g = x.$slideEl[0].offsetHeight),
              (s = x.$slideEl.offset().left + m / 2 - t),
              (r = x.$slideEl.offset().top + g / 2 - a),
              (l = x.$imageEl[0].offsetWidth),
              (d = x.$imageEl[0].offsetHeight),
              (p = l * w.scale),
              (c = d * w.scale),
              (v = -(u = Math.min(m / 2 - p / 2, 0))),
              (f = -(h = Math.min(g / 2 - c / 2, 0))),
              (n = s * w.scale),
              (o = r * w.scale),
              n < u && (n = u),
              n > v && (n = v),
              o < h && (o = h),
              o > f && (o = f)) :
            ((n = 0), (o = 0)),
          x.$imageWrapEl
            .transition(300)
            .transform('translate3d(' + n + 'px, ' + o + 'px,0)'),
          x.$imageEl
            .transition(300)
            .transform('translate3d(0,0,0) scale(' + w.scale + ')'));
      },
      out: function() {
        const e = this;
          const t = e.zoom;
          const a = e.params.zoom;
          const s = t.gesture;
        s.$slideEl ||
          ((s.$slideEl = e.clickedSlide ?
            i(e.clickedSlide) :
            e.slides.eq(e.activeIndex)),
          (s.$imageEl = s.$slideEl.find('img, svg, canvas')),
          (s.$imageWrapEl = s.$imageEl.parent('.' + a.containerClass))),
          s.$imageEl &&
            0 !== s.$imageEl.length &&
            ((t.scale = 1),
            (t.currentScale = 1),
            s.$imageWrapEl.transition(300).transform('translate3d(0,0,0)'),
            s.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)'),
            s.$slideEl.removeClass('' + a.zoomedSlideClass),
            (s.$slideEl = void 0));
      },
      enable: function() {
        const e = this;
          const t = e.zoom;
        if (!t.enabled) {
          t.enabled = !0;
          const a = !(
            'touchstart' !== e.touchEvents.start ||
            !p.passiveListener ||
            !e.params.passiveListeners
          ) && {passive: !0, capture: !1};
          p.gestures ?
            (e.$wrapperEl.on(
                'gesturestart',
                '.swiper-slide',
                t.onGestureStart,
                a,
              ),
              e.$wrapperEl.on(
                'gesturechange',
                '.swiper-slide',
                t.onGestureChange,
                a,
              ),
              e.$wrapperEl.on('gestureend', '.swiper-slide', t.onGestureEnd, a)) :
            'touchstart' === e.touchEvents.start &&
              (e.$wrapperEl.on(
                e.touchEvents.start,
                '.swiper-slide',
                t.onGestureStart,
                a,
              ),
              e.$wrapperEl.on(
                e.touchEvents.move,
                '.swiper-slide',
                t.onGestureChange,
                a,
              ),
              e.$wrapperEl.on(
                e.touchEvents.end,
                '.swiper-slide',
                t.onGestureEnd,
                a,
              )),
            e.$wrapperEl.on(
              e.touchEvents.move,
              '.' + e.params.zoom.containerClass,
              t.onTouchMove,
            );
        }
      },
      disable: function() {
        const e = this;
          const t = e.zoom;
        if (t.enabled) {
          e.zoom.enabled = !1;
          const a = !(
            'touchstart' !== e.touchEvents.start ||
            !p.passiveListener ||
            !e.params.passiveListeners
          ) && {passive: !0, capture: !1};
          p.gestures ?
            (e.$wrapperEl.off(
                'gesturestart',
                '.swiper-slide',
                t.onGestureStart,
                a,
              ),
              e.$wrapperEl.off(
                'gesturechange',
                '.swiper-slide',
                t.onGestureChange,
                a,
              ),
              e.$wrapperEl.off(
                'gestureend',
                '.swiper-slide',
                t.onGestureEnd,
                a,
              )) :
            'touchstart' === e.touchEvents.start &&
              (e.$wrapperEl.off(
                e.touchEvents.start,
                '.swiper-slide',
                t.onGestureStart,
                a,
              ),
              e.$wrapperEl.off(
                e.touchEvents.move,
                '.swiper-slide',
                t.onGestureChange,
                a,
              ),
              e.$wrapperEl.off(
                e.touchEvents.end,
                '.swiper-slide',
                t.onGestureEnd,
                a,
              )),
            e.$wrapperEl.off(
              e.touchEvents.move,
              '.' + e.params.zoom.containerClass,
              t.onTouchMove,
            );
        }
      },
    };
    const W = {
      loadInSlide: function(e, t) {
        void 0 === t && (t = !0);
        const a = this;
          const s = a.params.lazy;
        if (void 0 !== e && 0 !== a.slides.length) {
          const r =
              a.virtual && a.params.virtual.enabled ?
                a.$wrapperEl.children(
                    '.' +
                      a.params.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]',
                  ) :
                a.slides.eq(e);
            let n = r.find(
              '.' +
                s.elementClass +
                ':not(.' +
                s.loadedClass +
                '):not(.' +
                s.loadingClass +
                ')',
            );
          !r.hasClass(s.elementClass) ||
            r.hasClass(s.loadedClass) ||
            r.hasClass(s.loadingClass) ||
            (n = n.add(r[0])),
            0 !== n.length &&
              n.each(function(e, n) {
                const o = i(n);
                o.addClass(s.loadingClass);
                const l = o.attr('data-background');
                  const d = o.attr('data-src');
                  const p = o.attr('data-srcset');
                  const c = o.attr('data-sizes');
                a.loadImage(o[0], d || l, p, c, !1, function() {
                  if (
                    void 0 !== a &&
                    null !== a &&
                    a &&
                    (!a || a.params) &&
                    !a.destroyed
                  ) {
                    if (
                      (l ?
                        (o.css('background-image', 'url("' + l + '")'),
                          o.removeAttr('data-background')) :
                        (p &&
                            (o.attr('srcset', p), o.removeAttr('data-srcset')),
                          c && (o.attr('sizes', c), o.removeAttr('data-sizes')),
                          d && (o.attr('src', d), o.removeAttr('data-src'))),
                      o.addClass(s.loadedClass).removeClass(s.loadingClass),
                      r.find('.' + s.preloaderClass).remove(),
                      a.params.loop && t)
                    ) {
                      const e = r.attr('data-swiper-slide-index');
                      if (r.hasClass(a.params.slideDuplicateClass)) {
                        const i = a.$wrapperEl.children(
                          '[data-swiper-slide-index="' +
                            e +
                            '"]:not(.' +
                            a.params.slideDuplicateClass +
                            ')',
                        );
                        a.lazy.loadInSlide(i.index(), !1);
                      } else {
                        const n = a.$wrapperEl.children(
                          '.' +
                            a.params.slideDuplicateClass +
                            '[data-swiper-slide-index="' +
                            e +
                            '"]',
                        );
                        a.lazy.loadInSlide(n.index(), !1);
                      }
                    }
                    a.emit('lazyImageReady', r[0], o[0]);
                  }
                }),
                  a.emit('lazyImageLoad', r[0], o[0]);
              });
        }
      },
      load: function() {
        const e = this;
          const t = e.$wrapperEl;
          const a = e.params;
          const s = e.slides;
          const r = e.activeIndex;
          const n = e.virtual && a.virtual.enabled;
          const o = a.lazy;
          let l = a.slidesPerView;
        function d(e) {
          if (n) {
            if (
              t.children(
                '.' + a.slideClass + '[data-swiper-slide-index="' + e + '"]',
              ).length
            ) {
return !0;
}
          } else if (s[e]) return !0;
          return !1;
        }
        function p(e) {
          return n ? i(e).attr('data-swiper-slide-index') : i(e).index();
        }
        if (
          ('auto' === l && (l = 0),
          e.lazy.initialImageLoaded || (e.lazy.initialImageLoaded = !0),
          e.params.watchSlidesVisibility)
        ) {
t.children('.' + a.slideVisibleClass).each(function(t, a) {
            const s = n ? i(a).attr('data-swiper-slide-index') : i(a).index();
            e.lazy.loadInSlide(s);
          });
} else if (l > 1) {
for (let c = r; c < r + l; c += 1) d(c) && e.lazy.loadInSlide(c);
} else e.lazy.loadInSlide(r);
        if (o.loadPrevNext) {
if (l > 1 || (o.loadPrevNextAmount && o.loadPrevNextAmount > 1)) {
            for (
              var u = o.loadPrevNextAmount,
                h = l,
                v = Math.min(r + h + Math.max(u, h), s.length),
                f = Math.max(r - Math.max(h, u), 0),
                m = r + l;
              m < v;
              m += 1
            ) {
d(m) && e.lazy.loadInSlide(m);
}
            for (let g = f; g < r; g += 1) d(g) && e.lazy.loadInSlide(g);
          } else {
            const b = t.children('.' + a.slideNextClass);
            b.length > 0 && e.lazy.loadInSlide(p(b));
            const w = t.children('.' + a.slidePrevClass);
            w.length > 0 && e.lazy.loadInSlide(p(w));
          }
}
      },
    };
    var q = {
      LinearSpline: function(e, t) {
        let a;
          let i;
          let s;
          let r;
          let n;
          const o = function(e, t) {
            for (i = -1, a = e.length; a - i > 1; ) {
e[(s = (a + i) >> 1)] <= t ? (i = s) : (a = s);
}
            return a;
          };
        return (
          (this.x = e),
          (this.y = t),
          (this.lastIndex = e.length - 1),
          (this.interpolate = function(e) {
            return e ?
              ((n = o(this.x, e)),
                (r = n - 1),
                ((e - this.x[r]) * (this.y[n] - this.y[r])) /
                  (this.x[n] - this.x[r]) +
                  this.y[r]) :
              0;
          }),
          this
        );
      },
      getInterpolateFunction: function(e) {
        const t = this;
        t.controller.spline ||
          (t.controller.spline = t.params.loop ?
            new q.LinearSpline(t.slidesGrid, e.slidesGrid) :
            new q.LinearSpline(t.snapGrid, e.snapGrid));
      },
      setTranslate: function(e, t) {
        let a;
          let i;
          const s = this;
          const r = s.controller.control;
        function n(e) {
          const t = s.rtlTranslate ? -s.translate : s.translate;
          'slide' === s.params.controller.by &&
            (s.controller.getInterpolateFunction(e),
            (i = -s.controller.spline.interpolate(-t))),
            (i && 'container' !== s.params.controller.by) ||
              ((a =
                (e.maxTranslate() - e.minTranslate()) /
                (s.maxTranslate() - s.minTranslate())),
              (i = (t - s.minTranslate()) * a + e.minTranslate())),
            s.params.controller.inverse && (i = e.maxTranslate() - i),
            e.updateProgress(i),
            e.setTranslate(i, s),
            e.updateActiveIndex(),
            e.updateSlidesClasses();
        }
        if (Array.isArray(r)) {
for (let o = 0; o < r.length; o += 1) {
r[o] !== t && r[o] instanceof k && n(r[o]);
}
} else r instanceof k && t !== r && n(r);
      },
      setTransition: function(e, t) {
        let a;
          const i = this;
          const s = i.controller.control;
        function r(t) {
          t.setTransition(e, i),
            0 !== e &&
              (t.transitionStart(),
              t.$wrapperEl.transitionEnd(function() {
                s &&
                  (t.params.loop &&
                    'slide' === i.params.controller.by &&
                    t.loopFix(),
                  t.transitionEnd());
              }));
        }
        if (Array.isArray(s)) {
for (a = 0; a < s.length; a += 1) {
s[a] !== t && s[a] instanceof k && r(s[a]);
}
} else s instanceof k && t !== s && r(s);
      },
    };
    const j = {
      makeElFocusable: function(e) {
        return e.attr('tabIndex', '0'), e;
      },
      addElRole: function(e, t) {
        return e.attr('role', t), e;
      },
      addElLabel: function(e, t) {
        return e.attr('aria-label', t), e;
      },
      disableEl: function(e) {
        return e.attr('aria-disabled', !0), e;
      },
      enableEl: function(e) {
        return e.attr('aria-disabled', !1), e;
      },
      onEnterKey: function(e) {
        const t = this;
          const a = t.params.a11y;
        if (13 === e.keyCode) {
          const s = i(e.target);
          t.navigation &&
            t.navigation.$nextEl &&
            s.is(t.navigation.$nextEl) &&
            ((t.isEnd && !t.params.loop) || t.slideNext(),
            t.isEnd ?
              t.a11y.notify(a.lastSlideMessage) :
              t.a11y.notify(a.nextSlideMessage)),
            t.navigation &&
              t.navigation.$prevEl &&
              s.is(t.navigation.$prevEl) &&
              ((t.isBeginning && !t.params.loop) || t.slidePrev(),
              t.isBeginning ?
                t.a11y.notify(a.firstSlideMessage) :
                t.a11y.notify(a.prevSlideMessage)),
            t.pagination &&
              s.is('.' + t.params.pagination.bulletClass) &&
              s[0].click();
        }
      },
      notify: function(e) {
        const t = this.a11y.liveRegion;
        0 !== t.length && (t.html(''), t.html(e));
      },
      updateNavigation: function() {
        const e = this;
        if (!e.params.loop) {
          const t = e.navigation;
            const a = t.$nextEl;
            const i = t.$prevEl;
          i &&
            i.length > 0 &&
            (e.isBeginning ? e.a11y.disableEl(i) : e.a11y.enableEl(i)),
            a &&
              a.length > 0 &&
              (e.isEnd ? e.a11y.disableEl(a) : e.a11y.enableEl(a));
        }
      },
      updatePagination: function() {
        const e = this;
          const t = e.params.a11y;
        e.pagination &&
          e.params.pagination.clickable &&
          e.pagination.bullets &&
          e.pagination.bullets.length &&
          e.pagination.bullets.each(function(a, s) {
            const r = i(s);
            e.a11y.makeElFocusable(r),
              e.a11y.addElRole(r, 'button'),
              e.a11y.addElLabel(
                r,
                t.paginationBulletMessage.replace(/{{index}}/, r.index() + 1),
              );
          });
      },
      init: function() {
        const e = this;
        e.$el.append(e.a11y.liveRegion);
        let t;
          let a;
          const i = e.params.a11y;
        e.navigation && e.navigation.$nextEl && (t = e.navigation.$nextEl),
          e.navigation && e.navigation.$prevEl && (a = e.navigation.$prevEl),
          t &&
            (e.a11y.makeElFocusable(t),
            e.a11y.addElRole(t, 'button'),
            e.a11y.addElLabel(t, i.nextSlideMessage),
            t.on('keydown', e.a11y.onEnterKey)),
          a &&
            (e.a11y.makeElFocusable(a),
            e.a11y.addElRole(a, 'button'),
            e.a11y.addElLabel(a, i.prevSlideMessage),
            a.on('keydown', e.a11y.onEnterKey)),
          e.pagination &&
            e.params.pagination.clickable &&
            e.pagination.bullets &&
            e.pagination.bullets.length &&
            e.pagination.$el.on(
              'keydown',
              '.' + e.params.pagination.bulletClass,
              e.a11y.onEnterKey,
            );
      },
      destroy: function() {
        let e;
          let t;
          const a = this;
        a.a11y.liveRegion &&
          a.a11y.liveRegion.length > 0 &&
          a.a11y.liveRegion.remove(),
          a.navigation && a.navigation.$nextEl && (e = a.navigation.$nextEl),
          a.navigation && a.navigation.$prevEl && (t = a.navigation.$prevEl),
          e && e.off('keydown', a.a11y.onEnterKey),
          t && t.off('keydown', a.a11y.onEnterKey),
          a.pagination &&
            a.params.pagination.clickable &&
            a.pagination.bullets &&
            a.pagination.bullets.length &&
            a.pagination.$el.off(
              'keydown',
              '.' + a.params.pagination.bulletClass,
              a.a11y.onEnterKey,
            );
      },
    };
    var K = {
      init: function() {
        const e = this;
        if (e.params.history) {
          if (!t.history || !t.history.pushState) {
return (
              (e.params.history.enabled = !1),
              void (e.params.hashNavigation.enabled = !0)
            );
}
          const a = e.history;
          (a.initialized = !0),
            (a.paths = K.getPathValues()),
            (a.paths.key || a.paths.value) &&
              (a.scrollToSlide(0, a.paths.value, e.params.runCallbacksOnInit),
              e.params.history.replaceState ||
                t.addEventListener('popstate', e.history.setHistoryPopState));
        }
      },
      destroy: function() {
        this.params.history.replaceState ||
          t.removeEventListener('popstate', this.history.setHistoryPopState);
      },
      setHistoryPopState: function() {
        (this.history.paths = K.getPathValues()),
          this.history.scrollToSlide(
            this.params.speed,
            this.history.paths.value,
            !1,
          );
      },
      getPathValues: function() {
        const e = t.location.pathname
            .slice(1)
            .split('/')
            .filter(function(e) {
              return '' !== e;
            });
          const a = e.length;
        return {key: e[a - 2], value: e[a - 1]};
      },
      setHistory: function(e, a) {
        if (this.history.initialized && this.params.history.enabled) {
          const i = this.slides.eq(a);
            let s = K.slugify(i.attr('data-history'));
          t.location.pathname.includes(e) || (s = e + '/' + s);
          const r = t.history.state;
          (r && r.value === s) ||
            (this.params.history.replaceState ?
              t.history.replaceState({value: s}, null, s) :
              t.history.pushState({value: s}, null, s));
        }
      },
      slugify: function(e) {
        return e
          .toString()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^\w-]+/g, '')
          .replace(/--+/g, '-')
          .replace(/^-+/, '')
          .replace(/-+$/, '');
      },
      scrollToSlide: function(e, t, a) {
        const i = this;
        if (t) {
for (let s = 0, r = i.slides.length; s < r; s += 1) {
            const n = i.slides.eq(s);
            if (
              K.slugify(n.attr('data-history')) === t &&
              !n.hasClass(i.params.slideDuplicateClass)
            ) {
              const o = n.index();
              i.slideTo(o, e, a);
            }
          }
} else i.slideTo(0, e, a);
      },
    };
    const U = {
      onHashCange: function() {
        const t = this;
          const a = e.location.hash.replace('#', '');
        a !== t.slides.eq(t.activeIndex).attr('data-hash') &&
          t.slideTo(
            t.$wrapperEl
              .children('.' + t.params.slideClass + '[data-hash="' + a + '"]')
              .index(),
          );
      },
      setHash: function() {
        const a = this;
        if (a.hashNavigation.initialized && a.params.hashNavigation.enabled) {
if (
            a.params.hashNavigation.replaceState &&
            t.history &&
            t.history.replaceState
          ) {
t.history.replaceState(
              null,
              null,
              '#' + a.slides.eq(a.activeIndex).attr('data-hash') || '',
            );
} else {
            const i = a.slides.eq(a.activeIndex);
              const s = i.attr('data-hash') || i.attr('data-history');
            e.location.hash = s || '';
          }
}
      },
      init: function() {
        const a = this;
        if (
          !(
            !a.params.hashNavigation.enabled ||
            (a.params.history && a.params.history.enabled)
          )
        ) {
          a.hashNavigation.initialized = !0;
          const s = e.location.hash.replace('#', '');
          if (s) {
for (let r = 0, n = a.slides.length; r < n; r += 1) {
              const o = a.slides.eq(r);
              if (
                (o.attr('data-hash') || o.attr('data-history')) === s &&
                !o.hasClass(a.params.slideDuplicateClass)
              ) {
                const l = o.index();
                a.slideTo(l, 0, a.params.runCallbacksOnInit, !0);
              }
            }
}
          a.params.hashNavigation.watchState &&
            i(t).on('hashchange', a.hashNavigation.onHashCange);
        }
      },
      destroy: function() {
        this.params.hashNavigation.watchState &&
          i(t).off('hashchange', this.hashNavigation.onHashCange);
      },
    };
    const _ = {
      run: function() {
        const e = this;
          const t = e.slides.eq(e.activeIndex);
          let a = e.params.autoplay.delay;
        t.attr('data-swiper-autoplay') &&
          (a = t.attr('data-swiper-autoplay') || e.params.autoplay.delay),
          (e.autoplay.timeout = d.nextTick(function() {
            e.params.autoplay.reverseDirection ?
              e.params.loop ?
                (e.loopFix(),
                  e.slidePrev(e.params.speed, !0, !0),
                  e.emit('autoplay')) :
                e.isBeginning ?
                e.params.autoplay.stopOnLastSlide ?
                  e.autoplay.stop() :
                  (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                    e.emit('autoplay')) :
                (e.slidePrev(e.params.speed, !0, !0), e.emit('autoplay')) :
              e.params.loop ?
              (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit('autoplay')) :
              e.isEnd ?
              e.params.autoplay.stopOnLastSlide ?
                e.autoplay.stop() :
                (e.slideTo(0, e.params.speed, !0, !0), e.emit('autoplay')) :
              (e.slideNext(e.params.speed, !0, !0), e.emit('autoplay'));
          }, a));
      },
      start: function() {
        const e = this;
        return (
          void 0 === e.autoplay.timeout &&
          !e.autoplay.running &&
          ((e.autoplay.running = !0),
          e.emit('autoplayStart'),
          e.autoplay.run(),
          !0)
        );
      },
      stop: function() {
        const e = this;
        return (
          !!e.autoplay.running &&
          void 0 !== e.autoplay.timeout &&
          (e.autoplay.timeout &&
            (clearTimeout(e.autoplay.timeout), (e.autoplay.timeout = void 0)),
          (e.autoplay.running = !1),
          e.emit('autoplayStop'),
          !0)
        );
      },
      pause: function(e) {
        const t = this;
        t.autoplay.running &&
          (t.autoplay.paused ||
            (t.autoplay.timeout && clearTimeout(t.autoplay.timeout),
            (t.autoplay.paused = !0),
            0 !== e && t.params.autoplay.waitForTransition ?
              (t.$wrapperEl[0].addEventListener(
                  'transitionend',
                  t.autoplay.onTransitionEnd,
                ),
                t.$wrapperEl[0].addEventListener(
                  'webkitTransitionEnd',
                  t.autoplay.onTransitionEnd,
                )) :
              ((t.autoplay.paused = !1), t.autoplay.run())));
      },
    };
    const Z = {
      setTranslate: function() {
        for (let e = this, t = e.slides, a = 0; a < t.length; a += 1) {
          const i = e.slides.eq(a);
            let s = -i[0].swiperSlideOffset;
          e.params.virtualTranslate || (s -= e.translate);
          let r = 0;
          e.isHorizontal() || ((r = s), (s = 0));
          const n = e.params.fadeEffect.crossFade ?
            Math.max(1 - Math.abs(i[0].progress), 0) :
            1 + Math.min(Math.max(i[0].progress, -1), 0);
          i.css({opacity: n}).transform(
            'translate3d(' + s + 'px, ' + r + 'px, 0px)',
          );
        }
      },
      setTransition: function(e) {
        const t = this;
          const a = t.slides;
          const i = t.$wrapperEl;
        if ((a.transition(e), t.params.virtualTranslate && 0 !== e)) {
          let s = !1;
          a.transitionEnd(function() {
            if (!s && t && !t.destroyed) {
              (s = !0), (t.animating = !1);
              for (
                let e = ['webkitTransitionEnd', 'transitionend'], a = 0;
                a < e.length;
                a += 1
              ) {
i.trigger(e[a]);
}
            }
          });
        }
      },
    };
    const Q = {
      setTranslate: function() {
        let e;
          const t = this;
          const a = t.$el;
          const s = t.$wrapperEl;
          const r = t.slides;
          const n = t.width;
          const o = t.height;
          const l = t.rtlTranslate;
          const d = t.size;
          const p = t.params.cubeEffect;
          const c = t.isHorizontal();
          const u = t.virtual && t.params.virtual.enabled;
          let h = 0;
        p.shadow &&
          (c ?
            (0 === (e = s.find('.swiper-cube-shadow')).length &&
                ((e = i('<div class="swiper-cube-shadow"></div>')),
                s.append(e)),
              e.css({height: n + 'px'})) :
            0 === (e = a.find('.swiper-cube-shadow')).length &&
              ((e = i('<div class="swiper-cube-shadow"></div>')), a.append(e)));
        for (let v = 0; v < r.length; v += 1) {
          const f = r.eq(v);
            let m = v;
          u && (m = parseInt(f.attr('data-swiper-slide-index'), 10));
          let g = 90 * m;
            let b = Math.floor(g / 360);
          l && ((g = -g), (b = Math.floor(-g / 360)));
          const w = Math.max(Math.min(f[0].progress, 1), -1);
            let y = 0;
            let x = 0;
            let E = 0;
          m % 4 == 0 ?
            ((y = 4 * -b * d), (E = 0)) :
            (m - 1) % 4 == 0 ?
            ((y = 0), (E = 4 * -b * d)) :
            (m - 2) % 4 == 0 ?
            ((y = d + 4 * b * d), (E = d)) :
            (m - 3) % 4 == 0 && ((y = -d), (E = 3 * d + 4 * d * b)),
            l && (y = -y),
            c || ((x = y), (y = 0));
          const T =
            'rotateX(' +
            (c ? 0 : -g) +
            'deg) rotateY(' +
            (c ? g : 0) +
            'deg) translate3d(' +
            y +
            'px, ' +
            x +
            'px, ' +
            E +
            'px)';
          if (
            (w <= 1 &&
              w > -1 &&
              ((h = 90 * m + 90 * w), l && (h = 90 * -m - 90 * w)),
            f.transform(T),
            p.slideShadows)
          ) {
            let C = c ?
                f.find('.swiper-slide-shadow-left') :
                f.find('.swiper-slide-shadow-top');
              let M = c ?
                f.find('.swiper-slide-shadow-right') :
                f.find('.swiper-slide-shadow-bottom');
            0 === C.length &&
              ((C = i(
                '<div class="swiper-slide-shadow-' +
                  (c ? 'left' : 'top') +
                  '"></div>',
              )),
              f.append(C)),
              0 === M.length &&
                ((M = i(
                  '<div class="swiper-slide-shadow-' +
                    (c ? 'right' : 'bottom') +
                    '"></div>',
                )),
                f.append(M)),
              C.length && (C[0].style.opacity = Math.max(-w, 0)),
              M.length && (M[0].style.opacity = Math.max(w, 0));
          }
        }
        if (
          (s.css({
            '-webkit-transform-origin': '50% 50% -' + d / 2 + 'px',
            '-moz-transform-origin': '50% 50% -' + d / 2 + 'px',
            '-ms-transform-origin': '50% 50% -' + d / 2 + 'px',
            'transform-origin': '50% 50% -' + d / 2 + 'px',
          }),
          p.shadow)
        ) {
if (c) {
e.transform(
              'translate3d(0px, ' +
                (n / 2 + p.shadowOffset) +
                'px, ' +
                -n / 2 +
                'px) rotateX(90deg) rotateZ(0deg) scale(' +
                p.shadowScale +
                ')',
            );
} else {
            const z = Math.abs(h) - 90 * Math.floor(Math.abs(h) / 90);
              const k =
                1.5 -
                (Math.sin((2 * z * Math.PI) / 360) / 2 +
                  Math.cos((2 * z * Math.PI) / 360) / 2);
              const P = p.shadowScale;
              const $ = p.shadowScale / k;
              const L = p.shadowOffset;
            e.transform(
              'scale3d(' +
                P +
                ', 1, ' +
                $ +
                ') translate3d(0px, ' +
                (o / 2 + L) +
                'px, ' +
                -o / 2 / $ +
                'px) rotateX(-90deg)',
            );
          }
}
        const I = S.isSafari || S.isUiWebView ? -d / 2 : 0;
        s.transform(
          'translate3d(0px,0,' +
            I +
            'px) rotateX(' +
            (t.isHorizontal() ? 0 : h) +
            'deg) rotateY(' +
            (t.isHorizontal() ? -h : 0) +
            'deg)',
        );
      },
      setTransition: function(e) {
        const t = this.$el;
        this.slides
          .transition(e)
          .find(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
          )
          .transition(e),
          this.params.cubeEffect.shadow &&
            !this.isHorizontal() &&
            t.find('.swiper-cube-shadow').transition(e);
      },
    };
    const J = {
      setTranslate: function() {
        for (
          let e = this, t = e.slides, a = e.rtlTranslate, s = 0;
          s < t.length;
          s += 1
        ) {
          const r = t.eq(s);
            let n = r[0].progress;
          e.params.flipEffect.limitRotation &&
            (n = Math.max(Math.min(r[0].progress, 1), -1));
          let o = -180 * n;
            let l = 0;
            let d = -r[0].swiperSlideOffset;
            let p = 0;
          if (
            (e.isHorizontal() ?
              a && (o = -o) :
              ((p = d), (d = 0), (l = -o), (o = 0)),
            (r[0].style.zIndex = -Math.abs(Math.round(n)) + t.length),
            e.params.flipEffect.slideShadows)
          ) {
            let c = e.isHorizontal() ?
                r.find('.swiper-slide-shadow-left') :
                r.find('.swiper-slide-shadow-top');
              let u = e.isHorizontal() ?
                r.find('.swiper-slide-shadow-right') :
                r.find('.swiper-slide-shadow-bottom');
            0 === c.length &&
              ((c = i(
                '<div class="swiper-slide-shadow-' +
                  (e.isHorizontal() ? 'left' : 'top') +
                  '"></div>',
              )),
              r.append(c)),
              0 === u.length &&
                ((u = i(
                  '<div class="swiper-slide-shadow-' +
                    (e.isHorizontal() ? 'right' : 'bottom') +
                    '"></div>',
                )),
                r.append(u)),
              c.length && (c[0].style.opacity = Math.max(-n, 0)),
              u.length && (u[0].style.opacity = Math.max(n, 0));
          }
          r.transform(
            'translate3d(' +
              d +
              'px, ' +
              p +
              'px, 0px) rotateX(' +
              l +
              'deg) rotateY(' +
              o +
              'deg)',
          );
        }
      },
      setTransition: function(e) {
        const t = this;
          const a = t.slides;
          const i = t.activeIndex;
          const s = t.$wrapperEl;
        if (
          (a
            .transition(e)
            .find(
              '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
            )
            .transition(e),
          t.params.virtualTranslate && 0 !== e)
        ) {
          let r = !1;
          a.eq(i).transitionEnd(function() {
            if (!r && t && !t.destroyed) {
              (r = !0), (t.animating = !1);
              for (
                let e = ['webkitTransitionEnd', 'transitionend'], a = 0;
                a < e.length;
                a += 1
              ) {
s.trigger(e[a]);
}
            }
          });
        }
      },
    };
    const ee = {
      setTranslate: function() {
        for (
          var e = this,
            t = e.width,
            a = e.height,
            s = e.slides,
            r = e.$wrapperEl,
            n = e.slidesSizesGrid,
            o = e.params.coverflowEffect,
            l = e.isHorizontal(),
            d = e.translate,
            c = l ? t / 2 - d : a / 2 - d,
            u = l ? o.rotate : -o.rotate,
            h = o.depth,
            v = 0,
            f = s.length;
          v < f;
          v += 1
        ) {
          const m = s.eq(v);
            const g = n[v];
            const b = ((c - m[0].swiperSlideOffset - g / 2) / g) * o.modifier;
            let w = l ? u * b : 0;
            let y = l ? 0 : u * b;
            let x = -h * Math.abs(b);
            let E = l ? 0 : o.stretch * b;
            let T = l ? o.stretch * b : 0;
          Math.abs(T) < 0.001 && (T = 0),
            Math.abs(E) < 0.001 && (E = 0),
            Math.abs(x) < 0.001 && (x = 0),
            Math.abs(w) < 0.001 && (w = 0),
            Math.abs(y) < 0.001 && (y = 0);
          const S =
            'translate3d(' +
            T +
            'px,' +
            E +
            'px,' +
            x +
            'px)  rotateX(' +
            y +
            'deg) rotateY(' +
            w +
            'deg)';
          if (
            (m.transform(S),
            (m[0].style.zIndex = 1 - Math.abs(Math.round(b))),
            o.slideShadows)
          ) {
            let C = l ?
                m.find('.swiper-slide-shadow-left') :
                m.find('.swiper-slide-shadow-top');
              let M = l ?
                m.find('.swiper-slide-shadow-right') :
                m.find('.swiper-slide-shadow-bottom');
            0 === C.length &&
              ((C = i(
                '<div class="swiper-slide-shadow-' +
                  (l ? 'left' : 'top') +
                  '"></div>',
              )),
              m.append(C)),
              0 === M.length &&
                ((M = i(
                  '<div class="swiper-slide-shadow-' +
                    (l ? 'right' : 'bottom') +
                    '"></div>',
                )),
                m.append(M)),
              C.length && (C[0].style.opacity = b > 0 ? b : 0),
              M.length && (M[0].style.opacity = -b > 0 ? -b : 0);
          }
        }
        (p.pointerEvents || p.prefixedPointerEvents) &&
          (r[0].style.perspectiveOrigin = c + 'px 50%');
      },
      setTransition: function(e) {
        this.slides
          .transition(e)
          .find(
            '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
          )
          .transition(e);
      },
    };
    const te = [
      P,
      $,
      L,
      I,
      O,
      G,
      N,
      {
        name: 'mousewheel',
        params: {
          mousewheel: {
            enabled: !1,
            releaseOnEdges: !1,
            invert: !1,
            forceToAxis: !1,
            sensitivity: 1,
            eventsTarged: 'container',
          },
        },
        create: function() {
          const e = this;
          d.extend(e, {
            mousewheel: {
              enabled: !1,
              enable: B.enable.bind(e),
              disable: B.disable.bind(e),
              handle: B.handle.bind(e),
              handleMouseEnter: B.handleMouseEnter.bind(e),
              handleMouseLeave: B.handleMouseLeave.bind(e),
              lastScrollTime: d.now(),
            },
          });
        },
        on: {
          init: function() {
            this.params.mousewheel.enabled && this.mousewheel.enable();
          },
          destroy: function() {
            this.mousewheel.enabled && this.mousewheel.disable();
          },
        },
      },
      {
        name: 'navigation',
        params: {
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: 'swiper-button-disabled',
            hiddenClass: 'swiper-button-hidden',
            lockClass: 'swiper-button-lock',
          },
        },
        create: function() {
          d.extend(this, {
            navigation: {
              init: X.init.bind(this),
              update: X.update.bind(this),
              destroy: X.destroy.bind(this),
            },
          });
        },
        on: {
          init: function() {
            this.navigation.init(), this.navigation.update();
          },
          toEdge: function() {
            this.navigation.update();
          },
          fromEdge: function() {
            this.navigation.update();
          },
          destroy: function() {
            this.navigation.destroy();
          },
          click: function(e) {
            const t = this.navigation;
              const a = t.$nextEl;
              const s = t.$prevEl;
            !this.params.navigation.hideOnClick ||
              i(e.target).is(s) ||
              i(e.target).is(a) ||
              (a && a.toggleClass(this.params.navigation.hiddenClass),
              s && s.toggleClass(this.params.navigation.hiddenClass));
          },
        },
      },
      {
        name: 'pagination',
        params: {
          pagination: {
            el: null,
            bulletElement: 'span',
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: 'bullets',
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            bulletClass: 'swiper-pagination-bullet',
            bulletActiveClass: 'swiper-pagination-bullet-active',
            modifierClass: 'swiper-pagination-',
            currentClass: 'swiper-pagination-current',
            totalClass: 'swiper-pagination-total',
            hiddenClass: 'swiper-pagination-hidden',
            progressbarFillClass: 'swiper-pagination-progressbar-fill',
            progressbarOppositeClass: 'swiper-pagination-progressbar-opposite',
            clickableClass: 'swiper-pagination-clickable',
            lockClass: 'swiper-pagination-lock',
          },
        },
        create: function() {
          const e = this;
          d.extend(e, {
            pagination: {
              init: Y.init.bind(e),
              render: Y.render.bind(e),
              update: Y.update.bind(e),
              destroy: Y.destroy.bind(e),
              dynamicBulletIndex: 0,
            },
          });
        },
        on: {
          init: function() {
            this.pagination.init(),
              this.pagination.render(),
              this.pagination.update();
          },
          activeIndexChange: function() {
            this.params.loop ?
              this.pagination.update() :
              void 0 === this.snapIndex && this.pagination.update();
          },
          snapIndexChange: function() {
            this.params.loop || this.pagination.update();
          },
          slidesLengthChange: function() {
            this.params.loop &&
              (this.pagination.render(), this.pagination.update());
          },
          snapGridLengthChange: function() {
            this.params.loop ||
              (this.pagination.render(), this.pagination.update());
          },
          destroy: function() {
            this.pagination.destroy();
          },
          click: function(e) {
            const t = this;
            t.params.pagination.el &&
              t.params.pagination.hideOnClick &&
              t.pagination.$el.length > 0 &&
              !i(e.target).hasClass(t.params.pagination.bulletClass) &&
              t.pagination.$el.toggleClass(t.params.pagination.hiddenClass);
          },
        },
      },
      {
        name: 'scrollbar',
        params: {
          scrollbar: {
            el: null,
            dragSize: 'auto',
            hide: !1,
            draggable: !1,
            snapOnRelease: !0,
            lockClass: 'swiper-scrollbar-lock',
            dragClass: 'swiper-scrollbar-drag',
          },
        },
        create: function() {
          const e = this;
          d.extend(e, {
            scrollbar: {
              init: V.init.bind(e),
              destroy: V.destroy.bind(e),
              updateSize: V.updateSize.bind(e),
              setTranslate: V.setTranslate.bind(e),
              setTransition: V.setTransition.bind(e),
              enableDraggable: V.enableDraggable.bind(e),
              disableDraggable: V.disableDraggable.bind(e),
              setDragPosition: V.setDragPosition.bind(e),
              onDragStart: V.onDragStart.bind(e),
              onDragMove: V.onDragMove.bind(e),
              onDragEnd: V.onDragEnd.bind(e),
              isTouched: !1,
              timeout: null,
              dragTimeout: null,
            },
          });
        },
        on: {
          init: function() {
            this.scrollbar.init(),
              this.scrollbar.updateSize(),
              this.scrollbar.setTranslate();
          },
          update: function() {
            this.scrollbar.updateSize();
          },
          resize: function() {
            this.scrollbar.updateSize();
          },
          observerUpdate: function() {
            this.scrollbar.updateSize();
          },
          setTranslate: function() {
            this.scrollbar.setTranslate();
          },
          setTransition: function(e) {
            this.scrollbar.setTransition(e);
          },
          destroy: function() {
            this.scrollbar.destroy();
          },
        },
      },
      {
        name: 'parallax',
        params: {parallax: {enabled: !1}},
        create: function() {
          d.extend(this, {
            parallax: {
              setTransform: R.setTransform.bind(this),
              setTranslate: R.setTranslate.bind(this),
              setTransition: R.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function() {
            this.params.parallax.enabled &&
              (this.params.watchSlidesProgress = !0);
          },
          init: function() {
            this.params.parallax && this.parallax.setTranslate();
          },
          setTranslate: function() {
            this.params.parallax && this.parallax.setTranslate();
          },
          setTransition: function(e) {
            this.params.parallax && this.parallax.setTransition(e);
          },
        },
      },
      {
        name: 'zoom',
        params: {
          zoom: {
            enabled: !1,
            maxRatio: 3,
            minRatio: 1,
            toggle: !0,
            containerClass: 'swiper-zoom-container',
            zoomedSlideClass: 'swiper-slide-zoomed',
          },
        },
        create: function() {
          const e = this;
            const t = {
              enabled: !1,
              scale: 1,
              currentScale: 1,
              isScaling: !1,
              gesture: {
                $slideEl: void 0,
                slideWidth: void 0,
                slideHeight: void 0,
                $imageEl: void 0,
                $imageWrapEl: void 0,
                maxRatio: 3,
              },
              image: {
                isTouched: void 0,
                isMoved: void 0,
                currentX: void 0,
                currentY: void 0,
                minX: void 0,
                minY: void 0,
                maxX: void 0,
                maxY: void 0,
                width: void 0,
                height: void 0,
                startX: void 0,
                startY: void 0,
                touchesStart: {},
                touchesCurrent: {},
              },
              velocity: {
                x: void 0,
                y: void 0,
                prevPositionX: void 0,
                prevPositionY: void 0,
                prevTime: void 0,
              },
            };
          'onGestureStart onGestureChange onGestureEnd onTouchStart onTouchMove onTouchEnd onTransitionEnd toggle enable disable in out'
            .split(' ')
            .forEach(function(a) {
              t[a] = F[a].bind(e);
            }),
            d.extend(e, {zoom: t});
        },
        on: {
          init: function() {
            this.params.zoom.enabled && this.zoom.enable();
          },
          destroy: function() {
            this.zoom.disable();
          },
          touchStart: function(e) {
            this.zoom.enabled && this.zoom.onTouchStart(e);
          },
          touchEnd: function(e) {
            this.zoom.enabled && this.zoom.onTouchEnd(e);
          },
          doubleTap: function(e) {
            this.params.zoom.enabled &&
              this.zoom.enabled &&
              this.params.zoom.toggle &&
              this.zoom.toggle(e);
          },
          transitionEnd: function() {
            this.zoom.enabled &&
              this.params.zoom.enabled &&
              this.zoom.onTransitionEnd();
          },
        },
      },
      {
        name: 'lazy',
        params: {
          lazy: {
            enabled: !1,
            loadPrevNext: !1,
            loadPrevNextAmount: 1,
            loadOnTransitionStart: !1,
            elementClass: 'swiper-lazy',
            loadingClass: 'swiper-lazy-loading',
            loadedClass: 'swiper-lazy-loaded',
            preloaderClass: 'swiper-lazy-preloader',
          },
        },
        create: function() {
          d.extend(this, {
            lazy: {
              initialImageLoaded: !1,
              load: W.load.bind(this),
              loadInSlide: W.loadInSlide.bind(this),
            },
          });
        },
        on: {
          beforeInit: function() {
            this.params.lazy.enabled &&
              this.params.preloadImages &&
              (this.params.preloadImages = !1);
          },
          init: function() {
            this.params.lazy.enabled &&
              !this.params.loop &&
              0 === this.params.initialSlide &&
              this.lazy.load();
          },
          scroll: function() {
            this.params.freeMode &&
              !this.params.freeModeSticky &&
              this.lazy.load();
          },
          resize: function() {
            this.params.lazy.enabled && this.lazy.load();
          },
          scrollbarDragMove: function() {
            this.params.lazy.enabled && this.lazy.load();
          },
          transitionStart: function() {
            const e = this;
            e.params.lazy.enabled &&
              (e.params.lazy.loadOnTransitionStart ||
                (!e.params.lazy.loadOnTransitionStart &&
                  !e.lazy.initialImageLoaded)) &&
              e.lazy.load();
          },
          transitionEnd: function() {
            this.params.lazy.enabled &&
              !this.params.lazy.loadOnTransitionStart &&
              this.lazy.load();
          },
        },
      },
      {
        name: 'controller',
        params: {controller: {control: void 0, inverse: !1, by: 'slide'}},
        create: function() {
          const e = this;
          d.extend(e, {
            controller: {
              control: e.params.controller.control,
              getInterpolateFunction: q.getInterpolateFunction.bind(e),
              setTranslate: q.setTranslate.bind(e),
              setTransition: q.setTransition.bind(e),
            },
          });
        },
        on: {
          update: function() {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          resize: function() {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          observerUpdate: function() {
            this.controller.control &&
              this.controller.spline &&
              ((this.controller.spline = void 0),
              delete this.controller.spline);
          },
          setTranslate: function(e, t) {
            this.controller.control && this.controller.setTranslate(e, t);
          },
          setTransition: function(e, t) {
            this.controller.control && this.controller.setTransition(e, t);
          },
        },
      },
      {
        name: 'a11y',
        params: {
          a11y: {
            enabled: !0,
            notificationClass: 'swiper-notification',
            prevSlideMessage: 'Previous slide',
            nextSlideMessage: 'Next slide',
            firstSlideMessage: 'This is the first slide',
            lastSlideMessage: 'This is the last slide',
            paginationBulletMessage: 'Go to slide {{index}}',
          },
        },
        create: function() {
          const e = this;
          d.extend(e, {
            a11y: {
              liveRegion: i(
                '<span class="' +
                  e.params.a11y.notificationClass +
                  '" aria-live="assertive" aria-atomic="true"></span>',
              ),
            },
          }),
            Object.keys(j).forEach(function(t) {
              e.a11y[t] = j[t].bind(e);
            });
        },
        on: {
          init: function() {
            this.params.a11y.enabled &&
              (this.a11y.init(), this.a11y.updateNavigation());
          },
          toEdge: function() {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          fromEdge: function() {
            this.params.a11y.enabled && this.a11y.updateNavigation();
          },
          paginationUpdate: function() {
            this.params.a11y.enabled && this.a11y.updatePagination();
          },
          destroy: function() {
            this.params.a11y.enabled && this.a11y.destroy();
          },
        },
      },
      {
        name: 'history',
        params: {history: {enabled: !1, replaceState: !1, key: 'slides'}},
        create: function() {
          const e = this;
          d.extend(e, {
            history: {
              init: K.init.bind(e),
              setHistory: K.setHistory.bind(e),
              setHistoryPopState: K.setHistoryPopState.bind(e),
              scrollToSlide: K.scrollToSlide.bind(e),
              destroy: K.destroy.bind(e),
            },
          });
        },
        on: {
          init: function() {
            this.params.history.enabled && this.history.init();
          },
          destroy: function() {
            this.params.history.enabled && this.history.destroy();
          },
          transitionEnd: function() {
            this.history.initialized &&
              this.history.setHistory(
                this.params.history.key,
                this.activeIndex,
              );
          },
        },
      },
      {
        name: 'hash-navigation',
        params: {
          hashNavigation: {enabled: !1, replaceState: !1, watchState: !1},
        },
        create: function() {
          const e = this;
          d.extend(e, {
            hashNavigation: {
              initialized: !1,
              init: U.init.bind(e),
              destroy: U.destroy.bind(e),
              setHash: U.setHash.bind(e),
              onHashCange: U.onHashCange.bind(e),
            },
          });
        },
        on: {
          init: function() {
            this.params.hashNavigation.enabled && this.hashNavigation.init();
          },
          destroy: function() {
            this.params.hashNavigation.enabled && this.hashNavigation.destroy();
          },
          transitionEnd: function() {
            this.hashNavigation.initialized && this.hashNavigation.setHash();
          },
        },
      },
      {
        name: 'autoplay',
        params: {
          autoplay: {
            enabled: !1,
            delay: 3e3,
            waitForTransition: !0,
            disableOnInteraction: !0,
            stopOnLastSlide: !1,
            reverseDirection: !1,
          },
        },
        create: function() {
          const e = this;
          d.extend(e, {
            autoplay: {
              running: !1,
              paused: !1,
              run: _.run.bind(e),
              start: _.start.bind(e),
              stop: _.stop.bind(e),
              pause: _.pause.bind(e),
              onTransitionEnd: function(t) {
                e &&
                  !e.destroyed &&
                  e.$wrapperEl &&
                  t.target === this &&
                  (e.$wrapperEl[0].removeEventListener(
                    'transitionend',
                    e.autoplay.onTransitionEnd,
                  ),
                  e.$wrapperEl[0].removeEventListener(
                    'webkitTransitionEnd',
                    e.autoplay.onTransitionEnd,
                  ),
                  (e.autoplay.paused = !1),
                  e.autoplay.running ? e.autoplay.run() : e.autoplay.stop());
              },
            },
          });
        },
        on: {
          init: function() {
            this.params.autoplay.enabled && this.autoplay.start();
          },
          beforeTransitionStart: function(e, t) {
            this.autoplay.running &&
              (t || !this.params.autoplay.disableOnInteraction ?
                this.autoplay.pause(e) :
                this.autoplay.stop());
          },
          sliderFirstMove: function() {
            this.autoplay.running &&
              (this.params.autoplay.disableOnInteraction ?
                this.autoplay.stop() :
                this.autoplay.pause());
          },
          destroy: function() {
            this.autoplay.running && this.autoplay.stop();
          },
        },
      },
      {
        name: 'effect-fade',
        params: {fadeEffect: {crossFade: !1}},
        create: function() {
          d.extend(this, {
            fadeEffect: {
              setTranslate: Z.setTranslate.bind(this),
              setTransition: Z.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function() {
            const e = this;
            if ('fade' === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + 'fade');
              const t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              d.extend(e.params, t), d.extend(e.originalParams, t);
            }
          },
          setTranslate: function() {
            'fade' === this.params.effect && this.fadeEffect.setTranslate();
          },
          setTransition: function(e) {
            'fade' === this.params.effect && this.fadeEffect.setTransition(e);
          },
        },
      },
      {
        name: 'effect-cube',
        params: {
          cubeEffect: {
            slideShadows: !0,
            shadow: !0,
            shadowOffset: 20,
            shadowScale: 0.94,
          },
        },
        create: function() {
          d.extend(this, {
            cubeEffect: {
              setTranslate: Q.setTranslate.bind(this),
              setTransition: Q.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function() {
            const e = this;
            if ('cube' === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + 'cube'),
                e.classNames.push(e.params.containerModifierClass + '3d');
              const t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                resistanceRatio: 0,
                spaceBetween: 0,
                centeredSlides: !1,
                virtualTranslate: !0,
              };
              d.extend(e.params, t), d.extend(e.originalParams, t);
            }
          },
          setTranslate: function() {
            'cube' === this.params.effect && this.cubeEffect.setTranslate();
          },
          setTransition: function(e) {
            'cube' === this.params.effect && this.cubeEffect.setTransition(e);
          },
        },
      },
      {
        name: 'effect-flip',
        params: {flipEffect: {slideShadows: !0, limitRotation: !0}},
        create: function() {
          d.extend(this, {
            flipEffect: {
              setTranslate: J.setTranslate.bind(this),
              setTransition: J.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function() {
            const e = this;
            if ('flip' === e.params.effect) {
              e.classNames.push(e.params.containerModifierClass + 'flip'),
                e.classNames.push(e.params.containerModifierClass + '3d');
              const t = {
                slidesPerView: 1,
                slidesPerColumn: 1,
                slidesPerGroup: 1,
                watchSlidesProgress: !0,
                spaceBetween: 0,
                virtualTranslate: !0,
              };
              d.extend(e.params, t), d.extend(e.originalParams, t);
            }
          },
          setTranslate: function() {
            'flip' === this.params.effect && this.flipEffect.setTranslate();
          },
          setTransition: function(e) {
            'flip' === this.params.effect && this.flipEffect.setTransition(e);
          },
        },
      },
      {
        name: 'effect-coverflow',
        params: {
          coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: !0,
          },
        },
        create: function() {
          d.extend(this, {
            coverflowEffect: {
              setTranslate: ee.setTranslate.bind(this),
              setTransition: ee.setTransition.bind(this),
            },
          });
        },
        on: {
          beforeInit: function() {
            const e = this;
            'coverflow' === e.params.effect &&
              (e.classNames.push(e.params.containerModifierClass + 'coverflow'),
              e.classNames.push(e.params.containerModifierClass + '3d'),
              (e.params.watchSlidesProgress = !0),
              (e.originalParams.watchSlidesProgress = !0));
          },
          setTranslate: function() {
            'coverflow' === this.params.effect &&
              this.coverflowEffect.setTranslate();
          },
          setTransition: function(e) {
            'coverflow' === this.params.effect &&
              this.coverflowEffect.setTransition(e);
          },
        },
      },
    ];
  return (
    void 0 === k.use &&
      ((k.use = k.Class.use), (k.installModule = k.Class.installModule)),
    k.use(te),
    k
  );
});

/* !
 * VERSION: 2.0.2
 * DATE: 2018-08-27
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * Includes all of the following: TweenLite, TweenMax, TimelineLite, TimelineMax, EasePack, CSSPlugin, RoundPropsPlugin, BezierPlugin, AttrPlugin, DirectionalRotationPlugin
 *
 * @license Copyright (c) 2008-2018, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
const _gsScope =
  'undefined' != typeof module && module.exports && 'undefined' != typeof global ?
    global :
    this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
  'use strict';
  _gsScope._gsDefine(
    'TweenMax',
    ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
    function(a, b, c) {
      const d = function(a) {
          let b;
            const c = [];
            const d = a.length;
          for (b = 0; b !== d; c.push(a[b++]));
          return c;
        };
        const e = function(a, b, c) {
          let d;
            let e;
            const f = a.cycle;
          for (d in f) {
(e = f[d]),
              (a[d] = 'function' == typeof e ? e(c, b[c]) : e[c % e.length]);
}
          delete a.cycle;
        };
        var f = function(a, b, d) {
          c.call(this, a, b, d),
            (this._cycle = 0),
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            this._repeat && this._uncache(!0),
            (this.render = f.prototype.render);
        };
        const g = 1e-10;
        const h = c._internals;
        const i = h.isSelector;
        const j = h.isArray;
        const k = (f.prototype = c.to({}, 0.1, {}));
        const l = [];
      (f.version = '2.0.2'),
        (k.constructor = f),
        (k.kill()._gc = !1),
        (f.killTweensOf = f.killDelayedCallsTo = c.killTweensOf),
        (f.getTweensOf = c.getTweensOf),
        (f.lagSmoothing = c.lagSmoothing),
        (f.ticker = c.ticker),
        (f.render = c.render),
        (k.invalidate = function() {
          return (
            (this._yoyo = this.vars.yoyo === !0 || !!this.vars.yoyoEase),
            (this._repeat = this.vars.repeat || 0),
            (this._repeatDelay = this.vars.repeatDelay || 0),
            (this._yoyoEase = null),
            this._uncache(!0),
            c.prototype.invalidate.call(this)
          );
        }),
        (k.updateTo = function(a, b) {
          let d;
            const e = this.ratio;
            const f = this.vars.immediateRender || a.immediateRender;
          b &&
            this._startTime < this._timeline._time &&
            ((this._startTime = this._timeline._time),
            this._uncache(!1),
            this._gc ?
              this._enabled(!0, !1) :
              this._timeline.insert(this, this._startTime - this._delay));
          for (d in a) this.vars[d] = a[d];
          if (this._initted || f) {
if (b) (this._initted = !1), f && this.render(0, !0, !0);
            else if (
              (this._gc && this._enabled(!0, !1),
              this._notifyPluginsOfEnabled &&
                this._firstPT &&
                c._onPluginEvent('_onDisable', this),
              this._time / this._duration > 0.998)
            ) {
              const g = this._totalTime;
              this.render(0, !0, !1),
                (this._initted = !1),
                this.render(g, !0, !1);
            } else if (
              ((this._initted = !1), this._init(), this._time > 0 || f)
            ) {
for (var h, i = 1 / (1 - e), j = this._firstPT; j; ) {
(h = j.s + j.c), (j.c *= i), (j.s = h - j.c), (j = j._next);
}
}
}
          return this;
        }),
        (k.render = function(a, b, d) {
          this._initted ||
            (0 === this._duration && this.vars.repeat && this.invalidate());
          let e;
            let f;
            let i;
            let j;
            let k;
            let l;
            let m;
            let n;
            let o;
            const p = this._dirty ? this.totalDuration() : this._totalDuration;
            const q = this._time;
            const r = this._totalTime;
            const s = this._cycle;
            const t = this._duration;
            const u = this._rawPrevTime;
          if (
            (a >= p - 1e-7 && a >= 0 ?
              ((this._totalTime = p),
                (this._cycle = this._repeat),
                this._yoyo && 0 !== (1 & this._cycle) ?
                  ((this._time = 0),
                    (this.ratio = this._ease._calcEnd ?
                      this._ease.getRatio(0) :
                      0)) :
                  ((this._time = t),
                    (this.ratio = this._ease._calcEnd ?
                      this._ease.getRatio(1) :
                      1)),
                this._reversed ||
                  ((e = !0),
                  (f = 'onComplete'),
                  (d = d || this._timeline.autoRemoveChildren)),
                0 === t &&
                  (this._initted || !this.vars.lazy || d) &&
                  (this._startTime === this._timeline._duration && (a = 0),
                  (0 > u ||
                    (0 >= a && a >= -1e-7) ||
                    (u === g && 'isPause' !== this.data)) &&
                    u !== a &&
                    ((d = !0), u > g && (f = 'onReverseComplete')),
                  (this._rawPrevTime = n = !b || a || u === a ? a : g))) :
              1e-7 > a ?
              ((this._totalTime = this._time = this._cycle = 0),
                (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
                (0 !== r || (0 === t && u > 0)) &&
                  ((f = 'onReverseComplete'), (e = this._reversed)),
                0 > a &&
                  ((this._active = !1),
                  0 === t &&
                    (this._initted || !this.vars.lazy || d) &&
                    (u >= 0 && (d = !0),
                    (this._rawPrevTime = n = !b || a || u === a ? a : g))),
                this._initted || (d = !0)) :
              ((this._totalTime = this._time = a),
                0 !== this._repeat &&
                  ((j = t + this._repeatDelay),
                  (this._cycle = (this._totalTime / j) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / j &&
                    a >= r &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * j),
                  this._yoyo &&
                    0 !== (1 & this._cycle) &&
                    ((this._time = t - this._time),
                    (o = this._yoyoEase || this.vars.yoyoEase),
                    o &&
                      (this._yoyoEase ||
                        (o !== !0 || this._initted ?
                          (this._yoyoEase = o =
                              o === !0 ?
                                this._ease :
                                o instanceof Ease ?
                                o :
                                Ease.map[o]) :
                          ((o = this.vars.ease),
                            (this._yoyoEase = o = o ?
                              o instanceof Ease ?
                                o :
                                'function' == typeof o ?
                                new Ease(o, this.vars.easeParams) :
                                Ease.map[o] || c.defaultEase :
                              c.defaultEase))),
                      (this.ratio = o ?
                        1 - o.getRatio((t - this._time) / t) :
                        0))),
                  this._time > t ?
                    (this._time = t) :
                    this._time < 0 && (this._time = 0)),
                this._easeType && !o ?
                  ((k = this._time / t),
                    (l = this._easeType),
                    (m = this._easePower),
                    (1 === l || (3 === l && k >= 0.5)) && (k = 1 - k),
                    3 === l && (k *= 2),
                    1 === m ?
                      (k *= k) :
                      2 === m ?
                      (k *= k * k) :
                      3 === m ?
                      (k *= k * k * k) :
                      4 === m && (k *= k * k * k * k),
                    1 === l ?
                      (this.ratio = 1 - k) :
                      2 === l ?
                      (this.ratio = k) :
                      this._time / t < 0.5 ?
                      (this.ratio = k / 2) :
                      (this.ratio = 1 - k / 2)) :
                  o || (this.ratio = this._ease.getRatio(this._time / t))),
            q === this._time && !d && s === this._cycle)
          ) {
return void (
              r !== this._totalTime &&
              this._onUpdate &&
              (b || this._callback('onUpdate'))
            );
}
          if (!this._initted) {
            if ((this._init(), !this._initted || this._gc)) return;
            if (
              !d &&
              this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration))
            ) {
return (
                (this._time = q),
                (this._totalTime = r),
                (this._rawPrevTime = u),
                (this._cycle = s),
                h.lazyTweens.push(this),
                void (this._lazy = [a, b])
              );
}
            !this._time || e || o ?
              e &&
                this._ease._calcEnd &&
                !o &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1)) :
              (this.ratio = this._ease.getRatio(this._time / t));
          }
          for (
            this._lazy !== !1 && (this._lazy = !1),
              this._active ||
                (!this._paused &&
                  this._time !== q &&
                  a >= 0 &&
                  (this._active = !0)),
              0 === r &&
                (2 === this._initted && a > 0 && this._init(),
                this._startAt &&
                  (a >= 0 ?
                    this._startAt.render(a, !0, d) :
                    f || (f = '_dummyGS')),
                this.vars.onStart &&
                  (0 !== this._totalTime || 0 === t) &&
                  (b || this._callback('onStart'))),
              i = this._firstPT;
            i;

          ) {
i.f ?
              i.t[i.p](i.c * this.ratio + i.s) :
              (i.t[i.p] = i.c * this.ratio + i.s),
              (i = i._next);
}
          this._onUpdate &&
            (0 > a &&
              this._startAt &&
              this._startTime &&
              this._startAt.render(a, !0, d),
            b || ((this._totalTime !== r || f) && this._callback('onUpdate'))),
            this._cycle !== s &&
              (b ||
                this._gc ||
                (this.vars.onRepeat && this._callback('onRepeat'))),
            f &&
              (!this._gc || d) &&
              (0 > a &&
                this._startAt &&
                !this._onUpdate &&
                this._startTime &&
                this._startAt.render(a, !0, d),
              e &&
                (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                (this._active = !1)),
              !b && this.vars[f] && this._callback(f),
              0 === t &&
                this._rawPrevTime === g &&
                n !== g &&
                (this._rawPrevTime = 0));
        }),
        (f.to = function(a, b, c) {
          return new f(a, b, c);
        }),
        (f.from = function(a, b, c) {
          return (
            (c.runBackwards = !0),
            (c.immediateRender = 0 != c.immediateRender),
            new f(a, b, c)
          );
        }),
        (f.fromTo = function(a, b, c, d) {
          return (
            (d.startAt = c),
            (d.immediateRender =
              0 != d.immediateRender && 0 != c.immediateRender),
            new f(a, b, d)
          );
        }),
        (f.staggerTo = f.allTo = function(a, b, g, h, k, m, n) {
          h = h || 0;
          let o;
            let p;
            let q;
            let r;
            let s = 0;
            const t = [];
            const u = function() {
              g.onComplete &&
                g.onComplete.apply(g.onCompleteScope || this, arguments),
                k.apply(n || g.callbackScope || this, m || l);
            };
            const v = g.cycle;
            let w = g.startAt && g.startAt.cycle;
          for (
            j(a) ||
              ('string' == typeof a && (a = c.selector(a) || a),
              i(a) && (a = d(a))),
              a = a || [],
              0 > h && ((a = d(a)), a.reverse(), (h *= -1)),
              o = a.length - 1,
              q = 0;
            o >= q;
            q++
          ) {
            p = {};
            for (r in g) p[r] = g[r];
            if (
              (v &&
                (e(p, a, q),
                null != p.duration && ((b = p.duration), delete p.duration)),
              w)
            ) {
              w = p.startAt = {};
              for (r in g.startAt) w[r] = g.startAt[r];
              e(p.startAt, a, q);
            }
            (p.delay = s + (p.delay || 0)),
              q === o && k && (p.onComplete = u),
              (t[q] = new f(a[q], b, p)),
              (s += h);
          }
          return t;
        }),
        (f.staggerFrom = f.allFrom = function(a, b, c, d, e, g, h) {
          return (
            (c.runBackwards = !0),
            (c.immediateRender = 0 != c.immediateRender),
            f.staggerTo(a, b, c, d, e, g, h)
          );
        }),
        (f.staggerFromTo = f.allFromTo = function(a, b, c, d, e, g, h, i) {
          return (
            (d.startAt = c),
            (d.immediateRender =
              0 != d.immediateRender && 0 != c.immediateRender),
            f.staggerTo(a, b, d, e, g, h, i)
          );
        }),
        (f.delayedCall = function(a, b, c, d, e) {
          return new f(b, 0, {
            delay: a,
            onComplete: b,
            onCompleteParams: c,
            callbackScope: d,
            onReverseComplete: b,
            onReverseCompleteParams: c,
            immediateRender: !1,
            useFrames: e,
            overwrite: 0,
          });
        }),
        (f.set = function(a, b) {
          return new f(a, 0, b);
        }),
        (f.isTweening = function(a) {
          return c.getTweensOf(a, !0).length > 0;
        });
      var m = function(a, b) {
          for (var d = [], e = 0, f = a._first; f; ) {
f instanceof c ?
              (d[e++] = f) :
              (b && (d[e++] = f), (d = d.concat(m(f, b))), (e = d.length)),
              (f = f._next);
}
          return d;
        };
        const n = (f.getAllTweens = function(b) {
          return m(a._rootTimeline, b).concat(m(a._rootFramesTimeline, b));
        });
      (f.killAll = function(a, c, d, e) {
        null == c && (c = !0), null == d && (d = !0);
        let f;
          let g;
          let h;
          const i = n(0 != e);
          const j = i.length;
          const k = c && d && e;
        for (h = 0; j > h; h++) {
(g = i[h]),
            (k ||
              g instanceof b ||
              ((f = g.target === g.vars.onComplete) && d) ||
              (c && !f)) &&
              (a ?
                g.totalTime(g._reversed ? 0 : g.totalDuration()) :
                g._enabled(!1, !1));
}
      }),
        (f.killChildTweensOf = function(a, b) {
          if (null != a) {
            let e;
              let g;
              let k;
              let l;
              let m;
              const n = h.tweenLookup;
            if (
              ('string' == typeof a && (a = c.selector(a) || a),
              i(a) && (a = d(a)),
              j(a))
            ) {
for (l = a.length; --l > -1; ) f.killChildTweensOf(a[l], b);
} else {
              e = [];
              for (k in n) {
for (g = n[k].target.parentNode; g; ) {
g === a && (e = e.concat(n[k].tweens)), (g = g.parentNode);
}
}
              for (m = e.length, l = 0; m > l; l++) {
b && e[l].totalTime(e[l].totalDuration()),
                  e[l]._enabled(!1, !1);
}
            }
          }
        });
      const o = function(a, c, d, e) {
        (c = c !== !1), (d = d !== !1), (e = e !== !1);
        for (var f, g, h = n(e), i = c && d && e, j = h.length; --j > -1; ) {
(g = h[j]),
            (i ||
              g instanceof b ||
              ((f = g.target === g.vars.onComplete) && d) ||
              (c && !f)) &&
              g.paused(a);
}
      };
      return (
        (f.pauseAll = function(a, b, c) {
          o(!0, a, b, c);
        }),
        (f.resumeAll = function(a, b, c) {
          o(!1, a, b, c);
        }),
        (f.globalTimeScale = function(b) {
          let d = a._rootTimeline;
            let e = c.ticker.time;
          return arguments.length ?
            ((b = b || g),
              (d._startTime = e - ((e - d._startTime) * d._timeScale) / b),
              (d = a._rootFramesTimeline),
              (e = c.ticker.frame),
              (d._startTime = e - ((e - d._startTime) * d._timeScale) / b),
              (d._timeScale = a._rootTimeline._timeScale = b),
              b) :
            d._timeScale;
        }),
        (k.progress = function(a, b) {
          return arguments.length ?
            this.totalTime(
                this.duration() *
                  (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                  this._cycle * (this._duration + this._repeatDelay),
                b,
              ) :
            this._time / this.duration();
        }),
        (k.totalProgress = function(a, b) {
          return arguments.length ?
            this.totalTime(this.totalDuration() * a, b) :
            this._totalTime / this.totalDuration();
        }),
        (k.time = function(a, b) {
          return arguments.length ?
            (this._dirty && this.totalDuration(),
              a > this._duration && (a = this._duration),
              this._yoyo && 0 !== (1 & this._cycle) ?
                (a =
                    this._duration -
                    a +
                    this._cycle * (this._duration + this._repeatDelay)) :
                0 !== this._repeat &&
                  (a += this._cycle * (this._duration + this._repeatDelay)),
              this.totalTime(a, b)) :
            this._time;
        }),
        (k.duration = function(b) {
          return arguments.length ?
            a.prototype.duration.call(this, b) :
            this._duration;
        }),
        (k.totalDuration = function(a) {
          return arguments.length ?
            -1 === this._repeat ?
              this :
              this.duration(
                  (a - this._repeat * this._repeatDelay) / (this._repeat + 1),
                ) :
            (this._dirty &&
                ((this._totalDuration =
                  -1 === this._repeat ?
                    999999999999 :
                    this._duration * (this._repeat + 1) +
                      this._repeatDelay * this._repeat),
                (this._dirty = !1)),
              this._totalDuration);
        }),
        (k.repeat = function(a) {
          return arguments.length ?
            ((this._repeat = a), this._uncache(!0)) :
            this._repeat;
        }),
        (k.repeatDelay = function(a) {
          return arguments.length ?
            ((this._repeatDelay = a), this._uncache(!0)) :
            this._repeatDelay;
        }),
        (k.yoyo = function(a) {
          return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
        }),
        f
      );
    },
    !0,
  ),
    _gsScope._gsDefine(
      'TimelineLite',
      ['core.Animation', 'core.SimpleTimeline', 'TweenLite'],
      function(a, b, c) {
        const d = function(a) {
            b.call(this, a),
              (this._labels = {}),
              (this.autoRemoveChildren = this.vars.autoRemoveChildren === !0),
              (this.smoothChildTiming = this.vars.smoothChildTiming === !0),
              (this._sortChildren = !0),
              (this._onUpdate = this.vars.onUpdate);
            let c;
              let d;
              const e = this.vars;
            for (d in e) {
(c = e[d]),
                i(c) &&
                  -1 !== c.join('').indexOf('{self}') &&
                  (e[d] = this._swapSelfInParams(c));
}
            i(e.tweens) && this.add(e.tweens, 0, e.align, e.stagger);
          };
          const e = 1e-10;
          const f = c._internals;
          const g = (d._internals = {});
          const h = f.isSelector;
          var i = f.isArray;
          const j = f.lazyTweens;
          const k = f.lazyRender;
          const l = _gsScope._gsDefine.globals;
          const m = function(a) {
            let b;
              const c = {};
            for (b in a) c[b] = a[b];
            return c;
          };
          const n = function(a, b, c) {
            let d;
              let e;
              const f = a.cycle;
            for (d in f) {
(e = f[d]),
                (a[d] = 'function' == typeof e ? e(c, b[c]) : e[c % e.length]);
}
            delete a.cycle;
          };
          const o = (g.pauseCallback = function() {});
          const p = function(a) {
            let b;
              const c = [];
              const d = a.length;
            for (b = 0; b !== d; c.push(a[b++]));
            return c;
          };
          const q = (d.prototype = new b());
        return (
          (d.version = '2.0.2'),
          (q.constructor = d),
          (q.kill()._gc = q._forcingPlayhead = q._hasPause = !1),
          (q.to = function(a, b, d, e) {
            const f = (d.repeat && l.TweenMax) || c;
            return b ? this.add(new f(a, b, d), e) : this.set(a, d, e);
          }),
          (q.from = function(a, b, d, e) {
            return this.add(((d.repeat && l.TweenMax) || c).from(a, b, d), e);
          }),
          (q.fromTo = function(a, b, d, e, f) {
            const g = (e.repeat && l.TweenMax) || c;
            return b ? this.add(g.fromTo(a, b, d, e), f) : this.set(a, e, f);
          }),
          (q.staggerTo = function(a, b, e, f, g, i, j, k) {
            let l;
              let o;
              const q = new d({
                onComplete: i,
                onCompleteParams: j,
                callbackScope: k,
                smoothChildTiming: this.smoothChildTiming,
              });
              const r = e.cycle;
            for (
              'string' == typeof a && (a = c.selector(a) || a),
                a = a || [],
                h(a) && (a = p(a)),
                f = f || 0,
                0 > f && ((a = p(a)), a.reverse(), (f *= -1)),
                o = 0;
              o < a.length;
              o++
            ) {
(l = m(e)),
                l.startAt &&
                  ((l.startAt = m(l.startAt)),
                  l.startAt.cycle && n(l.startAt, a, o)),
                r &&
                  (n(l, a, o),
                  null != l.duration && ((b = l.duration), delete l.duration)),
                q.to(a[o], b, l, o * f);
}
            return this.add(q, g);
          }),
          (q.staggerFrom = function(a, b, c, d, e, f, g, h) {
            return (
              (c.immediateRender = 0 != c.immediateRender),
              (c.runBackwards = !0),
              this.staggerTo(a, b, c, d, e, f, g, h)
            );
          }),
          (q.staggerFromTo = function(a, b, c, d, e, f, g, h, i) {
            return (
              (d.startAt = c),
              (d.immediateRender =
                0 != d.immediateRender && 0 != c.immediateRender),
              this.staggerTo(a, b, d, e, f, g, h, i)
            );
          }),
          (q.call = function(a, b, d, e) {
            return this.add(c.delayedCall(0, a, b, d), e);
          }),
          (q.set = function(a, b, d) {
            return (
              (d = this._parseTimeOrLabel(d, 0, !0)),
              null == b.immediateRender &&
                (b.immediateRender = d === this._time && !this._paused),
              this.add(new c(a, 0, b), d)
            );
          }),
          (d.exportRoot = function(a, b) {
            (a = a || {}),
              null == a.smoothChildTiming && (a.smoothChildTiming = !0);
            let e;
              let f;
              let g;
              let h;
              const i = new d(a);
              const j = i._timeline;
            for (
              null == b && (b = !0),
                j._remove(i, !0),
                i._startTime = 0,
                i._rawPrevTime = i._time = i._totalTime = j._time,
                g = j._first;
              g;

            ) {
(h = g._next),
                (b && g instanceof c && g.target === g.vars.onComplete) ||
                  ((f = g._startTime - g._delay),
                  0 > f && (e = 1),
                  i.add(g, f)),
                (g = h);
}
            return j.add(i, 0), e && i.totalDuration(), i;
          }),
          (q.add = function(e, f, g, h) {
            let j; let k; let l; let m; let n; let o;
            if (
              ('number' != typeof f &&
                (f = this._parseTimeOrLabel(f, 0, !0, e)),
              !(e instanceof a))
            ) {
              if (e instanceof Array || (e && e.push && i(e))) {
                for (
                  g = g || 'normal', h = h || 0, j = f, k = e.length, l = 0;
                  k > l;
                  l++
                ) {
i((m = e[l])) && (m = new d({tweens: m})),
                    this.add(m, j),
                    'string' != typeof m &&
                      'function' != typeof m &&
                      ('sequence' === g ?
                        (j = m._startTime + m.totalDuration() / m._timeScale) :
                        'start' === g && (m._startTime -= m.delay())),
                    (j += h);
}
                return this._uncache(!0);
              }
              if ('string' == typeof e) return this.addLabel(e, f);
              if ('function' != typeof e) {
throw (
                  'Cannot add ' +
                  e +
                  ' into the timeline; it is not a tween, timeline, function, or string.'
                );
}
              e = c.delayedCall(0, e);
            }
            if (
              (b.prototype.add.call(this, e, f),
              e._time &&
                ((j = Math.max(
                  0,
                  Math.min(
                    e.totalDuration(),
                    (this.rawTime() - e._startTime) * e._timeScale,
                  ),
                )),
                Math.abs(j - e._totalTime) > 1e-5 && e.render(j, !1, !1)),
              (this._gc || this._time === this._duration) &&
                !this._paused &&
                this._duration < this.duration())
            ) {
for (n = this, o = n.rawTime() > e._startTime; n._timeline; ) {
o && n._timeline.smoothChildTiming ?
                  n.totalTime(n._totalTime, !0) :
                  n._gc && n._enabled(!0, !1),
                  (n = n._timeline);
}
}
            return this;
          }),
          (q.remove = function(b) {
            if (b instanceof a) {
              this._remove(b, !1);
              const c = (b._timeline = b.vars.useFrames ?
                a._rootFramesTimeline :
                a._rootTimeline);
              return (
                (b._startTime =
                  (b._paused ? b._pauseTime : c._time) -
                  (b._reversed ?
                    b.totalDuration() - b._totalTime :
                    b._totalTime) /
                    b._timeScale),
                this
              );
            }
            if (b instanceof Array || (b && b.push && i(b))) {
              for (let d = b.length; --d > -1; ) this.remove(b[d]);
              return this;
            }
            return 'string' == typeof b ?
              this.removeLabel(b) :
              this.kill(null, b);
          }),
          (q._remove = function(a, c) {
            b.prototype._remove.call(this, a, c);
            const d = this._last;
            return (
              d ?
                this._time > this.duration() &&
                  ((this._time = this._duration),
                  (this._totalTime = this._totalDuration)) :
                (this._time = this._totalTime = this._duration = this._totalDuration = 0),
              this
            );
          }),
          (q.append = function(a, b) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a));
          }),
          (q.insert = q.insertMultiple = function(a, b, c, d) {
            return this.add(a, b || 0, c, d);
          }),
          (q.appendMultiple = function(a, b, c, d) {
            return this.add(a, this._parseTimeOrLabel(null, b, !0, a), c, d);
          }),
          (q.addLabel = function(a, b) {
            return (this._labels[a] = this._parseTimeOrLabel(b)), this;
          }),
          (q.addPause = function(a, b, d, e) {
            const f = c.delayedCall(0, o, d, e || this);
            return (
              (f.vars.onComplete = f.vars.onReverseComplete = b),
              (f.data = 'isPause'),
              (this._hasPause = !0),
              this.add(f, a)
            );
          }),
          (q.removeLabel = function(a) {
            return delete this._labels[a], this;
          }),
          (q.getLabelTime = function(a) {
            return null != this._labels[a] ? this._labels[a] : -1;
          }),
          (q._parseTimeOrLabel = function(b, c, d, e) {
            let f; let g;
            if (e instanceof a && e.timeline === this) this.remove(e);
            else if (e && (e instanceof Array || (e.push && i(e)))) {
for (g = e.length; --g > -1; ) {
e[g] instanceof a &&
                  e[g].timeline === this &&
                  this.remove(e[g]);
}
}
            if (
              ((f =
                'number' != typeof b || c ?
                  this.duration() > 99999999999 ?
                    this.recent().endTime(!1) :
                    this._duration :
                  0),
              'string' == typeof c)
            ) {
return this._parseTimeOrLabel(
                c,
                d && 'number' == typeof b && null == this._labels[c] ?
                  b - f :
                  0,
                d,
              );
}
            if (
              ((c = c || 0),
              'string' != typeof b || (!isNaN(b) && null == this._labels[b]))
            ) {
null == b && (b = f);
} else {
              if (((g = b.indexOf('=')), -1 === g)) {
return null == this._labels[b] ?
                  d ?
                    (this._labels[b] = f + c) :
                    c :
                  this._labels[b] + c;
}
              (c =
                parseInt(b.charAt(g - 1) + '1', 10) * Number(b.substr(g + 1))),
                (b =
                  g > 1 ? this._parseTimeOrLabel(b.substr(0, g - 1), 0, d) : f);
            }
            return Number(b) + c;
          }),
          (q.seek = function(a, b) {
            return this.totalTime(
              'number' == typeof a ? a : this._parseTimeOrLabel(a),
              b !== !1,
            );
          }),
          (q.stop = function() {
            return this.paused(!0);
          }),
          (q.gotoAndPlay = function(a, b) {
            return this.play(a, b);
          }),
          (q.gotoAndStop = function(a, b) {
            return this.pause(a, b);
          }),
          (q.render = function(a, b, c) {
            this._gc && this._enabled(!0, !1);
            let d;
              let f;
              let g;
              let h;
              let i;
              let l;
              let m;
              const n = this._time;
              const o = this._dirty ? this.totalDuration() : this._totalDuration;
              const p = this._startTime;
              const q = this._timeScale;
              const r = this._paused;
            if (
              (n !== this._time && (a += this._time - n),
              a >= o - 1e-7 && a >= 0)
            ) {
(this._totalTime = this._time = o),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((f = !0),
                  (h = 'onComplete'),
                  (i = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    ((0 >= a && a >= -1e-7) ||
                      this._rawPrevTime < 0 ||
                      this._rawPrevTime === e) &&
                    this._rawPrevTime !== a &&
                    this._first &&
                    ((i = !0),
                    this._rawPrevTime > e && (h = 'onReverseComplete'))),
                (this._rawPrevTime =
                  this._duration || !b || a || this._rawPrevTime === a ? a : e),
                (a = o + 1e-4);
} else if (1e-7 > a) {
if (
                ((this._totalTime = this._time = 0),
                (0 !== n ||
                  (0 === this._duration &&
                    this._rawPrevTime !== e &&
                    (this._rawPrevTime > 0 ||
                      (0 > a && this._rawPrevTime >= 0)))) &&
                  ((h = 'onReverseComplete'), (f = this._reversed)),
                0 > a)
              ) {
(this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed ?
                    ((i = f = !0), (h = 'onReverseComplete')) :
                    this._rawPrevTime >= 0 && this._first && (i = !0),
                  (this._rawPrevTime = a);
} else {
                if (
                  ((this._rawPrevTime =
                    this._duration || !b || a || this._rawPrevTime === a ?
                      a :
                      e),
                  0 === a && f)
                ) {
for (d = this._first; d && 0 === d._startTime; ) {
d._duration || (f = !1), (d = d._next);
}
}
                (a = 0), this._initted || (i = !0);
              }
} else {
              if (this._hasPause && !this._forcingPlayhead && !b) {
                if (a >= n) {
for (d = this._first; d && d._startTime <= a && !l; ) {
d._duration ||
                      'isPause' !== d.data ||
                      d.ratio ||
                      (0 === d._startTime && 0 === this._rawPrevTime) ||
                      (l = d),
                      (d = d._next);
}
} else {
for (d = this._last; d && d._startTime >= a && !l; ) {
d._duration ||
                      ('isPause' === d.data && d._rawPrevTime > 0 && (l = d)),
                      (d = d._prev);
}
}
                l &&
                  ((this._time = a = l._startTime),
                  (this._totalTime =
                    a +
                    this._cycle * (this._totalDuration + this._repeatDelay)));
              }
              this._totalTime = this._time = this._rawPrevTime = a;
            }
            if ((this._time !== n && this._first) || c || i || l) {
              if (
                (this._initted || (this._initted = !0),
                this._active ||
                  (!this._paused &&
                    this._time !== n &&
                    a > 0 &&
                    (this._active = !0)),
                0 === n &&
                  this.vars.onStart &&
                  ((0 === this._time && this._duration) ||
                    b ||
                    this._callback('onStart')),
                (m = this._time),
                m >= n)
              ) {
for (
                  d = this._first;
                  d &&
                  ((g = d._next), m === this._time && (!this._paused || r));

                ) {
(d._active || (d._startTime <= m && !d._paused && !d._gc)) &&
                    (l === d && this.pause(),
                    d._reversed ?
                      d.render(
                          (d._dirty ? d.totalDuration() : d._totalDuration) -
                            (a - d._startTime) * d._timeScale,
                          b,
                          c,
                        ) :
                      d.render((a - d._startTime) * d._timeScale, b, c)),
                    (d = g);
}
} else {
for (
                  d = this._last;
                  d &&
                  ((g = d._prev), m === this._time && (!this._paused || r));

                ) {
                  if (
                    d._active ||
                    (d._startTime <= n && !d._paused && !d._gc)
                  ) {
                    if (l === d) {
                      for (l = d._prev; l && l.endTime() > this._time; ) {
l.render(
                          l._reversed ?
                            l.totalDuration() -
                                (a - l._startTime) * l._timeScale :
                            (a - l._startTime) * l._timeScale,
                          b,
                          c,
                        ),
                          (l = l._prev);
}
                      (l = null), this.pause();
                    }
                    d._reversed ?
                      d.render(
                          (d._dirty ? d.totalDuration() : d._totalDuration) -
                            (a - d._startTime) * d._timeScale,
                          b,
                          c,
                        ) :
                      d.render((a - d._startTime) * d._timeScale, b, c);
                  }
                  d = g;
                }
}
              this._onUpdate &&
                (b || (j.length && k(), this._callback('onUpdate'))),
                h &&
                  (this._gc ||
                    ((p === this._startTime || q !== this._timeScale) &&
                      (0 === this._time || o >= this.totalDuration()) &&
                      (f &&
                        (j.length && k(),
                        this._timeline.autoRemoveChildren &&
                          this._enabled(!1, !1),
                        (this._active = !1)),
                      !b && this.vars[h] && this._callback(h))));
            }
          }),
          (q._hasPausedChild = function() {
            for (let a = this._first; a; ) {
              if (a._paused || (a instanceof d && a._hasPausedChild())) {
return !0;
}
              a = a._next;
            }
            return !1;
          }),
          (q.getChildren = function(a, b, d, e) {
            e = e || -9999999999;
            for (var f = [], g = this._first, h = 0; g; ) {
g._startTime < e ||
                (g instanceof c ?
                  b !== !1 && (f[h++] = g) :
                  (d !== !1 && (f[h++] = g),
                    a !== !1 &&
                      ((f = f.concat(g.getChildren(!0, b, d))),
                      (h = f.length)))),
                (g = g._next);
}
            return f;
          }),
          (q.getTweensOf = function(a, b) {
            let d;
              let e;
              const f = this._gc;
              const g = [];
              let h = 0;
            for (
              f && this._enabled(!0, !0), d = c.getTweensOf(a), e = d.length;
              --e > -1;

            ) {
(d[e].timeline === this || (b && this._contains(d[e]))) &&
                (g[h++] = d[e]);
}
            return f && this._enabled(!1, !0), g;
          }),
          (q.recent = function() {
            return this._recent;
          }),
          (q._contains = function(a) {
            for (let b = a.timeline; b; ) {
              if (b === this) return !0;
              b = b.timeline;
            }
            return !1;
          }),
          (q.shiftChildren = function(a, b, c) {
            c = c || 0;
            for (var d, e = this._first, f = this._labels; e; ) {
e._startTime >= c && (e._startTime += a), (e = e._next);
}
            if (b) for (d in f) f[d] >= c && (f[d] += a);
            return this._uncache(!0);
          }),
          (q._kill = function(a, b) {
            if (!a && !b) return this._enabled(!1, !1);
            for (
              var c = b ? this.getTweensOf(b) : this.getChildren(!0, !0, !1),
                d = c.length,
                e = !1;
              --d > -1;

            ) {
c[d]._kill(a, b) && (e = !0);
}
            return e;
          }),
          (q.clear = function(a) {
            const b = this.getChildren(!1, !0, !0);
              let c = b.length;
            for (this._time = this._totalTime = 0; --c > -1; ) {
b[c]._enabled(!1, !1);
}
            return a !== !1 && (this._labels = {}), this._uncache(!0);
          }),
          (q.invalidate = function() {
            for (let b = this._first; b; ) b.invalidate(), (b = b._next);
            return a.prototype.invalidate.call(this);
          }),
          (q._enabled = function(a, c) {
            if (a === this._gc) {
for (let d = this._first; d; ) d._enabled(a, !0), (d = d._next);
}
            return b.prototype._enabled.call(this, a, c);
          }),
          (q.totalTime = function(b, c, d) {
            this._forcingPlayhead = !0;
            const e = a.prototype.totalTime.apply(this, arguments);
            return (this._forcingPlayhead = !1), e;
          }),
          (q.duration = function(a) {
            return arguments.length ?
              (0 !== this.duration() &&
                  0 !== a &&
                  this.timeScale(this._duration / a),
                this) :
              (this._dirty && this.totalDuration(), this._duration);
          }),
          (q.totalDuration = function(a) {
            if (!arguments.length) {
              if (this._dirty) {
                for (var b, c, d = 0, e = this._last, f = 999999999999; e; ) {
(b = e._prev),
                    e._dirty && e.totalDuration(),
                    e._startTime > f &&
                    this._sortChildren &&
                    !e._paused &&
                    !this._calculatingDuration ?
                      ((this._calculatingDuration = 1),
                        this.add(e, e._startTime - e._delay),
                        (this._calculatingDuration = 0)) :
                      (f = e._startTime),
                    e._startTime < 0 &&
                      !e._paused &&
                      ((d -= e._startTime),
                      this._timeline.smoothChildTiming &&
                        ((this._startTime += e._startTime / this._timeScale),
                        (this._time -= e._startTime),
                        (this._totalTime -= e._startTime),
                        (this._rawPrevTime -= e._startTime)),
                      this.shiftChildren(-e._startTime, !1, -9999999999),
                      (f = 0)),
                    (c = e._startTime + e._totalDuration / e._timeScale),
                    c > d && (d = c),
                    (e = b);
}
                (this._duration = this._totalDuration = d), (this._dirty = !1);
              }
              return this._totalDuration;
            }
            return a && this.totalDuration() ?
              this.timeScale(this._totalDuration / a) :
              this;
          }),
          (q.paused = function(b) {
            if (!b) {
for (let c = this._first, d = this._time; c; ) {
c._startTime === d &&
                  'isPause' === c.data &&
                  (c._rawPrevTime = 0),
                  (c = c._next);
}
}
            return a.prototype.paused.apply(this, arguments);
          }),
          (q.usesFrames = function() {
            for (var b = this._timeline; b._timeline; ) b = b._timeline;
            return b === a._rootFramesTimeline;
          }),
          (q.rawTime = function(a) {
            return a &&
              (this._paused ||
                (this._repeat && this.time() > 0 && this.totalProgress() < 1)) ?
              this._totalTime % (this._duration + this._repeatDelay) :
              this._paused ?
              this._totalTime :
              (this._timeline.rawTime(a) - this._startTime) * this._timeScale;
          }),
          d
        );
      },
      !0,
    ),
    _gsScope._gsDefine(
      'TimelineMax',
      ['TimelineLite', 'TweenLite', 'easing.Ease'],
      function(a, b, c) {
        const d = function(b) {
            a.call(this, b),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              (this._cycle = 0),
              (this._yoyo = this.vars.yoyo === !0),
              (this._dirty = !0);
          };
          const e = 1e-10;
          const f = b._internals;
          const g = f.lazyTweens;
          const h = f.lazyRender;
          const i = _gsScope._gsDefine.globals;
          const j = new c(null, null, 1, 0);
          const k = (d.prototype = new a());
        return (
          (k.constructor = d),
          (k.kill()._gc = !1),
          (d.version = '2.0.2'),
          (k.invalidate = function() {
            return (
              (this._yoyo = this.vars.yoyo === !0),
              (this._repeat = this.vars.repeat || 0),
              (this._repeatDelay = this.vars.repeatDelay || 0),
              this._uncache(!0),
              a.prototype.invalidate.call(this)
            );
          }),
          (k.addCallback = function(a, c, d, e) {
            return this.add(b.delayedCall(0, a, d, e), c);
          }),
          (k.removeCallback = function(a, b) {
            if (a) {
if (null == b) this._kill(null, a);
              else {
for (
                  let c = this.getTweensOf(a, !1),
                    d = c.length,
                    e = this._parseTimeOrLabel(b);
                  --d > -1;

                ) {
c[d]._startTime === e && c[d]._enabled(!1, !1);
}
}
}
            return this;
          }),
          (k.removePause = function(b) {
            return this.removeCallback(a._internals.pauseCallback, b);
          }),
          (k.tweenTo = function(a, c) {
            c = c || {};
            let d;
              let e;
              let f;
              const g = {
                ease: j,
                useFrames: this.usesFrames(),
                immediateRender: !1,
                lazy: !1,
              };
              const h = (c.repeat && i.TweenMax) || b;
            for (e in c) g[e] = c[e];
            return (
              (g.time = this._parseTimeOrLabel(a)),
              (d =
                Math.abs(Number(g.time) - this._time) / this._timeScale ||
                0.001),
              (f = new h(this, d, g)),
              (g.onStart = function() {
                f.target.paused(!0),
                  f.vars.time === f.target.time() ||
                    d !== f.duration() ||
                    f.isFromTo ||
                    f
                      .duration(
                        Math.abs(f.vars.time - f.target.time()) /
                          f.target._timeScale,
                      )
                      .render(f.time(), !0, !0),
                  c.onStart &&
                    c.onStart.apply(
                      c.onStartScope || c.callbackScope || f,
                      c.onStartParams || [],
                    );
              }),
              f
            );
          }),
          (k.tweenFromTo = function(a, b, c) {
            (c = c || {}),
              (a = this._parseTimeOrLabel(a)),
              (c.startAt = {
                onComplete: this.seek,
                onCompleteParams: [a],
                callbackScope: this,
              }),
              (c.immediateRender = c.immediateRender !== !1);
            const d = this.tweenTo(b, c);
            return (
              (d.isFromTo = 1),
              d.duration(Math.abs(d.vars.time - a) / this._timeScale || 0.001)
            );
          }),
          (k.render = function(a, b, c) {
            this._gc && this._enabled(!0, !1);
            let d;
              let f;
              let i;
              let j;
              let k;
              let l;
              let m;
              let n;
              let o = this._time;
              const p = this._dirty ? this.totalDuration() : this._totalDuration;
              const q = this._duration;
              const r = this._totalTime;
              const s = this._startTime;
              const t = this._timeScale;
              const u = this._rawPrevTime;
              const v = this._paused;
              const w = this._cycle;
            if (
              (o !== this._time && (a += this._time - o),
              a >= p - 1e-7 && a >= 0)
            ) {
this._locked ||
                ((this._totalTime = p), (this._cycle = this._repeat)),
                this._reversed ||
                  this._hasPausedChild() ||
                  ((f = !0),
                  (j = 'onComplete'),
                  (k = !!this._timeline.autoRemoveChildren),
                  0 === this._duration &&
                    ((0 >= a && a >= -1e-7) || 0 > u || u === e) &&
                    u !== a &&
                    this._first &&
                    ((k = !0), u > e && (j = 'onReverseComplete'))),
                (this._rawPrevTime =
                  this._duration || !b || a || this._rawPrevTime === a ? a : e),
                this._yoyo && 0 !== (1 & this._cycle) ?
                  (this._time = a = 0) :
                  ((this._time = q), (a = q + 1e-4));
} else if (1e-7 > a) {
if (
                (this._locked || (this._totalTime = this._cycle = 0),
                (this._time = 0),
                (0 !== o ||
                  (0 === q &&
                    u !== e &&
                    (u > 0 || (0 > a && u >= 0)) &&
                    !this._locked)) &&
                  ((j = 'onReverseComplete'), (f = this._reversed)),
                0 > a)
              ) {
(this._active = !1),
                  this._timeline.autoRemoveChildren && this._reversed ?
                    ((k = f = !0), (j = 'onReverseComplete')) :
                    u >= 0 && this._first && (k = !0),
                  (this._rawPrevTime = a);
} else {
                if (
                  ((this._rawPrevTime =
                    q || !b || a || this._rawPrevTime === a ? a : e),
                  0 === a && f)
                ) {
for (d = this._first; d && 0 === d._startTime; ) {
d._duration || (f = !1), (d = d._next);
}
}
                (a = 0), this._initted || (k = !0);
              }
} else if (
              (0 === q && 0 > u && (k = !0),
              (this._time = this._rawPrevTime = a),
              this._locked ||
                ((this._totalTime = a),
                0 !== this._repeat &&
                  ((l = q + this._repeatDelay),
                  (this._cycle = (this._totalTime / l) >> 0),
                  0 !== this._cycle &&
                    this._cycle === this._totalTime / l &&
                    a >= r &&
                    this._cycle--,
                  (this._time = this._totalTime - this._cycle * l),
                  this._yoyo &&
                    0 !== (1 & this._cycle) &&
                    (this._time = q - this._time),
                  this._time > q ?
                    ((this._time = q), (a = q + 1e-4)) :
                    this._time < 0 ?
                    (this._time = a = 0) :
                    (a = this._time))),
              this._hasPause && !this._forcingPlayhead && !b)
            ) {
              if (
                ((a = this._time),
                a >= o || (this._repeat && w !== this._cycle))
              ) {
for (d = this._first; d && d._startTime <= a && !m; ) {
d._duration ||
                    'isPause' !== d.data ||
                    d.ratio ||
                    (0 === d._startTime && 0 === this._rawPrevTime) ||
                    (m = d),
                    (d = d._next);
}
} else {
for (d = this._last; d && d._startTime >= a && !m; ) {
d._duration ||
                    ('isPause' === d.data && d._rawPrevTime > 0 && (m = d)),
                    (d = d._prev);
}
}
              m &&
                m._startTime < q &&
                ((this._time = a = m._startTime),
                (this._totalTime =
                  a + this._cycle * (this._totalDuration + this._repeatDelay)));
            }
            if (this._cycle !== w && !this._locked) {
              let x = this._yoyo && 0 !== (1 & w);
                const y = x === (this._yoyo && 0 !== (1 & this._cycle));
                const z = this._totalTime;
                const A = this._cycle;
                const B = this._rawPrevTime;
                const C = this._time;
              if (
                ((this._totalTime = w * q),
                this._cycle < w ? (x = !x) : (this._totalTime += q),
                (this._time = o),
                (this._rawPrevTime = 0 === q ? u - 1e-4 : u),
                (this._cycle = w),
                (this._locked = !0),
                (o = x ? 0 : q),
                this.render(o, b, 0 === q),
                b ||
                  this._gc ||
                  (this.vars.onRepeat &&
                    ((this._cycle = A),
                    (this._locked = !1),
                    this._callback('onRepeat'))),
                o !== this._time)
              ) {
return;
}
              if (
                (y &&
                  ((this._cycle = w),
                  (this._locked = !0),
                  (o = x ? q + 1e-4 : -1e-4),
                  this.render(o, !0, !1)),
                (this._locked = !1),
                this._paused && !v)
              ) {
return;
}
              (this._time = C),
                (this._totalTime = z),
                (this._cycle = A),
                (this._rawPrevTime = B);
            }
            if (!((this._time !== o && this._first) || c || k || m)) {
return void (
                r !== this._totalTime &&
                this._onUpdate &&
                (b || this._callback('onUpdate'))
              );
}
            if (
              (this._initted || (this._initted = !0),
              this._active ||
                (!this._paused &&
                  this._totalTime !== r &&
                  a > 0 &&
                  (this._active = !0)),
              0 === r &&
                this.vars.onStart &&
                ((0 === this._totalTime && this._totalDuration) ||
                  b ||
                  this._callback('onStart')),
              (n = this._time),
              n >= o)
            ) {
for (
                d = this._first;
                d && ((i = d._next), n === this._time && (!this._paused || v));

              ) {
(d._active ||
                  (d._startTime <= this._time && !d._paused && !d._gc)) &&
                  (m === d && this.pause(),
                  d._reversed ?
                    d.render(
                        (d._dirty ? d.totalDuration() : d._totalDuration) -
                          (a - d._startTime) * d._timeScale,
                        b,
                        c,
                      ) :
                    d.render((a - d._startTime) * d._timeScale, b, c)),
                  (d = i);
}
} else {
for (
                d = this._last;
                d && ((i = d._prev), n === this._time && (!this._paused || v));

              ) {
                if (d._active || (d._startTime <= o && !d._paused && !d._gc)) {
                  if (m === d) {
                    for (m = d._prev; m && m.endTime() > this._time; ) {
m.render(
                        m._reversed ?
                          m.totalDuration() -
                              (a - m._startTime) * m._timeScale :
                          (a - m._startTime) * m._timeScale,
                        b,
                        c,
                      ),
                        (m = m._prev);
}
                    (m = null), this.pause();
                  }
                  d._reversed ?
                    d.render(
                        (d._dirty ? d.totalDuration() : d._totalDuration) -
                          (a - d._startTime) * d._timeScale,
                        b,
                        c,
                      ) :
                    d.render((a - d._startTime) * d._timeScale, b, c);
                }
                d = i;
              }
}
            this._onUpdate &&
              (b || (g.length && h(), this._callback('onUpdate'))),
              j &&
                (this._locked ||
                  this._gc ||
                  ((s === this._startTime || t !== this._timeScale) &&
                    (0 === this._time || p >= this.totalDuration()) &&
                    (f &&
                      (g.length && h(),
                      this._timeline.autoRemoveChildren &&
                        this._enabled(!1, !1),
                      (this._active = !1)),
                    !b && this.vars[j] && this._callback(j))));
          }),
          (k.getActive = function(a, b, c) {
            null == a && (a = !0), null == b && (b = !0), null == c && (c = !1);
            let d;
              let e;
              const f = [];
              const g = this.getChildren(a, b, c);
              let h = 0;
              const i = g.length;
            for (d = 0; i > d; d++) (e = g[d]), e.isActive() && (f[h++] = e);
            return f;
          }),
          (k.getLabelAfter = function(a) {
            a || (0 !== a && (a = this._time));
            let b;
              const c = this.getLabelsArray();
              const d = c.length;
            for (b = 0; d > b; b++) if (c[b].time > a) return c[b].name;
            return null;
          }),
          (k.getLabelBefore = function(a) {
            null == a && (a = this._time);
            for (let b = this.getLabelsArray(), c = b.length; --c > -1; ) {
if (b[c].time < a) return b[c].name;
}
            return null;
          }),
          (k.getLabelsArray = function() {
            let a;
              const b = [];
              let c = 0;
            for (a in this._labels) b[c++] = {time: this._labels[a], name: a};
            return (
              b.sort(function(a, b) {
                return a.time - b.time;
              }),
              b
            );
          }),
          (k.invalidate = function() {
            return (this._locked = !1), a.prototype.invalidate.call(this);
          }),
          (k.progress = function(a, b) {
            return arguments.length ?
              this.totalTime(
                  this.duration() *
                    (this._yoyo && 0 !== (1 & this._cycle) ? 1 - a : a) +
                    this._cycle * (this._duration + this._repeatDelay),
                  b,
                ) :
              this._time / this.duration() || 0;
          }),
          (k.totalProgress = function(a, b) {
            return arguments.length ?
              this.totalTime(this.totalDuration() * a, b) :
              this._totalTime / this.totalDuration() || 0;
          }),
          (k.totalDuration = function(b) {
            return arguments.length ?
              -1 !== this._repeat && b ?
                this.timeScale(this.totalDuration() / b) :
                this :
              (this._dirty &&
                  (a.prototype.totalDuration.call(this),
                  (this._totalDuration =
                    -1 === this._repeat ?
                      999999999999 :
                      this._duration * (this._repeat + 1) +
                        this._repeatDelay * this._repeat)),
                this._totalDuration);
          }),
          (k.time = function(a, b) {
            return arguments.length ?
              (this._dirty && this.totalDuration(),
                a > this._duration && (a = this._duration),
                this._yoyo && 0 !== (1 & this._cycle) ?
                  (a =
                      this._duration -
                      a +
                      this._cycle * (this._duration + this._repeatDelay)) :
                  0 !== this._repeat &&
                    (a += this._cycle * (this._duration + this._repeatDelay)),
                this.totalTime(a, b)) :
              this._time;
          }),
          (k.repeat = function(a) {
            return arguments.length ?
              ((this._repeat = a), this._uncache(!0)) :
              this._repeat;
          }),
          (k.repeatDelay = function(a) {
            return arguments.length ?
              ((this._repeatDelay = a), this._uncache(!0)) :
              this._repeatDelay;
          }),
          (k.yoyo = function(a) {
            return arguments.length ? ((this._yoyo = a), this) : this._yoyo;
          }),
          (k.currentLabel = function(a) {
            return arguments.length ?
              this.seek(a, !0) :
              this.getLabelBefore(this._time + 1e-8);
          }),
          d
        );
      },
      !0,
    ),
    (function() {
      const a = 180 / Math.PI;
        const b = [];
        const c = [];
        const d = [];
        const e = {};
        const f = _gsScope._gsDefine.globals;
        const g = function(a, b, c, d) {
          c === d && (c = d - (d - b) / 1e6),
            a === b && (b = a + (c - a) / 1e6),
            (this.a = a),
            (this.b = b),
            (this.c = c),
            (this.d = d),
            (this.da = d - a),
            (this.ca = c - a),
            (this.ba = b - a);
        };
        const h =
          ',x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,';
        const i = function(a, b, c, d) {
          const e = {a: a};
            const f = {};
            const g = {};
            const h = {c: d};
            const i = (a + b) / 2;
            const j = (b + c) / 2;
            const k = (c + d) / 2;
            const l = (i + j) / 2;
            const m = (j + k) / 2;
            const n = (m - l) / 8;
          return (
            (e.b = i + (a - i) / 4),
            (f.b = l + n),
            (e.c = f.a = (e.b + f.b) / 2),
            (f.c = g.a = (l + m) / 2),
            (g.b = m - n),
            (h.b = k + (d - k) / 4),
            (g.c = h.a = (g.b + h.b) / 2),
            [e, f, g, h]
          );
        };
        const j = function(a, e, f, g, h) {
          let j;
            let k;
            let l;
            let m;
            let n;
            let o;
            let p;
            let q;
            let r;
            let s;
            let t;
            let u;
            let v;
            const w = a.length - 1;
            let x = 0;
            let y = a[0].a;
          for (j = 0; w > j; j++) {
(n = a[x]),
              (k = n.a),
              (l = n.d),
              (m = a[x + 1].d),
              h ?
                ((t = b[j]),
                  (u = c[j]),
                  (v = ((u + t) * e * 0.25) / (g ? 0.5 : d[j] || 0.5)),
                  (o = l - (l - k) * (g ? 0.5 * e : 0 !== t ? v / t : 0)),
                  (p = l + (m - l) * (g ? 0.5 * e : 0 !== u ? v / u : 0)),
                  (q =
                    l - (o + (((p - o) * ((3 * t) / (t + u) + 0.5)) / 4 || 0)))) :
                ((o = l - (l - k) * e * 0.5),
                  (p = l + (m - l) * e * 0.5),
                  (q = l - (o + p) / 2)),
              (o += q),
              (p += q),
              (n.c = r = o),
              0 !== j ? (n.b = y) : (n.b = y = n.a + 0.6 * (n.c - n.a)),
              (n.da = l - k),
              (n.ca = r - k),
              (n.ba = y - k),
              f ?
                ((s = i(k, y, r, l)),
                  a.splice(x, 1, s[0], s[1], s[2], s[3]),
                  (x += 4)) :
                x++,
              (y = p);
}
          (n = a[x]),
            (n.b = y),
            (n.c = y + 0.4 * (n.d - y)),
            (n.da = n.d - n.a),
            (n.ca = n.c - n.a),
            (n.ba = y - n.a),
            f &&
              ((s = i(n.a, y, n.c, n.d)),
              a.splice(x, 1, s[0], s[1], s[2], s[3]));
        };
        const k = function(a, d, e, f) {
          let h;
            let i;
            let j;
            let k;
            let l;
            let m;
            const n = [];
          if (f) {
for (a = [f].concat(a), i = a.length; --i > -1; ) {
'string' == typeof (m = a[i][d]) &&
                '=' === m.charAt(1) &&
                (a[i][d] = f[d] + Number(m.charAt(0) + m.substr(2)));
}
}
          if (((h = a.length - 2), 0 > h)) {
return (n[0] = new g(a[0][d], 0, 0, a[0][d])), n;
}
          for (i = 0; h > i; i++) {
(j = a[i][d]),
              (k = a[i + 1][d]),
              (n[i] = new g(j, 0, 0, k)),
              e &&
                ((l = a[i + 2][d]),
                (b[i] = (b[i] || 0) + (k - j) * (k - j)),
                (c[i] = (c[i] || 0) + (l - k) * (l - k)));
}
          return (n[i] = new g(a[i][d], 0, 0, a[i + 1][d])), n;
        };
        const l = function(a, f, g, i, l, m) {
          let n;
            let o;
            let p;
            let q;
            let r;
            let s;
            let t;
            let u;
            const v = {};
            const w = [];
            const x = m || a[0];
          (l = 'string' == typeof l ? ',' + l + ',' : h), null == f && (f = 1);
          for (o in a[0]) w.push(o);
          if (a.length > 1) {
            for (u = a[a.length - 1], t = !0, n = w.length; --n > -1; ) {
if (((o = w[n]), Math.abs(x[o] - u[o]) > 0.05)) {
                t = !1;
                break;
              }
}
            t &&
              ((a = a.concat()),
              m && a.unshift(m),
              a.push(a[1]),
              (m = a[a.length - 3]));
          }
          for (b.length = c.length = d.length = 0, n = w.length; --n > -1; ) {
(o = w[n]),
              (e[o] = -1 !== l.indexOf(',' + o + ',')),
              (v[o] = k(a, o, e[o], m));
}
          for (n = b.length; --n > -1; ) {
(b[n] = Math.sqrt(b[n])), (c[n] = Math.sqrt(c[n]));
}
          if (!i) {
            for (n = w.length; --n > -1; ) {
if (e[o]) {
for (p = v[w[n]], s = p.length - 1, q = 0; s > q; q++) {
(r = p[q + 1].da / c[q] + p[q].da / b[q] || 0),
                    (d[q] = (d[q] || 0) + r * r);
}
}
}
            for (n = d.length; --n > -1; ) d[n] = Math.sqrt(d[n]);
          }
          for (n = w.length, q = g ? 4 : 1; --n > -1; ) {
(o = w[n]),
              (p = v[o]),
              j(p, f, g, i, e[o]),
              t && (p.splice(0, q), p.splice(p.length - q, q));
}
          return v;
        };
        const m = function(a, b, c) {
          b = b || 'soft';
          let d;
            let e;
            let f;
            let h;
            let i;
            let j;
            let k;
            let l;
            let m;
            let n;
            let o;
            const p = {};
            const q = 'cubic' === b ? 3 : 2;
            const r = 'soft' === b;
            const s = [];
          if ((r && c && (a = [c].concat(a)), null == a || a.length < q + 1)) {
throw 'invalid Bezier data';
}
          for (m in a[0]) s.push(m);
          for (j = s.length; --j > -1; ) {
            for (
              m = s[j], p[m] = i = [], n = 0, l = a.length, k = 0;
              l > k;
              k++
            ) {
(d =
                null == c ?
                  a[k][m] :
                  'string' == typeof (o = a[k][m]) && '=' === o.charAt(1) ?
                  c[m] + Number(o.charAt(0) + o.substr(2)) :
                  Number(o)),
                r && k > 1 && l - 1 > k && (i[n++] = (d + i[n - 2]) / 2),
                (i[n++] = d);
}
            for (l = n - q + 1, n = 0, k = 0; l > k; k += q) {
(d = i[k]),
                (e = i[k + 1]),
                (f = i[k + 2]),
                (h = 2 === q ? 0 : i[k + 3]),
                (i[n++] = o =
                  3 === q ?
                    new g(d, e, f, h) :
                    new g(d, (2 * e + d) / 3, (2 * e + f) / 3, f));
}
            i.length = n;
          }
          return p;
        };
        const n = function(a, b, c) {
          for (
            var d, e, f, g, h, i, j, k, l, m, n, o = 1 / c, p = a.length;
            --p > -1;

          ) {
for (
              m = a[p],
                f = m.a,
                g = m.d - f,
                h = m.c - f,
                i = m.b - f,
                d = e = 0,
                k = 1;
              c >= k;
              k++
            ) {
(j = o * k),
                (l = 1 - j),
                (d = e - (e = (j * j * g + 3 * l * (j * h + l * i)) * j)),
                (n = p * c + k - 1),
                (b[n] = (b[n] || 0) + d * d);
}
}
        };
        const o = function(a, b) {
          b = b >> 0 || 6;
          let c;
            let d;
            let e;
            let f;
            const g = [];
            const h = [];
            let i = 0;
            let j = 0;
            const k = b - 1;
            const l = [];
            let m = [];
          for (c in a) n(a[c], g, b);
          for (e = g.length, d = 0; e > d; d++) {
(i += Math.sqrt(g[d])),
              (f = d % b),
              (m[f] = i),
              f === k &&
                ((j += i),
                (f = (d / b) >> 0),
                (l[f] = m),
                (h[f] = j),
                (i = 0),
                (m = []));
}
          return {length: j, lengths: h, segments: l};
        };
        const p = _gsScope._gsDefine.plugin({
          propName: 'bezier',
          priority: -1,
          version: '1.3.8',
          API: 2,
          global: !0,
          init: function(a, b, c) {
            (this._target = a),
              b instanceof Array && (b = {values: b}),
              (this._func = {}),
              (this._mod = {}),
              (this._props = []),
              (this._timeRes =
                null == b.timeResolution ? 6 : parseInt(b.timeResolution, 10));
            let d;
              let e;
              let f;
              let g;
              let h;
              const i = b.values || [];
              const j = {};
              const k = i[0];
              let n = b.autoRotate || c.vars.orientToBezier;
            this._autoRotate = n ?
              n instanceof Array ?
                n :
                [['x', 'y', 'rotation', n === !0 ? 0 : Number(n) || 0]] :
              null;
            for (d in k) this._props.push(d);
            for (f = this._props.length; --f > -1; ) {
(d = this._props[f]),
                this._overwriteProps.push(d),
                (e = this._func[d] = 'function' == typeof a[d]),
                (j[d] = e ?
                  a[
                      d.indexOf('set') ||
                      'function' != typeof a['get' + d.substr(3)] ?
                        d :
                        'get' + d.substr(3)
                    ]() :
                  parseFloat(a[d])),
                h || (j[d] !== i[0][d] && (h = j));
}
            if (
              ((this._beziers =
                'cubic' !== b.type &&
                'quadratic' !== b.type &&
                'soft' !== b.type ?
                  l(
                      i,
                      isNaN(b.curviness) ? 1 : b.curviness,
                      !1,
                      'thruBasic' === b.type,
                      b.correlate,
                      h,
                    ) :
                  m(i, b.type, j)),
              (this._segCount = this._beziers[d].length),
              this._timeRes)
            ) {
              const p = o(this._beziers, this._timeRes);
              (this._length = p.length),
                (this._lengths = p.lengths),
                (this._segments = p.segments),
                (this._l1 = this._li = this._s1 = this._si = 0),
                (this._l2 = this._lengths[0]),
                (this._curSeg = this._segments[0]),
                (this._s2 = this._curSeg[0]),
                (this._prec = 1 / this._curSeg.length);
            }
            if ((n = this._autoRotate)) {
for (
                this._initialRotations = [],
                  n[0] instanceof Array || (this._autoRotate = n = [n]),
                  f = n.length;
                --f > -1;

              ) {
                for (g = 0; 3 > g; g++) {
(d = n[f][g]),
                    (this._func[d] =
                      'function' == typeof a[d] ?
                        a[
                            d.indexOf('set') ||
                            'function' != typeof a['get' + d.substr(3)] ?
                              d :
                              'get' + d.substr(3)
                          ] :
                        !1);
}
                (d = n[f][2]),
                  (this._initialRotations[f] =
                    (this._func[d] ?
                      this._func[d].call(this._target) :
                      this._target[d]) || 0),
                  this._overwriteProps.push(d);
              }
}
            return (this._startRatio = c.vars.runBackwards ? 1 : 0), !0;
          },
          set: function(b) {
            let c;
              let d;
              let e;
              let f;
              let g;
              let h;
              let i;
              let j;
              let k;
              let l;
              const m = this._segCount;
              const n = this._func;
              const o = this._target;
              const p = b !== this._startRatio;
            if (this._timeRes) {
              if (
                ((k = this._lengths),
                (l = this._curSeg),
                (b *= this._length),
                (e = this._li),
                b > this._l2 && m - 1 > e)
              ) {
                for (j = m - 1; j > e && (this._l2 = k[++e]) <= b; );
                (this._l1 = k[e - 1]),
                  (this._li = e),
                  (this._curSeg = l = this._segments[e]),
                  (this._s2 = l[(this._s1 = this._si = 0)]);
              } else if (b < this._l1 && e > 0) {
                for (; e > 0 && (this._l1 = k[--e]) >= b; );
                0 === e && b < this._l1 ? (this._l1 = 0) : e++,
                  (this._l2 = k[e]),
                  (this._li = e),
                  (this._curSeg = l = this._segments[e]),
                  (this._s1 = l[(this._si = l.length - 1) - 1] || 0),
                  (this._s2 = l[this._si]);
              }
              if (
                ((c = e),
                (b -= this._l1),
                (e = this._si),
                b > this._s2 && e < l.length - 1)
              ) {
                for (j = l.length - 1; j > e && (this._s2 = l[++e]) <= b; );
                (this._s1 = l[e - 1]), (this._si = e);
              } else if (b < this._s1 && e > 0) {
                for (; e > 0 && (this._s1 = l[--e]) >= b; );
                0 === e && b < this._s1 ? (this._s1 = 0) : e++,
                  (this._s2 = l[e]),
                  (this._si = e);
              }
              h =
                (e + (b - this._s1) / (this._s2 - this._s1)) * this._prec || 0;
            } else {
(c = 0 > b ? 0 : b >= 1 ? m - 1 : (m * b) >> 0),
                (h = (b - c * (1 / m)) * m);
}
            for (d = 1 - h, e = this._props.length; --e > -1; ) {
(f = this._props[e]),
                (g = this._beziers[f][c]),
                (i = (h * h * g.da + 3 * d * (h * g.ca + d * g.ba)) * h + g.a),
                this._mod[f] && (i = this._mod[f](i, o)),
                n[f] ? o[f](i) : (o[f] = i);
}
            if (this._autoRotate) {
              let q;
                let r;
                let s;
                let t;
                let u;
                let v;
                let w;
                const x = this._autoRotate;
              for (e = x.length; --e > -1; ) {
(f = x[e][2]),
                  (v = x[e][3] || 0),
                  (w = x[e][4] === !0 ? 1 : a),
                  (g = this._beziers[x[e][0]]),
                  (q = this._beziers[x[e][1]]),
                  g &&
                    q &&
                    ((g = g[c]),
                    (q = q[c]),
                    (r = g.a + (g.b - g.a) * h),
                    (t = g.b + (g.c - g.b) * h),
                    (r += (t - r) * h),
                    (t += (g.c + (g.d - g.c) * h - t) * h),
                    (s = q.a + (q.b - q.a) * h),
                    (u = q.b + (q.c - q.b) * h),
                    (s += (u - s) * h),
                    (u += (q.c + (q.d - q.c) * h - u) * h),
                    (i = p ?
                      Math.atan2(u - s, t - r) * w + v :
                      this._initialRotations[e]),
                    this._mod[f] && (i = this._mod[f](i, o)),
                    n[f] ? o[f](i) : (o[f] = i));
}
            }
          },
        });
        const q = p.prototype;
      (p.bezierThrough = l),
        (p.cubicToQuadratic = i),
        (p._autoCSS = !0),
        (p.quadraticToCubic = function(a, b, c) {
          return new g(a, (2 * b + a) / 3, (2 * b + c) / 3, c);
        }),
        (p._cssRegister = function() {
          const a = f.CSSPlugin;
          if (a) {
            const b = a._internals;
              const c = b._parseToProxy;
              const d = b._setPluginRatio;
              const e = b.CSSPropTween;
            b._registerComplexSpecialProp('bezier', {
              parser: function(a, b, f, g, h, i) {
                b instanceof Array && (b = {values: b}), (i = new p());
                let j;
                  let k;
                  let l;
                  const m = b.values;
                  const n = m.length - 1;
                  const o = [];
                  const q = {};
                if (0 > n) return h;
                for (j = 0; n >= j; j++) {
(l = c(a, m[j], g, h, i, n !== j)), (o[j] = l.end);
}
                for (k in b) q[k] = b[k];
                return (
                  (q.values = o),
                  (h = new e(a, 'bezier', 0, 0, l.pt, 2)),
                  (h.data = l),
                  (h.plugin = i),
                  (h.setRatio = d),
                  0 === q.autoRotate && (q.autoRotate = !0),
                  !q.autoRotate ||
                    q.autoRotate instanceof Array ||
                    ((j = q.autoRotate === !0 ? 0 : Number(q.autoRotate)),
                    (q.autoRotate =
                      null != l.end.left ?
                        [['left', 'top', 'rotation', j, !1]] :
                        null != l.end.x ?
                        [['x', 'y', 'rotation', j, !1]] :
                        !1)),
                  q.autoRotate &&
                    (g._transform || g._enableTransforms(!1),
                    (l.autoRotate = g._target._gsTransform),
                    (l.proxy.rotation = l.autoRotate.rotation || 0),
                    g._overwriteProps.push('rotation')),
                  i._onInitTween(l.proxy, q, g._tween),
                  h
                );
              },
            });
          }
        }),
        (q._mod = function(a) {
          for (var b, c = this._overwriteProps, d = c.length; --d > -1; ) {
(b = a[c[d]]), b && 'function' == typeof b && (this._mod[c[d]] = b);
}
        }),
        (q._kill = function(a) {
          let b;
            let c;
            let d = this._props;
          for (b in this._beziers) {
if (b in a) {
for (
                delete this._beziers[b], delete this._func[b], c = d.length;
                --c > -1;

              ) {
d[c] === b && d.splice(c, 1);
}
}
}
          if ((d = this._autoRotate)) {
for (c = d.length; --c > -1; ) a[d[c][2]] && d.splice(c, 1);
}
          return this._super._kill.call(this, a);
        });
    })(),
    _gsScope._gsDefine(
      'plugins.CSSPlugin',
      ['plugins.TweenPlugin', 'TweenLite'],
      function(a, b) {
        let c;
          let d;
          let e;
          let f;
          var g = function() {
            a.call(this, 'css'),
              (this._overwriteProps.length = 0),
              (this.setRatio = g.prototype.setRatio);
          };
          const h = _gsScope._gsDefine.globals;
          const i = {};
          let j = (g.prototype = new a('css'));
        (j.constructor = g),
          (g.version = '2.0.2'),
          (g.API = 2),
          (g.defaultTransformPerspective = 0),
          (g.defaultSkewType = 'compensated'),
          (g.defaultSmoothOrigin = !0),
          (j = 'px'),
          (g.suffixMap = {
            top: j,
            right: j,
            bottom: j,
            left: j,
            width: j,
            height: j,
            fontSize: j,
            padding: j,
            margin: j,
            perspective: j,
            lineHeight: '',
          });
        let k;
          let l;
          let m;
          let n;
          let o;
          let p;
          let q;
          let r;
          const s = /(?:\-|\.|\b)(\d|\.|e\-)+/g;
          const t = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g;
          const u = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi;
          const v = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g;
          const w = /(?:\d|\-|\+|=|#|\.)*/g;
          const x = /opacity *= *([^)]*)/i;
          const y = /opacity:([^;]*)/i;
          const z = /alpha\(opacity *=.+?\)/i;
          const A = /^(rgb|hsl)/;
          const B = /([A-Z])/g;
          const C = /-([a-z])/gi;
          const D = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi;
          const E = function(a, b) {
            return b.toUpperCase();
          };
          const F = /(?:Left|Right|Width)/i;
          const G = /(M11|M12|M21|M22)=[\d\-\.e]+/gi;
          const H = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i;
          const I = /,(?=[^\)]*(?:\(|$))/gi;
          const J = /[\s,\(]/i;
          const K = Math.PI / 180;
          const L = 180 / Math.PI;
          let M = {};
          const N = {style: {}};
          const O = _gsScope.document || {
            createElement: function() {
              return N;
            },
          };
          const P = function(a, b) {
            return O.createElementNS ?
              O.createElementNS(b || 'http://www.w3.org/1999/xhtml', a) :
              O.createElement(a);
          };
          const Q = P('div');
          const R = P('img');
          const S = (g._internals = {_specialProps: i});
          const T = (_gsScope.navigator || {}).userAgent || '';
          const U = (function() {
            const a = T.indexOf('Android');
              const b = P('a');
            return (
              (m =
                -1 !== T.indexOf('Safari') &&
                -1 === T.indexOf('Chrome') &&
                (-1 === a || parseFloat(T.substr(a + 8, 2)) > 3)),
              (o = m && parseFloat(T.substr(T.indexOf('Version/') + 8, 2)) < 6),
              (n = -1 !== T.indexOf('Firefox')),
              (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(T) ||
                /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(T)) &&
                (p = parseFloat(RegExp.$1)),
              b ?
                ((b.style.cssText = 'top:1px;opacity:.55;'),
                  /^0.55/.test(b.style.opacity)) :
                !1
            );
          })();
          const V = function(a) {
            return x.test(
              'string' == typeof a ?
                a :
                (a.currentStyle ? a.currentStyle.filter : a.style.filter) ||
                    '',
            ) ?
              parseFloat(RegExp.$1) / 100 :
              1;
          };
          const W = function(a) {
            _gsScope.console && console.log(a);
          };
          let X = '';
          let Y = '';
          const Z = function(a, b) {
            b = b || Q;
            let c;
              let d;
              const e = b.style;
            if (void 0 !== e[a]) return a;
            for (
              a = a.charAt(0).toUpperCase() + a.substr(1),
                c = ['O', 'Moz', 'ms', 'Ms', 'Webkit'],
                d = 5;
              --d > -1 && void 0 === e[c[d] + a];

            );
            return d >= 0 ?
              ((Y = 3 === d ? 'ms' : c[d]),
                (X = '-' + Y.toLowerCase() + '-'),
                Y + a) :
              null;
          };
          const $ = ('undefined' != typeof window ?
            window :
            O.defaultView || {getComputedStyle: function() {}}
          ).getComputedStyle;
          const _ = (g.getStyle = function(a, b, c, d, e) {
            let f;
            return U || 'opacity' !== b ?
              (!d && a.style[b] ?
                  (f = a.style[b]) :
                  (c = c || $(a)) ?
                  (f =
                      c[b] ||
                      c.getPropertyValue(b) ||
                      c.getPropertyValue(b.replace(B, '-$1').toLowerCase())) :
                  a.currentStyle && (f = a.currentStyle[b]),
                null == e ||
                (f && 'none' !== f && 'auto' !== f && 'auto auto' !== f) ?
                  f :
                  e) :
              V(a);
          });
          var aa = (S.convertToPixels = function(a, c, d, e, f) {
            if ('px' === e || (!e && 'lineHeight' !== c)) return d;
            if ('auto' === e || !d) return 0;
            let h;
              let i;
              let j;
              const k = F.test(c);
              let l = a;
              const m = Q.style;
              const n = 0 > d;
              const o = 1 === d;
            if ((n && (d = -d), o && (d *= 100), 'lineHeight' !== c || e)) {
if ('%' === e && -1 !== c.indexOf('border')) {
h = (d / 100) * (k ? a.clientWidth : a.clientHeight);
} else {
                if (
                  ((m.cssText =
                    'border:0 solid red;position:' +
                    _(a, 'position') +
                    ';line-height:0;'),
                  '%' !== e &&
                    l.appendChild &&
                    'v' !== e.charAt(0) &&
                    'rem' !== e)
                ) {
m[k ? 'borderLeftWidth' : 'borderTopWidth'] = d + e;
} else {
                  if (
                    ((l = a.parentNode || O.body),
                    -1 !== _(l, 'display').indexOf('flex') &&
                      (m.position = 'absolute'),
                    (i = l._gsCache),
                    (j = b.ticker.frame),
                    i && k && i.time === j)
                  ) {
return (i.width * d) / 100;
}
                  m[k ? 'width' : 'height'] = d + e;
                }
                l.appendChild(Q),
                  (h = parseFloat(Q[k ? 'offsetWidth' : 'offsetHeight'])),
                  l.removeChild(Q),
                  k &&
                    '%' === e &&
                    g.cacheWidths !== !1 &&
                    ((i = l._gsCache = l._gsCache || {}),
                    (i.time = j),
                    (i.width = (h / d) * 100)),
                  0 !== h || f || (h = aa(a, c, d, e, !0));
              }
} else {
(i = $(a).lineHeight),
                (a.style.lineHeight = d),
                (h = parseFloat($(a).lineHeight)),
                (a.style.lineHeight = i);
}
            return o && (h /= 100), n ? -h : h;
          });
          const ba = (S.calculateOffset = function(a, b, c) {
            if ('absolute' !== _(a, 'position', c)) return 0;
            const d = 'left' === b ? 'Left' : 'Top';
              const e = _(a, 'margin' + d, c);
            return (
              a['offset' + d] - (aa(a, b, parseFloat(e), e.replace(w, '')) || 0)
            );
          });
          const ca = function(a, b) {
            let c;
              let d;
              let e;
              const f = {};
            if ((b = b || $(a, null))) {
if ((c = b.length)) {
for (; --c > -1; ) {
(e = b[c]),
                    (-1 === e.indexOf('-transform') || Da === e) &&
                      (f[e.replace(C, E)] = b.getPropertyValue(e));
}
} else {
for (c in b) {
(-1 === c.indexOf('Transform') || Ca === c) && (f[c] = b[c]);
}
}
} else if ((b = a.currentStyle || a.style)) {
for (c in b) {
'string' == typeof c &&
                  void 0 === f[c] &&
                  (f[c.replace(C, E)] = b[c]);
}
}
            return (
              U || (f.opacity = V(a)),
              (d = Ra(a, b, !1)),
              (f.rotation = d.rotation),
              (f.skewX = d.skewX),
              (f.scaleX = d.scaleX),
              (f.scaleY = d.scaleY),
              (f.x = d.x),
              (f.y = d.y),
              Fa &&
                ((f.z = d.z),
                (f.rotationX = d.rotationX),
                (f.rotationY = d.rotationY),
                (f.scaleZ = d.scaleZ)),
              f.filters && delete f.filters,
              f
            );
          };
          const da = function(a, b, c, d, e) {
            let f;
              let g;
              let h;
              const i = {};
              const j = a.style;
            for (g in c) {
'cssText' !== g &&
                'length' !== g &&
                isNaN(g) &&
                (b[g] !== (f = c[g]) || (e && e[g])) &&
                -1 === g.indexOf('Origin') &&
                ('number' == typeof f || 'string' == typeof f) &&
                ((i[g] =
                  'auto' !== f || ('left' !== g && 'top' !== g) ?
                    ('' !== f && 'auto' !== f && 'none' !== f) ||
                      'string' != typeof b[g] ||
                      '' === b[g].replace(v, '') ?
                      f :
                      0 :
                    ba(a, g)),
                void 0 !== j[g] && (h = new sa(j, g, j[g], h)));
}
            if (d) for (g in d) 'className' !== g && (i[g] = d[g]);
            return {difs: i, firstMPT: h};
          };
          const ea = {width: ['Left', 'Right'], height: ['Top', 'Bottom']};
          const fa = ['marginLeft', 'marginRight', 'marginTop', 'marginBottom'];
          const ga = function(a, b, c) {
            if ('svg' === (a.nodeName + '').toLowerCase()) {
return (c || $(a))[b] || 0;
}
            if (a.getCTM && Oa(a)) return a.getBBox()[b] || 0;
            let d = parseFloat('width' === b ? a.offsetWidth : a.offsetHeight);
              const e = ea[b];
              let f = e.length;
            for (c = c || $(a, null); --f > -1; ) {
(d -= parseFloat(_(a, 'padding' + e[f], c, !0)) || 0),
                (d -= parseFloat(_(a, 'border' + e[f] + 'Width', c, !0)) || 0);
}
            return d;
          };
          var ha = function(a, b) {
            if ('contain' === a || 'auto' === a || 'auto auto' === a) {
return a + ' ';
}
            (null == a || '' === a) && (a = '0 0');
            let c;
              let d = a.split(' ');
              let e =
                -1 !== a.indexOf('left') ?
                  '0%' :
                  -1 !== a.indexOf('right') ?
                  '100%' :
                  d[0];
              let f =
                -1 !== a.indexOf('top') ?
                  '0%' :
                  -1 !== a.indexOf('bottom') ?
                  '100%' :
                  d[1];
            if (d.length > 3 && !b) {
              for (
                d = a.split(', ').join(',').split(','), a = [], c = 0;
                c < d.length;
                c++
              ) {
a.push(ha(d[c]));
}
              return a.join(',');
            }
            return (
              null == f ?
                (f = 'center' === e ? '50%' : '0') :
                'center' === f && (f = '50%'),
              ('center' === e ||
                (isNaN(parseFloat(e)) && -1 === (e + '').indexOf('='))) &&
                (e = '50%'),
              (a = e + ' ' + f + (d.length > 2 ? ' ' + d[2] : '')),
              b &&
                ((b.oxp = -1 !== e.indexOf('%')),
                (b.oyp = -1 !== f.indexOf('%')),
                (b.oxr = '=' === e.charAt(1)),
                (b.oyr = '=' === f.charAt(1)),
                (b.ox = parseFloat(e.replace(v, ''))),
                (b.oy = parseFloat(f.replace(v, ''))),
                (b.v = a)),
              b || a
            );
          };
          const ia = function(a, b) {
            return (
              'function' == typeof a && (a = a(r, q)),
              'string' == typeof a && '=' === a.charAt(1) ?
                parseInt(a.charAt(0) + '1', 10) * parseFloat(a.substr(2)) :
                parseFloat(a) - parseFloat(b) || 0
            );
          };
          const ja = function(a, b) {
            'function' == typeof a && (a = a(r, q));
            const c = 'string' == typeof a && '=' === a.charAt(1);
            return (
              'string' == typeof a &&
                'v' === a.charAt(a.length - 2) &&
                (a =
                  (c ? a.substr(0, 2) : 0) +
                  window[
                    'inner' + ('vh' === a.substr(-2) ? 'Height' : 'Width')
                  ] *
                    (parseFloat(c ? a.substr(2) : a) / 100)),
              null == a ?
                b :
                c ?
                parseInt(a.charAt(0) + '1', 10) * parseFloat(a.substr(2)) + b :
                parseFloat(a) || 0
            );
          };
          const ka = function(a, b, c, d) {
            let e;
              let f;
              let g;
              let h;
              let i;
              const j = 1e-6;
            return (
              'function' == typeof a && (a = a(r, q)),
              null == a ?
                (h = b) :
                'number' == typeof a ?
                (h = a) :
                ((e = 360),
                  (f = a.split('_')),
                  (i = '=' === a.charAt(1)),
                  (g =
                    (i ?
                      parseInt(a.charAt(0) + '1', 10) *
                        parseFloat(f[0].substr(2)) :
                      parseFloat(f[0])) *
                      (-1 === a.indexOf('rad') ? 1 : L) -
                    (i ? 0 : b)),
                  f.length &&
                    (d && (d[c] = b + g),
                    -1 !== a.indexOf('short') &&
                      ((g %= e),
                      g !== g % (e / 2) && (g = 0 > g ? g + e : g - e)),
                    -1 !== a.indexOf('_cw') && 0 > g ?
                      (g = ((g + 9999999999 * e) % e) - ((g / e) | 0) * e) :
                      -1 !== a.indexOf('ccw') &&
                        g > 0 &&
                        (g = ((g - 9999999999 * e) % e) - ((g / e) | 0) * e)),
                  (h = b + g)),
              j > h && h > -j && (h = 0),
              h
            );
          };
          const la = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0],
          };
          const ma = function(a, b, c) {
            return (
              (a = 0 > a ? a + 1 : a > 1 ? a - 1 : a),
              (255 *
                (1 > 6 * a ?
                  b + (c - b) * a * 6 :
                  0.5 > a ?
                  c :
                  2 > 3 * a ?
                  b + (c - b) * (2 / 3 - a) * 6 :
                  b) +
                0.5) |
                0
            );
          };
          const na = (g.parseColor = function(a, b) {
            let c; let d; let e; let f; let g; let h; let i; let j; let k; let l; let m;
            if (a) {
if ('number' == typeof a) c = [a >> 16, (a >> 8) & 255, 255 & a];
              else {
                if (
                  (',' === a.charAt(a.length - 1) &&
                    (a = a.substr(0, a.length - 1)),
                  la[a])
                ) {
c = la[a];
} else if ('#' === a.charAt(0)) {
4 === a.length &&
                    ((d = a.charAt(1)),
                    (e = a.charAt(2)),
                    (f = a.charAt(3)),
                    (a = '#' + d + d + e + e + f + f)),
                    (a = parseInt(a.substr(1), 16)),
                    (c = [a >> 16, (a >> 8) & 255, 255 & a]);
} else if ('hsl' === a.substr(0, 3)) {
if (((c = m = a.match(s)), b)) {
                    if (-1 !== a.indexOf('=')) return a.match(t);
                  } else {
(g = (Number(c[0]) % 360) / 360),
                      (h = Number(c[1]) / 100),
                      (i = Number(c[2]) / 100),
                      (e = 0.5 >= i ? i * (h + 1) : i + h - i * h),
                      (d = 2 * i - e),
                      c.length > 3 && (c[3] = Number(c[3])),
                      (c[0] = ma(g + 1 / 3, d, e)),
                      (c[1] = ma(g, d, e)),
                      (c[2] = ma(g - 1 / 3, d, e));
}
} else c = a.match(s) || la.transparent;
                (c[0] = Number(c[0])),
                  (c[1] = Number(c[1])),
                  (c[2] = Number(c[2])),
                  c.length > 3 && (c[3] = Number(c[3]));
              }
} else c = la.black;
            return (
              b &&
                !m &&
                ((d = c[0] / 255),
                (e = c[1] / 255),
                (f = c[2] / 255),
                (j = Math.max(d, e, f)),
                (k = Math.min(d, e, f)),
                (i = (j + k) / 2),
                j === k ?
                  (g = h = 0) :
                  ((l = j - k),
                    (h = i > 0.5 ? l / (2 - j - k) : l / (j + k)),
                    (g =
                      j === d ?
                        (e - f) / l + (f > e ? 6 : 0) :
                        j === e ?
                        (f - d) / l + 2 :
                        (d - e) / l + 4),
                    (g *= 60)),
                (c[0] = (g + 0.5) | 0),
                (c[1] = (100 * h + 0.5) | 0),
                (c[2] = (100 * i + 0.5) | 0)),
              c
            );
          });
          const oa = function(a, b) {
            let c;
              let d;
              let e;
              const f = a.match(pa) || [];
              let g = 0;
              let h = '';
            if (!f.length) return a;
            for (c = 0; c < f.length; c++) {
(d = f[c]),
                (e = a.substr(g, a.indexOf(d, g) - g)),
                (g += e.length + d.length),
                (d = na(d, b)),
                3 === d.length && d.push(1),
                (h +=
                  e +
                  (b ?
                    'hsla(' + d[0] + ',' + d[1] + '%,' + d[2] + '%,' + d[3] :
                    'rgba(' + d.join(',')) +
                  ')');
}
            return h + a.substr(g);
          };
          var pa =
            '(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b';
        for (j in la) pa += '|' + j + '\\b';
        (pa = new RegExp(pa + ')', 'gi')),
          (g.colorStringFilter = function(a) {
            let b;
              const c = a[0] + ' ' + a[1];
            pa.test(c) &&
              ((b = -1 !== c.indexOf('hsl(') || -1 !== c.indexOf('hsla(')),
              (a[0] = oa(a[0], b)),
              (a[1] = oa(a[1], b))),
              (pa.lastIndex = 0);
          }),
          b.defaultStringFilter ||
            (b.defaultStringFilter = g.colorStringFilter);
        const qa = function(a, b, c, d) {
            if (null == a) {
return function(a) {
                return a;
              };
}
            let e;
              const f = b ? (a.match(pa) || [''])[0] : '';
              const g = a.split(f).join('').match(u) || [];
              const h = a.substr(0, a.indexOf(g[0]));
              const i = ')' === a.charAt(a.length - 1) ? ')' : '';
              const j = -1 !== a.indexOf(' ') ? ' ' : ',';
              const k = g.length;
              const l = k > 0 ? g[0].replace(s, '') : '';
            return k ?
              (e = b ?
                  function(a) {
                      let b; let m; let n; let o;
                      if ('number' == typeof a) a += l;
                      else if (d && I.test(a)) {
                        for (
                          o = a.replace(I, '|').split('|'), n = 0;
                          n < o.length;
                          n++
                        ) {
o[n] = e(o[n]);
}
                        return o.join(',');
                      }
                      if (
                        ((b = (a.match(pa) || [f])[0]),
                        (m = a.split(b).join('').match(u) || []),
                        (n = m.length),
                        k > n--)
                      ) {
for (; ++n < k; ) {
m[n] = c ? m[((n - 1) / 2) | 0] : g[n];
}
}
                      return (
                        h +
                        m.join(j) +
                        j +
                        b +
                        i +
                        (-1 !== a.indexOf('inset') ? ' inset' : '')
                      );
                    } :
                  function(a) {
                      let b; let f; let m;
                      if ('number' == typeof a) a += l;
                      else if (d && I.test(a)) {
                        for (
                          f = a.replace(I, '|').split('|'), m = 0;
                          m < f.length;
                          m++
                        ) {
f[m] = e(f[m]);
}
                        return f.join(',');
                      }
                      if (((b = a.match(u) || []), (m = b.length), k > m--)) {
for (; ++m < k; ) {
b[m] = c ? b[((m - 1) / 2) | 0] : g[m];
}
}
                      return h + b.join(j) + i;
                    }) :
              function(a) {
                  return a;
                };
          };
          const ra = function(a) {
            return (
              (a = a.split(',')),
              function(b, c, d, e, f, g, h) {
                let i;
                  const j = (c + '').split(' ');
                for (h = {}, i = 0; 4 > i; i++) {
h[a[i]] = j[i] = j[i] || j[((i - 1) / 2) >> 0];
}
                return e.parse(b, h, f, g);
              }
            );
          };
          var sa =
            ((S._setPluginRatio = function(a) {
              this.plugin.setRatio(a);
              for (
                var b,
                  c,
                  d,
                  e,
                  f,
                  g = this.data,
                  h = g.proxy,
                  i = g.firstMPT,
                  j = 1e-6;
                i;

              ) {
(b = h[i.v]),
                  i.r ? (b = i.r(b)) : j > b && b > -j && (b = 0),
                  (i.t[i.p] = b),
                  (i = i._next);
}
              if (
                (g.autoRotate &&
                  (g.autoRotate.rotation = g.mod ?
                    g.mod.call(this._tween, h.rotation, this.t, this._tween) :
                    h.rotation),
                1 === a || 0 === a)
              ) {
for (i = g.firstMPT, f = 1 === a ? 'e' : 'b'; i; ) {
                  if (((c = i.t), c.type)) {
                    if (1 === c.type) {
                      for (e = c.xs0 + c.s + c.xs1, d = 1; d < c.l; d++) {
e += c['xn' + d] + c['xs' + (d + 1)];
}
                      c[f] = e;
                    }
                  } else c[f] = c.s + c.xs0;
                  i = i._next;
                }
}
            }),
            function(a, b, c, d, e) {
              (this.t = a),
                (this.p = b),
                (this.v = c),
                (this.r = e),
                d && ((d._prev = this), (this._next = d));
            });
          var ta =
            ((S._parseToProxy = function(a, b, c, d, e, f) {
              let g;
                let h;
                let i;
                let j;
                let k;
                const l = d;
                const m = {};
                const n = {};
                const o = c._transform;
                const p = M;
              for (
                c._transform = null,
                  M = b,
                  d = k = c.parse(a, b, d, e),
                  M = p,
                  f &&
                    ((c._transform = o),
                    l && ((l._prev = null), l._prev && (l._prev._next = null)));
                d && d !== l;

              ) {
                if (
                  d.type <= 1 &&
                  ((h = d.p),
                  (n[h] = d.s + d.c),
                  (m[h] = d.s),
                  f || ((j = new sa(d, 's', h, j, d.r)), (d.c = 0)),
                  1 === d.type)
                ) {
for (g = d.l; --g > 0; ) {
(i = 'xn' + g),
                      (h = d.p + '_' + i),
                      (n[h] = d.data[i]),
                      (m[h] = d[i]),
                      f || (j = new sa(d, i, h, j, d.rxp[i]));
}
}
                d = d._next;
              }
              return {proxy: m, end: n, firstMPT: j, pt: k};
            }),
            (S.CSSPropTween = function(a, b, d, e, g, h, i, j, k, l, m) {
              (this.t = a),
                (this.p = b),
                (this.s = d),
                (this.c = e),
                (this.n = i || b),
                a instanceof ta || f.push(this.n),
                (this.r = j ? ('function' == typeof j ? j : Math.round) : j),
                (this.type = h || 0),
                k && ((this.pr = k), (c = !0)),
                (this.b = void 0 === l ? d : l),
                (this.e = void 0 === m ? d + e : m),
                g && ((this._next = g), (g._prev = this));
            }));
          const ua = function(a, b, c, d, e, f) {
            const g = new ta(a, b, c, d - c, e, -1, f);
            return (g.b = c), (g.e = g.xs0 = d), g;
          };
          const va = (g.parseComplex = function(a, b, c, d, e, f, h, i, j, l) {
            (c = c || f || ''),
              'function' == typeof d && (d = d(r, q)),
              (h = new ta(a, b, 0, 0, h, l ? 2 : 1, null, !1, i, c, d)),
              (d += ''),
              e &&
                pa.test(d + c) &&
                ((d = [c, d]), g.colorStringFilter(d), (c = d[0]), (d = d[1]));
            let m;
              let n;
              let o;
              let p;
              let u;
              let v;
              let w;
              let x;
              let y;
              let z;
              let A;
              let B;
              let C;
              let D = c.split(', ').join(',').split(' ');
              let E = d.split(', ').join(',').split(' ');
              let F = D.length;
              const G = k !== !1;
            for (
              (-1 !== d.indexOf(',') || -1 !== c.indexOf(',')) &&
                (-1 !== (d + c).indexOf('rgb') || -1 !== (d + c).indexOf('hsl') ?
                  ((D = D.join(' ').replace(I, ', ').split(' ')),
                    (E = E.join(' ').replace(I, ', ').split(' '))) :
                  ((D = D.join(' ').split(',').join(', ').split(' ')),
                    (E = E.join(' ').split(',').join(', ').split(' '))),
                (F = D.length)),
                F !== E.length && ((D = (f || '').split(' ')), (F = D.length)),
                h.plugin = j,
                h.setRatio = l,
                pa.lastIndex = 0,
                m = 0;
              F > m;
              m++
            ) {
if (
                ((p = D[m]), (u = E[m] + ''), (x = parseFloat(p)), x || 0 === x)
              ) {
h.appendXtra(
                  '',
                  x,
                  ia(u, x),
                  u.replace(t, ''),
                  G && -1 !== u.indexOf('px') ? Math.round : !1,
                  !0,
                );
} else if (e && pa.test(p)) {
(B = u.indexOf(')') + 1),
                  (B = ')' + (B ? u.substr(B) : '')),
                  (C = -1 !== u.indexOf('hsl') && U),
                  (z = u),
                  (p = na(p, C)),
                  (u = na(u, C)),
                  (y = p.length + u.length > 6),
                  y && !U && 0 === u[3] ?
                    ((h['xs' + h.l] += h.l ? ' transparent' : 'transparent'),
                      (h.e = h.e.split(E[m]).join('transparent'))) :
                    (U || (y = !1),
                      C ?
                        h
                            .appendXtra(
                              z.substr(0, z.indexOf('hsl')) +
                                (y ? 'hsla(' : 'hsl('),
                              p[0],
                              ia(u[0], p[0]),
                              ',',
                              !1,
                              !0,
                            )
                            .appendXtra('', p[1], ia(u[1], p[1]), '%,', !1)
                            .appendXtra(
                              '',
                              p[2],
                              ia(u[2], p[2]),
                              y ? '%,' : '%' + B,
                              !1,
                            ) :
                        h
                            .appendXtra(
                              z.substr(0, z.indexOf('rgb')) +
                                (y ? 'rgba(' : 'rgb('),
                              p[0],
                              u[0] - p[0],
                              ',',
                              Math.round,
                              !0,
                            )
                            .appendXtra('', p[1], u[1] - p[1], ',', Math.round)
                            .appendXtra(
                              '',
                              p[2],
                              u[2] - p[2],
                              y ? ',' : B,
                              Math.round,
                            ),
                      y &&
                        ((p = p.length < 4 ? 1 : p[3]),
                        h.appendXtra(
                          '',
                          p,
                          (u.length < 4 ? 1 : u[3]) - p,
                          B,
                          !1,
                        ))),
                  (pa.lastIndex = 0);
} else if ((v = p.match(s))) {
                if (((w = u.match(t)), !w || w.length !== v.length)) return h;
                for (o = 0, n = 0; n < v.length; n++) {
(A = v[n]),
                    (z = p.indexOf(A, o)),
                    h.appendXtra(
                      p.substr(o, z - o),
                      Number(A),
                      ia(w[n], A),
                      '',
                      G && 'px' === p.substr(z + A.length, 2) ? Math.round : !1,
                      0 === n,
                    ),
                    (o = z + A.length);
}
                h['xs' + h.l] += p.substr(o);
              } else h['xs' + h.l] += h.l || h['xs' + h.l] ? ' ' + u : u;
}
            if (-1 !== d.indexOf('=') && h.data) {
              for (B = h.xs0 + h.data.s, m = 1; m < h.l; m++) {
B += h['xs' + m] + h.data['xn' + m];
}
              h.e = B + h['xs' + m];
            }
            return h.l || ((h.type = -1), (h.xs0 = h.e)), h.xfirst || h;
          });
          let wa = 9;
        for (j = ta.prototype, j.l = j.pr = 0; --wa > 0; ) {
(j['xn' + wa] = 0), (j['xs' + wa] = '');
}
        (j.xs0 = ''),
          (j._next = j._prev = j.xfirst = j.data = j.plugin = j.setRatio = j.rxp = null),
          (j.appendXtra = function(a, b, c, d, e, f) {
            const g = this;
              const h = g.l;
            return (
              (g['xs' + h] += f && (h || g['xs' + h]) ? ' ' + a : a || ''),
              c || 0 === h || g.plugin ?
                (g.l++,
                  (g.type = g.setRatio ? 2 : 1),
                  (g['xs' + g.l] = d || ''),
                  h > 0 ?
                    ((g.data['xn' + h] = b + c),
                      (g.rxp['xn' + h] = e),
                      (g['xn' + h] = b),
                      g.plugin ||
                        ((g.xfirst = new ta(
                          g,
                          'xn' + h,
                          b,
                          c,
                          g.xfirst || g,
                          0,
                          g.n,
                          e,
                          g.pr,
                        )),
                        (g.xfirst.xs0 = 0)),
                      g) :
                    ((g.data = {s: b + c}),
                      (g.rxp = {}),
                      (g.s = b),
                      (g.c = c),
                      (g.r = e),
                      g)) :
                ((g['xs' + h] += b + (d || '')), g)
            );
          });
        const xa = function(a, b) {
            (b = b || {}),
              (this.p = b.prefix ? Z(a) || a : a),
              (i[a] = i[this.p] = this),
              (this.format =
                b.formatter ||
                qa(b.defaultValue, b.color, b.collapsible, b.multi)),
              b.parser && (this.parse = b.parser),
              (this.clrs = b.color),
              (this.multi = b.multi),
              (this.keyword = b.keyword),
              (this.dflt = b.defaultValue),
              (this.pr = b.priority || 0);
          };
          const ya = (S._registerComplexSpecialProp = function(a, b, c) {
            'object' != typeof b && (b = {parser: c});
            let d;
              let e;
              const f = a.split(',');
              const g = b.defaultValue;
            for (c = c || [g], d = 0; d < f.length; d++) {
(b.prefix = 0 === d && b.prefix),
                (b.defaultValue = c[d] || g),
                (e = new xa(f[d], b));
}
          });
          const za = (S._registerPluginProp = function(a) {
            if (!i[a]) {
              const b = a.charAt(0).toUpperCase() + a.substr(1) + 'Plugin';
              ya(a, {
                parser: function(a, c, d, e, f, g, j) {
                  const k = h.com.greensock.plugins[b];
                  return k ?
                    (k._cssRegister(), i[d].parse(a, c, d, e, f, g, j)) :
                    (W('Error: ' + b + ' js file not loaded.'), f);
                },
              });
            }
          });
        (j = xa.prototype),
          (j.parseComplex = function(a, b, c, d, e, f) {
            let g;
              let h;
              let i;
              let j;
              let k;
              let l;
              const m = this.keyword;
            if (
              (this.multi &&
                (I.test(c) || I.test(b) ?
                  ((h = b.replace(I, '|').split('|')),
                    (i = c.replace(I, '|').split('|'))) :
                  m && ((h = [b]), (i = [c]))),
              i)
            ) {
              for (
                j = i.length > h.length ? i.length : h.length, g = 0;
                j > g;
                g++
              ) {
(b = h[g] = h[g] || this.dflt),
                  (c = i[g] = i[g] || this.dflt),
                  m &&
                    ((k = b.indexOf(m)),
                    (l = c.indexOf(m)),
                    k !== l &&
                      (-1 === l ?
                        (h[g] = h[g].split(m).join('')) :
                        -1 === k && (h[g] += ' ' + m)));
}
              (b = h.join(', ')), (c = i.join(', '));
            }
            return va(a, this.p, b, c, this.clrs, this.dflt, d, this.pr, e, f);
          }),
          (j.parse = function(a, b, c, d, f, g, h) {
            return this.parseComplex(
              a.style,
              this.format(_(a, this.p, e, !1, this.dflt)),
              this.format(b),
              f,
              g,
            );
          }),
          (g.registerSpecialProp = function(a, b, c) {
            ya(a, {
              parser: function(a, d, e, f, g, h, i) {
                const j = new ta(a, e, 0, 0, g, 2, e, !1, c);
                return (j.plugin = h), (j.setRatio = b(a, d, f._tween, e)), j;
              },
              priority: c,
            });
          }),
          (g.useSVGTransformAttr = !0);
        let Aa;
          const Ba = 'scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent'.split(
            ',',
          );
          var Ca = Z('transform');
          var Da = X + 'transform';
          const Ea = Z('transformOrigin');
          var Fa = null !== Z('perspective');
          const Ga = (S.Transform = function() {
            (this.perspective = parseFloat(g.defaultTransformPerspective) || 0),
              (this.force3D =
                g.defaultForce3D !== !1 && Fa ?
                  g.defaultForce3D || 'auto' :
                  !1);
          });
          const Ha = _gsScope.SVGElement;
          const Ia = function(a, b, c) {
            let d;
              const e = O.createElementNS('http://www.w3.org/2000/svg', a);
              const f = /([a-z])([A-Z])/g;
            for (d in c) {
e.setAttributeNS(null, d.replace(f, '$1-$2').toLowerCase(), c[d]);
}
            return b.appendChild(e), e;
          };
          const Ja = O.documentElement || {};
          const Ka = (function() {
            let a;
              let b;
              let c;
              let d = p || (/Android/i.test(T) && !_gsScope.chrome);
            return (
              O.createElementNS &&
                !d &&
                ((a = Ia('svg', Ja)),
                (b = Ia('rect', a, {width: 100, height: 50, x: 100})),
                (c = b.getBoundingClientRect().width),
                (b.style[Ea] = '50% 50%'),
                (b.style[Ca] = 'scaleX(0.5)'),
                (d = c === b.getBoundingClientRect().width && !(n && Fa)),
                Ja.removeChild(a)),
              d
            );
          })();
          const La = function(a, b, c, d, e, f) {
            let h;
              let i;
              let j;
              let k;
              let l;
              let m;
              let n;
              let o;
              let p;
              let q;
              let r;
              let s;
              let t;
              let u;
              let v = a._gsTransform;
              const w = Qa(a, !0);
            v && ((t = v.xOrigin), (u = v.yOrigin)),
              (!d || (h = d.split(' ')).length < 2) &&
                ((n = a.getBBox()),
                0 === n.x &&
                  0 === n.y &&
                  n.width + n.height === 0 &&
                  (n = {
                    x:
                      parseFloat(
                        a.hasAttribute('x') ?
                          a.getAttribute('x') :
                          a.hasAttribute('cx') ?
                          a.getAttribute('cx') :
                          0,
                      ) || 0,
                    y:
                      parseFloat(
                        a.hasAttribute('y') ?
                          a.getAttribute('y') :
                          a.hasAttribute('cy') ?
                          a.getAttribute('cy') :
                          0,
                      ) || 0,
                    width: 0,
                    height: 0,
                  }),
                (b = ha(b).split(' ')),
                (h = [
                  (-1 !== b[0].indexOf('%') ?
                    (parseFloat(b[0]) / 100) * n.width :
                    parseFloat(b[0])) + n.x,
                  (-1 !== b[1].indexOf('%') ?
                    (parseFloat(b[1]) / 100) * n.height :
                    parseFloat(b[1])) + n.y,
                ])),
              (c.xOrigin = k = parseFloat(h[0])),
              (c.yOrigin = l = parseFloat(h[1])),
              d &&
                w !== Pa &&
                ((m = w[0]),
                (n = w[1]),
                (o = w[2]),
                (p = w[3]),
                (q = w[4]),
                (r = w[5]),
                (s = m * p - n * o),
                s &&
                  ((i = k * (p / s) + l * (-o / s) + (o * r - p * q) / s),
                  (j = k * (-n / s) + l * (m / s) - (m * r - n * q) / s),
                  (k = c.xOrigin = h[0] = i),
                  (l = c.yOrigin = h[1] = j))),
              v &&
                (f &&
                  ((c.xOffset = v.xOffset), (c.yOffset = v.yOffset), (v = c)),
                e || (e !== !1 && g.defaultSmoothOrigin !== !1) ?
                  ((i = k - t),
                    (j = l - u),
                    (v.xOffset += i * w[0] + j * w[2] - i),
                    (v.yOffset += i * w[1] + j * w[3] - j)) :
                  (v.xOffset = v.yOffset = 0)),
              f || a.setAttribute('data-svg-origin', h.join(' '));
          };
          var Ma = function(a) {
            let b;
              const c = P(
                'svg',
                (this.ownerSVGElement &&
                  this.ownerSVGElement.getAttribute('xmlns')) ||
                  'http://www.w3.org/2000/svg',
              );
              const d = this.parentNode;
              const e = this.nextSibling;
              const f = this.style.cssText;
            if (
              (Ja.appendChild(c),
              c.appendChild(this),
              (this.style.display = 'block'),
              a)
            ) {
try {
                (b = this.getBBox()),
                  (this._originalGetBBox = this.getBBox),
                  (this.getBBox = Ma);
              } catch (g) {}
} else this._originalGetBBox && (b = this._originalGetBBox());
            return (
              e ? d.insertBefore(this, e) : d.appendChild(this),
              Ja.removeChild(c),
              (this.style.cssText = f),
              b
            );
          };
          const Na = function(a) {
            try {
              return a.getBBox();
            } catch (b) {
              return Ma.call(a, !0);
            }
          };
          var Oa = function(a) {
            return !(
              !Ha ||
              !a.getCTM ||
              (a.parentNode && !a.ownerSVGElement) ||
              !Na(a)
            );
          };
          var Pa = [1, 0, 0, 1, 0, 0];
          var Qa = function(a, b) {
            let c;
              let d;
              let e;
              let f;
              let g;
              let h;
              const i = a._gsTransform || new Ga();
              const j = 1e5;
              const k = a.style;
            if (
              (Ca ?
                (d = _(a, Da, null, !0)) :
                a.currentStyle &&
                  ((d = a.currentStyle.filter.match(G)),
                  (d =
                    d && 4 === d.length ?
                      [
                          d[0].substr(4),
                          Number(d[2].substr(4)),
                          Number(d[1].substr(4)),
                          d[3].substr(4),
                          i.x || 0,
                          i.y || 0,
                        ].join(',') :
                      '')),
              (c = !d || 'none' === d || 'matrix(1, 0, 0, 1, 0, 0)' === d),
              !Ca ||
                (!(h = !$(a) || 'none' === $(a).display) && a.parentNode) ||
                (h && ((f = k.display), (k.display = 'block')),
                a.parentNode || ((g = 1), Ja.appendChild(a)),
                (d = _(a, Da, null, !0)),
                (c = !d || 'none' === d || 'matrix(1, 0, 0, 1, 0, 0)' === d),
                f ? (k.display = f) : h && Va(k, 'display'),
                g && Ja.removeChild(a)),
              (i.svg || (a.getCTM && Oa(a))) &&
                (c &&
                  -1 !== (k[Ca] + '').indexOf('matrix') &&
                  ((d = k[Ca]), (c = 0)),
                (e = a.getAttribute('transform')),
                c &&
                  e &&
                  ((e = a.transform.baseVal.consolidate().matrix),
                  (d =
                    'matrix(' +
                    e.a +
                    ',' +
                    e.b +
                    ',' +
                    e.c +
                    ',' +
                    e.d +
                    ',' +
                    e.e +
                    ',' +
                    e.f +
                    ')'),
                  (c = 0))),
              c)
            ) {
return Pa;
}
            for (e = (d || '').match(s) || [], wa = e.length; --wa > -1; ) {
(f = Number(e[wa])),
                (e[wa] = (g = f - (f |= 0)) ?
                  ((g * j + (0 > g ? -0.5 : 0.5)) | 0) / j + f :
                  f);
}
            return b && e.length > 6 ?
              [e[0], e[1], e[4], e[5], e[12], e[13]] :
              e;
          };
          var Ra = (S.getTransform = function(a, c, d, e) {
            if (a._gsTransform && d && !e) return a._gsTransform;
            let f;
              let h;
              let i;
              let j;
              let k;
              let l;
              const m = d ? a._gsTransform || new Ga() : new Ga();
              const n = m.scaleX < 0;
              const o = 2e-5;
              const p = 1e5;
              const q = Fa ?
                parseFloat(_(a, Ea, c, !1, '0 0 0').split(' ')[2]) ||
                  m.zOrigin ||
                  0 :
                0;
              const r = parseFloat(g.defaultTransformPerspective) || 0;
            if (
              ((m.svg = !(!a.getCTM || !Oa(a))),
              m.svg &&
                (La(
                  a,
                  _(a, Ea, c, !1, '50% 50%') + '',
                  m,
                  a.getAttribute('data-svg-origin'),
                ),
                (Aa = g.useSVGTransformAttr || Ka)),
              (f = Qa(a)),
              f !== Pa)
            ) {
              if (16 === f.length) {
                let s;
                  let t;
                  let u;
                  let v;
                  let w;
                  let x = f[0];
                  let y = f[1];
                  let z = f[2];
                  const A = f[3];
                  let B = f[4];
                  let C = f[5];
                  let D = f[6];
                  const E = f[7];
                  let F = f[8];
                  let G = f[9];
                  let H = f[10];
                  let I = f[12];
                  let J = f[13];
                  let K = f[14];
                  let M = f[11];
                  let N = Math.atan2(D, H);
                m.zOrigin &&
                  ((K = -m.zOrigin),
                  (I = F * K - f[12]),
                  (J = G * K - f[13]),
                  (K = H * K + m.zOrigin - f[14])),
                  (m.rotationX = N * L),
                  N &&
                    ((v = Math.cos(-N)),
                    (w = Math.sin(-N)),
                    (s = B * v + F * w),
                    (t = C * v + G * w),
                    (u = D * v + H * w),
                    (F = B * -w + F * v),
                    (G = C * -w + G * v),
                    (H = D * -w + H * v),
                    (M = E * -w + M * v),
                    (B = s),
                    (C = t),
                    (D = u)),
                  (N = Math.atan2(-z, H)),
                  (m.rotationY = N * L),
                  N &&
                    ((v = Math.cos(-N)),
                    (w = Math.sin(-N)),
                    (s = x * v - F * w),
                    (t = y * v - G * w),
                    (u = z * v - H * w),
                    (G = y * w + G * v),
                    (H = z * w + H * v),
                    (M = A * w + M * v),
                    (x = s),
                    (y = t),
                    (z = u)),
                  (N = Math.atan2(y, x)),
                  (m.rotation = N * L),
                  N &&
                    ((v = Math.cos(N)),
                    (w = Math.sin(N)),
                    (s = x * v + y * w),
                    (t = B * v + C * w),
                    (u = F * v + G * w),
                    (y = y * v - x * w),
                    (C = C * v - B * w),
                    (G = G * v - F * w),
                    (x = s),
                    (B = t),
                    (F = u)),
                  m.rotationX &&
                    Math.abs(m.rotationX) + Math.abs(m.rotation) > 359.9 &&
                    ((m.rotationX = m.rotation = 0),
                    (m.rotationY = 180 - m.rotationY)),
                  (N = Math.atan2(B, C)),
                  (m.scaleX =
                    ((Math.sqrt(x * x + y * y + z * z) * p + 0.5) | 0) / p),
                  (m.scaleY = ((Math.sqrt(C * C + D * D) * p + 0.5) | 0) / p),
                  (m.scaleZ =
                    ((Math.sqrt(F * F + G * G + H * H) * p + 0.5) | 0) / p),
                  (x /= m.scaleX),
                  (B /= m.scaleY),
                  (y /= m.scaleX),
                  (C /= m.scaleY),
                  Math.abs(N) > o ?
                    ((m.skewX = N * L),
                      (B = 0),
                      'simple' !== m.skewType && (m.scaleY *= 1 / Math.cos(N))) :
                    (m.skewX = 0),
                  (m.perspective = M ? 1 / (0 > M ? -M : M) : 0),
                  (m.x = I),
                  (m.y = J),
                  (m.z = K),
                  m.svg &&
                    ((m.x -= m.xOrigin - (m.xOrigin * x - m.yOrigin * B)),
                    (m.y -= m.yOrigin - (m.yOrigin * y - m.xOrigin * C)));
              } else if (
                !Fa ||
                e ||
                !f.length ||
                m.x !== f[4] ||
                m.y !== f[5] ||
                (!m.rotationX && !m.rotationY)
              ) {
                const O = f.length >= 6;
                  const P = O ? f[0] : 1;
                  const Q = f[1] || 0;
                  const R = f[2] || 0;
                  const S = O ? f[3] : 1;
                (m.x = f[4] || 0),
                  (m.y = f[5] || 0),
                  (i = Math.sqrt(P * P + Q * Q)),
                  (j = Math.sqrt(S * S + R * R)),
                  (k = P || Q ? Math.atan2(Q, P) * L : m.rotation || 0),
                  (l = R || S ? Math.atan2(R, S) * L + k : m.skewX || 0),
                  (m.scaleX = i),
                  (m.scaleY = j),
                  (m.rotation = k),
                  (m.skewX = l),
                  Fa &&
                    ((m.rotationX = m.rotationY = m.z = 0),
                    (m.perspective = r),
                    (m.scaleZ = 1)),
                  m.svg &&
                    ((m.x -= m.xOrigin - (m.xOrigin * P + m.yOrigin * R)),
                    (m.y -= m.yOrigin - (m.xOrigin * Q + m.yOrigin * S)));
              }
              Math.abs(m.skewX) > 90 &&
                Math.abs(m.skewX) < 270 &&
                (n ?
                  ((m.scaleX *= -1),
                    (m.skewX += m.rotation <= 0 ? 180 : -180),
                    (m.rotation += m.rotation <= 0 ? 180 : -180)) :
                  ((m.scaleY *= -1), (m.skewX += m.skewX <= 0 ? 180 : -180))),
                (m.zOrigin = q);
              for (h in m) m[h] < o && m[h] > -o && (m[h] = 0);
            }
            return (
              d &&
                ((a._gsTransform = m),
                m.svg &&
                  (Aa && a.style[Ca] ?
                    b.delayedCall(0.001, function() {
                        Va(a.style, Ca);
                      }) :
                    !Aa &&
                      a.getAttribute('transform') &&
                      b.delayedCall(0.001, function() {
                        a.removeAttribute('transform');
                      }))),
              m
            );
          });
          const Sa = function(a) {
            let b;
              let c;
              const d = this.data;
              const e = -d.rotation * K;
              const f = e + d.skewX * K;
              const g = 1e5;
              const h = ((Math.cos(e) * d.scaleX * g) | 0) / g;
              let i = ((Math.sin(e) * d.scaleX * g) | 0) / g;
              let j = ((Math.sin(f) * -d.scaleY * g) | 0) / g;
              const k = ((Math.cos(f) * d.scaleY * g) | 0) / g;
              const l = this.t.style;
              const m = this.t.currentStyle;
            if (m) {
              (c = i), (i = -j), (j = -c), (b = m.filter), (l.filter = '');
              let n;
                let o;
                const q = this.t.offsetWidth;
                const r = this.t.offsetHeight;
                const s = 'absolute' !== m.position;
                let t =
                  'progid:DXImageTransform.Microsoft.Matrix(M11=' +
                  h +
                  ', M12=' +
                  i +
                  ', M21=' +
                  j +
                  ', M22=' +
                  k;
                let u = d.x + (q * d.xPercent) / 100;
                let v = d.y + (r * d.yPercent) / 100;
              if (
                (null != d.ox &&
                  ((n = (d.oxp ? q * d.ox * 0.01 : d.ox) - q / 2),
                  (o = (d.oyp ? r * d.oy * 0.01 : d.oy) - r / 2),
                  (u += n - (n * h + o * i)),
                  (v += o - (n * j + o * k))),
                s ?
                  ((n = q / 2),
                    (o = r / 2),
                    (t +=
                      ', Dx=' +
                      (n - (n * h + o * i) + u) +
                      ', Dy=' +
                      (o - (n * j + o * k) + v) +
                      ')')) :
                  (t += ', sizingMethod=\'auto expand\')'),
                -1 !== b.indexOf('DXImageTransform.Microsoft.Matrix(') ?
                  (l.filter = b.replace(H, t)) :
                  (l.filter = t + ' ' + b),
                (0 === a || 1 === a) &&
                  1 === h &&
                  0 === i &&
                  0 === j &&
                  1 === k &&
                  ((s && -1 === t.indexOf('Dx=0, Dy=0')) ||
                    (x.test(b) && 100 !== parseFloat(RegExp.$1)) ||
                    (-1 === b.indexOf(b.indexOf('Alpha')) &&
                      l.removeAttribute('filter'))),
                !s)
              ) {
                let y;
                  let z;
                  let A;
                  const B = 8 > p ? 1 : -1;
                for (
                  n = d.ieOffsetX || 0,
                    o = d.ieOffsetY || 0,
                    d.ieOffsetX = Math.round(
                      (q - ((0 > h ? -h : h) * q + (0 > i ? -i : i) * r)) / 2 +
                        u,
                    ),
                    d.ieOffsetY = Math.round(
                      (r - ((0 > k ? -k : k) * r + (0 > j ? -j : j) * q)) / 2 +
                        v,
                    ),
                    wa = 0;
                  4 > wa;
                  wa++
                ) {
(z = fa[wa]),
                    (y = m[z]),
                    (c =
                      -1 !== y.indexOf('px') ?
                        parseFloat(y) :
                        aa(this.t, z, parseFloat(y), y.replace(w, '')) || 0),
                    (A =
                      c !== d[z] ?
                        2 > wa ?
                          -d.ieOffsetX :
                          -d.ieOffsetY :
                        2 > wa ?
                        n - d.ieOffsetX :
                        o - d.ieOffsetY),
                    (l[z] =
                      (d[z] = Math.round(
                        c - A * (0 === wa || 2 === wa ? 1 : B),
                      )) + 'px');
}
              }
            }
          };
          const Ta = (S.set3DTransformRatio = S.setTransformRatio = function(a) {
            let b;
              let c;
              let d;
              let e;
              let f;
              let g;
              let h;
              let i;
              let j;
              let k;
              let l;
              let m;
              let o;
              let p;
              let q;
              let r;
              let s;
              let t;
              let u;
              let v;
              let w;
              let x;
              let y;
              const z = this.data;
              const A = this.t.style;
              let B = z.rotation;
              const C = z.rotationX;
              const D = z.rotationY;
              let E = z.scaleX;
              let F = z.scaleY;
              let G = z.scaleZ;
              let H = z.x;
              let I = z.y;
              let J = z.z;
              const L = z.svg;
              let M = z.perspective;
              const N = z.force3D;
              const O = z.skewY;
              let P = z.skewX;
            if (
              (O && ((P += O), (B += O)),
              ((((1 === a || 0 === a) &&
                'auto' === N &&
                (this.tween._totalTime === this.tween._totalDuration ||
                  !this.tween._totalTime)) ||
                !N) &&
                !J &&
                !M &&
                !D &&
                !C &&
                1 === G) ||
                (Aa && L) ||
                !Fa)
            ) {
return void (B || P || L ?
                ((B *= K),
                  (x = P * K),
                  (y = 1e5),
                  (c = Math.cos(B) * E),
                  (f = Math.sin(B) * E),
                  (d = Math.sin(B - x) * -F),
                  (g = Math.cos(B - x) * F),
                  x &&
                    'simple' === z.skewType &&
                    ((b = Math.tan(x - O * K)),
                    (b = Math.sqrt(1 + b * b)),
                    (d *= b),
                    (g *= b),
                    O &&
                      ((b = Math.tan(O * K)),
                      (b = Math.sqrt(1 + b * b)),
                      (c *= b),
                      (f *= b))),
                  L &&
                    ((H +=
                      z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset),
                    (I +=
                      z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset),
                    Aa &&
                      (z.xPercent || z.yPercent) &&
                      ((q = this.t.getBBox()),
                      (H += 0.01 * z.xPercent * q.width),
                      (I += 0.01 * z.yPercent * q.height)),
                    (q = 1e-6),
                    q > H && H > -q && (H = 0),
                    q > I && I > -q && (I = 0)),
                  (u =
                    ((c * y) | 0) / y +
                    ',' +
                    ((f * y) | 0) / y +
                    ',' +
                    ((d * y) | 0) / y +
                    ',' +
                    ((g * y) | 0) / y +
                    ',' +
                    H +
                    ',' +
                    I +
                    ')'),
                  L && Aa ?
                    this.t.setAttribute('transform', 'matrix(' + u) :
                    (A[Ca] =
                        (z.xPercent || z.yPercent ?
                          'translate(' +
                            z.xPercent +
                            '%,' +
                            z.yPercent +
                            '%) matrix(' :
                          'matrix(') + u)) :
                (A[Ca] =
                    (z.xPercent || z.yPercent ?
                      'translate(' +
                        z.xPercent +
                        '%,' +
                        z.yPercent +
                        '%) matrix(' :
                      'matrix(') +
                    E +
                    ',0,0,' +
                    F +
                    ',' +
                    H +
                    ',' +
                    I +
                    ')'));
}
            if (
              (n &&
                ((q = 1e-4),
                q > E && E > -q && (E = G = 2e-5),
                q > F && F > -q && (F = G = 2e-5),
                !M || z.z || z.rotationX || z.rotationY || (M = 0)),
              B || P)
            ) {
(B *= K),
                (r = c = Math.cos(B)),
                (s = f = Math.sin(B)),
                P &&
                  ((B -= P * K),
                  (r = Math.cos(B)),
                  (s = Math.sin(B)),
                  'simple' === z.skewType &&
                    ((b = Math.tan((P - O) * K)),
                    (b = Math.sqrt(1 + b * b)),
                    (r *= b),
                    (s *= b),
                    z.skewY &&
                      ((b = Math.tan(O * K)),
                      (b = Math.sqrt(1 + b * b)),
                      (c *= b),
                      (f *= b)))),
                (d = -s),
                (g = r);
} else {
              if (!(D || C || 1 !== G || M || L)) {
return void (A[Ca] =
                  (z.xPercent || z.yPercent ?
                    'translate(' +
                      z.xPercent +
                      '%,' +
                      z.yPercent +
                      '%) translate3d(' :
                    'translate3d(') +
                  H +
                  'px,' +
                  I +
                  'px,' +
                  J +
                  'px)' +
                  (1 !== E || 1 !== F ? ' scale(' + E + ',' + F + ')' : ''));
}
              (c = g = 1), (d = f = 0);
            }
            (k = 1),
              (e = h = i = j = l = m = 0),
              (o = M ? -1 / M : 0),
              (p = z.zOrigin),
              (q = 1e-6),
              (v = ','),
              (w = '0'),
              (B = D * K),
              B &&
                ((r = Math.cos(B)),
                (s = Math.sin(B)),
                (i = -s),
                (l = o * -s),
                (e = c * s),
                (h = f * s),
                (k = r),
                (o *= r),
                (c *= r),
                (f *= r)),
              (B = C * K),
              B &&
                ((r = Math.cos(B)),
                (s = Math.sin(B)),
                (b = d * r + e * s),
                (t = g * r + h * s),
                (j = k * s),
                (m = o * s),
                (e = d * -s + e * r),
                (h = g * -s + h * r),
                (k *= r),
                (o *= r),
                (d = b),
                (g = t)),
              1 !== G && ((e *= G), (h *= G), (k *= G), (o *= G)),
              1 !== F && ((d *= F), (g *= F), (j *= F), (m *= F)),
              1 !== E && ((c *= E), (f *= E), (i *= E), (l *= E)),
              (p || L) &&
                (p && ((H += e * -p), (I += h * -p), (J += k * -p + p)),
                L &&
                  ((H +=
                    z.xOrigin - (z.xOrigin * c + z.yOrigin * d) + z.xOffset),
                  (I +=
                    z.yOrigin - (z.xOrigin * f + z.yOrigin * g) + z.yOffset)),
                q > H && H > -q && (H = w),
                q > I && I > -q && (I = w),
                q > J && J > -q && (J = 0)),
              (u =
                z.xPercent || z.yPercent ?
                  'translate(' +
                    z.xPercent +
                    '%,' +
                    z.yPercent +
                    '%) matrix3d(' :
                  'matrix3d('),
              (u +=
                (q > c && c > -q ? w : c) +
                v +
                (q > f && f > -q ? w : f) +
                v +
                (q > i && i > -q ? w : i)),
              (u +=
                v +
                (q > l && l > -q ? w : l) +
                v +
                (q > d && d > -q ? w : d) +
                v +
                (q > g && g > -q ? w : g)),
              C || D || 1 !== G ?
                ((u +=
                    v +
                    (q > j && j > -q ? w : j) +
                    v +
                    (q > m && m > -q ? w : m) +
                    v +
                    (q > e && e > -q ? w : e)),
                  (u +=
                    v +
                    (q > h && h > -q ? w : h) +
                    v +
                    (q > k && k > -q ? w : k) +
                    v +
                    (q > o && o > -q ? w : o) +
                    v)) :
                (u += ',0,0,0,0,1,0,'),
              (u += H + v + I + v + J + v + (M ? 1 + -J / M : 1) + ')'),
              (A[Ca] = u);
          });
        (j = Ga.prototype),
          (j.x = j.y = j.z = j.skewX = j.skewY = j.rotation = j.rotationX = j.rotationY = j.zOrigin = j.xPercent = j.yPercent = j.xOffset = j.yOffset = 0),
          (j.scaleX = j.scaleY = j.scaleZ = 1),
          ya(
            'transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin',
            {
              parser: function(a, b, c, d, f, h, i) {
                if (d._lastParsedTransform === i) return f;
                d._lastParsedTransform = i;
                let j;
                  const k = i.scale && 'function' == typeof i.scale ? i.scale : 0;
                'function' == typeof i[c] && ((j = i[c]), (i[c] = b)),
                  k && (i.scale = k(r, a));
                let l;
                  let m;
                  let n;
                  let o;
                  let p;
                  let s;
                  let t;
                  let u;
                  let v;
                  const w = a._gsTransform;
                  const x = a.style;
                  const y = 1e-6;
                  let z = Ba.length;
                  const A = i;
                  const B = {};
                  const C = 'transformOrigin';
                  const D = Ra(a, e, !0, A.parseTransform);
                  let E =
                    A.transform &&
                    ('function' == typeof A.transform ?
                      A.transform(r, q) :
                      A.transform);
                if (
                  ((D.skewType = A.skewType || D.skewType || g.defaultSkewType),
                  (d._transform = D),
                  'rotationZ' in A && (A.rotation = A.rotationZ),
                  E && 'string' == typeof E && Ca)
                ) {
(m = Q.style),
                    (m[Ca] = E),
                    (m.display = 'block'),
                    (m.position = 'absolute'),
                    -1 !== E.indexOf('%') &&
                      ((m.width = _(a, 'width')), (m.height = _(a, 'height'))),
                    O.body.appendChild(Q),
                    (l = Ra(Q, null, !1)),
                    'simple' === D.skewType &&
                      (l.scaleY *= Math.cos(l.skewX * K)),
                    D.svg &&
                      ((s = D.xOrigin),
                      (t = D.yOrigin),
                      (l.x -= D.xOffset),
                      (l.y -= D.yOffset),
                      (A.transformOrigin || A.svgOrigin) &&
                        ((E = {}),
                        La(
                          a,
                          ha(A.transformOrigin),
                          E,
                          A.svgOrigin,
                          A.smoothOrigin,
                          !0,
                        ),
                        (s = E.xOrigin),
                        (t = E.yOrigin),
                        (l.x -= E.xOffset - D.xOffset),
                        (l.y -= E.yOffset - D.yOffset)),
                      (s || t) &&
                        ((u = Qa(Q, !0)),
                        (l.x -= s - (s * u[0] + t * u[2])),
                        (l.y -= t - (s * u[1] + t * u[3])))),
                    O.body.removeChild(Q),
                    l.perspective || (l.perspective = D.perspective),
                    null != A.xPercent &&
                      (l.xPercent = ja(A.xPercent, D.xPercent)),
                    null != A.yPercent &&
                      (l.yPercent = ja(A.yPercent, D.yPercent));
} else if ('object' == typeof A) {
                  if (
                    ((l = {
                      scaleX: ja(
                        null != A.scaleX ? A.scaleX : A.scale,
                        D.scaleX,
                      ),
                      scaleY: ja(
                        null != A.scaleY ? A.scaleY : A.scale,
                        D.scaleY,
                      ),
                      scaleZ: ja(A.scaleZ, D.scaleZ),
                      x: ja(A.x, D.x),
                      y: ja(A.y, D.y),
                      z: ja(A.z, D.z),
                      xPercent: ja(A.xPercent, D.xPercent),
                      yPercent: ja(A.yPercent, D.yPercent),
                      perspective: ja(A.transformPerspective, D.perspective),
                    }),
                    (p = A.directionalRotation),
                    null != p)
                  ) {
if ('object' == typeof p) for (m in p) A[m] = p[m];
                    else A.rotation = p;
}
                  'string' == typeof A.x &&
                    -1 !== A.x.indexOf('%') &&
                    ((l.x = 0), (l.xPercent = ja(A.x, D.xPercent))),
                    'string' == typeof A.y &&
                      -1 !== A.y.indexOf('%') &&
                      ((l.y = 0), (l.yPercent = ja(A.y, D.yPercent))),
                    (l.rotation = ka(
                      'rotation' in A ?
                        A.rotation :
                        'shortRotation' in A ?
                        A.shortRotation + '_short' :
                        D.rotation,
                      D.rotation,
                      'rotation',
                      B,
                    )),
                    Fa &&
                      ((l.rotationX = ka(
                        'rotationX' in A ?
                          A.rotationX :
                          'shortRotationX' in A ?
                          A.shortRotationX + '_short' :
                          D.rotationX || 0,
                        D.rotationX,
                        'rotationX',
                        B,
                      )),
                      (l.rotationY = ka(
                        'rotationY' in A ?
                          A.rotationY :
                          'shortRotationY' in A ?
                          A.shortRotationY + '_short' :
                          D.rotationY || 0,
                        D.rotationY,
                        'rotationY',
                        B,
                      ))),
                    (l.skewX = ka(A.skewX, D.skewX)),
                    (l.skewY = ka(A.skewY, D.skewY));
                }
                for (
                  Fa &&
                    null != A.force3D &&
                    ((D.force3D = A.force3D), (o = !0)),
                    n =
                      D.force3D ||
                      D.z ||
                      D.rotationX ||
                      D.rotationY ||
                      l.z ||
                      l.rotationX ||
                      l.rotationY ||
                      l.perspective,
                    n || null == A.scale || (l.scaleZ = 1);
                  --z > -1;

                ) {
(v = Ba[z]),
                    (E = l[v] - D[v]),
                    (E > y || -y > E || null != A[v] || null != M[v]) &&
                      ((o = !0),
                      (f = new ta(D, v, D[v], E, f)),
                      v in B && (f.e = B[v]),
                      (f.xs0 = 0),
                      (f.plugin = h),
                      d._overwriteProps.push(f.n));
}
                return (
                  (E = A.transformOrigin),
                  D.svg &&
                    (E || A.svgOrigin) &&
                    ((s = D.xOffset),
                    (t = D.yOffset),
                    La(a, ha(E), l, A.svgOrigin, A.smoothOrigin),
                    (f = ua(
                      D,
                      'xOrigin',
                      (w ? D : l).xOrigin,
                      l.xOrigin,
                      f,
                      C,
                    )),
                    (f = ua(
                      D,
                      'yOrigin',
                      (w ? D : l).yOrigin,
                      l.yOrigin,
                      f,
                      C,
                    )),
                    (s !== D.xOffset || t !== D.yOffset) &&
                      ((f = ua(
                        D,
                        'xOffset',
                        w ? s : D.xOffset,
                        D.xOffset,
                        f,
                        C,
                      )),
                      (f = ua(
                        D,
                        'yOffset',
                        w ? t : D.yOffset,
                        D.yOffset,
                        f,
                        C,
                      ))),
                    (E = '0px 0px')),
                  (E || (Fa && n && D.zOrigin)) &&
                    (Ca ?
                      ((o = !0),
                        (v = Ea),
                        (E = (E || _(a, v, e, !1, '50% 50%')) + ''),
                        (f = new ta(x, v, 0, 0, f, -1, C)),
                        (f.b = x[v]),
                        (f.plugin = h),
                        Fa ?
                          ((m = D.zOrigin),
                            (E = E.split(' ')),
                            (D.zOrigin =
                              (E.length > 2 && (0 === m || '0px' !== E[2]) ?
                                parseFloat(E[2]) :
                                m) || 0),
                            (f.xs0 = f.e =
                              E[0] + ' ' + (E[1] || '50%') + ' 0px'),
                            (f = new ta(D, 'zOrigin', 0, 0, f, -1, f.n)),
                            (f.b = m),
                            (f.xs0 = f.e = D.zOrigin)) :
                          (f.xs0 = f.e = E)) :
                      ha(E + '', D)),
                  o &&
                    (d._transformType =
                      (D.svg && Aa) || (!n && 3 !== this._transformType) ?
                        2 :
                        3),
                  j && (i[c] = j),
                  k && (i.scale = k),
                  f
                );
              },
              prefix: !0,
            },
          ),
          ya('boxShadow', {
            defaultValue: '0px 0px 0px 0px #999',
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: 'inset',
          }),
          ya('borderRadius', {
            defaultValue: '0px',
            parser: function(a, b, c, f, g, h) {
              b = this.format(b);
              let i;
                let j;
                let k;
                let l;
                let m;
                let n;
                let o;
                let p;
                let q;
                let r;
                let s;
                let t;
                let u;
                let v;
                let w;
                let x;
                const y = [
                  'borderTopLeftRadius',
                  'borderTopRightRadius',
                  'borderBottomRightRadius',
                  'borderBottomLeftRadius',
                ];
                const z = a.style;
              for (
                q = parseFloat(a.offsetWidth),
                  r = parseFloat(a.offsetHeight),
                  i = b.split(' '),
                  j = 0;
                j < y.length;
                j++
              ) {
this.p.indexOf('border') && (y[j] = Z(y[j])),
                  (m = l = _(a, y[j], e, !1, '0px')),
                  -1 !== m.indexOf(' ') &&
                    ((l = m.split(' ')), (m = l[0]), (l = l[1])),
                  (n = k = i[j]),
                  (o = parseFloat(m)),
                  (t = m.substr((o + '').length)),
                  (u = '=' === n.charAt(1)),
                  u ?
                    ((p = parseInt(n.charAt(0) + '1', 10)),
                      (n = n.substr(2)),
                      (p *= parseFloat(n)),
                      (s = n.substr((p + '').length - (0 > p ? 1 : 0)) || '')) :
                    ((p = parseFloat(n)), (s = n.substr((p + '').length))),
                  '' === s && (s = d[c] || t),
                  s !== t &&
                    ((v = aa(a, 'borderLeft', o, t)),
                    (w = aa(a, 'borderTop', o, t)),
                    '%' === s ?
                      ((m = (v / q) * 100 + '%'), (l = (w / r) * 100 + '%')) :
                      'em' === s ?
                      ((x = aa(a, 'borderLeft', 1, 'em')),
                        (m = v / x + 'em'),
                        (l = w / x + 'em')) :
                      ((m = v + 'px'), (l = w + 'px')),
                    u &&
                      ((n = parseFloat(m) + p + s),
                      (k = parseFloat(l) + p + s))),
                  (g = va(z, y[j], m + ' ' + l, n + ' ' + k, !1, '0px', g));
}
              return g;
            },
            prefix: !0,
            formatter: qa('0px 0px 0px 0px', !1, !0),
          }),
          ya(
            'borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius',
            {
              defaultValue: '0px',
              parser: function(a, b, c, d, f, g) {
                return va(
                  a.style,
                  c,
                  this.format(_(a, c, e, !1, '0px 0px')),
                  this.format(b),
                  !1,
                  '0px',
                  f,
                );
              },
              prefix: !0,
              formatter: qa('0px 0px', !1, !0),
            },
          ),
          ya('backgroundPosition', {
            defaultValue: '0 0',
            parser: function(a, b, c, d, f, g) {
              let h;
                let i;
                let j;
                let k;
                let l;
                let m;
                const n = 'background-position';
                const o = e || $(a, null);
                let q = this.format(
                  (o ?
                    p ?
                      o.getPropertyValue(n + '-x') +
                        ' ' +
                        o.getPropertyValue(n + '-y') :
                      o.getPropertyValue(n) :
                    a.currentStyle.backgroundPositionX +
                      ' ' +
                      a.currentStyle.backgroundPositionY) || '0 0',
                );
                const r = this.format(b);
              if (
                (-1 !== q.indexOf('%')) != (-1 !== r.indexOf('%')) &&
                r.split(',').length < 2 &&
                ((m = _(a, 'backgroundImage').replace(D, '')),
                m && 'none' !== m)
              ) {
                for (
                  h = q.split(' '),
                    i = r.split(' '),
                    R.setAttribute('src', m),
                    j = 2;
                  --j > -1;

                ) {
(q = h[j]),
                    (k = -1 !== q.indexOf('%')),
                    k !== (-1 !== i[j].indexOf('%')) &&
                      ((l =
                        0 === j ?
                          a.offsetWidth - R.width :
                          a.offsetHeight - R.height),
                      (h[j] = k ?
                        (parseFloat(q) / 100) * l + 'px' :
                        (parseFloat(q) / l) * 100 + '%'));
}
                q = h.join(' ');
              }
              return this.parseComplex(a.style, q, r, f, g);
            },
            formatter: ha,
          }),
          ya('backgroundSize', {
            defaultValue: '0 0',
            formatter: function(a) {
              return (
                (a += ''),
                'co' === a.substr(0, 2) ?
                  a :
                  ha(-1 === a.indexOf(' ') ? a + ' ' + a : a)
              );
            },
          }),
          ya('perspective', {defaultValue: '0px', prefix: !0}),
          ya('perspectiveOrigin', {defaultValue: '50% 50%', prefix: !0}),
          ya('transformStyle', {prefix: !0}),
          ya('backfaceVisibility', {prefix: !0}),
          ya('userSelect', {prefix: !0}),
          ya('margin', {
            parser: ra('marginTop,marginRight,marginBottom,marginLeft'),
          }),
          ya('padding', {
            parser: ra('paddingTop,paddingRight,paddingBottom,paddingLeft'),
          }),
          ya('clip', {
            defaultValue: 'rect(0px,0px,0px,0px)',
            parser: function(a, b, c, d, f, g) {
              let h; let i; let j;
              return (
                9 > p ?
                  ((i = a.currentStyle),
                    (j = 8 > p ? ' ' : ','),
                    (h =
                      'rect(' +
                      i.clipTop +
                      j +
                      i.clipRight +
                      j +
                      i.clipBottom +
                      j +
                      i.clipLeft +
                      ')'),
                    (b = this.format(b).split(',').join(j))) :
                  ((h = this.format(_(a, this.p, e, !1, this.dflt))),
                    (b = this.format(b))),
                this.parseComplex(a.style, h, b, f, g)
              );
            },
          }),
          ya('textShadow', {
            defaultValue: '0px 0px 0px #999',
            color: !0,
            multi: !0,
          }),
          ya('autoRound,strictUnits', {
            parser: function(a, b, c, d, e) {
              return e;
            },
          }),
          ya('border', {
            defaultValue: '0px solid #000',
            parser: function(a, b, c, d, f, g) {
              let h = _(a, 'borderTopWidth', e, !1, '0px');
                const i = this.format(b).split(' ');
                const j = i[0].replace(w, '');
              return (
                'px' !== j &&
                  (h = parseFloat(h) / aa(a, 'borderTopWidth', 1, j) + j),
                this.parseComplex(
                  a.style,
                  this.format(
                    h +
                      ' ' +
                      _(a, 'borderTopStyle', e, !1, 'solid') +
                      ' ' +
                      _(a, 'borderTopColor', e, !1, '#000'),
                  ),
                  i.join(' '),
                  f,
                  g,
                )
              );
            },
            color: !0,
            formatter: function(a) {
              const b = a.split(' ');
              return (
                b[0] +
                ' ' +
                (b[1] || 'solid') +
                ' ' +
                (a.match(pa) || ['#000'])[0]
              );
            },
          }),
          ya('borderWidth', {
            parser: ra(
              'borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth',
            ),
          }),
          ya('float,cssFloat,styleFloat', {
            parser: function(a, b, c, d, e, f) {
              const g = a.style;
                const h = 'cssFloat' in g ? 'cssFloat' : 'styleFloat';
              return new ta(g, h, 0, 0, e, -1, c, !1, 0, g[h], b);
            },
          });
        const Ua = function(a) {
          let b;
            const c = this.t;
            let d = c.filter || _(this.data, 'filter') || '';
            const e = (this.s + this.c * a) | 0;
          100 === e &&
            (-1 === d.indexOf('atrix(') &&
            -1 === d.indexOf('radient(') &&
            -1 === d.indexOf('oader(') ?
              (c.removeAttribute('filter'), (b = !_(this.data, 'filter'))) :
              ((c.filter = d.replace(z, '')), (b = !0))),
            b ||
              (this.xn1 && (c.filter = d = d || 'alpha(opacity=' + e + ')'),
              -1 === d.indexOf('pacity') ?
                (0 === e && this.xn1) ||
                  (c.filter = d + ' alpha(opacity=' + e + ')') :
                (c.filter = d.replace(x, 'opacity=' + e)));
        };
        ya('opacity,alpha,autoAlpha', {
          defaultValue: '1',
          parser: function(a, b, c, d, f, g) {
            let h = parseFloat(_(a, 'opacity', e, !1, '1'));
              const i = a.style;
              const j = 'autoAlpha' === c;
            return (
              'string' == typeof b &&
                '=' === b.charAt(1) &&
                (b =
                  ('-' === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + h),
              j &&
                1 === h &&
                'hidden' === _(a, 'visibility', e) &&
                0 !== b &&
                (h = 0),
              U ?
                (f = new ta(i, 'opacity', h, b - h, f)) :
                ((f = new ta(i, 'opacity', 100 * h, 100 * (b - h), f)),
                  (f.xn1 = j ? 1 : 0),
                  (i.zoom = 1),
                  (f.type = 2),
                  (f.b = 'alpha(opacity=' + f.s + ')'),
                  (f.e = 'alpha(opacity=' + (f.s + f.c) + ')'),
                  (f.data = a),
                  (f.plugin = g),
                  (f.setRatio = Ua)),
              j &&
                ((f = new ta(
                  i,
                  'visibility',
                  0,
                  0,
                  f,
                  -1,
                  null,
                  !1,
                  0,
                  0 !== h ? 'inherit' : 'hidden',
                  0 === b ? 'hidden' : 'inherit',
                )),
                (f.xs0 = 'inherit'),
                d._overwriteProps.push(f.n),
                d._overwriteProps.push(c)),
              f
            );
          },
        });
        var Va = function(a, b) {
            b &&
              (a.removeProperty ?
                (('ms' === b.substr(0, 2) || 'webkit' === b.substr(0, 6)) &&
                    (b = '-' + b),
                  a.removeProperty(b.replace(B, '-$1').toLowerCase())) :
                a.removeAttribute(b));
          };
          const Wa = function(a) {
            if (((this.t._gsClassPT = this), 1 === a || 0 === a)) {
              this.t.setAttribute('class', 0 === a ? this.b : this.e);
              for (let b = this.data, c = this.t.style; b; ) {
b.v ? (c[b.p] = b.v) : Va(c, b.p), (b = b._next);
}
              1 === a &&
                this.t._gsClassPT === this &&
                (this.t._gsClassPT = null);
            } else {
this.t.getAttribute('class') !== this.e &&
                this.t.setAttribute('class', this.e);
}
          };
        ya('className', {
          parser: function(a, b, d, f, g, h, i) {
            let j;
              let k;
              let l;
              let m;
              let n;
              const o = a.getAttribute('class') || '';
              const p = a.style.cssText;
            if (
              ((g = f._classNamePT = new ta(a, d, 0, 0, g, 2)),
              (g.setRatio = Wa),
              (g.pr = -11),
              (c = !0),
              (g.b = o),
              (k = ca(a, e)),
              (l = a._gsClassPT))
            ) {
              for (m = {}, n = l.data; n; ) (m[n.p] = 1), (n = n._next);
              l.setRatio(1);
            }
            return (
              (a._gsClassPT = g),
              (g.e =
                '=' !== b.charAt(1) ?
                  b :
                  o.replace(
                      new RegExp('(?:\\s|^)' + b.substr(2) + '(?![\\w-])'),
                      '',
                    ) + ('+' === b.charAt(0) ? ' ' + b.substr(2) : '')),
              a.setAttribute('class', g.e),
              (j = da(a, k, ca(a), i, m)),
              a.setAttribute('class', o),
              (g.data = j.firstMPT),
              (a.style.cssText = p),
              (g = g.xfirst = f.parse(a, j.difs, g, h))
            );
          },
        });
        const Xa = function(a) {
          if (
            (1 === a || 0 === a) &&
            this.data._totalTime === this.data._totalDuration &&
            'isFromStart' !== this.data.data
          ) {
            let b;
              let c;
              let d;
              let e;
              let f;
              const g = this.t.style;
              const h = i.transform.parse;
            if ('all' === this.e) (g.cssText = ''), (e = !0);
            else {
for (
                b = this.e.split(' ').join('').split(','), d = b.length;
                --d > -1;

              ) {
(c = b[d]),
                  i[c] &&
                    (i[c].parse === h ?
                      (e = !0) :
                      (c = 'transformOrigin' === c ? Ea : i[c].p)),
                  Va(g, c);
}
}
            e &&
              (Va(g, Ca),
              (f = this.t._gsTransform),
              f &&
                (f.svg &&
                  (this.t.removeAttribute('data-svg-origin'),
                  this.t.removeAttribute('transform')),
                delete this.t._gsTransform));
          }
        };
        for (
          ya('clearProps', {
            parser: function(a, b, d, e, f) {
              return (
                (f = new ta(a, d, 0, 0, f, 2)),
                (f.setRatio = Xa),
                (f.e = b),
                (f.pr = -10),
                (f.data = e._tween),
                (c = !0),
                f
              );
            },
          }),
            j = 'bezier,throwProps,physicsProps,physics2D'.split(','),
            wa = j.length;
          wa--;

        ) {
za(j[wa]);
}
        (j = g.prototype),
          (j._firstPT = j._lastParsedTransform = j._transform = null),
          (j._onInitTween = function(a, b, h, j) {
            if (!a.nodeType) return !1;
            (this._target = q = a),
              (this._tween = h),
              (this._vars = b),
              (r = j),
              (k = b.autoRound),
              (c = !1),
              (d = b.suffixMap || g.suffixMap),
              (e = $(a, '')),
              (f = this._overwriteProps);
            let n;
              let p;
              let s;
              let t;
              let u;
              let v;
              let w;
              let x;
              let z;
              const A = a.style;
            if (
              (l &&
                '' === A.zIndex &&
                ((n = _(a, 'zIndex', e)),
                ('auto' === n || '' === n) && this._addLazySet(A, 'zIndex', 0)),
              'string' == typeof b &&
                ((t = A.cssText),
                (n = ca(a, e)),
                (A.cssText = t + ';' + b),
                (n = da(a, n, ca(a)).difs),
                !U && y.test(b) && (n.opacity = parseFloat(RegExp.$1)),
                (b = n),
                (A.cssText = t)),
              b.className ?
                (this._firstPT = p = i.className.parse(
                    a,
                    b.className,
                    'className',
                    this,
                    null,
                    null,
                    b,
                  )) :
                (this._firstPT = p = this.parse(a, b, null)),
              this._transformType)
            ) {
              for (
                z = 3 === this._transformType,
                  Ca ?
                    m &&
                      ((l = !0),
                      '' === A.zIndex &&
                        ((w = _(a, 'zIndex', e)),
                        ('auto' === w || '' === w) &&
                          this._addLazySet(A, 'zIndex', 0)),
                      o &&
                        this._addLazySet(
                          A,
                          'WebkitBackfaceVisibility',
                          this._vars.WebkitBackfaceVisibility ||
                            (z ? 'visible' : 'hidden'),
                        )) :
                    (A.zoom = 1),
                  s = p;
                s && s._next;

              ) {
s = s._next;
}
              (x = new ta(a, 'transform', 0, 0, null, 2)),
                this._linkCSSP(x, null, s),
                (x.setRatio = Ca ? Ta : Sa),
                (x.data = this._transform || Ra(a, e, !0)),
                (x.tween = h),
                (x.pr = -1),
                f.pop();
            }
            if (c) {
              for (; p; ) {
                for (v = p._next, s = t; s && s.pr > p.pr; ) s = s._next;
                (p._prev = s ? s._prev : u) ? (p._prev._next = p) : (t = p),
                  (p._next = s) ? (s._prev = p) : (u = p),
                  (p = v);
              }
              this._firstPT = t;
            }
            return !0;
          }),
          (j.parse = function(a, b, c, f) {
            let g;
              let h;
              let j;
              let l;
              let m;
              let n;
              let o;
              let p;
              let s;
              let t;
              const u = a.style;
            for (g in b) {
              if (
                ((n = b[g]),
                'function' == typeof n && (n = n(r, q)),
                (h = i[g]))
              ) {
c = h.parse(a, n, g, this, c, f, b);
} else {
                if ('--' === g.substr(0, 2)) {
                  this._tween._propLookup[g] = this._addTween.call(
                    this._tween,
                    a.style,
                    'setProperty',
                    $(a).getPropertyValue(g) + '',
                    n + '',
                    g,
                    !1,
                    g,
                  );
                  continue;
                }
                (m = _(a, g, e) + ''),
                  (s = 'string' == typeof n),
                  'color' === g ||
                  'fill' === g ||
                  'stroke' === g ||
                  -1 !== g.indexOf('Color') ||
                  (s && A.test(n)) ?
                    (s ||
                        ((n = na(n)),
                        (n =
                          (n.length > 3 ? 'rgba(' : 'rgb(') +
                          n.join(',') +
                          ')')),
                      (c = va(u, g, m, n, !0, 'transparent', c, 0, f))) :
                    s && J.test(n) ?
                    (c = va(u, g, m, n, !0, null, c, 0, f)) :
                    ((j = parseFloat(m)),
                      (o = j || 0 === j ? m.substr((j + '').length) : ''),
                      ('' === m || 'auto' === m) &&
                        ('width' === g || 'height' === g ?
                          ((j = ga(a, g, e)), (o = 'px')) :
                          'left' === g || 'top' === g ?
                          ((j = ba(a, g, e)), (o = 'px')) :
                          ((j = 'opacity' !== g ? 0 : 1), (o = ''))),
                      (t = s && '=' === n.charAt(1)),
                      t ?
                        ((l = parseInt(n.charAt(0) + '1', 10)),
                          (n = n.substr(2)),
                          (l *= parseFloat(n)),
                          (p = n.replace(w, ''))) :
                        ((l = parseFloat(n)),
                          (p = s ? n.replace(w, '') : '')),
                      '' === p && (p = g in d ? d[g] : o),
                      (n = l || 0 === l ? (t ? l + j : l) + p : b[g]),
                      o !== p &&
                        ('' !== p || 'lineHeight' === g) &&
                        (l || 0 === l) &&
                        j &&
                        ((j = aa(a, g, j, o)),
                        '%' === p ?
                          ((j /= aa(a, g, 100, '%') / 100),
                            b.strictUnits !== !0 && (m = j + '%')) :
                          'em' === p ||
                            'rem' === p ||
                            'vw' === p ||
                            'vh' === p ?
                          (j /= aa(a, g, 1, p)) :
                          'px' !== p && ((l = aa(a, g, l, p)), (p = 'px')),
                        t && (l || 0 === l) && (n = l + j + p)),
                      t && (l += j),
                      (!j && 0 !== j) || (!l && 0 !== l) ?
                        void 0 !== u[g] &&
                          (n || (n + '' != 'NaN' && null != n)) ?
                          ((c = new ta(
                              u,
                              g,
                              l || j || 0,
                              0,
                              c,
                              -1,
                              g,
                              !1,
                              0,
                              m,
                              n,
                            )),
                            (c.xs0 =
                              'none' !== n ||
                              ('display' !== g && -1 === g.indexOf('Style')) ?
                                n :
                                m)) :
                          W('invalid ' + g + ' tween value: ' + b[g]) :
                        ((c = new ta(
                            u,
                            g,
                            j,
                            l - j,
                            c,
                            0,
                            g,
                            k !== !1 && ('px' === p || 'zIndex' === g),
                            0,
                            m,
                            n,
                          )),
                          (c.xs0 = p)));
              }
              f && c && !c.plugin && (c.plugin = f);
            }
            return c;
          }),
          (j.setRatio = function(a) {
            let b;
              let c;
              let d;
              let e = this._firstPT;
              const f = 1e-6;
            if (
              1 !== a ||
              (this._tween._time !== this._tween._duration &&
                0 !== this._tween._time)
            ) {
if (
                a ||
                (this._tween._time !== this._tween._duration &&
                  0 !== this._tween._time) ||
                this._tween._rawPrevTime === -1e-6
              ) {
for (; e; ) {
                  if (
                    ((b = e.c * a + e.s),
                    e.r ? (b = e.r(b)) : f > b && b > -f && (b = 0),
                    e.type)
                  ) {
if (1 === e.type) {
if (((d = e.l), 2 === d)) {
e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
} else if (3 === d) {
e.t[e.p] =
                          e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
} else if (4 === d) {
e.t[e.p] =
                          e.xs0 +
                          b +
                          e.xs1 +
                          e.xn1 +
                          e.xs2 +
                          e.xn2 +
                          e.xs3 +
                          e.xn3 +
                          e.xs4;
} else if (5 === d) {
e.t[e.p] =
                          e.xs0 +
                          b +
                          e.xs1 +
                          e.xn1 +
                          e.xs2 +
                          e.xn2 +
                          e.xs3 +
                          e.xn3 +
                          e.xs4 +
                          e.xn4 +
                          e.xs5;
} else {
                        for (c = e.xs0 + b + e.xs1, d = 1; d < e.l; d++) {
c += e['xn' + d] + e['xs' + (d + 1)];
}
                        e.t[e.p] = c;
                      }
} else {
-1 === e.type ?
                        (e.t[e.p] = e.xs0) :
                        e.setRatio && e.setRatio(a);
}
} else e.t[e.p] = b + e.xs0;
                  e = e._next;
                }
} else {
for (; e; ) {
2 !== e.type ? (e.t[e.p] = e.b) : e.setRatio(a),
                    (e = e._next);
}
}
} else {
for (; e; ) {
                if (2 !== e.type) {
if (e.r && -1 !== e.type) {
if (((b = e.r(e.s + e.c)), e.type)) {
                      if (1 === e.type) {
                        for (
                          d = e.l, c = e.xs0 + b + e.xs1, d = 1;
                          d < e.l;
                          d++
                        ) {
c += e['xn' + d] + e['xs' + (d + 1)];
}
                        e.t[e.p] = c;
                      }
                    } else e.t[e.p] = b + e.xs0;
} else e.t[e.p] = e.e;
} else e.setRatio(a);
                e = e._next;
              }
}
          }),
          (j._enableTransforms = function(a) {
            (this._transform = this._transform || Ra(this._target, e, !0)),
              (this._transformType =
                (this._transform.svg && Aa) || (!a && 3 !== this._transformType) ?
                  2 :
                  3);
          });
        const Ya = function(a) {
          (this.t[this.p] = this.e),
            this.data._linkCSSP(this, this._next, null, !0);
        };
        (j._addLazySet = function(a, b, c) {
          const d = (this._firstPT = new ta(a, b, 0, 0, this._firstPT, 2));
          (d.e = c), (d.setRatio = Ya), (d.data = this);
        }),
          (j._linkCSSP = function(a, b, c, d) {
            return (
              a &&
                (b && (b._prev = a),
                a._next && (a._next._prev = a._prev),
                a._prev ?
                  (a._prev._next = a._next) :
                  this._firstPT === a &&
                    ((this._firstPT = a._next), (d = !0)),
                c ?
                  (c._next = a) :
                  d || null !== this._firstPT || (this._firstPT = a),
                (a._next = b),
                (a._prev = c)),
              a
            );
          }),
          (j._mod = function(a) {
            for (let b = this._firstPT; b; ) {
'function' == typeof a[b.p] && (b.r = a[b.p]), (b = b._next);
}
          }),
          (j._kill = function(b) {
            let c;
              let d;
              let e;
              let f = b;
            if (b.autoAlpha || b.alpha) {
              f = {};
              for (d in b) f[d] = b[d];
              (f.opacity = 1), f.autoAlpha && (f.visibility = 1);
            }
            for (
              b.className &&
                (c = this._classNamePT) &&
                ((e = c.xfirst),
                e && e._prev ?
                  this._linkCSSP(e._prev, c._next, e._prev._prev) :
                  e === this._firstPT && (this._firstPT = c._next),
                c._next && this._linkCSSP(c._next, c._next._next, e._prev),
                (this._classNamePT = null)),
                c = this._firstPT;
              c;

            ) {
c.plugin &&
                c.plugin !== d &&
                c.plugin._kill &&
                (c.plugin._kill(b), (d = c.plugin)),
                (c = c._next);
}
            return a.prototype._kill.call(this, f);
          });
        var Za = function(a, b, c) {
          let d; let e; let f; let g;
          if (a.slice) for (e = a.length; --e > -1; ) Za(a[e], b, c);
          else {
for (d = a.childNodes, e = d.length; --e > -1; ) {
(f = d[e]),
                (g = f.type),
                f.style && (b.push(ca(f)), c && c.push(f)),
                (1 !== g && 9 !== g && 11 !== g) ||
                  !f.childNodes.length ||
                  Za(f, b, c);
}
}
        };
        return (
          (g.cascadeTo = function(a, c, d) {
            let e;
              let f;
              let g;
              let h;
              const i = b.to(a, c, d);
              const j = [i];
              const k = [];
              const l = [];
              const m = [];
              const n = b._internals.reservedProps;
            for (
              a = i._targets || i.target,
                Za(a, k, m),
                i.render(c, !0, !0),
                Za(a, l),
                i.render(0, !0, !0),
                i._enabled(!0),
                e = m.length;
              --e > -1;

            ) {
if (((f = da(m[e], k[e], l[e])), f.firstMPT)) {
                f = f.difs;
                for (g in d) n[g] && (f[g] = d[g]);
                h = {};
                for (g in f) h[g] = k[e][g];
                j.push(b.fromTo(m[e], c, h, f));
              }
}
            return j;
          }),
          a.activate([g]),
          g
        );
      },
      !0,
    ),
    (function() {
      const a = _gsScope._gsDefine.plugin({
          propName: 'roundProps',
          version: '1.7.0',
          priority: -1,
          API: 2,
          init: function(a, b, c) {
            return (this._tween = c), !0;
          },
        });
        const b = function(a) {
          const b = 1 > a ? Math.pow(10, (a + '').length - 2) : 1;
          return function(c) {
            return ((Math.round(c / a) * a * b) | 0) / b;
          };
        };
        const c = function(a, b) {
          for (; a; ) a.f || a.blob || (a.m = b || Math.round), (a = a._next);
        };
        const d = a.prototype;
      (d._onInitAllProps = function() {
        let a;
          let d;
          let e;
          let f;
          const g = this._tween;
          let h = g.vars.roundProps;
          const i = {};
          const j = g._propLookup.roundProps;
        if ('object' != typeof h || h.push) {
for (
            'string' == typeof h && (h = h.split(',')), e = h.length;
            --e > -1;

          ) {
i[h[e]] = Math.round;
}
} else for (f in h) i[f] = b(h[f]);
        for (f in i) {
for (a = g._firstPT; a; ) {
(d = a._next),
              a.pg ?
                a.t._mod(i) :
                a.n === f &&
                  (2 === a.f && a.t ?
                    c(a.t._firstPT, i[f]) :
                    (this._add(a.t, f, a.s, a.c, i[f]),
                      d && (d._prev = a._prev),
                      a._prev ?
                        (a._prev._next = d) :
                        g._firstPT === a && (g._firstPT = d),
                      (a._next = a._prev = null),
                      (g._propLookup[f] = j))),
              (a = d);
}
}
        return !1;
      }),
        (d._add = function(a, b, c, d, e) {
          this._addTween(a, b, c, c + d, b, e || Math.round),
            this._overwriteProps.push(b);
        });
    })(),
    (function() {
      _gsScope._gsDefine.plugin({
        propName: 'attr',
        API: 2,
        version: '0.6.1',
        init: function(a, b, c, d) {
          let e; let f;
          if ('function' != typeof a.setAttribute) return !1;
          for (e in b) {
(f = b[e]),
              'function' == typeof f && (f = f(d, a)),
              this._addTween(
                a,
                'setAttribute',
                a.getAttribute(e) + '',
                f + '',
                e,
                !1,
                e,
              ),
              this._overwriteProps.push(e);
}
          return !0;
        },
      });
    })(),
    (_gsScope._gsDefine.plugin({
      propName: 'directionalRotation',
      version: '0.3.1',
      API: 2,
      init: function(a, b, c, d) {
        'object' != typeof b && (b = {rotation: b}), (this.finals = {});
        let e;
          let f;
          let g;
          let h;
          let i;
          let j;
          const k = b.useRadians === !0 ? 2 * Math.PI : 360;
          const l = 1e-6;
        for (e in b) {
'useRadians' !== e &&
            ((h = b[e]),
            'function' == typeof h && (h = h(d, a)),
            (j = (h + '').split('_')),
            (f = j[0]),
            (g = parseFloat(
              'function' != typeof a[e] ?
                a[e] :
                a[
                    e.indexOf('set') ||
                    'function' != typeof a['get' + e.substr(3)] ?
                      e :
                      'get' + e.substr(3)
                  ](),
            )),
            (h = this.finals[e] =
              'string' == typeof f && '=' === f.charAt(1) ?
                g + parseInt(f.charAt(0) + '1', 10) * Number(f.substr(2)) :
                Number(f) || 0),
            (i = h - g),
            j.length &&
              ((f = j.join('_')),
              -1 !== f.indexOf('short') &&
                ((i %= k), i !== i % (k / 2) && (i = 0 > i ? i + k : i - k)),
              -1 !== f.indexOf('_cw') && 0 > i ?
                (i = ((i + 9999999999 * k) % k) - ((i / k) | 0) * k) :
                -1 !== f.indexOf('ccw') &&
                  i > 0 &&
                  (i = ((i - 9999999999 * k) % k) - ((i / k) | 0) * k)),
            (i > l || -l > i) &&
              (this._addTween(a, e, g, g + i, e),
              this._overwriteProps.push(e)));
}
        return !0;
      },
      set: function(a) {
        let b;
        if (1 !== a) this._super.setRatio.call(this, a);
        else {
for (b = this._firstPT; b; ) {
b.f ? b.t[b.p](this.finals[b.p]) : (b.t[b.p] = this.finals[b.p]),
              (b = b._next);
}
}
      },
    })._autoCSS = !0),
    _gsScope._gsDefine(
      'easing.Back',
      ['easing.Ease'],
      function(a) {
        let b;
          let c;
          let d;
          let e;
          const f = _gsScope.GreenSockGlobals || _gsScope;
          const g = f.com.greensock;
          const h = 2 * Math.PI;
          const i = Math.PI / 2;
          const j = g._class;
          const k = function(b, c) {
            const d = j('easing.' + b, function() {}, !0);
              const e = (d.prototype = new a());
            return (e.constructor = d), (e.getRatio = c), d;
          };
          const l = a.register || function() {};
          const m = function(a, b, c, d, e) {
            const f = j(
              'easing.' + a,
              {easeOut: new b(), easeIn: new c(), easeInOut: new d()},
              !0,
            );
            return l(f, a), f;
          };
          const n = function(a, b, c) {
            (this.t = a),
              (this.v = b),
              c &&
                ((this.next = c),
                (c.prev = this),
                (this.c = c.v - b),
                (this.gap = c.t - a));
          };
          const o = function(b, c) {
            const d = j(
                'easing.' + b,
                function(a) {
                  (this._p1 = a || 0 === a ? a : 1.70158),
                    (this._p2 = 1.525 * this._p1);
                },
                !0,
              );
              const e = (d.prototype = new a());
            return (
              (e.constructor = d),
              (e.getRatio = c),
              (e.config = function(a) {
                return new d(a);
              }),
              d
            );
          };
          const p = m(
            'Back',
            o('BackOut', function(a) {
              return (a -= 1) * a * ((this._p1 + 1) * a + this._p1) + 1;
            }),
            o('BackIn', function(a) {
              return a * a * ((this._p1 + 1) * a - this._p1);
            }),
            o('BackInOut', function(a) {
              return (a *= 2) < 1 ?
                0.5 * a * a * ((this._p2 + 1) * a - this._p2) :
                0.5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2);
            }),
          );
          const q = j(
            'easing.SlowMo',
            function(a, b, c) {
              (b = b || 0 === b ? b : 0.7),
                null == a ? (a = 0.7) : a > 1 && (a = 1),
                (this._p = 1 !== a ? b : 0),
                (this._p1 = (1 - a) / 2),
                (this._p2 = a),
                (this._p3 = this._p1 + this._p2),
                (this._calcEnd = c === !0);
            },
            !0,
          );
          let r = (q.prototype = new a());
        return (
          (r.constructor = q),
          (r.getRatio = function(a) {
            const b = a + (0.5 - a) * this._p;
            return a < this._p1 ?
              this._calcEnd ?
                1 - (a = 1 - a / this._p1) * a :
                b - (a = 1 - a / this._p1) * a * a * a * b :
              a > this._p3 ?
              this._calcEnd ?
                1 === a ?
                  0 :
                  1 - (a = (a - this._p3) / this._p1) * a :
                b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a :
              this._calcEnd ?
              1 :
              b;
          }),
          (q.ease = new q(0.7, 0.7)),
          (r.config = q.config = function(a, b, c) {
            return new q(a, b, c);
          }),
          (b = j(
            'easing.SteppedEase',
            function(a, b) {
              (a = a || 1),
                (this._p1 = 1 / a),
                (this._p2 = a + (b ? 0 : 1)),
                (this._p3 = b ? 1 : 0);
            },
            !0,
          )),
          (r = b.prototype = new a()),
          (r.constructor = b),
          (r.getRatio = function(a) {
            return (
              0 > a ? (a = 0) : a >= 1 && (a = 0.999999999),
              (((this._p2 * a) | 0) + this._p3) * this._p1
            );
          }),
          (r.config = b.config = function(a, c) {
            return new b(a, c);
          }),
          (c = j(
            'easing.ExpoScaleEase',
            function(a, b, c) {
              (this._p1 = Math.log(b / a)),
                (this._p2 = b - a),
                (this._p3 = a),
                (this._ease = c);
            },
            !0,
          )),
          (r = c.prototype = new a()),
          (r.constructor = c),
          (r.getRatio = function(a) {
            return (
              this._ease && (a = this._ease.getRatio(a)),
              (this._p3 * Math.exp(this._p1 * a) - this._p3) / this._p2
            );
          }),
          (r.config = c.config = function(a, b, d) {
            return new c(a, b, d);
          }),
          (d = j(
            'easing.RoughEase',
            function(b) {
              b = b || {};
              for (
                var c,
                  d,
                  e,
                  f,
                  g,
                  h,
                  i = b.taper || 'none',
                  j = [],
                  k = 0,
                  l = 0 | (b.points || 20),
                  m = l,
                  o = b.randomize !== !1,
                  p = b.clamp === !0,
                  q = b.template instanceof a ? b.template : null,
                  r = 'number' == typeof b.strength ? 0.4 * b.strength : 0.4;
                --m > -1;

              ) {
(c = o ? Math.random() : (1 / l) * m),
                  (d = q ? q.getRatio(c) : c),
                  'none' === i ?
                    (e = r) :
                    'out' === i ?
                    ((f = 1 - c), (e = f * f * r)) :
                    'in' === i ?
                    (e = c * c * r) :
                    0.5 > c ?
                    ((f = 2 * c), (e = f * f * 0.5 * r)) :
                    ((f = 2 * (1 - c)), (e = f * f * 0.5 * r)),
                  o ?
                    (d += Math.random() * e - 0.5 * e) :
                    m % 2 ?
                    (d += 0.5 * e) :
                    (d -= 0.5 * e),
                  p && (d > 1 ? (d = 1) : 0 > d && (d = 0)),
                  (j[k++] = {x: c, y: d});
}
              for (
                j.sort(function(a, b) {
                  return a.x - b.x;
                }),
                  h = new n(1, 1, null),
                  m = l;
                --m > -1;

              ) {
(g = j[m]), (h = new n(g.x, g.y, h));
}
              this._prev = new n(0, 0, 0 !== h.t ? h : h.next);
            },
            !0,
          )),
          (r = d.prototype = new a()),
          (r.constructor = d),
          (r.getRatio = function(a) {
            let b = this._prev;
            if (a > b.t) {
              for (; b.next && a >= b.t; ) b = b.next;
              b = b.prev;
            } else for (; b.prev && a <= b.t; ) b = b.prev;
            return (this._prev = b), b.v + ((a - b.t) / b.gap) * b.c;
          }),
          (r.config = function(a) {
            return new d(a);
          }),
          (d.ease = new d()),
          m(
            'Bounce',
            k('BounceOut', function(a) {
              return 1 / 2.75 > a ?
                7.5625 * a * a :
                2 / 2.75 > a ?
                7.5625 * (a -= 1.5 / 2.75) * a + 0.75 :
                2.5 / 2.75 > a ?
                7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 :
                7.5625 * (a -= 2.625 / 2.75) * a + 0.984375;
            }),
            k('BounceIn', function(a) {
              return (a = 1 - a) < 1 / 2.75 ?
                1 - 7.5625 * a * a :
                2 / 2.75 > a ?
                1 - (7.5625 * (a -= 1.5 / 2.75) * a + 0.75) :
                2.5 / 2.75 > a ?
                1 - (7.5625 * (a -= 2.25 / 2.75) * a + 0.9375) :
                1 - (7.5625 * (a -= 2.625 / 2.75) * a + 0.984375);
            }),
            k('BounceInOut', function(a) {
              const b = 0.5 > a;
              return (
                (a = b ? 1 - 2 * a : 2 * a - 1),
                (a =
                  1 / 2.75 > a ?
                    7.5625 * a * a :
                    2 / 2.75 > a ?
                    7.5625 * (a -= 1.5 / 2.75) * a + 0.75 :
                    2.5 / 2.75 > a ?
                    7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 :
                    7.5625 * (a -= 2.625 / 2.75) * a + 0.984375),
                b ? 0.5 * (1 - a) : 0.5 * a + 0.5
              );
            }),
          ),
          m(
            'Circ',
            k('CircOut', function(a) {
              return Math.sqrt(1 - (a -= 1) * a);
            }),
            k('CircIn', function(a) {
              return -(Math.sqrt(1 - a * a) - 1);
            }),
            k('CircInOut', function(a) {
              return (a *= 2) < 1 ?
                -0.5 * (Math.sqrt(1 - a * a) - 1) :
                0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1);
            }),
          ),
          (e = function(b, c, d) {
            const e = j(
                'easing.' + b,
                function(a, b) {
                  (this._p1 = a >= 1 ? a : 1),
                    (this._p2 = (b || d) / (1 > a ? a : 1)),
                    (this._p3 =
                      (this._p2 / h) * (Math.asin(1 / this._p1) || 0)),
                    (this._p2 = h / this._p2);
                },
                !0,
              );
              const f = (e.prototype = new a());
            return (
              (f.constructor = e),
              (f.getRatio = c),
              (f.config = function(a, b) {
                return new e(a, b);
              }),
              e
            );
          }),
          m(
            'Elastic',
            e(
              'ElasticOut',
              function(a) {
                return (
                  this._p1 *
                    Math.pow(2, -10 * a) *
                    Math.sin((a - this._p3) * this._p2) +
                  1
                );
              },
              0.3,
            ),
            e(
              'ElasticIn',
              function(a) {
                return -(
                  this._p1 *
                  Math.pow(2, 10 * (a -= 1)) *
                  Math.sin((a - this._p3) * this._p2)
                );
              },
              0.3,
            ),
            e(
              'ElasticInOut',
              function(a) {
                return (a *= 2) < 1 ?
                  -0.5 *
                      (this._p1 *
                        Math.pow(2, 10 * (a -= 1)) *
                        Math.sin((a - this._p3) * this._p2)) :
                  this._p1 *
                      Math.pow(2, -10 * (a -= 1)) *
                      Math.sin((a - this._p3) * this._p2) *
                      0.5 +
                      1;
              },
              0.45,
            ),
          ),
          m(
            'Expo',
            k('ExpoOut', function(a) {
              return 1 - Math.pow(2, -10 * a);
            }),
            k('ExpoIn', function(a) {
              return Math.pow(2, 10 * (a - 1)) - 0.001;
            }),
            k('ExpoInOut', function(a) {
              return (a *= 2) < 1 ?
                0.5 * Math.pow(2, 10 * (a - 1)) :
                0.5 * (2 - Math.pow(2, -10 * (a - 1)));
            }),
          ),
          m(
            'Sine',
            k('SineOut', function(a) {
              return Math.sin(a * i);
            }),
            k('SineIn', function(a) {
              return -Math.cos(a * i) + 1;
            }),
            k('SineInOut', function(a) {
              return -0.5 * (Math.cos(Math.PI * a) - 1);
            }),
          ),
          j(
            'easing.EaseLookup',
            {
              find: function(b) {
                return a.map[b];
              },
            },
            !0,
          ),
          l(f.SlowMo, 'SlowMo', 'ease,'),
          l(d, 'RoughEase', 'ease,'),
          l(b, 'SteppedEase', 'ease,'),
          p
        );
      },
      !0,
    );
}),
  _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
  (function(a, b) {
    'use strict';
    const c = {};
      let d = a.document;
      const e = (a.GreenSockGlobals = a.GreenSockGlobals || a);
      const f = e[b];
    if (f) {
return (
        'undefined' != typeof module && module.exports && (module.exports = f),
        f
      );
}
    let g;
      let h;
      let i;
      let j;
      let k;
      const l = function(a) {
        let b;
          const c = a.split('.');
          let d = e;
        for (b = 0; b < c.length; b++) d[c[b]] = d = d[c[b]] || {};
        return d;
      };
      const m = l('com.greensock');
      const n = 1e-10;
      const o = function(a) {
        let b;
          const c = [];
          const d = a.length;
        for (b = 0; b !== d; c.push(a[b++]));
        return c;
      };
      const p = function() {};
      const q = (function() {
        const a = Object.prototype.toString;
          const b = a.call([]);
        return function(c) {
          return (
            null != c &&
            (c instanceof Array ||
              ('object' == typeof c && !!c.push && a.call(c) === b))
          );
        };
      })();
      const r = {};
      var s = function(d, f, g, h) {
        (this.sc = r[d] ? r[d].sc : []),
          (r[d] = this),
          (this.gsClass = null),
          (this.func = g);
        const i = [];
        (this.check = function(j) {
          for (var k, m, n, o, p = f.length, q = p; --p > -1; ) {
(k = r[f[p]] || new s(f[p], [])).gsClass ?
              ((i[p] = k.gsClass), q--) :
              j && k.sc.push(this);
}
          if (0 === q && g) {
            if (
              ((m = ('com.greensock.' + d).split('.')),
              (n = m.pop()),
              (o = l(m.join('.'))[n] = this.gsClass = g.apply(g, i)),
              h)
            ) {
if (
                ((e[n] = c[n] = o),
                'undefined' != typeof module && module.exports)
              ) {
if (d === b) {
                  module.exports = c[b] = o;
                  for (p in c) o[p] = c[p];
                } else c[b] && (c[b][n] = o);
} else {
'function' == typeof define &&
                  define.amd &&
                  define((a.GreenSockAMDPath ? a.GreenSockAMDPath + '/' : '') +
                    d.split('.').pop(), [], function() {
                    return o;
                  });
}
}
            for (p = 0; p < this.sc.length; p++) this.sc[p].check();
          }
        }),
          this.check(!0);
      };
      const t = (a._gsDefine = function(a, b, c, d) {
        return new s(a, b, c, d);
      });
      const u = (m._class = function(a, b, c) {
        return (
          (b = b || function() {}),
          t(
            a,
            [],
            function() {
              return b;
            },
            c,
          ),
          b
        );
      });
    t.globals = e;
    const v = [0, 0, 1, 1];
      const w = u(
        'easing.Ease',
        function(a, b, c, d) {
          (this._func = a),
            (this._type = c || 0),
            (this._power = d || 0),
            (this._params = b ? v.concat(b) : v);
        },
        !0,
      );
      const x = (w.map = {});
      const y = (w.register = function(a, b, c, d) {
        for (
          var e,
            f,
            g,
            h,
            i = b.split(','),
            j = i.length,
            k = (c || 'easeIn,easeOut,easeInOut').split(',');
          --j > -1;

        ) {
for (
            f = i[j],
              e = d ? u('easing.' + f, null, !0) : m.easing[f] || {},
              g = k.length;
            --g > -1;

          ) {
(h = k[g]),
              (x[f + '.' + h] = x[h + f] = e[h] = a.getRatio ?
                a :
                a[h] || new a());
}
}
      });
    for (
      i = w.prototype,
        i._calcEnd = !1,
        i.getRatio = function(a) {
          if (this._func) {
return (this._params[0] = a), this._func.apply(null, this._params);
}
          const b = this._type;
            const c = this._power;
            let d = 1 === b ? 1 - a : 2 === b ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
          return (
            1 === c ?
              (d *= d) :
              2 === c ?
              (d *= d * d) :
              3 === c ?
              (d *= d * d * d) :
              4 === c && (d *= d * d * d * d),
            1 === b ? 1 - d : 2 === b ? d : 0.5 > a ? d / 2 : 1 - d / 2
          );
        },
        g = ['Linear', 'Quad', 'Cubic', 'Quart', 'Quint,Strong'],
        h = g.length;
      --h > -1;

    ) {
(i = g[h] + ',Power' + h),
        y(new w(null, null, 1, h), i, 'easeOut', !0),
        y(new w(null, null, 2, h), i, 'easeIn' + (0 === h ? ',easeNone' : '')),
        y(new w(null, null, 3, h), i, 'easeInOut');
}
    (x.linear = m.easing.Linear.easeIn), (x.swing = m.easing.Quad.easeInOut);
    const z = u('events.EventDispatcher', function(a) {
      (this._listeners = {}), (this._eventTarget = a || this);
    });
    (i = z.prototype),
      (i.addEventListener = function(a, b, c, d, e) {
        e = e || 0;
        let f;
          let g;
          let h = this._listeners[a];
          let i = 0;
        for (
          this !== j || k || j.wake(),
            null == h && (this._listeners[a] = h = []),
            g = h.length;
          --g > -1;

        ) {
(f = h[g]),
            f.c === b && f.s === c ?
              h.splice(g, 1) :
              0 === i && f.pr < e && (i = g + 1);
}
        h.splice(i, 0, {c: b, s: c, up: d, pr: e});
      }),
      (i.removeEventListener = function(a, b) {
        let c;
          const d = this._listeners[a];
        if (d) {
for (c = d.length; --c > -1; ) {
if (d[c].c === b) return void d.splice(c, 1);
}
}
      }),
      (i.dispatchEvent = function(a) {
        let b;
          let c;
          let d;
          let e = this._listeners[a];
        if (e) {
for (
            b = e.length, b > 1 && (e = e.slice(0)), c = this._eventTarget;
            --b > -1;

          ) {
(d = e[b]),
              d &&
                (d.up ?
                  d.c.call(d.s || c, {type: a, target: c}) :
                  d.c.call(d.s || c));
}
}
      });
    let A = a.requestAnimationFrame;
      let B = a.cancelAnimationFrame;
      const C =
        Date.now ||
        function() {
          return new Date().getTime();
        };
      let D = C();
    for (g = ['ms', 'moz', 'webkit', 'o'], h = g.length; --h > -1 && !A; ) {
(A = a[g[h] + 'RequestAnimationFrame']),
        (B =
          a[g[h] + 'CancelAnimationFrame'] ||
          a[g[h] + 'CancelRequestAnimationFrame']);
}
    u('Ticker', function(a, b) {
      let c;
        let e;
        let f;
        let g;
        let h;
        const i = this;
        let l = C();
        let m = b !== !1 && A ? 'auto' : !1;
        let o = 500;
        let q = 33;
        const r = 'tick';
        var s = function(a) {
          let b;
            let d;
            const j = C() - D;
          j > o && (l += j - q),
            (D += j),
            (i.time = (D - l) / 1e3),
            (b = i.time - h),
            (!c || b > 0 || a === !0) &&
              (i.frame++, (h += b + (b >= g ? 0.004 : g - b)), (d = !0)),
            a !== !0 && (f = e(s)),
            d && i.dispatchEvent(r);
        };
      z.call(i),
        (i.time = i.frame = 0),
        (i.tick = function() {
          s(!0);
        }),
        (i.lagSmoothing = function(a, b) {
          return arguments.length ?
            ((o = a || 1 / n), void (q = Math.min(b, o, 0))) :
            1 / n > o;
        }),
        (i.sleep = function() {
          null != f &&
            (m && B ? B(f) : clearTimeout(f),
            (e = p),
            (f = null),
            i === j && (k = !1));
        }),
        (i.wake = function(a) {
          null !== f ?
            i.sleep() :
            a ?
            (l += -D + (D = C())) :
            i.frame > 10 && (D = C() - o + 5),
            (e =
              0 === c ?
                p :
                m && A ?
                A :
                function(a) {
                    return setTimeout(a, (1e3 * (h - i.time) + 1) | 0);
                  }),
            i === j && (k = !0),
            s(2);
        }),
        (i.fps = function(a) {
          return arguments.length ?
            ((c = a), (g = 1 / (c || 60)), (h = this.time + g), void i.wake()) :
            c;
        }),
        (i.useRAF = function(a) {
          return arguments.length ? (i.sleep(), (m = a), void i.fps(c)) : m;
        }),
        i.fps(a),
        setTimeout(function() {
          'auto' === m &&
            i.frame < 5 &&
            'hidden' !== (d || {}).visibilityState &&
            i.useRAF(!1);
        }, 1500);
    }),
      (i = m.Ticker.prototype = new m.events.EventDispatcher()),
      (i.constructor = m.Ticker);
    const E = u('core.Animation', function(a, b) {
      if (
        ((this.vars = b = b || {}),
        (this._duration = this._totalDuration = a || 0),
        (this._delay = Number(b.delay) || 0),
        (this._timeScale = 1),
        (this._active = b.immediateRender === !0),
        (this.data = b.data),
        (this._reversed = b.reversed === !0),
        Y)
      ) {
        k || j.wake();
        const c = this.vars.useFrames ? X : Y;
        c.add(this, c._time), this.vars.paused && this.paused(!0);
      }
    });
    (j = E.ticker = new m.Ticker()),
      (i = E.prototype),
      (i._dirty = i._gc = i._initted = i._paused = !1),
      (i._totalTime = i._time = 0),
      (i._rawPrevTime = -1),
      (i._next = i._last = i._onUpdate = i._timeline = i.timeline = null),
      (i._paused = !1);
    var F = function() {
      k &&
        C() - D > 2e3 &&
        ('hidden' !== (d || {}).visibilityState || !j.lagSmoothing()) &&
        j.wake();
      const a = setTimeout(F, 2e3);
      a.unref && a.unref();
    };
    F(),
      (i.play = function(a, b) {
        return null != a && this.seek(a, b), this.reversed(!1).paused(!1);
      }),
      (i.pause = function(a, b) {
        return null != a && this.seek(a, b), this.paused(!0);
      }),
      (i.resume = function(a, b) {
        return null != a && this.seek(a, b), this.paused(!1);
      }),
      (i.seek = function(a, b) {
        return this.totalTime(Number(a), b !== !1);
      }),
      (i.restart = function(a, b) {
        return this.reversed(!1)
          .paused(!1)
          .totalTime(a ? -this._delay : 0, b !== !1, !0);
      }),
      (i.reverse = function(a, b) {
        return (
          null != a && this.seek(a || this.totalDuration(), b),
          this.reversed(!0).paused(!1)
        );
      }),
      (i.render = function(a, b, c) {}),
      (i.invalidate = function() {
        return (
          (this._time = this._totalTime = 0),
          (this._initted = this._gc = !1),
          (this._rawPrevTime = -1),
          (this._gc || !this.timeline) && this._enabled(!0),
          this
        );
      }),
      (i.isActive = function() {
        let a;
          const b = this._timeline;
          const c = this._startTime;
        return (
          !b ||
          (!this._gc &&
            !this._paused &&
            b.isActive() &&
            (a = b.rawTime(!0)) >= c &&
            a < c + this.totalDuration() / this._timeScale - 1e-7)
        );
      }),
      (i._enabled = function(a, b) {
        return (
          k || j.wake(),
          (this._gc = !a),
          (this._active = this.isActive()),
          b !== !0 &&
            (a && !this.timeline ?
              this._timeline.add(this, this._startTime - this._delay) :
              !a && this.timeline && this._timeline._remove(this, !0)),
          !1
        );
      }),
      (i._kill = function(a, b) {
        return this._enabled(!1, !1);
      }),
      (i.kill = function(a, b) {
        return this._kill(a, b), this;
      }),
      (i._uncache = function(a) {
        for (let b = a ? this : this.timeline; b; ) {
(b._dirty = !0), (b = b.timeline);
}
        return this;
      }),
      (i._swapSelfInParams = function(a) {
        for (var b = a.length, c = a.concat(); --b > -1; ) {
'{self}' === a[b] && (c[b] = this);
}
        return c;
      }),
      (i._callback = function(a) {
        const b = this.vars;
          const c = b[a];
          const d = b[a + 'Params'];
          const e = b[a + 'Scope'] || b.callbackScope || this;
          const f = d ? d.length : 0;
        switch (f) {
          case 0:
            c.call(e);
            break;
          case 1:
            c.call(e, d[0]);
            break;
          case 2:
            c.call(e, d[0], d[1]);
            break;
          default:
            c.apply(e, d);
        }
      }),
      (i.eventCallback = function(a, b, c, d) {
        if ('on' === (a || '').substr(0, 2)) {
          const e = this.vars;
          if (1 === arguments.length) return e[a];
          null == b ?
            delete e[a] :
            ((e[a] = b),
              (e[a + 'Params'] =
                q(c) && -1 !== c.join('').indexOf('{self}') ?
                  this._swapSelfInParams(c) :
                  c),
              (e[a + 'Scope'] = d)),
            'onUpdate' === a && (this._onUpdate = b);
        }
        return this;
      }),
      (i.delay = function(a) {
        return arguments.length ?
          (this._timeline.smoothChildTiming &&
              this.startTime(this._startTime + a - this._delay),
            (this._delay = a),
            this) :
          this._delay;
      }),
      (i.duration = function(a) {
        return arguments.length ?
          ((this._duration = this._totalDuration = a),
            this._uncache(!0),
            this._timeline.smoothChildTiming &&
              this._time > 0 &&
              this._time < this._duration &&
              0 !== a &&
              this.totalTime(this._totalTime * (a / this._duration), !0),
            this) :
          ((this._dirty = !1), this._duration);
      }),
      (i.totalDuration = function(a) {
        return (
          (this._dirty = !1),
          arguments.length ? this.duration(a) : this._totalDuration
        );
      }),
      (i.time = function(a, b) {
        return arguments.length ?
          (this._dirty && this.totalDuration(),
            this.totalTime(a > this._duration ? this._duration : a, b)) :
          this._time;
      }),
      (i.totalTime = function(a, b, c) {
        if ((k || j.wake(), !arguments.length)) return this._totalTime;
        if (this._timeline) {
          if (
            (0 > a && !c && (a += this.totalDuration()),
            this._timeline.smoothChildTiming)
          ) {
            this._dirty && this.totalDuration();
            const d = this._totalDuration;
              let e = this._timeline;
            if (
              (a > d && !c && (a = d),
              (this._startTime =
                (this._paused ? this._pauseTime : e._time) -
                (this._reversed ? d - a : a) / this._timeScale),
              e._dirty || this._uncache(!1),
              e._timeline)
            ) {
for (; e._timeline; ) {
e._timeline._time !==
                  (e._startTime + e._totalTime) / e._timeScale &&
                  e.totalTime(e._totalTime, !0),
                  (e = e._timeline);
}
}
          }
          this._gc && this._enabled(!0, !1),
            (this._totalTime !== a || 0 === this._duration) &&
              (K.length && $(), this.render(a, b, !1), K.length && $());
        }
        return this;
      }),
      (i.progress = i.totalProgress = function(a, b) {
        const c = this.duration();
        return arguments.length ?
          this.totalTime(c * a, b) :
          c ?
          this._time / c :
          this.ratio;
      }),
      (i.startTime = function(a) {
        return arguments.length ?
          (a !== this._startTime &&
              ((this._startTime = a),
              this.timeline &&
                this.timeline._sortChildren &&
                this.timeline.add(this, a - this._delay)),
            this) :
          this._startTime;
      }),
      (i.endTime = function(a) {
        return (
          this._startTime +
          (0 != a ? this.totalDuration() : this.duration()) / this._timeScale
        );
      }),
      (i.timeScale = function(a) {
        if (!arguments.length) return this._timeScale;
        let b; let c;
        for (
          a = a || n,
            this._timeline &&
              this._timeline.smoothChildTiming &&
              ((b = this._pauseTime),
              (c = b || 0 === b ? b : this._timeline.totalTime()),
              (this._startTime =
                c - ((c - this._startTime) * this._timeScale) / a)),
            this._timeScale = a,
            c = this.timeline;
          c && c.timeline;

        ) {
(c._dirty = !0), c.totalDuration(), (c = c.timeline);
}
        return this;
      }),
      (i.reversed = function(a) {
        return arguments.length ?
          (a != this._reversed &&
              ((this._reversed = a),
              this.totalTime(
                this._timeline && !this._timeline.smoothChildTiming ?
                  this.totalDuration() - this._totalTime :
                  this._totalTime,
                !0,
              )),
            this) :
          this._reversed;
      }),
      (i.paused = function(a) {
        if (!arguments.length) return this._paused;
        let b;
          let c;
          const d = this._timeline;
        return (
          a != this._paused &&
            d &&
            (k || a || j.wake(),
            (b = d.rawTime()),
            (c = b - this._pauseTime),
            !a &&
              d.smoothChildTiming &&
              ((this._startTime += c), this._uncache(!1)),
            (this._pauseTime = a ? b : null),
            (this._paused = a),
            (this._active = this.isActive()),
            !a &&
              0 !== c &&
              this._initted &&
              this.duration() &&
              ((b = d.smoothChildTiming ?
                this._totalTime :
                (b - this._startTime) / this._timeScale),
              this.render(b, b === this._totalTime, !0))),
          this._gc && !a && this._enabled(!0, !1),
          this
        );
      });
    const G = u('core.SimpleTimeline', function(a) {
      E.call(this, 0, a),
        (this.autoRemoveChildren = this.smoothChildTiming = !0);
    });
    (i = G.prototype = new E()),
      (i.constructor = G),
      (i.kill()._gc = !1),
      (i._first = i._last = i._recent = null),
      (i._sortChildren = !1),
      (i.add = i.insert = function(a, b, c, d) {
        let e; let f;
        if (
          ((a._startTime = Number(b || 0) + a._delay),
          a._paused &&
            this !== a._timeline &&
            (a._pauseTime =
              this.rawTime() - (a._timeline.rawTime() - a._pauseTime)),
          a.timeline && a.timeline._remove(a, !0),
          (a.timeline = a._timeline = this),
          a._gc && a._enabled(!0, !0),
          (e = this._last),
          this._sortChildren)
        ) {
for (f = a._startTime; e && e._startTime > f; ) e = e._prev;
}
        return (
          e ?
            ((a._next = e._next), (e._next = a)) :
            ((a._next = this._first), (this._first = a)),
          a._next ? (a._next._prev = a) : (this._last = a),
          (a._prev = e),
          (this._recent = a),
          this._timeline && this._uncache(!0),
          this
        );
      }),
      (i._remove = function(a, b) {
        return (
          a.timeline === this &&
            (b || a._enabled(!1, !0),
            a._prev ?
              (a._prev._next = a._next) :
              this._first === a && (this._first = a._next),
            a._next ?
              (a._next._prev = a._prev) :
              this._last === a && (this._last = a._prev),
            (a._next = a._prev = a.timeline = null),
            a === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
          this
        );
      }),
      (i.render = function(a, b, c) {
        let d;
          let e = this._first;
        for (this._totalTime = this._time = this._rawPrevTime = a; e; ) {
(d = e._next),
            (e._active || (a >= e._startTime && !e._paused && !e._gc)) &&
              (e._reversed ?
                e.render(
                    (e._dirty ? e.totalDuration() : e._totalDuration) -
                      (a - e._startTime) * e._timeScale,
                    b,
                    c,
                  ) :
                e.render((a - e._startTime) * e._timeScale, b, c)),
            (e = d);
}
      }),
      (i.rawTime = function() {
        return k || j.wake(), this._totalTime;
      });
    var H = u(
        'TweenLite',
        function(b, c, d) {
          if (
            (E.call(this, c, d), (this.render = H.prototype.render), null == b)
          ) {
throw 'Cannot tween a null target.';
}
          this.target = b = 'string' != typeof b ? b : H.selector(b) || b;
          let e;
            let f;
            let g;
            const h =
              b.jquery ||
              (b.length &&
                b !== a &&
                b[0] &&
                (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType)));
            let i = this.vars.overwrite;
          if (
            ((this._overwrite = i =
              null == i ?
                W[H.defaultOverwrite] :
                'number' == typeof i ?
                i >> 0 :
                W[i]),
            (h || b instanceof Array || (b.push && q(b))) &&
              'number' != typeof b[0])
          ) {
for (
              this._targets = g = o(b),
                this._propLookup = [],
                this._siblings = [],
                e = 0;
              e < g.length;
              e++
            ) {
(f = g[e]),
                f ?
                  'string' != typeof f ?
                    f.length &&
                      f !== a &&
                      f[0] &&
                      (f[0] === a ||
                        (f[0].nodeType && f[0].style && !f.nodeType)) ?
                      (g.splice(e--, 1), (this._targets = g = g.concat(o(f)))) :
                      ((this._siblings[e] = _(f, this, !1)),
                        1 === i &&
                          this._siblings[e].length > 1 &&
                          ba(f, this, null, 1, this._siblings[e])) :
                    ((f = g[e--] = H.selector(f)),
                      'string' == typeof f && g.splice(e + 1, 1)) :
                  g.splice(e--, 1);
}
} else {
(this._propLookup = {}),
              (this._siblings = _(b, this, !1)),
              1 === i &&
                this._siblings.length > 1 &&
                ba(b, this, null, 1, this._siblings);
}
          (this.vars.immediateRender ||
            (0 === c &&
              0 === this._delay &&
              this.vars.immediateRender !== !1)) &&
            ((this._time = -n), this.render(Math.min(0, -this._delay)));
        },
        !0,
      );
      const I = function(b) {
        return (
          b &&
          b.length &&
          b !== a &&
          b[0] &&
          (b[0] === a || (b[0].nodeType && b[0].style && !b.nodeType))
        );
      };
      const J = function(a, b) {
        let c;
          const d = {};
        for (c in a) {
V[c] ||
            (c in b &&
              'transform' !== c &&
              'x' !== c &&
              'y' !== c &&
              'width' !== c &&
              'height' !== c &&
              'className' !== c &&
              'border' !== c) ||
            !(!S[c] || (S[c] && S[c]._autoCSS)) ||
            ((d[c] = a[c]), delete a[c]);
}
        a.css = d;
      };
    (i = H.prototype = new E()),
      (i.constructor = H),
      (i.kill()._gc = !1),
      (i.ratio = 0),
      (i._firstPT = i._targets = i._overwrittenProps = i._startAt = null),
      (i._notifyPluginsOfEnabled = i._lazy = !1),
      (H.version = '2.0.2'),
      (H.defaultEase = i._ease = new w(null, null, 1, 1)),
      (H.defaultOverwrite = 'auto'),
      (H.ticker = j),
      (H.autoSleep = 120),
      (H.lagSmoothing = function(a, b) {
        j.lagSmoothing(a, b);
      }),
      (H.selector =
        a.$ ||
        a.jQuery ||
        function(b) {
          const c = a.$ || a.jQuery;
          return c ?
            ((H.selector = c), c(b)) :
            (d || (d = a.document),
              d ?
                d.querySelectorAll ?
                  d.querySelectorAll(b) :
                  d.getElementById('#' === b.charAt(0) ? b.substr(1) : b) :
                b);
        });
    var K = [];
      let L = {};
      const M = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi;
      const N = /[\+-]=-?[\.\d]/;
      const O = function(a) {
        for (var b, c = this._firstPT, d = 1e-6; c; ) {
(b = c.blob ?
            1 === a && null != this.end ?
              this.end :
              a ?
              this.join('') :
              this.start :
            c.c * a + c.s),
            c.m ?
              (b = c.m.call(this._tween, b, this._target || c.t, this._tween)) :
              d > b && b > -d && !c.blob && (b = 0),
            c.f ? (c.fp ? c.t[c.p](c.fp, b) : c.t[c.p](b)) : (c.t[c.p] = b),
            (c = c._next);
}
      };
      const P = function(a, b, c, d) {
        let e;
          let f;
          let g;
          let h;
          let i;
          let j;
          let k;
          const l = [];
          let m = 0;
          let n = '';
          let o = 0;
        for (
          l.start = a,
            l.end = b,
            a = l[0] = a + '',
            b = l[1] = b + '',
            c && (c(l), (a = l[0]), (b = l[1])),
            l.length = 0,
            e = a.match(M) || [],
            f = b.match(M) || [],
            d &&
              ((d._next = null), (d.blob = 1), (l._firstPT = l._applyPT = d)),
            i = f.length,
            h = 0;
          i > h;
          h++
        ) {
(k = f[h]),
            (j = b.substr(m, b.indexOf(k, m) - m)),
            (n += j || !h ? j : ','),
            (m += j.length),
            o ? (o = (o + 1) % 5) : 'rgba(' === j.substr(-5) && (o = 1),
            k === e[h] || e.length <= h ?
              (n += k) :
              (n && (l.push(n), (n = '')),
                (g = parseFloat(e[h])),
                l.push(g),
                (l._firstPT = {
                  _next: l._firstPT,
                  t: l,
                  p: l.length - 1,
                  s: g,
                  c:
                    ('=' === k.charAt(1) ?
                      parseInt(k.charAt(0) + '1', 10) *
                        parseFloat(k.substr(2)) :
                      parseFloat(k) - g) || 0,
                  f: 0,
                  m: o && 4 > o ? Math.round : 0,
                })),
            (m += k.length);
}
        return (
          (n += b.substr(m)),
          n && l.push(n),
          (l.setRatio = O),
          N.test(b) && (l.end = null),
          l
        );
      };
      const Q = function(a, b, c, d, e, f, g, h, i) {
        'function' == typeof d && (d = d(i || 0, a));
        let j;
          const k = typeof a[b];
          const l =
            'function' !== k ?
              '' :
              b.indexOf('set') || 'function' != typeof a['get' + b.substr(3)] ?
              b :
              'get' + b.substr(3);
          const m = 'get' !== c ? c : l ? (g ? a[l](g) : a[l]()) : a[b];
          const n = 'string' == typeof d && '=' === d.charAt(1);
          let o = {
            t: a,
            p: b,
            s: m,
            f: 'function' === k,
            pg: 0,
            n: e || b,
            m: f ? ('function' == typeof f ? f : Math.round) : 0,
            pr: 0,
            c: n ?
              parseInt(d.charAt(0) + '1', 10) * parseFloat(d.substr(2)) :
              parseFloat(d) - m || 0,
          };
        return (
          ('number' != typeof m || ('number' != typeof d && !n)) &&
            (g ||
            isNaN(m) ||
            (!n && isNaN(d)) ||
            'boolean' == typeof m ||
            'boolean' == typeof d ?
              ((o.fp = g),
                (j = P(
                  m,
                  n ?
                    parseFloat(o.s) +
                        o.c +
                        (o.s + '').replace(/[0-9\-\.]/g, '') :
                    d,
                  h || H.defaultStringFilter,
                  o,
                )),
                (o = {
                  t: j,
                  p: 'setRatio',
                  s: 0,
                  c: 1,
                  f: 2,
                  pg: 0,
                  n: e || b,
                  pr: 0,
                  m: 0,
                })) :
              ((o.s = parseFloat(m)), n || (o.c = parseFloat(d) - o.s || 0))),
          o.c ?
            ((o._next = this._firstPT) && (o._next._prev = o),
              (this._firstPT = o),
              o) :
            void 0
        );
      };
      const R = (H._internals = {
        isArray: q,
        isSelector: I,
        lazyTweens: K,
        blobDif: P,
      });
      var S = (H._plugins = {});
      const T = (R.tweenLookup = {});
      let U = 0;
      var V = (R.reservedProps = {
        ease: 1,
        delay: 1,
        overwrite: 1,
        onComplete: 1,
        onCompleteParams: 1,
        onCompleteScope: 1,
        useFrames: 1,
        runBackwards: 1,
        startAt: 1,
        onUpdate: 1,
        onUpdateParams: 1,
        onUpdateScope: 1,
        onStart: 1,
        onStartParams: 1,
        onStartScope: 1,
        onReverseComplete: 1,
        onReverseCompleteParams: 1,
        onReverseCompleteScope: 1,
        onRepeat: 1,
        onRepeatParams: 1,
        onRepeatScope: 1,
        easeParams: 1,
        yoyo: 1,
        immediateRender: 1,
        repeat: 1,
        repeatDelay: 1,
        data: 1,
        paused: 1,
        reversed: 1,
        autoCSS: 1,
        lazy: 1,
        onOverwrite: 1,
        callbackScope: 1,
        stringFilter: 1,
        id: 1,
        yoyoEase: 1,
      });
      var W = {
        none: 0,
        all: 1,
        auto: 2,
        concurrent: 3,
        allOnStart: 4,
        preexisting: 5,
        true: 1,
        false: 0,
      };
      var X = (E._rootFramesTimeline = new G());
      var Y = (E._rootTimeline = new G());
      let Z = 30;
      var $ = (R.lazyRender = function() {
        let a;
          let b = K.length;
        for (L = {}; --b > -1; ) {
(a = K[b]),
            a &&
              a._lazy !== !1 &&
              (a.render(a._lazy[0], a._lazy[1], !0), (a._lazy = !1));
}
        K.length = 0;
      });
    (Y._startTime = j.time),
      (X._startTime = j.frame),
      (Y._active = X._active = !0),
      setTimeout($, 1),
      (E._updateRoot = H.render = function() {
        let a; let b; let c;
        if (
          (K.length && $(),
          Y.render((j.time - Y._startTime) * Y._timeScale, !1, !1),
          X.render((j.frame - X._startTime) * X._timeScale, !1, !1),
          K.length && $(),
          j.frame >= Z)
        ) {
          Z = j.frame + (parseInt(H.autoSleep, 10) || 120);
          for (c in T) {
            for (b = T[c].tweens, a = b.length; --a > -1; ) {
b[a]._gc && b.splice(a, 1);
}
            0 === b.length && delete T[c];
          }
          if (
            ((c = Y._first),
            (!c || c._paused) &&
              H.autoSleep &&
              !X._first &&
              1 === j._listeners.tick.length)
          ) {
            for (; c && c._paused; ) c = c._next;
            c || j.sleep();
          }
        }
      }),
      j.addEventListener('tick', E._updateRoot);
    var _ = function(a, b, c) {
        let d;
          let e;
          let f = a._gsTweenID;
        if (
          (T[f || (a._gsTweenID = f = 't' + U++)] ||
            (T[f] = {target: a, tweens: []}),
          b && ((d = T[f].tweens), (d[(e = d.length)] = b), c))
        ) {
for (; --e > -1; ) d[e] === b && d.splice(e, 1);
}
        return T[f].tweens;
      };
      const aa = function(a, b, c, d) {
        let e;
          let f;
          let g = a.vars.onOverwrite;
        return (
          g && (e = g(a, b, c, d)),
          (g = H.onOverwrite),
          g && (f = g(a, b, c, d)),
          e !== !1 && f !== !1
        );
      };
      var ba = function(a, b, c, d, e) {
        let f; let g; let h; let i;
        if (1 === d || d >= 4) {
          for (i = e.length, f = 0; i > f; f++) {
if ((h = e[f]) !== b) h._gc || (h._kill(null, a, b) && (g = !0));
            else if (5 === d) break;
}
          return g;
        }
        let j;
          const k = b._startTime + n;
          const l = [];
          let m = 0;
          const o = 0 === b._duration;
        for (f = e.length; --f > -1; ) {
(h = e[f]) === b ||
            h._gc ||
            h._paused ||
            (h._timeline !== b._timeline ?
              ((j = j || ca(b, 0, o)), 0 === ca(h, j, o) && (l[m++] = h)) :
              h._startTime <= k &&
                h._startTime + h.totalDuration() / h._timeScale > k &&
                (((o || !h._initted) && k - h._startTime <= 2e-10) ||
                  (l[m++] = h)));
}
        for (f = m; --f > -1; ) {
if (
            ((h = l[f]),
            (i = h._firstPT),
            2 === d && h._kill(c, a, b) && (g = !0),
            2 !== d || (!h._firstPT && h._initted && i))
          ) {
            if (2 !== d && !aa(h, b)) continue;
            h._enabled(!1, !1) && (g = !0);
          }
}
        return g;
      };
      var ca = function(a, b, c) {
        for (
          var d = a._timeline, e = d._timeScale, f = a._startTime;
          d._timeline;

        ) {
          if (((f += d._startTime), (e *= d._timeScale), d._paused)) {
return -100;
}
          d = d._timeline;
        }
        return (
          (f /= e),
          f > b ?
            f - b :
            (c && f === b) || (!a._initted && 2 * n > f - b) ?
            n :
            (f += a.totalDuration() / a._timeScale / e) > b + n ?
            0 :
            f - b - n
        );
      };
    (i._init = function() {
      let a;
        let b;
        let c;
        let d;
        let e;
        let f;
        const g = this.vars;
        const h = this._overwrittenProps;
        const i = this._duration;
        let j = !!g.immediateRender;
        let k = g.ease;
      if (g.startAt) {
        this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()),
          (e = {});
        for (d in g.startAt) e[d] = g.startAt[d];
        if (
          ((e.data = 'isStart'),
          (e.overwrite = !1),
          (e.immediateRender = !0),
          (e.lazy = j && g.lazy !== !1),
          (e.startAt = e.delay = null),
          (e.onUpdate = g.onUpdate),
          (e.onUpdateParams = g.onUpdateParams),
          (e.onUpdateScope = g.onUpdateScope || g.callbackScope || this),
          (this._startAt = H.to(this.target || {}, 0, e)),
          j)
        ) {
if (this._time > 0) this._startAt = null;
          else if (0 !== i) return;
}
      } else if (g.runBackwards && 0 !== i) {
if (this._startAt) {
this._startAt.render(-1, !0),
            this._startAt.kill(),
            (this._startAt = null);
} else {
          0 !== this._time && (j = !1), (c = {});
          for (d in g) (V[d] && 'autoCSS' !== d) || (c[d] = g[d]);
          if (
            ((c.overwrite = 0),
            (c.data = 'isFromStart'),
            (c.lazy = j && g.lazy !== !1),
            (c.immediateRender = j),
            (this._startAt = H.to(this.target, 0, c)),
            j)
          ) {
            if (0 === this._time) return;
          } else {
this._startAt._init(),
              this._startAt._enabled(!1),
              this.vars.immediateRender && (this._startAt = null);
}
        }
}
      if (
        ((this._ease = k = k ?
          k instanceof w ?
            k :
            'function' == typeof k ?
            new w(k, g.easeParams) :
            x[k] || H.defaultEase :
          H.defaultEase),
        g.easeParams instanceof Array &&
          k.config &&
          (this._ease = k.config.apply(k, g.easeParams)),
        (this._easeType = this._ease._type),
        (this._easePower = this._ease._power),
        (this._firstPT = null),
        this._targets)
      ) {
for (f = this._targets.length, a = 0; f > a; a++) {
this._initProps(
            this._targets[a],
            (this._propLookup[a] = {}),
            this._siblings[a],
            h ? h[a] : null,
            a,
          ) && (b = !0);
}
} else {
b = this._initProps(
          this.target,
          this._propLookup,
          this._siblings,
          h,
          0,
        );
}
      if (
        (b && H._onPluginEvent('_onInitAllProps', this),
        h &&
          (this._firstPT ||
            ('function' != typeof this.target && this._enabled(!1, !1))),
        g.runBackwards)
      ) {
for (c = this._firstPT; c; ) (c.s += c.c), (c.c = -c.c), (c = c._next);
}
      (this._onUpdate = g.onUpdate), (this._initted = !0);
    }),
      (i._initProps = function(b, c, d, e, f) {
        let g; let h; let i; let j; let k; let l;
        if (null == b) return !1;
        L[b._gsTweenID] && $(),
          this.vars.css ||
            (b.style &&
              b !== a &&
              b.nodeType &&
              S.css &&
              this.vars.autoCSS !== !1 &&
              J(this.vars, b));
        for (g in this.vars) {
if (((l = this.vars[g]), V[g])) {
l &&
              (l instanceof Array || (l.push && q(l))) &&
              -1 !== l.join('').indexOf('{self}') &&
              (this.vars[g] = l = this._swapSelfInParams(l, this));
} else if (
            S[g] &&
            (j = new S[g]())._onInitTween(b, this.vars[g], this, f)
          ) {
            for (
              this._firstPT = k = {
                _next: this._firstPT,
                t: j,
                p: 'setRatio',
                s: 0,
                c: 1,
                f: 1,
                n: g,
                pg: 1,
                pr: j._priority,
                m: 0,
              },
                h = j._overwriteProps.length;
              --h > -1;

            ) {
c[j._overwriteProps[h]] = this._firstPT;
}
            (j._priority || j._onInitAllProps) && (i = !0),
              (j._onDisable || j._onEnable) &&
                (this._notifyPluginsOfEnabled = !0),
              k._next && (k._next._prev = k);
          } else {
c[g] = Q.call(
              this,
              b,
              g,
              'get',
              l,
              g,
              0,
              null,
              this.vars.stringFilter,
              f,
            );
}
}
        return e && this._kill(e, b) ?
          this._initProps(b, c, d, e, f) :
          this._overwrite > 1 &&
            this._firstPT &&
            d.length > 1 &&
            ba(b, this, c, this._overwrite, d) ?
          (this._kill(c, b), this._initProps(b, c, d, e, f)) :
          (this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration)) &&
              (L[b._gsTweenID] = !0),
            i);
      }),
      (i.render = function(a, b, c) {
        let d;
          let e;
          let f;
          let g;
          const h = this._time;
          const i = this._duration;
          const j = this._rawPrevTime;
        if (a >= i - 1e-7 && a >= 0) {
(this._totalTime = this._time = i),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1),
            this._reversed ||
              ((d = !0),
              (e = 'onComplete'),
              (c = c || this._timeline.autoRemoveChildren)),
            0 === i &&
              (this._initted || !this.vars.lazy || c) &&
              (this._startTime === this._timeline._duration && (a = 0),
              (0 > j ||
                (0 >= a && a >= -1e-7) ||
                (j === n && 'isPause' !== this.data)) &&
                j !== a &&
                ((c = !0), j > n && (e = 'onReverseComplete')),
              (this._rawPrevTime = g = !b || a || j === a ? a : n));
} else if (1e-7 > a) {
(this._totalTime = this._time = 0),
            (this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0),
            (0 !== h || (0 === i && j > 0)) &&
              ((e = 'onReverseComplete'), (d = this._reversed)),
            0 > a &&
              ((this._active = !1),
              0 === i &&
                (this._initted || !this.vars.lazy || c) &&
                (j >= 0 && (j !== n || 'isPause' !== this.data) && (c = !0),
                (this._rawPrevTime = g = !b || a || j === a ? a : n))),
            (!this._initted || (this._startAt && this._startAt.progress())) &&
              (c = !0);
} else if (((this._totalTime = this._time = a), this._easeType)) {
          let k = a / i;
            const l = this._easeType;
            const m = this._easePower;
          (1 === l || (3 === l && k >= 0.5)) && (k = 1 - k),
            3 === l && (k *= 2),
            1 === m ?
              (k *= k) :
              2 === m ?
              (k *= k * k) :
              3 === m ?
              (k *= k * k * k) :
              4 === m && (k *= k * k * k * k),
            1 === l ?
              (this.ratio = 1 - k) :
              2 === l ?
              (this.ratio = k) :
              0.5 > a / i ?
              (this.ratio = k / 2) :
              (this.ratio = 1 - k / 2);
        } else this.ratio = this._ease.getRatio(a / i);
        if (this._time !== h || c) {
          if (!this._initted) {
            if ((this._init(), !this._initted || this._gc)) return;
            if (
              !c &&
              this._firstPT &&
              ((this.vars.lazy !== !1 && this._duration) ||
                (this.vars.lazy && !this._duration))
            ) {
return (
                (this._time = this._totalTime = h),
                (this._rawPrevTime = j),
                K.push(this),
                void (this._lazy = [a, b])
              );
}
            this._time && !d ?
              (this.ratio = this._ease.getRatio(this._time / i)) :
              d &&
                this._ease._calcEnd &&
                (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1));
          }
          for (
            this._lazy !== !1 && (this._lazy = !1),
              this._active ||
                (!this._paused &&
                  this._time !== h &&
                  a >= 0 &&
                  (this._active = !0)),
              0 === h &&
                (this._startAt &&
                  (a >= 0 ?
                    this._startAt.render(a, !0, c) :
                    e || (e = '_dummyGS')),
                this.vars.onStart &&
                  (0 !== this._time || 0 === i) &&
                  (b || this._callback('onStart'))),
              f = this._firstPT;
            f;

          ) {
f.f ?
              f.t[f.p](f.c * this.ratio + f.s) :
              (f.t[f.p] = f.c * this.ratio + f.s),
              (f = f._next);
}
          this._onUpdate &&
            (0 > a &&
              this._startAt &&
              a !== -1e-4 &&
              this._startAt.render(a, !0, c),
            b || ((this._time !== h || d || c) && this._callback('onUpdate'))),
            e &&
              (!this._gc || c) &&
              (0 > a &&
                this._startAt &&
                !this._onUpdate &&
                a !== -1e-4 &&
                this._startAt.render(a, !0, c),
              d &&
                (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                (this._active = !1)),
              !b && this.vars[e] && this._callback(e),
              0 === i &&
                this._rawPrevTime === n &&
                g !== n &&
                (this._rawPrevTime = 0));
        }
      }),
      (i._kill = function(a, b, c) {
        if (
          ('all' === a && (a = null),
          null == a && (null == b || b === this.target))
        ) {
return (this._lazy = !1), this._enabled(!1, !1);
}
        b =
          'string' != typeof b ?
            b || this._targets || this.target :
            H.selector(b) || b;
        let d;
          let e;
          let f;
          let g;
          let h;
          let i;
          let j;
          let k;
          let l;
          const m =
            c &&
            this._time &&
            c._startTime === this._startTime &&
            this._timeline === c._timeline;
          const n = this._firstPT;
        if ((q(b) || I(b)) && 'number' != typeof b[0]) {
for (d = b.length; --d > -1; ) this._kill(a, b[d], c) && (i = !0);
} else {
          if (this._targets) {
            for (d = this._targets.length; --d > -1; ) {
if (b === this._targets[d]) {
                (h = this._propLookup[d] || {}),
                  (this._overwrittenProps = this._overwrittenProps || []),
                  (e = this._overwrittenProps[d] = a ?
                    this._overwrittenProps[d] || {} :
                    'all');
                break;
              }
}
          } else {
            if (b !== this.target) return !1;
            (h = this._propLookup),
              (e = this._overwrittenProps = a ?
                this._overwrittenProps || {} :
                'all');
          }
          if (h) {
            if (
              ((j = a || h),
              (k =
                a !== e &&
                'all' !== e &&
                a !== h &&
                ('object' != typeof a || !a._tempKill)),
              c && (H.onOverwrite || this.vars.onOverwrite))
            ) {
              for (f in j) h[f] && (l || (l = []), l.push(f));
              if ((l || !a) && !aa(this, c, b, l)) return !1;
            }
            for (f in j) {
(g = h[f]) &&
                (m && (g.f ? g.t[g.p](g.s) : (g.t[g.p] = g.s), (i = !0)),
                g.pg && g.t._kill(j) && (i = !0),
                (g.pg && 0 !== g.t._overwriteProps.length) ||
                  (g._prev ?
                    (g._prev._next = g._next) :
                    g === this._firstPT && (this._firstPT = g._next),
                  g._next && (g._next._prev = g._prev),
                  (g._next = g._prev = null)),
                delete h[f]),
                k && (e[f] = 1);
}
            !this._firstPT && this._initted && n && this._enabled(!1, !1);
          }
        }
        return i;
      }),
      (i.invalidate = function() {
        return (
          this._notifyPluginsOfEnabled && H._onPluginEvent('_onDisable', this),
          (this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null),
          (this._notifyPluginsOfEnabled = this._active = this._lazy = !1),
          (this._propLookup = this._targets ? {} : []),
          E.prototype.invalidate.call(this),
          this.vars.immediateRender &&
            ((this._time = -n), this.render(Math.min(0, -this._delay))),
          this
        );
      }),
      (i._enabled = function(a, b) {
        if ((k || j.wake(), a && this._gc)) {
          let c;
            const d = this._targets;
          if (d) {
for (c = d.length; --c > -1; ) {
this._siblings[c] = _(d[c], this, !0);
}
} else this._siblings = _(this.target, this, !0);
        }
        return (
          E.prototype._enabled.call(this, a, b),
          this._notifyPluginsOfEnabled && this._firstPT ?
            H._onPluginEvent(a ? '_onEnable' : '_onDisable', this) :
            !1
        );
      }),
      (H.to = function(a, b, c) {
        return new H(a, b, c);
      }),
      (H.from = function(a, b, c) {
        return (
          (c.runBackwards = !0),
          (c.immediateRender = 0 != c.immediateRender),
          new H(a, b, c)
        );
      }),
      (H.fromTo = function(a, b, c, d) {
        return (
          (d.startAt = c),
          (d.immediateRender =
            0 != d.immediateRender && 0 != c.immediateRender),
          new H(a, b, d)
        );
      }),
      (H.delayedCall = function(a, b, c, d, e) {
        return new H(b, 0, {
          delay: a,
          onComplete: b,
          onCompleteParams: c,
          callbackScope: d,
          onReverseComplete: b,
          onReverseCompleteParams: c,
          immediateRender: !1,
          lazy: !1,
          useFrames: e,
          overwrite: 0,
        });
      }),
      (H.set = function(a, b) {
        return new H(a, 0, b);
      }),
      (H.getTweensOf = function(a, b) {
        if (null == a) return [];
        a = 'string' != typeof a ? a : H.selector(a) || a;
        let c; let d; let e; let f;
        if ((q(a) || I(a)) && 'number' != typeof a[0]) {
          for (c = a.length, d = []; --c > -1; ) {
d = d.concat(H.getTweensOf(a[c], b));
}
          for (c = d.length; --c > -1; ) {
for (f = d[c], e = c; --e > -1; ) f === d[e] && d.splice(c, 1);
}
        } else if (a._gsTweenID) {
for (d = _(a).concat(), c = d.length; --c > -1; ) {
(d[c]._gc || (b && !d[c].isActive())) && d.splice(c, 1);
}
}
        return d || [];
      }),
      (H.killTweensOf = H.killDelayedCallsTo = function(a, b, c) {
        'object' == typeof b && ((c = b), (b = !1));
        for (let d = H.getTweensOf(a, b), e = d.length; --e > -1; ) {
d[e]._kill(c, a);
}
      });
    var da = u(
      'plugins.TweenPlugin',
      function(a, b) {
        (this._overwriteProps = (a || '').split(',')),
          (this._propName = this._overwriteProps[0]),
          (this._priority = b || 0),
          (this._super = da.prototype);
      },
      !0,
    );
    if (
      ((i = da.prototype),
      (da.version = '1.19.0'),
      (da.API = 2),
      (i._firstPT = null),
      (i._addTween = Q),
      (i.setRatio = O),
      (i._kill = function(a) {
        let b;
          const c = this._overwriteProps;
          let d = this._firstPT;
        if (null != a[this._propName]) this._overwriteProps = [];
        else for (b = c.length; --b > -1; ) null != a[c[b]] && c.splice(b, 1);
        for (; d; ) {
null != a[d.n] &&
            (d._next && (d._next._prev = d._prev),
            d._prev ?
              ((d._prev._next = d._next), (d._prev = null)) :
              this._firstPT === d && (this._firstPT = d._next)),
            (d = d._next);
}
        return !1;
      }),
      (i._mod = i._roundProps = function(a) {
        for (var b, c = this._firstPT; c; ) {
(b =
            a[this._propName] ||
            (null != c.n && a[c.n.split(this._propName + '_').join('')])),
            b &&
              'function' == typeof b &&
              (2 === c.f ? (c.t._applyPT.m = b) : (c.m = b)),
            (c = c._next);
}
      }),
      (H._onPluginEvent = function(a, b) {
        let c;
          let d;
          let e;
          let f;
          let g;
          let h = b._firstPT;
        if ('_onInitAllProps' === a) {
          for (; h; ) {
            for (g = h._next, d = e; d && d.pr > h.pr; ) d = d._next;
            (h._prev = d ? d._prev : f) ? (h._prev._next = h) : (e = h),
              (h._next = d) ? (d._prev = h) : (f = h),
              (h = g);
          }
          h = b._firstPT = e;
        }
        for (; h; ) {
h.pg && 'function' == typeof h.t[a] && h.t[a]() && (c = !0),
            (h = h._next);
}
        return c;
      }),
      (da.activate = function(a) {
        for (let b = a.length; --b > -1; ) {
a[b].API === da.API && (S[new a[b]()._propName] = a[b]);
}
        return !0;
      }),
      (t.plugin = function(a) {
        if (!(a && a.propName && a.init && a.API)) {
throw 'illegal plugin definition.';
}
        let b;
          const c = a.propName;
          const d = a.priority || 0;
          const e = a.overwriteProps;
          const f = {
            init: '_onInitTween',
            set: 'setRatio',
            kill: '_kill',
            round: '_mod',
            mod: '_mod',
            initAll: '_onInitAllProps',
          };
          const g = u(
            'plugins.' + c.charAt(0).toUpperCase() + c.substr(1) + 'Plugin',
            function() {
              da.call(this, c, d), (this._overwriteProps = e || []);
            },
            a.global === !0,
          );
          const h = (g.prototype = new da(c));
        (h.constructor = g), (g.API = a.API);
        for (b in f) 'function' == typeof a[b] && (h[f[b]] = a[b]);
        return (g.version = a.version), da.activate([g]), g;
      }),
      (g = a._gsQueue))
    ) {
      for (h = 0; h < g.length; h++) g[h]();
      for (i in r) {
r[i].func || a.console.log('GSAP encountered missing dependency: ' + i);
}
    }
    k = !1;
  })(
    'undefined' != typeof module &&
      module.exports &&
      'undefined' != typeof global ?
      global :
      this || window,
    'TweenMax',
  );

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

// Ajax js
$(function() {
  // Get the form.
  const form = $('#contact-form');

  // Get the messages div.
  const formMessages = $('.form-message');

  // Set up an event listener for the contact form.
  $(form).submit(function(e) {
    // Stop the browser from submitting the form.
    e.preventDefault();

    // Serialize the form data.
    const formData = $(form).serialize();

    // Submit the form using AJAX.
    $.ajax({
      type: 'POST',
      url: $(form).attr('action'),
      data: formData,
    })
      .done(function(response) {
        // Make sure that the formMessages div has the 'success' class.
        $(formMessages).removeClass('error');
        $(formMessages).addClass('success');

        // Set the message text.
        $(formMessages).text(response);

        // Clear the form.
        $('#contact-form input,#contact-form textarea').val('');
      })
      .fail(function(data) {
        // Make sure that the formMessages div has the 'error' class.
        $(formMessages).removeClass('success');
        $(formMessages).addClass('error');

        // Set the message text.
        if (data.responseText !== '') {
          $(formMessages).text(data.responseText);
        } else {
          $(formMessages).text(
            'Oops! An error occured and your message could not be sent.',
          );
        }
      });
  });
});

exports.module = VanillaTilt;
