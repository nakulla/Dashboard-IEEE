import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Login from './pages/Authentication/Login.tsx';
import Register from './pages/Authentication/Register.tsx';
import AchievmentPage from './pages/AchievmentPage/Achievment';
import NewsPage from './pages/NewsPage/News';
import FaqPage from './pages/FaqPage/FaqPage.tsx';
import RecentActivitiesPage from './pages/RecentActivitiesPage/Activities';
import AddActivityPage from './pages/AddActivityPage/Add';
import AddAchievmentPage from './pages/AddAchievmentPage/Achiv';
import AddNewsPage from './pages/AddNewsPage/Addnews';
import AddFaqPage from './pages/AddFaqPage/AddFaqPage.tsx'
import EditActivityPage from './pages/EditActivityPage/Edit';
import EditNewsPage from './pages/EditNewsPage/Edit';
import EditAchievmentPage from './pages/EditAchievmentPage/Edit.tsx';
import EditFaqPage from './pages/EditFaqPage/EditFaqPage.tsx'
import Settings from './pages/Settings.tsx';
import LogPage from './pages/LogPage/log';
import DefaultLayout from './layout/DefaultLayout';
import { UserProvider } from './components/Dropdowns/UserContext.tsx'; 

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <UserProvider>
      <DefaultLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/achievements" replace />} />

          <Route
            path="/achievements"
            element={
              <>
                <PageTitle title="Achievment | IEEE Dashboard Admin" />
                <AchievmentPage />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <PageTitle title="News | IEEE Dashboard Admin" />
                <NewsPage />
              </>
            }
          />
          <Route
            path="/faq"
            element={
              <>
                <PageTitle title="FAQ | IEEE Dashboard Admin" />
                <FaqPage />
              </>
            }
          />
          <Route
            path="/log"
            element={
              <>
                <PageTitle title="Log | IEEE Dashboard Admin" />
                <LogPage />
              </>
            }
          />
          <Route
            path="/recent-activities"
            element={
              <>
                <PageTitle title="Recent Activities | IEEE Dashboard Admin" />
                <RecentActivitiesPage />
              </>
            }
          />
          <Route
            path="/add-activity"
            element={
              <>
                <PageTitle title="Add New Activity | IEEE Dashboard Admin" />
                <AddActivityPage />
              </>
            }
          />
          <Route
            path="/add-achievements"
            element={
              <>
                <PageTitle title="Add New Achievment | IEEE Dashboard Admin" />
                <AddAchievmentPage />
              </>
            }
          />
          <Route
            path="/add-news"
            element={
              <>
                <PageTitle title="Add New News | IEEE Dashboard Admin" />
                <AddNewsPage />
              </>
            }
          />
          <Route
            path="/add-faq"
            element={
              <>
                <PageTitle title="Add New News | IEEE Dashboard Admin" />
                <AddFaqPage />
              </>
            }
          />
          <Route
            path="/edit-activity/:id"
            element={
              <>
                <PageTitle title="Edit Activity | IEEE Dashboard Admin" />
                <EditActivityPage />
              </>
            }
          />
          <Route
            path="/edit-news/:id"
            element={
              <>
                <PageTitle title="Edit News | IEEE Dashboard Admin" />
                <EditNewsPage />
              </>
            }
          />
          <Route
            path="/edit-achievements/:id"
            element={
              <>
                <PageTitle title="Edit Achievment | IEEE Dashboard Admin" />
                <EditAchievmentPage />
              </>
            }
          />
          <Route
            path="/edit-faq/:id"
            element={
              <>
                <PageTitle title="Edit Achievment | IEEE Dashboard Admin" />
                <EditFaqPage />
              </>
            }
          />
          <Route
            path="/settings"
            element={
              <>
                <PageTitle title="Settings | TailAdmin - Tailwind CSS Admin Dashboard Template" />
                <Settings />
              </>
            }
          />
          <Route
            path="/auth/login"
            element={
              <>
                <PageTitle title="Login | IEEE Dashboard Admin" />
                <Login />
              </>
            }
          />
          <Route
            path="/auth/register"
            element={
              <>
                <PageTitle title="Register | IEEE Dashboard Admin" />
                <Register />
              </>
            }
          />
        </Routes>
      </DefaultLayout>
    </UserProvider>
  );
}

export default App;
