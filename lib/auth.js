import axios from 'axios'
import Router from 'next/router'

axios.defaults.withCredentials = true

export const getServerSideToken = req => {
    const {signedCookies = {}} = req

    if(!signedCookies){
        return {}
    }else if(!signedCookies.token){
        return {}
    }
    return {user: signedCookies.token}
}

export const getClientSideToken = () => {
    if (typeof window != "undefined") {
        const user = window[WINDOW_USER_SCRIPT_VARIABLE] || {}
        return {user}
    }
    return {user: {}}
}

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__'

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`
}

export const authInitialProps = () => ({req}) => {
    //hign order function
    const auth = req ? getServerSideToken(req) : getClientSideToken()
    return {auth}
}

export const loginUser = async (email, password) => {
    const {data} = await axios.post('/api/login', {email, password})
    //console.log(data)
    if(typeof window !== "undefined"){
        window[WINDOW_USER_SCRIPT_VARIABLE] = data || {}
    }
}

export const logOutUer = async () => {
    if(typeof window !== "undefined"){
        window[WINDOW_USER_SCRIPT_VARIABLE] = {}
    }
    await axios.post('/api/logout')
    Router.push('/login')
}

export const getUserProfile = async (email, password) => {
    const {data} = await axios.get('/api/profile', {email, password})
    return data
}