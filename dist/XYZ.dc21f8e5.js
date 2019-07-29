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
})({"node_modules/ol/reproj/common.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ENABLE_RASTER_REPROJECTION = exports.ERROR_THRESHOLD = void 0;

/**
 * @module ol/reproj/common
 */

/**
 * Default maximum allowed threshold  (in pixels) for reprojection
 * triangulation.
 * @type {number}
 */
var ERROR_THRESHOLD = 0.5;
/**
 * Enable automatic reprojection of raster sources. Default is `true`.
 * TODO: decide if we want to expose this as a build flag or remove it
 * @type {boolean}
 */

exports.ERROR_THRESHOLD = ERROR_THRESHOLD;
var ENABLE_RASTER_REPROJECTION = true;
exports.ENABLE_RASTER_REPROJECTION = ENABLE_RASTER_REPROJECTION;
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
},{}],"node_modules/ol/TileState.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/TileState
 */

/**
 * @enum {number}
 */
var _default = {
  IDLE: 0,
  LOADING: 1,
  LOADED: 2,

  /**
   * Indicates that tile loading failed
   * @type {number}
   */
  ERROR: 3,
  EMPTY: 4,
  ABORT: 5
};
exports.default = _default;
},{}],"node_modules/ol/easing.js":[function(require,module,exports) {
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
},{}],"node_modules/ol/Disposable.js":[function(require,module,exports) {
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
},{"./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/functions.js":[function(require,module,exports) {
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
},{}],"node_modules/ol/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TileState = _interopRequireDefault(require("./TileState.js"));

var _easing = require("./easing.js");

var _Target = _interopRequireDefault(require("./events/Target.js"));

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/Tile
 */

/**
 * A function that takes an {@link module:ol/Tile} for the tile and a
 * `{string}` for the url as arguments. The default is
 * ```js
 * source.setTileLoadFunction(function(tile, src) {
 *   tile.getImage().src = src;
 * });
 * ```
 * For more fine grained control, the load function can use fetch or XMLHttpRequest and involve
 * error handling:
 *
 * ```js
 * import TileState from 'ol/TileState';
 *
 * source.setTileLoadFunction(function(tile, src) {
 *   var xhr = new XMLHttpRequest();
 *   xhr.responseType = 'blob';
 *   xhr.addEventListener('loadend', function (evt) {
 *     var data = this.response;
 *     if (data !== undefined) {
 *       tile.getImage().src = URL.createObjectURL(data);
 *     } else {
 *       tile.setState(TileState.ERROR);
 *     }
 *   });
 *   xhr.addEventListener('error', function () {
 *     tile.setState(TileState.ERROR);
 *   });
 *   xhr.open('GET', src);
 *   xhr.send();
 * });
 * ```
 *
 * @typedef {function(Tile, string)} LoadFunction
 * @api
 */

/**
 * {@link module:ol/source/Tile~Tile} sources use a function of this type to get
 * the url that provides a tile for a given tile coordinate.
 *
 * This function takes an {@link module:ol/tilecoord~TileCoord} for the tile
 * coordinate, a `{number}` representing the pixel ratio and a
 * {@link module:ol/proj/Projection} for the projection  as arguments
 * and returns a `{string}` representing the tile URL, or undefined if no tile
 * should be requested for the passed tile coordinate.
 *
 * @typedef {function(import("./tilecoord.js").TileCoord, number,
 *           import("./proj/Projection.js").default): (string|undefined)} UrlFunction
 * @api
 */

/**
 * @typedef {Object} Options
 * @property {number} [transition=250] A duration for tile opacity
 * transitions in milliseconds. A duration of 0 disables the opacity transition.
 * @api
 */

/**
 * @classdesc
 * Base class for tiles.
 *
 * @abstract
 */
var Tile =
/*@__PURE__*/
function (EventTarget) {
  function Tile(tileCoord, state, opt_options) {
    EventTarget.call(this);
    var options = opt_options ? opt_options : {};
    /**
     * @type {import("./tilecoord.js").TileCoord}
     */

    this.tileCoord = tileCoord;
    /**
     * @protected
     * @type {TileState}
     */

    this.state = state;
    /**
     * An "interim" tile for this tile. The interim tile may be used while this
     * one is loading, for "smooth" transitions when changing params/dimensions
     * on the source.
     * @type {Tile}
     */

    this.interimTile = null;
    /**
     * A key assigned to the tile. This is used by the tile source to determine
     * if this tile can effectively be used, or if a new tile should be created
     * and this one be used as an interim tile for this new tile.
     * @type {string}
     */

    this.key = '';
    /**
     * The duration for the opacity transition.
     * @type {number}
     */

    this.transition_ = options.transition === undefined ? 250 : options.transition;
    /**
     * Lookup of start times for rendering transitions.  If the start time is
     * equal to -1, the transition is complete.
     * @type {Object<string, number>}
     */

    this.transitionStarts_ = {};
  }

  if (EventTarget) Tile.__proto__ = EventTarget;
  Tile.prototype = Object.create(EventTarget && EventTarget.prototype);
  Tile.prototype.constructor = Tile;
  /**
   * @protected
   */

  Tile.prototype.changed = function changed() {
    this.dispatchEvent(_EventType.default.CHANGE);
  };
  /**
   * @return {string} Key.
   */


  Tile.prototype.getKey = function getKey() {
    return this.key + '/' + this.tileCoord;
  };
  /**
   * Get the interim tile most suitable for rendering using the chain of interim
   * tiles. This corresponds to the  most recent tile that has been loaded, if no
   * such tile exists, the original tile is returned.
   * @return {!Tile} Best tile for rendering.
   */


  Tile.prototype.getInterimTile = function getInterimTile() {
    if (!this.interimTile) {
      //empty chain
      return this;
    }

    var tile = this.interimTile; // find the first loaded tile and return it. Since the chain is sorted in
    // decreasing order of creation time, there is no need to search the remainder
    // of the list (all those tiles correspond to older requests and will be
    // cleaned up by refreshInterimChain)

    do {
      if (tile.getState() == _TileState.default.LOADED) {
        return tile;
      }

      tile = tile.interimTile;
    } while (tile); // we can not find a better tile


    return this;
  };
  /**
   * Goes through the chain of interim tiles and discards sections of the chain
   * that are no longer relevant.
   */


  Tile.prototype.refreshInterimChain = function refreshInterimChain() {
    if (!this.interimTile) {
      return;
    }

    var tile = this.interimTile;
    var prev =
    /** @type {Tile} */
    this;

    do {
      if (tile.getState() == _TileState.default.LOADED) {
        //we have a loaded tile, we can discard the rest of the list
        //we would could abort any LOADING tile request
        //older than this tile (i.e. any LOADING tile following this entry in the chain)
        tile.interimTile = null;
        break;
      } else if (tile.getState() == _TileState.default.LOADING) {
        //keep this LOADING tile any loaded tiles later in the chain are
        //older than this tile, so we're still interested in the request
        prev = tile;
      } else if (tile.getState() == _TileState.default.IDLE) {
        //the head of the list is the most current tile, we don't need
        //to start any other requests for this chain
        prev.interimTile = tile.interimTile;
      } else {
        prev = tile;
      }

      tile = prev.interimTile;
    } while (tile);
  };
  /**
   * Get the tile coordinate for this tile.
   * @return {import("./tilecoord.js").TileCoord} The tile coordinate.
   * @api
   */


  Tile.prototype.getTileCoord = function getTileCoord() {
    return this.tileCoord;
  };
  /**
   * @return {TileState} State.
   */


  Tile.prototype.getState = function getState() {
    return this.state;
  };
  /**
   * Sets the state of this tile. If you write your own {@link module:ol/Tile~LoadFunction tileLoadFunction} ,
   * it is important to set the state correctly to {@link module:ol/TileState~ERROR}
   * when the tile cannot be loaded. Otherwise the tile cannot be removed from
   * the tile queue and will block other requests.
   * @param {TileState} state State.
   * @api
   */


  Tile.prototype.setState = function setState(state) {
    this.state = state;
    this.changed();
  };
  /**
   * Load the image or retry if loading previously failed.
   * Loading is taken care of by the tile queue, and calling this method is
   * only needed for preloading or for reloading in case of an error.
   * @abstract
   * @api
   */


  Tile.prototype.load = function load() {};
  /**
   * Get the alpha value for rendering.
   * @param {string} id An id for the renderer.
   * @param {number} time The render frame time.
   * @return {number} A number between 0 and 1.
   */


  Tile.prototype.getAlpha = function getAlpha(id, time) {
    if (!this.transition_) {
      return 1;
    }

    var start = this.transitionStarts_[id];

    if (!start) {
      start = time;
      this.transitionStarts_[id] = start;
    } else if (start === -1) {
      return 1;
    }

    var delta = time - start + 1000 / 60; // avoid rendering at 0

    if (delta >= this.transition_) {
      return 1;
    }

    return (0, _easing.easeIn)(delta / this.transition_);
  };
  /**
   * Determine if a tile is in an alpha transition.  A tile is considered in
   * transition if tile.getAlpha() has not yet been called or has been called
   * and returned 1.
   * @param {string} id An id for the renderer.
   * @return {boolean} The tile is in transition.
   */


  Tile.prototype.inTransition = function inTransition(id) {
    if (!this.transition_) {
      return false;
    }

    return this.transitionStarts_[id] !== -1;
  };
  /**
   * Mark a transition as complete.
   * @param {string} id An id for the renderer.
   */


  Tile.prototype.endTransition = function endTransition(id) {
    if (this.transition_) {
      this.transitionStarts_[id] = -1;
    }
  };

  return Tile;
}(_Target.default);

var _default = Tile;
exports.default = _default;
},{"./TileState.js":"node_modules/ol/TileState.js","./easing.js":"node_modules/ol/easing.js","./events/Target.js":"node_modules/ol/events/Target.js","./events/EventType.js":"node_modules/ol/events/EventType.js"}],"node_modules/ol/dom.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanvasContext2D = createCanvasContext2D;
exports.outerWidth = outerWidth;
exports.outerHeight = outerHeight;
exports.replaceNode = replaceNode;
exports.removeNode = removeNode;
exports.removeChildren = removeChildren;

/**
 * @module ol/dom
 */

/**
 * Create an html canvas element and returns its 2d context.
 * @param {number=} opt_width Canvas width.
 * @param {number=} opt_height Canvas height.
 * @return {CanvasRenderingContext2D} The context.
 */
function createCanvasContext2D(opt_width, opt_height) {
  var canvas =
  /** @type {HTMLCanvasElement} */
  document.createElement('canvas');

  if (opt_width) {
    canvas.width = opt_width;
  }

  if (opt_height) {
    canvas.height = opt_height;
  }

  return (
    /** @type {CanvasRenderingContext2D} */
    canvas.getContext('2d')
  );
}
/**
 * Get the current computed width for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerWidth(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The width.
 */


function outerWidth(element) {
  var width = element.offsetWidth;
  var style = getComputedStyle(element);
  width += parseInt(style.marginLeft, 10) + parseInt(style.marginRight, 10);
  return width;
}
/**
 * Get the current computed height for the given element including margin,
 * padding and border.
 * Equivalent to jQuery's `$(el).outerHeight(true)`.
 * @param {!HTMLElement} element Element.
 * @return {number} The height.
 */


function outerHeight(element) {
  var height = element.offsetHeight;
  var style = getComputedStyle(element);
  height += parseInt(style.marginTop, 10) + parseInt(style.marginBottom, 10);
  return height;
}
/**
 * @param {Node} newNode Node to replace old node
 * @param {Node} oldNode The node to be replaced
 */


function replaceNode(newNode, oldNode) {
  var parent = oldNode.parentNode;

  if (parent) {
    parent.replaceChild(newNode, oldNode);
  }
}
/**
 * @param {Node} node The node to remove.
 * @returns {Node} The node that was removed or null.
 */


function removeNode(node) {
  return node && node.parentNode ? node.parentNode.removeChild(node) : null;
}
/**
 * @param {Node} node The node to remove the children from.
 */


function removeChildren(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
},{}],"node_modules/ol/ImageTile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Tile = _interopRequireDefault(require("./Tile.js"));

var _TileState = _interopRequireDefault(require("./TileState.js"));

var _dom = require("./dom.js");

var _events = require("./events.js");

var _EventType = _interopRequireDefault(require("./events/EventType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/ImageTile
 */
var ImageTile =
/*@__PURE__*/
function (Tile) {
  function ImageTile(tileCoord, state, src, crossOrigin, tileLoadFunction, opt_options) {
    Tile.call(this, tileCoord, state, opt_options);
    /**
     * @private
     * @type {?string}
     */

    this.crossOrigin_ = crossOrigin;
    /**
     * Image URI
     *
     * @private
     * @type {string}
     */

    this.src_ = src;
    /**
     * @private
     * @type {HTMLImageElement|HTMLCanvasElement}
     */

    this.image_ = new Image();

    if (crossOrigin !== null) {
      this.image_.crossOrigin = crossOrigin;
    }
    /**
     * @private
     * @type {Array<import("./events.js").EventsKey>}
     */


    this.imageListenerKeys_ = null;
    /**
     * @private
     * @type {import("./Tile.js").LoadFunction}
     */

    this.tileLoadFunction_ = tileLoadFunction;
  }

  if (Tile) ImageTile.__proto__ = Tile;
  ImageTile.prototype = Object.create(Tile && Tile.prototype);
  ImageTile.prototype.constructor = ImageTile;
  /**
   * @inheritDoc
   */

  ImageTile.prototype.disposeInternal = function disposeInternal() {
    if (this.state == _TileState.default.LOADING) {
      this.unlistenImage_();
      this.image_ = getBlankImage();
    }

    if (this.interimTile) {
      this.interimTile.dispose();
    }

    this.state = _TileState.default.ABORT;
    this.changed();
    Tile.prototype.disposeInternal.call(this);
  };
  /**
   * Get the HTML image element for this tile (may be a Canvas, Image, or Video).
   * @return {HTMLCanvasElement|HTMLImageElement|HTMLVideoElement} Image.
   * @api
   */


  ImageTile.prototype.getImage = function getImage() {
    return this.image_;
  };
  /**
   * @inheritDoc
   */


  ImageTile.prototype.getKey = function getKey() {
    return this.src_;
  };
  /**
   * Tracks loading or read errors.
   *
   * @private
   */


  ImageTile.prototype.handleImageError_ = function handleImageError_() {
    this.state = _TileState.default.ERROR;
    this.unlistenImage_();
    this.image_ = getBlankImage();
    this.changed();
  };
  /**
   * Tracks successful image load.
   *
   * @private
   */


  ImageTile.prototype.handleImageLoad_ = function handleImageLoad_() {
    var image =
    /** @type {HTMLImageElement} */
    this.image_;

    if (image.naturalWidth && image.naturalHeight) {
      this.state = _TileState.default.LOADED;
    } else {
      this.state = _TileState.default.EMPTY;
    }

    this.unlistenImage_();
    this.changed();
  };
  /**
   * @inheritDoc
   * @api
   */


  ImageTile.prototype.load = function load() {
    if (this.state == _TileState.default.ERROR) {
      this.state = _TileState.default.IDLE;
      this.image_ = new Image();

      if (this.crossOrigin_ !== null) {
        this.image_.crossOrigin = this.crossOrigin_;
      }
    }

    if (this.state == _TileState.default.IDLE) {
      this.state = _TileState.default.LOADING;
      this.changed();
      this.imageListenerKeys_ = [(0, _events.listenOnce)(this.image_, _EventType.default.ERROR, this.handleImageError_, this), (0, _events.listenOnce)(this.image_, _EventType.default.LOAD, this.handleImageLoad_, this)];
      this.tileLoadFunction_(this, this.src_);
    }
  };
  /**
   * Discards event handlers which listen for load completion or errors.
   *
   * @private
   */


  ImageTile.prototype.unlistenImage_ = function unlistenImage_() {
    this.imageListenerKeys_.forEach(_events.unlistenByKey);
    this.imageListenerKeys_ = null;
  };

  return ImageTile;
}(_Tile.default);
/**
 * Get a 1-pixel blank image.
 * @return {HTMLCanvasElement} Blank image.
 */


function getBlankImage() {
  var ctx = (0, _dom.createCanvasContext2D)(1, 1);
  ctx.fillStyle = 'rgba(0,0,0,0)';
  ctx.fillRect(0, 0, 1, 1);
  return ctx.canvas;
}

var _default = ImageTile;
exports.default = _default;
},{"./Tile.js":"node_modules/ol/Tile.js","./TileState.js":"node_modules/ol/TileState.js","./dom.js":"node_modules/ol/dom.js","./events.js":"node_modules/ol/events.js","./events/EventType.js":"node_modules/ol/events/EventType.js"}],"node_modules/ol/AssertionError.js":[function(require,module,exports) {
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
},{"./AssertionError.js":"node_modules/ol/AssertionError.js"}],"node_modules/ol/structs/LRUCache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _asserts = require("../asserts.js");

var _Target = _interopRequireDefault(require("../events/Target.js"));

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/structs/LRUCache
 */

/**
 * @typedef {Object} Entry
 * @property {string} key_
 * @property {Object} newer
 * @property {Object} older
 * @property {*} value_
 */

/**
 * @classdesc
 * Implements a Least-Recently-Used cache where the keys do not conflict with
 * Object's properties (e.g. 'hasOwnProperty' is not allowed as a key). Expiring
 * items from the cache is the responsibility of the user.
 *
 * @fires import("../events/Event.js").Event
 * @template T
 */
