import React, { useState } from 'react';
import { Bot } from '../types';
import { CloseIcon } from './icons';

interface BotCreationModalProps {
  onCreate: (newBot: Omit<Bot, 'id'>) => void;
  onClose: () => void;
}

const BotCreationModal: React.FC<BotCreationModalProps> = ({ onCreate, onClose }) => {
  const [name, setName] = useState('');
  const [systemInstruction, setSystemInstruction] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomSeed = Math.random().toString(36).substring(7);
    onCreate({
      name,
      systemInstruction,
      avatarUrl: avatarUrl || `https://picsum.photos/seed/${randomSeed}/200`
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-primary rounded-card shadow-2xl p-8 max-w-lg w-full relative border-2 border-highlight">
        <button onClick={onClose} className="absolute top-4 right-4 text-highlight/70 hover:text-hover-highlight">
          <CloseIcon />
        </button>
        <h2 className="text-2xl font-display mb-6 text-hover-highlight">Create New Bot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1 text-highlight">Bot Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-secondary border border-highlight/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="systemInstruction" className="block text-sm font-medium mb-1 text-highlight">System Instruction / Prompt</label>
            <textarea
              id="systemInstruction"
              value={systemInstruction}
              onChange={(e) => setSystemInstruction(e.target.value)}
              className="w-full bg-secondary border border-highlight/50 rounded-md py-2 px-3 h-32 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="avatarUrl" className="block text-sm font-medium mb-1 text-highlight">Avatar URL (Optional)</label>
            <input
              id="avatarUrl"
              type="text"
              value={avatarUrl}
              onChange={(e) => setAvatarUrl(e.target.value)}
              placeholder="Defaults to a random image"
              className="w-full bg-secondary border border-highlight/50 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-highlight focus:border-highlight"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-gradient-to-br from-accent to-purple-800 text-hover-highlight font-display font-bold py-2 px-6 rounded-pill shadow-button hover:shadow-button-hover hover:from-hover-accent hover:to-accent transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Create Bot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BotCreationModal;