import React from 'react'
import hljs from 'highlight.js'
import Default from './examples/default'
import ChangeLabel from './examples/changeLabel'
import ChangeTemplate from './examples/changeTemplate'
import TextOnlyTemplate from './examples/textOnlyTemplate'
import TextOnlyDropdown from './examples/textOnlyDropdown'
import ChangeDropdownOrder from './examples/changeDropdownOrder'
import RemoveDropdownItem from './examples/removeDropdownItem'
import ChangeDropdownLabels from './examples/changeDropdownLabels'
import CodeExampleComponent from './code_example_component'

import 'react-add-to-calendar/dist/react-add-to-calendar.css'
import './style.scss'

export default React.createClass({
    displayName: 'exampleComponents',

    componentDidMount () {
        hljs.initHighlightingOnLoad()
    },

    examples: [
        {
          title: 'Default',
          component: <Default />
        },
        {
            title: 'Change Button Label',
            component: <ChangeLabel />
        },
        {
            title: 'Change Button Template',
            component: <ChangeTemplate />
        },
        {
            title: 'Text Only Button Template',
            component: <TextOnlyTemplate />
        },
        {
            title: 'Text Only Dropdown Items',
            component: <TextOnlyDropdown />
        },
        {
            title: 'Change Dropdown Order',
            component: <ChangeDropdownOrder />
        },
        {
            title: 'Remove Dropdown Item',
            component: <RemoveDropdownItem />
        },
        {
            title: 'Change Dropdown Labels',
            component: <ChangeDropdownLabels />
        }
    ],

    renderExamples () {
        return this.examples.map((example, index) =>
            <CodeExampleComponent key={`example-${index}`} id={index} title={example.title}>
                {example.component}
            </CodeExampleComponent>
        )
    },

    renderLeftColumn () {
        return this.examples.map((example, index) =>
            <li className="examples__navigation-item" key={`link-${index}`}>
                <a href={`#example-${index}`}>
                    {example.title}
                </a>
            </li>
        )
    },

    render () {
        return (
            <div>
                <h1>Examples</h1>
                <ul className="examples__navigation">
                    {this.renderLeftColumn()}
                </ul>
                <div className="examples">
                    {this.renderExamples()}
                </div>
            </div>
        )
    }
})