var LRUCache =
/*@__PURE__*/
function (EventTarget) {
  function LRUCache(opt_highWaterMark) {
    EventTarget.call(this);
    /**
     * @type {number}
     */

    this.highWaterMark = opt_highWaterMark !== undefined ? opt_highWaterMark : 2048;
    /**
     * @private
     * @type {number}
     */

    this.count_ = 0;
    /**
     * @private
     * @type {!Object<string, Entry>}
     */

    this.entries_ = {};
    /**
     * @private
     * @type {?Entry}
     */

    this.oldest_ = null;
    /**
     * @private
     * @type {?Entry}
     */

    this.newest_ = null;
  }

  if (EventTarget) LRUCache.__proto__ = EventTarget;
  LRUCache.prototype = Object.create(EventTarget && EventTarget.prototype);
  LRUCache.prototype.constructor = LRUCache;
  /**
   * @return {boolean} Can expire cache.
   */

  LRUCache.prototype.canExpireCache = function canExpireCache() {
    return this.getCount() > this.highWaterMark;
  };
  /**
   * FIXME empty description for jsdoc
   */


  LRUCache.prototype.clear = function clear() {
    this.count_ = 0;
    this.entries_ = {};
    this.oldest_ = null;
    this.newest_ = null;
    this.dispatchEvent(_EventType.default.CLEAR);
  };
  /**
   * @param {string} key Key.
   * @return {boolean} Contains key.
   */


  LRUCache.prototype.containsKey = function containsKey(key) {
    return this.entries_.hasOwnProperty(key);
  };
  /**
   * @param {function(this: S, T, string, LRUCache): ?} f The function
   *     to call for every entry from the oldest to the newer. This function takes
   *     3 arguments (the entry value, the entry key and the LRUCache object).
   *     The return value is ignored.
   * @param {S=} opt_this The object to use as `this` in `f`.
   * @template S
   */


  LRUCache.prototype.forEach = function forEach(f, opt_this) {
    var entry = this.oldest_;

    while (entry) {
      f.call(opt_this, entry.value_, entry.key_, this);
      entry = entry.newer;
    }
  };
  /**
   * @param {string} key Key.
   * @return {T} Value.
   */


  LRUCache.prototype.get = function get(key) {
    var entry = this.entries_[key];
    (0, _asserts.assert)(entry !== undefined, 15); // Tried to get a value for a key that does not exist in the cache

    if (entry === this.newest_) {
      return entry.value_;
    } else if (entry === this.oldest_) {
      this.oldest_ =
      /** @type {Entry} */
      this.oldest_.newer;
      this.oldest_.older = null;
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }

    entry.newer = null;
    entry.older = this.newest_;
    this.newest_.newer = entry;
    this.newest_ = entry;
    return entry.value_;
  };
  /**
   * Remove an entry from the cache.
   * @param {string} key The entry key.
   * @return {T} The removed entry.
   */


  LRUCache.prototype.remove = function remove(key) {
    var entry = this.entries_[key];
    (0, _asserts.assert)(entry !== undefined, 15); // Tried to get a value for a key that does not exist in the cache

    if (entry === this.newest_) {
      this.newest_ =
      /** @type {Entry} */
      entry.older;

      if (this.newest_) {
        this.newest_.newer = null;
      }
    } else if (entry === this.oldest_) {
      this.oldest_ =
      /** @type {Entry} */
      entry.newer;

      if (this.oldest_) {
        this.oldest_.older = null;
      }
    } else {
      entry.newer.older = entry.older;
      entry.older.newer = entry.newer;
    }

    delete this.entries_[key];
    --this.count_;
    return entry.value_;
  };
  /**
   * @return {number} Count.
   */


  LRUCache.prototype.getCount = function getCount() {
    return this.count_;
  };
  /**
   * @return {Array<string>} Keys.
   */


  LRUCache.prototype.getKeys = function getKeys() {
    var keys = new Array(this.count_);
    var i = 0;
    var entry;

    for (entry = this.newest_; entry; entry = entry.older) {
      keys[i++] = entry.key_;
    }

    return keys;
  };
  /**
   * @return {Array<T>} Values.
   */


  LRUCache.prototype.getValues = function getValues() {
    var values = new Array(this.count_);
    var i = 0;
    var entry;

    for (entry = this.newest_; entry; entry = entry.older) {
      values[i++] = entry.value_;
    }

    return values;
  };
  /**
   * @return {T} Last value.
   */


  LRUCache.prototype.peekLast = function peekLast() {
    return this.oldest_.value_;
  };
  /**
   * @return {string} Last key.
   */


  LRUCache.prototype.peekLastKey = function peekLastKey() {
    return this.oldest_.key_;
  };
  /**
   * Get the key of the newest item in the cache.  Throws if the cache is empty.
   * @return {string} The newest key.
   */


  LRUCache.prototype.peekFirstKey = function peekFirstKey() {
    return this.newest_.key_;
  };
  /**
   * @return {T} value Value.
   */


  LRUCache.prototype.pop = function pop() {
    var entry = this.oldest_;
    delete this.entries_[entry.key_];

    if (entry.newer) {
      entry.newer.older = null;
    }

    this.oldest_ =
    /** @type {Entry} */
    entry.newer;

    if (!this.oldest_) {
      this.newest_ = null;
    }

    --this.count_;
    return entry.value_;
  };
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */


  LRUCache.prototype.replace = function replace(key, value) {
    this.get(key); // update `newest_`

    this.entries_[key].value_ = value;
  };
  /**
   * @param {string} key Key.
   * @param {T} value Value.
   */


  LRUCache.prototype.set = function set(key, value) {
    (0, _asserts.assert)(!(key in this.entries_), 16); // Tried to set a value for a key that is used already

    var entry =
    /** @type {Entry} */
    {
      key_: key,
      newer: null,
      older: this.newest_,
      value_: value
    };

    if (!this.newest_) {
      this.oldest_ = entry;
    } else {
      this.newest_.newer = entry;
    }

    this.newest_ = entry;
    this.entries_[key] = entry;
    ++this.count_;
  };
  /**
   * Set a maximum number of entries for the cache.
   * @param {number} size Cache size.
   * @api
   */


  LRUCache.prototype.setSize = function setSize(size) {
    this.highWaterMark = size;
  };
  /**
   * Prune the cache.
   */


  LRUCache.prototype.prune = function prune() {
    while (this.canExpireCache()) {
      this.pop();
    }
  };

  return LRUCache;
}(_Target.default);

var _default = LRUCache;
exports.default = _default;
},{"../asserts.js":"node_modules/ol/asserts.js","../events/Target.js":"node_modules/ol/events/Target.js","../events/EventType.js":"node_modules/ol/events/EventType.js"}],"node_modules/ol/tilecoord.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpdate = createOrUpdate;
exports.getKeyZXY = getKeyZXY;
exports.getKey = getKey;
exports.fromKey = fromKey;
exports.hash = hash;
exports.quadKey = quadKey;
exports.withinExtentAndZ = withinExtentAndZ;

/**
 * @module ol/tilecoord
 */

/**
 * An array of three numbers representing the location of a tile in a tile
 * grid. The order is `z`, `x`, and `y`. `z` is the zoom level.
 * @typedef {Array<number>} TileCoord
 * @api
 */

/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {TileCoord=} opt_tileCoord Tile coordinate.
 * @return {TileCoord} Tile coordinate.
 */
function createOrUpdate(z, x, y, opt_tileCoord) {
  if (opt_tileCoord !== undefined) {
    opt_tileCoord[0] = z;
    opt_tileCoord[1] = x;
    opt_tileCoord[2] = y;
    return opt_tileCoord;
  } else {
    return [z, x, y];
  }
}
/**
 * @param {number} z Z.
 * @param {number} x X.
 * @param {number} y Y.
 * @return {string} Key.
 */


function getKeyZXY(z, x, y) {
  return z + '/' + x + '/' + y;
}
/**
 * Get the key for a tile coord.
 * @param {TileCoord} tileCoord The tile coord.
 * @return {string} Key.
 */


function getKey(tileCoord) {
  return getKeyZXY(tileCoord[0], tileCoord[1], tileCoord[2]);
}
/**
 * Get a tile coord given a key.
 * @param {string} key The tile coord key.
 * @return {TileCoord} The tile coord.
 */


function fromKey(key) {
  return key.split('/').map(Number);
}
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {number} Hash.
 */


function hash(tileCoord) {
  return (tileCoord[1] << tileCoord[0]) + tileCoord[2];
}
/**
 * @param {TileCoord} tileCoord Tile coord.
 * @return {string} Quad key.
 */


function quadKey(tileCoord) {
  var z = tileCoord[0];
  var digits = new Array(z);
  var mask = 1 << z - 1;
  var i, charCode;

  for (i = 0; i < z; ++i) {
    // 48 is charCode for 0 - '0'.charCodeAt(0)
    charCode = 48;

    if (tileCoord[1] & mask) {
      charCode += 1;
    }

    if (tileCoord[2] & mask) {
      charCode += 2;
    }

    digits[i] = String.fromCharCode(charCode);
    mask >>= 1;
  }

  return digits.join('');
}
/**
 * @param {TileCoord} tileCoord Tile coordinate.
 * @param {!import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {boolean} Tile coordinate is within extent and zoom level range.
 */


function withinExtentAndZ(tileCoord, tileGrid) {
  var z = tileCoord[0];
  var x = tileCoord[1];
  var y = tileCoord[2];

  if (tileGrid.getMinZoom() > z || z > tileGrid.getMaxZoom()) {
    return false;
  }

  var extent = tileGrid.getExtent();
  var tileRange;

  if (!extent) {
    tileRange = tileGrid.getFullTileRange(z);
  } else {
    tileRange = tileGrid.getTileRangeForExtentAndZ(extent, z);
  }

  if (!tileRange) {
    return true;
  } else {
    return tileRange.containsXY(x, y);
  }
}
},{}],"node_modules/ol/TileCache.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LRUCache = _interopRequireDefault(require("./structs/LRUCache.js"));

var _tilecoord = require("./tilecoord.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/TileCache
 */
var TileCache =
/*@__PURE__*/
function (LRUCache) {
  function TileCache(opt_highWaterMark) {
    LRUCache.call(this, opt_highWaterMark);
  }

  if (LRUCache) TileCache.__proto__ = LRUCache;
  TileCache.prototype = Object.create(LRUCache && LRUCache.prototype);
  TileCache.prototype.constructor = TileCache;
  /**
   * @param {!Object<string, import("./TileRange.js").default>} usedTiles Used tiles.
   */

  TileCache.prototype.expireCache = function expireCache(usedTiles) {
    while (this.canExpireCache()) {
      var tile = this.peekLast();
      var zKey = tile.tileCoord[0].toString();

      if (zKey in usedTiles && usedTiles[zKey].contains(tile.tileCoord)) {
        break;
      } else {
        this.pop().dispose();
      }
    }
  };
  /**
   * Prune all tiles from the cache that don't have the same z as the newest tile.
   */


  TileCache.prototype.pruneExceptNewestZ = function pruneExceptNewestZ() {
    if (this.getCount() === 0) {
      return;
    }

    var key = this.peekFirstKey();
    var tileCoord = (0, _tilecoord.fromKey)(key);
    var z = tileCoord[0];
    this.forEach(function (tile) {
      if (tile.tileCoord[0] !== z) {
        this.remove((0, _tilecoord.getKey)(tile.tileCoord));
        tile.dispose();
      }
    }, this);
  };

  return TileCache;
}(_LRUCache.default);

var _default = TileCache;
exports.default = _default;
},{"./structs/LRUCache.js":"node_modules/ol/structs/LRUCache.js","./tilecoord.js":"node_modules/ol/tilecoord.js"}],"node_modules/ol/math.js":[function(require,module,exports) {
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
},{"./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/geom/GeometryType.js":[function(require,module,exports) {
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
},{"./math.js":"node_modules/ol/math.js","./geom/GeometryType.js":"node_modules/ol/geom/GeometryType.js"}],"node_modules/ol/extent/Corner.js":[function(require,module,exports) {
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
},{"./asserts.js":"node_modules/ol/asserts.js","./extent/Corner.js":"node_modules/ol/extent/Corner.js","./extent/Relationship.js":"node_modules/ol/extent/Relationship.js"}],"node_modules/ol/proj/Units.js":[function(require,module,exports) {
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
},{"./sphere.js":"node_modules/ol/sphere.js","./extent.js":"node_modules/ol/extent.js","./math.js":"node_modules/ol/math.js","./proj/epsg3857.js":"node_modules/ol/proj/epsg3857.js","./proj/epsg4326.js":"node_modules/ol/proj/epsg4326.js","./proj/Projection.js":"node_modules/ol/proj/Projection.js","./proj/Units.js":"node_modules/ol/proj/Units.js","./proj/projections.js":"node_modules/ol/proj/projections.js","./proj/transforms.js":"node_modules/ol/proj/transforms.js"}],"node_modules/ol/reproj.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateSourceResolution = calculateSourceResolution;
exports.render = render;

var _dom = require("./dom.js");

var _extent = require("./extent.js");

var _math = require("./math.js");

var _proj = require("./proj.js");

/**
 * @module ol/reproj
 */

/**
 * Calculates ideal resolution to use from the source in order to achieve
 * pixel mapping as close as possible to 1:1 during reprojection.
 * The resolution is calculated regardless of what resolutions
 * are actually available in the dataset (TileGrid, Image, ...).
 *
 * @param {import("./proj/Projection.js").default} sourceProj Source projection.
 * @param {import("./proj/Projection.js").default} targetProj Target projection.
 * @param {import("./coordinate.js").Coordinate} targetCenter Target center.
 * @param {number} targetResolution Target resolution.
 * @return {number} The best resolution to use. Can be +-Infinity, NaN or 0.
 */
function calculateSourceResolution(sourceProj, targetProj, targetCenter, targetResolution) {
  var sourceCenter = (0, _proj.transform)(targetCenter, targetProj, sourceProj); // calculate the ideal resolution of the source data

  var sourceResolution = (0, _proj.getPointResolution)(targetProj, targetResolution, targetCenter);
  var targetMetersPerUnit = targetProj.getMetersPerUnit();

  if (targetMetersPerUnit !== undefined) {
    sourceResolution *= targetMetersPerUnit;
  }

  var sourceMetersPerUnit = sourceProj.getMetersPerUnit();

  if (sourceMetersPerUnit !== undefined) {
    sourceResolution /= sourceMetersPerUnit;
  } // Based on the projection properties, the point resolution at the specified
  // coordinates may be slightly different. We need to reverse-compensate this
  // in order to achieve optimal results.


  var sourceExtent = sourceProj.getExtent();

  if (!sourceExtent || (0, _extent.containsCoordinate)(sourceExtent, sourceCenter)) {
    var compensationFactor = (0, _proj.getPointResolution)(sourceProj, sourceResolution, sourceCenter) / sourceResolution;

    if (isFinite(compensationFactor) && compensationFactor > 0) {
      sourceResolution /= compensationFactor;
    }
  }

  return sourceResolution;
}
/**
 * Enlarge the clipping triangle point by 1 pixel to ensure the edges overlap
 * in order to mask gaps caused by antialiasing.
 *
 * @param {number} centroidX Centroid of the triangle (x coordinate in pixels).
 * @param {number} centroidY Centroid of the triangle (y coordinate in pixels).
 * @param {number} x X coordinate of the point (in pixels).
 * @param {number} y Y coordinate of the point (in pixels).
 * @return {import("./coordinate.js").Coordinate} New point 1 px farther from the centroid.
 */


function enlargeClipPoint(centroidX, centroidY, x, y) {
  var dX = x - centroidX;
  var dY = y - centroidY;
  var distance = Math.sqrt(dX * dX + dY * dY);
  return [Math.round(x + dX / distance), Math.round(y + dY / distance)];
}
/**
 * Renders the source data into new canvas based on the triangulation.
 *
 * @param {number} width Width of the canvas.
 * @param {number} height Height of the canvas.
 * @param {number} pixelRatio Pixel ratio.
 * @param {number} sourceResolution Source resolution.
 * @param {import("./extent.js").Extent} sourceExtent Extent of the data source.
 * @param {number} targetResolution Target resolution.
 * @param {import("./extent.js").Extent} targetExtent Target extent.
 * @param {import("./reproj/Triangulation.js").default} triangulation
 * Calculated triangulation.
 * @param {Array<{extent: import("./extent.js").Extent,
 *                 image: (HTMLCanvasElement|HTMLImageElement|HTMLVideoElement)}>} sources
 * Array of sources.
 * @param {number} gutter Gutter of the sources.
 * @param {boolean=} opt_renderEdges Render reprojection edges.
 * @return {HTMLCanvasElement} Canvas with reprojected data.
 */


function render(width, height, pixelRatio, sourceResolution, sourceExtent, targetResolution, targetExtent, triangulation, sources, gutter, opt_renderEdges) {
  var context = (0, _dom.createCanvasContext2D)(Math.round(pixelRatio * width), Math.round(pixelRatio * height));

  if (sources.length === 0) {
    return context.canvas;
  }

  context.scale(pixelRatio, pixelRatio);
  var sourceDataExtent = (0, _extent.createEmpty)();
  sources.forEach(function (src, i, arr) {
    (0, _extent.extend)(sourceDataExtent, src.extent);
  });
  var canvasWidthInUnits = (0, _extent.getWidth)(sourceDataExtent);
  var canvasHeightInUnits = (0, _extent.getHeight)(sourceDataExtent);
  var stitchContext = (0, _dom.createCanvasContext2D)(Math.round(pixelRatio * canvasWidthInUnits / sourceResolution), Math.round(pixelRatio * canvasHeightInUnits / sourceResolution));
  var stitchScale = pixelRatio / sourceResolution;
  sources.forEach(function (src, i, arr) {
    var xPos = src.extent[0] - sourceDataExtent[0];
    var yPos = -(src.extent[3] - sourceDataExtent[3]);
    var srcWidth = (0, _extent.getWidth)(src.extent);
    var srcHeight = (0, _extent.getHeight)(src.extent);
    stitchContext.drawImage(src.image, gutter, gutter, src.image.width - 2 * gutter, src.image.height - 2 * gutter, xPos * stitchScale, yPos * stitchScale, srcWidth * stitchScale, srcHeight * stitchScale);
  });
  var targetTopLeft = (0, _extent.getTopLeft)(targetExtent);
  triangulation.getTriangles().forEach(function (triangle, i, arr) {
    /* Calculate affine transform (src -> dst)
     * Resulting matrix can be used to transform coordinate
     * from `sourceProjection` to destination pixels.
     *
     * To optimize number of context calls and increase numerical stability,
     * we also do the following operations:
     * trans(-topLeftExtentCorner), scale(1 / targetResolution), scale(1, -1)
     * here before solving the linear system so [ui, vi] are pixel coordinates.
     *
     * Src points: xi, yi
     * Dst points: ui, vi
     * Affine coefficients: aij
     *
     * | x0 y0 1  0  0 0 |   |a00|   |u0|
     * | x1 y1 1  0  0 0 |   |a01|   |u1|
     * | x2 y2 1  0  0 0 | x |a02| = |u2|
     * |  0  0 0 x0 y0 1 |   |a10|   |v0|
     * |  0  0 0 x1 y1 1 |   |a11|   |v1|
     * |  0  0 0 x2 y2 1 |   |a12|   |v2|
     */
    var source = triangle.source;
    var target = triangle.target;
    var x0 = source[0][0],
        y0 = source[0][1];
    var x1 = source[1][0],
        y1 = source[1][1];
    var x2 = source[2][0],
        y2 = source[2][1];
    var u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
    var v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
    var u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
    var v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
    var u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
    var v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution; // Shift all the source points to improve numerical stability
    // of all the subsequent calculations. The [x0, y0] is used here.
    // This is also used to simplify the linear system.

    var sourceNumericalShiftX = x0;
    var sourceNumericalShiftY = y0;
    x0 = 0;
    y0 = 0;
    x1 -= sourceNumericalShiftX;
    y1 -= sourceNumericalShiftY;
    x2 -= sourceNumericalShiftX;
    y2 -= sourceNumericalShiftY;
    var augmentedMatrix = [[x1, y1, 0, 0, u1 - u0], [x2, y2, 0, 0, u2 - u0], [0, 0, x1, y1, v1 - v0], [0, 0, x2, y2, v2 - v0]];
    var affineCoefs = (0, _math.solveLinearSystem)(augmentedMatrix);

    if (!affineCoefs) {
      return;
    }

    context.save();
    context.beginPath();
    var centroidX = (u0 + u1 + u2) / 3;
    var centroidY = (v0 + v1 + v2) / 3;
    var p0 = enlargeClipPoint(centroidX, centroidY, u0, v0);
    var p1 = enlargeClipPoint(centroidX, centroidY, u1, v1);
    var p2 = enlargeClipPoint(centroidX, centroidY, u2, v2);
    context.moveTo(p1[0], p1[1]);
    context.lineTo(p0[0], p0[1]);
    context.lineTo(p2[0], p2[1]);
    context.clip();
    context.transform(affineCoefs[0], affineCoefs[2], affineCoefs[1], affineCoefs[3], u0, v0);
    context.translate(sourceDataExtent[0] - sourceNumericalShiftX, sourceDataExtent[3] - sourceNumericalShiftY);
    context.scale(sourceResolution / pixelRatio, -sourceResolution / pixelRatio);
    context.drawImage(stitchContext.canvas, 0, 0);
    context.restore();
  });

  if (opt_renderEdges) {
    context.save();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    triangulation.getTriangles().forEach(function (triangle, i, arr) {
      var target = triangle.target;
      var u0 = (target[0][0] - targetTopLeft[0]) / targetResolution;
      var v0 = -(target[0][1] - targetTopLeft[1]) / targetResolution;
      var u1 = (target[1][0] - targetTopLeft[0]) / targetResolution;
      var v1 = -(target[1][1] - targetTopLeft[1]) / targetResolution;
      var u2 = (target[2][0] - targetTopLeft[0]) / targetResolution;
      var v2 = -(target[2][1] - targetTopLeft[1]) / targetResolution;
      context.beginPath();
      context.moveTo(u1, v1);
      context.lineTo(u0, v0);
      context.lineTo(u2, v2);
      context.closePath();
      context.stroke();
    });
    context.restore();
  }

  return context.canvas;
}
},{"./dom.js":"node_modules/ol/dom.js","./extent.js":"node_modules/ol/extent.js","./math.js":"node_modules/ol/math.js","./proj.js":"node_modules/ol/proj.js"}],"node_modules/ol/reproj/Triangulation.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extent = require("../extent.js");

