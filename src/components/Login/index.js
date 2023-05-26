import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {pin: '', userid: '', showerror: false, errormsg: ''}

  onchangeuserid = event => {
    this.setState({userid: event.target.value})
  }

  onchangepin = event => {
    this.setState({pin: event.target.value})
  }

  onsubmitfailue = errormsg => {
    this.setState({showerror: true, errormsg})
  }

  onSubmitSuccess = JWTtoken => {
    const {history} = this.props

    Cookies.set('jwt_token', JWTtoken, {expires: 30})
    history.replace('/')
  }

  submit = async event => {
    event.preventDefault()
    const {userid, pin} = this.state
    const userdetails = {userid, pin}
    const url = 'https://apis.ccbp.in/ebank/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onsubmitsuccess(data.jwt_token)
    } else {
      this.onsubmitfailue(data.error_msg)
    }
  }

  render() {
    const {pin, userid, showerror, errormsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background">
        <div className="container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            className="login-image"
            alt="website login"
          />
          <div className="form-container">
            <h1 className="login-heading">Welcome Back!</h1>
            <form className="form" onSubmit={this.submit}>
              <label htmlFor="userid" className="label">
                User ID
              </label>
              <input
                className="input"
                id="userid"
                type="test"
                placeholder="Enter User ID"
                value={userid}
                onChange={this.onchangeuserid}
              />
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                className="input"
                id="pin"
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={this.onchangepin}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {showerror && <p className="error-msg">{errormsg}</p>}
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
