import React from "react";
import { 
  IoHome, IoGrid, IoPeople, IoSearch, IoPerson, IoSettings 
} from "react-icons/io5";

const trendingUsers = [
  { name: "Alice Johnson", score: 98, avatar: "https://i.pravatar.cc/40?img=1" },
  { name: "Bob Smith", score: 89, avatar: "https://i.pravatar.cc/40?img=2" },
  { name: "Charlie Lee", score: 92, avatar: "https://i.pravatar.cc/40?img=3" },
];

const navItems = [
  { name: "Home", icon: <IoHome /> },
  { name: "Feed", icon: <IoGrid /> },
  { name: "Friends", icon: <IoPeople /> },
  { name: "Search", icon: <IoSearch /> },
  { name: "Users", icon: <IoPerson /> },
  { name: "Settings", icon: <IoSettings /> },
];

const Sidebar = () => {
  return (
    <aside className="hidden lg:flex flex-col w-64 bg-background border-r border-gray-200 h-screen p-6 justify-between">
      {/* Navigation Buttons */}
      
      <div className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.name}
            className="flex items-center gap-3 px-4 py-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/10 transition-all duration-300 font-medium text-sm"
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.name}</span>
          </button>
        ))}
      </div>

      {/* Separator */}
      <div className="border-t border-gray-200 my-4"></div>

      {/* Trending Section */}
      <div>
        <h3 className="text-gray-500 uppercase font-semibold text-xs mb-2">Trending Persons</h3>
        <div className="flex flex-col gap-3">
          {trendingUsers.map((user) => (
            <div
              key={user.name}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary/10 transition-all duration-300 cursor-pointer"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-medium text-gray-700">{user.name}</span>
                <span className="text-gray-400 text-xs">Score: {user.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
