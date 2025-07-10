import React, { useState } from 'react';
import { Heart, MessageCircle, Share, MoreHorizontal, Send } from 'lucide-react';

interface PostCardProps {
  post: {
    id: number;
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    image?: string;
    likes: number;
    comments: Array<{
      id: number;
      author: string;
      content: string;
    }>;
    timestamp: string;
    liked: boolean;
  };
  onLike: () => void;
  onAddComment: (comment: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onLike, onAddComment }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment.trim());
      setNewComment('');
    }
  };

  const handleLike = () => {
    onLike();
    // Add a small pulse animation
    const element = document.getElementById(`like-btn-${post.id}`);
    if (element) {
      element.classList.add('animate-pulse-once');
      setTimeout(() => element.classList.remove('animate-pulse-once'), 300);
    }
  };

  return (
    <div className="post-card overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-sm text-gray-500">{post.timestamp}</p>
          </div>
        </div>
        
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5 text-gray-500" />
        </button>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 leading-relaxed">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.image && (
        <div className="relative">
          <img
            src={post.image}
            alt="Post content"
            className="w-full h-96 object-cover"
          />
        </div>
      )}

      {/* Engagement Stats */}
      <div className="px-4 py-3 flex items-center justify-between text-sm text-gray-500 border-b border-gray-100">
        <div className="flex items-center gap-2">
          {post.likes > 0 && (
            <>
              <div className="flex items-center gap-1">
                <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <Heart className="w-3 h-3 text-white fill-current" />
                </div>
                <span>{post.likes}</span>
              </div>
            </>
          )}
        </div>
        
        {post.comments.length > 0 && (
          <button 
            onClick={() => setShowComments(!showComments)}
            className="hover:underline"
          >
            {post.comments.length} comment{post.comments.length !== 1 ? 's' : ''}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-4 py-2 flex items-center justify-around">
        <button
          id={`like-btn-${post.id}`}
          onClick={handleLike}
          className={`interaction-button flex-1 justify-center ${
            post.liked ? 'text-red-500' : ''
          }`}
        >
          <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
          <span className="font-medium">Like</span>
        </button>
        
        <button 
          onClick={() => setShowComments(!showComments)}
          className="interaction-button flex-1 justify-center"
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Comment</span>
        </button>
        
        <button className="interaction-button flex-1 justify-center">
          <Share className="w-5 h-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="border-t border-gray-100 animate-fade-in">
          {/* Existing Comments */}
          {post.comments.map((comment) => (
            <div key={comment.id} className="px-4 py-3 flex gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {comment.author.charAt(0)}
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-gray-50 rounded-2xl px-3 py-2">
                  <p className="font-semibold text-sm text-gray-900">{comment.author}</p>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            </div>
          ))}
          
          {/* Add Comment */}
          <div className="px-4 py-3 flex gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">You</span>
            </div>
            <form onSubmit={handleAddComment} className="flex-1 flex gap-2">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-gray-50 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`p-2 rounded-full transition-all ${
                  newComment.trim()
                    ? 'text-blue-600 hover:bg-blue-50'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