var _math = require("../math.js");

var _proj = require("../proj.js");

/**
 * @module ol/reproj/Triangulation
 */

/**
 * Single triangle; consists of 3 source points and 3 target points.
 * @typedef {Object} Triangle
 * @property {Array<import("../coordinate.js").Coordinate>} source
 * @property {Array<import("../coordinate.js").Coordinate>} target
 */

/**
 * Maximum number of subdivision steps during raster reprojection triangulation.
 * Prevents high memory usage and large number of proj4 calls (for certain
 * transformations and areas). At most `2*(2^this)` triangles are created for
 * each triangulated extent (tile/image).
 * @type {number}
 */
var MAX_SUBDIVISION = 10;
/**
 * Maximum allowed size of triangle relative to world width. When transforming
 * corners of world extent between certain projections, the resulting
 * triangulation seems to have zero error and no subdivision is performed. If
 * the triangle width is more than this (relative to world width; 0-1),
 * subdivison is forced (up to `MAX_SUBDIVISION`). Default is `0.25`.
 * @type {number}
 */

var MAX_TRIANGLE_WIDTH = 0.25;
/**
 * @classdesc
 * Class containing triangulation of the given target extent.
 * Used for determining source data and the reprojection itself.
 */

var Triangulation = function Triangulation(sourceProj, targetProj, targetExtent, maxSourceExtent, errorThreshold) {
  /**
   * @type {import("../proj/Projection.js").default}
   * @private
   */
  this.sourceProj_ = sourceProj;
  /**
   * @type {import("../proj/Projection.js").default}
   * @private
   */

  this.targetProj_ = targetProj;
  /** @type {!Object<string, import("../coordinate.js").Coordinate>} */

  var transformInvCache = {};
  var transformInv = (0, _proj.getTransform)(this.targetProj_, this.sourceProj_);
  /**
   * @param {import("../coordinate.js").Coordinate} c A coordinate.
   * @return {import("../coordinate.js").Coordinate} Transformed coordinate.
   * @private
   */

  this.transformInv_ = function (c) {
    var key = c[0] + '/' + c[1];

    if (!transformInvCache[key]) {
      transformInvCache[key] = transformInv(c);
    }

    return transformInvCache[key];
  };
  /**
   * @type {import("../extent.js").Extent}
   * @private
   */


  this.maxSourceExtent_ = maxSourceExtent;
  /**
   * @type {number}
   * @private
   */

  this.errorThresholdSquared_ = errorThreshold * errorThreshold;
  /**
   * @type {Array<Triangle>}
   * @private
   */

  this.triangles_ = [];
  /**
   * Indicates that the triangulation crosses edge of the source projection.
   * @type {boolean}
   * @private
   */

  this.wrapsXInSource_ = false;
  /**
   * @type {boolean}
   * @private
   */

  this.canWrapXInSource_ = this.sourceProj_.canWrapX() && !!maxSourceExtent && !!this.sourceProj_.getExtent() && (0, _extent.getWidth)(maxSourceExtent) == (0, _extent.getWidth)(this.sourceProj_.getExtent());
  /**
   * @type {?number}
   * @private
   */

  this.sourceWorldWidth_ = this.sourceProj_.getExtent() ? (0, _extent.getWidth)(this.sourceProj_.getExtent()) : null;
  /**
   * @type {?number}
   * @private
   */

  this.targetWorldWidth_ = this.targetProj_.getExtent() ? (0, _extent.getWidth)(this.targetProj_.getExtent()) : null;
  var destinationTopLeft = (0, _extent.getTopLeft)(targetExtent);
  var destinationTopRight = (0, _extent.getTopRight)(targetExtent);
  var destinationBottomRight = (0, _extent.getBottomRight)(targetExtent);
  var destinationBottomLeft = (0, _extent.getBottomLeft)(targetExtent);
  var sourceTopLeft = this.transformInv_(destinationTopLeft);
  var sourceTopRight = this.transformInv_(destinationTopRight);
  var sourceBottomRight = this.transformInv_(destinationBottomRight);
  var sourceBottomLeft = this.transformInv_(destinationBottomLeft);
  this.addQuad_(destinationTopLeft, destinationTopRight, destinationBottomRight, destinationBottomLeft, sourceTopLeft, sourceTopRight, sourceBottomRight, sourceBottomLeft, MAX_SUBDIVISION);

  if (this.wrapsXInSource_) {
    var leftBound = Infinity;
    this.triangles_.forEach(function (triangle, i, arr) {
      leftBound = Math.min(leftBound, triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]);
    }); // Shift triangles to be as close to `leftBound` as possible
    // (if the distance is more than `worldWidth / 2` it can be closer.

    this.triangles_.forEach(function (triangle) {
      if (Math.max(triangle.source[0][0], triangle.source[1][0], triangle.source[2][0]) - leftBound > this.sourceWorldWidth_ / 2) {
        var newTriangle = [[triangle.source[0][0], triangle.source[0][1]], [triangle.source[1][0], triangle.source[1][1]], [triangle.source[2][0], triangle.source[2][1]]];

        if (newTriangle[0][0] - leftBound > this.sourceWorldWidth_ / 2) {
          newTriangle[0][0] -= this.sourceWorldWidth_;
        }

        if (newTriangle[1][0] - leftBound > this.sourceWorldWidth_ / 2) {
          newTriangle[1][0] -= this.sourceWorldWidth_;
        }

        if (newTriangle[2][0] - leftBound > this.sourceWorldWidth_ / 2) {
          newTriangle[2][0] -= this.sourceWorldWidth_;
        } // Rarely (if the extent contains both the dateline and prime meridian)
        // the shift can in turn break some triangles.
        // Detect this here and don't shift in such cases.


        var minX = Math.min(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);
        var maxX = Math.max(newTriangle[0][0], newTriangle[1][0], newTriangle[2][0]);

        if (maxX - minX < this.sourceWorldWidth_ / 2) {
          triangle.source = newTriangle;
        }
      }
    }.bind(this));
  }

  transformInvCache = {};
};
/**
 * Adds triangle to the triangulation.
 * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
 * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
 * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
 * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
 * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
 * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
 * @private
 */


Triangulation.prototype.addTriangle_ = function addTriangle_(a, b, c, aSrc, bSrc, cSrc) {
  this.triangles_.push({
    source: [aSrc, bSrc, cSrc],
    target: [a, b, c]
  });
};
/**
 * Adds quad (points in clock-wise order) to the triangulation
 * (and reprojects the vertices) if valid.
 * Performs quad subdivision if needed to increase precision.
 *
 * @param {import("../coordinate.js").Coordinate} a The target a coordinate.
 * @param {import("../coordinate.js").Coordinate} b The target b coordinate.
 * @param {import("../coordinate.js").Coordinate} c The target c coordinate.
 * @param {import("../coordinate.js").Coordinate} d The target d coordinate.
 * @param {import("../coordinate.js").Coordinate} aSrc The source a coordinate.
 * @param {import("../coordinate.js").Coordinate} bSrc The source b coordinate.
 * @param {import("../coordinate.js").Coordinate} cSrc The source c coordinate.
 * @param {import("../coordinate.js").Coordinate} dSrc The source d coordinate.
 * @param {number} maxSubdivision Maximal allowed subdivision of the quad.
 * @private
 */


Triangulation.prototype.addQuad_ = function addQuad_(a, b, c, d, aSrc, bSrc, cSrc, dSrc, maxSubdivision) {
  var sourceQuadExtent = (0, _extent.boundingExtent)([aSrc, bSrc, cSrc, dSrc]);
  var sourceCoverageX = this.sourceWorldWidth_ ? (0, _extent.getWidth)(sourceQuadExtent) / this.sourceWorldWidth_ : null;
  var sourceWorldWidth =
  /** @type {number} */
  this.sourceWorldWidth_; // when the quad is wrapped in the source projection
  // it covers most of the projection extent, but not fully

  var wrapsX = this.sourceProj_.canWrapX() && sourceCoverageX > 0.5 && sourceCoverageX < 1;
  var needsSubdivision = false;

  if (maxSubdivision > 0) {
    if (this.targetProj_.isGlobal() && this.targetWorldWidth_) {
      var targetQuadExtent = (0, _extent.boundingExtent)([a, b, c, d]);
      var targetCoverageX = (0, _extent.getWidth)(targetQuadExtent) / this.targetWorldWidth_;
      needsSubdivision = targetCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
    }

    if (!wrapsX && this.sourceProj_.isGlobal() && sourceCoverageX) {
      needsSubdivision = sourceCoverageX > MAX_TRIANGLE_WIDTH || needsSubdivision;
    }
  }

  if (!needsSubdivision && this.maxSourceExtent_) {
    if (!(0, _extent.intersects)(sourceQuadExtent, this.maxSourceExtent_)) {
      // whole quad outside source projection extent -> ignore
      return;
    }
  }

  if (!needsSubdivision) {
    if (!isFinite(aSrc[0]) || !isFinite(aSrc[1]) || !isFinite(bSrc[0]) || !isFinite(bSrc[1]) || !isFinite(cSrc[0]) || !isFinite(cSrc[1]) || !isFinite(dSrc[0]) || !isFinite(dSrc[1])) {
      if (maxSubdivision > 0) {
        needsSubdivision = true;
      } else {
        return;
      }
    }
  }

  if (maxSubdivision > 0) {
    if (!needsSubdivision) {
      var center = [(a[0] + c[0]) / 2, (a[1] + c[1]) / 2];
      var centerSrc = this.transformInv_(center);
      var dx;

      if (wrapsX) {
        var centerSrcEstimX = ((0, _math.modulo)(aSrc[0], sourceWorldWidth) + (0, _math.modulo)(cSrc[0], sourceWorldWidth)) / 2;
        dx = centerSrcEstimX - (0, _math.modulo)(centerSrc[0], sourceWorldWidth);
      } else {
        dx = (aSrc[0] + cSrc[0]) / 2 - centerSrc[0];
      }

      var dy = (aSrc[1] + cSrc[1]) / 2 - centerSrc[1];
      var centerSrcErrorSquared = dx * dx + dy * dy;
      needsSubdivision = centerSrcErrorSquared > this.errorThresholdSquared_;
    }

    if (needsSubdivision) {
      if (Math.abs(a[0] - c[0]) <= Math.abs(a[1] - c[1])) {
        // split horizontally (top & bottom)
        var bc = [(b[0] + c[0]) / 2, (b[1] + c[1]) / 2];
        var bcSrc = this.transformInv_(bc);
        var da = [(d[0] + a[0]) / 2, (d[1] + a[1]) / 2];
        var daSrc = this.transformInv_(da);
        this.addQuad_(a, b, bc, da, aSrc, bSrc, bcSrc, daSrc, maxSubdivision - 1);
        this.addQuad_(da, bc, c, d, daSrc, bcSrc, cSrc, dSrc, maxSubdivision - 1);
      } else {
        // split vertically (left & right)
        var ab = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
        var abSrc = this.transformInv_(ab);
        var cd = [(c[0] + d[0]) / 2, (c[1] + d[1]) / 2];
        var cdSrc = this.transformInv_(cd);
        this.addQuad_(a, ab, cd, d, aSrc, abSrc, cdSrc, dSrc, maxSubdivision - 1);
        this.addQuad_(ab, b, c, cd, abSrc, bSrc, cSrc, cdSrc, maxSubdivision - 1);
      }

      return;
    }
  }

  if (wrapsX) {
    if (!this.canWrapXInSource_) {
      return;
    }

    this.wrapsXInSource_ = true;
  }

  this.addTriangle_(a, c, d, aSrc, cSrc, dSrc);
  this.addTriangle_(a, b, c, aSrc, bSrc, cSrc);
};
/**
 * Calculates extent of the 'source' coordinates from all the triangles.
 *
 * @return {import("../extent.js").Extent} Calculated extent.
 */


Triangulation.prototype.calculateSourceExtent = function calculateSourceExtent() {
  var extent = (0, _extent.createEmpty)();
  this.triangles_.forEach(function (triangle, i, arr) {
    var src = triangle.source;
    (0, _extent.extendCoordinate)(extent, src[0]);
    (0, _extent.extendCoordinate)(extent, src[1]);
    (0, _extent.extendCoordinate)(extent, src[2]);
  });
  return extent;
};
/**
 * @return {Array<Triangle>} Array of the calculated triangles.
 */


