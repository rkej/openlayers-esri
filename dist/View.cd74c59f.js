// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/ol/tilegrid/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DEFAULT_TILE_SIZE = exports.DEFAULT_MAX_ZOOM = void 0;

/**
 * @module ol/tilegrid/common
 */

/**
 * Default maximum zoom for default tile grids.
 * @type {number}
 */
var DEFAULT_MAX_ZOOM = 42;
/**
 * Default tile size.
 * @type {number}
 */

exports.DEFAULT_MAX_ZOOM = DEFAULT_MAX_ZOOM;
var DEFAULT_TILE_SIZE = 256;
exports.DEFAULT_TILE_SIZE = DEFAULT_TILE_SIZE;
},{}],"node_modules/ol/util.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abstract = abstract;
exports.inherits = inherits;
exports.getUid = getUid;
exports.VERSION = void 0;

/**
 * @module ol/util
 */

/**
 * @return {?} Any return.
 */
function abstract() {
  return (
    /** @type {?} */
    function () {
      throw new Error('Unimplemented abstract method.');
    }()
  );
}
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * Usage:
 *
 *     function ParentClass(a, b) { }
 *     ParentClass.prototype.foo = function(a) { }
 *
 *     function ChildClass(a, b, c) {
 *       // Call parent constructor
 *       ParentClass.call(this, a, b);
 *     }
 *     inherits(ChildClass, ParentClass);
 *
 *     var child = new ChildClass('a', 'b', 'see');
 *     child.foo(); // This works.
 *
 * @param {!Function} childCtor Child constructor.
 * @param {!Function} parentCtor Parent constructor.
 * @function module:ol.inherits
 * @deprecated
 * @api
 */


function inherits(childCtor, parentCtor) {
  childCtor.prototype = Object.create(parentCtor.prototype);
  childCtor.prototype.constructor = childCtor;
}
/**
 * Counter for getUid.
 * @type {number}
 * @private
 */


var uidCounter_ = 0;
/**
 * Gets a unique ID for an object. This mutates the object so that further calls
 * with the same object as a parameter returns the same value. Unique IDs are generated
 * as a strictly increasing sequence. Adapted from goog.getUid.
 *
 * @param {Object} obj The object to get the unique ID for.
 * @return {string} The unique ID for the object.
 * @function module:ol.getUid
 * @api
 */

function getUid(obj) {
  return obj.ol_uid || (obj.ol_uid = String(++uidCounter_));
}
/**
 * OpenLayers version.
 * @type {string}
 */


var VERSION = '5.3.3';
exports.VERSION = VERSION;
},{}],"node_modules/ol/functions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TRUE = TRUE;
exports.FALSE = FALSE;
exports.VOID = VOID;

/**
 * @module ol/functions
 */

/**
 * Always returns true.
 * @returns {boolean} true.
 */
function TRUE() {
  return true;
}
/**
 * Always returns false.
 * @returns {boolean} false.
 */


function FALSE() {
  return false;
}
/**
 * A reusable function, used e.g. as a default for callbacks.
 *
 * @return {void} Nothing.
 */


function VOID() {}
},{}],"node_modules/ol/AssertionError.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("./util.js");

/**
 * @module ol/AssertionError
 */

/**
 * Error object thrown when an assertion failed. This is an ECMA-262 Error,
 * extended with a `code` property.
 * See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error.
 */
var AssertionError =
/*@__PURE__*/
function (Error) {
  function AssertionError(code) {
    var path = _util.VERSION === 'latest' ? _util.VERSION : 'v' + _util.VERSION.split('-')[0];
    var message = 'Assertion failed. See https://openlayers.org/en/' + path + '/doc/errors/#' + code + ' for details.';
    Error.call(this, message);
    /**
     * Error code. The meaning of the code can be found on
     * https://openlayers.org/en/latest/doc/errors/ (replace `latest` with
     * the version found in the OpenLayers script's header comment if a version
     * other than the latest is used).
     * @type {number}
     * @api
     */

    this.code = code;
    /**
     * @type {string}
     */

    this.name = 'AssertionError'; // Re-assign message, see https://github.com/Rich-Harris/buble/issues/40

    this.message = message;
  }

  if (Error) AssertionError.__proto__ = Error;
  AssertionError.prototype = Object.create(Error && Error.prototype);
  AssertionError.prototype.constructor = AssertionError;
  return AssertionError;
}(Error);

var _default = AssertionError;
exports.default = _default;
},{"./util.js":"node_modules/ol/util.js"}],"node_modules/ol/asserts.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;

var _AssertionError = _interopRequireDefault(require("./AssertionError.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/asserts
 */

/**
 * @param {*} assertion Assertion we expected to be truthy.
 * @param {number} errorCode Error code.
 */
function assert(assertion, errorCode) {
  if (!assertion) {
    throw new _AssertionError.default(errorCode);
  }
}
},{"./AssertionError.js":"node_modules/ol/AssertionError.js"}],"node_modules/ol/math.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clamp = clamp;
exports.roundUpToPowerOfTwo = roundUpToPowerOfTwo;
exports.squaredSegmentDistance = squaredSegmentDistance;
exports.squaredDistance = squaredDistance;
exports.solveLinearSystem = solveLinearSystem;
exports.toDegrees = toDegrees;
exports.toRadians = toRadians;
exports.modulo = modulo;
exports.lerp = lerp;
exports.cosh = void 0;

var _asserts = require("./asserts.js");

/**
 * @module ol/math
 */

/**
 * Takes a number and clamps it to within the provided bounds.
 * @param {number} value The input number.
 * @param {number} min The minimum value to return.
 * @param {number} max The maximum value to return.
 * @return {number} The input number if it is within bounds, or the nearest
 *     number within the bounds.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
/**
 * Return the hyperbolic cosine of a given number. The method will use the
 * native `Math.cosh` function if it is available, otherwise the hyperbolic
 * cosine will be calculated via the reference implementation of the Mozilla
 * developer network.
 *
 * @param {number} x X.
 * @return {number} Hyperbolic cosine of x.
 */


var cosh = function () {
  // Wrapped in a iife, to save the overhead of checking for the native
  // implementation on every invocation.
  var cosh;

  if ('cosh' in Math) {
    // The environment supports the native Math.cosh function, use it…
    cosh = Math.cosh;
  } else {
    // … else, use the reference implementation of MDN:
    cosh = function (x) {
      var y =
      /** @type {Math} */
      Math.exp(x);
      return (y + 1 / y) / 2;
    };
  }

  return cosh;
}();
/**
 * @param {number} x X.
 * @return {number} The smallest power of two greater than or equal to x.
 */


exports.cosh = cosh;

function roundUpToPowerOfTwo(x) {
  (0, _asserts.assert)(0 < x, 29); // `x` must be greater than `0`

  return Math.pow(2, Math.ceil(Math.log(x) / Math.LN2));
}
/**
 * Returns the square of the closest distance between the point (x, y) and the
 * line segment (x1, y1) to (x2, y2).
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */


function squaredSegmentDistance(x, y, x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;

  if (dx !== 0 || dy !== 0) {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      x1 = x2;
      y1 = y2;
    } else if (t > 0) {
      x1 += dx * t;
      y1 += dy * t;
    }
  }

  return squaredDistance(x, y, x1, y1);
}
/**
 * Returns the square of the distance between the points (x1, y1) and (x2, y2).
 * @param {number} x1 X1.
 * @param {number} y1 Y1.
 * @param {number} x2 X2.
 * @param {number} y2 Y2.
 * @return {number} Squared distance.
 */


function squaredDistance(x1, y1, x2, y2) {
  var dx = x2 - x1;
  var dy = y2 - y1;
  return dx * dx + dy * dy;
}
/**
 * Solves system of linear equations using Gaussian elimination method.
 *
 * @param {Array<Array<number>>} mat Augmented matrix (n x n + 1 column)
 *                                     in row-major order.
 * @return {Array<number>} The resulting vector.
 */


function solveLinearSystem(mat) {
  var n = mat.length;

  for (var i = 0; i < n; i++) {
    // Find max in the i-th column (ignoring i - 1 first rows)
    var maxRow = i;
    var maxEl = Math.abs(mat[i][i]);

    for (var r = i + 1; r < n; r++) {
      var absValue = Math.abs(mat[r][i]);

      if (absValue > maxEl) {
        maxEl = absValue;
        maxRow = r;
      }
    }

    if (maxEl === 0) {
      return null; // matrix is singular
    } // Swap max row with i-th (current) row


    var tmp = mat[maxRow];
    mat[maxRow] = mat[i];
    mat[i] = tmp; // Subtract the i-th row to make all the remaining rows 0 in the i-th column

    for (var j = i + 1; j < n; j++) {
      var coef = -mat[j][i] / mat[i][i];

      for (var k = i; k < n + 1; k++) {
        if (i == k) {
          mat[j][k] = 0;
        } else {
          mat[j][k] += coef * mat[i][k];
        }
      }
    }
  } // Solve Ax=b for upper triangular matrix A (mat)


  var x = new Array(n);

  for (var l = n - 1; l >= 0; l--) {
    x[l] = mat[l][n] / mat[l][l];

    for (var m = l - 1; m >= 0; m--) {
      mat[m][n] -= mat[m][l] * x[l];
    }
  }

  return x;
}
/**
 * Converts radians to to degrees.
 *
 * @param {number} angleInRadians Angle in radians.
 * @return {number} Angle in degrees.
 */


function toDegrees(angleInRadians) {
  return angleInRadians * 180 / Math.PI;
}
/**
 * Converts degrees to radians.
 *
 * @param {number} angleInDegrees Angle in degrees.
 * @return {number} Angle in radians.
 */


function toRadians(angleInDegrees) {
  return angleInDegrees * Math.PI / 180;
}
/**
 * Returns the modulo of a / b, depending on the sign of b.
 *
 * @param {number} a Dividend.
 * @param {number} b Divisor.
 * @return {number} Modulo.
 */


function modulo(a, b) {
  var r = a % b;
  return r * b < 0 ? r + b : r;
}
/**
 * Calculates the linearly interpolated value of x between a and b.
 *
 * @param {number} a Number
 * @param {number} b Number
 * @param {number} x Value to be interpolated.
 * @return {number} Interpolated value.
 */


function lerp(a, b, x) {
  return a + x * (b - a);
}
},{"./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/centerconstraint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createExtent = createExtent;
exports.none = none;

var _math = require("./math.js");

/**
 * @module ol/centerconstraint
 */

/**
 * @typedef {function((import("./coordinate.js").Coordinate|undefined)): (import("./coordinate.js").Coordinate|undefined)} Type
 */

/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @return {Type} The constraint.
 */
function createExtent(extent) {
  return (
    /**
     * @param {import("./coordinate.js").Coordinate=} center Center.
     * @return {import("./coordinate.js").Coordinate|undefined} Center.
     */
    function (center) {
      if (center) {
        return [(0, _math.clamp)(center[0], extent[0], extent[2]), (0, _math.clamp)(center[1], extent[1], extent[3])];
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {import("./coordinate.js").Coordinate=} center Center.
 * @return {import("./coordinate.js").Coordinate|undefined} Center.
 */


function none(center) {
  return center;
}
},{"./math.js":"node_modules/ol/math.js"}],"node_modules/ol/ObjectEventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ObjectEventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * Triggered when a property is changed.
   * @event module:ol/Object.ObjectEvent#propertychange
   * @api
   */
  PROPERTYCHANGE: 'propertychange'
};
exports.default = _default;
},{}],"node_modules/ol/obj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.getValues = getValues;
exports.isEmpty = isEmpty;
exports.assign = void 0;

/**
 * @module ol/obj
 */

/**
 * Polyfill for Object.assign().  Assigns enumerable and own properties from
 * one or more source objects to a target object.
 * See https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign.
 *
 * @param {!Object} target The target object.
 * @param {...Object} var_sources The source object(s).
 * @return {!Object} The modified target object.
 */
var assign = typeof Object.assign === 'function' ? Object.assign : function (target, var_sources) {
  var arguments$1 = arguments;

  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object');
  }

  var output = Object(target);

  for (var i = 1, ii = arguments.length; i < ii; ++i) {
    var source = arguments$1[i];

    if (source !== undefined && source !== null) {
      for (var key in source) {
        if (source.hasOwnProperty(key)) {
          output[key] = source[key];
        }
      }
    }
  }

  return output;
};
/**
 * Removes all properties from an object.
 * @param {Object} object The object to clear.
 */

exports.assign = assign;

function clear(object) {
  for (var property in object) {
    delete object[property];
  }
}
/**
 * Get an array of property values from an object.
 * @param {Object<K,V>} object The object from which to get the values.
 * @return {!Array<V>} The property values.
 * @template K,V
 */


function getValues(object) {
  var values = [];

  for (var property in object) {
    values.push(object[property]);
  }

  return values;
}
/**
 * Determine if an object has any properties.
 * @param {Object} object The object to check.
 * @return {boolean} The object is empty.
 */


function isEmpty(object) {
  var property;

  for (property in object) {
    return false;
  }

  return !property;
}
},{}],"node_modules/ol/events.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bindListener = bindListener;
exports.findListener = findListener;
exports.getListeners = getListeners;
exports.listen = listen;
exports.listenOnce = listenOnce;
exports.unlisten = unlisten;
exports.unlistenByKey = unlistenByKey;
exports.unlistenAll = unlistenAll;

var _obj = require("./obj.js");

/**
 * @module ol/events
 */

/**
 * Key to use with {@link module:ol/Observable~Observable#unByKey}.
 * @typedef {Object} EventsKey
 * @property {Object} [bindTo]
 * @property {ListenerFunction} [boundListener]
 * @property {boolean} callOnce
 * @property {number} [deleteIndex]
 * @property {ListenerFunction} listener
 * @property {import("./events/Target.js").EventTargetLike} target
 * @property {string} type
 * @api
 */

/**
 * Listener function. This function is called with an event object as argument.
 * When the function returns `false`, event propagation will stop.
 *
 * @typedef {function((Event|import("./events/Event.js").default)): (void|boolean)} ListenerFunction
 * @api
 */

/**
 * @param {EventsKey} listenerObj Listener object.
 * @return {ListenerFunction} Bound listener.
 */
function bindListener(listenerObj) {
  var boundListener = function (evt) {
    var listener = listenerObj.listener;
    var bindTo = listenerObj.bindTo || listenerObj.target;

    if (listenerObj.callOnce) {
      unlistenByKey(listenerObj);
    }

    return listener.call(bindTo, evt);
  };

  listenerObj.boundListener = boundListener;
  return boundListener;
}
/**
 * Finds the matching {@link module:ol/events~EventsKey} in the given listener
 * array.
 *
 * @param {!Array<!EventsKey>} listeners Array of listeners.
 * @param {!Function} listener The listener function.
 * @param {Object=} opt_this The `this` value inside the listener.
 * @param {boolean=} opt_setDeleteIndex Set the deleteIndex on the matching
 *     listener, for {@link module:ol/events~unlistenByKey}.
 * @return {EventsKey|undefined} The matching listener object.
 */


function findListener(listeners, listener, opt_this, opt_setDeleteIndex) {
  var listenerObj;

  for (var i = 0, ii = listeners.length; i < ii; ++i) {
    listenerObj = listeners[i];

    if (listenerObj.listener === listener && listenerObj.bindTo === opt_this) {
      if (opt_setDeleteIndex) {
        listenerObj.deleteIndex = i;
      }

      return listenerObj;
    }
  }

  return undefined;
}
/**
 * @param {import("./events/Target.js").EventTargetLike} target Target.
 * @param {string} type Type.
 * @return {Array<EventsKey>|undefined} Listeners.
 */


function getListeners(target, type) {
  var listenerMap = getListenerMap(target);
  return listenerMap ? listenerMap[type] : undefined;
}
/**
 * Get the lookup of listeners.
 * @param {Object} target Target.
 * @param {boolean=} opt_create If a map should be created if it doesn't exist.
 * @return {!Object<string, Array<EventsKey>>} Map of
 *     listeners by event type.
 */


function getListenerMap(target, opt_create) {
  var listenerMap = target.ol_lm;

  if (!listenerMap && opt_create) {
    listenerMap = target.ol_lm = {};
  }

  return listenerMap;
}
/**
 * Remove the listener map from a target.
 * @param {Object} target Target.
 */


function removeListenerMap(target) {
  delete target.ol_lm;
}
/**
 * Clean up all listener objects of the given type.  All properties on the
 * listener objects will be removed, and if no listeners remain in the listener
 * map, it will be removed from the target.
 * @param {import("./events/Target.js").EventTargetLike} target Target.
 * @param {string} type Type.
 */


function removeListeners(target, type) {
  var listeners = getListeners(target, type);

  if (listeners) {
    for (var i = 0, ii = listeners.length; i < ii; ++i) {
      /** @type {import("./events/Target.js").default} */
      target.removeEventListener(type, listeners[i].boundListener);
      (0, _obj.clear)(listeners[i]);
    }

    listeners.length = 0;
    var listenerMap = getListenerMap(target);

    if (listenerMap) {
      delete listenerMap[type];

      if (Object.keys(listenerMap).length === 0) {
        removeListenerMap(target);
      }
    }
  }
}
/**
 * Registers an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` to a `this` object, and returns
 * a key for use with {@link module:ol/events~unlistenByKey}.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @param {boolean=} opt_once If true, add the listener as one-off listener.
 * @return {EventsKey} Unique key for the listener.
 */


function listen(target, type, listener, opt_this, opt_once) {
  var listenerMap = getListenerMap(target, true);
  var listeners = listenerMap[type];

  if (!listeners) {
    listeners = listenerMap[type] = [];
  }

  var listenerObj = findListener(listeners, listener, opt_this, false);

  if (listenerObj) {
    if (!opt_once) {
      // Turn one-off listener into a permanent one.
      listenerObj.callOnce = false;
    }
  } else {
    listenerObj =
    /** @type {EventsKey} */
    {
      bindTo: opt_this,
      callOnce: !!opt_once,
      listener: listener,
      target: target,
      type: type
    };
    /** @type {import("./events/Target.js").default} */

    target.addEventListener(type, bindListener(listenerObj));
    listeners.push(listenerObj);
  }

  return listenerObj;
}
/**
 * Registers a one-off event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * This function efficiently binds a `listener` as self-unregistering listener
 * to a `this` object, and returns a key for use with
 * {@link module:ol/events~unlistenByKey} in case the listener needs to be
 * unregistered before it is called.
 *
 * When {@link module:ol/events~listen} is called with the same arguments after this
 * function, the self-unregistering listener will be turned into a permanent
 * listener.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 * @return {EventsKey} Key for unlistenByKey.
 */


function listenOnce(target, type, listener, opt_this) {
  return listen(target, type, listener, opt_this, true);
}
/**
 * Unregisters an event listener on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * To return a listener, this function needs to be called with the exact same
 * arguments that were used for a previous {@link module:ol/events~listen} call.
 *
 * @param {import("./events/Target.js").EventTargetLike} target Event target.
 * @param {string} type Event type.
 * @param {ListenerFunction} listener Listener.
 * @param {Object=} opt_this Object referenced by the `this` keyword in the
 *     listener. Default is the `target`.
 */


function unlisten(target, type, listener, opt_this) {
  var listeners = getListeners(target, type);

  if (listeners) {
    var listenerObj = findListener(listeners, listener, opt_this, true);

    if (listenerObj) {
      unlistenByKey(listenerObj);
    }
  }
}
/**
 * Unregisters event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * The argument passed to this function is the key returned from
 * {@link module:ol/events~listen} or {@link module:ol/events~listenOnce}.
 *
 * @param {EventsKey} key The key.
 */


function unlistenByKey(key) {
  if (key && key.target) {
    /** @type {import("./events/Target.js").default} */
    key.target.removeEventListener(key.type, key.boundListener);
    var listeners = getListeners(key.target, key.type);

    if (listeners) {
      var i = 'deleteIndex' in key ? key.deleteIndex : listeners.indexOf(key);

      if (i !== -1) {
        listeners.splice(i, 1);
      }

      if (listeners.length === 0) {
        removeListeners(key.target, key.type);
      }
    }

    (0, _obj.clear)(key);
  }
}
/**
 * Unregisters all event listeners on an event target. Inspired by
 * https://google.github.io/closure-library/api/source/closure/goog/events/events.js.src.html
 *
 * @param {import("./events/Target.js").EventTargetLike} target Target.
 */


function unlistenAll(target) {
  var listenerMap = getListenerMap(target);

  if (listenerMap) {
    for (var type in listenerMap) {
      removeListeners(target, type);
    }
  }
}
},{"./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/Disposable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/Disposable
 */

/**
 * @classdesc
 * Objects that need to clean up after themselves.
 */
var Disposable = function Disposable() {
  /**
   * The object has already been disposed.
   * @type {boolean}
   * @private
   */
  this.disposed_ = false;
};
/**
 * Clean up.
 */


Disposable.prototype.dispose = function dispose() {
  if (!this.disposed_) {
    this.disposed_ = true;
    this.disposeInternal();
  }
};
/**
 * Extension point for disposable objects.
 * @protected
 */


Disposable.prototype.disposeInternal = function disposeInternal() {};

var _default = Disposable;
exports.default = _default;
},{}],"node_modules/ol/events/Event.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stopPropagation = stopPropagation;
exports.preventDefault = preventDefault;
exports.default = void 0;

/**
 * @module ol/events/Event
 */

/**
 * @classdesc
 * Stripped down implementation of the W3C DOM Level 2 Event interface.
 * See https://www.w3.org/TR/DOM-Level-2-Events/events.html#Events-interface.
 *
 * This implementation only provides `type` and `target` properties, and
 * `stopPropagation` and `preventDefault` methods. It is meant as base class
 * for higher level events defined in the library, and works with
 * {@link module:ol/events/Target~Target}.
 */
var Event = function Event(type) {
  /**
   * @type {boolean}
   */
  this.propagationStopped;
  /**
   * The event type.
   * @type {string}
   * @api
   */

  this.type = type;
  /**
   * The event target.
   * @type {Object}
   * @api
   */

  this.target = null;
};
/**
 * Stop event propagation.
 * @api
 */


Event.prototype.preventDefault = function preventDefault() {
  this.propagationStopped = true;
};
/**
 * Stop event propagation.
 * @api
 */


Event.prototype.stopPropagation = function stopPropagation() {
  this.propagationStopped = true;
};
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function stopPropagation(evt) {
  evt.stopPropagation();
}
/**
 * @param {Event|import("./Event.js").default} evt Event
 */


function preventDefault(evt) {
  evt.preventDefault();
}

var _default = Event;
exports.default = _default;
},{}],"node_modules/ol/events/Target.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Disposable = _interopRequireDefault(require("../Disposable.js"));

var _events = require("../events.js");

var _functions = require("../functions.js");

var _Event = _interopRequireDefault(require("./Event.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/events/Target
 */

/**
 * @typedef {EventTarget|Target} EventTargetLike
 */

/**
 * @classdesc
 * A simplified implementation of the W3C DOM Level 2 EventTarget interface.
 * See https://www.w3.org/TR/2000/REC-DOM-Level-2-Events-20001113/events.html#Events-EventTarget.
 *
 * There are two important simplifications compared to the specification:
 *
 * 1. The handling of `useCapture` in `addEventListener` and
 *    `removeEventListener`. There is no real capture model.
 * 2. The handling of `stopPropagation` and `preventDefault` on `dispatchEvent`.
 *    There is no event target hierarchy. When a listener calls
 *    `stopPropagation` or `preventDefault` on an event object, it means that no
 *    more listeners after this one will be called. Same as when the listener
 *    returns false.
 */
var Target =
/*@__PURE__*/
function (Disposable) {
  function Target() {
    Disposable.call(this);
    /**
     * @private
     * @type {!Object<string, number>}
     */

    this.pendingRemovals_ = {};
    /**
     * @private
     * @type {!Object<string, number>}
     */

    this.dispatching_ = {};
    /**
     * @private
     * @type {!Object<string, Array<import("../events.js").ListenerFunction>>}
     */

    this.listeners_ = {};
  }

  if (Disposable) Target.__proto__ = Disposable;
  Target.prototype = Object.create(Disposable && Disposable.prototype);
  Target.prototype.constructor = Target;
  /**
   * @param {string} type Type.
   * @param {import("../events.js").ListenerFunction} listener Listener.
   */

  Target.prototype.addEventListener = function addEventListener(type, listener) {
    var listeners = this.listeners_[type];

    if (!listeners) {
      listeners = this.listeners_[type] = [];
    }

    if (listeners.indexOf(listener) === -1) {
      listeners.push(listener);
    }
  };
  /**
   * Dispatches an event and calls all listeners listening for events
   * of this type. The event parameter can either be a string or an
   * Object with a `type` property.
   *
   * @param {{type: string,
   *     target: (EventTargetLike|undefined),
   *     propagationStopped: (boolean|undefined)}|
   *     import("./Event.js").default|string} event Event object.
   * @return {boolean|undefined} `false` if anyone called preventDefault on the
   *     event object or if any of the listeners returned false.
   * @api
   */


  Target.prototype.dispatchEvent = function dispatchEvent(event) {
    var evt = typeof event === 'string' ? new _Event.default(event) : event;
    var type = evt.type;
    evt.target = this;
    var listeners = this.listeners_[type];
    var propagate;

    if (listeners) {
      if (!(type in this.dispatching_)) {
        this.dispatching_[type] = 0;
        this.pendingRemovals_[type] = 0;
      }

      ++this.dispatching_[type];

      for (var i = 0, ii = listeners.length; i < ii; ++i) {
        if (listeners[i].call(this, evt) === false || evt.propagationStopped) {
          propagate = false;
          break;
        }
      }

      --this.dispatching_[type];

      if (this.dispatching_[type] === 0) {
        var pendingRemovals = this.pendingRemovals_[type];
        delete this.pendingRemovals_[type];

        while (pendingRemovals--) {
          this.removeEventListener(type, _functions.VOID);
        }

        delete this.dispatching_[type];
      }

      return propagate;
    }
  };
  /**
   * @inheritDoc
   */


  Target.prototype.disposeInternal = function disposeInternal() {
    (0, _events.unlistenAll)(this);
  };
  /**
   * Get the listeners for a specified event type. Listeners are returned in the
   * order that they will be called in.
   *
   * @param {string} type Type.
   * @return {Array<import("../events.js").ListenerFunction>} Listeners.
   */


  Target.prototype.getListeners = function getListeners(type) {
    return this.listeners_[type];
  };
  /**
   * @param {string=} opt_type Type. If not provided,
   *     `true` will be returned if this event target has any listeners.
   * @return {boolean} Has listeners.
   */


  Target.prototype.hasListener = function hasListener(opt_type) {
    return opt_type ? opt_type in this.listeners_ : Object.keys(this.listeners_).length > 0;
  };
  /**
   * @param {string} type Type.
   * @param {import("../events.js").ListenerFunction} listener Listener.
   */


  Target.prototype.removeEventListener = function removeEventListener(type, listener) {
    var listeners = this.listeners_[type];

    if (listeners) {
      var index = listeners.indexOf(listener);

      if (type in this.pendingRemovals_) {
        // make listener a no-op, and remove later in #dispatchEvent()
        listeners[index] = _functions.VOID;
        ++this.pendingRemovals_[type];
      } else {
        listeners.splice(index, 1);

        if (listeners.length === 0) {
          delete this.listeners_[type];
        }
      }
    }
  };

  return Target;
}(_Disposable.default);

var _default = Target;
exports.default = _default;
},{"../Disposable.js":"node_modules/ol/Disposable.js","../events.js":"node_modules/ol/events.js","../functions.js":"node_modules/ol/functions.js","./Event.js":"node_modules/ol/events/Event.js"}],"node_modules/ol/events/EventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/events/EventType
 */

/**
 * @enum {string}
 * @const
 */
var _default = {
  /**
   * Generic change event. Triggered when the revision counter is increased.
   * @event module:ol/events/Event~Event#change
   * @api
   */
  CHANGE: 'change',
  CLEAR: 'clear',
  CONTEXTMENU: 'contextmenu',
  CLICK: 'click',
  DBLCLICK: 'dblclick',
  DRAGENTER: 'dragenter',
  DRAGOVER: 'dragover',
  DROP: 'drop',
  ERROR: 'error',
  KEYDOWN: 'keydown',
  KEYPRESS: 'keypress',
  LOAD: 'load',
  MOUSEDOWN: 'mousedown',
  MOUSEMOVE: 'mousemove',
  MOUSEOUT: 'mouseout',
  MOUSEUP: 'mouseup',
  MOUSEWHEEL: 'mousewheel',
  MSPOINTERDOWN: 'MSPointerDown',
  RESIZE: 'resize',
  TOUCHSTART: 'touchstart',
  TOUCHMOVE: 'touchmove',
  TOUCHEND: 'touchend',
  WHEEL: 'wheel'
};
exports.default = _default;
},{}],"node_modules/ol/Observable.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unByKey = unByKey;
exports.default = void 0;

var _events = require("./events.js");

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/Observable
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * An event target providing convenient methods for listener registration
 * and unregistration. A generic `change` event is always available through
 * {@link module:ol/Observable~Observable#changed}.
 *
 * @fires import("./events/Event.js").Event
 * @api
 */
var Observable =
/*@__PURE__*/
function (EventTarget) {
  function Observable() {
    EventTarget.call(this);
    /**
     * @private
     * @type {number}
     */

    this.revision_ = 0;
  }

  if (EventTarget) Observable.__proto__ = EventTarget;
  Observable.prototype = Object.create(EventTarget && EventTarget.prototype);
  Observable.prototype.constructor = Observable;
  /**
   * Increases the revision counter and dispatches a 'change' event.
   * @api
   */

  Observable.prototype.changed = function changed() {
    ++this.revision_;
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * Get the version number for this object.  Each time the object is modified,
   * its version number will be incremented.
   * @return {number} Revision.
   * @api
   */


  Observable.prototype.getRevision = function getRevision() {
    return this.revision_;
  };
  /**
   * Listen for a certain type of event.
   * @param {string|Array<string>} type The event type or array of event types.
   * @param {function(?): ?} listener The listener function.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
   *     called with an array of event types as the first argument, the return
   *     will be an array of keys.
   * @api
   */


  Observable.prototype.on = function on(type, listener) {
    if (Array.isArray(type)) {
      var len = type.length;
      var keys = new Array(len);

      for (var i = 0; i < len; ++i) {
        keys[i] = (0, _events.listen)(this, type[i], listener);
      }

      return keys;
    } else {
      return (0, _events.listen)(this,
      /** @type {string} */
      type, listener);
    }
  };
  /**
   * Listen once for a certain type of event.
   * @param {string|Array<string>} type The event type or array of event types.
   * @param {function(?): ?} listener The listener function.
   * @return {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} Unique key for the listener. If
   *     called with an array of event types as the first argument, the return
   *     will be an array of keys.
   * @api
   */


  Observable.prototype.once = function once(type, listener) {
    if (Array.isArray(type)) {
      var len = type.length;
      var keys = new Array(len);

      for (var i = 0; i < len; ++i) {
        keys[i] = (0, _events.listenOnce)(this, type[i], listener);
      }

      return keys;
    } else {
      return (0, _events.listenOnce)(this,
      /** @type {string} */
      type, listener);
    }
  };
  /**
   * Unlisten for a certain type of event.
   * @param {string|Array<string>} type The event type or array of event types.
   * @param {function(?): ?} listener The listener function.
   * @api
   */


  Observable.prototype.un = function un(type, listener) {
    if (Array.isArray(type)) {
      for (var i = 0, ii = type.length; i < ii; ++i) {
        (0, _events.unlisten)(this, type[i], listener);
      }

      return;
    } else {
      (0, _events.unlisten)(this,
      /** @type {string} */
      type, listener);
    }
  };

  return Observable;
}(_Target.default);
/**
 * Removes an event listener using the key returned by `on()` or `once()`.
 * @param {import("./events.js").EventsKey|Array<import("./events.js").EventsKey>} key The key returned by `on()`
 *     or `once()` (or an array of keys).
 * @api
 */


function unByKey(key) {
  if (Array.isArray(key)) {
    for (var i = 0, ii = key.length; i < ii; ++i) {
      (0, _events.unlistenByKey)(key[i]);
    }
  } else {
    (0, _events.unlistenByKey)(
    /** @type {import("./events.js").EventsKey} */
    key);
  }
}

var _default = Observable;
exports.default = _default;
},{"./events.js":"node_modules/ol/events.js","./events/Target.js":"node_modules/ol/events/Target.js","./events/EventType.js":"node_modules/ol/events/EventType.js"}],"node_modules/ol/Object.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getChangeEventType = getChangeEventType;
exports.default = exports.ObjectEvent = void 0;

var _util = require("./util.js");

var _ObjectEventType = _interopRequireDefault(require("./ObjectEventType.js"));

var _Observable = _interopRequireDefault(require("./Observable.js"));

var _Event = _interopRequireDefault(require("./events/Event.js"));

