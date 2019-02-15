import React, { Component } from "react";
import PropTypes from "prop-types";

import helpersClass from "./helpers";
const helpers = new helpersClass();

export default class ReactAddToCalendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      optionsOpen: props.optionsOpen || false,
      isCrappyIE: false
    };

    this.toggleCalendarDropdown = this.toggleCalendarDropdown.bind(this);
    this.handleDropdownLinkClick = this.handleDropdownLinkClick.bind(this);
  }

  componentWillMount() {
    // polyfill for startsWith to fix IE bug
    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function(searchString, position) {
        position = position || 0;
        return this.indexOf(searchString, position) === position;
      };
    }

    let isCrappyIE = false;
    if (
      typeof window !== "undefined" &&
      window.navigator.msSaveOrOpenBlob &&
      window.Blob
    ) {
      isCrappyIE = true;
    }

    this.setState({ isCrappyIE: isCrappyIE });
  }

  toggleCalendarDropdown() {
    let showOptions = !this.state.optionsOpen;

    if (showOptions) {
      document.addEventListener("click", this.toggleCalendarDropdown, false);
    } else {
      document.removeEventListener("click", this.toggleCalendarDropdown);
    }

    this.setState({ optionsOpen: showOptions });
  }

  handleDropdownLinkClick(e) {
    e.preventDefault();
    let url = e.currentTarget.getAttribute("href");

    if (
      !helpers.isMobile() &&
      (url.startsWith("data") || url.startsWith("BEGIN"))
    ) {
      let filename = "download.ics";
      let blob = new Blob([url], { type: "text/calendar;charset=utf-8" });

      if (this.state.isCrappyIE) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
      } else {
        /****************************************************************
        // many browsers do not properly support downloading data URIs
        // (even with "download" attribute in use) so this solution
        // ensures the event will download cross-browser
        ****************************************************************/
        let link = document.createElement("a");
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

  renderDropdown() {
    let self = this;

    let items = this.props.listItems.map(listItem => {
      let currentItem = Object.keys(listItem)[0];
      let currentLabel = listItem[currentItem];

      let icon = null;
      if (self.props.displayItemIcons) {
        let currentIcon =
          currentItem === "outlook" || currentItem === "outlookcom"
            ? "windows"
            : currentItem;
        icon = <i className={"fa fa-" + currentIcon} />;
      }

      return (
        <li key={helpers.getRandomKey()}>
          <a
            className={currentItem + "-link"}
            onClick={self.handleDropdownLinkClick}
            href={helpers.buildUrl(
              self.props.event,
              currentItem,
              self.state.isCrappyIE
            )}
            target="_blank"
          >
            {icon}
            {currentLabel}
          </a>
        </li>
      );
    });

    return (
      <div className={this.props.dropdownClass}>
        <ul>{items}</ul>
      </div>
    );
  }

  renderButton() {
    let buttonLabel = this.props.buttonLabel;
    let buttonIcon = null;
    let template = Object.keys(this.props.buttonTemplate);

    if (template[0] !== "textOnly") {
      const iconPlacement = this.props.buttonTemplate[template];
      const buttonClassPrefix =
        this.props.buttonIconClass === "react-add-to-calendar__icon--"
          ? `${this.props.buttonIconClass}${iconPlacement}`
          : this.props.buttonIconClass;
      const iconPrefix = this.props.useFontAwesomeIcons ? "fa fa-" : "";

      const mainButtonIconClass =
        template[0] === "caret"
          ? this.state.optionsOpen ? "caret-up" : "caret-down"
          : template[0];

      let buttonIconClass = `${buttonClassPrefix} ${iconPrefix}${mainButtonIconClass}`;

      buttonIcon = <i className={buttonIconClass} />;
      buttonLabel =
        iconPlacement === "right" ? (
          <span>
            {buttonLabel + " "}
            {buttonIcon}
          </span>
        ) : (
          <span>
            {buttonIcon}
            {" " + buttonLabel}
          </span>
        );
    }

    let buttonClass = this.state.optionsOpen
      ? this.props.buttonClassClosed + " " + this.props.buttonClassOpen
      : this.props.buttonClassClosed;

    return (
      <div className={this.props.buttonWrapperClass}>
        <a className={buttonClass} onClick={this.toggleCalendarDropdown}>
          {buttonLabel}
        </a>
      </div>
    );
  }

  render() {
    let options = null;
    if (this.state.optionsOpen) {
      options = this.renderDropdown();
    }

    let addToCalendarBtn = null;
    if (this.props.event) {
      addToCalendarBtn = this.renderButton();
    }

    return (
      <div className={this.props.rootClass}>
        {addToCalendarBtn}
        {options}
      </div>
    );
  }
}

ReactAddToCalendar.displayName = "Add To Calendar";

ReactAddToCalendar.propTypes = {
  buttonClassClosed: PropTypes.string,
  buttonClassOpen: PropTypes.string,
  buttonLabel: PropTypes.string,
  buttonTemplate: PropTypes.object,
  buttonIconClass: PropTypes.string,
  useFontAwesomeIcons: PropTypes.bool,
  buttonWrapperClass: PropTypes.string,
  displayItemIcons: PropTypes.bool,
  optionsOpen: PropTypes.bool,
  dropdownClass: PropTypes.string,
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    googleDescription: PropTypes.string,
    location: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string
  }).isRequired,
  listItems: PropTypes.arrayOf(PropTypes.object),
  rootClass: PropTypes.string
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
  listItems: [
    { apple: "Apple Calendar" },
    { google: "Google" },
    { outlook: "Outlook" },
    { outlookcom: "Outlook.com" },
    { yahoo: "Yahoo" }
  ],
  rootClass: "react-add-to-calendar"
};
