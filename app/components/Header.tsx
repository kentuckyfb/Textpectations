import Link from 'next/link';
import { FaRobot, FaHome, FaBug } from 'react-icons/fa'; // Icons for home and bugs
import { GitHub, LinkedIn } from '@mui/icons-material';

export default function Header() {
  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[70%] bg-gray-800 backdrop-blur-md p-4 flex justify-between items-center rounded-lg shadow-lg border border-blue-500 z-50">
      <div className="flex items-center space-x-2">
        <FaRobot className="text-3xl text-blue-500" /> {/* Funky robot icon */}
        <span className="text-2xl font-bold text-white">Textpectations</span>
      </div>
      <nav className="flex space-x-4">
        <Link href="/" className="text-white hover:text-blue-500 flex items-center space-x-2">
          <FaHome className="text-xl" /> {/* Home icon */}
          <span>Home</span>
        </Link>
        <Link href="/bugs-improvements" className="text-white hover:text-blue-500 flex items-center space-x-2">
          <FaBug className="text-xl" /> {/* Bug icon */}
          <span>Bugs/Improvements</span>
        </Link>
      </nav>
    </header>
  );
}