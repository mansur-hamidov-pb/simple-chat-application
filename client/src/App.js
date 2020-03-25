import React from 'react';
import io from 'socket.io-client';
import { NewUser } from './components/NewUser';

import './styles.css';
import { events } from './events';
import { MessagesList } from './components/MessagesList';
import { Header } from './components/Header';
import { MessageInput } from './components/MessageInput';

const socketUrl = 'http://192.168.1.119:8080';

function App() {
    const [users, setUsers] = React.useState({});
    const [socket, setSocket] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [user, setUser] = React.useState(null);
    const [message, setMessage] = React.useState('');
    const [messages, updateMessages] = React.useState([]);

    React.useEffect(() => {
        const socket = io(socketUrl);
        setSocket(socket);

        socket.on('connect', () => console.log('Connection to socket server established'));

        socket.on(events.MESSAGE, updateMessages);

        socket.on(events.USERS, setUsers)

    }, []);

    const verifyUser = (userName) => {
        socket.emit(events.VERIFY_USER, userName, (response) => {
            if (response.userExists) {
                setError("User exists")
            } else {
                setUser(response.user);
                setError(null);
            }
        });
    };

    const sendMessage = (event) => {
        event.preventDefault();
        if (message.length) {
            const _message = { sender: user.id, text: message };
            socket.emit(events.MESSAGE, _message);
            setMessage('');
        }
    }


    return (
        <div className="App">
            {user ? (
                <form onSubmit={sendMessage} className="chat-screen">
                    <Header users={users} groupName="Family"/>
                    <MessagesList messages={messages} user={user} users={users}/>
                    <MessageInput onChange={e => setMessage(e.target.value)} value={message} onSubmit={sendMessage}/>
                </form> 
            ) : (
                <NewUser error={error} verifyUser={verifyUser}/>
            )}
            
        </div>
    );
}

export default App;
