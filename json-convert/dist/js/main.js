/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 711:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "B9": () => (/* binding */ convertTargetList),
/* harmony export */   "TZ": () => (/* binding */ convertMap),
/* harmony export */   "U": () => (/* binding */ convertConfig),
/* harmony export */   "el": () => (/* binding */ convertSourceList)
/* harmony export */ });
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function isJs(data) {
  try {
    str2js(data);
  } catch (e) {
    return false;
  }

  return true;
}

function isPhp(data) {
  var language_keywords = ["{"];

  for (var _i = 0, _language_keywords = language_keywords; _i < _language_keywords.length; _i++) {
    var keyword = _language_keywords[_i];

    if (data.includes(keyword)) {
      return false;
    }
  }

  return true;
}

function str2js(data) {
  return eval(data);
}

function json2js(data) {
  return JSON.parse(data);
}

function js2json(data) {
  return JSON.stringify(data, null, 2);
}
/**
 * 查询字符串转json
 *
 * @param {*} querystring
 * @returns
 */


function querystring2js(querystring) {
  var searchParams = new URLSearchParams(querystring);
  var data = {};

  var _iterator = _createForOfIteratorHelper(searchParams.entries()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var _step$value = _slicedToArray(_step.value, 2),
          key = _step$value[0],
          value = _step$value[1];

      data[key] = value;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return data;
}

function json2php(data) {
  var replace_map = {
    "{": "[",
    "}": "]",
    '": ': '"=> '
  };

  for (var _i2 = 0, _Object$entries = Object.entries(replace_map); _i2 < _Object$entries.length; _i2++) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
        key = _Object$entries$_i[0],
        value = _Object$entries$_i[1];

    data = data.replaceAll(key, value);
  }

  return data;
}

function php2json(data) {
  var replace_map = {
    "=>": ":"
  };

  for (var _i3 = 0, _Object$entries2 = Object.entries(replace_map); _i3 < _Object$entries2.length; _i3++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i3], 2),
        key = _Object$entries2$_i[0],
        value = _Object$entries2$_i[1];

    data = data.replaceAll(key, value);
  }

  return data;
}

var convertConfig = [{
  source: "querystring",
  target: "json",
  converter: function converter(data) {
    return js2json(querystring2js(data));
  }
}, {
  source: "js",
  target: "json",
  converter: function converter(data) {
    return js2json(str2js(data));
  }
}, {
  source: "php",
  target: "json",
  converter: php2json
}, {
  source: "json",
  target: "json",
  converter: function converter(data) {
    return js2json(json2js(data));
  }
}, {
  source: "json",
  target: "php",
  converter: function converter(data) {
    return json2php(js2json(json2js(data)));
  }
}];
var convert_map = {};
var convert_source_list = new Set();
var convert_target_list = new Set();

for (var _i4 = 0, _convertConfig = convertConfig; _i4 < _convertConfig.length; _i4++) {
  var config = _convertConfig[_i4];
  convert_map["".concat(config.source, "-").concat(config.target)] = config.converter;
  convert_source_list.add(config.source);
  convert_target_list.add(config.target);
}

var convertMap = convert_map;
var convertSourceList = convert_source_list;
var convertTargetList = convert_target_list;

/***/ }),

/***/ 348:
/***/ (() => {

String.prototype.replaceAll = function (pattern, replaceValue) {
  return this.replace(new RegExp(pattern, 'g'), replaceValue);
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/* harmony import */ var _string_polyfill_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(348);
/* harmony import */ var _string_polyfill_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_string_polyfill_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _convert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(711);
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }





function setErrorMessage(text) {
  document.getElementById("error-message").innerText = text;
}

function initSelector() {
  // 输入选项
  var input_select = document.getElementById("input-select");

  var _iterator = _createForOfIteratorHelper(_convert__WEBPACK_IMPORTED_MODULE_1__/* .convertSourceList */ .el),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var item = _step.value;
      var option = document.createElement("option");
      option.value = item;
      option.innerText = item;
      input_select.appendChild(option);
    } // 输出选项

  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  var output_select = document.getElementById("output-select");

  var _iterator2 = _createForOfIteratorHelper(_convert__WEBPACK_IMPORTED_MODULE_1__/* .convertTargetList */ .B9),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _item = _step2.value;

      var _option = document.createElement("option");

      _option.value = _item;
      _option.innerText = _item;
      output_select.appendChild(_option);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}

function handleConvert() {
  setErrorMessage("");
  var input_value = document.getElementById("input-textarea").value;
  var input_type = document.getElementById("input-select").value;
  var output_type = document.getElementById("output-select").value || "json";
  console.log(input_type, output_type, input_value);

  if (input_type) {
    var converter = _convert__WEBPACK_IMPORTED_MODULE_1__/* .convertMap */ .TZ["".concat(input_type, "-").concat(output_type)]; // let output_convert_func = convertMap[`json-${output_type}`];

    try {
      // let output_value = output_convert_func(input_convert_func(input_value));
      var output_value = converter(input_value);
      document.getElementById("output-textarea").value = output_value;
    } catch (e) {
      setErrorMessage(e);
    }
  } else {
    // 自动识别类型
    var outputconvertConfig = _convert__WEBPACK_IMPORTED_MODULE_1__/* .convertConfig.filter */ .U.filter(function (item) {
      return item.target == output_type;
    });

    var _iterator3 = _createForOfIteratorHelper(outputconvertConfig),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var config = _step3.value;
        var _converter = config.converter;

        try {
          // let output_value = output_convert_func(input_convert_func(input_value));
          var _output_value = _converter(input_value);

          document.getElementById("output-textarea").value = _output_value; // document.getElementById("input-select").value = config.source;

          console.log(config.source, '=>', output_type);
          break;
        } catch (e) {
          console.log(e);
        }
      } // let output_convert_func = convertMap[`json-${output_type}`];

    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
}

window.handleConvert = handleConvert; // window.handleInputChange = handleConvert;

var list = [{
  name: "Tom",
  age: 23
}, {
  name: "Jack",
  age: 24
}];
document.getElementById("input-textarea").value = JSON.stringify(list); // document.getElementById('input-textarea').value = '[["name"=>"Tom","age"=>23],["name"=>"Jack","age"=>24]]'
// console.log(js2php(list));

(function () {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM has loaded");
    initSelector();
  });
})();
})();

/******/ })()
;