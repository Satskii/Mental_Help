
import React from 'react';
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';

interface ChatHeaderProps {
  onToggleSidebar?: () => void;
  sidebarHidden?: boolean;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({ onToggleSidebar, sidebarHidden }) => {
  if (!onToggleSidebar) return null;

  return (
    <div className="hidden md:flex p-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-t-lg">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onToggleSidebar}
        className="h-8 w-8 rounded-lg"
      >
        {sidebarHidden ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default ChatHeader;
