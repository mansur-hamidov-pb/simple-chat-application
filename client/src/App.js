import React from 'react';
import io from 'socket.io-client';
import { NewUser } from './components/NewUser';

import './styles.css';
import { events } from './events';
import { MessagesList } from './components/MessagesList';
import { Header } from './components/Header';

const socketUrl = 'http://192.168.1.113:8080';

function App() {
    const [socket, setSocket] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [messages, updateMessages] = React.useState([]);

    const temporaryUsers = [
        { userName: "Mansur" },
        { userName: "Hamdulla "},
        { userName: "Misha" }
    ];

    React.useEffect(() => {
        const socket = io(socketUrl);
        setSocket(socket);

        socket.on('connect', () => console.log('Connection to socket server established'));

        socket.on(events.MESSAGE, (data) => updateMessages(data))

    }, []);

    const verifyUser = (userName) => {
        socket.emit(events.VERIFY_USER, userName, (response) => {
            if (response.userExists) {
                setError("User exists")
            } else {
                setUser(response.user);
                console.log(response.user);
                setError(null);
            }
        });
    };

    const sendMessage = (event) => {
        event.preventDefault();
        const _message = { sender: user.id, text: message };
        socket.emit(events.MESSAGE, _message);
        setMessage('')
    }


    return (
        <div className="App">
            {!user ? (
                <form onSubmit={sendMessage}>
                    <Header users={temporaryUsers} groupName="Family"/>
                    <MessagesList messages={messages} user={user}/>
                    <input
                        type="text"
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="message"
                    />
                </form> 
            ) : (
                <NewUser error={error} verifyUser={verifyUser}/>
            )}
            
        </div>
    );
}

export default App;
