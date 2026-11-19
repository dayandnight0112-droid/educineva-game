"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.production.min.js
  var require_react_production_min = __commonJS({
    "node_modules/react/cjs/react.production.min.js"(exports) {
      "use strict";
      var l = Symbol.for("react.element");
      var n = Symbol.for("react.portal");
      var p = Symbol.for("react.fragment");
      var q = Symbol.for("react.strict_mode");
      var r = Symbol.for("react.profiler");
      var t = Symbol.for("react.provider");
      var u = Symbol.for("react.context");
      var v = Symbol.for("react.forward_ref");
      var w = Symbol.for("react.suspense");
      var x = Symbol.for("react.memo");
      var y = Symbol.for("react.lazy");
      var z = Symbol.iterator;
      function A(a) {
        if (null === a || "object" !== typeof a) return null;
        a = z && a[z] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var B = { isMounted: function() {
        return false;
      }, enqueueForceUpdate: function() {
      }, enqueueReplaceState: function() {
      }, enqueueSetState: function() {
      } };
      var C = Object.assign;
      var D = {};
      function E(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      E.prototype.isReactComponent = {};
      E.prototype.setState = function(a, b) {
        if ("object" !== typeof a && "function" !== typeof a && null != a) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, a, b, "setState");
      };
      E.prototype.forceUpdate = function(a) {
        this.updater.enqueueForceUpdate(this, a, "forceUpdate");
      };
      function F() {
      }
      F.prototype = E.prototype;
      function G(a, b, e) {
        this.props = a;
        this.context = b;
        this.refs = D;
        this.updater = e || B;
      }
      var H = G.prototype = new F();
      H.constructor = G;
      C(H, E.prototype);
      H.isPureReactComponent = true;
      var I = Array.isArray;
      var J = Object.prototype.hasOwnProperty;
      var K = { current: null };
      var L = { key: true, ref: true, __self: true, __source: true };
      function M(a, b, e) {
        var d, c = {}, k = null, h = null;
        if (null != b) for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k = "" + b.key), b) J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
        var g = arguments.length - 2;
        if (1 === g) c.children = e;
        else if (1 < g) {
          for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
          c.children = f;
        }
        if (a && a.defaultProps) for (d in g = a.defaultProps, g) void 0 === c[d] && (c[d] = g[d]);
        return { $$typeof: l, type: a, key: k, ref: h, props: c, _owner: K.current };
      }
      function N(a, b) {
        return { $$typeof: l, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
      }
      function O(a) {
        return "object" === typeof a && null !== a && a.$$typeof === l;
      }
      function escape(a) {
        var b = { "=": "=0", ":": "=2" };
        return "$" + a.replace(/[=:]/g, function(a2) {
          return b[a2];
        });
      }
      var P = /\/+/g;
      function Q(a, b) {
        return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
      }
      function R(a, b, e, d, c) {
        var k = typeof a;
        if ("undefined" === k || "boolean" === k) a = null;
        var h = false;
        if (null === a) h = true;
        else switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
        if (h) return h = a, c = c(h), a = "" === d ? "." + Q(h, 0) : d, I(c) ? (e = "", null != a && (e = a.replace(P, "$&/") + "/"), R(c, b, e, "", function(a2) {
          return a2;
        })) : null != c && (O(c) && (c = N(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P, "$&/") + "/") + a)), b.push(c)), 1;
        h = 0;
        d = "" === d ? "." : d + ":";
        if (I(a)) for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
        else if (f = A(a), "function" === typeof f) for (a = f.call(a), g = 0; !(k = a.next()).done; ) k = k.value, f = d + Q(k, g++), h += R(k, b, e, f, c);
        else if ("object" === k) throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
        return h;
      }
      function S(a, b, e) {
        if (null == a) return a;
        var d = [], c = 0;
        R(a, d, "", "", function(a2) {
          return b.call(e, a2, c++);
        });
        return d;
      }
      function T(a) {
        if (-1 === a._status) {
          var b = a._result;
          b = b();
          b.then(function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 1, a._result = b2;
          }, function(b2) {
            if (0 === a._status || -1 === a._status) a._status = 2, a._result = b2;
          });
          -1 === a._status && (a._status = 0, a._result = b);
        }
        if (1 === a._status) return a._result.default;
        throw a._result;
      }
      var U = { current: null };
      var V = { transition: null };
      var W = { ReactCurrentDispatcher: U, ReactCurrentBatchConfig: V, ReactCurrentOwner: K };
      function X2() {
        throw Error("act(...) is not supported in production builds of React.");
      }
      exports.Children = { map: S, forEach: function(a, b, e) {
        S(a, function() {
          b.apply(this, arguments);
        }, e);
      }, count: function(a) {
        var b = 0;
        S(a, function() {
          b++;
        });
        return b;
      }, toArray: function(a) {
        return S(a, function(a2) {
          return a2;
        }) || [];
      }, only: function(a) {
        if (!O(a)) throw Error("React.Children.only expected to receive a single React element child.");
        return a;
      } };
      exports.Component = E;
      exports.Fragment = p;
      exports.Profiler = r;
      exports.PureComponent = G;
      exports.StrictMode = q;
      exports.Suspense = w;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
      exports.act = X2;
      exports.cloneElement = function(a, b, e) {
        if (null === a || void 0 === a) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
        var d = C({}, a.props), c = a.key, k = a.ref, h = a._owner;
        if (null != b) {
          void 0 !== b.ref && (k = b.ref, h = K.current);
          void 0 !== b.key && (c = "" + b.key);
          if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
          for (f in b) J.call(b, f) && !L.hasOwnProperty(f) && (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
        }
        var f = arguments.length - 2;
        if (1 === f) d.children = e;
        else if (1 < f) {
          g = Array(f);
          for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
          d.children = g;
        }
        return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
      };
      exports.createContext = function(a) {
        a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
        a.Provider = { $$typeof: t, _context: a };
        return a.Consumer = a;
      };
      exports.createElement = M;
      exports.createFactory = function(a) {
        var b = M.bind(null, a);
        b.type = a;
        return b;
      };
      exports.createRef = function() {
        return { current: null };
      };
      exports.forwardRef = function(a) {
        return { $$typeof: v, render: a };
      };
      exports.isValidElement = O;
      exports.lazy = function(a) {
        return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
      };
      exports.memo = function(a, b) {
        return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
      };
      exports.startTransition = function(a) {
        var b = V.transition;
        V.transition = {};
        try {
          a();
        } finally {
          V.transition = b;
        }
      };
      exports.unstable_act = X2;
      exports.useCallback = function(a, b) {
        return U.current.useCallback(a, b);
      };
      exports.useContext = function(a) {
        return U.current.useContext(a);
      };
      exports.useDebugValue = function() {
      };
      exports.useDeferredValue = function(a) {
        return U.current.useDeferredValue(a);
      };
      exports.useEffect = function(a, b) {
        return U.current.useEffect(a, b);
      };
      exports.useId = function() {
        return U.current.useId();
      };
      exports.useImperativeHandle = function(a, b, e) {
        return U.current.useImperativeHandle(a, b, e);
      };
      exports.useInsertionEffect = function(a, b) {
        return U.current.useInsertionEffect(a, b);
      };
      exports.useLayoutEffect = function(a, b) {
        return U.current.useLayoutEffect(a, b);
      };
      exports.useMemo = function(a, b) {
        return U.current.useMemo(a, b);
      };
      exports.useReducer = function(a, b, e) {
        return U.current.useReducer(a, b, e);
      };
      exports.useRef = function(a) {
        return U.current.useRef(a);
      };
      exports.useState = function(a) {
        return U.current.useState(a);
      };
      exports.useSyncExternalStore = function(a, b, e) {
        return U.current.useSyncExternalStore(a, b, e);
      };
      exports.useTransition = function() {
        return U.current.useTransition();
      };
      exports.version = "18.3.1";
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module2) {
      "use strict";
      if (true) {
        module2.exports = require_react_production_min();
      } else {
        module2.exports = null;
      }
    }
  });

  // node_modules/scheduler/cjs/scheduler.production.min.js
  var require_scheduler_production_min = __commonJS({
    "node_modules/scheduler/cjs/scheduler.production.min.js"(exports) {
      "use strict";
      function f(a, b) {
        var c = a.length;
        a.push(b);
        a: for (; 0 < c; ) {
          var d = c - 1 >>> 1, e = a[d];
          if (0 < g(e, b)) a[d] = b, a[c] = e, c = d;
          else break a;
        }
      }
      function h(a) {
        return 0 === a.length ? null : a[0];
      }
      function k(a) {
        if (0 === a.length) return null;
        var b = a[0], c = a.pop();
        if (c !== b) {
          a[0] = c;
          a: for (var d = 0, e = a.length, w = e >>> 1; d < w; ) {
            var m = 2 * (d + 1) - 1, C = a[m], n = m + 1, x = a[n];
            if (0 > g(C, c)) n < e && 0 > g(x, C) ? (a[d] = x, a[n] = c, d = n) : (a[d] = C, a[m] = c, d = m);
            else if (n < e && 0 > g(x, c)) a[d] = x, a[n] = c, d = n;
            else break a;
          }
        }
        return b;
      }
      function g(a, b) {
        var c = a.sortIndex - b.sortIndex;
        return 0 !== c ? c : a.id - b.id;
      }
      if ("object" === typeof performance && "function" === typeof performance.now) {
        l = performance;
        exports.unstable_now = function() {
          return l.now();
        };
      } else {
        p = Date, q = p.now();
        exports.unstable_now = function() {
          return p.now() - q;
        };
      }
      var l;
      var p;
      var q;
      var r = [];
      var t = [];
      var u = 1;
      var v = null;
      var y = 3;
      var z = false;
      var A = false;
      var B = false;
      var D = "function" === typeof setTimeout ? setTimeout : null;
      var E = "function" === typeof clearTimeout ? clearTimeout : null;
      var F = "undefined" !== typeof setImmediate ? setImmediate : null;
      "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function G(a) {
        for (var b = h(t); null !== b; ) {
          if (null === b.callback) k(t);
          else if (b.startTime <= a) k(t), b.sortIndex = b.expirationTime, f(r, b);
          else break;
          b = h(t);
        }
      }
      function H(a) {
        B = false;
        G(a);
        if (!A) if (null !== h(r)) A = true, I(J);
        else {
          var b = h(t);
          null !== b && K(H, b.startTime - a);
        }
      }
      function J(a, b) {
        A = false;
        B && (B = false, E(L), L = -1);
        z = true;
        var c = y;
        try {
          G(b);
          for (v = h(r); null !== v && (!(v.expirationTime > b) || a && !M()); ) {
            var d = v.callback;
            if ("function" === typeof d) {
              v.callback = null;
              y = v.priorityLevel;
              var e = d(v.expirationTime <= b);
              b = exports.unstable_now();
              "function" === typeof e ? v.callback = e : v === h(r) && k(r);
              G(b);
            } else k(r);
            v = h(r);
          }
          if (null !== v) var w = true;
          else {
            var m = h(t);
            null !== m && K(H, m.startTime - b);
            w = false;
          }
          return w;
        } finally {
          v = null, y = c, z = false;
        }
      }
      var N = false;
      var O = null;
      var L = -1;
      var P = 5;
      var Q = -1;
      function M() {
        return exports.unstable_now() - Q < P ? false : true;
      }
      function R() {
        if (null !== O) {
          var a = exports.unstable_now();
          Q = a;
          var b = true;
          try {
            b = O(true, a);
          } finally {
            b ? S() : (N = false, O = null);
          }
        } else N = false;
      }
      var S;
      if ("function" === typeof F) S = function() {
        F(R);
      };
      else if ("undefined" !== typeof MessageChannel) {
        T = new MessageChannel(), U = T.port2;
        T.port1.onmessage = R;
        S = function() {
          U.postMessage(null);
        };
      } else S = function() {
        D(R, 0);
      };
      var T;
      var U;
      function I(a) {
        O = a;
        N || (N = true, S());
      }
      function K(a, b) {
        L = D(function() {
          a(exports.unstable_now());
        }, b);
      }
      exports.unstable_IdlePriority = 5;
      exports.unstable_ImmediatePriority = 1;
      exports.unstable_LowPriority = 4;
      exports.unstable_NormalPriority = 3;
      exports.unstable_Profiling = null;
      exports.unstable_UserBlockingPriority = 2;
      exports.unstable_cancelCallback = function(a) {
        a.callback = null;
      };
      exports.unstable_continueExecution = function() {
        A || z || (A = true, I(J));
      };
      exports.unstable_forceFrameRate = function(a) {
        0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P = 0 < a ? Math.floor(1e3 / a) : 5;
      };
      exports.unstable_getCurrentPriorityLevel = function() {
        return y;
      };
      exports.unstable_getFirstCallbackNode = function() {
        return h(r);
      };
      exports.unstable_next = function(a) {
        switch (y) {
          case 1:
          case 2:
          case 3:
            var b = 3;
            break;
          default:
            b = y;
        }
        var c = y;
        y = b;
        try {
          return a();
        } finally {
          y = c;
        }
      };
      exports.unstable_pauseExecution = function() {
      };
      exports.unstable_requestPaint = function() {
      };
      exports.unstable_runWithPriority = function(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            a = 3;
        }
        var c = y;
        y = a;
        try {
          return b();
        } finally {
          y = c;
        }
      };
      exports.unstable_scheduleCallback = function(a, b, c) {
        var d = exports.unstable_now();
        "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
        switch (a) {
          case 1:
            var e = -1;
            break;
          case 2:
            e = 250;
            break;
          case 5:
            e = 1073741823;
            break;
          case 4:
            e = 1e4;
            break;
          default:
            e = 5e3;
        }
        e = c + e;
        a = { id: u++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
        c > d ? (a.sortIndex = c, f(t, a), null === h(r) && a === h(t) && (B ? (E(L), L = -1) : B = true, K(H, c - d))) : (a.sortIndex = e, f(r, a), A || z || (A = true, I(J)));
        return a;
      };
      exports.unstable_shouldYield = M;
      exports.unstable_wrapCallback = function(a) {
        var b = y;
        return function() {
          var c = y;
          y = b;
          try {
            return a.apply(this, arguments);
          } finally {
            y = c;
          }
        };
      };
    }
  });

  // node_modules/scheduler/index.js
  var require_scheduler = __commonJS({
    "node_modules/scheduler/index.js"(exports, module2) {
      "use strict";
      if (true) {
        module2.exports = require_scheduler_production_min();
      } else {
        module2.exports = null;
      }
    }
  });

  // node_modules/react-dom/cjs/react-dom.production.min.js
  var require_react_dom_production_min = __commonJS({
    "node_modules/react-dom/cjs/react-dom.production.min.js"(exports) {
      "use strict";
      var aa = require_react();
      var ca = require_scheduler();
      function p(a) {
        for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++) b += "&args[]=" + encodeURIComponent(arguments[c]);
        return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var da = /* @__PURE__ */ new Set();
      var ea = {};
      function fa(a, b) {
        ha(a, b);
        ha(a + "Capture", b);
      }
      function ha(a, b) {
        ea[a] = b;
        for (a = 0; a < b.length; a++) da.add(b[a]);
      }
      var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement);
      var ja = Object.prototype.hasOwnProperty;
      var ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
      var la = {};
      var ma = {};
      function oa(a) {
        if (ja.call(ma, a)) return true;
        if (ja.call(la, a)) return false;
        if (ka.test(a)) return ma[a] = true;
        la[a] = true;
        return false;
      }
      function pa(a, b, c, d) {
        if (null !== c && 0 === c.type) return false;
        switch (typeof b) {
          case "function":
          case "symbol":
            return true;
          case "boolean":
            if (d) return false;
            if (null !== c) return !c.acceptsBooleans;
            a = a.toLowerCase().slice(0, 5);
            return "data-" !== a && "aria-" !== a;
          default:
            return false;
        }
      }
      function qa(a, b, c, d) {
        if (null === b || "undefined" === typeof b || pa(a, b, c, d)) return true;
        if (d) return false;
        if (null !== c) switch (c.type) {
          case 3:
            return !b;
          case 4:
            return false === b;
          case 5:
            return isNaN(b);
          case 6:
            return isNaN(b) || 1 > b;
        }
        return false;
      }
      function v(a, b, c, d, e, f, g) {
        this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
        this.attributeName = d;
        this.attributeNamespace = e;
        this.mustUseProperty = c;
        this.propertyName = a;
        this.type = b;
        this.sanitizeURL = f;
        this.removeEmptyString = g;
      }
      var z = {};
      "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
        z[a] = new v(a, 0, false, a, null, false, false);
      });
      [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
        var b = a[0];
        z[b] = new v(b, 1, false, a[1], null, false, false);
      });
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
        z[a] = new v(a, 2, false, a.toLowerCase(), null, false, false);
      });
      ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
        z[a] = new v(a, 2, false, a, null, false, false);
      });
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
        z[a] = new v(a, 3, false, a.toLowerCase(), null, false, false);
      });
      ["checked", "multiple", "muted", "selected"].forEach(function(a) {
        z[a] = new v(a, 3, true, a, null, false, false);
      });
      ["capture", "download"].forEach(function(a) {
        z[a] = new v(a, 4, false, a, null, false, false);
      });
      ["cols", "rows", "size", "span"].forEach(function(a) {
        z[a] = new v(a, 6, false, a, null, false, false);
      });
      ["rowSpan", "start"].forEach(function(a) {
        z[a] = new v(a, 5, false, a.toLowerCase(), null, false, false);
      });
      var ra = /[\-:]([a-z])/g;
      function sa(a) {
        return a[1].toUpperCase();
      }
      "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
        var b = a.replace(
          ra,
          sa
        );
        z[b] = new v(b, 1, false, a, null, false, false);
      });
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
      });
      ["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
        var b = a.replace(ra, sa);
        z[b] = new v(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
      });
      ["tabIndex", "crossOrigin"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, false, false);
      });
      z.xlinkHref = new v("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
      ["src", "href", "action", "formAction"].forEach(function(a) {
        z[a] = new v(a, 1, false, a.toLowerCase(), null, true, true);
      });
      function ta(a, b, c, d) {
        var e = z.hasOwnProperty(b) ? z[b] : null;
        if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1]) qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
      }
      var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      var va = Symbol.for("react.element");
      var wa = Symbol.for("react.portal");
      var ya = Symbol.for("react.fragment");
      var za = Symbol.for("react.strict_mode");
      var Aa = Symbol.for("react.profiler");
      var Ba = Symbol.for("react.provider");
      var Ca = Symbol.for("react.context");
      var Da = Symbol.for("react.forward_ref");
      var Ea = Symbol.for("react.suspense");
      var Fa = Symbol.for("react.suspense_list");
      var Ga = Symbol.for("react.memo");
      var Ha = Symbol.for("react.lazy");
      Symbol.for("react.scope");
      Symbol.for("react.debug_trace_mode");
      var Ia = Symbol.for("react.offscreen");
      Symbol.for("react.legacy_hidden");
      Symbol.for("react.cache");
      Symbol.for("react.tracing_marker");
      var Ja = Symbol.iterator;
      function Ka(a) {
        if (null === a || "object" !== typeof a) return null;
        a = Ja && a[Ja] || a["@@iterator"];
        return "function" === typeof a ? a : null;
      }
      var A = Object.assign;
      var La;
      function Ma(a) {
        if (void 0 === La) try {
          throw Error();
        } catch (c) {
          var b = c.stack.trim().match(/\n( *(at )?)/);
          La = b && b[1] || "";
        }
        return "\n" + La + a;
      }
      var Na = false;
      function Oa(a, b) {
        if (!a || Na) return "";
        Na = true;
        var c = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        try {
          if (b) if (b = function() {
            throw Error();
          }, Object.defineProperty(b.prototype, "props", { set: function() {
            throw Error();
          } }), "object" === typeof Reflect && Reflect.construct) {
            try {
              Reflect.construct(b, []);
            } catch (l) {
              var d = l;
            }
            Reflect.construct(a, [], b);
          } else {
            try {
              b.call();
            } catch (l) {
              d = l;
            }
            a.call(b.prototype);
          }
          else {
            try {
              throw Error();
            } catch (l) {
              d = l;
            }
            a();
          }
        } catch (l) {
          if (l && d && "string" === typeof l.stack) {
            for (var e = l.stack.split("\n"), f = d.stack.split("\n"), g = e.length - 1, h = f.length - 1; 1 <= g && 0 <= h && e[g] !== f[h]; ) h--;
            for (; 1 <= g && 0 <= h; g--, h--) if (e[g] !== f[h]) {
              if (1 !== g || 1 !== h) {
                do
                  if (g--, h--, 0 > h || e[g] !== f[h]) {
                    var k = "\n" + e[g].replace(" at new ", " at ");
                    a.displayName && k.includes("<anonymous>") && (k = k.replace("<anonymous>", a.displayName));
                    return k;
                  }
                while (1 <= g && 0 <= h);
              }
              break;
            }
          }
        } finally {
          Na = false, Error.prepareStackTrace = c;
        }
        return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
      }
      function Pa(a) {
        switch (a.tag) {
          case 5:
            return Ma(a.type);
          case 16:
            return Ma("Lazy");
          case 13:
            return Ma("Suspense");
          case 19:
            return Ma("SuspenseList");
          case 0:
          case 2:
          case 15:
            return a = Oa(a.type, false), a;
          case 11:
            return a = Oa(a.type.render, false), a;
          case 1:
            return a = Oa(a.type, true), a;
          default:
            return "";
        }
      }
      function Qa(a) {
        if (null == a) return null;
        if ("function" === typeof a) return a.displayName || a.name || null;
        if ("string" === typeof a) return a;
        switch (a) {
          case ya:
            return "Fragment";
          case wa:
            return "Portal";
          case Aa:
            return "Profiler";
          case za:
            return "StrictMode";
          case Ea:
            return "Suspense";
          case Fa:
            return "SuspenseList";
        }
        if ("object" === typeof a) switch (a.$$typeof) {
          case Ca:
            return (a.displayName || "Context") + ".Consumer";
          case Ba:
            return (a._context.displayName || "Context") + ".Provider";
          case Da:
            var b = a.render;
            a = a.displayName;
            a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
            return a;
          case Ga:
            return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
          case Ha:
            b = a._payload;
            a = a._init;
            try {
              return Qa(a(b));
            } catch (c) {
            }
        }
        return null;
      }
      function Ra(a) {
        var b = a.type;
        switch (a.tag) {
          case 24:
            return "Cache";
          case 9:
            return (b.displayName || "Context") + ".Consumer";
          case 10:
            return (b._context.displayName || "Context") + ".Provider";
          case 18:
            return "DehydratedFragment";
          case 11:
            return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
          case 7:
            return "Fragment";
          case 5:
            return b;
          case 4:
            return "Portal";
          case 3:
            return "Root";
          case 6:
            return "Text";
          case 16:
            return Qa(b);
          case 8:
            return b === za ? "StrictMode" : "Mode";
          case 22:
            return "Offscreen";
          case 12:
            return "Profiler";
          case 21:
            return "Scope";
          case 13:
            return "Suspense";
          case 19:
            return "SuspenseList";
          case 25:
            return "TracingMarker";
          case 1:
          case 0:
          case 17:
          case 2:
          case 14:
          case 15:
            if ("function" === typeof b) return b.displayName || b.name || null;
            if ("string" === typeof b) return b;
        }
        return null;
      }
      function Sa(a) {
        switch (typeof a) {
          case "boolean":
          case "number":
          case "string":
          case "undefined":
            return a;
          case "object":
            return a;
          default:
            return "";
        }
      }
      function Ta(a) {
        var b = a.type;
        return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
      }
      function Ua(a) {
        var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
        if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
          var e = c.get, f = c.set;
          Object.defineProperty(a, b, { configurable: true, get: function() {
            return e.call(this);
          }, set: function(a2) {
            d = "" + a2;
            f.call(this, a2);
          } });
          Object.defineProperty(a, b, { enumerable: c.enumerable });
          return { getValue: function() {
            return d;
          }, setValue: function(a2) {
            d = "" + a2;
          }, stopTracking: function() {
            a._valueTracker = null;
            delete a[b];
          } };
        }
      }
      function Va(a) {
        a._valueTracker || (a._valueTracker = Ua(a));
      }
      function Wa(a) {
        if (!a) return false;
        var b = a._valueTracker;
        if (!b) return true;
        var c = b.getValue();
        var d = "";
        a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
        a = d;
        return a !== c ? (b.setValue(a), true) : false;
      }
      function Xa(a) {
        a = a || ("undefined" !== typeof document ? document : void 0);
        if ("undefined" === typeof a) return null;
        try {
          return a.activeElement || a.body;
        } catch (b) {
          return a.body;
        }
      }
      function Ya(a, b) {
        var c = b.checked;
        return A({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
      }
      function Za(a, b) {
        var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
        c = Sa(null != b.value ? b.value : c);
        a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
      }
      function ab(a, b) {
        b = b.checked;
        null != b && ta(a, "checked", b, false);
      }
      function bb(a, b) {
        ab(a, b);
        var c = Sa(b.value), d = b.type;
        if (null != c) if ("number" === d) {
          if (0 === c && "" === a.value || a.value != c) a.value = "" + c;
        } else a.value !== "" + c && (a.value = "" + c);
        else if ("submit" === d || "reset" === d) {
          a.removeAttribute("value");
          return;
        }
        b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
        null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
      }
      function db(a, b, c) {
        if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
          var d = b.type;
          if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value)) return;
          b = "" + a._wrapperState.initialValue;
          c || b === a.value || (a.value = b);
          a.defaultValue = b;
        }
        c = a.name;
        "" !== c && (a.name = "");
        a.defaultChecked = !!a._wrapperState.initialChecked;
        "" !== c && (a.name = c);
      }
      function cb(a, b, c) {
        if ("number" !== b || Xa(a.ownerDocument) !== a) null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
      }
      var eb = Array.isArray;
      function fb(a, b, c, d) {
        a = a.options;
        if (b) {
          b = {};
          for (var e = 0; e < c.length; e++) b["$" + c[e]] = true;
          for (c = 0; c < a.length; c++) e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
        } else {
          c = "" + Sa(c);
          b = null;
          for (e = 0; e < a.length; e++) {
            if (a[e].value === c) {
              a[e].selected = true;
              d && (a[e].defaultSelected = true);
              return;
            }
            null !== b || a[e].disabled || (b = a[e]);
          }
          null !== b && (b.selected = true);
        }
      }
      function gb(a, b) {
        if (null != b.dangerouslySetInnerHTML) throw Error(p(91));
        return A({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
      }
      function hb(a, b) {
        var c = b.value;
        if (null == c) {
          c = b.children;
          b = b.defaultValue;
          if (null != c) {
            if (null != b) throw Error(p(92));
            if (eb(c)) {
              if (1 < c.length) throw Error(p(93));
              c = c[0];
            }
            b = c;
          }
          null == b && (b = "");
          c = b;
        }
        a._wrapperState = { initialValue: Sa(c) };
      }
      function ib(a, b) {
        var c = Sa(b.value), d = Sa(b.defaultValue);
        null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
        null != d && (a.defaultValue = "" + d);
      }
      function jb(a) {
        var b = a.textContent;
        b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
      }
      function kb(a) {
        switch (a) {
          case "svg":
            return "http://www.w3.org/2000/svg";
          case "math":
            return "http://www.w3.org/1998/Math/MathML";
          default:
            return "http://www.w3.org/1999/xhtml";
        }
      }
      function lb(a, b) {
        return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
      }
      var mb;
      var nb = (function(a) {
        return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
          MSApp.execUnsafeLocalFunction(function() {
            return a(b, c, d, e);
          });
        } : a;
      })(function(a, b) {
        if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a) a.innerHTML = b;
        else {
          mb = mb || document.createElement("div");
          mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
          for (b = mb.firstChild; a.firstChild; ) a.removeChild(a.firstChild);
          for (; b.firstChild; ) a.appendChild(b.firstChild);
        }
      });
      function ob(a, b) {
        if (b) {
          var c = a.firstChild;
          if (c && c === a.lastChild && 3 === c.nodeType) {
            c.nodeValue = b;
            return;
          }
        }
        a.textContent = b;
      }
      var pb = {
        animationIterationCount: true,
        aspectRatio: true,
        borderImageOutset: true,
        borderImageSlice: true,
        borderImageWidth: true,
        boxFlex: true,
        boxFlexGroup: true,
        boxOrdinalGroup: true,
        columnCount: true,
        columns: true,
        flex: true,
        flexGrow: true,
        flexPositive: true,
        flexShrink: true,
        flexNegative: true,
        flexOrder: true,
        gridArea: true,
        gridRow: true,
        gridRowEnd: true,
        gridRowSpan: true,
        gridRowStart: true,
        gridColumn: true,
        gridColumnEnd: true,
        gridColumnSpan: true,
        gridColumnStart: true,
        fontWeight: true,
        lineClamp: true,
        lineHeight: true,
        opacity: true,
        order: true,
        orphans: true,
        tabSize: true,
        widows: true,
        zIndex: true,
        zoom: true,
        fillOpacity: true,
        floodOpacity: true,
        stopOpacity: true,
        strokeDasharray: true,
        strokeDashoffset: true,
        strokeMiterlimit: true,
        strokeOpacity: true,
        strokeWidth: true
      };
      var qb = ["Webkit", "ms", "Moz", "O"];
      Object.keys(pb).forEach(function(a) {
        qb.forEach(function(b) {
          b = b + a.charAt(0).toUpperCase() + a.substring(1);
          pb[b] = pb[a];
        });
      });
      function rb(a, b, c) {
        return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
      }
      function sb(a, b) {
        a = a.style;
        for (var c in b) if (b.hasOwnProperty(c)) {
          var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
          "float" === c && (c = "cssFloat");
          d ? a.setProperty(c, e) : a[c] = e;
        }
      }
      var tb = A({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
      function ub(a, b) {
        if (b) {
          if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML)) throw Error(p(137, a));
          if (null != b.dangerouslySetInnerHTML) {
            if (null != b.children) throw Error(p(60));
            if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML)) throw Error(p(61));
          }
          if (null != b.style && "object" !== typeof b.style) throw Error(p(62));
        }
      }
      function vb(a, b) {
        if (-1 === a.indexOf("-")) return "string" === typeof b.is;
        switch (a) {
          case "annotation-xml":
          case "color-profile":
          case "font-face":
          case "font-face-src":
          case "font-face-uri":
          case "font-face-format":
          case "font-face-name":
          case "missing-glyph":
            return false;
          default:
            return true;
        }
      }
      var wb = null;
      function xb(a) {
        a = a.target || a.srcElement || window;
        a.correspondingUseElement && (a = a.correspondingUseElement);
        return 3 === a.nodeType ? a.parentNode : a;
      }
      var yb = null;
      var zb = null;
      var Ab = null;
      function Bb(a) {
        if (a = Cb(a)) {
          if ("function" !== typeof yb) throw Error(p(280));
          var b = a.stateNode;
          b && (b = Db(b), yb(a.stateNode, a.type, b));
        }
      }
      function Eb(a) {
        zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
      }
      function Fb() {
        if (zb) {
          var a = zb, b = Ab;
          Ab = zb = null;
          Bb(a);
          if (b) for (a = 0; a < b.length; a++) Bb(b[a]);
        }
      }
      function Gb(a, b) {
        return a(b);
      }
      function Hb() {
      }
      var Ib = false;
      function Jb(a, b, c) {
        if (Ib) return a(b, c);
        Ib = true;
        try {
          return Gb(a, b, c);
        } finally {
          if (Ib = false, null !== zb || null !== Ab) Hb(), Fb();
        }
      }
      function Kb(a, b) {
        var c = a.stateNode;
        if (null === c) return null;
        var d = Db(c);
        if (null === d) return null;
        c = d[b];
        a: switch (b) {
          case "onClick":
          case "onClickCapture":
          case "onDoubleClick":
          case "onDoubleClickCapture":
          case "onMouseDown":
          case "onMouseDownCapture":
          case "onMouseMove":
          case "onMouseMoveCapture":
          case "onMouseUp":
          case "onMouseUpCapture":
          case "onMouseEnter":
            (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
            a = !d;
            break a;
          default:
            a = false;
        }
        if (a) return null;
        if (c && "function" !== typeof c) throw Error(p(231, b, typeof c));
        return c;
      }
      var Lb = false;
      if (ia) try {
        Mb = {};
        Object.defineProperty(Mb, "passive", { get: function() {
          Lb = true;
        } });
        window.addEventListener("test", Mb, Mb);
        window.removeEventListener("test", Mb, Mb);
      } catch (a) {
        Lb = false;
      }
      var Mb;
      function Nb(a, b, c, d, e, f, g, h, k) {
        var l = Array.prototype.slice.call(arguments, 3);
        try {
          b.apply(c, l);
        } catch (m) {
          this.onError(m);
        }
      }
      var Ob = false;
      var Pb = null;
      var Qb = false;
      var Rb = null;
      var Sb = { onError: function(a) {
        Ob = true;
        Pb = a;
      } };
      function Tb(a, b, c, d, e, f, g, h, k) {
        Ob = false;
        Pb = null;
        Nb.apply(Sb, arguments);
      }
      function Ub(a, b, c, d, e, f, g, h, k) {
        Tb.apply(this, arguments);
        if (Ob) {
          if (Ob) {
            var l = Pb;
            Ob = false;
            Pb = null;
          } else throw Error(p(198));
          Qb || (Qb = true, Rb = l);
        }
      }
      function Vb(a) {
        var b = a, c = a;
        if (a.alternate) for (; b.return; ) b = b.return;
        else {
          a = b;
          do
            b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
          while (a);
        }
        return 3 === b.tag ? c : null;
      }
      function Wb(a) {
        if (13 === a.tag) {
          var b = a.memoizedState;
          null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
          if (null !== b) return b.dehydrated;
        }
        return null;
      }
      function Xb(a) {
        if (Vb(a) !== a) throw Error(p(188));
      }
      function Yb(a) {
        var b = a.alternate;
        if (!b) {
          b = Vb(a);
          if (null === b) throw Error(p(188));
          return b !== a ? null : a;
        }
        for (var c = a, d = b; ; ) {
          var e = c.return;
          if (null === e) break;
          var f = e.alternate;
          if (null === f) {
            d = e.return;
            if (null !== d) {
              c = d;
              continue;
            }
            break;
          }
          if (e.child === f.child) {
            for (f = e.child; f; ) {
              if (f === c) return Xb(e), a;
              if (f === d) return Xb(e), b;
              f = f.sibling;
            }
            throw Error(p(188));
          }
          if (c.return !== d.return) c = e, d = f;
          else {
            for (var g = false, h = e.child; h; ) {
              if (h === c) {
                g = true;
                c = e;
                d = f;
                break;
              }
              if (h === d) {
                g = true;
                d = e;
                c = f;
                break;
              }
              h = h.sibling;
            }
            if (!g) {
              for (h = f.child; h; ) {
                if (h === c) {
                  g = true;
                  c = f;
                  d = e;
                  break;
                }
                if (h === d) {
                  g = true;
                  d = f;
                  c = e;
                  break;
                }
                h = h.sibling;
              }
              if (!g) throw Error(p(189));
            }
          }
          if (c.alternate !== d) throw Error(p(190));
        }
        if (3 !== c.tag) throw Error(p(188));
        return c.stateNode.current === c ? a : b;
      }
      function Zb(a) {
        a = Yb(a);
        return null !== a ? $b(a) : null;
      }
      function $b(a) {
        if (5 === a.tag || 6 === a.tag) return a;
        for (a = a.child; null !== a; ) {
          var b = $b(a);
          if (null !== b) return b;
          a = a.sibling;
        }
        return null;
      }
      var ac = ca.unstable_scheduleCallback;
      var bc = ca.unstable_cancelCallback;
      var cc = ca.unstable_shouldYield;
      var dc = ca.unstable_requestPaint;
      var B = ca.unstable_now;
      var ec = ca.unstable_getCurrentPriorityLevel;
      var fc = ca.unstable_ImmediatePriority;
      var gc = ca.unstable_UserBlockingPriority;
      var hc = ca.unstable_NormalPriority;
      var ic = ca.unstable_LowPriority;
      var jc = ca.unstable_IdlePriority;
      var kc = null;
      var lc = null;
      function mc(a) {
        if (lc && "function" === typeof lc.onCommitFiberRoot) try {
          lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
        } catch (b) {
        }
      }
      var oc = Math.clz32 ? Math.clz32 : nc;
      var pc = Math.log;
      var qc = Math.LN2;
      function nc(a) {
        a >>>= 0;
        return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
      }
      var rc = 64;
      var sc = 4194304;
      function tc(a) {
        switch (a & -a) {
          case 1:
            return 1;
          case 2:
            return 2;
          case 4:
            return 4;
          case 8:
            return 8;
          case 16:
            return 16;
          case 32:
            return 32;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return a & 4194240;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return a & 130023424;
          case 134217728:
            return 134217728;
          case 268435456:
            return 268435456;
          case 536870912:
            return 536870912;
          case 1073741824:
            return 1073741824;
          default:
            return a;
        }
      }
      function uc(a, b) {
        var c = a.pendingLanes;
        if (0 === c) return 0;
        var d = 0, e = a.suspendedLanes, f = a.pingedLanes, g = c & 268435455;
        if (0 !== g) {
          var h = g & ~e;
          0 !== h ? d = tc(h) : (f &= g, 0 !== f && (d = tc(f)));
        } else g = c & ~e, 0 !== g ? d = tc(g) : 0 !== f && (d = tc(f));
        if (0 === d) return 0;
        if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f = b & -b, e >= f || 16 === e && 0 !== (f & 4194240))) return b;
        0 !== (d & 4) && (d |= c & 16);
        b = a.entangledLanes;
        if (0 !== b) for (a = a.entanglements, b &= d; 0 < b; ) c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
        return d;
      }
      function vc(a, b) {
        switch (a) {
          case 1:
          case 2:
          case 4:
            return b + 250;
          case 8:
          case 16:
          case 32:
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
            return b + 5e3;
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            return -1;
          case 134217728:
          case 268435456:
          case 536870912:
          case 1073741824:
            return -1;
          default:
            return -1;
        }
      }
      function wc(a, b) {
        for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f = a.pendingLanes; 0 < f; ) {
          var g = 31 - oc(f), h = 1 << g, k = e[g];
          if (-1 === k) {
            if (0 === (h & c) || 0 !== (h & d)) e[g] = vc(h, b);
          } else k <= b && (a.expiredLanes |= h);
          f &= ~h;
        }
      }
      function xc(a) {
        a = a.pendingLanes & -1073741825;
        return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
      }
      function yc() {
        var a = rc;
        rc <<= 1;
        0 === (rc & 4194240) && (rc = 64);
        return a;
      }
      function zc(a) {
        for (var b = [], c = 0; 31 > c; c++) b.push(a);
        return b;
      }
      function Ac(a, b, c) {
        a.pendingLanes |= b;
        536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
        a = a.eventTimes;
        b = 31 - oc(b);
        a[b] = c;
      }
      function Bc(a, b) {
        var c = a.pendingLanes & ~b;
        a.pendingLanes = b;
        a.suspendedLanes = 0;
        a.pingedLanes = 0;
        a.expiredLanes &= b;
        a.mutableReadLanes &= b;
        a.entangledLanes &= b;
        b = a.entanglements;
        var d = a.eventTimes;
        for (a = a.expirationTimes; 0 < c; ) {
          var e = 31 - oc(c), f = 1 << e;
          b[e] = 0;
          d[e] = -1;
          a[e] = -1;
          c &= ~f;
        }
      }
      function Cc(a, b) {
        var c = a.entangledLanes |= b;
        for (a = a.entanglements; c; ) {
          var d = 31 - oc(c), e = 1 << d;
          e & b | a[d] & b && (a[d] |= b);
          c &= ~e;
        }
      }
      var C = 0;
      function Dc(a) {
        a &= -a;
        return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
      }
      var Ec;
      var Fc;
      var Gc;
      var Hc;
      var Ic;
      var Jc = false;
      var Kc = [];
      var Lc = null;
      var Mc = null;
      var Nc = null;
      var Oc = /* @__PURE__ */ new Map();
      var Pc = /* @__PURE__ */ new Map();
      var Qc = [];
      var Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
      function Sc(a, b) {
        switch (a) {
          case "focusin":
          case "focusout":
            Lc = null;
            break;
          case "dragenter":
          case "dragleave":
            Mc = null;
            break;
          case "mouseover":
          case "mouseout":
            Nc = null;
            break;
          case "pointerover":
          case "pointerout":
            Oc.delete(b.pointerId);
            break;
          case "gotpointercapture":
          case "lostpointercapture":
            Pc.delete(b.pointerId);
        }
      }
      function Tc(a, b, c, d, e, f) {
        if (null === a || a.nativeEvent !== f) return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
        a.eventSystemFlags |= d;
        b = a.targetContainers;
        null !== e && -1 === b.indexOf(e) && b.push(e);
        return a;
      }
      function Uc(a, b, c, d, e) {
        switch (b) {
          case "focusin":
            return Lc = Tc(Lc, a, b, c, d, e), true;
          case "dragenter":
            return Mc = Tc(Mc, a, b, c, d, e), true;
          case "mouseover":
            return Nc = Tc(Nc, a, b, c, d, e), true;
          case "pointerover":
            var f = e.pointerId;
            Oc.set(f, Tc(Oc.get(f) || null, a, b, c, d, e));
            return true;
          case "gotpointercapture":
            return f = e.pointerId, Pc.set(f, Tc(Pc.get(f) || null, a, b, c, d, e)), true;
        }
        return false;
      }
      function Vc(a) {
        var b = Wc(a.target);
        if (null !== b) {
          var c = Vb(b);
          if (null !== c) {
            if (b = c.tag, 13 === b) {
              if (b = Wb(c), null !== b) {
                a.blockedOn = b;
                Ic(a.priority, function() {
                  Gc(c);
                });
                return;
              }
            } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
              a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
              return;
            }
          }
        }
        a.blockedOn = null;
      }
      function Xc(a) {
        if (null !== a.blockedOn) return false;
        for (var b = a.targetContainers; 0 < b.length; ) {
          var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
          if (null === c) {
            c = a.nativeEvent;
            var d = new c.constructor(c.type, c);
            wb = d;
            c.target.dispatchEvent(d);
            wb = null;
          } else return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
          b.shift();
        }
        return true;
      }
      function Zc(a, b, c) {
        Xc(a) && c.delete(b);
      }
      function $c() {
        Jc = false;
        null !== Lc && Xc(Lc) && (Lc = null);
        null !== Mc && Xc(Mc) && (Mc = null);
        null !== Nc && Xc(Nc) && (Nc = null);
        Oc.forEach(Zc);
        Pc.forEach(Zc);
      }
      function ad(a, b) {
        a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
      }
      function bd(a) {
        function b(b2) {
          return ad(b2, a);
        }
        if (0 < Kc.length) {
          ad(Kc[0], a);
          for (var c = 1; c < Kc.length; c++) {
            var d = Kc[c];
            d.blockedOn === a && (d.blockedOn = null);
          }
        }
        null !== Lc && ad(Lc, a);
        null !== Mc && ad(Mc, a);
        null !== Nc && ad(Nc, a);
        Oc.forEach(b);
        Pc.forEach(b);
        for (c = 0; c < Qc.length; c++) d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
        for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); ) Vc(c), null === c.blockedOn && Qc.shift();
      }
      var cd = ua.ReactCurrentBatchConfig;
      var dd = true;
      function ed(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 1, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function gd(a, b, c, d) {
        var e = C, f = cd.transition;
        cd.transition = null;
        try {
          C = 4, fd(a, b, c, d);
        } finally {
          C = e, cd.transition = f;
        }
      }
      function fd(a, b, c, d) {
        if (dd) {
          var e = Yc(a, b, c, d);
          if (null === e) hd(a, b, d, id, c), Sc(a, d);
          else if (Uc(e, a, b, c, d)) d.stopPropagation();
          else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
            for (; null !== e; ) {
              var f = Cb(e);
              null !== f && Ec(f);
              f = Yc(a, b, c, d);
              null === f && hd(a, b, d, id, c);
              if (f === e) break;
              e = f;
            }
            null !== e && d.stopPropagation();
          } else hd(a, b, d, null, c);
        }
      }
      var id = null;
      function Yc(a, b, c, d) {
        id = null;
        a = xb(d);
        a = Wc(a);
        if (null !== a) if (b = Vb(a), null === b) a = null;
        else if (c = b.tag, 13 === c) {
          a = Wb(b);
          if (null !== a) return a;
          a = null;
        } else if (3 === c) {
          if (b.stateNode.current.memoizedState.isDehydrated) return 3 === b.tag ? b.stateNode.containerInfo : null;
          a = null;
        } else b !== a && (a = null);
        id = a;
        return null;
      }
      function jd(a) {
        switch (a) {
          case "cancel":
          case "click":
          case "close":
          case "contextmenu":
          case "copy":
          case "cut":
          case "auxclick":
          case "dblclick":
          case "dragend":
          case "dragstart":
          case "drop":
          case "focusin":
          case "focusout":
          case "input":
          case "invalid":
          case "keydown":
          case "keypress":
          case "keyup":
          case "mousedown":
          case "mouseup":
          case "paste":
          case "pause":
          case "play":
          case "pointercancel":
          case "pointerdown":
          case "pointerup":
          case "ratechange":
          case "reset":
          case "resize":
          case "seeked":
          case "submit":
          case "touchcancel":
          case "touchend":
          case "touchstart":
          case "volumechange":
          case "change":
          case "selectionchange":
          case "textInput":
          case "compositionstart":
          case "compositionend":
          case "compositionupdate":
          case "beforeblur":
          case "afterblur":
          case "beforeinput":
          case "blur":
          case "fullscreenchange":
          case "focus":
          case "hashchange":
          case "popstate":
          case "select":
          case "selectstart":
            return 1;
          case "drag":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "mousemove":
          case "mouseout":
          case "mouseover":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "scroll":
          case "toggle":
          case "touchmove":
          case "wheel":
          case "mouseenter":
          case "mouseleave":
          case "pointerenter":
          case "pointerleave":
            return 4;
          case "message":
            switch (ec()) {
              case fc:
                return 1;
              case gc:
                return 4;
              case hc:
              case ic:
                return 16;
              case jc:
                return 536870912;
              default:
                return 16;
            }
          default:
            return 16;
        }
      }
      var kd = null;
      var ld = null;
      var md = null;
      function nd() {
        if (md) return md;
        var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f = e.length;
        for (a = 0; a < c && b[a] === e[a]; a++) ;
        var g = c - a;
        for (d = 1; d <= g && b[c - d] === e[f - d]; d++) ;
        return md = e.slice(a, 1 < d ? 1 - d : void 0);
      }
      function od(a) {
        var b = a.keyCode;
        "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
        10 === a && (a = 13);
        return 32 <= a || 13 === a ? a : 0;
      }
      function pd() {
        return true;
      }
      function qd() {
        return false;
      }
      function rd(a) {
        function b(b2, d, e, f, g) {
          this._reactName = b2;
          this._targetInst = e;
          this.type = d;
          this.nativeEvent = f;
          this.target = g;
          this.currentTarget = null;
          for (var c in a) a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f) : f[c]);
          this.isDefaultPrevented = (null != f.defaultPrevented ? f.defaultPrevented : false === f.returnValue) ? pd : qd;
          this.isPropagationStopped = qd;
          return this;
        }
        A(b.prototype, { preventDefault: function() {
          this.defaultPrevented = true;
          var a2 = this.nativeEvent;
          a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
        }, stopPropagation: function() {
          var a2 = this.nativeEvent;
          a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
        }, persist: function() {
        }, isPersistent: pd });
        return b;
      }
      var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
        return a.timeStamp || Date.now();
      }, defaultPrevented: 0, isTrusted: 0 };
      var td = rd(sd);
      var ud = A({}, sd, { view: 0, detail: 0 });
      var vd = rd(ud);
      var wd;
      var xd;
      var yd;
      var Ad = A({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
        return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
      }, movementX: function(a) {
        if ("movementX" in a) return a.movementX;
        a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
        return wd;
      }, movementY: function(a) {
        return "movementY" in a ? a.movementY : xd;
      } });
      var Bd = rd(Ad);
      var Cd = A({}, Ad, { dataTransfer: 0 });
      var Dd = rd(Cd);
      var Ed = A({}, ud, { relatedTarget: 0 });
      var Fd = rd(Ed);
      var Gd = A({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Hd = rd(Gd);
      var Id = A({}, sd, { clipboardData: function(a) {
        return "clipboardData" in a ? a.clipboardData : window.clipboardData;
      } });
      var Jd = rd(Id);
      var Kd = A({}, sd, { data: 0 });
      var Ld = rd(Kd);
      var Md = {
        Esc: "Escape",
        Spacebar: " ",
        Left: "ArrowLeft",
        Up: "ArrowUp",
        Right: "ArrowRight",
        Down: "ArrowDown",
        Del: "Delete",
        Win: "OS",
        Menu: "ContextMenu",
        Apps: "ContextMenu",
        Scroll: "ScrollLock",
        MozPrintableKey: "Unidentified"
      };
      var Nd = {
        8: "Backspace",
        9: "Tab",
        12: "Clear",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        19: "Pause",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        45: "Insert",
        46: "Delete",
        112: "F1",
        113: "F2",
        114: "F3",
        115: "F4",
        116: "F5",
        117: "F6",
        118: "F7",
        119: "F8",
        120: "F9",
        121: "F10",
        122: "F11",
        123: "F12",
        144: "NumLock",
        145: "ScrollLock",
        224: "Meta"
      };
      var Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
      function Pd(a) {
        var b = this.nativeEvent;
        return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
      }
      function zd() {
        return Pd;
      }
      var Qd = A({}, ud, { key: function(a) {
        if (a.key) {
          var b = Md[a.key] || a.key;
          if ("Unidentified" !== b) return b;
        }
        return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
      }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
        return "keypress" === a.type ? od(a) : 0;
      }, keyCode: function(a) {
        return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      }, which: function(a) {
        return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
      } });
      var Rd = rd(Qd);
      var Sd = A({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 });
      var Td = rd(Sd);
      var Ud = A({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd });
      var Vd = rd(Ud);
      var Wd = A({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 });
      var Xd = rd(Wd);
      var Yd = A({}, Ad, {
        deltaX: function(a) {
          return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
        },
        deltaY: function(a) {
          return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
        },
        deltaZ: 0,
        deltaMode: 0
      });
      var Zd = rd(Yd);
      var $d = [9, 13, 27, 32];
      var ae = ia && "CompositionEvent" in window;
      var be = null;
      ia && "documentMode" in document && (be = document.documentMode);
      var ce = ia && "TextEvent" in window && !be;
      var de = ia && (!ae || be && 8 < be && 11 >= be);
      var ee = String.fromCharCode(32);
      var fe = false;
      function ge(a, b) {
        switch (a) {
          case "keyup":
            return -1 !== $d.indexOf(b.keyCode);
          case "keydown":
            return 229 !== b.keyCode;
          case "keypress":
          case "mousedown":
          case "focusout":
            return true;
          default:
            return false;
        }
      }
      function he(a) {
        a = a.detail;
        return "object" === typeof a && "data" in a ? a.data : null;
      }
      var ie = false;
      function je(a, b) {
        switch (a) {
          case "compositionend":
            return he(b);
          case "keypress":
            if (32 !== b.which) return null;
            fe = true;
            return ee;
          case "textInput":
            return a = b.data, a === ee && fe ? null : a;
          default:
            return null;
        }
      }
      function ke(a, b) {
        if (ie) return "compositionend" === a || !ae && ge(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
        switch (a) {
          case "paste":
            return null;
          case "keypress":
            if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
              if (b.char && 1 < b.char.length) return b.char;
              if (b.which) return String.fromCharCode(b.which);
            }
            return null;
          case "compositionend":
            return de && "ko" !== b.locale ? null : b.data;
          default:
            return null;
        }
      }
      var le = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
      function me(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return "input" === b ? !!le[a.type] : "textarea" === b ? true : false;
      }
      function ne(a, b, c, d) {
        Eb(d);
        b = oe(b, "onChange");
        0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
      }
      var pe = null;
      var qe = null;
      function re2(a) {
        se(a, 0);
      }
      function te(a) {
        var b = ue(a);
        if (Wa(b)) return a;
      }
      function ve(a, b) {
        if ("change" === a) return b;
      }
      var we = false;
      if (ia) {
        if (ia) {
          ye = "oninput" in document;
          if (!ye) {
            ze = document.createElement("div");
            ze.setAttribute("oninput", "return;");
            ye = "function" === typeof ze.oninput;
          }
          xe = ye;
        } else xe = false;
        we = xe && (!document.documentMode || 9 < document.documentMode);
      }
      var xe;
      var ye;
      var ze;
      function Ae() {
        pe && (pe.detachEvent("onpropertychange", Be), qe = pe = null);
      }
      function Be(a) {
        if ("value" === a.propertyName && te(qe)) {
          var b = [];
          ne(b, qe, a, xb(a));
          Jb(re2, b);
        }
      }
      function Ce(a, b, c) {
        "focusin" === a ? (Ae(), pe = b, qe = c, pe.attachEvent("onpropertychange", Be)) : "focusout" === a && Ae();
      }
      function De(a) {
        if ("selectionchange" === a || "keyup" === a || "keydown" === a) return te(qe);
      }
      function Ee(a, b) {
        if ("click" === a) return te(b);
      }
      function Fe(a, b) {
        if ("input" === a || "change" === a) return te(b);
      }
      function Ge(a, b) {
        return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
      }
      var He = "function" === typeof Object.is ? Object.is : Ge;
      function Ie(a, b) {
        if (He(a, b)) return true;
        if ("object" !== typeof a || null === a || "object" !== typeof b || null === b) return false;
        var c = Object.keys(a), d = Object.keys(b);
        if (c.length !== d.length) return false;
        for (d = 0; d < c.length; d++) {
          var e = c[d];
          if (!ja.call(b, e) || !He(a[e], b[e])) return false;
        }
        return true;
      }
      function Je(a) {
        for (; a && a.firstChild; ) a = a.firstChild;
        return a;
      }
      function Ke(a, b) {
        var c = Je(a);
        a = 0;
        for (var d; c; ) {
          if (3 === c.nodeType) {
            d = a + c.textContent.length;
            if (a <= b && d >= b) return { node: c, offset: b - a };
            a = d;
          }
          a: {
            for (; c; ) {
              if (c.nextSibling) {
                c = c.nextSibling;
                break a;
              }
              c = c.parentNode;
            }
            c = void 0;
          }
          c = Je(c);
        }
      }
      function Le(a, b) {
        return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
      }
      function Me() {
        for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
          try {
            var c = "string" === typeof b.contentWindow.location.href;
          } catch (d) {
            c = false;
          }
          if (c) a = b.contentWindow;
          else break;
          b = Xa(a.document);
        }
        return b;
      }
      function Ne(a) {
        var b = a && a.nodeName && a.nodeName.toLowerCase();
        return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
      }
      function Oe(a) {
        var b = Me(), c = a.focusedElem, d = a.selectionRange;
        if (b !== c && c && c.ownerDocument && Le(c.ownerDocument.documentElement, c)) {
          if (null !== d && Ne(c)) {
            if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c) c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
            else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
              a = a.getSelection();
              var e = c.textContent.length, f = Math.min(d.start, e);
              d = void 0 === d.end ? f : Math.min(d.end, e);
              !a.extend && f > d && (e = d, d = f, f = e);
              e = Ke(c, f);
              var g = Ke(
                c,
                d
              );
              e && g && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g.node || a.focusOffset !== g.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f > d ? (a.addRange(b), a.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), a.addRange(b)));
            }
          }
          b = [];
          for (a = c; a = a.parentNode; ) 1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
          "function" === typeof c.focus && c.focus();
          for (c = 0; c < b.length; c++) a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
        }
      }
      var Pe = ia && "documentMode" in document && 11 >= document.documentMode;
      var Qe = null;
      var Re = null;
      var Se = null;
      var Te = false;
      function Ue(a, b, c) {
        var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
        Te || null == Qe || Qe !== Xa(d) || (d = Qe, "selectionStart" in d && Ne(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se && Ie(Se, d) || (Se = d, d = oe(Re, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe)));
      }
      function Ve(a, b) {
        var c = {};
        c[a.toLowerCase()] = b.toLowerCase();
        c["Webkit" + a] = "webkit" + b;
        c["Moz" + a] = "moz" + b;
        return c;
      }
      var We = { animationend: Ve("Animation", "AnimationEnd"), animationiteration: Ve("Animation", "AnimationIteration"), animationstart: Ve("Animation", "AnimationStart"), transitionend: Ve("Transition", "TransitionEnd") };
      var Xe = {};
      var Ye = {};
      ia && (Ye = document.createElement("div").style, "AnimationEvent" in window || (delete We.animationend.animation, delete We.animationiteration.animation, delete We.animationstart.animation), "TransitionEvent" in window || delete We.transitionend.transition);
      function Ze(a) {
        if (Xe[a]) return Xe[a];
        if (!We[a]) return a;
        var b = We[a], c;
        for (c in b) if (b.hasOwnProperty(c) && c in Ye) return Xe[a] = b[c];
        return a;
      }
      var $e = Ze("animationend");
      var af = Ze("animationiteration");
      var bf = Ze("animationstart");
      var cf = Ze("transitionend");
      var df = /* @__PURE__ */ new Map();
      var ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
      function ff(a, b) {
        df.set(a, b);
        fa(b, [a]);
      }
      for (gf = 0; gf < ef.length; gf++) {
        hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
        ff(jf, "on" + kf);
      }
      var hf;
      var jf;
      var kf;
      var gf;
      ff($e, "onAnimationEnd");
      ff(af, "onAnimationIteration");
      ff(bf, "onAnimationStart");
      ff("dblclick", "onDoubleClick");
      ff("focusin", "onFocus");
      ff("focusout", "onBlur");
      ff(cf, "onTransitionEnd");
      ha("onMouseEnter", ["mouseout", "mouseover"]);
      ha("onMouseLeave", ["mouseout", "mouseover"]);
      ha("onPointerEnter", ["pointerout", "pointerover"]);
      ha("onPointerLeave", ["pointerout", "pointerover"]);
      fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
      fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
      fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
      fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
      fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
      var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" ");
      var mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
      function nf(a, b, c) {
        var d = a.type || "unknown-event";
        a.currentTarget = c;
        Ub(d, b, void 0, a);
        a.currentTarget = null;
      }
      function se(a, b) {
        b = 0 !== (b & 4);
        for (var c = 0; c < a.length; c++) {
          var d = a[c], e = d.event;
          d = d.listeners;
          a: {
            var f = void 0;
            if (b) for (var g = d.length - 1; 0 <= g; g--) {
              var h = d[g], k = h.instance, l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
            else for (g = 0; g < d.length; g++) {
              h = d[g];
              k = h.instance;
              l = h.currentTarget;
              h = h.listener;
              if (k !== f && e.isPropagationStopped()) break a;
              nf(e, h, l);
              f = k;
            }
          }
        }
        if (Qb) throw a = Rb, Qb = false, Rb = null, a;
      }
      function D(a, b) {
        var c = b[of];
        void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
        var d = a + "__bubble";
        c.has(d) || (pf(b, a, 2, false), c.add(d));
      }
      function qf(a, b, c) {
        var d = 0;
        b && (d |= 4);
        pf(c, a, d, b);
      }
      var rf = "_reactListening" + Math.random().toString(36).slice(2);
      function sf(a) {
        if (!a[rf]) {
          a[rf] = true;
          da.forEach(function(b2) {
            "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
          });
          var b = 9 === a.nodeType ? a : a.ownerDocument;
          null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
        }
      }
      function pf(a, b, c, d) {
        switch (jd(b)) {
          case 1:
            var e = ed;
            break;
          case 4:
            e = gd;
            break;
          default:
            e = fd;
        }
        c = e.bind(null, b, c, a);
        e = void 0;
        !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
        d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
      }
      function hd(a, b, c, d, e) {
        var f = d;
        if (0 === (b & 1) && 0 === (b & 2) && null !== d) a: for (; ; ) {
          if (null === d) return;
          var g = d.tag;
          if (3 === g || 4 === g) {
            var h = d.stateNode.containerInfo;
            if (h === e || 8 === h.nodeType && h.parentNode === e) break;
            if (4 === g) for (g = d.return; null !== g; ) {
              var k = g.tag;
              if (3 === k || 4 === k) {
                if (k = g.stateNode.containerInfo, k === e || 8 === k.nodeType && k.parentNode === e) return;
              }
              g = g.return;
            }
            for (; null !== h; ) {
              g = Wc(h);
              if (null === g) return;
              k = g.tag;
              if (5 === k || 6 === k) {
                d = f = g;
                continue a;
              }
              h = h.parentNode;
            }
          }
          d = d.return;
        }
        Jb(function() {
          var d2 = f, e2 = xb(c), g2 = [];
          a: {
            var h2 = df.get(a);
            if (void 0 !== h2) {
              var k2 = td, n = a;
              switch (a) {
                case "keypress":
                  if (0 === od(c)) break a;
                case "keydown":
                case "keyup":
                  k2 = Rd;
                  break;
                case "focusin":
                  n = "focus";
                  k2 = Fd;
                  break;
                case "focusout":
                  n = "blur";
                  k2 = Fd;
                  break;
                case "beforeblur":
                case "afterblur":
                  k2 = Fd;
                  break;
                case "click":
                  if (2 === c.button) break a;
                case "auxclick":
                case "dblclick":
                case "mousedown":
                case "mousemove":
                case "mouseup":
                case "mouseout":
                case "mouseover":
                case "contextmenu":
                  k2 = Bd;
                  break;
                case "drag":
                case "dragend":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "dragstart":
                case "drop":
                  k2 = Dd;
                  break;
                case "touchcancel":
                case "touchend":
                case "touchmove":
                case "touchstart":
                  k2 = Vd;
                  break;
                case $e:
                case af:
                case bf:
                  k2 = Hd;
                  break;
                case cf:
                  k2 = Xd;
                  break;
                case "scroll":
                  k2 = vd;
                  break;
                case "wheel":
                  k2 = Zd;
                  break;
                case "copy":
                case "cut":
                case "paste":
                  k2 = Jd;
                  break;
                case "gotpointercapture":
                case "lostpointercapture":
                case "pointercancel":
                case "pointerdown":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "pointerup":
                  k2 = Td;
              }
              var t = 0 !== (b & 4), J = !t && "scroll" === a, x = t ? null !== h2 ? h2 + "Capture" : null : h2;
              t = [];
              for (var w = d2, u; null !== w; ) {
                u = w;
                var F = u.stateNode;
                5 === u.tag && null !== F && (u = F, null !== x && (F = Kb(w, x), null != F && t.push(tf(w, F, u))));
                if (J) break;
                w = w.return;
              }
              0 < t.length && (h2 = new k2(h2, n, null, c, e2), g2.push({ event: h2, listeners: t }));
            }
          }
          if (0 === (b & 7)) {
            a: {
              h2 = "mouseover" === a || "pointerover" === a;
              k2 = "mouseout" === a || "pointerout" === a;
              if (h2 && c !== wb && (n = c.relatedTarget || c.fromElement) && (Wc(n) || n[uf])) break a;
              if (k2 || h2) {
                h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
                if (k2) {
                  if (n = c.relatedTarget || c.toElement, k2 = d2, n = n ? Wc(n) : null, null !== n && (J = Vb(n), n !== J || 5 !== n.tag && 6 !== n.tag)) n = null;
                } else k2 = null, n = d2;
                if (k2 !== n) {
                  t = Bd;
                  F = "onMouseLeave";
                  x = "onMouseEnter";
                  w = "mouse";
                  if ("pointerout" === a || "pointerover" === a) t = Td, F = "onPointerLeave", x = "onPointerEnter", w = "pointer";
                  J = null == k2 ? h2 : ue(k2);
                  u = null == n ? h2 : ue(n);
                  h2 = new t(F, w + "leave", k2, c, e2);
                  h2.target = J;
                  h2.relatedTarget = u;
                  F = null;
                  Wc(e2) === d2 && (t = new t(x, w + "enter", n, c, e2), t.target = u, t.relatedTarget = J, F = t);
                  J = F;
                  if (k2 && n) b: {
                    t = k2;
                    x = n;
                    w = 0;
                    for (u = t; u; u = vf(u)) w++;
                    u = 0;
                    for (F = x; F; F = vf(F)) u++;
                    for (; 0 < w - u; ) t = vf(t), w--;
                    for (; 0 < u - w; ) x = vf(x), u--;
                    for (; w--; ) {
                      if (t === x || null !== x && t === x.alternate) break b;
                      t = vf(t);
                      x = vf(x);
                    }
                    t = null;
                  }
                  else t = null;
                  null !== k2 && wf(g2, h2, k2, t, false);
                  null !== n && null !== J && wf(g2, J, n, t, true);
                }
              }
            }
            a: {
              h2 = d2 ? ue(d2) : window;
              k2 = h2.nodeName && h2.nodeName.toLowerCase();
              if ("select" === k2 || "input" === k2 && "file" === h2.type) var na = ve;
              else if (me(h2)) if (we) na = Fe;
              else {
                na = De;
                var xa = Ce;
              }
              else (k2 = h2.nodeName) && "input" === k2.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee);
              if (na && (na = na(a, d2))) {
                ne(g2, na, c, e2);
                break a;
              }
              xa && xa(a, h2, d2);
              "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
            }
            xa = d2 ? ue(d2) : window;
            switch (a) {
              case "focusin":
                if (me(xa) || "true" === xa.contentEditable) Qe = xa, Re = d2, Se = null;
                break;
              case "focusout":
                Se = Re = Qe = null;
                break;
              case "mousedown":
                Te = true;
                break;
              case "contextmenu":
              case "mouseup":
              case "dragend":
                Te = false;
                Ue(g2, c, e2);
                break;
              case "selectionchange":
                if (Pe) break;
              case "keydown":
              case "keyup":
                Ue(g2, c, e2);
            }
            var $a;
            if (ae) b: {
              switch (a) {
                case "compositionstart":
                  var ba = "onCompositionStart";
                  break b;
                case "compositionend":
                  ba = "onCompositionEnd";
                  break b;
                case "compositionupdate":
                  ba = "onCompositionUpdate";
                  break b;
              }
              ba = void 0;
            }
            else ie ? ge(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
            ba && (de && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g2.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he(c), null !== $a && (ba.data = $a))));
            if ($a = ce ? je(a, c) : ke(a, c)) d2 = oe(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g2.push({ event: e2, listeners: d2 }), e2.data = $a);
          }
          se(g2, b);
        });
      }
      function tf(a, b, c) {
        return { instance: a, listener: b, currentTarget: c };
      }
      function oe(a, b) {
        for (var c = b + "Capture", d = []; null !== a; ) {
          var e = a, f = e.stateNode;
          5 === e.tag && null !== f && (e = f, f = Kb(a, c), null != f && d.unshift(tf(a, f, e)), f = Kb(a, b), null != f && d.push(tf(a, f, e)));
          a = a.return;
        }
        return d;
      }
      function vf(a) {
        if (null === a) return null;
        do
          a = a.return;
        while (a && 5 !== a.tag);
        return a ? a : null;
      }
      function wf(a, b, c, d, e) {
        for (var f = b._reactName, g = []; null !== c && c !== d; ) {
          var h = c, k = h.alternate, l = h.stateNode;
          if (null !== k && k === d) break;
          5 === h.tag && null !== l && (h = l, e ? (k = Kb(c, f), null != k && g.unshift(tf(c, k, h))) : e || (k = Kb(c, f), null != k && g.push(tf(c, k, h))));
          c = c.return;
        }
        0 !== g.length && a.push({ event: b, listeners: g });
      }
      var xf = /\r\n?/g;
      var yf = /\u0000|\uFFFD/g;
      function zf(a) {
        return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
      }
      function Af(a, b, c) {
        b = zf(b);
        if (zf(a) !== b && c) throw Error(p(425));
      }
      function Bf() {
      }
      var Cf = null;
      var Df = null;
      function Ef(a, b) {
        return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
      }
      var Ff = "function" === typeof setTimeout ? setTimeout : void 0;
      var Gf = "function" === typeof clearTimeout ? clearTimeout : void 0;
      var Hf = "function" === typeof Promise ? Promise : void 0;
      var Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
        return Hf.resolve(null).then(a).catch(If);
      } : Ff;
      function If(a) {
        setTimeout(function() {
          throw a;
        });
      }
      function Kf(a, b) {
        var c = b, d = 0;
        do {
          var e = c.nextSibling;
          a.removeChild(c);
          if (e && 8 === e.nodeType) if (c = e.data, "/$" === c) {
            if (0 === d) {
              a.removeChild(e);
              bd(b);
              return;
            }
            d--;
          } else "$" !== c && "$?" !== c && "$!" !== c || d++;
          c = e;
        } while (c);
        bd(b);
      }
      function Lf(a) {
        for (; null != a; a = a.nextSibling) {
          var b = a.nodeType;
          if (1 === b || 3 === b) break;
          if (8 === b) {
            b = a.data;
            if ("$" === b || "$!" === b || "$?" === b) break;
            if ("/$" === b) return null;
          }
        }
        return a;
      }
      function Mf(a) {
        a = a.previousSibling;
        for (var b = 0; a; ) {
          if (8 === a.nodeType) {
            var c = a.data;
            if ("$" === c || "$!" === c || "$?" === c) {
              if (0 === b) return a;
              b--;
            } else "/$" === c && b++;
          }
          a = a.previousSibling;
        }
        return null;
      }
      var Nf = Math.random().toString(36).slice(2);
      var Of = "__reactFiber$" + Nf;
      var Pf = "__reactProps$" + Nf;
      var uf = "__reactContainer$" + Nf;
      var of = "__reactEvents$" + Nf;
      var Qf = "__reactListeners$" + Nf;
      var Rf = "__reactHandles$" + Nf;
      function Wc(a) {
        var b = a[Of];
        if (b) return b;
        for (var c = a.parentNode; c; ) {
          if (b = c[uf] || c[Of]) {
            c = b.alternate;
            if (null !== b.child || null !== c && null !== c.child) for (a = Mf(a); null !== a; ) {
              if (c = a[Of]) return c;
              a = Mf(a);
            }
            return b;
          }
          a = c;
          c = a.parentNode;
        }
        return null;
      }
      function Cb(a) {
        a = a[Of] || a[uf];
        return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
      }
      function ue(a) {
        if (5 === a.tag || 6 === a.tag) return a.stateNode;
        throw Error(p(33));
      }
      function Db(a) {
        return a[Pf] || null;
      }
      var Sf = [];
      var Tf = -1;
      function Uf(a) {
        return { current: a };
      }
      function E(a) {
        0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
      }
      function G(a, b) {
        Tf++;
        Sf[Tf] = a.current;
        a.current = b;
      }
      var Vf = {};
      var H = Uf(Vf);
      var Wf = Uf(false);
      var Xf = Vf;
      function Yf(a, b) {
        var c = a.type.contextTypes;
        if (!c) return Vf;
        var d = a.stateNode;
        if (d && d.__reactInternalMemoizedUnmaskedChildContext === b) return d.__reactInternalMemoizedMaskedChildContext;
        var e = {}, f;
        for (f in c) e[f] = b[f];
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
        return e;
      }
      function Zf(a) {
        a = a.childContextTypes;
        return null !== a && void 0 !== a;
      }
      function $f() {
        E(Wf);
        E(H);
      }
      function ag(a, b, c) {
        if (H.current !== Vf) throw Error(p(168));
        G(H, b);
        G(Wf, c);
      }
      function bg(a, b, c) {
        var d = a.stateNode;
        b = b.childContextTypes;
        if ("function" !== typeof d.getChildContext) return c;
        d = d.getChildContext();
        for (var e in d) if (!(e in b)) throw Error(p(108, Ra(a) || "Unknown", e));
        return A({}, c, d);
      }
      function cg(a) {
        a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
        Xf = H.current;
        G(H, a);
        G(Wf, Wf.current);
        return true;
      }
      function dg(a, b, c) {
        var d = a.stateNode;
        if (!d) throw Error(p(169));
        c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E(Wf), E(H), G(H, a)) : E(Wf);
        G(Wf, c);
      }
      var eg = null;
      var fg = false;
      var gg = false;
      function hg(a) {
        null === eg ? eg = [a] : eg.push(a);
      }
      function ig(a) {
        fg = true;
        hg(a);
      }
      function jg() {
        if (!gg && null !== eg) {
          gg = true;
          var a = 0, b = C;
          try {
            var c = eg;
            for (C = 1; a < c.length; a++) {
              var d = c[a];
              do
                d = d(true);
              while (null !== d);
            }
            eg = null;
            fg = false;
          } catch (e) {
            throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
          } finally {
            C = b, gg = false;
          }
        }
        return null;
      }
      var kg = [];
      var lg = 0;
      var mg = null;
      var ng = 0;
      var og = [];
      var pg = 0;
      var qg = null;
      var rg = 1;
      var sg = "";
      function tg(a, b) {
        kg[lg++] = ng;
        kg[lg++] = mg;
        mg = a;
        ng = b;
      }
      function ug(a, b, c) {
        og[pg++] = rg;
        og[pg++] = sg;
        og[pg++] = qg;
        qg = a;
        var d = rg;
        a = sg;
        var e = 32 - oc(d) - 1;
        d &= ~(1 << e);
        c += 1;
        var f = 32 - oc(b) + e;
        if (30 < f) {
          var g = e - e % 5;
          f = (d & (1 << g) - 1).toString(32);
          d >>= g;
          e -= g;
          rg = 1 << 32 - oc(b) + e | c << e | d;
          sg = f + a;
        } else rg = 1 << f | c << e | d, sg = a;
      }
      function vg(a) {
        null !== a.return && (tg(a, 1), ug(a, 1, 0));
      }
      function wg(a) {
        for (; a === mg; ) mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
        for (; a === qg; ) qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
      }
      var xg = null;
      var yg = null;
      var I = false;
      var zg = null;
      function Ag(a, b) {
        var c = Bg(5, null, null, 0);
        c.elementType = "DELETED";
        c.stateNode = b;
        c.return = a;
        b = a.deletions;
        null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
      }
      function Cg(a, b) {
        switch (a.tag) {
          case 5:
            var c = a.type;
            b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
            return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
          case 6:
            return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
          case 13:
            return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
          default:
            return false;
        }
      }
      function Dg(a) {
        return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
      }
      function Eg(a) {
        if (I) {
          var b = yg;
          if (b) {
            var c = b;
            if (!Cg(a, b)) {
              if (Dg(a)) throw Error(p(418));
              b = Lf(c.nextSibling);
              var d = xg;
              b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I = false, xg = a);
            }
          } else {
            if (Dg(a)) throw Error(p(418));
            a.flags = a.flags & -4097 | 2;
            I = false;
            xg = a;
          }
        }
      }
      function Fg(a) {
        for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; ) a = a.return;
        xg = a;
      }
      function Gg(a) {
        if (a !== xg) return false;
        if (!I) return Fg(a), I = true, false;
        var b;
        (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
        if (b && (b = yg)) {
          if (Dg(a)) throw Hg(), Error(p(418));
          for (; b; ) Ag(a, b), b = Lf(b.nextSibling);
        }
        Fg(a);
        if (13 === a.tag) {
          a = a.memoizedState;
          a = null !== a ? a.dehydrated : null;
          if (!a) throw Error(p(317));
          a: {
            a = a.nextSibling;
            for (b = 0; a; ) {
              if (8 === a.nodeType) {
                var c = a.data;
                if ("/$" === c) {
                  if (0 === b) {
                    yg = Lf(a.nextSibling);
                    break a;
                  }
                  b--;
                } else "$" !== c && "$!" !== c && "$?" !== c || b++;
              }
              a = a.nextSibling;
            }
            yg = null;
          }
        } else yg = xg ? Lf(a.stateNode.nextSibling) : null;
        return true;
      }
      function Hg() {
        for (var a = yg; a; ) a = Lf(a.nextSibling);
      }
      function Ig() {
        yg = xg = null;
        I = false;
      }
      function Jg(a) {
        null === zg ? zg = [a] : zg.push(a);
      }
      var Kg = ua.ReactCurrentBatchConfig;
      function Lg(a, b, c) {
        a = c.ref;
        if (null !== a && "function" !== typeof a && "object" !== typeof a) {
          if (c._owner) {
            c = c._owner;
            if (c) {
              if (1 !== c.tag) throw Error(p(309));
              var d = c.stateNode;
            }
            if (!d) throw Error(p(147, a));
            var e = d, f = "" + a;
            if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f) return b.ref;
            b = function(a2) {
              var b2 = e.refs;
              null === a2 ? delete b2[f] : b2[f] = a2;
            };
            b._stringRef = f;
            return b;
          }
          if ("string" !== typeof a) throw Error(p(284));
          if (!c._owner) throw Error(p(290, a));
        }
        return a;
      }
      function Mg(a, b) {
        a = Object.prototype.toString.call(b);
        throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
      }
      function Ng(a) {
        var b = a._init;
        return b(a._payload);
      }
      function Og(a) {
        function b(b2, c2) {
          if (a) {
            var d2 = b2.deletions;
            null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
          }
        }
        function c(c2, d2) {
          if (!a) return null;
          for (; null !== d2; ) b(c2, d2), d2 = d2.sibling;
          return null;
        }
        function d(a2, b2) {
          for (a2 = /* @__PURE__ */ new Map(); null !== b2; ) null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
          return a2;
        }
        function e(a2, b2) {
          a2 = Pg(a2, b2);
          a2.index = 0;
          a2.sibling = null;
          return a2;
        }
        function f(b2, c2, d2) {
          b2.index = d2;
          if (!a) return b2.flags |= 1048576, c2;
          d2 = b2.alternate;
          if (null !== d2) return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
          b2.flags |= 2;
          return c2;
        }
        function g(b2) {
          a && null === b2.alternate && (b2.flags |= 2);
          return b2;
        }
        function h(a2, b2, c2, d2) {
          if (null === b2 || 6 !== b2.tag) return b2 = Qg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function k(a2, b2, c2, d2) {
          var f2 = c2.type;
          if (f2 === ya) return m(a2, b2, c2.props.children, d2, c2.key);
          if (null !== b2 && (b2.elementType === f2 || "object" === typeof f2 && null !== f2 && f2.$$typeof === Ha && Ng(f2) === b2.type)) return d2 = e(b2, c2.props), d2.ref = Lg(a2, b2, c2), d2.return = a2, d2;
          d2 = Rg(c2.type, c2.key, c2.props, null, a2.mode, d2);
          d2.ref = Lg(a2, b2, c2);
          d2.return = a2;
          return d2;
        }
        function l(a2, b2, c2, d2) {
          if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation) return b2 = Sg(c2, a2.mode, d2), b2.return = a2, b2;
          b2 = e(b2, c2.children || []);
          b2.return = a2;
          return b2;
        }
        function m(a2, b2, c2, d2, f2) {
          if (null === b2 || 7 !== b2.tag) return b2 = Tg(c2, a2.mode, d2, f2), b2.return = a2, b2;
          b2 = e(b2, c2);
          b2.return = a2;
          return b2;
        }
        function q(a2, b2, c2) {
          if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2) return b2 = Qg("" + b2, a2.mode, c2), b2.return = a2, b2;
          if ("object" === typeof b2 && null !== b2) {
            switch (b2.$$typeof) {
              case va:
                return c2 = Rg(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = Lg(a2, null, b2), c2.return = a2, c2;
              case wa:
                return b2 = Sg(b2, a2.mode, c2), b2.return = a2, b2;
              case Ha:
                var d2 = b2._init;
                return q(a2, d2(b2._payload), c2);
            }
            if (eb(b2) || Ka(b2)) return b2 = Tg(b2, a2.mode, c2, null), b2.return = a2, b2;
            Mg(a2, b2);
          }
          return null;
        }
        function r(a2, b2, c2, d2) {
          var e2 = null !== b2 ? b2.key : null;
          if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2) return null !== e2 ? null : h(a2, b2, "" + c2, d2);
          if ("object" === typeof c2 && null !== c2) {
            switch (c2.$$typeof) {
              case va:
                return c2.key === e2 ? k(a2, b2, c2, d2) : null;
              case wa:
                return c2.key === e2 ? l(a2, b2, c2, d2) : null;
              case Ha:
                return e2 = c2._init, r(
                  a2,
                  b2,
                  e2(c2._payload),
                  d2
                );
            }
            if (eb(c2) || Ka(c2)) return null !== e2 ? null : m(a2, b2, c2, d2, null);
            Mg(a2, c2);
          }
          return null;
        }
        function y(a2, b2, c2, d2, e2) {
          if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2) return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
          if ("object" === typeof d2 && null !== d2) {
            switch (d2.$$typeof) {
              case va:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k(b2, a2, d2, e2);
              case wa:
                return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l(b2, a2, d2, e2);
              case Ha:
                var f2 = d2._init;
                return y(a2, b2, c2, f2(d2._payload), e2);
            }
            if (eb(d2) || Ka(d2)) return a2 = a2.get(c2) || null, m(b2, a2, d2, e2, null);
            Mg(b2, d2);
          }
          return null;
        }
        function n(e2, g2, h2, k2) {
          for (var l2 = null, m2 = null, u = g2, w = g2 = 0, x = null; null !== u && w < h2.length; w++) {
            u.index > w ? (x = u, u = null) : x = u.sibling;
            var n2 = r(e2, u, h2[w], k2);
            if (null === n2) {
              null === u && (u = x);
              break;
            }
            a && u && null === n2.alternate && b(e2, u);
            g2 = f(n2, g2, w);
            null === m2 ? l2 = n2 : m2.sibling = n2;
            m2 = n2;
            u = x;
          }
          if (w === h2.length) return c(e2, u), I && tg(e2, w), l2;
          if (null === u) {
            for (; w < h2.length; w++) u = q(e2, h2[w], k2), null !== u && (g2 = f(u, g2, w), null === m2 ? l2 = u : m2.sibling = u, m2 = u);
            I && tg(e2, w);
            return l2;
          }
          for (u = d(e2, u); w < h2.length; w++) x = y(u, e2, w, h2[w], k2), null !== x && (a && null !== x.alternate && u.delete(null === x.key ? w : x.key), g2 = f(x, g2, w), null === m2 ? l2 = x : m2.sibling = x, m2 = x);
          a && u.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function t(e2, g2, h2, k2) {
          var l2 = Ka(h2);
          if ("function" !== typeof l2) throw Error(p(150));
          h2 = l2.call(h2);
          if (null == h2) throw Error(p(151));
          for (var u = l2 = null, m2 = g2, w = g2 = 0, x = null, n2 = h2.next(); null !== m2 && !n2.done; w++, n2 = h2.next()) {
            m2.index > w ? (x = m2, m2 = null) : x = m2.sibling;
            var t2 = r(e2, m2, n2.value, k2);
            if (null === t2) {
              null === m2 && (m2 = x);
              break;
            }
            a && m2 && null === t2.alternate && b(e2, m2);
            g2 = f(t2, g2, w);
            null === u ? l2 = t2 : u.sibling = t2;
            u = t2;
            m2 = x;
          }
          if (n2.done) return c(
            e2,
            m2
          ), I && tg(e2, w), l2;
          if (null === m2) {
            for (; !n2.done; w++, n2 = h2.next()) n2 = q(e2, n2.value, k2), null !== n2 && (g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
            I && tg(e2, w);
            return l2;
          }
          for (m2 = d(e2, m2); !n2.done; w++, n2 = h2.next()) n2 = y(m2, e2, w, n2.value, k2), null !== n2 && (a && null !== n2.alternate && m2.delete(null === n2.key ? w : n2.key), g2 = f(n2, g2, w), null === u ? l2 = n2 : u.sibling = n2, u = n2);
          a && m2.forEach(function(a2) {
            return b(e2, a2);
          });
          I && tg(e2, w);
          return l2;
        }
        function J(a2, d2, f2, h2) {
          "object" === typeof f2 && null !== f2 && f2.type === ya && null === f2.key && (f2 = f2.props.children);
          if ("object" === typeof f2 && null !== f2) {
            switch (f2.$$typeof) {
              case va:
                a: {
                  for (var k2 = f2.key, l2 = d2; null !== l2; ) {
                    if (l2.key === k2) {
                      k2 = f2.type;
                      if (k2 === ya) {
                        if (7 === l2.tag) {
                          c(a2, l2.sibling);
                          d2 = e(l2, f2.props.children);
                          d2.return = a2;
                          a2 = d2;
                          break a;
                        }
                      } else if (l2.elementType === k2 || "object" === typeof k2 && null !== k2 && k2.$$typeof === Ha && Ng(k2) === l2.type) {
                        c(a2, l2.sibling);
                        d2 = e(l2, f2.props);
                        d2.ref = Lg(a2, l2, f2);
                        d2.return = a2;
                        a2 = d2;
                        break a;
                      }
                      c(a2, l2);
                      break;
                    } else b(a2, l2);
                    l2 = l2.sibling;
                  }
                  f2.type === ya ? (d2 = Tg(f2.props.children, a2.mode, h2, f2.key), d2.return = a2, a2 = d2) : (h2 = Rg(f2.type, f2.key, f2.props, null, a2.mode, h2), h2.ref = Lg(a2, d2, f2), h2.return = a2, a2 = h2);
                }
                return g(a2);
              case wa:
                a: {
                  for (l2 = f2.key; null !== d2; ) {
                    if (d2.key === l2) if (4 === d2.tag && d2.stateNode.containerInfo === f2.containerInfo && d2.stateNode.implementation === f2.implementation) {
                      c(a2, d2.sibling);
                      d2 = e(d2, f2.children || []);
                      d2.return = a2;
                      a2 = d2;
                      break a;
                    } else {
                      c(a2, d2);
                      break;
                    }
                    else b(a2, d2);
                    d2 = d2.sibling;
                  }
                  d2 = Sg(f2, a2.mode, h2);
                  d2.return = a2;
                  a2 = d2;
                }
                return g(a2);
              case Ha:
                return l2 = f2._init, J(a2, d2, l2(f2._payload), h2);
            }
            if (eb(f2)) return n(a2, d2, f2, h2);
            if (Ka(f2)) return t(a2, d2, f2, h2);
            Mg(a2, f2);
          }
          return "string" === typeof f2 && "" !== f2 || "number" === typeof f2 ? (f2 = "" + f2, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f2), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = Qg(f2, a2.mode, h2), d2.return = a2, a2 = d2), g(a2)) : c(a2, d2);
        }
        return J;
      }
      var Ug = Og(true);
      var Vg = Og(false);
      var Wg = Uf(null);
      var Xg = null;
      var Yg = null;
      var Zg = null;
      function $g() {
        Zg = Yg = Xg = null;
      }
      function ah(a) {
        var b = Wg.current;
        E(Wg);
        a._currentValue = b;
      }
      function bh(a, b, c) {
        for (; null !== a; ) {
          var d = a.alternate;
          (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
          if (a === c) break;
          a = a.return;
        }
      }
      function ch(a, b) {
        Xg = a;
        Zg = Yg = null;
        a = a.dependencies;
        null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (dh = true), a.firstContext = null);
      }
      function eh(a) {
        var b = a._currentValue;
        if (Zg !== a) if (a = { context: a, memoizedValue: b, next: null }, null === Yg) {
          if (null === Xg) throw Error(p(308));
          Yg = a;
          Xg.dependencies = { lanes: 0, firstContext: a };
        } else Yg = Yg.next = a;
        return b;
      }
      var fh = null;
      function gh(a) {
        null === fh ? fh = [a] : fh.push(a);
      }
      function hh(a, b, c, d) {
        var e = b.interleaved;
        null === e ? (c.next = c, gh(b)) : (c.next = e.next, e.next = c);
        b.interleaved = c;
        return ih(a, d);
      }
      function ih(a, b) {
        a.lanes |= b;
        var c = a.alternate;
        null !== c && (c.lanes |= b);
        c = a;
        for (a = a.return; null !== a; ) a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
        return 3 === c.tag ? c.stateNode : null;
      }
      var jh = false;
      function kh(a) {
        a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
      }
      function lh(a, b) {
        a = a.updateQueue;
        b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
      }
      function mh(a, b) {
        return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
      }
      function nh(a, b, c) {
        var d = a.updateQueue;
        if (null === d) return null;
        d = d.shared;
        if (0 !== (K & 2)) {
          var e = d.pending;
          null === e ? b.next = b : (b.next = e.next, e.next = b);
          d.pending = b;
          return ih(a, c);
        }
        e = d.interleaved;
        null === e ? (b.next = b, gh(d)) : (b.next = e.next, e.next = b);
        d.interleaved = b;
        return ih(a, c);
      }
      function oh(a, b, c) {
        b = b.updateQueue;
        if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      function ph(a, b) {
        var c = a.updateQueue, d = a.alternate;
        if (null !== d && (d = d.updateQueue, c === d)) {
          var e = null, f = null;
          c = c.firstBaseUpdate;
          if (null !== c) {
            do {
              var g = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
              null === f ? e = f = g : f = f.next = g;
              c = c.next;
            } while (null !== c);
            null === f ? e = f = b : f = f.next = b;
          } else e = f = b;
          c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f, shared: d.shared, effects: d.effects };
          a.updateQueue = c;
          return;
        }
        a = c.lastBaseUpdate;
        null === a ? c.firstBaseUpdate = b : a.next = b;
        c.lastBaseUpdate = b;
      }
      function qh(a, b, c, d) {
        var e = a.updateQueue;
        jh = false;
        var f = e.firstBaseUpdate, g = e.lastBaseUpdate, h = e.shared.pending;
        if (null !== h) {
          e.shared.pending = null;
          var k = h, l = k.next;
          k.next = null;
          null === g ? f = l : g.next = l;
          g = k;
          var m = a.alternate;
          null !== m && (m = m.updateQueue, h = m.lastBaseUpdate, h !== g && (null === h ? m.firstBaseUpdate = l : h.next = l, m.lastBaseUpdate = k));
        }
        if (null !== f) {
          var q = e.baseState;
          g = 0;
          m = l = k = null;
          h = f;
          do {
            var r = h.lane, y = h.eventTime;
            if ((d & r) === r) {
              null !== m && (m = m.next = {
                eventTime: y,
                lane: 0,
                tag: h.tag,
                payload: h.payload,
                callback: h.callback,
                next: null
              });
              a: {
                var n = a, t = h;
                r = b;
                y = c;
                switch (t.tag) {
                  case 1:
                    n = t.payload;
                    if ("function" === typeof n) {
                      q = n.call(y, q, r);
                      break a;
                    }
                    q = n;
                    break a;
                  case 3:
                    n.flags = n.flags & -65537 | 128;
                  case 0:
                    n = t.payload;
                    r = "function" === typeof n ? n.call(y, q, r) : n;
                    if (null === r || void 0 === r) break a;
                    q = A({}, q, r);
                    break a;
                  case 2:
                    jh = true;
                }
              }
              null !== h.callback && 0 !== h.lane && (a.flags |= 64, r = e.effects, null === r ? e.effects = [h] : r.push(h));
            } else y = { eventTime: y, lane: r, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m ? (l = m = y, k = q) : m = m.next = y, g |= r;
            h = h.next;
            if (null === h) if (h = e.shared.pending, null === h) break;
            else r = h, h = r.next, r.next = null, e.lastBaseUpdate = r, e.shared.pending = null;
          } while (1);
          null === m && (k = q);
          e.baseState = k;
          e.firstBaseUpdate = l;
          e.lastBaseUpdate = m;
          b = e.shared.interleaved;
          if (null !== b) {
            e = b;
            do
              g |= e.lane, e = e.next;
            while (e !== b);
          } else null === f && (e.shared.lanes = 0);
          rh |= g;
          a.lanes = g;
          a.memoizedState = q;
        }
      }
      function sh(a, b, c) {
        a = b.effects;
        b.effects = null;
        if (null !== a) for (b = 0; b < a.length; b++) {
          var d = a[b], e = d.callback;
          if (null !== e) {
            d.callback = null;
            d = c;
            if ("function" !== typeof e) throw Error(p(191, e));
            e.call(d);
          }
        }
      }
      var th = {};
      var uh = Uf(th);
      var vh = Uf(th);
      var wh = Uf(th);
      function xh(a) {
        if (a === th) throw Error(p(174));
        return a;
      }
      function yh(a, b) {
        G(wh, b);
        G(vh, a);
        G(uh, th);
        a = b.nodeType;
        switch (a) {
          case 9:
          case 11:
            b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
            break;
          default:
            a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
        }
        E(uh);
        G(uh, b);
      }
      function zh() {
        E(uh);
        E(vh);
        E(wh);
      }
      function Ah(a) {
        xh(wh.current);
        var b = xh(uh.current);
        var c = lb(b, a.type);
        b !== c && (G(vh, a), G(uh, c));
      }
      function Bh(a) {
        vh.current === a && (E(uh), E(vh));
      }
      var L = Uf(0);
      function Ch(a) {
        for (var b = a; null !== b; ) {
          if (13 === b.tag) {
            var c = b.memoizedState;
            if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data)) return b;
          } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
            if (0 !== (b.flags & 128)) return b;
          } else if (null !== b.child) {
            b.child.return = b;
            b = b.child;
            continue;
          }
          if (b === a) break;
          for (; null === b.sibling; ) {
            if (null === b.return || b.return === a) return null;
            b = b.return;
          }
          b.sibling.return = b.return;
          b = b.sibling;
        }
        return null;
      }
      var Dh = [];
      function Eh() {
        for (var a = 0; a < Dh.length; a++) Dh[a]._workInProgressVersionPrimary = null;
        Dh.length = 0;
      }
      var Fh = ua.ReactCurrentDispatcher;
      var Gh = ua.ReactCurrentBatchConfig;
      var Hh = 0;
      var M = null;
      var N = null;
      var O = null;
      var Ih = false;
      var Jh = false;
      var Kh = 0;
      var Lh = 0;
      function P() {
        throw Error(p(321));
      }
      function Mh(a, b) {
        if (null === b) return false;
        for (var c = 0; c < b.length && c < a.length; c++) if (!He(a[c], b[c])) return false;
        return true;
      }
      function Nh(a, b, c, d, e, f) {
        Hh = f;
        M = b;
        b.memoizedState = null;
        b.updateQueue = null;
        b.lanes = 0;
        Fh.current = null === a || null === a.memoizedState ? Oh : Ph;
        a = c(d, e);
        if (Jh) {
          f = 0;
          do {
            Jh = false;
            Kh = 0;
            if (25 <= f) throw Error(p(301));
            f += 1;
            O = N = null;
            b.updateQueue = null;
            Fh.current = Qh;
            a = c(d, e);
          } while (Jh);
        }
        Fh.current = Rh;
        b = null !== N && null !== N.next;
        Hh = 0;
        O = N = M = null;
        Ih = false;
        if (b) throw Error(p(300));
        return a;
      }
      function Sh() {
        var a = 0 !== Kh;
        Kh = 0;
        return a;
      }
      function Th() {
        var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
        null === O ? M.memoizedState = O = a : O = O.next = a;
        return O;
      }
      function Uh() {
        if (null === N) {
          var a = M.alternate;
          a = null !== a ? a.memoizedState : null;
        } else a = N.next;
        var b = null === O ? M.memoizedState : O.next;
        if (null !== b) O = b, N = a;
        else {
          if (null === a) throw Error(p(310));
          N = a;
          a = { memoizedState: N.memoizedState, baseState: N.baseState, baseQueue: N.baseQueue, queue: N.queue, next: null };
          null === O ? M.memoizedState = O = a : O = O.next = a;
        }
        return O;
      }
      function Vh(a, b) {
        return "function" === typeof b ? b(a) : b;
      }
      function Wh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = N, e = d.baseQueue, f = c.pending;
        if (null !== f) {
          if (null !== e) {
            var g = e.next;
            e.next = f.next;
            f.next = g;
          }
          d.baseQueue = e = f;
          c.pending = null;
        }
        if (null !== e) {
          f = e.next;
          d = d.baseState;
          var h = g = null, k = null, l = f;
          do {
            var m = l.lane;
            if ((Hh & m) === m) null !== k && (k = k.next = { lane: 0, action: l.action, hasEagerState: l.hasEagerState, eagerState: l.eagerState, next: null }), d = l.hasEagerState ? l.eagerState : a(d, l.action);
            else {
              var q = {
                lane: m,
                action: l.action,
                hasEagerState: l.hasEagerState,
                eagerState: l.eagerState,
                next: null
              };
              null === k ? (h = k = q, g = d) : k = k.next = q;
              M.lanes |= m;
              rh |= m;
            }
            l = l.next;
          } while (null !== l && l !== f);
          null === k ? g = d : k.next = h;
          He(d, b.memoizedState) || (dh = true);
          b.memoizedState = d;
          b.baseState = g;
          b.baseQueue = k;
          c.lastRenderedState = d;
        }
        a = c.interleaved;
        if (null !== a) {
          e = a;
          do
            f = e.lane, M.lanes |= f, rh |= f, e = e.next;
          while (e !== a);
        } else null === e && (c.lanes = 0);
        return [b.memoizedState, c.dispatch];
      }
      function Xh(a) {
        var b = Uh(), c = b.queue;
        if (null === c) throw Error(p(311));
        c.lastRenderedReducer = a;
        var d = c.dispatch, e = c.pending, f = b.memoizedState;
        if (null !== e) {
          c.pending = null;
          var g = e = e.next;
          do
            f = a(f, g.action), g = g.next;
          while (g !== e);
          He(f, b.memoizedState) || (dh = true);
          b.memoizedState = f;
          null === b.baseQueue && (b.baseState = f);
          c.lastRenderedState = f;
        }
        return [f, d];
      }
      function Yh() {
      }
      function Zh(a, b) {
        var c = M, d = Uh(), e = b(), f = !He(d.memoizedState, e);
        f && (d.memoizedState = e, dh = true);
        d = d.queue;
        $h(ai.bind(null, c, d, a), [a]);
        if (d.getSnapshot !== b || f || null !== O && O.memoizedState.tag & 1) {
          c.flags |= 2048;
          bi(9, ci.bind(null, c, d, e, b), void 0, null);
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(c, b, e);
        }
        return e;
      }
      function di(a, b, c) {
        a.flags |= 16384;
        a = { getSnapshot: b, value: c };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
      }
      function ci(a, b, c, d) {
        b.value = c;
        b.getSnapshot = d;
        ei(b) && fi(a);
      }
      function ai(a, b, c) {
        return c(function() {
          ei(b) && fi(a);
        });
      }
      function ei(a) {
        var b = a.getSnapshot;
        a = a.value;
        try {
          var c = b();
          return !He(a, c);
        } catch (d) {
          return true;
        }
      }
      function fi(a) {
        var b = ih(a, 1);
        null !== b && gi(b, a, 1, -1);
      }
      function hi(a) {
        var b = Th();
        "function" === typeof a && (a = a());
        b.memoizedState = b.baseState = a;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Vh, lastRenderedState: a };
        b.queue = a;
        a = a.dispatch = ii.bind(null, M, a);
        return [b.memoizedState, a];
      }
      function bi(a, b, c, d) {
        a = { tag: a, create: b, destroy: c, deps: d, next: null };
        b = M.updateQueue;
        null === b ? (b = { lastEffect: null, stores: null }, M.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
        return a;
      }
      function ji() {
        return Uh().memoizedState;
      }
      function ki(a, b, c, d) {
        var e = Th();
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, void 0, void 0 === d ? null : d);
      }
      function li(a, b, c, d) {
        var e = Uh();
        d = void 0 === d ? null : d;
        var f = void 0;
        if (null !== N) {
          var g = N.memoizedState;
          f = g.destroy;
          if (null !== d && Mh(d, g.deps)) {
            e.memoizedState = bi(b, c, f, d);
            return;
          }
        }
        M.flags |= a;
        e.memoizedState = bi(1 | b, c, f, d);
      }
      function mi(a, b) {
        return ki(8390656, 8, a, b);
      }
      function $h(a, b) {
        return li(2048, 8, a, b);
      }
      function ni(a, b) {
        return li(4, 2, a, b);
      }
      function oi(a, b) {
        return li(4, 4, a, b);
      }
      function pi(a, b) {
        if ("function" === typeof b) return a = a(), b(a), function() {
          b(null);
        };
        if (null !== b && void 0 !== b) return a = a(), b.current = a, function() {
          b.current = null;
        };
      }
      function qi(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return li(4, 4, pi.bind(null, b, a), c);
      }
      function ri() {
      }
      function si(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        c.memoizedState = [a, b];
        return a;
      }
      function ti(a, b) {
        var c = Uh();
        b = void 0 === b ? null : b;
        var d = c.memoizedState;
        if (null !== d && null !== b && Mh(b, d[1])) return d[0];
        a = a();
        c.memoizedState = [a, b];
        return a;
      }
      function ui(a, b, c) {
        if (0 === (Hh & 21)) return a.baseState && (a.baseState = false, dh = true), a.memoizedState = c;
        He(c, b) || (c = yc(), M.lanes |= c, rh |= c, a.baseState = true);
        return b;
      }
      function vi(a, b) {
        var c = C;
        C = 0 !== c && 4 > c ? c : 4;
        a(true);
        var d = Gh.transition;
        Gh.transition = {};
        try {
          a(false), b();
        } finally {
          C = c, Gh.transition = d;
        }
      }
      function wi() {
        return Uh().memoizedState;
      }
      function xi(a, b, c) {
        var d = yi(a);
        c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, c);
        else if (c = hh(a, b, c, d), null !== c) {
          var e = R();
          gi(c, a, d, e);
          Bi(c, b, d);
        }
      }
      function ii(a, b, c) {
        var d = yi(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
        if (zi(a)) Ai(b, e);
        else {
          var f = a.alternate;
          if (0 === a.lanes && (null === f || 0 === f.lanes) && (f = b.lastRenderedReducer, null !== f)) try {
            var g = b.lastRenderedState, h = f(g, c);
            e.hasEagerState = true;
            e.eagerState = h;
            if (He(h, g)) {
              var k = b.interleaved;
              null === k ? (e.next = e, gh(b)) : (e.next = k.next, k.next = e);
              b.interleaved = e;
              return;
            }
          } catch (l) {
          } finally {
          }
          c = hh(a, b, e, d);
          null !== c && (e = R(), gi(c, a, d, e), Bi(c, b, d));
        }
      }
      function zi(a) {
        var b = a.alternate;
        return a === M || null !== b && b === M;
      }
      function Ai(a, b) {
        Jh = Ih = true;
        var c = a.pending;
        null === c ? b.next = b : (b.next = c.next, c.next = b);
        a.pending = b;
      }
      function Bi(a, b, c) {
        if (0 !== (c & 4194240)) {
          var d = b.lanes;
          d &= a.pendingLanes;
          c |= d;
          b.lanes = c;
          Cc(a, c);
        }
      }
      var Rh = { readContext: eh, useCallback: P, useContext: P, useEffect: P, useImperativeHandle: P, useInsertionEffect: P, useLayoutEffect: P, useMemo: P, useReducer: P, useRef: P, useState: P, useDebugValue: P, useDeferredValue: P, useTransition: P, useMutableSource: P, useSyncExternalStore: P, useId: P, unstable_isNewReconciler: false };
      var Oh = { readContext: eh, useCallback: function(a, b) {
        Th().memoizedState = [a, void 0 === b ? null : b];
        return a;
      }, useContext: eh, useEffect: mi, useImperativeHandle: function(a, b, c) {
        c = null !== c && void 0 !== c ? c.concat([a]) : null;
        return ki(
          4194308,
          4,
          pi.bind(null, b, a),
          c
        );
      }, useLayoutEffect: function(a, b) {
        return ki(4194308, 4, a, b);
      }, useInsertionEffect: function(a, b) {
        return ki(4, 2, a, b);
      }, useMemo: function(a, b) {
        var c = Th();
        b = void 0 === b ? null : b;
        a = a();
        c.memoizedState = [a, b];
        return a;
      }, useReducer: function(a, b, c) {
        var d = Th();
        b = void 0 !== c ? c(b) : b;
        d.memoizedState = d.baseState = b;
        a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
        d.queue = a;
        a = a.dispatch = xi.bind(null, M, a);
        return [d.memoizedState, a];
      }, useRef: function(a) {
        var b = Th();
        a = { current: a };
        return b.memoizedState = a;
      }, useState: hi, useDebugValue: ri, useDeferredValue: function(a) {
        return Th().memoizedState = a;
      }, useTransition: function() {
        var a = hi(false), b = a[0];
        a = vi.bind(null, a[1]);
        Th().memoizedState = a;
        return [b, a];
      }, useMutableSource: function() {
      }, useSyncExternalStore: function(a, b, c) {
        var d = M, e = Th();
        if (I) {
          if (void 0 === c) throw Error(p(407));
          c = c();
        } else {
          c = b();
          if (null === Q) throw Error(p(349));
          0 !== (Hh & 30) || di(d, b, c);
        }
        e.memoizedState = c;
        var f = { value: c, getSnapshot: b };
        e.queue = f;
        mi(ai.bind(
          null,
          d,
          f,
          a
        ), [a]);
        d.flags |= 2048;
        bi(9, ci.bind(null, d, f, c, b), void 0, null);
        return c;
      }, useId: function() {
        var a = Th(), b = Q.identifierPrefix;
        if (I) {
          var c = sg;
          var d = rg;
          c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
          b = ":" + b + "R" + c;
          c = Kh++;
          0 < c && (b += "H" + c.toString(32));
          b += ":";
        } else c = Lh++, b = ":" + b + "r" + c.toString(32) + ":";
        return a.memoizedState = b;
      }, unstable_isNewReconciler: false };
      var Ph = {
        readContext: eh,
        useCallback: si,
        useContext: eh,
        useEffect: $h,
        useImperativeHandle: qi,
        useInsertionEffect: ni,
        useLayoutEffect: oi,
        useMemo: ti,
        useReducer: Wh,
        useRef: ji,
        useState: function() {
          return Wh(Vh);
        },
        useDebugValue: ri,
        useDeferredValue: function(a) {
          var b = Uh();
          return ui(b, N.memoizedState, a);
        },
        useTransition: function() {
          var a = Wh(Vh)[0], b = Uh().memoizedState;
          return [a, b];
        },
        useMutableSource: Yh,
        useSyncExternalStore: Zh,
        useId: wi,
        unstable_isNewReconciler: false
      };
      var Qh = { readContext: eh, useCallback: si, useContext: eh, useEffect: $h, useImperativeHandle: qi, useInsertionEffect: ni, useLayoutEffect: oi, useMemo: ti, useReducer: Xh, useRef: ji, useState: function() {
        return Xh(Vh);
      }, useDebugValue: ri, useDeferredValue: function(a) {
        var b = Uh();
        return null === N ? b.memoizedState = a : ui(b, N.memoizedState, a);
      }, useTransition: function() {
        var a = Xh(Vh)[0], b = Uh().memoizedState;
        return [a, b];
      }, useMutableSource: Yh, useSyncExternalStore: Zh, useId: wi, unstable_isNewReconciler: false };
      function Ci(a, b) {
        if (a && a.defaultProps) {
          b = A({}, b);
          a = a.defaultProps;
          for (var c in a) void 0 === b[c] && (b[c] = a[c]);
          return b;
        }
        return b;
      }
      function Di(a, b, c, d) {
        b = a.memoizedState;
        c = c(d, b);
        c = null === c || void 0 === c ? b : A({}, b, c);
        a.memoizedState = c;
        0 === a.lanes && (a.updateQueue.baseState = c);
      }
      var Ei = { isMounted: function(a) {
        return (a = a._reactInternals) ? Vb(a) === a : false;
      }, enqueueSetState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueReplaceState: function(a, b, c) {
        a = a._reactInternals;
        var d = R(), e = yi(a), f = mh(d, e);
        f.tag = 1;
        f.payload = b;
        void 0 !== c && null !== c && (f.callback = c);
        b = nh(a, f, e);
        null !== b && (gi(b, a, e, d), oh(b, a, e));
      }, enqueueForceUpdate: function(a, b) {
        a = a._reactInternals;
        var c = R(), d = yi(a), e = mh(c, d);
        e.tag = 2;
        void 0 !== b && null !== b && (e.callback = b);
        b = nh(a, e, d);
        null !== b && (gi(b, a, d, c), oh(b, a, d));
      } };
      function Fi(a, b, c, d, e, f, g) {
        a = a.stateNode;
        return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f, g) : b.prototype && b.prototype.isPureReactComponent ? !Ie(c, d) || !Ie(e, f) : true;
      }
      function Gi(a, b, c) {
        var d = false, e = Vf;
        var f = b.contextType;
        "object" === typeof f && null !== f ? f = eh(f) : (e = Zf(b) ? Xf : H.current, d = b.contextTypes, f = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
        b = new b(c, f);
        a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
        b.updater = Ei;
        a.stateNode = b;
        b._reactInternals = a;
        d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f);
        return b;
      }
      function Hi(a, b, c, d) {
        a = b.state;
        "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
        "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
        b.state !== a && Ei.enqueueReplaceState(b, b.state, null);
      }
      function Ii(a, b, c, d) {
        var e = a.stateNode;
        e.props = c;
        e.state = a.memoizedState;
        e.refs = {};
        kh(a);
        var f = b.contextType;
        "object" === typeof f && null !== f ? e.context = eh(f) : (f = Zf(b) ? Xf : H.current, e.context = Yf(a, f));
        e.state = a.memoizedState;
        f = b.getDerivedStateFromProps;
        "function" === typeof f && (Di(a, b, f, c), e.state = a.memoizedState);
        "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && Ei.enqueueReplaceState(e, e.state, null), qh(a, c, e, d), e.state = a.memoizedState);
        "function" === typeof e.componentDidMount && (a.flags |= 4194308);
      }
      function Ji(a, b) {
        try {
          var c = "", d = b;
          do
            c += Pa(d), d = d.return;
          while (d);
          var e = c;
        } catch (f) {
          e = "\nError generating stack: " + f.message + "\n" + f.stack;
        }
        return { value: a, source: b, stack: e, digest: null };
      }
      function Ki(a, b, c) {
        return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
      }
      function Li(a, b) {
        try {
          console.error(b.value);
        } catch (c) {
          setTimeout(function() {
            throw c;
          });
        }
      }
      var Mi = "function" === typeof WeakMap ? WeakMap : Map;
      function Ni(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        c.payload = { element: null };
        var d = b.value;
        c.callback = function() {
          Oi || (Oi = true, Pi = d);
          Li(a, b);
        };
        return c;
      }
      function Qi(a, b, c) {
        c = mh(-1, c);
        c.tag = 3;
        var d = a.type.getDerivedStateFromError;
        if ("function" === typeof d) {
          var e = b.value;
          c.payload = function() {
            return d(e);
          };
          c.callback = function() {
            Li(a, b);
          };
        }
        var f = a.stateNode;
        null !== f && "function" === typeof f.componentDidCatch && (c.callback = function() {
          Li(a, b);
          "function" !== typeof d && (null === Ri ? Ri = /* @__PURE__ */ new Set([this]) : Ri.add(this));
          var c2 = b.stack;
          this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
        });
        return c;
      }
      function Si(a, b, c) {
        var d = a.pingCache;
        if (null === d) {
          d = a.pingCache = new Mi();
          var e = /* @__PURE__ */ new Set();
          d.set(b, e);
        } else e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
        e.has(c) || (e.add(c), a = Ti.bind(null, a, b, c), b.then(a, a));
      }
      function Ui(a) {
        do {
          var b;
          if (b = 13 === a.tag) b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
          if (b) return a;
          a = a.return;
        } while (null !== a);
        return null;
      }
      function Vi(a, b, c, d, e) {
        if (0 === (a.mode & 1)) return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = mh(-1, 1), b.tag = 2, nh(c, b, 1))), c.lanes |= 1), a;
        a.flags |= 65536;
        a.lanes = e;
        return a;
      }
      var Wi = ua.ReactCurrentOwner;
      var dh = false;
      function Xi(a, b, c, d) {
        b.child = null === a ? Vg(b, null, c, d) : Ug(b, a.child, c, d);
      }
      function Yi(a, b, c, d, e) {
        c = c.render;
        var f = b.ref;
        ch(b, e);
        d = Nh(a, b, c, d, f, e);
        c = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && c && vg(b);
        b.flags |= 1;
        Xi(a, b, d, e);
        return b.child;
      }
      function $i(a, b, c, d, e) {
        if (null === a) {
          var f = c.type;
          if ("function" === typeof f && !aj(f) && void 0 === f.defaultProps && null === c.compare && void 0 === c.defaultProps) return b.tag = 15, b.type = f, bj(a, b, f, d, e);
          a = Rg(c.type, null, d, b, b.mode, e);
          a.ref = b.ref;
          a.return = b;
          return b.child = a;
        }
        f = a.child;
        if (0 === (a.lanes & e)) {
          var g = f.memoizedProps;
          c = c.compare;
          c = null !== c ? c : Ie;
          if (c(g, d) && a.ref === b.ref) return Zi(a, b, e);
        }
        b.flags |= 1;
        a = Pg(f, d);
        a.ref = b.ref;
        a.return = b;
        return b.child = a;
      }
      function bj(a, b, c, d, e) {
        if (null !== a) {
          var f = a.memoizedProps;
          if (Ie(f, d) && a.ref === b.ref) if (dh = false, b.pendingProps = d = f, 0 !== (a.lanes & e)) 0 !== (a.flags & 131072) && (dh = true);
          else return b.lanes = a.lanes, Zi(a, b, e);
        }
        return cj(a, b, c, d, e);
      }
      function dj(a, b, c) {
        var d = b.pendingProps, e = d.children, f = null !== a ? a.memoizedState : null;
        if ("hidden" === d.mode) if (0 === (b.mode & 1)) b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G(ej, fj), fj |= c;
        else {
          if (0 === (c & 1073741824)) return a = null !== f ? f.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G(ej, fj), fj |= a, null;
          b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
          d = null !== f ? f.baseLanes : c;
          G(ej, fj);
          fj |= d;
        }
        else null !== f ? (d = f.baseLanes | c, b.memoizedState = null) : d = c, G(ej, fj), fj |= d;
        Xi(a, b, e, c);
        return b.child;
      }
      function gj(a, b) {
        var c = b.ref;
        if (null === a && null !== c || null !== a && a.ref !== c) b.flags |= 512, b.flags |= 2097152;
      }
      function cj(a, b, c, d, e) {
        var f = Zf(c) ? Xf : H.current;
        f = Yf(b, f);
        ch(b, e);
        c = Nh(a, b, c, d, f, e);
        d = Sh();
        if (null !== a && !dh) return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, Zi(a, b, e);
        I && d && vg(b);
        b.flags |= 1;
        Xi(a, b, c, e);
        return b.child;
      }
      function hj(a, b, c, d, e) {
        if (Zf(c)) {
          var f = true;
          cg(b);
        } else f = false;
        ch(b, e);
        if (null === b.stateNode) ij(a, b), Gi(b, c, d), Ii(b, c, d, e), d = true;
        else if (null === a) {
          var g = b.stateNode, h = b.memoizedProps;
          g.props = h;
          var k = g.context, l = c.contextType;
          "object" === typeof l && null !== l ? l = eh(l) : (l = Zf(c) ? Xf : H.current, l = Yf(b, l));
          var m = c.getDerivedStateFromProps, q = "function" === typeof m || "function" === typeof g.getSnapshotBeforeUpdate;
          q || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== d || k !== l) && Hi(b, g, d, l);
          jh = false;
          var r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          k = b.memoizedState;
          h !== d || r !== k || Wf.current || jh ? ("function" === typeof m && (Di(b, c, m, d), k = b.memoizedState), (h = jh || Fi(b, c, h, d, r, k, l)) ? (q || "function" !== typeof g.UNSAFE_componentWillMount && "function" !== typeof g.componentWillMount || ("function" === typeof g.componentWillMount && g.componentWillMount(), "function" === typeof g.UNSAFE_componentWillMount && g.UNSAFE_componentWillMount()), "function" === typeof g.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k), g.props = d, g.state = k, g.context = l, d = h) : ("function" === typeof g.componentDidMount && (b.flags |= 4194308), d = false);
        } else {
          g = b.stateNode;
          lh(a, b);
          h = b.memoizedProps;
          l = b.type === b.elementType ? h : Ci(b.type, h);
          g.props = l;
          q = b.pendingProps;
          r = g.context;
          k = c.contextType;
          "object" === typeof k && null !== k ? k = eh(k) : (k = Zf(c) ? Xf : H.current, k = Yf(b, k));
          var y = c.getDerivedStateFromProps;
          (m = "function" === typeof y || "function" === typeof g.getSnapshotBeforeUpdate) || "function" !== typeof g.UNSAFE_componentWillReceiveProps && "function" !== typeof g.componentWillReceiveProps || (h !== q || r !== k) && Hi(b, g, d, k);
          jh = false;
          r = b.memoizedState;
          g.state = r;
          qh(b, d, g, e);
          var n = b.memoizedState;
          h !== q || r !== n || Wf.current || jh ? ("function" === typeof y && (Di(b, c, y, d), n = b.memoizedState), (l = jh || Fi(b, c, l, d, r, n, k) || false) ? (m || "function" !== typeof g.UNSAFE_componentWillUpdate && "function" !== typeof g.componentWillUpdate || ("function" === typeof g.componentWillUpdate && g.componentWillUpdate(d, n, k), "function" === typeof g.UNSAFE_componentWillUpdate && g.UNSAFE_componentWillUpdate(d, n, k)), "function" === typeof g.componentDidUpdate && (b.flags |= 4), "function" === typeof g.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n), g.props = d, g.state = n, g.context = k, d = l) : ("function" !== typeof g.componentDidUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 4), "function" !== typeof g.getSnapshotBeforeUpdate || h === a.memoizedProps && r === a.memoizedState || (b.flags |= 1024), d = false);
        }
        return jj(a, b, c, d, f, e);
      }
      function jj(a, b, c, d, e, f) {
        gj(a, b);
        var g = 0 !== (b.flags & 128);
        if (!d && !g) return e && dg(b, c, false), Zi(a, b, f);
        d = b.stateNode;
        Wi.current = b;
        var h = g && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
        b.flags |= 1;
        null !== a && g ? (b.child = Ug(b, a.child, null, f), b.child = Ug(b, null, h, f)) : Xi(a, b, h, f);
        b.memoizedState = d.state;
        e && dg(b, c, true);
        return b.child;
      }
      function kj(a) {
        var b = a.stateNode;
        b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
        yh(a, b.containerInfo);
      }
      function lj(a, b, c, d, e) {
        Ig();
        Jg(e);
        b.flags |= 256;
        Xi(a, b, c, d);
        return b.child;
      }
      var mj = { dehydrated: null, treeContext: null, retryLane: 0 };
      function nj(a) {
        return { baseLanes: a, cachePool: null, transitions: null };
      }
      function oj(a, b, c) {
        var d = b.pendingProps, e = L.current, f = false, g = 0 !== (b.flags & 128), h;
        (h = g) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
        if (h) f = true, b.flags &= -129;
        else if (null === a || null !== a.memoizedState) e |= 1;
        G(L, e & 1);
        if (null === a) {
          Eg(b);
          a = b.memoizedState;
          if (null !== a && (a = a.dehydrated, null !== a)) return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
          g = d.children;
          a = d.fallback;
          return f ? (d = b.mode, f = b.child, g = { mode: "hidden", children: g }, 0 === (d & 1) && null !== f ? (f.childLanes = 0, f.pendingProps = g) : f = pj(g, d, 0, null), a = Tg(a, d, c, null), f.return = b, a.return = b, f.sibling = a, b.child = f, b.child.memoizedState = nj(c), b.memoizedState = mj, a) : qj(b, g);
        }
        e = a.memoizedState;
        if (null !== e && (h = e.dehydrated, null !== h)) return rj(a, b, g, d, h, e, c);
        if (f) {
          f = d.fallback;
          g = b.mode;
          e = a.child;
          h = e.sibling;
          var k = { mode: "hidden", children: d.children };
          0 === (g & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k, b.deletions = null) : (d = Pg(e, k), d.subtreeFlags = e.subtreeFlags & 14680064);
          null !== h ? f = Pg(h, f) : (f = Tg(f, g, c, null), f.flags |= 2);
          f.return = b;
          d.return = b;
          d.sibling = f;
          b.child = d;
          d = f;
          f = b.child;
          g = a.child.memoizedState;
          g = null === g ? nj(c) : { baseLanes: g.baseLanes | c, cachePool: null, transitions: g.transitions };
          f.memoizedState = g;
          f.childLanes = a.childLanes & ~c;
          b.memoizedState = mj;
          return d;
        }
        f = a.child;
        a = f.sibling;
        d = Pg(f, { mode: "visible", children: d.children });
        0 === (b.mode & 1) && (d.lanes = c);
        d.return = b;
        d.sibling = null;
        null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
        b.child = d;
        b.memoizedState = null;
        return d;
      }
      function qj(a, b) {
        b = pj({ mode: "visible", children: b }, a.mode, 0, null);
        b.return = a;
        return a.child = b;
      }
      function sj(a, b, c, d) {
        null !== d && Jg(d);
        Ug(b, a.child, null, c);
        a = qj(b, b.pendingProps.children);
        a.flags |= 2;
        b.memoizedState = null;
        return a;
      }
      function rj(a, b, c, d, e, f, g) {
        if (c) {
          if (b.flags & 256) return b.flags &= -257, d = Ki(Error(p(422))), sj(a, b, g, d);
          if (null !== b.memoizedState) return b.child = a.child, b.flags |= 128, null;
          f = d.fallback;
          e = b.mode;
          d = pj({ mode: "visible", children: d.children }, e, 0, null);
          f = Tg(f, e, g, null);
          f.flags |= 2;
          d.return = b;
          f.return = b;
          d.sibling = f;
          b.child = d;
          0 !== (b.mode & 1) && Ug(b, a.child, null, g);
          b.child.memoizedState = nj(g);
          b.memoizedState = mj;
          return f;
        }
        if (0 === (b.mode & 1)) return sj(a, b, g, null);
        if ("$!" === e.data) {
          d = e.nextSibling && e.nextSibling.dataset;
          if (d) var h = d.dgst;
          d = h;
          f = Error(p(419));
          d = Ki(f, d, void 0);
          return sj(a, b, g, d);
        }
        h = 0 !== (g & a.childLanes);
        if (dh || h) {
          d = Q;
          if (null !== d) {
            switch (g & -g) {
              case 4:
                e = 2;
                break;
              case 16:
                e = 8;
                break;
              case 64:
              case 128:
              case 256:
              case 512:
              case 1024:
              case 2048:
              case 4096:
              case 8192:
              case 16384:
              case 32768:
              case 65536:
              case 131072:
              case 262144:
              case 524288:
              case 1048576:
              case 2097152:
              case 4194304:
              case 8388608:
              case 16777216:
              case 33554432:
              case 67108864:
                e = 32;
                break;
              case 536870912:
                e = 268435456;
                break;
              default:
                e = 0;
            }
            e = 0 !== (e & (d.suspendedLanes | g)) ? 0 : e;
            0 !== e && e !== f.retryLane && (f.retryLane = e, ih(a, e), gi(d, a, e, -1));
          }
          tj();
          d = Ki(Error(p(421)));
          return sj(a, b, g, d);
        }
        if ("$?" === e.data) return b.flags |= 128, b.child = a.child, b = uj.bind(null, a), e._reactRetry = b, null;
        a = f.treeContext;
        yg = Lf(e.nextSibling);
        xg = b;
        I = true;
        zg = null;
        null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
        b = qj(b, d.children);
        b.flags |= 4096;
        return b;
      }
      function vj(a, b, c) {
        a.lanes |= b;
        var d = a.alternate;
        null !== d && (d.lanes |= b);
        bh(a.return, b, c);
      }
      function wj(a, b, c, d, e) {
        var f = a.memoizedState;
        null === f ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f.isBackwards = b, f.rendering = null, f.renderingStartTime = 0, f.last = d, f.tail = c, f.tailMode = e);
      }
      function xj(a, b, c) {
        var d = b.pendingProps, e = d.revealOrder, f = d.tail;
        Xi(a, b, d.children, c);
        d = L.current;
        if (0 !== (d & 2)) d = d & 1 | 2, b.flags |= 128;
        else {
          if (null !== a && 0 !== (a.flags & 128)) a: for (a = b.child; null !== a; ) {
            if (13 === a.tag) null !== a.memoizedState && vj(a, c, b);
            else if (19 === a.tag) vj(a, c, b);
            else if (null !== a.child) {
              a.child.return = a;
              a = a.child;
              continue;
            }
            if (a === b) break a;
            for (; null === a.sibling; ) {
              if (null === a.return || a.return === b) break a;
              a = a.return;
            }
            a.sibling.return = a.return;
            a = a.sibling;
          }
          d &= 1;
        }
        G(L, d);
        if (0 === (b.mode & 1)) b.memoizedState = null;
        else switch (e) {
          case "forwards":
            c = b.child;
            for (e = null; null !== c; ) a = c.alternate, null !== a && null === Ch(a) && (e = c), c = c.sibling;
            c = e;
            null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
            wj(b, false, e, c, f);
            break;
          case "backwards":
            c = null;
            e = b.child;
            for (b.child = null; null !== e; ) {
              a = e.alternate;
              if (null !== a && null === Ch(a)) {
                b.child = e;
                break;
              }
              a = e.sibling;
              e.sibling = c;
              c = e;
              e = a;
            }
            wj(b, true, c, null, f);
            break;
          case "together":
            wj(b, false, null, null, void 0);
            break;
          default:
            b.memoizedState = null;
        }
        return b.child;
      }
      function ij(a, b) {
        0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
      }
      function Zi(a, b, c) {
        null !== a && (b.dependencies = a.dependencies);
        rh |= b.lanes;
        if (0 === (c & b.childLanes)) return null;
        if (null !== a && b.child !== a.child) throw Error(p(153));
        if (null !== b.child) {
          a = b.child;
          c = Pg(a, a.pendingProps);
          b.child = c;
          for (c.return = b; null !== a.sibling; ) a = a.sibling, c = c.sibling = Pg(a, a.pendingProps), c.return = b;
          c.sibling = null;
        }
        return b.child;
      }
      function yj(a, b, c) {
        switch (b.tag) {
          case 3:
            kj(b);
            Ig();
            break;
          case 5:
            Ah(b);
            break;
          case 1:
            Zf(b.type) && cg(b);
            break;
          case 4:
            yh(b, b.stateNode.containerInfo);
            break;
          case 10:
            var d = b.type._context, e = b.memoizedProps.value;
            G(Wg, d._currentValue);
            d._currentValue = e;
            break;
          case 13:
            d = b.memoizedState;
            if (null !== d) {
              if (null !== d.dehydrated) return G(L, L.current & 1), b.flags |= 128, null;
              if (0 !== (c & b.child.childLanes)) return oj(a, b, c);
              G(L, L.current & 1);
              a = Zi(a, b, c);
              return null !== a ? a.sibling : null;
            }
            G(L, L.current & 1);
            break;
          case 19:
            d = 0 !== (c & b.childLanes);
            if (0 !== (a.flags & 128)) {
              if (d) return xj(a, b, c);
              b.flags |= 128;
            }
            e = b.memoizedState;
            null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
            G(L, L.current);
            if (d) break;
            else return null;
          case 22:
          case 23:
            return b.lanes = 0, dj(a, b, c);
        }
        return Zi(a, b, c);
      }
      var zj;
      var Aj;
      var Bj;
      var Cj;
      zj = function(a, b) {
        for (var c = b.child; null !== c; ) {
          if (5 === c.tag || 6 === c.tag) a.appendChild(c.stateNode);
          else if (4 !== c.tag && null !== c.child) {
            c.child.return = c;
            c = c.child;
            continue;
          }
          if (c === b) break;
          for (; null === c.sibling; ) {
            if (null === c.return || c.return === b) return;
            c = c.return;
          }
          c.sibling.return = c.return;
          c = c.sibling;
        }
      };
      Aj = function() {
      };
      Bj = function(a, b, c, d) {
        var e = a.memoizedProps;
        if (e !== d) {
          a = b.stateNode;
          xh(uh.current);
          var f = null;
          switch (c) {
            case "input":
              e = Ya(a, e);
              d = Ya(a, d);
              f = [];
              break;
            case "select":
              e = A({}, e, { value: void 0 });
              d = A({}, d, { value: void 0 });
              f = [];
              break;
            case "textarea":
              e = gb(a, e);
              d = gb(a, d);
              f = [];
              break;
            default:
              "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
          }
          ub(c, d);
          var g;
          c = null;
          for (l in e) if (!d.hasOwnProperty(l) && e.hasOwnProperty(l) && null != e[l]) if ("style" === l) {
            var h = e[l];
            for (g in h) h.hasOwnProperty(g) && (c || (c = {}), c[g] = "");
          } else "dangerouslySetInnerHTML" !== l && "children" !== l && "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && "autoFocus" !== l && (ea.hasOwnProperty(l) ? f || (f = []) : (f = f || []).push(l, null));
          for (l in d) {
            var k = d[l];
            h = null != e ? e[l] : void 0;
            if (d.hasOwnProperty(l) && k !== h && (null != k || null != h)) if ("style" === l) if (h) {
              for (g in h) !h.hasOwnProperty(g) || k && k.hasOwnProperty(g) || (c || (c = {}), c[g] = "");
              for (g in k) k.hasOwnProperty(g) && h[g] !== k[g] && (c || (c = {}), c[g] = k[g]);
            } else c || (f || (f = []), f.push(
              l,
              c
            )), c = k;
            else "dangerouslySetInnerHTML" === l ? (k = k ? k.__html : void 0, h = h ? h.__html : void 0, null != k && h !== k && (f = f || []).push(l, k)) : "children" === l ? "string" !== typeof k && "number" !== typeof k || (f = f || []).push(l, "" + k) : "suppressContentEditableWarning" !== l && "suppressHydrationWarning" !== l && (ea.hasOwnProperty(l) ? (null != k && "onScroll" === l && D("scroll", a), f || h === k || (f = [])) : (f = f || []).push(l, k));
          }
          c && (f = f || []).push("style", c);
          var l = f;
          if (b.updateQueue = l) b.flags |= 4;
        }
      };
      Cj = function(a, b, c, d) {
        c !== d && (b.flags |= 4);
      };
      function Dj(a, b) {
        if (!I) switch (a.tailMode) {
          case "hidden":
            b = a.tail;
            for (var c = null; null !== b; ) null !== b.alternate && (c = b), b = b.sibling;
            null === c ? a.tail = null : c.sibling = null;
            break;
          case "collapsed":
            c = a.tail;
            for (var d = null; null !== c; ) null !== c.alternate && (d = c), c = c.sibling;
            null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
        }
      }
      function S(a) {
        var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
        if (b) for (var e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
        else for (e = a.child; null !== e; ) c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
        a.subtreeFlags |= d;
        a.childLanes = c;
        return b;
      }
      function Ej(a, b, c) {
        var d = b.pendingProps;
        wg(b);
        switch (b.tag) {
          case 2:
          case 16:
          case 15:
          case 0:
          case 11:
          case 7:
          case 8:
          case 12:
          case 9:
          case 14:
            return S(b), null;
          case 1:
            return Zf(b.type) && $f(), S(b), null;
          case 3:
            d = b.stateNode;
            zh();
            E(Wf);
            E(H);
            Eh();
            d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
            if (null === a || null === a.child) Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Fj(zg), zg = null));
            Aj(a, b);
            S(b);
            return null;
          case 5:
            Bh(b);
            var e = xh(wh.current);
            c = b.type;
            if (null !== a && null != b.stateNode) Bj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            else {
              if (!d) {
                if (null === b.stateNode) throw Error(p(166));
                S(b);
                return null;
              }
              a = xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.type;
                var f = b.memoizedProps;
                d[Of] = b;
                d[Pf] = f;
                a = 0 !== (b.mode & 1);
                switch (c) {
                  case "dialog":
                    D("cancel", d);
                    D("close", d);
                    break;
                  case "iframe":
                  case "object":
                  case "embed":
                    D("load", d);
                    break;
                  case "video":
                  case "audio":
                    for (e = 0; e < lf.length; e++) D(lf[e], d);
                    break;
                  case "source":
                    D("error", d);
                    break;
                  case "img":
                  case "image":
                  case "link":
                    D(
                      "error",
                      d
                    );
                    D("load", d);
                    break;
                  case "details":
                    D("toggle", d);
                    break;
                  case "input":
                    Za(d, f);
                    D("invalid", d);
                    break;
                  case "select":
                    d._wrapperState = { wasMultiple: !!f.multiple };
                    D("invalid", d);
                    break;
                  case "textarea":
                    hb(d, f), D("invalid", d);
                }
                ub(c, f);
                e = null;
                for (var g in f) if (f.hasOwnProperty(g)) {
                  var h = f[g];
                  "children" === g ? "string" === typeof h ? d.textContent !== h && (true !== f.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f.suppressHydrationWarning && Af(
                    d.textContent,
                    h,
                    a
                  ), e = ["children", "" + h]) : ea.hasOwnProperty(g) && null != h && "onScroll" === g && D("scroll", d);
                }
                switch (c) {
                  case "input":
                    Va(d);
                    db(d, f, true);
                    break;
                  case "textarea":
                    Va(d);
                    jb(d);
                    break;
                  case "select":
                  case "option":
                    break;
                  default:
                    "function" === typeof f.onClick && (d.onclick = Bf);
                }
                d = e;
                b.updateQueue = d;
                null !== d && (b.flags |= 4);
              } else {
                g = 9 === e.nodeType ? e : e.ownerDocument;
                "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
                "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g.createElement(c, { is: d.is }) : (a = g.createElement(c), "select" === c && (g = a, d.multiple ? g.multiple = true : d.size && (g.size = d.size))) : a = g.createElementNS(a, c);
                a[Of] = b;
                a[Pf] = d;
                zj(a, b, false, false);
                b.stateNode = a;
                a: {
                  g = vb(c, d);
                  switch (c) {
                    case "dialog":
                      D("cancel", a);
                      D("close", a);
                      e = d;
                      break;
                    case "iframe":
                    case "object":
                    case "embed":
                      D("load", a);
                      e = d;
                      break;
                    case "video":
                    case "audio":
                      for (e = 0; e < lf.length; e++) D(lf[e], a);
                      e = d;
                      break;
                    case "source":
                      D("error", a);
                      e = d;
                      break;
                    case "img":
                    case "image":
                    case "link":
                      D(
                        "error",
                        a
                      );
                      D("load", a);
                      e = d;
                      break;
                    case "details":
                      D("toggle", a);
                      e = d;
                      break;
                    case "input":
                      Za(a, d);
                      e = Ya(a, d);
                      D("invalid", a);
                      break;
                    case "option":
                      e = d;
                      break;
                    case "select":
                      a._wrapperState = { wasMultiple: !!d.multiple };
                      e = A({}, d, { value: void 0 });
                      D("invalid", a);
                      break;
                    case "textarea":
                      hb(a, d);
                      e = gb(a, d);
                      D("invalid", a);
                      break;
                    default:
                      e = d;
                  }
                  ub(c, e);
                  h = e;
                  for (f in h) if (h.hasOwnProperty(f)) {
                    var k = h[f];
                    "style" === f ? sb(a, k) : "dangerouslySetInnerHTML" === f ? (k = k ? k.__html : void 0, null != k && nb(a, k)) : "children" === f ? "string" === typeof k ? ("textarea" !== c || "" !== k) && ob(a, k) : "number" === typeof k && ob(a, "" + k) : "suppressContentEditableWarning" !== f && "suppressHydrationWarning" !== f && "autoFocus" !== f && (ea.hasOwnProperty(f) ? null != k && "onScroll" === f && D("scroll", a) : null != k && ta(a, f, k, g));
                  }
                  switch (c) {
                    case "input":
                      Va(a);
                      db(a, d, false);
                      break;
                    case "textarea":
                      Va(a);
                      jb(a);
                      break;
                    case "option":
                      null != d.value && a.setAttribute("value", "" + Sa(d.value));
                      break;
                    case "select":
                      a.multiple = !!d.multiple;
                      f = d.value;
                      null != f ? fb(a, !!d.multiple, f, false) : null != d.defaultValue && fb(
                        a,
                        !!d.multiple,
                        d.defaultValue,
                        true
                      );
                      break;
                    default:
                      "function" === typeof e.onClick && (a.onclick = Bf);
                  }
                  switch (c) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      d = !!d.autoFocus;
                      break a;
                    case "img":
                      d = true;
                      break a;
                    default:
                      d = false;
                  }
                }
                d && (b.flags |= 4);
              }
              null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
            }
            S(b);
            return null;
          case 6:
            if (a && null != b.stateNode) Cj(a, b, a.memoizedProps, d);
            else {
              if ("string" !== typeof d && null === b.stateNode) throw Error(p(166));
              c = xh(wh.current);
              xh(uh.current);
              if (Gg(b)) {
                d = b.stateNode;
                c = b.memoizedProps;
                d[Of] = b;
                if (f = d.nodeValue !== c) {
                  if (a = xg, null !== a) switch (a.tag) {
                    case 3:
                      Af(d.nodeValue, c, 0 !== (a.mode & 1));
                      break;
                    case 5:
                      true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  }
                }
                f && (b.flags |= 4);
              } else d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
            }
            S(b);
            return null;
          case 13:
            E(L);
            d = b.memoizedState;
            if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
              if (I && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128)) Hg(), Ig(), b.flags |= 98560, f = false;
              else if (f = Gg(b), null !== d && null !== d.dehydrated) {
                if (null === a) {
                  if (!f) throw Error(p(318));
                  f = b.memoizedState;
                  f = null !== f ? f.dehydrated : null;
                  if (!f) throw Error(p(317));
                  f[Of] = b;
                } else Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
                S(b);
                f = false;
              } else null !== zg && (Fj(zg), zg = null), f = true;
              if (!f) return b.flags & 65536 ? b : null;
            }
            if (0 !== (b.flags & 128)) return b.lanes = c, b;
            d = null !== d;
            d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (L.current & 1) ? 0 === T && (T = 3) : tj()));
            null !== b.updateQueue && (b.flags |= 4);
            S(b);
            return null;
          case 4:
            return zh(), Aj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
          case 10:
            return ah(b.type._context), S(b), null;
          case 17:
            return Zf(b.type) && $f(), S(b), null;
          case 19:
            E(L);
            f = b.memoizedState;
            if (null === f) return S(b), null;
            d = 0 !== (b.flags & 128);
            g = f.rendering;
            if (null === g) if (d) Dj(f, false);
            else {
              if (0 !== T || null !== a && 0 !== (a.flags & 128)) for (a = b.child; null !== a; ) {
                g = Ch(a);
                if (null !== g) {
                  b.flags |= 128;
                  Dj(f, false);
                  d = g.updateQueue;
                  null !== d && (b.updateQueue = d, b.flags |= 4);
                  b.subtreeFlags = 0;
                  d = c;
                  for (c = b.child; null !== c; ) f = c, a = d, f.flags &= 14680066, g = f.alternate, null === g ? (f.childLanes = 0, f.lanes = a, f.child = null, f.subtreeFlags = 0, f.memoizedProps = null, f.memoizedState = null, f.updateQueue = null, f.dependencies = null, f.stateNode = null) : (f.childLanes = g.childLanes, f.lanes = g.lanes, f.child = g.child, f.subtreeFlags = 0, f.deletions = null, f.memoizedProps = g.memoizedProps, f.memoizedState = g.memoizedState, f.updateQueue = g.updateQueue, f.type = g.type, a = g.dependencies, f.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                  G(L, L.current & 1 | 2);
                  return b.child;
                }
                a = a.sibling;
              }
              null !== f.tail && B() > Gj && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
            }
            else {
              if (!d) if (a = Ch(g), null !== a) {
                if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Dj(f, true), null === f.tail && "hidden" === f.tailMode && !g.alternate && !I) return S(b), null;
              } else 2 * B() - f.renderingStartTime > Gj && 1073741824 !== c && (b.flags |= 128, d = true, Dj(f, false), b.lanes = 4194304);
              f.isBackwards ? (g.sibling = b.child, b.child = g) : (c = f.last, null !== c ? c.sibling = g : b.child = g, f.last = g);
            }
            if (null !== f.tail) return b = f.tail, f.rendering = b, f.tail = b.sibling, f.renderingStartTime = B(), b.sibling = null, c = L.current, G(L, d ? c & 1 | 2 : c & 1), b;
            S(b);
            return null;
          case 22:
          case 23:
            return Hj(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (fj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
          case 24:
            return null;
          case 25:
            return null;
        }
        throw Error(p(156, b.tag));
      }
      function Ij(a, b) {
        wg(b);
        switch (b.tag) {
          case 1:
            return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 3:
            return zh(), E(Wf), E(H), Eh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
          case 5:
            return Bh(b), null;
          case 13:
            E(L);
            a = b.memoizedState;
            if (null !== a && null !== a.dehydrated) {
              if (null === b.alternate) throw Error(p(340));
              Ig();
            }
            a = b.flags;
            return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
          case 19:
            return E(L), null;
          case 4:
            return zh(), null;
          case 10:
            return ah(b.type._context), null;
          case 22:
          case 23:
            return Hj(), null;
          case 24:
            return null;
          default:
            return null;
        }
      }
      var Jj = false;
      var U = false;
      var Kj = "function" === typeof WeakSet ? WeakSet : Set;
      var V = null;
      function Lj(a, b) {
        var c = a.ref;
        if (null !== c) if ("function" === typeof c) try {
          c(null);
        } catch (d) {
          W(a, b, d);
        }
        else c.current = null;
      }
      function Mj(a, b, c) {
        try {
          c();
        } catch (d) {
          W(a, b, d);
        }
      }
      var Nj = false;
      function Oj(a, b) {
        Cf = dd;
        a = Me();
        if (Ne(a)) {
          if ("selectionStart" in a) var c = { start: a.selectionStart, end: a.selectionEnd };
          else a: {
            c = (c = a.ownerDocument) && c.defaultView || window;
            var d = c.getSelection && c.getSelection();
            if (d && 0 !== d.rangeCount) {
              c = d.anchorNode;
              var e = d.anchorOffset, f = d.focusNode;
              d = d.focusOffset;
              try {
                c.nodeType, f.nodeType;
              } catch (F) {
                c = null;
                break a;
              }
              var g = 0, h = -1, k = -1, l = 0, m = 0, q = a, r = null;
              b: for (; ; ) {
                for (var y; ; ) {
                  q !== c || 0 !== e && 3 !== q.nodeType || (h = g + e);
                  q !== f || 0 !== d && 3 !== q.nodeType || (k = g + d);
                  3 === q.nodeType && (g += q.nodeValue.length);
                  if (null === (y = q.firstChild)) break;
                  r = q;
                  q = y;
                }
                for (; ; ) {
                  if (q === a) break b;
                  r === c && ++l === e && (h = g);
                  r === f && ++m === d && (k = g);
                  if (null !== (y = q.nextSibling)) break;
                  q = r;
                  r = q.parentNode;
                }
                q = y;
              }
              c = -1 === h || -1 === k ? null : { start: h, end: k };
            } else c = null;
          }
          c = c || { start: 0, end: 0 };
        } else c = null;
        Df = { focusedElem: a, selectionRange: c };
        dd = false;
        for (V = b; null !== V; ) if (b = V, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a) a.return = b, V = a;
        else for (; null !== V; ) {
          b = V;
          try {
            var n = b.alternate;
            if (0 !== (b.flags & 1024)) switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n) {
                  var t = n.memoizedProps, J = n.memoizedState, x = b.stateNode, w = x.getSnapshotBeforeUpdate(b.elementType === b.type ? t : Ci(b.type, t), J);
                  x.__reactInternalSnapshotBeforeUpdate = w;
                }
                break;
              case 3:
                var u = b.stateNode.containerInfo;
                1 === u.nodeType ? u.textContent = "" : 9 === u.nodeType && u.documentElement && u.removeChild(u.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
          } catch (F) {
            W(b, b.return, F);
          }
          a = b.sibling;
          if (null !== a) {
            a.return = b.return;
            V = a;
            break;
          }
          V = b.return;
        }
        n = Nj;
        Nj = false;
        return n;
      }
      function Pj(a, b, c) {
        var d = b.updateQueue;
        d = null !== d ? d.lastEffect : null;
        if (null !== d) {
          var e = d = d.next;
          do {
            if ((e.tag & a) === a) {
              var f = e.destroy;
              e.destroy = void 0;
              void 0 !== f && Mj(b, c, f);
            }
            e = e.next;
          } while (e !== d);
        }
      }
      function Qj(a, b) {
        b = b.updateQueue;
        b = null !== b ? b.lastEffect : null;
        if (null !== b) {
          var c = b = b.next;
          do {
            if ((c.tag & a) === a) {
              var d = c.create;
              c.destroy = d();
            }
            c = c.next;
          } while (c !== b);
        }
      }
      function Rj(a) {
        var b = a.ref;
        if (null !== b) {
          var c = a.stateNode;
          switch (a.tag) {
            case 5:
              a = c;
              break;
            default:
              a = c;
          }
          "function" === typeof b ? b(a) : b.current = a;
        }
      }
      function Sj(a) {
        var b = a.alternate;
        null !== b && (a.alternate = null, Sj(b));
        a.child = null;
        a.deletions = null;
        a.sibling = null;
        5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
        a.stateNode = null;
        a.return = null;
        a.dependencies = null;
        a.memoizedProps = null;
        a.memoizedState = null;
        a.pendingProps = null;
        a.stateNode = null;
        a.updateQueue = null;
      }
      function Tj(a) {
        return 5 === a.tag || 3 === a.tag || 4 === a.tag;
      }
      function Uj(a) {
        a: for (; ; ) {
          for (; null === a.sibling; ) {
            if (null === a.return || Tj(a.return)) return null;
            a = a.return;
          }
          a.sibling.return = a.return;
          for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
            if (a.flags & 2) continue a;
            if (null === a.child || 4 === a.tag) continue a;
            else a.child.return = a, a = a.child;
          }
          if (!(a.flags & 2)) return a.stateNode;
        }
      }
      function Vj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
        else if (4 !== d && (a = a.child, null !== a)) for (Vj(a, b, c), a = a.sibling; null !== a; ) Vj(a, b, c), a = a.sibling;
      }
      function Wj(a, b, c) {
        var d = a.tag;
        if (5 === d || 6 === d) a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
        else if (4 !== d && (a = a.child, null !== a)) for (Wj(a, b, c), a = a.sibling; null !== a; ) Wj(a, b, c), a = a.sibling;
      }
      var X2 = null;
      var Xj = false;
      function Yj(a, b, c) {
        for (c = c.child; null !== c; ) Zj(a, b, c), c = c.sibling;
      }
      function Zj(a, b, c) {
        if (lc && "function" === typeof lc.onCommitFiberUnmount) try {
          lc.onCommitFiberUnmount(kc, c);
        } catch (h) {
        }
        switch (c.tag) {
          case 5:
            U || Lj(c, b);
          case 6:
            var d = X2, e = Xj;
            X2 = null;
            Yj(a, b, c);
            X2 = d;
            Xj = e;
            null !== X2 && (Xj ? (a = X2, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X2.removeChild(c.stateNode));
            break;
          case 18:
            null !== X2 && (Xj ? (a = X2, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X2, c.stateNode));
            break;
          case 4:
            d = X2;
            e = Xj;
            X2 = c.stateNode.containerInfo;
            Xj = true;
            Yj(a, b, c);
            X2 = d;
            Xj = e;
            break;
          case 0:
          case 11:
          case 14:
          case 15:
            if (!U && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
              e = d = d.next;
              do {
                var f = e, g = f.destroy;
                f = f.tag;
                void 0 !== g && (0 !== (f & 2) ? Mj(c, b, g) : 0 !== (f & 4) && Mj(c, b, g));
                e = e.next;
              } while (e !== d);
            }
            Yj(a, b, c);
            break;
          case 1:
            if (!U && (Lj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount)) try {
              d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
            } catch (h) {
              W(c, b, h);
            }
            Yj(a, b, c);
            break;
          case 21:
            Yj(a, b, c);
            break;
          case 22:
            c.mode & 1 ? (U = (d = U) || null !== c.memoizedState, Yj(a, b, c), U = d) : Yj(a, b, c);
            break;
          default:
            Yj(a, b, c);
        }
      }
      function ak(a) {
        var b = a.updateQueue;
        if (null !== b) {
          a.updateQueue = null;
          var c = a.stateNode;
          null === c && (c = a.stateNode = new Kj());
          b.forEach(function(b2) {
            var d = bk.bind(null, a, b2);
            c.has(b2) || (c.add(b2), b2.then(d, d));
          });
        }
      }
      function ck(a, b) {
        var c = b.deletions;
        if (null !== c) for (var d = 0; d < c.length; d++) {
          var e = c[d];
          try {
            var f = a, g = b, h = g;
            a: for (; null !== h; ) {
              switch (h.tag) {
                case 5:
                  X2 = h.stateNode;
                  Xj = false;
                  break a;
                case 3:
                  X2 = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
                case 4:
                  X2 = h.stateNode.containerInfo;
                  Xj = true;
                  break a;
              }
              h = h.return;
            }
            if (null === X2) throw Error(p(160));
            Zj(f, g, e);
            X2 = null;
            Xj = false;
            var k = e.alternate;
            null !== k && (k.return = null);
            e.return = null;
          } catch (l) {
            W(e, b, l);
          }
        }
        if (b.subtreeFlags & 12854) for (b = b.child; null !== b; ) dk(b, a), b = b.sibling;
      }
      function dk(a, b) {
        var c = a.alternate, d = a.flags;
        switch (a.tag) {
          case 0:
          case 11:
          case 14:
          case 15:
            ck(b, a);
            ek(a);
            if (d & 4) {
              try {
                Pj(3, a, a.return), Qj(3, a);
              } catch (t) {
                W(a, a.return, t);
              }
              try {
                Pj(5, a, a.return);
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 1:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            break;
          case 5:
            ck(b, a);
            ek(a);
            d & 512 && null !== c && Lj(c, c.return);
            if (a.flags & 32) {
              var e = a.stateNode;
              try {
                ob(e, "");
              } catch (t) {
                W(a, a.return, t);
              }
            }
            if (d & 4 && (e = a.stateNode, null != e)) {
              var f = a.memoizedProps, g = null !== c ? c.memoizedProps : f, h = a.type, k = a.updateQueue;
              a.updateQueue = null;
              if (null !== k) try {
                "input" === h && "radio" === f.type && null != f.name && ab(e, f);
                vb(h, g);
                var l = vb(h, f);
                for (g = 0; g < k.length; g += 2) {
                  var m = k[g], q = k[g + 1];
                  "style" === m ? sb(e, q) : "dangerouslySetInnerHTML" === m ? nb(e, q) : "children" === m ? ob(e, q) : ta(e, m, q, l);
                }
                switch (h) {
                  case "input":
                    bb(e, f);
                    break;
                  case "textarea":
                    ib(e, f);
                    break;
                  case "select":
                    var r = e._wrapperState.wasMultiple;
                    e._wrapperState.wasMultiple = !!f.multiple;
                    var y = f.value;
                    null != y ? fb(e, !!f.multiple, y, false) : r !== !!f.multiple && (null != f.defaultValue ? fb(
                      e,
                      !!f.multiple,
                      f.defaultValue,
                      true
                    ) : fb(e, !!f.multiple, f.multiple ? [] : "", false));
                }
                e[Pf] = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 6:
            ck(b, a);
            ek(a);
            if (d & 4) {
              if (null === a.stateNode) throw Error(p(162));
              e = a.stateNode;
              f = a.memoizedProps;
              try {
                e.nodeValue = f;
              } catch (t) {
                W(a, a.return, t);
              }
            }
            break;
          case 3:
            ck(b, a);
            ek(a);
            if (d & 4 && null !== c && c.memoizedState.isDehydrated) try {
              bd(b.containerInfo);
            } catch (t) {
              W(a, a.return, t);
            }
            break;
          case 4:
            ck(b, a);
            ek(a);
            break;
          case 13:
            ck(b, a);
            ek(a);
            e = a.child;
            e.flags & 8192 && (f = null !== e.memoizedState, e.stateNode.isHidden = f, !f || null !== e.alternate && null !== e.alternate.memoizedState || (fk = B()));
            d & 4 && ak(a);
            break;
          case 22:
            m = null !== c && null !== c.memoizedState;
            a.mode & 1 ? (U = (l = U) || m, ck(b, a), U = l) : ck(b, a);
            ek(a);
            if (d & 8192) {
              l = null !== a.memoizedState;
              if ((a.stateNode.isHidden = l) && !m && 0 !== (a.mode & 1)) for (V = a, m = a.child; null !== m; ) {
                for (q = V = m; null !== V; ) {
                  r = V;
                  y = r.child;
                  switch (r.tag) {
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                      Pj(4, r, r.return);
                      break;
                    case 1:
                      Lj(r, r.return);
                      var n = r.stateNode;
                      if ("function" === typeof n.componentWillUnmount) {
                        d = r;
                        c = r.return;
                        try {
                          b = d, n.props = b.memoizedProps, n.state = b.memoizedState, n.componentWillUnmount();
                        } catch (t) {
                          W(d, c, t);
                        }
                      }
                      break;
                    case 5:
                      Lj(r, r.return);
                      break;
                    case 22:
                      if (null !== r.memoizedState) {
                        gk(q);
                        continue;
                      }
                  }
                  null !== y ? (y.return = r, V = y) : gk(q);
                }
                m = m.sibling;
              }
              a: for (m = null, q = a; ; ) {
                if (5 === q.tag) {
                  if (null === m) {
                    m = q;
                    try {
                      e = q.stateNode, l ? (f = e.style, "function" === typeof f.setProperty ? f.setProperty("display", "none", "important") : f.display = "none") : (h = q.stateNode, k = q.memoizedProps.style, g = void 0 !== k && null !== k && k.hasOwnProperty("display") ? k.display : null, h.style.display = rb("display", g));
                    } catch (t) {
                      W(a, a.return, t);
                    }
                  }
                } else if (6 === q.tag) {
                  if (null === m) try {
                    q.stateNode.nodeValue = l ? "" : q.memoizedProps;
                  } catch (t) {
                    W(a, a.return, t);
                  }
                } else if ((22 !== q.tag && 23 !== q.tag || null === q.memoizedState || q === a) && null !== q.child) {
                  q.child.return = q;
                  q = q.child;
                  continue;
                }
                if (q === a) break a;
                for (; null === q.sibling; ) {
                  if (null === q.return || q.return === a) break a;
                  m === q && (m = null);
                  q = q.return;
                }
                m === q && (m = null);
                q.sibling.return = q.return;
                q = q.sibling;
              }
            }
            break;
          case 19:
            ck(b, a);
            ek(a);
            d & 4 && ak(a);
            break;
          case 21:
            break;
          default:
            ck(
              b,
              a
            ), ek(a);
        }
      }
      function ek(a) {
        var b = a.flags;
        if (b & 2) {
          try {
            a: {
              for (var c = a.return; null !== c; ) {
                if (Tj(c)) {
                  var d = c;
                  break a;
                }
                c = c.return;
              }
              throw Error(p(160));
            }
            switch (d.tag) {
              case 5:
                var e = d.stateNode;
                d.flags & 32 && (ob(e, ""), d.flags &= -33);
                var f = Uj(a);
                Wj(a, f, e);
                break;
              case 3:
              case 4:
                var g = d.stateNode.containerInfo, h = Uj(a);
                Vj(a, h, g);
                break;
              default:
                throw Error(p(161));
            }
          } catch (k) {
            W(a, a.return, k);
          }
          a.flags &= -3;
        }
        b & 4096 && (a.flags &= -4097);
      }
      function hk(a, b, c) {
        V = a;
        ik(a, b, c);
      }
      function ik(a, b, c) {
        for (var d = 0 !== (a.mode & 1); null !== V; ) {
          var e = V, f = e.child;
          if (22 === e.tag && d) {
            var g = null !== e.memoizedState || Jj;
            if (!g) {
              var h = e.alternate, k = null !== h && null !== h.memoizedState || U;
              h = Jj;
              var l = U;
              Jj = g;
              if ((U = k) && !l) for (V = e; null !== V; ) g = V, k = g.child, 22 === g.tag && null !== g.memoizedState ? jk(e) : null !== k ? (k.return = g, V = k) : jk(e);
              for (; null !== f; ) V = f, ik(f, b, c), f = f.sibling;
              V = e;
              Jj = h;
              U = l;
            }
            kk(a, b, c);
          } else 0 !== (e.subtreeFlags & 8772) && null !== f ? (f.return = e, V = f) : kk(a, b, c);
        }
      }
      function kk(a) {
        for (; null !== V; ) {
          var b = V;
          if (0 !== (b.flags & 8772)) {
            var c = b.alternate;
            try {
              if (0 !== (b.flags & 8772)) switch (b.tag) {
                case 0:
                case 11:
                case 15:
                  U || Qj(5, b);
                  break;
                case 1:
                  var d = b.stateNode;
                  if (b.flags & 4 && !U) if (null === c) d.componentDidMount();
                  else {
                    var e = b.elementType === b.type ? c.memoizedProps : Ci(b.type, c.memoizedProps);
                    d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                  }
                  var f = b.updateQueue;
                  null !== f && sh(b, f, d);
                  break;
                case 3:
                  var g = b.updateQueue;
                  if (null !== g) {
                    c = null;
                    if (null !== b.child) switch (b.child.tag) {
                      case 5:
                        c = b.child.stateNode;
                        break;
                      case 1:
                        c = b.child.stateNode;
                    }
                    sh(b, g, c);
                  }
                  break;
                case 5:
                  var h = b.stateNode;
                  if (null === c && b.flags & 4) {
                    c = h;
                    var k = b.memoizedProps;
                    switch (b.type) {
                      case "button":
                      case "input":
                      case "select":
                      case "textarea":
                        k.autoFocus && c.focus();
                        break;
                      case "img":
                        k.src && (c.src = k.src);
                    }
                  }
                  break;
                case 6:
                  break;
                case 4:
                  break;
                case 12:
                  break;
                case 13:
                  if (null === b.memoizedState) {
                    var l = b.alternate;
                    if (null !== l) {
                      var m = l.memoizedState;
                      if (null !== m) {
                        var q = m.dehydrated;
                        null !== q && bd(q);
                      }
                    }
                  }
                  break;
                case 19:
                case 17:
                case 21:
                case 22:
                case 23:
                case 25:
                  break;
                default:
                  throw Error(p(163));
              }
              U || b.flags & 512 && Rj(b);
            } catch (r) {
              W(b, b.return, r);
            }
          }
          if (b === a) {
            V = null;
            break;
          }
          c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function gk(a) {
        for (; null !== V; ) {
          var b = V;
          if (b === a) {
            V = null;
            break;
          }
          var c = b.sibling;
          if (null !== c) {
            c.return = b.return;
            V = c;
            break;
          }
          V = b.return;
        }
      }
      function jk(a) {
        for (; null !== V; ) {
          var b = V;
          try {
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                var c = b.return;
                try {
                  Qj(4, b);
                } catch (k) {
                  W(b, c, k);
                }
                break;
              case 1:
                var d = b.stateNode;
                if ("function" === typeof d.componentDidMount) {
                  var e = b.return;
                  try {
                    d.componentDidMount();
                  } catch (k) {
                    W(b, e, k);
                  }
                }
                var f = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, f, k);
                }
                break;
              case 5:
                var g = b.return;
                try {
                  Rj(b);
                } catch (k) {
                  W(b, g, k);
                }
            }
          } catch (k) {
            W(b, b.return, k);
          }
          if (b === a) {
            V = null;
            break;
          }
          var h = b.sibling;
          if (null !== h) {
            h.return = b.return;
            V = h;
            break;
          }
          V = b.return;
        }
      }
      var lk = Math.ceil;
      var mk = ua.ReactCurrentDispatcher;
      var nk = ua.ReactCurrentOwner;
      var ok = ua.ReactCurrentBatchConfig;
      var K = 0;
      var Q = null;
      var Y = null;
      var Z = 0;
      var fj = 0;
      var ej = Uf(0);
      var T = 0;
      var pk = null;
      var rh = 0;
      var qk = 0;
      var rk = 0;
      var sk = null;
      var tk = null;
      var fk = 0;
      var Gj = Infinity;
      var uk = null;
      var Oi = false;
      var Pi = null;
      var Ri = null;
      var vk = false;
      var wk = null;
      var xk = 0;
      var yk = 0;
      var zk = null;
      var Ak = -1;
      var Bk = 0;
      function R() {
        return 0 !== (K & 6) ? B() : -1 !== Ak ? Ak : Ak = B();
      }
      function yi(a) {
        if (0 === (a.mode & 1)) return 1;
        if (0 !== (K & 2) && 0 !== Z) return Z & -Z;
        if (null !== Kg.transition) return 0 === Bk && (Bk = yc()), Bk;
        a = C;
        if (0 !== a) return a;
        a = window.event;
        a = void 0 === a ? 16 : jd(a.type);
        return a;
      }
      function gi(a, b, c, d) {
        if (50 < yk) throw yk = 0, zk = null, Error(p(185));
        Ac(a, c, d);
        if (0 === (K & 2) || a !== Q) a === Q && (0 === (K & 2) && (qk |= c), 4 === T && Ck(a, Z)), Dk(a, d), 1 === c && 0 === K && 0 === (b.mode & 1) && (Gj = B() + 500, fg && jg());
      }
      function Dk(a, b) {
        var c = a.callbackNode;
        wc(a, b);
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
        else if (b = d & -d, a.callbackPriority !== b) {
          null != c && bc(c);
          if (1 === b) 0 === a.tag ? ig(Ek.bind(null, a)) : hg(Ek.bind(null, a)), Jf(function() {
            0 === (K & 6) && jg();
          }), c = null;
          else {
            switch (Dc(d)) {
              case 1:
                c = fc;
                break;
              case 4:
                c = gc;
                break;
              case 16:
                c = hc;
                break;
              case 536870912:
                c = jc;
                break;
              default:
                c = hc;
            }
            c = Fk(c, Gk.bind(null, a));
          }
          a.callbackPriority = b;
          a.callbackNode = c;
        }
      }
      function Gk(a, b) {
        Ak = -1;
        Bk = 0;
        if (0 !== (K & 6)) throw Error(p(327));
        var c = a.callbackNode;
        if (Hk() && a.callbackNode !== c) return null;
        var d = uc(a, a === Q ? Z : 0);
        if (0 === d) return null;
        if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b) b = Ik(a, d);
        else {
          b = d;
          var e = K;
          K |= 2;
          var f = Jk();
          if (Q !== a || Z !== b) uk = null, Gj = B() + 500, Kk(a, b);
          do
            try {
              Lk();
              break;
            } catch (h) {
              Mk(a, h);
            }
          while (1);
          $g();
          mk.current = f;
          K = e;
          null !== Y ? b = 0 : (Q = null, Z = 0, b = T);
        }
        if (0 !== b) {
          2 === b && (e = xc(a), 0 !== e && (d = e, b = Nk(a, e)));
          if (1 === b) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
          if (6 === b) Ck(a, d);
          else {
            e = a.current.alternate;
            if (0 === (d & 30) && !Ok(e) && (b = Ik(a, d), 2 === b && (f = xc(a), 0 !== f && (d = f, b = Nk(a, f))), 1 === b)) throw c = pk, Kk(a, 0), Ck(a, d), Dk(a, B()), c;
            a.finishedWork = e;
            a.finishedLanes = d;
            switch (b) {
              case 0:
              case 1:
                throw Error(p(345));
              case 2:
                Pk(a, tk, uk);
                break;
              case 3:
                Ck(a, d);
                if ((d & 130023424) === d && (b = fk + 500 - B(), 10 < b)) {
                  if (0 !== uc(a, 0)) break;
                  e = a.suspendedLanes;
                  if ((e & d) !== d) {
                    R();
                    a.pingedLanes |= a.suspendedLanes & e;
                    break;
                  }
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), b);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 4:
                Ck(a, d);
                if ((d & 4194240) === d) break;
                b = a.eventTimes;
                for (e = -1; 0 < d; ) {
                  var g = 31 - oc(d);
                  f = 1 << g;
                  g = b[g];
                  g > e && (e = g);
                  d &= ~f;
                }
                d = e;
                d = B() - d;
                d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * lk(d / 1960)) - d;
                if (10 < d) {
                  a.timeoutHandle = Ff(Pk.bind(null, a, tk, uk), d);
                  break;
                }
                Pk(a, tk, uk);
                break;
              case 5:
                Pk(a, tk, uk);
                break;
              default:
                throw Error(p(329));
            }
          }
        }
        Dk(a, B());
        return a.callbackNode === c ? Gk.bind(null, a) : null;
      }
      function Nk(a, b) {
        var c = sk;
        a.current.memoizedState.isDehydrated && (Kk(a, b).flags |= 256);
        a = Ik(a, b);
        2 !== a && (b = tk, tk = c, null !== b && Fj(b));
        return a;
      }
      function Fj(a) {
        null === tk ? tk = a : tk.push.apply(tk, a);
      }
      function Ok(a) {
        for (var b = a; ; ) {
          if (b.flags & 16384) {
            var c = b.updateQueue;
            if (null !== c && (c = c.stores, null !== c)) for (var d = 0; d < c.length; d++) {
              var e = c[d], f = e.getSnapshot;
              e = e.value;
              try {
                if (!He(f(), e)) return false;
              } catch (g) {
                return false;
              }
            }
          }
          c = b.child;
          if (b.subtreeFlags & 16384 && null !== c) c.return = b, b = c;
          else {
            if (b === a) break;
            for (; null === b.sibling; ) {
              if (null === b.return || b.return === a) return true;
              b = b.return;
            }
            b.sibling.return = b.return;
            b = b.sibling;
          }
        }
        return true;
      }
      function Ck(a, b) {
        b &= ~rk;
        b &= ~qk;
        a.suspendedLanes |= b;
        a.pingedLanes &= ~b;
        for (a = a.expirationTimes; 0 < b; ) {
          var c = 31 - oc(b), d = 1 << c;
          a[c] = -1;
          b &= ~d;
        }
      }
      function Ek(a) {
        if (0 !== (K & 6)) throw Error(p(327));
        Hk();
        var b = uc(a, 0);
        if (0 === (b & 1)) return Dk(a, B()), null;
        var c = Ik(a, b);
        if (0 !== a.tag && 2 === c) {
          var d = xc(a);
          0 !== d && (b = d, c = Nk(a, d));
        }
        if (1 === c) throw c = pk, Kk(a, 0), Ck(a, b), Dk(a, B()), c;
        if (6 === c) throw Error(p(345));
        a.finishedWork = a.current.alternate;
        a.finishedLanes = b;
        Pk(a, tk, uk);
        Dk(a, B());
        return null;
      }
      function Qk(a, b) {
        var c = K;
        K |= 1;
        try {
          return a(b);
        } finally {
          K = c, 0 === K && (Gj = B() + 500, fg && jg());
        }
      }
      function Rk(a) {
        null !== wk && 0 === wk.tag && 0 === (K & 6) && Hk();
        var b = K;
        K |= 1;
        var c = ok.transition, d = C;
        try {
          if (ok.transition = null, C = 1, a) return a();
        } finally {
          C = d, ok.transition = c, K = b, 0 === (K & 6) && jg();
        }
      }
      function Hj() {
        fj = ej.current;
        E(ej);
      }
      function Kk(a, b) {
        a.finishedWork = null;
        a.finishedLanes = 0;
        var c = a.timeoutHandle;
        -1 !== c && (a.timeoutHandle = -1, Gf(c));
        if (null !== Y) for (c = Y.return; null !== c; ) {
          var d = c;
          wg(d);
          switch (d.tag) {
            case 1:
              d = d.type.childContextTypes;
              null !== d && void 0 !== d && $f();
              break;
            case 3:
              zh();
              E(Wf);
              E(H);
              Eh();
              break;
            case 5:
              Bh(d);
              break;
            case 4:
              zh();
              break;
            case 13:
              E(L);
              break;
            case 19:
              E(L);
              break;
            case 10:
              ah(d.type._context);
              break;
            case 22:
            case 23:
              Hj();
          }
          c = c.return;
        }
        Q = a;
        Y = a = Pg(a.current, null);
        Z = fj = b;
        T = 0;
        pk = null;
        rk = qk = rh = 0;
        tk = sk = null;
        if (null !== fh) {
          for (b = 0; b < fh.length; b++) if (c = fh[b], d = c.interleaved, null !== d) {
            c.interleaved = null;
            var e = d.next, f = c.pending;
            if (null !== f) {
              var g = f.next;
              f.next = e;
              d.next = g;
            }
            c.pending = d;
          }
          fh = null;
        }
        return a;
      }
      function Mk(a, b) {
        do {
          var c = Y;
          try {
            $g();
            Fh.current = Rh;
            if (Ih) {
              for (var d = M.memoizedState; null !== d; ) {
                var e = d.queue;
                null !== e && (e.pending = null);
                d = d.next;
              }
              Ih = false;
            }
            Hh = 0;
            O = N = M = null;
            Jh = false;
            Kh = 0;
            nk.current = null;
            if (null === c || null === c.return) {
              T = 1;
              pk = b;
              Y = null;
              break;
            }
            a: {
              var f = a, g = c.return, h = c, k = b;
              b = Z;
              h.flags |= 32768;
              if (null !== k && "object" === typeof k && "function" === typeof k.then) {
                var l = k, m = h, q = m.tag;
                if (0 === (m.mode & 1) && (0 === q || 11 === q || 15 === q)) {
                  var r = m.alternate;
                  r ? (m.updateQueue = r.updateQueue, m.memoizedState = r.memoizedState, m.lanes = r.lanes) : (m.updateQueue = null, m.memoizedState = null);
                }
                var y = Ui(g);
                if (null !== y) {
                  y.flags &= -257;
                  Vi(y, g, h, f, b);
                  y.mode & 1 && Si(f, l, b);
                  b = y;
                  k = l;
                  var n = b.updateQueue;
                  if (null === n) {
                    var t = /* @__PURE__ */ new Set();
                    t.add(k);
                    b.updateQueue = t;
                  } else n.add(k);
                  break a;
                } else {
                  if (0 === (b & 1)) {
                    Si(f, l, b);
                    tj();
                    break a;
                  }
                  k = Error(p(426));
                }
              } else if (I && h.mode & 1) {
                var J = Ui(g);
                if (null !== J) {
                  0 === (J.flags & 65536) && (J.flags |= 256);
                  Vi(J, g, h, f, b);
                  Jg(Ji(k, h));
                  break a;
                }
              }
              f = k = Ji(k, h);
              4 !== T && (T = 2);
              null === sk ? sk = [f] : sk.push(f);
              f = g;
              do {
                switch (f.tag) {
                  case 3:
                    f.flags |= 65536;
                    b &= -b;
                    f.lanes |= b;
                    var x = Ni(f, k, b);
                    ph(f, x);
                    break a;
                  case 1:
                    h = k;
                    var w = f.type, u = f.stateNode;
                    if (0 === (f.flags & 128) && ("function" === typeof w.getDerivedStateFromError || null !== u && "function" === typeof u.componentDidCatch && (null === Ri || !Ri.has(u)))) {
                      f.flags |= 65536;
                      b &= -b;
                      f.lanes |= b;
                      var F = Qi(f, h, b);
                      ph(f, F);
                      break a;
                    }
                }
                f = f.return;
              } while (null !== f);
            }
            Sk(c);
          } catch (na) {
            b = na;
            Y === c && null !== c && (Y = c = c.return);
            continue;
          }
          break;
        } while (1);
      }
      function Jk() {
        var a = mk.current;
        mk.current = Rh;
        return null === a ? Rh : a;
      }
      function tj() {
        if (0 === T || 3 === T || 2 === T) T = 4;
        null === Q || 0 === (rh & 268435455) && 0 === (qk & 268435455) || Ck(Q, Z);
      }
      function Ik(a, b) {
        var c = K;
        K |= 2;
        var d = Jk();
        if (Q !== a || Z !== b) uk = null, Kk(a, b);
        do
          try {
            Tk();
            break;
          } catch (e) {
            Mk(a, e);
          }
        while (1);
        $g();
        K = c;
        mk.current = d;
        if (null !== Y) throw Error(p(261));
        Q = null;
        Z = 0;
        return T;
      }
      function Tk() {
        for (; null !== Y; ) Uk(Y);
      }
      function Lk() {
        for (; null !== Y && !cc(); ) Uk(Y);
      }
      function Uk(a) {
        var b = Vk(a.alternate, a, fj);
        a.memoizedProps = a.pendingProps;
        null === b ? Sk(a) : Y = b;
        nk.current = null;
      }
      function Sk(a) {
        var b = a;
        do {
          var c = b.alternate;
          a = b.return;
          if (0 === (b.flags & 32768)) {
            if (c = Ej(c, b, fj), null !== c) {
              Y = c;
              return;
            }
          } else {
            c = Ij(c, b);
            if (null !== c) {
              c.flags &= 32767;
              Y = c;
              return;
            }
            if (null !== a) a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
            else {
              T = 6;
              Y = null;
              return;
            }
          }
          b = b.sibling;
          if (null !== b) {
            Y = b;
            return;
          }
          Y = b = a;
        } while (null !== b);
        0 === T && (T = 5);
      }
      function Pk(a, b, c) {
        var d = C, e = ok.transition;
        try {
          ok.transition = null, C = 1, Wk(a, b, c, d);
        } finally {
          ok.transition = e, C = d;
        }
        return null;
      }
      function Wk(a, b, c, d) {
        do
          Hk();
        while (null !== wk);
        if (0 !== (K & 6)) throw Error(p(327));
        c = a.finishedWork;
        var e = a.finishedLanes;
        if (null === c) return null;
        a.finishedWork = null;
        a.finishedLanes = 0;
        if (c === a.current) throw Error(p(177));
        a.callbackNode = null;
        a.callbackPriority = 0;
        var f = c.lanes | c.childLanes;
        Bc(a, f);
        a === Q && (Y = Q = null, Z = 0);
        0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || vk || (vk = true, Fk(hc, function() {
          Hk();
          return null;
        }));
        f = 0 !== (c.flags & 15990);
        if (0 !== (c.subtreeFlags & 15990) || f) {
          f = ok.transition;
          ok.transition = null;
          var g = C;
          C = 1;
          var h = K;
          K |= 4;
          nk.current = null;
          Oj(a, c);
          dk(c, a);
          Oe(Df);
          dd = !!Cf;
          Df = Cf = null;
          a.current = c;
          hk(c, a, e);
          dc();
          K = h;
          C = g;
          ok.transition = f;
        } else a.current = c;
        vk && (vk = false, wk = a, xk = e);
        f = a.pendingLanes;
        0 === f && (Ri = null);
        mc(c.stateNode, d);
        Dk(a, B());
        if (null !== b) for (d = a.onRecoverableError, c = 0; c < b.length; c++) e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
        if (Oi) throw Oi = false, a = Pi, Pi = null, a;
        0 !== (xk & 1) && 0 !== a.tag && Hk();
        f = a.pendingLanes;
        0 !== (f & 1) ? a === zk ? yk++ : (yk = 0, zk = a) : yk = 0;
        jg();
        return null;
      }
      function Hk() {
        if (null !== wk) {
          var a = Dc(xk), b = ok.transition, c = C;
          try {
            ok.transition = null;
            C = 16 > a ? 16 : a;
            if (null === wk) var d = false;
            else {
              a = wk;
              wk = null;
              xk = 0;
              if (0 !== (K & 6)) throw Error(p(331));
              var e = K;
              K |= 4;
              for (V = a.current; null !== V; ) {
                var f = V, g = f.child;
                if (0 !== (V.flags & 16)) {
                  var h = f.deletions;
                  if (null !== h) {
                    for (var k = 0; k < h.length; k++) {
                      var l = h[k];
                      for (V = l; null !== V; ) {
                        var m = V;
                        switch (m.tag) {
                          case 0:
                          case 11:
                          case 15:
                            Pj(8, m, f);
                        }
                        var q = m.child;
                        if (null !== q) q.return = m, V = q;
                        else for (; null !== V; ) {
                          m = V;
                          var r = m.sibling, y = m.return;
                          Sj(m);
                          if (m === l) {
                            V = null;
                            break;
                          }
                          if (null !== r) {
                            r.return = y;
                            V = r;
                            break;
                          }
                          V = y;
                        }
                      }
                    }
                    var n = f.alternate;
                    if (null !== n) {
                      var t = n.child;
                      if (null !== t) {
                        n.child = null;
                        do {
                          var J = t.sibling;
                          t.sibling = null;
                          t = J;
                        } while (null !== t);
                      }
                    }
                    V = f;
                  }
                }
                if (0 !== (f.subtreeFlags & 2064) && null !== g) g.return = f, V = g;
                else b: for (; null !== V; ) {
                  f = V;
                  if (0 !== (f.flags & 2048)) switch (f.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Pj(9, f, f.return);
                  }
                  var x = f.sibling;
                  if (null !== x) {
                    x.return = f.return;
                    V = x;
                    break b;
                  }
                  V = f.return;
                }
              }
              var w = a.current;
              for (V = w; null !== V; ) {
                g = V;
                var u = g.child;
                if (0 !== (g.subtreeFlags & 2064) && null !== u) u.return = g, V = u;
                else b: for (g = w; null !== V; ) {
                  h = V;
                  if (0 !== (h.flags & 2048)) try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Qj(9, h);
                    }
                  } catch (na) {
                    W(h, h.return, na);
                  }
                  if (h === g) {
                    V = null;
                    break b;
                  }
                  var F = h.sibling;
                  if (null !== F) {
                    F.return = h.return;
                    V = F;
                    break b;
                  }
                  V = h.return;
                }
              }
              K = e;
              jg();
              if (lc && "function" === typeof lc.onPostCommitFiberRoot) try {
                lc.onPostCommitFiberRoot(kc, a);
              } catch (na) {
              }
              d = true;
            }
            return d;
          } finally {
            C = c, ok.transition = b;
          }
        }
        return false;
      }
      function Xk(a, b, c) {
        b = Ji(c, b);
        b = Ni(a, b, 1);
        a = nh(a, b, 1);
        b = R();
        null !== a && (Ac(a, 1, b), Dk(a, b));
      }
      function W(a, b, c) {
        if (3 === a.tag) Xk(a, a, c);
        else for (; null !== b; ) {
          if (3 === b.tag) {
            Xk(b, a, c);
            break;
          } else if (1 === b.tag) {
            var d = b.stateNode;
            if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Ri || !Ri.has(d))) {
              a = Ji(c, a);
              a = Qi(b, a, 1);
              b = nh(b, a, 1);
              a = R();
              null !== b && (Ac(b, 1, a), Dk(b, a));
              break;
            }
          }
          b = b.return;
        }
      }
      function Ti(a, b, c) {
        var d = a.pingCache;
        null !== d && d.delete(b);
        b = R();
        a.pingedLanes |= a.suspendedLanes & c;
        Q === a && (Z & c) === c && (4 === T || 3 === T && (Z & 130023424) === Z && 500 > B() - fk ? Kk(a, 0) : rk |= c);
        Dk(a, b);
      }
      function Yk(a, b) {
        0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
        var c = R();
        a = ih(a, b);
        null !== a && (Ac(a, b, c), Dk(a, c));
      }
      function uj(a) {
        var b = a.memoizedState, c = 0;
        null !== b && (c = b.retryLane);
        Yk(a, c);
      }
      function bk(a, b) {
        var c = 0;
        switch (a.tag) {
          case 13:
            var d = a.stateNode;
            var e = a.memoizedState;
            null !== e && (c = e.retryLane);
            break;
          case 19:
            d = a.stateNode;
            break;
          default:
            throw Error(p(314));
        }
        null !== d && d.delete(b);
        Yk(a, c);
      }
      var Vk;
      Vk = function(a, b, c) {
        if (null !== a) if (a.memoizedProps !== b.pendingProps || Wf.current) dh = true;
        else {
          if (0 === (a.lanes & c) && 0 === (b.flags & 128)) return dh = false, yj(a, b, c);
          dh = 0 !== (a.flags & 131072) ? true : false;
        }
        else dh = false, I && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
        b.lanes = 0;
        switch (b.tag) {
          case 2:
            var d = b.type;
            ij(a, b);
            a = b.pendingProps;
            var e = Yf(b, H.current);
            ch(b, c);
            e = Nh(null, b, d, a, e, c);
            var f = Sh();
            b.flags |= 1;
            "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f = true, cg(b)) : f = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, kh(b), e.updater = Ei, b.stateNode = e, e._reactInternals = b, Ii(b, d, a, c), b = jj(null, b, d, true, f, c)) : (b.tag = 0, I && f && vg(b), Xi(null, b, e, c), b = b.child);
            return b;
          case 16:
            d = b.elementType;
            a: {
              ij(a, b);
              a = b.pendingProps;
              e = d._init;
              d = e(d._payload);
              b.type = d;
              e = b.tag = Zk(d);
              a = Ci(d, a);
              switch (e) {
                case 0:
                  b = cj(null, b, d, a, c);
                  break a;
                case 1:
                  b = hj(null, b, d, a, c);
                  break a;
                case 11:
                  b = Yi(null, b, d, a, c);
                  break a;
                case 14:
                  b = $i(null, b, d, Ci(d.type, a), c);
                  break a;
              }
              throw Error(p(
                306,
                d,
                ""
              ));
            }
            return b;
          case 0:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), cj(a, b, d, e, c);
          case 1:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), hj(a, b, d, e, c);
          case 3:
            a: {
              kj(b);
              if (null === a) throw Error(p(387));
              d = b.pendingProps;
              f = b.memoizedState;
              e = f.element;
              lh(a, b);
              qh(b, d, null, c);
              var g = b.memoizedState;
              d = g.element;
              if (f.isDehydrated) if (f = { element: d, isDehydrated: false, cache: g.cache, pendingSuspenseBoundaries: g.pendingSuspenseBoundaries, transitions: g.transitions }, b.updateQueue.baseState = f, b.memoizedState = f, b.flags & 256) {
                e = Ji(Error(p(423)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else if (d !== e) {
                e = Ji(Error(p(424)), b);
                b = lj(a, b, d, c, e);
                break a;
              } else for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I = true, zg = null, c = Vg(b, null, d, c), b.child = c; c; ) c.flags = c.flags & -3 | 4096, c = c.sibling;
              else {
                Ig();
                if (d === e) {
                  b = Zi(a, b, c);
                  break a;
                }
                Xi(a, b, d, c);
              }
              b = b.child;
            }
            return b;
          case 5:
            return Ah(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f = null !== a ? a.memoizedProps : null, g = e.children, Ef(d, e) ? g = null : null !== f && Ef(d, f) && (b.flags |= 32), gj(a, b), Xi(a, b, g, c), b.child;
          case 6:
            return null === a && Eg(b), null;
          case 13:
            return oj(a, b, c);
          case 4:
            return yh(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Ug(b, null, d, c) : Xi(a, b, d, c), b.child;
          case 11:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), Yi(a, b, d, e, c);
          case 7:
            return Xi(a, b, b.pendingProps, c), b.child;
          case 8:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 12:
            return Xi(a, b, b.pendingProps.children, c), b.child;
          case 10:
            a: {
              d = b.type._context;
              e = b.pendingProps;
              f = b.memoizedProps;
              g = e.value;
              G(Wg, d._currentValue);
              d._currentValue = g;
              if (null !== f) if (He(f.value, g)) {
                if (f.children === e.children && !Wf.current) {
                  b = Zi(a, b, c);
                  break a;
                }
              } else for (f = b.child, null !== f && (f.return = b); null !== f; ) {
                var h = f.dependencies;
                if (null !== h) {
                  g = f.child;
                  for (var k = h.firstContext; null !== k; ) {
                    if (k.context === d) {
                      if (1 === f.tag) {
                        k = mh(-1, c & -c);
                        k.tag = 2;
                        var l = f.updateQueue;
                        if (null !== l) {
                          l = l.shared;
                          var m = l.pending;
                          null === m ? k.next = k : (k.next = m.next, m.next = k);
                          l.pending = k;
                        }
                      }
                      f.lanes |= c;
                      k = f.alternate;
                      null !== k && (k.lanes |= c);
                      bh(
                        f.return,
                        c,
                        b
                      );
                      h.lanes |= c;
                      break;
                    }
                    k = k.next;
                  }
                } else if (10 === f.tag) g = f.type === b.type ? null : f.child;
                else if (18 === f.tag) {
                  g = f.return;
                  if (null === g) throw Error(p(341));
                  g.lanes |= c;
                  h = g.alternate;
                  null !== h && (h.lanes |= c);
                  bh(g, c, b);
                  g = f.sibling;
                } else g = f.child;
                if (null !== g) g.return = f;
                else for (g = f; null !== g; ) {
                  if (g === b) {
                    g = null;
                    break;
                  }
                  f = g.sibling;
                  if (null !== f) {
                    f.return = g.return;
                    g = f;
                    break;
                  }
                  g = g.return;
                }
                f = g;
              }
              Xi(a, b, e.children, c);
              b = b.child;
            }
            return b;
          case 9:
            return e = b.type, d = b.pendingProps.children, ch(b, c), e = eh(e), d = d(e), b.flags |= 1, Xi(a, b, d, c), b.child;
          case 14:
            return d = b.type, e = Ci(d, b.pendingProps), e = Ci(d.type, e), $i(a, b, d, e, c);
          case 15:
            return bj(a, b, b.type, b.pendingProps, c);
          case 17:
            return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Ci(d, e), ij(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, ch(b, c), Gi(b, d, e), Ii(b, d, e, c), jj(null, b, d, true, a, c);
          case 19:
            return xj(a, b, c);
          case 22:
            return dj(a, b, c);
        }
        throw Error(p(156, b.tag));
      };
      function Fk(a, b) {
        return ac(a, b);
      }
      function $k(a, b, c, d) {
        this.tag = a;
        this.key = c;
        this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
        this.index = 0;
        this.ref = null;
        this.pendingProps = b;
        this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
        this.mode = d;
        this.subtreeFlags = this.flags = 0;
        this.deletions = null;
        this.childLanes = this.lanes = 0;
        this.alternate = null;
      }
      function Bg(a, b, c, d) {
        return new $k(a, b, c, d);
      }
      function aj(a) {
        a = a.prototype;
        return !(!a || !a.isReactComponent);
      }
      function Zk(a) {
        if ("function" === typeof a) return aj(a) ? 1 : 0;
        if (void 0 !== a && null !== a) {
          a = a.$$typeof;
          if (a === Da) return 11;
          if (a === Ga) return 14;
        }
        return 2;
      }
      function Pg(a, b) {
        var c = a.alternate;
        null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
        c.flags = a.flags & 14680064;
        c.childLanes = a.childLanes;
        c.lanes = a.lanes;
        c.child = a.child;
        c.memoizedProps = a.memoizedProps;
        c.memoizedState = a.memoizedState;
        c.updateQueue = a.updateQueue;
        b = a.dependencies;
        c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
        c.sibling = a.sibling;
        c.index = a.index;
        c.ref = a.ref;
        return c;
      }
      function Rg(a, b, c, d, e, f) {
        var g = 2;
        d = a;
        if ("function" === typeof a) aj(a) && (g = 1);
        else if ("string" === typeof a) g = 5;
        else a: switch (a) {
          case ya:
            return Tg(c.children, e, f, b);
          case za:
            g = 8;
            e |= 8;
            break;
          case Aa:
            return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f, a;
          case Ea:
            return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f, a;
          case Fa:
            return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f, a;
          case Ia:
            return pj(c, e, f, b);
          default:
            if ("object" === typeof a && null !== a) switch (a.$$typeof) {
              case Ba:
                g = 10;
                break a;
              case Ca:
                g = 9;
                break a;
              case Da:
                g = 11;
                break a;
              case Ga:
                g = 14;
                break a;
              case Ha:
                g = 16;
                d = null;
                break a;
            }
            throw Error(p(130, null == a ? a : typeof a, ""));
        }
        b = Bg(g, c, b, e);
        b.elementType = a;
        b.type = d;
        b.lanes = f;
        return b;
      }
      function Tg(a, b, c, d) {
        a = Bg(7, a, d, b);
        a.lanes = c;
        return a;
      }
      function pj(a, b, c, d) {
        a = Bg(22, a, d, b);
        a.elementType = Ia;
        a.lanes = c;
        a.stateNode = { isHidden: false };
        return a;
      }
      function Qg(a, b, c) {
        a = Bg(6, a, null, b);
        a.lanes = c;
        return a;
      }
      function Sg(a, b, c) {
        b = Bg(4, null !== a.children ? a.children : [], a.key, b);
        b.lanes = c;
        b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
        return b;
      }
      function al(a, b, c, d, e) {
        this.tag = b;
        this.containerInfo = a;
        this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
        this.timeoutHandle = -1;
        this.callbackNode = this.pendingContext = this.context = null;
        this.callbackPriority = 0;
        this.eventTimes = zc(0);
        this.expirationTimes = zc(-1);
        this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
        this.entanglements = zc(0);
        this.identifierPrefix = d;
        this.onRecoverableError = e;
        this.mutableSourceEagerHydrationData = null;
      }
      function bl(a, b, c, d, e, f, g, h, k) {
        a = new al(a, b, c, h, k);
        1 === b ? (b = 1, true === f && (b |= 8)) : b = 0;
        f = Bg(3, null, null, b);
        a.current = f;
        f.stateNode = a;
        f.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
        kh(f);
        return a;
      }
      function cl(a, b, c) {
        var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
        return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
      }
      function dl(a) {
        if (!a) return Vf;
        a = a._reactInternals;
        a: {
          if (Vb(a) !== a || 1 !== a.tag) throw Error(p(170));
          var b = a;
          do {
            switch (b.tag) {
              case 3:
                b = b.stateNode.context;
                break a;
              case 1:
                if (Zf(b.type)) {
                  b = b.stateNode.__reactInternalMemoizedMergedChildContext;
                  break a;
                }
            }
            b = b.return;
          } while (null !== b);
          throw Error(p(171));
        }
        if (1 === a.tag) {
          var c = a.type;
          if (Zf(c)) return bg(a, c, b);
        }
        return b;
      }
      function el(a, b, c, d, e, f, g, h, k) {
        a = bl(c, d, true, a, e, f, g, h, k);
        a.context = dl(null);
        c = a.current;
        d = R();
        e = yi(c);
        f = mh(d, e);
        f.callback = void 0 !== b && null !== b ? b : null;
        nh(c, f, e);
        a.current.lanes = e;
        Ac(a, e, d);
        Dk(a, d);
        return a;
      }
      function fl(a, b, c, d) {
        var e = b.current, f = R(), g = yi(e);
        c = dl(c);
        null === b.context ? b.context = c : b.pendingContext = c;
        b = mh(f, g);
        b.payload = { element: a };
        d = void 0 === d ? null : d;
        null !== d && (b.callback = d);
        a = nh(e, b, g);
        null !== a && (gi(a, e, g, f), oh(a, e, g));
        return g;
      }
      function gl(a) {
        a = a.current;
        if (!a.child) return null;
        switch (a.child.tag) {
          case 5:
            return a.child.stateNode;
          default:
            return a.child.stateNode;
        }
      }
      function hl(a, b) {
        a = a.memoizedState;
        if (null !== a && null !== a.dehydrated) {
          var c = a.retryLane;
          a.retryLane = 0 !== c && c < b ? c : b;
        }
      }
      function il(a, b) {
        hl(a, b);
        (a = a.alternate) && hl(a, b);
      }
      function jl() {
        return null;
      }
      var kl = "function" === typeof reportError ? reportError : function(a) {
        console.error(a);
      };
      function ll(a) {
        this._internalRoot = a;
      }
      ml.prototype.render = ll.prototype.render = function(a) {
        var b = this._internalRoot;
        if (null === b) throw Error(p(409));
        fl(a, b, null, null);
      };
      ml.prototype.unmount = ll.prototype.unmount = function() {
        var a = this._internalRoot;
        if (null !== a) {
          this._internalRoot = null;
          var b = a.containerInfo;
          Rk(function() {
            fl(null, a, null, null);
          });
          b[uf] = null;
        }
      };
      function ml(a) {
        this._internalRoot = a;
      }
      ml.prototype.unstable_scheduleHydration = function(a) {
        if (a) {
          var b = Hc();
          a = { blockedOn: null, target: a, priority: b };
          for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++) ;
          Qc.splice(c, 0, a);
          0 === c && Vc(a);
        }
      };
      function nl(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
      }
      function ol(a) {
        return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
      }
      function pl() {
      }
      function ql(a, b, c, d, e) {
        if (e) {
          if ("function" === typeof d) {
            var f = d;
            d = function() {
              var a2 = gl(g);
              f.call(a2);
            };
          }
          var g = el(b, d, a, 0, null, false, false, "", pl);
          a._reactRootContainer = g;
          a[uf] = g.current;
          sf(8 === a.nodeType ? a.parentNode : a);
          Rk();
          return g;
        }
        for (; e = a.lastChild; ) a.removeChild(e);
        if ("function" === typeof d) {
          var h = d;
          d = function() {
            var a2 = gl(k);
            h.call(a2);
          };
        }
        var k = bl(a, 0, false, null, null, false, false, "", pl);
        a._reactRootContainer = k;
        a[uf] = k.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        Rk(function() {
          fl(b, k, c, d);
        });
        return k;
      }
      function rl(a, b, c, d, e) {
        var f = c._reactRootContainer;
        if (f) {
          var g = f;
          if ("function" === typeof e) {
            var h = e;
            e = function() {
              var a2 = gl(g);
              h.call(a2);
            };
          }
          fl(b, g, a, e);
        } else g = ql(c, b, a, e, d);
        return gl(g);
      }
      Ec = function(a) {
        switch (a.tag) {
          case 3:
            var b = a.stateNode;
            if (b.current.memoizedState.isDehydrated) {
              var c = tc(b.pendingLanes);
              0 !== c && (Cc(b, c | 1), Dk(b, B()), 0 === (K & 6) && (Gj = B() + 500, jg()));
            }
            break;
          case 13:
            Rk(function() {
              var b2 = ih(a, 1);
              if (null !== b2) {
                var c2 = R();
                gi(b2, a, 1, c2);
              }
            }), il(a, 1);
        }
      };
      Fc = function(a) {
        if (13 === a.tag) {
          var b = ih(a, 134217728);
          if (null !== b) {
            var c = R();
            gi(b, a, 134217728, c);
          }
          il(a, 134217728);
        }
      };
      Gc = function(a) {
        if (13 === a.tag) {
          var b = yi(a), c = ih(a, b);
          if (null !== c) {
            var d = R();
            gi(c, a, b, d);
          }
          il(a, b);
        }
      };
      Hc = function() {
        return C;
      };
      Ic = function(a, b) {
        var c = C;
        try {
          return C = a, b();
        } finally {
          C = c;
        }
      };
      yb = function(a, b, c) {
        switch (b) {
          case "input":
            bb(a, c);
            b = c.name;
            if ("radio" === c.type && null != b) {
              for (c = a; c.parentNode; ) c = c.parentNode;
              c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
              for (b = 0; b < c.length; b++) {
                var d = c[b];
                if (d !== a && d.form === a.form) {
                  var e = Db(d);
                  if (!e) throw Error(p(90));
                  Wa(d);
                  bb(d, e);
                }
              }
            }
            break;
          case "textarea":
            ib(a, c);
            break;
          case "select":
            b = c.value, null != b && fb(a, !!c.multiple, b, false);
        }
      };
      Gb = Qk;
      Hb = Rk;
      var sl = { usingClientEntryPoint: false, Events: [Cb, ue, Db, Eb, Fb, Qk] };
      var tl = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" };
      var ul = { bundleType: tl.bundleType, version: tl.version, rendererPackageName: tl.rendererPackageName, rendererConfig: tl.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
        a = Zb(a);
        return null === a ? null : a.stateNode;
      }, findFiberByHostInstance: tl.findFiberByHostInstance || jl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
      if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
        vl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
        if (!vl.isDisabled && vl.supportsFiber) try {
          kc = vl.inject(ul), lc = vl;
        } catch (a) {
        }
      }
      var vl;
      exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sl;
      exports.createPortal = function(a, b) {
        var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
        if (!nl(b)) throw Error(p(200));
        return cl(a, b, null, c);
      };
      exports.createRoot = function(a, b) {
        if (!nl(a)) throw Error(p(299));
        var c = false, d = "", e = kl;
        null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
        b = bl(a, 1, false, null, null, c, false, d, e);
        a[uf] = b.current;
        sf(8 === a.nodeType ? a.parentNode : a);
        return new ll(b);
      };
      exports.findDOMNode = function(a) {
        if (null == a) return null;
        if (1 === a.nodeType) return a;
        var b = a._reactInternals;
        if (void 0 === b) {
          if ("function" === typeof a.render) throw Error(p(188));
          a = Object.keys(a).join(",");
          throw Error(p(268, a));
        }
        a = Zb(b);
        a = null === a ? null : a.stateNode;
        return a;
      };
      exports.flushSync = function(a) {
        return Rk(a);
      };
      exports.hydrate = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, true, c);
      };
      exports.hydrateRoot = function(a, b, c) {
        if (!nl(a)) throw Error(p(405));
        var d = null != c && c.hydratedSources || null, e = false, f = "", g = kl;
        null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f = c.identifierPrefix), void 0 !== c.onRecoverableError && (g = c.onRecoverableError));
        b = el(b, null, a, 1, null != c ? c : null, e, false, f, g);
        a[uf] = b.current;
        sf(a);
        if (d) for (a = 0; a < d.length; a++) c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
          c,
          e
        );
        return new ml(b);
      };
      exports.render = function(a, b, c) {
        if (!ol(b)) throw Error(p(200));
        return rl(null, a, b, false, c);
      };
      exports.unmountComponentAtNode = function(a) {
        if (!ol(a)) throw Error(p(40));
        return a._reactRootContainer ? (Rk(function() {
          rl(null, null, a, false, function() {
            a._reactRootContainer = null;
            a[uf] = null;
          });
        }), true) : false;
      };
      exports.unstable_batchedUpdates = Qk;
      exports.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
        if (!ol(c)) throw Error(p(200));
        if (null == a || void 0 === a._reactInternals) throw Error(p(38));
        return rl(a, b, c, false, d);
      };
      exports.version = "18.3.1-next-f1338f8080-20240426";
    }
  });

  // node_modules/react-dom/index.js
  var require_react_dom = __commonJS({
    "node_modules/react-dom/index.js"(exports, module2) {
      "use strict";
      function checkDCE() {
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
          return;
        }
        if (false) {
          throw new Error("^_^");
        }
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
        } catch (err) {
          console.error(err);
        }
      }
      if (true) {
        checkDCE();
        module2.exports = require_react_dom_production_min();
      } else {
        module2.exports = null;
      }
    }
  });

  // node_modules/react-dom/client.js
  var require_client = __commonJS({
    "node_modules/react-dom/client.js"(exports) {
      "use strict";
      var m = require_react_dom();
      if (true) {
        exports.createRoot = m.createRoot;
        exports.hydrateRoot = m.hydrateRoot;
      } else {
        i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
        exports.createRoot = function(c, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.createRoot(c, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
        exports.hydrateRoot = function(c, h, o) {
          i.usingClientEntryPoint = true;
          try {
            return m.hydrateRoot(c, h, o);
          } finally {
            i.usingClientEntryPoint = false;
          }
        };
      }
      var i;
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.production.min.js
  var require_react_jsx_runtime_production_min = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.production.min.js"(exports) {
      "use strict";
      var f = require_react();
      var k = Symbol.for("react.element");
      var l = Symbol.for("react.fragment");
      var m = Object.prototype.hasOwnProperty;
      var n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner;
      var p = { key: true, ref: true, __self: true, __source: true };
      function q(c, a, g) {
        var b, d = {}, e = null, h = null;
        void 0 !== g && (e = "" + g);
        void 0 !== a.key && (e = "" + a.key);
        void 0 !== a.ref && (h = a.ref);
        for (b in a) m.call(a, b) && !p.hasOwnProperty(b) && (d[b] = a[b]);
        if (c && c.defaultProps) for (b in a = c.defaultProps, a) void 0 === d[b] && (d[b] = a[b]);
        return { $$typeof: k, type: c, key: e, ref: h, props: d, _owner: n.current };
      }
      exports.Fragment = l;
      exports.jsx = q;
      exports.jsxs = q;
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module2) {
      "use strict";
      if (true) {
        module2.exports = require_react_jsx_runtime_production_min();
      } else {
        module2.exports = null;
      }
    }
  });

  // src/student-main.tsx
  var import_react10 = __toESM(require_react(), 1);
  var import_client = __toESM(require_client(), 1);

  // src/student/StudentApp.tsx
  var import_react9 = __toESM(require_react(), 1);

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react2 = __toESM(require_react(), 1);

  // node_modules/lucide-react/dist/esm/shared/src/utils.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react = __toESM(require_react(), 1);

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react.forwardRef)(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => {
      return (0, import_react.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size,
          height: size,
          stroke: color,
          strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
          className: mergeClasses("lucide", className),
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react2.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react2.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(`lucide-${toKebabCase(iconName)}`, className),
        ...props
      })
    );
    Component.displayName = `${iconName}`;
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/arrow-left.js
  var __iconNode = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ];
  var ArrowLeft = createLucideIcon("ArrowLeft", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/arrow-right.js
  var __iconNode2 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
  ];
  var ArrowRight = createLucideIcon("ArrowRight", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/award.js
  var __iconNode3 = [
    [
      "path",
      {
        d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
        key: "1yiouv"
      }
    ],
    ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
  ];
  var Award = createLucideIcon("Award", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/bell.js
  var __iconNode4 = [
    ["path", { d: "M10.268 21a2 2 0 0 0 3.464 0", key: "vwvbt9" }],
    [
      "path",
      {
        d: "M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",
        key: "11g9vi"
      }
    ]
  ];
  var Bell = createLucideIcon("Bell", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/book-open.js
  var __iconNode5 = [
    ["path", { d: "M12 7v14", key: "1akyts" }],
    [
      "path",
      {
        d: "M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
        key: "ruj8y"
      }
    ]
  ];
  var BookOpen = createLucideIcon("BookOpen", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/check.js
  var __iconNode6 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("Check", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var __iconNode7 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("ChevronDown", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/chevron-right.js
  var __iconNode8 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var ChevronRight = createLucideIcon("ChevronRight", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/chevron-up.js
  var __iconNode9 = [["path", { d: "m18 15-6-6-6 6", key: "153udz" }]];
  var ChevronUp = createLucideIcon("ChevronUp", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/circle-check-big.js
  var __iconNode10 = [
    ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
    ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
  ];
  var CircleCheckBig = createLucideIcon("CircleCheckBig", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/circle-check.js
  var __iconNode11 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var CircleCheck = createLucideIcon("CircleCheck", __iconNode11);

  // node_modules/lucide-react/dist/esm/icons/circle-x.js
  var __iconNode12 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m15 9-6 6", key: "1uzhvr" }],
    ["path", { d: "m9 9 6 6", key: "z0biqf" }]
  ];
  var CircleX = createLucideIcon("CircleX", __iconNode12);

  // node_modules/lucide-react/dist/esm/icons/crown.js
  var __iconNode13 = [
    [
      "path",
      {
        d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
        key: "1vdc57"
      }
    ],
    ["path", { d: "M5 21h14", key: "11awu3" }]
  ];
  var Crown = createLucideIcon("Crown", __iconNode13);

  // node_modules/lucide-react/dist/esm/icons/dices.js
  var __iconNode14 = [
    ["rect", { width: "12", height: "12", x: "2", y: "10", rx: "2", ry: "2", key: "6agr2n" }],
    [
      "path",
      { d: "m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6", key: "1o487t" }
    ],
    ["path", { d: "M6 18h.01", key: "uhywen" }],
    ["path", { d: "M10 14h.01", key: "ssrbsk" }],
    ["path", { d: "M15 6h.01", key: "cblpky" }],
    ["path", { d: "M18 9h.01", key: "2061c0" }]
  ];
  var Dices = createLucideIcon("Dices", __iconNode14);

  // node_modules/lucide-react/dist/esm/icons/flame.js
  var __iconNode15 = [
    [
      "path",
      {
        d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",
        key: "96xj49"
      }
    ]
  ];
  var Flame = createLucideIcon("Flame", __iconNode15);

  // node_modules/lucide-react/dist/esm/icons/gamepad-2.js
  var __iconNode16 = [
    ["line", { x1: "6", x2: "10", y1: "11", y2: "11", key: "1gktln" }],
    ["line", { x1: "8", x2: "8", y1: "9", y2: "13", key: "qnk9ow" }],
    ["line", { x1: "15", x2: "15.01", y1: "12", y2: "12", key: "krot7o" }],
    ["line", { x1: "18", x2: "18.01", y1: "10", y2: "10", key: "1lcuu1" }],
    [
      "path",
      {
        d: "M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",
        key: "mfqc10"
      }
    ]
  ];
  var Gamepad2 = createLucideIcon("Gamepad2", __iconNode16);

  // node_modules/lucide-react/dist/esm/icons/house.js
  var __iconNode17 = [
    ["path", { d: "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8", key: "5wwlr5" }],
    [
      "path",
      {
        d: "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
        key: "1d0kgt"
      }
    ]
  ];
  var House = createLucideIcon("House", __iconNode17);

  // node_modules/lucide-react/dist/esm/icons/info.js
  var __iconNode18 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 16v-4", key: "1dtifu" }],
    ["path", { d: "M12 8h.01", key: "e9boi3" }]
  ];
  var Info = createLucideIcon("Info", __iconNode18);

  // node_modules/lucide-react/dist/esm/icons/log-out.js
  var __iconNode19 = [
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }],
    ["polyline", { points: "16 17 21 12 16 7", key: "1gabdz" }],
    ["line", { x1: "21", x2: "9", y1: "12", y2: "12", key: "1uyos4" }]
  ];
  var LogOut = createLucideIcon("LogOut", __iconNode19);

  // node_modules/lucide-react/dist/esm/icons/play.js
  var __iconNode20 = [["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]];
  var Play = createLucideIcon("Play", __iconNode20);

  // node_modules/lucide-react/dist/esm/icons/refresh-cw.js
  var __iconNode21 = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ];
  var RefreshCw = createLucideIcon("RefreshCw", __iconNode21);

  // node_modules/lucide-react/dist/esm/icons/rotate-ccw.js
  var __iconNode22 = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ];
  var RotateCcw = createLucideIcon("RotateCcw", __iconNode22);

  // node_modules/lucide-react/dist/esm/icons/shield-check.js
  var __iconNode23 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var ShieldCheck = createLucideIcon("ShieldCheck", __iconNode23);

  // node_modules/lucide-react/dist/esm/icons/smartphone.js
  var __iconNode24 = [
    ["rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2", key: "1yt0o3" }],
    ["path", { d: "M12 18h.01", key: "mhygvu" }]
  ];
  var Smartphone = createLucideIcon("Smartphone", __iconNode24);

  // node_modules/lucide-react/dist/esm/icons/sparkles.js
  var __iconNode25 = [
    [
      "path",
      {
        d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
        key: "4pj2yx"
      }
    ],
    ["path", { d: "M20 3v4", key: "1olli1" }],
    ["path", { d: "M22 5h-4", key: "1gvqau" }],
    ["path", { d: "M4 17v2", key: "vumght" }],
    ["path", { d: "M5 18H3", key: "zchphs" }]
  ];
  var Sparkles = createLucideIcon("Sparkles", __iconNode25);

  // node_modules/lucide-react/dist/esm/icons/star.js
  var __iconNode26 = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ];
  var Star = createLucideIcon("Star", __iconNode26);

  // node_modules/lucide-react/dist/esm/icons/swords.js
  var __iconNode27 = [
    ["polyline", { points: "14.5 17.5 3 6 3 3 6 3 17.5 14.5", key: "1hfsw2" }],
    ["line", { x1: "13", x2: "19", y1: "19", y2: "13", key: "1vrmhu" }],
    ["line", { x1: "16", x2: "20", y1: "16", y2: "20", key: "1bron3" }],
    ["line", { x1: "19", x2: "21", y1: "21", y2: "19", key: "13pww6" }],
    ["polyline", { points: "14.5 6.5 18 3 21 3 21 6 17.5 9.5", key: "hbey2j" }],
    ["line", { x1: "5", x2: "9", y1: "14", y2: "18", key: "1hf58s" }],
    ["line", { x1: "7", x2: "4", y1: "17", y2: "20", key: "pidxm4" }],
    ["line", { x1: "3", x2: "5", y1: "19", y2: "21", key: "1pehsh" }]
  ];
  var Swords = createLucideIcon("Swords", __iconNode27);

  // node_modules/lucide-react/dist/esm/icons/trophy.js
  var __iconNode28 = [
    ["path", { d: "M6 9H4.5a2.5 2.5 0 0 1 0-5H6", key: "17hqa7" }],
    ["path", { d: "M18 9h1.5a2.5 2.5 0 0 0 0-5H18", key: "lmptdp" }],
    ["path", { d: "M4 22h16", key: "57wxv0" }],
    ["path", { d: "M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22", key: "1nw9bq" }],
    ["path", { d: "M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22", key: "1np0yb" }],
    ["path", { d: "M18 2H6v7a6 6 0 0 0 12 0V2Z", key: "u46fv3" }]
  ];
  var Trophy = createLucideIcon("Trophy", __iconNode28);

  // node_modules/lucide-react/dist/esm/icons/tv.js
  var __iconNode29 = [
    ["rect", { width: "20", height: "15", x: "2", y: "7", rx: "2", ry: "2", key: "10ag99" }],
    ["polyline", { points: "17 2 12 7 7 2", key: "11pgbg" }]
  ];
  var Tv = createLucideIcon("Tv", __iconNode29);

  // node_modules/lucide-react/dist/esm/icons/users.js
  var __iconNode30 = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["path", { d: "M16 3.13a4 4 0 0 1 0 7.75", key: "1da9ce" }]
  ];
  var Users = createLucideIcon("Users", __iconNode30);

  // node_modules/lucide-react/dist/esm/icons/wrench.js
  var __iconNode31 = [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
        key: "cbrjhi"
      }
    ]
  ];
  var Wrench = createLucideIcon("Wrench", __iconNode31);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode32 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("X", __iconNode32);

  // src/student/components/StudentHeader.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
  var StudentHeader = ({ onOpenJoinModal }) => {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-pink-100 shadow-xs", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3 cursor-pointer select-none group", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-rose-500 to-amber-400 p-0.5 shadow-md shadow-pink-200 transform group-hover:scale-105 transition-transform duration-300", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full h-full bg-white rounded-[14px] flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-2xl transform group-hover:rotate-12 transition-transform duration-300", children: "\u{1F680}" }) }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-1.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-2xl sm:text-3xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 font-sans", children: "Educineva" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-black bg-amber-400 text-amber-950 shadow-xs uppercase tracking-wider transform -rotate-2", children: "Kids" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-xs font-semibold text-gray-500 flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "w-3 h-3 text-pink-500" }),
            "\u5FEB\u4E50\u5B66\u4E60 \xB7 \u6E38\u620F\u7ADE\u6280\u4E50\u56ED"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        "button",
        {
          onClick: onOpenJoinModal,
          className: "group relative inline-flex items-center justify-center gap-2.5 px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-white font-black text-base sm:text-lg bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 shadow-lg shadow-pink-300/60 hover:shadow-xl hover:shadow-pink-400/80 transform hover:-translate-y-0.5 active:translate-y-0.5 active:scale-95 transition-all duration-200 overflow-hidden cursor-pointer",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gamepad2, { className: "w-6 h-6 animate-bounce text-white drop-shadow-sm" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "tracking-wide drop-shadow-xs", children: "\u{1F3AE} \u52A0\u5165\u623F\u95F4" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "w-4 h-4 fill-amber-200 text-amber-200 hidden sm:inline-block animate-pulse" })
          ]
        }
      ) })
    ] }) });
  };

  // src/student/components/GameGallery.tsx
  var import_react3 = __toESM(require_react(), 1);

  // src/student/mockData.ts
  var CARTOON_AVATARS = [
    { id: "avatar_bear", name: "\u673A\u667A\u5C0F\u718A", src: "./assets/games/char_a.png", bgColor: "bg-amber-100" },
    { id: "avatar_bunny", name: "\u5143\u6C14\u7075\u5154", src: "./assets/games/char_b.png", bgColor: "bg-pink-100" },
    { id: "avatar_astronaut", name: "\u661F\u7A7A\u9886\u822A\u5458", src: "./assets/games/space.png", bgColor: "bg-indigo-100" },
    { id: "avatar_racer", name: "\u6781\u901F\u5C0F\u8D5B\u624B", src: "./assets/games/racing.png", bgColor: "bg-cyan-100" },
    { id: "avatar_warrior", name: "\u62D4\u6CB3\u5148\u950B", src: "./assets/games/tug-of-war.png", bgColor: "bg-rose-100" },
    { id: "avatar_knight", name: "\u57CE\u5821\u5B88\u62A4\u8005", src: "./assets/games/castle.png", bgColor: "bg-emerald-100" },
    { id: "avatar_mvp", name: "\u7403\u573A\u795E\u5C04\u624B", src: "./assets/games/basketball.png", bgColor: "bg-orange-100" },
    { id: "avatar_scholar", name: "\u667A\u591A\u661F\u8FBE\u4EBA", src: "./assets/games/quiz-quest.png", bgColor: "bg-purple-100" }
  ];
  var STUDENT_GAMES = [
    {
      id: "game_racing",
      name: "\u6781\u901F\u8D5B\u8F66\u6311\u6218",
      englishName: "Turbo Math Racer",
      tag: "\u654F\u6377\u7B54\u9898",
      category: "battle",
      categoryLabel: "\u53CC\u961F\u7ADE\u901F",
      coverImage: "./assets/games/racing.png",
      description: "\u7B54\u5BF9\u9898\u76EE\u7ACB\u5373\u6C2E\u6C14\u52A0\u901F\uFF01\u4E0E\u5C0F\u4F19\u4F34\u7EC4\u961F\uFF0C\u5728\u73AF\u5F62\u8D5B\u9053\u4E0A\u6F02\u79FB\u7ADE\u901F\u5427\uFF01",
      accentColor: "#3b82f6",
      bgGradient: "from-blue-500 to-indigo-600",
      badgeText: "\u{1F525} \u6700\u53D7\u6B22\u8FCE",
      isPopular: true
    },
    {
      id: "game_tug_of_war",
      name: "\u529B\u62D4\u5343\u94A7\u62D4\u6CB3\u8D5B",
      englishName: "Tug of War Clash",
      tag: "\u56E2\u961F\u5408\u4F5C",
      category: "battle",
      categoryLabel: "\u9635\u8425\u5BF9\u51B3",
      coverImage: "./assets/games/tug-of-war.png",
      description: "\u5168\u73ED\u5206\u4E3A\u7EA2\u84DD\u4E24\u961F\uFF01\u7B54\u9898\u8D8A\u5FEB\u8D8A\u51C6\uFF0C\u7EF3\u7D22\u5C31\u671D\u4F60\u7684\u961F\u4F0D\u62C9\u8FD1\u4E00\u5206\uFF01",
      accentColor: "#ef4444",
      bgGradient: "from-rose-500 to-red-600",
      badgeText: "\u26A1 \u73ED\u7EA7\u5FC5\u73A9",
      isPopular: true
    },
    {
      id: "game_quiz_quest",
      name: "\u77E5\u8BC6\u5927\u95EF\u5173 (Match Shift)",
      englishName: "Quiz Quest Mania",
      tag: "\u76CA\u667A\u6D88\u9664",
      category: "puzzle",
      categoryLabel: "\u76CA\u667A\u6D88\u9664",
      coverImage: "./assets/games/quiz-quest.png",
      description: "\u8DA3\u5473\u8FDE\u51FB\u4E0E\u77E5\u8BC6\u65B9\u5757\u6D88\u9664\uFF01\u7528\u667A\u6167\u51B2\u7834\u8FF7\u96FE\u5173\u5361\uFF0C\u89E3\u9501\u795E\u79D8\u77E5\u8BC6\u5B9D\u7BB1\uFF01",
      accentColor: "#8b5cf6",
      bgGradient: "from-purple-500 to-violet-600",
      badgeText: "\u2B50 \u8111\u529B\u6FC0\u53D1",
      isPopular: true
    },
    {
      id: "game_space",
      name: "\u661F\u9645\u63A2\u7D22\u98DE\u8239",
      englishName: "Galaxy Explorer",
      tag: "\u79D1\u5B66\u63A2\u79D8",
      category: "action",
      categoryLabel: "\u592A\u7A7A\u5192\u9669",
      coverImage: "./assets/games/space.png",
      description: "\u6536\u96C6\u5B87\u5B99\u80FD\u91CF\u5757\uFF01\u56DE\u7B54\u79D1\u5B66\u4E0E\u5E38\u8BC6\u95EE\u9898\uFF0C\u4E3A\u706B\u7BAD\u6CE8\u5165\u8D85\u5149\u901F\u63A8\u8FDB\u71C3\u6599\uFF01",
      accentColor: "#06b6d4",
      bgGradient: "from-cyan-500 to-teal-600",
      badgeText: "\u{1F680} \u79D1\u5E7B\u5192\u9669",
      isPopular: false
    },
    {
      id: "game_basketball",
      name: "\u704C\u7BEE\u9AD8\u624B\u5BF9\u51B3",
      englishName: "Slam Dunk Quiz",
      tag: "\u8FD0\u52A8\u7ADE\u6280",
      category: "action",
      categoryLabel: "\u8FD0\u52A8\u7ADE\u6280",
      coverImage: "./assets/games/basketball.png",
      description: "\u4E09\u5206\u795E\u5C04\uFF0C\u767E\u6B65\u7A7F\u6768\uFF01\u9009\u62E9\u6B63\u786E\u7B54\u6848\uFF0C\u7CBE\u51C6\u7A7A\u5FC3\u5165\u7F51\u5F15\u7206\u5168\u573A\u6B22\u547C\uFF01",
      accentColor: "#f97316",
      bgGradient: "from-orange-500 to-amber-600",
      badgeText: "\u{1F3C0} \u71C3\u7206\u5168\u573A",
      isPopular: false
    },
    {
      id: "game_castle",
      name: "\u738B\u56FD\u4FDD\u536B\u6218",
      englishName: "Kingdom Defender",
      tag: "\u7B56\u7565\u9632\u5FA1",
      category: "puzzle",
      categoryLabel: "\u7B56\u7565\u95EF\u5173",
      coverImage: "./assets/games/castle.png",
      description: "\u7528\u77E5\u8BC6\u7B51\u9020\u575A\u4E0D\u53EF\u6467\u7684\u9B54\u6CD5\u57CE\u5899\uFF01\u62B5\u5FA1\u77E5\u8BC6\u602A\u517D\u7684\u8FDB\u653B\uFF0C\u4FDD\u536B\u738B\u56FD\u8363\u8000\uFF01",
      accentColor: "#10b981",
      bgGradient: "from-emerald-500 to-teal-600",
      badgeText: "\u{1F6E1}\uFE0F \u5B88\u62A4\u9A91\u58EB",
      isPopular: false
    }
  ];
  var MOCK_QUIZ_QUESTIONS = [
    {
      id: 1,
      number: 1,
      total: 5,
      prompt: "\u8BA1\u7B97\u8DA3\u5473\u9898\uFF1A3 + 5 = ?",
      type: "single",
      points: 100,
      timeLimit: 15,
      category: "\u8DA3\u5473\u6570\u5B66",
      options: [
        { key: "A", text: "6", color: "red" },
        { key: "B", text: "7", color: "blue" },
        { key: "C", text: "8", color: "yellow" },
        { key: "D", text: "9", color: "green" }
      ],
      // 离线单机评测用参考索引（实际网络环境下由后端判定下发）
      correctOptionIndex: 2,
      // 'C'
      explanation: "3 \u52A0\u4E0A 5 \u7B49\u4E8E 8\uFF0C\u592A\u68D2\u4E86\uFF01"
    },
    {
      id: 2,
      number: 2,
      total: 5,
      prompt: "\u81EA\u7136\u79D1\u5B66\u5E38\u8BC6\uFF1A\u592A\u9633\u7CFB\u4E2D\u4F53\u79EF\u6700\u5927\u7684\u884C\u661F\u662F\u54EA\u4E00\u9897\uFF1F",
      type: "single",
      points: 100,
      timeLimit: 15,
      category: "\u592A\u7A7A\u63A2\u7D22",
      options: [
        { key: "A", text: "\u5730\u7403", color: "red" },
        { key: "B", text: "\u706B\u661F", color: "blue" },
        { key: "C", text: "\u6728\u661F", color: "yellow" },
        { key: "D", text: "\u571F\u661F", color: "green" }
      ],
      correctOptionIndex: 2,
      // 'C'
      explanation: "\u6728\u661F\u662F\u592A\u9633\u7CFB\u4E2D\u6700\u5927\u7684\u884C\u661F\uFF0C\u8D28\u91CF\u662F\u6240\u6709\u5176\u4ED6\u884C\u661F\u603B\u548C\u76842.5\u500D\uFF01"
    },
    {
      id: 3,
      number: 3,
      total: 5,
      prompt: "\u56DB\u5B63\u63A2\u7D22\uFF1A\u63A5\u5929\u83B2\u53F6\u65E0\u7A77\u78A7\uFF0C\u6620\u65E5\u8377\u82B1\u522B\u6837\u7EA2\u3002\u8377\u82B1\u76DB\u5F00\u5728\u54EA\u4E00\u4E2A\u5B63\u8282\uFF1F",
      type: "single",
      points: 100,
      timeLimit: 15,
      category: "\u8BD7\u8BCD\u5E38\u8BC6",
      options: [
        { key: "A", text: "\u6625\u5B63", color: "red" },
        { key: "B", text: "\u590F\u5B63", color: "blue" },
        { key: "C", text: "\u79CB\u5B63", color: "yellow" },
        { key: "D", text: "\u51AC\u5B63", color: "green" }
      ],
      correctOptionIndex: 1,
      // 'B'
      explanation: "\u8377\u82B1\u5728\u708E\u70ED\u7684\u590F\u5B63\u76DB\u5F00\uFF0C\u662F\u590F\u5929\u7684\u4EE3\u8868\u82B1\u5349\u3002"
    },
    {
      id: 4,
      number: 4,
      total: 5,
      prompt: "\u52A8\u7269\u738B\u56FD\uFF1A\u5728\u6211\u56FD\u4F20\u7EDF\u6587\u5316\u4E2D\uFF0C\u989D\u5934\u6709\u201C\u738B\u201D\u5B57\u7EB9\u6837\u3001\u88AB\u5C0A\u79F0\u4E3A\u767E\u517D\u4E4B\u738B\u7684\u662F\uFF1F",
      type: "single",
      points: 100,
      timeLimit: 15,
      category: "\u81EA\u7136\u751F\u7269",
      options: [
        { key: "A", text: "\u4E1C\u5317\u864E (\u8001\u864E)", color: "red" },
        { key: "B", text: "\u975E\u6D32\u96C4\u72EE", color: "blue" },
        { key: "C", text: "\u68EE\u6797\u5927\u8C61", color: "yellow" },
        { key: "D", text: "\u654F\u6377\u91D1\u94B1\u8C79", color: "green" }
      ],
      correctOptionIndex: 0,
      // 'A'
      explanation: "\u8001\u864E\u989D\u5934\u4E0A\u5929\u7136\u6709\u7C7B\u4F3C\u201C\u738B\u201D\u5B57\u7684\u6591\u7EB9\uFF0C\u88AB\u79F0\u4E3A\u767E\u517D\u4E4B\u738B\u3002"
    },
    {
      id: 5,
      number: 5,
      total: 5,
      prompt: "\u5730\u7406\u5E38\u8BC6\uFF1A\u5929\u5B89\u95E8\u5E7F\u573A\u4E0E\u4E07\u91CC\u957F\u57CE\u6240\u5728\u7684\u4E2D\u56FD\u9996\u90FD\u662F\u54EA\u5EA7\u5386\u53F2\u540D\u57CE\uFF1F",
      type: "single",
      points: 100,
      timeLimit: 15,
      category: "\u4EBA\u6587\u5730\u7406",
      options: [
        { key: "A", text: "\u4E0A\u6D77", color: "red" },
        { key: "B", text: "\u5E7F\u5DDE", color: "blue" },
        { key: "C", text: "\u5317\u4EAC", color: "yellow" },
        { key: "D", text: "\u897F\u5B89", color: "green" }
      ],
      correctOptionIndex: 2,
      // 'C'
      explanation: "\u5317\u4EAC\u662F\u4E2D\u534E\u4EBA\u6C11\u5171\u548C\u56FD\u7684\u9996\u90FD\uFF0C\u62E5\u6709\u60A0\u4E45\u707F\u70C2\u7684\u5386\u53F2\u6587\u5316\uFF01"
    }
  ];
  var PRESET_TEAMS = {
    blue: {
      id: "blue",
      name: "\u{1F7E6} \u84DD\u961F\u52C7\u58EB",
      shortName: "\u84DD\u961F",
      slogan: "\u4E58\u98CE\u7834\u6D6A \xB7 \u667A\u52C7\u53CC\u5168\uFF01",
      colorHex: "#3b82f6",
      gradientBg: "from-blue-600 via-indigo-600 to-sky-500",
      borderClass: "border-blue-400",
      textClass: "text-blue-600",
      badgeBg: "bg-blue-100 text-blue-800",
      icon: "\u{1F6E1}\uFE0F"
    },
    red: {
      id: "red",
      name: "\u{1F7E5} \u7EA2\u961F\u5148\u950B",
      shortName: "\u7EA2\u961F",
      slogan: "\u70C8\u7130\u51B2\u950B \xB7 \u6240\u5411\u62AB\u9761\uFF01",
      colorHex: "#ef4444",
      gradientBg: "from-rose-600 via-red-600 to-amber-500",
      borderClass: "border-rose-400",
      textClass: "text-rose-600",
      badgeBg: "bg-rose-100 text-rose-800",
      icon: "\u2694\uFE0F"
    },
    yellow: {
      id: "yellow",
      name: "\u{1F7E8} \u9EC4\u961F\u95EA\u7535",
      shortName: "\u9EC4\u961F",
      slogan: "\u75BE\u98CE\u8FC5\u96F7 \xB7 \u52BF\u4E0D\u53EF\u6321\uFF01",
      colorHex: "#eab308",
      gradientBg: "from-amber-500 via-yellow-500 to-orange-500",
      borderClass: "border-amber-400",
      textClass: "text-amber-600",
      badgeBg: "bg-amber-100 text-amber-800",
      icon: "\u26A1"
    },
    green: {
      id: "green",
      name: "\u{1F7E9} \u7EFF\u961F\u795E\u9E70",
      shortName: "\u7EFF\u961F",
      slogan: "\u654F\u9510\u5982\u9E70 \xB7 \u7834\u98CE\u7FF1\u7FD4\uFF01",
      colorHex: "#10b981",
      gradientBg: "from-emerald-600 via-teal-600 to-green-500",
      borderClass: "border-emerald-400",
      textClass: "text-emerald-600",
      badgeBg: "bg-emerald-100 text-emerald-800",
      icon: "\u{1F985}"
    }
  };
  var MOCK_TEAMMATES = [
    { id: "tm_1", name: "\u673A\u667A\u5929\u5929", avatar: "./assets/games/char_a.png", teamId: "blue", isReady: true },
    { id: "tm_2", name: "\u5143\u6C14\u9633\u9633", avatar: "./assets/games/char_b.png", teamId: "blue", isReady: true },
    { id: "tm_3", name: "\u661F\u7A7A\u679C\u679C", avatar: "./assets/games/space.png", teamId: "blue", isReady: true },
    { id: "tm_4", name: "\u6781\u901F\u6D69\u6D69", avatar: "./assets/games/racing.png", teamId: "blue", isReady: true },
    { id: "tm_5", name: "\u62D4\u6CB3\u5C0F\u96E8", avatar: "./assets/games/tug-of-war.png", teamId: "blue", isReady: true },
    { id: "tm_6", name: "\u5B66\u9738\u5C0F\u6DB5", avatar: "./assets/games/quiz-quest.png", teamId: "red", isReady: true },
    { id: "tm_7", name: "\u57CE\u5821\u6735\u6735", avatar: "./assets/games/castle.png", teamId: "red", isReady: true },
    { id: "tm_8", name: "\u795E\u5C04\u5C0F\u5B87", avatar: "./assets/games/basketball.png", teamId: "red", isReady: true },
    { id: "tm_9", name: "\u654F\u6377\u5C0F\u53EF", avatar: "./assets/games/char_a.png", teamId: "red", isReady: true },
    { id: "tm_10", name: "\u98DE\u8DC3\u4E50\u4E50", avatar: "./assets/games/racing.png", teamId: "red", isReady: true },
    { id: "tm_11", name: "\u63A2\u7D22\u5C0F\u5CF0", avatar: "./assets/games/space.png", teamId: "blue", isReady: true },
    { id: "tm_12", name: "\u667A\u56CA\u5C0F\u8587", avatar: "./assets/games/quiz-quest.png", teamId: "red", isReady: true }
  ];
  var MOCK_SETTLEMENT_DATA = {
    totalScore: 480,
    rank: 2,
    totalParticipants: 28,
    correctCount: 4,
    wrongCount: 1,
    winningTeamName: "\u{1F7E6} \u84DD\u961F\u52C7\u58EB",
    winningTeamColor: "#3b82f6",
    podium: [
      { rank: 1, teamName: "\u84DD\u961F\u5148\u950B", score: 1250, members: ["\u5C0F\u660E", "\u5929\u5929", "\u6DB5\u6DB5"] },
      { rank: 2, teamName: "\u7EA2\u961F\u706B\u9F99", score: 980, members: ["\u4F60", "\u679C\u679C", "\u9633\u9633"] },
      { rank: 3, teamName: "\u7EFF\u961F\u795E\u9E70", score: 820, members: ["\u6D69\u6D69", "\u6735\u6735", "\u5C0F\u96E8"] }
    ],
    mistakes: [
      {
        questionNumber: 3,
        prompt: "\u4E0B\u9762\u54EA\u4E00\u4E2A\u56FE\u5F62\u7684\u5185\u89D2\u548C\u662F 360 \u5EA6\uFF1F",
        studentAnswer: "A. \u4E09\u89D2\u5F62",
        correctAnswer: "B. \u957F\u65B9\u5F62",
        explanation: "\u4E09\u89D2\u5F62\u5185\u89D2\u548C\u662F 180 \u5EA6\uFF0C\u957F\u65B9\u5F62\u67094\u4E2A\u76F4\u89D2\uFF0C4 \xD7 90\xB0 = 360 \u5EA6\u3002"
      }
    ]
  };

  // src/student/components/GameGallery.tsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
  var GameGallery = ({ onJoinRoomClick, onPreviewGame }) => {
    const [filter, setFilter] = (0, import_react3.useState)("all");
    const [activeTrialGame, setActiveTrialGame] = (0, import_react3.useState)(null);
    const filteredGames = STUDENT_GAMES.filter((g) => {
      if (filter === "all") return true;
      return g.category === filter;
    });
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-24 space-y-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative overflow-hidden rounded-3xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 p-6 sm:p-10 text-white shadow-xl shadow-pink-200/50", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute -right-8 -bottom-10 w-48 h-48 sm:w-64 sm:h-64 opacity-25 rounded-full bg-white blur-2xl pointer-events-none" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative z-10 max-w-2xl space-y-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-bold tracking-wide", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Sparkles, { className: "w-4 h-4 text-amber-300 animate-spin" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u8BFE\u5802\u4E92\u52A8 \xB7 \u8DA3\u5473\u5BF9\u6218 \xB7 \u77E5\u8BC6\u5347\u7EA7" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "text-2xl sm:text-4xl font-black tracking-tight drop-shadow-sm", children: "\u6B22\u8FCE\u6765\u5230 Educineva \u6E38\u620F\u4E50\u56ED\uFF01\u{1F389}" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-white/90 text-sm sm:text-base font-medium leading-relaxed", children: [
            "\u8F93\u5165\u8001\u5E08\u7ED9\u7684 ",
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "font-extrabold text-amber-300 underline underline-offset-4", children: "6 \u4F4D\u623F\u95F4 PIN \u7801" }),
            " \u5373\u53EF\u706B\u901F\u7EC4\u961F\u5F00\u6218\uFF01\u5148\u6311\u4E00\u6B3E\u559C\u6B22\u7684\u6E38\u620F\u8BD5\u73A9\u70ED\u8EAB\u5427\uFF01"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "pt-2 flex flex-wrap gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              onClick: onJoinRoomClick,
              className: "inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white text-pink-600 font-black text-sm sm:text-base shadow-md hover:bg-amber-50 transform hover:scale-105 active:scale-95 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u{1F3AE} \u8F93\u5165 PIN \u7801\u52A0\u5165" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChevronRight, { className: "w-4 h-4" })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between gap-2 overflow-x-auto pb-2 scrollbar-none", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: () => setFilter("all"),
              className: `px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs ${filter === "all" ? "bg-pink-600 text-white shadow-pink-200 shadow-md scale-105" : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"}`,
              children: "\u{1F31F} \u5168\u90E8\u6E38\u620F"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              onClick: () => setFilter("battle"),
              className: `px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${filter === "battle" ? "bg-blue-600 text-white shadow-blue-200 shadow-md scale-105" : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Swords, { className: "w-4 h-4" }),
                "\u9635\u8425\u53CC\u961F\u5BF9\u51B3"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              onClick: () => setFilter("puzzle"),
              className: `px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${filter === "puzzle" ? "bg-purple-600 text-white shadow-purple-200 shadow-md scale-105" : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Sparkles, { className: "w-4 h-4" }),
                "\u76CA\u667A\u8111\u529B\u6D88\u9664"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "button",
            {
              onClick: () => setFilter("action"),
              className: `px-5 py-2.5 rounded-2xl text-sm font-black transition-all cursor-pointer shadow-xs flex items-center gap-1.5 ${filter === "action" ? "bg-amber-500 text-white shadow-amber-200 shadow-md scale-105" : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 border border-gray-200"}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Flame, { className: "w-4 h-4" }),
                "\u592A\u7A7A\u4E0E\u4F53\u80B2\u7ADE\u6280"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "text-xs font-bold text-gray-400 hidden sm:inline-block", children: [
          "\u5171 ",
          filteredGames.length,
          " \u6B3E\u8DA3\u5473\u6E38\u620F"
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredGames.map((game) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "div",
        {
          className: "group relative bg-white rounded-3xl p-4 sm:p-5 border-2 border-gray-100 shadow-md hover:shadow-2xl hover:border-pink-300 transition-all duration-300 flex flex-col justify-between overflow-hidden transform hover:-translate-y-1.5",
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs font-black bg-pink-50 text-pink-600 border border-pink-200", children: game.badgeText }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-1 rounded-lg", children: game.categoryLabel })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-100 to-slate-200 mb-4 flex items-center justify-center p-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "img",
                {
                  src: game.coverImage,
                  alt: game.name,
                  className: "w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md",
                  loading: "lazy",
                  onError: (e) => {
                    e.target.style.display = "none";
                  }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-xs font-bold text-white bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-xs", children: "\u{1F3AE} \u70B9\u51FB\u4E0B\u65B9\u8BD5\u73A9" }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-1.5 mb-5 flex-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-lg sm:text-xl font-black text-gray-800 group-hover:text-pink-600 transition-colors", children: game.name }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs text-gray-400 font-semibold", children: game.englishName }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xs sm:text-sm text-gray-600 leading-relaxed font-medium line-clamp-2", children: game.description })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pt-2 border-t border-gray-100 flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveTrialGame(game);
                    if (onPreviewGame) onPreviewGame(game);
                  },
                  className: "flex-1 py-2.5 px-3 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-amber-200 transition-colors cursor-pointer",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Play, { className: "w-4 h-4 fill-amber-500 text-amber-500" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u5355\u4EBA\u8BD5\u73A9" })
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: onJoinRoomClick,
                  className: "flex-1 py-2.5 px-3 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm shadow-pink-200 transition-all cursor-pointer",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Users, { className: "w-4 h-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u8BFE\u5802\u5BF9\u6218" })
                  ]
                }
              )
            ] })
          ]
        },
        game.id
      )) }),
      activeTrialGame && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border-2 border-amber-300 shadow-2xl animate-in fade-in zoom-in-95 duration-200", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "text-2xl", children: "\u{1F3AE}" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h4", { className: "text-lg font-black text-gray-800", children: [
              activeTrialGame.name,
              " - \u8BD5\u73A9\u987B\u77E5"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: () => setActiveTrialGame(null),
              className: "w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 flex items-center justify-center cursor-pointer",
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-full h-36 rounded-2xl bg-gradient-to-tr from-amber-50 to-pink-50 flex items-center justify-center p-3 border border-amber-100", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: activeTrialGame.coverImage, alt: "", className: "h-full object-contain" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-sm text-gray-600 leading-relaxed font-medium", children: activeTrialGame.description }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "bg-blue-50 text-blue-800 p-3 rounded-2xl text-xs font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Award, { className: "w-4 h-4 text-blue-600 shrink-0" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "\u8001\u5E08\u53D1\u8D77\u8BFE\u5802\u5BF9\u6218\u65F6\uFF0C\u8F93\u5165 6 \u4F4D PIN \u7801\u5373\u53EF\u4E0E\u5168\u73ED\u540C\u5B66\u7EC4\u961F\u8054\u673A\uFF01" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "pt-2 flex gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: () => {
                setActiveTrialGame(null);
                onJoinRoomClick();
              },
              className: "flex-1 py-3 rounded-2xl bg-pink-500 text-white font-black text-sm hover:bg-pink-600 shadow-md shadow-pink-200 transition-colors cursor-pointer",
              children: "\u{1F680} \u7ACB\u5373\u8F93\u5165 PIN \u7801"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "button",
            {
              onClick: () => setActiveTrialGame(null),
              className: "px-5 py-3 rounded-2xl bg-gray-100 text-gray-700 font-bold text-sm hover:bg-gray-200 transition-colors cursor-pointer",
              children: "\u7EE7\u7EED\u901B\u901B"
            }
          )
        ] })
      ] }) })
    ] });
  };

  // src/student/components/JoinModal.tsx
  var import_react4 = __toESM(require_react(), 1);
  var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
  var RANDOM_NICKNAMES = [
    "\u673A\u667A\u5C0F\u660E",
    "\u95EA\u7535\u9633\u9633",
    "\u9633\u5149\u679C\u679C",
    "\u5143\u6C14\u5929\u5929",
    "\u5B66\u9738\u5C0F\u6DB5",
    "\u98DE\u8DC3\u6D69\u6D69",
    "\u654F\u6377\u6735\u6735",
    "\u661F\u7A7A\u5C0F\u5B87"
  ];
  var JoinModal = ({
    isOpen,
    suggestedPin = "686868",
    onClose,
    onJoinSuccess
  }) => {
    const [pinDigits, setPinDigits] = (0, import_react4.useState)(["", "", "", "", "", ""]);
    const [nickname, setNickname] = (0, import_react4.useState)("");
    const [selectedAvatarId, setSelectedAvatarId] = (0, import_react4.useState)(CARTOON_AVATARS[0].id);
    const [errorMessage, setErrorMessage] = (0, import_react4.useState)("");
    const [isSubmitting, setIsSubmitting] = (0, import_react4.useState)(false);
    const inputRefs = (0, import_react4.useRef)([]);
    (0, import_react4.useEffect)(() => {
      if (isOpen) {
        setErrorMessage("");
        setIsSubmitting(false);
        if (suggestedPin && suggestedPin.length === 6 && suggestedPin !== "686868") {
          setPinDigits((prev) => prev.every((d) => !d) ? suggestedPin.split("") : prev);
        }
        const timer = setTimeout(() => {
          inputRefs.current[0]?.focus();
        }, 150);
        return () => clearTimeout(timer);
      }
    }, [isOpen, suggestedPin]);
    if (!isOpen) return null;
    const handleDigitChange = (index, value2) => {
      setErrorMessage("");
      const numChar = value2.replace(/\D/g, "");
      if (!numChar) {
        const newDigits2 = [...pinDigits];
        newDigits2[index] = "";
        setPinDigits(newDigits2);
        return;
      }
      const lastChar = numChar.slice(-1);
      const newDigits = [...pinDigits];
      newDigits[index] = lastChar;
      setPinDigits(newDigits);
      if (index < 5 && lastChar) {
        inputRefs.current[index + 1]?.focus();
      }
    };
    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace") {
        if (!pinDigits[index] && index > 0) {
          const newDigits = [...pinDigits];
          newDigits[index - 1] = "";
          setPinDigits(newDigits);
          inputRefs.current[index - 1]?.focus();
        } else {
          const newDigits = [...pinDigits];
          newDigits[index] = "";
          setPinDigits(newDigits);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (e.key === "ArrowRight" && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
    const handlePaste = (e) => {
      e.preventDefault();
      const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
      if (!pastedData) return;
      const newDigits = [...pinDigits];
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pastedData[i] || "";
      }
      setPinDigits(newDigits);
      const nextIndex = Math.min(pastedData.length, 5);
      inputRefs.current[nextIndex]?.focus();
    };
    const handleQuickFillPin = (demoPin = "686868") => {
      const chars2 = demoPin.split("").slice(0, 6);
      setPinDigits(chars2);
      setErrorMessage("");
      if (!nickname) {
        handleRandomNickname();
      }
      inputRefs.current[5]?.focus();
    };
    const handleRandomNickname = () => {
      const randomName = RANDOM_NICKNAMES[Math.floor(Math.random() * RANDOM_NICKNAMES.length)];
      setNickname(randomName);
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const fullPin = pinDigits.join("");
      if (fullPin.length !== 6) {
        setErrorMessage("\u8BF7\u8F93\u5165\u5B8C\u6574\u7684 6 \u4F4D\u6570\u5B57\u623F\u95F4 PIN \u7801");
        const firstEmpty = pinDigits.findIndex((d) => !d);
        if (firstEmpty !== -1) inputRefs.current[firstEmpty]?.focus();
        return;
      }
      const cleanName = nickname.trim();
      if (!cleanName) {
        setErrorMessage("\u8BF7\u7ED9\u81EA\u5DF1\u8D77\u4E00\u4E2A\u54CD\u4EAE\u7684\u6635\u79F0\u5427\uFF01");
        return;
      }
      const avatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];
      setIsSubmitting(true);
      try {
        const res = await onJoinSuccess({
          pin: fullPin,
          nickname: cleanName,
          avatar
        });
        setIsSubmitting(false);
        if (res && res.success === false) {
          setErrorMessage(res.error || "\u52A0\u5165\u623F\u95F4\u5931\u8D25\uFF0C\u8BF7\u6838\u5BF9 6 \u4F4D PIN \u7801");
        }
      } catch (err) {
        setIsSubmitting(false);
        setErrorMessage(err?.message || "\u8FDE\u63A5\u8BFE\u5802\u623F\u95F4\u5931\u8D25");
      }
    };
    const selectedAvatar = CARTOON_AVATARS.find((a) => a.id === selectedAvatarId) || CARTOON_AVATARS[0];
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        className: "relative bg-white w-full max-w-lg rounded-[32px] shadow-2xl border-4 border-pink-200 overflow-hidden my-auto transform transition-all animate-in zoom-in-95 duration-200",
        onClick: (e) => e.stopPropagation(),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "h-3 bg-gradient-to-r from-pink-500 via-amber-400 to-blue-500" }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "px-6 pt-6 pb-2 flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "w-10 h-10 rounded-2xl bg-pink-100 flex items-center justify-center text-xl shadow-xs", children: "\u{1F3AE}" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h3", { className: "text-xl sm:text-2xl font-black text-gray-900 tracking-tight", children: "\u52A0\u5165\u8BFE\u5802\u6E38\u620F\u623F\u95F4" }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-xs font-semibold text-gray-500", children: "\u8F93\u5165\u8001\u5E08\u5C4F\u5E55\u4E0A\u7684 6 \u4F4D PIN \u7801\uFF0C\u5373\u53EF\u4E0E\u540C\u5B66\u5E76\u80A9\u4F5C\u6218\uFF01" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                onClick: onClose,
                className: "w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-800 flex items-center justify-center transition-colors cursor-pointer",
                title: "\u5173\u95ED",
                children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(X, { className: "w-5 h-5" })
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("form", { onSubmit: handleSubmit, className: "p-6 pt-3 space-y-6", children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "text-sm font-black text-gray-800 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-2 h-2 rounded-full bg-pink-500" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u623F\u95F4 PIN \u7801\uFF086 \u4F4D\u6570\u5B57\uFF09" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: () => handleQuickFillPin(suggestedPin),
                    className: "text-xs font-extrabold text-pink-600 hover:text-pink-700 bg-pink-50 hover:bg-pink-100 px-2.5 py-1 rounded-full transition-colors cursor-pointer",
                    children: [
                      "\u26A1 \u586B\u5165\u5F53\u524D\u8BFE\u5802\u7801: ",
                      suggestedPin
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "grid grid-cols-6 gap-2 sm:gap-3 py-1", children: pinDigits.map((digit, idx) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                "input",
                {
                  ref: (el) => inputRefs.current[idx] = el,
                  type: "text",
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                  maxLength: 1,
                  value: digit,
                  onChange: (e) => handleDigitChange(idx, e.target.value),
                  onKeyDown: (e) => handleKeyDown(idx, e),
                  onPaste: handlePaste,
                  className: `w-full aspect-square text-center font-black text-2xl sm:text-3xl rounded-2xl transition-all duration-150 outline-none select-none ${digit ? "bg-pink-50 border-2 border-pink-500 text-pink-600 shadow-sm shadow-pink-100" : "bg-gray-50 border-2 border-gray-200 text-gray-900 hover:border-gray-300"} focus:bg-white focus:border-pink-500 focus:ring-4 focus:ring-pink-200/60`
                },
                idx
              )) }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "text-[11px] text-gray-400 font-medium", children: "\u{1F4A1} \u63D0\u793A\uFF1A\u652F\u6301\u76F4\u63A5\u4ECE\u8001\u5E08\u5904\u590D\u5236 6 \u4F4D\u6570\u5B57\u5728\u6B64\u4E00\u952E\u7C98\u8D34" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "text-sm font-black text-gray-800 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-2 h-2 rounded-full bg-amber-500" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u4F60\u7684\u82F1\u96C4\u6635\u79F0" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: handleRandomNickname,
                    className: "text-xs font-extrabold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1 transition-colors cursor-pointer",
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Dices, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u968F\u673A\u840C\u8DA3\u6635\u79F0" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "relative", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "input",
                  {
                    type: "text",
                    maxLength: 10,
                    value: nickname,
                    onChange: (e) => {
                      setNickname(e.target.value);
                      setErrorMessage("");
                    },
                    placeholder: "\u8F93\u5165\u4F60\u7684\u540D\u5B57\uFF0C\u5982\uFF1A\u5C0F\u660E",
                    className: "w-full px-4 py-3.5 rounded-2xl bg-gray-50 border-2 border-gray-200 focus:border-amber-500 focus:bg-white focus:ring-4 focus:ring-amber-200/60 font-bold text-gray-800 placeholder-gray-400 outline-none text-base transition-all"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400", children: [
                  nickname.length,
                  "/10"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "space-y-2.5", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("label", { className: "text-sm font-black text-gray-800 flex items-center gap-1.5", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-2 h-2 rounded-full bg-blue-500" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u6311\u9009\u4F60\u7684\u4E13\u5C5E\u840C\u8DA3\u5934\u50CF" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { className: "text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md", children: [
                  "\u5DF2\u9009\uFF1A",
                  selectedAvatar.name
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "grid grid-cols-4 sm:grid-cols-8 gap-2.5", children: CARTOON_AVATARS.map((avatar) => {
                const isSelected = selectedAvatarId === avatar.id;
                return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSelectedAvatarId(avatar.id),
                    className: `group relative aspect-square rounded-2xl p-1.5 flex flex-col items-center justify-center transition-all cursor-pointer ${avatar.bgColor} ${isSelected ? "ring-3 ring-pink-500 ring-offset-2 scale-105 shadow-md shadow-pink-200" : "border-2 border-transparent hover:scale-105 hover:shadow-xs opacity-75 hover:opacity-100"}`,
                    title: avatar.name,
                    children: [
                      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                        "img",
                        {
                          src: avatar.src,
                          alt: avatar.name,
                          className: "w-full h-full object-contain drop-shadow-xs",
                          onError: (e) => {
                            e.target.style.display = "none";
                          }
                        }
                      ),
                      isSelected && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "absolute -top-1 -right-1 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center text-[10px] shadow-sm", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Check, { className: "w-3 h-3 stroke-[3]" }) })
                    ]
                  },
                  avatar.id
                );
              }) })
            ] }),
            errorMessage && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold flex items-center gap-2 animate-in fade-in duration-200", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-base", children: "\u26A0\uFE0F" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: errorMessage })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "pt-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
              "button",
              {
                type: "submit",
                disabled: isSubmitting,
                className: `w-full py-4 rounded-2xl text-white font-black text-lg flex items-center justify-center gap-2 shadow-xl transition-all cursor-pointer active:scale-98 ${isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 shadow-pink-300/60 hover:shadow-pink-400/80 transform hover:-translate-y-0.5"}`,
                children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u6B63\u5728\u6781\u901F\u8FDE\u63A5\u8BFE\u5802\u623F\u95F4..." })
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-xl", children: "\u{1F680}" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u7ACB\u5373\u52A0\u5165\u5BF9\u6218\uFF01" }),
                  /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ArrowRight, { className: "w-5 h-5" })
                ] })
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-center pt-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("p", { className: "text-[11px] font-bold text-gray-400 flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ShieldCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
              /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u5B66\u751F\u4E13\u5C5E\u5B89\u5168\u7B54\u9898\u7AEF\u53E3 \xB7 \u7269\u7406\u8131\u654F\u9694\u79BB" })
            ] }) })
          ] })
        ]
      }
    ) });
  };

  // src/student/components/LobbyView.tsx
  var import_react5 = __toESM(require_react(), 1);
  var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
  var LobbyView = ({
    roomName,
    pin,
    nickname,
    avatar,
    initialTeamId = "blue",
    liveTeammates,
    externalTeamChangeNotice,
    onRequestSwitchTeam,
    onLeaveRoom,
    onStartQuiz
  }) => {
    const [currentTeamId, setCurrentTeamId] = (0, import_react5.useState)(initialTeamId);
    const [teamChangeAlert, setTeamChangeAlert] = (0, import_react5.useState)(null);
    const [activeTab, setActiveTab] = (0, import_react5.useState)("my-team");
    (0, import_react5.useEffect)(() => {
      if (initialTeamId && initialTeamId !== currentTeamId) {
        const prevTeam = PRESET_TEAMS[currentTeamId] || PRESET_TEAMS.blue;
        const nextTeam = PRESET_TEAMS[initialTeamId] || PRESET_TEAMS.blue;
        setCurrentTeamId(initialTeamId);
        setTeamChangeAlert({
          show: true,
          prevTeamName: prevTeam.name,
          newTeamName: nextTeam.name
        });
        const timer = setTimeout(() => setTeamChangeAlert(null), 4500);
        return () => clearTimeout(timer);
      }
    }, [initialTeamId]);
    (0, import_react5.useEffect)(() => {
      if (externalTeamChangeNotice) {
        setTeamChangeAlert({
          show: true,
          prevTeamName: externalTeamChangeNotice.prevTeamName,
          newTeamName: externalTeamChangeNotice.newTeamName
        });
        const timer = setTimeout(() => setTeamChangeAlert(null), 4500);
        return () => clearTimeout(timer);
      }
    }, [externalTeamChangeNotice]);
    const currentTeam = PRESET_TEAMS[currentTeamId] || PRESET_TEAMS.blue;
    const handleSimulateTeamChange = () => {
      if (onRequestSwitchTeam && onRequestSwitchTeam()) {
        return;
      }
      const nextTeamId = currentTeamId === "blue" ? "red" : "blue";
      const prevName = currentTeam.name;
      const nextName = PRESET_TEAMS[nextTeamId].name;
      setCurrentTeamId(nextTeamId);
      setTeamChangeAlert({
        show: true,
        prevTeamName: prevName,
        newTeamName: nextName
      });
      setTimeout(() => {
        setTeamChangeAlert(null);
      }, 4500);
    };
    const activeTeammates = liveTeammates !== void 0 ? liveTeammates : MOCK_TEAMMATES;
    const myTeammates = activeTeammates.filter((m) => m.teamId === currentTeamId);
    const displayedMembers = activeTab === "my-team" ? myTeammates : activeTeammates;
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 py-6 pb-28 space-y-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border-2 border-gray-100 shadow-md flex flex-wrap items-center justify-between gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 p-0.5 shadow-sm", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-full h-full bg-white rounded-[14px] flex items-center justify-center text-xl", children: "\u{1F3EB}" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h2", { className: "text-lg sm:text-xl font-black text-gray-900", children: roomName }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-black", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-500 animate-ping" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "\u8FDE\u7EBF\u6B63\u5E38" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-xs font-bold text-gray-500 mt-0.5", children: [
              "\u623F\u95F4 PIN \u7801\uFF1A",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-pink-600 font-black tracking-widest text-sm bg-pink-50 px-2 py-0.5 rounded-md border border-pink-200", children: pin }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "mx-2 text-gray-300", children: "|" }),
              "\u5F53\u524D\u5728\u7EBF\uFF1A",
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-gray-800 font-extrabold", children: [
                activeTeammates.length + 1,
                " \u4F4D\u540C\u5B66"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "button",
            {
              onClick: handleSimulateTeamChange,
              className: "px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-xs active:scale-95",
              title: "\u6A21\u62DF\u8001\u5E08\u5728\u6559\u5E08\u7AEF\u5C06\u60A8\u8C03\u6362\u961F\u4F0D\uFF0C\u4F53\u9A8C\u5E73\u6ED1\u53D8\u8272\u52A8\u6548",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshCw, { className: "w-3.5 h-3.5 text-amber-600 animate-spin-hover" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "\u6A21\u62DF\u8001\u5E08\u6362\u961F" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            "button",
            {
              onClick: onLeaveRoom,
              className: "px-3.5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer",
              title: "\u9000\u51FA\u5F53\u524D\u623F\u95F4\u8FD4\u56DE\u5927\u5385",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(LogOut, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "\u9000\u51FA" })
              ]
            }
          )
        ] })
      ] }),
      teamChangeAlert?.show && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-xl shadow-orange-300/50 flex items-center justify-between gap-3 animate-in slide-in-from-top-4 duration-300 border-2 border-white/40", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-lg", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Bell, { className: "w-5 h-5 text-white animate-bounce" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-sm font-black tracking-wide", children: [
              "\u{1F514} \u961F\u4F0D\u53D8\u52A8\u901A\u77E5\uFF1A\u8001\u5E08\u5DF2\u5C06\u4F60\u8C03\u81F3\u3010",
              teamChangeAlert.newTeamName,
              "\u3011\uFF01"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-white/90 font-medium", children: "\u9635\u8425\u6A2A\u5E45\u4E0E\u6218\u961F\u4E3B\u9898\u8272\u5DF2\u540C\u6B65\u5207\u6362\uFF0C\u5FEB\u4E0E\u65B0\u961F\u53CB\u4E00\u540C\u51C6\u5907\u51B2\u950B\uFF01" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
          "button",
          {
            onClick: () => setTeamChangeAlert(null),
            className: "px-3 py-1 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-black transition-colors cursor-pointer",
            children: "\u6211\u77E5\u9053\u4E86"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          className: `relative overflow-hidden rounded-[32px] border-4 transition-all duration-500 shadow-2xl p-6 sm:p-8 bg-white ${currentTeam.borderClass}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "div",
              {
                className: `absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10 bg-gradient-to-br ${currentTeam.gradientBg} blur-2xl pointer-events-none transition-all duration-700`
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left", children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative group", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "div",
                    {
                      className: `w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1.5 shadow-xl transition-all duration-500 bg-gradient-to-tr ${currentTeam.gradientBg}`,
                      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-full h-full bg-white rounded-[20px] p-2 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                        "img",
                        {
                          src: avatar.src,
                          alt: avatar.name,
                          className: "w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300 drop-shadow-md"
                        }
                      ) })
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
                    "div",
                    {
                      className: `absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full text-xs font-black text-white shadow-md transition-colors duration-500 bg-gradient-to-r ${currentTeam.gradientBg}`,
                      children: [
                        currentTeam.icon,
                        " ",
                        currentTeam.shortName
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs font-black", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(CircleCheck, { className: "w-3.5 h-3.5 text-emerald-500" }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "\u5DF2\u5C31\u7EEA \xB7 \u7B49\u5F85\u5F00\u59CB" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h1", { className: "text-2xl sm:text-3xl font-black text-gray-900 tracking-tight", children: nickname }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-gray-500 font-bold flex items-center gap-1 justify-center sm:justify-start", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { children: [
                    "\u5934\u50CF\u88C5\u626E\uFF1A",
                    avatar.name
                  ] }) })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-full md:w-auto", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                "div",
                {
                  className: `rounded-2xl p-5 text-white shadow-lg transition-all duration-500 transform hover:scale-102 bg-gradient-to-r ${currentTeam.gradientBg}`,
                  children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-3", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-3xl sm:text-4xl drop-shadow-sm", children: currentTeam.icon }),
                    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-[11px] font-black uppercase tracking-wider text-white/80", children: "CURRENT TEAM \xB7 \u4F60\u7684\u6240\u5C5E\u9635\u8425" }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "text-xl sm:text-2xl font-black tracking-wide drop-shadow-xs", children: currentTeam.name }),
                      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("p", { className: "text-xs text-white/90 font-semibold mt-0.5", children: [
                        '"',
                        currentTeam.slogan,
                        '"'
                      ] })
                    ] })
                  ] })
                }
              ) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "bg-white rounded-3xl p-5 sm:p-6 border-2 border-gray-100 shadow-md space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Users, { className: "w-5 h-5 text-pink-500" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("h3", { className: "text-lg font-black text-gray-900", children: "\u540C\u623F\u95F4\u5C0F\u4F19\u4F34\u82B1\u540D\u518C" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("span", { className: "text-xs font-black px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700", children: [
              displayedMembers.length + (activeTab === "my-team" ? 1 : 1),
              " \u4EBA"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "inline-flex p-1 bg-gray-100 rounded-xl", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "button",
              {
                onClick: () => setActiveTab("my-team"),
                className: `px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${activeTab === "my-team" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"}`,
                children: [
                  "\u{1F6E1}\uFE0F \u6211\u7684\u961F\u4F0D (",
                  myTeammates.length + 1,
                  ")"
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "button",
              {
                onClick: () => setActiveTab("all"),
                className: `px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${activeTab === "all" ? "bg-white text-gray-900 shadow-xs" : "text-gray-500 hover:text-gray-900"}`,
                children: [
                  "\u{1F465} \u5168\u623F\u540C\u5B66 (",
                  activeTeammates.length + 1,
                  ")"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative p-3 rounded-2xl bg-gradient-to-b from-pink-50 to-amber-50/40 border-2 border-pink-400 flex flex-col items-center text-center shadow-xs", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "absolute top-1.5 right-1.5 text-[9px] font-black bg-pink-500 text-white px-1.5 py-0.5 rounded-md shadow-xs", children: "\u6211" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-12 h-12 rounded-xl bg-white p-1 mb-2 shadow-xs border border-pink-200", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("img", { src: avatar.src, alt: "", className: "w-full h-full object-contain" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xs font-black text-gray-900 truncate max-w-[90px]", children: nickname }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              "span",
              {
                className: `text-[10px] font-bold mt-1 px-1.5 py-0.2 rounded-md ${currentTeam.badgeBg}`,
                children: currentTeam.shortName
              }
            )
          ] }),
          displayedMembers.map((member) => {
            const memberTeam = PRESET_TEAMS[member.teamId] || PRESET_TEAMS.blue;
            return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
              "div",
              {
                className: "p-3 rounded-2xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all flex flex-col items-center text-center",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-12 h-12 rounded-xl bg-white p-1 mb-2 shadow-2xs border border-gray-100", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "img",
                    {
                      src: member.avatar,
                      alt: member.name,
                      className: "w-full h-full object-contain"
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-xs font-black text-gray-800 truncate max-w-[90px]", children: member.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    "span",
                    {
                      className: `text-[10px] font-bold mt-1 px-1.5 py-0.2 rounded-md ${memberTeam.badgeBg}`,
                      children: memberTeam.shortName
                    }
                  )
                ]
              },
              member.id
            );
          })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-5 sm:p-6 shadow-xl border-2 border-indigo-500/30 flex flex-col sm:flex-row items-center justify-between gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center gap-3.5 text-center sm:text-left", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "relative flex items-center justify-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "w-4 h-4 rounded-full bg-pink-500 animate-ping absolute" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "w-3.5 h-3.5 rounded-full bg-amber-400 relative" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("h4", { className: "text-base sm:text-lg font-black tracking-wide text-amber-300 flex items-center gap-1.5 justify-center sm:justify-start", children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "\u8001\u5E08\u51C6\u5907\u4E2D\uFF0C\u968F\u65F6\u51C6\u5907\u5F00\u6218..." }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Sparkles, { className: "w-4 h-4 text-amber-300 animate-spin" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("p", { className: "text-xs text-slate-300 font-medium mt-0.5", children: "\u8BF7\u4FDD\u6301\u5C4F\u5E55\u5E38\u4EAE\uFF01\u5F53\u8001\u5E08\u6309\u4E0B\u3010\u5F00\u59CB\u6E38\u620F / \u9898\u76EE\u4E0B\u53D1\u3011\u65F6\uFF0C\u5C06\u81EA\u52A8\u79D2\u7EA7\u5207\u5165\u5BF9\u6218\u7B54\u9898\u753B\u9762\u3002" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
          "button",
          {
            onClick: onStartQuiz,
            className: "w-full sm:w-auto px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-black text-sm shadow-lg shadow-pink-500/40 hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2 whitespace-nowrap",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Flame, { className: "w-4 h-4 text-amber-200" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: "\u6A21\u62DF\u8001\u5E08\u53D1\u9898 (\u7ACB\u5373\u5F00\u6218)" }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ArrowRight, { className: "w-4 h-4" })
            ]
          }
        )
      ] })
    ] });
  };

  // src/student/components/QuizArena.tsx
  var import_react6 = __toESM(require_react(), 1);
  var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
  var QuizArena = ({
    pin,
    studentName,
    teamId,
    initialMode = "pad",
    liveQuestion,
    liveStage,
    liveTimeLeft,
    onSubmitLiveAnswer,
    onCompleteQuiz
  }) => {
    const [activeMode, setActiveMode] = (0, import_react6.useState)(initialMode);
    const [currentIndex, setCurrentIndex] = (0, import_react6.useState)(0);
    const [selectedOption, setSelectedOption] = (0, import_react6.useState)(null);
    const [isRevealed, setIsRevealed] = (0, import_react6.useState)(false);
    const [liveAnswerResult, setLiveAnswerResult] = (0, import_react6.useState)(null);
    const [score, setScore] = (0, import_react6.useState)(0);
    const [correctCount, setCorrectCount] = (0, import_react6.useState)(0);
    const [wrongCount, setWrongCount] = (0, import_react6.useState)(0);
    const [userMistakes, setUserMistakes] = (0, import_react6.useState)([]);
    const [simulatedTimeLeft, setSimulatedTimeLeft] = (0, import_react6.useState)(15);
    const [isSimulatedTimerRunning, setIsSimulatedTimerRunning] = (0, import_react6.useState)(true);
    const isLiveMode = !!liveQuestion;
    const isPromptPhase = isLiveMode && liveStage === "question-prompt";
    const mockQ = MOCK_QUIZ_QUESTIONS[currentIndex] || MOCK_QUIZ_QUESTIONS[0];
    const displayQNumber = isLiveMode ? liveQuestion.index + 1 : mockQ.number;
    const displayQTotal = isLiveMode ? liveQuestion.total : mockQ.total;
    const displayPoints = 100;
    (0, import_react6.useEffect)(() => {
      if (liveQuestion) {
        setSelectedOption(null);
        setIsRevealed(false);
        setLiveAnswerResult(null);
        setSimulatedTimeLeft(liveTimeLeft || liveQuestion.timeLimit || 15);
        setIsSimulatedTimerRunning(true);
      }
    }, [liveQuestion?.questionId]);
    (0, import_react6.useEffect)(() => {
      if (liveStage === "result-stats" || liveStage === "scoreboard") {
        setIsSimulatedTimerRunning(false);
        setIsRevealed(true);
      } else if (liveStage === "question-prompt") {
        setIsRevealed(false);
        setSimulatedTimeLeft(liveTimeLeft || 15);
        setIsSimulatedTimerRunning(true);
      } else if (liveStage === "question-options") {
        setIsRevealed(false);
        setSimulatedTimeLeft(liveTimeLeft || liveQuestion?.timeLimit || 15);
        setIsSimulatedTimerRunning(true);
      }
    }, [liveStage, liveTimeLeft, liveQuestion?.timeLimit]);
    (0, import_react6.useEffect)(() => {
      if (!isLiveMode) {
        setSelectedOption(null);
        setIsRevealed(false);
        setSimulatedTimeLeft(mockQ.timeLimit);
        setIsSimulatedTimerRunning(true);
      }
    }, [currentIndex, isLiveMode]);
    (0, import_react6.useEffect)(() => {
      if (!isSimulatedTimerRunning || isRevealed) return;
      if (simulatedTimeLeft <= 0) {
        if (!isLiveMode) {
          handleRevealResult();
        }
        return;
      }
      const timer = setInterval(() => {
        setSimulatedTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1e3);
      return () => clearInterval(timer);
    }, [simulatedTimeLeft, isSimulatedTimerRunning, isRevealed, isLiveMode]);
    const handleSelectOption = async (idx) => {
      if (isPromptPhase || selectedOption !== null || isRevealed) return;
      setSelectedOption(idx);
      const optionKeys = ["A", "B", "C", "D"];
      const selectedKey = optionKeys[idx];
      if (isLiveMode && onSubmitLiveAnswer && liveQuestion) {
        const feedback = await onSubmitLiveAnswer(liveQuestion.questionId, selectedKey);
        if (feedback) {
          setLiveAnswerResult({
            isCorrect: feedback.isCorrect,
            pointsEarned: feedback.pointsEarned
          });
          setScore(feedback.currentScore);
          if (feedback.isCorrect) {
            setCorrectCount((c) => c + 1);
          } else {
            setWrongCount((w) => w + 1);
          }
        }
      }
    };
    const handleRevealResult = () => {
      if (isRevealed) return;
      setIsSimulatedTimerRunning(false);
      setIsRevealed(true);
      if (isLiveMode) return;
      const isCorrect = selectedOption === mockQ.correctOptionIndex;
      if (isCorrect) {
        setScore((s) => s + mockQ.points);
        setCorrectCount((c) => c + 1);
      } else {
        setWrongCount((w) => w + 1);
        const optionKeys = ["A", "B", "C", "D"];
        const studentAnsText = selectedOption !== null ? `${optionKeys[selectedOption]}. ${mockQ.options[selectedOption].text}` : "\u672A\u5728\u5012\u8BA1\u65F6\u5185\u4F5C\u7B54";
        const correctAnsText = `${optionKeys[mockQ.correctOptionIndex]}. ${mockQ.options[mockQ.correctOptionIndex].text}`;
        setUserMistakes((prev) => [
          ...prev,
          {
            questionNumber: mockQ.number,
            prompt: mockQ.prompt,
            studentAnswer: studentAnsText,
            correctAnswer: correctAnsText,
            explanation: mockQ.explanation
          }
        ]);
      }
    };
    const handleTeacherNextQuestion = () => {
      if (currentIndex < MOCK_QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        onCompleteQuiz({
          score,
          correctCount,
          wrongCount,
          mistakes: userMistakes
        });
      }
    };
    const OPTION_BLOCKS = [
      {
        index: 0,
        position: "\u5DE6\u4E0A",
        key: "A",
        symbol: "\u25B2",
        defaultBg: "bg-rose-500 active:bg-rose-600",
        activeRing: "ring-8 ring-rose-200 shadow-rose-500/50"
      },
      {
        index: 1,
        position: "\u53F3\u4E0A",
        key: "B",
        symbol: "\u25C6",
        defaultBg: "bg-blue-500 active:bg-blue-600",
        activeRing: "ring-8 ring-blue-200 shadow-blue-500/50"
      },
      {
        index: 2,
        position: "\u5DE6\u4E0B",
        key: "C",
        symbol: "\u25CF",
        defaultBg: "bg-amber-400 active:bg-amber-500",
        activeRing: "ring-8 ring-amber-200 shadow-amber-500/50"
      },
      {
        index: 3,
        position: "\u53F3\u4E0B",
        key: "D",
        symbol: "\u25A0",
        defaultBg: "bg-emerald-500 active:bg-emerald-600",
        activeRing: "ring-8 ring-emerald-200 shadow-emerald-500/50"
      }
    ];
    const currentTeam = PRESET_TEAMS[teamId] || PRESET_TEAMS.blue;
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-full flex-1 flex flex-col h-[calc(100vh-100px)] max-h-screen px-3 sm:px-6 py-2 select-none overflow-hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-full max-w-4xl mx-auto flex items-center justify-between py-1.5 px-3 mb-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900 text-white font-black text-sm sm:text-base shadow-md border-2 border-slate-700", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-pink-400", children: "Q" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: displayQNumber < 10 ? `0${displayQNumber}` : displayQNumber }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-slate-500 font-normal", children: "/" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-slate-400 text-xs sm:text-sm font-bold", children: displayQTotal < 10 ? `0${displayQTotal}` : displayQTotal })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "text-xs font-bold text-slate-600 hidden sm:inline-block", children: [
            isPromptPhase && `\u23F3 \u6B63\u5728\u5BA1\u9898\u671F (${simulatedTimeLeft}s)\uFF1A\u8BF7\u62AC\u5934\u770B\u8001\u5E08\u5927\u5C4F\u5E55\u601D\u8003\u7B54\u6848...`,
            !isPromptPhase && selectedOption === null && !isRevealed && `\u{1F440} \u8BF7\u770B\u8001\u5E08\u5927\u5C4F\u5E55 4 \u4E2A\u9009\u9879 (${simulatedTimeLeft}s)\uFF0C\u70B9\u51FB\u4E0B\u65B9\u540C\u4F4D\u7F6E\u8272\u5757\u4F5C\u7B54`,
            selectedOption !== null && !isRevealed && "\u{1F512} \u7B54\u6848\u5DF2\u5B9E\u65F6\u4E0A\u62A5\u6BCD\u4F53\uFF0C\u7B49\u5F85\u5927\u5C4F\u5012\u8BA1\u65F6\u63ED\u6653...",
            isRevealed && "\u{1F4E2} \u7B54\u6848\u5DF2\u63ED\u6653\uFF01\u7B49\u5F85\u8001\u5E08\u5927\u5C4F\u5207\u6362\u4E0B\u4E00\u9898..."
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: `inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-black ${currentTeam.badgeBg}`, children: [
            currentTeam.icon,
            " ",
            currentTeam.shortName,
            " \xB7 ",
            score,
            "\u5206"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "inline-flex p-0.5 bg-slate-200/80 rounded-xl", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
              "button",
              {
                onClick: () => setActiveMode("pad"),
                className: `px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${activeMode === "pad" ? "bg-pink-600 text-white shadow-xs" : "text-slate-600"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Smartphone, { className: "w-3 h-3" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u624B\u67C4" })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
              "button",
              {
                onClick: () => setActiveMode("game"),
                className: `px-2.5 py-1 rounded-lg text-xs font-black flex items-center gap-1 transition-all cursor-pointer ${activeMode === "game" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600"}`,
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Tv, { className: "w-3 h-3" }),
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u6E38\u620F" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      activeMode === "pad" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center min-h-0 relative", children: [
        isPromptPhase && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-slate-900/95 backdrop-blur-md text-white px-6 py-5 rounded-3xl border-2 border-amber-400/70 shadow-2xl text-center max-w-md space-y-1.5 animate-in zoom-in-95 duration-200", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { children: [
            "\u23F3 \u9636\u6BB5 2A \xB7 \u9898\u5E72\u5BA1\u9898\u4E2D (",
            simulatedTimeLeft,
            "s)"
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-base sm:text-lg font-black text-white", children: "\u{1F440} \u8BF7\u62AC\u5934\u770B\u8001\u5E08\u5927\u5C4F\u5E55\u5BA1\u8BFB\u9898\u76EE" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-slate-300 font-semibold", children: "\u5927\u5C4F\u7FFB\u5F00\u56DB\u8272\u9009\u9879\u540E\uFF0C\u624B\u673A 4 \u4E2A\u540C\u4F4D\u7F6E\u6309\u952E\u5C06\u540C\u6B65\u89E3\u9501\uFF01" })
        ] }) }),
        isRevealed && selectedOption === null && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute inset-x-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-slate-900/95 backdrop-blur-md text-white px-6 py-4 rounded-3xl border-2 border-rose-400/60 shadow-2xl text-center max-w-md space-y-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-base sm:text-lg font-black text-rose-300", children: "\u23F0 \u672C\u9898\u672A\u5728\u5012\u8BA1\u65F6\u5185\u4F5C\u7B54" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-slate-300 font-semibold", children: "\u8BF7\u770B\u8001\u5E08\u5927\u5C4F\u5E55\u7B54\u6848\u63ED\u6653\uFF0C\u51C6\u5907\u8FCE\u63A5\u4E0B\u4E00\u9898\uFF01" })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "grid grid-cols-2 grid-rows-2 gap-3 sm:gap-5 w-full h-[76vh] sm:h-[80vh] p-1", children: OPTION_BLOCKS.map((block) => {
          const isSelected = selectedOption === block.index;
          const isThisCorrect = isLiveMode ? isSelected && !!liveAnswerResult?.isCorrect : block.index === mockQ.correctOptionIndex;
          const hasAnswered = selectedOption !== null;
          let bgStyle = block.defaultBg;
          let extraClasses = "hover:scale-[1.01] active:scale-95 cursor-pointer shadow-xl";
          const iconContent = block.symbol;
          if (isPromptPhase) {
            extraClasses = "opacity-50 scale-[0.99] cursor-wait filter saturate-75";
          } else if (!isRevealed) {
            if (hasAnswered) {
              if (isSelected) {
                bgStyle = block.defaultBg;
                extraClasses = `${block.activeRing} scale-[1.02] shadow-2xl brightness-110 z-10`;
              } else {
                extraClasses = "opacity-20 scale-98 pointer-events-none filter grayscale-40";
              }
            }
          } else {
            if (isSelected) {
              if (isThisCorrect) {
                bgStyle = "bg-emerald-500";
                extraClasses = "ring-8 ring-emerald-200 shadow-2xl shadow-emerald-500/50 scale-[1.03] z-10 animate-bounce-short";
              } else {
                bgStyle = "bg-rose-600";
                extraClasses = "ring-8 ring-rose-200 shadow-2xl shadow-rose-500/50 scale-[1.02] z-10";
              }
            } else if (!isLiveMode && isThisCorrect) {
              bgStyle = "bg-emerald-500";
              extraClasses = "ring-4 ring-emerald-300 scale-[1.01]";
            } else {
              extraClasses = "opacity-15 pointer-events-none filter grayscale";
            }
          }
          return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "button",
            {
              onClick: () => handleSelectOption(block.index),
              disabled: isPromptPhase || hasAnswered || isRevealed,
              className: `relative w-full h-full rounded-[28px] sm:rounded-[40px] flex flex-col items-center justify-center text-white transition-all duration-300 overflow-hidden select-none border-4 border-white/20 ${bgStyle} ${extraClasses}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative z-10 flex flex-col items-center justify-center", children: isRevealed && isSelected ? isThisCorrect ? (
                  // 答对：亮绿中展示巨大白勾
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Check, { className: "w-20 h-20 sm:w-28 sm:h-28 stroke-[3.5] text-white drop-shadow-lg animate-in zoom-in-75 duration-200" }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "text-sm sm:text-xl font-black mt-1 tracking-wider bg-white/20 px-4 py-0.5 rounded-full", children: [
                      "\u{1F389} \u7B54\u5BF9\u5566 +",
                      displayPoints
                    ] })
                  ] })
                ) : (
                  // 答错：亮红中展示巨大白叉
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(X, { className: "w-20 h-20 sm:w-28 sm:h-28 stroke-[3.5] text-white drop-shadow-lg animate-in zoom-in-75 duration-200" }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm sm:text-xl font-black mt-1 tracking-wider bg-white/20 px-4 py-0.5 rounded-full", children: "\u{1F4AA} \u7B54\u9519\u4E86" })
                  ] })
                ) : !isLiveMode && isRevealed && isThisCorrect ? (
                  // 玩家没选但这是正确答案时提示
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex flex-col items-center", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Check, { className: "w-16 h-16 sm:w-20 sm:h-20 stroke-[3] text-white/90 drop-shadow-md" }),
                    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs sm:text-base font-black mt-1 tracking-wide bg-white/20 px-3 py-0.5 rounded-full", children: "\u6B63\u786E\u7B54\u6848" })
                  ] })
                ) : (
                  // 正常作答状态展示经典几何大图标
                  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-6xl sm:text-8xl md:text-9xl font-black tracking-tight drop-shadow-md transform transition-transform duration-200", children: iconContent })
                ) }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("span", { className: "absolute top-3 left-4 text-xs sm:text-sm font-black text-white/85 tracking-wider uppercase bg-black/15 px-2.5 py-0.5 rounded-full", children: [
                  block.position,
                  " \xB7 \u9009\u9879 ",
                  block.key
                ] }),
                isSelected && !isRevealed && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute bottom-3 sm:bottom-5 px-3 sm:px-5 py-1 sm:py-1.5 rounded-full bg-white text-slate-900 font-black text-xs sm:text-sm shadow-md animate-pulse", children: "\u5DF2\u63D0\u4EA4 \u2713 \u7B49\u5F85\u5927\u5C4F\u63ED\u6653" })
              ]
            },
            block.index
          );
        }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "mt-2 flex items-center justify-between bg-slate-900/90 text-white rounded-2xl py-2 px-3 border border-slate-700 text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-amber-400 font-bold", children: isLiveMode ? "\u{1F4E1} \u6BCD\u4F53\u5B9E\u65F6\u8054\u673A\u4E2D:" : "\u{1F4E2} \u8001\u5E08\u6295\u5F71\u5927\u5C4F\u5E55\u6A21\u62DF:" }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-slate-300 font-medium", children: isPromptPhase ? `\u3010\u8001\u5E08\u5927\u5C4F\u5BA1\u9898\u5012\u8BA1\u65F6 ${simulatedTimeLeft}s \xB7 \u5373\u5C06\u5C55\u5F00\u9009\u9879\u3011` : isRevealed ? "\u3010\u5927\u5C4F\u5DF2\u63ED\u6653\u672C\u9898\u7EDF\u8BA1\u4E0E\u6392\u884C\u699C\uFF0C\u7B49\u5F85\u8001\u5E08\u5207\u6362\u4E0B\u4E00\u9898\u3011" : `\u3010\u62A2\u7B54\u5012\u8BA1\u65F6 00:${simulatedTimeLeft < 10 ? `0${simulatedTimeLeft}` : simulatedTimeLeft} \xB7 \u70B9\u51FB\u5BF9\u5E94\u8272\u5757\u4F5C\u7B54\u3011` })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center gap-2", children: !isRevealed ? /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              onClick: handleRevealResult,
              className: "px-3 py-1 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black transition-all cursor-pointer shadow-xs",
              children: "\u26A1 \u6A21\u62DF\u65F6\u95F4\u5230 / \u63ED\u6653"
            }
          ) : !isLiveMode && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
            "button",
            {
              onClick: handleTeacherNextQuestion,
              className: "px-4 py-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 text-white font-black transition-all cursor-pointer shadow-md flex items-center gap-1.5 animate-pulse",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "\u8001\u5E08\u6309\uFF1A\u4E0B\u4E00\u9898 \u2794" }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          ) })
        ] })
      ] }),
      activeMode === "game" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center min-h-0 bg-slate-900 rounded-3xl border-4 border-indigo-500/40 shadow-2xl overflow-hidden", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "bg-slate-950 px-5 py-2.5 border-b border-slate-800 flex items-center justify-between text-xs text-white", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "font-bold text-indigo-400", children: "\u{1F3AE} \u6781\u901F\u8D5B\u8F66\u6311\u6218 (Game Container)" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center gap-4 font-black", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-blue-400", children: "\u84DD\u961F VS \u7EA2\u961F" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "relative flex-1 min-h-[460px] bg-slate-950 flex flex-col items-center justify-center p-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "iframe",
            {
              src: `./mock-racing-game.html?pin=${pin}&name=${encodeURIComponent(studentName)}`,
              title: "Educineva Racing Game",
              className: "w-full h-full rounded-2xl border border-slate-800 bg-slate-900"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "absolute bottom-4 right-4", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            "button",
            {
              onClick: () => setActiveMode("pad"),
              className: "px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-black text-xs shadow-lg cursor-pointer",
              children: "\u{1F4F1} \u5207\u56DE\u624B\u67C4\u7B54\u9898\u5668"
            }
          ) })
        ] })
      ] })
    ] });
  };

  // src/student/components/SettlementView.tsx
  var import_react7 = __toESM(require_react(), 1);

  // node_modules/canvas-confetti/dist/confetti.module.mjs
  var module = {};
  (function main(global, module2, isWorker, workerSize) {
    var canUseWorker = !!(global.Worker && global.Blob && global.Promise && global.OffscreenCanvas && global.OffscreenCanvasRenderingContext2D && global.HTMLCanvasElement && global.HTMLCanvasElement.prototype.transferControlToOffscreen && global.URL && global.URL.createObjectURL);
    var canUsePaths = typeof Path2D === "function" && typeof DOMMatrix === "function";
    var canDrawBitmap = (function() {
      if (!global.OffscreenCanvas) {
        return false;
      }
      try {
        var canvas = new OffscreenCanvas(1, 1);
        var ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, 1, 1);
        var bitmap = canvas.transferToImageBitmap();
        ctx.createPattern(bitmap, "no-repeat");
      } catch (e) {
        return false;
      }
      return true;
    })();
    function noop() {
    }
    function promise(func) {
      var ModulePromise = module2.exports.Promise;
      var Prom = ModulePromise !== void 0 ? ModulePromise : global.Promise;
      if (typeof Prom === "function") {
        return new Prom(func);
      }
      func(noop, noop);
      return null;
    }
    var bitmapMapper = /* @__PURE__ */ (function(skipTransform, map) {
      return {
        transform: function(bitmap) {
          if (skipTransform) {
            return bitmap;
          }
          if (map.has(bitmap)) {
            return map.get(bitmap);
          }
          var canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
          var ctx = canvas.getContext("2d");
          ctx.drawImage(bitmap, 0, 0);
          map.set(bitmap, canvas);
          return canvas;
        },
        clear: function() {
          map.clear();
        }
      };
    })(canDrawBitmap, /* @__PURE__ */ new Map());
    var raf = (function() {
      var TIME = Math.floor(1e3 / 60);
      var frame, cancel;
      var frames = {};
      var lastFrameTime = 0;
      if (typeof requestAnimationFrame === "function" && typeof cancelAnimationFrame === "function") {
        frame = function(cb) {
          var id = Math.random();
          frames[id] = requestAnimationFrame(function onFrame(time) {
            if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
              lastFrameTime = time;
              delete frames[id];
              cb();
            } else {
              frames[id] = requestAnimationFrame(onFrame);
            }
          });
          return id;
        };
        cancel = function(id) {
          if (frames[id]) {
            cancelAnimationFrame(frames[id]);
          }
        };
      } else {
        frame = function(cb) {
          return setTimeout(cb, TIME);
        };
        cancel = function(timer) {
          return clearTimeout(timer);
        };
      }
      return { frame, cancel };
    })();
    var getWorker = /* @__PURE__ */ (function() {
      var worker;
      var prom;
      var resolves = {};
      function decorate(worker2) {
        function execute(options, callback) {
          worker2.postMessage({ options: options || {}, callback });
        }
        worker2.init = function initWorker(canvas) {
          var offscreen = canvas.transferControlToOffscreen();
          worker2.postMessage({ canvas: offscreen }, [offscreen]);
        };
        worker2.fire = function fireWorker(options, size, done) {
          if (prom) {
            execute(options, null);
            return prom;
          }
          var id = Math.random().toString(36).slice(2);
          prom = promise(function(resolve) {
            function workerDone(msg) {
              if (msg.data.callback !== id) {
                return;
              }
              delete resolves[id];
              worker2.removeEventListener("message", workerDone);
              prom = null;
              bitmapMapper.clear();
              done();
              resolve();
            }
            worker2.addEventListener("message", workerDone);
            execute(options, id);
            resolves[id] = workerDone.bind(null, { data: { callback: id } });
          });
          return prom;
        };
        worker2.reset = function resetWorker() {
          worker2.postMessage({ reset: true });
          for (var id in resolves) {
            resolves[id]();
            delete resolves[id];
          }
        };
      }
      return function() {
        if (worker) {
          return worker;
        }
        if (!isWorker && canUseWorker) {
          var code = [
            "var CONFETTI, SIZE = {}, module = {};",
            "(" + main.toString() + ")(this, module, true, SIZE);",
            "onmessage = function(msg) {",
            "  if (msg.data.options) {",
            "    CONFETTI(msg.data.options).then(function () {",
            "      if (msg.data.callback) {",
            "        postMessage({ callback: msg.data.callback });",
            "      }",
            "    });",
            "  } else if (msg.data.reset) {",
            "    CONFETTI && CONFETTI.reset();",
            "  } else if (msg.data.resize) {",
            "    SIZE.width = msg.data.resize.width;",
            "    SIZE.height = msg.data.resize.height;",
            "  } else if (msg.data.canvas) {",
            "    SIZE.width = msg.data.canvas.width;",
            "    SIZE.height = msg.data.canvas.height;",
            "    CONFETTI = module.exports.create(msg.data.canvas);",
            "  }",
            "}"
          ].join("\n");
          try {
            worker = new Worker(URL.createObjectURL(new Blob([code])));
          } catch (e) {
            typeof console !== "undefined" && typeof console.warn === "function" ? console.warn("\u{1F38A} Could not load worker", e) : null;
            return null;
          }
          decorate(worker);
        }
        return worker;
      };
    })();
    var defaults = {
      particleCount: 50,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      x: 0.5,
      y: 0.5,
      shapes: ["square", "circle"],
      zIndex: 100,
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff"
      ],
      // probably should be true, but back-compat
      disableForReducedMotion: false,
      scalar: 1
    };
    function convert(val, transform) {
      return transform ? transform(val) : val;
    }
    function isOk(val) {
      return !(val === null || val === void 0);
    }
    function prop(options, name, transform) {
      return convert(
        options && isOk(options[name]) ? options[name] : defaults[name],
        transform
      );
    }
    function onlyPositiveInt(number) {
      return number < 0 ? 0 : Math.floor(number);
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    function toDecimal(str) {
      return parseInt(str, 16);
    }
    function colorsToRgb(colors) {
      return colors.map(hexToRgb);
    }
    function hexToRgb(str) {
      var val = String(str).replace(/[^0-9a-f]/gi, "");
      if (val.length < 6) {
        val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
      }
      return {
        r: toDecimal(val.substring(0, 2)),
        g: toDecimal(val.substring(2, 4)),
        b: toDecimal(val.substring(4, 6))
      };
    }
    function getOrigin(options) {
      var origin = prop(options, "origin", Object);
      origin.x = prop(origin, "x", Number);
      origin.y = prop(origin, "y", Number);
      return origin;
    }
    function setCanvasWindowSize(canvas) {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
    }
    function setCanvasRectSize(canvas) {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    function getCanvas(zIndex) {
      var canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = zIndex;
      return canvas;
    }
    function ellipse(context, x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.scale(radiusX, radiusY);
      context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
      context.restore();
    }
    function randomPhysics(opts) {
      var radAngle = opts.angle * (Math.PI / 180);
      var radSpread = opts.spread * (Math.PI / 180);
      return {
        x: opts.x,
        y: opts.y,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
        velocity: opts.startVelocity * 0.5 + Math.random() * opts.startVelocity,
        angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
        tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
        color: opts.color,
        shape: opts.shape,
        tick: 0,
        totalTicks: opts.ticks,
        decay: opts.decay,
        drift: opts.drift,
        random: Math.random() + 2,
        tiltSin: 0,
        tiltCos: 0,
        wobbleX: 0,
        wobbleY: 0,
        gravity: opts.gravity * 3,
        ovalScalar: 0.6,
        scalar: opts.scalar,
        flat: opts.flat
      };
    }
    function updateFetti(context, fetti) {
      fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
      fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
      fetti.velocity *= fetti.decay;
      if (fetti.flat) {
        fetti.wobble = 0;
        fetti.wobbleX = fetti.x + 10 * fetti.scalar;
        fetti.wobbleY = fetti.y + 10 * fetti.scalar;
        fetti.tiltSin = 0;
        fetti.tiltCos = 0;
        fetti.random = 1;
      } else {
        fetti.wobble += fetti.wobbleSpeed;
        fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
        fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);
        fetti.tiltAngle += 0.1;
        fetti.tiltSin = Math.sin(fetti.tiltAngle);
        fetti.tiltCos = Math.cos(fetti.tiltAngle);
        fetti.random = Math.random() + 2;
      }
      var progress = fetti.tick++ / fetti.totalTicks;
      var x1 = fetti.x + fetti.random * fetti.tiltCos;
      var y1 = fetti.y + fetti.random * fetti.tiltSin;
      var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
      var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;
      context.fillStyle = "rgba(" + fetti.color.r + ", " + fetti.color.g + ", " + fetti.color.b + ", " + (1 - progress) + ")";
      context.beginPath();
      if (canUsePaths && fetti.shape.type === "path" && typeof fetti.shape.path === "string" && Array.isArray(fetti.shape.matrix)) {
        context.fill(transformPath2D(
          fetti.shape.path,
          fetti.shape.matrix,
          fetti.x,
          fetti.y,
          Math.abs(x2 - x1) * 0.1,
          Math.abs(y2 - y1) * 0.1,
          Math.PI / 10 * fetti.wobble
        ));
      } else if (fetti.shape.type === "bitmap") {
        var rotation = Math.PI / 10 * fetti.wobble;
        var scaleX = Math.abs(x2 - x1) * 0.1;
        var scaleY = Math.abs(y2 - y1) * 0.1;
        var width = fetti.shape.bitmap.width * fetti.scalar;
        var height = fetti.shape.bitmap.height * fetti.scalar;
        var matrix = new DOMMatrix([
          Math.cos(rotation) * scaleX,
          Math.sin(rotation) * scaleX,
          -Math.sin(rotation) * scaleY,
          Math.cos(rotation) * scaleY,
          fetti.x,
          fetti.y
        ]);
        matrix.multiplySelf(new DOMMatrix(fetti.shape.matrix));
        var pattern = context.createPattern(bitmapMapper.transform(fetti.shape.bitmap), "no-repeat");
        pattern.setTransform(matrix);
        context.globalAlpha = 1 - progress;
        context.fillStyle = pattern;
        context.fillRect(
          fetti.x - width / 2,
          fetti.y - height / 2,
          width,
          height
        );
        context.globalAlpha = 1;
      } else if (fetti.shape === "circle") {
        context.ellipse ? context.ellipse(fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI) : ellipse(context, fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI);
      } else if (fetti.shape === "star") {
        var rot = Math.PI / 2 * 3;
        var innerRadius = 4 * fetti.scalar;
        var outerRadius = 8 * fetti.scalar;
        var x = fetti.x;
        var y = fetti.y;
        var spikes = 5;
        var step = Math.PI / spikes;
        while (spikes--) {
          x = fetti.x + Math.cos(rot) * outerRadius;
          y = fetti.y + Math.sin(rot) * outerRadius;
          context.lineTo(x, y);
          rot += step;
          x = fetti.x + Math.cos(rot) * innerRadius;
          y = fetti.y + Math.sin(rot) * innerRadius;
          context.lineTo(x, y);
          rot += step;
        }
      } else {
        context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
        context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
        context.lineTo(Math.floor(x2), Math.floor(y2));
        context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
      }
      context.closePath();
      context.fill();
      return fetti.tick < fetti.totalTicks;
    }
    function animate(canvas, fettis, resizer, size, done) {
      var animatingFettis = fettis.slice();
      var context = canvas.getContext("2d");
      var animationFrame;
      var destroy;
      var prom = promise(function(resolve) {
        function onDone() {
          animationFrame = destroy = null;
          context.clearRect(0, 0, size.width, size.height);
          bitmapMapper.clear();
          done();
          resolve();
        }
        function update() {
          if (isWorker && !(size.width === workerSize.width && size.height === workerSize.height)) {
            size.width = canvas.width = workerSize.width;
            size.height = canvas.height = workerSize.height;
          }
          if (!size.width && !size.height) {
            resizer(canvas);
            size.width = canvas.width;
            size.height = canvas.height;
          }
          context.clearRect(0, 0, size.width, size.height);
          animatingFettis = animatingFettis.filter(function(fetti) {
            return updateFetti(context, fetti);
          });
          if (animatingFettis.length) {
            animationFrame = raf.frame(update);
          } else {
            onDone();
          }
        }
        animationFrame = raf.frame(update);
        destroy = onDone;
      });
      return {
        addFettis: function(fettis2) {
          animatingFettis = animatingFettis.concat(fettis2);
          return prom;
        },
        canvas,
        promise: prom,
        reset: function() {
          if (animationFrame) {
            raf.cancel(animationFrame);
          }
          if (destroy) {
            destroy();
          }
        }
      };
    }
    function confettiCannon(canvas, globalOpts) {
      var isLibCanvas = !canvas;
      var allowResize = !!prop(globalOpts || {}, "resize");
      var hasResizeEventRegistered = false;
      var globalDisableForReducedMotion = prop(globalOpts, "disableForReducedMotion", Boolean);
      var shouldUseWorker = canUseWorker && !!prop(globalOpts || {}, "useWorker");
      var worker = shouldUseWorker ? getWorker() : null;
      var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
      var initialized = canvas && worker ? !!canvas.__confetti_initialized : false;
      var preferLessMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion)").matches;
      var animationObj;
      function fireLocal(options, size, done) {
        var particleCount = prop(options, "particleCount", onlyPositiveInt);
        var angle = prop(options, "angle", Number);
        var spread = prop(options, "spread", Number);
        var startVelocity = prop(options, "startVelocity", Number);
        var decay = prop(options, "decay", Number);
        var gravity = prop(options, "gravity", Number);
        var drift = prop(options, "drift", Number);
        var colors = prop(options, "colors", colorsToRgb);
        var ticks = prop(options, "ticks", Number);
        var shapes = prop(options, "shapes");
        var scalar = prop(options, "scalar");
        var flat = !!prop(options, "flat");
        var origin = getOrigin(options);
        var temp = particleCount;
        var fettis = [];
        var startX = canvas.width * origin.x;
        var startY = canvas.height * origin.y;
        while (temp--) {
          fettis.push(
            randomPhysics({
              x: startX,
              y: startY,
              angle,
              spread,
              startVelocity,
              color: colors[temp % colors.length],
              shape: shapes[randomInt(0, shapes.length)],
              ticks,
              decay,
              gravity,
              drift,
              scalar,
              flat
            })
          );
        }
        if (animationObj) {
          return animationObj.addFettis(fettis);
        }
        animationObj = animate(canvas, fettis, resizer, size, done);
        return animationObj.promise;
      }
      function fire(options) {
        var disableForReducedMotion = globalDisableForReducedMotion || prop(options, "disableForReducedMotion", Boolean);
        var zIndex = prop(options, "zIndex", Number);
        if (disableForReducedMotion && preferLessMotion) {
          return promise(function(resolve) {
            resolve();
          });
        }
        if (isLibCanvas && animationObj) {
          canvas = animationObj.canvas;
        } else if (isLibCanvas && !canvas) {
          canvas = getCanvas(zIndex);
          document.body.appendChild(canvas);
        }
        if (allowResize && !initialized) {
          resizer(canvas);
        }
        var size = {
          width: canvas.width,
          height: canvas.height
        };
        if (worker && !initialized) {
          worker.init(canvas);
        }
        initialized = true;
        if (worker) {
          canvas.__confetti_initialized = true;
        }
        function onResize() {
          if (worker) {
            var obj = {
              getBoundingClientRect: function() {
                if (!isLibCanvas) {
                  return canvas.getBoundingClientRect();
                }
              }
            };
            resizer(obj);
            worker.postMessage({
              resize: {
                width: obj.width,
                height: obj.height
              }
            });
            return;
          }
          size.width = size.height = null;
        }
        function done() {
          animationObj = null;
          if (allowResize) {
            hasResizeEventRegistered = false;
            global.removeEventListener("resize", onResize);
          }
          if (isLibCanvas && canvas) {
            if (document.body.contains(canvas)) {
              document.body.removeChild(canvas);
            }
            canvas = null;
            initialized = false;
          }
        }
        if (allowResize && !hasResizeEventRegistered) {
          hasResizeEventRegistered = true;
          global.addEventListener("resize", onResize, false);
        }
        if (worker) {
          return worker.fire(options, size, done);
        }
        return fireLocal(options, size, done);
      }
      fire.reset = function() {
        if (worker) {
          worker.reset();
        }
        if (animationObj) {
          animationObj.reset();
        }
      };
      return fire;
    }
    var defaultFire;
    function getDefaultFire() {
      if (!defaultFire) {
        defaultFire = confettiCannon(null, { useWorker: true, resize: true });
      }
      return defaultFire;
    }
    function transformPath2D(pathString, pathMatrix, x, y, scaleX, scaleY, rotation) {
      var path2d = new Path2D(pathString);
      var t1 = new Path2D();
      t1.addPath(path2d, new DOMMatrix(pathMatrix));
      var t2 = new Path2D();
      t2.addPath(t1, new DOMMatrix([
        Math.cos(rotation) * scaleX,
        Math.sin(rotation) * scaleX,
        -Math.sin(rotation) * scaleY,
        Math.cos(rotation) * scaleY,
        x,
        y
      ]));
      return t2;
    }
    function shapeFromPath(pathData) {
      if (!canUsePaths) {
        throw new Error("path confetti are not supported in this browser");
      }
      var path, matrix;
      if (typeof pathData === "string") {
        path = pathData;
      } else {
        path = pathData.path;
        matrix = pathData.matrix;
      }
      var path2d = new Path2D(path);
      var tempCanvas = document.createElement("canvas");
      var tempCtx = tempCanvas.getContext("2d");
      if (!matrix) {
        var maxSize = 1e3;
        var minX = maxSize;
        var minY = maxSize;
        var maxX = 0;
        var maxY = 0;
        var width, height;
        for (var x = 0; x < maxSize; x += 2) {
          for (var y = 0; y < maxSize; y += 2) {
            if (tempCtx.isPointInPath(path2d, x, y, "nonzero")) {
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }
        }
        width = maxX - minX;
        height = maxY - minY;
        var maxDesiredSize = 10;
        var scale = Math.min(maxDesiredSize / width, maxDesiredSize / height);
        matrix = [
          scale,
          0,
          0,
          scale,
          -Math.round(width / 2 + minX) * scale,
          -Math.round(height / 2 + minY) * scale
        ];
      }
      return {
        type: "path",
        path,
        matrix
      };
    }
    function shapeFromText(textData) {
      var text, scalar = 1, color = "#000000", fontFamily = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
      if (typeof textData === "string") {
        text = textData;
      } else {
        text = textData.text;
        scalar = "scalar" in textData ? textData.scalar : scalar;
        fontFamily = "fontFamily" in textData ? textData.fontFamily : fontFamily;
        color = "color" in textData ? textData.color : color;
      }
      var fontSize = 10 * scalar;
      var font = "" + fontSize + "px " + fontFamily;
      var canvas = new OffscreenCanvas(fontSize, fontSize);
      var ctx = canvas.getContext("2d");
      ctx.font = font;
      var size = ctx.measureText(text);
      var width = Math.ceil(size.actualBoundingBoxRight + size.actualBoundingBoxLeft);
      var height = Math.ceil(size.actualBoundingBoxAscent + size.actualBoundingBoxDescent);
      var padding = 2;
      var x = size.actualBoundingBoxLeft + padding;
      var y = size.actualBoundingBoxAscent + padding;
      width += padding + padding;
      height += padding + padding;
      canvas = new OffscreenCanvas(width, height);
      ctx = canvas.getContext("2d");
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      var scale = 1 / scalar;
      return {
        type: "bitmap",
        // TODO these probably need to be transfered for workers
        bitmap: canvas.transferToImageBitmap(),
        matrix: [scale, 0, 0, scale, -width * scale / 2, -height * scale / 2]
      };
    }
    module2.exports = function() {
      return getDefaultFire().apply(this, arguments);
    };
    module2.exports.reset = function() {
      getDefaultFire().reset();
    };
    module2.exports.create = confettiCannon;
    module2.exports.shapeFromPath = shapeFromPath;
    module2.exports.shapeFromText = shapeFromText;
  })((function() {
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    return this || {};
  })(), module, false);
  var confetti_module_default = module.exports;
  var create = module.exports.create;

  // node_modules/engine.io-parser/build/esm/commons.js
  var PACKET_TYPES = /* @__PURE__ */ Object.create(null);
  PACKET_TYPES["open"] = "0";
  PACKET_TYPES["close"] = "1";
  PACKET_TYPES["ping"] = "2";
  PACKET_TYPES["pong"] = "3";
  PACKET_TYPES["message"] = "4";
  PACKET_TYPES["upgrade"] = "5";
  PACKET_TYPES["noop"] = "6";
  var PACKET_TYPES_REVERSE = /* @__PURE__ */ Object.create(null);
  Object.keys(PACKET_TYPES).forEach((key) => {
    PACKET_TYPES_REVERSE[PACKET_TYPES[key]] = key;
  });
  var ERROR_PACKET = { type: "error", data: "parser error" };

  // node_modules/engine.io-parser/build/esm/encodePacket.browser.js
  var withNativeBlob = typeof Blob === "function" || typeof Blob !== "undefined" && Object.prototype.toString.call(Blob) === "[object BlobConstructor]";
  var withNativeArrayBuffer = typeof ArrayBuffer === "function";
  var isView = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj && obj.buffer instanceof ArrayBuffer;
  };
  var encodePacket = ({ type, data }, supportsBinary, callback) => {
    if (withNativeBlob && data instanceof Blob) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(data, callback);
      }
    } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
      if (supportsBinary) {
        return callback(data);
      } else {
        return encodeBlobAsBase64(new Blob([data]), callback);
      }
    }
    return callback(PACKET_TYPES[type] + (data || ""));
  };
  var encodeBlobAsBase64 = (data, callback) => {
    const fileReader = new FileReader();
    fileReader.onload = function() {
      const content = fileReader.result.split(",")[1];
      callback("b" + (content || ""));
    };
    return fileReader.readAsDataURL(data);
  };
  function toArray(data) {
    if (data instanceof Uint8Array) {
      return data;
    } else if (data instanceof ArrayBuffer) {
      return new Uint8Array(data);
    } else {
      return new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    }
  }
  var TEXT_ENCODER;
  function encodePacketToBinary(packet, callback) {
    if (withNativeBlob && packet.data instanceof Blob) {
      return packet.data.arrayBuffer().then(toArray).then(callback);
    } else if (withNativeArrayBuffer && (packet.data instanceof ArrayBuffer || isView(packet.data))) {
      return callback(toArray(packet.data));
    }
    encodePacket(packet, false, (encoded) => {
      if (!TEXT_ENCODER) {
        TEXT_ENCODER = new TextEncoder();
      }
      callback(TEXT_ENCODER.encode(encoded));
    });
  }

  // node_modules/engine.io-parser/build/esm/contrib/base64-arraybuffer.js
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var lookup = typeof Uint8Array === "undefined" ? [] : new Uint8Array(256);
  for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
  }
  var decode = (base64) => {
    let bufferLength = base64.length * 0.75, len = base64.length, i, p = 0, encoded1, encoded2, encoded3, encoded4;
    if (base64[base64.length - 1] === "=") {
      bufferLength--;
      if (base64[base64.length - 2] === "=") {
        bufferLength--;
      }
    }
    const arraybuffer = new ArrayBuffer(bufferLength), bytes = new Uint8Array(arraybuffer);
    for (i = 0; i < len; i += 4) {
      encoded1 = lookup[base64.charCodeAt(i)];
      encoded2 = lookup[base64.charCodeAt(i + 1)];
      encoded3 = lookup[base64.charCodeAt(i + 2)];
      encoded4 = lookup[base64.charCodeAt(i + 3)];
      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
    }
    return arraybuffer;
  };

  // node_modules/engine.io-parser/build/esm/decodePacket.browser.js
  var withNativeArrayBuffer2 = typeof ArrayBuffer === "function";
  var decodePacket = (encodedPacket, binaryType) => {
    if (typeof encodedPacket !== "string") {
      return {
        type: "message",
        data: mapBinary(encodedPacket, binaryType)
      };
    }
    const type = encodedPacket.charAt(0);
    if (type === "b") {
      return {
        type: "message",
        data: decodeBase64Packet(encodedPacket.substring(1), binaryType)
      };
    }
    const packetType = PACKET_TYPES_REVERSE[type];
    if (!packetType) {
      return ERROR_PACKET;
    }
    return encodedPacket.length > 1 ? {
      type: PACKET_TYPES_REVERSE[type],
      data: encodedPacket.substring(1)
    } : {
      type: PACKET_TYPES_REVERSE[type]
    };
  };
  var decodeBase64Packet = (data, binaryType) => {
    if (withNativeArrayBuffer2) {
      const decoded = decode(data);
      return mapBinary(decoded, binaryType);
    } else {
      return { base64: true, data };
    }
  };
  var mapBinary = (data, binaryType) => {
    switch (binaryType) {
      case "blob":
        if (data instanceof Blob) {
          return data;
        } else {
          return new Blob([data]);
        }
      case "arraybuffer":
      default:
        if (data instanceof ArrayBuffer) {
          return data;
        } else {
          return data.buffer;
        }
    }
  };

  // node_modules/engine.io-parser/build/esm/index.js
  var SEPARATOR = String.fromCharCode(30);
  var encodePayload = (packets, callback) => {
    const length = packets.length;
    const encodedPackets = new Array(length);
    let count = 0;
    packets.forEach((packet, i) => {
      encodePacket(packet, false, (encodedPacket) => {
        encodedPackets[i] = encodedPacket;
        if (++count === length) {
          callback(encodedPackets.join(SEPARATOR));
        }
      });
    });
  };
  var decodePayload = (encodedPayload, binaryType) => {
    const encodedPackets = encodedPayload.split(SEPARATOR);
    const packets = [];
    for (let i = 0; i < encodedPackets.length; i++) {
      const decodedPacket = decodePacket(encodedPackets[i], binaryType);
      packets.push(decodedPacket);
      if (decodedPacket.type === "error") {
        break;
      }
    }
    return packets;
  };
  function createPacketEncoderStream() {
    return new TransformStream({
      transform(packet, controller) {
        encodePacketToBinary(packet, (encodedPacket) => {
          const payloadLength = encodedPacket.length;
          let header;
          if (payloadLength < 126) {
            header = new Uint8Array(1);
            new DataView(header.buffer).setUint8(0, payloadLength);
          } else if (payloadLength < 65536) {
            header = new Uint8Array(3);
            const view = new DataView(header.buffer);
            view.setUint8(0, 126);
            view.setUint16(1, payloadLength);
          } else {
            header = new Uint8Array(9);
            const view = new DataView(header.buffer);
            view.setUint8(0, 127);
            view.setBigUint64(1, BigInt(payloadLength));
          }
          if (packet.data && typeof packet.data !== "string") {
            header[0] |= 128;
          }
          controller.enqueue(header);
          controller.enqueue(encodedPacket);
        });
      }
    });
  }
  var TEXT_DECODER;
  function totalLength(chunks) {
    return chunks.reduce((acc, chunk) => acc + chunk.length, 0);
  }
  function concatChunks(chunks, size) {
    if (chunks[0].length === size) {
      return chunks.shift();
    }
    const buffer = new Uint8Array(size);
    let j = 0;
    for (let i = 0; i < size; i++) {
      buffer[i] = chunks[0][j++];
      if (j === chunks[0].length) {
        chunks.shift();
        j = 0;
      }
    }
    if (chunks.length && j < chunks[0].length) {
      chunks[0] = chunks[0].slice(j);
    }
    return buffer;
  }
  function createPacketDecoderStream(maxPayload, binaryType) {
    if (!TEXT_DECODER) {
      TEXT_DECODER = new TextDecoder();
    }
    const chunks = [];
    let state = 0;
    let expectedLength = -1;
    let isBinary2 = false;
    return new TransformStream({
      transform(chunk, controller) {
        chunks.push(chunk);
        while (true) {
          if (state === 0) {
            if (totalLength(chunks) < 1) {
              break;
            }
            const header = concatChunks(chunks, 1);
            isBinary2 = (header[0] & 128) === 128;
            expectedLength = header[0] & 127;
            if (expectedLength < 126) {
              state = 3;
            } else if (expectedLength === 126) {
              state = 1;
            } else {
              state = 2;
            }
          } else if (state === 1) {
            if (totalLength(chunks) < 2) {
              break;
            }
            const headerArray = concatChunks(chunks, 2);
            expectedLength = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length).getUint16(0);
            state = 3;
          } else if (state === 2) {
            if (totalLength(chunks) < 8) {
              break;
            }
            const headerArray = concatChunks(chunks, 8);
            const view = new DataView(headerArray.buffer, headerArray.byteOffset, headerArray.length);
            const n = view.getUint32(0);
            if (n > Math.pow(2, 53 - 32) - 1) {
              controller.enqueue(ERROR_PACKET);
              break;
            }
            expectedLength = n * Math.pow(2, 32) + view.getUint32(4);
            state = 3;
          } else {
            if (totalLength(chunks) < expectedLength) {
              break;
            }
            const data = concatChunks(chunks, expectedLength);
            controller.enqueue(decodePacket(isBinary2 ? data : TEXT_DECODER.decode(data), binaryType));
            state = 0;
          }
          if (expectedLength === 0 || expectedLength > maxPayload) {
            controller.enqueue(ERROR_PACKET);
            break;
          }
        }
      }
    });
  }
  var protocol = 4;

  // node_modules/@socket.io/component-emitter/lib/esm/index.js
  function Emitter(obj) {
    if (obj) return mixin(obj);
  }
  function mixin(obj) {
    for (var key in Emitter.prototype) {
      obj[key] = Emitter.prototype[key];
    }
    return obj;
  }
  Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
    return this;
  };
  Emitter.prototype.once = function(event, fn) {
    function on2() {
      this.off(event, on2);
      fn.apply(this, arguments);
    }
    on2.fn = fn;
    this.on(event, on2);
    return this;
  };
  Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
    this._callbacks = this._callbacks || {};
    if (0 == arguments.length) {
      this._callbacks = {};
      return this;
    }
    var callbacks = this._callbacks["$" + event];
    if (!callbacks) return this;
    if (1 == arguments.length) {
      delete this._callbacks["$" + event];
      return this;
    }
    var cb;
    for (var i = 0; i < callbacks.length; i++) {
      cb = callbacks[i];
      if (cb === fn || cb.fn === fn) {
        callbacks.splice(i, 1);
        break;
      }
    }
    if (callbacks.length === 0) {
      delete this._callbacks["$" + event];
    }
    return this;
  };
  Emitter.prototype.emit = function(event) {
    this._callbacks = this._callbacks || {};
    var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    if (callbacks) {
      callbacks = callbacks.slice(0);
      for (var i = 0, len = callbacks.length; i < len; ++i) {
        callbacks[i].apply(this, args);
      }
    }
    return this;
  };
  Emitter.prototype.emitReserved = Emitter.prototype.emit;
  Emitter.prototype.listeners = function(event) {
    this._callbacks = this._callbacks || {};
    return this._callbacks["$" + event] || [];
  };
  Emitter.prototype.hasListeners = function(event) {
    return !!this.listeners(event).length;
  };

  // node_modules/engine.io-client/build/esm/globals.js
  var nextTick = (() => {
    const isPromiseAvailable = typeof Promise === "function" && typeof Promise.resolve === "function";
    if (isPromiseAvailable) {
      return (cb) => Promise.resolve().then(cb);
    } else {
      return (cb, setTimeoutFn) => setTimeoutFn(cb, 0);
    }
  })();
  var globalThisShim = (() => {
    if (typeof self !== "undefined") {
      return self;
    } else if (typeof window !== "undefined") {
      return window;
    } else {
      return Function("return this")();
    }
  })();
  var defaultBinaryType = "arraybuffer";
  function createCookieJar() {
  }

  // node_modules/engine.io-client/build/esm/util.js
  function pick(obj, ...attr) {
    return attr.reduce((acc, k) => {
      if (obj.hasOwnProperty(k)) {
        acc[k] = obj[k];
      }
      return acc;
    }, {});
  }
  var NATIVE_SET_TIMEOUT = globalThisShim.setTimeout;
  var NATIVE_CLEAR_TIMEOUT = globalThisShim.clearTimeout;
  function installTimerFunctions(obj, opts) {
    if (opts.useNativeTimers) {
      obj.setTimeoutFn = NATIVE_SET_TIMEOUT.bind(globalThisShim);
      obj.clearTimeoutFn = NATIVE_CLEAR_TIMEOUT.bind(globalThisShim);
    } else {
      obj.setTimeoutFn = globalThisShim.setTimeout.bind(globalThisShim);
      obj.clearTimeoutFn = globalThisShim.clearTimeout.bind(globalThisShim);
    }
  }
  var BASE64_OVERHEAD = 1.33;
  function byteLength(obj) {
    if (typeof obj === "string") {
      return utf8Length(obj);
    }
    return Math.ceil((obj.byteLength || obj.size) * BASE64_OVERHEAD);
  }
  function utf8Length(str) {
    let c = 0, length = 0;
    for (let i = 0, l = str.length; i < l; i++) {
      c = str.charCodeAt(i);
      if (c < 128) {
        length += 1;
      } else if (c < 2048) {
        length += 2;
      } else if (c < 55296 || c >= 57344) {
        length += 3;
      } else {
        i++;
        length += 4;
      }
    }
    return length;
  }
  function randomString() {
    return Date.now().toString(36).substring(3) + Math.random().toString(36).substring(2, 5);
  }

  // node_modules/engine.io-client/build/esm/contrib/parseqs.js
  function encode(obj) {
    let str = "";
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        if (str.length)
          str += "&";
        str += encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]);
      }
    }
    return str;
  }
  function decode2(qs) {
    let qry = {};
    let pairs = qs.split("&");
    for (let i = 0, l = pairs.length; i < l; i++) {
      let pair = pairs[i].split("=");
      qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
    }
    return qry;
  }

  // node_modules/engine.io-client/build/esm/transport.js
  var TransportError = class extends Error {
    constructor(reason, description, context) {
      super(reason);
      this.description = description;
      this.context = context;
      this.type = "TransportError";
    }
  };
  var Transport = class extends Emitter {
    /**
     * Transport abstract constructor.
     *
     * @param {Object} opts - options
     * @protected
     */
    constructor(opts) {
      super();
      this.writable = false;
      installTimerFunctions(this, opts);
      this.opts = opts;
      this.query = opts.query;
      this.socket = opts.socket;
      this.supportsBinary = !opts.forceBase64;
    }
    /**
     * Emits an error.
     *
     * @param {String} reason
     * @param description
     * @param context - the error context
     * @return {Transport} for chaining
     * @protected
     */
    onError(reason, description, context) {
      super.emitReserved("error", new TransportError(reason, description, context));
      return this;
    }
    /**
     * Opens the transport.
     */
    open() {
      this.readyState = "opening";
      this.doOpen();
      return this;
    }
    /**
     * Closes the transport.
     */
    close() {
      if (this.readyState === "opening" || this.readyState === "open") {
        this.doClose();
        this.onClose();
      }
      return this;
    }
    /**
     * Sends multiple packets.
     *
     * @param {Array} packets
     */
    send(packets) {
      if (this.readyState === "open") {
        this.write(packets);
      } else {
      }
    }
    /**
     * Called upon open
     *
     * @protected
     */
    onOpen() {
      this.readyState = "open";
      this.writable = true;
      super.emitReserved("open");
    }
    /**
     * Called with data.
     *
     * @param {String} data
     * @protected
     */
    onData(data) {
      const packet = decodePacket(data, this.socket.binaryType);
      this.onPacket(packet);
    }
    /**
     * Called with a decoded packet.
     *
     * @protected
     */
    onPacket(packet) {
      super.emitReserved("packet", packet);
    }
    /**
     * Called upon close.
     *
     * @protected
     */
    onClose(details) {
      this.readyState = "closed";
      super.emitReserved("close", details);
    }
    /**
     * Pauses the transport, in order not to lose packets during an upgrade.
     *
     * @param onPause
     */
    pause(onPause) {
    }
    createUri(schema, query = {}) {
      return schema + "://" + this._hostname() + this._port() + this.opts.path + this._query(query);
    }
    _hostname() {
      const hostname = this.opts.hostname;
      return hostname.indexOf(":") === -1 ? hostname : "[" + hostname + "]";
    }
    _port() {
      if (this.opts.port && (this.opts.secure && Number(this.opts.port) !== 443 || !this.opts.secure && Number(this.opts.port) !== 80)) {
        return ":" + this.opts.port;
      } else {
        return "";
      }
    }
    _query(query) {
      const encodedQuery = encode(query);
      return encodedQuery.length ? "?" + encodedQuery : "";
    }
  };

  // node_modules/engine.io-client/build/esm/transports/polling.js
  var Polling = class extends Transport {
    constructor() {
      super(...arguments);
      this._polling = false;
    }
    get name() {
      return "polling";
    }
    /**
     * Opens the socket (triggers polling). We write a PING message to determine
     * when the transport is open.
     *
     * @protected
     */
    doOpen() {
      this._poll();
    }
    /**
     * Pauses polling.
     *
     * @param {Function} onPause - callback upon buffers are flushed and transport is paused
     * @package
     */
    pause(onPause) {
      this.readyState = "pausing";
      const pause = () => {
        this.readyState = "paused";
        onPause();
      };
      if (this._polling || !this.writable) {
        let total = 0;
        if (this._polling) {
          total++;
          this.once("pollComplete", function() {
            --total || pause();
          });
        }
        if (!this.writable) {
          total++;
          this.once("drain", function() {
            --total || pause();
          });
        }
      } else {
        pause();
      }
    }
    /**
     * Starts polling cycle.
     *
     * @private
     */
    _poll() {
      this._polling = true;
      this.doPoll();
      this.emitReserved("poll");
    }
    /**
     * Overloads onData to detect payloads.
     *
     * @protected
     */
    onData(data) {
      const callback = (packet) => {
        if ("opening" === this.readyState && packet.type === "open") {
          this.onOpen();
        }
        if ("close" === packet.type) {
          this.onClose({ description: "transport closed by the server" });
          return false;
        }
        this.onPacket(packet);
      };
      decodePayload(data, this.socket.binaryType).forEach(callback);
      if ("closed" !== this.readyState) {
        this._polling = false;
        this.emitReserved("pollComplete");
        if ("open" === this.readyState) {
          this._poll();
        } else {
        }
      }
    }
    /**
     * For polling, send a close packet.
     *
     * @protected
     */
    doClose() {
      const close = () => {
        this.write([{ type: "close" }]);
      };
      if ("open" === this.readyState) {
        close();
      } else {
        this.once("open", close);
      }
    }
    /**
     * Writes a packets payload.
     *
     * @param {Array} packets - data packets
     * @protected
     */
    write(packets) {
      this.writable = false;
      encodePayload(packets, (data) => {
        this.doWrite(data, () => {
          this.writable = true;
          this.emitReserved("drain");
        });
      });
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "https" : "http";
      const query = this.query || {};
      if (false !== this.opts.timestampRequests) {
        query[this.opts.timestampParam] = randomString();
      }
      if (!this.supportsBinary && !query.sid) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
  };

  // node_modules/engine.io-client/build/esm/contrib/has-cors.js
  var value = false;
  try {
    value = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
  } catch (err) {
  }
  var hasCORS = value;

  // node_modules/engine.io-client/build/esm/transports/polling-xhr.js
  function empty() {
  }
  var BaseXHR = class extends Polling {
    /**
     * XHR Polling constructor.
     *
     * @param {Object} opts
     * @package
     */
    constructor(opts) {
      super(opts);
      if (typeof location !== "undefined") {
        const isSSL = "https:" === location.protocol;
        let port = location.port;
        if (!port) {
          port = isSSL ? "443" : "80";
        }
        this.xd = typeof location !== "undefined" && opts.hostname !== location.hostname || port !== opts.port;
      }
    }
    /**
     * Sends data.
     *
     * @param {String} data - data to send.
     * @param {Function} fn - called upon flush.
     * @private
     */
    doWrite(data, fn) {
      const req = this.request({
        method: "POST",
        data
      });
      req.on("success", fn);
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr post error", xhrStatus, context);
      });
    }
    /**
     * Starts a poll cycle.
     *
     * @private
     */
    doPoll() {
      const req = this.request();
      req.on("data", this.onData.bind(this));
      req.on("error", (xhrStatus, context) => {
        this.onError("xhr poll error", xhrStatus, context);
      });
      this.pollXhr = req;
    }
  };
  var Request = class _Request extends Emitter {
    /**
     * Request constructor
     *
     * @param {Object} options
     * @package
     */
    constructor(createRequest, uri, opts) {
      super();
      this.createRequest = createRequest;
      installTimerFunctions(this, opts);
      this._opts = opts;
      this._method = opts.method || "GET";
      this._uri = uri;
      this._data = void 0 !== opts.data ? opts.data : null;
      this._create();
    }
    /**
     * Creates the XHR object and sends the request.
     *
     * @private
     */
    _create() {
      var _a;
      const opts = pick(this._opts, "agent", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "autoUnref");
      opts.xdomain = !!this._opts.xd;
      const xhr = this._xhr = this.createRequest(opts);
      try {
        xhr.open(this._method, this._uri, true);
        try {
          if (this._opts.extraHeaders) {
            xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
            for (let i in this._opts.extraHeaders) {
              if (this._opts.extraHeaders.hasOwnProperty(i)) {
                xhr.setRequestHeader(i, this._opts.extraHeaders[i]);
              }
            }
          }
        } catch (e) {
        }
        if ("POST" === this._method) {
          try {
            xhr.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
          } catch (e) {
          }
        }
        try {
          xhr.setRequestHeader("Accept", "*/*");
        } catch (e) {
        }
        (_a = this._opts.cookieJar) === null || _a === void 0 ? void 0 : _a.addCookies(xhr);
        if ("withCredentials" in xhr) {
          xhr.withCredentials = this._opts.withCredentials;
        }
        if (this._opts.requestTimeout) {
          xhr.timeout = this._opts.requestTimeout;
        }
        xhr.onreadystatechange = () => {
          var _a2;
          if (xhr.readyState === 3) {
            (_a2 = this._opts.cookieJar) === null || _a2 === void 0 ? void 0 : _a2.parseCookies(
              // @ts-ignore
              xhr.getResponseHeader("set-cookie")
            );
          }
          if (4 !== xhr.readyState)
            return;
          if (200 === xhr.status || 1223 === xhr.status) {
            this._onLoad();
          } else {
            this.setTimeoutFn(() => {
              this._onError(typeof xhr.status === "number" ? xhr.status : 0);
            }, 0);
          }
        };
        xhr.send(this._data);
      } catch (e) {
        this.setTimeoutFn(() => {
          this._onError(e);
        }, 0);
        return;
      }
      if (typeof document !== "undefined") {
        this._index = _Request.requestsCount++;
        _Request.requests[this._index] = this;
      }
    }
    /**
     * Called upon error.
     *
     * @private
     */
    _onError(err) {
      this.emitReserved("error", err, this._xhr);
      this._cleanup(true);
    }
    /**
     * Cleans up house.
     *
     * @private
     */
    _cleanup(fromError) {
      if ("undefined" === typeof this._xhr || null === this._xhr) {
        return;
      }
      this._xhr.onreadystatechange = empty;
      if (fromError) {
        try {
          this._xhr.abort();
        } catch (e) {
        }
      }
      if (typeof document !== "undefined") {
        delete _Request.requests[this._index];
      }
      this._xhr = null;
    }
    /**
     * Called upon load.
     *
     * @private
     */
    _onLoad() {
      const data = this._xhr.responseText;
      if (data !== null) {
        this.emitReserved("data", data);
        this.emitReserved("success");
        this._cleanup();
      }
    }
    /**
     * Aborts the request.
     *
     * @package
     */
    abort() {
      this._cleanup();
    }
  };
  Request.requestsCount = 0;
  Request.requests = {};
  if (typeof document !== "undefined") {
    if (typeof attachEvent === "function") {
      attachEvent("onunload", unloadHandler);
    } else if (typeof addEventListener === "function") {
      const terminationEvent = "onpagehide" in globalThisShim ? "pagehide" : "unload";
      addEventListener(terminationEvent, unloadHandler, false);
    }
  }
  function unloadHandler() {
    for (let i in Request.requests) {
      if (Request.requests.hasOwnProperty(i)) {
        Request.requests[i].abort();
      }
    }
  }
  var hasXHR2 = (function() {
    const xhr = newRequest({
      xdomain: false
    });
    return xhr && xhr.responseType !== null;
  })();
  var XHR = class extends BaseXHR {
    constructor(opts) {
      super(opts);
      const forceBase64 = opts && opts.forceBase64;
      this.supportsBinary = hasXHR2 && !forceBase64;
    }
    request(opts = {}) {
      Object.assign(opts, { xd: this.xd }, this.opts);
      return new Request(newRequest, this.uri(), opts);
    }
  };
  function newRequest(opts) {
    const xdomain = opts.xdomain;
    try {
      if ("undefined" !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
        return new XMLHttpRequest();
      }
    } catch (e) {
    }
    if (!xdomain) {
      try {
        return new globalThisShim[["Active"].concat("Object").join("X")]("Microsoft.XMLHTTP");
      } catch (e) {
      }
    }
  }

  // node_modules/engine.io-client/build/esm/transports/websocket.js
  var isReactNative = typeof navigator !== "undefined" && typeof navigator.product === "string" && navigator.product.toLowerCase() === "reactnative";
  var BaseWS = class extends Transport {
    get name() {
      return "websocket";
    }
    doOpen() {
      const uri = this.uri();
      const protocols = this.opts.protocols;
      const opts = isReactNative ? {} : pick(this.opts, "agent", "perMessageDeflate", "pfx", "key", "passphrase", "cert", "ca", "ciphers", "rejectUnauthorized", "localAddress", "protocolVersion", "origin", "maxPayload", "family", "checkServerIdentity");
      if (this.opts.extraHeaders) {
        opts.headers = this.opts.extraHeaders;
      }
      try {
        this.ws = this.createSocket(uri, protocols, opts);
      } catch (err) {
        return this.emitReserved("error", err);
      }
      this.ws.binaryType = this.socket.binaryType;
      this.addEventListeners();
    }
    /**
     * Adds event listeners to the socket
     *
     * @private
     */
    addEventListeners() {
      this.ws.onopen = () => {
        if (this.opts.autoUnref) {
          this.ws._socket.unref();
        }
        this.onOpen();
      };
      this.ws.onclose = (closeEvent) => this.onClose({
        description: "websocket connection closed",
        context: closeEvent
      });
      this.ws.onmessage = (ev) => this.onData(ev.data);
      this.ws.onerror = (e) => this.onError("websocket error", e);
    }
    write(packets) {
      this.writable = false;
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;
        encodePacket(packet, this.supportsBinary, (data) => {
          try {
            this.doWrite(packet, data);
          } catch (e) {
          }
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      if (typeof this.ws !== "undefined") {
        this.ws.onerror = () => {
        };
        this.ws.close();
        this.ws = null;
      }
    }
    /**
     * Generates uri for connection.
     *
     * @private
     */
    uri() {
      const schema = this.opts.secure ? "wss" : "ws";
      const query = this.query || {};
      if (this.opts.timestampRequests) {
        query[this.opts.timestampParam] = randomString();
      }
      if (!this.supportsBinary) {
        query.b64 = 1;
      }
      return this.createUri(schema, query);
    }
  };
  var WebSocketCtor = globalThisShim.WebSocket || globalThisShim.MozWebSocket;
  var WS = class extends BaseWS {
    createSocket(uri, protocols, opts) {
      return !isReactNative ? protocols ? new WebSocketCtor(uri, protocols) : new WebSocketCtor(uri) : new WebSocketCtor(uri, protocols, opts);
    }
    doWrite(_packet, data) {
      this.ws.send(data);
    }
  };

  // node_modules/engine.io-client/build/esm/transports/webtransport.js
  var WT = class extends Transport {
    get name() {
      return "webtransport";
    }
    doOpen() {
      try {
        this._transport = new WebTransport(this.createUri("https"), this.opts.transportOptions[this.name]);
      } catch (err) {
        return this.emitReserved("error", err);
      }
      this._transport.closed.then(() => {
        this.onClose();
      }).catch((err) => {
        this.onError("webtransport error", err);
      });
      this._transport.ready.then(() => {
        this._transport.createBidirectionalStream().then((stream) => {
          const decoderStream = createPacketDecoderStream(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
          const reader = stream.readable.pipeThrough(decoderStream).getReader();
          const encoderStream = createPacketEncoderStream();
          encoderStream.readable.pipeTo(stream.writable);
          this._writer = encoderStream.writable.getWriter();
          const read = () => {
            reader.read().then(({ done, value: value2 }) => {
              if (done) {
                return;
              }
              this.onPacket(value2);
              read();
            }).catch((err) => {
            });
          };
          read();
          const packet = { type: "open" };
          if (this.query.sid) {
            packet.data = `{"sid":"${this.query.sid}"}`;
          }
          this._writer.write(packet).then(() => this.onOpen());
        });
      });
    }
    write(packets) {
      this.writable = false;
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const lastPacket = i === packets.length - 1;
        this._writer.write(packet).then(() => {
          if (lastPacket) {
            nextTick(() => {
              this.writable = true;
              this.emitReserved("drain");
            }, this.setTimeoutFn);
          }
        });
      }
    }
    doClose() {
      var _a;
      (_a = this._transport) === null || _a === void 0 ? void 0 : _a.close();
    }
  };

  // node_modules/engine.io-client/build/esm/transports/index.js
  var transports = {
    websocket: WS,
    webtransport: WT,
    polling: XHR
  };

  // node_modules/engine.io-client/build/esm/contrib/parseuri.js
  var re = /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;
  var parts = [
    "source",
    "protocol",
    "authority",
    "userInfo",
    "user",
    "password",
    "host",
    "port",
    "relative",
    "path",
    "directory",
    "file",
    "query",
    "anchor"
  ];
  function parse(str) {
    if (str.length > 8e3) {
      throw "URI too long";
    }
    const src = str, b = str.indexOf("["), e = str.indexOf("]");
    if (b != -1 && e != -1) {
      str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ";") + str.substring(e, str.length);
    }
    let m = re.exec(str || ""), uri = {}, i = 14;
    while (i--) {
      uri[parts[i]] = m[i] || "";
    }
    if (b != -1 && e != -1) {
      uri.source = src;
      uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ":");
      uri.authority = uri.authority.replace("[", "").replace("]", "").replace(/;/g, ":");
      uri.ipv6uri = true;
    }
    uri.pathNames = pathNames(uri, uri["path"]);
    uri.queryKey = queryKey(uri, uri["query"]);
    return uri;
  }
  function pathNames(obj, path) {
    const regx = /\/{2,9}/g, names = path.replace(regx, "/").split("/");
    if (path.slice(0, 1) == "/" || path.length === 0) {
      names.splice(0, 1);
    }
    if (path.slice(-1) == "/") {
      names.splice(names.length - 1, 1);
    }
    return names;
  }
  function queryKey(uri, query) {
    const data = {};
    query.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function($0, $1, $2) {
      if ($1) {
        data[$1] = $2;
      }
    });
    return data;
  }

  // node_modules/engine.io-client/build/esm/socket.js
  var withEventListeners = typeof addEventListener === "function" && typeof removeEventListener === "function";
  var OFFLINE_EVENT_LISTENERS = [];
  if (withEventListeners) {
    addEventListener("offline", () => {
      OFFLINE_EVENT_LISTENERS.forEach((listener) => listener());
    }, false);
  }
  var Socket = class _Socket extends Emitter {
    constructor(uri, opts = {}) {
      var _a, _b;
      super();
      this.binaryType = defaultBinaryType;
      this.writeBuffer = [];
      this._prevBufferLen = 0;
      this._upgrades = [];
      this._pingInterval = -1;
      this._pingTimeout = -1;
      this._maxPayload = -1;
      this._pingTimeoutTime = Infinity;
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = null;
      }
      if (uri) {
        const parsedUri = parse(uri);
        opts.hostname = parsedUri.host;
        opts.secure = parsedUri.protocol === "https" || parsedUri.protocol === "wss";
        opts.port = parsedUri.port;
        if (parsedUri.query)
          opts.query = parsedUri.query;
      } else if (opts.host) {
        opts.hostname = parse(opts.host).host;
      }
      installTimerFunctions(this, opts);
      this.secure = null != opts.secure ? opts.secure : typeof location !== "undefined" && "https:" === location.protocol;
      if (opts.hostname && !opts.port) {
        opts.port = this.secure ? "443" : "80";
      }
      this.hostname = opts.hostname || (typeof location !== "undefined" ? location.hostname : "localhost");
      this.port = opts.port || (typeof location !== "undefined" && location.port ? location.port : this.secure ? "443" : "80");
      if (opts.transportImplementations && opts.transports) {
        throw new Error("specifying both 'transportImplementations' and 'transports' options is not supported");
      }
      if (opts.transportImplementations || ((_a = opts.transports) === null || _a === void 0 ? void 0 : _a.length) && typeof opts.transports[0] === "function") {
        this.transports = [];
        this._transportsByName = /* @__PURE__ */ Object.create(null);
        ((_b = opts.transportImplementations) !== null && _b !== void 0 ? _b : opts.transports).forEach((t) => {
          const transportName = t.prototype.name;
          this.transports.push(transportName);
          this._transportsByName[transportName] = t;
        });
      } else {
        this.transports = opts.transports ? [...opts.transports] : ["polling", "websocket", "webtransport"];
        this._transportsByName = transports;
      }
      this.opts = Object.assign({
        path: "/engine.io",
        agent: false,
        withCredentials: false,
        upgrade: true,
        timestampParam: "t",
        rememberUpgrade: false,
        addTrailingSlash: true,
        rejectUnauthorized: true,
        perMessageDeflate: {
          threshold: 1024
        },
        transportOptions: {},
        closeOnBeforeunload: false
      }, opts);
      this.opts.path = this.opts.path.replace(/\/$/, "") + (this.opts.addTrailingSlash ? "/" : "");
      if (typeof this.opts.query === "string") {
        this.opts.query = decode2(this.opts.query);
      }
      if (withEventListeners) {
        if (this.opts.closeOnBeforeunload) {
          this._beforeunloadEventListener = () => {
            if (this.transport) {
              this.transport.removeAllListeners();
              this.transport.close();
            }
          };
          addEventListener("beforeunload", this._beforeunloadEventListener, false);
        }
        if (this.hostname !== "localhost") {
          this._offlineEventListener = () => {
            this._onClose("transport close", {
              description: "network connection lost"
            });
          };
          OFFLINE_EVENT_LISTENERS.push(this._offlineEventListener);
        }
      }
      if (this.opts.withCredentials) {
        this._cookieJar = createCookieJar();
      }
      this._open();
    }
    /**
     * Creates transport of the given type.
     *
     * @param {String} name - transport name
     * @return {Transport}
     * @private
     */
    createTransport(name) {
      const query = Object.assign({}, this.opts.query);
      query.EIO = protocol;
      query.transport = name;
      if (this.id)
        query.sid = this.id;
      const opts = Object.assign({}, this.opts, {
        query,
        socket: this,
        hostname: this.hostname,
        secure: this.secure,
        port: this.port
      }, this.opts.transportOptions[name]);
      return new this._transportsByName[name](opts);
    }
    /**
     * Initializes transport to use and starts probe.
     *
     * @private
     */
    _open() {
      if (this.transports.length === 0) {
        this.setTimeoutFn(() => {
          this.emitReserved("error", "No transports available");
        }, 0);
        return;
      }
      const transportName = this.opts.rememberUpgrade && _Socket.priorWebsocketSuccess && this.transports.indexOf("websocket") !== -1 ? "websocket" : this.transports[0];
      this.readyState = "opening";
      const transport = this.createTransport(transportName);
      transport.open();
      this.setTransport(transport);
    }
    /**
     * Sets the current transport. Disables the existing one (if any).
     *
     * @private
     */
    setTransport(transport) {
      if (this.transport) {
        this.transport.removeAllListeners();
      }
      this.transport = transport;
      transport.on("drain", this._onDrain.bind(this)).on("packet", this._onPacket.bind(this)).on("error", this._onError.bind(this)).on("close", (reason) => this._onClose("transport close", reason));
    }
    /**
     * Probes a transport.
     *
     * @param {String} name - transport name
     * @private
     */
    _probe(name) {
      let transport = this.createTransport(name);
      let failed = false;
      _Socket.priorWebsocketSuccess = false;
      const onTransportOpen = () => {
        if (failed)
          return;
        transport.send([{ type: "ping", data: "probe" }]);
        transport.once("packet", (msg) => {
          if (failed)
            return;
          if ("pong" === msg.type && "probe" === msg.data) {
            this.upgrading = true;
            this.emitReserved("upgrading", transport);
            if (!transport)
              return;
            _Socket.priorWebsocketSuccess = "websocket" === transport.name;
            this.transport.pause(() => {
              if (failed)
                return;
              if ("closed" === this.readyState)
                return;
              cleanup();
              this.setTransport(transport);
              transport.send([{ type: "upgrade" }]);
              this.emitReserved("upgrade", transport);
              transport = null;
              this.upgrading = false;
              this.flush();
            });
          } else {
            const err = new Error("probe error");
            err.transport = transport.name;
            this.emitReserved("upgradeError", err);
          }
        });
      };
      function freezeTransport() {
        if (failed)
          return;
        failed = true;
        cleanup();
        transport.close();
        transport = null;
      }
      const onerror = (err) => {
        const error = new Error("probe error: " + err);
        error.transport = transport.name;
        freezeTransport();
        this.emitReserved("upgradeError", error);
      };
      function onTransportClose() {
        onerror("transport closed");
      }
      function onclose() {
        onerror("socket closed");
      }
      function onupgrade(to) {
        if (transport && to.name !== transport.name) {
          freezeTransport();
        }
      }
      const cleanup = () => {
        transport.removeListener("open", onTransportOpen);
        transport.removeListener("error", onerror);
        transport.removeListener("close", onTransportClose);
        this.off("close", onclose);
        this.off("upgrading", onupgrade);
      };
      transport.once("open", onTransportOpen);
      transport.once("error", onerror);
      transport.once("close", onTransportClose);
      this.once("close", onclose);
      this.once("upgrading", onupgrade);
      if (this._upgrades.indexOf("webtransport") !== -1 && name !== "webtransport") {
        this.setTimeoutFn(() => {
          if (!failed) {
            transport.open();
          }
        }, 200);
      } else {
        transport.open();
      }
    }
    /**
     * Called when connection is deemed open.
     *
     * @private
     */
    onOpen() {
      this.readyState = "open";
      _Socket.priorWebsocketSuccess = "websocket" === this.transport.name;
      this.emitReserved("open");
      this.flush();
      if ("open" === this.readyState && this.opts.upgrade) {
        for (let i = 0; i < this._upgrades.length; i++) {
          this._probe(this._upgrades[i]);
        }
      }
    }
    /**
     * Handles a packet.
     *
     * @private
     */
    _onPacket(packet) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.emitReserved("packet", packet);
        this.emitReserved("heartbeat");
        switch (packet.type) {
          case "open":
            this.onHandshake(JSON.parse(packet.data));
            break;
          case "ping":
            this._sendPacket("pong");
            this.emitReserved("ping");
            this.emitReserved("pong");
            this._resetPingTimeout();
            break;
          case "error":
            const err = new Error("server error");
            err.code = packet.data;
            this._onError(err);
            break;
          case "message":
            this.emitReserved("data", packet.data);
            this.emitReserved("message", packet.data);
            break;
        }
      } else {
      }
    }
    /**
     * Called upon handshake completion.
     *
     * @param {Object} data - handshake obj
     * @private
     */
    onHandshake(data) {
      this.emitReserved("handshake", data);
      this.id = data.sid;
      this.transport.query.sid = data.sid;
      this._upgrades = this._filterUpgrades(data.upgrades);
      this._pingInterval = data.pingInterval;
      this._pingTimeout = data.pingTimeout;
      this._maxPayload = data.maxPayload;
      this.onOpen();
      if ("closed" === this.readyState)
        return;
      this._resetPingTimeout();
    }
    /**
     * Sets and resets ping timeout timer based on server pings.
     *
     * @private
     */
    _resetPingTimeout() {
      this.clearTimeoutFn(this._pingTimeoutTimer);
      const delay = this._pingInterval + this._pingTimeout;
      this._pingTimeoutTime = Date.now() + delay;
      this._pingTimeoutTimer = this.setTimeoutFn(() => {
        this._onClose("ping timeout");
      }, delay);
      if (this.opts.autoUnref) {
        this._pingTimeoutTimer.unref();
      }
    }
    /**
     * Called on `drain` event
     *
     * @private
     */
    _onDrain() {
      this.writeBuffer.splice(0, this._prevBufferLen);
      this._prevBufferLen = 0;
      if (0 === this.writeBuffer.length) {
        this.emitReserved("drain");
      } else {
        this.flush();
      }
    }
    /**
     * Flush write buffers.
     *
     * @private
     */
    flush() {
      if ("closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
        const packets = this._getWritablePackets();
        this.transport.send(packets);
        this._prevBufferLen = packets.length;
        this.emitReserved("flush");
      }
    }
    /**
     * Ensure the encoded size of the writeBuffer is below the maxPayload value sent by the server (only for HTTP
     * long-polling)
     *
     * @private
     */
    _getWritablePackets() {
      const shouldCheckPayloadSize = this._maxPayload && this.transport.name === "polling" && this.writeBuffer.length > 1;
      if (!shouldCheckPayloadSize) {
        return this.writeBuffer;
      }
      let payloadSize = 1;
      for (let i = 0; i < this.writeBuffer.length; i++) {
        const data = this.writeBuffer[i].data;
        if (data) {
          payloadSize += byteLength(data);
        }
        if (i > 0 && payloadSize > this._maxPayload) {
          return this.writeBuffer.slice(0, i);
        }
        payloadSize += 2;
      }
      return this.writeBuffer;
    }
    /**
     * Checks whether the heartbeat timer has expired but the socket has not yet been notified.
     *
     * Note: this method is private for now because it does not really fit the WebSocket API, but if we put it in the
     * `write()` method then the message would not be buffered by the Socket.IO client.
     *
     * @return {boolean}
     * @private
     */
    /* private */
    _hasPingExpired() {
      if (!this._pingTimeoutTime)
        return true;
      const hasExpired = Date.now() > this._pingTimeoutTime;
      if (hasExpired) {
        this._pingTimeoutTime = 0;
        nextTick(() => {
          this._onClose("ping timeout");
        }, this.setTimeoutFn);
      }
      return hasExpired;
    }
    /**
     * Sends a message.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    write(msg, options, fn) {
      this._sendPacket("message", msg, options, fn);
      return this;
    }
    /**
     * Sends a message. Alias of {@link Socket#write}.
     *
     * @param {String} msg - message.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @return {Socket} for chaining.
     */
    send(msg, options, fn) {
      this._sendPacket("message", msg, options, fn);
      return this;
    }
    /**
     * Sends a packet.
     *
     * @param {String} type - packet type.
     * @param {String} data.
     * @param {Object} options.
     * @param {Function} fn - callback function.
     * @private
     */
    _sendPacket(type, data, options, fn) {
      if ("function" === typeof data) {
        fn = data;
        data = void 0;
      }
      if ("function" === typeof options) {
        fn = options;
        options = null;
      }
      if ("closing" === this.readyState || "closed" === this.readyState) {
        return;
      }
      options = options || {};
      options.compress = false !== options.compress;
      const packet = {
        type,
        data,
        options
      };
      this.emitReserved("packetCreate", packet);
      this.writeBuffer.push(packet);
      if (fn)
        this.once("flush", fn);
      this.flush();
    }
    /**
     * Closes the connection.
     */
    close() {
      const close = () => {
        this._onClose("forced close");
        this.transport.close();
      };
      const cleanupAndClose = () => {
        this.off("upgrade", cleanupAndClose);
        this.off("upgradeError", cleanupAndClose);
        close();
      };
      const waitForUpgrade = () => {
        this.once("upgrade", cleanupAndClose);
        this.once("upgradeError", cleanupAndClose);
      };
      if ("opening" === this.readyState || "open" === this.readyState) {
        this.readyState = "closing";
        if (this.writeBuffer.length) {
          this.once("drain", () => {
            if (this.upgrading) {
              waitForUpgrade();
            } else {
              close();
            }
          });
        } else if (this.upgrading) {
          waitForUpgrade();
        } else {
          close();
        }
      }
      return this;
    }
    /**
     * Called upon transport error
     *
     * @private
     */
    _onError(err) {
      _Socket.priorWebsocketSuccess = false;
      if (this.opts.tryAllTransports && this.transports.length > 1 && this.readyState === "opening") {
        this.transports.shift();
        return this._open();
      }
      this.emitReserved("error", err);
      this._onClose("transport error", err);
    }
    /**
     * Called upon transport close.
     *
     * @private
     */
    _onClose(reason, description) {
      if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
        this.clearTimeoutFn(this._pingTimeoutTimer);
        this.transport.removeAllListeners("close");
        this.transport.close();
        this.transport.removeAllListeners();
        if (withEventListeners) {
          if (this._beforeunloadEventListener) {
            removeEventListener("beforeunload", this._beforeunloadEventListener, false);
          }
          if (this._offlineEventListener) {
            const i = OFFLINE_EVENT_LISTENERS.indexOf(this._offlineEventListener);
            if (i !== -1) {
              OFFLINE_EVENT_LISTENERS.splice(i, 1);
            }
          }
        }
        this.readyState = "closed";
        this.id = null;
        this.emitReserved("close", reason, description);
        this.writeBuffer = [];
        this._prevBufferLen = 0;
      }
    }
    /**
     * Filters upgrades, returning only those matching client transports.
     *
     * @param {Array} upgrades - server upgrades
     * @private
     */
    _filterUpgrades(upgrades) {
      const filteredUpgrades = [];
      for (let i = 0; i < upgrades.length; i++) {
        if (~this.transports.indexOf(upgrades[i]))
          filteredUpgrades.push(upgrades[i]);
      }
      return filteredUpgrades;
    }
  };
  Socket.protocol = protocol;

  // node_modules/engine.io-client/build/esm/index.js
  var protocol2 = Socket.protocol;

  // node_modules/socket.io-client/build/esm/url.js
  function url(uri, path = "", loc) {
    let obj = uri;
    loc = loc || typeof location !== "undefined" && location;
    if (null == uri)
      uri = loc.protocol + "//" + loc.host;
    if (typeof uri === "string") {
      if ("/" === uri.charAt(0)) {
        if ("/" === uri.charAt(1)) {
          uri = loc.protocol + uri;
        } else {
          uri = loc.host + uri;
        }
      }
      if (!/^(https?|wss?):\/\//.test(uri)) {
        if ("undefined" !== typeof loc) {
          uri = loc.protocol + "//" + uri;
        } else {
          uri = "https://" + uri;
        }
      }
      obj = parse(uri);
    }
    if (!obj.port) {
      if (/^(http|ws)$/.test(obj.protocol)) {
        obj.port = "80";
      } else if (/^(http|ws)s$/.test(obj.protocol)) {
        obj.port = "443";
      }
    }
    obj.path = obj.path || "/";
    const ipv6 = obj.host.indexOf(":") !== -1;
    const host = ipv6 ? "[" + obj.host + "]" : obj.host;
    obj.id = obj.protocol + "://" + host + ":" + obj.port + path;
    obj.href = obj.protocol + "://" + host + (loc && loc.port === obj.port ? "" : ":" + obj.port);
    return obj;
  }

  // node_modules/socket.io-parser/build/esm/index.js
  var esm_exports = {};
  __export(esm_exports, {
    Decoder: () => Decoder,
    Encoder: () => Encoder,
    PacketType: () => PacketType,
    isPacketValid: () => isPacketValid,
    protocol: () => protocol3
  });

  // node_modules/socket.io-parser/build/esm/is-binary.js
  var withNativeArrayBuffer3 = typeof ArrayBuffer === "function";
  var isView2 = (obj) => {
    return typeof ArrayBuffer.isView === "function" ? ArrayBuffer.isView(obj) : obj.buffer instanceof ArrayBuffer;
  };
  var toString = Object.prototype.toString;
  var withNativeBlob2 = typeof Blob === "function" || typeof Blob !== "undefined" && toString.call(Blob) === "[object BlobConstructor]";
  var withNativeFile = typeof File === "function" || typeof File !== "undefined" && toString.call(File) === "[object FileConstructor]";
  function isBinary(obj) {
    return withNativeArrayBuffer3 && (obj instanceof ArrayBuffer || isView2(obj)) || withNativeBlob2 && obj instanceof Blob || withNativeFile && obj instanceof File;
  }
  function hasBinary(obj, toJSON) {
    if (!obj || typeof obj !== "object") {
      return false;
    }
    if (Array.isArray(obj)) {
      for (let i = 0, l = obj.length; i < l; i++) {
        if (hasBinary(obj[i])) {
          return true;
        }
      }
      return false;
    }
    if (isBinary(obj)) {
      return true;
    }
    if (obj.toJSON && typeof obj.toJSON === "function" && arguments.length === 1) {
      return hasBinary(obj.toJSON(), true);
    }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/socket.io-parser/build/esm/binary.js
  function deconstructPacket(packet) {
    const buffers = [];
    const packetData = packet.data;
    const pack = packet;
    pack.data = _deconstructPacket(packetData, buffers);
    pack.attachments = buffers.length;
    return { packet: pack, buffers };
  }
  function _deconstructPacket(data, buffers, toJSON) {
    if (!data)
      return data;
    if (isBinary(data)) {
      const placeholder = { _placeholder: true, num: buffers.length };
      buffers.push(data);
      return placeholder;
    } else if (Array.isArray(data)) {
      const newData = new Array(data.length);
      for (let i = 0; i < data.length; i++) {
        newData[i] = _deconstructPacket(data[i], buffers);
      }
      return newData;
    } else if (typeof data === "object" && !(data instanceof Date)) {
      if (data.toJSON && typeof data.toJSON === "function" && !toJSON) {
        return _deconstructPacket(data.toJSON(), buffers, true);
      }
      const newData = {};
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          newData[key] = _deconstructPacket(data[key], buffers);
        }
      }
      return newData;
    }
    return data;
  }
  function reconstructPacket(packet, buffers) {
    packet.data = _reconstructPacket(packet.data, buffers);
    delete packet.attachments;
    return packet;
  }
  function _reconstructPacket(data, buffers) {
    if (!data)
      return data;
    if (data && data._placeholder === true) {
      const isIndexValid = typeof data.num === "number" && data.num >= 0 && data.num < buffers.length;
      if (isIndexValid) {
        return buffers[data.num];
      } else {
        throw new Error("illegal attachments");
      }
    } else if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        data[i] = _reconstructPacket(data[i], buffers);
      }
    } else if (typeof data === "object") {
      for (const key in data) {
        if (Object.prototype.hasOwnProperty.call(data, key)) {
          data[key] = _reconstructPacket(data[key], buffers);
        }
      }
    }
    return data;
  }

  // node_modules/socket.io-parser/build/esm/index.js
  var RESERVED_EVENTS = [
    "connect",
    // used on the client side
    "connect_error",
    // used on the client side
    "disconnect",
    // used on both sides
    "disconnecting",
    // used on the server side
    "newListener",
    // used by the Node.js EventEmitter
    "removeListener"
    // used by the Node.js EventEmitter
  ];
  var protocol3 = 5;
  var PacketType;
  (function(PacketType2) {
    PacketType2[PacketType2["CONNECT"] = 0] = "CONNECT";
    PacketType2[PacketType2["DISCONNECT"] = 1] = "DISCONNECT";
    PacketType2[PacketType2["EVENT"] = 2] = "EVENT";
    PacketType2[PacketType2["ACK"] = 3] = "ACK";
    PacketType2[PacketType2["CONNECT_ERROR"] = 4] = "CONNECT_ERROR";
    PacketType2[PacketType2["BINARY_EVENT"] = 5] = "BINARY_EVENT";
    PacketType2[PacketType2["BINARY_ACK"] = 6] = "BINARY_ACK";
  })(PacketType || (PacketType = {}));
  var Encoder = class {
    /**
     * Encoder constructor
     *
     * @param {function} replacer - custom replacer to pass down to JSON.parse
     */
    constructor(replacer) {
      this.replacer = replacer;
    }
    /**
     * Encode a packet as a single string if non-binary, or as a
     * buffer sequence, depending on packet type.
     *
     * @param {Object} obj - packet object
     */
    encode(obj) {
      if (obj.type === PacketType.EVENT || obj.type === PacketType.ACK) {
        if (hasBinary(obj)) {
          return this.encodeAsBinary({
            type: obj.type === PacketType.EVENT ? PacketType.BINARY_EVENT : PacketType.BINARY_ACK,
            nsp: obj.nsp,
            data: obj.data,
            id: obj.id
          });
        }
      }
      return [this.encodeAsString(obj)];
    }
    /**
     * Encode packet as string.
     */
    encodeAsString(obj) {
      let str = "" + obj.type;
      if (obj.type === PacketType.BINARY_EVENT || obj.type === PacketType.BINARY_ACK) {
        str += obj.attachments + "-";
      }
      if (obj.nsp && "/" !== obj.nsp) {
        str += obj.nsp + ",";
      }
      if (null != obj.id) {
        str += obj.id;
      }
      if (null != obj.data) {
        str += JSON.stringify(obj.data, this.replacer);
      }
      return str;
    }
    /**
     * Encode packet as 'buffer sequence' by removing blobs, and
     * deconstructing packet into object with placeholders and
     * a list of buffers.
     */
    encodeAsBinary(obj) {
      const deconstruction = deconstructPacket(obj);
      const pack = this.encodeAsString(deconstruction.packet);
      const buffers = deconstruction.buffers;
      buffers.unshift(pack);
      return buffers;
    }
  };
  var Decoder = class _Decoder extends Emitter {
    /**
     * Decoder constructor
     */
    constructor(opts) {
      super();
      this.opts = Object.assign({
        reviver: void 0,
        maxAttachments: 10
      }, typeof opts === "function" ? { reviver: opts } : opts);
    }
    /**
     * Decodes an encoded packet string into packet JSON.
     *
     * @param {String} obj - encoded packet
     */
    add(obj) {
      let packet;
      if (typeof obj === "string") {
        if (this.reconstructor) {
          throw new Error("got plaintext data when reconstructing a packet");
        }
        packet = this.decodeString(obj);
        const isBinaryEvent = packet.type === PacketType.BINARY_EVENT;
        if (isBinaryEvent || packet.type === PacketType.BINARY_ACK) {
          packet.type = isBinaryEvent ? PacketType.EVENT : PacketType.ACK;
          this.reconstructor = new BinaryReconstructor(packet);
        } else {
          super.emitReserved("decoded", packet);
        }
      } else if (isBinary(obj) || obj.base64) {
        if (!this.reconstructor) {
          throw new Error("got binary data when not reconstructing a packet");
        } else {
          packet = this.reconstructor.takeBinaryData(obj);
          if (packet) {
            this.reconstructor = null;
            super.emitReserved("decoded", packet);
          }
        }
      } else {
        throw new Error("Unknown type: " + obj);
      }
    }
    /**
     * Decode a packet String (JSON data)
     *
     * @param {String} str
     * @return {Object} packet
     */
    decodeString(str) {
      let i = 0;
      const p = {
        type: Number(str.charAt(0))
      };
      if (PacketType[p.type] === void 0) {
        throw new Error("unknown packet type " + p.type);
      }
      if (p.type === PacketType.BINARY_EVENT || p.type === PacketType.BINARY_ACK) {
        const start = i + 1;
        while (str.charAt(++i) !== "-" && i != str.length) {
        }
        const buf = str.substring(start, i);
        if (buf != Number(buf) || str.charAt(i) !== "-") {
          throw new Error("Illegal attachments");
        }
        const n = Number(buf);
        if (!isInteger(n) || n < 1) {
          throw new Error("Illegal attachments");
        } else if (n > this.opts.maxAttachments) {
          throw new Error("too many attachments");
        }
        p.attachments = n;
      }
      if ("/" === str.charAt(i + 1)) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if ("," === c)
            break;
          if (i === str.length)
            break;
        }
        p.nsp = str.substring(start, i);
      } else {
        p.nsp = "/";
      }
      const next = str.charAt(i + 1);
      if ("" !== next && Number(next) == next) {
        const start = i + 1;
        while (++i) {
          const c = str.charAt(i);
          if (null == c || Number(c) != c) {
            --i;
            break;
          }
          if (i === str.length)
            break;
        }
        p.id = Number(str.substring(start, i + 1));
      }
      if (str.charAt(++i)) {
        const payload = this.tryParse(str.substr(i));
        if (_Decoder.isPayloadValid(p.type, payload)) {
          p.data = payload;
        } else {
          throw new Error("invalid payload");
        }
      }
      return p;
    }
    tryParse(str) {
      try {
        return JSON.parse(str, this.opts.reviver);
      } catch (e) {
        return false;
      }
    }
    static isPayloadValid(type, payload) {
      switch (type) {
        case PacketType.CONNECT:
          return isObject(payload);
        case PacketType.DISCONNECT:
          return payload === void 0;
        case PacketType.CONNECT_ERROR:
          return typeof payload === "string" || isObject(payload);
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          return Array.isArray(payload);
      }
    }
    /**
     * Deallocates a parser's resources
     */
    destroy() {
      if (this.reconstructor) {
        this.reconstructor.finishedReconstruction();
        this.reconstructor = null;
      }
    }
  };
  var BinaryReconstructor = class {
    constructor(packet) {
      this.packet = packet;
      this.buffers = [];
      this.reconPack = packet;
    }
    /**
     * Method to be called when binary data received from connection
     * after a BINARY_EVENT packet.
     *
     * @param {Buffer | ArrayBuffer} binData - the raw binary data received
     * @return {null | Object} returns null if more binary data is expected or
     *   a reconstructed packet object if all buffers have been received.
     */
    takeBinaryData(binData) {
      this.buffers.push(binData);
      if (this.buffers.length === this.reconPack.attachments) {
        const packet = reconstructPacket(this.reconPack, this.buffers);
        this.finishedReconstruction();
        return packet;
      }
      return null;
    }
    /**
     * Cleans up binary packet reconstruction variables.
     */
    finishedReconstruction() {
      this.reconPack = null;
      this.buffers = [];
    }
  };
  function isNamespaceValid(nsp) {
    return typeof nsp === "string";
  }
  var isInteger = Number.isInteger || function(value2) {
    return typeof value2 === "number" && isFinite(value2) && Math.floor(value2) === value2;
  };
  function isAckIdValid(id) {
    return id === void 0 || isInteger(id);
  }
  function isObject(value2) {
    return Object.prototype.toString.call(value2) === "[object Object]";
  }
  function isDataValid(type, payload) {
    switch (type) {
      case PacketType.CONNECT:
        return payload === void 0 || isObject(payload);
      case PacketType.DISCONNECT:
        return payload === void 0;
      case PacketType.EVENT:
        return Array.isArray(payload) && (typeof payload[0] === "number" || typeof payload[0] === "string" && RESERVED_EVENTS.indexOf(payload[0]) === -1);
      case PacketType.ACK:
        return Array.isArray(payload);
      case PacketType.CONNECT_ERROR:
        return typeof payload === "string" || isObject(payload);
      default:
        return false;
    }
  }
  function isPacketValid(packet) {
    return isNamespaceValid(packet.nsp) && isAckIdValid(packet.id) && isDataValid(packet.type, packet.data);
  }

  // node_modules/socket.io-client/build/esm/on.js
  function on(obj, ev, fn) {
    obj.on(ev, fn);
    return function subDestroy() {
      obj.off(ev, fn);
    };
  }

  // node_modules/socket.io-client/build/esm/socket.js
  var RESERVED_EVENTS2 = Object.freeze({
    connect: 1,
    connect_error: 1,
    disconnect: 1,
    disconnecting: 1,
    // EventEmitter reserved events: https://nodejs.org/api/events.html#events_event_newlistener
    newListener: 1,
    removeListener: 1
  });
  var Socket2 = class extends Emitter {
    /**
     * `Socket` constructor.
     */
    constructor(io, nsp, opts) {
      super();
      this.connected = false;
      this.recovered = false;
      this.receiveBuffer = [];
      this.sendBuffer = [];
      this._queue = [];
      this._queueSeq = 0;
      this.ids = 0;
      this.acks = {};
      this.flags = {};
      this.io = io;
      this.nsp = nsp;
      if (opts && opts.auth) {
        this.auth = opts.auth;
      }
      this._opts = Object.assign({}, opts);
      if (this.io._autoConnect)
        this.open();
    }
    /**
     * Whether the socket is currently disconnected
     *
     * @example
     * const socket = io();
     *
     * socket.on("connect", () => {
     *   console.log(socket.disconnected); // false
     * });
     *
     * socket.on("disconnect", () => {
     *   console.log(socket.disconnected); // true
     * });
     */
    get disconnected() {
      return !this.connected;
    }
    /**
     * Subscribe to open, close and packet events
     *
     * @private
     */
    subEvents() {
      if (this.subs)
        return;
      const io = this.io;
      this.subs = [
        on(io, "open", this.onopen.bind(this)),
        on(io, "packet", this.onpacket.bind(this)),
        on(io, "error", this.onerror.bind(this)),
        on(io, "close", this.onclose.bind(this))
      ];
    }
    /**
     * Whether the Socket will try to reconnect when its Manager connects or reconnects.
     *
     * @example
     * const socket = io();
     *
     * console.log(socket.active); // true
     *
     * socket.on("disconnect", (reason) => {
     *   if (reason === "io server disconnect") {
     *     // the disconnection was initiated by the server, you need to manually reconnect
     *     console.log(socket.active); // false
     *   }
     *   // else the socket will automatically try to reconnect
     *   console.log(socket.active); // true
     * });
     */
    get active() {
      return !!this.subs;
    }
    /**
     * "Opens" the socket.
     *
     * @example
     * const socket = io({
     *   autoConnect: false
     * });
     *
     * socket.connect();
     */
    connect() {
      if (this.connected)
        return this;
      this.subEvents();
      if (!this.io["_reconnecting"])
        this.io.open();
      if ("open" === this.io._readyState)
        this.onopen();
      return this;
    }
    /**
     * Alias for {@link connect()}.
     */
    open() {
      return this.connect();
    }
    /**
     * Sends a `message` event.
     *
     * This method mimics the WebSocket.send() method.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebSocket/send
     *
     * @example
     * socket.send("hello");
     *
     * // this is equivalent to
     * socket.emit("message", "hello");
     *
     * @return self
     */
    send(...args) {
      args.unshift("message");
      this.emit.apply(this, args);
      return this;
    }
    /**
     * Override `emit`.
     * If the event is in `events`, it's emitted normally.
     *
     * @example
     * socket.emit("hello", "world");
     *
     * // all serializable datastructures are supported (no need to call JSON.stringify)
     * socket.emit("hello", 1, "2", { 3: ["4"], 5: Uint8Array.from([6]) });
     *
     * // with an acknowledgement from the server
     * socket.emit("hello", "world", (val) => {
     *   // ...
     * });
     *
     * @return self
     */
    emit(ev, ...args) {
      var _a, _b, _c;
      if (RESERVED_EVENTS2.hasOwnProperty(ev)) {
        throw new Error('"' + ev.toString() + '" is a reserved event name');
      }
      args.unshift(ev);
      if (this._opts.retries && !this.flags.fromQueue && !this.flags.volatile) {
        this._addToQueue(args);
        return this;
      }
      const packet = {
        type: PacketType.EVENT,
        data: args
      };
      packet.options = {};
      packet.options.compress = this.flags.compress !== false;
      if ("function" === typeof args[args.length - 1]) {
        const id = this.ids++;
        const ack = args.pop();
        this._registerAckCallback(id, ack);
        packet.id = id;
      }
      const isTransportWritable = (_b = (_a = this.io.engine) === null || _a === void 0 ? void 0 : _a.transport) === null || _b === void 0 ? void 0 : _b.writable;
      const isConnected = this.connected && !((_c = this.io.engine) === null || _c === void 0 ? void 0 : _c._hasPingExpired());
      const discardPacket = this.flags.volatile && !isTransportWritable;
      if (discardPacket) {
      } else if (isConnected) {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      } else {
        this.sendBuffer.push(packet);
      }
      this.flags = {};
      return this;
    }
    /**
     * @private
     */
    _registerAckCallback(id, ack) {
      var _a;
      const timeout = (_a = this.flags.timeout) !== null && _a !== void 0 ? _a : this._opts.ackTimeout;
      if (timeout === void 0) {
        this.acks[id] = ack;
        return;
      }
      const timer = this.io.setTimeoutFn(() => {
        delete this.acks[id];
        for (let i = 0; i < this.sendBuffer.length; i++) {
          if (this.sendBuffer[i].id === id) {
            this.sendBuffer.splice(i, 1);
          }
        }
        ack.call(this, new Error("operation has timed out"));
      }, timeout);
      const fn = (...args) => {
        this.io.clearTimeoutFn(timer);
        ack.apply(this, args);
      };
      fn.withError = true;
      this.acks[id] = fn;
    }
    /**
     * Emits an event and waits for an acknowledgement
     *
     * @example
     * // without timeout
     * const response = await socket.emitWithAck("hello", "world");
     *
     * // with a specific timeout
     * try {
     *   const response = await socket.timeout(1000).emitWithAck("hello", "world");
     * } catch (err) {
     *   // the server did not acknowledge the event in the given delay
     * }
     *
     * @return a Promise that will be fulfilled when the server acknowledges the event
     */
    emitWithAck(ev, ...args) {
      return new Promise((resolve, reject) => {
        const fn = (arg1, arg2) => {
          return arg1 ? reject(arg1) : resolve(arg2);
        };
        fn.withError = true;
        args.push(fn);
        this.emit(ev, ...args);
      });
    }
    /**
     * Add the packet to the queue.
     * @param args
     * @private
     */
    _addToQueue(args) {
      let ack;
      if (typeof args[args.length - 1] === "function") {
        ack = args.pop();
      }
      const packet = {
        id: this._queueSeq++,
        tryCount: 0,
        pending: false,
        args,
        flags: Object.assign({ fromQueue: true }, this.flags)
      };
      args.push((err, ...responseArgs) => {
        if (packet !== this._queue[0]) {
        }
        const hasError = err !== null;
        if (hasError) {
          if (packet.tryCount > this._opts.retries) {
            this._queue.shift();
            if (ack) {
              ack(err);
            }
          }
        } else {
          this._queue.shift();
          if (ack) {
            ack(null, ...responseArgs);
          }
        }
        packet.pending = false;
        return this._drainQueue();
      });
      this._queue.push(packet);
      this._drainQueue();
    }
    /**
     * Send the first packet of the queue, and wait for an acknowledgement from the server.
     * @param force - whether to resend a packet that has not been acknowledged yet
     *
     * @private
     */
    _drainQueue(force = false) {
      if (!this.connected || this._queue.length === 0) {
        return;
      }
      const packet = this._queue[0];
      if (packet.pending && !force) {
        return;
      }
      packet.pending = true;
      packet.tryCount++;
      this.flags = packet.flags;
      this.emit.apply(this, packet.args);
    }
    /**
     * Sends a packet.
     *
     * @param packet
     * @private
     */
    packet(packet) {
      packet.nsp = this.nsp;
      this.io._packet(packet);
    }
    /**
     * Called upon engine `open`.
     *
     * @private
     */
    onopen() {
      if (typeof this.auth == "function") {
        this.auth((data) => {
          this._sendConnectPacket(data);
        });
      } else {
        this._sendConnectPacket(this.auth);
      }
    }
    /**
     * Sends a CONNECT packet to initiate the Socket.IO session.
     *
     * @param data
     * @private
     */
    _sendConnectPacket(data) {
      this.packet({
        type: PacketType.CONNECT,
        data: this._pid ? Object.assign({ pid: this._pid, offset: this._lastOffset }, data) : data
      });
    }
    /**
     * Called upon engine or manager `error`.
     *
     * @param err
     * @private
     */
    onerror(err) {
      if (!this.connected) {
        this.emitReserved("connect_error", err);
      }
    }
    /**
     * Called upon engine `close`.
     *
     * @param reason
     * @param description
     * @private
     */
    onclose(reason, description) {
      this.connected = false;
      delete this.id;
      this.emitReserved("disconnect", reason, description);
      this._clearAcks();
    }
    /**
     * Clears the acknowledgement handlers upon disconnection, since the client will never receive an acknowledgement from
     * the server.
     *
     * @private
     */
    _clearAcks() {
      Object.keys(this.acks).forEach((id) => {
        const isBuffered = this.sendBuffer.some((packet) => String(packet.id) === id);
        if (!isBuffered) {
          const ack = this.acks[id];
          delete this.acks[id];
          if (ack.withError) {
            ack.call(this, new Error("socket has been disconnected"));
          }
        }
      });
    }
    /**
     * Called with socket packet.
     *
     * @param packet
     * @private
     */
    onpacket(packet) {
      const sameNamespace = packet.nsp === this.nsp;
      if (!sameNamespace)
        return;
      switch (packet.type) {
        case PacketType.CONNECT:
          if (packet.data && packet.data.sid) {
            this.onconnect(packet.data.sid, packet.data.pid);
          } else {
            this.emitReserved("connect_error", new Error("It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)"));
          }
          break;
        case PacketType.EVENT:
        case PacketType.BINARY_EVENT:
          this.onevent(packet);
          break;
        case PacketType.ACK:
        case PacketType.BINARY_ACK:
          this.onack(packet);
          break;
        case PacketType.DISCONNECT:
          this.ondisconnect();
          break;
        case PacketType.CONNECT_ERROR:
          this.destroy();
          const err = new Error(packet.data.message);
          err.data = packet.data.data;
          this.emitReserved("connect_error", err);
          break;
      }
    }
    /**
     * Called upon a server event.
     *
     * @param packet
     * @private
     */
    onevent(packet) {
      const args = packet.data || [];
      if (null != packet.id) {
        args.push(this.ack(packet.id));
      }
      if (this.connected) {
        this.emitEvent(args);
      } else {
        this.receiveBuffer.push(Object.freeze(args));
      }
    }
    emitEvent(args) {
      if (this._anyListeners && this._anyListeners.length) {
        const listeners = this._anyListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, args);
        }
      }
      super.emit.apply(this, args);
      if (this._pid && args.length && typeof args[args.length - 1] === "string") {
        this._lastOffset = args[args.length - 1];
      }
    }
    /**
     * Produces an ack callback to emit with an event.
     *
     * @private
     */
    ack(id) {
      const self2 = this;
      let sent = false;
      return function(...args) {
        if (sent)
          return;
        sent = true;
        self2.packet({
          type: PacketType.ACK,
          id,
          data: args
        });
      };
    }
    /**
     * Called upon a server acknowledgement.
     *
     * @param packet
     * @private
     */
    onack(packet) {
      const ack = this.acks[packet.id];
      if (typeof ack !== "function") {
        return;
      }
      delete this.acks[packet.id];
      if (ack.withError) {
        packet.data.unshift(null);
      }
      ack.apply(this, packet.data);
    }
    /**
     * Called upon server connect.
     *
     * @private
     */
    onconnect(id, pid) {
      this.id = id;
      this.recovered = pid && this._pid === pid;
      this._pid = pid;
      this.connected = true;
      this.emitBuffered();
      this._drainQueue(true);
      this.emitReserved("connect");
    }
    /**
     * Emit buffered events (received and emitted).
     *
     * @private
     */
    emitBuffered() {
      this.receiveBuffer.forEach((args) => this.emitEvent(args));
      this.receiveBuffer = [];
      this.sendBuffer.forEach((packet) => {
        this.notifyOutgoingListeners(packet);
        this.packet(packet);
      });
      this.sendBuffer = [];
    }
    /**
     * Called upon server disconnect.
     *
     * @private
     */
    ondisconnect() {
      this.destroy();
      this.onclose("io server disconnect");
    }
    /**
     * Called upon forced client/server side disconnections,
     * this method ensures the manager stops tracking us and
     * that reconnections don't get triggered for this.
     *
     * @private
     */
    destroy() {
      if (this.subs) {
        this.subs.forEach((subDestroy) => subDestroy());
        this.subs = void 0;
      }
      this.io["_destroy"](this);
    }
    /**
     * Disconnects the socket manually. In that case, the socket will not try to reconnect.
     *
     * If this is the last active Socket instance of the {@link Manager}, the low-level connection will be closed.
     *
     * @example
     * const socket = io();
     *
     * socket.on("disconnect", (reason) => {
     *   // console.log(reason); prints "io client disconnect"
     * });
     *
     * socket.disconnect();
     *
     * @return self
     */
    disconnect() {
      if (this.connected) {
        this.packet({ type: PacketType.DISCONNECT });
      }
      this.destroy();
      if (this.connected) {
        this.onclose("io client disconnect");
      }
      return this;
    }
    /**
     * Alias for {@link disconnect()}.
     *
     * @return self
     */
    close() {
      return this.disconnect();
    }
    /**
     * Sets the compress flag.
     *
     * @example
     * socket.compress(false).emit("hello");
     *
     * @param compress - if `true`, compresses the sending data
     * @return self
     */
    compress(compress) {
      this.flags.compress = compress;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the event message will be dropped when this socket is not
     * ready to send messages.
     *
     * @example
     * socket.volatile.emit("hello"); // the server may or may not receive it
     *
     * @returns self
     */
    get volatile() {
      this.flags.volatile = true;
      return this;
    }
    /**
     * Sets a modifier for a subsequent event emission that the callback will be called with an error when the
     * given number of milliseconds have elapsed without an acknowledgement from the server:
     *
     * @example
     * socket.timeout(5000).emit("my-event", (err) => {
     *   if (err) {
     *     // the server did not acknowledge the event in the given delay
     *   }
     * });
     *
     * @returns self
     */
    timeout(timeout) {
      this.flags.timeout = timeout;
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * @example
     * socket.onAny((event, ...args) => {
     *   console.log(`got ${event}`);
     * });
     *
     * @param listener
     */
    onAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * @example
     * socket.prependAny((event, ...args) => {
     *   console.log(`got event ${event}`);
     * });
     *
     * @param listener
     */
    prependAny(listener) {
      this._anyListeners = this._anyListeners || [];
      this._anyListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`got event ${event}`);
     * }
     *
     * socket.onAny(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAny(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAny();
     *
     * @param listener
     */
    offAny(listener) {
      if (!this._anyListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyListeners;
        for (let i = 0; i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
            return this;
          }
        }
      } else {
        this._anyListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAny() {
      return this._anyListeners || [];
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.onAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    onAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.push(listener);
      return this;
    }
    /**
     * Adds a listener that will be fired when any event is emitted. The event name is passed as the first argument to the
     * callback. The listener is added to the beginning of the listeners array.
     *
     * Note: acknowledgements sent to the server are not included.
     *
     * @example
     * socket.prependAnyOutgoing((event, ...args) => {
     *   console.log(`sent event ${event}`);
     * });
     *
     * @param listener
     */
    prependAnyOutgoing(listener) {
      this._anyOutgoingListeners = this._anyOutgoingListeners || [];
      this._anyOutgoingListeners.unshift(listener);
      return this;
    }
    /**
     * Removes the listener that will be fired when any event is emitted.
     *
     * @example
     * const catchAllListener = (event, ...args) => {
     *   console.log(`sent event ${event}`);
     * }
     *
     * socket.onAnyOutgoing(catchAllListener);
     *
     * // remove a specific listener
     * socket.offAnyOutgoing(catchAllListener);
     *
     * // or remove all listeners
     * socket.offAnyOutgoing();
     *
     * @param [listener] - the catch-all listener (optional)
     */
    offAnyOutgoing(listener) {
      if (!this._anyOutgoingListeners) {
        return this;
      }
      if (listener) {
        const listeners = this._anyOutgoingListeners;
        for (let i = 0; i < listeners.length; i++) {
          if (listener === listeners[i]) {
            listeners.splice(i, 1);
            return this;
          }
        }
      } else {
        this._anyOutgoingListeners = [];
      }
      return this;
    }
    /**
     * Returns an array of listeners that are listening for any event that is specified. This array can be manipulated,
     * e.g. to remove listeners.
     */
    listenersAnyOutgoing() {
      return this._anyOutgoingListeners || [];
    }
    /**
     * Notify the listeners for each packet sent
     *
     * @param packet
     *
     * @private
     */
    notifyOutgoingListeners(packet) {
      if (this._anyOutgoingListeners && this._anyOutgoingListeners.length) {
        const listeners = this._anyOutgoingListeners.slice();
        for (const listener of listeners) {
          listener.apply(this, packet.data);
        }
      }
    }
  };

  // node_modules/socket.io-client/build/esm/contrib/backo2.js
  function Backoff(opts) {
    opts = opts || {};
    this.ms = opts.min || 100;
    this.max = opts.max || 1e4;
    this.factor = opts.factor || 2;
    this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
    this.attempts = 0;
  }
  Backoff.prototype.duration = function() {
    var ms = this.ms * Math.pow(this.factor, this.attempts++);
    if (this.jitter) {
      var rand = Math.random();
      var deviation = Math.floor(rand * this.jitter * ms);
      ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
    }
    return Math.min(ms, this.max) | 0;
  };
  Backoff.prototype.reset = function() {
    this.attempts = 0;
  };
  Backoff.prototype.setMin = function(min) {
    this.ms = min;
  };
  Backoff.prototype.setMax = function(max) {
    this.max = max;
  };
  Backoff.prototype.setJitter = function(jitter) {
    this.jitter = jitter;
  };

  // node_modules/socket.io-client/build/esm/manager.js
  var Manager = class extends Emitter {
    constructor(uri, opts) {
      var _a;
      super();
      this.nsps = {};
      this.subs = [];
      if (uri && "object" === typeof uri) {
        opts = uri;
        uri = void 0;
      }
      opts = opts || {};
      opts.path = opts.path || "/socket.io";
      this.opts = opts;
      installTimerFunctions(this, opts);
      this.reconnection(opts.reconnection !== false);
      this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
      this.reconnectionDelay(opts.reconnectionDelay || 1e3);
      this.reconnectionDelayMax(opts.reconnectionDelayMax || 5e3);
      this.randomizationFactor((_a = opts.randomizationFactor) !== null && _a !== void 0 ? _a : 0.5);
      this.backoff = new Backoff({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor()
      });
      this.timeout(null == opts.timeout ? 2e4 : opts.timeout);
      this._readyState = "closed";
      this.uri = uri;
      const _parser = opts.parser || esm_exports;
      this.encoder = new _parser.Encoder();
      this.decoder = new _parser.Decoder();
      this._autoConnect = opts.autoConnect !== false;
      if (this._autoConnect)
        this.open();
    }
    reconnection(v) {
      if (!arguments.length)
        return this._reconnection;
      this._reconnection = !!v;
      if (!v) {
        this.skipReconnect = true;
      }
      return this;
    }
    reconnectionAttempts(v) {
      if (v === void 0)
        return this._reconnectionAttempts;
      this._reconnectionAttempts = v;
      return this;
    }
    reconnectionDelay(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelay;
      this._reconnectionDelay = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMin(v);
      return this;
    }
    randomizationFactor(v) {
      var _a;
      if (v === void 0)
        return this._randomizationFactor;
      this._randomizationFactor = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setJitter(v);
      return this;
    }
    reconnectionDelayMax(v) {
      var _a;
      if (v === void 0)
        return this._reconnectionDelayMax;
      this._reconnectionDelayMax = v;
      (_a = this.backoff) === null || _a === void 0 ? void 0 : _a.setMax(v);
      return this;
    }
    timeout(v) {
      if (!arguments.length)
        return this._timeout;
      this._timeout = v;
      return this;
    }
    /**
     * Starts trying to reconnect if reconnection is enabled and we have not
     * started reconnecting yet
     *
     * @private
     */
    maybeReconnectOnOpen() {
      if (!this._reconnecting && this._reconnection && this.backoff.attempts === 0) {
        this.reconnect();
      }
    }
    /**
     * Sets the current transport `socket`.
     *
     * @param {Function} fn - optional, callback
     * @return self
     * @public
     */
    open(fn) {
      if (~this._readyState.indexOf("open"))
        return this;
      this.engine = new Socket(this.uri, this.opts);
      const socket = this.engine;
      const self2 = this;
      this._readyState = "opening";
      this.skipReconnect = false;
      const openSubDestroy = on(socket, "open", function() {
        self2.onopen();
        fn && fn();
      });
      const onError = (err) => {
        this.cleanup();
        this._readyState = "closed";
        this.emitReserved("error", err);
        if (fn) {
          fn(err);
        } else {
          this.maybeReconnectOnOpen();
        }
      };
      const errorSub = on(socket, "error", onError);
      if (false !== this._timeout) {
        const timeout = this._timeout;
        const timer = this.setTimeoutFn(() => {
          openSubDestroy();
          onError(new Error("timeout"));
          socket.close();
        }, timeout);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
      this.subs.push(openSubDestroy);
      this.subs.push(errorSub);
      return this;
    }
    /**
     * Alias for open()
     *
     * @return self
     * @public
     */
    connect(fn) {
      return this.open(fn);
    }
    /**
     * Called upon transport open.
     *
     * @private
     */
    onopen() {
      this.cleanup();
      this._readyState = "open";
      this.emitReserved("open");
      const socket = this.engine;
      this.subs.push(
        on(socket, "ping", this.onping.bind(this)),
        on(socket, "data", this.ondata.bind(this)),
        on(socket, "error", this.onerror.bind(this)),
        on(socket, "close", this.onclose.bind(this)),
        // @ts-ignore
        on(this.decoder, "decoded", this.ondecoded.bind(this))
      );
    }
    /**
     * Called upon a ping.
     *
     * @private
     */
    onping() {
      this.emitReserved("ping");
    }
    /**
     * Called with data.
     *
     * @private
     */
    ondata(data) {
      try {
        this.decoder.add(data);
      } catch (e) {
        this.onclose("parse error", e);
      }
    }
    /**
     * Called when parser fully decodes a packet.
     *
     * @private
     */
    ondecoded(packet) {
      nextTick(() => {
        this.emitReserved("packet", packet);
      }, this.setTimeoutFn);
    }
    /**
     * Called upon socket error.
     *
     * @private
     */
    onerror(err) {
      this.emitReserved("error", err);
    }
    /**
     * Creates a new socket for the given `nsp`.
     *
     * @return {Socket}
     * @public
     */
    socket(nsp, opts) {
      let socket = this.nsps[nsp];
      if (!socket) {
        socket = new Socket2(this, nsp, opts);
        this.nsps[nsp] = socket;
      } else if (this._autoConnect && !socket.active) {
        socket.connect();
      }
      return socket;
    }
    /**
     * Called upon a socket close.
     *
     * @param socket
     * @private
     */
    _destroy(socket) {
      const nsps = Object.keys(this.nsps);
      for (const nsp of nsps) {
        const socket2 = this.nsps[nsp];
        if (socket2.active) {
          return;
        }
      }
      this._close();
    }
    /**
     * Writes a packet.
     *
     * @param packet
     * @private
     */
    _packet(packet) {
      const encodedPackets = this.encoder.encode(packet);
      for (let i = 0; i < encodedPackets.length; i++) {
        this.engine.write(encodedPackets[i], packet.options);
      }
    }
    /**
     * Clean up transport subscriptions and packet buffer.
     *
     * @private
     */
    cleanup() {
      this.subs.forEach((subDestroy) => subDestroy());
      this.subs.length = 0;
      this.decoder.destroy();
    }
    /**
     * Close the current socket.
     *
     * @private
     */
    _close() {
      this.skipReconnect = true;
      this._reconnecting = false;
      this.onclose("forced close");
    }
    /**
     * Alias for close()
     *
     * @private
     */
    disconnect() {
      return this._close();
    }
    /**
     * Called when:
     *
     * - the low-level engine is closed
     * - the parser encountered a badly formatted packet
     * - all sockets are disconnected
     *
     * @private
     */
    onclose(reason, description) {
      var _a;
      this.cleanup();
      (_a = this.engine) === null || _a === void 0 ? void 0 : _a.close();
      this.backoff.reset();
      this._readyState = "closed";
      this.emitReserved("close", reason, description);
      if (this._reconnection && !this.skipReconnect) {
        this.reconnect();
      }
    }
    /**
     * Attempt a reconnection.
     *
     * @private
     */
    reconnect() {
      if (this._reconnecting || this.skipReconnect)
        return this;
      const self2 = this;
      if (this.backoff.attempts >= this._reconnectionAttempts) {
        this.backoff.reset();
        this.emitReserved("reconnect_failed");
        this._reconnecting = false;
      } else {
        const delay = this.backoff.duration();
        this._reconnecting = true;
        const timer = this.setTimeoutFn(() => {
          if (self2.skipReconnect)
            return;
          this.emitReserved("reconnect_attempt", self2.backoff.attempts);
          if (self2.skipReconnect)
            return;
          self2.open((err) => {
            if (err) {
              self2._reconnecting = false;
              self2.reconnect();
              this.emitReserved("reconnect_error", err);
            } else {
              self2.onreconnect();
            }
          });
        }, delay);
        if (this.opts.autoUnref) {
          timer.unref();
        }
        this.subs.push(() => {
          this.clearTimeoutFn(timer);
        });
      }
    }
    /**
     * Called upon successful reconnect.
     *
     * @private
     */
    onreconnect() {
      const attempt = this.backoff.attempts;
      this._reconnecting = false;
      this.backoff.reset();
      this.emitReserved("reconnect", attempt);
    }
  };

  // node_modules/socket.io-client/build/esm/index.js
  var cache = {};
  function lookup2(uri, opts) {
    if (typeof uri === "object") {
      opts = uri;
      uri = void 0;
    }
    opts = opts || {};
    const parsed = url(uri, opts.path || "/socket.io");
    const source = parsed.source;
    const id = parsed.id;
    const path = parsed.path;
    const sameNamespace = cache[id] && path in cache[id]["nsps"];
    const newConnection = opts.forceNew || opts["force new connection"] || false === opts.multiplex || sameNamespace;
    let io;
    if (newConnection) {
      io = new Manager(source, opts);
    } else {
      if (!cache[id]) {
        cache[id] = new Manager(source, opts);
      }
      io = cache[id];
    }
    if (parsed.query && !opts.query) {
      opts.query = parsed.queryKey;
    }
    return io.socket(parsed.path, opts);
  }
  Object.assign(lookup2, {
    Manager,
    Socket: Socket2,
    io: lookup2,
    connect: lookup2
  });

  // src/socket/socketClient.ts
  function normalizeTeamId(rawTeamId) {
    if (!rawTeamId) return "blue";
    const lower = String(rawTeamId).toLowerCase();
    if (lower.includes("red")) return "red";
    if (lower.includes("yellow") || lower.includes("amber")) return "yellow";
    if (lower.includes("green") || lower.includes("emerald")) return "green";
    return "blue";
  }
  function getSocketServerUrl() {
    if (typeof window === "undefined") return "http://localhost:3000";
    if (window.location.protocol === "file:") {
      return "http://localhost:3000";
    }
    if (window.location.port === "5173" || window.location.port === "4173") {
      return `http://${window.location.hostname || "localhost"}:3000`;
    }
    return window.location.origin;
  }
  var SANDBOX_STORAGE_KEY = "educineva_shared_sandbox_rooms_v1";
  var SANDBOX_BUS_CHANNEL = "educineva_socket_bus_v1";
  function loadLocalStore() {
    try {
      const raw = localStorage.getItem(SANDBOX_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object" && parsed.rooms && parsed.pinToRoomId) {
          return parsed;
        }
      }
    } catch {
    }
    return { rooms: {}, pinToRoomId: {} };
  }
  function saveLocalStore(store) {
    try {
      localStorage.setItem(SANDBOX_STORAGE_KEY, JSON.stringify(store));
    } catch {
    }
  }
  function generatePin(store) {
    for (let i = 0; i < 1e3; i++) {
      const pin = Math.floor(1e5 + Math.random() * 9e5).toString();
      if (!store.pinToRoomId[pin]) return pin;
    }
    return "886688";
  }
  function assignBalancedTeamLocal(room) {
    if (!room.hasTeams || !Array.isArray(room.teams) || room.teams.length === 0) {
      return "blue";
    }
    const counts = {};
    for (const t of room.teams) counts[t.id] = 0;
    for (const s of room.students || []) {
      if (s.teamId && counts[s.teamId] !== void 0) {
        counts[s.teamId] += 1;
      }
    }
    let minTeamId = room.teams[0].id;
    let minCount = Infinity;
    for (const t of room.teams) {
      const c = counts[t.id] ?? 0;
      if (c < minCount) {
        minCount = c;
        minTeamId = t.id;
      }
    }
    return minTeamId;
  }
  function getRoomRosterLocal(room) {
    return {
      roomId: room.roomId,
      roomName: room.roomName,
      hasTeams: room.hasTeams,
      teams: room.teams,
      students: (room.students || []).map((s) => ({
        studentId: s.studentId,
        name: s.name,
        avatar: s.avatar || "./assets/games/char_b.png",
        teamId: s.teamId,
        score: s.score || 0,
        streak: s.streak || 0,
        joinedAt: s.joinedAt
      }))
    };
  }
  function getDesensitizedQuestionLocal(room, questionIndex) {
    const idx = Math.max(0, Math.min(questionIndex, (room.questions || []).length - 1));
    const rawQuestion = room.questions[idx] || {};
    const questionId = rawQuestion.id || rawQuestion.questionId || `q_${idx + 1}`;
    const questionText = rawQuestion.questionText || rawQuestion.title || rawQuestion.question || "";
    room.sandboxState = room.sandboxState || {};
    room.sandboxState.currentQuestionIndex = idx;
    room.sandboxState.activeQuestionId = questionId;
    return {
      questionId,
      index: idx,
      total: (room.questions || []).length,
      questionText,
      options: rawQuestion.options,
      timeLimit: rawQuestion.timeLimit || room.config?.timePerQuestion || 15
    };
  }
  function getScoreboardLocal(room) {
    const activeQId = room.sandboxState?.activeQuestionId || null;
    const studentsList = room.students || [];
    const teams = (room.teams || []).map((t) => {
      const teamStudents = studentsList.filter((s) => normalizeTeamId(s.teamId) === normalizeTeamId(t.id));
      const calcScore = teamStudents.reduce((acc, cur) => acc + (cur.score || 0), 0);
      t.score = calcScore;
      return {
        teamId: t.id,
        name: t.name,
        color: t.color,
        score: calcScore,
        memberCount: teamStudents.length
      };
    }).sort((a, b) => b.score - a.score);
    const students = [...studentsList].map((s) => {
      const answeredIds = Array.isArray(s.answeredQuestionIds) ? s.answeredQuestionIds : [];
      const hasAnsweredCurrent = Boolean(
        activeQId && (s.lastQuestionId === activeQId || answeredIds.includes(activeQId))
      );
      return {
        studentId: s.studentId,
        name: s.name,
        avatar: s.avatar || "./assets/games/char_b.png",
        teamId: s.teamId,
        score: s.score || 0,
        streak: s.streak || 0,
        wrongCount: s.wrongCount || 0,
        lastQuestionId: s.lastQuestionId,
        lastAnswerIndex: s.lastAnswerIndex,
        lastIsCorrect: s.lastIsCorrect,
        hasAnsweredCurrent,
        answeredCount: answeredIds.length
      };
    }).sort((a, b) => b.score - a.score);
    return {
      roomId: room.roomId,
      activeQuestionId: activeQId,
      currentQuestionIndex: room.sandboxState?.currentQuestionIndex ?? -1,
      teams,
      students,
      updatedAt: Date.now()
    };
  }
  function settleGameLocal(room) {
    room.status = "finished";
    const studentsList = [...room.students || []];
    studentsList.sort((a, b) => {
      if ((b.score || 0) !== (a.score || 0)) return (b.score || 0) - (a.score || 0);
      if ((a.wrongCount || 0) !== (b.wrongCount || 0)) return (a.wrongCount || 0) - (b.wrongCount || 0);
      return (a.joinedAt || 0) - (b.joinedAt || 0);
    });
    const leaderboard = studentsList.map((student, index) => {
      const team = (room.teams || []).find(
        (t) => normalizeTeamId(t.id) === normalizeTeamId(student.teamId)
      );
      const logs = Array.isArray(student.answerLogs) ? student.answerLogs : [];
      const wrongQuestions = logs.filter((log) => !log.isCorrect).map((log) => {
        let studentSelectedText = String(log.studentSelected);
        let correctAnswerText = String(log.correctAnswer);
        if (log.options && typeof log.options === "object" && !Array.isArray(log.options)) {
          if (log.options[log.studentSelected] !== void 0) {
            studentSelectedText = `${log.studentSelected} (${log.options[log.studentSelected]})`;
          }
          if (log.options[log.correctAnswer] !== void 0) {
            correctAnswerText = `${log.correctAnswer} (${log.options[log.correctAnswer]})`;
          }
        }
        const qIndex = (room.questions || []).findIndex(
          (q) => q.id === log.questionId || q.questionId === log.questionId
        );
        const rawQ = qIndex >= 0 ? room.questions[qIndex] : null;
        return {
          questionId: log.questionId,
          questionNumber: qIndex >= 0 ? qIndex + 1 : 1,
          questionText: log.questionText,
          options: log.options,
          studentSelected: log.studentSelected,
          studentSelectedText,
          correctAnswer: log.correctAnswer,
          correctAnswerText,
          explanation: rawQ?.explanation || `\u6807\u51C6\u6B63\u786E\u7B54\u6848\u662F ${correctAnswerText}\u3002`
        };
      });
      return {
        rank: index + 1,
        studentId: student.studentId,
        name: student.name,
        avatar: student.avatar || "./assets/games/char_b.png",
        teamId: student.teamId,
        teamName: team ? team.name : "\u4E2A\u4EBA",
        teamColor: team ? team.color : "#6B7280",
        score: student.score || 0,
        streak: student.streak || 0,
        wrongCount: student.wrongCount || 0,
        correctCount: Math.max(0, logs.length - (student.wrongCount || 0)),
        totalAnswered: logs.length,
        isPerfect: wrongQuestions.length === 0,
        wrongQuestions
      };
    });
    const podium = leaderboard.slice(0, 3).map((item) => ({
      rank: item.rank,
      studentId: item.studentId,
      name: item.name,
      avatar: item.avatar,
      teamId: item.teamId,
      teamName: item.teamName,
      teamColor: item.teamColor,
      score: item.score,
      correctCount: item.correctCount,
      totalAnswered: item.totalAnswered,
      isPerfect: item.isPerfect
    }));
    const teamSummary = (room.teams || []).map((team) => {
      const teamStudents = studentsList.filter(
        (s) => normalizeTeamId(s.teamId) === normalizeTeamId(team.id)
      );
      const calculatedScore = teamStudents.reduce((acc, curr) => acc + (curr.score || 0), 0);
      return {
        teamId: team.id,
        name: team.name,
        color: team.color,
        score: calculatedScore,
        memberCount: teamStudents.length
      };
    }).sort((a, b) => b.score - a.score);
    const winnerTeam = teamSummary.length > 0 ? teamSummary[0] : null;
    const settlementData = {
      roomId: room.roomId,
      roomName: room.roomName,
      totalQuestions: (room.questions || []).length,
      finishedAt: Date.now(),
      winnerTeam,
      podium,
      teamSummary,
      leaderboard
    };
    room.settlementData = settlementData;
    return settlementData;
  }
  function createSocketConnection() {
    const listeners = /* @__PURE__ */ new Map();
    let isLocalSandboxMode = false;
    let boundRoomId = null;
    let boundStudentId = null;
    const bc = typeof window !== "undefined" && "BroadcastChannel" in window ? new BroadcastChannel(SANDBOX_BUS_CHANNEL) : null;
    const triggerLocalEvent = (event, payload) => {
      const set = listeners.get(event);
      if (set) {
        set.forEach((fn) => {
          try {
            fn(payload);
          } catch (err) {
            console.error("[SandboxSocket] Listener error:", err);
          }
        });
      }
    };
    const broadcastToRoom = (roomId, event, payload, targetStudentId) => {
      const packet = { roomId, event, payload, targetStudentId, ts: Date.now() };
      if (bc) {
        bc.postMessage(packet);
      }
      try {
        localStorage.setItem("educineva_bus_last_evt", JSON.stringify(packet));
      } catch {
      }
      if (!boundRoomId || boundRoomId === roomId) {
        if (!targetStudentId || !boundStudentId || targetStudentId === boundStudentId) {
          triggerLocalEvent(event, payload);
        }
      }
    };
    const onBusPacket = (packet) => {
      if (!isLocalSandboxMode || !packet || !packet.event) return;
      if (boundRoomId && packet.roomId && packet.roomId !== boundRoomId) return;
      if (packet.targetStudentId && boundStudentId && packet.targetStudentId !== boundStudentId) return;
      triggerLocalEvent(packet.event, packet.payload);
    };
    if (bc) {
      bc.onmessage = (e) => onBusPacket(e.data);
    }
    const storageListener = (e) => {
      if (e.key === "educineva_bus_last_evt" && e.newValue) {
        try {
          onBusPacket(JSON.parse(e.newValue));
        } catch {
        }
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("storage", storageListener);
    }
    const handleLocalEmit = (event, data, callback) => {
      const store = loadLocalStore();
      if (event === "teacher_create_room") {
        const roomId = `room_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
        const pin = generatePin(store);
        const hasTeams = data?.config?.hasTeams !== void 0 ? Boolean(data.config.hasTeams) : true;
        const initialTeams = Array.isArray(data?.config?.teams) && data.config.teams.length > 0 ? data.config.teams.map((t) => ({ score: 0, ...t })) : [
          { id: "blue", name: "\u{1F7E6} \u84DD\u961F\u52C7\u58EB", color: "#3B82F6", score: 0 },
          { id: "red", name: "\u{1F7E5} \u7EA2\u961F\u5148\u950B", color: "#EF4444", score: 0 }
        ];
        const room = {
          roomId,
          pin,
          teacherId: data.teacherId || "teacher_host",
          roomName: data.roomName || "\u4E92\u52A8\u8BFE\u5802",
          gameId: data.gameId || "speed-racing",
          gameMode: data.gameMode || "team",
          hasTeams,
          isLocked: false,
          teams: initialTeams,
          students: [],
          config: data.config || {},
          questions: Array.isArray(data.questions) ? data.questions : [],
          createdAt: Date.now(),
          status: "waiting",
          settlementData: null,
          sandboxState: {
            currentQuestionIndex: -1,
            activeQuestionId: null,
            activeStage: "lobby"
          }
        };
        store.rooms[roomId] = room;
        store.pinToRoomId[pin] = roomId;
        saveLocalStore(store);
        boundRoomId = roomId;
        const res = { success: true, roomId, pin, roomData: room };
        callback?.(res);
        triggerLocalEvent("room_created", res);
        return;
      }
      if (event === "teacher_bind_room") {
        let targetRoomId = data?.roomId || (data?.pin ? store.pinToRoomId[String(data.pin).trim()] : null);
        if ((!targetRoomId || !store.rooms[targetRoomId]) && data?.autoLatest) {
          const allRooms = Object.values(store.rooms).filter((r) => r.status !== "closed");
          if (allRooms.length > 0) {
            allRooms.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
            targetRoomId = allRooms[0].roomId;
          }
        }
        const room = targetRoomId ? store.rooms[targetRoomId] : null;
        if (!room) {
          callback?.({ success: false, error: "\u672A\u627E\u5230\u6D3B\u8DC3\u623F\u95F4" });
          return;
        }
        boundRoomId = room.roomId;
        const roster = getRoomRosterLocal(room);
        callback?.({
          success: true,
          roomId: room.roomId,
          pin: room.pin,
          roomData: room,
          roster
        });
        return;
      }
      if (event === "student_join_room") {
        const cleanPin = String(data?.pin || "").trim();
        const studentName = String(data?.studentName || "").trim();
        let targetRoomId = store.pinToRoomId[cleanPin];
        if (!targetRoomId) {
          const allRooms = Object.values(store.rooms).filter((r) => r.status !== "closed");
          const matched = allRooms.find((r) => String(r.pin) === cleanPin);
          if (matched) targetRoomId = matched.roomId;
        }
        const room = targetRoomId ? store.rooms[targetRoomId] : null;
        if (!room || room.status === "closed") {
          callback?.({
            success: false,
            error: `\u672A\u627E\u5230 PIN \u7801\u4E3A [${cleanPin}] \u7684\u6D3B\u8DC3\u623F\u95F4\uFF0C\u8BF7\u5148\u5728\u6559\u5E08\u540E\u53F0\u6216\u5927\u5C4F\u5F00\u542F\u623F\u95F4`
          });
          return;
        }
        if (room.isLocked) {
          callback?.({
            success: false,
            error: "\u8BE5\u8BFE\u5802\u623F\u95F4\u5DF2\u88AB\u8001\u5E08\u9501\u5B9A\uFF0C\u6682\u65F6\u65E0\u6CD5\u52A0\u5165"
          });
          return;
        }
        const studentId = `stu_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
        const token = `tok_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
        const teamId = assignBalancedTeamLocal(room);
        const student = {
          studentId,
          name: studentName,
          avatar: data?.avatar || "./assets/games/char_b.png",
          teamId,
          token,
          joinedAt: Date.now(),
          score: 0,
          streak: 0,
          wrongCount: 0,
          lastQuestionId: null,
          lastAnswerIndex: null,
          lastIsCorrect: null,
          answeredQuestionIds: [],
          answerLogs: []
        };
        room.students = room.students || [];
        room.students.push(student);
        saveLocalStore(store);
        boundRoomId = room.roomId;
        boundStudentId = studentId;
        const roster = getRoomRosterLocal(room);
        let activeQuestion = null;
        if (room.status === "in_game" && room.sandboxState?.currentQuestionIndex >= 0) {
          activeQuestion = getDesensitizedQuestionLocal(room, room.sandboxState.currentQuestionIndex);
        }
        const res = {
          success: true,
          roomId: room.roomId,
          studentId,
          studentToken: token,
          avatar: student.avatar,
          teamId,
          roomName: room.roomName,
          teams: room.teams,
          hasTeams: room.hasTeams,
          roster,
          activeQuestion,
          activeStage: room.sandboxState?.activeStage || null
        };
        callback?.(res);
        broadcastToRoom(room.roomId, "room_roster_update", roster);
        return;
      }
      if (event === "teacher_rebalance_teams") {
        const roomId = data?.roomId || boundRoomId;
        const room = roomId ? store.rooms[roomId] : null;
        if (!room) return callback?.({ success: false, error: "\u623F\u95F4\u4E0D\u5B58\u5728" });
        const teamMode = data?.teamMode;
        if (teamMode === 2 || teamMode === 3 || teamMode === 4) {
          const presetPool = [
            { id: "blue", name: "\u{1F7E6} \u84DD\u961F\u52C7\u58EB", color: "#3B82F6", score: 0 },
            { id: "red", name: "\u{1F7E5} \u7EA2\u961F\u5148\u950B", color: "#EF4444", score: 0 },
            { id: "yellow", name: "\u{1F7E8} \u9EC4\u961F\u95EA\u7535", color: "#EAB308", score: 0 },
            { id: "green", name: "\u{1F7E9} \u7EFF\u961F\u795E\u9E70", color: "#10B981", score: 0 }
          ];
          room.teams = presetPool.slice(0, teamMode);
          room.config = { ...room.config, teamMode };
        }
        const activeTeams = room.teams || [];
        (room.students || []).forEach((s, idx) => {
          const target = activeTeams[idx % activeTeams.length];
          if (target && s.teamId !== target.id) {
            s.teamId = target.id;
            broadcastToRoom(
              room.roomId,
              "your_team_changed",
              {
                studentId: s.studentId,
                teamId: target.id,
                teamName: target.name,
                teamColor: target.color,
                reason: "teacher_rebalanced"
              },
              s.studentId
            );
          }
        });
        saveLocalStore(store);
        const roster = getRoomRosterLocal(room);
        broadcastToRoom(room.roomId, "room_roster_update", roster);
        callback?.({ success: true, teams: room.teams, roster });
        return;
      }
      if (event === "teacher_move_student" || event === "student_switch_team") {
        const roomId = data?.roomId || boundRoomId;
        const room = roomId ? store.rooms[roomId] : null;
        if (!room) return callback?.({ success: false, error: "\u623F\u95F4\u4E0D\u5B58\u5728" });
        const studentId = data?.studentId || boundStudentId;
        const student = (room.students || []).find((s) => s.studentId === studentId);
        if (!student) return callback?.({ success: false, error: "\u5B66\u751F\u4E0D\u5B58\u5728" });
        const activeTeams = room.teams || [];
        let targetTeam = activeTeams.find((t) => t.id === data?.targetTeamId);
        if (!targetTeam && activeTeams.length > 0) {
          const currIdx = activeTeams.findIndex(
            (t) => normalizeTeamId(t.id) === normalizeTeamId(student.teamId)
          );
          targetTeam = activeTeams[(currIdx + 1) % activeTeams.length];
        }
        if (targetTeam) {
          student.teamId = targetTeam.id;
          saveLocalStore(store);
          const roster = getRoomRosterLocal(room);
          broadcastToRoom(room.roomId, "room_roster_update", roster);
          broadcastToRoom(
            room.roomId,
            "your_team_changed",
            {
              studentId: student.studentId,
              teamId: targetTeam.id,
              teamName: targetTeam.name,
              teamColor: targetTeam.color
            },
            student.studentId
          );
          callback?.({ success: true, studentId: student.studentId, teamId: targetTeam.id });
        }
        return;
      }
      if (event === "teacher_toggle_lock_room") {
        const roomId = data?.roomId || boundRoomId;
        const room = roomId ? store.rooms[roomId] : null;
        if (!room) return callback?.({ success: false });
        room.isLocked = data?.isLocked !== void 0 ? Boolean(data.isLocked) : !room.isLocked;
        saveLocalStore(store);
        broadcastToRoom(room.roomId, "room_lock_changed", {
          roomId: room.roomId,
          isLocked: room.isLocked
        });
        callback?.({ success: true, isLocked: room.isLocked });
        return;
      }
      if (event === "teacher_push_question") {
        const roomId = data?.roomId || boundRoomId;
        const room = roomId ? store.rooms[roomId] : null;
        if (!room) return callback?.({ success: false, error: "\u623F\u95F4\u4E0D\u5B58\u5728" });
        const questionIndex = Number(data?.questionIndex ?? 0);
        const desensitized = getDesensitizedQuestionLocal(room, questionIndex);
        room.status = "in_game";
        room.sandboxState.activeStage = "question-prompt";
        saveLocalStore(store);
        broadcastToRoom(room.roomId, "new_question", desensitized);
        callback?.({ success: true, question: desensitized });
        return;
      }
      if (event === "teacher_sync_stage") {
        const roomId = data?.roomId || boundRoomId;
        const room = roomId ? store.rooms[roomId] : null;
        if (!room) return callback?.({ success: false });
        room.sandboxState = room.sandboxState || {};
        room.sandboxState.activeStage = data.state;
        if (data.state === "lobby") {
          room.status = "waiting";
          room.settlementData = null;
          room.sandboxState.currentQuestionIndex = -1;
          room.sandboxState.activeQuestionId = null;
          (room.teams || []).forEach((t) => t.score = 0);
          (room.students || []).forEach((s) => {
            s.score = 0;
            s.streak = 0;
            s.wrongCount = 0;
            s.lastQuestionId = null;
            s.lastAnswerIndex = null;
            s.lastIsCorrect = null;
            s.answeredQuestionIds = [];
            s.answerLogs = [];
          });
          saveLocalStore(store);
          broadcastToRoom(room.roomId, "room_roster_update", getRoomRosterLocal(room));
          broadcastToRoom(room.roomId, "scoreboard_update", getScoreboardLocal(room));
        } else {
          saveLocalStore(store);
        }
        const payload = {
          roomId: room.roomId,
          state: data.state,
          questionIndex: data.questionIndex,
          timeLeft: data.timeLeft,
          timestamp: Date.now()
        };
        broadcastToRoom(room.roomId, "screen_stage_sync", payload);
        callback?.({ success: true, payload });
        return;
      }
      if (event === "student_submit_answer") {
        const roomId = data?.roomId || boundRoomId;
        const room = roomId ? store.rooms[roomId] : null;
        if (!room) return callback?.({ success: false, error: "\u623F\u95F4\u4E0D\u5B58\u5728" });
        const studentId = data?.studentId || boundStudentId;
        const student = (room.students || []).find((s) => s.studentId === studentId);
        if (!student) return callback?.({ success: false, error: "\u5B66\u751F\u4E0D\u5B58\u5728" });
        const { questionId, selectedOption } = data || {};
        student.answeredQuestionIds = Array.isArray(student.answeredQuestionIds) ? student.answeredQuestionIds : [];
        if (student.answeredQuestionIds.includes(questionId)) {
          return callback?.({ success: false, error: "\u5DF2\u63D0\u4EA4\u8FC7\u8BE5\u9898" });
        }
        const rawQuestion = (room.questions || []).find((q) => q.id === questionId || q.questionId === questionId) || (room.questions || [])[room.sandboxState?.currentQuestionIndex ?? 0];
        if (!rawQuestion) return callback?.({ success: false, error: "\u672A\u627E\u5230\u9898\u76EE" });
        const correctAnswer = String(rawQuestion.correctAnswer || rawQuestion.answer || "C").trim();
        const formattedSelected = String(selectedOption ?? "").trim();
        const isCorrect = formattedSelected.toUpperCase() === correctAnswer.toUpperCase();
        const pointsEarned = isCorrect ? 100 : 0;
        student.score = (student.score || 0) + pointsEarned;
        if (isCorrect) {
          student.streak = (student.streak || 0) + 1;
        } else {
          student.streak = 0;
          student.wrongCount = (student.wrongCount || 0) + 1;
        }
        student.lastQuestionId = questionId;
        const optIdx = ["A", "B", "C", "D"].indexOf(formattedSelected.toUpperCase());
        student.lastAnswerIndex = optIdx >= 0 ? optIdx : 0;
        student.lastIsCorrect = isCorrect;
        student.answeredQuestionIds.push(questionId);
        student.answerLogs = Array.isArray(student.answerLogs) ? student.answerLogs : [];
        student.answerLogs.push({
          questionId,
          questionText: rawQuestion.questionText || rawQuestion.title || rawQuestion.question,
          options: rawQuestion.options,
          studentSelected: formattedSelected,
          correctAnswer,
          isCorrect,
          pointsEarned,
          submittedAt: Date.now()
        });
        const scoreboard = getScoreboardLocal(room);
        saveLocalStore(store);
        const feedback = {
          questionId,
          isCorrect,
          pointsEarned,
          currentScore: student.score
        };
        triggerLocalEvent("answer_feedback", feedback);
        callback?.({ success: true, feedback });
        broadcastToRoom(room.roomId, "scoreboard_update", scoreboard);
        return;
      }
      if (event === "teacher_end_game" || event === "get_settlement_data") {
        const roomId = data?.roomId || boundRoomId;
        const room = roomId ? store.rooms[roomId] : null;
        if (!room) return callback?.({ success: false, error: "\u623F\u95F4\u4E0D\u5B58\u5728" });
        const settlementData = settleGameLocal(room);
        saveLocalStore(store);
        if (event === "teacher_end_game") {
          broadcastToRoom(room.roomId, "game_settlement_data", settlementData);
        }
        callback?.({ success: true, settlementData });
        return;
      }
    };
    let realSocket = null;
    const activateLocalSandbox = () => {
      if (isLocalSandboxMode) return;
      isLocalSandboxMode = true;
      if (realSocket) {
        try {
          realSocket.removeAllListeners();
          realSocket.disconnect();
        } catch {
        }
        realSocket = null;
      }
      setTimeout(() => {
        triggerLocalEvent("connect", {});
      }, 10);
    };
    const proxySocket = {
      get connected() {
        return isLocalSandboxMode || Boolean(realSocket?.connected);
      },
      on(event, fn) {
        if (!listeners.has(event)) listeners.set(event, /* @__PURE__ */ new Set());
        listeners.get(event).add(fn);
        if (realSocket && !isLocalSandboxMode) {
          realSocket.on(event, fn);
        }
        if (event === "connect" && isLocalSandboxMode) {
          setTimeout(() => fn(), 0);
        }
        return proxySocket;
      },
      off(event, fn) {
        if (fn && listeners.has(event)) {
          listeners.get(event).delete(fn);
        } else if (!fn) {
          listeners.delete(event);
        }
        if (realSocket) {
          realSocket.off(event, fn);
        }
        return proxySocket;
      },
      emit(event, data, callback) {
        if (isLocalSandboxMode) {
          handleLocalEmit(event, data, callback);
          return proxySocket;
        }
        if (realSocket && realSocket.connected) {
          realSocket.emit(event, data, callback);
        } else {
          activateLocalSandbox();
          handleLocalEmit(event, data, callback);
        }
        return proxySocket;
      },
      disconnect() {
        if (bc) {
          try {
            bc.close();
          } catch {
          }
        }
        if (typeof window !== "undefined") {
          window.removeEventListener("storage", storageListener);
        }
        if (realSocket) {
          realSocket.disconnect();
        }
        return proxySocket;
      }
    };
    const serverUrl = getSocketServerUrl();
    const isFileOrStatic = typeof window !== "undefined" && (window.location.protocol === "file:" || window.location.hostname.endsWith("github.io"));
    if (isFileOrStatic) {
      const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
      const timeoutId = setTimeout(() => controller?.abort(), 600);
      fetch(`${serverUrl}/health`, { signal: controller?.signal }).then((res) => {
        clearTimeout(timeoutId);
        if (res.ok) {
          connectRealSocket(serverUrl);
        } else {
          activateLocalSandbox();
        }
      }).catch(() => {
        clearTimeout(timeoutId);
        activateLocalSandbox();
      });
    } else {
      connectRealSocket(serverUrl);
    }
    function connectRealSocket(url2) {
      realSocket = lookup2(url2, {
        transports: ["websocket", "polling"],
        reconnection: false,
        timeout: 1500
      });
      listeners.forEach((fnSet, evt) => {
        fnSet.forEach((fn) => {
          realSocket?.on(evt, fn);
        });
      });
      realSocket.on("connect_error", () => {
        activateLocalSandbox();
      });
    }
    return proxySocket;
  }

  // src/student/components/SettlementView.tsx
  var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
  var SettlementView = ({
    studentId,
    studentName,
    avatar,
    teamId,
    totalScore,
    correctCount,
    wrongCount,
    mistakes,
    liveSettlement,
    onRestart,
    onGoHome
  }) => {
    const [isMistakeModalOpen, setIsMistakeModalOpen] = (0, import_react7.useState)(false);
    const [isRuleModalOpen, setIsRuleModalOpen] = (0, import_react7.useState)(false);
    const isLive = Boolean(liveSettlement && Array.isArray(liveSettlement.leaderboard));
    const myLiveRecord = isLive ? liveSettlement.leaderboard.find((item) => item.studentId === studentId) || liveSettlement.leaderboard.find((item) => item.name === studentName) : null;
    const actualScore = myLiveRecord?.score ?? (totalScore !== void 0 ? totalScore : MOCK_SETTLEMENT_DATA.totalScore);
    const actualCorrect = myLiveRecord?.correctCount ?? (correctCount !== void 0 ? correctCount : MOCK_SETTLEMENT_DATA.correctCount);
    const actualWrong = myLiveRecord?.wrongCount ?? (wrongCount !== void 0 ? wrongCount : MOCK_SETTLEMENT_DATA.wrongCount);
    const totalQuestions = liveSettlement?.totalQuestions || actualCorrect + actualWrong || 5;
    const accuracy = Math.round(actualCorrect / Math.max(1, totalQuestions) * 100);
    const actualMistakes = mistakes !== void 0 ? mistakes : MOCK_SETTLEMENT_DATA.mistakes;
    const offlinePlayers = [
      {
        studentId: "me_offline",
        name: studentName,
        avatar: avatar.src,
        teamId,
        teamName: PRESET_TEAMS[teamId]?.shortName || "\u84DD\u961F",
        score: actualScore,
        correctCount: actualCorrect
      },
      {
        studentId: "sim_1",
        name: "\u5B66\u9738\u5C0F\u6DB5",
        avatar: "./assets/games/char_b.png",
        teamId: "red",
        teamName: "\u7EA2\u961F",
        score: 390,
        correctCount: 4
      },
      {
        studentId: "sim_2",
        name: "\u673A\u667A\u5929\u5929",
        avatar: "./assets/games/char_a.png",
        teamId: "blue",
        teamName: "\u84DD\u961F",
        score: 350,
        correctCount: 3
      },
      {
        studentId: "sim_3",
        name: "\u5143\u6C14\u9633\u9633",
        avatar: "./assets/games/char_b.png",
        teamId: "blue",
        teamName: "\u84DD\u961F",
        score: 300,
        correctCount: 3
      }
    ].sort((a, b) => b.score - a.score);
    const syncedLeaderboard = isLive ? liveSettlement.leaderboard.map((item, idx) => {
      const normTeam = normalizeTeamId(item.teamId);
      return {
        rank: item.rank ?? idx + 1,
        studentId: item.studentId || `stu_${idx}`,
        name: item.name,
        avatar: item.avatar || "./assets/games/char_b.png",
        teamId: normTeam,
        teamName: PRESET_TEAMS[normTeam]?.shortName || item.teamName || "\u6218\u961F",
        score: item.score ?? 0,
        correctCount: item.correctCount ?? Math.round((item.score || 0) / 100)
      };
    }) : offlinePlayers.map((p, idx) => ({ ...p, rank: idx + 1 }));
    const rank1 = syncedLeaderboard[0] || null;
    const rank2 = syncedLeaderboard[1] || null;
    const rank3 = syncedLeaderboard[2] || null;
    const myRank = myLiveRecord?.rank ?? (syncedLeaderboard.findIndex((p) => p.studentId === studentId || p.name === studentName) + 1 || 1);
    const totalParticipants = isLive ? syncedLeaderboard.length : 28;
    const teamScores = isLive && Array.isArray(liveSettlement.teamSummary) && liveSettlement.teamSummary.length > 0 ? liveSettlement.teamSummary.map((ts) => {
      const normId = normalizeTeamId(ts.teamId);
      const preset = PRESET_TEAMS[normId] || PRESET_TEAMS.blue;
      return {
        teamId: normId,
        name: preset.name,
        shortName: preset.shortName,
        score: ts.score ?? 0,
        color: preset.colorHex,
        badgeBg: preset.badgeBg
      };
    }) : [
      {
        teamId: "blue",
        name: "\u{1F7E6} \u84DD\u961F\u52C7\u58EB",
        shortName: "\u84DD\u961F",
        score: 750 + (teamId === "blue" ? actualScore : 0),
        color: "#3b82f6",
        badgeBg: "bg-blue-100 text-blue-800"
      },
      {
        teamId: "red",
        name: "\u{1F7E5} \u7EA2\u961F\u5148\u950B",
        shortName: "\u7EA2\u961F",
        score: 820 + (teamId === "red" ? actualScore : 0),
        color: "#ef4444",
        badgeBg: "bg-rose-100 text-rose-800"
      }
    ].sort((a, b) => b.score - a.score);
    const championTeam = teamScores[0] || {
      teamId: "blue",
      name: "\u{1F7E6} \u84DD\u961F\u52C7\u58EB",
      shortName: "\u84DD\u961F",
      score: actualScore,
      color: "#3b82f6",
      badgeBg: "bg-blue-100 text-blue-800"
    };
    const isMeRank = (item) => Boolean(item && (studentId && item.studentId === studentId || item.name === studentName));
    const fireConfetti = () => {
      try {
        confetti_module_default({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#e60067", "#3b82f6", "#f59e0b", "#10b981", "#8b5cf6"]
        });
        setTimeout(() => {
          confetti_module_default({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.7 }
          });
        }, 250);
        setTimeout(() => {
          confetti_module_default({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.7 }
          });
        }, 400);
      } catch (e) {
        console.warn("Confetti trigger skipped", e);
      }
    };
    (0, import_react7.useEffect)(() => {
      fireConfetti();
    }, []);
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full max-w-4xl mx-auto px-3 sm:px-6 py-4 pb-28 space-y-6 select-none", children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative overflow-hidden rounded-[32px] bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 p-6 sm:p-8 text-white shadow-2xl border-4 border-amber-300 text-center animate-in fade-in zoom-in-95 duration-300", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "absolute top-2 right-4 flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "button",
            {
              onClick: () => setIsRuleModalOpen(true),
              className: "px-3 py-1.5 rounded-full bg-black/20 hover:bg-black/30 text-xs font-bold text-white border border-white/30 transition-all cursor-pointer flex items-center gap-1",
              title: "\u67E5\u770B\u51A0\u4E9A\u5B63\u519B\u6392\u540D\u8BA1\u7B97\u89C4\u5219",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Info, { className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u6392\u540D\u89C4\u5219" })
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              onClick: fireConfetti,
              className: "px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-xs font-black tracking-wide text-white border border-white/30 transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-xs",
              title: "\u518D\u6B21\u55B7\u6D12\u5F69\u5E26\u793C\u82B1",
              children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u{1F389} \u653E\u793C\u82B1" })
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative z-10 space-y-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-xs sm:text-sm font-black tracking-wider uppercase", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Crown, { className: "w-4 h-4 text-amber-300 animate-bounce" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: isLive ? `${liveSettlement.roomName || "\u8BFE\u5802\u7EC8\u5C40\u5BF9\u51B3"} \xB7 \u5927\u5C4F\u9886\u5956\u7ED3\u679C\u5B9E\u65F6\u540C\u6B65` : "CHAMPION CEREMONY \xB7 \u8BFE\u5802\u7EC8\u5C40\u5BF9\u51B3\u7ED3\u7B97" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Sparkles, { className: "w-4 h-4 text-amber-300 animate-spin" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("h1", { className: "text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md", children: [
            "\u{1F3C6} \u8363\u8000\u5C5E\u4E8E ",
            championTeam.name,
            "\uFF01"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm sm:text-base font-bold text-amber-100 max-w-lg mx-auto leading-relaxed", children: myRank === 1 ? `\u{1F389} \u606D\u559C\u4F60\u4EE5 ${actualScore} \u5206\u65A9\u83B7\u5168\u73ED\u4E2A\u4EBA\u7B2C 1 \u540D\uFF08\u51A0\u519B\uFF09\uFF01\u540C\u65F6 ${championTeam.name} \u7D2F\u8BA1 ${championTeam.score} \u5206\u95EE\u9F0E\u6218\u961F\u6842\u51A0\uFF01` : myRank === 2 ? `\u{1F948} \u592A\u68D2\u4E86\uFF01\u4F60\u4EE5 ${actualScore} \u5206\u593A\u5F97\u5168\u73ED\u4E2A\u4EBA\u7B2C 2 \u540D\uFF08\u4E9A\u519B\uFF09\uFF01\u699C\u9996\u51A0\u519B\u4E3A ${rank1?.name || "\u540C\u5B66"}\uFF08${rank1?.score ?? 0}\u5206\uFF09\uFF01` : myRank === 3 ? `\u{1F949} \u5E72\u5F97\u6F02\u4EAE\uFF01\u4F60\u4EE5 ${actualScore} \u5206\u8363\u767B\u5168\u73ED\u4E2A\u4EBA\u7B2C 3 \u540D\uFF08\u5B63\u519B\uFF09\uFF01\u699C\u9996\u51A0\u519B\u4E3A ${rank1?.name || "\u540C\u5B66"}\uFF08${rank1?.score ?? 0}\u5206\uFF09\uFF01` : championTeam.teamId === teamId ? `\u592A\u68D2\u5566\uFF01\u5728\u4F60\u4E0E\u961F\u53CB\u7684\u9ED8\u5951\u62FC\u640F\u4E0B\uFF0C${championTeam.name} \u65A9\u83B7\u5168\u73ED\u6700\u9AD8 ${championTeam.score} \u5206\uFF0C\u8363\u767B\u51A0\u519B\u5B9D\u5EA7\uFF01` : `\u5168\u73ED\u6FC0\u70C8\u7ADE\u9010\uFF0C\u4E2A\u4EBA\u51A0\u519B\u4E3A\u3010${rank1?.name || "\u865A\u4F4D\u4EE5\u5F85"}\u3011\uFF0C\u6218\u961F\u6842\u51A0\u7531 ${championTeam.name}\uFF08${championTeam.score} \u5206\uFF09\u593A\u5F97\uFF01` })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white rounded-3xl p-5 sm:p-8 border-2 border-gray-100 shadow-xl space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Trophy, { className: "w-5 h-5 text-amber-500" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h2", { className: "text-lg sm:text-xl font-black text-gray-900 tracking-tight", children: "\u5168\u73ED\u524D\u4E09\u7532\u8363\u8000\u9886\u5956\u53F0 (\u4E0E\u8001\u5E08\u5927\u5C4F\u5B9E\u65F6\u540C\u6B65)" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200", children: "\u{1F947} \u7B2C1\u540D \xB7 \u{1F948} \u7B2C2\u540D \xB7 \u{1F949} \u7B2C3\u540D \u540C\u6B65\u63ED\u6653" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-end justify-center gap-2 sm:gap-6 pt-8 pb-2 px-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex-1 max-w-[175px] flex flex-col items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-center mb-2 animate-in slide-in-from-bottom-2 duration-300 flex flex-col items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative mb-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-slate-300 shadow-md overflow-hidden border-2 border-white", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "img",
                  {
                    src: rank2?.avatar || "./assets/games/char_b.png",
                    alt: rank2?.name || "\u4E9A\u519B",
                    className: "w-full h-full object-cover rounded-full bg-white"
                  }
                ) }),
                isMeRank(rank2) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[9px] font-black shadow-xs", children: "\u6211" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs sm:text-sm font-black text-gray-900 truncate max-w-[125px]", children: rank2 ? rank2.name : "\u865A\u4F4D\u4EE5\u5F85" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[10px] font-bold text-gray-500 mb-0.5", children: rank2 ? `${rank2.teamName} \xB7 ${rank2.correctCount}/${totalQuestions}\u5BF9` : "\u7B2C 2 \u540D\u5E2D\u4F4D" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-[11px] font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md inline-block", children: rank2 ? `${rank2.score} \u5206 \xB7 \u4E9A\u519B` : "-- \u5206 \xB7 \u4E9A\u519B" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full h-36 sm:h-44 rounded-t-3xl bg-gradient-to-b from-slate-300 via-slate-400 to-slate-500 shadow-lg border-2 border-slate-200 flex flex-col items-center justify-center text-white relative overflow-hidden", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-4xl sm:text-6xl font-black drop-shadow-md opacity-90", children: "2" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[10px] sm:text-xs font-black tracking-widest uppercase opacity-80 mt-1", children: "\u{1F948} \u4E9A\u519B 2ND" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex-1 max-w-[195px] flex flex-col items-center relative z-10 -mt-8", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-center mb-2 animate-in slide-in-from-bottom-4 duration-500 flex flex-col items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative inline-block mb-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Crown, { className: "w-7 h-7 sm:w-8 sm:h-8 text-amber-400 fill-amber-400 filter drop-shadow-md animate-bounce mx-auto -mb-1" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-13 h-13 sm:w-14 sm:h-14 rounded-full p-0.5 bg-amber-400 shadow-lg overflow-hidden border-2 border-amber-200", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "img",
                  {
                    src: rank1?.avatar || "./assets/games/char_b.png",
                    alt: rank1?.name || "\u51A0\u519B",
                    className: "w-full h-full object-cover rounded-full bg-white"
                  }
                ) }),
                isMeRank(rank1) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "absolute bottom-0 -right-2 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[9px] font-black shadow-xs", children: "\u6211" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-sm sm:text-base font-black text-gray-900 truncate max-w-[140px]", children: rank1 ? rank1.name : "\u865A\u4F4D\u4EE5\u5F85" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[10px] font-bold text-amber-700 mb-0.5", children: rank1 ? `${rank1.teamName} \xB7 ${rank1.correctCount}/${totalQuestions}\u5BF9 \u26A1` : "\u7B2C 1 \u540D\u5E2D\u4F4D" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs font-black text-amber-700 bg-amber-100 px-3 py-0.5 rounded-full inline-block shadow-xs", children: rank1 ? `${rank1.score} \u5206 \xB7 \u51A0\u519B` : "-- \u5206 \xB7 \u51A0\u519B" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full h-48 sm:h-56 rounded-t-3xl bg-gradient-to-b from-amber-400 via-yellow-500 to-amber-600 shadow-2xl border-4 border-amber-200 flex flex-col items-center justify-center text-white relative overflow-hidden", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/20 pointer-events-none" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-5xl sm:text-7xl font-black drop-shadow-lg", children: "1" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs sm:text-sm font-black tracking-widest uppercase opacity-95 mt-1", children: "\u{1F947} \u51A0\u519B 1ST" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex-1 max-w-[175px] flex flex-col items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-center mb-2 animate-in slide-in-from-bottom-1 duration-300 flex flex-col items-center", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative mb-1", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-11 h-11 sm:w-12 sm:h-12 rounded-full p-0.5 bg-amber-600 shadow-md overflow-hidden border-2 border-white", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                  "img",
                  {
                    src: rank3?.avatar || "./assets/games/char_b.png",
                    alt: rank3?.name || "\u5B63\u519B",
                    className: "w-full h-full object-cover rounded-full bg-white"
                  }
                ) }),
                isMeRank(rank3) && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "absolute -top-1 -right-2 px-1.5 py-0.2 rounded-full bg-pink-500 text-white text-[9px] font-black shadow-xs", children: "\u6211" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs sm:text-sm font-black text-gray-900 truncate max-w-[125px]", children: rank3 ? rank3.name : "\u865A\u4F4D\u4EE5\u5F85" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[10px] font-bold text-gray-500 mb-0.5", children: rank3 ? `${rank3.teamName} \xB7 ${rank3.correctCount}/${totalQuestions}\u5BF9` : "\u7B2C 3 \u540D\u5E2D\u4F4D" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-[11px] font-extrabold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md inline-block", children: rank3 ? `${rank3.score} \u5206 \xB7 \u5B63\u519B` : "-- \u5206 \xB7 \u5B63\u519B" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "w-full h-28 sm:h-32 rounded-t-3xl bg-gradient-to-b from-amber-700 via-amber-800 to-amber-900 shadow-md border-2 border-amber-600 flex flex-col items-center justify-center text-white relative overflow-hidden", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-3xl sm:text-5xl font-black drop-shadow-md opacity-90", children: "3" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-[10px] sm:text-xs font-black tracking-widest uppercase opacity-80 mt-1", children: "\u{1F949} \u5B63\u519B 3RD" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "pt-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "font-black text-gray-600 flex items-center gap-1.5", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u{1F3C6} \u6218\u961F\u603B\u79EF\u5206\u6392\u884C\uFF1A" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex flex-wrap items-center gap-2", children: teamScores.map((t, idx) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "span",
            {
              className: `px-3 py-1 rounded-full font-black text-xs flex items-center gap-1 ${t.badgeBg}`,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: idx === 0 ? "\u{1F451}" : `#${idx + 1}` }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: t.name }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                  t.score,
                  " \u5206"
                ] })
              ]
            },
            t.teamId
          )) })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white rounded-3xl p-5 sm:p-7 border-2 border-gray-100 shadow-xl space-y-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-3.5", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 to-amber-400 p-1 shadow-md", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-full h-full bg-white rounded-xl p-1 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("img", { src: avatar.src, alt: "", className: "w-full h-full object-contain" }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-xl font-black text-gray-900", children: studentName }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "px-2.5 py-0.5 rounded-full text-xs font-black bg-pink-100 text-pink-700", children: PRESET_TEAMS[teamId]?.name || "\u84DD\u961F\u52C7\u58EB" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs text-gray-400 font-bold mt-0.5", children: "\u4E2A\u4EBA\u4E13\u5C5E\u6210\u7EE9\u5355 \xB7 \u4FDD\u62A4\u9690\u79C1\u4EC5\u81EA\u5DF1\u53EF\u89C1" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
            "button",
            {
              onClick: () => setIsMistakeModalOpen(true),
              className: "w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-black text-xs sm:text-sm shadow-md shadow-purple-200 transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95",
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(BookOpen, { className: "w-4 h-4" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                  "\u{1F4D6} \u67E5\u770B\u6211\u7684\u9519\u9898\u81EA\u67E5\u5361 (",
                  actualMistakes.length,
                  " \u9898)"
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-4 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 text-center space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-black text-pink-600 uppercase tracking-wider", children: "\u4F60\u7684\u603B\u5F97\u5206" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-2xl sm:text-3xl font-black text-pink-700", children: [
              actualScore,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-normal", children: "\u5206" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-[11px] text-pink-500/80 font-bold", children: "\u5DF2\u8BA1\u5165\u6218\u961F\u603B\u5206" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-200 text-center space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-black text-amber-700 uppercase tracking-wider", children: "\u5168\u73ED\u4E2A\u4EBA\u6392\u540D" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-2xl sm:text-3xl font-black text-amber-800", children: [
              "\u7B2C ",
              myRank,
              " ",
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-normal", children: "\u540D" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-[11px] text-amber-600/80 font-bold", children: [
              "\u5168\u73ED ",
              totalParticipants,
              " \u4F4D\u540C\u4FAA"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 text-center space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-black text-emerald-700 uppercase tracking-wider", children: "\u7B54\u5BF9\u9898\u6570" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-2xl sm:text-3xl font-black text-emerald-700 flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CircleCheckBig, { className: "w-5 h-5 text-emerald-500" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                actualCorrect,
                " \u9898"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-[11px] text-emerald-600/80 font-bold", children: [
              "\u51C6\u786E\u7387 ",
              accuracy,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200 text-center space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-xs font-black text-gray-600 uppercase tracking-wider", children: "\u9519\u9898\u81EA\u67E5" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "text-2xl sm:text-3xl font-black text-gray-800 flex items-center justify-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(CircleX, { className: "w-5 h-5 text-rose-500" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                actualMistakes.length,
                " \u9898"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-[11px] text-gray-500 font-bold", children: actualMistakes.length === 0 ? "\u6EE1\u5206\u5927\u6EE1\u8D2F\uFF01" : "\u70B9\u53F3\u4E0A\u89D2\u67E5\u770B\u9519\u9898" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "pt-2 flex flex-col sm:flex-row items-center justify-center gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "button",
          {
            onClick: onRestart,
            className: "w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-pink-500 hover:bg-pink-600 text-white font-black text-sm shadow-md shadow-pink-200 flex items-center justify-center gap-2 cursor-pointer transition-all transform hover:scale-105 active:scale-95",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(RotateCcw, { className: "w-4 h-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u518D\u6218\u4E00\u5C40 (\u91CD\u65B0\u5F00\u59CB)" })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "button",
          {
            onClick: onGoHome,
            className: "w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white hover:bg-gray-100 text-gray-800 font-black text-sm border-2 border-gray-200 shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(House, { className: "w-4 h-4 text-gray-500" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u8FD4\u56DE\u6E38\u620F\u5927\u5385" })
            ]
          }
        )
      ] }),
      isMistakeModalOpen && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        "div",
        {
          className: "relative bg-white w-full max-w-xl rounded-[32px] shadow-2xl border-4 border-purple-200 overflow-hidden my-auto max-h-[88vh] flex flex-col transform transition-all animate-in zoom-in-95 duration-200",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-5 sm:p-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-between shrink-0", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-xl", children: "\u{1F4D6}" }),
                /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h3", { className: "text-xl font-black", children: "\u6211\u7684\u4E2A\u4EBA\u9519\u9898\u81EA\u67E5\u5361" }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("p", { className: "text-xs text-white/80 font-bold", children: [
                    "\u5171\u9519 ",
                    actualMistakes.length,
                    " \u9898 \xB7 \u6807\u7EA2\u6211\u7684\u9009\u62E9 vs \u6807\u7EFF\u6807\u51C6\u6B63\u89E3"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
                "button",
                {
                  onClick: () => setIsMistakeModalOpen(false),
                  className: "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer transition-colors",
                  children: "\u2715"
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "p-5 sm:p-6 overflow-y-auto space-y-4 flex-1", children: actualMistakes.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "py-12 text-center space-y-3", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "text-6xl animate-bounce", children: "\u{1F389}" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h4", { className: "text-xl font-black text-gray-800", children: "\u592A\u5389\u5BB3\u4E86\uFF01\u672C\u5C40\u5168\u90E8\u7B54\u5BF9\uFF0C\u96F6\u9519\u9898\uFF01" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "text-xs font-bold text-gray-500", children: "\u4F60\u5DF2\u7ECF\u638C\u63E1\u4E86\u5168\u90E8\u9898\u76EE\u77E5\u8BC6\u70B9\uFF0C\u7EE7\u7EED\u4FDD\u6301\uFF01" })
            ] }) : actualMistakes.map((mistake, idx) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "div",
              {
                className: "p-5 rounded-2xl bg-slate-50 border-2 border-slate-200 space-y-3",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "flex items-center gap-2 text-xs font-black text-purple-700 bg-purple-100 px-3 py-1 rounded-xl w-fit", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { children: [
                    "\u7B2C 0",
                    mistake.questionNumber,
                    " \u9898 \xB7 \u9519\u9898\u590D\u4E60"
                  ] }) }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h4", { className: "text-base font-black text-gray-900 leading-snug", children: mistake.prompt }),
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-3 rounded-xl bg-rose-50 border-2 border-rose-200 text-xs space-y-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-1.5 font-black text-rose-700", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(X, { className: "w-4 h-4 text-rose-600 stroke-[3]" }),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u6211\u7684\u5F53\u65F6\u9009\u62E9 (\u5931\u8BEF)" })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "font-bold text-rose-900 text-sm pl-5", children: mistake.studentAnswer })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-3 rounded-xl bg-emerald-50 border-2 border-emerald-200 text-xs space-y-1", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-1.5 font-black text-emerald-700", children: [
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Check, { className: "w-4 h-4 text-emerald-600 stroke-[3]" }),
                        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "\u6807\u51C6\u6B63\u786E\u7B54\u6848 (\u6B63\u89E3)" })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "font-bold text-emerald-900 text-sm pl-5", children: mistake.correctAnswer })
                    ] })
                  ] }),
                  mistake.explanation && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs font-medium text-amber-900 leading-relaxed", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "font-black text-amber-800", children: "\u{1F4A1} \u77E5\u8BC6\u9526\u56CA\u89E3\u6790\uFF1A" }),
                    mistake.explanation
                  ] })
                ]
              },
              idx
            )) }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "p-4 bg-gray-50 border-t border-gray-100 flex justify-end shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "button",
              {
                onClick: () => setIsMistakeModalOpen(false),
                className: "px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-black text-xs transition-colors cursor-pointer shadow-sm",
                children: "\u81EA\u67E5\u5B8C\u6BD5\uFF0C\u5173\u95ED"
              }
            ) })
          ]
        }
      ) }),
      isRuleModalOpen && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "bg-white rounded-3xl max-w-md w-full p-6 space-y-4 border-2 border-amber-300 shadow-2xl animate-in zoom-in-95 duration-200", children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "text-2xl", children: "\u{1F3C6}" }),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("h4", { className: "text-lg font-black text-gray-900", children: "\u51A0\u4E9A\u5B63\u519B\u662F\u5982\u4F55\u8BA1\u7B97\u7684\uFF1F" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              onClick: () => setIsRuleModalOpen(false),
              className: "w-7 h-7 rounded-full bg-gray-100 text-gray-500 font-bold hover:bg-gray-200 flex items-center justify-center cursor-pointer",
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "space-y-2.5 text-xs text-gray-600 leading-relaxed", children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 font-medium", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "font-black text-amber-900 mb-1", children: "\u{1F4CA} 1. \u6218\u961F\u79EF\u5206\u7D2F\u52A0\u6CD5\u5219\uFF1A" }),
            "\u6BCF\u4E2A\u961F\u4F0D\u7684\u6700\u7EC8\u603B\u79EF\u5206 = \u8BE5\u961F\u4F0D\u4E2D\u6240\u6709\u540C\u5B66\u7B54\u5BF9\u9898\u76EE\u7684\u5F97\u5206\u4E4B\u548C\u3002"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-3 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 font-medium", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "font-black text-blue-900 mb-1", children: "\u{1F3AE} 2. \u4F60\u7684\u8D21\u732E\u76F4\u63A5\u5F71\u54CD\u6392\u540D\uFF1A" }),
            "\u4F60\u5728\u7B54\u9898\u5BF9\u6218\u4E2D\u83B7\u5F97\u7684\u4E2A\u4EBA\u603B\u5206\uFF08\u5982 ",
            actualScore,
            " \u5206\uFF09\uFF0C\u5DF2\u5B8C\u5168\u7D2F\u52A0\u81F3\u4F60\u6240\u5C5E\u7684\u6218\u961F\u603B\u79EF\u5206\u4E2D\uFF01"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "p-3 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 font-medium", children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("p", { className: "font-black text-purple-900 mb-1", children: "\u{1F947} 3. \u9886\u5956\u53F0\u5E2D\u4F4D\u88C1\u51B3\uFF1A" }),
            "\u6BD4\u8D5B\u7ED3\u675F\u65F6\uFF0C\u7CFB\u7EDF\u5C06\u6240\u6709\u6218\u961F\u603B\u79EF\u5206\u4ECE\u9AD8\u5230\u4F4E\u8FDB\u884C\u7EDD\u5BF9\u6392\u5E8F\uFF1A",
            /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("ul", { className: "list-disc pl-5 mt-1 space-y-0.5 font-bold", children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "\u603B\u5206\u6700\u9AD8\u961F \u2794 \u{1F3C6} \u51A0\u519B\u91D1\u53F0 (1st)" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "\u603B\u5206\u6B21\u9AD8\u961F \u2794 \u{1F948} \u4E9A\u519B\u94F6\u53F0 (2nd)" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("li", { children: "\u603B\u5206\u7B2C\u4E09\u961F \u2794 \u{1F949} \u5B63\u519B\u94DC\u53F0 (3rd)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "pt-2", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "button",
          {
            onClick: () => setIsRuleModalOpen(false),
            className: "w-full py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-xs transition-colors cursor-pointer",
            children: "\u660E\u767D\u5566\uFF01"
          }
        ) })
      ] }) })
    ] });
  };

  // src/student/components/DebugBar.tsx
  var import_react8 = __toESM(require_react(), 1);
  var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
  var DebugBar = ({
    currentScreen,
    onSelectScreen,
    quizMode = "pad",
    onToggleQuizMode
  }) => {
    const [collapsed, setCollapsed] = (0, import_react8.useState)(false);
    const screens = [
      { id: "landing", label: "\u5927\u5385\u4E3B\u9875", number: "1", icon: "\u{1F3E0}" },
      { id: "join-modal", label: "\u8FDB\u623F\u5F39\u7A97", number: "2", icon: "\u{1F511}" },
      { id: "lobby", label: "\u7B49\u5F85\u5927\u5385", number: "3", icon: "\u23F3" },
      { id: "quiz", label: "\u7B54\u9898\u5BF9\u6218", number: "4", icon: "\u{1F3AE}" },
      { id: "settlement", label: "\u7ED3\u7B97\u5E86\u5178", number: "5", icon: "\u{1F3C6}" }
    ];
    return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "fixed bottom-3 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 pointer-events-none select-none", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "bg-slate-900/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-slate-700/80 p-2 pointer-events-auto transition-all duration-300", children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-between px-2 pb-1.5 border-b border-slate-800 text-xs", children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-1.5 font-bold text-amber-400", children: [
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Wrench, { className: "w-3.5 h-3.5" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { children: "\u79BB\u7EBF\u5168\u771F\u4EA4\u4E92\u8C03\u8BD5\u53F0 (Debug Bar)" }),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-sm", children: "\u5373\u70B9\u5373\u6D4B" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center gap-3", children: [
          currentScreen === "quiz" && onToggleQuizMode && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
            "button",
            {
              onClick: onToggleQuizMode,
              className: "text-[11px] px-2 py-0.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors cursor-pointer",
              children: [
                "\u5207\u6362\u4E3A: ",
                quizMode === "pad" ? "\u6A21\u5F0FB (\u72EC\u7ACB\u6E38\u620F)" : "\u6A21\u5F0FA (\u7B54\u9898\u624B\u67C4)"
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
            "button",
            {
              onClick: () => setCollapsed(!collapsed),
              className: "text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer",
              title: collapsed ? "\u5C55\u5F00\u8C03\u8BD5\u6761" : "\u6536\u8D77\u8C03\u8BD5\u6761",
              children: collapsed ? /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronUp, { className: "w-4 h-4" }) : /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronDown, { className: "w-4 h-4" })
            }
          )
        ] })
      ] }),
      !collapsed && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "grid grid-cols-5 gap-1.5 pt-2", children: screens.map((item) => {
        const isActive = currentScreen === item.id;
        return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
          "button",
          {
            onClick: () => onSelectScreen(item.id),
            className: `flex flex-col sm:flex-row items-center justify-center gap-1 py-1.5 px-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${isActive ? "bg-pink-600 text-white shadow-md shadow-pink-500/40 scale-102 ring-1 ring-pink-400" : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white"}`,
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("span", { className: "text-sm", children: item.icon }),
              /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("span", { className: "text-[11px] sm:text-xs text-center truncate", children: [
                item.number,
                ".",
                item.label
              ] }),
              isActive && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Check, { className: "w-3 h-3 text-pink-200 hidden sm:inline-block" })
            ]
          },
          item.id
        );
      }) })
    ] }) });
  };

  // src/student/StudentApp.tsx
  var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
  var StudentApp = ({ onBackToTeacherAdmin }) => {
    const [currentScreen, setCurrentScreen] = (0, import_react9.useState)("landing");
    const [isJoinModalOpen, setIsJoinModalOpen] = (0, import_react9.useState)(false);
    const [quizMode, setQuizMode] = (0, import_react9.useState)("pad");
    const [suggestedPin, setSuggestedPin] = (0, import_react9.useState)("686868");
    const [liveTeammates, setLiveTeammates] = (0, import_react9.useState)(void 0);
    const [teamChangeNotice, setTeamChangeNotice] = (0, import_react9.useState)(null);
    const [liveQuestion, setLiveQuestion] = (0, import_react9.useState)(null);
    const [liveStage, setLiveStage] = (0, import_react9.useState)(null);
    const [liveStageTimeLeft, setLiveStageTimeLeft] = (0, import_react9.useState)(void 0);
    const [liveSettlementData, setLiveSettlementData] = (0, import_react9.useState)(null);
    const [studentSession, setStudentSession] = (0, import_react9.useState)({
      pin: "686868",
      nickname: "\u673A\u667A\u5C0F\u660E",
      avatar: CARTOON_AVATARS[0],
      roomName: "\u4E00\u5E74\u7EA7\u6570\u5B66\u8DA3\u5473\u5927\u4F5C\u6218",
      teamId: "blue",
      lastScore: 400,
      correctCount: 4,
      wrongCount: 1,
      mistakes: MOCK_SETTLEMENT_DATA.mistakes
    });
    const socketRef = (0, import_react9.useRef)(null);
    const sessionRef = (0, import_react9.useRef)(studentSession);
    sessionRef.current = studentSession;
    (0, import_react9.useEffect)(() => {
      if (!isJoinModalOpen) return;
      try {
        const saved = localStorage.getItem("educineva_active_room");
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed?.pin) {
            setSuggestedPin(String(parsed.pin));
          }
        }
      } catch {
      }
      const serverUrl = getSocketServerUrl();
      fetch(`${serverUrl}/api/rooms`).then((res) => res.json()).then((data) => {
        if (data?.success && Array.isArray(data.rooms) && data.rooms.length > 0) {
          const activeRooms = data.rooms.filter((r) => r.status !== "closed").sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
          const latestRoom = activeRooms[0] || data.rooms[data.rooms.length - 1];
          if (latestRoom?.pin) {
            setSuggestedPin(String(latestRoom.pin));
          }
        }
      }).catch(() => {
      });
    }, [isJoinModalOpen]);
    (0, import_react9.useEffect)(() => {
      const socket = createSocketConnection();
      socketRef.current = socket;
      socket.on("connect", () => {
        const sess = sessionRef.current;
        if (sess.roomId && sess.studentToken) {
          socket.emit(
            "student_reconnect",
            {
              roomId: sess.roomId,
              studentToken: sess.studentToken
            },
            (res) => {
              if (res && res.success) {
                setStudentSession((prev) => ({
                  ...prev,
                  teamId: normalizeTeamId(res.teamId),
                  lastScore: res.score ?? prev.lastScore
                }));
              }
            }
          );
        }
      });
      socket.on("room_roster_update", (roster) => {
        if (!roster || !Array.isArray(roster.students)) return;
        const myId = sessionRef.current.studentId;
        const me = roster.students.find((s) => s.studentId === myId);
        if (me) {
          const normalizedNewTeam = normalizeTeamId(me.teamId);
          setStudentSession((prev) => ({
            ...prev,
            roomName: roster.roomName || prev.roomName,
            teamId: normalizedNewTeam
          }));
        }
        const others = roster.students.filter((s) => s.studentId !== myId).map((s) => ({
          id: s.studentId,
          name: s.name,
          avatar: s.avatar || "./assets/games/char_b.png",
          teamId: normalizeTeamId(s.teamId),
          isReady: true
        }));
        setLiveTeammates(others);
      });
      socket.on("your_team_changed", (evt) => {
        if (!evt) return;
        const prevTeam = PRESET_TEAMS[sessionRef.current.teamId] || PRESET_TEAMS.blue;
        const newTeamKey = normalizeTeamId(evt.teamId);
        const nextTeam = PRESET_TEAMS[newTeamKey] || PRESET_TEAMS.blue;
        setStudentSession((prev) => ({
          ...prev,
          teamId: newTeamKey
        }));
        setTeamChangeNotice({
          prevTeamName: prevTeam.name,
          newTeamName: evt.teamName || nextTeam.name
        });
      });
      socket.on("new_question", (questionData) => {
        if (!questionData) return;
        setLiveQuestion(questionData);
        setLiveStage("question-prompt");
        setCurrentScreen("quiz");
      });
      const applySettlementToSession = (settlementData) => {
        if (!settlementData || !Array.isArray(settlementData.leaderboard)) return;
        setLiveSettlementData(settlementData);
        const myId = sessionRef.current.studentId;
        const myRecord = settlementData.leaderboard.find((item) => item.studentId === myId) || settlementData.leaderboard.find((item) => item.name === sessionRef.current.nickname);
        if (myRecord) {
          const mappedMistakes = (myRecord.wrongQuestions || []).map(
            (wq, idx) => ({
              questionNumber: wq.questionNumber || idx + 1,
              prompt: wq.questionText,
              studentAnswer: wq.studentSelectedText || wq.studentSelected,
              correctAnswer: wq.correctAnswerText || wq.correctAnswer,
              explanation: wq.explanation || "\u8BF7\u7ED3\u5408\u8BFE\u5802\u8001\u5E08\u8BB2\u89E3\u590D\u4E60\u5DE9\u56FA\u672C\u9898\u77E5\u8BC6\u70B9\u3002"
            })
          );
          setStudentSession((prev) => ({
            ...prev,
            teamId: myRecord.teamId ? normalizeTeamId(myRecord.teamId) : prev.teamId,
            lastScore: myRecord.score ?? 0,
            correctCount: myRecord.correctCount ?? Math.max(0, (myRecord.totalAnswered || 0) - (myRecord.wrongCount || 0)),
            wrongCount: myRecord.wrongCount ?? mappedMistakes.length,
            mistakes: mappedMistakes
          }));
        }
        setCurrentScreen("settlement");
      };
      socket.on("screen_stage_sync", (payload) => {
        if (!payload) return;
        setLiveStage(payload.state);
        if (typeof payload.timeLeft === "number") {
          setLiveStageTimeLeft(payload.timeLeft);
        }
        if (payload.state === "lobby") {
          setLiveQuestion(null);
          setLiveSettlementData(null);
          setStudentSession((prev) => ({
            ...prev,
            lastScore: 0,
            correctCount: 0,
            wrongCount: 0,
            mistakes: []
          }));
          setCurrentScreen("lobby");
        } else if (payload.state === "podium") {
          const roomId = payload.roomId || sessionRef.current.roomId;
          if (roomId) {
            socket.emit("get_settlement_data", { roomId }, (res) => {
              if (res?.success && res.settlementData) {
                applySettlementToSession(res.settlementData);
              }
            });
          }
        }
      });
      socket.on("game_settlement_data", (settlementData) => {
        applySettlementToSession(settlementData);
      });
      return () => {
        socket.disconnect();
      };
    }, []);
    const handleJoinSuccess = (0, import_react9.useCallback)(
      (data) => {
        return new Promise((resolve) => {
          const socket = socketRef.current;
          if (socket && socket.connected) {
            socket.emit(
              "student_join_room",
              {
                pin: data.pin,
                studentName: data.nickname,
                avatar: data.avatar.src
              },
              (res) => {
                if (res && res.success) {
                  const assignedTeam = normalizeTeamId(res.teamId);
                  sessionRef.current = {
                    ...sessionRef.current,
                    roomId: res.roomId,
                    studentId: res.studentId,
                    studentToken: res.studentToken,
                    pin: data.pin,
                    nickname: data.nickname,
                    avatar: data.avatar,
                    roomName: res.roomName || sessionRef.current.roomName,
                    teamId: assignedTeam
                  };
                  setStudentSession((prev) => ({
                    ...prev,
                    roomId: res.roomId,
                    studentId: res.studentId,
                    studentToken: res.studentToken,
                    pin: data.pin,
                    nickname: data.nickname,
                    avatar: data.avatar,
                    roomName: res.roomName || prev.roomName,
                    teamId: assignedTeam
                  }));
                  if (res.roster && Array.isArray(res.roster.students)) {
                    const others = res.roster.students.filter((s) => s.studentId !== res.studentId).map((s) => ({
                      id: s.studentId,
                      name: s.name,
                      avatar: s.avatar || "./assets/games/char_b.png",
                      teamId: normalizeTeamId(s.teamId),
                      isReady: true
                    }));
                    setLiveTeammates(others);
                  } else {
                    setLiveTeammates([]);
                  }
                  setIsJoinModalOpen(false);
                  if (res.activeQuestion) {
                    setLiveQuestion(res.activeQuestion);
                    setLiveStage(res.activeStage || "question-options");
                    setCurrentScreen("quiz");
                  } else {
                    setCurrentScreen("lobby");
                  }
                  resolve({ success: true });
                } else if (data.pin === "686868") {
                  setLiveTeammates(void 0);
                  setLiveQuestion(null);
                  setStudentSession((prev) => ({
                    ...prev,
                    roomId: void 0,
                    studentId: void 0,
                    studentToken: void 0,
                    pin: data.pin,
                    nickname: data.nickname,
                    avatar: data.avatar
                  }));
                  setIsJoinModalOpen(false);
                  setCurrentScreen("lobby");
                  resolve({ success: true });
                } else {
                  resolve({
                    success: false,
                    error: res?.error || "\u672A\u627E\u5230\u8BE5 PIN \u7801\u5BF9\u5E94\u7684\u6D3B\u8DC3\u623F\u95F4"
                  });
                }
              }
            );
          } else {
            setLiveTeammates(void 0);
            setLiveQuestion(null);
            setStudentSession((prev) => ({
              ...prev,
              pin: data.pin,
              nickname: data.nickname,
              avatar: data.avatar
            }));
            setIsJoinModalOpen(false);
            setCurrentScreen("lobby");
            resolve({ success: true });
          }
        });
      },
      []
    );
    const handleSubmitLiveAnswer = (0, import_react9.useCallback)(
      (questionId, selectedKey) => {
        return new Promise((resolve) => {
          const socket = socketRef.current;
          const sess = sessionRef.current;
          if (!socket || !socket.connected || !sess.roomId) {
            return resolve(null);
          }
          socket.emit(
            "student_submit_answer",
            {
              roomId: sess.roomId,
              studentId: sess.studentId,
              questionId,
              selectedOption: selectedKey
            },
            (res) => {
              if (res && res.success && res.feedback) {
                resolve(res.feedback);
              } else {
                resolve(null);
              }
            }
          );
        });
      },
      []
    );
    const handleLeaveRoom = () => {
      setLiveQuestion(null);
      setLiveTeammates(void 0);
      setCurrentScreen("landing");
    };
    const handleRequestSwitchTeam = (0, import_react9.useCallback)(() => {
      const socket = socketRef.current;
      const sess = sessionRef.current;
      if (socket && socket.connected && sess.roomId && sess.studentId) {
        socket.emit("student_switch_team", {
          roomId: sess.roomId,
          studentId: sess.studentId
        });
        return true;
      }
      return false;
    }, []);
    const handleSelectScreen = (screen) => {
      if (screen === "join-modal") {
        setIsJoinModalOpen(true);
      } else {
        setIsJoinModalOpen(false);
        setCurrentScreen(screen);
      }
    };
    const handleToggleQuizMode = () => {
      setQuizMode((prev) => prev === "pad" ? "game" : "pad");
    };
    const handleCompleteQuiz = (summary) => {
      setStudentSession((prev) => ({
        ...prev,
        lastScore: summary.score,
        correctCount: summary.correctCount,
        wrongCount: summary.wrongCount,
        mistakes: summary.mistakes
      }));
      setCurrentScreen("settlement");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "min-h-screen bg-radial from-pink-50/40 via-amber-50/30 to-blue-50/40 text-slate-800 flex flex-col font-sans select-none relative overflow-x-hidden", children: [
      onBackToTeacherAdmin && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "bg-slate-900 text-slate-300 text-xs px-4 py-1.5 flex items-center justify-between z-50", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "w-2 h-2 rounded-full bg-emerald-400 animate-ping" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "font-medium", children: "\u5F53\u524D\u8FD0\u884C\u73AF\u5883\uFF1A\u3010\u5B66\u751F\u7AEF\u95E8\u6237 (Student Portal)\u3011- \u4E25\u683C\u7269\u7406\u9694\u79BB" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)(
          "button",
          {
            onClick: onBackToTeacherAdmin,
            className: "flex items-center gap-1 text-slate-200 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-0.5 rounded text-[11px] font-bold transition-colors cursor-pointer",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(ArrowLeft, { className: "w-3 h-3" }),
              "\u8FD4\u56DE\u6559\u5E08\u7AEF\u540E\u53F0"
            ]
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(StudentHeader, { onOpenJoinModal: () => setIsJoinModalOpen(true) }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("main", { className: "flex-1 flex flex-col", children: [
        currentScreen === "landing" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(GameGallery, { onJoinRoomClick: () => setIsJoinModalOpen(true) }),
        currentScreen === "lobby" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          LobbyView,
          {
            roomName: studentSession.roomName,
            pin: studentSession.pin,
            nickname: studentSession.nickname,
            avatar: studentSession.avatar,
            initialTeamId: studentSession.teamId,
            liveTeammates,
            externalTeamChangeNotice: teamChangeNotice,
            onRequestSwitchTeam: handleRequestSwitchTeam,
            onLeaveRoom: handleLeaveRoom,
            onStartQuiz: () => setCurrentScreen("quiz")
          }
        ),
        currentScreen === "quiz" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          QuizArena,
          {
            roomName: studentSession.roomName,
            pin: studentSession.pin,
            studentName: studentSession.nickname,
            avatar: studentSession.avatar,
            teamId: studentSession.teamId,
            initialMode: quizMode,
            liveQuestion,
            liveStage,
            liveTimeLeft: liveStageTimeLeft,
            onSubmitLiveAnswer: handleSubmitLiveAnswer,
            onCompleteQuiz: handleCompleteQuiz,
            onBackToLobby: () => setCurrentScreen("lobby")
          }
        ),
        currentScreen === "settlement" && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
          SettlementView,
          {
            studentId: studentSession.studentId,
            studentName: studentSession.nickname,
            avatar: studentSession.avatar,
            teamId: studentSession.teamId,
            totalScore: studentSession.lastScore,
            correctCount: studentSession.correctCount,
            wrongCount: studentSession.wrongCount,
            mistakes: studentSession.mistakes,
            liveSettlement: liveSettlementData,
            onRestart: () => setCurrentScreen("lobby"),
            onGoHome: () => setCurrentScreen("landing")
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        JoinModal,
        {
          isOpen: isJoinModalOpen,
          suggestedPin,
          onClose: () => setIsJoinModalOpen(false),
          onJoinSuccess: handleJoinSuccess
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
        DebugBar,
        {
          currentScreen: isJoinModalOpen ? "join-modal" : currentScreen,
          onSelectScreen: handleSelectScreen,
          quizMode,
          onToggleQuizMode: handleToggleQuizMode
        }
      )
    ] });
  };

  // src/student-main.tsx
  var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
  import_client.default.createRoot(document.getElementById("root")).render(
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(import_react10.default.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(StudentApp, {}) })
  );
})();
/*! Bundled license information:

react/cjs/react.production.min.js:
  (**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

scheduler/cjs/scheduler.production.min.js:
  (**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react-dom/cjs/react-dom.production.min.js:
  (**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.production.min.js:
  (**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-left.js:
lucide-react/dist/esm/icons/arrow-right.js:
lucide-react/dist/esm/icons/award.js:
lucide-react/dist/esm/icons/bell.js:
lucide-react/dist/esm/icons/book-open.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/chevron-up.js:
lucide-react/dist/esm/icons/circle-check-big.js:
lucide-react/dist/esm/icons/circle-check.js:
lucide-react/dist/esm/icons/circle-x.js:
lucide-react/dist/esm/icons/crown.js:
lucide-react/dist/esm/icons/dices.js:
lucide-react/dist/esm/icons/flame.js:
lucide-react/dist/esm/icons/gamepad-2.js:
lucide-react/dist/esm/icons/house.js:
lucide-react/dist/esm/icons/info.js:
lucide-react/dist/esm/icons/log-out.js:
lucide-react/dist/esm/icons/play.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/rotate-ccw.js:
lucide-react/dist/esm/icons/shield-check.js:
lucide-react/dist/esm/icons/smartphone.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/star.js:
lucide-react/dist/esm/icons/swords.js:
lucide-react/dist/esm/icons/trophy.js:
lucide-react/dist/esm/icons/tv.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/wrench.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.475.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
