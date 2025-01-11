import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Tipe data untuk UserContext
interface UserContextType {
  userName: string;
  setUserName: (name: string) => void;
  profileImage: string;
  setProfileImage: (image: string) => void;
}

// Membuat context default
const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // Ambil data dari localStorage jika ada, atau gunakan nilai default
  const [userName, setUserName] = useState<string>(
    () => localStorage.getItem('userName') || 'Asep Jamaludin'
  );
  const [profileImage, setProfileImage] = useState<string>(
    () => localStorage.getItem('profileImage') || 'path/to/default/image.jpg'
  );

  // Simpan data ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);

  useEffect(() => {
    localStorage.setItem('profileImage', profileImage);
  }, [profileImage]);

  return (
    <UserContext.Provider value={{ userName, setUserName, profileImage, setProfileImage }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
