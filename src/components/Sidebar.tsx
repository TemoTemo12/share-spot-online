
import React from 'react';
import { Users, Bookmark, Clock, Calendar, Video, ShoppingBag, Star } from 'lucide-react';

interface SidebarProps {
  user: {
    name: string;
    avatar: string;
  };
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const menuItems = [
    { icon: Users, label: 'Friends', count: 127 },
    { icon: Bookmark, label: 'Saved', color: 'text-purple-600' },
    { icon: Clock, label: 'Memories', color: 'text-blue-600' },
    { icon: Calendar, label: 'Events', color: 'text-red-600' },
    { icon: Video, label: 'Watch', color: 'text-blue-500' },
    { icon: ShoppingBag, label: 'Marketplace', color: 'text-green-600' },
    { icon: Star, label: 'Favorites', color: 'text-yellow-500' },
  ];

  return (
    <div className="space-y-4">
      {/* User Profile Quick Access */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{user.name}</h3>
            <p className="text-sm text-gray-500">View your profile</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors text-left"
          >
            <item.icon className={`w-6 h-6 ${item.color || 'text-gray-600'}`} />
            <span className="font-medium text-gray-900">{item.label}</span>
            {item.count && (
              <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {item.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Shortcuts */}
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <h3 className="font-semibold text-gray-900 mb-3">Your Shortcuts</h3>
        <div className="space-y-2">
          {[
            { name: "Photography Club", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=40&h=40&fit=crop" },
            { name: "Tech Enthusiasts", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=40&h=40&fit=crop" },
            { name: "Food Lovers", image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=40&h=40&fit=crop" }
          ].map((shortcut, index) => (
            <button
              key={index}
              className="flex items-center gap-3 w-full p-2 hover:bg-gray-50 rounded-lg transition-colors text-left"
            >
              <img
                src={shortcut.image}
                alt={shortcut.name}
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="text-sm font-medium text-gray-900">{shortcut.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