var _obj = require("./obj.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/Object
 */

/**
 * @classdesc
 * Events emitted by {@link module:ol/Object~BaseObject} instances are instances of this type.
 */
var ObjectEvent =
/*@__PURE__*/
function (Event) {
  function ObjectEvent(type, key, oldValue) {
    Event.call(this, type);
    /**
     * The name of the property whose value is changing.
     * @type {string}
     * @api
     */

    this.key = key;
    /**
     * The old value. To get the new value use `e.target.get(e.key)` where
     * `e` is the event object.
     * @type {*}
     * @api
     */

    this.oldValue = oldValue;
  }

  if (Event) ObjectEvent.__proto__ = Event;
  ObjectEvent.prototype = Object.create(Event && Event.prototype);
  ObjectEvent.prototype.constructor = ObjectEvent;
  return ObjectEvent;
}(_Event.default);
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Most non-trivial classes inherit from this.
 *
 * This extends {@link module:ol/Observable} with observable
 * properties, where each property is observable as well as the object as a
 * whole.
 *
 * Classes that inherit from this have pre-defined properties, to which you can
 * add your owns. The pre-defined properties are listed in this documentation as
 * 'Observable Properties', and have their own accessors; for example,
 * {@link module:ol/Map~Map} has a `target` property, accessed with
 * `getTarget()` and changed with `setTarget()`. Not all properties are however
 * settable. There are also general-purpose accessors `get()` and `set()`. For
 * example, `get('target')` is equivalent to `getTarget()`.
 *
 * The `set` accessors trigger a change event, and you can monitor this by
 * registering a listener. For example, {@link module:ol/View~View} has a
 * `center` property, so `view.on('change:center', function(evt) {...});` would
 * call the function whenever the value of the center property changes. Within
 * the function, `evt.target` would be the view, so `evt.target.getCenter()`
 * would return the new center.
 *
 * You can add your own observable properties with
 * `object.set('prop', 'value')`, and retrieve that with `object.get('prop')`.
 * You can listen for changes on that property value with
 * `object.on('change:prop', listener)`. You can get a list of all
 * properties with {@link module:ol/Object~BaseObject#getProperties}.
 *
 * Note that the observable properties are separate from standard JS properties.
 * You can, for example, give your map object a title with
 * `map.title='New title'` and with `map.set('title', 'Another title')`. The
 * first will be a `hasOwnProperty`; the second will appear in
 * `getProperties()`. Only the second is observable.
 *
 * Properties can be deleted by using the unset method. E.g.
 * object.unset('foo').
 *
 * @fires ObjectEvent
 * @api
 */


exports.ObjectEvent = ObjectEvent;

var BaseObject =
/*@__PURE__*/
function (Observable) {
  function BaseObject(opt_values) {
    Observable.call(this); // Call {@link module:ol/util~getUid} to ensure that the order of objects' ids is
    // the same as the order in which they were created.  This also helps to
    // ensure that object properties are always added in the same order, which
    // helps many JavaScript engines generate faster code.

    (0, _util.getUid)(this);
    /**
     * @private
     * @type {!Object<string, *>}
     */

    this.values_ = {};

    if (opt_values !== undefined) {
      this.setProperties(opt_values);
    }
  }

  if (Observable) BaseObject.__proto__ = Observable;
  BaseObject.prototype = Object.create(Observable && Observable.prototype);
  BaseObject.prototype.constructor = BaseObject;
  /**
   * Gets a value.
   * @param {string} key Key name.
   * @return {*} Value.
   * @api
   */

  BaseObject.prototype.get = function get(key) {
    var value;

    if (this.values_.hasOwnProperty(key)) {
      value = this.values_[key];
    }

    return value;
  };
  /**
   * Get a list of object property names.
   * @return {Array<string>} List of property names.
   * @api
   */


  BaseObject.prototype.getKeys = function getKeys() {
    return Object.keys(this.values_);
  };
  /**
   * Get an object of all property names and values.
   * @return {Object<string, *>} Object.
   * @api
   */


  BaseObject.prototype.getProperties = function getProperties() {
    return (0, _obj.assign)({}, this.values_);
  };
  /**
   * @param {string} key Key name.
   * @param {*} oldValue Old value.
   */


  BaseObject.prototype.notify = function notify(key, oldValue) {
    var eventType;
    eventType = getChangeEventType(key);
    this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
    eventType = _ObjectEventType.default.PROPERTYCHANGE;
    this.dispatchEvent(new ObjectEvent(eventType, key, oldValue));
  };
  /**
   * Sets a value.
   * @param {string} key Key name.
   * @param {*} value Value.
   * @param {boolean=} opt_silent Update without triggering an event.
   * @api
   */


  BaseObject.prototype.set = function set(key, value, opt_silent) {
    if (opt_silent) {
      this.values_[key] = value;
    } else {
      var oldValue = this.values_[key];
      this.values_[key] = value;

      if (oldValue !== value) {
        this.notify(key, oldValue);
      }
    }
  };
  /**
   * Sets a collection of key-value pairs.  Note that this changes any existing
   * properties and adds new ones (it does not remove any existing properties).
   * @param {Object<string, *>} values Values.
   * @param {boolean=} opt_silent Update without triggering an event.
   * @api
   */


  BaseObject.prototype.setProperties = function setProperties(values, opt_silent) {
    for (var key in values) {
      this.set(key, values[key], opt_silent);
    }
  };
  /**
   * Unsets a property.
   * @param {string} key Key name.
   * @param {boolean=} opt_silent Unset without triggering an event.
   * @api
   */


  BaseObject.prototype.unset = function unset(key, opt_silent) {
    if (key in this.values_) {
      var oldValue = this.values_[key];
      delete this.values_[key];

      if (!opt_silent) {
        this.notify(key, oldValue);
      }
    }
  };

  return BaseObject;
}(_Observable.default);
/**
 * @type {Object<string, string>}
 */


var changeEventTypeCache = {};
/**
 * @param {string} key Key name.
 * @return {string} Change name.
 */

function getChangeEventType(key) {
  return changeEventTypeCache.hasOwnProperty(key) ? changeEventTypeCache[key] : changeEventTypeCache[key] = 'change:' + key;
}

var _default = BaseObject;
exports.default = _default;
},{"./util.js":"node_modules/ol/util.js","./ObjectEventType.js":"node_modules/ol/ObjectEventType.js","./Observable.js":"node_modules/ol/Observable.js","./events/Event.js":"node_modules/ol/events/Event.js","./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/array.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.binarySearch = binarySearch;
exports.numberSafeCompareFunction = numberSafeCompareFunction;
exports.includes = includes;
exports.linearFindNearest = linearFindNearest;
exports.reverseSubArray = reverseSubArray;
exports.extend = extend;
exports.remove = remove;
exports.find = find;
exports.equals = equals;
exports.stableSort = stableSort;
exports.findIndex = findIndex;
exports.isSorted = isSorted;

/**
 * @module ol/array
 */

/**
 * Performs a binary search on the provided sorted list and returns the index of the item if found. If it can't be found it'll return -1.
 * https://github.com/darkskyapp/binary-search
 *
 * @param {Array<*>} haystack Items to search through.
 * @param {*} needle The item to look for.
 * @param {Function=} opt_comparator Comparator function.
 * @return {number} The index of the item if found, -1 if not.
 */
function binarySearch(haystack, needle, opt_comparator) {
  var mid, cmp;
  var comparator = opt_comparator || numberSafeCompareFunction;
  var low = 0;
  var high = haystack.length;
  var found = false;

  while (low < high) {
    /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle);

    if (cmp < 0.0) {
      /* Too low. */
      low = mid + 1;
    } else {
      /* Key found or too high */
      high = mid;
      found = !cmp;
    }
  }
  /* Key not found. */


  return found ? low : ~low;
}
/**
 * Compare function for array sort that is safe for numbers.
 * @param {*} a The first object to be compared.
 * @param {*} b The second object to be compared.
 * @return {number} A negative number, zero, or a positive number as the first
 *     argument is less than, equal to, or greater than the second.
 */


function numberSafeCompareFunction(a, b) {
  return a > b ? 1 : a < b ? -1 : 0;
}
/**
 * Whether the array contains the given object.
 * @param {Array<*>} arr The array to test for the presence of the element.
 * @param {*} obj The object for which to test.
 * @return {boolean} The object is in the array.
 */


function includes(arr, obj) {
  return arr.indexOf(obj) >= 0;
}
/**
 * @param {Array<number>} arr Array.
 * @param {number} target Target.
 * @param {number} direction 0 means return the nearest, > 0
 *    means return the largest nearest, < 0 means return the
 *    smallest nearest.
 * @return {number} Index.
 */


function linearFindNearest(arr, target, direction) {
  var n = arr.length;

  if (arr[0] <= target) {
    return 0;
  } else if (target <= arr[n - 1]) {
    return n - 1;
  } else {
    var i;

    if (direction > 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] < target) {
          return i - 1;
        }
      }
    } else if (direction < 0) {
      for (i = 1; i < n; ++i) {
        if (arr[i] <= target) {
          return i;
        }
      }
    } else {
      for (i = 1; i < n; ++i) {
        if (arr[i] == target) {
          return i;
        } else if (arr[i] < target) {
          if (arr[i - 1] - target < target - arr[i]) {
            return i - 1;
          } else {
            return i;
          }
        }
      }
    }

    return n - 1;
  }
}
/**
 * @param {Array<*>} arr Array.
 * @param {number} begin Begin index.
 * @param {number} end End index.
 */


function reverseSubArray(arr, begin, end) {
  while (begin < end) {
    var tmp = arr[begin];
    arr[begin] = arr[end];
    arr[end] = tmp;
    ++begin;
    --end;
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {!Array<VALUE>|VALUE} data The elements or arrays of elements to add to arr.
 * @template VALUE
 */


function extend(arr, data) {
  var extension = Array.isArray(data) ? data : [data];
  var length = extension.length;

  for (var i = 0; i < length; i++) {
    arr[arr.length] = extension[i];
  }
}
/**
 * @param {Array<VALUE>} arr The array to modify.
 * @param {VALUE} obj The element to remove.
 * @template VALUE
 * @return {boolean} If the element was removed.
 */


function remove(arr, obj) {
  var i = arr.indexOf(obj);
  var found = i > -1;

  if (found) {
    arr.splice(i, 1);
  }

  return found;
}
/**
 * @param {Array<VALUE>} arr The array to search in.
 * @param {function(VALUE, number, ?) : boolean} func The function to compare.
 * @template VALUE
 * @return {VALUE|null} The element found or null.
 */


function find(arr, func) {
  var length = arr.length >>> 0;
  var value;

  for (var i = 0; i < length; i++) {
    value = arr[i];

    if (func(value, i, arr)) {
      return value;
    }
  }

  return null;
}
/**
 * @param {Array|Uint8ClampedArray} arr1 The first array to compare.
 * @param {Array|Uint8ClampedArray} arr2 The second array to compare.
 * @return {boolean} Whether the two arrays are equal.
 */


function equals(arr1, arr2) {
  var len1 = arr1.length;

  if (len1 !== arr2.length) {
    return false;
  }

  for (var i = 0; i < len1; i++) {
    if (arr1[i] !== arr2[i]) {
      return false;
    }
  }

  return true;
}
/**
 * Sort the passed array such that the relative order of equal elements is preverved.
 * See https://en.wikipedia.org/wiki/Sorting_algorithm#Stability for details.
 * @param {Array<*>} arr The array to sort (modifies original).
 * @param {!function(*, *): number} compareFnc Comparison function.
 * @api
 */


function stableSort(arr, compareFnc) {
  var length = arr.length;
  var tmp = Array(arr.length);
  var i;

  for (i = 0; i < length; i++) {
    tmp[i] = {
      index: i,
      value: arr[i]
    };
  }

  tmp.sort(function (a, b) {
    return compareFnc(a.value, b.value) || a.index - b.index;
  });

  for (i = 0; i < arr.length; i++) {
    arr[i] = tmp[i].value;
  }
}
/**
 * @param {Array<*>} arr The array to search in.
 * @param {Function} func Comparison function.
 * @return {number} Return index.
 */


function findIndex(arr, func) {
  var index;
  var found = !arr.every(function (el, idx) {
    index = idx;
    return !func(el, idx, arr);
  });
  return found ? index : -1;
}
/**
 * @param {Array<*>} arr The array to test.
 * @param {Function=} opt_func Comparison function.
 * @param {boolean=} opt_strict Strictly sorted (default false).
 * @return {boolean} Return index.
 */


function isSorted(arr, opt_func, opt_strict) {
  var compare = opt_func || numberSafeCompareFunction;
  return arr.every(function (currentVal, index) {
    if (index === 0) {
      return true;
    }

    var res = compare(arr[index - 1], currentVal);
    return !(res > 0 || opt_strict && res === 0);
  });
}
},{}],"node_modules/ol/resolutionconstraint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSnapToResolutions = createSnapToResolutions;
exports.createSnapToPower = createSnapToPower;

var _array = require("./array.js");

var _math = require("./math.js");

/**
 * @module ol/resolutionconstraint
 */

/**
 * @typedef {function((number|undefined), number, number): (number|undefined)} Type
 */

/**
 * @param {Array<number>} resolutions Resolutions.
 * @return {Type} Zoom function.
 */
function createSnapToResolutions(resolutions) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} delta Delta.
     * @param {number} direction Direction.
     * @return {number|undefined} Resolution.
     */
    function (resolution, delta, direction) {
      if (resolution !== undefined) {
        var z = (0, _array.linearFindNearest)(resolutions, resolution, direction);
        z = (0, _math.clamp)(z + delta, 0, resolutions.length - 1);
        var index = Math.floor(z);

        if (z != index && index < resolutions.length - 1) {
          var power = resolutions[index] / resolutions[index + 1];
          return resolutions[index] / Math.pow(power, z - index);
        } else {
          return resolutions[index];
        }
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number} power Power.
 * @param {number} maxResolution Maximum resolution.
 * @param {number=} opt_maxLevel Maximum level.
 * @return {Type} Zoom function.
 */


function createSnapToPower(power, maxResolution, opt_maxLevel) {
  return (
    /**
     * @param {number|undefined} resolution Resolution.
     * @param {number} delta Delta.
     * @param {number} direction Direction.
     * @return {number|undefined} Resolution.
     */
    function (resolution, delta, direction) {
      if (resolution !== undefined) {
        var offset = -direction / 2 + 0.5;
        var oldLevel = Math.floor(Math.log(maxResolution / resolution) / Math.log(power) + offset);
        var newLevel = Math.max(oldLevel + delta, 0);

        if (opt_maxLevel !== undefined) {
          newLevel = Math.min(newLevel, opt_maxLevel);
        }

        return maxResolution / Math.pow(power, newLevel);
      } else {
        return undefined;
      }
    }
  );
}
},{"./array.js":"node_modules/ol/array.js","./math.js":"node_modules/ol/math.js"}],"node_modules/ol/rotationconstraint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.disable = disable;
exports.none = none;
exports.createSnapToN = createSnapToN;
exports.createSnapToZero = createSnapToZero;

var _math = require("./math.js");

/**
 * @module ol/rotationconstraint
 */

/**
 * @typedef {function((number|undefined), number): (number|undefined)} Type
 */

/**
 * @param {number|undefined} rotation Rotation.
 * @param {number} delta Delta.
 * @return {number|undefined} Rotation.
 */
function disable(rotation, delta) {
  if (rotation !== undefined) {
    return 0;
  } else {
    return undefined;
  }
}
/**
 * @param {number|undefined} rotation Rotation.
 * @param {number} delta Delta.
 * @return {number|undefined} Rotation.
 */


function none(rotation, delta) {
  if (rotation !== undefined) {
    return rotation + delta;
  } else {
    return undefined;
  }
}
/**
 * @param {number} n N.
 * @return {Type} Rotation constraint.
 */


function createSnapToN(n) {
  var theta = 2 * Math.PI / n;
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {number} delta Delta.
     * @return {number|undefined} Rotation.
     */
    function (rotation, delta) {
      if (rotation !== undefined) {
        rotation = Math.floor((rotation + delta) / theta + 0.5) * theta;
        return rotation;
      } else {
        return undefined;
      }
    }
  );
}
/**
 * @param {number=} opt_tolerance Tolerance.
 * @return {Type} Rotation constraint.
 */


function createSnapToZero(opt_tolerance) {
  var tolerance = opt_tolerance || (0, _math.toRadians)(5);
  return (
    /**
     * @param {number|undefined} rotation Rotation.
     * @param {number} delta Delta.
     * @return {number|undefined} Rotation.
     */
    function (rotation, delta) {
      if (rotation !== undefined) {
        if (Math.abs(rotation + delta) <= tolerance) {
          return 0;
        } else {
          return rotation + delta;
        }
      } else {
        return undefined;
      }
    }
  );
}
},{"./math.js":"node_modules/ol/math.js"}],"node_modules/ol/ViewHint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ViewHint
 */

/**
 * @enum {number}
 */
var _default = {
  ANIMATING: 0,
  INTERACTING: 1
};
exports.default = _default;
},{}],"node_modules/ol/ViewProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/ViewProperty
 */

/**
 * @enum {string}
 */
var _default = {
  CENTER: 'center',
  RESOLUTION: 'resolution',
  ROTATION: 'rotation'
};
exports.default = _default;
},{}],"node_modules/ol/string.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.padNumber = padNumber;
exports.compareVersions = compareVersions;

/**
 * @module ol/string
 */

/**
 * @param {number} number Number to be formatted
 * @param {number} width The desired width
 * @param {number=} opt_precision Precision of the output string (i.e. number of decimal places)
 * @returns {string} Formatted string
 */
function padNumber(number, width, opt_precision) {
  var numberString = opt_precision !== undefined ? number.toFixed(opt_precision) : '' + number;
  var decimal = numberString.indexOf('.');
  decimal = decimal === -1 ? numberString.length : decimal;
  return decimal > width ? numberString : new Array(1 + width - decimal).join('0') + numberString;
}
/**
 * Adapted from https://github.com/omichelsen/compare-versions/blob/master/index.js
 * @param {string|number} v1 First version
 * @param {string|number} v2 Second version
 * @returns {number} Value
 */


function compareVersions(v1, v2) {
  var s1 = ('' + v1).split('.');
  var s2 = ('' + v2).split('.');

  for (var i = 0; i < Math.max(s1.length, s2.length); i++) {
    var n1 = parseInt(s1[i] || '0', 10);
    var n2 = parseInt(s2[i] || '0', 10);

    if (n1 > n2) {
      return 1;
    }

    if (n2 > n1) {
      return -1;
    }
  }

  return 0;
}
},{}],"node_modules/ol/coordinate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.closestOnCircle = closestOnCircle;
exports.closestOnSegment = closestOnSegment;
exports.createStringXY = createStringXY;
exports.degreesToStringHDMS = degreesToStringHDMS;
exports.format = format;
exports.equals = equals;
exports.rotate = rotate;
exports.scale = scale;
exports.squaredDistance = squaredDistance;
exports.distance = distance;
exports.squaredDistanceToSegment = squaredDistanceToSegment;
exports.toStringHDMS = toStringHDMS;
exports.toStringXY = toStringXY;

var _math = require("./math.js");

var _string = require("./string.js");

/**
 * @module ol/coordinate
 */

/**
 * An array of numbers representing an xy coordinate. Example: `[16, 48]`.
 * @typedef {Array<number>} Coordinate
 * @api
 */

/**
 * A function that takes a {@link module:ol/coordinate~Coordinate} and
 * transforms it into a `{string}`.
 *
 * @typedef {function((Coordinate|undefined)): string} CoordinateFormat
 * @api
 */

/**
 * Add `delta` to `coordinate`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {add} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     add(coord, [-2, 4]);
 *     // coord is now [5.85, 51.983333]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {Coordinate} delta Delta.
 * @return {Coordinate} The input coordinate adjusted by
 * the given delta.
 * @api
 */
function add(coordinate, delta) {
  coordinate[0] += delta[0];
  coordinate[1] += delta[1];
  return coordinate;
}
/**
 * Calculates the point closest to the passed coordinate on the passed circle.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {import("./geom/Circle.js").default} circle The circle.
 * @return {Coordinate} Closest point on the circumference.
 */


function closestOnCircle(coordinate, circle) {
  var r = circle.getRadius();
  var center = circle.getCenter();
  var x0 = center[0];
  var y0 = center[1];
  var x1 = coordinate[0];
  var y1 = coordinate[1];
  var dx = x1 - x0;
  var dy = y1 - y0;

  if (dx === 0 && dy === 0) {
    dx = 1;
  }

  var d = Math.sqrt(dx * dx + dy * dy);
  var x = x0 + r * dx / d;
  var y = y0 + r * dy / d;
  return [x, y];
}
/**
 * Calculates the point closest to the passed coordinate on the passed segment.
 * This is the foot of the perpendicular of the coordinate to the segment when
 * the foot is on the segment, or the closest segment coordinate when the foot
 * is outside the segment.
 *
 * @param {Coordinate} coordinate The coordinate.
 * @param {Array<Coordinate>} segment The two coordinates
 * of the segment.
 * @return {Coordinate} The foot of the perpendicular of
 * the coordinate to the segment.
 */


function closestOnSegment(coordinate, segment) {
  var x0 = coordinate[0];
  var y0 = coordinate[1];
  var start = segment[0];
  var end = segment[1];
  var x1 = start[0];
  var y1 = start[1];
  var x2 = end[0];
  var y2 = end[1];
  var dx = x2 - x1;
  var dy = y2 - y1;
  var along = dx === 0 && dy === 0 ? 0 : (dx * (x0 - x1) + dy * (y0 - y1)) / (dx * dx + dy * dy || 0);
  var x, y;

  if (along <= 0) {
    x = x1;
    y = y1;
  } else if (along >= 1) {
    x = x2;
    y = y2;
  } else {
    x = x1 + along * dx;
    y = y1 + along * dy;
  }

  return [x, y];
}
/**
 * Returns a {@link module:ol/coordinate~CoordinateFormat} function that can be
 * used to format
 * a {Coordinate} to a string.
 *
 * Example without specifying the fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY();
 *     var out = stringifyFunc(coord);
 *     // out is now '8, 48'
 *
 * Example with explicitly specifying 2 fractional digits:
 *
 *     import {createStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var stringifyFunc = createStringXY(2);
 *     var out = stringifyFunc(coord);
 *     // out is now '7.85, 47.98'
 *
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {CoordinateFormat} Coordinate format.
 * @api
 */


function createStringXY(opt_fractionDigits) {
  return (
    /**
     * @param {Coordinate} coordinate Coordinate.
     * @return {string} String XY.
     */
    function (coordinate) {
      return toStringXY(coordinate, opt_fractionDigits);
    }
  );
}
/**
 * @param {string} hemispheres Hemispheres.
 * @param {number} degrees Degrees.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} String.
 */


function degreesToStringHDMS(hemispheres, degrees, opt_fractionDigits) {
  var normalizedDegrees = (0, _math.modulo)(degrees + 180, 360) - 180;
  var x = Math.abs(3600 * normalizedDegrees);
  var dflPrecision = opt_fractionDigits || 0;
  var precision = Math.pow(10, dflPrecision);
  var deg = Math.floor(x / 3600);
  var min = Math.floor((x - deg * 3600) / 60);
  var sec = x - deg * 3600 - min * 60;
  sec = Math.ceil(sec * precision) / precision;

  if (sec >= 60) {
    sec = 0;
    min += 1;
  }

  if (min >= 60) {
    min = 0;
    deg += 1;
  }

  return deg + '\u00b0 ' + (0, _string.padNumber)(min, 2) + '\u2032 ' + (0, _string.padNumber)(sec, 2, dflPrecision) + '\u2033' + (normalizedDegrees == 0 ? '' : ' ' + hemispheres.charAt(normalizedDegrees < 0 ? 1 : 0));
}
/**
 * Transforms the given {@link module:ol/coordinate~Coordinate} to a string
 * using the given string template. The strings `{x}` and `{y}` in the template
 * will be replaced with the first and second coordinate values respectively.
 *
 * Example without specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template);
 *     // out is now 'Coordinate is (8|48).'
 *
 * Example explicitly specifying the fractional digits:
 *
 *     import {format} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var template = 'Coordinate is ({x}|{y}).';
 *     var out = format(coord, template, 2);
 *     // out is now 'Coordinate is (7.85|47.98).'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {string} template A template string with `{x}` and `{y}` placeholders
 *     that will be replaced by first and second coordinate values.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Formatted coordinate.
 * @api
 */


function format(coordinate, template, opt_fractionDigits) {
  if (coordinate) {
    return template.replace('{x}', coordinate[0].toFixed(opt_fractionDigits)).replace('{y}', coordinate[1].toFixed(opt_fractionDigits));
  } else {
    return '';
  }
}
/**
 * @param {Coordinate} coordinate1 First coordinate.
 * @param {Coordinate} coordinate2 Second coordinate.
 * @return {boolean} The two coordinates are equal.
 */


function equals(coordinate1, coordinate2) {
  var equals = true;

  for (var i = coordinate1.length - 1; i >= 0; --i) {
    if (coordinate1[i] != coordinate2[i]) {
      equals = false;
      break;
    }
  }

  return equals;
}
/**
 * Rotate `coordinate` by `angle`. `coordinate` is modified in place and
 * returned by the function.
 *
 * Example:
 *
 *     import {rotate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var rotateRadians = Math.PI / 2; // 90 degrees
 *     rotate(coord, rotateRadians);
 *     // coord is now [-47.983333, 7.85]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} angle Angle in radian.
 * @return {Coordinate} Coordinate.
 * @api
 */


function rotate(coordinate, angle) {
  var cosAngle = Math.cos(angle);
  var sinAngle = Math.sin(angle);
  var x = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
  var y = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
  coordinate[0] = x;
  coordinate[1] = y;
  return coordinate;
}
/**
 * Scale `coordinate` by `scale`. `coordinate` is modified in place and returned
 * by the function.
 *
 * Example:
 *
 *     import {scale as scaleCoordinate} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var scale = 1.2;
 *     scaleCoordinate(coord, scale);
 *     // coord is now [9.42, 57.5799996]
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number} scale Scale factor.
 * @return {Coordinate} Coordinate.
 */


function scale(coordinate, scale) {
  coordinate[0] *= scale;
  coordinate[1] *= scale;
  return coordinate;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Squared distance between coord1 and coord2.
 */


function squaredDistance(coord1, coord2) {
  var dx = coord1[0] - coord2[0];
  var dy = coord1[1] - coord2[1];
  return dx * dx + dy * dy;
}
/**
 * @param {Coordinate} coord1 First coordinate.
 * @param {Coordinate} coord2 Second coordinate.
 * @return {number} Distance between coord1 and coord2.
 */


function distance(coord1, coord2) {
  return Math.sqrt(squaredDistance(coord1, coord2));
}
/**
 * Calculate the squared distance from a coordinate to a line segment.
 *
 * @param {Coordinate} coordinate Coordinate of the point.
 * @param {Array<Coordinate>} segment Line segment (2
 * coordinates).
 * @return {number} Squared distance from the point to the line segment.
 */


function squaredDistanceToSegment(coordinate, segment) {
  return squaredDistance(coordinate, closestOnSegment(coordinate, segment));
}
/**
 * Format a geographic coordinate with the hemisphere, degrees, minutes, and
 * seconds.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord);
 *     // out is now '47° 58′ 60″ N 7° 50′ 60″ E'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringHDMS} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringHDMS(coord, 1);
 *     // out is now '47° 58′ 60.0″ N 7° 50′ 60.0″ E'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} Hemisphere, degrees, minutes and seconds.
 * @api
 */


function toStringHDMS(coordinate, opt_fractionDigits) {
  if (coordinate) {
    return degreesToStringHDMS('NS', coordinate[1], opt_fractionDigits) + ' ' + degreesToStringHDMS('EW', coordinate[0], opt_fractionDigits);
  } else {
    return '';
  }
}
/**
 * Format a coordinate as a comma delimited string.
 *
 * Example without specifying fractional digits:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord);
 *     // out is now '8, 48'
 *
 * Example explicitly specifying 1 fractional digit:
 *
 *     import {toStringXY} from 'ol/coordinate';
 *
 *     var coord = [7.85, 47.983333];
 *     var out = toStringXY(coord, 1);
 *     // out is now '7.8, 48.0'
 *
 * @param {Coordinate} coordinate Coordinate.
 * @param {number=} opt_fractionDigits The number of digits to include
 *    after the decimal point. Default is `0`.
 * @return {string} XY.
 * @api
 */


function toStringXY(coordinate, opt_fractionDigits) {
  return format(coordinate, '{x}, {y}', opt_fractionDigits);
}
},{"./math.js":"node_modules/ol/math.js","./string.js":"node_modules/ol/string.js"}],"node_modules/ol/easing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.easeIn = easeIn;
exports.easeOut = easeOut;
exports.inAndOut = inAndOut;
exports.linear = linear;
exports.upAndDown = upAndDown;

/**
 * @module ol/easing
 */

/**
 * Start slow and speed up.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */
function easeIn(t) {
  return Math.pow(t, 3);
}
/**
 * Start fast and slow down.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function easeOut(t) {
  return 1 - easeIn(1 - t);
}
/**
 * Start slow, speed up, and then slow down again.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function inAndOut(t) {
  return 3 * t * t - 2 * t * t * t;
}
/**
 * Maintain a constant speed over time.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function linear(t) {
  return t;
}
/**
 * Start slow, speed up, and at the very end slow down again.  This has the
 * same general behavior as {@link module:ol/easing~inAndOut}, but the final
 * slowdown is delayed.
 * @param {number} t Input between 0 and 1.
 * @return {number} Output between 0 and 1.
 * @api
 */


function upAndDown(t) {
  if (t < 0.5) {
    return inAndOut(2 * t);
  } else {
    return 1 - inAndOut(2 * (t - 0.5));
  }
}
},{}],"node_modules/ol/extent/Corner.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/extent/Corner
 */

/**
 * Extent corner.
 * @enum {string}
 */
var _default = {
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right'
};
exports.default = _default;
},{}],"node_modules/ol/extent/Relationship.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/extent/Relationship
 */

/**
 * Relationship to an extent.
 * @enum {number}
 */
var _default = {
  UNKNOWN: 0,
  INTERSECTING: 1,
  ABOVE: 2,
  RIGHT: 4,
  BELOW: 8,
  LEFT: 16
};
exports.default = _default;
},{}],"node_modules/ol/extent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.boundingExtent = boundingExtent;
exports.buffer = buffer;
exports.clone = clone;
exports.closestSquaredDistanceXY = closestSquaredDistanceXY;
exports.containsCoordinate = containsCoordinate;
exports.containsExtent = containsExtent;
exports.containsXY = containsXY;
exports.coordinateRelationship = coordinateRelationship;
exports.createEmpty = createEmpty;
exports.createOrUpdate = createOrUpdate;
exports.createOrUpdateEmpty = createOrUpdateEmpty;
exports.createOrUpdateFromCoordinate = createOrUpdateFromCoordinate;
exports.createOrUpdateFromCoordinates = createOrUpdateFromCoordinates;
exports.createOrUpdateFromFlatCoordinates = createOrUpdateFromFlatCoordinates;
exports.createOrUpdateFromRings = createOrUpdateFromRings;
exports.equals = equals;
exports.extend = extend;
exports.extendCoordinate = extendCoordinate;
exports.extendCoordinates = extendCoordinates;
exports.extendFlatCoordinates = extendFlatCoordinates;
exports.extendRings = extendRings;
exports.extendXY = extendXY;
exports.forEachCorner = forEachCorner;
exports.getArea = getArea;
exports.getBottomLeft = getBottomLeft;
exports.getBottomRight = getBottomRight;
exports.getCenter = getCenter;
exports.getCorner = getCorner;
exports.getEnlargedArea = getEnlargedArea;
exports.getForViewAndSize = getForViewAndSize;
exports.getHeight = getHeight;
exports.getIntersectionArea = getIntersectionArea;
exports.getIntersection = getIntersection;
exports.getMargin = getMargin;
exports.getSize = getSize;
exports.getTopLeft = getTopLeft;
exports.getTopRight = getTopRight;
exports.getWidth = getWidth;
exports.intersects = intersects;
exports.isEmpty = isEmpty;
exports.returnOrUpdate = returnOrUpdate;
exports.scaleFromCenter = scaleFromCenter;
exports.intersectsSegment = intersectsSegment;
exports.applyTransform = applyTransform;

var _asserts = require("./asserts.js");

var _Corner = _interopRequireDefault(require("./extent/Corner.js"));

