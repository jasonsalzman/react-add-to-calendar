import React from 'react'
import AddToCalendar from 'react-add-to-calendar'

export default React.createClass({
    displayName: 'TextOnlyTemplate',

    render () {
        let event = {
            title: 'Sample Event',
            description: 'This is the sample event provided as an example only',
            location: 'Portland, OR',
            startTime: '2016-09-16T20:15:00-04:00',
            endTime: '2016-09-16T21:45:00-04:00'
        };

        let icon = { textOnly: 'none' };

        return (
            <div className="row">
                <pre className="column example__code">
                    <code className="js">
                        {"let icon = \{ textOnly: 'none' \};"}<br/><br/>
                    </code>
                    <code className="jsx">
                        {"<AddToCalendar"}<br/>
                        &nbsp;&nbsp;&nbsp;
                        {"event={event}"}<br/>
                        &nbsp;&nbsp;&nbsp;
                        {"buttonTemplate=\{icon\} />"}
                    </code>
                </pre>
                <div className="column">
                    <AddToCalendar event={event} buttonTemplate={icon} />
                </div>
            </div>
        );
    }
})