Triangulation.prototype.getTriangles = function getTriangles() {
  return this.triangles_;
};

var _default = Triangulation;
exports.default = _default;
},{"../extent.js":"node_modules/ol/extent.js","../math.js":"node_modules/ol/math.js","../proj.js":"node_modules/ol/proj.js"}],"node_modules/ol/reproj/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("./common.js");

var _Tile = _interopRequireDefault(require("../Tile.js"));

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _events = require("../events.js");

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _extent = require("../extent.js");

var _math = require("../math.js");

var _reproj = require("../reproj.js");

var _Triangulation = _interopRequireDefault(require("./Triangulation.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/reproj/Tile
 */

/**
 * @typedef {function(number, number, number, number) : import("../Tile.js").default} FunctionType
 */

/**
 * @classdesc
 * Class encapsulating single reprojected tile.
 * See {@link module:ol/source/TileImage~TileImage}.
 *
 */
var ReprojTile =
/*@__PURE__*/
function (Tile) {
  function ReprojTile(sourceProj, sourceTileGrid, targetProj, targetTileGrid, tileCoord, wrappedTileCoord, pixelRatio, gutter, getTileFunction, opt_errorThreshold, opt_renderEdges) {
    Tile.call(this, tileCoord, _TileState.default.IDLE);
    /**
     * @private
     * @type {boolean}
     */

    this.renderEdges_ = opt_renderEdges !== undefined ? opt_renderEdges : false;
    /**
     * @private
     * @type {number}
     */

    this.pixelRatio_ = pixelRatio;
    /**
     * @private
     * @type {number}
     */

    this.gutter_ = gutter;
    /**
     * @private
     * @type {HTMLCanvasElement}
     */

    this.canvas_ = null;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    this.sourceTileGrid_ = sourceTileGrid;
    /**
     * @private
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    this.targetTileGrid_ = targetTileGrid;
    /**
     * @private
     * @type {import("../tilecoord.js").TileCoord}
     */

    this.wrappedTileCoord_ = wrappedTileCoord ? wrappedTileCoord : tileCoord;
    /**
     * @private
     * @type {!Array<import("../Tile.js").default>}
     */

    this.sourceTiles_ = [];
    /**
     * @private
     * @type {Array<import("../events.js").EventsKey>}
     */

    this.sourcesListenerKeys_ = null;
    /**
     * @private
     * @type {number}
     */

    this.sourceZ_ = 0;
    var targetExtent = targetTileGrid.getTileCoordExtent(this.wrappedTileCoord_);
    var maxTargetExtent = this.targetTileGrid_.getExtent();
    var maxSourceExtent = this.sourceTileGrid_.getExtent();
    var limitedTargetExtent = maxTargetExtent ? (0, _extent.getIntersection)(targetExtent, maxTargetExtent) : targetExtent;

    if ((0, _extent.getArea)(limitedTargetExtent) === 0) {
      // Tile is completely outside range -> EMPTY
      // TODO: is it actually correct that the source even creates the tile ?
      this.state = _TileState.default.EMPTY;
      return;
    }

    var sourceProjExtent = sourceProj.getExtent();

    if (sourceProjExtent) {
      if (!maxSourceExtent) {
        maxSourceExtent = sourceProjExtent;
      } else {
        maxSourceExtent = (0, _extent.getIntersection)(maxSourceExtent, sourceProjExtent);
      }
    }

    var targetResolution = targetTileGrid.getResolution(this.wrappedTileCoord_[0]);
    var targetCenter = (0, _extent.getCenter)(limitedTargetExtent);
    var sourceResolution = (0, _reproj.calculateSourceResolution)(sourceProj, targetProj, targetCenter, targetResolution);

    if (!isFinite(sourceResolution) || sourceResolution <= 0) {
      // invalid sourceResolution -> EMPTY
      // probably edges of the projections when no extent is defined
      this.state = _TileState.default.EMPTY;
      return;
    }

    var errorThresholdInPixels = opt_errorThreshold !== undefined ? opt_errorThreshold : _common.ERROR_THRESHOLD;
    /**
     * @private
     * @type {!import("./Triangulation.js").default}
     */

    this.triangulation_ = new _Triangulation.default(sourceProj, targetProj, limitedTargetExtent, maxSourceExtent, sourceResolution * errorThresholdInPixels);

    if (this.triangulation_.getTriangles().length === 0) {
      // no valid triangles -> EMPTY
      this.state = _TileState.default.EMPTY;
      return;
    }

    this.sourceZ_ = sourceTileGrid.getZForResolution(sourceResolution);
    var sourceExtent = this.triangulation_.calculateSourceExtent();

    if (maxSourceExtent) {
      if (sourceProj.canWrapX()) {
        sourceExtent[1] = (0, _math.clamp)(sourceExtent[1], maxSourceExtent[1], maxSourceExtent[3]);
        sourceExtent[3] = (0, _math.clamp)(sourceExtent[3], maxSourceExtent[1], maxSourceExtent[3]);
      } else {
        sourceExtent = (0, _extent.getIntersection)(sourceExtent, maxSourceExtent);
      }
    }

    if (!(0, _extent.getArea)(sourceExtent)) {
      this.state = _TileState.default.EMPTY;
    } else {
      var sourceRange = sourceTileGrid.getTileRangeForExtentAndZ(sourceExtent, this.sourceZ_);

      for (var srcX = sourceRange.minX; srcX <= sourceRange.maxX; srcX++) {
        for (var srcY = sourceRange.minY; srcY <= sourceRange.maxY; srcY++) {
          var tile = getTileFunction(this.sourceZ_, srcX, srcY, pixelRatio);

          if (tile) {
            this.sourceTiles_.push(tile);
          }
        }
      }

      if (this.sourceTiles_.length === 0) {
        this.state = _TileState.default.EMPTY;
      }
    }
  }

  if (Tile) ReprojTile.__proto__ = Tile;
  ReprojTile.prototype = Object.create(Tile && Tile.prototype);
  ReprojTile.prototype.constructor = ReprojTile;
  /**
   * @inheritDoc
   */

  ReprojTile.prototype.disposeInternal = function disposeInternal() {
    if (this.state == _TileState.default.LOADING) {
      this.unlistenSources_();
    }

    Tile.prototype.disposeInternal.call(this);
  };
  /**
   * Get the HTML Canvas element for this tile.
   * @return {HTMLCanvasElement} Canvas.
   */


  ReprojTile.prototype.getImage = function getImage() {
    return this.canvas_;
  };
  /**
   * @private
   */


  ReprojTile.prototype.reproject_ = function reproject_() {
    var sources = [];
    this.sourceTiles_.forEach(function (tile, i, arr) {
      if (tile && tile.getState() == _TileState.default.LOADED) {
        sources.push({
          extent: this.sourceTileGrid_.getTileCoordExtent(tile.tileCoord),
          image: tile.getImage()
        });
      }
    }.bind(this));
    this.sourceTiles_.length = 0;

    if (sources.length === 0) {
      this.state = _TileState.default.ERROR;
    } else {
      var z = this.wrappedTileCoord_[0];
      var size = this.targetTileGrid_.getTileSize(z);
      var width = typeof size === 'number' ? size : size[0];
      var height = typeof size === 'number' ? size : size[1];
      var targetResolution = this.targetTileGrid_.getResolution(z);
      var sourceResolution = this.sourceTileGrid_.getResolution(this.sourceZ_);
      var targetExtent = this.targetTileGrid_.getTileCoordExtent(this.wrappedTileCoord_);
      this.canvas_ = (0, _reproj.render)(width, height, this.pixelRatio_, sourceResolution, this.sourceTileGrid_.getExtent(), targetResolution, targetExtent, this.triangulation_, sources, this.gutter_, this.renderEdges_);
      this.state = _TileState.default.LOADED;
    }

    this.changed();
  };
  /**
   * @inheritDoc
   */


  ReprojTile.prototype.load = function load() {
    if (this.state == _TileState.default.IDLE) {
      this.state = _TileState.default.LOADING;
      this.changed();
      var leftToLoad = 0;
      this.sourcesListenerKeys_ = [];
      this.sourceTiles_.forEach(function (tile, i, arr) {
        var state = tile.getState();

        if (state == _TileState.default.IDLE || state == _TileState.default.LOADING) {
          leftToLoad++;
          var sourceListenKey = (0, _events.listen)(tile, _EventType.default.CHANGE, function (e) {
            var state = tile.getState();

            if (state == _TileState.default.LOADED || state == _TileState.default.ERROR || state == _TileState.default.EMPTY) {
              (0, _events.unlistenByKey)(sourceListenKey);
              leftToLoad--;

              if (leftToLoad === 0) {
                this.unlistenSources_();
                this.reproject_();
              }
            }
          }, this);
          this.sourcesListenerKeys_.push(sourceListenKey);
        }
      }.bind(this));
      this.sourceTiles_.forEach(function (tile, i, arr) {
        var state = tile.getState();

        if (state == _TileState.default.IDLE) {
          tile.load();
        }
      });

      if (leftToLoad === 0) {
        setTimeout(this.reproject_.bind(this), 0);
      }
    }
  };
  /**
   * @private
   */


  ReprojTile.prototype.unlistenSources_ = function unlistenSources_() {
    this.sourcesListenerKeys_.forEach(_events.unlistenByKey);
    this.sourcesListenerKeys_ = null;
  };

  return ReprojTile;
}(_Tile.default);

var _default = ReprojTile;
exports.default = _default;
},{"./common.js":"node_modules/ol/reproj/common.js","../Tile.js":"node_modules/ol/Tile.js","../TileState.js":"node_modules/ol/TileState.js","../events.js":"node_modules/ol/events.js","../events/EventType.js":"node_modules/ol/events/EventType.js","../extent.js":"node_modules/ol/extent.js","../math.js":"node_modules/ol/math.js","../reproj.js":"node_modules/ol/reproj.js","./Triangulation.js":"node_modules/ol/reproj/Triangulation.js"}],"node_modules/ol/tileurlfunction.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFromTemplate = createFromTemplate;
exports.createFromTemplates = createFromTemplates;
exports.createFromTileUrlFunctions = createFromTileUrlFunctions;
exports.nullTileUrlFunction = nullTileUrlFunction;
exports.expandUrl = expandUrl;

var _asserts = require("./asserts.js");

var _math = require("./math.js");

var _tilecoord = require("./tilecoord.js");

/**
 * @module ol/tileurlfunction
 */

/**
 * @param {string} template Template.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */
function createFromTemplate(template, tileGrid) {
  var zRegEx = /\{z\}/g;
  var xRegEx = /\{x\}/g;
  var yRegEx = /\{y\}/g;
  var dashYRegEx = /\{-y\}/g;
  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function (tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return undefined;
      } else {
        return template.replace(zRegEx, tileCoord[0].toString()).replace(xRegEx, tileCoord[1].toString()).replace(yRegEx, function () {
          var y = -tileCoord[2] - 1;
          return y.toString();
        }).replace(dashYRegEx, function () {
          var z = tileCoord[0];
          var range = tileGrid.getFullTileRange(z);
          (0, _asserts.assert)(range, 55); // The {-y} placeholder requires a tile grid with extent

          var y = range.getHeight() + tileCoord[2];
          return y.toString();
        });
      }
    }
  );
}
/**
 * @param {Array<string>} templates Templates.
 * @param {import("./tilegrid/TileGrid.js").default} tileGrid Tile grid.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */


function createFromTemplates(templates, tileGrid) {
  var len = templates.length;
  var tileUrlFunctions = new Array(len);

  for (var i = 0; i < len; ++i) {
    tileUrlFunctions[i] = createFromTemplate(templates[i], tileGrid);
  }

  return createFromTileUrlFunctions(tileUrlFunctions);
}
/**
 * @param {Array<import("./Tile.js").UrlFunction>} tileUrlFunctions Tile URL Functions.
 * @return {import("./Tile.js").UrlFunction} Tile URL function.
 */


function createFromTileUrlFunctions(tileUrlFunctions) {
  if (tileUrlFunctions.length === 1) {
    return tileUrlFunctions[0];
  }

  return (
    /**
     * @param {import("./tilecoord.js").TileCoord} tileCoord Tile Coordinate.
     * @param {number} pixelRatio Pixel ratio.
     * @param {import("./proj/Projection.js").default} projection Projection.
     * @return {string|undefined} Tile URL.
     */
    function (tileCoord, pixelRatio, projection) {
      if (!tileCoord) {
        return undefined;
      } else {
        var h = (0, _tilecoord.hash)(tileCoord);
        var index = (0, _math.modulo)(h, tileUrlFunctions.length);
        return tileUrlFunctions[index](tileCoord, pixelRatio, projection);
      }
    }
  );
}
/**
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {number} pixelRatio Pixel ratio.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {string|undefined} Tile URL.
 */


function nullTileUrlFunction(tileCoord, pixelRatio, projection) {
  return undefined;
}
/**
 * @param {string} url URL.
 * @return {Array<string>} Array of urls.
 */


function expandUrl(url) {
  var urls = [];
  var match = /\{([a-z])-([a-z])\}/.exec(url);

  if (match) {
    // char range
    var startCharCode = match[1].charCodeAt(0);
    var stopCharCode = match[2].charCodeAt(0);
    var charCode;

    for (charCode = startCharCode; charCode <= stopCharCode; ++charCode) {
      urls.push(url.replace(match[0], String.fromCharCode(charCode)));
    }

    return urls;
  }

  match = match = /\{(\d+)-(\d+)\}/.exec(url);

  if (match) {
    // number range
    var stop = parseInt(match[2], 10);

    for (var i = parseInt(match[1], 10); i <= stop; i++) {
      urls.push(url.replace(match[0], i.toString()));
    }

    return urls;
  }

  urls.push(url);
  return urls;
}
},{"./asserts.js":"node_modules/ol/asserts.js","./math.js":"node_modules/ol/math.js","./tilecoord.js":"node_modules/ol/tilecoord.js"}],"node_modules/ol/size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buffer = buffer;
exports.hasArea = hasArea;
exports.scale = scale;
exports.toSize = toSize;

/**
 * @module ol/size
 */

/**
 * An array of numbers representing a size: `[width, height]`.
 * @typedef {Array<number>} Size
 * @api
 */

/**
 * Returns a buffered size.
 * @param {Size} size Size.
 * @param {number} num The amount by which to buffer.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} The buffered size.
 */
function buffer(size, num, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] + 2 * num;
  opt_size[1] = size[1] + 2 * num;
  return opt_size;
}
/**
 * Determines if a size has a positive area.
 * @param {Size} size The size to test.
 * @return {boolean} The size has a positive area.
 */


function hasArea(size) {
  return size[0] > 0 && size[1] > 0;
}
/**
 * Returns a size scaled by a ratio. The result will be an array of integers.
 * @param {Size} size Size.
 * @param {number} ratio Ratio.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} The scaled size.
 */


function scale(size, ratio, opt_size) {
  if (opt_size === undefined) {
    opt_size = [0, 0];
  }

  opt_size[0] = size[0] * ratio + 0.5 | 0;
  opt_size[1] = size[1] * ratio + 0.5 | 0;
  return opt_size;
}
/**
 * Returns an `Size` array for the passed in number (meaning: square) or
 * `Size` array.
 * (meaning: non-square),
 * @param {number|Size} size Width and height.
 * @param {Size=} opt_size Optional reusable size array.
 * @return {Size} Size.
 * @api
 */


function toSize(size, opt_size) {
  if (Array.isArray(size)) {
    return size;
  } else {
    if (opt_size === undefined) {
      opt_size = [size, size];
    } else {
      opt_size[0] = opt_size[1] =
      /** @type {number} */
      size;
    }

    return opt_size;
  }
}
},{}],"node_modules/ol/ObjectEventType.js":[function(require,module,exports) {
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
},{"./util.js":"node_modules/ol/util.js","./ObjectEventType.js":"node_modules/ol/ObjectEventType.js","./Observable.js":"node_modules/ol/Observable.js","./events/Event.js":"node_modules/ol/events/Event.js","./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/source/State.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/source/State
 */

/**
 * @enum {string}
 * State of the source, one of 'undefined', 'loading', 'ready' or 'error'.
 */
var _default = {
  UNDEFINED: 'undefined',
  LOADING: 'loading',
  READY: 'ready',
  ERROR: 'error'
};
exports.default = _default;
},{}],"node_modules/ol/source/Source.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util.js");

var _Object = _interopRequireDefault(require("../Object.js"));

var _proj = require("../proj.js");

