import React from 'react';
import { Bot } from '../types';

interface BotCardProps {
  bot: Bot;
  onClick?: () => void;
  isClickable?: boolean;
}

const BotCard: React.FC<BotCardProps> = ({ bot, onClick, isClickable = false }) => {
  const cardClasses = `
    bg-gradient-to-br from-secondary to-primary rounded-card shadow-lg overflow-hidden flex flex-col border border-highlight/30
    transition-all duration-300 transform 
    ${isClickable ? 'hover:-translate-y-2 hover:shadow-xl cursor-pointer' : ''}
  `;

  return (
    <div className={cardClasses} onClick={onClick}>
       <div className="p-4 flex justify-center items-center bg-primary/50">
         <img className="w-32 h-32 object-cover rounded-full border-4 border-highlight shadow-highlight" src={bot.avatarUrl} alt={`${bot.name} avatar`} />
       </div>
      <div className="p-4 flex-grow flex flex-col text-center">
        <h3 className="text-2xl font-display mb-2 text-hover-highlight">{bot.name}</h3>
        <p className="text-light-text text-sm flex-grow">{bot.systemInstruction.substring(0, 100)}...</p>
      </div>
    </div>
  );
};

export default BotCard;