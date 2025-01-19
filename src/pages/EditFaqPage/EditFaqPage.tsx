import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { useDropzone } from 'react-dropzone';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FAQ {
  id: number;
  name: string;
  question: string;
  answer: string;
  date: string;
  picture: string;
}

const EditFAQPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [faq, setFaq] = useState<FAQ | null>(null);
  const [errors, setErrors] = useState({
    name: '',
    question: '',
    answer: '',
    date: '',
    picture: '',
  });

  const getFAQFromLocalStorage = (): FAQ[] => {
    const storedFAQ = localStorage.getItem('faq');
    return storedFAQ ? JSON.parse(storedFAQ) : [];
  };

  const saveToLocalStorage = (faqList: FAQ[]) => {
    localStorage.setItem('faq', JSON.stringify(faqList));
  };

  useEffect(() => {
    const faqList = getFAQFromLocalStorage();
    const faqToEdit = faqList.find((item) => item.id === parseInt(id!));
    if (faqToEdit) {
      setFaq(faqToEdit);
    } else {
      navigate('/faq');
    }
  }, [id, navigate]);

  const handleSubmit = () => {
    const newErrors: any = {};

    if (!faq?.name) newErrors.name = 'Name is required';
    if (!faq?.question) newErrors.question = 'Question is required';
    if (!faq?.answer) newErrors.answer = 'Answer is required';
    if (!faq?.date) newErrors.date = 'Date is required';
    if (!faq?.picture) newErrors.picture = 'Picture is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const faqList = getFAQFromLocalStorage();
    const updatedFAQList = faqList.map((item) =>
      item.id === faq!.id ? faq! : item
    );
    saveToLocalStorage(updatedFAQList);

    toast.success('FAQ updated successfully!');

    setTimeout(() => {
      navigate('/faq');
    }, 1000);
  };

  const handleCancel = () => {
    navigate('/faq');
  };

  const handleDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    if (file && (file.type === 'image/png' || file.type === 'image/jpeg')) {
      const fileURL = URL.createObjectURL(file);
      setFaq({ ...faq!, picture: fileURL });
    } else {
      toast.error('Only PNG, JPEG, and JPG images are allowed!');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg'],
    },
  });

  const handleRemoveImage = () => {
    setFaq({ ...faq!, picture: '' });
  };

  if (!faq) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-light-background dark:bg-dark-background min-h-screen">
      <Breadcrumb pageName="Edit FAQ" />

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
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
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
          {errors.question && <div className="text-red-500 text-sm mt-1">{errors.question}</div>}
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
          {errors.answer && <div className="text-red-500 text-sm mt-1">{errors.answer}</div>}
        </div>

        {/* Date Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Date</h2>
          <DatePicker
            selected={new Date(faq.date)}
            onChange={(date: Date) => setFaq({ ...faq, date: date.toISOString() })}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          />
          {errors.date && <div className="text-red-500 text-sm mt-1">{errors.date}</div>}
        </div>

        {/* Image Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">Picture</h2>
          <div
            {...getRootProps()}
            className="p-3 border border-dashed border-gray-300 rounded-lg bg-white dark:bg-gray-700 text-black dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 hover:ring-purple-600 transition-all"
          >
            <input {...getInputProps()} />
            {faq.picture ? (
              <div className="relative">
                <img
                  src={faq.picture}
                  alt="FAQ"
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-0 right-0 p-2 bg-white rounded-full shadow-md text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            ) : (
              <span>Drag & drop an image, or click to select one</span>
            )}
          </div>
          {errors.picture && <div className="text-red-500 text-sm mt-1">{errors.picture}</div>}
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="flex justify-end space-x-6 mt-8">
          <button
            onClick={handleSubmit}
            className="px-8 py-3 text-lg font-semibold bg-gradient-to-r from-[#C0A2FE] to-[#4E2D96] text-white rounded-lg shadow-md hover:from-[#4E2D96] hover:to-[#C0A2FE] transition-all"
          >
            Save FAQ
          </button>
          <button
            onClick={handleCancel}
            className="px-8 py-3 text-lg font-semibold bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-400 transition-all"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default EditFAQPage;
