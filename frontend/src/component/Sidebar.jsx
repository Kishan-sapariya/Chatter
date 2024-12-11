import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { User } from "lucide-react";
import SidebarSkeleton from "../component/skeleton/sidebarSkeleton";
import image from "../assets/image.png";
import useAuthStore from "../store/useAuthStore";

const Sidebar = () => {
  const {
    getUsers,
    users,
    isUserLoading,
    selectedUser,
    setSelectedUser,
    isSidebarOpen,
    setIsSidebarOpen,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  if (isUserLoading) return <SidebarSkeleton />;

  const handleUserClick = (user) => {
    if (!selectedUser || selectedUser._id !== user._id) {
      setSelectedUser(user);
      setIsSidebarOpen(false);
    }
  };

  return (
    <div
      className={`flex flex-col relative p-4 w-[100%] sm:w-[40%] ${
        isSidebarOpen ? "" : "hidden sm:block"
      }`}
    >
      <div className="h-screen bg-slate-600 absolute right-0 top-0 w-[1px] hidden sm:block"></div>
      <div className="flex gap-2 w-full">
        <User className="size-6" />
        <span className="text-xl mb-2">Contacts</span>
      </div>
      <div className="w-[100%] h-[1px] bg-gray-400"></div>
      <div className="flex flex-col">
        {users.map((user) => (
          <div key={user._id}>
            <button
              key={user._id}
              onClick={() => handleUserClick(user)}
              className={`flex gap-2 w-full mt-2 p-2 ${
                selectedUser && selectedUser._id === user._id
                  ? "bg-base-300 ring-1 ring-slate-400 rounded-md"
                  : ""
              }`}
            >
              <div className="relative">
                <img
                  src={user.profilePic || image}
                  alt={user.fullName}
                  className="size-12 object-cover rounded-full"
                />
                {onlineUsers.includes(user._id) && (
                  <span
                    className="absolute right-0 bottom-0 size-3 bg-green-500
                  rounded-full ring-2 ring-base-200"
                  ></span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xl">{user.fullName}</span>
                <span className="text-xs text-left">
                  {onlineUsers.includes(user._id) ? "online" : "offline"}
                </span>
              </div>
            </button>
            <div className="w-[100%] h-[1px] bg-gray-400 mt-1 sm:hidden"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
