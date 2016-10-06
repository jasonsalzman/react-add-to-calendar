import React, {
	Component,
} from 'react';

import helpersClass from './helpers.js';
const helpers = new helpersClass();

export default class ReactAddToCalendar extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			componentId: 'addToCalendar-' + helpers.getRandomKey(),
			optionsOpen: false,
            isCrappyIE: false
		};

		this.toggleCalendarDropdown = this.toggleCalendarDropdown.bind(this);
		this.handleDropdownLinkClick = this.handleDropdownLinkClick.bind(this);
	}

	componentWillMount() {
        let isCrappyIE = false;
        if (window.navigator.msSaveOrOpenBlob && window.Blob) {
            isCrappyIE = true;
        }

        this.setState({isCrappyIE: isCrappyIE});
    }

    toggleCalendarDropdown() {
    	let showOptions = !this.state.optionsOpen;

        if (showOptions) {
			document.addEventListener('click', this.toggleCalendarDropdown, false);
		} else {
			document.removeEventListener('click', this.toggleCalendarDropdown);
		}

        this.setState({optionsOpen: showOptions});
    }

    handleDropdownLinkClick(e) {
        e.preventDefault();
        let url = e.currentTarget.getAttribute('href');

        if (this.state.isCrappyIE && (e.currentTarget.getAttribute('class') === 'ical-link' ||
            e.currentTarget.getAttribute('class') === 'outlook-calendar-link')) {
            let blob = new Blob([url], {type: 'text/calendar'});
            window.navigator.msSaveOrOpenBlob(blob, 'download.ics');
        } else {
            window.open(url, '_blank');
        }

        this.toggleCalendarDropdown();
    }

    renderDropdown() {
        let self = this;

        let items = this.props.listItems.map((listItem) => {
            let currentItem = Object.keys(listItem);
            let currentLabel = listItem[currentItem];

            let icon = null;
            if (self.props.displayItemIcons) {
                let currentIcon = (currentItem[0] === 'outlook') ? 'windows' : currentItem;
                icon = <i className={'fa fa-' + currentIcon}/>;
            }

            return (
                <li key={helpers.getRandomKey()}>
                    <a className={currentItem + '-link'} onClick={self.handleDropdownLinkClick}
                        href={helpers.buildUrl(self.props.event, currentItem, self.state.isCrappyIE)}
                        target="_blank">
                        {icon}
                        {currentLabel}</a>
                </li>
            );
        });

        return (
            <div className="react-add-to-calendar__dropdown">
                <ul>
                    {items}
                </ul>
            </div>
        );
    }

    renderButton() {
        let buttonLabel = this.props.buttonLabel;
        let buttonIcon = null;
        let template = Object.keys(this.props.buttonTemplate);

        if (template[0] !== 'textOnly') {
            let iconPlacement = this.props.buttonTemplate[template];
            let buttonIconClass = 'react-add-to-calendar__icon--' + iconPlacement + ' fa fa-';

            if (template[0] === 'caret') {
                buttonIconClass += (this.state.optionsOpen) ? 'caret-up' : 'caret-down';
            } else {
                buttonIconClass += template[0];
            }

            buttonIcon = <i className={buttonIconClass}/>;
            buttonLabel = (iconPlacement === 'right') ?
                (
                    <span>
                        {buttonLabel + ' '}
                        {buttonIcon}
                    </span>
                ) :
                (
                    <span>
                        {buttonIcon}
                        {' ' + buttonLabel}
                    </span>
                );
        }

        let buttonClass = (this.state.optionsOpen) ? 'react-add-to-calendar__button react-add-to-calendar__button--light' :
                                                    'react-add-to-calendar__button';

        return (
            <div className="react-add-to-calendar__wrapper">
                <a id={this.state.componentId} className={buttonClass}
                    onClick={this.toggleCalendarDropdown}>{buttonLabel}</a>
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
            <div className="react-add-to-calendar">
                {addToCalendarBtn}
                {options}
            </div>
        );
	}
}

ReactAddToCalendar.displayName = 'Add To Calendar';

ReactAddToCalendar.propTypes = {
	buttonLabel: React.PropTypes.string,
    buttonTemplate: React.PropTypes.object,
	displayItemIcons: React.PropTypes.bool,
	event: React.PropTypes.object.isRequired,
    listItems: React.PropTypes.array
};

ReactAddToCalendar.defaultProps = {
	buttonLabel: 'Add to My Calendar',
    buttonTemplate: { caret: 'right' },
	displayItemIcons: true,
	event: {
		title: 'Sample Event',
		description: 'This is the sample event provided as an example only',
		location: 'Portland, OR',
		startTime: '2016-09-16T20:15:00-04:00',
		endTime: '2016-09-16T21:45:00-04:00'
	},
    listItems: [
        { apple: 'Apple Calendar' },
        { google: 'Google' },
        { outlook: 'Outlook' },
        { yahoo: 'Yahoo' }
    ]
};