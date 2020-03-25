import React from 'react';
import { TextMessage } from './TextMessage';

export const MessagesList = ({ messages, user }) => {
    return (
        <div className="messages-container">
            {Boolean(messages.length) && messages.map(message => (
                <TextMessage message={message} key={message.id} userId={user.id}/>
            ))}
        </div>
    )
}