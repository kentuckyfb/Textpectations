import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Button } from '@mui/material';
import StatCard from './StatCard'; // Import StatCard

interface UserStats {
  sender: string;
  totalMessages: number;
  totalWords: number;
  mostUsedEmoji: string;
  averageMessageLength: number;
  longestMessage: string;
  mostActiveDay: string;
  mostActiveHour: string;
  mostCommonWord: string; // Most common word for each user
}

interface CombinedStats {
  totalMessages: number;
  mostCommonWord: string;
  totalMedia: number;
  daysSinceFirstMessage: number;
}

interface StatsDisplayProps {
  userStats: UserStats[];
  combinedStats: CombinedStats;
  onTryAnotherChat: () => void;
}

export default function StatsDisplay({ userStats, combinedStats, onTryAnotherChat }: StatsDisplayProps) {
  // Data for the bar chart (example: total messages per user)
  const barChartData = userStats.map((user) => ({
    name: user.sender,
    messages: user.totalMessages,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-[90%] md:w-[80%] lg:w-[70%] mx-auto bg-gray-800 backdrop-blur-md p-6 md:p-8 rounded-lg shadow-lg border border-blue-500 overflow-x-auto"
    >
      {/* Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-center">Chat Stats</h2>

      {/* Combined Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard title="Total Messages" value={`${combinedStats.totalMessages} 📨`} />
        <StatCard title="Most Common Word" value={`${combinedStats.mostCommonWord} 🔤`} />
        <StatCard
          title="Total Media Shared"
          value={combinedStats.totalMedia === 0 ? 'null 📷' : `${combinedStats.totalMedia} 📷`} // Display 'null' if totalMedia is 0
        />
        <StatCard title="Days Since First Message" value={`${combinedStats.daysSinceFirstMessage} 📅`} />
      </div>

      {/* User Stats */}
      {userStats.map((user, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center">{user.sender}'s Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard title="Total Messages" value={user.totalMessages} />
            <StatCard title="Total Words" value={user.totalWords} />
            <StatCard title="Most Used Emoji" value={user.mostUsedEmoji || '❓'} /> {/* Display '❓' if no emoji is found */}
            <StatCard title="Average Message Length" value={user.averageMessageLength.toFixed(2)} />
            <StatCard title="Longest Message" value={user.longestMessage} isLongMessage /> {/* Scrollable container */}
            <StatCard title="Most Common Word" value={user.mostCommonWord || 'null'} /> {/* Display 'null' if no word is found */}
            <StatCard title="Most Active Day" value={user.mostActiveDay} />
            <StatCard title="Most Active Hour" value={user.mostActiveHour} />
          </div>
        </div>
      ))}

      {/* Bar Chart for Total Messages */}
      <div className="mt-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white text-center">Total Messages per User</h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={barChartData}>
            <XAxis dataKey="name" stroke="#fff" /> {/* White text for X-axis */}
            <YAxis stroke="#fff" /> {/* White text for Y-axis */}
            <Tooltip
              contentStyle={{ backgroundColor: '#374151', border: '1px solid #3b82f6', borderRadius: '8px' }} // Dark theme for tooltip
            />
            <Bar dataKey="messages" fill="#3b82f6" /> {/* Blue bars */}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Try Another Chat Button */}
      <div className="mt-8 flex justify-center">
        <Button
          variant="contained"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-transform transform hover:scale-105"
          onClick={onTryAnotherChat}
        >
          Try Another Chat
        </Button>
      </div>
    </motion.div>
  );
}