var _State = _interopRequireDefault(require("./State.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/source/Source
 */

/**
 * A function that returns a string or an array of strings representing source
 * attributions.
 *
 * @typedef {function(import("../PluggableMap.js").FrameState): (string|Array<string>)} Attribution
 */

/**
 * A type that can be used to provide attribution information for data sources.
 *
 * It represents either
 * * a simple string (e.g. `'© Acme Inc.'`)
 * * an array of simple strings (e.g. `['© Acme Inc.', '© Bacme Inc.']`)
 * * a function that returns a string or array of strings (`{@link module:ol/source/Source~Attribution}`)
 *
 * @typedef {string|Array<string>|Attribution} AttributionLike
 */

/**
 * @typedef {Object} Options
 * @property {AttributionLike} [attributions]
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {import("../proj.js").ProjectionLike} projection
 * @property {SourceState} [state='ready']
 * @property {boolean} [wrapX=false]
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for {@link module:ol/layer/Layer~Layer} sources.
 *
 * A generic `change` event is triggered when the state of the source changes.
 * @abstract
 * @api
 */
var Source =
/*@__PURE__*/
function (BaseObject) {
  function Source(options) {
    BaseObject.call(this);
    /**
     * @private
     * @type {import("../proj/Projection.js").default}
     */

    this.projection_ = (0, _proj.get)(options.projection);
    /**
     * @private
     * @type {?Attribution}
     */

    this.attributions_ = adaptAttributions(options.attributions);
    /**
     * @private
     * @type {boolean}
     */

    this.attributionsCollapsible_ = options.attributionsCollapsible !== undefined ? options.attributionsCollapsible : true;
    /**
     * This source is currently loading data. Sources that defer loading to the
     * map's tile queue never set this to `true`.
     * @type {boolean}
     */

    this.loading = false;
    /**
     * @private
     * @type {SourceState}
     */

    this.state_ = options.state !== undefined ? options.state : _State.default.READY;
    /**
     * @private
     * @type {boolean}
     */

    this.wrapX_ = options.wrapX !== undefined ? options.wrapX : false;
  }

  if (BaseObject) Source.__proto__ = BaseObject;
  Source.prototype = Object.create(BaseObject && BaseObject.prototype);
  Source.prototype.constructor = Source;
  /**
   * Get the attribution function for the source.
   * @return {?Attribution} Attribution function.
   */

  Source.prototype.getAttributions = function getAttributions() {
    return this.attributions_;
  };
  /**
   * @return {boolean} Aattributions are collapsible.
   */


  Source.prototype.getAttributionsCollapsible = function getAttributionsCollapsible() {
    return this.attributionsCollapsible_;
  };
  /**
   * Get the projection of the source.
   * @return {import("../proj/Projection.js").default} Projection.
   * @api
   */


  Source.prototype.getProjection = function getProjection() {
    return this.projection_;
  };
  /**
   * @abstract
   * @return {Array<number>|undefined} Resolutions.
   */


  Source.prototype.getResolutions = function getResolutions() {
    return (0, _util.abstract)();
  };
  /**
   * Get the state of the source, see {@link module:ol/source/State~State} for possible states.
   * @return {SourceState} State.
   * @api
   */


  Source.prototype.getState = function getState() {
    return this.state_;
  };
  /**
   * @return {boolean|undefined} Wrap X.
   */


  Source.prototype.getWrapX = function getWrapX() {
    return this.wrapX_;
  };
  /**
   * Refreshes the source and finally dispatches a 'change' event.
   * @api
   */


  Source.prototype.refresh = function refresh() {
    this.changed();
  };
  /**
   * Set the attributions of the source.
   * @param {AttributionLike|undefined} attributions Attributions.
   *     Can be passed as `string`, `Array<string>`, `{@link module:ol/source/Source~Attribution}`,
   *     or `undefined`.
   * @api
   */


  Source.prototype.setAttributions = function setAttributions(attributions) {
    this.attributions_ = adaptAttributions(attributions);
    this.changed();
  };
  /**
   * Set the state of the source.
   * @param {SourceState} state State.
   * @protected
   */


  Source.prototype.setState = function setState(state) {
    this.state_ = state;
    this.changed();
  };

  return Source;
}(_Object.default);
/**
 * Turns the attributions option into an attributions function.
 * @param {AttributionLike|undefined} attributionLike The attribution option.
 * @return {?Attribution} An attribution function (or null).
 */


function adaptAttributions(attributionLike) {
  if (!attributionLike) {
    return null;
  }

  if (Array.isArray(attributionLike)) {
    return function (frameState) {
      return attributionLike;
    };
  }

  if (typeof attributionLike === 'function') {
    return attributionLike;
  }

  return function (frameState) {
    return [attributionLike];
  };
}

var _default = Source;
exports.default = _default;
},{"../util.js":"node_modules/ol/util.js","../Object.js":"node_modules/ol/Object.js","../proj.js":"node_modules/ol/proj.js","./State.js":"node_modules/ol/source/State.js"}],"node_modules/ol/tilegrid/common.js":[function(require,module,exports) {
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
},{}],"node_modules/ol/TileRange.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createOrUpdate = createOrUpdate;
exports.default = void 0;

/**
 * @module ol/TileRange
 */

/**
 * A representation of a contiguous block of tiles.  A tile range is specified
 * by its min/max tile coordinates and is inclusive of coordinates.
 */
var TileRange = function TileRange(minX, maxX, minY, maxY) {
  /**
   * @type {number}
   */
  this.minX = minX;
  /**
   * @type {number}
   */

  this.maxX = maxX;
  /**
   * @type {number}
   */

  this.minY = minY;
  /**
   * @type {number}
   */

  this.maxY = maxY;
};
/**
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @return {boolean} Contains tile coordinate.
 */


TileRange.prototype.contains = function contains(tileCoord) {
  return this.containsXY(tileCoord[1], tileCoord[2]);
};
/**
 * @param {TileRange} tileRange Tile range.
 * @return {boolean} Contains.
 */


TileRange.prototype.containsTileRange = function containsTileRange(tileRange) {
  return this.minX <= tileRange.minX && tileRange.maxX <= this.maxX && this.minY <= tileRange.minY && tileRange.maxY <= this.maxY;
};
/**
 * @param {number} x Tile coordinate x.
 * @param {number} y Tile coordinate y.
 * @return {boolean} Contains coordinate.
 */


TileRange.prototype.containsXY = function containsXY(x, y) {
  return this.minX <= x && x <= this.maxX && this.minY <= y && y <= this.maxY;
};
/**
 * @param {TileRange} tileRange Tile range.
 * @return {boolean} Equals.
 */


TileRange.prototype.equals = function equals(tileRange) {
  return this.minX == tileRange.minX && this.minY == tileRange.minY && this.maxX == tileRange.maxX && this.maxY == tileRange.maxY;
};
/**
 * @param {TileRange} tileRange Tile range.
 */


TileRange.prototype.extend = function extend(tileRange) {
  if (tileRange.minX < this.minX) {
    this.minX = tileRange.minX;
  }

  if (tileRange.maxX > this.maxX) {
    this.maxX = tileRange.maxX;
  }

  if (tileRange.minY < this.minY) {
    this.minY = tileRange.minY;
  }

  if (tileRange.maxY > this.maxY) {
    this.maxY = tileRange.maxY;
  }
};
/**
 * @return {number} Height.
 */


TileRange.prototype.getHeight = function getHeight() {
  return this.maxY - this.minY + 1;
};
/**
 * @return {import("./size.js").Size} Size.
 */


TileRange.prototype.getSize = function getSize() {
  return [this.getWidth(), this.getHeight()];
};
/**
 * @return {number} Width.
 */


TileRange.prototype.getWidth = function getWidth() {
  return this.maxX - this.minX + 1;
};
/**
 * @param {TileRange} tileRange Tile range.
 * @return {boolean} Intersects.
 */


TileRange.prototype.intersects = function intersects(tileRange) {
  return this.minX <= tileRange.maxX && this.maxX >= tileRange.minX && this.minY <= tileRange.maxY && this.maxY >= tileRange.minY;
};
/**
 * @param {number} minX Minimum X.
 * @param {number} maxX Maximum X.
 * @param {number} minY Minimum Y.
 * @param {number} maxY Maximum Y.
 * @param {TileRange=} tileRange TileRange.
 * @return {TileRange} Tile range.
 */


function createOrUpdate(minX, maxX, minY, maxY, tileRange) {
  if (tileRange !== undefined) {
    tileRange.minX = minX;
    tileRange.maxX = maxX;
    tileRange.minY = minY;
    tileRange.maxY = maxY;
    return tileRange;
  } else {
    return new TileRange(minX, maxX, minY, maxY);
  }
}

var _default = TileRange;
exports.default = _default;
},{}],"node_modules/ol/array.js":[function(require,module,exports) {
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
},{}],"node_modules/ol/tilegrid/TileGrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("./common.js");

var _asserts = require("../asserts.js");

var _TileRange = _interopRequireWildcard(require("../TileRange.js"));

var _array = require("../array.js");

var _extent = require("../extent.js");

var _math = require("../math.js");

var _size = require("../size.js");

