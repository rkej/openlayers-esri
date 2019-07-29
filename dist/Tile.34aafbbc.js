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
})({"node_modules/ol/LayerType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/LayerType
 */

/**
 * A layer type used when creating layer renderers.
 * @enum {string}
 */
var _default = {
  IMAGE: 'IMAGE',
  TILE: 'TILE',
  VECTOR_TILE: 'VECTOR_TILE',
  VECTOR: 'VECTOR'
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
},{"./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/events/EventType.js":[function(require,module,exports) {
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
},{"../Disposable.js":"node_modules/ol/Disposable.js","../events.js":"node_modules/ol/events.js","../functions.js":"node_modules/ol/functions.js","./Event.js":"node_modules/ol/events/Event.js"}],"node_modules/ol/Observable.js":[function(require,module,exports) {
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
},{"./util.js":"node_modules/ol/util.js","./ObjectEventType.js":"node_modules/ol/ObjectEventType.js","./Observable.js":"node_modules/ol/Observable.js","./events/Event.js":"node_modules/ol/events/Event.js","./obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/layer/Property.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/layer/Property
 */

/**
 * @enum {string}
 */
var _default = {
  OPACITY: 'opacity',
  VISIBLE: 'visible',
  EXTENT: 'extent',
  Z_INDEX: 'zIndex',
  MAX_RESOLUTION: 'maxResolution',
  MIN_RESOLUTION: 'minResolution',
  SOURCE: 'source'
};
exports.default = _default;
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
},{"./asserts.js":"node_modules/ol/asserts.js"}],"node_modules/ol/layer/Base.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = require("../util.js");

var _Object = _interopRequireDefault(require("../Object.js"));

var _Property = _interopRequireDefault(require("./Property.js"));

var _math = require("../math.js");

var _obj = require("../obj.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/layer/Base
 */

/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * Note that with {@link module:ol/layer/Base} and all its subclasses, any property set in
 * the options is set as a {@link module:ol/Object} property on the layer object, so
 * is observable, and has get/set accessors.
 *
 * @api
 */
var BaseLayer =
/*@__PURE__*/
function (BaseObject) {
  function BaseLayer(options) {
    BaseObject.call(this);
    /**
     * @type {Object<string, *>}
     */

    var properties = (0, _obj.assign)({}, options);
    properties[_Property.default.OPACITY] = options.opacity !== undefined ? options.opacity : 1;
    properties[_Property.default.VISIBLE] = options.visible !== undefined ? options.visible : true;
    properties[_Property.default.Z_INDEX] = options.zIndex;
    properties[_Property.default.MAX_RESOLUTION] = options.maxResolution !== undefined ? options.maxResolution : Infinity;
    properties[_Property.default.MIN_RESOLUTION] = options.minResolution !== undefined ? options.minResolution : 0;
    this.setProperties(properties);
    /**
     * @type {import("./Layer.js").State}
     * @private
     */

    this.state_ = null;
    /**
     * The layer type.
     * @type {import("../LayerType.js").default}
     * @protected;
     */

    this.type;
  }

  if (BaseObject) BaseLayer.__proto__ = BaseObject;
  BaseLayer.prototype = Object.create(BaseObject && BaseObject.prototype);
  BaseLayer.prototype.constructor = BaseLayer;
  /**
   * Get the layer type (used when creating a layer renderer).
   * @return {import("../LayerType.js").default} The layer type.
   */

  BaseLayer.prototype.getType = function getType() {
    return this.type;
  };
  /**
   * @return {import("./Layer.js").State} Layer state.
   */


  BaseLayer.prototype.getLayerState = function getLayerState() {
    /** @type {import("./Layer.js").State} */
    var state = this.state_ ||
    /** @type {?} */
    {
      layer: this,
      managed: true
    };
    state.opacity = (0, _math.clamp)(this.getOpacity(), 0, 1);
    state.sourceState = this.getSourceState();
    state.visible = this.getVisible();
    state.extent = this.getExtent();
    state.zIndex = this.getZIndex() || 0;
    state.maxResolution = this.getMaxResolution();
    state.minResolution = Math.max(this.getMinResolution(), 0);
    this.state_ = state;
    return state;
  };
  /**
   * @abstract
   * @param {Array<import("./Layer.js").default>=} opt_array Array of layers (to be
   *     modified in place).
   * @return {Array<import("./Layer.js").default>} Array of layers.
   */


  BaseLayer.prototype.getLayersArray = function getLayersArray(opt_array) {
    return (0, _util.abstract)();
  };
  /**
   * @abstract
   * @param {Array<import("./Layer.js").State>=} opt_states Optional list of layer
   *     states (to be modified in place).
   * @return {Array<import("./Layer.js").State>} List of layer states.
   */


  BaseLayer.prototype.getLayerStatesArray = function getLayerStatesArray(opt_states) {
    return (0, _util.abstract)();
  };
  /**
   * Return the {@link module:ol/extent~Extent extent} of the layer or `undefined` if it
   * will be visible regardless of extent.
   * @return {import("../extent.js").Extent|undefined} The layer extent.
   * @observable
   * @api
   */


  BaseLayer.prototype.getExtent = function getExtent() {
    return (
      /** @type {import("../extent.js").Extent|undefined} */
      this.get(_Property.default.EXTENT)
    );
  };
  /**
   * Return the maximum resolution of the layer.
   * @return {number} The maximum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMaxResolution = function getMaxResolution() {
    return (
      /** @type {number} */
      this.get(_Property.default.MAX_RESOLUTION)
    );
  };
  /**
   * Return the minimum resolution of the layer.
   * @return {number} The minimum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getMinResolution = function getMinResolution() {
    return (
      /** @type {number} */
      this.get(_Property.default.MIN_RESOLUTION)
    );
  };
  /**
   * Return the opacity of the layer (between 0 and 1).
   * @return {number} The opacity of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getOpacity = function getOpacity() {
    return (
      /** @type {number} */
      this.get(_Property.default.OPACITY)
    );
  };
  /**
   * @abstract
   * @return {import("../source/State.js").default} Source state.
   */


  BaseLayer.prototype.getSourceState = function getSourceState() {
    return (0, _util.abstract)();
  };
  /**
   * Return the visibility of the layer (`true` or `false`).
   * @return {boolean} The visibility of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getVisible = function getVisible() {
    return (
      /** @type {boolean} */
      this.get(_Property.default.VISIBLE)
    );
  };
  /**
   * Return the Z-index of the layer, which is used to order layers before
   * rendering. The default Z-index is 0.
   * @return {number} The Z-index of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.getZIndex = function getZIndex() {
    return (
      /** @type {number} */
      this.get(_Property.default.Z_INDEX)
    );
  };
  /**
   * Set the extent at which the layer is visible.  If `undefined`, the layer
   * will be visible at all extents.
   * @param {import("../extent.js").Extent|undefined} extent The extent of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setExtent = function setExtent(extent) {
    this.set(_Property.default.EXTENT, extent);
  };
  /**
   * Set the maximum resolution at which the layer is visible.
   * @param {number} maxResolution The maximum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMaxResolution = function setMaxResolution(maxResolution) {
    this.set(_Property.default.MAX_RESOLUTION, maxResolution);
  };
  /**
   * Set the minimum resolution at which the layer is visible.
   * @param {number} minResolution The minimum resolution of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setMinResolution = function setMinResolution(minResolution) {
    this.set(_Property.default.MIN_RESOLUTION, minResolution);
  };
  /**
   * Set the opacity of the layer, allowed values range from 0 to 1.
   * @param {number} opacity The opacity of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setOpacity = function setOpacity(opacity) {
    this.set(_Property.default.OPACITY, opacity);
  };
  /**
   * Set the visibility of the layer (`true` or `false`).
   * @param {boolean} visible The visibility of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setVisible = function setVisible(visible) {
    this.set(_Property.default.VISIBLE, visible);
  };
  /**
   * Set Z-index of the layer, which is used to order layers before rendering.
   * The default Z-index is 0.
   * @param {number} zindex The z-index of the layer.
   * @observable
   * @api
   */


  BaseLayer.prototype.setZIndex = function setZIndex(zindex) {
    this.set(_Property.default.Z_INDEX, zindex);
  };

  return BaseLayer;
}(_Object.default);

