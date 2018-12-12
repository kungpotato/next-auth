import {loginUser} from '../lib/auth'
import Router from 'next/router'

class LoginForm extends React.Component {

    state = {
        email: 'Sincere@april.biz',
        password: 'hildegard.org'
    }
    
    handleChange = (event) =>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        const {email, password} = this.state

        event.preventDefault()
        //console.log(this.state)
        loginUser(email, password).then(() => {
            Router.push('/profile')
        })
    }

    render () {

    const {email, password} = this.state

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div><input type="email" name="email" placeholder="email" value={email} onChange={this.handleChange}/></div>
            <div><input type="password" name="password" placeholder="password" value={password} onChange={this.handleChange}/></div>
            <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginForm