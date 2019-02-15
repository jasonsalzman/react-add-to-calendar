"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _helpers = require("./helpers");

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