var _Relationship = _interopRequireDefault(require("./extent/Relationship.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/extent
 */

/**
 * An array of numbers representing an extent: `[minx, miny, maxx, maxy]`.
 * @typedef {Array<number>} Extent
 * @api
 */

/**
 * Build an extent that includes all given coordinates.
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Bounding extent.
 * @api
 */
function boundingExtent(coordinates) {
  var extent = createEmpty();

  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Array<number>} xs Xs.
 * @param {Array<number>} ys Ys.
 * @param {Extent=} opt_extent Destination extent.
 * @private
 * @return {Extent} Extent.
 */


function _boundingExtentXYs(xs, ys, opt_extent) {
  var minX = Math.min.apply(null, xs);
  var minY = Math.min.apply(null, ys);
  var maxX = Math.max.apply(null, xs);
  var maxY = Math.max.apply(null, ys);
  return createOrUpdate(minX, minY, maxX, maxY, opt_extent);
}
/**
 * Return extent increased by the provided value.
 * @param {Extent} extent Extent.
 * @param {number} value The amount by which the extent should be buffered.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 * @api
 */


function buffer(extent, value, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0] - value;
    opt_extent[1] = extent[1] - value;
    opt_extent[2] = extent[2] + value;
    opt_extent[3] = extent[3] + value;
    return opt_extent;
  } else {
    return [extent[0] - value, extent[1] - value, extent[2] + value, extent[3] + value];
  }
}
/**
 * Creates a clone of an extent.
 *
 * @param {Extent} extent Extent to clone.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} The clone.
 */


function clone(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent.slice();
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {number} Closest squared distance.
 */


function closestSquaredDistanceXY(extent, x, y) {
  var dx, dy;

  if (x < extent[0]) {
    dx = extent[0] - x;
  } else if (extent[2] < x) {
    dx = x - extent[2];
  } else {
    dx = 0;
  }

  if (y < extent[1]) {
    dy = extent[1] - y;
  } else if (extent[3] < y) {
    dy = y - extent[3];
  } else {
    dy = 0;
  }

  return dx * dx + dy * dy;
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @return {boolean} The coordinate is contained in the extent.
 * @api
 */


function containsCoordinate(extent, coordinate) {
  return containsXY(extent, coordinate[0], coordinate[1]);
}
/**
 * Check if one extent contains another.
 *
 * An extent is deemed contained if it lies completely within the other extent,
 * including if they share one or more edges.
 *
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The second extent is contained by or on the edge of the
 *     first.
 * @api
 */


function containsExtent(extent1, extent2) {
  return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
}
/**
 * Check if the passed coordinate is contained or on the edge of the extent.
 *
 * @param {Extent} extent Extent.
 * @param {number} x X coordinate.
 * @param {number} y Y coordinate.
 * @return {boolean} The x, y values are contained in the extent.
 * @api
 */


function containsXY(extent, x, y) {
  return extent[0] <= x && x <= extent[2] && extent[1] <= y && y <= extent[3];
}
/**
 * Get the relationship between a coordinate and extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} coordinate The coordinate.
 * @return {Relationship} The relationship (bitwise compare with
 *     import("./extent/Relationship.js").Relationship).
 */


function coordinateRelationship(extent, coordinate) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var x = coordinate[0];
  var y = coordinate[1];
  var relationship = _Relationship.default.UNKNOWN;

  if (x < minX) {
    relationship = relationship | _Relationship.default.LEFT;
  } else if (x > maxX) {
    relationship = relationship | _Relationship.default.RIGHT;
  }

  if (y < minY) {
    relationship = relationship | _Relationship.default.BELOW;
  } else if (y > maxY) {
    relationship = relationship | _Relationship.default.ABOVE;
  }

  if (relationship === _Relationship.default.UNKNOWN) {
    relationship = _Relationship.default.INTERSECTING;
  }

  return relationship;
}
/**
 * Create an empty extent.
 * @return {Extent} Empty extent.
 * @api
 */


function createEmpty() {
  return [Infinity, Infinity, -Infinity, -Infinity];
}
/**
 * Create a new extent or update the provided extent.
 * @param {number} minX Minimum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxX Maximum X.
 * @param {number} maxY Maximum Y.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */


function createOrUpdate(minX, minY, maxX, maxY, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = minX;
    opt_extent[1] = minY;
    opt_extent[2] = maxX;
    opt_extent[3] = maxY;
    return opt_extent;
  } else {
    return [minX, minY, maxX, maxY];
  }
}
/**
 * Create a new empty extent or make the provided one empty.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateEmpty(opt_extent) {
  return createOrUpdate(Infinity, Infinity, -Infinity, -Infinity, opt_extent);
}
/**
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromCoordinate(coordinate, opt_extent) {
  var x = coordinate[0];
  var y = coordinate[1];
  return createOrUpdate(x, y, x, y, opt_extent);
}
/**
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromCoordinates(coordinates, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendCoordinates(extent, coordinates);
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromFlatCoordinates(flatCoordinates, offset, end, stride, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendFlatCoordinates(extent, flatCoordinates, offset, end, stride);
}
/**
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function createOrUpdateFromRings(rings, opt_extent) {
  var extent = createOrUpdateEmpty(opt_extent);
  return extendRings(extent, rings);
}
/**
 * Determine if two extents are equivalent.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {boolean} The two extents are equivalent.
 * @api
 */


function equals(extent1, extent2) {
  return extent1[0] == extent2[0] && extent1[2] == extent2[2] && extent1[1] == extent2[1] && extent1[3] == extent2[3];
}
/**
 * Modify an extent to include another extent.
 * @param {Extent} extent1 The extent to be modified.
 * @param {Extent} extent2 The extent that will be included in the first.
 * @return {Extent} A reference to the first (extended) extent.
 * @api
 */


function extend(extent1, extent2) {
  if (extent2[0] < extent1[0]) {
    extent1[0] = extent2[0];
  }

  if (extent2[2] > extent1[2]) {
    extent1[2] = extent2[2];
  }

  if (extent2[1] < extent1[1]) {
    extent1[1] = extent2[1];
  }

  if (extent2[3] > extent1[3]) {
    extent1[3] = extent2[3];
  }

  return extent1;
}
/**
 * @param {Extent} extent Extent.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 */


function extendCoordinate(extent, coordinate) {
  if (coordinate[0] < extent[0]) {
    extent[0] = coordinate[0];
  }

  if (coordinate[0] > extent[2]) {
    extent[2] = coordinate[0];
  }

  if (coordinate[1] < extent[1]) {
    extent[1] = coordinate[1];
  }

  if (coordinate[1] > extent[3]) {
    extent[3] = coordinate[1];
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates Coordinates.
 * @return {Extent} Extent.
 */


function extendCoordinates(extent, coordinates) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    extendCoordinate(extent, coordinates[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {Extent} Extent.
 */


function extendFlatCoordinates(extent, flatCoordinates, offset, end, stride) {
  for (; offset < end; offset += stride) {
    extendXY(extent, flatCoordinates[offset], flatCoordinates[offset + 1]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {Array<Array<import("./coordinate.js").Coordinate>>} rings Rings.
 * @return {Extent} Extent.
 */


function extendRings(extent, rings) {
  for (var i = 0, ii = rings.length; i < ii; ++i) {
    extendCoordinates(extent, rings[i]);
  }

  return extent;
}
/**
 * @param {Extent} extent Extent.
 * @param {number} x X.
 * @param {number} y Y.
 */


function extendXY(extent, x, y) {
  extent[0] = Math.min(extent[0], x);
  extent[1] = Math.min(extent[1], y);
  extent[2] = Math.max(extent[2], x);
  extent[3] = Math.max(extent[3], y);
}
/**
 * This function calls `callback` for each corner of the extent. If the
 * callback returns a truthy value the function returns that value
 * immediately. Otherwise the function returns `false`.
 * @param {Extent} extent Extent.
 * @param {function(this:T, import("./coordinate.js").Coordinate): S} callback Callback.
 * @param {T=} opt_this Value to use as `this` when executing `callback`.
 * @return {S|boolean} Value.
 * @template S, T
 */


function forEachCorner(extent, callback, opt_this) {
  var val;
  val = callback.call(opt_this, getBottomLeft(extent));

  if (val) {
    return val;
  }

  val = callback.call(opt_this, getBottomRight(extent));

  if (val) {
    return val;
  }

  val = callback.call(opt_this, getTopRight(extent));

  if (val) {
    return val;
  }

  val = callback.call(opt_this, getTopLeft(extent));

  if (val) {
    return val;
  }

  return false;
}
/**
 * Get the size of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Area.
 * @api
 */


function getArea(extent) {
  var area = 0;

  if (!isEmpty(extent)) {
    area = getWidth(extent) * getHeight(extent);
  }

  return area;
}
/**
 * Get the bottom left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom left coordinate.
 * @api
 */


function getBottomLeft(extent) {
  return [extent[0], extent[1]];
}
/**
 * Get the bottom right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Bottom right coordinate.
 * @api
 */


function getBottomRight(extent) {
  return [extent[2], extent[1]];
}
/**
 * Get the center coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Center.
 * @api
 */


function getCenter(extent) {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
}
/**
 * Get a corner coordinate of an extent.
 * @param {Extent} extent Extent.
 * @param {Corner} corner Corner.
 * @return {import("./coordinate.js").Coordinate} Corner coordinate.
 */


function getCorner(extent, corner) {
  var coordinate;

  if (corner === _Corner.default.BOTTOM_LEFT) {
    coordinate = getBottomLeft(extent);
  } else if (corner === _Corner.default.BOTTOM_RIGHT) {
    coordinate = getBottomRight(extent);
  } else if (corner === _Corner.default.TOP_LEFT) {
    coordinate = getTopLeft(extent);
  } else if (corner === _Corner.default.TOP_RIGHT) {
    coordinate = getTopRight(extent);
  } else {
    (0, _asserts.assert)(false, 13); // Invalid corner
  }

  return coordinate;
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Enlarged area.
 */


function getEnlargedArea(extent1, extent2) {
  var minX = Math.min(extent1[0], extent2[0]);
  var minY = Math.min(extent1[1], extent2[1]);
  var maxX = Math.max(extent1[2], extent2[2]);
  var maxY = Math.max(extent1[3], extent2[3]);
  return (maxX - minX) * (maxY - minY);
}
/**
 * @param {import("./coordinate.js").Coordinate} center Center.
 * @param {number} resolution Resolution.
 * @param {number} rotation Rotation.
 * @param {import("./size.js").Size} size Size.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 */


function getForViewAndSize(center, resolution, rotation, size, opt_extent) {
  var dx = resolution * size[0] / 2;
  var dy = resolution * size[1] / 2;
  var cosRotation = Math.cos(rotation);
  var sinRotation = Math.sin(rotation);
  var xCos = dx * cosRotation;
  var xSin = dx * sinRotation;
  var yCos = dy * cosRotation;
  var ySin = dy * sinRotation;
  var x = center[0];
  var y = center[1];
  var x0 = x - xCos + ySin;
  var x1 = x - xCos - ySin;
  var x2 = x + xCos - ySin;
  var x3 = x + xCos + ySin;
  var y0 = y - xSin - yCos;
  var y1 = y - xSin + yCos;
  var y2 = y + xSin + yCos;
  var y3 = y + xSin - yCos;
  return createOrUpdate(Math.min(x0, x1, x2, x3), Math.min(y0, y1, y2, y3), Math.max(x0, x1, x2, x3), Math.max(y0, y1, y2, y3), opt_extent);
}
/**
 * Get the height of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Height.
 * @api
 */


function getHeight(extent) {
  return extent[3] - extent[1];
}
/**
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @return {number} Intersection area.
 */


function getIntersectionArea(extent1, extent2) {
  var intersection = getIntersection(extent1, extent2);
  return getArea(intersection);
}
/**
 * Get the intersection of two extents.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent 2.
 * @param {Extent=} opt_extent Optional extent to populate with intersection.
 * @return {Extent} Intersecting extent.
 * @api
 */


function getIntersection(extent1, extent2, opt_extent) {
  var intersection = opt_extent ? opt_extent : createEmpty();

  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }

    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }

    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }

    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  } else {
    createOrUpdateEmpty(intersection);
  }

  return intersection;
}
/**
 * @param {Extent} extent Extent.
 * @return {number} Margin.
 */


function getMargin(extent) {
  return getWidth(extent) + getHeight(extent);
}
/**
 * Get the size (width, height) of an extent.
 * @param {Extent} extent The extent.
 * @return {import("./size.js").Size} The extent size.
 * @api
 */


function getSize(extent) {
  return [extent[2] - extent[0], extent[3] - extent[1]];
}
/**
 * Get the top left coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top left coordinate.
 * @api
 */


function getTopLeft(extent) {
  return [extent[0], extent[3]];
}
/**
 * Get the top right coordinate of an extent.
 * @param {Extent} extent Extent.
 * @return {import("./coordinate.js").Coordinate} Top right coordinate.
 * @api
 */


function getTopRight(extent) {
  return [extent[2], extent[3]];
}
/**
 * Get the width of an extent.
 * @param {Extent} extent Extent.
 * @return {number} Width.
 * @api
 */


function getWidth(extent) {
  return extent[2] - extent[0];
}
/**
 * Determine if one extent intersects another.
 * @param {Extent} extent1 Extent 1.
 * @param {Extent} extent2 Extent.
 * @return {boolean} The two extents intersect.
 * @api
 */


function intersects(extent1, extent2) {
  return extent1[0] <= extent2[2] && extent1[2] >= extent2[0] && extent1[1] <= extent2[3] && extent1[3] >= extent2[1];
}
/**
 * Determine if an extent is empty.
 * @param {Extent} extent Extent.
 * @return {boolean} Is empty.
 * @api
 */


function isEmpty(extent) {
  return extent[2] < extent[0] || extent[3] < extent[1];
}
/**
 * @param {Extent} extent Extent.
 * @param {Extent=} opt_extent Extent.
 * @return {Extent} Extent.
 */


function returnOrUpdate(extent, opt_extent) {
  if (opt_extent) {
    opt_extent[0] = extent[0];
    opt_extent[1] = extent[1];
    opt_extent[2] = extent[2];
    opt_extent[3] = extent[3];
    return opt_extent;
  } else {
    return extent;
  }
}
/**
 * @param {Extent} extent Extent.
 * @param {number} value Value.
 */


function scaleFromCenter(extent, value) {
  var deltaX = (extent[2] - extent[0]) / 2 * (value - 1);
  var deltaY = (extent[3] - extent[1]) / 2 * (value - 1);
  extent[0] -= deltaX;
  extent[2] += deltaX;
  extent[1] -= deltaY;
  extent[3] += deltaY;
}
/**
 * Determine if the segment between two coordinates intersects (crosses,
 * touches, or is contained by) the provided extent.
 * @param {Extent} extent The extent.
 * @param {import("./coordinate.js").Coordinate} start Segment start coordinate.
 * @param {import("./coordinate.js").Coordinate} end Segment end coordinate.
 * @return {boolean} The segment intersects the extent.
 */


function intersectsSegment(extent, start, end) {
  var intersects = false;
  var startRel = coordinateRelationship(extent, start);
  var endRel = coordinateRelationship(extent, end);

  if (startRel === _Relationship.default.INTERSECTING || endRel === _Relationship.default.INTERSECTING) {
    intersects = true;
  } else {
    var minX = extent[0];
    var minY = extent[1];
    var maxX = extent[2];
    var maxY = extent[3];
    var startX = start[0];
    var startY = start[1];
    var endX = end[0];
    var endY = end[1];
    var slope = (endY - startY) / (endX - startX);
    var x, y;

    if (!!(endRel & _Relationship.default.ABOVE) && !(startRel & _Relationship.default.ABOVE)) {
      // potentially intersects top
      x = endX - (endY - maxY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _Relationship.default.RIGHT) && !(startRel & _Relationship.default.RIGHT)) {
      // potentially intersects right
      y = endY - (endX - maxX) * slope;
      intersects = y >= minY && y <= maxY;
    }

    if (!intersects && !!(endRel & _Relationship.default.BELOW) && !(startRel & _Relationship.default.BELOW)) {
      // potentially intersects bottom
      x = endX - (endY - minY) / slope;
      intersects = x >= minX && x <= maxX;
    }

    if (!intersects && !!(endRel & _Relationship.default.LEFT) && !(startRel & _Relationship.default.LEFT)) {
      // potentially intersects left
      y = endY - (endX - minX) * slope;
      intersects = y >= minY && y <= maxY;
    }
  }

  return intersects;
}
/**
 * Apply a transform function to the extent.
 * @param {Extent} extent Extent.
 * @param {import("./proj.js").TransformFunction} transformFn Transform function.
 * Called with `[minX, minY, maxX, maxY]` extent coordinates.
 * @param {Extent=} opt_extent Destination extent.
 * @return {Extent} Extent.
 * @api
 */


function applyTransform(extent, transformFn, opt_extent) {
  var coordinates = [extent[0], extent[1], extent[0], extent[3], extent[2], extent[1], extent[2], extent[3]];
  transformFn(coordinates, coordinates, 2);
  var xs = [coordinates[0], coordinates[2], coordinates[4], coordinates[6]];
  var ys = [coordinates[1], coordinates[3], coordinates[5], coordinates[7]];
  return _boundingExtentXYs(xs, ys, opt_extent);
}
},{"./asserts.js":"node_modules/ol/asserts.js","./extent/Corner.js":"node_modules/ol/extent/Corner.js","./extent/Relationship.js":"node_modules/ol/extent/Relationship.js"}],"node_modules/ol/geom/GeometryType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/geom/GeometryType
 */

/**
 * The geometry type. One of `'Point'`, `'LineString'`, `'LinearRing'`,
 * `'Polygon'`, `'MultiPoint'`, `'MultiLineString'`, `'MultiPolygon'`,
 * `'GeometryCollection'`, `'Circle'`.
 * @enum {string}
 */
var _default = {
  POINT: 'Point',
  LINE_STRING: 'LineString',
  LINEAR_RING: 'LinearRing',
  POLYGON: 'Polygon',
  MULTI_POINT: 'MultiPoint',
  MULTI_LINE_STRING: 'MultiLineString',
  MULTI_POLYGON: 'MultiPolygon',
  GEOMETRY_COLLECTION: 'GeometryCollection',
  CIRCLE: 'Circle'
};
exports.default = _default;
},{}],"node_modules/ol/geom/GeometryLayout.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/geom/GeometryLayout
 */

/**
 * The coordinate layout for geometries, indicating whether a 3rd or 4th z ('Z')
 * or measure ('M') coordinate is available. Supported values are `'XY'`,
 * `'XYZ'`, `'XYM'`, `'XYZM'`.
 * @enum {string}
 */
var _default = {
  XY: 'XY',
  XYZ: 'XYZ',
  XYM: 'XYM',
  XYZM: 'XYZM'
};
exports.default = _default;
},{}],"node_modules/ol/geom/flat/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transform2D = transform2D;
exports.rotate = rotate;
exports.scale = scale;
exports.translate = translate;

/**
 * @module ol/geom/flat/transform
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../transform.js").Transform} transform Transform.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */
function transform2D(flatCoordinates, offset, end, stride, transform, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var x = flatCoordinates[j];
    var y = flatCoordinates[j + 1];
    dest[i++] = transform[0] * x + transform[2] * y + transform[4];
    dest[i++] = transform[1] * x + transform[3] * y + transform[5];
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} angle Angle.
 * @param {Array<number>} anchor Rotation anchor point.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */


function rotate(flatCoordinates, offset, end, stride, angle, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + deltaX * cos - deltaY * sin;
    dest[i++] = anchorY + deltaX * sin + deltaY * cos;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * Scale the coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} sx Scale factor in the x-direction.
 * @param {number} sy Scale factor in the y-direction.
 * @param {Array<number>} anchor Scale anchor point.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */


function scale(flatCoordinates, offset, end, stride, sx, sy, anchor, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var anchorX = anchor[0];
  var anchorY = anchor[1];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    var deltaX = flatCoordinates[j] - anchorX;
    var deltaY = flatCoordinates[j + 1] - anchorY;
    dest[i++] = anchorX + sx * deltaX;
    dest[i++] = anchorY + sy * deltaY;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} deltaX Delta X.
 * @param {number} deltaY Delta Y.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed coordinates.
 */


function translate(flatCoordinates, offset, end, stride, deltaX, deltaY, opt_dest) {
  var dest = opt_dest ? opt_dest : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    dest[i++] = flatCoordinates[j] + deltaX;
    dest[i++] = flatCoordinates[j + 1] + deltaY;

    for (var k = j + 2; k < j + stride; ++k) {
      dest[i++] = flatCoordinates[k];
    }
  }

  if (opt_dest && dest.length != i) {
    dest.length = i;
  }

  return dest;
}
},{}],"node_modules/ol/sphere.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDistance = getDistance;
exports.getLength = getLength;
exports.getArea = getArea;
exports.offset = offset;
exports.DEFAULT_RADIUS = void 0;

var _math = require("./math.js");

var _GeometryType = _interopRequireDefault(require("./geom/GeometryType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @license
 * Latitude/longitude spherical geodesy formulae taken from
 * http://www.movable-type.co.uk/scripts/latlong.html
 * Licensed under CC-BY-3.0.
 */

/**
 * @module ol/sphere
 */

/**
 * Object literal with options for the {@link getLength} or {@link getArea}
 * functions.
 * @typedef {Object} SphereMetricOptions
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857']
 * Projection of the  geometry.  By default, the geometry is assumed to be in
 * Web Mercator.
 * @property {number} [radius=6371008.8] Sphere radius.  By default, the radius of the
 * earth is used (Clarke 1866 Authalic Sphere).
 */

/**
 * The mean Earth radius (1/3 * (2a + b)) for the WGS84 ellipsoid.
 * https://en.wikipedia.org/wiki/Earth_radius#Mean_radius
 * @type {number}
 */
var DEFAULT_RADIUS = 6371008.8;
/**
 * Get the great circle distance (in meters) between two geographic coordinates.
 * @param {Array} c1 Starting coordinate.
 * @param {Array} c2 Ending coordinate.
 * @param {number=} opt_radius The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {number} The great circle distance between the points (in meters).
 * @api
 */

exports.DEFAULT_RADIUS = DEFAULT_RADIUS;

function getDistance(c1, c2, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = (0, _math.toRadians)(c1[1]);
  var lat2 = (0, _math.toRadians)(c2[1]);
  var deltaLatBy2 = (lat2 - lat1) / 2;
  var deltaLonBy2 = (0, _math.toRadians)(c2[0] - c1[0]) / 2;
  var a = Math.sin(deltaLatBy2) * Math.sin(deltaLatBy2) + Math.sin(deltaLonBy2) * Math.sin(deltaLonBy2) * Math.cos(lat1) * Math.cos(lat2);
  return 2 * radius * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}
/**
 * Get the cumulative great circle length of linestring coordinates (geographic).
 * @param {Array} coordinates Linestring coordinates.
 * @param {number} radius The sphere radius to use.
 * @return {number} The length (in meters).
 */


function getLengthInternal(coordinates, radius) {
  var length = 0;

  for (var i = 0, ii = coordinates.length; i < ii - 1; ++i) {
    length += getDistance(coordinates[i], coordinates[i + 1], radius);
  }

  return length;
}
/**
 * Get the spherical length of a geometry.  This length is the sum of the
 * great circle distances between coordinates.  For polygons, the length is
 * the sum of all rings.  For points, the length is zero.  For multi-part
 * geometries, the length is the sum of the length of each part.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions=} opt_options Options for the
 * length calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 * You can change this by providing a `projection` option.
 * @return {number} The spherical length (in meters).
 * @api
 */


function getLength(geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  var type = geometry.getType();

  if (type !== _GeometryType.default.GEOMETRY_COLLECTION) {
    geometry = geometry.clone().transform(projection, 'EPSG:4326');
  }

  var length = 0;
  var coordinates, coords, i, ii, j, jj;

  switch (type) {
    case _GeometryType.default.POINT:
    case _GeometryType.default.MULTI_POINT:
      {
        break;
      }

    case _GeometryType.default.LINE_STRING:
    case _GeometryType.default.LINEAR_RING:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();
        length = getLengthInternal(coordinates, radius);
        break;
      }

    case _GeometryType.default.MULTI_LINE_STRING:
    case _GeometryType.default.POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          length += getLengthInternal(coordinates[i], radius);
        }

        break;
      }

    case _GeometryType.default.MULTI_POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];

          for (j = 0, jj = coords.length; j < jj; ++j) {
            length += getLengthInternal(coords[j], radius);
          }
        }

        break;
      }

    case _GeometryType.default.GEOMETRY_COLLECTION:
      {
        var geometries =
        /** @type {import("./geom/GeometryCollection.js").default} */
        geometry.getGeometries();

        for (i = 0, ii = geometries.length; i < ii; ++i) {
          length += getLength(geometries[i], opt_options);
        }

        break;
      }

    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }

  return length;
}
/**
 * Returns the spherical area for a list of coordinates.
 *
 * [Reference](https://trs-new.jpl.nasa.gov/handle/2014/40409)
 * Robert. G. Chamberlain and William H. Duquette, "Some Algorithms for
 * Polygons on a Sphere", JPL Publication 07-03, Jet Propulsion
 * Laboratory, Pasadena, CA, June 2007
 *
 * @param {Array<import("./coordinate.js").Coordinate>} coordinates List of coordinates of a linear
 * ring. If the ring is oriented clockwise, the area will be positive,
 * otherwise it will be negative.
 * @param {number} radius The sphere radius.
 * @return {number} Area (in square meters).
 */


function getAreaInternal(coordinates, radius) {
  var area = 0;
  var len = coordinates.length;
  var x1 = coordinates[len - 1][0];
  var y1 = coordinates[len - 1][1];

  for (var i = 0; i < len; i++) {
    var x2 = coordinates[i][0];
    var y2 = coordinates[i][1];
    area += (0, _math.toRadians)(x2 - x1) * (2 + Math.sin((0, _math.toRadians)(y1)) + Math.sin((0, _math.toRadians)(y2)));
    x1 = x2;
    y1 = y2;
  }

  return area * radius * radius / 2.0;
}
/**
 * Get the spherical area of a geometry.  This is the area (in meters) assuming
 * that polygon edges are segments of great circles on a sphere.
 * @param {import("./geom/Geometry.js").default} geometry A geometry.
 * @param {SphereMetricOptions=} opt_options Options for the area
 *     calculation.  By default, geometries are assumed to be in 'EPSG:3857'.
 *     You can change this by providing a `projection` option.
 * @return {number} The spherical area (in square meters).
 * @api
 */


function getArea(geometry, opt_options) {
  var options = opt_options || {};
  var radius = options.radius || DEFAULT_RADIUS;
  var projection = options.projection || 'EPSG:3857';
  var type = geometry.getType();

  if (type !== _GeometryType.default.GEOMETRY_COLLECTION) {
    geometry = geometry.clone().transform(projection, 'EPSG:4326');
  }

  var area = 0;
  var coordinates, coords, i, ii, j, jj;

  switch (type) {
    case _GeometryType.default.POINT:
    case _GeometryType.default.MULTI_POINT:
    case _GeometryType.default.LINE_STRING:
    case _GeometryType.default.MULTI_LINE_STRING:
    case _GeometryType.default.LINEAR_RING:
      {
        break;
      }

    case _GeometryType.default.POLYGON:
      {
        coordinates =
        /** @type {import("./geom/Polygon.js").default} */
        geometry.getCoordinates();
        area = Math.abs(getAreaInternal(coordinates[0], radius));

        for (i = 1, ii = coordinates.length; i < ii; ++i) {
          area -= Math.abs(getAreaInternal(coordinates[i], radius));
        }

        break;
      }

    case _GeometryType.default.MULTI_POLYGON:
      {
        coordinates =
        /** @type {import("./geom/SimpleGeometry.js").default} */
        geometry.getCoordinates();

        for (i = 0, ii = coordinates.length; i < ii; ++i) {
          coords = coordinates[i];
          area += Math.abs(getAreaInternal(coords[0], radius));

          for (j = 1, jj = coords.length; j < jj; ++j) {
            area -= Math.abs(getAreaInternal(coords[j], radius));
          }
        }

        break;
      }

    case _GeometryType.default.GEOMETRY_COLLECTION:
      {
        var geometries =
        /** @type {import("./geom/GeometryCollection.js").default} */
        geometry.getGeometries();

        for (i = 0, ii = geometries.length; i < ii; ++i) {
          area += getArea(geometries[i], opt_options);
        }

        break;
      }

    default:
      {
        throw new Error('Unsupported geometry type: ' + type);
      }
  }

  return area;
}
/**
 * Returns the coordinate at the given distance and bearing from `c1`.
 *
 * @param {import("./coordinate.js").Coordinate} c1 The origin point (`[lon, lat]` in degrees).
 * @param {number} distance The great-circle distance between the origin
 *     point and the target point.
 * @param {number} bearing The bearing (in radians).
 * @param {number=} opt_radius The sphere radius to use.  Defaults to the Earth's
 *     mean radius using the WGS84 ellipsoid.
 * @return {import("./coordinate.js").Coordinate} The target point.
 */


function offset(c1, distance, bearing, opt_radius) {
  var radius = opt_radius || DEFAULT_RADIUS;
  var lat1 = (0, _math.toRadians)(c1[1]);
  var lon1 = (0, _math.toRadians)(c1[0]);
  var dByR = distance / radius;
  var lat = Math.asin(Math.sin(lat1) * Math.cos(dByR) + Math.cos(lat1) * Math.sin(dByR) * Math.cos(bearing));
  var lon = lon1 + Math.atan2(Math.sin(bearing) * Math.sin(dByR) * Math.cos(lat1), Math.cos(dByR) - Math.sin(lat1) * Math.sin(lat));
  return [(0, _math.toDegrees)(lon), (0, _math.toDegrees)(lat)];
}
},{"./math.js":"node_modules/ol/math.js","./geom/GeometryType.js":"node_modules/ol/geom/GeometryType.js"}],"node_modules/ol/proj/Units.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.METERS_PER_UNIT = void 0;

/**
 * @module ol/proj/Units
 */

/**
 * Projection units: `'degrees'`, `'ft'`, `'m'`, `'pixels'`, `'tile-pixels'` or
 * `'us-ft'`.
 * @enum {string}
 */
var Units = {
  DEGREES: 'degrees',
  FEET: 'ft',
  METERS: 'm',
  PIXELS: 'pixels',
  TILE_PIXELS: 'tile-pixels',
  USFEET: 'us-ft'
};
/**
 * Meters per unit lookup table.
 * @const
 * @type {Object<Units, number>}
 * @api
 */

var METERS_PER_UNIT = {}; // use the radius of the Normal sphere

exports.METERS_PER_UNIT = METERS_PER_UNIT;
METERS_PER_UNIT[Units.DEGREES] = 2 * Math.PI * 6370997 / 360;
METERS_PER_UNIT[Units.FEET] = 0.3048;
METERS_PER_UNIT[Units.METERS] = 1;
METERS_PER_UNIT[Units.USFEET] = 1200 / 3937;
var _default = Units;
exports.default = _default;
},{}],"node_modules/ol/proj/Projection.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Units = require("./Units.js");

/**
 * @module ol/proj/Projection
 */

/**
 * @typedef {Object} Options
 * @property {string} code The SRS identifier code, e.g. `EPSG:4326`.
 * @property {import("./Units.js").default|string} [units] Units. Required unless a
 * proj4 projection is defined for `code`.
 * @property {import("../extent.js").Extent} [extent] The validity extent for the SRS.
 * @property {string} [axisOrientation='enu'] The axis orientation as specified in Proj4.
 * @property {boolean} [global=false] Whether the projection is valid for the whole globe.
 * @property {number} [metersPerUnit] The meters per unit for the SRS.
 * If not provided, the `units` are used to get the meters per unit from the {@link module:ol/proj/Units~METERS_PER_UNIT}
 * lookup table.
 * @property {import("../extent.js").Extent} [worldExtent] The world extent for the SRS.
 * @property {function(number, import("../coordinate.js").Coordinate):number} [getPointResolution]
 * Function to determine resolution at a point. The function is called with a
 * `{number}` view resolution and an `{import("../coordinate.js").Coordinate}` as arguments, and returns
 * the `{number}` resolution at the passed coordinate. If this is `undefined`,
 * the default {@link module:ol/proj#getPointResolution} function will be used.
 */

/**
 * @classdesc
 * Projection definition class. One of these is created for each projection
 * supported in the application and stored in the {@link module:ol/proj} namespace.
 * You can use these in applications, but this is not required, as API params
 * and options use {@link module:ol/proj~ProjectionLike} which means the simple string
 * code will suffice.
 *
 * You can use {@link module:ol/proj~get} to retrieve the object for a particular
 * projection.
 *
 * The library includes definitions for `EPSG:4326` and `EPSG:3857`, together
 * with the following aliases:
 * * `EPSG:4326`: CRS:84, urn:ogc:def:crs:EPSG:6.6:4326,
 *     urn:ogc:def:crs:OGC:1.3:CRS84, urn:ogc:def:crs:OGC:2:84,
 *     http://www.opengis.net/gml/srs/epsg.xml#4326,
 *     urn:x-ogc:def:crs:EPSG:4326
 * * `EPSG:3857`: EPSG:102100, EPSG:102113, EPSG:900913,
 *     urn:ogc:def:crs:EPSG:6.18:3:3857,
 *     http://www.opengis.net/gml/srs/epsg.xml#3857
 *
 * If you use [proj4js](https://github.com/proj4js/proj4js), aliases can
 * be added using `proj4.defs()`. After all required projection definitions are
 * added, call the {@link module:ol/proj/proj4~register} function.
 *
 * @api
 */
