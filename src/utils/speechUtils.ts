
export class SpeechManager {
  private recognition: SpeechRecognition | null = null;
  private synthesis: SpeechSynthesis;
  private isListening = false;

  constructor() {
    this.synthesis = window.speechSynthesis;
    
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
    }
  }

  // Speech-to-Text
  startListening(onResult: (text: string) => void, onError?: (error: string) => void): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.recognition) {
        const error = 'Speech recognition not supported in this browser';
        onError?.(error);
        reject(new Error(error));
        return;
      }

      if (this.isListening) {
        resolve();
        return;
      }

      this.isListening = true;

      this.recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        onResult(result);
        this.isListening = false;
        resolve();
      };

      this.recognition.onerror = (event) => {
        const error = `Speech recognition error: ${event.error}`;
        onError?.(error);
        this.isListening = false;
        reject(new Error(error));
      };

      this.recognition.onend = () => {
        this.isListening = false;
      };

      try {
        this.recognition.start();
      } catch (error) {
        this.isListening = false;
        const errorMsg = 'Failed to start speech recognition';
        onError?.(errorMsg);
        reject(new Error(errorMsg));
      }
    });
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  // Text-to-Speech
  speak(text: string, onEnd?: () => void): Promise<void> {
    return new Promise((resolve) => {
      // Stop any ongoing speech
      this.synthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        onEnd?.();
        resolve();
      };

      utterance.onerror = () => {
        onEnd?.();
        resolve();
      };

      this.synthesis.speak(utterance);
    });
  }

  stopSpeaking() {
    this.synthesis.cancel();
  }

  getIsListening() {
    return this.isListening;
  }

  isSupported() {
    return {
      speechRecognition: !!this.recognition,
      speechSynthesis: 'speechSynthesis' in window
    };
  }
}

export const speechManager = new SpeechManager();
