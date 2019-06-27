import React from 'react';
import { ApolloConsumer } from 'react-apollo';
import './AskOption.css';
import Switch from 'react-switch';

class AskOption extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
      options: [], 
      newOption: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.updateList = this.updateList.bind(this)
    this.handleInput = this.handleInput.bind(this)
  }

  handleChange(checked) {
    this.setState({ checked })
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
            <label>
              <Switch 
                onChange={this.handleChange} 
                checked={this.state.checked} 
                className="toggle" />
            </label>
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
              className="continue-button solid-pink-button">
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