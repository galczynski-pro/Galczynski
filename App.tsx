import React, { useState, useCallback } from 'react';
import { UserRole, Bot } from './types';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import ChatView from './components/ChatView';
import { HeaderIcon } from './components/icons';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [bots, setBots] = useState<Bot[]>([
    {
      id: '1',
      name: 'Helpful Assistant',
      systemInstruction: 'You are a helpful and friendly assistant. You are concise and to the point.',
      avatarUrl: 'https://picsum.photos/seed/assistant/200'
    },
    {
      id: '2',
      name: 'Creative Writer',
      systemInstruction: 'You are a creative writer who helps users brainstorm ideas for stories, poems, and scripts. You use vivid imagery and a rich vocabulary.',
      avatarUrl: 'https://picsum.photos/seed/writer/200'
    },
    {
      id: '3',
      name: 'Code Master',
      systemInstruction: 'You are an expert programmer who provides clean, efficient, and well-commented code solutions in various languages. You always explain the logic behind your code.',
      avatarUrl: 'https://picsum.photos/seed/code/200'
    }
  ]);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);

  const handleLogin = useCallback((role: UserRole) => {
    setUserRole(role);
    setSelectedBot(null);
  }, []);

  const handleLogout = useCallback(() => {
    setUserRole(null);
    setSelectedBot(null);
  }, []);

  const handleCreateBot = useCallback((newBot: Omit<Bot, 'id'>) => {
    setBots(prevBots => [...prevBots, { ...newBot, id: Date.now().toString() }]);
  }, []);

  const handleSelectBot = useCallback((bot: Bot) => {
    setSelectedBot(bot);
  }, []);

  const handleBackToDashboard = useCallback(() => {
    setSelectedBot(null);
  }, []);

  const renderContent = () => {
    if (!userRole) {
      return <Login onLogin={handleLogin} />;
    }

    if (userRole === UserRole.ADMIN) {
      return <AdminDashboard bots={bots} onCreateBot={handleCreateBot} />;
    }

    if (userRole === UserRole.USER) {
      if (selectedBot) {
        return <ChatView bot={selectedBot} onBack={handleBackToDashboard} />;
      }
      return <UserDashboard bots={bots} onSelectBot={handleSelectBot} />;
    }
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col">
      <header className="bg-black/70 backdrop-blur-md shadow-lg p-4 flex justify-between items-center w-full border-b-2 border-highlight">
        <div className="flex items-center gap-3">
            <HeaderIcon />
            <h1 className="text-2xl font-display text-hover-highlight">AI Bot Platform</h1>
        </div>
        {userRole && (
          <button
            onClick={handleLogout}
            className="bg-gradient-to-br from-accent to-purple-800 text-hover-highlight font-display font-bold py-2 px-6 rounded-pill shadow-button hover:shadow-button-hover hover:from-hover-accent hover:to-accent transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Logout
          </button>
        )}
      </header>
      <main className="flex-grow p-4 sm:p-6 md:p-8">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;