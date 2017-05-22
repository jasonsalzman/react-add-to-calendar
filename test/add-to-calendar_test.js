import React from "react";
import ReactDOM from "react-dom";
import TestUtils from "react-dom/test-utils";
import createReactClass from "create-react-class";
import AddToCalendar from "../src/ReactAddToCalendar.js";

describe("AddToCalendar", () => {
  it("should show the options menu when the button is clicked", () => {
    var event = {
      title: "Sample Event",
      description: "This is the sample event provided as an example only",
      location: "Portland, OR",
      startTime: "2016-09-16T20:15:00-04:00",
      endTime: "2016-09-16T21:45:00-04:00"
    };
    var addToCalendar = TestUtils.renderIntoDocument(
      <AddToCalendar event={event} />
    );
    var button = TestUtils.findRenderedDOMComponentWithTag(addToCalendar, "a");
    TestUtils.Simulate.click(ReactDOM.findDOMNode(button));
    var dropdown = TestUtils.findRenderedDOMComponentWithClass(
      addToCalendar,
      "react-add-to-calendar__dropdown"
    );
    expect(dropdown).to.exist;
  });

  it("should mount and unmount properly", done => {
    var TestComponent = createReactClass({
      displayName: "TestComponent",

      getInitialState() {
        return { mounted: true };
      },
      render() {
        return this.state.mounted ? <AddToCalendar /> : null;
      }
    });
    var element = TestUtils.renderIntoDocument(<TestComponent />);
    element.setState({ mounted: false }, done);
  });
});
