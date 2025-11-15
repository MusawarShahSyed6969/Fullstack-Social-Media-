import React from "react";
import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";
import PostComposer from "../components/PostComposer";
import PostCard from "../components/PostCard";

const posts = [
  {
    user: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/40?img=6" },
    time: "6h ago",
    content:
      "Just finished designing a new mobile app! Really excited about how it turned out. What do you all think about minimalist design trends? 🎨",
  },
  {
    user: { name: "John Doe", avatar: "https://i.pravatar.cc/40?img=7" },
    time: "2d ago",
    content:
      "Exploring new UI frameworks. TailwindCSS + React combination is amazing! 🔥",
  },
  {
    user: { name: "Saeed", avatar: "https://i.pravatar.cc/40?img=7" },
    time: "3d ago",
    content:
      "Mein Gandu hn! 🔥",
  },
];

const Home = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main layout */}
      <div className="flex max-w-7xl mx-auto px-4 pt-6 gap-6">
        {/* Sidebar (desktop only) */}
        <Sidebar />

        {/* Center feed */}
        <main className="flex-1 flex justify-center">
          <div className="w-full max-w-xl flex flex-col gap-6">
            {/* Post composer */}
            <PostComposer />

            {/* Posts feed */}
            <div className="flex flex-col gap-6">
            {posts.map((post, idx) => (
                <PostCard
                  key={idx}
                  user={post.user}
                  time={post.time}
                  content={post.content}
                />
              ))}
            </div>
          </div>
        </main>

        {/* Optional right sidebar (can add trending later) */}
        <div className="hidden lg:flex w-64 flex-col gap-4">
          {/* Placeholder for trending/ads */}
        </div>
      </div>
    </div>
  );
};

export default Home;
