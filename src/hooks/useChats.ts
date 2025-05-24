
import { useState } from 'react';

export interface Chat {
  id: string;
  title: string;
  timestamp: string;
}

export const useChats = () => {
  const [chats, setChats] = useState<Chat[]>([
    { id: '1', title: 'Stress management techniques', timestamp: '2h ago' },
    { id: '2', title: 'Dealing with exam anxiety', timestamp: '1d ago' },
    { id: '3', title: 'Sleep improvement strategies', timestamp: '3d ago' }
  ]);

  const [activeChat, setActiveChat] = useState<string | null>(null);

  const addNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      title: 'New conversation',
      timestamp: 'now'
    };
    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat.id);
    return newChat.id;
  };

  const deleteChat = (chatId: string) => {
    setChats(prev => prev.filter(chat => chat.id !== chatId));
    if (activeChat === chatId) {
      setActiveChat(null);
    }
  };

  const selectChat = (chatId: string) => {
    setActiveChat(chatId);
  };

  return {
    chats,
    activeChat,
    addNewChat,
    deleteChat,
    selectChat
  };
};
