
import React from 'react';
import { PostCard } from './PostCard';

interface Post {
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
}

interface PostFeedProps {
  posts: Post[];
  onLikePost: (postId: number) => void;
  onAddComment: (postId: number, comment: string) => void;
}

export const PostFeed: React.FC<PostFeedProps> = ({ posts, onLikePost, onAddComment }) => {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <div key={post.id} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
          <PostCard
            post={post}
            onLike={() => onLikePost(post.id)}
            onAddComment={(comment) => onAddComment(post.id, comment)}
          />
        </div>
      ))}
    </div>
  );
};
