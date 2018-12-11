const next = require('next')
const express = require('express')
const axios = require('axios')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({dev})
const handle = app.getRequestHandler()

const AUTH_USER_TYPE = "authenticated"

const authenticate = (email, password) => {
    const {data} = await axios.get('https://jsonplaceholder.typicode.com/users')
    return data.find((user) => {
        if(user.email === email && user.website === password){
            return user
        }
    })
}

app.prepare().then(() => {
    const server = express()

    server.use(express.json())

    server.post('/api/login', async (req, res) => {
        const {email, password} = req.body
        // const  some = req.body.email
        // res.json({
        //     email,
        //     password,
        //     success: true
        // })
        const user = await authenticate(email, password)
        if(!user){
            return res.status(403).send("invalid email or password")
        }
        const userData = {
            name: user.email,
            email: user.email,
            type: AUTH_USER_TYPE
        }
        res.json(userData)
    })

    server.get('*', (req,res) => {
        return handle(req, res)
    })

    server.listen(port, err => {
        if (err) throw err
        console.log(`Listening on port: ${port}`)
    })
})