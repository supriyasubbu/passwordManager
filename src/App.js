import {Component} from 'react'

import {v4} from 'uuid'

import './App.css'

const colorList = ['green', 'yellow', 'blue', 'orange']

class App extends Component {
  state = {
    website: '',
    userName: '',
    password: '',
    isTrue: false,
    latestList: [],
    isShow: false,
  }

  learnWebsite = event => {
    this.setState({website: event.target.value})
  }

  learnUsername = event => {
    this.setState({userName: event.target.value})
  }

  learnPassword = event => {
    this.setState({password: event.target.value})
  }

  addContent = event => {
    event.preventDefault()
    const {website, userName, password} = this.state
    const surName = website.slice(0, 1).toUpperCase()
    const surnameBackgroundColors = colorList[Math.floor(Math.random * 5)]
    const newValues = {
      id: v4(),
      initialValue: surName,
      websiteName: website,
      username: userName,
      passWord: password,
      classValue: surnameBackgroundColors,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValues],
      website: '',
      userName: '',
      password: '',
      isTrue: false,
      searchInput: '',
    }))
  }

  showPassWord = event => {
    if (event.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchList = event => {
    this.setState({searchInput: event.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      userName,
      password,
      latestList,
      isShow,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    return (
      <div className="app-main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="sub-container1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-logo2"
          />
          <form className="add-form-details" onSubmit={this.addContent}>
            <h1 className="heading1">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                className="input-element"
                type="text"
                placeholder="Enter Website"
                onChange={this.learnWebsite}
                value={website}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                className="input-element"
                type="text"
                placeholder="Enter Username"
                onChange={this.learnUsername}
                value={userName}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                className="input-element"
                type="password"
                placeholder="Enter Password"
                onChange={this.learnPassword}
                value={password}
              />
            </div>
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="password-logo1"
          />
        </div>
        <div className="sub-container2">
          <div className="sub-con">
            <div className="yourPassword-container">
              <h1 className="heading2">Your Passwords</h1>
              <p className="color-text">{newList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-logo"
              />
              <input
                className="input-element"
                type="search"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="h-line" />
          <div className="show-password">
            <input
              className="check-box"
              id="check"
              type="checkbox"
              onChange={this.showPassWord}
            />
            <label htmlFor="check" className="label">
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty"
              />
              <p className="no-passwords">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="results-container">
              {newList.map(eachValue => (
                <li className="list-items" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classValue}`}>
                    {eachValue.initialValue}
                  </p>
                  <div className="list-content">
                    <p className="name">{eachValue.websiteName}</p>
                    <p className="name">{eachValue.username}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars"
                      />
                    )}
                    {isShow && <p className="name">{eachValue.passWord}</p>}
                  </div>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="delete"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
