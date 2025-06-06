
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Code, Palette, MessageSquare, Brain, Mic, Phone, Languages, Shield, Zap, Database, Settings } from 'lucide-react';

const ProjectDocumentation: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          <FileText className="h-4 w-4 mr-2" />
          View Complete Technical Documentation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Mental Health Support Platform - Complete Technical Specifications
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            
            {/* Project Architecture */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                🏗️ Project Architecture & Structure
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-3">
                <div>
                  <h4 className="font-semibold">Technology Stack:</h4>
                  <p>React 18.3.1 + TypeScript + Vite + Tailwind CSS + shadcn/ui + React Router DOM</p>
                </div>
                <div>
                  <h4 className="font-semibold">Project Structure:</h4>
                  <pre className="text-xs bg-white p-2 rounded mt-1 overflow-x-auto">
{`src/
├── components/
│   ├── ui/ (shadcn/ui components)
│   ├── ChatInput.tsx (287 lines - needs refactoring)
│   ├── ChatInterface.tsx (213 lines - needs refactoring)
│   ├── ChatSidebar.tsx
│   ├── DarkModeToggle.tsx
│   ├── LandingHero.tsx
│   ├── LiveVoiceChat.tsx
│   ├── Navbar.tsx
│   ├── ProjectDocumentation.tsx
│   ├── ResizablePanel.tsx
│   ├── SettingsDialog.tsx
│   └── SuicidePreventionAlert.tsx
├── hooks/
│   ├── useChats.ts
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── pages/
│   ├── Index.tsx
│   ├── Chat.tsx
│   └── NotFound.tsx
├── utils/
│   ├── crisisDetection.ts
│   └── speechUtils.ts
└── lib/
    └── utils.ts`}
                  </pre>
                </div>
              </div>
            </section>

            {/* Detailed Component Specifications */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-green-500" />
                🧩 Complete Component Specifications
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">📱 Pages Implementation</h4>
                  
                  <div className="mt-2 space-y-2">
                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">src/pages/Index.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Landing page with min-h-screen and landing-gradient background</li>
                        <li>• Contains Navbar and LandingHero components</li>
                        <li>• Container with responsive padding (px-4 pt-16 md:pt-24 pb-16)</li>
                        <li>• Uses React Router for navigation</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">src/pages/Chat.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Full-screen chat layout with ResizablePanelGroup</li>
                        <li>• Mobile sidebar toggle with fixed positioning</li>
                        <li>• Desktop: ResizablePanel with 25% sidebar, 75% chat (adjustable)</li>
                        <li>• Mobile: Overlay sidebar with backdrop blur</li>
                        <li>• Sidebar hide/show functionality for full-screen chat</li>
                        <li>• State management: isMobileSidebarOpen, isSidebarHidden</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">🎨 Core UI Components</h4>
                  
                  <div className="mt-2 space-y-2">
                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">LandingHero.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Centered layout with animate-fade-in</li>
                        <li>• Hero title with gradient text (mental-primary to mental-secondary)</li>
                        <li>• CTA button with animate-bounce-subtle to /chat route</li>
                        <li>• ProjectDocumentation component integration</li>
                        <li>• 3-column feature cards (Confidential, 24/7 Support, Resource Connection)</li>
                        <li>• Uses shadcn/ui Card components with CardContent pt-6</li>
                      </ul>
                    </div>

                    <div className="bg-gray-50 p-3 rounded">
                      <h5 className="font-medium">Navbar.tsx:</h5>
                      <ul className="text-sm space-y-1 mt-1">
                        <li>• Fixed top navigation with backdrop blur</li>
                        <li>• Logo with Brain icon + "MindfulChat" text</li>
                        <li>• React Router Link components for navigation</li>
                        <li>• DarkModeToggle component integration</li>
                        <li>• Responsive design with mobile menu</li>
                        <li>• Mental health themed colors</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Chat System Implementation */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                💬 Chat System Implementation Details
              </h3>
              
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">useChats.ts Hook (State Management):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Interfaces:</strong>
                      <pre className="text-xs bg-white p-2 rounded mt-1">
{`interface Chat {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: File[];
}`}
                      </pre>
                    </div>
                    <div>
                      <strong>Functions:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• addNewChat() - Creates new conversation with default assistant message</li>
                        <li>• deleteChat(chatId) - Removes chat and handles active chat switching</li>
                        <li>• selectChat(chatId) - Sets active chat</li>
                        <li>• addMessageToChat(chatId, message) - Appends message to specific chat</li>
                        <li>• getCurrentChatMessages() - Returns messages for active chat</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Default Data:</strong>
                      <p>3 sample conversations: "Stress management techniques", "Dealing with exam anxiety", "Sleep improvement strategies"</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">ChatInput.tsx (287 lines - Advanced Input):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Key Features:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Language selection toolbar (English, Bengali, Hindi)</li>
                        <li>• File upload with image preview and document support</li>
                        <li>• Speech-to-text with microphone access handling</li>
                        <li>• Text-to-speech toggle functionality</li>
                        <li>• Live voice chat trigger button</li>
                        <li>• Auto-resizing textarea with keyboard shortcuts (Ctrl+Enter)</li>
                        <li>• Compact button layout with gap-1 spacing</li>
                      </ul>
                    </div>
                    <div>
                      <strong>State Management:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• selectedLanguage: 'english' | 'bengali' | 'hindi'</li>
                        <li>• isListening: boolean for speech recognition</li>
                        <li>• isSpeaking: boolean for text-to-speech</li>
                        <li>• selectedFiles: File[] for attachments</li>
                        <li>• message: string for input content</li>
                      </ul>
                    </div>
                    <div>
                      <strong>UI Layout:</strong>
                      <p>Language toolbar → File upload area → Main input with integrated controls → Send button</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">ChatInterface.tsx (213 lines - Main Chat UI):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Layout Structure:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Header with chat title and sidebar toggle</li>
                        <li>• Messages area with auto-scroll to bottom</li>
                        <li>• Message rendering with role-based styling</li>
                        <li>• File attachment display (images with preview)</li>
                        <li>• ChatInput component integration</li>
                        <li>• LiveVoiceChat modal integration</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Message Handling:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Real-time message appending to active chat</li>
                        <li>• Auto-scroll behavior on new messages</li>
                        <li>• File size formatting utilities</li>
                        <li>• Message timestamp display</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">ChatSidebar.tsx (Conversation Management):</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Features:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• New chat creation button</li>
                        <li>• Chat list with active chat highlighting</li>
                        <li>• Chat deletion with confirmation</li>
                        <li>• Responsive mobile overlay functionality</li>
                        <li>• Chat title and timestamp display</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Voice & Advanced Features */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Mic className="h-5 w-5 text-orange-500" />
                🎙️ Voice Integration & Advanced Features
              </h3>
              
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">speechUtils.ts - Web Speech API Integration:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Functions:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• startSpeechRecognition(onResult, onError) - Continuous speech recognition</li>
                        <li>• stopSpeechRecognition() - Stops active recognition</li>
                        <li>• speakText(text, onEnd) - Text-to-speech synthesis</li>
                        <li>• stopSpeaking() - Interrupts current speech</li>
                        <li>• isSpeechRecognitionSupported() - Browser compatibility check</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Configuration:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Language: 'en-US' for recognition</li>
                        <li>• Continuous: true for ongoing listening</li>
                        <li>• InterimResults: true for real-time feedback</li>
                        <li>• Error handling for permissions and browser support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">LiveVoiceChat.tsx - Custom Backend Integration:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Backend Endpoints:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• GET /health - Connection health check</li>
                        <li>• POST /process-audio - Audio processing endpoint</li>
                        <li>• FormData with audio blob for real-time processing</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Features:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• WebSocket-style real-time communication</li>
                        <li>• Audio recording with MediaRecorder API</li>
                        <li>• Connection status monitoring</li>
                        <li>• Modal dialog interface with proper cleanup</li>
                        <li>• Error handling and user feedback</li>
                      </ul>
                    </div>
                    <div>
                      <strong>State Management:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• isConnected: boolean for backend status</li>
                        <li>• isRecording: boolean for audio capture</li>
                        <li>• mediaRecorder: MediaRecorder instance</li>
                        <li>• connectionStatus: string for user feedback</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Crisis Detection & Safety Features:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>crisisDetection.ts Implementation:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Keyword-based detection algorithm</li>
                        <li>• Crisis keywords array for monitoring</li>
                        <li>• detectCrisisKeywords(message) function</li>
                        <li>• Real-time message scanning</li>
                      </ul>
                    </div>
                    <div>
                      <strong>SuicidePreventionAlert.tsx:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Emergency alert dialog component</li>
                        <li>• Crisis hotline numbers display</li>
                        <li>• Professional resource connections</li>
                        <li>• Immediate intervention messaging</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Styling & Design System */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5 text-indigo-500" />
                🎨 Design System & Styling Specifications
              </h3>
              
              <div className="space-y-4">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Custom CSS Classes & Animations:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Custom Tailwind Classes:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• .landing-gradient - Hero section background</li>
                        <li>• .hero-title - Large heading with responsive sizing</li>
                        <li>• .hero-subtitle - Subtitle with muted coloring</li>
                        <li>• .cta-button - Primary call-to-action styling</li>
                        <li>• .animate-fade-in - Smooth entrance animation</li>
                        <li>• .animate-bounce-subtle - Gentle bounce effect</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Mental Health Color Palette:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• mental-primary: Calming blue tones</li>
                        <li>• mental-secondary: Supporting accent colors</li>
                        <li>• Background gradients for welcoming atmosphere</li>
                        <li>• High contrast for accessibility</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">shadcn/ui Integration:</h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <strong>Components Used:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Button (multiple variants: default, outline, ghost)</li>
                        <li>• Card, CardContent for feature sections</li>
                        <li>• Dialog, DialogContent, DialogHeader for modals</li>
                        <li>• ScrollArea for long content areas</li>
                        <li>• ResizablePanel, ResizablePanelGroup for layout</li>
                        <li>• Textarea with auto-resize functionality</li>
                        <li>• Toast/Sonner for notifications</li>
                      </ul>
                    </div>
                    <div>
                      <strong>Responsive Design:</strong>
                      <ul className="ml-4 space-y-1">
                        <li>• Mobile-first approach with md: breakpoints</li>
                        <li>• Collapsible sidebar for mobile devices</li>
                        <li>• Touch-friendly button sizing</li>
                        <li>• Optimized chat interface for all screen sizes</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Technical Dependencies */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Database className="h-5 w-5 text-teal-500" />
                📦 Dependencies & Configuration
              </h3>
              
              <div className="bg-teal-50 p-4 rounded-lg">
                <div className="text-sm space-y-3">
                  <div>
                    <h4 className="font-semibold">Core Dependencies:</h4>
                    <ul className="ml-4 space-y-1">
                      <li>• react: ^18.3.1 + react-dom: ^18.3.1</li>
                      <li>• @tanstack/react-query: ^5.56.2 (data fetching)</li>
                      <li>• react-router-dom: ^6.26.2 (routing)</li>
                      <li>• lucide-react: ^0.462.0 (icons)</li>
                      <li>• next-themes: ^0.3.0 (dark mode)</li>
                      <li>• sonner: ^1.5.0 (toast notifications)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">UI Library Dependencies:</h4>
                    <ul className="ml-4 space-y-1">
                      <li>• @radix-ui/* packages for accessible components</li>
                      <li>• class-variance-authority: ^0.7.1 (component variants)</li>
                      <li>• clsx: ^2.1.1 + tailwind-merge: ^2.5.2 (utility functions)</li>
                      <li>• react-resizable-panels: ^2.1.3 (resizable layout)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold">Build Tools:</h4>
                    <ul className="ml-4 space-y-1">
                      <li>• Vite as build tool and dev server</li>
                      <li>• TypeScript for type safety</li>
                      <li>• Tailwind CSS for styling</li>
                      <li>• tailwindcss-animate for animations</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Implementation Notes */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Settings className="h-5 w-5 text-gray-500" />
                ⚙️ Implementation Notes & Best Practices
              </h3>
              
              <div className="space-y-3">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Code Organization:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Components are focused and single-responsibility</li>
                    <li>• Custom hooks for state management (useChats)</li>
                    <li>• Utility functions separated into utils/ directory</li>
                    <li>• TypeScript interfaces defined close to usage</li>
                    <li>• Consistent naming conventions throughout</li>
                  </ul>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Performance Considerations:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• React.memo for preventing unnecessary re-renders</li>
                    <li>• Lazy loading for non-critical components</li>
                    <li>• Efficient state updates in useChats hook</li>
                    <li>• Proper cleanup in voice chat components</li>
                    <li>• File size validation for uploads</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Accessibility Features:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Proper ARIA labels for interactive elements</li>
                    <li>• Keyboard navigation support</li>
                    <li>• High contrast color schemes</li>
                    <li>• Screen reader friendly structure</li>
                    <li>• Focus management in modals</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Security & Privacy:</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Client-side only implementation (no data persistence)</li>
                    <li>• Secure file upload handling</li>
                    <li>• Input validation and sanitization</li>
                    <li>• Crisis detection for user safety</li>
                    <li>• Microphone permission handling</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Refactoring Recommendations */}
            <section>
              <h3 className="text-lg font-semibold mb-3">🔧 Current Technical Debt & Refactoring Needs</h3>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Files Requiring Refactoring:</h4>
                <ul className="text-sm space-y-2 ml-4">
                  <li>
                    <strong>ChatInput.tsx (287 lines):</strong>
                    <div className="ml-4 mt-1">
                      • Split into: InputField, LanguageSelector, FileUpload, VoiceControls
                      • Extract speech recognition logic to custom hook
                      • Separate file handling utilities
                    </div>
                  </li>
                  <li>
                    <strong>ChatInterface.tsx (213 lines):</strong>
                    <div className="ml-4 mt-1">
                      • Split into: ChatHeader, MessageList, MessageItem components
                      • Extract message rendering logic
                      • Create dedicated file preview component
                    </div>
                  </li>
                  <li>
                    <strong>ProjectDocumentation.tsx (305+ lines):</strong>
                    <div className="ml-4 mt-1">
                      • Break into smaller documentation sections
                      • Create reusable documentation components
                      • Implement collapsible sections for better UX
                    </div>
                  </li>
                </ul>
              </div>
            </section>

          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDocumentation;
