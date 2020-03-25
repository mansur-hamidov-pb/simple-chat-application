import React from 'react';

export const NewUser = ({ error, socket, verifyUser }) => {
    const [userName, setUserName] = React.useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();

        verifyUser(userName);
    };

    return (
        <form className="new-user-screen" onSubmit={handleFormSubmit}>
            <div className="user-name">
                <label htmlFor="username" className="user-name-label">Enter username</label>
                <input
                    className="user-name-input"
                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Username"
                />
                {error && <span className="error">{error}</span>}
            </div>
        </form>
        
    )
}