var Projection = function Projection(options) {
  /**
   * @private
   * @type {string}
   */
  this.code_ = options.code;
  /**
   * Units of projected coordinates. When set to `TILE_PIXELS`, a
   * `this.extent_` and `this.worldExtent_` must be configured properly for each
   * tile.
   * @private
   * @type {import("./Units.js").default}
   */

  this.units_ =
  /** @type {import("./Units.js").default} */
  options.units;
  /**
   * Validity extent of the projection in projected coordinates. For projections
   * with `TILE_PIXELS` units, this is the extent of the tile in
   * tile pixel space.
   * @private
   * @type {import("../extent.js").Extent}
   */

  this.extent_ = options.extent !== undefined ? options.extent : null;
  /**
   * Extent of the world in EPSG:4326. For projections with
   * `TILE_PIXELS` units, this is the extent of the tile in
   * projected coordinate space.
   * @private
   * @type {import("../extent.js").Extent}
   */

  this.worldExtent_ = options.worldExtent !== undefined ? options.worldExtent : null;
  /**
   * @private
   * @type {string}
   */

  this.axisOrientation_ = options.axisOrientation !== undefined ? options.axisOrientation : 'enu';
  /**
   * @private
   * @type {boolean}
   */

  this.global_ = options.global !== undefined ? options.global : false;
  /**
   * @private
   * @type {boolean}
   */

  this.canWrapX_ = !!(this.global_ && this.extent_);
  /**
   * @private
   * @type {function(number, import("../coordinate.js").Coordinate):number|undefined}
   */

  this.getPointResolutionFunc_ = options.getPointResolution;
  /**
   * @private
   * @type {import("../tilegrid/TileGrid.js").default}
   */

  this.defaultTileGrid_ = null;
  /**
   * @private
   * @type {number|undefined}
   */

  this.metersPerUnit_ = options.metersPerUnit;
};
/**
 * @return {boolean} The projection is suitable for wrapping the x-axis
 */


Projection.prototype.canWrapX = function canWrapX() {
  return this.canWrapX_;
};
/**
 * Get the code for this projection, e.g. 'EPSG:4326'.
 * @return {string} Code.
 * @api
 */


Projection.prototype.getCode = function getCode() {
  return this.code_;
};
/**
 * Get the validity extent for this projection.
 * @return {import("../extent.js").Extent} Extent.
 * @api
 */


Projection.prototype.getExtent = function getExtent() {
  return this.extent_;
};
/**
 * Get the units of this projection.
 * @return {import("./Units.js").default} Units.
 * @api
 */


Projection.prototype.getUnits = function getUnits() {
  return this.units_;
};
/**
 * Get the amount of meters per unit of this projection.If the projection is
 * not configured with `metersPerUnit` or a units identifier, the return is
 * `undefined`.
 * @return {number|undefined} Meters.
 * @api
 */


Projection.prototype.getMetersPerUnit = function getMetersPerUnit() {
  return this.metersPerUnit_ || _Units.METERS_PER_UNIT[this.units_];
};
/**
 * Get the world extent for this projection.
 * @return {import("../extent.js").Extent} Extent.
 * @api
 */


Projection.prototype.getWorldExtent = function getWorldExtent() {
  return this.worldExtent_;
};
/**
 * Get the axis orientation of this projection.
 * Example values are:
 * enu - the default easting, northing, elevation.
 * neu - northing, easting, up - useful for "lat/long" geographic coordinates,
 *   or south orientated transverse mercator.
 * wnu - westing, northing, up - some planetary coordinate systems have
 *   "west positive" coordinate systems
 * @return {string} Axis orientation.
 * @api
 */


Projection.prototype.getAxisOrientation = function getAxisOrientation() {
  return this.axisOrientation_;
};
/**
 * Is this projection a global projection which spans the whole world?
 * @return {boolean} Whether the projection is global.
 * @api
 */


Projection.prototype.isGlobal = function isGlobal() {
  return this.global_;
};
/**
 * Set if the projection is a global projection which spans the whole world
 * @param {boolean} global Whether the projection is global.
 * @api
 */


Projection.prototype.setGlobal = function setGlobal(global) {
  this.global_ = global;
  this.canWrapX_ = !!(global && this.extent_);
};
/**
 * @return {import("../tilegrid/TileGrid.js").default} The default tile grid.
 */


Projection.prototype.getDefaultTileGrid = function getDefaultTileGrid() {
  return this.defaultTileGrid_;
};
/**
 * @param {import("../tilegrid/TileGrid.js").default} tileGrid The default tile grid.
 */


Projection.prototype.setDefaultTileGrid = function setDefaultTileGrid(tileGrid) {
  this.defaultTileGrid_ = tileGrid;
};
/**
 * Set the validity extent for this projection.
 * @param {import("../extent.js").Extent} extent Extent.
 * @api
 */


Projection.prototype.setExtent = function setExtent(extent) {
  this.extent_ = extent;
  this.canWrapX_ = !!(this.global_ && extent);
};
/**
 * Set the world extent for this projection.
 * @param {import("../extent.js").Extent} worldExtent World extent
 *   [minlon, minlat, maxlon, maxlat].
 * @api
 */


Projection.prototype.setWorldExtent = function setWorldExtent(worldExtent) {
  this.worldExtent_ = worldExtent;
};
/**
 * Set the getPointResolution function (see {@link module:ol/proj~getPointResolution}
 * for this projection.
 * @param {function(number, import("../coordinate.js").Coordinate):number} func Function
 * @api
 */


Projection.prototype.setGetPointResolution = function setGetPointResolution(func) {
  this.getPointResolutionFunc_ = func;
};
/**
 * Get the custom point resolution function for this projection (if set).
 * @return {function(number, import("../coordinate.js").Coordinate):number|undefined} The custom point
 * resolution function (if set).
 */


Projection.prototype.getPointResolutionFunc = function getPointResolutionFunc() {
  return this.getPointResolutionFunc_;
};

var _default = Projection;
exports.default = _default;
},{"./Units.js":"node_modules/ol/proj/Units.js"}],"node_modules/ol/proj/epsg3857.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fromEPSG4326 = fromEPSG4326;
exports.toEPSG4326 = toEPSG4326;
exports.PROJECTIONS = exports.WORLD_EXTENT = exports.EXTENT = exports.HALF_SIZE = exports.RADIUS = void 0;

var _math = require("../math.js");

var _Projection = _interopRequireDefault(require("./Projection.js"));

var _Units = _interopRequireDefault(require("./Units.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/proj/epsg3857
 */

/**
 * Radius of WGS84 sphere
 *
 * @const
 * @type {number}
 */
var RADIUS = 6378137;
/**
 * @const
 * @type {number}
 */

exports.RADIUS = RADIUS;
var HALF_SIZE = Math.PI * RADIUS;
/**
 * @const
 * @type {import("../extent.js").Extent}
 */

exports.HALF_SIZE = HALF_SIZE;
var EXTENT = [-HALF_SIZE, -HALF_SIZE, HALF_SIZE, HALF_SIZE];
/**
 * @const
 * @type {import("../extent.js").Extent}
 */

exports.EXTENT = EXTENT;
var WORLD_EXTENT = [-180, -85, 180, 85];
/**
 * @classdesc
 * Projection object for web/spherical Mercator (EPSG:3857).
 */

exports.WORLD_EXTENT = WORLD_EXTENT;

var EPSG3857Projection =
/*@__PURE__*/
function (Projection) {
  function EPSG3857Projection(code) {
    Projection.call(this, {
      code: code,
      units: _Units.default.METERS,
      extent: EXTENT,
      global: true,
      worldExtent: WORLD_EXTENT,
      getPointResolution: function (resolution, point) {
        return resolution / (0, _math.cosh)(point[1] / RADIUS);
      }
    });
  }

  if (Projection) EPSG3857Projection.__proto__ = Projection;
  EPSG3857Projection.prototype = Object.create(Projection && Projection.prototype);
  EPSG3857Projection.prototype.constructor = EPSG3857Projection;
  return EPSG3857Projection;
}(_Projection.default);
/**
 * Projections equal to EPSG:3857.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */


var PROJECTIONS = [new EPSG3857Projection('EPSG:3857'), new EPSG3857Projection('EPSG:102100'), new EPSG3857Projection('EPSG:102113'), new EPSG3857Projection('EPSG:900913'), new EPSG3857Projection('urn:ogc:def:crs:EPSG:6.18:3:3857'), new EPSG3857Projection('urn:ogc:def:crs:EPSG::3857'), new EPSG3857Projection('http://www.opengis.net/gml/srs/epsg.xml#3857')];
/**
 * Transformation from EPSG:4326 to EPSG:3857.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */

exports.PROJECTIONS = PROJECTIONS;

function fromEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;

  if (output === undefined) {
    if (dimension > 2) {
      // preserve values beyond second dimension
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }

  var halfSize = HALF_SIZE;

  for (var i = 0; i < length; i += dimension) {
    output[i] = halfSize * input[i] / 180;
    var y = RADIUS * Math.log(Math.tan(Math.PI * (input[i + 1] + 90) / 360));

    if (y > halfSize) {
      y = halfSize;
    } else if (y < -halfSize) {
      y = -halfSize;
    }

    output[i + 1] = y;
  }

  return output;
}
/**
 * Transformation from EPSG:3857 to EPSG:4326.
 *
 * @param {Array<number>} input Input array of coordinate values.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension (default is `2`).
 * @return {Array<number>} Output array of coordinate values.
 */


function toEPSG4326(input, opt_output, opt_dimension) {
  var length = input.length;
  var dimension = opt_dimension > 1 ? opt_dimension : 2;
  var output = opt_output;

  if (output === undefined) {
    if (dimension > 2) {
      // preserve values beyond second dimension
      output = input.slice();
    } else {
      output = new Array(length);
    }
  }

  for (var i = 0; i < length; i += dimension) {
    output[i] = 180 * input[i] / HALF_SIZE;
    output[i + 1] = 360 * Math.atan(Math.exp(input[i + 1] / RADIUS)) / Math.PI - 90;
  }

  return output;
}
},{"../math.js":"node_modules/ol/math.js","./Projection.js":"node_modules/ol/proj/Projection.js","./Units.js":"node_modules/ol/proj/Units.js"}],"node_modules/ol/proj/epsg4326.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PROJECTIONS = exports.METERS_PER_UNIT = exports.EXTENT = exports.RADIUS = void 0;

var _Projection = _interopRequireDefault(require("./Projection.js"));

var _Units = _interopRequireDefault(require("./Units.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/proj/epsg4326
 */

/**
 * Semi-major radius of the WGS84 ellipsoid.
 *
 * @const
 * @type {number}
 */
var RADIUS = 6378137;
/**
 * Extent of the EPSG:4326 projection which is the whole world.
 *
 * @const
 * @type {import("../extent.js").Extent}
 */

exports.RADIUS = RADIUS;
var EXTENT = [-180, -90, 180, 90];
/**
 * @const
 * @type {number}
 */

exports.EXTENT = EXTENT;
var METERS_PER_UNIT = Math.PI * RADIUS / 180;
/**
 * @classdesc
 * Projection object for WGS84 geographic coordinates (EPSG:4326).
 *
 * Note that OpenLayers does not strictly comply with the EPSG definition.
 * The EPSG registry defines 4326 as a CRS for Latitude,Longitude (y,x).
 * OpenLayers treats EPSG:4326 as a pseudo-projection, with x,y coordinates.
 */

exports.METERS_PER_UNIT = METERS_PER_UNIT;

var EPSG4326Projection =
/*@__PURE__*/
function (Projection) {
  function EPSG4326Projection(code, opt_axisOrientation) {
    Projection.call(this, {
      code: code,
      units: _Units.default.DEGREES,
      extent: EXTENT,
      axisOrientation: opt_axisOrientation,
      global: true,
      metersPerUnit: METERS_PER_UNIT,
      worldExtent: EXTENT
    });
  }

  if (Projection) EPSG4326Projection.__proto__ = Projection;
  EPSG4326Projection.prototype = Object.create(Projection && Projection.prototype);
  EPSG4326Projection.prototype.constructor = EPSG4326Projection;
  return EPSG4326Projection;
}(_Projection.default);
/**
 * Projections equal to EPSG:4326.
 *
 * @const
 * @type {Array<import("./Projection.js").default>}
 */


var PROJECTIONS = [new EPSG4326Projection('CRS:84'), new EPSG4326Projection('EPSG:4326', 'neu'), new EPSG4326Projection('urn:ogc:def:crs:EPSG::4326', 'neu'), new EPSG4326Projection('urn:ogc:def:crs:EPSG:6.6:4326', 'neu'), new EPSG4326Projection('urn:ogc:def:crs:OGC:1.3:CRS84'), new EPSG4326Projection('urn:ogc:def:crs:OGC:2:84'), new EPSG4326Projection('http://www.opengis.net/gml/srs/epsg.xml#4326', 'neu'), new EPSG4326Projection('urn:x-ogc:def:crs:EPSG:4326', 'neu')];
exports.PROJECTIONS = PROJECTIONS;
},{"./Projection.js":"node_modules/ol/proj/Projection.js","./Units.js":"node_modules/ol/proj/Units.js"}],"node_modules/ol/proj/projections.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.get = get;
exports.add = add;

/**
 * @module ol/proj/projections
 */

/**
 * @type {Object<string, import("./Projection.js").default>}
 */
var cache = {};
/**
 * Clear the projections cache.
 */

function clear() {
  cache = {};
}
/**
 * Get a cached projection by code.
 * @param {string} code The code for the projection.
 * @return {import("./Projection.js").default} The projection (if cached).
 */


function get(code) {
  return cache[code] || null;
}
/**
 * Add a projection to the cache.
 * @param {string} code The projection code.
 * @param {import("./Projection.js").default} projection The projection to cache.
 */


function add(code, projection) {
  cache[code] = projection;
}
},{}],"node_modules/ol/proj/transforms.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clear = clear;
exports.add = add;
exports.remove = remove;
exports.get = get;

var _obj = require("../obj.js");

/**
 * @module ol/proj/transforms
 */

/**
 * @private
 * @type {!Object<string, Object<string, import("../proj.js").TransformFunction>>}
 */
var transforms = {};
/**
 * Clear the transform cache.
 */

function clear() {
  transforms = {};
}
/**
 * Registers a conversion function to convert coordinates from the source
 * projection to the destination projection.
 *
 * @param {import("./Projection.js").default} source Source.
 * @param {import("./Projection.js").default} destination Destination.
 * @param {import("../proj.js").TransformFunction} transformFn Transform.
 */


function add(source, destination, transformFn) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();

  if (!(sourceCode in transforms)) {
    transforms[sourceCode] = {};
  }

  transforms[sourceCode][destinationCode] = transformFn;
}
/**
 * Unregisters the conversion function to convert coordinates from the source
 * projection to the destination projection.  This method is used to clean up
 * cached transforms during testing.
 *
 * @param {import("./Projection.js").default} source Source projection.
 * @param {import("./Projection.js").default} destination Destination projection.
 * @return {import("../proj.js").TransformFunction} transformFn The unregistered transform.
 */


function remove(source, destination) {
  var sourceCode = source.getCode();
  var destinationCode = destination.getCode();
  var transform = transforms[sourceCode][destinationCode];
  delete transforms[sourceCode][destinationCode];

  if ((0, _obj.isEmpty)(transforms[sourceCode])) {
    delete transforms[sourceCode];
  }

  return transform;
}
/**
 * Get a transform given a source code and a destination code.
 * @param {string} sourceCode The code for the source projection.
 * @param {string} destinationCode The code for the destination projection.
 * @return {import("../proj.js").TransformFunction|undefined} The transform function (if found).
 */


function get(sourceCode, destinationCode) {
  var transform;

  if (sourceCode in transforms && destinationCode in transforms[sourceCode]) {
    transform = transforms[sourceCode][destinationCode];
  }

  return transform;
}
},{"../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/proj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cloneTransform = cloneTransform;
exports.identityTransform = identityTransform;
exports.addProjection = addProjection;
exports.addProjections = addProjections;
exports.get = get;
exports.getPointResolution = getPointResolution;
exports.addEquivalentProjections = addEquivalentProjections;
exports.addEquivalentTransforms = addEquivalentTransforms;
exports.clearAllProjections = clearAllProjections;
exports.createProjection = createProjection;
exports.createTransformFromCoordinateTransform = createTransformFromCoordinateTransform;
exports.addCoordinateTransforms = addCoordinateTransforms;
exports.fromLonLat = fromLonLat;
exports.toLonLat = toLonLat;
exports.equivalent = equivalent;
exports.getTransformFromProjections = getTransformFromProjections;
exports.getTransform = getTransform;
exports.transform = transform;
exports.transformExtent = transformExtent;
exports.transformWithProjections = transformWithProjections;
exports.addCommon = addCommon;
Object.defineProperty(exports, "Projection", {
  enumerable: true,
  get: function () {
    return _Projection.default;
  }
});
Object.defineProperty(exports, "METERS_PER_UNIT", {
  enumerable: true,
  get: function () {
    return _Units.METERS_PER_UNIT;
  }
});

var _sphere = require("./sphere.js");

var _extent = require("./extent.js");

var _math = require("./math.js");

var _epsg = require("./proj/epsg3857.js");

var _epsg2 = require("./proj/epsg4326.js");

var _Projection = _interopRequireDefault(require("./proj/Projection.js"));

var _Units = _interopRequireWildcard(require("./proj/Units.js"));

var projections = _interopRequireWildcard(require("./proj/projections.js"));

var _transforms = require("./proj/transforms.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/proj
 */

/**
 * The ol/proj module stores:
 * * a list of {@link module:ol/proj/Projection}
 * objects, one for each projection supported by the application
 * * a list of transform functions needed to convert coordinates in one projection
 * into another.
 *
 * The static functions are the methods used to maintain these.
 * Each transform function can handle not only simple coordinate pairs, but also
 * large arrays of coordinates such as vector geometries.
 *
 * When loaded, the library adds projection objects for EPSG:4326 (WGS84
 * geographic coordinates) and EPSG:3857 (Web or Spherical Mercator, as used
 * for example by Bing Maps or OpenStreetMap), together with the relevant
 * transform functions.
 *
 * Additional transforms may be added by using the http://proj4js.org/
 * library (version 2.2 or later). You can use the full build supplied by
 * Proj4js, or create a custom build to support those projections you need; see
 * the Proj4js website for how to do this. You also need the Proj4js definitions
 * for the required projections. These definitions can be obtained from
 * https://epsg.io/, and are a JS function, so can be loaded in a script
 * tag (as in the examples) or pasted into your application.
 *
 * After all required projection definitions are added to proj4's registry (by
 * using `proj4.defs()`), simply call `register(proj4)` from the `ol/proj/proj4`
 * package. Existing transforms are not changed by this function. See
 * examples/wms-image-custom-proj for an example of this.
 *
 * Additional projection definitions can be registered with `proj4.defs()` any
 * time. Just make sure to call `register(proj4)` again; for example, with user-supplied data where you don't
 * know in advance what projections are needed, you can initially load minimal
 * support and then load whichever are requested.
 *
 * Note that Proj4js does not support projection extents. If you want to add
 * one for creating default tile grids, you can add it after the Projection
 * object has been created with `setExtent`, for example,
 * `get('EPSG:1234').setExtent(extent)`.
 *
 * In addition to Proj4js support, any transform functions can be added with
 * {@link module:ol/proj~addCoordinateTransforms}. To use this, you must first create
 * a {@link module:ol/proj/Projection} object for the new projection and add it with
 * {@link module:ol/proj~addProjection}. You can then add the forward and inverse
 * functions with {@link module:ol/proj~addCoordinateTransforms}. See
 * examples/wms-custom-proj for an example of this.
 *
 * Note that if no transforms are needed and you only need to define the
 * projection, just add a {@link module:ol/proj/Projection} with
 * {@link module:ol/proj~addProjection}. See examples/wms-no-proj for an example of
 * this.
 */

/**
 * A projection as {@link module:ol/proj/Projection}, SRS identifier
 * string or undefined.
 * @typedef {Projection|string|undefined} ProjectionLike
 * @api
 */

/**
 * A transform function accepts an array of input coordinate values, an optional
 * output array, and an optional dimension (default should be 2).  The function
 * transforms the input coordinate values, populates the output array, and
 * returns the output array.
 *
 * @typedef {function(Array<number>, Array<number>=, number=): Array<number>} TransformFunction
 * @api
 */

/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array<number>} Output coordinate array (new array, same coordinate
 *     values).
 */
function cloneTransform(input, opt_output, opt_dimension) {
  var output;

  if (opt_output !== undefined) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }

    output = opt_output;
  } else {
    output = input.slice();
  }

  return output;
}
/**
 * @param {Array<number>} input Input coordinate array.
 * @param {Array<number>=} opt_output Output array of coordinate values.
 * @param {number=} opt_dimension Dimension.
 * @return {Array<number>} Input coordinate array (same array as input).
 */


function identityTransform(input, opt_output, opt_dimension) {
  if (opt_output !== undefined && input !== opt_output) {
    for (var i = 0, ii = input.length; i < ii; ++i) {
      opt_output[i] = input[i];
    }

    input = opt_output;
  }

  return input;
}
/**
 * Add a Projection object to the list of supported projections that can be
 * looked up by their code.
 *
 * @param {Projection} projection Projection instance.
 * @api
 */


function addProjection(projection) {
  projections.add(projection.getCode(), projection);
  (0, _transforms.add)(projection, projection, cloneTransform);
}
/**
 * @param {Array<Projection>} projections Projections.
 */


function addProjections(projections) {
  projections.forEach(addProjection);
}
/**
 * Fetches a Projection object for the code specified.
 *
 * @param {ProjectionLike} projectionLike Either a code string which is
 *     a combination of authority and identifier such as "EPSG:4326", or an
 *     existing projection object, or undefined.
 * @return {Projection} Projection object, or null if not in list.
 * @api
 */


function get(projectionLike) {
  return typeof projectionLike === 'string' ? projections.get(
  /** @type {string} */
  projectionLike) :
  /** @type {Projection} */
  projectionLike || null;
}
/**
 * Get the resolution of the point in degrees or distance units.
 * For projections with degrees as the unit this will simply return the
 * provided resolution. For other projections the point resolution is
 * by default estimated by transforming the 'point' pixel to EPSG:4326,
 * measuring its width and height on the normal sphere,
 * and taking the average of the width and height.
 * A custom function can be provided for a specific projection, either
 * by setting the `getPointResolution` option in the
 * {@link module:ol/proj/Projection~Projection} constructor or by using
 * {@link module:ol/proj/Projection~Projection#setGetPointResolution} to change an existing
 * projection object.
 * @param {ProjectionLike} projection The projection.
 * @param {number} resolution Nominal resolution in projection units.
 * @param {import("./coordinate.js").Coordinate} point Point to find adjusted resolution at.
 * @param {Units=} opt_units Units to get the point resolution in.
 * Default is the projection's units.
 * @return {number} Point resolution.
 * @api
 */


function getPointResolution(projection, resolution, point, opt_units) {
  projection = get(projection);
  var pointResolution;
  var getter = projection.getPointResolutionFunc();

  if (getter) {
    pointResolution = getter(resolution, point);
  } else {
    var units = projection.getUnits();

    if (units == _Units.default.DEGREES && !opt_units || opt_units == _Units.default.DEGREES) {
      pointResolution = resolution;
    } else {
      // Estimate point resolution by transforming the center pixel to EPSG:4326,
      // measuring its width and height on the normal sphere, and taking the
      // average of the width and height.
      var toEPSG4326 = getTransformFromProjections(projection, get('EPSG:4326'));
      var vertices = [point[0] - resolution / 2, point[1], point[0] + resolution / 2, point[1], point[0], point[1] - resolution / 2, point[0], point[1] + resolution / 2];
      vertices = toEPSG4326(vertices, vertices, 2);
      var width = (0, _sphere.getDistance)(vertices.slice(0, 2), vertices.slice(2, 4));
      var height = (0, _sphere.getDistance)(vertices.slice(4, 6), vertices.slice(6, 8));
      pointResolution = (width + height) / 2;
      var metersPerUnit = opt_units ? _Units.METERS_PER_UNIT[opt_units] : projection.getMetersPerUnit();

      if (metersPerUnit !== undefined) {
        pointResolution /= metersPerUnit;
      }
    }
  }

  return pointResolution;
}
/**
 * Registers transformation functions that don't alter coordinates. Those allow
 * to transform between projections with equal meaning.
 *
 * @param {Array<Projection>} projections Projections.
 * @api
 */


function addEquivalentProjections(projections) {
  addProjections(projections);
  projections.forEach(function (source) {
    projections.forEach(function (destination) {
      if (source !== destination) {
        (0, _transforms.add)(source, destination, cloneTransform);
      }
    });
  });
}
/**
 * Registers transformation functions to convert coordinates in any projection
 * in projection1 to any projection in projection2.
 *
 * @param {Array<Projection>} projections1 Projections with equal
 *     meaning.
 * @param {Array<Projection>} projections2 Projections with equal
 *     meaning.
 * @param {TransformFunction} forwardTransform Transformation from any
 *   projection in projection1 to any projection in projection2.
 * @param {TransformFunction} inverseTransform Transform from any projection
 *   in projection2 to any projection in projection1..
 */


function addEquivalentTransforms(projections1, projections2, forwardTransform, inverseTransform) {
  projections1.forEach(function (projection1) {
    projections2.forEach(function (projection2) {
      (0, _transforms.add)(projection1, projection2, forwardTransform);
      (0, _transforms.add)(projection2, projection1, inverseTransform);
    });
  });
}
/**
 * Clear all cached projections and transforms.
 */


function clearAllProjections() {
  projections.clear();
  (0, _transforms.clear)();
}
/**
 * @param {Projection|string|undefined} projection Projection.
 * @param {string} defaultCode Default code.
 * @return {Projection} Projection.
 */


function createProjection(projection, defaultCode) {
  if (!projection) {
    return get(defaultCode);
  } else if (typeof projection === 'string') {
    return get(projection);
  } else {
    return (
      /** @type {Projection} */
      projection
    );
  }
}
/**
 * Creates a {@link module:ol/proj~TransformFunction} from a simple 2D coordinate transform
 * function.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} coordTransform Coordinate
 *     transform.
 * @return {TransformFunction} Transform function.
 */


function createTransformFromCoordinateTransform(coordTransform) {
  return (
    /**
     * @param {Array<number>} input Input.
     * @param {Array<number>=} opt_output Output.
     * @param {number=} opt_dimension Dimension.
     * @return {Array<number>} Output.
     */
    function (input, opt_output, opt_dimension) {
      var length = input.length;
      var dimension = opt_dimension !== undefined ? opt_dimension : 2;
      var output = opt_output !== undefined ? opt_output : new Array(length);

      for (var i = 0; i < length; i += dimension) {
        var point = coordTransform([input[i], input[i + 1]]);
        output[i] = point[0];
        output[i + 1] = point[1];

        for (var j = dimension - 1; j >= 2; --j) {
          output[i + j] = input[i + j];
        }
      }

      return output;
    }
  );
}
/**
 * Registers coordinate transform functions to convert coordinates between the
 * source projection and the destination projection.
 * The forward and inverse functions convert coordinate pairs; this function
 * converts these into the functions used internally which also handle
 * extents and coordinate arrays.
 *
 * @param {ProjectionLike} source Source projection.
 * @param {ProjectionLike} destination Destination projection.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} forward The forward transform
 *     function (that is, from the source projection to the destination
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}.
 * @param {function(import("./coordinate.js").Coordinate): import("./coordinate.js").Coordinate} inverse The inverse transform
 *     function (that is, from the destination projection to the source
 *     projection) that takes a {@link module:ol/coordinate~Coordinate} as argument and returns
 *     the transformed {@link module:ol/coordinate~Coordinate}.
 * @api
 */


function addCoordinateTransforms(source, destination, forward, inverse) {
  var sourceProj = get(source);
  var destProj = get(destination);
  (0, _transforms.add)(sourceProj, destProj, createTransformFromCoordinateTransform(forward));
  (0, _transforms.add)(destProj, sourceProj, createTransformFromCoordinateTransform(inverse));
}
/**
 * Transforms a coordinate from longitude/latitude to a different projection.
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate as longitude and latitude, i.e.
 *     an array with longitude as 1st and latitude as 2nd element.
 * @param {ProjectionLike=} opt_projection Target projection. The
 *     default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate projected to the target projection.
 * @api
 */


function fromLonLat(coordinate, opt_projection) {
  return transform(coordinate, 'EPSG:4326', opt_projection !== undefined ? opt_projection : 'EPSG:3857');
}
/**
 * Transforms a coordinate to longitude/latitude.
 * @param {import("./coordinate.js").Coordinate} coordinate Projected coordinate.
 * @param {ProjectionLike=} opt_projection Projection of the coordinate.
 *     The default is Web Mercator, i.e. 'EPSG:3857'.
 * @return {import("./coordinate.js").Coordinate} Coordinate as longitude and latitude, i.e. an array
 *     with longitude as 1st and latitude as 2nd element.
 * @api
 */


function toLonLat(coordinate, opt_projection) {
  var lonLat = transform(coordinate, opt_projection !== undefined ? opt_projection : 'EPSG:3857', 'EPSG:4326');
  var lon = lonLat[0];

  if (lon < -180 || lon > 180) {
    lonLat[0] = (0, _math.modulo)(lon + 180, 360) - 180;
  }

  return lonLat;
}
/**
 * Checks if two projections are the same, that is every coordinate in one
 * projection does represent the same geographic point as the same coordinate in
 * the other projection.
 *
 * @param {Projection} projection1 Projection 1.
 * @param {Projection} projection2 Projection 2.
 * @return {boolean} Equivalent.
 * @api
 */


function equivalent(projection1, projection2) {
  if (projection1 === projection2) {
    return true;
  }

  var equalUnits = projection1.getUnits() === projection2.getUnits();

  if (projection1.getCode() === projection2.getCode()) {
    return equalUnits;
  } else {
    var transformFunc = getTransformFromProjections(projection1, projection2);
    return transformFunc === cloneTransform && equalUnits;
  }
}
/**
 * Searches in the list of transform functions for the function for converting
 * coordinates from the source projection to the destination projection.
 *
 * @param {Projection} sourceProjection Source Projection object.
 * @param {Projection} destinationProjection Destination Projection
 *     object.
 * @return {TransformFunction} Transform function.
 */


function getTransformFromProjections(sourceProjection, destinationProjection) {
  var sourceCode = sourceProjection.getCode();
  var destinationCode = destinationProjection.getCode();
  var transformFunc = (0, _transforms.get)(sourceCode, destinationCode);

  if (!transformFunc) {
    transformFunc = identityTransform;
  }

  return transformFunc;
}
/**
 * Given the projection-like objects, searches for a transformation
 * function to convert a coordinates array from the source projection to the
 * destination projection.
 *
 * @param {ProjectionLike} source Source.
 * @param {ProjectionLike} destination Destination.
 * @return {TransformFunction} Transform function.
 * @api
 */


function getTransform(source, destination) {
  var sourceProjection = get(source);
  var destinationProjection = get(destination);
  return getTransformFromProjections(sourceProjection, destinationProjection);
}
/**
 * Transforms a coordinate from source projection to destination projection.
 * This returns a new coordinate (and does not modify the original).
 *
 * See {@link module:ol/proj~transformExtent} for extent transformation.
 * See the transform method of {@link module:ol/geom/Geometry~Geometry} and its
 * subclasses for geometry transforms.
 *
 * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @return {import("./coordinate.js").Coordinate} Coordinate.
 * @api
 */


function transform(coordinate, source, destination) {
  var transformFunc = getTransform(source, destination);
  return transformFunc(coordinate, undefined, coordinate.length);
}
/**
 * Transforms an extent from source projection to destination projection.  This
 * returns a new extent (and does not modify the original).
 *
 * @param {import("./extent.js").Extent} extent The extent to transform.
 * @param {ProjectionLike} source Source projection-like.
 * @param {ProjectionLike} destination Destination projection-like.
 * @return {import("./extent.js").Extent} The transformed extent.
 * @api
 */


function transformExtent(extent, source, destination) {
  var transformFunc = getTransform(source, destination);
  return (0, _extent.applyTransform)(extent, transformFunc);
}
/**
 * Transforms the given point to the destination projection.
 *
 * @param {import("./coordinate.js").Coordinate} point Point.
 * @param {Projection} sourceProjection Source projection.
 * @param {Projection} destinationProjection Destination projection.
 * @return {import("./coordinate.js").Coordinate} Point.
 */


