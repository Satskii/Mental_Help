
import React, { useState } from 'react';
import ChatSidebar from '@/components/ChatSidebar';
import ChatInterface from '@/components/ChatInterface';
import ResizablePanel from '@/components/ResizablePanel';

const Chat: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="flex-1 overflow-hidden">
        <div className="chat-layout flex h-full">
          {/* Mobile sidebar toggle */}
          <div className="md:hidden fixed top-4 left-4 z-50">
            <button 
              onClick={toggleMobileSidebar}
              className="p-2 bg-background border rounded-md shadow-sm"
            >
              {isMobileSidebarOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          {/* Mobile sidebar */}
          <div className={`chat-panel md:hidden ${isMobileSidebarOpen ? 'active' : ''}`}>
            <ChatSidebar onClose={() => setIsMobileSidebarOpen(false)} />
          </div>

          {/* Desktop resizable layout */}
          <div className="hidden md:block h-full">
            <ResizablePanel 
              defaultSizes={[25, 75]} 
              minSizes={[15, 30]}
              direction="horizontal"
            >
              <ChatSidebar />
              <ChatInterface />
            </ResizablePanel>
          </div>

          {/* Mobile chat interface (when sidebar is closed) */}
          <div className="md:hidden w-full h-full">
            {!isMobileSidebarOpen && <ChatInterface />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
