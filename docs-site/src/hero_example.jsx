import React, { Component } from "react";
import AddToCalendar from "react-add-to-calendar";

export default class HeroExample extends React.Component {
  render() {
    return <AddToCalendar buttonTemplate={{ "calendar-plus-o": "left" }} />;
  }
}

HeroExample.displayName = "HeroExample";
