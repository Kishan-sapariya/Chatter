import { LogInIcon, MessageSquare, Settings, User } from "lucide-react";
import React from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { logout, authUser, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return null; 
  }

  return (
    <>
        <div className="flex justify-between h-[60px] w-full p-2 sm:px-24">
          <div>
            <Link to="/" className="flex gap-1 items-center justify-center">
              <div
                className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
              transition-colors"
              >
                <MessageSquare className="w-7 h-7 text-primary" />
              </div>
              <span className="text-xl sm:text-2xl font-medium">Chatter</span>
            </Link>
          </div>
          <div>
            {authUser ? (
              <div className="flex justify-between pt-3 gap-2 sm:gap-7">
                <Link to="/profile" className="flex items-center gap-1">
                  <User className="size-6" />
                  <span className="hidden sm:block">Profile</span>
                </Link>
                <Link to="/setting" className="flex items-center gap-1">
                  <Settings className="size-6" />
                  <span className="hidden sm:block">Settings</span>
                </Link>
                <div className="flex gap-1">
                  <LogInIcon onClick={logout} />
                  <span className="hidden sm:block">Logout</span>
                </div>
              </div>
            ) : (
              <Link to="/setting" className="flex items-center gap-1">
                <Settings className="size-6" />
                <span className="hidden sm:block">Setting</span>
              </Link>
            )}
          </div>
        </div>
    </>
  );
};

export default Navbar;
