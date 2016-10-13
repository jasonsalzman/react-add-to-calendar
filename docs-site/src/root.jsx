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
          <p>
            <a href="https://npmjs.org/package/react-add-to-calendar">
              <img src="https://badge.fury.io/js/react-add-to-calendar.svg" className="badge" />
            </a>&nbsp;&nbsp;
            <a href="https://travis-ci.org/jasonsalzman/react-add-to-calendar">
              <img src="https://travis-ci.org/jasonsalzman/react-add-to-calendar.svg?branch=master" className="badge" />
            </a>&nbsp;&nbsp;
            <a href="https://david-dm.org/jasonsalzman/react-add-to-calendar">
                <img src="https://img.shields.io/david/strongloop/express.svg?maxAge=2592000" className="badge" />
            </a>&nbsp;&nbsp;
            <a href="https://david-dm.org/jasonsalzman/react-add-to-calendar">
              <img src="https://img.shields.io/david/peer/webcomponents/generator-element.svg?maxAge=2592000" className="badge" />
            </a>&nbsp;&nbsp;
            <a href={'https://npmjs.org/package/react-add-to-calendar'}>
              <img src="https://img.shields.io/npm/dm/react-add-to-calendar.svg" className="badge" />
            </a>
          </p>
          <p>A simple, customizable, and reusable Add to Calendar button component for React.</p>

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