var _tilecoord = require("../tilecoord.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * @module ol/tilegrid/TileGrid
 */

/**
 * @private
 * @type {import("../tilecoord.js").TileCoord}
 */
var tmpTileCoord = [0, 0, 0];
/**
 * @typedef {Object} Options
 * @property {import("../extent.js").Extent} [extent] Extent for the tile grid. No tiles outside this
 * extent will be requested by {@link module:ol/source/Tile} sources. When no `origin` or
 * `origins` are configured, the `origin` will be set to the top-left corner of the extent.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {import("../coordinate.js").Coordinate} [origin] The tile grid origin, i.e. where the `x`
 * and `y` axes meet (`[z, 0, 0]`). Tile coordinates increase left to right and upwards. If not
 * specified, `extent` or `origins` must be provided.
 * @property {Array<import("../coordinate.js").Coordinate>} [origins] Tile grid origins, i.e. where
 * the `x` and `y` axes meet (`[z, 0, 0]`), for each zoom level. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * origin. Tile coordinates increase left to right and upwards. If not specified, `extent` or
 * `origin` must be provided.
 * @property {!Array<number>} resolutions Resolutions. The array index of each resolution needs
 * to match the zoom level. This means that even if a `minZoom` is configured, the resolutions
 * array will have a length of `maxZoom + 1`.
 * @property {Array<import("../size.js").Size>} [sizes] Sizes.
 * @property {number|import("../size.js").Size} [tileSize] Tile size.
 * Default is `[256, 256]`.
 * @property {Array<import("../size.js").Size>} [tileSizes] Tile sizes. If given, the array length
 * should match the length of the `resolutions` array, i.e. each resolution can have a different
 * tile size.
 */

/**
 * @classdesc
 * Base class for setting the grid pattern for sources accessing tiled-image
 * servers.
 * @api
 */

var TileGrid = function TileGrid(options) {
  /**
   * @protected
   * @type {number}
   */
  this.minZoom = options.minZoom !== undefined ? options.minZoom : 0;
  /**
   * @private
   * @type {!Array<number>}
   */

  this.resolutions_ = options.resolutions;
  (0, _asserts.assert)((0, _array.isSorted)(this.resolutions_, function (a, b) {
    return b - a;
  }, true), 17); // `resolutions` must be sorted in descending order
  // check if we've got a consistent zoom factor and origin

  var zoomFactor;

  if (!options.origins) {
    for (var i = 0, ii = this.resolutions_.length - 1; i < ii; ++i) {
      if (!zoomFactor) {
        zoomFactor = this.resolutions_[i] / this.resolutions_[i + 1];
      } else {
        if (this.resolutions_[i] / this.resolutions_[i + 1] !== zoomFactor) {
          zoomFactor = undefined;
          break;
        }
      }
    }
  }
  /**
   * @private
   * @type {number|undefined}
   */


  this.zoomFactor_ = zoomFactor;
  /**
   * @protected
   * @type {number}
   */

  this.maxZoom = this.resolutions_.length - 1;
  /**
   * @private
   * @type {import("../coordinate.js").Coordinate}
   */

  this.origin_ = options.origin !== undefined ? options.origin : null;
  /**
   * @private
   * @type {Array<import("../coordinate.js").Coordinate>}
   */

  this.origins_ = null;

  if (options.origins !== undefined) {
    this.origins_ = options.origins;
    (0, _asserts.assert)(this.origins_.length == this.resolutions_.length, 20); // Number of `origins` and `resolutions` must be equal
  }

  var extent = options.extent;

  if (extent !== undefined && !this.origin_ && !this.origins_) {
    this.origin_ = (0, _extent.getTopLeft)(extent);
  }

  (0, _asserts.assert)(!this.origin_ && this.origins_ || this.origin_ && !this.origins_, 18); // Either `origin` or `origins` must be configured, never both

  /**
   * @private
   * @type {Array<number|import("../size.js").Size>}
   */

  this.tileSizes_ = null;

  if (options.tileSizes !== undefined) {
    this.tileSizes_ = options.tileSizes;
    (0, _asserts.assert)(this.tileSizes_.length == this.resolutions_.length, 19); // Number of `tileSizes` and `resolutions` must be equal
  }
  /**
   * @private
   * @type {number|import("../size.js").Size}
   */


  this.tileSize_ = options.tileSize !== undefined ? options.tileSize : !this.tileSizes_ ? _common.DEFAULT_TILE_SIZE : null;
  (0, _asserts.assert)(!this.tileSize_ && this.tileSizes_ || this.tileSize_ && !this.tileSizes_, 22); // Either `tileSize` or `tileSizes` must be configured, never both

  /**
   * @private
   * @type {import("../extent.js").Extent}
   */

  this.extent_ = extent !== undefined ? extent : null;
  /**
   * @private
   * @type {Array<import("../TileRange.js").default>}
   */

  this.fullTileRanges_ = null;
  /**
   * @private
   * @type {import("../size.js").Size}
   */

  this.tmpSize_ = [0, 0];

  if (options.sizes !== undefined) {
    this.fullTileRanges_ = options.sizes.map(function (size, z) {
      var tileRange = new _TileRange.default(Math.min(0, size[0]), Math.max(size[0] - 1, -1), Math.min(0, size[1]), Math.max(size[1] - 1, -1));
      return tileRange;
    }, this);
  } else if (extent) {
    this.calculateTileRanges_(extent);
  }
};
/**
 * Call a function with each tile coordinate for a given extent and zoom level.
 *
 * @param {import("../extent.js").Extent} extent Extent.
 * @param {number} zoom Integer zoom level.
 * @param {function(import("../tilecoord.js").TileCoord)} callback Function called with each tile coordinate.
 * @api
 */


TileGrid.prototype.forEachTileCoord = function forEachTileCoord(extent, zoom, callback) {
  var tileRange = this.getTileRangeForExtentAndZ(extent, zoom);

  for (var i = tileRange.minX, ii = tileRange.maxX; i <= ii; ++i) {
    for (var j = tileRange.minY, jj = tileRange.maxY; j <= jj; ++j) {
      callback([zoom, i, j]);
    }
  }
};
/**
 * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {function(this: T, number, import("../TileRange.js").default): boolean} callback Callback.
 * @param {T=} opt_this The object to use as `this` in `callback`.
 * @param {import("../TileRange.js").default=} opt_tileRange Temporary import("../TileRange.js").default object.
 * @param {import("../extent.js").Extent=} opt_extent Temporary import("../extent.js").Extent object.
 * @return {boolean} Callback succeeded.
 * @template T
 */


TileGrid.prototype.forEachTileCoordParentTileRange = function forEachTileCoordParentTileRange(tileCoord, callback, opt_this, opt_tileRange, opt_extent) {
  var tileRange, x, y;
  var tileCoordExtent = null;
  var z = tileCoord[0] - 1;

  if (this.zoomFactor_ === 2) {
    x = tileCoord[1];
    y = tileCoord[2];
  } else {
    tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
  }

  while (z >= this.minZoom) {
    if (this.zoomFactor_ === 2) {
      x = Math.floor(x / 2);
      y = Math.floor(y / 2);
      tileRange = (0, _TileRange.createOrUpdate)(x, x, y, y, opt_tileRange);
    } else {
      tileRange = this.getTileRangeForExtentAndZ(tileCoordExtent, z, opt_tileRange);
    }

    if (callback.call(opt_this, z, tileRange)) {
      return true;
    }

    --z;
  }

  return false;
};
/**
 * Get the extent for this tile grid, if it was configured.
 * @return {import("../extent.js").Extent} Extent.
 */


TileGrid.prototype.getExtent = function getExtent() {
  return this.extent_;
};
/**
 * Get the maximum zoom level for the grid.
 * @return {number} Max zoom.
 * @api
 */


TileGrid.prototype.getMaxZoom = function getMaxZoom() {
  return this.maxZoom;
};
/**
 * Get the minimum zoom level for the grid.
 * @return {number} Min zoom.
 * @api
 */


TileGrid.prototype.getMinZoom = function getMinZoom() {
  return this.minZoom;
};
/**
 * Get the origin for the grid at the given zoom level.
 * @param {number} z Integer zoom level.
 * @return {import("../coordinate.js").Coordinate} Origin.
 * @api
 */


TileGrid.prototype.getOrigin = function getOrigin(z) {
  if (this.origin_) {
    return this.origin_;
  } else {
    return this.origins_[z];
  }
};
/**
 * Get the resolution for the given zoom level.
 * @param {number} z Integer zoom level.
 * @return {number} Resolution.
 * @api
 */


TileGrid.prototype.getResolution = function getResolution(z) {
  return this.resolutions_[z];
};
/**
 * Get the list of resolutions for the tile grid.
 * @return {Array<number>} Resolutions.
 * @api
 */


TileGrid.prototype.getResolutions = function getResolutions() {
  return this.resolutions_;
};
/**
 * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("../TileRange.js").default=} opt_tileRange Temporary import("../TileRange.js").default object.
 * @param {import("../extent.js").Extent=} opt_extent Temporary import("../extent.js").Extent object.
 * @return {import("../TileRange.js").default} Tile range.
 */


TileGrid.prototype.getTileCoordChildTileRange = function getTileCoordChildTileRange(tileCoord, opt_tileRange, opt_extent) {
  if (tileCoord[0] < this.maxZoom) {
    if (this.zoomFactor_ === 2) {
      var minX = tileCoord[1] * 2;
      var minY = tileCoord[2] * 2;
      return (0, _TileRange.createOrUpdate)(minX, minX + 1, minY, minY + 1, opt_tileRange);
    }

    var tileCoordExtent = this.getTileCoordExtent(tileCoord, opt_extent);
    return this.getTileRangeForExtentAndZ(tileCoordExtent, tileCoord[0] + 1, opt_tileRange);
  }

  return null;
};
/**
 * Get the extent for a tile range.
 * @param {number} z Integer zoom level.
 * @param {import("../TileRange.js").default} tileRange Tile range.
 * @param {import("../extent.js").Extent=} opt_extent Temporary import("../extent.js").Extent object.
 * @return {import("../extent.js").Extent} Extent.
 */


TileGrid.prototype.getTileRangeExtent = function getTileRangeExtent(z, tileRange, opt_extent) {
  var origin = this.getOrigin(z);
  var resolution = this.getResolution(z);
  var tileSize = (0, _size.toSize)(this.getTileSize(z), this.tmpSize_);
  var minX = origin[0] + tileRange.minX * tileSize[0] * resolution;
  var maxX = origin[0] + (tileRange.maxX + 1) * tileSize[0] * resolution;
  var minY = origin[1] + tileRange.minY * tileSize[1] * resolution;
  var maxY = origin[1] + (tileRange.maxY + 1) * tileSize[1] * resolution;
  return (0, _extent.createOrUpdate)(minX, minY, maxX, maxY, opt_extent);
};
/**
 * Get a tile range for the given extent and integer zoom level.
 * @param {import("../extent.js").Extent} extent Extent.
 * @param {number} z Integer zoom level.
 * @param {import("../TileRange.js").default=} opt_tileRange Temporary tile range object.
 * @return {import("../TileRange.js").default} Tile range.
 */


TileGrid.prototype.getTileRangeForExtentAndZ = function getTileRangeForExtentAndZ(extent, z, opt_tileRange) {
  var tileCoord = tmpTileCoord;
  this.getTileCoordForXYAndZ_(extent[0], extent[1], z, false, tileCoord);
  var minX = tileCoord[1];
  var minY = tileCoord[2];
  this.getTileCoordForXYAndZ_(extent[2], extent[3], z, true, tileCoord);
  return (0, _TileRange.createOrUpdate)(minX, tileCoord[1], minY, tileCoord[2], opt_tileRange);
};
/**
 * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @return {import("../coordinate.js").Coordinate} Tile center.
 */


TileGrid.prototype.getTileCoordCenter = function getTileCoordCenter(tileCoord) {
  var origin = this.getOrigin(tileCoord[0]);
  var resolution = this.getResolution(tileCoord[0]);
  var tileSize = (0, _size.toSize)(this.getTileSize(tileCoord[0]), this.tmpSize_);
  return [origin[0] + (tileCoord[1] + 0.5) * tileSize[0] * resolution, origin[1] + (tileCoord[2] + 0.5) * tileSize[1] * resolution];
};
/**
 * Get the extent of a tile coordinate.
 *
 * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("../extent.js").Extent=} opt_extent Temporary extent object.
 * @return {import("../extent.js").Extent} Extent.
 * @api
 */


TileGrid.prototype.getTileCoordExtent = function getTileCoordExtent(tileCoord, opt_extent) {
  var origin = this.getOrigin(tileCoord[0]);
  var resolution = this.getResolution(tileCoord[0]);
  var tileSize = (0, _size.toSize)(this.getTileSize(tileCoord[0]), this.tmpSize_);
  var minX = origin[0] + tileCoord[1] * tileSize[0] * resolution;
  var minY = origin[1] + tileCoord[2] * tileSize[1] * resolution;
  var maxX = minX + tileSize[0] * resolution;
  var maxY = minY + tileSize[1] * resolution;
  return (0, _extent.createOrUpdate)(minX, minY, maxX, maxY, opt_extent);
};
/**
 * Get the tile coordinate for the given map coordinate and resolution.This
 * method considers that coordinates that intersect tile boundaries should be
 * assigned the higher tile coordinate.
 *
 * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} resolution Resolution.
 * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Destination import("../tilecoord.js").TileCoord object.
 * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
 * @api
 */


TileGrid.prototype.getTileCoordForCoordAndResolution = function getTileCoordForCoordAndResolution(coordinate, resolution, opt_tileCoord) {
  return this.getTileCoordForXYAndResolution_(coordinate[0], coordinate[1], resolution, false, opt_tileCoord);
};
/**
 * Note that this method should not be called for resolutions that correspond
 * to an integer zoom level.Instead call the `getTileCoordForXYAndZ_` method.
 * @param {number} x X.
 * @param {number} y Y.
 * @param {number} resolution Resolution (for a non-integer zoom level).
 * @param {boolean} reverseIntersectionPolicy Instead of letting edge
 *   intersections go to the higher tile coordinate, let edge intersections
 *   go to the lower tile coordinate.
 * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Temporary import("../tilecoord.js").TileCoord object.
 * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
 * @private
 */


TileGrid.prototype.getTileCoordForXYAndResolution_ = function getTileCoordForXYAndResolution_(x, y, resolution, reverseIntersectionPolicy, opt_tileCoord) {
  var z = this.getZForResolution(resolution);
  var scale = resolution / this.getResolution(z);
  var origin = this.getOrigin(z);
  var tileSize = (0, _size.toSize)(this.getTileSize(z), this.tmpSize_);
  var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
  var adjustY = reverseIntersectionPolicy ? 0 : 0.5;
  var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
  var yFromOrigin = Math.floor((y - origin[1]) / resolution + adjustY);
  var tileCoordX = scale * xFromOrigin / tileSize[0];
  var tileCoordY = scale * yFromOrigin / tileSize[1];

  if (reverseIntersectionPolicy) {
    tileCoordX = Math.ceil(tileCoordX) - 1;
    tileCoordY = Math.ceil(tileCoordY) - 1;
  } else {
    tileCoordX = Math.floor(tileCoordX);
    tileCoordY = Math.floor(tileCoordY);
  }

  return (0, _tilecoord.createOrUpdate)(z, tileCoordX, tileCoordY, opt_tileCoord);
};
/**
 * Although there is repetition between this method and `getTileCoordForXYAndResolution_`,
 * they should have separate implementations.This method is for integer zoom
 * levels.The other method should only be called for resolutions corresponding
 * to non-integer zoom levels.
 * @param {number} x Map x coordinate.
 * @param {number} y Map y coordinate.
 * @param {number} z Integer zoom level.
 * @param {boolean} reverseIntersectionPolicy Instead of letting edge
 *   intersections go to the higher tile coordinate, let edge intersections
 *   go to the lower tile coordinate.
 * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Temporary import("../tilecoord.js").TileCoord object.
 * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
 * @private
 */


TileGrid.prototype.getTileCoordForXYAndZ_ = function getTileCoordForXYAndZ_(x, y, z, reverseIntersectionPolicy, opt_tileCoord) {
  var origin = this.getOrigin(z);
  var resolution = this.getResolution(z);
  var tileSize = (0, _size.toSize)(this.getTileSize(z), this.tmpSize_);
  var adjustX = reverseIntersectionPolicy ? 0.5 : 0;
  var adjustY = reverseIntersectionPolicy ? 0 : 0.5;
  var xFromOrigin = Math.floor((x - origin[0]) / resolution + adjustX);
  var yFromOrigin = Math.floor((y - origin[1]) / resolution + adjustY);
  var tileCoordX = xFromOrigin / tileSize[0];
  var tileCoordY = yFromOrigin / tileSize[1];

  if (reverseIntersectionPolicy) {
    tileCoordX = Math.ceil(tileCoordX) - 1;
    tileCoordY = Math.ceil(tileCoordY) - 1;
  } else {
    tileCoordX = Math.floor(tileCoordX);
    tileCoordY = Math.floor(tileCoordY);
  }

  return (0, _tilecoord.createOrUpdate)(z, tileCoordX, tileCoordY, opt_tileCoord);
};
/**
 * Get a tile coordinate given a map coordinate and zoom level.
 * @param {import("../coordinate.js").Coordinate} coordinate Coordinate.
 * @param {number} z Zoom level.
 * @param {import("../tilecoord.js").TileCoord=} opt_tileCoord Destination import("../tilecoord.js").TileCoord object.
 * @return {import("../tilecoord.js").TileCoord} Tile coordinate.
 * @api
 */


TileGrid.prototype.getTileCoordForCoordAndZ = function getTileCoordForCoordAndZ(coordinate, z, opt_tileCoord) {
  return this.getTileCoordForXYAndZ_(coordinate[0], coordinate[1], z, false, opt_tileCoord);
};
/**
 * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @return {number} Tile resolution.
 */


TileGrid.prototype.getTileCoordResolution = function getTileCoordResolution(tileCoord) {
  return this.resolutions_[tileCoord[0]];
};
/**
 * Get the tile size for a zoom level. The type of the return value matches the
 * `tileSize` or `tileSizes` that the tile grid was configured with. To always
 * get an `import("../size.js").Size`, run the result through `import("../size.js").Size.toSize()`.
 * @param {number} z Z.
 * @return {number|import("../size.js").Size} Tile size.
 * @api
 */


TileGrid.prototype.getTileSize = function getTileSize(z) {
  if (this.tileSize_) {
    return this.tileSize_;
  } else {
    return this.tileSizes_[z];
  }
};
/**
 * @param {number} z Zoom level.
 * @return {import("../TileRange.js").default} Extent tile range for the specified zoom level.
 */


TileGrid.prototype.getFullTileRange = function getFullTileRange(z) {
  if (!this.fullTileRanges_) {
    return null;
  } else {
    return this.fullTileRanges_[z];
  }
};
/**
 * @param {number} resolution Resolution.
 * @param {number=} opt_direction If 0, the nearest resolution will be used.
 *   If 1, the nearest lower resolution will be used. If -1, the nearest
 *   higher resolution will be used. Default is 0.
 * @return {number} Z.
 * @api
 */


TileGrid.prototype.getZForResolution = function getZForResolution(resolution, opt_direction) {
  var z = (0, _array.linearFindNearest)(this.resolutions_, resolution, opt_direction || 0);
  return (0, _math.clamp)(z, this.minZoom, this.maxZoom);
};
/**
 * @param {!import("../extent.js").Extent} extent Extent for this tile grid.
 * @private
 */


TileGrid.prototype.calculateTileRanges_ = function calculateTileRanges_(extent) {
  var length = this.resolutions_.length;
  var fullTileRanges = new Array(length);

  for (var z = this.minZoom; z < length; ++z) {
    fullTileRanges[z] = this.getTileRangeForExtentAndZ(extent, z);
  }

  this.fullTileRanges_ = fullTileRanges;
};

var _default = TileGrid;
exports.default = _default;
},{"./common.js":"node_modules/ol/tilegrid/common.js","../asserts.js":"node_modules/ol/asserts.js","../TileRange.js":"node_modules/ol/TileRange.js","../array.js":"node_modules/ol/array.js","../extent.js":"node_modules/ol/extent.js","../math.js":"node_modules/ol/math.js","../size.js":"node_modules/ol/size.js","../tilecoord.js":"node_modules/ol/tilecoord.js"}],"node_modules/ol/tilegrid.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getForProjection = getForProjection;
exports.wrapX = wrapX;
exports.createForExtent = createForExtent;
exports.createXYZ = createXYZ;
exports.createForProjection = createForProjection;
exports.extentFromProjection = extentFromProjection;

var _common = require("./tilegrid/common.js");

var _size = require("./size.js");

var _extent = require("./extent.js");

var _Corner = _interopRequireDefault(require("./extent/Corner.js"));

var _proj = require("./proj.js");

var _Units = _interopRequireDefault(require("./proj/Units.js"));

var _TileGrid = _interopRequireDefault(require("./tilegrid/TileGrid.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/tilegrid
 */

/**
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {!TileGrid} Default tile grid for the
 * passed projection.
 */
function getForProjection(projection) {
  var tileGrid = projection.getDefaultTileGrid();

  if (!tileGrid) {
    tileGrid = createForProjection(projection);
    projection.setDefaultTileGrid(tileGrid);
  }

  return tileGrid;
}
/**
 * @param {TileGrid} tileGrid Tile grid.
 * @param {import("./tilecoord.js").TileCoord} tileCoord Tile coordinate.
 * @param {import("./proj/Projection.js").default} projection Projection.
 * @return {import("./tilecoord.js").TileCoord} Tile coordinate.
 */


function wrapX(tileGrid, tileCoord, projection) {
  var z = tileCoord[0];
  var center = tileGrid.getTileCoordCenter(tileCoord);
  var projectionExtent = extentFromProjection(projection);

  if (!(0, _extent.containsCoordinate)(projectionExtent, center)) {
    var worldWidth = (0, _extent.getWidth)(projectionExtent);
    var worldsAway = Math.ceil((projectionExtent[0] - center[0]) / worldWidth);
    center[0] += worldWidth * worldsAway;
    return tileGrid.getTileCoordForCoordAndZ(center, z);
  } else {
    return tileCoord;
  }
}
/**
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number=} opt_maxZoom Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size=} opt_tileSize Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {Corner=} opt_corner Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */


function createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner) {
  var corner = opt_corner !== undefined ? opt_corner : _Corner.default.TOP_LEFT;
  var resolutions = resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize);
  return new _TileGrid.default({
    extent: extent,
    origin: (0, _extent.getCorner)(extent, corner),
    resolutions: resolutions,
    tileSize: opt_tileSize
  });
}
/**
 * @typedef {Object} XYZOptions
 * @property {import("./extent.js").Extent} [extent] Extent for the tile grid. The origin for an XYZ tile grid is the
 * top-left corner of the extent. The zero level of the grid is defined by the resolution at which one tile fits in the
 * provided extent. If not provided, the extent of the EPSG:3857 projection is used.
 * @property {number} [maxZoom] Maximum zoom. The default is `42`. This determines the number of levels
 * in the grid set. For example, a `maxZoom` of 21 means there are 22 levels in the grid set.
 * @property {number} [minZoom=0] Minimum zoom.
 * @property {number|import("./size.js").Size} [tileSize=[256, 256]] Tile size in pixels.
 */

/**
 * Creates a tile grid with a standard XYZ tiling scheme.
 * @param {XYZOptions=} opt_options Tile grid options.
 * @return {!TileGrid} Tile grid instance.
 * @api
 */


function createXYZ(opt_options) {
  /** @type {XYZOptions} */
  var xyzOptions = opt_options || {};
  var extent = xyzOptions.extent || (0, _proj.get)('EPSG:3857').getExtent();
  /** @type {import("./tilegrid/TileGrid.js").Options} */

  var gridOptions = {
    extent: extent,
    minZoom: xyzOptions.minZoom,
    tileSize: xyzOptions.tileSize,
    resolutions: resolutionsFromExtent(extent, xyzOptions.maxZoom, xyzOptions.tileSize)
  };
  return new _TileGrid.default(gridOptions);
}
/**
 * Create a resolutions array from an extent.  A zoom factor of 2 is assumed.
 * @param {import("./extent.js").Extent} extent Extent.
 * @param {number=} opt_maxZoom Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size=} opt_tileSize Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @return {!Array<number>} Resolutions array.
 */


function resolutionsFromExtent(extent, opt_maxZoom, opt_tileSize) {
  var maxZoom = opt_maxZoom !== undefined ? opt_maxZoom : _common.DEFAULT_MAX_ZOOM;
  var height = (0, _extent.getHeight)(extent);
  var width = (0, _extent.getWidth)(extent);
  var tileSize = (0, _size.toSize)(opt_tileSize !== undefined ? opt_tileSize : _common.DEFAULT_TILE_SIZE);
  var maxResolution = Math.max(width / tileSize[0], height / tileSize[1]);
  var length = maxZoom + 1;
  var resolutions = new Array(length);

  for (var z = 0; z < length; ++z) {
    resolutions[z] = maxResolution / Math.pow(2, z);
  }

  return resolutions;
}
/**
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @param {number=} opt_maxZoom Maximum zoom level (default is
 *     DEFAULT_MAX_ZOOM).
 * @param {number|import("./size.js").Size=} opt_tileSize Tile size (default uses
 *     DEFAULT_TILE_SIZE).
 * @param {Corner=} opt_corner Extent corner (default is `'top-left'`).
 * @return {!TileGrid} TileGrid instance.
 */


function createForProjection(projection, opt_maxZoom, opt_tileSize, opt_corner) {
  var extent = extentFromProjection(projection);
  return createForExtent(extent, opt_maxZoom, opt_tileSize, opt_corner);
}
/**
 * Generate a tile grid extent from a projection.  If the projection has an
 * extent, it is used.  If not, a global extent is assumed.
 * @param {import("./proj.js").ProjectionLike} projection Projection.
 * @return {import("./extent.js").Extent} Extent.
 */


function extentFromProjection(projection) {
  projection = (0, _proj.get)(projection);
  var extent = projection.getExtent();

  if (!extent) {
    var half = 180 * _proj.METERS_PER_UNIT[_Units.default.DEGREES] / projection.getMetersPerUnit();
    extent = (0, _extent.createOrUpdate)(-half, -half, half, half);
  }

  return extent;
}
},{"./tilegrid/common.js":"node_modules/ol/tilegrid/common.js","./size.js":"node_modules/ol/size.js","./extent.js":"node_modules/ol/extent.js","./extent/Corner.js":"node_modules/ol/extent/Corner.js","./proj.js":"node_modules/ol/proj.js","./proj/Units.js":"node_modules/ol/proj/Units.js","./tilegrid/TileGrid.js":"node_modules/ol/tilegrid/TileGrid.js"}],"node_modules/ol/source/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TileSourceEvent = void 0;