function transformWithProjections(point, sourceProjection, destinationProjection) {
  var transformFunc = getTransformFromProjections(sourceProjection, destinationProjection);
  return transformFunc(point);
}
/**
 * Add transforms to and from EPSG:4326 and EPSG:3857.  This function is called
 * by when this module is executed and should only need to be called again after
 * `clearAllProjections()` is called (e.g. in tests).
 */


function addCommon() {
  // Add transformations that don't alter coordinates to convert within set of
  // projections with equal meaning.
  addEquivalentProjections(_epsg.PROJECTIONS);
  addEquivalentProjections(_epsg2.PROJECTIONS); // Add transformations to convert EPSG:4326 like coordinates to EPSG:3857 like
  // coordinates and back.

  addEquivalentTransforms(_epsg2.PROJECTIONS, _epsg.PROJECTIONS, _epsg.fromEPSG4326, _epsg.toEPSG4326);
}

addCommon();
},{"./sphere.js":"node_modules/ol/sphere.js","./extent.js":"node_modules/ol/extent.js","./math.js":"node_modules/ol/math.js","./proj/epsg3857.js":"node_modules/ol/proj/epsg3857.js","./proj/epsg4326.js":"node_modules/ol/proj/epsg4326.js","./proj/Projection.js":"node_modules/ol/proj/Projection.js","./proj/Units.js":"node_modules/ol/proj/Units.js","./proj/projections.js":"node_modules/ol/proj/projections.js","./proj/transforms.js":"node_modules/ol/proj/transforms.js"}],"node_modules/ol/transform.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = create;
exports.reset = reset;
exports.multiply = multiply;
exports.set = set;
exports.setFromArray = setFromArray;
exports.apply = apply;
exports.rotate = rotate;
exports.scale = scale;
exports.translate = translate;
exports.compose = compose;
exports.invert = invert;
exports.determinant = determinant;

var _asserts = require("./asserts.js");

/**
 * @module ol/transform
 */

/**
 * An array representing an affine 2d transformation for use with
 * {@link module:ol/transform} functions. The array has 6 elements.
 * @typedef {!Array<number>} Transform
 */

/**
 * Collection of affine 2d transformation functions. The functions work on an
 * array of 6 elements. The element order is compatible with the [SVGMatrix
 * interface](https://developer.mozilla.org/en-US/docs/Web/API/SVGMatrix) and is
 * a subset (elements a to f) of a 3×3 matrix:
 * ```
 * [ a c e ]
 * [ b d f ]
 * [ 0 0 1 ]
 * ```
 */

/**
 * @private
 * @type {Transform}
 */
var tmp_ = new Array(6);
/**
 * Create an identity transform.
 * @return {!Transform} Identity transform.
 */

function create() {
  return [1, 0, 0, 1, 0, 0];
}
/**
 * Resets the given transform to an identity transform.
 * @param {!Transform} transform Transform.
 * @return {!Transform} Transform.
 */


function reset(transform) {
  return set(transform, 1, 0, 0, 1, 0, 0);
}
/**
 * Multiply the underlying matrices of two transforms and return the result in
 * the first transform.
 * @param {!Transform} transform1 Transform parameters of matrix 1.
 * @param {!Transform} transform2 Transform parameters of matrix 2.
 * @return {!Transform} transform1 multiplied with transform2.
 */


function multiply(transform1, transform2) {
  var a1 = transform1[0];
  var b1 = transform1[1];
  var c1 = transform1[2];
  var d1 = transform1[3];
  var e1 = transform1[4];
  var f1 = transform1[5];
  var a2 = transform2[0];
  var b2 = transform2[1];
  var c2 = transform2[2];
  var d2 = transform2[3];
  var e2 = transform2[4];
  var f2 = transform2[5];
  transform1[0] = a1 * a2 + c1 * b2;
  transform1[1] = b1 * a2 + d1 * b2;
  transform1[2] = a1 * c2 + c1 * d2;
  transform1[3] = b1 * c2 + d1 * d2;
  transform1[4] = a1 * e2 + c1 * f2 + e1;
  transform1[5] = b1 * e2 + d1 * f2 + f1;
  return transform1;
}
/**
 * Set the transform components a-f on a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} a The a component of the transform.
 * @param {number} b The b component of the transform.
 * @param {number} c The c component of the transform.
 * @param {number} d The d component of the transform.
 * @param {number} e The e component of the transform.
 * @param {number} f The f component of the transform.
 * @return {!Transform} Matrix with transform applied.
 */


function set(transform, a, b, c, d, e, f) {
  transform[0] = a;
  transform[1] = b;
  transform[2] = c;
  transform[3] = d;
  transform[4] = e;
  transform[5] = f;
  return transform;
}
/**
 * Set transform on one matrix from another matrix.
 * @param {!Transform} transform1 Matrix to set transform to.
 * @param {!Transform} transform2 Matrix to set transform from.
 * @return {!Transform} transform1 with transform from transform2 applied.
 */


function setFromArray(transform1, transform2) {
  transform1[0] = transform2[0];
  transform1[1] = transform2[1];
  transform1[2] = transform2[2];
  transform1[3] = transform2[3];
  transform1[4] = transform2[4];
  transform1[5] = transform2[5];
  return transform1;
}
/**
 * Transforms the given coordinate with the given transform returning the
 * resulting, transformed coordinate. The coordinate will be modified in-place.
 *
 * @param {Transform} transform The transformation.
 * @param {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} coordinate The coordinate to transform.
 * @return {import("./coordinate.js").Coordinate|import("./pixel.js").Pixel} return coordinate so that operations can be
 *     chained together.
 */


function apply(transform, coordinate) {
  var x = coordinate[0];
  var y = coordinate[1];
  coordinate[0] = transform[0] * x + transform[2] * y + transform[4];
  coordinate[1] = transform[1] * x + transform[3] * y + transform[5];
  return coordinate;
}
/**
 * Applies rotation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} angle Angle in radians.
 * @return {!Transform} The rotated transform.
 */


function rotate(transform, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  return multiply(transform, set(tmp_, cos, sin, -sin, cos, 0, 0));
}
/**
 * Applies scale to a given transform.
 * @param {!Transform} transform Transform.
 * @param {number} x Scale factor x.
 * @param {number} y Scale factor y.
 * @return {!Transform} The scaled transform.
 */


function scale(transform, x, y) {
  return multiply(transform, set(tmp_, x, 0, 0, y, 0, 0));
}
/**
 * Applies translation to the given transform.
 * @param {!Transform} transform Transform.
 * @param {number} dx Translation x.
 * @param {number} dy Translation y.
 * @return {!Transform} The translated transform.
 */


function translate(transform, dx, dy) {
  return multiply(transform, set(tmp_, 1, 0, 0, 1, dx, dy));
}
/**
 * Creates a composite transform given an initial translation, scale, rotation, and
 * final translation (in that order only, not commutative).
 * @param {!Transform} transform The transform (will be modified in place).
 * @param {number} dx1 Initial translation x.
 * @param {number} dy1 Initial translation y.
 * @param {number} sx Scale factor x.
 * @param {number} sy Scale factor y.
 * @param {number} angle Rotation (in counter-clockwise radians).
 * @param {number} dx2 Final translation x.
 * @param {number} dy2 Final translation y.
 * @return {!Transform} The composite transform.
 */


function compose(transform, dx1, dy1, sx, sy, angle, dx2, dy2) {
  var sin = Math.sin(angle);
  var cos = Math.cos(angle);
  transform[0] = sx * cos;
  transform[1] = sy * sin;
  transform[2] = -sx * sin;
  transform[3] = sy * cos;
  transform[4] = dx2 * sx * cos - dy2 * sx * sin + dx1;
  transform[5] = dx2 * sy * sin + dy2 * sy * cos + dy1;
  return transform;
}
/**
 * Invert the given transform.
 * @param {!Transform} transform Transform.
 * @return {!Transform} Inverse of the transform.
 */


function invert(transform) {
  var det = determinant(transform);
  (0, _asserts.assert)(det !== 0, 32); // Transformation matrix cannot be inverted

  var a = transform[0];
  var b = transform[1];
  var c = transform[2];
  var d = transform[3];
  var e = transform[4];
  var f = transform[5];
  transform[0] = d / det;
  transform[1] = -b / det;
  transform[2] = -c / det;
  transform[3] = a / det;
  transform[4] = (c * f - d * e) / det;
  transform[5] = -(a * f - b * e) / det;
  return transform;
}
/**
 * Returns the determinant of the given matrix.
 * @param {!Transform} mat Matrix.
 * @return {number} Determinant.
 */


function determinant(mat) {
  return mat[0] * mat[3] - mat[1] * mat[2];
}
},{"./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/geom/Geometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util.js");

var _Object = _interopRequireDefault(require("../Object.js"));

var _extent = require("../extent.js");

var _transform = require("./flat/transform.js");

var _proj = require("../proj.js");

var _Units = _interopRequireDefault(require("../proj/Units.js"));

var _transform2 = require("../transform.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/geom/Geometry
 */

/**
 * @type {import("../transform.js").Transform}
 */
var tmpTransform = (0, _transform2.create)();
/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for vector geometries.
 *
 * To get notified of changes to the geometry, register a listener for the
 * generic `change` event on your geometry instance.
 *
 * @abstract
 * @api
 */

var Geometry =
/*@__PURE__*/
function (BaseObject) {
  function Geometry() {
    BaseObject.call(this);
    /**
     * @private
     * @type {import("../extent.js").Extent}
     */

    this.extent_ = (0, _extent.createEmpty)();
    /**
     * @private
     * @type {number}
     */

    this.extentRevision_ = -1;
    /**
     * @protected
     * @type {Object<string, Geometry>}
     */

    this.simplifiedGeometryCache = {};
    /**
     * @protected
     * @type {number}
     */

    this.simplifiedGeometryMaxMinSquaredTolerance = 0;
    /**
     * @protected
     * @type {number}
     */

    this.simplifiedGeometryRevision = 0;
  }

  if (BaseObject) Geometry.__proto__ = BaseObject;
  Geometry.prototype = Object.create(BaseObject && BaseObject.prototype);
  Geometry.prototype.constructor = Geometry;
  /**
   * Make a complete copy of the geometry.
   * @abstract
   * @return {!Geometry} Clone.
   */

  Geometry.prototype.clone = function clone() {
    return (0, _util.abstract)();
  };
  /**
   * @abstract
   * @param {number} x X.
   * @param {number} y Y.
   * @param {import("../coordinate.js").Coordinate} closestPoint Closest point.
   * @param {number} minSquaredDistance Minimum squared distance.
   * @return {number} Minimum squared distance.
   */


  Geometry.prototype.closestPointXY = function closestPointXY(x, y, closestPoint, minSquaredDistance) {
    return (0, _util.abstract)();
  };
  /**
   * @param {number} x X.
   * @param {number} y Y.
   * @return {boolean} Contains (x, y).
   */


  Geometry.prototype.containsXY = function containsXY(x, y) {
    return false;
  };
  /**
   * Return the closest point of the geometry to the passed point as
   * {@link module:ol/coordinate~Coordinate coordinate}.
   * @param {import("../coordinate.js").Coordinate} point Point.
   * @param {import("../coordinate.js").Coordinate=} opt_closestPoint Closest point.
   * @return {import("../coordinate.js").Coordinate} Closest point.
   * @api
   */


  Geometry.prototype.getClosestPoint = function getClosestPoint(point, opt_closestPoint) {
    var closestPoint = opt_closestPoint ? opt_closestPoint : [NaN, NaN];
    this.closestPointXY(point[0], point[1], closestPoint, Infinity);
    return closestPoint;
  };
  /**
   * Returns true if this geometry includes the specified coordinate. If the
   * coordinate is on the boundary of the geometry, returns false.
   * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains coordinate.
   * @api
   */


  Geometry.prototype.intersectsCoordinate = function intersectsCoordinate(coordinate) {
    return this.containsXY(coordinate[0], coordinate[1]);
  };
  /**
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @protected
   * @return {import("../extent.js").Extent} extent Extent.
   */


  Geometry.prototype.computeExtent = function computeExtent(extent) {
    return (0, _util.abstract)();
  };
  /**
   * Get the extent of the geometry.
   * @param {import("../extent.js").Extent=} opt_extent Extent.
   * @return {import("../extent.js").Extent} extent Extent.
   * @api
   */


  Geometry.prototype.getExtent = function getExtent(opt_extent) {
    if (this.extentRevision_ != this.getRevision()) {
      this.extent_ = this.computeExtent(this.extent_);
      this.extentRevision_ = this.getRevision();
    }

    return (0, _extent.returnOrUpdate)(this.extent_, opt_extent);
  };
  /**
   * Rotate the geometry around a given coordinate. This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} angle Rotation angle in radians.
   * @param {import("../coordinate.js").Coordinate} anchor The rotation center.
   * @api
   */


  Geometry.prototype.rotate = function rotate(angle, anchor) {
    (0, _util.abstract)();
  };
  /**
   * Scale the geometry (with an optional origin).  This modifies the geometry
   * coordinates in place.
   * @abstract
   * @param {number} sx The scaling factor in the x-direction.
   * @param {number=} opt_sy The scaling factor in the y-direction (defaults to
   *     sx).
   * @param {import("../coordinate.js").Coordinate=} opt_anchor The scale origin (defaults to the center
   *     of the geometry extent).
   * @api
   */


  Geometry.prototype.scale = function scale(sx, opt_sy, opt_anchor) {
    (0, _util.abstract)();
  };
  /**
   * Create a simplified version of this geometry.  For linestrings, this uses
   * the the {@link
   * https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm
   * Douglas Peucker} algorithm.  For polygons, a quantization-based
   * simplification is used to preserve topology.
   * @param {number} tolerance The tolerance distance for simplification.
   * @return {Geometry} A new, simplified version of the original geometry.
   * @api
   */


  Geometry.prototype.simplify = function simplify(tolerance) {
    return this.getSimplifiedGeometry(tolerance * tolerance);
  };
  /**
   * Create a simplified version of this geometry using the Douglas Peucker
   * algorithm.
   * See https://en.wikipedia.org/wiki/Ramer-Douglas-Peucker_algorithm.
   * @abstract
   * @param {number} squaredTolerance Squared tolerance.
   * @return {Geometry} Simplified geometry.
   */


  Geometry.prototype.getSimplifiedGeometry = function getSimplifiedGeometry(squaredTolerance) {
    return (0, _util.abstract)();
  };
  /**
   * Get the type of this geometry.
   * @abstract
   * @return {import("./GeometryType.js").default} Geometry type.
   */


  Geometry.prototype.getType = function getType() {
    return (0, _util.abstract)();
  };
  /**
   * Apply a transform function to each coordinate of the geometry.
   * The geometry is modified in place.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   * @abstract
   * @param {import("../proj.js").TransformFunction} transformFn Transform.
   */


  Geometry.prototype.applyTransform = function applyTransform(transformFn) {
    (0, _util.abstract)();
  };
  /**
   * Test if the geometry and the passed extent intersect.
   * @abstract
   * @param {import("../extent.js").Extent} extent Extent.
   * @return {boolean} `true` if the geometry and the extent intersect.
   */


  Geometry.prototype.intersectsExtent = function intersectsExtent(extent) {
    return (0, _util.abstract)();
  };
  /**
   * Translate the geometry.  This modifies the geometry coordinates in place.  If
   * instead you want a new geometry, first `clone()` this geometry.
   * @abstract
   * @param {number} deltaX Delta X.
   * @param {number} deltaY Delta Y.
   * @api
   */


  Geometry.prototype.translate = function translate(deltaX, deltaY) {
    (0, _util.abstract)();
  };
  /**
   * Transform each coordinate of the geometry from one coordinate reference
   * system to another. The geometry is modified in place.
   * For example, a line will be transformed to a line and a circle to a circle.
   * If you do not want the geometry modified in place, first `clone()` it and
   * then use this function on the clone.
   *
   * @param {import("../proj.js").ProjectionLike} source The current projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @param {import("../proj.js").ProjectionLike} destination The desired projection.  Can be a
   *     string identifier or a {@link module:ol/proj/Projection~Projection} object.
   * @return {Geometry} This geometry.  Note that original geometry is
   *     modified in place.
   * @api
   */


  Geometry.prototype.transform = function transform(source, destination) {
    /** @type {import("../proj/Projection.js").default} */
    var sourceProj = (0, _proj.get)(source);
    var transformFn = sourceProj.getUnits() == _Units.default.TILE_PIXELS ? function (inCoordinates, outCoordinates, stride) {
      var pixelExtent = sourceProj.getExtent();
      var projectedExtent = sourceProj.getWorldExtent();
      var scale = (0, _extent.getHeight)(projectedExtent) / (0, _extent.getHeight)(pixelExtent);
      (0, _transform2.compose)(tmpTransform, projectedExtent[0], projectedExtent[3], scale, -scale, 0, 0, 0);
      (0, _transform.transform2D)(inCoordinates, 0, inCoordinates.length, stride, tmpTransform, outCoordinates);
      return (0, _proj.getTransform)(sourceProj, destination)(inCoordinates, outCoordinates, stride);
    } : (0, _proj.getTransform)(sourceProj, destination);
    this.applyTransform(transformFn);
    return this;
  };

  return Geometry;
}(_Object.default);

var _default = Geometry;
exports.default = _default;
},{"../util.js":"node_modules/ol/util.js","../Object.js":"node_modules/ol/Object.js","../extent.js":"node_modules/ol/extent.js","./flat/transform.js":"node_modules/ol/geom/flat/transform.js","../proj.js":"node_modules/ol/proj.js","../proj/Units.js":"node_modules/ol/proj/Units.js","../transform.js":"node_modules/ol/transform.js"}],"node_modules/ol/geom/SimpleGeometry.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStrideForLayout = getStrideForLayout;
exports.transformGeom2D = transformGeom2D;
exports.default = void 0;

var _util = require("../util.js");

var _extent = require("../extent.js");

var _Geometry = _interopRequireDefault(require("./Geometry.js"));

var _GeometryLayout = _interopRequireDefault(require("./GeometryLayout.js"));

var _transform = require("./flat/transform.js");

var _obj = require("../obj.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/geom/SimpleGeometry
 */

/**
 * @classdesc
 * Abstract base class; only used for creating subclasses; do not instantiate
 * in apps, as cannot be rendered.
 *
 * @abstract
 * @api
 */
var SimpleGeometry =
/*@__PURE__*/
function (Geometry) {
  function SimpleGeometry() {
    Geometry.call(this);
    /**
     * @protected
     * @type {GeometryLayout}
     */

    this.layout = _GeometryLayout.default.XY;
    /**
     * @protected
     * @type {number}
     */

    this.stride = 2;
    /**
     * @protected
     * @type {Array<number>}
     */

    this.flatCoordinates = null;
  }

  if (Geometry) SimpleGeometry.__proto__ = Geometry;
  SimpleGeometry.prototype = Object.create(Geometry && Geometry.prototype);
  SimpleGeometry.prototype.constructor = SimpleGeometry;
  /**
   * @inheritDoc
   */

  SimpleGeometry.prototype.computeExtent = function computeExtent(extent) {
    return (0, _extent.createOrUpdateFromFlatCoordinates)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, extent);
  };
  /**
   * @abstract
   * @return {Array} Coordinates.
   */


  SimpleGeometry.prototype.getCoordinates = function getCoordinates() {
    return (0, _util.abstract)();
  };
  /**
   * Return the first coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} First coordinate.
   * @api
   */


  SimpleGeometry.prototype.getFirstCoordinate = function getFirstCoordinate() {
    return this.flatCoordinates.slice(0, this.stride);
  };
  /**
   * @return {Array<number>} Flat coordinates.
   */


  SimpleGeometry.prototype.getFlatCoordinates = function getFlatCoordinates() {
    return this.flatCoordinates;
  };
  /**
   * Return the last coordinate of the geometry.
   * @return {import("../coordinate.js").Coordinate} Last point.
   * @api
   */


  SimpleGeometry.prototype.getLastCoordinate = function getLastCoordinate() {
    return this.flatCoordinates.slice(this.flatCoordinates.length - this.stride);
  };
  /**
   * Return the {@link module:ol/geom/GeometryLayout layout} of the geometry.
   * @return {GeometryLayout} Layout.
   * @api
   */


  SimpleGeometry.prototype.getLayout = function getLayout() {
    return this.layout;
  };
  /**
   * @inheritDoc
   */


  SimpleGeometry.prototype.getSimplifiedGeometry = function getSimplifiedGeometry(squaredTolerance) {
    if (this.simplifiedGeometryRevision != this.getRevision()) {
      (0, _obj.clear)(this.simplifiedGeometryCache);
      this.simplifiedGeometryMaxMinSquaredTolerance = 0;
      this.simplifiedGeometryRevision = this.getRevision();
    } // If squaredTolerance is negative or if we know that simplification will not
    // have any effect then just return this.


    if (squaredTolerance < 0 || this.simplifiedGeometryMaxMinSquaredTolerance !== 0 && squaredTolerance <= this.simplifiedGeometryMaxMinSquaredTolerance) {
      return this;
    }

    var key = squaredTolerance.toString();

    if (this.simplifiedGeometryCache.hasOwnProperty(key)) {
      return this.simplifiedGeometryCache[key];
    } else {
      var simplifiedGeometry = this.getSimplifiedGeometryInternal(squaredTolerance);
      var simplifiedFlatCoordinates = simplifiedGeometry.getFlatCoordinates();

      if (simplifiedFlatCoordinates.length < this.flatCoordinates.length) {
        this.simplifiedGeometryCache[key] = simplifiedGeometry;
        return simplifiedGeometry;
      } else {
        // Simplification did not actually remove any coordinates.  We now know
        // that any calls to getSimplifiedGeometry with a squaredTolerance less
        // than or equal to the current squaredTolerance will also not have any
        // effect.  This allows us to short circuit simplification (saving CPU
        // cycles) and prevents the cache of simplified geometries from filling
        // up with useless identical copies of this geometry (saving memory).
        this.simplifiedGeometryMaxMinSquaredTolerance = squaredTolerance;
        return this;
      }
    }
  };
  /**
   * @param {number} squaredTolerance Squared tolerance.
   * @return {SimpleGeometry} Simplified geometry.
   * @protected
   */


  SimpleGeometry.prototype.getSimplifiedGeometryInternal = function getSimplifiedGeometryInternal(squaredTolerance) {
    return this;
  };
  /**
   * @return {number} Stride.
   */


  SimpleGeometry.prototype.getStride = function getStride() {
    return this.stride;
  };
  /**
   * @param {GeometryLayout} layout Layout.
   * @param {Array<number>} flatCoordinates Flat coordinates.
   */


  SimpleGeometry.prototype.setFlatCoordinates = function setFlatCoordinates(layout, flatCoordinates) {
    this.stride = getStrideForLayout(layout);
    this.layout = layout;
    this.flatCoordinates = flatCoordinates;
  };
  /**
   * @abstract
   * @param {!Array} coordinates Coordinates.
   * @param {GeometryLayout=} opt_layout Layout.
   */


  SimpleGeometry.prototype.setCoordinates = function setCoordinates(coordinates, opt_layout) {
    (0, _util.abstract)();
  };
  /**
   * @param {GeometryLayout|undefined} layout Layout.
   * @param {Array} coordinates Coordinates.
   * @param {number} nesting Nesting.
   * @protected
   */


  SimpleGeometry.prototype.setLayout = function setLayout(layout, coordinates, nesting) {
    /** @type {number} */
    var stride;

    if (layout) {
      stride = getStrideForLayout(layout);
    } else {
      for (var i = 0; i < nesting; ++i) {
        if (coordinates.length === 0) {
          this.layout = _GeometryLayout.default.XY;
          this.stride = 2;
          return;
        } else {
          coordinates =
          /** @type {Array} */
          coordinates[0];
        }
      }

      stride = coordinates.length;
      layout = getLayoutForStride(stride);
    }

    this.layout = layout;
    this.stride = stride;
  };
  /**
   * @inheritDoc
   * @api
   */


  SimpleGeometry.prototype.applyTransform = function applyTransform(transformFn) {
    if (this.flatCoordinates) {
      transformFn(this.flatCoordinates, this.flatCoordinates, this.stride);
      this.changed();
    }
  };
  /**
   * @inheritDoc
   * @api
   */


  SimpleGeometry.prototype.rotate = function rotate$1(angle, anchor) {
    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0, _transform.rotate)(flatCoordinates, 0, flatCoordinates.length, stride, angle, anchor, flatCoordinates);
      this.changed();
    }
  };
  /**
   * @inheritDoc
   * @api
   */


  SimpleGeometry.prototype.scale = function scale$1(sx, opt_sy, opt_anchor) {
    var sy = opt_sy;

    if (sy === undefined) {
      sy = sx;
    }

    var anchor = opt_anchor;

    if (!anchor) {
      anchor = (0, _extent.getCenter)(this.getExtent());
    }

    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0, _transform.scale)(flatCoordinates, 0, flatCoordinates.length, stride, sx, sy, anchor, flatCoordinates);
      this.changed();
    }
  };
  /**
   * @inheritDoc
   * @api
   */


  SimpleGeometry.prototype.translate = function translate$1(deltaX, deltaY) {
    var flatCoordinates = this.getFlatCoordinates();

    if (flatCoordinates) {
      var stride = this.getStride();
      (0, _transform.translate)(flatCoordinates, 0, flatCoordinates.length, stride, deltaX, deltaY, flatCoordinates);
      this.changed();
    }
  };

  return SimpleGeometry;
}(_Geometry.default);
/**
 * @param {number} stride Stride.
 * @return {GeometryLayout} layout Layout.
 */


function getLayoutForStride(stride) {
  var layout;

  if (stride == 2) {
    layout = _GeometryLayout.default.XY;
  } else if (stride == 3) {
    layout = _GeometryLayout.default.XYZ;
  } else if (stride == 4) {
    layout = _GeometryLayout.default.XYZM;
  }

  return (
    /** @type {GeometryLayout} */
    layout
  );
}
/**
 * @param {GeometryLayout} layout Layout.
 * @return {number} Stride.
 */


function getStrideForLayout(layout) {
  var stride;

  if (layout == _GeometryLayout.default.XY) {
    stride = 2;
  } else if (layout == _GeometryLayout.default.XYZ || layout == _GeometryLayout.default.XYM) {
    stride = 3;
  } else if (layout == _GeometryLayout.default.XYZM) {
    stride = 4;
  }

  return (
    /** @type {number} */
    stride
  );
}
/**
 * @param {SimpleGeometry} simpleGeometry Simple geometry.
 * @param {import("../transform.js").Transform} transform Transform.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Transformed flat coordinates.
 */


function transformGeom2D(simpleGeometry, transform, opt_dest) {
  var flatCoordinates = simpleGeometry.getFlatCoordinates();

  if (!flatCoordinates) {
    return null;
  } else {
    var stride = simpleGeometry.getStride();
    return (0, _transform.transform2D)(flatCoordinates, 0, flatCoordinates.length, stride, transform, opt_dest);
  }
}

var _default = SimpleGeometry;
exports.default = _default;
},{"../util.js":"node_modules/ol/util.js","../extent.js":"node_modules/ol/extent.js","./Geometry.js":"node_modules/ol/geom/Geometry.js","./GeometryLayout.js":"node_modules/ol/geom/GeometryLayout.js","./flat/transform.js":"node_modules/ol/geom/flat/transform.js","../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/geom/flat/area.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearRing = linearRing;
exports.linearRings = linearRings;
exports.linearRingss = linearRingss;

/**
 * @module ol/geom/flat/area
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {number} Area.
 */
function linearRing(flatCoordinates, offset, end, stride) {
  var twiceArea = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    twiceArea += y1 * x2 - x1 * y2;
    x1 = x2;
    y1 = y2;
  }

  return twiceArea / 2;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @return {number} Area.
 */


function linearRings(flatCoordinates, offset, ends, stride) {
  var area = 0;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    area += linearRing(flatCoordinates, offset, end, stride);
    offset = end;
  }

  return area;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @return {number} Area.
 */


function linearRingss(flatCoordinates, offset, endss, stride) {
  var area = 0;

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    area += linearRings(flatCoordinates, offset, ends, stride);
    offset = ends[ends.length - 1];
  }

  return area;
}
},{}],"node_modules/ol/geom/flat/closest.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.maxSquaredDelta = maxSquaredDelta;
exports.arrayMaxSquaredDelta = arrayMaxSquaredDelta;
exports.multiArrayMaxSquaredDelta = multiArrayMaxSquaredDelta;
exports.assignClosestPoint = assignClosestPoint;
exports.assignClosestArrayPoint = assignClosestArrayPoint;
exports.assignClosestMultiArrayPoint = assignClosestMultiArrayPoint;

var _math = require("../../math.js");

/**
 * @module ol/geom/flat/closest
 */

/**
 * Returns the point on the 2D line segment flatCoordinates[offset1] to
 * flatCoordinates[offset2] that is closest to the point (x, y).  Extra
 * dimensions are linearly interpolated.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset1 Offset 1.
 * @param {number} offset2 Offset 2.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 */
function assignClosest(flatCoordinates, offset1, offset2, stride, x, y, closestPoint) {
  var x1 = flatCoordinates[offset1];
  var y1 = flatCoordinates[offset1 + 1];
  var dx = flatCoordinates[offset2] - x1;
  var dy = flatCoordinates[offset2 + 1] - y1;
  var offset;

  if (dx === 0 && dy === 0) {
    offset = offset1;
  } else {
    var t = ((x - x1) * dx + (y - y1) * dy) / (dx * dx + dy * dy);

    if (t > 1) {
      offset = offset2;
    } else if (t > 0) {
      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = (0, _math.lerp)(flatCoordinates[offset1 + i], flatCoordinates[offset2 + i], t);
      }

      closestPoint.length = stride;
      return;
    } else {
      offset = offset1;
    }
  }

  for (var i$1 = 0; i$1 < stride; ++i$1) {
    closestPoint[i$1] = flatCoordinates[offset + i$1];
  }

  closestPoint.length = stride;
}
/**
 * Return the squared of the largest distance between any pair of consecutive
 * coordinates.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */


function maxSquaredDelta(flatCoordinates, offset, end, stride, max) {
  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1];

  for (offset += stride; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    var squaredDelta = (0, _math.squaredDistance)(x1, y1, x2, y2);

    if (squaredDelta > max) {
      max = squaredDelta;
    }

    x1 = x2;
    y1 = y2;
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */


function arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    max = maxSquaredDelta(flatCoordinates, offset, end, stride, max);
    offset = end;
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} max Max squared delta.
 * @return {number} Max squared delta.
 */


function multiArrayMaxSquaredDelta(flatCoordinates, offset, endss, stride, max) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    max = arrayMaxSquaredDelta(flatCoordinates, offset, ends, stride, max);
    offset = ends[ends.length - 1];
  }

  return max;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>=} opt_tmpPoint Temporary point object.
 * @return {number} Minimum squared distance.
 */


function assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  if (offset == end) {
    return minSquaredDistance;
  }

  var i, squaredDistance;

  if (maxDelta === 0) {
    // All points are identical, so just test the first point.
    squaredDistance = (0, _math.squaredDistance)(x, y, flatCoordinates[offset], flatCoordinates[offset + 1]);

    if (squaredDistance < minSquaredDistance) {
      for (i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[offset + i];
      }

      closestPoint.length = stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  }

  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];
  var index = offset + stride;

  while (index < end) {
    assignClosest(flatCoordinates, index - stride, index, stride, x, y, tmpPoint);
    squaredDistance = (0, _math.squaredDistance)(x, y, tmpPoint[0], tmpPoint[1]);

    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;

      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }

      closestPoint.length = stride;
      index += stride;
    } else {
      // Skip ahead multiple points, because we know that all the skipped
      // points cannot be any closer than the closest point we have found so
      // far.  We know this because we know how close the current point is, how
      // close the closest point we have found so far is, and the maximum
      // distance between consecutive points.  For example, if we're currently
      // at distance 10, the best we've found so far is 3, and that the maximum
      // distance between consecutive points is 2, then we'll need to skip at
      // least (10 - 3) / 2 == 3 (rounded down) points to have any chance of
      // finding a closer point.  We use Math.max(..., 1) to ensure that we
      // always advance at least one point, to avoid an infinite loop.
      index += stride * Math.max((Math.sqrt(squaredDistance) - Math.sqrt(minSquaredDistance)) / maxDelta | 0, 1);
    }
  }

  if (isRing) {
    // Check the closing segment.
    assignClosest(flatCoordinates, end - stride, offset, stride, x, y, tmpPoint);
    squaredDistance = (0, _math.squaredDistance)(x, y, tmpPoint[0], tmpPoint[1]);

    if (squaredDistance < minSquaredDistance) {
      minSquaredDistance = squaredDistance;

      for (i = 0; i < stride; ++i) {
        closestPoint[i] = tmpPoint[i];
      }

      closestPoint.length = stride;
    }
  }

  return minSquaredDistance;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>=} opt_tmpPoint Temporary point object.
 * @return {number} Minimum squared distance.
 */


function assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    minSquaredDistance = assignClosestPoint(flatCoordinates, offset, end, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset = end;
  }

  return minSquaredDistance;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} maxDelta Max delta.
 * @param {boolean} isRing Is ring.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {Array<number>} closestPoint Closest point.
 * @param {number} minSquaredDistance Minimum squared distance.
 * @param {Array<number>=} opt_tmpPoint Temporary point object.
 * @return {number} Minimum squared distance.
 */


function assignClosestMultiArrayPoint(flatCoordinates, offset, endss, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, opt_tmpPoint) {
  var tmpPoint = opt_tmpPoint ? opt_tmpPoint : [NaN, NaN];

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    minSquaredDistance = assignClosestArrayPoint(flatCoordinates, offset, ends, stride, maxDelta, isRing, x, y, closestPoint, minSquaredDistance, tmpPoint);
    offset = ends[ends.length - 1];
  }

  return minSquaredDistance;
}
},{"../../math.js":"node_modules/ol/math.js"}],"node_modules/ol/geom/flat/deflate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deflateCoordinate = deflateCoordinate;
exports.deflateCoordinates = deflateCoordinates;
exports.deflateCoordinatesArray = deflateCoordinatesArray;
exports.deflateMultiCoordinatesArray = deflateMultiCoordinatesArray;

/**
 * @module ol/geom/flat/deflate
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */
function deflateCoordinate(flatCoordinates, offset, coordinate, stride) {
  for (var i = 0, ii = coordinate.length; i < ii; ++i) {
    flatCoordinates[offset++] = coordinate[i];
  }

  return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<import("../../coordinate.js").Coordinate>} coordinates Coordinates.
 * @param {number} stride Stride.
 * @return {number} offset Offset.
 */


function deflateCoordinates(flatCoordinates, offset, coordinates, stride) {
  for (var i = 0, ii = coordinates.length; i < ii; ++i) {
    var coordinate = coordinates[i];

    for (var j = 0; j < stride; ++j) {
      flatCoordinates[offset++] = coordinate[j];
    }
  }

  return offset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>} coordinatess Coordinatess.
 * @param {number} stride Stride.
 * @param {Array<number>=} opt_ends Ends.
 * @return {Array<number>} Ends.
 */


function deflateCoordinatesArray(flatCoordinates, offset, coordinatess, stride, opt_ends) {
  var ends = opt_ends ? opt_ends : [];
  var i = 0;

  for (var j = 0, jj = coordinatess.length; j < jj; ++j) {
    var end = deflateCoordinates(flatCoordinates, offset, coordinatess[j], stride);
    ends[i++] = end;
    offset = end;
  }

  ends.length = i;
  return ends;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} coordinatesss Coordinatesss.
 * @param {number} stride Stride.
 * @param {Array<Array<number>>=} opt_endss Endss.
 * @return {Array<Array<number>>} Endss.
 */


function deflateMultiCoordinatesArray(flatCoordinates, offset, coordinatesss, stride, opt_endss) {
  var endss = opt_endss ? opt_endss : [];
  var i = 0;

  for (var j = 0, jj = coordinatesss.length; j < jj; ++j) {
    var ends = deflateCoordinatesArray(flatCoordinates, offset, coordinatesss[j], stride, endss[i]);
    endss[i++] = ends;
    offset = ends[ends.length - 1];
  }

  endss.length = i;
  return endss;
}
},{}],"node_modules/ol/geom/flat/inflate.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inflateCoordinates = inflateCoordinates;
exports.inflateCoordinatesArray = inflateCoordinatesArray;
exports.inflateMultiCoordinatesArray = inflateMultiCoordinatesArray;

/**
 * @module ol/geom/flat/inflate
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {Array<import("../../coordinate.js").Coordinate>=} opt_coordinates Coordinates.
 * @return {Array<import("../../coordinate.js").Coordinate>} Coordinates.
 */
function inflateCoordinates(flatCoordinates, offset, end, stride, opt_coordinates) {
  var coordinates = opt_coordinates !== undefined ? opt_coordinates : [];
  var i = 0;

  for (var j = offset; j < end; j += stride) {
    coordinates[i++] = flatCoordinates.slice(j, j + stride);
  }

  coordinates.length = i;
  return coordinates;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<Array<import("../../coordinate.js").Coordinate>>=} opt_coordinatess Coordinatess.
 * @return {Array<Array<import("../../coordinate.js").Coordinate>>} Coordinatess.
 */


function inflateCoordinatesArray(flatCoordinates, offset, ends, stride, opt_coordinatess) {
  var coordinatess = opt_coordinatess !== undefined ? opt_coordinatess : [];
  var i = 0;

  for (var j = 0, jj = ends.length; j < jj; ++j) {
    var end = ends[j];
    coordinatess[i++] = inflateCoordinates(flatCoordinates, offset, end, stride, coordinatess[i]);
    offset = end;
  }

  coordinatess.length = i;
  return coordinatess;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<Array<Array<import("../../coordinate.js").Coordinate>>>=} opt_coordinatesss
 *     Coordinatesss.
 * @return {Array<Array<Array<import("../../coordinate.js").Coordinate>>>} Coordinatesss.
 */


function inflateMultiCoordinatesArray(flatCoordinates, offset, endss, stride, opt_coordinatesss) {
  var coordinatesss = opt_coordinatesss !== undefined ? opt_coordinatesss : [];
  var i = 0;

  for (var j = 0, jj = endss.length; j < jj; ++j) {
    var ends = endss[j];
    coordinatesss[i++] = inflateCoordinatesArray(flatCoordinates, offset, ends, stride, coordinatesss[i]);
    offset = ends[ends.length - 1];
  }

  coordinatesss.length = i;
  return coordinatesss;
}
},{}],"node_modules/ol/geom/flat/simplify.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simplifyLineString = simplifyLineString;
exports.douglasPeucker = douglasPeucker;
exports.douglasPeuckerArray = douglasPeuckerArray;
exports.douglasPeuckerMultiArray = douglasPeuckerMultiArray;
exports.radialDistance = radialDistance;
exports.snap = snap;
exports.quantize = quantize;
exports.quantizeArray = quantizeArray;
exports.quantizeMultiArray = quantizeMultiArray;

var _math = require("../../math.js");

/**
 * @module ol/geom/flat/simplify
 */
// Based on simplify-js https://github.com/mourner/simplify-js
// Copyright (c) 2012, Vladimir Agafonkin
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//    1. Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//
//    2. Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {boolean} highQuality Highest quality.
 * @param {Array<number>=} opt_simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @return {Array<number>} Simplified line string.
 */
function simplifyLineString(flatCoordinates, offset, end, stride, squaredTolerance, highQuality, opt_simplifiedFlatCoordinates) {
  var simplifiedFlatCoordinates = opt_simplifiedFlatCoordinates !== undefined ? opt_simplifiedFlatCoordinates : [];

  if (!highQuality) {
    end = radialDistance(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    flatCoordinates = simplifiedFlatCoordinates;
    offset = 0;
    stride = 2;
  }

  simplifiedFlatCoordinates.length = douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, 0);
  return simplifiedFlatCoordinates;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */


function douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  var n = (end - offset) / stride;

  if (n < 3) {
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }

    return simplifiedOffset;
  }
  /** @type {Array<number>} */


  var markers = new Array(n);
  markers[0] = 1;
  markers[n - 1] = 1;
  /** @type {Array<number>} */

  var stack = [offset, end - stride];
  var index = 0;

  while (stack.length > 0) {
    var last = stack.pop();
    var first = stack.pop();
    var maxSquaredDistance = 0;
    var x1 = flatCoordinates[first];
    var y1 = flatCoordinates[first + 1];
    var x2 = flatCoordinates[last];
    var y2 = flatCoordinates[last + 1];

    for (var i = first + stride; i < last; i += stride) {
      var x = flatCoordinates[i];
      var y = flatCoordinates[i + 1];
      var squaredDistance = (0, _math.squaredSegmentDistance)(x, y, x1, y1, x2, y2);

      if (squaredDistance > maxSquaredDistance) {
        index = i;
        maxSquaredDistance = squaredDistance;
      }
    }

    if (maxSquaredDistance > squaredTolerance) {
      markers[(index - offset) / stride] = 1;

      if (first + stride < index) {
        stack.push(first, index);
      }

      if (index + stride < last) {
        stack.push(index, last);
      }
    }
  }

  for (var i$1 = 0; i$1 < n; ++i$1) {
    if (markers[i$1]) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i$1 * stride];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + i$1 * stride + 1];
    }
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */


function douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = douglasPeucker(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */


function douglasPeuckerMultiArray(flatCoordinates, offset, endss, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    var simplifiedEnds = [];
    simplifiedOffset = douglasPeuckerArray(flatCoordinates, offset, ends, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} squaredTolerance Squared tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */


function radialDistance(flatCoordinates, offset, end, stride, squaredTolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  if (end <= offset + stride) {
    // zero or one point, no simplification possible, so copy and return
    for (; offset < end; offset += stride) {
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset];
      simplifiedFlatCoordinates[simplifiedOffset++] = flatCoordinates[offset + 1];
    }

    return simplifiedOffset;
  }

  var x1 = flatCoordinates[offset];
  var y1 = flatCoordinates[offset + 1]; // copy first point

  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1;
  var x2 = x1;
  var y2 = y1;

  for (offset += stride; offset < end; offset += stride) {
    x2 = flatCoordinates[offset];
    y2 = flatCoordinates[offset + 1];

    if ((0, _math.squaredDistance)(x1, y1, x2, y2) > squaredTolerance) {
      // copy point at offset
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      x1 = x2;
      y1 = y2;
    }
  }

  if (x2 != x1 || y2 != y1) {
    // copy last point
    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
  }

  return simplifiedOffset;
}
/**
 * @param {number} value Value.
 * @param {number} tolerance Tolerance.
 * @return {number} Rounded value.
 */


function snap(value, tolerance) {
  return tolerance * Math.round(value / tolerance);
}
/**
 * Simplifies a line string using an algorithm designed by Tim Schaub.
 * Coordinates are snapped to the nearest value in a virtual grid and
 * consecutive duplicate coordinates are discarded.  This effectively preserves
 * topology as the simplification of any subsection of a line string is
 * independent of the rest of the line string.  This means that, for examples,
 * the common edge between two polygons will be simplified to the same line
 * string independently in both polygons.  This implementation uses a single
 * pass over the coordinates and eliminates intermediate collinear points.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @return {number} Simplified offset.
 */


function quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset) {
  // do nothing if the line is empty
  if (offset == end) {
    return simplifiedOffset;
  } // snap the first coordinate (P1)


  var x1 = snap(flatCoordinates[offset], tolerance);
  var y1 = snap(flatCoordinates[offset + 1], tolerance);
  offset += stride; // add the first coordinate to the output

  simplifiedFlatCoordinates[simplifiedOffset++] = x1;
  simplifiedFlatCoordinates[simplifiedOffset++] = y1; // find the next coordinate that does not snap to the same value as the first
  // coordinate (P2)

  var x2, y2;

  do {
    x2 = snap(flatCoordinates[offset], tolerance);
    y2 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride;

    if (offset == end) {
      // all coordinates snap to the same value, the line collapses to a point
      // push the last snapped value anyway to ensure that the output contains
      // at least two points
      // FIXME should we really return at least two points anyway?
      simplifiedFlatCoordinates[simplifiedOffset++] = x2;
      simplifiedFlatCoordinates[simplifiedOffset++] = y2;
      return simplifiedOffset;
    }
  } while (x2 == x1 && y2 == y1);

  while (offset < end) {
    // snap the next coordinate (P3)
    var x3 = snap(flatCoordinates[offset], tolerance);
    var y3 = snap(flatCoordinates[offset + 1], tolerance);
    offset += stride; // skip P3 if it is equal to P2

    if (x3 == x2 && y3 == y2) {
      continue;
    } // calculate the delta between P1 and P2


    var dx1 = x2 - x1;
    var dy1 = y2 - y1; // calculate the delta between P3 and P1

    var dx2 = x3 - x1;
    var dy2 = y3 - y1; // if P1, P2, and P3 are colinear and P3 is further from P1 than P2 is from
    // P1 in the same direction then P2 is on the straight line between P1 and
    // P3

    if (dx1 * dy2 == dy1 * dx2 && (dx1 < 0 && dx2 < dx1 || dx1 == dx2 || dx1 > 0 && dx2 > dx1) && (dy1 < 0 && dy2 < dy1 || dy1 == dy2 || dy1 > 0 && dy2 > dy1)) {
      // discard P2 and set P2 = P3
      x2 = x3;
      y2 = y3;
      continue;
    } // either P1, P2, and P3 are not colinear, or they are colinear but P3 is
    // between P3 and P1 or on the opposite half of the line to P2.  add P2,
    // and continue with P1 = P2 and P2 = P3


    simplifiedFlatCoordinates[simplifiedOffset++] = x2;
    simplifiedFlatCoordinates[simplifiedOffset++] = y2;
    x1 = x2;
    y1 = y2;
    x2 = x3;
    y2 = y3;
  } // add the last point (P2)


  simplifiedFlatCoordinates[simplifiedOffset++] = x2;
  simplifiedFlatCoordinates[simplifiedOffset++] = y2;
  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<number>} simplifiedEnds Simplified ends.
 * @return {number} Simplified offset.
 */


function quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    simplifiedOffset = quantize(flatCoordinates, offset, end, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset);
    simplifiedEnds.push(simplifiedOffset);
    offset = end;
  }

  return simplifiedOffset;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} tolerance Tolerance.
 * @param {Array<number>} simplifiedFlatCoordinates Simplified flat
 *     coordinates.
 * @param {number} simplifiedOffset Simplified offset.
 * @param {Array<Array<number>>} simplifiedEndss Simplified endss.
 * @return {number} Simplified offset.
 */


function quantizeMultiArray(flatCoordinates, offset, endss, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEndss) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    var simplifiedEnds = [];
    simplifiedOffset = quantizeArray(flatCoordinates, offset, ends, stride, tolerance, simplifiedFlatCoordinates, simplifiedOffset, simplifiedEnds);
    simplifiedEndss.push(simplifiedEnds);
    offset = ends[ends.length - 1];
  }

  return simplifiedOffset;
}
},{"../../math.js":"node_modules/ol/math.js"}],"node_modules/ol/geom/LinearRing.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extent = require("../extent.js");

var _GeometryLayout = _interopRequireDefault(require("./GeometryLayout.js"));

var _GeometryType = _interopRequireDefault(require("./GeometryType.js"));

var _SimpleGeometry = _interopRequireDefault(require("./SimpleGeometry.js"));

var _area = require("./flat/area.js");

var _closest = require("./flat/closest.js");

var _deflate = require("./flat/deflate.js");

var _inflate = require("./flat/inflate.js");

var _simplify = require("./flat/simplify.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/geom/LinearRing
 */

/**
 * @classdesc
 * Linear ring geometry. Only used as part of polygon; cannot be rendered
 * on its own.
 *
 * @api
 */
var LinearRing =
/*@__PURE__*/
function (SimpleGeometry) {
  function LinearRing(coordinates, opt_layout) {
    SimpleGeometry.call(this);
    /**
     * @private
     * @type {number}
     */

    this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    this.maxDeltaRevision_ = -1;

    if (opt_layout !== undefined && !Array.isArray(coordinates[0])) {
      this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);
    } else {
      this.setCoordinates(
      /** @type {Array<import("../coordinate.js").Coordinate>} */
      coordinates, opt_layout);
    }
  }

  if (SimpleGeometry) LinearRing.__proto__ = SimpleGeometry;
  LinearRing.prototype = Object.create(SimpleGeometry && SimpleGeometry.prototype);
  LinearRing.prototype.constructor = LinearRing;
  /**
   * Make a complete copy of the geometry.
   * @return {!LinearRing} Clone.
   * @override
   * @api
   */

  LinearRing.prototype.clone = function clone() {
    return new LinearRing(this.flatCoordinates.slice(), this.layout);
  };
  /**
   * @inheritDoc
   */


  LinearRing.prototype.closestPointXY = function closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0, _extent.closestSquaredDistanceXY)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0, _closest.maxSquaredDelta)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0, _closest.assignClosestPoint)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * Return the area of the linear ring on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */


  LinearRing.prototype.getArea = function getArea() {
    return (0, _area.linearRing)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * Return the coordinates of the linear ring.
   * @return {Array<import("../coordinate.js").Coordinate>} Coordinates.
   * @override
   * @api
   */


  LinearRing.prototype.getCoordinates = function getCoordinates() {
    return (0, _inflate.inflateCoordinates)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride);
  };
  /**
   * @inheritDoc
   */


  LinearRing.prototype.getSimplifiedGeometryInternal = function getSimplifiedGeometryInternal(squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    simplifiedFlatCoordinates.length = (0, _simplify.douglasPeucker)(this.flatCoordinates, 0, this.flatCoordinates.length, this.stride, squaredTolerance, simplifiedFlatCoordinates, 0);
    return new LinearRing(simplifiedFlatCoordinates, _GeometryLayout.default.XY);
  };
  /**
   * @inheritDoc
   * @api
   */


  LinearRing.prototype.getType = function getType() {
    return _GeometryType.default.LINEAR_RING;
  };
  /**
   * @inheritDoc
   */


  LinearRing.prototype.intersectsExtent = function intersectsExtent(extent) {
    return false;
  };
  /**
   * Set the coordinates of the linear ring.
   * @param {!Array<import("../coordinate.js").Coordinate>} coordinates Coordinates.
   * @param {GeometryLayout=} opt_layout Layout.
   * @override
   * @api
   */


  LinearRing.prototype.setCoordinates = function setCoordinates(coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 1);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0, _deflate.deflateCoordinates)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return LinearRing;
}(_SimpleGeometry.default);

var _default = LinearRing;
exports.default = _default;
},{"../extent.js":"node_modules/ol/extent.js","./GeometryLayout.js":"node_modules/ol/geom/GeometryLayout.js","./GeometryType.js":"node_modules/ol/geom/GeometryType.js","./SimpleGeometry.js":"node_modules/ol/geom/SimpleGeometry.js","./flat/area.js":"node_modules/ol/geom/flat/area.js","./flat/closest.js":"node_modules/ol/geom/flat/closest.js","./flat/deflate.js":"node_modules/ol/geom/flat/deflate.js","./flat/inflate.js":"node_modules/ol/geom/flat/inflate.js","./flat/simplify.js":"node_modules/ol/geom/flat/simplify.js"}],"node_modules/ol/geom/Point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extent = require("../extent.js");

var _GeometryType = _interopRequireDefault(require("./GeometryType.js"));

var _SimpleGeometry = _interopRequireDefault(require("./SimpleGeometry.js"));

var _deflate = require("./flat/deflate.js");

var _math = require("../math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/geom/Point
 */

/**
 * @classdesc
 * Point geometry.
 *
 * @api
 */
var Point =
/*@__PURE__*/
function (SimpleGeometry) {
  function Point(coordinates, opt_layout) {
    SimpleGeometry.call(this);
    this.setCoordinates(coordinates, opt_layout);
  }

  if (SimpleGeometry) Point.__proto__ = SimpleGeometry;
  Point.prototype = Object.create(SimpleGeometry && SimpleGeometry.prototype);
  Point.prototype.constructor = Point;
  /**
   * Make a complete copy of the geometry.
   * @return {!Point} Clone.
   * @override
   * @api
   */

  Point.prototype.clone = function clone() {
    var point = new Point(this.flatCoordinates.slice(), this.layout);
    return point;
  };
  /**
   * @inheritDoc
   */


  Point.prototype.closestPointXY = function closestPointXY(x, y, closestPoint, minSquaredDistance) {
    var flatCoordinates = this.flatCoordinates;
    var squaredDistance = (0, _math.squaredDistance)(x, y, flatCoordinates[0], flatCoordinates[1]);

    if (squaredDistance < minSquaredDistance) {
      var stride = this.stride;

      for (var i = 0; i < stride; ++i) {
        closestPoint[i] = flatCoordinates[i];
      }

      closestPoint.length = stride;
      return squaredDistance;
    } else {
      return minSquaredDistance;
    }
  };
  /**
   * Return the coordinate of the point.
   * @return {import("../coordinate.js").Coordinate} Coordinates.
   * @override
   * @api
   */


  Point.prototype.getCoordinates = function getCoordinates() {
    return !this.flatCoordinates ? [] : this.flatCoordinates.slice();
  };
  /**
   * @inheritDoc
   */


  Point.prototype.computeExtent = function computeExtent(extent) {
    return (0, _extent.createOrUpdateFromCoordinate)(this.flatCoordinates, extent);
  };
  /**
   * @inheritDoc
   * @api
   */


  Point.prototype.getType = function getType() {
    return _GeometryType.default.POINT;
  };
  /**
   * @inheritDoc
   * @api
   */


  Point.prototype.intersectsExtent = function intersectsExtent(extent) {
    return (0, _extent.containsXY)(extent, this.flatCoordinates[0], this.flatCoordinates[1]);
  };
  /**
   * @inheritDoc
   * @api
   */


  Point.prototype.setCoordinates = function setCoordinates(coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 0);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    this.flatCoordinates.length = (0, _deflate.deflateCoordinate)(this.flatCoordinates, 0, coordinates, this.stride);
    this.changed();
  };

  return Point;
}(_SimpleGeometry.default);

var _default = Point;
exports.default = _default;
},{"../extent.js":"node_modules/ol/extent.js","./GeometryType.js":"node_modules/ol/geom/GeometryType.js","./SimpleGeometry.js":"node_modules/ol/geom/SimpleGeometry.js","./flat/deflate.js":"node_modules/ol/geom/flat/deflate.js","../math.js":"node_modules/ol/math.js"}],"node_modules/ol/geom/flat/contains.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearRingContainsExtent = linearRingContainsExtent;
exports.linearRingContainsXY = linearRingContainsXY;
exports.linearRingsContainsXY = linearRingsContainsXY;
exports.linearRingssContainsXY = linearRingssContainsXY;

var _extent = require("../../extent.js");

/**
 * @module ol/geom/flat/contains
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} Contains extent.
 */
function linearRingContainsExtent(flatCoordinates, offset, end, stride, extent) {
  var outside = (0, _extent.forEachCorner)(extent,
  /**
   * @param {import("../../coordinate.js").Coordinate} coordinate Coordinate.
   * @return {boolean} Contains (x, y).
   */
  function (coordinate) {
    return !linearRingContainsXY(flatCoordinates, offset, end, stride, coordinate[0], coordinate[1]);
  });
  return !outside;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */


function linearRingContainsXY(flatCoordinates, offset, end, stride, x, y) {
  // http://geomalgorithms.com/a03-_inclusion.html
  // Copyright 2000 softSurfer, 2012 Dan Sunday
  // This code may be freely used and modified for any purpose
  // providing that this copyright notice is included with it.
  // SoftSurfer makes no warranty for this code, and cannot be held
  // liable for any real or imagined damage resulting from its use.
  // Users of this code must verify correctness for their application.
  var wn = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];

    if (y1 <= y) {
      if (y2 > y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) > 0) {
        wn++;
      }
    } else if (y2 <= y && (x2 - x1) * (y - y1) - (x - x1) * (y2 - y1) < 0) {
      wn--;
    }

    x1 = x2;
    y1 = y2;
  }

  return wn !== 0;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */


function linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y) {
  if (ends.length === 0) {
    return false;
  }

  if (!linearRingContainsXY(flatCoordinates, offset, ends[0], stride, x, y)) {
    return false;
  }

  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if (linearRingContainsXY(flatCoordinates, ends[i - 1], ends[i], stride, x, y)) {
      return false;
    }
  }

  return true;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {boolean} Contains (x, y).
 */


function linearRingssContainsXY(flatCoordinates, offset, endss, stride, x, y) {
  if (endss.length === 0) {
    return false;
  }

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (linearRingsContainsXY(flatCoordinates, offset, ends, stride, x, y)) {
      return true;
    }

    offset = ends[ends.length - 1];
  }

  return false;
}
},{"../../extent.js":"node_modules/ol/extent.js"}],"node_modules/ol/geom/flat/interiorpoint.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInteriorPointOfArray = getInteriorPointOfArray;
exports.getInteriorPointsOfMultiArray = getInteriorPointsOfMultiArray;

var _array = require("../../array.js");

var _contains = require("./contains.js");

/**
 * @module ol/geom/flat/interiorpoint
 */

/**
 * Calculates a point that is likely to lie in the interior of the linear rings.
 * Inspired by JTS's com.vividsolutions.jts.geom.Geometry#getInteriorPoint.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @param {number} flatCentersOffset Flat center offset.
 * @param {Array<number>=} opt_dest Destination.
 * @return {Array<number>} Destination point as XYM coordinate, where M is the
 * length of the horizontal intersection that the point belongs to.
 */
function getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, flatCentersOffset, opt_dest) {
  var i, ii, x, x1, x2, y1, y2;
  var y = flatCenters[flatCentersOffset + 1];
  /** @type {Array<number>} */

  var intersections = []; // Calculate intersections with the horizontal line

  for (var r = 0, rr = ends.length; r < rr; ++r) {
    var end = ends[r];
    x1 = flatCoordinates[end - stride];
    y1 = flatCoordinates[end - stride + 1];

    for (i = offset; i < end; i += stride) {
      x2 = flatCoordinates[i];
      y2 = flatCoordinates[i + 1];

      if (y <= y1 && y2 <= y || y1 <= y && y <= y2) {
        x = (y - y1) / (y2 - y1) * (x2 - x1) + x1;
        intersections.push(x);
      }

      x1 = x2;
      y1 = y2;
    }
  } // Find the longest segment of the horizontal line that has its center point
  // inside the linear ring.


  var pointX = NaN;
  var maxSegmentLength = -Infinity;
  intersections.sort(_array.numberSafeCompareFunction);
  x1 = intersections[0];

  for (i = 1, ii = intersections.length; i < ii; ++i) {
    x2 = intersections[i];
    var segmentLength = Math.abs(x2 - x1);

    if (segmentLength > maxSegmentLength) {
      x = (x1 + x2) / 2;

      if ((0, _contains.linearRingsContainsXY)(flatCoordinates, offset, ends, stride, x, y)) {
        pointX = x;
        maxSegmentLength = segmentLength;
      }
    }

    x1 = x2;
  }

  if (isNaN(pointX)) {
    // There is no horizontal line that has its center point inside the linear
    // ring.  Use the center of the the linear ring's extent.
    pointX = flatCenters[flatCentersOffset];
  }

  if (opt_dest) {
    opt_dest.push(pointX, y, maxSegmentLength);
    return opt_dest;
  } else {
    return [pointX, y, maxSegmentLength];
  }
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {Array<number>} flatCenters Flat centers.
 * @return {Array<number>} Interior points as XYM coordinates, where M is the
 * length of the horizontal intersection that the point belongs to.
 */


function getInteriorPointsOfMultiArray(flatCoordinates, offset, endss, stride, flatCenters) {
  var interiorPoints = [];

  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];
    interiorPoints = getInteriorPointOfArray(flatCoordinates, offset, ends, stride, flatCenters, 2 * i, interiorPoints);
    offset = ends[ends.length - 1];
  }

  return interiorPoints;
}
},{"../../array.js":"node_modules/ol/array.js","./contains.js":"node_modules/ol/geom/flat/contains.js"}],"node_modules/ol/geom/flat/segments.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.forEach = forEach;

/**
 * @module ol/geom/flat/segments
 */

/**
 * This function calls `callback` for each segment of the flat coordinates
 * array. If the callback returns a truthy value the function returns that
 * value immediately. Otherwise the function returns `false`.
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {function(this: S, import("../../coordinate.js").Coordinate, import("../../coordinate.js").Coordinate): T} callback Function
 *     called for each segment.
 * @param {S=} opt_this The object to be used as the value of 'this'
 *     within callback.
 * @return {T|boolean} Value.
 * @template T,S
 */
function forEach(flatCoordinates, offset, end, stride, callback, opt_this) {
  var point1 = [flatCoordinates[offset], flatCoordinates[offset + 1]];
  var point2 = [];
  var ret;

  for (; offset + stride < end; offset += stride) {
    point2[0] = flatCoordinates[offset + stride];
    point2[1] = flatCoordinates[offset + stride + 1];
    ret = callback.call(opt_this, point1, point2);

    if (ret) {
      return ret;
    }

    point1[0] = point2[0];
    point1[1] = point2[1];
  }

  return false;
}
},{}],"node_modules/ol/geom/flat/intersectsextent.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intersectsLineString = intersectsLineString;
exports.intersectsLineStringArray = intersectsLineStringArray;
exports.intersectsLinearRing = intersectsLinearRing;
exports.intersectsLinearRingArray = intersectsLinearRingArray;
exports.intersectsLinearRingMultiArray = intersectsLinearRingMultiArray;

var _extent = require("../../extent.js");

var _contains = require("./contains.js");

var _segments = require("./segments.js");

/**
 * @module ol/geom/flat/intersectsextent
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */
function intersectsLineString(flatCoordinates, offset, end, stride, extent) {
  var coordinatesExtent = (0, _extent.extendFlatCoordinates)((0, _extent.createEmpty)(), flatCoordinates, offset, end, stride);

  if (!(0, _extent.intersects)(extent, coordinatesExtent)) {
    return false;
  }

  if ((0, _extent.containsExtent)(extent, coordinatesExtent)) {
    return true;
  }

  if (coordinatesExtent[0] >= extent[0] && coordinatesExtent[2] <= extent[2]) {
    return true;
  }

  if (coordinatesExtent[1] >= extent[1] && coordinatesExtent[3] <= extent[3]) {
    return true;
  }

  return (0, _segments.forEach)(flatCoordinates, offset, end, stride,
  /**
   * @param {import("../../coordinate.js").Coordinate} point1 Start point.
   * @param {import("../../coordinate.js").Coordinate} point2 End point.
   * @return {boolean} `true` if the segment and the extent intersect,
   *     `false` otherwise.
   */
  function (point1, point2) {
    return (0, _extent.intersectsSegment)(extent, point1, point2);
  });
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLineStringArray(flatCoordinates, offset, ends, stride, extent) {
  for (var i = 0, ii = ends.length; i < ii; ++i) {
    if (intersectsLineString(flatCoordinates, offset, ends[i], stride, extent)) {
      return true;
    }

    offset = ends[i];
  }

  return false;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLinearRing(flatCoordinates, offset, end, stride, extent) {
  if (intersectsLineString(flatCoordinates, offset, end, stride, extent)) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[0], extent[1])) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[0], extent[3])) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[2], extent[1])) {
    return true;
  }

  if ((0, _contains.linearRingContainsXY)(flatCoordinates, offset, end, stride, extent[2], extent[3])) {
    return true;
  }

  return false;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent) {
  if (!intersectsLinearRing(flatCoordinates, offset, ends[0], stride, extent)) {
    return false;
  }

  if (ends.length === 1) {
    return true;
  }

  for (var i = 1, ii = ends.length; i < ii; ++i) {
    if ((0, _contains.linearRingContainsExtent)(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
      if (!intersectsLineString(flatCoordinates, ends[i - 1], ends[i], stride, extent)) {
        return false;
      }
    }
  }

  return true;
}
/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Endss.
 * @param {number} stride Stride.
 * @param {import("../../extent.js").Extent} extent Extent.
 * @return {boolean} True if the geometry and the extent intersect.
 */


function intersectsLinearRingMultiArray(flatCoordinates, offset, endss, stride, extent) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    var ends = endss[i];

    if (intersectsLinearRingArray(flatCoordinates, offset, ends, stride, extent)) {
      return true;
    }

    offset = ends[ends.length - 1];
  }

  return false;
}
},{"../../extent.js":"node_modules/ol/extent.js","./contains.js":"node_modules/ol/geom/flat/contains.js","./segments.js":"node_modules/ol/geom/flat/segments.js"}],"node_modules/ol/geom/flat/reverse.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.coordinates = coordinates;

/**
 * @module ol/geom/flat/reverse
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 */
function coordinates(flatCoordinates, offset, end, stride) {
  while (offset < end - stride) {
    for (var i = 0; i < stride; ++i) {
      var tmp = flatCoordinates[offset + i];
      flatCoordinates[offset + i] = flatCoordinates[end - stride + i];
      flatCoordinates[end - stride + i] = tmp;
    }

    offset += stride;
    end -= stride;
  }
}
},{}],"node_modules/ol/geom/flat/orient.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.linearRingIsClockwise = linearRingIsClockwise;
exports.linearRingIsOriented = linearRingIsOriented;
exports.linearRingsAreOriented = linearRingsAreOriented;
exports.orientLinearRings = orientLinearRings;
exports.orientLinearRingsArray = orientLinearRingsArray;

var _reverse = require("./reverse.js");

/**
 * @module ol/geom/flat/orient
 */

/**
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {number} end End.
 * @param {number} stride Stride.
 * @return {boolean} Is clockwise.
 */
