import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import RootLayout from './components/RootLayout';
import ProtectedRoute from './components/ProtectedRoute'; 
import Home from './pages/Home';
import About from './pages/About';
import ItemsListPage from './pages/ItemsListPage';
import ItemDetailsPage from './pages/ItemDetailsPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage'; 
import ProfilePage from './pages/ProfilePage'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<RootLayout />}>
        
        <Route path="about" element={<About />} />
        <Route path="items" element={<ItemsListPage />} />
        <Route path="items/:id" element={<ItemDetailsPage />} /> 

        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route element={<ProtectedRoute />}>
            <Route index element={<Home />} /> 
            <Route path="profile" element={<ProfilePage />} />
        </Route>
        
        <Route path="*" element={<h1>404: Page Not Found</h1>} />
      </Route>
    </Routes>
  );
}

export default App;