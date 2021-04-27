import React, { useState } from 'react'
import { registration } from '../actions/user'
import { Form } from '../utils'

export const Registration = (props) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [tel, setTel] = useState('')

    const onSubmit = e => {
        e.preventDefault()
        registration(name, email, password, tel)
        setName('')
        setEmail('')
        setPassword('')
        setTel('')
        props.history.push('/login')
    }

    return (
        <Form
            height='481px'
            type="Registration"
            onSubmit={onSubmit}
            name={name}
            email={email}
            password={password}
            tel={tel}
            setName={setName}
            setEmail={setEmail}
            setPassword={setPassword}
            setTel={setTel}
        />
    )
}