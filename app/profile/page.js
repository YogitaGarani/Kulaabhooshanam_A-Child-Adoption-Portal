"use client"

//All necessary imports
import React, { useState, useEffect } from "react"
import { useRouter } from 'next/navigation';
import styles from "../../styles/profile.module.css";
import Header from "../header";

// Define the ProfilePage functinoal component
const ProfilePage = () => {

  // Initialize necessary hooks and refs
  const router = useRouter();
  const [applicationStuff, setApplicationStuff] = useState();
  const [inputUserId, setInputUserId] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [agency, setAgency] = useState(false);
  const [name, setName] = useState();

    // Effect hook to get if agency from localStorage
    useEffect(() => {
    const agencyidread = localStorage.getItem('agencyid');
    setAgency(Boolean(agencyidread));
    const ag = localStorage.getItem('agencyid');
    setName(ag);
}, []);

console.log(name, agency);
    
// Function to handle data read
  async function getChildren() {
    // Prepare GET request
    try {
      const postData = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          agency_id: 103,
        },
      };

      // Make API request to read agency
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/agencyaddchild`,
        postData
      );

      // Handle reponse
      if (!res.ok) {
        throw new Error(`API request failed with status ${res.status}`);
      }

      const response = await res.json();
      console.log("API Response:", response);
      setApplicationStuff(response.application); // Update state with the correct table name
      setIsLoading(false); // Set loading state to false
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false); // loading state is set to false in case of an error
    }
  }

  // UseEffect hook to mount children data
  useEffect(() => {
    getChildren();
  }, []);

  console.log(applicationStuff)

  const handleButtonClick = () => {
    // Encode the user's ID input with encodeURIComponent()
    const encodedUserId = encodeURIComponent(inputUserId);

    // Navigate to the user's profile page
    router.push(`/profile/${encodedUserId}`);
  };

  // Render the component
  return (
    <>
    <Header />
    <div className = {styles.profileContainer}>

    {/* Conditional rendering */}
    {agency ? (
    <div>
      <h1>These children are registered under your agency</h1>

    {isLoading ? (
      <p>Loading...</p>
    ) : applicationStuff.length > 0 ? (
      <table>
        <thead>
          <tr>
            <th>Child Name</th>
            <th>Child Age</th>
            <th>Sex</th>
            <th>Adoption Status</th>
            <th>Genetic Disorders</th>
          </tr>
        </thead>
        <tbody>
          {applicationStuff.map((item, index) => (
            <tr key={item.app_id}>
              <td>{item.c_name}</td>
              <td>{item.age}</td>
              <td>{item.sex}</td>
              <td>{item.adoption_status}</td>
              <td>{item.genetic_disorder}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p>No children registered under your agency.</p>
    )}
  </div>

      ) : (
        <>
        {/* Rendering parent */}
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
        </>
      )}
      </div>
    </>
  )
}

export default ProfilePage;