
import React, { useState } from 'react';
import { Image, Video, Smile, MapPin } from 'lucide-react';

interface PostCreatorProps {
  user: {
    name: string;
    avatar: string;
  };
  onCreatePost: (post: { content: string; image?: string }) => void;
}

export const PostCreator: React.FC<PostCreatorProps> = ({ user, onCreatePost }) => {
  const [content, setContent] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() || imageUrl.trim()) {
      onCreatePost({
        content: content.trim(),
        image: imageUrl.trim() || undefined
      });
      setContent('');
      setImageUrl('');
      setShowImageInput(false);
    }
  };

  return (
    <div className="post-card p-4 animate-fade-in">
      <div className="flex gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full"
        />
        
        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`What's on your mind, ${user.name.split(' ')[0]}?`}
            className="w-full p-3 bg-gray-50 rounded-3xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            rows={content ? 3 : 1}
          />
          
          {showImageInput && (
            <div className="mt-3">
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              {imageUrl && (
                <div className="mt-2">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="max-w-full h-32 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowImageInput(!showImageInput)}
                className={`interaction-button ${showImageInput ? 'text-blue-600 bg-blue-50' : ''}`}
              >
                <Image className="w-5 h-5" />
                <span className="text-sm font-medium">Photo</span>
              </button>
              
              <button type="button" className="interaction-button">
                <Video className="w-5 h-5" />
                <span className="text-sm font-medium">Video</span>
              </button>
              
              <button type="button" className="interaction-button">
                <Smile className="w-5 h-5" />
                <span className="text-sm font-medium">Feeling</span>
              </button>
            </div>
            
            <button
              type="submit"
              disabled={!content.trim() && !imageUrl.trim()}
              className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 ${
                content.trim() || imageUrl.trim()
                  ? 'bg-blue-600 text-white hover:bg-blue-700 hover:scale-105'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
