(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("moment"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "moment"], factory);
	else if(typeof exports === 'object')
		exports["ReactAddToCalendar"] = factory(require("react"), require("moment"));
	else
		root["ReactAddToCalendar"] = factory(root["React"], root["moment"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(2);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _helpers = __webpack_require__(5);

	var _helpers2 = _interopRequireDefault(_helpers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var helpers = new _helpers2.default();

	var ReactAddToCalendar = function (_React$Component) {
	  _inherits(ReactAddToCalendar, _React$Component);

	  function ReactAddToCalendar(props) {
	    _classCallCheck(this, ReactAddToCalendar);

	    var _this = _possibleConstructorReturn(this, (ReactAddToCalendar.__proto__ || Object.getPrototypeOf(ReactAddToCalendar)).call(this, props));

	    _this.state = {
	      optionsOpen: props.optionsOpen || false,
	      isCrappyIE: false
	    };

	    _this.toggleCalendarDropdown = _this.toggleCalendarDropdown.bind(_this);
	    _this.handleDropdownLinkClick = _this.handleDropdownLinkClick.bind(_this);
	    return _this;
	  }

	  _createClass(ReactAddToCalendar, [{
	    key: "componentWillMount",
	    value: function componentWillMount() {
	      // polyfill for startsWith to fix IE bug
	      if (!String.prototype.startsWith) {
	        String.prototype.startsWith = function (searchString, position) {
	          position = position || 0;
	          return this.indexOf(searchString, position) === position;
	        };
	      }

	      var isCrappyIE = false;
	      if (typeof window !== "undefined" && window.navigator.msSaveOrOpenBlob && window.Blob) {
	        isCrappyIE = true;
	      }

	      this.setState({ isCrappyIE: isCrappyIE });
	    }
	  }, {
	    key: "toggleCalendarDropdown",
	    value: function toggleCalendarDropdown() {
	      var showOptions = !this.state.optionsOpen;

	      if (showOptions) {
	        document.addEventListener("click", this.toggleCalendarDropdown, false);
	      } else {
	        document.removeEventListener("click", this.toggleCalendarDropdown);
	      }

	      this.setState({ optionsOpen: showOptions });
	    }
	  }, {
	    key: "handleDropdownLinkClick",
	    value: function handleDropdownLinkClick(e) {
	      e.preventDefault();
	      var url = e.currentTarget.getAttribute("href");

	      if (!helpers.isMobile() && (url.startsWith("data") || url.startsWith("BEGIN"))) {
	        var filename = "download.ics";
	        var blob = new Blob([url], { type: "text/calendar;charset=utf-8" });

	        if (this.state.isCrappyIE) {
	          window.navigator.msSaveOrOpenBlob(blob, filename);
	        } else {
	          /****************************************************************
	          // many browsers do not properly support downloading data URIs
	          // (even with "download" attribute in use) so this solution
	          // ensures the event will download cross-browser
	          ****************************************************************/
	          var link = document.createElement("a");
	          link.href = window.URL.createObjectURL(blob);
	          link.setAttribute("download", filename);
	          document.body.appendChild(link);
	          link.click();
	          document.body.removeChild(link);
	        }
	      } else {
	        window.open(url, "_blank");
	      }

	      this.toggleCalendarDropdown();
	    }
	  }, {
	    key: "renderDropdown",
	    value: function renderDropdown() {
	      var self = this;

	      var items = this.props.listItems.map(function (listItem) {
	        var currentItem = Object.keys(listItem)[0];
	        var currentLabel = listItem[currentItem];

	        var icon = null;
	        if (self.props.displayItemIcons) {
	          var currentIcon = currentItem === "outlook" || currentItem === "outlookcom" ? "windows" : currentItem;
	          icon = _react2.default.createElement("i", { className: "fa fa-" + currentIcon });
	        }

	        return _react2.default.createElement(
	          "li",
	          { key: helpers.getRandomKey() },
	          _react2.default.createElement(
	            "a",
	            {
	              className: currentItem + "-link",
	              onClick: self.handleDropdownLinkClick,
	              href: helpers.buildUrl(self.props.event, currentItem, self.state.isCrappyIE),
	              target: "_blank"
	            },
	            icon,
	            currentLabel
	          )
	        );
	      });

	      return _react2.default.createElement(
	        "div",
	        { className: this.props.dropdownClass },
	        _react2.default.createElement(
	          "ul",
	          null,
	          items
	        )
	      );
	    }
	  }, {
	    key: "renderButton",
	    value: function renderButton() {
	      var buttonLabel = this.props.buttonLabel;
	      var buttonIcon = null;
	      var template = Object.keys(this.props.buttonTemplate);

	      if (template[0] !== "textOnly") {
	        var iconPlacement = this.props.buttonTemplate[template];
	        var buttonClassPrefix = this.props.buttonIconClass === "react-add-to-calendar__icon--" ? "" + this.props.buttonIconClass + iconPlacement : this.props.buttonIconClass;
	        var iconPrefix = this.props.useFontAwesomeIcons ? "fa fa-" : "";

	        var mainButtonIconClass = template[0] === "caret" ? this.state.optionsOpen ? "caret-up" : "caret-down" : template[0];

	        var buttonIconClass = buttonClassPrefix + " " + iconPrefix + mainButtonIconClass;

	        buttonIcon = _react2.default.createElement("i", { className: buttonIconClass });
	        buttonLabel = iconPlacement === "right" ? _react2.default.createElement(
	          "span",
	          null,
	          buttonLabel + " ",
	          buttonIcon
	        ) : _react2.default.createElement(
	          "span",
	          null,
	          buttonIcon,
	          " " + buttonLabel
	        );
	      }

	      var buttonClass = this.state.optionsOpen ? this.props.buttonClassClosed + " " + this.props.buttonClassOpen : this.props.buttonClassClosed;

	      return _react2.default.createElement(
	        "div",
	        { className: this.props.buttonWrapperClass },
	        _react2.default.createElement(
	          "a",
	          { className: buttonClass, onClick: this.toggleCalendarDropdown },
	          buttonLabel
	        )
	      );
	    }
	  }, {
	    key: "render",
	    value: function render() {
	      var options = null;
	      if (this.state.optionsOpen) {
	        options = this.renderDropdown();
	      }

	      var addToCalendarBtn = null;
	      if (this.props.event) {
	        addToCalendarBtn = this.renderButton();
	      }

	      return _react2.default.createElement(
	        "div",
	        { className: this.props.rootClass },
	        addToCalendarBtn,
	        options
	      );
	    }
	  }]);

	  return ReactAddToCalendar;
	}(_react2.default.Component);

	exports.default = ReactAddToCalendar;


	ReactAddToCalendar.displayName = "Add To Calendar";

	ReactAddToCalendar.propTypes = {
	  buttonClassClosed: _propTypes2.default.string,
	  buttonClassOpen: _propTypes2.default.string,
	  buttonLabel: _propTypes2.default.string,
	  buttonTemplate: _propTypes2.default.object,
	  buttonIconClass: _propTypes2.default.string,
	  useFontAwesomeIcons: _propTypes2.default.bool,
	  buttonWrapperClass: _propTypes2.default.string,
	  displayItemIcons: _propTypes2.default.bool,
	  optionsOpen: _propTypes2.default.bool,
	  dropdownClass: _propTypes2.default.string,
	  event: _propTypes2.default.shape({
	    title: _propTypes2.default.string,
	    description: _propTypes2.default.string,
	    googleDescription: _propTypes2.default.string,
	    location: _propTypes2.default.string,
	    startTime: _propTypes2.default.string,
	    endTime: _propTypes2.default.string
	  }).isRequired,
	  listItems: _propTypes2.default.arrayOf(_propTypes2.default.object),
	  rootClass: _propTypes2.default.string
	};

	ReactAddToCalendar.defaultProps = {
	  buttonClassClosed: "react-add-to-calendar__button",
	  buttonClassOpen: "react-add-to-calendar__button--light",
	  buttonLabel: "Add to My Calendar",
	  buttonTemplate: { caret: "right" },
	  buttonIconClass: "react-add-to-calendar__icon--",
	  useFontAwesomeIcons: true,
	  buttonWrapperClass: "react-add-to-calendar__wrapper",
	  displayItemIcons: true,
	  optionsOpen: false,
	  dropdownClass: "react-add-to-calendar__dropdown",
	  event: {
	    title: "Sample Event",
	    description: "This is the sample event provided as an example only",
	    location: "Portland, OR",
	    startTime: "2016-09-16T20:15:00-04:00",
	    endTime: "2016-09-16T21:45:00-04:00"
	  },
	  listItems: [{ apple: "Apple Calendar" }, { google: "Google" }, { outlook: "Outlook" }, { outlookcom: "Outlook.com" }, { yahoo: "Yahoo" }],
	  rootClass: "react-add-to-calendar"
	};

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	if (false) {
	  var ReactIs = require('react-is');

	  // By explicitly using `prop-types` you are opting into new development behavior.
	  // http://fb.me/prop-types-in-prod
	  var throwOnDirectAccess = true;
	  module.exports = require('./factoryWithTypeCheckers')(ReactIs.isElement, throwOnDirectAccess);
	} else {
	  // By explicitly using `prop-types` you are opting into new production behavior.
	  // http://fb.me/prop-types-in-prod
	  module.exports = __webpack_require__(3)();
	}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = __webpack_require__(4);

	function emptyFunction() {}
	function emptyFunctionWithReset() {}
	emptyFunctionWithReset.resetWarningCache = emptyFunction;

	module.exports = function() {
	  function shim(props, propName, componentName, location, propFullName, secret) {
	    if (secret === ReactPropTypesSecret) {
	      // It is still safe when called from React.
	      return;
	    }
	    var err = new Error(
	      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
	      'Use PropTypes.checkPropTypes() to call them. ' +
	      'Read more at http://fb.me/use-check-prop-types'
	    );
	    err.name = 'Invariant Violation';
	    throw err;
	  };
	  shim.isRequired = shim;
	  function getShim() {
	    return shim;
	  };
	  // Important!
	  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
	  var ReactPropTypes = {
	    array: shim,
	    bool: shim,
	    func: shim,
	    number: shim,
	    object: shim,
	    string: shim,
	    symbol: shim,

	    any: shim,
	    arrayOf: getShim,
	    element: shim,
	    elementType: shim,
	    instanceOf: getShim,
	    node: shim,
	    objectOf: getShim,
	    oneOf: getShim,
	    oneOfType: getShim,
	    shape: getShim,
	    exact: getShim,

	    checkPropTypes: emptyFunctionWithReset,
	    resetWarningCache: emptyFunction
	  };

	  ReactPropTypes.PropTypes = ReactPropTypes;

	  return ReactPropTypes;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	/**
	 * Copyright (c) 2013-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	'use strict';

	var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

	module.exports = ReactPropTypesSecret;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _moment = __webpack_require__(6);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var helpers = function () {
	  function helpers() {
	    _classCallCheck(this, helpers);
	  }

	  _createClass(helpers, [{
	    key: "getRandomKey",
	    value: function getRandomKey() {
	      var n = Math.floor(Math.random() * 999999999999).toString();
	      return new Date().getTime().toString() + "_" + n;
	    }
	  }, {
	    key: "formatStartDate",
	    value: function formatStartDate(date) {
	      // To deal with dates changing as a result of timezone
	      //   formattedDate should be date and not a datetime
	      var formattedDate = _moment2.default.utc(date).format("YYYYMMDD");
	      return formattedDate;
	    }
	  }, {
	    key: "formatEndDate",
	    value: function formatEndDate(date) {
	      // Extra day is added because an event from 20180101-20190102
	      //   is considered a single all day event for Jan 1 as a opposed to event that's 2 days
	      var formattedDate = _moment2.default.utc(date).add(1, 'd').format("YYYYMMDD");
	      return formattedDate;
	    }
	  }, {
	    key: "calculateDuration",
	    value: function calculateDuration(startTime, endTime) {
	      // snag parameters and format properly in UTC
	      var end = _moment2.default.utc(endTime).format("DD/MM/YYYY HH:mm:ss");
	      var start = _moment2.default.utc(startTime).format("DD/MM/YYYY HH:mm:ss");

	      // calculate the difference in milliseconds between the start and end times
	      var difference = (0, _moment2.default)(end, "DD/MM/YYYY HH:mm:ss").diff((0, _moment2.default)(start, "DD/MM/YYYY HH:mm:ss"));

	      // convert difference from above to a proper momentJs duration object
	      var duration = _moment2.default.duration(difference);

	      return Math.floor(duration.asHours()) + _moment2.default.utc(difference).format(":mm");
	    }
	  }, {
	    key: "buildUrl",
	    value: function buildUrl(event, type, isCrappyIE) {
	      var calendarUrl = "";
	      var formattedDescription = "";
	      // allow mobile browsers to open the gmail data URI within native calendar app
	      // type = (type == "google" && this.isMobile()) ? "outlook" : type;

	      switch (type) {
	        case "google":
	          // gcal events allow for text bolding so made a special description for google
	          formattedDescription = event.googleDescription ? event.googleDescription : event.description;
	          calendarUrl = "https://calendar.google.com/calendar/render";
	          calendarUrl += "?action=TEMPLATE";
	          calendarUrl += "&dates=" + this.formatStartDate(event.startTime);
	          calendarUrl += "/" + this.formatEndDate(event.endTime);
	          calendarUrl += "&location=" + encodeURIComponent(event.location);
	          calendarUrl += "&text=" + encodeURIComponent(event.title);
	          calendarUrl += "&details=" + encodeURIComponent(formattedDescription);
	          break;

	        case "yahoo":
	          // yahoo's description adds leading whitespace
	          formattedDescription = event.description.replace(/^[' '\t]+/gm, '');
	          var duration = this.calculateDuration(event.startTime, event.endTime);
	          calendarUrl = "https://calendar.yahoo.com/?v=60&view=d&type=20";
	          calendarUrl += "&title=" + encodeURIComponent(event.title);
	          calendarUrl += "&st=" + this.formatStartDate(event.startTime);
	          calendarUrl += "&dur=allday";
	          // formatStartDate is used intentionally because yahoo interprets an event
	          //   from 20180101-20180102 as a 2 day long event instead of 1 day like the others
	          calendarUrl += "&et=" + this.formatStartDate(event.endTime);
	          calendarUrl += "&desc=" + encodeURIComponent(formattedDescription);
	          calendarUrl += "&in_loc=" + encodeURIComponent(event.location);
	          break;

	        case "outlookcom":
	          calendarUrl = "https://outlook.live.com/owa/?rru=addevent";
	          calendarUrl += "&startdt=" + this.formatStartDate(event.startTime);
	          calendarUrl += "&enddt=" + this.formatEndDate(event.endTime);
	          calendarUrl += "&subject=" + encodeURIComponent(event.title);
	          calendarUrl += "&location=" + encodeURIComponent(event.location);
	          calendarUrl += "&body=" + encodeURIComponent(event.description);
	          calendarUrl += "&allday=false";
	          calendarUrl += "&uid=" + this.getRandomKey();
	          calendarUrl += "&path=/calendar/view/Month";
	          break;

	        default:
	          // For some reason, \n in the string would show up as a tab instead of a linebreak
	          //   Replacing \n with \\n allows the linebreaks to properly show up as a linebreak
	          // TODO Find a less hacky way to resolve this
	          formattedDescription = event.description.replace(/\n/gm, '\\n').replace(/(\\n)[\s\t]+/gm, "\\n");
	          calendarUrl = ["BEGIN:VCALENDAR", "VERSION:2.0", "BEGIN:VEVENT", "URL:" + document.URL, "DTSTART:" + this.formatStartDate(event.startTime), "DTEND:" + this.formatEndDate(event.endTime), "SUMMARY:" + event.title, "DESCRIPTION:" + formattedDescription, "LOCATION:" + event.location, "END:VEVENT", "END:VCALENDAR"].join("\n");

	          if (!isCrappyIE && this.isMobile()) {
	            calendarUrl = encodeURI("data:text/calendar;charset=utf8," + calendarUrl);
	          }
	      }

	      return calendarUrl;
	    }

	    // determine if a mobile browser is being used

	  }, {
	    key: "isMobile",
	    value: function isMobile() {
	      var mobile = false;

	      (function (a) {
	        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) mobile = true;
	      })(window.navigator.userAgent || window.navigator.vendor || window.opera);

	      return mobile;
	    }
	  }]);

	  return helpers;
	}();

	exports.default = helpers;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ })
/******/ ])
});
;