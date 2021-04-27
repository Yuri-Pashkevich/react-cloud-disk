import React, { useState } from 'react'
import { Form } from '../utils'
import { useDispatch } from 'react-redux'
import { login } from '../actions/user'

export const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useDispatch()

    const onSubmit = e => {
        e.preventDefault()
        if(email === '' || password === '') {
            alert('Form fields should not be empty')
        } else {
            dispatch(login(email, password))
        }
    }

    return (
        <Form
            height='400px'
            type='Authorization'
            onSubmit={onSubmit}
            setEmail={setEmail}
            setPassword={setPassword}
        />  
    )
}