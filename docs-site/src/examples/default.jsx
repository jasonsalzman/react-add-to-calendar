import React from 'react'
import AddToCalendar from 'react-add-to-calendar'

export default React.createClass({
  displayName: 'Default',

  render () {
    return <div className="row">
      <pre className="column example__code">
        <code className="jsx">
          {"<AddToCalendar/>"}
        </code>
      </pre>
      <div className="column">
        <AddToCalendar/>
      </div>
    </div>
  }
})
