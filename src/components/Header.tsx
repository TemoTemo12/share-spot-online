
import React, { useState } from 'react';
import { Search, Home, Users, Bell, MessageCircle, Settings, User } from 'lucide-react';

interface HeaderProps {
  user: {
    name: string;
    avatar: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('home');
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Search */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">f</span>
              </div>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search Facebook"
                className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="hidden md:flex items-center gap-2">
            {[
              { id: 'home', icon: Home, label: 'Home' },
              { id: 'friends', icon: Users, label: 'Friends' },
              { id: 'notifications', icon: Bell, label: 'Notifications' },
              { id: 'messages', icon: MessageCircle, label: 'Messages' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-gray-500 hover:bg-gray-100'
                }`}
                title={tab.label}
              >
                <tab.icon className="w-6 h-6" />
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden sm:block font-medium text-gray-900">{user.name}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">See your profile</p>
                    </div>
                  </div>
                </div>
                
                <div className="py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <User className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Profile</span>
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors">
                    <Settings className="w-5 h-5 text-gray-500" />
                    <span className="text-gray-700">Settings</span>
                  </button>
                </div>
                
                <div className="border-t border-gray-100 py-1">
                  <button className="flex items-center gap-3 w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors text-gray-700">
                    Log Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
