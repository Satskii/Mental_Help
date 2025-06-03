
import React, { useState, useRef, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Paperclip, X } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string, files?: File[]) => void;
}

interface UploadedFile {
  file: File;
  preview?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Auto-resize textarea based on content
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <form onSubmit={handleSubmit} className="chat-input-container">
      {/* File previews */}
      {uploadedFiles.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-3">
          {uploadedFiles.map((uploadedFile, index) => (
            <div key={index} className="relative bg-muted rounded-xl p-3 flex items-center gap-3 max-w-xs shadow-sm">
              {uploadedFile.preview ? (
                <img 
                  src={uploadedFile.preview} 
                  alt={uploadedFile.file.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              ) : (
                <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center">
                  <Paperclip className="h-5 w-5 text-muted-foreground" />
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
                className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive transition-colors"
                onClick={() => removeFile(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex items-end gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-12 w-12 flex-shrink-0 rounded-xl hover:bg-muted transition-colors"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>
        
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[48px] max-h-[200px] resize-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 border-0 px-0 py-3"
          />
        </div>
        
        <Button 
          type="submit" 
          size="icon" 
          className="h-12 w-12 bg-mental-primary hover:bg-mental-primary/90 rounded-xl flex-shrink-0 transition-colors"
          disabled={!message.trim() && uploadedFiles.length === 0}
        >
          <Send className="h-5 w-5" />
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
  );
};

export default ChatInput;
