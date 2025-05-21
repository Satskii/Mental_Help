
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import ChatInput from '@/components/ChatInput';
import SuicidePreventionAlert from '@/components/SuicidePreventionAlert';
import { detectCrisisLanguage } from '@/utils/crisisDetection';

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m here to provide support for your mental health concerns. How are you feeling today?',
      timestamp: new Date()
    }
  ]);
  const [showCrisisAlert, setShowCrisisAlert] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
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
        content: generateResponse(content, hasCrisisLanguage),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };

  const generateResponse = (userMessage: string, isCrisis: boolean): string => {
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

  return (
    <div className="h-full flex flex-col justify-between bg-background">
      {showCrisisAlert && (
        <SuicidePreventionAlert onClose={() => setShowCrisisAlert(false)} />
      )}
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto pt-4 pb-16">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message-container ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
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
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="sticky bottom-0 p-4 bg-gradient-to-t from-background via-background to-transparent">
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
