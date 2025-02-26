export interface ChatMessage {
    date: string;
    time: string;
    sender: string;
    message: string;
  }
  
  export function parseChat(content: string): ChatMessage[] {
    const lines = content.split('\n');
    const messages: ChatMessage[] = [];
  
    console.log('Raw chat content:', content); // Debug: Log raw content
    console.log('Total lines:', lines.length); // Debug: Log number of lines
  
    const regex = /^(\d{1,2}\/\d{1,2}\/\d{2,4}), (\d{1,2}:\d{2} [AP]M) - (.+?): (.+)$/;
  
    lines.forEach((line) => {
      const match = line.match(regex);
      if (match) {
        const [, date, time, sender, message] = match;
        messages.push({ date, time, sender, message });
      } else {
        console.log('Line did not match regex:', line); // Debug: Log lines that don't match
      }
    });
  
    console.log('Parsed messages:', messages); // Debug: Log parsed messages
    return messages;
  }