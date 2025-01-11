import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Dropdowns/UserContext';
import { FaCog, FaSignOutAlt } from 'react-icons/fa';

const DropdownUser = () => {
  const { userName, profileImage } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown state
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  // Navigasi ke halaman Settings
  const goToSettings = () => {
    setIsOpen(false); // Tutup dropdown saat berpindah halaman
    navigate('/settings');
  };

  return (
    <div className="relative">
      {/* Button untuk membuka/menutup dropdown */}
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-4 focus:outline-none"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userName}
          </span>
          <span className="block text-xs">IEEE SB | IT</span>
        </span>

        <span className="h-12 w-12 rounded-full overflow-hidden border border-gray-300">
          <img src={profileImage} alt="User" />
        </span>

        <svg
          className={`hidden fill-current sm:block transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          width="12"
          height="8"
          viewBox="0 0 12 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.41 0.91a1.1 1.1 0 011.58 0L6 5.32l4.41-4.41a1.1 1.1 0 111.58 1.58L6.59 7.09a1.1 1.1 0 01-1.58 0L0.41 2.49a1.1 1.1 0 010-1.58z"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800">
          <ul className="py-1">
            <li>
              <button
                onClick={goToSettings}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FaCog className="mr-2" /> Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => alert('Logged out!')}
                className="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownUser;
