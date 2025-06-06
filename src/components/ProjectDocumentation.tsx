
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Code, Palette, MessageSquare, Brain, Mic, Phone, Languages, Shield, Zap } from 'lucide-react';

const ProjectDocumentation: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-4">
          <FileText className="h-4 w-4 mr-2" />
          View Complete Project Documentation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Mental Health Support Platform - Complete Development Report
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[70vh] pr-4">
          <div className="space-y-6 text-sm">
            
            {/* Project Overview */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-500" />
                🎯 Project Overview
              </h3>
              <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                <p><strong>Project Type:</strong> Student Mental Health Support Platform</p>
                <p><strong>Tech Stack:</strong> React + TypeScript + Vite + Tailwind CSS + shadcn/ui</p>
                <p><strong>Key Features:</strong> AI-powered chat, voice interaction, multilingual support, crisis detection</p>
                <p><strong>Architecture:</strong> Frontend-only with backend integration capabilities</p>
              </div>
            </section>

            {/* Core Components */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Code className="h-5 w-5 text-green-500" />
                🧩 Core Components Architecture
              </h3>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold">📱 Pages Structure</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <code>src/pages/Index.tsx</code> - Landing page with hero section and feature cards</li>
                    <li>• <code>src/pages/Chat.tsx</code> - Main chat interface with sidebar and messaging</li>
                    <li>• <code>src/pages/NotFound.tsx</code> - 404 error page</li>
                  </ul>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-semibold">🎨 UI Components</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <code>Navbar.tsx</code> - Navigation with dark mode toggle and branding</li>
                    <li>• <code>LandingHero.tsx</code> - Hero section with CTA and feature highlights</li>
                    <li>• <code>ChatInterface.tsx</code> - Main chat UI with message display and interactions</li>
                    <li>• <code>ChatSidebar.tsx</code> - Conversation history and management</li>
                    <li>• <code>ChatInput.tsx</code> - Advanced input with voice, file upload, and language selection</li>
                  </ul>
                </div>

                <div className="border-l-4 border-purple-500 pl-4">
                  <h4 className="font-semibold">🎙️ Voice & Communication</h4>
                  <ul className="mt-2 space-y-1 text-gray-700">
                    <li>• <code>LiveVoiceChat.tsx</code> - Real-time voice conversation with custom backend</li>
                    <li>• <code>speechUtils.ts</code> - Speech recognition and synthesis utilities</li>
                    <li>• <code>SuicidePreventionAlert.tsx</code> - Crisis detection and intervention</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Features Implementation */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-purple-500" />
                ⚡ Advanced Features Implementation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Mic className="h-4 w-4" />
                    🎤 Voice Integration
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Speech-to-text input with Web Speech API</li>
                    <li>• Text-to-speech output for responses</li>
                    <li>• Real-time voice chat capability</li>
                    <li>• Microphone access management</li>
                  </ul>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Languages className="h-4 w-4" />
                    🌍 Multilingual Support
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• English, Bengali, and Hindi support</li>
                    <li>• Language selection toolbar</li>
                    <li>• Dynamic language switching</li>
                    <li>• Localized user interface</li>
                  </ul>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Phone className="h-4 w-4" />
                    📞 Live Voice Chat
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Custom backend integration</li>
                    <li>• WebSocket-based communication</li>
                    <li>• Real-time audio processing</li>
                    <li>• Connection status monitoring</li>
                  </ul>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-semibold flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4" />
                    🛡️ Crisis Detection
                  </h4>
                  <ul className="text-sm space-y-1">
                    <li>• Automated crisis keyword detection</li>
                    <li>• Emergency resource display</li>
                    <li>• Immediate intervention alerts</li>
                    <li>• Professional resource connections</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technical Implementation */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Palette className="h-5 w-5 text-orange-500" />
                🛠️ Technical Implementation Details
              </h3>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">📊 State Management</h4>
                  <p className="text-sm mb-2">Custom React hooks for chat and conversation management:</p>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• <code>useChats.ts</code> - Chat history, message management, and conversation state</li>
                    <li>• Local state with useState for real-time interactions</li>
                    <li>• Message persistence and chat organization</li>
                    <li>• File upload and attachment handling</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🎨 Styling & Design System</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• Tailwind CSS for utility-first styling</li>
                    <li>• shadcn/ui component library integration</li>
                    <li>• Custom color palette for mental health theme</li>
                    <li>• Responsive design with mobile-first approach</li>
                    <li>• Dark mode support with theme switching</li>
                    <li>• Custom animations and transitions</li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">🔧 Utility Functions</h4>
                  <ul className="text-sm space-y-1 ml-4">
                    <li>• <code>speechUtils.ts</code> - Web Speech API wrapper with error handling</li>
                    <li>• <code>crisisDetection.ts</code> - Keyword-based crisis detection algorithms</li>
                    <li>• File handling utilities for image and document uploads</li>
                    <li>• Toast notification system for user feedback</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Lovable Recreation Prompt */}
            <section>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5 text-indigo-500" />
                🚀 Lovable Recreation Prompt
              </h3>
              
              <div className="bg-indigo-50 p-4 rounded-lg">
                <p className="font-semibold mb-3">To recreate this exact project in Lovable, use this prompt:</p>
                <div className="bg-white p-4 rounded border text-sm font-mono">
                  <p className="mb-2">
                    "Create a student mental health support platform with the following specifications:
                  </p>
                  <br />
                  <p className="mb-2">
                    <strong>Core Pages:</strong> Landing page with hero section and feature cards, chat interface with sidebar, 404 page.
                  </p>
                  <br />
                  <p className="mb-2">
                    <strong>Chat Features:</strong> Real-time messaging interface, conversation history sidebar, file upload (images/documents), message persistence with useChats hook.
                  </p>
                  <br />
                  <p className="mb-2">
                    <strong>Voice Integration:</strong> Speech-to-text input using Web Speech API, text-to-speech output, live voice chat with custom backend (/health and /process-audio endpoints), microphone access management.
                  </p>
                  <br />
                  <p className="mb-2">
                    <strong>Multilingual Support:</strong> Language selection toolbar for English, Bengali, and Hindi output.
                  </p>
                  <br />
                  <p className="mb-2">
                    <strong>Safety Features:</strong> Crisis detection with keyword monitoring, suicide prevention alerts, emergency resource display.
                  </p>
                  <br />
                  <p className="mb-2">
                    <strong>UI/UX:</strong> Mental health themed color palette, shadcn/ui components, dark mode toggle, responsive design, toast notifications, smooth animations.
                  </p>
                  <br />
                  <p className="mb-2">
                    <strong>Technical:</strong> React + TypeScript + Vite, Tailwind CSS, React Router, custom hooks for state management, utility functions for speech and crisis detection.
                  </p>
                  <br />
                  <p>
                    Ensure the chat input has compact spacing, integrated voice/file/language controls, and the live voice chat connects to custom backend endpoints."
                  </p>
                </div>
              </div>
            </section>

            {/* Component Specifications */}
            <section>
              <h3 className="text-lg font-semibold mb-3">📋 Detailed Component Specifications</h3>
              
              <div className="space-y-3">
                <details className="bg-gray-50 p-3 rounded">
                  <summary className="font-semibold cursor-pointer">ChatInput.tsx - Advanced Input Component</summary>
                  <div className="mt-2 text-sm space-y-2">
                    <p>• 317 lines of React TypeScript with multiple features</p>
                    <p>• Language selection toolbar with English/Bengali/Hindi</p>
                    <p>• File upload with preview (images) and size formatting</p>
                    <p>• Speech-to-text with microphone access handling</p>
                    <p>• Text-to-speech toggle with user feedback</p>
                    <p>• Live voice chat trigger button</p>
                    <p>• Auto-resizing textarea with keyboard shortcuts</p>
                    <p>• Compact button layout with gap-1 spacing</p>
                  </div>
                </details>

                <details className="bg-gray-50 p-3 rounded">
                  <summary className="font-semibold cursor-pointer">LiveVoiceChat.tsx - Real-time Voice Communication</summary>
                  <div className="mt-2 text-sm space-y-2">
                    <p>• Custom backend integration instead of ElevenLabs</p>
                    <p>• WebSocket connection management</p>
                    <p>• Audio recording and streaming</p>
                    <p>• Connection status monitoring with health checks</p>
                    <p>• Error handling and user feedback</p>
                    <p>• Modal dialog interface with close functionality</p>
                  </div>
                </details>

                <details className="bg-gray-50 p-3 rounded">
                  <summary className="font-semibold cursor-pointer">useChats.ts - Chat State Management Hook</summary>
                  <div className="mt-2 text-sm space-y-2">
                    <p>• TypeScript interfaces for Chat and Message types</p>
                    <p>• CRUD operations for chat management</p>
                    <p>• Active chat selection and switching</p>
                    <p>• Message appending with file support</p>
                    <p>• Default conversations with mental health focus</p>
                    <p>• Timestamp and ID generation</p>
                  </div>
                </details>
              </div>
            </section>

            {/* Dependencies & Setup */}
            <section>
              <h3 className="text-lg font-semibold mb-3">📦 Dependencies & Project Setup</h3>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Key Dependencies:</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• React 18.3.1 + TypeScript for component development</li>
                  <li>• @tanstack/react-query for data fetching</li>
                  <li>• react-router-dom for navigation</li>
                  <li>• lucide-react for consistent iconography</li>
                  <li>• @radix-ui/* packages for accessible components</li>
                  <li>• tailwindcss + tailwindcss-animate for styling</li>
                  <li>• shadcn/ui component library</li>
                  <li>• sonner for toast notifications</li>
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
