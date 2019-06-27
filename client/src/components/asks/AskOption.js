import React from 'react';
import { ApolloConsumer } from 'react-apollo';
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
      // isOn: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateList = this.updateList.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.handleContinue = this.handleContinue.bind(this)
  }

  handleChange(checked) {
    if (this.state.checked === false) {
      this.setState({ checked: true }, () => {
        console.log(this.state.checked)
      })
    } else {
      this.setState({ checked: false }, () => {
        console.log(this.state.checked)
      })
    }
  }

  handleInput() {
    return (e) => {
      this.setState({ newOption: e.target.value})
    }
  }

  updateList() {
    let options = this.state.options
    if (!options.includes(this.state.newOption)) {
      options.push(this.state.newOption)
    }
    this.setState({ options: options }, () => {
      console.log(this.state.options)
    })
    this.resetForm()
  }

  resetForm() {
    document.getElementById("option-input").value = "";
  }

  handleContinue() {
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
    return(
      <div className="background">
        <div className="">
          <div className="top-container">
            <div className="section-header ask-option-header">Is this a yes or no question?</div>
            <Toggle 
              defaultChecked={this.state.checked}
              icons={false}
              onChange={this.handleChange} />
          </div>
          <div className="lower-container">
            <input
              className="option-input drop-shadow"
              placeholder="option"
              type="text"
              onChange={this.handleInput()}
              id="option-input">
            </input>
            <button
              className="add-button green-gradient"
              onClick={this.updateList}>
              Add Option
            </button>
            <button
              className="continue-button solid-pink-button"
              onClick={this.handleContinue}>
              Continue
            </button>
            <ul className="option-list-view drop-shadow">
              {optionList}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default AskOption;