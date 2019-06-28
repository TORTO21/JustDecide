import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import { Link } from 'react-router-dom'
import './AskOption.css';
import Toggle from 'react-toggle';
import './Toggle.css'


class AskOption extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      options: [], 
      newOption: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateList = this.updateList.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
  }

  handleChange(checked, client) {
    if (this.state.checked === false) {
      this.setState({ checked: true })
    } else {
      this.setState({ checked: false })
    }
  }

  handleInput() {
    return (e) => {
      this.setState({ newOption: e.target.value})
    }
  }

  updateList(client) {
    let currentOptions = this.state.options
    if (!currentOptions.includes(this.state.newOption)) {
      currentOptions.push(this.state.newOption)
    }
    this.setState({ options: currentOptions }, () => {
      this.updateCache(client, currentOptions)
    })
    this.resetForm()
  }

  updateCache(client, options) {
    console.log(options)
    client.writeData({
      data: { askOptions: options }
    })
  }
  
  resetForm() {
    document.getElementById("option-input").value = "";
  }
  
  handleContinue(client) {
    // console.log(client.cache.data.data.ROOT_QUERY.askOptions.json)

    if (this.state.checked === true) {
      client.writeData({
        data: { askOptions: ["yes", "no"]}
      })
    }
    console.log(client)
    this.props.history.push('/invite')
  }
  
  render() {
    let optionList = this.state.options.map((option, i) => {
      return (
        <li key={i} className="option-li">
          {option}
        </li>
      )
    })
    let listView;
    if (this.state.checked === false) {
      listView = (
        <ul className = "option-list-view drop-shadow">
          { optionList }
        </ul >
      )
    } else {
      listView = (
        <ul className="option-list-view drop-shadow">
          <li key="0" className="option-li">no</li>
          <li key="1" className="option-li">yes</li>
        </ul>
      )
    }
    return(
      <ApolloConsumer>
        {(client) => {
          return (
            <div className="background">
              <Link className="back-button" to="/deadlineDate">
                <svg width="35" height="28" viewBox="0 0 35 61" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M9.78083 30.1096L35 55.3287L30.1096 60.2192L0 30.1096L30.1096 0L35 4.89042L9.78083 30.1096Z" fill="white" />
                </svg>
              </Link>
              <div className="overall-container">
                <div className="top-container">
                  <div className="section-header ask-option-header">Is this a yes or no question?</div>
                  <Toggle 
                    defaultChecked={this.state.checked}
                    icons={false}
                    onChange={this.handleChange}
                    className={this.state.checked === true ? `yes` : `no`} />
                </div>
                <div className="lower-container">
                  <input
                    className={`option-input drop-shadow 
                      ${this.state.checked === true ? "hidden" : ""}`}
                    placeholder="option"
                    type="text"
                    onChange={this.handleInput()}
                    id="option-input">
                  </input>
                  <button
                    className={`add-button green-gradient
                      ${this.state.checked === true ? "hidden" : ""}`}
                    onClick={() => this.updateList(client)}>
                    Add Option
                  </button>
                  <button
                    className="continue-button solid-pink-button"
                    onClick={() => this.handleContinue(client)}>
                    Continue
                  </button>
                  {listView}
                  
                </div>
              </div>
            </div>
          )
        }}
        </ApolloConsumer>
    )
  }
}

export default AskOption;