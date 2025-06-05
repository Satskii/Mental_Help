
import React from 'react';
import { Paperclip } from 'lucide-react';
import { Message } from '@/hooks/useChats';

interface MessageItemProps {
  message: Message;
}

const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={`message-container rounded-xl ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}>
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          message.role === 'user' ? 'bg-blue-100 text-mental-primary' : 'bg-mental-primary/10 text-mental-primary'
        }`}>
          {message.role === 'user' ? 'You' : 'AI'}
        </div>
        <span className="font-medium capitalize">{message.role}</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="pl-10">
        {message.content}
        {message.files && message.files.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.files.map((file, index) => (
              <div key={index} className="bg-muted rounded-lg p-2 flex items-center gap-2 text-sm">
                <Paperclip className="h-4 w-4" />
                <span className="font-medium">{file.name}</span>
                <span className="text-muted-foreground">({formatFileSize(file.size)})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageItem;
