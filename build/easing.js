(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mojs-easing"] = factory();
	else
		root["mojs-easing"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var parsePath = function (path) {
      var domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      domPath.setAttributeNS(null, 'd', path);
      return domPath;
    };

    var sample = function (path, n) {
      var step = 1 / n;
      var totalLength = path.getTotalLength();
      // create the samples map and save main properties
      var samples = [];
      // samples the path, `key` is in range of [0..1]
      for (var i = 0; i < n + 1; i++) {
        var point = path.getPointAtLength(i * step * totalLength);
        samples[i] = {
          x: point.x / 100,
          y: point.y / 100
        };
      }

      return samples;
    };

    var findY = function (key, samples, n) {
      var start = 0;
      var end = samples.length - 1;
      var step = 1 / n;
      // find `start`/`end` bounds with binary search
      while (Math.abs(end - start) > 1) {
        var delta = end - start;
        var middle = start + Math.floor(delta / 2);
        var _value = samples[middle];

        if (key === _value.x) {
          return _value.y;
        }
        // shift a bound regarding the `value.x` value
        if (key < _value.x) {
          end = middle;
        } else {
          start = middle;
        }
      }
      // when the loop stops - we've found `start` and `end` bounds
      var value = samples[start];
      // if key is greate than `start` - normalize it
      if (key > value.x) {
        var nextValue = samples[start + 1];
        if (nextValue !== undefined) {
          var diff = value.x - key;
          return value.y - (nextValue.y - value.y) * (diff / step);
        }
      }

      return value.y;
    };

    var translateSamples = function (samples, n) {
      var map = new Map();
      var step = 1 / n;
      // samples the path, `key` is in range of [0..1]
      for (var i = 0; i < n + 1; i++) {
        var key = i * step;
        map.set(key, 1 - findY(key, samples, n));
      }

      return map;
    };

    var path = function (pathCoordinates) {
      var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;

      var preSamples = sample(parsePath(pathCoordinates), n);
      var samples = translateSamples(preSamples, n);
      var step = 1 / n;

      return function (p) {
        var index = p / step | 0; // convert to integer
        var key = index * step; // get the key
        var nextKey = (index + 1) * step; // get the next key
        var y = samples.get(key); // get the y
        // if next key is present, calculate the normalized y
        // regarding the progress error
        if (nextKey <= 1) {
          var nextY = samples.get(nextKey);
          y += (nextY - y) * ((p - key) / step);
        }

        return y;
      };
    };

    exports.path = path;
  });
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

(function webpackUniversalModuleDefinition(root, factory) {
	if(true)
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mojs-pow-easing"] = factory();
	else
		root["mojs-pow-easing"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.mojs = mod.exports;
  }
})(this, function (module, exports) {
  "use strict";

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports);
      global.mojs = mod.exports;
    }
  })(undefined, function (module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    /*
     * Generate power easing.
     *
     * @param {Number} p Easing power.
     * @returns {Function} Easing function with the defined power.
     */
    var pow = function () {
      var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 2;

      var easeIn = function (k) {
        return function (t) {
          return Math.pow(t, k);
        };
      }(p);
      var easeOut = function (k) {
        return function (t) {
          return 1 - Math.abs(Math.pow(t - 1, k));
        };
      }(p);

      return {
        in: easeIn,
        out: easeOut,
        inout: function (t) {
          return t < .5 ? easeIn(t * 2) / 2 : easeOut(t * 2 - 1) / 2 + .5;
        }
      };
    };

    exports.default = pow;
    module.exports = exports["default"];
  });
});

/***/ })
/******/ ]);
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(3);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(module, exports, require('mojs-pow-easing'), require('./path.babel.js'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports, global.mojsPowEasing, global.pathBabel);
    global.mojs = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  (function (global, factory) {
    if (true) {
      !(__WEBPACK_AMD_DEFINE_ARRAY__ = [module, exports, __webpack_require__(1), __webpack_require__(0)], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
      factory(module, exports);
    } else {
      var mod = {
        exports: {}
      };
      factory(mod, mod.exports, global.mojsPowEasing, global.pathBabel);
      global.mojs = mod.exports;
    }
  })(undefined, function (module, exports, _mojsPowEasing, _pathBabel) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var _mojsPowEasing2 = _interopRequireDefault(_mojsPowEasing);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    var CONSOLE_NAME = ':mojs :';
    var DEFAULT_EASING = ['sin', 'out'];
    var DEFAULT_EASING_STRING = DEFAULT_EASING.join('.');

    /**
     * `easing` - object that holds all easing avaliable in `mojs`.
     */
    var easing = {
      /**
       * `Linear` easing, also `null` or `id` easing - simply returns whatever
       * passed to the function.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      linear: { none: function (k) {
          return k;
        } },

      /**
       * `Sin` easing. Has `in`/`out`/`inout` options.
       * @param {Number} Progress in range of `[0...1]`
       * @returns {Number} Eased progress in range of `[0...1]`
       */
      sin: {
        in: function (k) {
          return 1 - Math.cos(k * Math.PI / 2);
        },
        out: function (k) {
          return Math.sin(k * Math.PI / 2);
        },
        inout: function (k) {
          return 0.5 * (1 - Math.cos(Math.PI * k));
        }
      },

      pow: _mojsPowEasing2.default,
      path: _pathBabel.path,

      parseEasing: function () {
        var ease = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_EASING_STRING;

        var type = typeof ease;

        switch (type) {
          case 'function':
            {
              return ease;
            }
          case 'string':
            {
              // path easing
              if (ease[0].toLowerCase() === 'm') {
                return (0, _pathBabel.path)(ease);
              }

              ease = ease.toLowerCase().split('.');
              var easeParent = easing[ease[0]];

              if (!easeParent) {
                console.error(CONSOLE_NAME + ' Easing with name "' + ease[0] + '" wasn\'t found, fallback to "' + DEFAULT_EASING_STRING + '" instead.', easing); // eslint-disable-line no-console

                return easing[DEFAULT_EASING[0]][DEFAULT_EASING[1]];
              }
              return easeParent[ease[1]];
            }
          default:
            console.error(CONSOLE_NAME + ' Only strings and function supported atm.', ease); // eslint-disable-line no-console
        }
      }
    };

    exports.default = easing;
    module.exports = exports['default'];
  });
});

/***/ })
/******/ ]);
});