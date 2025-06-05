
export const generateResponse = (userMessage: string, isCrisis: boolean, files?: File[]): string => {
  if (files && files.length > 0) {
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