function linearRingIsClockwise(flatCoordinates, offset, end, stride) {
  // http://tinyurl.com/clockwise-method
  // https://github.com/OSGeo/gdal/blob/trunk/gdal/ogr/ogrlinearring.cpp
  var edge = 0;
  var x1 = flatCoordinates[end - stride];
  var y1 = flatCoordinates[end - stride + 1];

  for (; offset < end; offset += stride) {
    var x2 = flatCoordinates[offset];
    var y2 = flatCoordinates[offset + 1];
    edge += (x2 - x1) * (y2 + y1);
    x1 = x2;
    y1 = y2;
  }

  return edge > 0;
}
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean=} opt_right Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */


function linearRingIsOriented(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== undefined ? opt_right : false;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);

    if (i === 0) {
      if (right && isClockwise || !right && !isClockwise) {
        return false;
      }
    } else {
      if (right && !isClockwise || !right && isClockwise) {
        return false;
      }
    }

    offset = end;
  }

  return true;
}
/**
 * Determines if linear rings are oriented.  By default, left-hand orientation
 * is tested (first ring must be clockwise, remaining rings counter-clockwise).
 * To test for right-hand orientation, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean=} opt_right Test for right-hand orientation
 *     (counter-clockwise exterior ring and clockwise interior rings).
 * @return {boolean} Rings are correctly oriented.
 */


function linearRingsAreOriented(flatCoordinates, offset, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    if (!linearRingIsOriented(flatCoordinates, offset, endss[i], stride, opt_right)) {
      return false;
    }
  }

  return true;
}
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<number>} ends Ends.
 * @param {number} stride Stride.
 * @param {boolean=} opt_right Follow the right-hand rule for orientation.
 * @return {number} End.
 */


function orientLinearRings(flatCoordinates, offset, ends, stride, opt_right) {
  var right = opt_right !== undefined ? opt_right : false;

  for (var i = 0, ii = ends.length; i < ii; ++i) {
    var end = ends[i];
    var isClockwise = linearRingIsClockwise(flatCoordinates, offset, end, stride);
    var reverse = i === 0 ? right && isClockwise || !right && !isClockwise : right && !isClockwise || !right && isClockwise;

    if (reverse) {
      (0, _reverse.coordinates)(flatCoordinates, offset, end, stride);
    }

    offset = end;
  }

  return offset;
}
/**
 * Orient coordinates in a flat array of linear rings.  By default, rings
 * are oriented following the left-hand rule (clockwise for exterior and
 * counter-clockwise for interior rings).  To orient according to the
 * right-hand rule, use the `opt_right` argument.
 *
 * @param {Array<number>} flatCoordinates Flat coordinates.
 * @param {number} offset Offset.
 * @param {Array<Array<number>>} endss Array of array of end indexes.
 * @param {number} stride Stride.
 * @param {boolean=} opt_right Follow the right-hand rule for orientation.
 * @return {number} End.
 */


function orientLinearRingsArray(flatCoordinates, offset, endss, stride, opt_right) {
  for (var i = 0, ii = endss.length; i < ii; ++i) {
    offset = orientLinearRings(flatCoordinates, offset, endss[i], stride, opt_right);
  }

  return offset;
}
},{"./reverse.js":"node_modules/ol/geom/flat/reverse.js"}],"node_modules/ol/geom/Polygon.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.circular = circular;
exports.fromExtent = fromExtent;
exports.fromCircle = fromCircle;
exports.makeRegular = makeRegular;
exports.default = void 0;

var _array = require("../array.js");

var _extent = require("../extent.js");

var _GeometryLayout = _interopRequireDefault(require("./GeometryLayout.js"));

var _GeometryType = _interopRequireDefault(require("./GeometryType.js"));

var _LinearRing = _interopRequireDefault(require("./LinearRing.js"));

var _Point = _interopRequireDefault(require("./Point.js"));

var _SimpleGeometry = _interopRequireDefault(require("./SimpleGeometry.js"));

var _sphere = require("../sphere.js");

var _area = require("./flat/area.js");

var _closest = require("./flat/closest.js");

var _contains = require("./flat/contains.js");

var _deflate = require("./flat/deflate.js");

var _inflate = require("./flat/inflate.js");

var _interiorpoint = require("./flat/interiorpoint.js");

var _intersectsextent = require("./flat/intersectsextent.js");

var _orient = require("./flat/orient.js");

var _simplify = require("./flat/simplify.js");

var _math = require("../math.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/geom/Polygon
 */

/**
 * @classdesc
 * Polygon geometry.
 *
 * @api
 */
var Polygon =
/*@__PURE__*/
function (SimpleGeometry) {
  function Polygon(coordinates, opt_layout, opt_ends) {
    SimpleGeometry.call(this);
    /**
     * @type {Array<number>}
     * @private
     */

    this.ends_ = [];
    /**
     * @private
     * @type {number}
     */

    this.flatInteriorPointRevision_ = -1;
    /**
     * @private
     * @type {import("../coordinate.js").Coordinate}
     */

    this.flatInteriorPoint_ = null;
    /**
     * @private
     * @type {number}
     */

    this.maxDelta_ = -1;
    /**
     * @private
     * @type {number}
     */

    this.maxDeltaRevision_ = -1;
    /**
     * @private
     * @type {number}
     */

    this.orientedRevision_ = -1;
    /**
     * @private
     * @type {Array<number>}
     */

    this.orientedFlatCoordinates_ = null;

    if (opt_layout !== undefined && opt_ends) {
      this.setFlatCoordinates(opt_layout,
      /** @type {Array<number>} */
      coordinates);
      this.ends_ = opt_ends;
    } else {
      this.setCoordinates(
      /** @type {Array<Array<import("../coordinate.js").Coordinate>>} */
      coordinates, opt_layout);
    }
  }

  if (SimpleGeometry) Polygon.__proto__ = SimpleGeometry;
  Polygon.prototype = Object.create(SimpleGeometry && SimpleGeometry.prototype);
  Polygon.prototype.constructor = Polygon;
  /**
   * Append the passed linear ring to this polygon.
   * @param {LinearRing} linearRing Linear ring.
   * @api
   */

  Polygon.prototype.appendLinearRing = function appendLinearRing(linearRing) {
    if (!this.flatCoordinates) {
      this.flatCoordinates = linearRing.getFlatCoordinates().slice();
    } else {
      (0, _array.extend)(this.flatCoordinates, linearRing.getFlatCoordinates());
    }

    this.ends_.push(this.flatCoordinates.length);
    this.changed();
  };
  /**
   * Make a complete copy of the geometry.
   * @return {!Polygon} Clone.
   * @override
   * @api
   */


  Polygon.prototype.clone = function clone() {
    return new Polygon(this.flatCoordinates.slice(), this.layout, this.ends_.slice());
  };
  /**
   * @inheritDoc
   */


  Polygon.prototype.closestPointXY = function closestPointXY(x, y, closestPoint, minSquaredDistance) {
    if (minSquaredDistance < (0, _extent.closestSquaredDistanceXY)(this.getExtent(), x, y)) {
      return minSquaredDistance;
    }

    if (this.maxDeltaRevision_ != this.getRevision()) {
      this.maxDelta_ = Math.sqrt((0, _closest.arrayMaxSquaredDelta)(this.flatCoordinates, 0, this.ends_, this.stride, 0));
      this.maxDeltaRevision_ = this.getRevision();
    }

    return (0, _closest.assignClosestArrayPoint)(this.flatCoordinates, 0, this.ends_, this.stride, this.maxDelta_, true, x, y, closestPoint, minSquaredDistance);
  };
  /**
   * @inheritDoc
   */


  Polygon.prototype.containsXY = function containsXY(x, y) {
    return (0, _contains.linearRingsContainsXY)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, x, y);
  };
  /**
   * Return the area of the polygon on projected plane.
   * @return {number} Area (on projected plane).
   * @api
   */


  Polygon.prototype.getArea = function getArea() {
    return (0, _area.linearRings)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride);
  };
  /**
   * Get the coordinate array for this geometry.  This array has the structure
   * of a GeoJSON coordinate array for polygons.
   *
   * @param {boolean=} opt_right Orient coordinates according to the right-hand
   *     rule (counter-clockwise for exterior and clockwise for interior rings).
   *     If `false`, coordinates will be oriented according to the left-hand rule
   *     (clockwise for exterior and counter-clockwise for interior rings).
   *     By default, coordinate orientation will depend on how the geometry was
   *     constructed.
   * @return {Array<Array<import("../coordinate.js").Coordinate>>} Coordinates.
   * @override
   * @api
   */


  Polygon.prototype.getCoordinates = function getCoordinates(opt_right) {
    var flatCoordinates;

    if (opt_right !== undefined) {
      flatCoordinates = this.getOrientedFlatCoordinates().slice();
      (0, _orient.orientLinearRings)(flatCoordinates, 0, this.ends_, this.stride, opt_right);
    } else {
      flatCoordinates = this.flatCoordinates;
    }

    return (0, _inflate.inflateCoordinatesArray)(flatCoordinates, 0, this.ends_, this.stride);
  };
  /**
   * @return {Array<number>} Ends.
   */


  Polygon.prototype.getEnds = function getEnds() {
    return this.ends_;
  };
  /**
   * @return {Array<number>} Interior point.
   */


  Polygon.prototype.getFlatInteriorPoint = function getFlatInteriorPoint() {
    if (this.flatInteriorPointRevision_ != this.getRevision()) {
      var flatCenter = (0, _extent.getCenter)(this.getExtent());
      this.flatInteriorPoint_ = (0, _interiorpoint.getInteriorPointOfArray)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, flatCenter, 0);
      this.flatInteriorPointRevision_ = this.getRevision();
    }

    return this.flatInteriorPoint_;
  };
  /**
   * Return an interior point of the polygon.
   * @return {Point} Interior point as XYM coordinate, where M is the
   * length of the horizontal intersection that the point belongs to.
   * @api
   */


  Polygon.prototype.getInteriorPoint = function getInteriorPoint() {
    return new _Point.default(this.getFlatInteriorPoint(), _GeometryLayout.default.XYM);
  };
  /**
   * Return the number of rings of the polygon,  this includes the exterior
   * ring and any interior rings.
   *
   * @return {number} Number of rings.
   * @api
   */


  Polygon.prototype.getLinearRingCount = function getLinearRingCount() {
    return this.ends_.length;
  };
  /**
   * Return the Nth linear ring of the polygon geometry. Return `null` if the
   * given index is out of range.
   * The exterior linear ring is available at index `0` and the interior rings
   * at index `1` and beyond.
   *
   * @param {number} index Index.
   * @return {LinearRing} Linear ring.
   * @api
   */


  Polygon.prototype.getLinearRing = function getLinearRing(index) {
    if (index < 0 || this.ends_.length <= index) {
      return null;
    }

    return new _LinearRing.default(this.flatCoordinates.slice(index === 0 ? 0 : this.ends_[index - 1], this.ends_[index]), this.layout);
  };
  /**
   * Return the linear rings of the polygon.
   * @return {Array<LinearRing>} Linear rings.
   * @api
   */


  Polygon.prototype.getLinearRings = function getLinearRings() {
    var layout = this.layout;
    var flatCoordinates = this.flatCoordinates;
    var ends = this.ends_;
    var linearRings = [];
    var offset = 0;

    for (var i = 0, ii = ends.length; i < ii; ++i) {
      var end = ends[i];
      var linearRing = new _LinearRing.default(flatCoordinates.slice(offset, end), layout);
      linearRings.push(linearRing);
      offset = end;
    }

    return linearRings;
  };
  /**
   * @return {Array<number>} Oriented flat coordinates.
   */


  Polygon.prototype.getOrientedFlatCoordinates = function getOrientedFlatCoordinates() {
    if (this.orientedRevision_ != this.getRevision()) {
      var flatCoordinates = this.flatCoordinates;

      if ((0, _orient.linearRingIsOriented)(flatCoordinates, 0, this.ends_, this.stride)) {
        this.orientedFlatCoordinates_ = flatCoordinates;
      } else {
        this.orientedFlatCoordinates_ = flatCoordinates.slice();
        this.orientedFlatCoordinates_.length = (0, _orient.orientLinearRings)(this.orientedFlatCoordinates_, 0, this.ends_, this.stride);
      }

      this.orientedRevision_ = this.getRevision();
    }

    return this.orientedFlatCoordinates_;
  };
  /**
   * @inheritDoc
   */


  Polygon.prototype.getSimplifiedGeometryInternal = function getSimplifiedGeometryInternal(squaredTolerance) {
    var simplifiedFlatCoordinates = [];
    var simplifiedEnds = [];
    simplifiedFlatCoordinates.length = (0, _simplify.quantizeArray)(this.flatCoordinates, 0, this.ends_, this.stride, Math.sqrt(squaredTolerance), simplifiedFlatCoordinates, 0, simplifiedEnds);
    return new Polygon(simplifiedFlatCoordinates, _GeometryLayout.default.XY, simplifiedEnds);
  };
  /**
   * @inheritDoc
   * @api
   */


  Polygon.prototype.getType = function getType() {
    return _GeometryType.default.POLYGON;
  };
  /**
   * @inheritDoc
   * @api
   */


  Polygon.prototype.intersectsExtent = function intersectsExtent(extent) {
    return (0, _intersectsextent.intersectsLinearRingArray)(this.getOrientedFlatCoordinates(), 0, this.ends_, this.stride, extent);
  };
  /**
   * Set the coordinates of the polygon.
   * @param {!Array<Array<import("../coordinate.js").Coordinate>>} coordinates Coordinates.
   * @param {GeometryLayout=} opt_layout Layout.
   * @override
   * @api
   */


  Polygon.prototype.setCoordinates = function setCoordinates(coordinates, opt_layout) {
    this.setLayout(opt_layout, coordinates, 2);

    if (!this.flatCoordinates) {
      this.flatCoordinates = [];
    }

    var ends = (0, _deflate.deflateCoordinatesArray)(this.flatCoordinates, 0, coordinates, this.stride, this.ends_);
    this.flatCoordinates.length = ends.length === 0 ? 0 : ends[ends.length - 1];
    this.changed();
  };

  return Polygon;
}(_SimpleGeometry.default);

var _default = Polygon;
/**
 * Create an approximation of a circle on the surface of a sphere.
 * @param {import("../coordinate.js").Coordinate} center Center (`[lon, lat]` in degrees).
 * @param {number} radius The great-circle distance from the center to
 *     the polygon vertices.
 * @param {number=} opt_n Optional number of vertices for the resulting
 *     polygon. Default is `32`.
 * @param {number=} opt_sphereRadius Optional radius for the sphere (defaults to
 *     the Earth's mean radius using the WGS84 ellipsoid).
 * @return {Polygon} The "circular" polygon.
 * @api
 */

exports.default = _default;

function circular(center, radius, opt_n, opt_sphereRadius) {
  var n = opt_n ? opt_n : 32;
  /** @type {Array<number>} */

  var flatCoordinates = [];

  for (var i = 0; i < n; ++i) {
    (0, _array.extend)(flatCoordinates, (0, _sphere.offset)(center, radius, 2 * Math.PI * i / n, opt_sphereRadius));
  }

  flatCoordinates.push(flatCoordinates[0], flatCoordinates[1]);
  return new Polygon(flatCoordinates, _GeometryLayout.default.XY, [flatCoordinates.length]);
}
/**
 * Create a polygon from an extent. The layout used is `XY`.
 * @param {import("../extent.js").Extent} extent The extent.
 * @return {Polygon} The polygon.
 * @api
 */


function fromExtent(extent) {
  var minX = extent[0];
  var minY = extent[1];
  var maxX = extent[2];
  var maxY = extent[3];
  var flatCoordinates = [minX, minY, minX, maxY, maxX, maxY, maxX, minY, minX, minY];
  return new Polygon(flatCoordinates, _GeometryLayout.default.XY, [flatCoordinates.length]);
}
/**
 * Create a regular polygon from a circle.
 * @param {import("./Circle.js").default} circle Circle geometry.
 * @param {number=} opt_sides Number of sides of the polygon. Default is 32.
 * @param {number=} opt_angle Start angle for the first vertex of the polygon in
 *     radians. Default is 0.
 * @return {Polygon} Polygon geometry.
 * @api
 */


function fromCircle(circle, opt_sides, opt_angle) {
  var sides = opt_sides ? opt_sides : 32;
  var stride = circle.getStride();
  var layout = circle.getLayout();
  var center = circle.getCenter();
  var arrayLength = stride * (sides + 1);
  var flatCoordinates = new Array(arrayLength);

  for (var i = 0; i < arrayLength; i += stride) {
    flatCoordinates[i] = 0;
    flatCoordinates[i + 1] = 0;

    for (var j = 2; j < stride; j++) {
      flatCoordinates[i + j] = center[j];
    }
  }

  var ends = [flatCoordinates.length];
  var polygon = new Polygon(flatCoordinates, layout, ends);
  makeRegular(polygon, center, circle.getRadius(), opt_angle);
  return polygon;
}
/**
 * Modify the coordinates of a polygon to make it a regular polygon.
 * @param {Polygon} polygon Polygon geometry.
 * @param {import("../coordinate.js").Coordinate} center Center of the regular polygon.
 * @param {number} radius Radius of the regular polygon.
 * @param {number=} opt_angle Start angle for the first vertex of the polygon in
 *     radians. Default is 0.
 */


function makeRegular(polygon, center, radius, opt_angle) {
  var flatCoordinates = polygon.getFlatCoordinates();
  var stride = polygon.getStride();
  var sides = flatCoordinates.length / stride - 1;
  var startAngle = opt_angle ? opt_angle : 0;

  for (var i = 0; i <= sides; ++i) {
    var offset = i * stride;
    var angle = startAngle + (0, _math.modulo)(i, sides) * 2 * Math.PI / sides;
    flatCoordinates[offset] = center[0] + radius * Math.cos(angle);
    flatCoordinates[offset + 1] = center[1] + radius * Math.sin(angle);
  }

  polygon.changed();
}
},{"../array.js":"node_modules/ol/array.js","../extent.js":"node_modules/ol/extent.js","./GeometryLayout.js":"node_modules/ol/geom/GeometryLayout.js","./GeometryType.js":"node_modules/ol/geom/GeometryType.js","./LinearRing.js":"node_modules/ol/geom/LinearRing.js","./Point.js":"node_modules/ol/geom/Point.js","./SimpleGeometry.js":"node_modules/ol/geom/SimpleGeometry.js","../sphere.js":"node_modules/ol/sphere.js","./flat/area.js":"node_modules/ol/geom/flat/area.js","./flat/closest.js":"node_modules/ol/geom/flat/closest.js","./flat/contains.js":"node_modules/ol/geom/flat/contains.js","./flat/deflate.js":"node_modules/ol/geom/flat/deflate.js","./flat/inflate.js":"node_modules/ol/geom/flat/inflate.js","./flat/interiorpoint.js":"node_modules/ol/geom/flat/interiorpoint.js","./flat/intersectsextent.js":"node_modules/ol/geom/flat/intersectsextent.js","./flat/orient.js":"node_modules/ol/geom/flat/orient.js","./flat/simplify.js":"node_modules/ol/geom/flat/simplify.js","../math.js":"node_modules/ol/math.js"}],"node_modules/ol/View.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCenterConstraint = createCenterConstraint;
exports.createResolutionConstraint = createResolutionConstraint;
exports.createRotationConstraint = createRotationConstraint;
exports.isNoopAnimation = isNoopAnimation;
exports.default = void 0;

var _common = require("./tilegrid/common.js");

var _util = require("./util.js");

var _functions = require("./functions.js");

var _centerconstraint = require("./centerconstraint.js");

var _Object = _interopRequireDefault(require("./Object.js"));

var _resolutionconstraint = require("./resolutionconstraint.js");

var _rotationconstraint = require("./rotationconstraint.js");

var _ViewHint = _interopRequireDefault(require("./ViewHint.js"));

var _ViewProperty = _interopRequireDefault(require("./ViewProperty.js"));

var _array = require("./array.js");

var _asserts = require("./asserts.js");

var _coordinate = require("./coordinate.js");

var _easing = require("./easing.js");

var _extent = require("./extent.js");

var _GeometryType = _interopRequireDefault(require("./geom/GeometryType.js"));

var _Polygon = require("./geom/Polygon.js");

var _math = require("./math.js");

var _obj = require("./obj.js");

var _proj = require("./proj.js");

