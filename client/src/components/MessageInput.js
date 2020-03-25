import React from 'react';

import "./MessageInput.css";
import { MdSend } from 'react-icons/lib/md';

const handleEnterPress = (event, callback) => {
    if (event.charCode === 13) {
        callback(event);
    }
}

export const MessageInput = ({
    value,
    onChange,
    onSubmit
}) => (
    <div className="message-box">
        <div className="message-box-input">
            <textarea
                value={value}
                onChange={onChange}
                placeholder="Type a message"
                onKeyPress={e => handleEnterPress(e, onSubmit)}
            />
        </div>
        <button onClick={onSubmit} className="message-box-send">
            <MdSend />
        </button>
    </div>
)