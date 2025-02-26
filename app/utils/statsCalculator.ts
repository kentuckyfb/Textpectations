import { ChatMessage } from './parseChat';

export interface UserStats {
  sender: string;
  mostCommonWord: string; // Can be a string or "null"
  totalMessages: number;
  totalWords: number;
  mostUsedEmoji: string;
  averageMessageLength: number;
  longestMessage: string;
  mostActiveDay: string;
  mostActiveHour: string;
}

export interface CombinedStats {
    totalMessages: number;
    mostCommonWord: string; // Can be a string or "null"
    totalMedia: number; // Always a number
    daysSinceFirstMessage: number;
  }

  export function calculateStats(messages: ChatMessage[]): {
    userStats: UserStats[];
    combinedStats: CombinedStats;
  } {
    console.log('Messages received for stats calculation:', messages); // Debug: Log messages
  
    const userStatsMap = new Map<string, UserStats>();
    const wordFrequencyMap = new Map<string, number>(); // For combined stats
    const userWordFrequencyMap = new Map<string, Map<string, number>>(); // For user-specific stats
    let totalMedia = 0;
    let firstMessageDate: Date | null = new Date(new Date().getFullYear(), 0, 1);
  
    // Helper function to extract emojis from a message
    const extractEmojis = (text: string): string[] => {
      const emojiRegex = /[\p{Emoji}]/gu;
      return text.match(emojiRegex) || [];
    };
  
    // Helper function to get the day of the week
    const getDayOfWeek = (date: string): string => {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const dayIndex = new Date(date).getDay();
      return days[dayIndex];
    };
  
    messages.forEach((message) => {
      const { sender, message: text, date, time } = message;
  
      // Track the first message date
      const currentMessageDate = new Date(`${date} ${time}`);
      if (!firstMessageDate || currentMessageDate < firstMessageDate) {
        firstMessageDate = currentMessageDate;
      }
  
      // Initialize user stats if not already present
      if (!userStatsMap.has(sender)) {
        userStatsMap.set(sender, {
          sender,
          totalMessages: 0,
          totalWords: 0,
          mostUsedEmoji: '',
          averageMessageLength: 0,
          longestMessage: '',
          mostActiveDay: '',
          mostActiveHour: '',
          mostCommonWord: '', // Initialize mostCommonWord
        });
        userWordFrequencyMap.set(sender, new Map<string, number>()); // Initialize word frequency map for user
      }
  
      const userStats = userStatsMap.get(sender)!;
      const userWordMap = userWordFrequencyMap.get(sender)!;
  
      // Update user stats
      userStats.totalMessages++;
      userStats.totalWords += text.split(' ').length;
  
      // Update longest message
      if (text.length > userStats.longestMessage.length) {
        userStats.longestMessage = text;
      }
  
      // Update most used emoji
      const emojis = extractEmojis(text);
      emojis.forEach((emoji) => {
        if (!userStats.mostUsedEmoji || emojis.filter((e) => e === emoji).length > emojis.filter((e) => e === userStats.mostUsedEmoji).length) {
          userStats.mostUsedEmoji = emoji;
        }
      });
  
      // Update most active day
      const dayOfWeek = getDayOfWeek(date);
      userStats.mostActiveDay = dayOfWeek;
  
      // Update most active hour
      const hour = new Date(`${date} ${time}`).getHours();
      userStats.mostActiveHour = `${hour}:00 - ${hour + 1}:00`;
  
      // Update word frequency for combined stats
      text.split(' ').forEach((word) => {
        const cleanedWord = word.toLowerCase().replace(/[^\w]/g, '');
        if (cleanedWord) {
          wordFrequencyMap.set(cleanedWord, (wordFrequencyMap.get(cleanedWord) || 0) + 1);
          userWordMap.set(cleanedWord, (userWordMap.get(cleanedWord) || 0) + 1);
        }
      });
  
      // Count media (e.g., "image omitted")
      if (text.includes('image omitted') || text.includes('video omitted')) {
        totalMedia++;
      }
    });
  
    // Calculate average message length for each user
    userStatsMap.forEach((userStats) => {
      userStats.averageMessageLength = userStats.totalWords / userStats.totalMessages;
  
      // Calculate most common word for each user
      let mostCommonWord = '';
      let maxFrequency = 0;
      const userWordMap = userWordFrequencyMap.get(userStats.sender)!;
      userWordMap.forEach((frequency, word) => {
        if (frequency > maxFrequency) {
          mostCommonWord = word;
          maxFrequency = frequency;
        }
      });
      userStats.mostCommonWord = mostCommonWord || 'null'; // Set to 'null' if no word is found
    });
  
    // Find the most common word for combined stats
    let mostCommonWord = '';
    let maxFrequency = 0;
    wordFrequencyMap.forEach((frequency, word) => {
      if (frequency > maxFrequency) {
        mostCommonWord = word;
        maxFrequency = frequency;
      }
    });
  
    // Calculate days since the first message
    const daysSinceFirstMessage = firstMessageDate
      ? Math.floor((new Date().getTime() - firstMessageDate.getTime()) / (1000 * 60 * 60 * 24))
      : 0;
  
    // Convert user stats map to an array
    const userStats = Array.from(userStatsMap.values());
  
    console.log('Calculated user stats:', userStats); // Debug: Log user stats
    console.log('Calculated combined stats:', {
      totalMessages: messages.length,
      mostCommonWord: mostCommonWord || 'null', // Set to 'null' if no word is found
      totalMedia, // Always a number
      daysSinceFirstMessage,
    }); // Debug: Log combined stats
  
    return {
      userStats,
      combinedStats: {
        totalMessages: messages.length,
        mostCommonWord: mostCommonWord || 'null', // Set to 'null' if no word is found
        totalMedia, // Always a number
        daysSinceFirstMessage,
      },
    };
  }