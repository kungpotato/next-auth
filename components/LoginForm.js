import loginUser from '../lib/auth'

class LoginForm extends React.Component {

    state = {
        email: '',
        password: ''
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
        loginUser(email, password)
    }

    render () {


    return (
      <div>
        <form onSubmit={this.handleSubmit}>
            <div><input type="email" name="email" placeholder="email" onChange={this.handleChange}/></div>
            <div><input type="password" name="password" placeholder="password" onChange={this.handleChange}/></div>
            <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default LoginForm