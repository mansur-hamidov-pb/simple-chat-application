import React from 'react';

import "./MessageInput.css";
import { MdSend } from 'react-icons/lib/md';

export const MessageInput = ({
    value,
    onChange,
    onSubmit,
    onKeyPress
}) => (
    <div className="message-box">
        <div className="message-box-input">
            <textarea
                value={value}
                onChange={onChange}
                placeholder="Type a message"
                onKeyDown={onKeyPress}
            />
        </div>
        <button onClick={onSubmit} className="message-box-send">
            <MdSend />
        </button>
    </div>
)