import './AskOption.css'
import './Toggle.css'

import { ApolloConsumer } from 'react-apollo'
import { NEW_ASK_DETAILS } from '../../graphql/queries/new_ask_details_wrapper'
import NewAskDetailsWrapper from '../../graphql/queries/new_ask_details_wrapper'
import React from 'react'
import Toggle from 'react-toggle'

class AskOption extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      checked: props.newAsk.askOptions.yes_no,
      options: props.newAsk.askOptions.values,
      newOption: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateList = this.updateList.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
  }

  handleChange(checked, client) {
    let newOptions = this.props.newAsk.askOptions.values
    if (this.state.checked === false) {
      newOptions = ['YES', 'NO']
      this.setState({ checked: true, options: newOptions })
    } else {
      if (newOptions.indexOf('NO') >= 0 && newOptions.indexOf('YES') >= 0) {
        newOptions = []
      }
      this.setState({ checked: false, options: newOptions })
    }
  }

  handleInput() {
    return e => {
      this.setState({ newOption: e.target.value })
    }
  }

  updateList(client) {
    let currentOptions = this.state.options
    if (!currentOptions.includes(this.state.newOption)) {
      currentOptions.push(this.state.newOption)
    }
    this.setState({ options: currentOptions })
    this.resetForm()
  }

  resetForm() {
    document.getElementById('option-input').value = ''
  }

  handleContinue(client) {
    const { newAsk } = client.readQuery({ query: NEW_ASK_DETAILS })

    client.writeData({
      data: {
        newAsk: {
          ...newAsk,
          askOptions: {
            __typename: 'AskOptions',
            yes_no: this.state.checked,
            values: this.state.checked ? ['YES', 'NO'] : this.state.options
          }
        }
      }
    })

    this.props.history.push('/askInvite')
  }

  render() {
    let optionList = this.state.options.map((option, i) => {
      return (
        <li key={i} className="option-li">
          {option}
        </li>
      )
    })
    let listView
    if (this.state.checked === false) {
      listView = <ul className="option-list-view drop-shadow">{optionList}</ul>
    } else {
      listView = (
        <ul className="option-list-view drop-shadow">
          <li key="0" className="option-li">
            YES
          </li>
          <li key="1" className="option-li">
            NO
          </li>
        </ul>
      )
    }
    return (
      <ApolloConsumer>
        {client => {
          return (
            <div className="overall-container">
              <div className="top-container">
                <div className="section-header ask-option-header">
                  Is this a yes/no question?
                </div>
                <Toggle
                  defaultChecked={this.state.checked}
                  icons={false}
                  onChange={this.handleChange}
                  className={this.state.checked === true ? `yes` : `no`}
                />
              </div>
              <div className="lower-container">
                <input
                  className={`option-input drop-shadow 
                      ${this.state.checked === true ? 'hidden' : ''}`}
                  placeholder="option"
                  type="text"
                  onChange={this.handleInput()}
                  id="option-input"
                />
                <button
                  className={`add-button green-gradient
                      ${this.state.checked === true ? 'hidden' : ''}`}
                  onClick={() => this.updateList(client)}
                >
                  Add Option
                </button>
                {listView}
                <button
                  className="continue-button option-continue solid-pink-button"
                  onClick={() => this.handleContinue(client)}
                >
                  Continue
                </button>
              </div>
            </div>
          )
        }}
      </ApolloConsumer>
    )
  }
}

export default props => (
  <NewAskDetailsWrapper {...props}>
    <AskOption />
  </NewAskDetailsWrapper>
)
