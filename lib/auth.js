import axios from 'axios'

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

const WINDOW_USER_SCRIPT_VARIABLE = '__USER__'

export const getUserScript = user => {
    return `${WINDOW_USER_SCRIPT_VARIABLE} = ${JSON.stringify(user)}`
}

export const loginUser = async (email, password) => {
    const {data} = await axios.post('/api/login', {email, password})
    //console.log(data)
    if(typeof window !== "undefined"){
        window[WINDOW_USER_SCRIPT_VARIABLE] = data || {}
    }
}

export const getUserProfile = async (email, password) => {
    const {data} = await axios.get('/api/profile', {email, password})
    return data
}