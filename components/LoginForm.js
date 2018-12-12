import {loginUser} from '../lib/auth'
import Router from 'next/router'

class LoginForm extends React.Component {

    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org',
        error: '',
        isLoading: false
    }
    
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        const {email, password} = this.state

        event.preventDefault()
        this.setState({error : '', isLoading: true})
        //console.log(this.state)
        loginUser(email, password).then(() => {
            Router.push('/profile')
        })
        .catch (this.showError)
    }

    showError = err => {
        console.error(err)
        const error = err.response && err.response.data || err.message
        this.setState({error, isLoading: false})
    }

    render () {

    const {email, password, error, isLoading} = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div><input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange}/></div>
            <div><input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange}/></div>
            <button disabled={isLoading} type="submit">
                {isLoading ? "Sending" : "Submit"}
            </button>
            {error && <div>{error}</div>}
        </form>
      </div>
    )
  }
}

export default LoginForm