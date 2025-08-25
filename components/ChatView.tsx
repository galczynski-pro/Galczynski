import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Bot, ChatMessage, MessageAuthor } from '../types';
import { sendMessageStream } from '../services/geminiService';
import { BackIcon, SendIcon } from './icons';

interface ChatViewProps {
  bot: Bot;
  onBack: () => void;
}

const ChatView: React.FC<ChatViewProps> = ({ bot, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSend = useCallback(async () => {
    if (!input.trim() || isLoading) return;
  
    const userMessage: ChatMessage = { author: MessageAuthor.USER, text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
  
    const currentHistory = [...messages, userMessage];
  
    try {
      const stream = await sendMessageStream(bot.systemInstruction, currentHistory, input);
  
      let botResponse = '';
      setMessages(prev => [...prev, { author: MessageAuthor.BOT, text: '...' }]);
      
      for await (const chunk of stream) {
        botResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1] = { author: MessageAuthor.BOT, text: botResponse };
          return newMessages;
        });
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { author: MessageAuthor.BOT, text: 'Sorry, I encountered an error.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, bot.systemInstruction, messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto bg-primary rounded-card shadow-2xl border-2 border-highlight">
      <div className="flex items-center p-4 border-b border-highlight bg-secondary">
        <button onClick={onBack} className="mr-4 text-highlight/70 hover:text-hover-highlight">
          <BackIcon />
        </button>
        <img src={bot.avatarUrl} alt={bot.name} className="w-12 h-12 rounded-full mr-4 border-2 border-highlight" />
        <h2 className="text-2xl font-display text-hover-highlight">{bot.name}</h2>
      </div>

      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.author === MessageAuthor.USER ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-prose p-4 rounded-xl shadow-md ${msg.author === MessageAuthor.USER ? 'bg-gradient-to-br from-accent to-purple-800 text-white rounded-br-sm' : 'bg-secondary text-light-text rounded-bl-sm'}`}>
               <p className="whitespace-pre-wrap">{msg.text}</p>
            </div>
          </div>
        ))}
         {isLoading && messages.length > 0 && messages[messages.length-1].author === MessageAuthor.BOT && messages[messages.length-1].text === '...' &&(
            <div className="flex justify-start mb-4">
                <div className="max-w-prose p-3 rounded-lg bg-secondary">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-highlight rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-highlight rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-highlight rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-highlight bg-secondary">
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex items-center gap-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type your message..."
            className="flex-grow bg-primary border border-highlight/50 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-highlight resize-none max-h-32"
            disabled={isLoading}
            rows={1}
          />
          <button
            type="submit"
            className="bg-highlight w-12 h-12 flex-shrink-0 flex items-center justify-center rounded-full text-primary hover:bg-hover-highlight disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-110"
            disabled={isLoading || !input.trim()}
          >
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;