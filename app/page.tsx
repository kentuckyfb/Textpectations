'use client'; // Mark this as a Client Component
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import FileUpload from './components/FileUpload';
import StatsDisplay from './components/StatsDisplay';
import { parseChat } from './utils/parseChat';
import { calculateStats } from './utils/statsCalculator';

export default function Home() {
  const [stats, setStats] = useState<{ userStats: any[]; combinedStats: any } | null>(null);

  const handleFileUpload = (content: string) => {
    console.log('File content:', content); // Debug: Log file content
    const messages = parseChat(content);
    console.log('Parsed messages:', messages); // Debug: Log parsed messages
    const stats = calculateStats(messages);
    console.log('Calculated stats:', stats); // Debug: Log calculated stats
    setStats(stats);
  };

  const handleTryAnotherChat = () => {
    setStats(null); // Reset stats to go back to the initial stage
  };

  return (
    <div className="min-h-screen text-white flex flex-col">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Show Welcome Container if no stats are available */}
        {!stats && (
          <div className="flex-grow flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-[90%] md:w-[70%] bg-dark-blue backdrop-blur-md p-8 rounded-lg shadow-lg border border-gray-700 flex flex-col justify-center items-center" 
            >
              <h1 className="text-4xl font-bold text-center">Welcome to Textpectations</h1>
              <p className="text-center mt-2 text-gray-300">Upload your WhatsApp chat and see fun stats!</p>
              <div className="mt-6">
                <FileUpload onFileUpload={handleFileUpload} />
              </div>
            </motion.div>
          </div>
        )}

        {/* Show Stats Container if stats are available */}
        {stats && (
          <div className="w-[90%] mx-auto mt-[20vh]"> {/* Increased width to 90% */}
            <StatsDisplay
              userStats={stats.userStats}
              combinedStats={stats.combinedStats}
              onTryAnotherChat={handleTryAnotherChat}
            />
          </div>
        )}
      </main>

      {/* Footer (At the end of the page content) */}
      <Footer />
    </div>
  );
};