var _default = BaseLayer;
exports.default = _default;
},{"../util.js":"node_modules/ol/util.js","../Object.js":"node_modules/ol/Object.js","./Property.js":"node_modules/ol/layer/Property.js","../math.js":"node_modules/ol/math.js","../obj.js":"node_modules/ol/obj.js"}],"node_modules/ol/render/EventType.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/render/EventType
 */

/**
 * @enum {string}
 */
var _default = {
  /**
   * @event module:ol/render/Event~RenderEvent#postcompose
   * @api
   */
  POSTCOMPOSE: 'postcompose',

  /**
   * @event module:ol/render/Event~RenderEvent#precompose
   * @api
   */
  PRECOMPOSE: 'precompose',

  /**
   * @event module:ol/render/Event~RenderEvent#render
   * @api
   */
  RENDER: 'render',

  /**
   * Triggered when rendering is complete, i.e. all sources and tiles have
   * finished loading for the current viewport, and all tiles are faded in.
   * @event module:ol/render/Event~RenderEvent#rendercomplete
   * @api
   */
  RENDERCOMPLETE: 'rendercomplete'
};
exports.default = _default;
},{}],"node_modules/ol/source/State.js":[function(require,module,exports) {
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
},{}],"node_modules/ol/layer/Layer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.visibleAtResolution = visibleAtResolution;
exports.default = void 0;

