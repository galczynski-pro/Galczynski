
import React from 'react';
import { Bot } from '../types';
import BotCard from './BotCard';

interface UserDashboardProps {
  bots: Bot[];
  onSelectBot: (bot: Bot) => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ bots, onSelectBot }) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-display mb-6 text-center text-hover-highlight">Choose a Bot to Chat With</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bots.map(bot => (
          <BotCard
            key={bot.id}
            bot={bot}
            onClick={() => onSelectBot(bot)}
            isClickable={true}
          />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;