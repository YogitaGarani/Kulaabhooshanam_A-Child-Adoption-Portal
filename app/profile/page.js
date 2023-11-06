"use client"
// Page where they enter ID to view their status

import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import styles from "../../styles/profile.module.css";

const ProfilePage = () => {
  const router = useRouter();

  const [inputUserId, setInputUserId] = useState("");

  const handleButtonClick = () => {
    // Encode the user's ID input with encodeURIComponent()
    const encodedUserId = encodeURIComponent(inputUserId);

    // Navigate to the user's profile page
    router.push(`/profile/${encodedUserId}`);
  };

  return (
    <>
    <div className={styles.profileContainer}>
      <div className={styles.inputDiv}>
        <label htmlFor="p_id">Enter your ID(Aadhar Number)</label>
        <p></p>
        <input 
        className={styles.inputBox}
        type="text"
        placeholder="4222 2224 4222"
        required
        pattern='[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}'
        onChange={e => setInputUserId(e.target.value)}
        />
      </div>
      <div className={styles.statusBtn}>
        <button onClick={handleButtonClick}>Get Status</button>
      </div>
    </div>
    </>
  )
}

export default ProfilePage;