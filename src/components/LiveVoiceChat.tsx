
import React, { useState } from 'react';
import { useConversation } from '@11labs/react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Phone, PhoneOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface LiveVoiceChatProps {
  onClose: () => void;
}

const LiveVoiceChat: React.FC<LiveVoiceChatProps> = ({ onClose }) => {
  const [apiKey, setApiKey] = useState('');
  const [agentId, setAgentId] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const { toast } = useToast();

  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      toast({
        title: "Voice conversation started",
        description: "You can now speak with the AI assistant.",
      });
    },
    onDisconnect: () => {
      setIsConnected(false);
      toast({
        title: "Voice conversation ended",
        description: "The conversation has been disconnected.",
      });
    },
    onError: (error) => {
      toast({
        title: "Connection error",
        description: `Failed to connect: ${error}`,
        variant: "destructive",
      });
    },
  });

  const startConversation = async () => {
    if (!apiKey || !agentId) {
      toast({
        title: "Missing credentials",
        description: "Please provide both API key and Agent ID.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Request microphone access first
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Generate signed URL (this would typically be done on your server)
      const response = await fetch(
        `https://api.elevenlabs.io/v1/convai/conversation/get_signed_url?agent_id=${agentId}`,
        {
          method: "GET",
          headers: {
            "xi-api-key": apiKey,
          },
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get signed URL');
      }

      const body = await response.json();
      await conversation.startSession({ signedUrl: body.signed_url });
    } catch (error) {
      toast({
        title: "Failed to start conversation",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    }
  };

  const endConversation = async () => {
    await conversation.endSession();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
        <h2 className="text-xl font-semibold mb-4">Live Voice Conversation</h2>
        
        {!isConnected ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                ElevenLabs API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Agent ID
              </label>
              <input
                type="text"
                value={agentId}
                onChange={(e) => setAgentId(e.target.value)}
                placeholder="Enter your Agent ID"
                className="w-full px-3 py-2 border rounded-md"
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={startConversation}
                className="flex-1"
                disabled={!apiKey || !agentId}
              >
                <Phone className="h-4 w-4 mr-2" />
                Start Voice Chat
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
                conversation.isSpeaking ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
              }`}>
                {conversation.isSpeaking ? (
                  <Mic className="h-8 w-8" />
                ) : (
                  <MicOff className="h-8 w-8" />
                )}
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground">
              {conversation.isSpeaking ? 'AI is speaking...' : 'Listening for your voice...'}
            </p>
            
            <div className="flex gap-2">
              <Button
                onClick={endConversation}
                variant="destructive"
                className="flex-1"
              >
                <PhoneOff className="h-4 w-4 mr-2" />
                End Conversation
              </Button>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4 p-3 bg-muted rounded-md text-xs text-muted-foreground">
          <p>Note: You'll need an ElevenLabs account with Conversational AI access and a configured agent.</p>
        </div>
      </div>
    </div>
  );
};

export default LiveVoiceChat;
