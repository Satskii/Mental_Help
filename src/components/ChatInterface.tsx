import React, { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose, Paperclip } from 'lucide-react';
import ChatInput from '@/components/ChatInput';
import SuicidePreventionAlert from '@/components/SuicidePreventionAlert';
import { detectCrisisLanguage } from '@/utils/crisisDetection';
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
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const generateResponse = (userMessage: string, isCrisis: boolean, files?: File[]): string => {
    if (files && files.length > 0) {
      const fileTypes = files.map(f => f.type).join(', ');
      return `I can see you've shared ${files.length} file(s) with me. While I can't process the actual content of files yet, I acknowledge that you've shared: ${files.map(f => f.name).join(', ')}. Please describe what you'd like to discuss about these files, and I'll do my best to help you.`;
    }
    
    if (isCrisis) {
      return "I notice you might be going through a difficult time. Remember, it's okay to ask for help. Please consider reaching out to someone you trust or a professional. Would you like me to provide resources that might help?";
    }
    
    if (userMessage.toLowerCase().includes('stress') || userMessage.toLowerCase().includes('anxiety')) {
      return "Dealing with stress and anxiety can be challenging. Deep breathing, mindfulness, and physical activity can help manage these feelings. Would you like to explore some specific techniques?";
    }
    
    if (userMessage.toLowerCase().includes('sad') || userMessage.toLowerCase().includes('depress')) {
      return "I'm sorry to hear you're feeling this way. Sometimes talking to someone, maintaining routines, and engaging in activities you enjoy can help. Have you considered speaking with a counselor at your university?";
    }
    
    if (userMessage.toLowerCase().includes('sleep') || userMessage.toLowerCase().includes('tired')) {
      return "Sleep is crucial for mental health. Establishing a regular sleep schedule, limiting screen time before bed, and creating a comfortable sleep environment can help improve sleep quality.";
    }
    
    return "Thank you for sharing. Your feelings are valid, and it's important to acknowledge them. Would you like to talk more about what's on your mind or discuss some coping strategies?";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="h-full flex flex-col justify-between bg-background rounded-lg overflow-hidden">
      {showCrisisAlert && (
        <SuicidePreventionAlert onClose={() => setShowCrisisAlert(false)} />
      )}
      
      {/* Toggle button for desktop */}
      {onToggleSidebar && (
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
      )}
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto pt-4 pb-16">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message-container rounded-xl ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
            >
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
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
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
