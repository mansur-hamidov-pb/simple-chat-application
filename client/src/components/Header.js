import React from 'react';
import { MdArrowBack } from 'react-icons/lib/md';
import groupAvatar from '../assets/img/group.jpeg';
import "./Header.css";

export const Header = ({ users, groupName }) => {
    const groupUsers = users.map(user => user.userName).join(", ");

    return (
        <div className="header">
            <button className="header-back-action" type="button">
                <MdArrowBack />
            </button>
            <img src={groupAvatar} className="header-group-avatar" alt="group" />
            <div className="header-group-info">
                <div className="group-name">{groupName}</div>
                <div className="group-users">{groupUsers}</div>
            </div>
        </div>
    )
}