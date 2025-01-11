import { useState } from 'react';
import { useUser } from '../components/Dropdowns/UserContext';

const Settings = () => {
  const { userName, setUserName, profileImage, setProfileImage } = useUser(); // Ambil state userName, setUserName, profileImage, dan setProfileImage dari context
  const [newName, setNewName] = useState(userName); // Inisialisasi dengan nama saat ini
  const [newImage, setNewImage] = useState<File | null>(null); // Untuk menyimpan gambar baru

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUserName(newName); // Update nama di context
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setProfileImage(reader.result as string); // Set gambar profil baru
        }
      };
      reader.readAsDataURL(file); // Membaca file sebagai URL data
      setNewImage(file); // Simpan gambar yang diupload
    }
  };

  return (
    <div className="mx-auto max-w-270">
      <div className="grid grid-cols-5 gap-8">
        <div className="col-span-5 xl:col-span-3">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Personal Information</h3>
            </div>
            <div className="p-7">
              <form onSubmit={handleNameSubmit}>
                {/* Ubah Nama */}
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="fullName"
                  >
                    Full Name
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-[#6B0DE3] dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Devid Jhon"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)} // Update state lokal
                  />
                </div>

                {/* Ubah Foto Profil */}
                <div className="mb-5.5">
                  <label
                    className="mb-3 block text-sm font-medium text-black dark:text-white"
                    htmlFor="profileImage"
                  >
                    Profile Picture
                  </label>
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black dark:border-strokedark dark:bg-meta-4 dark:text-white"
                    type="file"
                    name="profileImage"
                    id="profileImage"
                    accept="image/*"
                    onChange={handleImageChange} // Menangani perubahan gambar
                  />
                </div>

                <button
                  type="submit"
                  className="mt-5 rounded bg-purple-600 px-6 py-3 text-white hover:bg-purple-700"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