var _Units = _interopRequireDefault(require("./proj/Units.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/View
 */

/**
 * An animation configuration
 *
 * @typedef {Object} Animation
 * @property {import("./coordinate.js").Coordinate} [sourceCenter]
 * @property {import("./coordinate.js").Coordinate} [targetCenter]
 * @property {number} [sourceResolution]
 * @property {number} [targetResolution]
 * @property {number} [sourceRotation]
 * @property {number} [targetRotation]
 * @property {import("./coordinate.js").Coordinate} [anchor]
 * @property {number} start
 * @property {number} duration
 * @property {boolean} complete
 * @property {function(number):number} easing
 * @property {function(boolean)} callback
 */

/**
 * @typedef {Object} Constraints
 * @property {import("./centerconstraint.js").Type} center
 * @property {import("./resolutionconstraint.js").Type} resolution
 * @property {import("./rotationconstraint.js").Type} rotation
 */

/**
 * @typedef {Object} FitOptions
 * @property {import("./size.js").Size} [size] The size in pixels of the box to fit
 * the extent into. Default is the current size of the first map in the DOM that
 * uses this view, or `[100, 100]` if no such map is found.
 * @property {!Array<number>} [padding=[0, 0, 0, 0]] Padding (in pixels) to be
 * cleared inside the view. Values in the array are top, right, bottom and left
 * padding.
 * @property {boolean} [constrainResolution=true] Constrain the resolution.
 * @property {boolean} [nearest=false] If `constrainResolution` is `true`, get
 * the nearest extent instead of the closest that actually fits the view.
 * @property {number} [minResolution=0] Minimum resolution that we zoom to.
 * @property {number} [maxZoom] Maximum zoom level that we zoom to. If
 * `minResolution` is given, this property is ignored.
 * @property {number} [duration] The duration of the animation in milliseconds.
 * By default, there is no animation to the target extent.
 * @property {function(number):number} [easing] The easing function used during
 * the animation (defaults to {@link module:ol/easing~inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 * @property {function(boolean)} [callback] Function called when the view is in
 * its final position. The callback will be called with `true` if the animation
 * series completed on its own or `false` if it was cancelled.
 */

/**
 * @typedef {Object} ViewOptions
 * @property {import("./coordinate.js").Coordinate} [center] The initial center for
 * the view. The coordinate system for the center is specified with the
 * `projection` option. Layer sources will not be fetched if this is not set,
 * but the center can be set later with {@link #setCenter}.
 * @property {boolean|number} [constrainRotation=true] Rotation constraint.
 * `false` means no constraint. `true` means no constraint, but snap to zero
 * near zero. A number constrains the rotation to that number of values. For
 * example, `4` will constrain the rotation to 0, 90, 180, and 270 degrees.
 * @property {boolean} [enableRotation=true] Enable rotation.
 * If `false`, a rotation constraint that always sets the rotation to zero is
 * used. The `constrainRotation` option has no effect if `enableRotation` is
 * `false`.
 * @property {import("./extent.js").Extent} [extent] The extent that constrains the
 * center, in other words, center cannot be set outside this extent.
 * @property {number} [maxResolution] The maximum resolution used to determine
 * the resolution constraint. It is used together with `minResolution` (or
 * `maxZoom`) and `zoomFactor`. If unspecified it is calculated in such a way
 * that the projection's validity extent fits in a 256x256 px tile. If the
 * projection is Spherical Mercator (the default) then `maxResolution` defaults
 * to `40075016.68557849 / 256 = 156543.03392804097`.
 * @property {number} [minResolution] The minimum resolution used to determine
 * the resolution constraint.  It is used together with `maxResolution` (or
 * `minZoom`) and `zoomFactor`.  If unspecified it is calculated assuming 29
 * zoom levels (with a factor of 2). If the projection is Spherical Mercator
 * (the default) then `minResolution` defaults to
 * `40075016.68557849 / 256 / Math.pow(2, 28) = 0.0005831682455839253`.
 * @property {number} [maxZoom=28] The maximum zoom level used to determine the
 * resolution constraint. It is used together with `minZoom` (or
 * `maxResolution`) and `zoomFactor`.  Note that if `minResolution` is also
 * provided, it is given precedence over `maxZoom`.
 * @property {number} [minZoom=0] The minimum zoom level used to determine the
 * resolution constraint. It is used together with `maxZoom` (or
 * `minResolution`) and `zoomFactor`.  Note that if `maxResolution` is also
 * provided, it is given precedence over `minZoom`.
 * @property {import("./proj.js").ProjectionLike} [projection='EPSG:3857'] The
 * projection. The default is Spherical Mercator.
 * @property {number} [resolution] The initial resolution for the view. The
 * units are `projection` units per pixel (e.g. meters per pixel). An
 * alternative to setting this is to set `zoom`. Layer sources will not be
 * fetched if neither this nor `zoom` are defined, but they can be set later
 * with {@link #setZoom} or {@link #setResolution}.
 * @property {Array<number>} [resolutions] Resolutions to determine the
 * resolution constraint. If set the `maxResolution`, `minResolution`,
 * `minZoom`, `maxZoom`, and `zoomFactor` options are ignored.
 * @property {number} [rotation=0] The initial rotation for the view in radians
 * (positive rotation clockwise, 0 means North).
 * @property {number} [zoom] Only used if `resolution` is not defined. Zoom
 * level used to calculate the initial resolution for the view. The initial
 * resolution is determined using the {@link #constrainResolution} method.
 * @property {number} [zoomFactor=2] The zoom factor used to determine the
 * resolution constraint.
 */

/**
 * @typedef {Object} AnimationOptions
 * @property {import("./coordinate.js").Coordinate} [center] The center of the view at the end of
 * the animation.
 * @property {number} [zoom] The zoom level of the view at the end of the
 * animation. This takes precedence over `resolution`.
 * @property {number} [resolution] The resolution of the view at the end
 * of the animation.  If `zoom` is also provided, this option will be ignored.
 * @property {number} [rotation] The rotation of the view at the end of
 * the animation.
 * @property {import("./coordinate.js").Coordinate} [anchor] Optional anchor to remained fixed
 * during a rotation or resolution animation.
 * @property {number} [duration=1000] The duration of the animation in milliseconds.
 * @property {function(number):number} [easing] The easing function used
 * during the animation (defaults to {@link module:ol/easing~inAndOut}).
 * The function will be called for each frame with a number representing a
 * fraction of the animation's duration.  The function should return a number
 * between 0 and 1 representing the progress toward the destination state.
 */

/**
 * @typedef {Object} State
 * @property {import("./coordinate.js").Coordinate} center
 * @property {import("./proj/Projection.js").default} projection
 * @property {number} resolution
 * @property {number} rotation
 * @property {number} zoom
 */

/**
 * Default min zoom level for the map view.
 * @type {number}
 */
var DEFAULT_MIN_ZOOM = 0;
/**
 * @classdesc
 * A View object represents a simple 2D view of the map.
 *
 * This is the object to act upon to change the center, resolution,
 * and rotation of the map.
 *
 * ### The view states
 *
 * An View is determined by three states: `center`, `resolution`,
 * and `rotation`. Each state has a corresponding getter and setter, e.g.
 * `getCenter` and `setCenter` for the `center` state.
 *
 * An View has a `projection`. The projection determines the
 * coordinate system of the center, and its units determine the units of the
 * resolution (projection units per pixel). The default projection is
 * Spherical Mercator (EPSG:3857).
 *
 * ### The constraints
 *
 * `setCenter`, `setResolution` and `setRotation` can be used to change the
 * states of the view. Any value can be passed to the setters. And the value
 * that is passed to a setter will effectively be the value set in the view,
 * and returned by the corresponding getter.
 *
 * But a View object also has a *resolution constraint*, a
 * *rotation constraint* and a *center constraint*.
 *
 * As said above, no constraints are applied when the setters are used to set
 * new states for the view. Applying constraints is done explicitly through
 * the use of the `constrain*` functions (`constrainResolution` and
 * `constrainRotation` and `constrainCenter`).
 *
 * The main users of the constraints are the interactions and the
 * controls. For example, double-clicking on the map changes the view to
 * the "next" resolution. And releasing the fingers after pinch-zooming
 * snaps to the closest resolution (with an animation).
 *
 * The *resolution constraint* snaps to specific resolutions. It is
 * determined by the following options: `resolutions`, `maxResolution`,
 * `maxZoom`, and `zoomFactor`. If `resolutions` is set, the other three
 * options are ignored. See documentation for each option for more
 * information.
 *
 * The *rotation constraint* snaps to specific angles. It is determined
 * by the following options: `enableRotation` and `constrainRotation`.
 * By default the rotation value is snapped to zero when approaching the
 * horizontal.
 *
 * The *center constraint* is determined by the `extent` option. By
 * default the center is not constrained at all.
 *
  * @api
 */

var View =
/*@__PURE__*/
function (BaseObject) {
  function View(opt_options) {
    BaseObject.call(this);
    var options = (0, _obj.assign)({}, opt_options);
    /**
     * @private
     * @type {Array<number>}
     */

    this.hints_ = [0, 0];
    /**
     * @private
     * @type {Array<Array<Animation>>}
     */

    this.animations_ = [];
    /**
     * @private
     * @type {number|undefined}
     */

    this.updateAnimationKey_;
    this.updateAnimations_ = this.updateAnimations_.bind(this);
    /**
     * @private
     * @const
     * @type {import("./proj/Projection.js").default}
     */

    this.projection_ = (0, _proj.createProjection)(options.projection, 'EPSG:3857');
    this.applyOptions_(options);
  }

  if (BaseObject) View.__proto__ = BaseObject;
  View.prototype = Object.create(BaseObject && BaseObject.prototype);
  View.prototype.constructor = View;
  /**
   * Set up the view with the given options.
   * @param {ViewOptions} options View options.
   */

  View.prototype.applyOptions_ = function applyOptions_(options) {
    /**
     * @type {Object<string, *>}
     */
    var properties = {};
    properties[_ViewProperty.default.CENTER] = options.center !== undefined ? options.center : null;
    var resolutionConstraintInfo = createResolutionConstraint(options);
    /**
     * @private
     * @type {number}
     */

    this.maxResolution_ = resolutionConstraintInfo.maxResolution;
    /**
     * @private
     * @type {number}
     */

    this.minResolution_ = resolutionConstraintInfo.minResolution;
    /**
     * @private
     * @type {number}
     */

    this.zoomFactor_ = resolutionConstraintInfo.zoomFactor;
    /**
     * @private
     * @type {Array<number>|undefined}
     */

    this.resolutions_ = options.resolutions;
    /**
     * @private
     * @type {number}
     */

    this.minZoom_ = resolutionConstraintInfo.minZoom;
    var centerConstraint = createCenterConstraint(options);
    var resolutionConstraint = resolutionConstraintInfo.constraint;
    var rotationConstraint = createRotationConstraint(options);
    /**
     * @private
     * @type {Constraints}
     */

    this.constraints_ = {
      center: centerConstraint,
      resolution: resolutionConstraint,
      rotation: rotationConstraint
    };

    if (options.resolution !== undefined) {
      properties[_ViewProperty.default.RESOLUTION] = options.resolution;
    } else if (options.zoom !== undefined) {
      properties[_ViewProperty.default.RESOLUTION] = this.constrainResolution(this.maxResolution_, options.zoom - this.minZoom_);

      if (this.resolutions_) {
        // in case map zoom is out of min/max zoom range
        properties[_ViewProperty.default.RESOLUTION] = (0, _math.clamp)(Number(this.getResolution() || properties[_ViewProperty.default.RESOLUTION]), this.minResolution_, this.maxResolution_);
      }
    }

    properties[_ViewProperty.default.ROTATION] = options.rotation !== undefined ? options.rotation : 0;
    this.setProperties(properties);
    /**
     * @private
     * @type {ViewOptions}
     */

    this.options_ = options;
  };
  /**
   * Get an updated version of the view options used to construct the view.  The
   * current resolution (or zoom), center, and rotation are applied to any stored
   * options.  The provided options can be used to apply new min/max zoom or
   * resolution limits.
   * @param {ViewOptions} newOptions New options to be applied.
   * @return {ViewOptions} New options updated with the current view state.
   */


  View.prototype.getUpdatedOptions_ = function getUpdatedOptions_(newOptions) {
    var options = (0, _obj.assign)({}, this.options_); // preserve resolution (or zoom)

    if (options.resolution !== undefined) {
      options.resolution = this.getResolution();
    } else {
      options.zoom = this.getZoom();
    } // preserve center


    options.center = this.getCenter(); // preserve rotation

    options.rotation = this.getRotation();
    return (0, _obj.assign)({}, options, newOptions);
  };
  /**
   * Animate the view.  The view's center, zoom (or resolution), and rotation
   * can be animated for smooth transitions between view states.  For example,
   * to animate the view to a new zoom level:
   *
   *     view.animate({zoom: view.getZoom() + 1});
   *
   * By default, the animation lasts one second and uses in-and-out easing.  You
   * can customize this behavior by including `duration` (in milliseconds) and
   * `easing` options (see {@link module:ol/easing}).
   *
   * To chain together multiple animations, call the method with multiple
   * animation objects.  For example, to first zoom and then pan:
   *
   *     view.animate({zoom: 10}, {center: [0, 0]});
   *
   * If you provide a function as the last argument to the animate method, it
   * will get called at the end of an animation series.  The callback will be
   * called with `true` if the animation series completed on its own or `false`
   * if it was cancelled.
   *
   * Animations are cancelled by user interactions (e.g. dragging the map) or by
   * calling `view.setCenter()`, `view.setResolution()`, or `view.setRotation()`
   * (or another method that calls one of these).
   *
   * @param {...(AnimationOptions|function(boolean))} var_args Animation
   *     options.  Multiple animations can be run in series by passing multiple
   *     options objects.  To run multiple animations in parallel, call the method
   *     multiple times.  An optional callback can be provided as a final
   *     argument.  The callback will be called with a boolean indicating whether
   *     the animation completed without being cancelled.
   * @api
   */


  View.prototype.animate = function animate(var_args) {
    var arguments$1 = arguments;
    var animationCount = arguments.length;
    var callback;

    if (animationCount > 1 && typeof arguments[animationCount - 1] === 'function') {
      callback = arguments[animationCount - 1];
      --animationCount;
    }

    if (!this.isDef()) {
      // if view properties are not yet set, shortcut to the final state
      var state = arguments[animationCount - 1];

      if (state.center) {
        this.setCenter(state.center);
      }

      if (state.zoom !== undefined) {
        this.setZoom(state.zoom);
      }

      if (state.rotation !== undefined) {
        this.setRotation(state.rotation);
      }

      if (callback) {
        animationCallback(callback, true);
      }

      return;
    }

    var start = Date.now();
    var center = this.getCenter().slice();
    var resolution = this.getResolution();
    var rotation = this.getRotation();
    var series = [];

    for (var i = 0; i < animationCount; ++i) {
      var options =
      /** @type {AnimationOptions} */
      arguments$1[i];
      var animation =
      /** @type {Animation} */
      {
        start: start,
        complete: false,
        anchor: options.anchor,
        duration: options.duration !== undefined ? options.duration : 1000,
        easing: options.easing || _easing.inAndOut
      };

      if (options.center) {
        animation.sourceCenter = center;
        animation.targetCenter = options.center;
        center = animation.targetCenter;
      }

      if (options.zoom !== undefined) {
        animation.sourceResolution = resolution;
        animation.targetResolution = this.constrainResolution(this.maxResolution_, options.zoom - this.minZoom_, 0);
        resolution = animation.targetResolution;
      } else if (options.resolution) {
        animation.sourceResolution = resolution;
        animation.targetResolution = options.resolution;
        resolution = animation.targetResolution;
      }

      if (options.rotation !== undefined) {
        animation.sourceRotation = rotation;
        var delta = (0, _math.modulo)(options.rotation - rotation + Math.PI, 2 * Math.PI) - Math.PI;
        animation.targetRotation = rotation + delta;
        rotation = animation.targetRotation;
      }

      animation.callback = callback; // check if animation is a no-op

      if (isNoopAnimation(animation)) {
        animation.complete = true; // we still push it onto the series for callback handling
      } else {
        start += animation.duration;
      }

      series.push(animation);
    }

    this.animations_.push(series);
    this.setHint(_ViewHint.default.ANIMATING, 1);
    this.updateAnimations_();
  };
  /**
   * Determine if the view is being animated.
   * @return {boolean} The view is being animated.
   * @api
   */


  View.prototype.getAnimating = function getAnimating() {
    return this.hints_[_ViewHint.default.ANIMATING] > 0;
  };
  /**
   * Determine if the user is interacting with the view, such as panning or zooming.
   * @return {boolean} The view is being interacted with.
   * @api
   */


  View.prototype.getInteracting = function getInteracting() {
    return this.hints_[_ViewHint.default.INTERACTING] > 0;
  };
  /**
   * Cancel any ongoing animations.
   * @api
   */


  View.prototype.cancelAnimations = function cancelAnimations() {
    this.setHint(_ViewHint.default.ANIMATING, -this.hints_[_ViewHint.default.ANIMATING]);

    for (var i = 0, ii = this.animations_.length; i < ii; ++i) {
      var series = this.animations_[i];

      if (series[0].callback) {
        animationCallback(series[0].callback, false);
      }
    }

    this.animations_.length = 0;
  };
  /**
   * Update all animations.
   */


  View.prototype.updateAnimations_ = function updateAnimations_() {
    if (this.updateAnimationKey_ !== undefined) {
      cancelAnimationFrame(this.updateAnimationKey_);
      this.updateAnimationKey_ = undefined;
    }

    if (!this.getAnimating()) {
      return;
    }

    var now = Date.now();
    var more = false;

    for (var i = this.animations_.length - 1; i >= 0; --i) {
      var series = this.animations_[i];
      var seriesComplete = true;

      for (var j = 0, jj = series.length; j < jj; ++j) {
        var animation = series[j];

        if (animation.complete) {
          continue;
        }

        var elapsed = now - animation.start;
        var fraction = animation.duration > 0 ? elapsed / animation.duration : 1;

        if (fraction >= 1) {
          animation.complete = true;
          fraction = 1;
        } else {
          seriesComplete = false;
        }

        var progress = animation.easing(fraction);

        if (animation.sourceCenter) {
          var x0 = animation.sourceCenter[0];
          var y0 = animation.sourceCenter[1];
          var x1 = animation.targetCenter[0];
          var y1 = animation.targetCenter[1];
          var x = x0 + progress * (x1 - x0);
          var y = y0 + progress * (y1 - y0);
          this.set(_ViewProperty.default.CENTER, [x, y]);
        }

        if (animation.sourceResolution && animation.targetResolution) {
          var resolution = progress === 1 ? animation.targetResolution : animation.sourceResolution + progress * (animation.targetResolution - animation.sourceResolution);

          if (animation.anchor) {
            this.set(_ViewProperty.default.CENTER, this.calculateCenterZoom(resolution, animation.anchor));
          }

          this.set(_ViewProperty.default.RESOLUTION, resolution);
        }

        if (animation.sourceRotation !== undefined && animation.targetRotation !== undefined) {
          var rotation = progress === 1 ? (0, _math.modulo)(animation.targetRotation + Math.PI, 2 * Math.PI) - Math.PI : animation.sourceRotation + progress * (animation.targetRotation - animation.sourceRotation);

          if (animation.anchor) {
            this.set(_ViewProperty.default.CENTER, this.calculateCenterRotate(rotation, animation.anchor));
          }

          this.set(_ViewProperty.default.ROTATION, rotation);
        }

        more = true;

        if (!animation.complete) {
          break;
        }
      }

      if (seriesComplete) {
        this.animations_[i] = null;
        this.setHint(_ViewHint.default.ANIMATING, -1);
        var callback = series[0].callback;

        if (callback) {
          animationCallback(callback, true);
        }
      }
    } // prune completed series


    this.animations_ = this.animations_.filter(Boolean);

    if (more && this.updateAnimationKey_ === undefined) {
      this.updateAnimationKey_ = requestAnimationFrame(this.updateAnimations_);
    }
  };
  /**
   * @param {number} rotation Target rotation.
   * @param {import("./coordinate.js").Coordinate} anchor Rotation anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for rotation and anchor.
   */


  View.prototype.calculateCenterRotate = function calculateCenterRotate(rotation, anchor) {
    var center;
    var currentCenter = this.getCenter();

    if (currentCenter !== undefined) {
      center = [currentCenter[0] - anchor[0], currentCenter[1] - anchor[1]];
      (0, _coordinate.rotate)(center, rotation - this.getRotation());
      (0, _coordinate.add)(center, anchor);
    }

    return center;
  };
  /**
   * @param {number} resolution Target resolution.
   * @param {import("./coordinate.js").Coordinate} anchor Zoom anchor.
   * @return {import("./coordinate.js").Coordinate|undefined} Center for resolution and anchor.
   */


  View.prototype.calculateCenterZoom = function calculateCenterZoom(resolution, anchor) {
    var center;
    var currentCenter = this.getCenter();
    var currentResolution = this.getResolution();

    if (currentCenter !== undefined && currentResolution !== undefined) {
      var x = anchor[0] - resolution * (anchor[0] - currentCenter[0]) / currentResolution;
      var y = anchor[1] - resolution * (anchor[1] - currentCenter[1]) / currentResolution;
      center = [x, y];
    }

    return center;
  };
  /**
   * @private
   * @return {import("./size.js").Size} Viewport size or `[100, 100]` when no viewport is found.
   */


  View.prototype.getSizeFromViewport_ = function getSizeFromViewport_() {
    var size = [100, 100];
    var selector = '.ol-viewport[data-view="' + (0, _util.getUid)(this) + '"]';
    var element = document.querySelector(selector);

    if (element) {
      var metrics = getComputedStyle(element);
      size[0] = parseInt(metrics.width, 10);
      size[1] = parseInt(metrics.height, 10);
    }

    return size;
  };
  /**
   * Get the constrained center of this view.
   * @param {import("./coordinate.js").Coordinate|undefined} center Center.
   * @return {import("./coordinate.js").Coordinate|undefined} Constrained center.
   * @api
   */


  View.prototype.constrainCenter = function constrainCenter(center) {
    return this.constraints_.center(center);
  };
  /**
   * Get the constrained resolution of this view.
   * @param {number|undefined} resolution Resolution.
   * @param {number=} opt_delta Delta. Default is `0`.
   * @param {number=} opt_direction Direction. Default is `0`.
   * @return {number|undefined} Constrained resolution.
   * @api
   */


  View.prototype.constrainResolution = function constrainResolution(resolution, opt_delta, opt_direction) {
    var delta = opt_delta || 0;
    var direction = opt_direction || 0;
    return this.constraints_.resolution(resolution, delta, direction);
  };
  /**
   * Get the constrained rotation of this view.
   * @param {number|undefined} rotation Rotation.
   * @param {number=} opt_delta Delta. Default is `0`.
   * @return {number|undefined} Constrained rotation.
   * @api
   */


  View.prototype.constrainRotation = function constrainRotation(rotation, opt_delta) {
    var delta = opt_delta || 0;
    return this.constraints_.rotation(rotation, delta);
  };
  /**
   * Get the view center.
   * @return {import("./coordinate.js").Coordinate|undefined} The center of the view.
   * @observable
   * @api
   */


  View.prototype.getCenter = function getCenter() {
    return (
      /** @type {import("./coordinate.js").Coordinate|undefined} */
      this.get(_ViewProperty.default.CENTER)
    );
  };
  /**
   * @return {Constraints} Constraints.
   */


  View.prototype.getConstraints = function getConstraints() {
    return this.constraints_;
  };
  /**
   * @param {Array<number>=} opt_hints Destination array.
   * @return {Array<number>} Hint.
   */


  View.prototype.getHints = function getHints(opt_hints) {
    if (opt_hints !== undefined) {
      opt_hints[0] = this.hints_[0];
      opt_hints[1] = this.hints_[1];
      return opt_hints;
    } else {
      return this.hints_.slice();
    }
  };
  /**
   * Calculate the extent for the current view state and the passed size.
   * The size is the pixel dimensions of the box into which the calculated extent
   * should fit. In most cases you want to get the extent of the entire map,
   * that is `map.getSize()`.
   * @param {import("./size.js").Size=} opt_size Box pixel size. If not provided, the size of the
   * first map that uses this view will be used.
   * @return {import("./extent.js").Extent} Extent.
   * @api
   */


  View.prototype.calculateExtent = function calculateExtent(opt_size) {
    var size = opt_size || this.getSizeFromViewport_();
    var center =
    /** @type {!import("./coordinate.js").Coordinate} */
    this.getCenter();
    (0, _asserts.assert)(center, 1); // The view center is not defined

    var resolution =
    /** @type {!number} */
    this.getResolution();
    (0, _asserts.assert)(resolution !== undefined, 2); // The view resolution is not defined

    var rotation =
    /** @type {!number} */
    this.getRotation();
    (0, _asserts.assert)(rotation !== undefined, 3); // The view rotation is not defined

    return (0, _extent.getForViewAndSize)(center, resolution, rotation, size);
  };
  /**
   * Get the maximum resolution of the view.
   * @return {number} The maximum resolution of the view.
   * @api
   */


  View.prototype.getMaxResolution = function getMaxResolution() {
    return this.maxResolution_;
  };
  /**
   * Get the minimum resolution of the view.
   * @return {number} The minimum resolution of the view.
   * @api
   */


  View.prototype.getMinResolution = function getMinResolution() {
    return this.minResolution_;
  };
  /**
   * Get the maximum zoom level for the view.
   * @return {number} The maximum zoom level.
   * @api
   */


  View.prototype.getMaxZoom = function getMaxZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.minResolution_)
    );
  };
  /**
   * Set a new maximum zoom level for the view.
   * @param {number} zoom The maximum zoom level.
   * @api
   */


  View.prototype.setMaxZoom = function setMaxZoom(zoom) {
    this.applyOptions_(this.getUpdatedOptions_({
      maxZoom: zoom
    }));
  };
  /**
   * Get the minimum zoom level for the view.
   * @return {number} The minimum zoom level.
   * @api
   */


  View.prototype.getMinZoom = function getMinZoom() {
    return (
      /** @type {number} */
      this.getZoomForResolution(this.maxResolution_)
    );
  };
  /**
   * Set a new minimum zoom level for the view.
   * @param {number} zoom The minimum zoom level.
   * @api
   */


  View.prototype.setMinZoom = function setMinZoom(zoom) {
    this.applyOptions_(this.getUpdatedOptions_({
      minZoom: zoom
    }));
  };
  /**
   * Get the view projection.
   * @return {import("./proj/Projection.js").default} The projection of the view.
   * @api
   */


  View.prototype.getProjection = function getProjection() {
    return this.projection_;
  };
  /**
   * Get the view resolution.
   * @return {number|undefined} The resolution of the view.
   * @observable
   * @api
   */


  View.prototype.getResolution = function getResolution() {
    return (
      /** @type {number|undefined} */
      this.get(_ViewProperty.default.RESOLUTION)
    );
  };
  /**
   * Get the resolutions for the view. This returns the array of resolutions
   * passed to the constructor of the View, or undefined if none were given.
   * @return {Array<number>|undefined} The resolutions of the view.
   * @api
   */


  View.prototype.getResolutions = function getResolutions() {
    return this.resolutions_;
  };
  /**
   * Get the resolution for a provided extent (in map units) and size (in pixels).
   * @param {import("./extent.js").Extent} extent Extent.
   * @param {import("./size.js").Size=} opt_size Box pixel size.
   * @return {number} The resolution at which the provided extent will render at
   *     the given size.
   * @api
   */


  View.prototype.getResolutionForExtent = function getResolutionForExtent(extent, opt_size) {
    var size = opt_size || this.getSizeFromViewport_();
    var xResolution = (0, _extent.getWidth)(extent) / size[0];
    var yResolution = (0, _extent.getHeight)(extent) / size[1];
    return Math.max(xResolution, yResolution);
  };
  /**
   * Return a function that returns a value between 0 and 1 for a
   * resolution. Exponential scaling is assumed.
   * @param {number=} opt_power Power.
   * @return {function(number): number} Resolution for value function.
   */


  View.prototype.getResolutionForValueFunction = function getResolutionForValueFunction(opt_power) {
    var power = opt_power || 2;
    var maxResolution = this.maxResolution_;
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / Math.log(power);
    return (
      /**
       * @param {number} value Value.
       * @return {number} Resolution.
       */
      function (value) {
        var resolution = maxResolution / Math.pow(power, value * max);
        return resolution;
      }
    );
  };
  /**
   * Get the view rotation.
   * @return {number} The rotation of the view in radians.
   * @observable
   * @api
   */


  View.prototype.getRotation = function getRotation() {
    return (
      /** @type {number} */
      this.get(_ViewProperty.default.ROTATION)
    );
  };
  /**
   * Return a function that returns a resolution for a value between
   * 0 and 1. Exponential scaling is assumed.
   * @param {number=} opt_power Power.
   * @return {function(number): number} Value for resolution function.
   */


  View.prototype.getValueForResolutionFunction = function getValueForResolutionFunction(opt_power) {
    var power = opt_power || 2;
    var maxResolution = this.maxResolution_;
    var minResolution = this.minResolution_;
    var max = Math.log(maxResolution / minResolution) / Math.log(power);
    return (
      /**
       * @param {number} resolution Resolution.
       * @return {number} Value.
       */
      function (resolution) {
        var value = Math.log(maxResolution / resolution) / Math.log(power) / max;
        return value;
      }
    );
  };
  /**
   * @param {number} pixelRatio Pixel ratio for center rounding.
   * @return {State} View state.
   */


  View.prototype.getState = function getState(pixelRatio) {
    var center =
    /** @type {import("./coordinate.js").Coordinate} */
    this.getCenter();
    var projection = this.getProjection();
    var resolution =
    /** @type {number} */
    this.getResolution();
    var pixelResolution = resolution / pixelRatio;
    var rotation = this.getRotation();
    return (
      /** @type {State} */
      {
        center: [Math.round(center[0] / pixelResolution) * pixelResolution, Math.round(center[1] / pixelResolution) * pixelResolution],
        projection: projection !== undefined ? projection : null,
        resolution: resolution,
        rotation: rotation,
        zoom: this.getZoom()
      }
    );
  };
  /**
   * Get the current zoom level.  If you configured your view with a resolutions
   * array (this is rare), this method may return non-integer zoom levels (so
   * the zoom level is not safe to use as an index into a resolutions array).
   * @return {number|undefined} Zoom.
   * @api
   */


  View.prototype.getZoom = function getZoom() {
    var zoom;
    var resolution = this.getResolution();

    if (resolution !== undefined) {
      zoom = this.getZoomForResolution(resolution);
    }

    return zoom;
  };
  /**
   * Get the zoom level for a resolution.
   * @param {number} resolution The resolution.
   * @return {number|undefined} The zoom level for the provided resolution.
   * @api
   */


  View.prototype.getZoomForResolution = function getZoomForResolution(resolution) {
    var offset = this.minZoom_ || 0;
    var max, zoomFactor;

    if (this.resolutions_) {
      var nearest = (0, _array.linearFindNearest)(this.resolutions_, resolution, 1);
      offset = nearest;
      max = this.resolutions_[nearest];

      if (nearest == this.resolutions_.length - 1) {
        zoomFactor = 2;
      } else {
        zoomFactor = max / this.resolutions_[nearest + 1];
      }
    } else {
      max = this.maxResolution_;
      zoomFactor = this.zoomFactor_;
    }

    return offset + Math.log(max / resolution) / Math.log(zoomFactor);
  };
  /**
   * Get the resolution for a zoom level.
   * @param {number} zoom Zoom level.
   * @return {number} The view resolution for the provided zoom level.
   * @api
   */


  View.prototype.getResolutionForZoom = function getResolutionForZoom(zoom) {
    return (
      /** @type {number} */
      this.constrainResolution(this.maxResolution_, zoom - this.minZoom_, 0)
    );
  };
  /**
   * Fit the given geometry or extent based on the given map size and border.
   * The size is pixel dimensions of the box to fit the extent into.
   * In most cases you will want to use the map size, that is `map.getSize()`.
   * Takes care of the map angle.
   * @param {import("./geom/SimpleGeometry.js").default|import("./extent.js").Extent} geometryOrExtent The geometry or
   *     extent to fit the view to.
   * @param {FitOptions=} opt_options Options.
   * @api
   */


  View.prototype.fit = function fit(geometryOrExtent, opt_options) {
    var options = opt_options || {};
    var size = options.size;

    if (!size) {
      size = this.getSizeFromViewport_();
    }
    /** @type {import("./geom/SimpleGeometry.js").default} */


    var geometry;
    (0, _asserts.assert)(Array.isArray(geometryOrExtent) || typeof
    /** @type {?} */
    geometryOrExtent.getSimplifiedGeometry === 'function', 24); // Invalid extent or geometry provided as `geometry`

    if (Array.isArray(geometryOrExtent)) {
      (0, _asserts.assert)(!(0, _extent.isEmpty)(geometryOrExtent), 25); // Cannot fit empty extent provided as `geometry`

      geometry = (0, _Polygon.fromExtent)(geometryOrExtent);
    } else if (geometryOrExtent.getType() === _GeometryType.default.CIRCLE) {
      geometryOrExtent = geometryOrExtent.getExtent();
      geometry = (0, _Polygon.fromExtent)(geometryOrExtent);
      geometry.rotate(this.getRotation(), (0, _extent.getCenter)(geometryOrExtent));
    } else {
      geometry = geometryOrExtent;
    }

    var padding = options.padding !== undefined ? options.padding : [0, 0, 0, 0];
    var constrainResolution = options.constrainResolution !== undefined ? options.constrainResolution : true;
    var nearest = options.nearest !== undefined ? options.nearest : false;
    var minResolution;

    if (options.minResolution !== undefined) {
      minResolution = options.minResolution;
    } else if (options.maxZoom !== undefined) {
      minResolution = this.constrainResolution(this.maxResolution_, options.maxZoom - this.minZoom_, 0);
    } else {
      minResolution = 0;
    }

    var coords = geometry.getFlatCoordinates(); // calculate rotated extent

    var rotation = this.getRotation();
    var cosAngle = Math.cos(-rotation);
    var sinAngle = Math.sin(-rotation);
    var minRotX = +Infinity;
    var minRotY = +Infinity;
    var maxRotX = -Infinity;
    var maxRotY = -Infinity;
    var stride = geometry.getStride();

    for (var i = 0, ii = coords.length; i < ii; i += stride) {
      var rotX = coords[i] * cosAngle - coords[i + 1] * sinAngle;
      var rotY = coords[i] * sinAngle + coords[i + 1] * cosAngle;
      minRotX = Math.min(minRotX, rotX);
      minRotY = Math.min(minRotY, rotY);
      maxRotX = Math.max(maxRotX, rotX);
      maxRotY = Math.max(maxRotY, rotY);
    } // calculate resolution


    var resolution = this.getResolutionForExtent([minRotX, minRotY, maxRotX, maxRotY], [size[0] - padding[1] - padding[3], size[1] - padding[0] - padding[2]]);
    resolution = isNaN(resolution) ? minResolution : Math.max(resolution, minResolution);

    if (constrainResolution) {
      var constrainedResolution = this.constrainResolution(resolution, 0, 0);

      if (!nearest && constrainedResolution < resolution) {
        constrainedResolution = this.constrainResolution(constrainedResolution, -1, 0);
      }

      resolution = constrainedResolution;
    } // calculate center


    sinAngle = -sinAngle; // go back to original rotation

    var centerRotX = (minRotX + maxRotX) / 2;
    var centerRotY = (minRotY + maxRotY) / 2;
    centerRotX += (padding[1] - padding[3]) / 2 * resolution;
    centerRotY += (padding[0] - padding[2]) / 2 * resolution;
    var centerX = centerRotX * cosAngle - centerRotY * sinAngle;
    var centerY = centerRotY * cosAngle + centerRotX * sinAngle;
    var center = [centerX, centerY];
    var callback = options.callback ? options.callback : _functions.VOID;

    if (options.duration !== undefined) {
      this.animate({
        resolution: resolution,
        center: center,
        duration: options.duration,
        easing: options.easing
      }, callback);
    } else {
      this.setResolution(resolution);
      this.setCenter(center);
      animationCallback(callback, true);
    }
  };
  /**
   * Center on coordinate and view position.
   * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
   * @param {import("./size.js").Size} size Box pixel size.
   * @param {import("./pixel.js").Pixel} position Position on the view to center on.
   * @api
   */


  View.prototype.centerOn = function centerOn(coordinate, size, position) {
    // calculate rotated position
    var rotation = this.getRotation();
    var cosAngle = Math.cos(-rotation);
    var sinAngle = Math.sin(-rotation);
    var rotX = coordinate[0] * cosAngle - coordinate[1] * sinAngle;
    var rotY = coordinate[1] * cosAngle + coordinate[0] * sinAngle;
    var resolution = this.getResolution();
    rotX += (size[0] / 2 - position[0]) * resolution;
    rotY += (position[1] - size[1] / 2) * resolution; // go back to original angle

    sinAngle = -sinAngle; // go back to original rotation

    var centerX = rotX * cosAngle - rotY * sinAngle;
    var centerY = rotY * cosAngle + rotX * sinAngle;
    this.setCenter([centerX, centerY]);
  };
  /**
   * @return {boolean} Is defined.
   */


  View.prototype.isDef = function isDef() {
    return !!this.getCenter() && this.getResolution() !== undefined;
  };
  /**
   * Rotate the view around a given coordinate.
   * @param {number} rotation New rotation value for the view.
   * @param {import("./coordinate.js").Coordinate=} opt_anchor The rotation center.
   * @api
   */


  View.prototype.rotate = function rotate(rotation, opt_anchor) {
    if (opt_anchor !== undefined) {
      var center = this.calculateCenterRotate(rotation, opt_anchor);
      this.setCenter(center);
    }

    this.setRotation(rotation);
  };
  /**
   * Set the center of the current view.
   * @param {import("./coordinate.js").Coordinate|undefined} center The center of the view.
   * @observable
   * @api
   */


  View.prototype.setCenter = function setCenter(center) {
    this.set(_ViewProperty.default.CENTER, center);

    if (this.getAnimating()) {
      this.cancelAnimations();
    }
  };
  /**
   * @param {ViewHint} hint Hint.
   * @param {number} delta Delta.
   * @return {number} New value.
   */


  View.prototype.setHint = function setHint(hint, delta) {
    this.hints_[hint] += delta;
    this.changed();
    return this.hints_[hint];
  };
  /**
   * Set the resolution for this view.
   * @param {number|undefined} resolution The resolution of the view.
   * @observable
   * @api
   */


  View.prototype.setResolution = function setResolution(resolution) {
    this.set(_ViewProperty.default.RESOLUTION, resolution);

    if (this.getAnimating()) {
      this.cancelAnimations();
    }
  };
  /**
   * Set the rotation for this view.
   * @param {number} rotation The rotation of the view in radians.
   * @observable
   * @api
   */


  View.prototype.setRotation = function setRotation(rotation) {
    this.set(_ViewProperty.default.ROTATION, rotation);

    if (this.getAnimating()) {
      this.cancelAnimations();
    }
  };
  /**
   * Zoom to a specific zoom level.
   * @param {number} zoom Zoom level.
   * @api
   */


  View.prototype.setZoom = function setZoom(zoom) {
    this.setResolution(this.getResolutionForZoom(zoom));
  };

  return View;
}(_Object.default);
/**
 * @param {Function} callback Callback.
 * @param {*} returnValue Return value.
 */


function animationCallback(callback, returnValue) {
  setTimeout(function () {
    callback(returnValue);
  }, 0);
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./centerconstraint.js").Type} The constraint.
 */


function createCenterConstraint(options) {
  if (options.extent !== undefined) {
    return (0, _centerconstraint.createExtent)(options.extent);
  } else {
    return _centerconstraint.none;
  }
}
/**
 * @param {ViewOptions} options View options.
 * @return {{constraint: import("./resolutionconstraint.js").Type, maxResolution: number,
 *     minResolution: number, minZoom: number, zoomFactor: number}} The constraint.
 */


function createResolutionConstraint(options) {
  var resolutionConstraint;
  var maxResolution;
  var minResolution; // TODO: move these to be ol constants
  // see https://github.com/openlayers/openlayers/issues/2076

  var defaultMaxZoom = 28;
  var defaultZoomFactor = 2;
  var minZoom = options.minZoom !== undefined ? options.minZoom : DEFAULT_MIN_ZOOM;
  var maxZoom = options.maxZoom !== undefined ? options.maxZoom : defaultMaxZoom;
  var zoomFactor = options.zoomFactor !== undefined ? options.zoomFactor : defaultZoomFactor;

  if (options.resolutions !== undefined) {
    var resolutions = options.resolutions;
    maxResolution = resolutions[minZoom];
    minResolution = resolutions[maxZoom] !== undefined ? resolutions[maxZoom] : resolutions[resolutions.length - 1];
    resolutionConstraint = (0, _resolutionconstraint.createSnapToResolutions)(resolutions);
  } else {
    // calculate the default min and max resolution
    var projection = (0, _proj.createProjection)(options.projection, 'EPSG:3857');
    var extent = projection.getExtent();
    var size = !extent ? // use an extent that can fit the whole world if need be
    360 * _proj.METERS_PER_UNIT[_Units.default.DEGREES] / projection.getMetersPerUnit() : Math.max((0, _extent.getWidth)(extent), (0, _extent.getHeight)(extent));
    var defaultMaxResolution = size / _common.DEFAULT_TILE_SIZE / Math.pow(defaultZoomFactor, DEFAULT_MIN_ZOOM);
    var defaultMinResolution = defaultMaxResolution / Math.pow(defaultZoomFactor, defaultMaxZoom - DEFAULT_MIN_ZOOM); // user provided maxResolution takes precedence

    maxResolution = options.maxResolution;

    if (maxResolution !== undefined) {
      minZoom = 0;
    } else {
      maxResolution = defaultMaxResolution / Math.pow(zoomFactor, minZoom);
    } // user provided minResolution takes precedence


    minResolution = options.minResolution;

    if (minResolution === undefined) {
      if (options.maxZoom !== undefined) {
        if (options.maxResolution !== undefined) {
          minResolution = maxResolution / Math.pow(zoomFactor, maxZoom);
        } else {
          minResolution = defaultMaxResolution / Math.pow(zoomFactor, maxZoom);
        }
      } else {
        minResolution = defaultMinResolution;
      }
    } // given discrete zoom levels, minResolution may be different than provided


    maxZoom = minZoom + Math.floor(Math.log(maxResolution / minResolution) / Math.log(zoomFactor));
    minResolution = maxResolution / Math.pow(zoomFactor, maxZoom - minZoom);
    resolutionConstraint = (0, _resolutionconstraint.createSnapToPower)(zoomFactor, maxResolution, maxZoom - minZoom);
  }

  return {
    constraint: resolutionConstraint,
    maxResolution: maxResolution,
    minResolution: minResolution,
    minZoom: minZoom,
    zoomFactor: zoomFactor
  };
}
/**
 * @param {ViewOptions} options View options.
 * @return {import("./rotationconstraint.js").Type} Rotation constraint.
 */


function createRotationConstraint(options) {
  var enableRotation = options.enableRotation !== undefined ? options.enableRotation : true;

  if (enableRotation) {
    var constrainRotation = options.constrainRotation;

    if (constrainRotation === undefined || constrainRotation === true) {
      return (0, _rotationconstraint.createSnapToZero)();
    } else if (constrainRotation === false) {
      return _rotationconstraint.none;
    } else if (typeof constrainRotation === 'number') {
      return (0, _rotationconstraint.createSnapToN)(constrainRotation);
    } else {
      return _rotationconstraint.none;
    }
  } else {
    return _rotationconstraint.disable;
  }
}
/**
 * Determine if an animation involves no view change.
 * @param {Animation} animation The animation.
 * @return {boolean} The animation involves no view change.
 */


function isNoopAnimation(animation) {
  if (animation.sourceCenter && animation.targetCenter) {
    if (!(0, _coordinate.equals)(animation.sourceCenter, animation.targetCenter)) {
      return false;
    }
  }

  if (animation.sourceResolution !== animation.targetResolution) {
    return false;
  }

  if (animation.sourceRotation !== animation.targetRotation) {
    return false;
  }

  return true;
}

var _default = View;
exports.default = _default;
},{"./tilegrid/common.js":"node_modules/ol/tilegrid/common.js","./util.js":"node_modules/ol/util.js","./functions.js":"node_modules/ol/functions.js","./centerconstraint.js":"node_modules/ol/centerconstraint.js","./Object.js":"node_modules/ol/Object.js","./resolutionconstraint.js":"node_modules/ol/resolutionconstraint.js","./rotationconstraint.js":"node_modules/ol/rotationconstraint.js","./ViewHint.js":"node_modules/ol/ViewHint.js","./ViewProperty.js":"node_modules/ol/ViewProperty.js","./array.js":"node_modules/ol/array.js","./asserts.js":"node_modules/ol/asserts.js","./coordinate.js":"node_modules/ol/coordinate.js","./easing.js":"node_modules/ol/easing.js","./extent.js":"node_modules/ol/extent.js","./geom/GeometryType.js":"node_modules/ol/geom/GeometryType.js","./geom/Polygon.js":"node_modules/ol/geom/Polygon.js","./math.js":"node_modules/ol/math.js","./obj.js":"node_modules/ol/obj.js","./proj.js":"node_modules/ol/proj.js","./proj/Units.js":"node_modules/ol/proj/Units.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61961" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/ol/View.js"], null)
//# sourceMappingURL=/View.cd74c59f.js.map