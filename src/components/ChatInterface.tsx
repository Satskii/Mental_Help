
import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import ChatInput from '@/components/ChatInput';
import ChatHeader from '@/components/ChatHeader';
import MessageList from '@/components/MessageList';
import SuicidePreventionAlert from '@/components/SuicidePreventionAlert';
import { detectCrisisLanguage } from '@/utils/crisisDetection';
import { generateResponse } from '@/utils/responseGenerator';
import { speechManager } from '@/utils/speechUtils';
import { useChats, Message } from '@/hooks/useChats';

interface ChatInterfaceProps {
  onToggleSidebar?: () => void;
  sidebarHidden?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onToggleSidebar, sidebarHidden }) => {
  const { activeChat, addMessageToChat, getCurrentChatMessages } = useChats();
  const messages = getCurrentChatMessages();
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const { toast } = useToast();

  // Speak the latest assistant message when speech is enabled
  useEffect(() => {
    if (speechEnabled && messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.role === 'assistant' && latestMessage.id !== '1') {
        handleSpeakMessage(latestMessage.content);
      }
    }
  }, [messages, speechEnabled]);

  const handleSpeakMessage = async (text: string) => {
    if (!speechEnabled) return;
    
    setIsSpeaking(true);
    try {
      await speechManager.speak(text, () => {
        setIsSpeaking(false);
      });
    } catch (error) {
      setIsSpeaking(false);
      console.error('Speech synthesis error:', error);
    }
  };

  const handleToggleSpeech = () => {
    setSpeechEnabled(!speechEnabled);
    if (speechEnabled) {
      speechManager.stopSpeaking();
      setIsSpeaking(false);
    }
  };

  const handleSendMessage = (content: string, files?: File[]) => {
    if (!content.trim() && (!files || files.length === 0)) return;
    if (!activeChat) return;
    
    // Stop any ongoing speech
    if (isSpeaking) {
      speechManager.stopSpeaking();
      setIsSpeaking(false);
    }
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date(),
      files
    };
    
    addMessageToChat(activeChat, userMessage);
    
    // Check for crisis language
    const hasCrisisLanguage = detectCrisisLanguage(content);
    if (hasCrisisLanguage) {
      setShowCrisisAlert(true);
      toast({
        title: "Support Resources Available",
        description: "We've detected concerning language. Help is available.",
        variant: "destructive",
      });
    }
    
    // Simulate assistant response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateResponse(content, hasCrisisLanguage, files),
        timestamp: new Date()
      };
      
      addMessageToChat(activeChat, assistantMessage);
    }, 1000);
  };

  return (
    <div className="h-full flex flex-col justify-between bg-background rounded-lg overflow-hidden">
      {showCrisisAlert && (
        <SuicidePreventionAlert onClose={() => setShowCrisisAlert(false)} />
      )}
      
      <ChatHeader onToggleSidebar={onToggleSidebar} sidebarHidden={sidebarHidden} />
      
      <MessageList messages={messages} />
      
      <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent rounded-b-lg">
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isSpeaking={isSpeaking}
          onToggleSpeech={handleToggleSpeech}
        />
      </div>
    </div>
  );
};

export default ChatInterface;
