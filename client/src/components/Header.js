import React from 'react';
import { MdArrowBack } from 'react-icons/lib/md';
import groupAvatar from '../assets/img/group.jpeg';
import "./Header.css";

export const Header = ({ users, groupName, typingUsers = null }) => {
    const groupUsers = Object.keys(users).map(key => users[key].username).join(", ");
    const typing = typingUsers.length && `${typingUsers.join(', ')} is typing...`;
    return (
        <div className="header">
            <button className="header-back-action" type="button">
                <MdArrowBack />
            </button>
            <img src={groupAvatar} className="header-group-avatar" alt="group" />
            <div className="header-group-info">
                <div className="group-name">{groupName}</div>
                <div className="group-users">{typing || groupUsers}</div>
            </div>
        </div>
    )
}