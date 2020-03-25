import React from 'react';

export const TextMessage = ({ message, userId }) => {
    const messageViewType = message.sender === userId ? 'sended-message' : 'received-message';

    return (
        <div className="message-outer">
            <div className={`message ${messageViewType}`}>{message.message}</div>
        </div>
    )
}