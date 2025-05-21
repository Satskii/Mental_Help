
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { PlusCircle, MessageSquare, Settings, Info, Home } from 'lucide-react';

interface ChatSidebarProps {
  onClose?: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({ onClose }) => {
  // Mock conversation history data
  const conversations = [
    { id: 1, title: 'Stress management techniques', timestamp: '2h ago' },
    { id: 2, title: 'Dealing with exam anxiety', timestamp: '1d ago' },
    { id: 3, title: 'Sleep improvement strategies', timestamp: '3d ago' }
  ];

  return (
    <aside className="h-full flex flex-col bg-sidebar p-4 w-full">
      <div className="flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-semibold">MindTalk</span>
        </Link>
        {onClose && (
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>
        )}
      </div>

      <Button 
        className="mb-4 justify-start"
        variant="default"
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        New Chat
      </Button>

      <div className="space-y-1 mb-4">
        <h3 className="text-xs font-medium text-muted-foreground px-2 py-1">
          Recent Conversations
        </h3>
        {conversations.map((convo) => (
          <Button
            key={convo.id}
            variant="ghost"
            className="w-full justify-start text-left font-normal px-2"
          >
            <MessageSquare className="mr-2 h-4 w-4 shrink-0" />
            <span className="truncate flex-1">{convo.title}</span>
            <span className="text-xs text-muted-foreground ml-auto">
              {convo.timestamp}
            </span>
          </Button>
        ))}
      </div>

      <div className="mt-auto space-y-2">
        <Button variant="ghost" className="w-full justify-start">
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Info className="mr-2 h-4 w-4" />
          Resources
        </Button>
        <Button variant="ghost" className="w-full justify-start">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </div>
    </aside>
  );
};

export default ChatSidebar;
