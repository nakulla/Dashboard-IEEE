import React, { useState, useEffect } from 'react';
import { FaPen, FaTrash, FaPlus, FaChevronLeft, FaChevronRight, FaSort, FaRecycle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface FAQ {
  id: number;
  name: string;
  question: string;
  answer: string;
  picture: string;
  date: string;
}

const getFAQFromLocalStorage = (): FAQ[] => {
  const storedFAQ = localStorage.getItem('faq');
  return storedFAQ ? JSON.parse(storedFAQ) : [];
};

const saveFAQToLocalStorage = (faq: FAQ[]) => {
  localStorage.setItem('faq', JSON.stringify(faq));
};

const getRecycleBinFromLocalStorage = (): FAQ[] => {
  const storedRecycleBin = localStorage.getItem('recycleBin');
  return storedRecycleBin ? JSON.parse(storedRecycleBin) : [];
};

const saveRecycleBinToLocalStorage = (recycleBin: FAQ[]) => {
  localStorage.setItem('recycleBin', JSON.stringify(recycleBin));
};

const FAQPage: React.FC = () => {
  const [faq, setFAQ] = useState<FAQ[]>([]);
  const [recycleBin, setRecycleBin] = useState<FAQ[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    setFAQ(getFAQFromLocalStorage());
    setRecycleBin(getRecycleBinFromLocalStorage());
  }, []);

  const filteredFAQ = faq.filter((faqItem) =>
    faqItem.question.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortFAQ = (faq: FAQ[]): FAQ[] => {
    return faq.sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.question.localeCompare(b.question);
      } else {
        return b.question.localeCompare(a.question);
      }
    });
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortFAQ(filteredFAQ).slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const deleteFAQ = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to move this FAQ to Recycle Bin?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, move it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        const deletedItem = faq.find((faqItem) => faqItem.id === id);
        if (deletedItem) {
          const updatedFAQ = faq.filter((faqItem) => faqItem.id !== id);
          setFAQ(updatedFAQ);
          saveFAQToLocalStorage(updatedFAQ);

          const updatedRecycleBin = [...recycleBin, deletedItem];
          setRecycleBin(updatedRecycleBin);
          saveRecycleBinToLocalStorage(updatedRecycleBin);

          toast.success('FAQ moved to Recycle Bin!');
        }
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <Breadcrumb pageName="FAQ Page" />

      <div className="flex justify-between items-center mb-4">
        <Link
          to="/add-faq"
          className="flex items-center text-white rounded-full px-4 py-2 transition-all transform hover:scale-105 hover:shadow-lg"
          style={{
            background: 'linear-gradient(45deg, #C0A2FE, #4E2D96)',
          }}
        >
          <FaPlus className="mr-2" /> ADD FAQ
        </Link>
        <Link
          to="/trash"
          className="flex items-center text-white rounded-full px-4 py-2 transition-all transform hover:scale-105 hover:shadow-lg"
          style={{
            background: 'linear-gradient(45deg, #FEA092, #C04E4E)',
          }}
        >
          <FaRecycle className="mr-2" /> RECYCLE BIN
        </Link>
      </div>

      <input
        type="text"
        placeholder="Search FAQ..."
        className="p-2 mb-4 border border-gray-300 dark:border-gray-700 rounded-lg w-full dark:bg-gray-800 dark:text-white"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div className="bg-white shadow rounded-lg overflow-hidden dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">ID</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">NAME</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">
                <span>QUESTION</span>
                <button className="ml-2 text-gray-500 dark:text-gray-300" onClick={toggleSortOrder}>
                  <FaSort />
                </button>
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">ANSWER</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">PICTURE</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">DATE</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((faqItem, index) => (
              <tr
                key={faqItem.id}
                className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700 transition"
              >
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">{faqItem.name}</td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">{faqItem.question}</td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">{faqItem.answer}</td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">
                  {faqItem.picture ? (
                    <img src={faqItem.picture} alt="FAQ related" className="w-12 h-12 object-cover rounded-full" />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">{faqItem.date}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex justify-center space-x-4">
                    <Link to={`/edit-faq/${faqItem.id}`} className="text-blue-600 hover:text-blue-800">
                      <FaPen />
                    </Link>
                    <button
                      onClick={() => deleteFAQ(faqItem.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center mt-4">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200"
          >
            <FaChevronLeft />
          </button>
          {[...Array(Math.ceil(filteredFAQ.length / itemsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-3 py-1 rounded-full ${
                currentPage === index + 1
                  ? 'bg-purple-600 text-white'
                  : 'text-purple-600 border border-purple-600 hover:bg-purple-100 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-600 dark:hover:text-white'
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= filteredFAQ.length}
            className="text-purple-600 hover:text-purple-500 dark:text-purple-300 dark:hover:text-purple-200"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default FAQPage
