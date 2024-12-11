import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="flex justify-center items-center h-[100%] bg-base-100 w-0 sm:w-[90%]">
      <div className="hidden sm:flex justify-center items-center">
        <div className="max-w-md text-center space-y-6">
          {/* Icon Display */}
          <div className="flex justify-center gap-4 mb-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center
              justify-center animate-bounce"
              >
                <MessageSquare className="size-10  text-primary " />
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold">Welcome to Chatter!</h2>
          <p className="text-base-content/60">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;
