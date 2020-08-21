/* eslint-disable operator-linebreak */
(function(e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t())
    : 'function' == typeof define && define.amd
    ? define(t)
    : (e.Swiper = t());
})(this, function() {
  'use strict';
  const e =
      'undefined' == typeof document
        ? {
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
          }
        : document;
    const t =
      'undefined' == typeof window
        ? {
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
          }
        : window;
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
              s || '#' !== i[0] || i.match(/[ .<>:~]/)
                ? (s || e).querySelectorAll(i.trim())
                : [e.getElementById(i.trim().split('#')[1])],
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
          !s && c.dom7Listeners
            ? (u = c.dom7Listeners[d])
            : s && c.dom7LiveListeners && (u = c.dom7LiveListeners[d]);
          for (let h = u.length - 1; h >= 0; h -= 1) {
            const v = u[h];
            r && v.listener === r
              ? (c.removeEventListener(d, v.proxyListener, n), u.splice(h, 1))
              : r ||
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
      return this.length > 0
        ? e
          ? this[0].nextElementSibling && i(this[0].nextElementSibling).is(e)
            ? new a([this[0].nextElementSibling])
            : new a([])
          : this[0].nextElementSibling
          ? new a([this[0].nextElementSibling])
          : new a([])
        : new a([]);
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
        return e
          ? t.previousElementSibling && i(t.previousElementSibling).is(e)
            ? new a([t.previousElementSibling])
            : new a([])
          : t.previousElementSibling
          ? new a([t.previousElementSibling])
          : new a([]);
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
          (e
            ? i(this[a].parentNode).is(e) && t.push(this[a].parentNode)
            : t.push(this[a].parentNode));
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
      return void 0 === e
        ? new a([])
        : (t.is(e) || (t = t.parents(e).eq(0)), t);
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
e
            ? 1 === n[o].nodeType && i(n[o]).is(e) && t.push(n[o])
            : 1 === n[o].nodeType && t.push(n[o]);
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
          t.WebKitCSSMatrix
            ? ((s = n.transform || n.webkitTransform).split(',').length > 6 &&
                (s = s
                  .split(', ')
                  .map(function(e) {
                    return e.replace(',', '.');
                  })
                  .join(', ')),
              (r = new t.WebKitCSSMatrix('none' === s ? '' : s)))
            : (i = (r =
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
            (s = t.WebKitCSSMatrix
              ? r.m41
              : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
          'y' === a &&
            (s = t.WebKitCSSMatrix
              ? r.m42
              : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
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
                (d.isObject(a[l]) && d.isObject(s[l])
                  ? d.extend(a[l], s[l])
                  : !d.isObject(a[l]) && d.isObject(s[l])
                  ? ((a[l] = {}), d.extend(a[l], s[l]))
                  : (a[l] = s[l]));
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
      return a.eventsListeners
        ? (e.split(' ').forEach(function(e) {
            void 0 === t
              ? (a.eventsListeners[e] = [])
              : a.eventsListeners[e].forEach(function(i, s) {
                  i === t && a.eventsListeners[e].splice(s, 1);
                });
          }),
          a)
        : a;
    }),
    (c.prototype.emit = function() {
      for (var e = [], t = arguments.length; t--; ) e[t] = arguments[t];
      let a;
        let i;
        let s;
        const r = this;
      return r.eventsListeners
        ? ('string' == typeof e[0] || Array.isArray(e[0])
            ? ((a = e[0]), (i = e.slice(1, e.length)), (s = r))
            : ((a = e[0].events), (i = e[0].data), (s = e[0].context || r)),
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
          r)
        : r;
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
      return Array.isArray(e)
        ? (e.forEach(function(e) {
            return i.installModule(e);
          }),
          i)
        : i.installModule.apply(i, [e].concat(t));
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
          r
            ? o.css({marginLeft: '', marginTop: ''})
            : o.css({marginRight: '', marginBottom: ''}),
          a.slidesPerColumn > 1 &&
            ((T =
              Math.floor(l / a.slidesPerColumn) === l / e.params.slidesPerColumn
                ? l
                : Math.ceil(l / a.slidesPerColumn) * a.slidesPerColumn),
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
            'column' === a.slidesPerColumnFill
              ? ((D = P - (I = Math.floor(P / M)) * M),
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
                }))
              : (I = P - (D = Math.floor(P / z)) * z),
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
                (S = e.isHorizontal()
                  ? $[0].getBoundingClientRect().width +
                    parseFloat(O.getPropertyValue('margin-left')) +
                    parseFloat(O.getPropertyValue('margin-right'))
                  : $[0].getBoundingClientRect().height +
                    parseFloat(O.getPropertyValue('margin-top')) +
                    parseFloat(O.getPropertyValue('margin-bottom'))),
                A && ($[0].style.transform = A),
                a.roundLengths && (S = Math.floor(S));
            } else {
(S = (s - (a.slidesPerView - 1) * w) / a.slidesPerView),
                a.roundLengths && (S = Math.floor(S)),
                o[P] &&
                  (e.isHorizontal()
                    ? (o[P].style.width = S + 'px')
                    : (o[P].style.height = S + 'px'));
}
            o[P] && (o[P].swiperSlideSize = S),
              h.push(S),
              a.centeredSlides
                ? ((y = y + S / 2 + x / 2 + w),
                  0 === x && 0 !== P && (y = y - s / 2 - w),
                  0 === P && (y = y - s / 2 - w),
                  Math.abs(y) < 0.001 && (y = 0),
                  E % a.slidesPerGroup == 0 && c.push(y),
                  u.push(y))
                : (E % a.slidesPerGroup == 0 && c.push(y),
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
            (e.isHorizontal()
              ? i.css({width: e.virtualSize + a.spaceBetween + 'px'})
              : i.css({height: e.virtualSize + a.spaceBetween + 'px'})),
          a.slidesPerColumn > 1 &&
            ((e.virtualSize = (S + a.spaceBetween) * T),
            (e.virtualSize =
              Math.ceil(e.virtualSize / a.slidesPerColumn) - a.spaceBetween),
            e.isHorizontal()
              ? i.css({width: e.virtualSize + a.spaceBetween + 'px'})
              : i.css({height: e.virtualSize + a.spaceBetween + 'px'}),
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
            (e.isHorizontal()
              ? r
                ? o.css({marginLeft: w + 'px'})
                : o.css({marginRight: w + 'px'})
              : o.css({marginBottom: w + 'px'})),
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
        ('number' == typeof e
          ? a.setTransition(e)
          : !0 === e && a.setTransition(a.params.speed),
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
e[t].swiperSlideOffset = this.isHorizontal()
          ? e[t].offsetLeft
          : e[t].offsetTop;
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
      0 === i
        ? ((s = 0), (r = !0), (n = !0))
        : ((r = (s = (e - t.minTranslate()) / i) <= 0), (n = s >= 1)),
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
        (e = o
          ? t.$wrapperEl.find(
              '.' + i.slideClass + '[data-swiper-slide-index="' + r + '"]',
            )
          : a.eq(r)).addClass(i.slideActiveClass),
        i.loop &&
          (e.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  '.' +
                    i.slideClass +
                    ':not(.' +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    n +
                    '"]',
                )
                .addClass(i.slideDuplicateActiveClass)
            : s
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
          (l.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  '.' +
                    i.slideClass +
                    ':not(.' +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    l.attr('data-swiper-slide-index') +
                    '"]',
                )
                .addClass(i.slideDuplicateNextClass)
            : s
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
          d.hasClass(i.slideDuplicateClass)
            ? s
                .children(
                  '.' +
                    i.slideClass +
                    ':not(.' +
                    i.slideDuplicateClass +
                    ')[data-swiper-slide-index="' +
                    d.attr('data-swiper-slide-index') +
                    '"]',
                )
                .addClass(i.slideDuplicatePrevClass)
            : s
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
void 0 !== s[u + 1]
            ? i >= s[u] && i < s[u + 1] - (s[u + 1] - s[u]) / 2
              ? (c = u)
              : i >= s[u] && i < s[u + 1] && (c = u + 1)
            : i >= s[u] && (c = u);
}
        n.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
      }
      if (
        ((t =
          r.indexOf(i) >= 0
            ? r.indexOf(i)
            : Math.floor(c / n.slidesPerGroup)) >= r.length &&
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
        t.virtual && t.params.virtual.enabled
          ? (t.clickedIndex = parseInt(
              i(s).attr('data-swiper-slide-index'),
              10,
            ))
          : (t.clickedIndex = i(s).index()),
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
          (p.transforms3d
            ? r.transform('translate3d(' + o + 'px, ' + l + 'px, 0px)')
            : r.transform('translate(' + o + 'px, ' + l + 'px)')),
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
          'next' === n
            ? a.emit('slideNextTransitionStart')
            : a.emit('slidePrevTransitionStart');
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
          'next' === r
            ? a.emit('slideNextTransitionEnd')
            : a.emit('slidePrevTransitionEnd');
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
        (u && -f === s.translate) || (!u && f === s.translate)
          ? (s.updateActiveIndex(r),
            n.autoHeight && s.updateAutoHeight(),
            s.updateSlidesClasses(),
            'slide' !== n.effect && s.setTranslate(f),
            'reset' !== v && (s.transitionStart(a, v), s.transitionEnd(a, v)),
            !1)
          : (0 !== t && p.transition
              ? (s.setTransition(t),
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
                  )))
              : (s.setTransition(0),
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
      return s.loop
        ? !r &&
            (i.loopFix(),
            (i._clientLeft = i.$wrapperEl[0].clientLeft),
            i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a))
        : i.slideTo(i.activeIndex + s.slidesPerGroup, e, t, a);
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
          'auto' === a.slidesPerView
            ? t.slidesPerViewDynamic()
            : a.slidesPerView;
        let n = t.clickedIndex;
      if (a.loop) {
        if (t.animating) return;
        (e = parseInt(i(t.clickedSlide).attr('data-swiper-slide-index'), 10)),
          a.centeredSlides
            ? n < t.loopedSlides - r / 2 ||
              n > t.slides.length - t.loopedSlides + r / 2
              ? (t.loopFix(),
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
                }))
              : t.slideTo(n)
            : n > t.slides.length - r
            ? (t.loopFix(),
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
              }))
            : t.slideTo(n);
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
      i < r
        ? ((e = s.length - 3 * r + i),
          (e += r),
          t.slideTo(e, 0, !1, !0) &&
            0 !== p &&
            t.setTranslate((d ? -t.translate : t.translate) - p))
        : (('auto' === a.slidesPerView && i >= 2 * r) ||
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
          !e.params.centeredSlides
            ? e.slideTo(e.slides.length - 1, 0, !1, !0)
            : e.slideTo(e.activeIndex, 0, !1, !0);
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
                n.noSwipingSelector
                  ? n.noSwipingSelector
                  : '.' + n.noSwipingClass,
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
                    (a.isVertical() && n.currentX === n.startX)
                      ? (s.isScrolling = !1)
                      : h * h + v * v >= 25 &&
                        ((u =
                          (180 * Math.atan2(Math.abs(v), Math.abs(h))) /
                          Math.PI),
                        (s.isScrolling = a.isHorizontal()
                          ? u > r.touchAngle
                          : 90 - u > r.touchAngle))),
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
                    f > 0 && s.currentTranslate > a.minTranslate()
                      ? ((m = !1),
                        r.resistance &&
                          (s.currentTranslate =
                            a.minTranslate() -
                            1 +
                            Math.pow(
                              -a.minTranslate() + s.startTranslate + f,
                              g,
                            )))
                      : f < 0 &&
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
                        void (n.diff = a.isHorizontal()
                          ? n.currentX - n.startX
                          : n.currentY - n.startY)
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
            (c = i.followFinger
              ? r
                ? t.translate
                : -t.translate
              : -a.currentTranslate),
            i.freeMode)
          ) {
            if (c < -t.minTranslate()) return void t.slideTo(t.activeIndex);
            if (c > -t.maxTranslate()) {
return void (t.slides.length < l.length
                ? t.slideTo(l.length - 1)
                : t.slideTo(t.slides.length - 1));
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
i.freeModeMomentumBounce
                  ? (y + t.maxTranslate() < -S && (y = t.maxTranslate() - S),
                    (x = t.maxTranslate()),
                    (T = !0),
                    (a.allowMomentumBounce = !0))
                  : (y = t.maxTranslate()),
                  i.loop && i.centeredSlides && (E = !0);
} else if (y > t.minTranslate()) {
i.freeModeMomentumBounce
                  ? (y - t.minTranslate() > S && (y = t.minTranslate() + S),
                    (x = t.minTranslate()),
                    (T = !0),
                    (a.allowMomentumBounce = !0))
                  : (y = t.minTranslate()),
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
                  'next' === t.swipeDirection
                    ? l[C]
                    : l[C - 1]);
              }
              if (
                (E &&
                  t.once('transitionEnd', function() {
                    t.loopFix();
                  }),
                0 !== t.velocity)
              ) {
b = r
                  ? Math.abs((-y - t.translate) / t.velocity)
                  : Math.abs((y - t.translate) / t.velocity);
} else if (i.freeModeSticky) return void t.slideToClosest();
              i.freeModeMomentumBounce && T
                ? (t.updateProgress(x),
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
                  }))
                : t.velocity
                ? (t.updateProgress(y),
                  t.setTransition(b),
                  t.setTranslate(y),
                  t.transitionStart(!0, t.swipeDirection),
                  t.animating ||
                    ((t.animating = !0),
                    n.transitionEnd(function() {
                      t && !t.destroyed && t.transitionEnd();
                    })))
                : t.updateProgress(y),
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
void 0 !== o[P + i.slidesPerGroup]
                ? c >= o[P] &&
                  c < o[P + i.slidesPerGroup] &&
                  ((z = P), (k = o[P + i.slidesPerGroup] - o[P]))
                : c >= o[P] &&
                  ((z = P), (k = o[o.length - 1] - o[o.length - 2]));
}
            const $ = (c - o[z]) / k;
            if (h > i.longSwipesMs) {
              if (!i.longSwipes) return void t.slideTo(t.activeIndex);
              'next' === t.swipeDirection &&
                ($ >= i.longSwipesRatio
                  ? t.slideTo(z + i.slidesPerGroup)
                  : t.slideTo(z)),
                'prev' === t.swipeDirection &&
                  ($ > 1 - i.longSwipesRatio
                    ? t.slideTo(z + i.slidesPerGroup)
                    : t.slideTo(z));
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
      let e;
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
          e.complete && r
            ? l()
            : a
            ? (((o = new t.Image()).onload = l),
              (o.onerror = l),
              s && (o.sizes = s),
              i && (o.srcset = i),
              a && (o.src = a))
            : l();
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
        1 === n.length && n[0].constructor && n[0].constructor === Object
          ? (r = n[0])
          : ((s = (a = n)[0]), (r = a[1])),
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
                p.pointerEvents
                  ? (f = ['pointerdown', 'pointermove', 'pointerup'])
                  : p.prefixedPointerEvents &&
                    (f = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp']),
                (l.touchEventsTouch = {start: v[0], move: v[1], end: v[2]}),
                (l.touchEventsDesktop = {start: f[0], move: f[1], end: f[2]}),
                p.touch || !l.params.simulateTouch
                  ? l.touchEventsTouch
                  : l.touchEventsDesktop),
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
              e.params.freeMode
                ? (i(), e.params.autoHeight && e.updateAutoHeight())
                : (('auto' === e.params.slidesPerView ||
                    e.params.slidesPerView > 1) &&
                  e.isEnd &&
                  !e.params.centeredSlides
                    ? e.slideTo(e.slides.length - 1, 0, !1, !0)
                    : e.slideTo(e.activeIndex, 0, !1, !0)) || i(),
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
            e.params.loop
              ? e.slideTo(
                  e.params.initialSlide + e.loopedSlides,
                  0,
                  e.params.runCallbacksOnInit,
                )
              : e.slideTo(
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
          return void 0 === a.params || a.destroyed
            ? null
            : (a.emit('beforeDestroy'),
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
          r
            ? ((f = Math.floor(i / 2) + s), (m = Math.floor(i / 2) + s))
            : ((f = i + (s - 1)), (m = s));
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
            (void 0 === l || e
              ? T.push(C)
              : (C > l && T.push(C), C < o && E.push(C)));
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
        const r = s.renderSlide
          ? i(s.renderSlide.call(a, e, t))
          : i(
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
          i.isHorizontal()
            ? ((37 !== n && 39 !== n) ||
                (r.preventDefault ? r.preventDefault() : (r.returnValue = !1)),
              ((39 === n && !s) || (37 === n && s)) && i.slideNext(),
              ((37 === n && !s) || (39 === n && s)) && i.slidePrev())
            : ((38 !== n && 40 !== n) ||
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
        t.navigator.userAgent.indexOf('firefox') > -1
          ? 'DOMMouseScroll'
          : (function() {
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
            })()
          ? 'wheel'
          : 'mousewheel',
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
            (1 === e.deltaMode
              ? ((i *= 40), (s *= 40))
              : ((i *= 800), (s *= 800))),
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
            (e.isBeginning
              ? s.addClass(t.disabledClass)
              : s.removeClass(t.disabledClass),
            s[
              e.params.watchOverflow && e.isLocked ? 'addClass' : 'removeClass'
            ](t.lockClass)),
            i &&
              i.length > 0 &&
              (e.isEnd
                ? i.addClass(t.disabledClass)
                : i.removeClass(t.disabledClass),
              i[
                e.params.watchOverflow && e.isLocked
                  ? 'addClass'
                  : 'removeClass'
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
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length;
            const n = e.pagination.$el;
            const o = e.params.loop
              ? Math.ceil((r - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((s = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup,
                )) >
                  r - 1 - 2 * e.loopedSlides && (s -= r - 2 * e.loopedSlides),
                s > o - 1 && (s -= o),
                s < 0 && 'bullets' !== e.params.paginationType && (s = o + s))
              : (s = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
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
                  e.pagination.dynamicBulletIndex > a.dynamicMainBullets - 1
                    ? (e.pagination.dynamicBulletIndex =
                        a.dynamicMainBullets - 1)
                    : e.pagination.dynamicBulletIndex < 0 &&
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
            b = a.progressbarOpposite
              ? e.isHorizontal()
                ? 'vertical'
                : 'horizontal'
              : e.isHorizontal()
              ? 'horizontal'
              : 'vertical';
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
          'custom' === a.type && a.renderCustom
            ? (n.html(a.renderCustom(e, s + 1, o)),
              e.emit('paginationRender', e, n[0]))
            : e.emit('paginationUpdate', e, n[0]),
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
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length;
            const i = e.pagination.$el;
            let s = '';
          if ('bullets' === t.type) {
            for (
              let r = e.params.loop
                  ? Math.ceil(
                      (a - 2 * e.loopedSlides) / e.params.slidesPerGroup,
                    )
                  : e.snapGrid.length,
                n = 0;
              n < r;
              n += 1
            ) {
t.renderBullet
                ? (s += t.renderBullet.call(e, n, t.bulletClass))
                : (s +=
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
            ((s = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : '<span class="' +
                t.currentClass +
                '"></span> / <span class="' +
                t.totalClass +
                '"></span>'),
            i.html(s)),
            'progressbar' === t.type &&
              ((s = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : '<span class="' + t.progressbarFillClass + '"></span>'),
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
          a
            ? (c = -c) > 0
              ? ((d = s - c), (c = 0))
              : -c + s > r && (d = r + c)
            : c < 0
            ? ((d = s + c), (c = 0))
            : c + s > r && (d = r - c),
            e.isHorizontal()
              ? (p.transforms3d
                  ? n.transform('translate3d(' + c + 'px, 0, 0)')
                  : n.transform('translateX(' + c + 'px)'),
                (n[0].style.width = d + 'px'))
              : (p.transforms3d
                  ? n.transform('translate3d(0px, ' + c + 'px, 0)')
                  : n.transform('translateY(' + c + 'px)'),
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
            'auto' === e.params.scrollbar.dragSize
              ? r * n
              : parseInt(e.params.scrollbar.dragSize, 10)),
            e.isHorizontal()
              ? (a[0].style.width = s + 'px')
              : (a[0].style.height = s + 'px'),
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
          ((a.isHorizontal()
            ? 'touchstart' === e.type || 'touchmove' === e.type
              ? e.targetTouches[0].pageX
              : e.pageX || e.clientX
            : 'touchstart' === e.type || 'touchmove' === e.type
            ? e.targetTouches[0].pageY
            : e.pageY || e.clientY) -
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
          p.touch || (!p.pointerEvents && !p.prefixedPointerEvents)
            ? (p.touch &&
                (n.addEventListener(i.start, t.scrollbar.onDragStart, o),
                n.addEventListener(i.move, t.scrollbar.onDragMove, o),
                n.addEventListener(i.end, t.scrollbar.onDragEnd, l)),
              ((r.simulateTouch && !y.ios && !y.android) ||
                (r.simulateTouch && !p.touch && y.ios)) &&
                (n.addEventListener('mousedown', t.scrollbar.onDragStart, o),
                e.addEventListener('mousemove', t.scrollbar.onDragMove, o),
                e.addEventListener('mouseup', t.scrollbar.onDragEnd, l)))
            : (n.addEventListener(s.start, t.scrollbar.onDragStart, o),
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
          p.touch || (!p.pointerEvents && !p.prefixedPointerEvents)
            ? (p.touch &&
                (n.removeEventListener(i.start, t.scrollbar.onDragStart, o),
                n.removeEventListener(i.move, t.scrollbar.onDragMove, o),
                n.removeEventListener(i.end, t.scrollbar.onDragEnd, l)),
              ((r.simulateTouch && !y.ios && !y.android) ||
                (r.simulateTouch && !p.touch && y.ios)) &&
                (n.removeEventListener('mousedown', t.scrollbar.onDragStart, o),
                e.removeEventListener('mousemove', t.scrollbar.onDragMove, o),
                e.removeEventListener('mouseup', t.scrollbar.onDragEnd, l)))
            : (n.removeEventListener(s.start, t.scrollbar.onDragStart, o),
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
          (o || l
            ? ((o = o || '0'), (l = l || '0'))
            : this.isHorizontal()
            ? ((o = n), (l = '0'))
            : ((l = n), (o = '0')),
          (o =
            o.indexOf('%') >= 0
              ? parseInt(o, 10) * t * r + '%'
              : o * t * r + 'px'),
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
        0 !== r.$imageWrapEl.length)
          ? (r.$imageEl.transition(0), (t.zoom.isScaling = !0))
          : (r.$imageEl = void 0);
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
          (p.gestures
            ? (this.zoom.scale = e.scale * a.currentScale)
            : (a.scale = (i.scaleMove / i.scaleStart) * a.currentScale),
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
          ((x.$slideEl = b.clickedSlide
            ? i(b.clickedSlide)
            : b.slides.eq(b.activeIndex)),
          (x.$imageEl = x.$slideEl.find('img, svg, canvas')),
          (x.$imageWrapEl = x.$imageEl.parent('.' + y.containerClass))),
        x.$imageEl && 0 !== x.$imageEl.length) &&
          (x.$slideEl.addClass('' + y.zoomedSlideClass),
          void 0 === E.touchesStart.x && e
            ? ((t =
                'touchend' === e.type ? e.changedTouches[0].pageX : e.pageX),
              (a = 'touchend' === e.type ? e.changedTouches[0].pageY : e.pageY))
            : ((t = E.touchesStart.x), (a = E.touchesStart.y)),
          (w.scale = x.$imageWrapEl.attr('data-swiper-zoom') || y.maxRatio),
          (w.currentScale =
            x.$imageWrapEl.attr('data-swiper-zoom') || y.maxRatio),
          e
            ? ((m = x.$slideEl[0].offsetWidth),
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
              o > f && (o = f))
            : ((n = 0), (o = 0)),
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
          ((s.$slideEl = e.clickedSlide
            ? i(e.clickedSlide)
            : e.slides.eq(e.activeIndex)),
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
          p.gestures
            ? (e.$wrapperEl.on(
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
              e.$wrapperEl.on('gestureend', '.swiper-slide', t.onGestureEnd, a))
            : 'touchstart' === e.touchEvents.start &&
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
          p.gestures
            ? (e.$wrapperEl.off(
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
              ))
            : 'touchstart' === e.touchEvents.start &&
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
              a.virtual && a.params.virtual.enabled
                ? a.$wrapperEl.children(
                    '.' +
                      a.params.slideClass +
                      '[data-swiper-slide-index="' +
                      e +
                      '"]',
                  )
                : a.slides.eq(e);
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
                      (l
                        ? (o.css('background-image', 'url("' + l + '")'),
                          o.removeAttr('data-background'))
                        : (p &&
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
            return e
              ? ((n = o(this.x, e)),
                (r = n - 1),
                ((e - this.x[r]) * (this.y[n] - this.y[r])) /
                  (this.x[n] - this.x[r]) +
                  this.y[r])
              : 0;
          }),
          this
        );
      },
      getInterpolateFunction: function(e) {
        const t = this;
        t.controller.spline ||
          (t.controller.spline = t.params.loop
            ? new q.LinearSpline(t.slidesGrid, e.slidesGrid)
            : new q.LinearSpline(t.snapGrid, e.snapGrid));
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
            t.isEnd
              ? t.a11y.notify(a.lastSlideMessage)
              : t.a11y.notify(a.nextSlideMessage)),
            t.navigation &&
              t.navigation.$prevEl &&
              s.is(t.navigation.$prevEl) &&
              ((t.isBeginning && !t.params.loop) || t.slidePrev(),
              t.isBeginning
                ? t.a11y.notify(a.firstSlideMessage)
                : t.a11y.notify(a.prevSlideMessage)),
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
            (this.params.history.replaceState
              ? t.history.replaceState({value: s}, null, s)
              : t.history.pushState({value: s}, null, s));
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
            e.params.autoplay.reverseDirection
              ? e.params.loop
                ? (e.loopFix(),
                  e.slidePrev(e.params.speed, !0, !0),
                  e.emit('autoplay'))
                : e.isBeginning
                ? e.params.autoplay.stopOnLastSlide
                  ? e.autoplay.stop()
                  : (e.slideTo(e.slides.length - 1, e.params.speed, !0, !0),
                    e.emit('autoplay'))
                : (e.slidePrev(e.params.speed, !0, !0), e.emit('autoplay'))
              : e.params.loop
              ? (e.loopFix(),
                e.slideNext(e.params.speed, !0, !0),
                e.emit('autoplay'))
              : e.isEnd
              ? e.params.autoplay.stopOnLastSlide
                ? e.autoplay.stop()
                : (e.slideTo(0, e.params.speed, !0, !0), e.emit('autoplay'))
              : (e.slideNext(e.params.speed, !0, !0), e.emit('autoplay'));
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
            0 !== e && t.params.autoplay.waitForTransition
              ? (t.$wrapperEl[0].addEventListener(
                  'transitionend',
                  t.autoplay.onTransitionEnd,
                ),
                t.$wrapperEl[0].addEventListener(
                  'webkitTransitionEnd',
                  t.autoplay.onTransitionEnd,
                ))
              : ((t.autoplay.paused = !1), t.autoplay.run())));
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
          const n = e.params.fadeEffect.crossFade
            ? Math.max(1 - Math.abs(i[0].progress), 0)
            : 1 + Math.min(Math.max(i[0].progress, -1), 0);
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
          (c
            ? (0 === (e = s.find('.swiper-cube-shadow')).length &&
                ((e = i('<div class="swiper-cube-shadow"></div>')),
                s.append(e)),
              e.css({height: n + 'px'}))
            : 0 === (e = a.find('.swiper-cube-shadow')).length &&
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
          m % 4 == 0
            ? ((y = 4 * -b * d), (E = 0))
            : (m - 1) % 4 == 0
            ? ((y = 0), (E = 4 * -b * d))
            : (m - 2) % 4 == 0
            ? ((y = d + 4 * b * d), (E = d))
            : (m - 3) % 4 == 0 && ((y = -d), (E = 3 * d + 4 * d * b)),
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
            let C = c
                ? f.find('.swiper-slide-shadow-left')
                : f.find('.swiper-slide-shadow-top');
              let M = c
                ? f.find('.swiper-slide-shadow-right')
                : f.find('.swiper-slide-shadow-bottom');
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
            (e.isHorizontal()
              ? a && (o = -o)
              : ((p = d), (d = 0), (l = -o), (o = 0)),
            (r[0].style.zIndex = -Math.abs(Math.round(n)) + t.length),
            e.params.flipEffect.slideShadows)
          ) {
            let c = e.isHorizontal()
                ? r.find('.swiper-slide-shadow-left')
                : r.find('.swiper-slide-shadow-top');
              let u = e.isHorizontal()
                ? r.find('.swiper-slide-shadow-right')
                : r.find('.swiper-slide-shadow-bottom');
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
            let C = l
                ? m.find('.swiper-slide-shadow-left')
                : m.find('.swiper-slide-shadow-top');
              let M = l
                ? m.find('.swiper-slide-shadow-right')
                : m.find('.swiper-slide-shadow-bottom');
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
            this.params.loop
              ? this.pagination.update()
              : void 0 === this.snapIndex && this.pagination.update();
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
              (t || !this.params.autoplay.disableOnInteraction
                ? this.autoplay.pause(e)
                : this.autoplay.stop());
          },
          sliderFirstMove: function() {
            this.autoplay.running &&
              (this.params.autoplay.disableOnInteraction
                ? this.autoplay.stop()
                : this.autoplay.pause());
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
