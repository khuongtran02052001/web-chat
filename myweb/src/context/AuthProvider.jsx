import { Spin } from 'antd';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import firebase, { auth } from '../firebae/config';



export const AuthContext = React.createContext()
export default function AuthProvider({ children }) {


    const [isLoading, setIsLoading] = useState(true)

    const [user, setUser] = useState({})

    const history = useHistory()


    React.useEffect(() => {
        const unsubrise = firebase.auth().onAuthStateChanged((user) => {
            console.log({ user })
            if (user) {
                setIsLoading(false)
                const { displayName, photoURL, email, uid } = user
                setUser({ displayName, photoURL, email, uid })
                history.push('/')
                return
            }
        }
        )
        setIsLoading(false)
        history.push('/login')
        //clean function
        return () => {
            unsubrise()
        }
    }, [history])

    return (
        <AuthContext.Provider value={{ user }}>
            {isLoading ? <Spin>Loading....</Spin> : children}
        </AuthContext.Provider>
    )
}

