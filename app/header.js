"use client";

// All necessary inputs
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/header.module.css';
import { useRouter } from 'next/navigation';


// Define the Header functional component
const Header = () => {

  // Initialize required refs and hooks
  const [isAuthenticated, setIsAuthenticated] = useState('false');
  const router = useRouter();

  // useEffect hook to update authenticated values from localstorage
  useEffect(() => {
    const initialAuthValue = localStorage.getItem('authenticated') === 'true';
    setIsAuthenticated(initialAuthValue);
  }, [isAuthenticated]);

  // Define function tho handle logout
  const handleLogout = () => {
    console.log('Logging out...');
    setIsAuthenticated(false);
    localStorage.setItem('authenticated', 'false');
    localStorage.setItem('loginresponse', 'false');
    localStorage.setItem('isagency', 'false');
    localStorage.removeItem('agencyid');
    localStorage.removeItem('isagency');
    router.refresh();
    router.push('/');
  };

  // Render the component
  return (
    <div className = {styles.header}>
      <div className = {styles.titleContainer}>
        <div className = {styles.logo}>
          <Image
            src = "/favicon.ico"
            alt = "Organization Logo"
            width = {50}
            height = {50}
          />
        </div>
        <div className = {styles.title}>
          <h2>
            <em>Kulaabhooshanam</em>
          </h2>
        </div>
      </div>
    {/* Conditonal render */}
      <nav className={styles.navContainer}>
        {isAuthenticated ? (
          <>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <Link href="/about" className={styles.link}>
              About
            </Link>
            <Link href="/" onClick={handleLogout} className={styles.link}>
              Logout
            </Link>
            <Link href="/profile" className={styles.link}>
              Profile
            </Link>
          </>
        ) : (
          <>
            <Link href="/" className={styles.link}>
              Home
            </Link>
            <Link href="/about" className={styles.link}>
              About
            </Link>
            <Link href="/login" className={styles.link}>
              Login
            </Link>
            <Link href="/register" className={styles.link}>
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Header;