var _util = require("../util.js");

var _TileCache = _interopRequireDefault(require("../TileCache.js"));

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _Event = _interopRequireDefault(require("../events/Event.js"));

var _proj = require("../proj.js");

var _size = require("../size.js");

var _Source = _interopRequireDefault(require("./Source.js"));

var _tilecoord = require("../tilecoord.js");

var _tilegrid = require("../tilegrid.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/source/Tile
 */

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions]
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize]
 * @property {boolean} [opaque]
 * @property {number} [tilePixelRatio]
 * @property {import("../proj.js").ProjectionLike} [projection]
 * @property {import("./State.js").default} [state]
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid]
 * @property {boolean} [wrapX=true]
 * @property {number} [transition]
 * @property {string} [key]
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Base class for sources providing images divided into a tile grid.
 * @abstract
 * @api
 */
var TileSource =
/*@__PURE__*/
function (Source) {
  function TileSource(options) {
    Source.call(this, {
      attributions: options.attributions,
      attributionsCollapsible: options.attributionsCollapsible,
      projection: options.projection,
      state: options.state,
      wrapX: options.wrapX
    });
    /**
     * @private
     * @type {boolean}
     */

    this.opaque_ = options.opaque !== undefined ? options.opaque : false;
    /**
     * @private
     * @type {number}
     */

    this.tilePixelRatio_ = options.tilePixelRatio !== undefined ? options.tilePixelRatio : 1;
    /**
     * @protected
     * @type {import("../tilegrid/TileGrid.js").default}
     */

    this.tileGrid = options.tileGrid !== undefined ? options.tileGrid : null;
    /**
     * @protected
     * @type {import("../TileCache.js").default}
     */

    this.tileCache = new _TileCache.default(options.cacheSize);
    /**
     * @protected
     * @type {import("../size.js").Size}
     */

    this.tmpSize = [0, 0];
    /**
     * @private
     * @type {string}
     */

    this.key_ = options.key || '';
    /**
     * @protected
     * @type {import("../Tile.js").Options}
     */

    this.tileOptions = {
      transition: options.transition
    };
  }

  if (Source) TileSource.__proto__ = Source;
  TileSource.prototype = Object.create(Source && Source.prototype);
  TileSource.prototype.constructor = TileSource;
  /**
   * @return {boolean} Can expire cache.
   */

  TileSource.prototype.canExpireCache = function canExpireCache() {
    return this.tileCache.canExpireCache();
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {!Object<string, import("../TileRange.js").default>} usedTiles Used tiles.
   */


  TileSource.prototype.expireCache = function expireCache(projection, usedTiles) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (tileCache) {
      tileCache.expireCache(usedTiles);
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {number} z Zoom level.
   * @param {import("../TileRange.js").default} tileRange Tile range.
   * @param {function(import("../Tile.js").default):(boolean|void)} callback Called with each
   *     loaded tile.  If the callback returns `false`, the tile will not be
   *     considered loaded.
   * @return {boolean} The tile range is fully covered with loaded tiles.
   */


  TileSource.prototype.forEachLoadedTile = function forEachLoadedTile(projection, z, tileRange, callback) {
    var tileCache = this.getTileCacheForProjection(projection);

    if (!tileCache) {
      return false;
    }

    var covered = true;
    var tile, tileCoordKey, loaded;

    for (var x = tileRange.minX; x <= tileRange.maxX; ++x) {
      for (var y = tileRange.minY; y <= tileRange.maxY; ++y) {
        tileCoordKey = (0, _tilecoord.getKeyZXY)(z, x, y);
        loaded = false;

        if (tileCache.containsKey(tileCoordKey)) {
          tile =
          /** @type {!import("../Tile.js").default} */
          tileCache.get(tileCoordKey);
          loaded = tile.getState() === _TileState.default.LOADED;

          if (loaded) {
            loaded = callback(tile) !== false;
          }
        }

        if (!loaded) {
          covered = false;
        }
      }
    }

    return covered;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {number} Gutter.
   */


  TileSource.prototype.getGutterForProjection = function getGutterForProjection(projection) {
    return 0;
  };
  /**
   * Return the key to be used for all tiles in the source.
   * @return {string} The key for all tiles.
   * @protected
   */


  TileSource.prototype.getKey = function getKey() {
    return this.key_;
  };
  /**
   * Set the value to be used as the key for all tiles in the source.
   * @param {string} key The key for tiles.
   * @protected
   */


  TileSource.prototype.setKey = function setKey(key) {
    if (this.key_ !== key) {
      this.key_ = key;
      this.changed();
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {boolean} Opaque.
   */


  TileSource.prototype.getOpaque = function getOpaque(projection) {
    return this.opaque_;
  };
  /**
   * @inheritDoc
   */


  TileSource.prototype.getResolutions = function getResolutions() {
    return this.tileGrid.getResolutions();
  };
  /**
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   */


  TileSource.prototype.getTile = function getTile(z, x, y, pixelRatio, projection) {
    return (0, _util.abstract)();
  };
  /**
   * Return the tile grid of the tile source.
   * @return {import("../tilegrid/TileGrid.js").default} Tile grid.
   * @api
   */


  TileSource.prototype.getTileGrid = function getTileGrid() {
    return this.tileGrid;
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../tilegrid/TileGrid.js").default} Tile grid.
   */


  TileSource.prototype.getTileGridForProjection = function getTileGridForProjection$1(projection) {
    if (!this.tileGrid) {
      return (0, _tilegrid.getForProjection)(projection);
    } else {
      return this.tileGrid;
    }
  };
  /**
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../TileCache.js").default} Tile cache.
   * @protected
   */


  TileSource.prototype.getTileCacheForProjection = function getTileCacheForProjection(projection) {
    var thisProj = this.getProjection();

    if (thisProj && !(0, _proj.equivalent)(thisProj, projection)) {
      return null;
    } else {
      return this.tileCache;
    }
  };
  /**
   * Get the tile pixel ratio for this source. Subclasses may override this
   * method, which is meant to return a supported pixel ratio that matches the
   * provided `pixelRatio` as close as possible.
   * @param {number} pixelRatio Pixel ratio.
   * @return {number} Tile pixel ratio.
   */


  TileSource.prototype.getTilePixelRatio = function getTilePixelRatio(pixelRatio) {
    return this.tilePixelRatio_;
  };
  /**
   * @param {number} z Z.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @return {import("../size.js").Size} Tile size.
   */


  TileSource.prototype.getTilePixelSize = function getTilePixelSize(z, pixelRatio, projection) {
    var tileGrid = this.getTileGridForProjection(projection);
    var tilePixelRatio = this.getTilePixelRatio(pixelRatio);
    var tileSize = (0, _size.toSize)(tileGrid.getTileSize(z), this.tmpSize);

    if (tilePixelRatio == 1) {
      return tileSize;
    } else {
      return (0, _size.scale)(tileSize, tilePixelRatio, this.tmpSize);
    }
  };
  /**
   * Returns a tile coordinate wrapped around the x-axis. When the tile coordinate
   * is outside the resolution and extent range of the tile grid, `null` will be
   * returned.
   * @param {import("../tilecoord.js").TileCoord} tileCoord Tile coordinate.
   * @param {import("../proj/Projection.js").default=} opt_projection Projection.
   * @return {import("../tilecoord.js").TileCoord} Tile coordinate to be passed to the tileUrlFunction or
   *     null if no tile URL should be created for the passed `tileCoord`.
   */


  TileSource.prototype.getTileCoordForTileUrlFunction = function getTileCoordForTileUrlFunction(tileCoord, opt_projection) {
    var projection = opt_projection !== undefined ? opt_projection : this.getProjection();
    var tileGrid = this.getTileGridForProjection(projection);

    if (this.getWrapX() && projection.isGlobal()) {
      tileCoord = (0, _tilegrid.wrapX)(tileGrid, tileCoord, projection);
    }

    return (0, _tilecoord.withinExtentAndZ)(tileCoord, tileGrid) ? tileCoord : null;
  };
  /**
   * @inheritDoc
   */


  TileSource.prototype.refresh = function refresh() {
    this.tileCache.clear();
    this.changed();
  };
  /**
   * Marks a tile coord as being used, without triggering a load.
   * @abstract
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {import("../proj/Projection.js").default} projection Projection.
   */


  TileSource.prototype.useTile = function useTile(z, x, y, projection) {};

  return TileSource;
}(_Source.default);
/**
 * @classdesc
 * Events emitted by {@link module:ol/source/Tile~TileSource} instances are instances of this
 * type.
 */


var TileSourceEvent =
/*@__PURE__*/
function (Event) {
  function TileSourceEvent(type, tile) {
    Event.call(this, type);
    /**
     * The tile related to the event.
     * @type {import("../Tile.js").default}
     * @api
     */

    this.tile = tile;
  }

  if (Event) TileSourceEvent.__proto__ = Event;
  TileSourceEvent.prototype = Object.create(Event && Event.prototype);
  TileSourceEvent.prototype.constructor = TileSourceEvent;
  return TileSourceEvent;
}(_Event.default);

exports.TileSourceEvent = TileSourceEvent;
var _default = TileSource;
exports.default = _default;
},{"../util.js":"node_modules/ol/util.js","../TileCache.js":"node_modules/ol/TileCache.js","../TileState.js":"node_modules/ol/TileState.js","../events/Event.js":"node_modules/ol/events/Event.js","../proj.js":"node_modules/ol/proj.js","../size.js":"node_modules/ol/size.js","./Source.js":"node_modules/ol/source/Source.js","../tilecoord.js":"node_modules/ol/tilecoord.js","../tilegrid.js":"node_modules/ol/tilegrid.js"}],"node_modules/ol/source/TileEventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/source/TileEventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * Triggered when a tile starts loading.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadstart
   * @api
   */
  TILELOADSTART: 'tileloadstart',

  /**
   * Triggered when a tile finishes loading, either when its data is loaded,
   * or when loading was aborted because the tile is no longer needed.
   * @event module:ol/source/Tile.TileSourceEvent#tileloadend
   * @api
   */
  TILELOADEND: 'tileloadend',

  /**
   * Triggered if tile loading results in an error.
   * @event module:ol/source/Tile.TileSourceEvent#tileloaderror
   * @api
   */
  TILELOADERROR: 'tileloaderror'
};
exports.default = _default;
},{}],"node_modules/ol/source/UrlTile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util.js");

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _tileurlfunction = require("../tileurlfunction.js");

var _Tile = _interopRequireWildcard(require("./Tile.js"));

var _TileEventType = _interopRequireDefault(require("./TileEventType.js"));

var _tilecoord = require("../tilecoord.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/source/UrlTile
 */

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions]
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize]
 * @property {boolean} [opaque]
 * @property {import("../proj.js").ProjectionLike} [projection]
 * @property {import("./State.js").default} [state]
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid]
 * @property {import("../Tile.js").LoadFunction} tileLoadFunction
 * @property {number} [tilePixelRatio]
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction]
 * @property {string} [url]
 * @property {Array<string>} [urls]
 * @property {boolean} [wrapX=true]
 * @property {number} [transition]
 * @property {string} [key]
 */

/**
 * @classdesc
 * Base class for sources providing tiles divided into a tile grid over http.
 *
 * @fires import("./Tile.js").TileSourceEvent
 */
var UrlTile =
/*@__PURE__*/
function (TileSource) {
  function UrlTile(options) {
    TileSource.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tilePixelRatio: options.tilePixelRatio,
      wrapX: options.wrapX,
      transition: options.transition,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible
    });
    /**
     * @private
     * @type {boolean}
     */

    this.generateTileUrlFunction_ = !options.tileUrlFunction;
    /**
     * @protected
     * @type {import("../Tile.js").LoadFunction}
     */

    this.tileLoadFunction = options.tileLoadFunction;
    /**
     * @protected
     * @type {import("../Tile.js").UrlFunction}
     */

    this.tileUrlFunction = options.tileUrlFunction ? options.tileUrlFunction.bind(this) : _tileurlfunction.nullTileUrlFunction;
    /**
     * @protected
     * @type {!Array<string>|null}
     */

    this.urls = null;

    if (options.urls) {
      this.setUrls(options.urls);
    } else if (options.url) {
      this.setUrl(options.url);
    }

    if (options.tileUrlFunction) {
      this.setTileUrlFunction(options.tileUrlFunction, this.key_);
    }
    /**
     * @private
     * @type {!Object<string, boolean>}
     */


    this.tileLoadingKeys_ = {};
  }

  if (TileSource) UrlTile.__proto__ = TileSource;
  UrlTile.prototype = Object.create(TileSource && TileSource.prototype);
  UrlTile.prototype.constructor = UrlTile;
  /**
   * Return the tile load function of the source.
   * @return {import("../Tile.js").LoadFunction} TileLoadFunction
   * @api
   */

  UrlTile.prototype.getTileLoadFunction = function getTileLoadFunction() {
    return this.tileLoadFunction;
  };
  /**
   * Return the tile URL function of the source.
   * @return {import("../Tile.js").UrlFunction} TileUrlFunction
   * @api
   */


  UrlTile.prototype.getTileUrlFunction = function getTileUrlFunction() {
    return this.tileUrlFunction;
  };
  /**
   * Return the URLs used for this source.
   * When a tileUrlFunction is used instead of url or urls,
   * null will be returned.
   * @return {!Array<string>|null} URLs.
   * @api
   */


  UrlTile.prototype.getUrls = function getUrls() {
    return this.urls;
  };
  /**
   * Handle tile change events.
   * @param {import("../events/Event.js").default} event Event.
   * @protected
   */


  UrlTile.prototype.handleTileChange = function handleTileChange(event) {
    var tile =
    /** @type {import("../Tile.js").default} */
    event.target;
    var uid = (0, _util.getUid)(tile);
    var tileState = tile.getState();
    var type;

    if (tileState == _TileState.default.LOADING) {
      this.tileLoadingKeys_[uid] = true;
      type = _TileEventType.default.TILELOADSTART;
    } else if (uid in this.tileLoadingKeys_) {
      delete this.tileLoadingKeys_[uid];
      type = tileState == _TileState.default.ERROR ? _TileEventType.default.TILELOADERROR : tileState == _TileState.default.LOADED || tileState == _TileState.default.ABORT ? _TileEventType.default.TILELOADEND : undefined;
    }

    if (type != undefined) {
      this.dispatchEvent(new _Tile.TileSourceEvent(type, tile));
    }
  };
  /**
   * Set the tile load function of the source.
   * @param {import("../Tile.js").LoadFunction} tileLoadFunction Tile load function.
   * @api
   */


  UrlTile.prototype.setTileLoadFunction = function setTileLoadFunction(tileLoadFunction) {
    this.tileCache.clear();
    this.tileLoadFunction = tileLoadFunction;
    this.changed();
  };
  /**
   * Set the tile URL function of the source.
   * @param {import("../Tile.js").UrlFunction} tileUrlFunction Tile URL function.
   * @param {string=} key Optional new tile key for the source.
   * @api
   */


  UrlTile.prototype.setTileUrlFunction = function setTileUrlFunction(tileUrlFunction, key) {
    this.tileUrlFunction = tileUrlFunction;
    this.tileCache.pruneExceptNewestZ();

    if (typeof key !== 'undefined') {
      this.setKey(key);
    } else {
      this.changed();
    }
  };
  /**
   * Set the URL to use for requests.
   * @param {string} url URL.
   * @api
   */


  UrlTile.prototype.setUrl = function setUrl(url) {
    var urls = this.urls = (0, _tileurlfunction.expandUrl)(url);
    this.setUrls(urls);
  };
  /**
   * Set the URLs to use for requests.
   * @param {Array<string>} urls URLs.
   * @api
   */


  UrlTile.prototype.setUrls = function setUrls(urls) {
    this.urls = urls;
    var key = urls.join('\n');

    if (this.generateTileUrlFunction_) {
      this.setTileUrlFunction((0, _tileurlfunction.createFromTemplates)(urls, this.tileGrid), key);
    } else {
      this.setKey(key);
    }
  };
  /**
   * @inheritDoc
   */


  UrlTile.prototype.useTile = function useTile(z, x, y) {
    var tileCoordKey = (0, _tilecoord.getKeyZXY)(z, x, y);

    if (this.tileCache.containsKey(tileCoordKey)) {
      this.tileCache.get(tileCoordKey);
    }
  };

  return UrlTile;
}(_Tile.default);

var _default = UrlTile;
exports.default = _default;
},{"../util.js":"node_modules/ol/util.js","../TileState.js":"node_modules/ol/TileState.js","../tileurlfunction.js":"node_modules/ol/tileurlfunction.js","./Tile.js":"node_modules/ol/source/Tile.js","./TileEventType.js":"node_modules/ol/source/TileEventType.js","../tilecoord.js":"node_modules/ol/tilecoord.js"}],"node_modules/ol/source/TileImage.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _common = require("../reproj/common.js");

var _util = require("../util.js");

var _ImageTile = _interopRequireDefault(require("../ImageTile.js"));

var _TileCache = _interopRequireDefault(require("../TileCache.js"));

var _TileState = _interopRequireDefault(require("../TileState.js"));

var _events = require("../events.js");

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _proj = require("../proj.js");

var _Tile = _interopRequireDefault(require("../reproj/Tile.js"));

var _UrlTile = _interopRequireDefault(require("./UrlTile.js"));

var _tilecoord = require("../tilecoord.js");