var _events = require("../events.js");

var _EventType = _interopRequireDefault(require("../events/EventType.js"));

var _util = require("../util.js");

var _Object = require("../Object.js");

var _Base = _interopRequireDefault(require("./Base.js"));

var _Property = _interopRequireDefault(require("./Property.js"));

var _obj = require("../obj.js");

var _EventType2 = _interopRequireDefault(require("../render/EventType.js"));

var _State = _interopRequireDefault(require("../source/State.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/layer/Layer
 */

/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {import("../source/Source.js").default} [source] Source for this layer.  If not provided to the constructor,
 * the source can be set by calling {@link module:ol/layer/Layer#setSource layer.setSource(source)} after
 * construction.
 * @property {import("../PluggableMap.js").default} [map] Map.
 */

/**
 * @typedef {Object} State
 * @property {import("./Base.js").default} layer
 * @property {number} opacity
 * @property {SourceState} sourceState
 * @property {boolean} visible
 * @property {boolean} managed
 * @property {import("../extent.js").Extent} [extent]
 * @property {number} zIndex
 * @property {number} maxResolution
 * @property {number} minResolution
 */

/**
 * @classdesc
 * Abstract base class; normally only used for creating subclasses and not
 * instantiated in apps.
 * A visual representation of raster or vector map data.
 * Layers group together those properties that pertain to how the data is to be
 * displayed, irrespective of the source of that data.
 *
 * Layers are usually added to a map with {@link module:ol/Map#addLayer}. Components
 * like {@link module:ol/interaction/Select~Select} use unmanaged layers
 * internally. These unmanaged layers are associated with the map using
 * {@link module:ol/layer/Layer~Layer#setMap} instead.
 *
 * A generic `change` event is fired when the state of the source changes.
 *
 * @fires import("../render/Event.js").RenderEvent
 */
var Layer =
/*@__PURE__*/
function (BaseLayer) {
  function Layer(options) {
    var baseOptions = (0, _obj.assign)({}, options);
    delete baseOptions.source;
    BaseLayer.call(this, baseOptions);
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    this.mapPrecomposeKey_ = null;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    this.mapRenderKey_ = null;
    /**
     * @private
     * @type {?import("../events.js").EventsKey}
     */

    this.sourceChangeKey_ = null;

    if (options.map) {
      this.setMap(options.map);
    }

    (0, _events.listen)(this, (0, _Object.getChangeEventType)(_Property.default.SOURCE), this.handleSourcePropertyChange_, this);
    var source = options.source ? options.source : null;
    this.setSource(source);
  }

  if (BaseLayer) Layer.__proto__ = BaseLayer;
  Layer.prototype = Object.create(BaseLayer && BaseLayer.prototype);
  Layer.prototype.constructor = Layer;
  /**
   * @inheritDoc
   */

  Layer.prototype.getLayersArray = function getLayersArray(opt_array) {
    var array = opt_array ? opt_array : [];
    array.push(this);
    return array;
  };
  /**
   * @inheritDoc
   */


  Layer.prototype.getLayerStatesArray = function getLayerStatesArray(opt_states) {
    var states = opt_states ? opt_states : [];
    states.push(this.getLayerState());
    return states;
  };
  /**
   * Get the layer source.
   * @return {import("../source/Source.js").default} The layer source (or `null` if not yet set).
   * @observable
   * @api
   */


  Layer.prototype.getSource = function getSource() {
    var source = this.get(_Property.default.SOURCE);
    return (
      /** @type {import("../source/Source.js").default} */
      source || null
    );
  };
  /**
    * @inheritDoc
    */


  Layer.prototype.getSourceState = function getSourceState() {
    var source = this.getSource();
    return !source ? _State.default.UNDEFINED : source.getState();
  };
  /**
   * @private
   */


  Layer.prototype.handleSourceChange_ = function handleSourceChange_() {
    this.changed();
  };
  /**
   * @private
   */


  Layer.prototype.handleSourcePropertyChange_ = function handleSourcePropertyChange_() {
    if (this.sourceChangeKey_) {
      (0, _events.unlistenByKey)(this.sourceChangeKey_);
      this.sourceChangeKey_ = null;
    }

    var source = this.getSource();

    if (source) {
      this.sourceChangeKey_ = (0, _events.listen)(source, _EventType.default.CHANGE, this.handleSourceChange_, this);
    }

    this.changed();
  };
  /**
   * Sets the layer to be rendered on top of other layers on a map. The map will
   * not manage this layer in its layers collection, and the callback in
   * {@link module:ol/Map#forEachLayerAtPixel} will receive `null` as layer. This
   * is useful for temporary layers. To remove an unmanaged layer from the map,
   * use `#setMap(null)`.
   *
   * To add the layer to a map and have it managed by the map, use
   * {@link module:ol/Map#addLayer} instead.
   * @param {import("../PluggableMap.js").default} map Map.
   * @api
   */


  Layer.prototype.setMap = function setMap(map) {
    if (this.mapPrecomposeKey_) {
      (0, _events.unlistenByKey)(this.mapPrecomposeKey_);
      this.mapPrecomposeKey_ = null;
    }

    if (!map) {
      this.changed();
    }

    if (this.mapRenderKey_) {
      (0, _events.unlistenByKey)(this.mapRenderKey_);
      this.mapRenderKey_ = null;
    }

    if (map) {
      this.mapPrecomposeKey_ = (0, _events.listen)(map, _EventType2.default.PRECOMPOSE, function (evt) {
        var renderEvent =
        /** @type {import("../render/Event.js").default} */
        evt;
        var layerState = this.getLayerState();
        layerState.managed = false;

        if (this.getZIndex() === undefined) {
          layerState.zIndex = Infinity;
        }

        renderEvent.frameState.layerStatesArray.push(layerState);
        renderEvent.frameState.layerStates[(0, _util.getUid)(this)] = layerState;
      }, this);
      this.mapRenderKey_ = (0, _events.listen)(this, _EventType.default.CHANGE, map.render, map);
      this.changed();
    }
  };
  /**
   * Set the layer source.
   * @param {import("../source/Source.js").default} source The layer source.
   * @observable
   * @api
   */


  Layer.prototype.setSource = function setSource(source) {
    this.set(_Property.default.SOURCE, source);
  };

  return Layer;
}(_Base.default);
/**
 * Return `true` if the layer is visible, and if the passed resolution is
 * between the layer's minResolution and maxResolution. The comparison is
 * inclusive for `minResolution` and exclusive for `maxResolution`.
 * @param {State} layerState Layer state.
 * @param {number} resolution Resolution.
 * @return {boolean} The layer is visible at the given resolution.
 */


function visibleAtResolution(layerState, resolution) {
  return layerState.visible && resolution >= layerState.minResolution && resolution < layerState.maxResolution;
}

var _default = Layer;
exports.default = _default;
},{"../events.js":"node_modules/ol/events.js","../events/EventType.js":"node_modules/ol/events/EventType.js","../util.js":"node_modules/ol/util.js","../Object.js":"node_modules/ol/Object.js","./Base.js":"node_modules/ol/layer/Base.js","./Property.js":"node_modules/ol/layer/Property.js","../obj.js":"node_modules/ol/obj.js","../render/EventType.js":"node_modules/ol/render/EventType.js","../source/State.js":"node_modules/ol/source/State.js"}],"node_modules/ol/layer/TileProperty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * @module ol/layer/TileProperty
 */

/**
 * @enum {string}
 */
var _default = {
  PRELOAD: 'preload',
  USE_INTERIM_TILES_ON_ERROR: 'useInterimTilesOnError'
};
exports.default = _default;
},{}],"node_modules/ol/layer/Tile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _LayerType = _interopRequireDefault(require("../LayerType.js"));

