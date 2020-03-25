import React from 'react';
import moment from 'moment'
import { MdDoneAll } from 'react-icons/lib/md';

export const TextMessage = ({ message, userId, senderName }) => {
    const isSentMessage = message.sender === userId;
    const messageViewType = isSentMessage ? 'sended-message' : 'received-message';

    return (
        <div className={`message-outer ${messageViewType}`}>
            <div className="message">
                {!isSentMessage && <div className="message-sender">{senderName}</div>}
                {message.message}
                <div className="message-time">
                    {moment(message.createdAt).format('HH:MM')}
                    &nbsp;<MdDoneAll className="status-icon"/>
                </div>
            </div>
        </div>
    )
}