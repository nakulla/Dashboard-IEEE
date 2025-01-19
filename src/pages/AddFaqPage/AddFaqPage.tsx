import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FAQ {
  id: number;
  name: string;  // Added name field
  question: string;
  answer: string;
  date: string;
  picture: string;
}

const AddFAQPage: React.FC = () => {
  const navigate = useNavigate();
  const [faq, setFaq] = useState<FAQ>({
    id: Date.now(),
    name: '',  // Initialize name as empty string
    question: '',
    answer: '',
    date: '',
    picture: '',
  });
  const [errors, setErrors] = useState({
    name: '',  // Added error for name
    question: '',
    answer: '',
    date: '',
    picture: '',
  });
  const [loading, setLoading] = useState(false);

  const getFAQFromLocalStorage = (): FAQ[] => {
    const storedFAQ = localStorage.getItem('faq');
    return storedFAQ ? JSON.parse(storedFAQ) : [];
  };

  const saveToLocalStorage = (faq: FAQ) => {
    const faqList = getFAQFromLocalStorage();
    faqList.push(faq);
    localStorage.setItem('faq', JSON.stringify(faqList));
  };

  const handleSubmit = () => {
    const newErrors: any = {};

    if (!faq.name) newErrors.name = 'Name is required';  // Validate name
    if (!faq.question) newErrors.question = 'Question is required';
    if (!faq.answer) newErrors.answer = 'Answer is required';
    if (!faq.date) newErrors.date = 'Date is required';
    if (!faq.picture) newErrors.picture = 'Picture is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    saveToLocalStorage(faq);

    toast.success('FAQ added successfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
    });

    setTimeout(() => {
      navigate('/faq');
      setLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/faq');
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const fileURL = URL.createObjectURL(file);
      setFaq({ ...faq, picture: fileURL });
    } else {
      toast.error('Only PNG, JPEG, and JPG images are allowed!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      });
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
      onDrop: handleDrop,
      accept: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpeg', '.jpg']
      },
    });

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="Add FAQ" />

      <div className="w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
        {/* Name Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Name</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={faq.name}
            onChange={(e) => setFaq({ ...faq, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.name && (
            <div className="text-red-500 text-sm mt-1">{errors.name}</div>
          )}
        </div>

        {/* Question Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Question</h2>
          <input
            type="text"
            placeholder="Enter your question"
            value={faq.question}
            onChange={(e) => setFaq({ ...faq, question: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.question && (
            <div className="text-red-500 text-sm mt-1">{errors.question}</div>
          )}
        </div>

        {/* Answer Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Answer</h2>
          <textarea
            placeholder="Enter your answer"
            value={faq.answer}
            onChange={(e) => setFaq({ ...faq, answer: e.target.value })}
            className="w-full p-3 min-h-[120px] border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all resize-none"
          />
          {errors.answer && (
            <div className="text-red-500 text-sm mt-1">{errors.answer}</div>
          )}
        </div>

        {/* Date Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Date</h2>
          <DatePicker
            selected={faq.date ? new Date(faq.date) : null}
            onChange={(date) => setFaq({ ...faq, date: date ? date.toISOString().split('T')[0] : '' })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
          />
          {errors.date && (
            <div className="text-red-500 text-sm mt-1">{errors.date}</div>
          )}
        </div>

        {/* Image Upload Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Upload Image</h2>
          <div
            {...getRootProps()}
            className="w-full border-2 border-dashed p-4 rounded-lg text-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-all border-gray-800 dark:border-gray-600"
          >
            <input {...getInputProps()} />
            <p>Drag & drop an image here, or click to select one</p>
          </div>
        </div>

        {/* Image Preview Section */}
        {faq.picture && (
          <div className="mt-4 relative">
            <img
              src={faq.picture}
              alt="Preview"
              className="w-full max-h-80 object-cover rounded-lg transition-all"
            />
            <button
              onClick={() => setFaq({ ...faq, picture: '' })}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2 bg-white rounded-full shadow-md"
            >
              <FaTrash size={24} />
            </button>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleSubmit}
            className="px-6 py-3"
            style={{
              background: 'linear-gradient(to right, #C0A2FE, #4E2D96)', // Gradient purple
              color: 'white',
              borderRadius: '0.375rem', // Rounded-lg
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Shadow-md
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'linear-gradient(to right, #5906BA, #6B0DE3)')} // Hover gradient
            onMouseLeave={(e) => (e.currentTarget.style.background = 'linear-gradient(to right, #C0A2FE, #4E2D96)')} // Reset gradient
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add FAQ'}
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* ToastContainer for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default AddFAQPage;
