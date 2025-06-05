import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, X, Mic, MicOff, Volume2, VolumeX, Phone } from 'lucide-react';
import { speechManager } from '@/utils/speechUtils';
import { useToast } from "@/hooks/use-toast";
import LiveVoiceChat from '@/components/LiveVoiceChat';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
  isSpeaking?: boolean;
  onToggleSpeech?: () => void;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isSpeaking, onToggleSpeech }) => {
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [speechEnabled, setSpeechEnabled] = useState(false);
  const [showLiveVoiceChat, setShowLiveVoiceChat] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea based on content
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  useEffect(() => {
    // Check if speech features are supported
    const support = speechManager.isSupported();
    if (!support.speechRecognition || !support.speechSynthesis) {
      console.warn('Speech features not fully supported in this browser');
    }
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newFiles: UploadedFile[] = [];

    files.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          newFiles.push({
            file,
            preview: e.target?.result as string
          });
          if (newFiles.length === files.length) {
            setUploadedFiles(prev => [...prev, ...newFiles]);
          }
        };
        reader.readAsDataURL(file);
      } else {
        newFiles.push({ file });
        if (newFiles.length === files.length) {
          setUploadedFiles(prev => [...prev, ...newFiles]);
        }
      }
    });

    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || uploadedFiles.length > 0) {
      onSendMessage(message, uploadedFiles.map(f => f.file));
      setMessage('');
      setUploadedFiles([]);
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleMicrophoneClick = async () => {
    if (isListening) {
      speechManager.stopListening();
      setIsListening(false);
      return;
    }

    try {
      setIsListening(true);
      
      await speechManager.startListening(
        (text) => {
          setMessage(prev => prev + (prev ? ' ' : '') + text);
          setIsListening(false);
          toast({
            title: "Speech captured",
            description: "Your speech has been converted to text.",
          });
        },
        (error) => {
          setIsListening(false);
          toast({
            title: "Speech recognition error",
            description: error,
            variant: "destructive",
          });
        }
      );
    } catch (error) {
      setIsListening(false);
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access to use speech input.",
        variant: "destructive",
      });
    }
  };

  const toggleSpeechOutput = () => {
    setSpeechEnabled(!speechEnabled);
    onToggleSpeech?.();
    
    if (speechEnabled) {
      speechManager.stopSpeaking();
    }
    
    toast({
      title: speechEnabled ? "Speech output disabled" : "Speech output enabled",
      description: speechEnabled ? 
        "AI responses will no longer be read aloud." : 
        "AI responses will be read aloud.",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="chat-input-container">
        {/* File previews */}
        {uploadedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {uploadedFiles.map((uploadedFile, index) => (
              <div key={index} className="relative bg-muted rounded-lg p-2 flex items-center gap-2 max-w-xs shadow-sm">
                {uploadedFile.preview ? (
                  <img 
                    src={uploadedFile.preview} 
                    alt={uploadedFile.file.name}
                    className="w-10 h-10 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(uploadedFile.file.size)}</p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
        
        <div className="flex items-end gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 flex-shrink-0 rounded-lg hover:bg-muted transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Paperclip className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-10 w-10 flex-shrink-0 rounded-lg transition-colors ${
              isListening ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'hover:bg-muted'
            }`}
            onClick={handleMicrophoneClick}
            title={isListening ? "Stop listening" : "Start voice input"}
          >
            {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className={`h-10 w-10 flex-shrink-0 rounded-lg transition-colors ${
              speechEnabled ? 'bg-blue-100 text-blue-600 hover:bg-blue-200' : 'hover:bg-muted'
            }`}
            onClick={toggleSpeechOutput}
            title={speechEnabled ? "Disable speech output" : "Enable speech output"}
          >
            {speechEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 flex-shrink-0 rounded-lg hover:bg-green-100 hover:text-green-600 transition-colors"
            onClick={() => setShowLiveVoiceChat(true)}
            title="Start live voice conversation"
          >
            <Phone className="h-4 w-4" />
          </Button>
          
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              placeholder="Type your message here or use voice input..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[40px] max-h-[160px] resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-0 px-0 py-2"
            />
          </div>
          
          <Button 
            type="submit" 
            size="icon" 
            className="h-10 w-10 bg-mental-primary hover:bg-mental-primary/90 rounded-lg flex-shrink-0 transition-colors"
            disabled={!message.trim() && uploadedFiles.length === 0}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,.pdf,.doc,.docx,.txt,.rtf"
          onChange={handleFileUpload}
          className="hidden"
        />
      </form>

      {showLiveVoiceChat && (
        <LiveVoiceChat onClose={() => setShowLiveVoiceChat(false)} />
      )}
    </>
  );
};

export default ChatInput;
