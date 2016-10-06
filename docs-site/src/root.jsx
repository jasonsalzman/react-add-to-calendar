import React from 'react'
import ExampleComponents from './example_components.jsx'
import HeroExample from './hero_example.jsx'

export default React.createClass({
  displayName: 'Root',

  render () {
    return (
      <div>
        <div className="hero">
          <div className="hero__content">
            <h1 className="hero__title">
              React Add to Calendar Button
            </h1>
            <div className="hero__crafted-by">
              <a href="http://4one.io" className="hero__crafted-by-link">
                Crafted by Jason Salzman
              </a>
            </div>
            <div className="hero__example">
                <HeroExample />
            </div>
          </div>
        </div>
        <div className="wrapper">
          <h1>React Add to Calendar Button</h1>
          { /* <p>
            <a href="https://npmjs.org/package/react-datepicker">
              <img src="https://badge.fury.io/js/react-datepicker.svg" className="badge" />
            </a>
            <a href="https://travis-ci.org/Hacker0x01/react-datepicker">
              <img src="https://travis-ci.org/Hacker0x01/react-datepicker.svg?branch=master" className="badge" />
            </a>
            <a href="https://david-dm.org/Hacker0x01/react-datepicker">
              <img src="https://david-dm.org/Hacker0x01/react-datepicker.svg" className="badge" />
            </a>
            <a href={'https://npmjs.org/package/react-datepicker' +
              '?__hstc=72727564.ca821b01b5b29b1831f0936a681f0483.1428679773810.1435582678273.1438354735499.5' +
              '&__hssc=72727564.1.1438354735499' +
              '&__hsfp=2497064007'}>
              <img src="https://img.shields.io/npm/dm/react-datepicker.svg" className="badge" />
            </a>
          </p> */}
          <p>A simple and reusable Add to Calendar component for React.</p>

          <h2>Installation</h2>
          <p>The package can be installed via NPM:</p>
          <p><code>npm install react-add-to-calendar --save</code></p>
        </div>
        <div className="wrapper">
            <ExampleComponents/>
        </div>

        <a href="https://github.com/jasonsalzman/react-add-to-calendar/">
          <img className="github-ribbon" src="images/ribbon.png" alt="Fork me on GitHub" />
        </a>
      </div>
    )
  }
})
