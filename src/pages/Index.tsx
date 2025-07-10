
import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { PostCreator } from '@/components/PostCreator';
import { PostFeed } from '@/components/PostFeed';
import { Sidebar } from '@/components/Sidebar';

const Index = () => {
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=faces",
    coverPhoto: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=300&fit=crop"
  });

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=faces"
      },
      content: "Just had the most amazing sunset walk on the beach! 🌅 Sometimes the simple moments are the most beautiful ones.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      likes: 24,
      comments: [
        { id: 1, author: "Mike Chen", content: "Gorgeous photo! Where was this taken?" },
        { id: 2, author: "Emma Wilson", content: "So peaceful! 😍" }
      ],
      timestamp: "2 hours ago",
      liked: false
    },
    {
      id: 2,
      author: {
        name: "Alex Rivera",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces"
      },
      content: "Excited to share that I just completed my first marathon! 🏃‍♂️ 26.2 miles of pure determination. Thank you to everyone who supported me along the way!",
      likes: 89,
      comments: [
        { id: 1, author: "Lisa Park", content: "Congratulations! That's incredible!" },
        { id: 2, author: "David Kim", content: "Amazing achievement! 🎉" },
        { id: 3, author: "Rachel Green", content: "So proud of you!" }
      ],
      timestamp: "5 hours ago",
      liked: true
    },
    {
      id: 3,
      author: {
        name: "Maria Garcia",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=faces"
      },
      content: "Homemade pasta night! 🍝 There's nothing quite like fresh linguine with homemade pesto. Recipe in the comments for anyone interested!",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&h=400&fit=crop",
      likes: 42,
      comments: [
        { id: 1, author: "Tony Stark", content: "Looks delicious! Can't wait for the recipe." }
      ],
      timestamp: "1 day ago",
      liked: false
    }
  ]);

  const handleCreatePost = (newPost) => {
    const post = {
      id: posts.length + 1,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      content: newPost.content,
      image: newPost.image,
      likes: 0,
      comments: [],
      timestamp: "Just now",
      liked: false
    };
    setPosts([post, ...posts]);
  };

  const handleLikePost = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            liked: !post.liked, 
            likes: post.liked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleAddComment = (postId, comment) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: [...post.comments, {
              id: post.comments.length + 1,
              author: user.name,
              content: comment
            }]
          }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={user} />
      
      <div className="container mx-auto px-4 pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar user={user} />
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-4">
            <PostCreator user={user} onCreatePost={handleCreatePost} />
            <PostFeed 
              posts={posts} 
              onLikePost={handleLikePost}
              onAddComment={handleAddComment}
            />
          </div>
          
          {/* Right Sidebar - Placeholder for friends, suggestions etc */}
          <div className="hidden lg:block">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Friend Requests</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img 
                    src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=50&h=50&fit=crop&crop=faces" 
                    alt="Friend request"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Jessica Brown</p>
                    <div className="flex gap-2 mt-1">
                      <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700">
                        Confirm
                      </button>
                      <button className="bg-gray-200 text-gray-700 px-3 py-1 rounded text-xs hover:bg-gray-300">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
