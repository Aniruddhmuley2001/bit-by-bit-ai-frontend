import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import './TroubleshootingPage.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/user/userSlice'; 

const TroubleshootingPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const chatEndRef = useRef(null);
  const user = useSelector(selectUser);
  const navigate = useNavigate();


  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const location = useLocation();

  useEffect(() => {
    if (user?.email == null && location.pathname !== "/"){
      window.alert("Please login to continue");
      navigate("/");
    }
    // First message
    setMessages([{ type: 'user', text: 'Troubleshooting' }]);

    // Second message after a delay
    const timer = setTimeout(() => {
      setMessages(prev => [...prev, 
        { type: 'bot', text: 'Hello! To begin with, please enter your issue in the chat. ' }
      ]);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to handle API calls
  const handleBotResponse = async (userMessage) => {
    try {
      const response = await fetch('https://bit-by-bit-ai-agents.onrender.com/troubleshoot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_prompt": userMessage })
      });
      const data = await response.json();
      // console.log(data);
      // data?.data?.messages[-1]?.content
      // For now, using a placeholder response
      return data?.data?.messages[data?.data?.messages?.length - 1]?.content;
    } catch (error) {
      console.error('Error:', error);
      return "Sorry, I encountered an error processing your request.";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: inputMessage }]);
    const userMessage = inputMessage;
    setInputMessage('');

    // Reset textarea height
    const textarea = e.target.querySelector('.chat-input');
    if (textarea) {
        textarea.style.height = '40.4px';
    }
      
    // Handle API call for user's custom message
    setTimeout(async () => {
      const botResponse = await handleBotResponse(userMessage);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: botResponse
      }]);
    }, 1000);
  }

  return (
    <div className="troubleshooting-page">
      <Header />
        <div className="chat-container">
            <div className="breadcrumb">
                <Link to="/" className="home-link" onClick= {async () => {
                  try {
                    const response = await fetch('https://bit-by-bit-ai-agents.onrender.com/flush', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                    });
                    const data = await response.json();
                    console.log(data);
                    return data;
                  } catch (error) {
                    console.error('Error:', error);
                    return "Sorry, I encountered an error processing your request.";
                  }
                }}>Home</Link>
                <span className="separator"> {'>'} </span>
                <span className="breadcrumb-text">Troubleshooting</span>
            </div>

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                        <div className="message-avatar">
                            {message.type === 'bot' ? '🤖' : 'A'}
                        </div>
                        <div className='message-content-container'>
                            <div className="message-content">
                                {message.text}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="chat-input-form">
                <textarea
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="chat-input"
                    rows="1"
                    onInput={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
                    }}
                />
                <button type="submit" className="send-button">Send</button>
            </form>
        </div>
    </div>
  );
};

export default TroubleshootingPage;