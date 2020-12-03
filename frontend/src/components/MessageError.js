import React from 'react'
import {Alert} from 'react-bootstrap'

const MessageError = ({variant,message}) => {
    return (
        <Alert variant={variant} >
            {message}
        </Alert>
    )
}

export default MessageError
