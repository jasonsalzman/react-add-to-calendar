import React, {Component} from 'react';

import helpersClass from './helpers';
const helpers = new helpersClass();

export default class ReactAddToCalendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            optionsOpen: false,
            isCrappyIE: false
        };

        this.toggleCalendarDropdown = this.toggleCalendarDropdown.bind(this);
        this.handleDropdownLinkClick = this.handleDropdownLinkClick.bind(this);
    }

    componentWillMount() {
        let isCrappyIE = false;
        if (typeof window !== 'undefined' && window.navigator.msSaveOrOpenBlob && window.Blob) {
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

        if (this.state.isCrappyIE) {
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
            let currentItem = Object.keys(listItem)[0];
            let currentLabel = listItem[currentItem];

            let icon = null;
            if (self.props.displayItemIcons) {
                let currentIcon = (currentItem === 'outlook')
                    ? 'windows'
                    : currentItem;
                icon = <i className={'fa fa-' + currentIcon}/>;
            }

            return (
                <li key={helpers.getRandomKey()}>
                    <a className={currentItem + '-link'} onClick={self.handleDropdownLinkClick} href={helpers.buildUrl(self.props.event, currentItem, self.state.isCrappyIE)} target="_blank">
                        {icon}
                        {currentLabel}</a>
                </li>
            );
        });

        return (
            <div className={this.props.dropdownClass}>
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
                buttonIconClass += (this.state.optionsOpen)
                    ? 'caret-up'
                    : 'caret-down';
            } else {
                buttonIconClass += template[0];
            }

            buttonIcon = <i className={buttonIconClass}/>;
            buttonLabel = (iconPlacement === 'right')
                ? (
                    <span>
                        {buttonLabel + ' '}
                        {buttonIcon}
                    </span>
                )
                : (
                    <span>
                        {buttonIcon}
                        {' ' + buttonLabel}
                    </span>
                );
        }

        let buttonClass = (this.state.optionsOpen)
            ? this.props.buttonClassClosed + ' ' + this.props.buttonClassOpen
            : this.props.buttonClassClosed;

        return (
            <div className={this.props.buttonWrapperClass}>
                <a className={buttonClass} onClick={this.toggleCalendarDropdown}>{buttonLabel}</a>
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

ReactAddToCalendar.displayName = 'Add To Calendar';

ReactAddToCalendar.propTypes = {
    buttonClassClosed: React.PropTypes.string,
    buttonClassOpen: React.PropTypes.string,
    buttonLabel: React.PropTypes.string,
    buttonTemplate: React.PropTypes.object,
    buttonWrapperClass: React.PropTypes.string,
    displayItemIcons: React.PropTypes.bool,
    dropdownClass: React.PropTypes.string,
    event: React.PropTypes.shape({title: React.PropTypes.string, description: React.PropTypes.string, location: React.PropTypes.string, startTime: React.PropTypes.string, endTime: React.PropTypes.string}).isRequired,
    listItems: React.PropTypes.arrayOf(React.PropTypes.object),
    rootClass: React.PropTypes.string
};

ReactAddToCalendar.defaultProps = {
    buttonClassClosed: 'react-add-to-calendar__button',
    buttonClassOpen: 'react-add-to-calendar__button--light',
    buttonLabel: 'Add to My Calendar',
    buttonTemplate: {
        caret: 'right'
    },
    buttonWrapperClass: 'react-add-to-calendar__wrapper',
    displayItemIcons: true,
    dropdownClass: 'react-add-to-calendar__dropdown',
    event: {
        title: 'Sample Event',
        description: 'This is the sample event provided as an example only',
        location: 'Portland, OR',
        startTime: '2016-09-16T20:15:00-04:00',
        endTime: '2016-09-16T21:45:00-04:00'
    },
    listItems: [
        {
            apple: 'Apple Calendar'
        }, {
            google: 'Google'
        }, {
            outlook: 'Outlook'
        }, {
            yahoo: 'Yahoo'
        }
    ],
    rootClass: 'react-add-to-calendar'
};