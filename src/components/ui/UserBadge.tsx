import React from "react";

interface UserBadgeProps {
  user: {
    _id: string;
    username: string;
  };
  handleFunction: () => void;
}

const UserBadge: React.FC<UserBadgeProps> = ({ user, handleFunction }) => {
  return (
    <div
      className="flex items-center gap-2 px-2 py-1 bg-gray-200 rounded-md text-xs font-medium"
      style={{ display: "inline-flex" }}
    >
      <span>{user.username}</span>
      <button
        onClick={handleFunction}
        className="text-red-500 hover:text-red-700 focus:outline-none"
      >
        ✕
      </button>
    </div>
  );
};

export default UserBadge;