var _tilegrid = require("../tilegrid.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/source/TileImage
 */

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize=2048] Cache size.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you are using the WebGL renderer or if you want to
 * access pixel data with the Canvas renderer.  See
 * https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [opaque=true] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} projection Projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {import("./State.js").default} [state] Source state.
 * @property {typeof import("../ImageTile.js").default} [tileClass] Class used to instantiate image tiles.
 * Default is {@link module:ol/ImageTile~ImageTile}.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service. For example, if the tile
 * service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get tile URL given a tile coordinate and the projection.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`, and `{z}` placeholders.
 * A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`, may be
 * used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX] Whether to wrap the world horizontally. The default, is to
 * request out-of-bounds tiles from the server. When set to `false`, only one
 * world will be rendered. When set to `true`, tiles will be requested for one
 * world only, but they will be wrapped horizontally to render multiple worlds.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 * @property {string} [key] Optional tile key for proper cache fetching
 */

/**
 * @classdesc
 * Base class for sources providing images divided into a tile grid.
 *
 * @fires import("./Tile.js").TileSourceEvent
 * @api
 */
var TileImage =
/*@__PURE__*/
function (UrlTile) {
  function TileImage(options) {
    UrlTile.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      opaque: options.opaque,
      projection: options.projection,
      state: options.state,
      tileGrid: options.tileGrid,
      tileLoadFunction: options.tileLoadFunction ? options.tileLoadFunction : defaultTileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX,
      transition: options.transition,
      key: options.key,
      attributionsCollapsible: options.attributionsCollapsible
    });
    /**
     * @protected
     * @type {?string}
     */

    this.crossOrigin = options.crossOrigin !== undefined ? options.crossOrigin : null;
    /**
     * @protected
     * @type {typeof ImageTile}
     */

    this.tileClass = options.tileClass !== undefined ? options.tileClass : _ImageTile.default;
    /**
     * @protected
     * @type {!Object<string, TileCache>}
     */

    this.tileCacheForProjection = {};
    /**
     * @protected
     * @type {!Object<string, import("../tilegrid/TileGrid.js").default>}
     */

    this.tileGridForProjection = {};
    /**
     * @private
     * @type {number|undefined}
     */

    this.reprojectionErrorThreshold_ = options.reprojectionErrorThreshold;
    /**
     * @private
     * @type {boolean}
     */

    this.renderReprojectionEdges_ = false;
  }

  if (UrlTile) TileImage.__proto__ = UrlTile;
  TileImage.prototype = Object.create(UrlTile && UrlTile.prototype);
  TileImage.prototype.constructor = TileImage;
  /**
   * @inheritDoc
   */

  TileImage.prototype.canExpireCache = function canExpireCache() {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      return UrlTile.prototype.canExpireCache.call(this);
    }

    if (this.tileCache.canExpireCache()) {
      return true;
    } else {
      for (var key in this.tileCacheForProjection) {
        if (this.tileCacheForProjection[key].canExpireCache()) {
          return true;
        }
      }
    }

    return false;
  };
  /**
   * @inheritDoc
   */


  TileImage.prototype.expireCache = function expireCache(projection, usedTiles) {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      UrlTile.prototype.expireCache.call(this, projection, usedTiles);
      return;
    }

    var usedTileCache = this.getTileCacheForProjection(projection);
    this.tileCache.expireCache(this.tileCache == usedTileCache ? usedTiles : {});

    for (var id in this.tileCacheForProjection) {
      var tileCache = this.tileCacheForProjection[id];
      tileCache.expireCache(tileCache == usedTileCache ? usedTiles : {});
    }
  };
  /**
   * @inheritDoc
   */


  TileImage.prototype.getGutterForProjection = function getGutterForProjection(projection) {
    if (_common.ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !(0, _proj.equivalent)(this.getProjection(), projection)) {
      return 0;
    } else {
      return this.getGutter();
    }
  };
  /**
   * @return {number} Gutter.
   */


  TileImage.prototype.getGutter = function getGutter() {
    return 0;
  };
  /**
   * @inheritDoc
   */


  TileImage.prototype.getOpaque = function getOpaque(projection) {
    if (_common.ENABLE_RASTER_REPROJECTION && this.getProjection() && projection && !(0, _proj.equivalent)(this.getProjection(), projection)) {
      return false;
    } else {
      return UrlTile.prototype.getOpaque.call(this, projection);
    }
  };
  /**
   * @inheritDoc
   */


  TileImage.prototype.getTileGridForProjection = function getTileGridForProjection$1(projection) {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      return UrlTile.prototype.getTileGridForProjection.call(this, projection);
    }

    var thisProj = this.getProjection();

    if (this.tileGrid && (!thisProj || (0, _proj.equivalent)(thisProj, projection))) {
      return this.tileGrid;
    } else {
      var projKey = (0, _util.getUid)(projection);

      if (!(projKey in this.tileGridForProjection)) {
        this.tileGridForProjection[projKey] = (0, _tilegrid.getForProjection)(projection);
      }

      return (
        /** @type {!import("../tilegrid/TileGrid.js").default} */
        this.tileGridForProjection[projKey]
      );
    }
  };
  /**
   * @inheritDoc
   */


  TileImage.prototype.getTileCacheForProjection = function getTileCacheForProjection(projection) {
    if (!_common.ENABLE_RASTER_REPROJECTION) {
      return UrlTile.prototype.getTileCacheForProjection.call(this, projection);
    }

    var thisProj = this.getProjection();

    if (!thisProj || (0, _proj.equivalent)(thisProj, projection)) {
      return this.tileCache;
    } else {
      var projKey = (0, _util.getUid)(projection);

      if (!(projKey in this.tileCacheForProjection)) {
        this.tileCacheForProjection[projKey] = new _TileCache.default(this.tileCache.highWaterMark);
      }

      return this.tileCacheForProjection[projKey];
    }
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {import("../proj/Projection.js").default} projection Projection.
   * @param {string} key The key set on the tile.
   * @return {!import("../Tile.js").default} Tile.
   * @private
   */


  TileImage.prototype.createTile_ = function createTile_(z, x, y, pixelRatio, projection, key) {
    var tileCoord = [z, x, y];
    var urlTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
    var tileUrl = urlTileCoord ? this.tileUrlFunction(urlTileCoord, pixelRatio, projection) : undefined;
    var tile = new this.tileClass(tileCoord, tileUrl !== undefined ? _TileState.default.IDLE : _TileState.default.EMPTY, tileUrl !== undefined ? tileUrl : '', this.crossOrigin, this.tileLoadFunction, this.tileOptions);
    tile.key = key;
    (0, _events.listen)(tile, _EventType.default.CHANGE, this.handleTileChange, this);
    return tile;
  };
  /**
   * @inheritDoc
   */


  TileImage.prototype.getTile = function getTile(z, x, y, pixelRatio, projection) {
    var sourceProjection =
    /** @type {!import("../proj/Projection.js").default} */
    this.getProjection();

    if (!_common.ENABLE_RASTER_REPROJECTION || !sourceProjection || !projection || (0, _proj.equivalent)(sourceProjection, projection)) {
      return this.getTileInternal(z, x, y, pixelRatio, sourceProjection || projection);
    } else {
      var cache = this.getTileCacheForProjection(projection);
      var tileCoord = [z, x, y];
      var tile;
      var tileCoordKey = (0, _tilecoord.getKey)(tileCoord);

      if (cache.containsKey(tileCoordKey)) {
        tile =
        /** @type {!import("../Tile.js").default} */
        cache.get(tileCoordKey);
      }

      var key = this.getKey();

      if (tile && tile.key == key) {
        return tile;
      } else {
        var sourceTileGrid = this.getTileGridForProjection(sourceProjection);
        var targetTileGrid = this.getTileGridForProjection(projection);
        var wrappedTileCoord = this.getTileCoordForTileUrlFunction(tileCoord, projection);
        var newTile = new _Tile.default(sourceProjection, sourceTileGrid, projection, targetTileGrid, tileCoord, wrappedTileCoord, this.getTilePixelRatio(pixelRatio), this.getGutter(), function (z, x, y, pixelRatio) {
          return this.getTileInternal(z, x, y, pixelRatio, sourceProjection);
        }.bind(this), this.reprojectionErrorThreshold_, this.renderReprojectionEdges_);
        newTile.key = key;

        if (tile) {
          newTile.interimTile = tile;
          newTile.refreshInterimChain();
          cache.replace(tileCoordKey, newTile);
        } else {
          cache.set(tileCoordKey, newTile);
        }

        return newTile;
      }
    }
  };
  /**
   * @param {number} z Tile coordinate z.
   * @param {number} x Tile coordinate x.
   * @param {number} y Tile coordinate y.
   * @param {number} pixelRatio Pixel ratio.
   * @param {!import("../proj/Projection.js").default} projection Projection.
   * @return {!import("../Tile.js").default} Tile.
   * @protected
   */


  TileImage.prototype.getTileInternal = function getTileInternal(z, x, y, pixelRatio, projection) {
    var tile = null;
    var tileCoordKey = (0, _tilecoord.getKeyZXY)(z, x, y);
    var key = this.getKey();

    if (!this.tileCache.containsKey(tileCoordKey)) {
      tile = this.createTile_(z, x, y, pixelRatio, projection, key);
      this.tileCache.set(tileCoordKey, tile);
    } else {
      tile = this.tileCache.get(tileCoordKey);

      if (tile.key != key) {
        // The source's params changed. If the tile has an interim tile and if we
        // can use it then we use it. Otherwise we create a new tile.  In both
        // cases we attempt to assign an interim tile to the new tile.
        var interimTile = tile;
        tile = this.createTile_(z, x, y, pixelRatio, projection, key); //make the new tile the head of the list,

        if (interimTile.getState() == _TileState.default.IDLE) {
          //the old tile hasn't begun loading yet, and is now outdated, so we can simply discard it
          tile.interimTile = interimTile.interimTile;
        } else {
          tile.interimTile = interimTile;
        }

        tile.refreshInterimChain();
        this.tileCache.replace(tileCoordKey, tile);
      }
    }

    return tile;
  };
  /**
   * Sets whether to render reprojection edges or not (usually for debugging).
   * @param {boolean} render Render the edges.
   * @api
   */


  TileImage.prototype.setRenderReprojectionEdges = function setRenderReprojectionEdges(render) {
    if (!_common.ENABLE_RASTER_REPROJECTION || this.renderReprojectionEdges_ == render) {
      return;
    }

    this.renderReprojectionEdges_ = render;

    for (var id in this.tileCacheForProjection) {
      this.tileCacheForProjection[id].clear();
    }

    this.changed();
  };
  /**
   * Sets the tile grid to use when reprojecting the tiles to the given
   * projection instead of the default tile grid for the projection.
   *
   * This can be useful when the default tile grid cannot be created
   * (e.g. projection has no extent defined) or
   * for optimization reasons (custom tile size, resolutions, ...).
   *
   * @param {import("../proj.js").ProjectionLike} projection Projection.
   * @param {import("../tilegrid/TileGrid.js").default} tilegrid Tile grid to use for the projection.
   * @api
   */


  TileImage.prototype.setTileGridForProjection = function setTileGridForProjection(projection, tilegrid) {
    if (_common.ENABLE_RASTER_REPROJECTION) {
      var proj = (0, _proj.get)(projection);

      if (proj) {
        var projKey = (0, _util.getUid)(proj);

        if (!(projKey in this.tileGridForProjection)) {
          this.tileGridForProjection[projKey] = tilegrid;
        }
      }
    }
  };

  return TileImage;
}(_UrlTile.default);
/**
 * @param {ImageTile} imageTile Image tile.
 * @param {string} src Source.
 */


function defaultTileLoadFunction(imageTile, src) {
  /** @type {HTMLImageElement|HTMLVideoElement} */
  imageTile.getImage().src = src;
}

var _default = TileImage;
exports.default = _default;
},{"../reproj/common.js":"node_modules/ol/reproj/common.js","../util.js":"node_modules/ol/util.js","../ImageTile.js":"node_modules/ol/ImageTile.js","../TileCache.js":"node_modules/ol/TileCache.js","../TileState.js":"node_modules/ol/TileState.js","../events.js":"node_modules/ol/events.js","../events/EventType.js":"node_modules/ol/events/EventType.js","../proj.js":"node_modules/ol/proj.js","../reproj/Tile.js":"node_modules/ol/reproj/Tile.js","./UrlTile.js":"node_modules/ol/source/UrlTile.js","../tilecoord.js":"node_modules/ol/tilecoord.js","../tilegrid.js":"node_modules/ol/tilegrid.js"}],"node_modules/ol/source/XYZ.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _TileImage = _interopRequireDefault(require("./TileImage.js"));

var _tilegrid = require("../tilegrid.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/source/XYZ
 */

/**
 * @typedef {Object} Options
 * @property {import("./Source.js").AttributionLike} [attributions] Attributions.
 * @property {boolean} [attributionsCollapsible=true] Attributions are collapsible.
 * @property {number} [cacheSize=2048] Cache size.
 * @property {null|string} [crossOrigin] The `crossOrigin` attribute for loaded images.  Note that
 * you must provide a `crossOrigin` value if you are using the WebGL renderer or if you want to
 * access pixel data with the Canvas renderer.  See
 * https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image for more detail.
 * @property {boolean} [opaque=true] Whether the layer is opaque.
 * @property {import("../proj.js").ProjectionLike} [projection='EPSG:3857'] Projection.
 * @property {number} [reprojectionErrorThreshold=0.5] Maximum allowed reprojection error (in pixels).
 * Higher values can increase reprojection performance, but decrease precision.
 * @property {number} [maxZoom=18] Optional max zoom level.
 * @property {number} [minZoom=0] Optional min zoom level.
 * @property {import("../tilegrid/TileGrid.js").default} [tileGrid] Tile grid.
 * @property {import("../Tile.js").LoadFunction} [tileLoadFunction] Optional function to load a tile given a URL. The default is
 * ```js
 * function(imageTile, src) {
 *   imageTile.getImage().src = src;
 * };
 * ```
 * @property {number} [tilePixelRatio=1] The pixel ratio used by the tile service.
 * For example, if the tile service advertizes 256px by 256px tiles but actually sends 512px
 * by 512px images (for retina/hidpi devices) then `tilePixelRatio`
 * should be set to `2`.
 * @property {number|import("../size.js").Size} [tileSize=[256, 256]] The tile size used by the tile service.
 * @property {import("../Tile.js").UrlFunction} [tileUrlFunction] Optional function to get
 * tile URL given a tile coordinate and the projection.
 * Required if url or urls are not provided.
 * @property {string} [url] URL template. Must include `{x}`, `{y}` or `{-y}`,
 * and `{z}` placeholders. A `{?-?}` template pattern, for example `subdomain{a-f}.domain.com`,
 * may be used instead of defining each one separately in the `urls` option.
 * @property {Array<string>} [urls] An array of URL templates.
 * @property {boolean} [wrapX=true] Whether to wrap the world horizontally.
 * @property {number} [transition] Duration of the opacity transition for rendering.
 * To disable the opacity transition, pass `transition: 0`.
 */

/**
 * @classdesc
 * Layer source for tile data with URLs in a set XYZ format that are
 * defined in a URL template. By default, this follows the widely-used
 * Google grid where `x` 0 and `y` 0 are in the top left. Grids like
 * TMS where `x` 0 and `y` 0 are in the bottom left can be used by
 * using the `{-y}` placeholder in the URL template, so long as the
 * source does not have a custom tile grid. In this case,
 * {@link module:ol/source/TileImage} can be used with a `tileUrlFunction`
 * such as:
 *
 *  tileUrlFunction: function(coordinate) {
 *    return 'http://mapserver.com/' + coordinate[0] + '/' +
 *        coordinate[1] + '/' + coordinate[2] + '.png';
 *    }
 *
 * @api
 */
var XYZ =
/*@__PURE__*/
function (TileImage) {
  function XYZ(opt_options) {
    var options = opt_options || {};
    var projection = options.projection !== undefined ? options.projection : 'EPSG:3857';
    var tileGrid = options.tileGrid !== undefined ? options.tileGrid : (0, _tilegrid.createXYZ)({
      extent: (0, _tilegrid.extentFromProjection)(projection),
      maxZoom: options.maxZoom,
      minZoom: options.minZoom,
      tileSize: options.tileSize
    });
    TileImage.call(this, {
      attributions: options.attributions,
      cacheSize: options.cacheSize,
      crossOrigin: options.crossOrigin,
      opaque: options.opaque,
      projection: projection,
      reprojectionErrorThreshold: options.reprojectionErrorThreshold,
      tileGrid: tileGrid,
      tileLoadFunction: options.tileLoadFunction,
      tilePixelRatio: options.tilePixelRatio,
      tileUrlFunction: options.tileUrlFunction,
      url: options.url,
      urls: options.urls,
      wrapX: options.wrapX !== undefined ? options.wrapX : true,
      transition: options.transition,
      attributionsCollapsible: options.attributionsCollapsible
    });
  }

  if (TileImage) XYZ.__proto__ = TileImage;
  XYZ.prototype = Object.create(TileImage && TileImage.prototype);
  XYZ.prototype.constructor = XYZ;
  return XYZ;
}(_TileImage.default);

var _default = XYZ;
exports.default = _default;
},{"./TileImage.js":"node_modules/ol/source/TileImage.js","../tilegrid.js":"node_modules/ol/tilegrid.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/ol/source/XYZ.js"], null)
//# sourceMappingURL=/XYZ.dc21f8e5.js.map