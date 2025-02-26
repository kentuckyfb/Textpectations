import Image from 'next/image';
import { GitHub, LinkedIn } from '@mui/icons-material';

export default function Footer() {
  return (
    <footer className="w-[70%] mx-auto bg-gray-800 backdrop-blur-md p-4 flex justify-between items-center rounded-lg shadow-lg border border-blue-500 mt-8 mb-8">
      <div className="flex items-center space-x-2">
        <Image
          src="/pp.jpg"
          alt="Your Picture"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="text-white">Developed by Kentucky</span>
      </div>
      <div className="flex space-x-4">
        <a href="https://github.com/kentuckyfb" target="_blank" rel="noopener noreferrer">
          <GitHub className="text-white hover:text-blue-500" /> {/* Blue hover effect */}
        </a>
        <a href="https://www.linkedin.com/in/nathan-himesh-652171250/" target="_blank" rel="noopener noreferrer">
          <LinkedIn className="text-white hover:text-blue-500" /> {/* Blue hover effect */}
        </a>
      </div>
    </footer>
  );
}