import React, { useState } from "react";
import { IoImage, IoHappy, IoLocationSharp, IoSend } from "react-icons/io5";

const PostComposer = () => {
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [photo, setPhoto] = useState(null);

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) setPhoto(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    console.log({ content, photo });
    setContent("");
    setPhoto(null);
    setShowModal(false);
  };

  const actionButtons = [
    { name: "Photo", icon: <IoImage className="text-red-500" />, action: () => {} },
    { name: "Feeling", icon: <IoHappy className="text-yellow-400" />, action: () => {} },
    { name: "Location", icon: <IoLocationSharp className="text-green-500" />, action: () => {} },
    { name: "Post", icon: <IoSend className="text-blue-500" />, action: handleSubmit },
  ];

  return (
    <>
      {/* Desktop / Tablet */}
      <div className="hidden sm:flex flex-col bg-background border border-gray-200 rounded-lg p-4 gap-3 shadow-sm">
        <div className="flex gap-3 items-start">
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="User Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's on your mind?"
            className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            rows={3}
          />
        </div>
        {photo && (
          <div className="relative">
            <img src={photo} alt="Preview" className="w-full h-48 object-cover rounded-md" />
          </div>
        )}
        <div className="flex justify-around mt-2">
          {actionButtons.map((btn) => (
            <label
              key={btn.name}
              className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/10 cursor-pointer transition-all font-medium text-sm"
            >
              {btn.icon}
              {btn.name === "Photo" ? (
                <>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                  {btn.name}
                </>
              ) : (
                btn.name
              )}
            </label>
          ))}
        </div>
      </div>

      {/* Mobile: open modal */}
      <div className="sm:hidden flex flex-col gap-3 bg-background border border-gray-200 rounded-lg p-3 shadow-sm">
        <button
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 w-full hover:bg-primary/10 transition-all"
          onClick={() => setShowModal(true)}
        >
          <img
            src="https://i.pravatar.cc/40?img=5"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-gray-500">What's on your mind?</span>
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 max-w-md p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 text-xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <div className="flex gap-3 items-start mb-3">
              <img
                src="https://i.pravatar.cc/40?img=5"
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                rows={3}
              />
            </div>
            {photo && (
              <div className="relative mb-3">
                <img src={photo} alt="Preview" className="w-full h-48 object-cover rounded-md" />
              </div>
            )}
            <div className="flex justify-around mt-2">
              {actionButtons.map((btn) => (
                <label
                  key={btn.name}
                  className="flex items-center gap-1 px-3 py-2 rounded-md hover:bg-primary/10 cursor-pointer transition-all font-medium text-sm"
                >
                  {btn.icon}
                  {btn.name === "Photo" ? (
                    <>
                      <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                      {btn.name}
                    </>
                  ) : (
                    btn.name
                  )}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PostComposer;
