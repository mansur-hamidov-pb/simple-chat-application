import React from 'react';
import { TextMessage } from './TextMessage';

import "./MessagesList.css";

export const MessagesList = ({ messages, user, users }) => {
    

    return (
        <div className="messages-container">
            {Boolean(messages.length) && messages.map(message => {
                const senderName = users[message.sender] ? users[message.sender]['username'] : 'Deleted user';

                return <TextMessage senderName={senderName} message={message} key={message.id} userId={user.id}/>
            })}
        </div>
    )
}