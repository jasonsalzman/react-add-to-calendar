import React from 'react'
import AddToCalendar from 'react-add-to-calendar'

export default React.createClass({
  displayName: 'HeroExample',

  render () {
    return <AddToCalendar buttonTemplate={{'calendar-plus-o': 'left'}}/>
  }
})
