import React from 'react';
import { Outlet } from 'react-router-dom'; 
import NavBar from './NavBar';
import '../styles/App.css';

function RootLayout() {
  return (
    <div className="root-layout">
      <NavBar />
      
      <main className="main-content">
        <Outlet />
      </main>
      
      <footer className="footer">
        © 2025 Library App
      </footer>
    </div>
  );
}

export default RootLayout;