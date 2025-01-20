import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { FaTrashRestoreAlt, FaTrash } from 'react-icons/fa'; // Import icons
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import Swal from 'sweetalert2'; // Import SweetAlert2

interface FAQ {
  id: number;
  name: string;
  question: string;
  answer: string;
  picture: string;
  date: string;
}

const getRecycleBinFromLocalStorage = (): FAQ[] => {
  const storedRecycleBin = localStorage.getItem('recycleBin');
  return storedRecycleBin ? JSON.parse(storedRecycleBin) : [];
};

const saveRecycleBinToLocalStorage = (recycleBin: FAQ[]) => {
  localStorage.setItem('recycleBin', JSON.stringify(recycleBin));
};

const RecycleBinPage: React.FC = () => {
  const [recycleBin, setRecycleBin] = useState<FAQ[]>([]);

  useEffect(() => {
    setRecycleBin(getRecycleBinFromLocalStorage());
  }, []);

  const restoreFAQ = (id: number) => {
    const itemToRestore = recycleBin.find((item) => item.id === id);
    if (itemToRestore) {
      const updatedRecycleBin = recycleBin.filter((item) => item.id !== id);
      const currentFAQ = JSON.parse(localStorage.getItem('faq') || '[]');
      const updatedFAQ = [...currentFAQ, itemToRestore];

      localStorage.setItem('faq', JSON.stringify(updatedFAQ));
      saveRecycleBinToLocalStorage(updatedRecycleBin);

      setRecycleBin(updatedRecycleBin);
      toast.success('FAQ restored successfully!');
    }
  };

  const deleteFAQ = (id: number) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this item!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedRecycleBin = recycleBin.filter((item) => item.id !== id);
        saveRecycleBinToLocalStorage(updatedRecycleBin);
        setRecycleBin(updatedRecycleBin);
        toast.success('FAQ deleted permanently!');
      } else {
        toast.info('FAQ deletion canceled.');
      }
    });
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-gray-900">
      <Breadcrumb pageName="Recycle Bin" />
      <div className="bg-white shadow rounded-lg overflow-hidden dark:bg-gray-800">
        <table className="min-w-full bg-white dark:bg-gray-800">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">ID</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">NAME</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">QUESTION</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">ANSWER</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-500 dark:text-gray-300">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {recycleBin.map((item, index) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-700">
                <td className="py-3 px-6">{index + 1}</td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">{item.name}</td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">{item.question}</td>
                <td className="py-3 px-6 text-gray-900 dark:text-white">{item.answer}</td>
                <td className="py-3 px-6 text-center">
                  <button
                    onClick={() => restoreFAQ(item.id)}
                    className="text-green-600 hover:text-green-800"
                    title="Restore"
                  >
                    <FaTrashRestoreAlt />
                  </button>
                  <button
                    onClick={() => deleteFAQ(item.id)}
                    className="text-red-600 hover:text-red-800 ml-3"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecycleBinPage;
