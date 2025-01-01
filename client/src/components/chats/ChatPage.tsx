import React from 'react';
import ChatBase from './ChatBase';

interface ChatPageProps {
    // define your props here
}

const ChatPage: React.FC<ChatPageProps> = () => {
    return (
        <div>
            <h1>Hellow I am chat!</h1>
            <ChatBase/>
        </div>
    );
};

export default ChatPage;