import React, { Component } from "react";
import AddToCalendar from "react-add-to-calendar";

export default class RemoveDropdownItem extends React.Component {
  render() {
    let event = {
      title: "Sample Event",
      description: "This is the sample event provided as an example only",
      location: "Portland, OR",
      startTime: "2016-09-16T20:15:00-04:00",
      endTime: "2016-09-16T21:45:00-04:00"
    };

    let items = [{ outlook: "Outlook" }, { google: "Google" }];

    return (
      <div className="row">
        <pre className="column example__code">
          <code className="js">
            {"let items = ["}<br />
            &nbsp;&nbsp;&nbsp;
            {"{ outlook: 'Outlook' }"}<br />
            &nbsp;&nbsp;&nbsp;
            {"{ google: 'Google' }"}<br />
            {"];"}<br /><br />
          </code>
          <code className="jsx">
            {"<AddToCalendar"}<br />
            &nbsp;&nbsp;&nbsp;
            {"event={event}"}<br />
            &nbsp;&nbsp;&nbsp;
            {"listItems={items} />"}
          </code>
        </pre>
        <div className="column">
          <AddToCalendar event={event} listItems={items} />
        </div>
      </div>
    );
  }
}

RemoveDropdownItem.displayName = "Remove Dropdown Item";