var _Layer = _interopRequireDefault(require("./Layer.js"));

var _TileProperty = _interopRequireDefault(require("./TileProperty.js"));

var _obj = require("../obj.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @module ol/layer/Tile
 */

/**
 * @typedef {Object} Options
 * @property {number} [opacity=1] Opacity (0, 1).
 * @property {boolean} [visible=true] Visibility.
 * @property {import("../extent.js").Extent} [extent] The bounding extent for layer rendering.  The layer will not be
 * rendered outside of this extent.
 * @property {number} [zIndex] The z-index for layer rendering.  At rendering time, the layers
 * will be ordered, first by Z-index and then by position. When `undefined`, a `zIndex` of 0 is assumed
 * for layers that are added to the map's `layers` collection, or `Infinity` when the layer's `setMap()`
 * method was used.
 * @property {number} [minResolution] The minimum resolution (inclusive) at which this layer will be
 * visible.
 * @property {number} [maxResolution] The maximum resolution (exclusive) below which this layer will
 * be visible.
 * @property {number} [preload=0] Preload. Load low-resolution tiles up to `preload` levels. `0`
 * means no preloading.
 * @property {import("../source/Tile.js").default} [source] Source for this layer.
 * @property {import("../PluggableMap.js").default} [map] Sets the layer as overlay on a map. The map will not manage
 * this layer in its layers collection, and the layer will be rendered on top. This is useful for
 * temporary layers. The standard way to add a layer to a map and have it managed by the map is to
 * use {@link module:ol/Map#addLayer}.
 * @property {boolean} [useInterimTilesOnError=true] Use interim tiles on error.
 */

/**
 * @classdesc
 * For layer sources that provide pre-rendered, tiled images in grids that are
 * organized by zoom levels for specific resolutions.
 * Note that any property set in the options is set as a {@link module:ol/Object~BaseObject}
 * property on the layer object; for example, setting `title: 'My Title'` in the
 * options means that `title` is observable, and has get/set accessors.
 *
 * @api
 */
var TileLayer =
/*@__PURE__*/
function (Layer) {
  function TileLayer(opt_options) {
    var options = opt_options ? opt_options : {};
    var baseOptions = (0, _obj.assign)({}, options);
    delete baseOptions.preload;
    delete baseOptions.useInterimTilesOnError;
    Layer.call(this, baseOptions);
    this.setPreload(options.preload !== undefined ? options.preload : 0);
    this.setUseInterimTilesOnError(options.useInterimTilesOnError !== undefined ? options.useInterimTilesOnError : true);
    /**
    * The layer type.
    * @protected
    * @type {import("../LayerType.js").default}
    */

    this.type = _LayerType.default.TILE;
  }

  if (Layer) TileLayer.__proto__ = Layer;
  TileLayer.prototype = Object.create(Layer && Layer.prototype);
  TileLayer.prototype.constructor = TileLayer;
  /**
  * Return the level as number to which we will preload tiles up to.
  * @return {number} The level to preload tiles up to.
  * @observable
  * @api
  */

  TileLayer.prototype.getPreload = function getPreload() {
    return (
      /** @type {number} */
      this.get(_TileProperty.default.PRELOAD)
    );
  };
  /**
  * Set the level as number to which we will preload tiles up to.
  * @param {number} preload The level to preload tiles up to.
  * @observable
  * @api
  */


  TileLayer.prototype.setPreload = function setPreload(preload) {
    this.set(_TileProperty.default.PRELOAD, preload);
  };
  /**
  * Whether we use interim tiles on error.
  * @return {boolean} Use interim tiles on error.
  * @observable
  * @api
  */


  TileLayer.prototype.getUseInterimTilesOnError = function getUseInterimTilesOnError() {
    return (
      /** @type {boolean} */
      this.get(_TileProperty.default.USE_INTERIM_TILES_ON_ERROR)
    );
  };
  /**
  * Set whether we use interim tiles on error.
  * @param {boolean} useInterimTilesOnError Use interim tiles on error.
  * @observable
  * @api
  */


  TileLayer.prototype.setUseInterimTilesOnError = function setUseInterimTilesOnError(useInterimTilesOnError) {
    this.set(_TileProperty.default.USE_INTERIM_TILES_ON_ERROR, useInterimTilesOnError);
  };

  return TileLayer;
}(_Layer.default);
/**
 * Return the associated {@link module:ol/source/Tile tilesource} of the layer.
 * @function
 * @return {import("../source/Tile.js").default} Source.
 * @api
 */


TileLayer.prototype.getSource;
var _default = TileLayer;
exports.default = _default;
},{"../LayerType.js":"node_modules/ol/LayerType.js","./Layer.js":"node_modules/ol/layer/Layer.js","./TileProperty.js":"node_modules/ol/layer/TileProperty.js","../obj.js":"node_modules/ol/obj.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","node_modules/ol/layer/Tile.js"], null)
//# sourceMappingURL=/Tile.34aafbbc.js.map