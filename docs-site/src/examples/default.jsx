import React, { Component } from "react";
import AddToCalendar from "react-add-to-calendar";

export default class Default extends React.Component {
  render() {
    let event = {
      title: "Sample Event",
      description: "This is the sample event provided as an example only",
      location: "Portland, OR",
      startTime: "2016-09-16T20:15:00-04:00",
      endTime: "2016-09-16T21:45:00-04:00"
    };

    return (
      <div className="row">
        <pre className="column example__code">
          <code className="js">
            {"let event = {"}<br />
            &nbsp;&nbsp;&nbsp;
            {"  title: 'Sample Event',"}<br />
            &nbsp;&nbsp;&nbsp;
            {
              "  description: 'This is the sample event provided as an example only',"
            }
            <br />
            &nbsp;&nbsp;&nbsp;
            {"  location: 'Portland, OR',"}<br />
            &nbsp;&nbsp;&nbsp;
            {"  startTime: '2016-09-16T20:15:00-04:00',"}<br />
            &nbsp;&nbsp;&nbsp;
            {"  endTime: '2016-09-16T21:45:00-04:00'"}<br />
            {"};"}<br /><br />
            {"/*"}<br />
            &nbsp;&nbsp;&nbsp;
            {"startTime and endTime can use any datetime"}<br />
            &nbsp;&nbsp;&nbsp;
            {"string that is acceptable by MomentJS"}<br />
            {"*/"}
          </code>
          <code className="jsx">
            {"<AddToCalendar event={event} />"}
          </code>
        </pre>
        <div className="column">
          <AddToCalendar event={event} />
        </div>
      </div>
    );
  }
}

Default.displayName = "Default";
