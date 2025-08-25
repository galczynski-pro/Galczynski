import React, { useState } from 'react';
import { Bot } from '../types';
import BotCard from './BotCard';
import BotCreationModal from './BotCreationModal';
import { PlusIcon } from './icons';

interface AdminDashboardProps {
  bots: Bot[];
  onCreateBot: (newBot: Omit<Bot, 'id'>) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bots, onCreateBot }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBot = (newBot: Omit<Bot, 'id'>) => {
    onCreateBot(newBot);
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-display text-hover-highlight">Admin Dashboard</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-gradient-to-br from-accent to-purple-800 text-hover-highlight font-display font-bold py-2 px-6 rounded-pill shadow-button hover:shadow-button-hover hover:from-hover-accent hover:to-accent transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <PlusIcon />
          Create Bot
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {bots.map(bot => (
          <BotCard key={bot.id} bot={bot} />
        ))}
      </div>
      {isModalOpen && (
        <BotCreationModal
          onCreate={handleCreateBot}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;