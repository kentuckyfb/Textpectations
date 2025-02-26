import { motion } from 'framer-motion';

interface StatCardProps {
    title: string;
    value: string | number;
    isLongMessage?: boolean; // Add a prop to identify the longest message card
}

export default function StatCard({ title, value, isLongMessage = false }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`bg-gray-900 p-4 rounded-lg shadow-md border border-blue-500 ${isLongMessage ? 'h-40 overflow-y-auto' : ''}`} // Dark background with blue border
        >
            <h4 className="text-lg font-semibold text-white">{title}</h4> {/* White text */}
            <p className="text-2xl font-bold text-white break-words">{value}</p> {/* White text */}
        </motion.div>
    );
}