import React, { useState } from "react";
import { IoHeart, IoChatbubble, IoShareSocial } from "react-icons/io5";

const sampleComments = [
  { name: "Alice", avatar: "https://i.pravatar.cc/40?img=1", comment: "Love the design! 😍" },
  { name: "Bob", avatar: "https://i.pravatar.cc/40?img=2", comment: "Minimalism is the future!" },
  { name: "Charlie", avatar: "https://i.pravatar.cc/40?img=3", comment: "Great work!" },
];

const PostCard = ({ user, time, content }) => {
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 flex flex-col gap-3">
      {/* User info */}
      <div className="flex items-center gap-3">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-text">{user.name}</span>
          <span className="text-gray-400 text-xs">{time}</span>
        </div>
      </div>

      {/* Post content */}
      <p className="text-text">{content}</p>

      {/* Action buttons */}
      <div className="flex justify-around border-t border-gray-200 pt-2">
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-2 px-3 py-1 rounded-md transition-all hover:bg-primary/10 ${
            liked ? "text-red-500" : "text-gray-600"
          }`}
        >
          <IoHeart className="text-lg" />
          <span>Like</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 px-3 py-1 rounded-md transition-all hover:bg-primary/10 text-gray-600"
        >
          <IoChatbubble className="text-lg" />
          <span>Comment</span>
        </button>
        <button className="flex items-center gap-2 px-3 py-1 rounded-md transition-all hover:bg-primary/10 text-gray-600">
          <IoShareSocial className="text-lg" />
          <span>Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="flex flex-col gap-3 mt-3 border-t border-gray-100 pt-3">
          {sampleComments.map((c, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <img
                src={c.avatar}
                alt={c.name}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="bg-gray-100 rounded-xl p-2 flex-1">
                <span className="font-medium text-text">{c.name}</span>
                <p className="text-sm text-text">{c.comment}</p>
              </div>
            </div>
          ))}
          {/* Add new comment input */}
          <div className="flex items-center gap-2 mt-2">
            <img
              src="https://i.pravatar.cc/40?img=5"
              alt="You"
              className="w-8 h-8 rounded-full object-cover"
            />
            <input
              type="text"
              placeholder="Write a comment..."
              className="flex-1 p-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary text-sm"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;
