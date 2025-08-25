import React from 'react';
import { UserRole } from '../types';
import { AdminIcon, UserIcon } from './icons';

interface LoginProps {
  onLogin: (role: UserRole) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
      <div className="bg-gradient-to-br from-secondary to-primary p-10 rounded-card shadow-xl text-center max-w-md w-full border border-highlight/30">
        <h2 className="text-3xl font-display mb-2 text-hover-highlight">Welcome</h2>
        <p className="text-light-text mb-8">Please select your role to continue</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => onLogin(UserRole.ADMIN)}
            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-transparent text-hover-highlight font-display font-bold py-3 px-6 rounded-pill hover:bg-highlight hover:text-primary transition-all duration-300 transform hover:scale-105 border border-highlight"
          >
            <AdminIcon />
            Login as Admin
          </button>
          <button
            onClick={() => onLogin(UserRole.USER)}
            className="flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-br from-accent to-purple-800 text-hover-highlight font-display font-bold py-3 px-6 rounded-pill shadow-button hover:shadow-button-hover hover:from-hover-accent hover:to-accent transition-all duration-300 transform hover:scale-105"
          >
            <UserIcon />
            Login as User
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;